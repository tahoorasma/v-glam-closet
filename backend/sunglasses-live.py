from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import cv2
import cvzone
import dlib
import numpy as np

app = Flask(__name__)
CORS(app)

selected_sunglasses = None  
cap = cv2.VideoCapture(0)  
cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

face_detector = dlib.get_frontal_face_detector()
shape_predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

@app.route('/select-sunglasses', methods=['POST'])
def select_sunglasses():
    global selected_sunglasses
    data = request.json
    sunglasses_index = data.get('index')
    selected_sunglasses = cv2.imread(f'C:/Users/HP/Desktop/v-glam-closet/src/components/images/sunglasses/sg-{sunglasses_index}.png', cv2.IMREAD_UNCHANGED)

    if selected_sunglasses is None:
        return jsonify({"status": "error", "message": "Sunglasses image not found."}), 404

    _, frame = cap.read()
    if frame is None:
        return jsonify({"status": "error", "message": "Failed to capture frame."}), 500

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    detected_faces = face_detector(rgb_frame)

    for face in detected_faces:
        landmarks = shape_predictor(rgb_frame, face)
        landmarks_array = np.array([[p.x, p.y] for p in landmarks.parts()])
        apply_sunglasses(frame, selected_sunglasses, landmarks_array)

    cv2.imshow('SnapLens', frame)
    return jsonify({"status": "success", "selected": sunglasses_index})

def apply_sunglasses(image, sunglasses, landmarks):
    left_eye_points = landmarks[36:42]
    right_eye_points = landmarks[42:48]

    left_eye_center = np.mean(left_eye_points, axis=0).astype(int)
    right_eye_center = np.mean(right_eye_points, axis=0).astype(int)

    eye_width = np.linalg.norm(right_eye_center - left_eye_center)

    sunglass_width = int(eye_width * 2) 
    sunglass_height = int(sunglass_width * sunglasses.shape[0] / sunglasses.shape[1])
    resized_sunglasses = cv2.resize(sunglasses, (sunglass_width, sunglass_height))

    angle = 0  
    M = cv2.getRotationMatrix2D((sunglass_width // 2, sunglass_height // 2), angle, 1)
    rotated_sunglasses = cv2.warpAffine(resized_sunglasses, M, (sunglass_width, sunglass_height))

    top_left_x = int((left_eye_center[0] + right_eye_center[0]) / 2 - sunglass_width // 2)
    top_left_y = int((left_eye_center[1] + right_eye_center[1]) / 2 - sunglass_height // 2)

    overlay_image_alpha(image, rotated_sunglasses, (top_left_y, top_left_x)) 

def overlay_image_alpha(background, overlay, position):
    x, y = position
    h, w = overlay.shape[:2]

    if overlay.shape[2] == 3: 
        for i in range(h):
            for j in range(w):
                if x + i >= background.shape[0] or y + j >= background.shape[1]:
                    continue
                background[x + i, y + j] = overlay[i, j] 
    elif overlay.shape[2] == 4:  
        for i in range(h):
            for j in range(w):
                if x + i >= background.shape[0] or y + j >= background.shape[1]:
                    continue
                alpha = overlay[i, j, 3] / 255.0  
                background[x + i, y + j, :3] = (1 - alpha) * background[x + i, y + j, :3] + alpha * overlay[i, j, :3]
    else:
        print("Unexpected number of channels in overlay image.")

@app.route('/reset-sunglasses', methods=['POST'])
def reset_sunglasses():
    global selected_sunglasses
    selected_sunglasses = None
    return jsonify({"status": "reset"})

def generate_video():
    global selected_sunglasses
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = cascade.detectMultiScale(gray_frame, 1.1, 4)

        for (x, y, w, h) in faces:
            if selected_sunglasses is not None:
                overlay_resize = cv2.resize(selected_sunglasses, (w, int(h * 0.5)))
                frame = cvzone.overlayPNG(frame, overlay_resize, [x, y])

        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n' 
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_video(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
