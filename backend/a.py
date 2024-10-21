import cv2
import dlib
import numpy as np
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import time
import logging
import threading

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads/'
PROCESSED_FOLDER = 'processed/'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
if not os.path.exists(PROCESSED_FOLDER):
    os.makedirs(PROCESSED_FOLDER)

logging.basicConfig(level=logging.DEBUG)

face_detector = dlib.get_frontal_face_detector()
shape_predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

def load_image(image_path):
    """ Load an image from a given path and check for errors. """
    image = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if image is None:
        logging.error(f"Failed to load image from: {image_path}")
    return image

def apply_sunglasses(image, sunglasses, landmarks):
    left_eye_points = landmarks[36:42]
    right_eye_points = landmarks[42:48]

    left_eye_center = np.mean(left_eye_points, axis=0).astype(int)
    right_eye_center = np.mean(right_eye_points, axis=0).astype(int)

    eye_width = np.linalg.norm(right_eye_center - left_eye_center)

    # Resize sunglasses
    sunglass_width = int(eye_width * 2)
    sunglass_height = int(sunglass_width * sunglasses.shape[0] / sunglasses.shape[1])
    resized_sunglasses = cv2.resize(sunglasses, (sunglass_width, sunglass_height))

    # Position the sunglasses
    top_left_x = int((left_eye_center[0] + right_eye_center[0]) / 2 - sunglass_width // 2)
    top_left_y = int((left_eye_center[1] + right_eye_center[1]) / 2 - sunglass_height // 2)

    overlay_image_alpha(image, resized_sunglasses, (top_left_y, top_left_x))

def overlay_image_alpha(background, overlay, position):
    x, y = position
    h, w = overlay.shape[:2]

    if overlay.shape[2] == 4:  # if the overlay has an alpha channel
        alpha_overlay = overlay[:, :, 3] / 255.0
        alpha_background = 1.0 - alpha_overlay

        for c in range(0, 3):
            background[y:y+h, x:x+w, c] = (alpha_overlay * overlay[:, :, c] +
                                            alpha_background * background[y:y+h, x:x+w, c])
    else:
        background[y:y+h, x:x+w] = overlay
@app.route('/sunglasses-try-on-live', methods=['POST'])
def sunglasses_try_on_live():
    sunglasses_num = request.json.get('sunglasses_num', 1)  # Get the sunglasses number from the request

    cap = cv2.VideoCapture(0)
    cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    while True:
        ret, frame = cap.read()
        if not ret:
            logging.error("Failed to capture video frame")
            break

        gray_scale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = cascade.detectMultiScale(gray_scale)

        overlay_path = f'C:/Users/HP/Desktop/v-glam-closet/src/components/images/sunglasses/sg-{sunglasses_num}.png'
        overlay = load_image(overlay_path)
        if overlay is None:
            logging.error(f"Failed to load overlay sunglasses: {overlay_path}")
            break

        for (x, y, w, h) in faces:
            overlay_resize = cv2.resize(overlay, (w, int(h * 0.8)))
            frame[y:y + int(h * 0.8), x:x + w] = overlay_resize

        cv2.imshow('Sunglasses Live', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):  # Press 'q' to quit
            break

    cap.release()
    cv2.destroyAllWindows()
    return jsonify({"status": "stream stopped"})

@app.route('/processed/<path:filename>', methods=['GET'])
def get_processed_image(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)

def start_video_stream(sunglasses_name):
    cap = cv2.VideoCapture(0)
    start_time = time.time()

    while True:
        ret, frame = cap.read()
        if not ret:
            logging.error("Failed to capture video frame")
            break

        # Convert frame to grayscale for face detection
        gray_scale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_detector(gray_scale)

        sunglasses_path = os.path.join('C:/Users/HP/Desktop/v-glam-closet/src/components/images/sunglasses/', f'{sunglasses_name}.png')
        sunglasses = load_image(sunglasses_path)

        if sunglasses is None:
            logging.error(f"Failed to load sunglasses: {sunglasses_name}")
            continue

        # Process detected faces
        for face in faces:
            landmarks = shape_predictor(gray_scale, face)
            landmarks = np.array([[p.x, p.y] for p in landmarks.parts()])
            apply_sunglasses(frame, sunglasses, landmarks)

        # Display the current frame with overlays
        cv2.imshow('Sunglasses Live', frame)

        # Calculate and display elapsed time
        elapsed_time = time.time() - start_time
        cv2.putText(frame, f'Time: {int(elapsed_time)}s', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        # Key controls
        k = cv2.waitKey(1)  # Capture key press
        if k == ord('q'):
            break  # Exit the loop if 'q' is pressed

    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    # Run the Flask server in a separate thread to allow video streaming
    sunglasses_name = 'sg-1'  # Default sunglasses
    threading.Thread(target=start_video_stream, args=(sunglasses_name,)).start()
    app.run(debug=True)
