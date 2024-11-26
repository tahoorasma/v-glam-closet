from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import cv2
import dlib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

selected_sunglasses = None
predictor_path = "shape_predictor_68_face_landmarks.dat"
face_detector = dlib.get_frontal_face_detector()
shape_predictor = dlib.shape_predictor(predictor_path)

for index in range(3):
    cap = cv2.VideoCapture(index)
    if cap.isOpened():
        print(f"Camera found at index {index}")
        break
else:
    print("Error: Unable to access the camera.")
    cap = None

@app.route('/select-sunglasses', methods=['POST'])
def select_sunglasses():
    global selected_sunglasses
    data = request.json
    sunglasses_index = data.get('index')
    sunglasses_path = os.path.join(
        f'C:/Users/HP/Desktop/v-glam-closet/src/components/images/sunglasses/sg-{sunglasses_index}.png')

    selected_sunglasses = cv2.imread(sunglasses_path, cv2.IMREAD_UNCHANGED)

    if selected_sunglasses is None:
        print(f"Error: Sunglasses image not found at {sunglasses_path}.")
        return jsonify({"status": "error", "message": "Sunglasses image not found."}), 404

    print(f"Sunglasses selected: {sunglasses_index}")
    return jsonify({"status": "success", "selected": sunglasses_index})

def overlay_image_alpha(bg, overlay, x, y):
    h, w = overlay.shape[:2]
    if x >= bg.shape[0] or y >= bg.shape[1]:
        return bg
    overlay_area = bg[x:x+h, y:y+w]

    if overlay.shape[2] == 4:
        alpha_mask = overlay[:, :, 3] / 255.0
        for c in range(3):
            overlay_area[:, :, c] = overlay_area[:, :, c] * (1 - alpha_mask) + overlay[:, :, c] * alpha_mask

    bg[x:x+h, y:y+w] = overlay_area
    return bg
left_eye_center = None
right_eye_center = None
alpha = 0.7 
def apply_sunglasses(frame, sunglasses):
    global left_eye_center, right_eye_center, alpha
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_detector(gray_frame)

    for face in faces:
        landmarks = shape_predictor(gray_frame, face)
        landmarks_array = np.array([[p.x, p.y] for p in landmarks.parts()])

        left_eye = landmarks_array[36:42]
        right_eye = landmarks_array[42:48]

        left_eye_center = np.mean(left_eye, axis=0).astype(int)
        right_eye_center = np.mean(right_eye, axis=0).astype(int)

        eye_width = np.linalg.norm(right_eye_center - left_eye_center)
        sunglass_width = int(eye_width * 2)
        sunglass_height = int(sunglass_width * sunglasses.shape[0] / sunglasses.shape[1])

        resized_sunglasses = cv2.resize(sunglasses, (sunglass_width, sunglass_height), interpolation=cv2.INTER_AREA)

        x = int((left_eye_center[1] + right_eye_center[1]) / 2 - sunglass_height / 2)
        y = int((left_eye_center[0] + right_eye_center[0]) / 2 - sunglass_width / 2)

        frame = overlay_image_alpha(frame, resized_sunglasses, x, y)

    return frame

@app.route('/reset-sunglasses', methods=['POST'])
def reset_sunglasses():
    global selected_sunglasses
    selected_sunglasses = None
    print("Sunglasses reset.")
    return jsonify({"status": "reset"})

def generate_video():
    global selected_sunglasses
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Unable to capture video frame.")
            continue

        frame = cv2.flip(frame, 1)
        if selected_sunglasses is not None:
            frame = apply_sunglasses(frame, selected_sunglasses)

        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_video(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
