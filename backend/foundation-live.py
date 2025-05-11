from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import cv2
import dlib
import numpy as np

app = Flask(__name__)
CORS(app)

selected_foundation = None
predictor_path = "shape_predictor_81_face_landmarks.dat"
face_detector = dlib.get_frontal_face_detector()
shape_predictor2 = dlib.shape_predictor(predictor_path)

for index in range(3):
    cap = cv2.VideoCapture(index)
    if cap.isOpened():
        print(f"Camera found at index {index}")
        break
else:
    print("Error: Unable to access the camera.")
    cap = None

def apply_foundation(frame, foundation_color, landmarks):
    mask = np.zeros(frame.shape[:2], dtype=np.uint8)

    face_points = np.concatenate([
    np.array([[landmarks[i][0] + 6, landmarks[i + 1][1] - 4]]) 
    for i in range(8)] + [
    np.array([[landmarks[i][0] - 3, landmarks[i + 1][1] + 4]]) 
    for i in range(9,15)] + [
    np.array([[landmarks[78][0] - 6, landmarks[78][1] + 5]]),
    np.array([[landmarks[79][0] - 6, landmarks[79][1] + 5]]),
    np.array([[landmarks[80][0] + 9, landmarks[80][1] + 3]]),
    landmarks[71:70:-1],
    np.array([[landmarks[76][0] + 8, landmarks[76][1] - 5]]),
    np.array([[landmarks[77][0] + 6, landmarks[77][1]]])
    ], axis=0)

    cv2.fillPoly(mask, [face_points], 255)
    blurred_mask = cv2.GaussianBlur(mask, (51, 51), 0)
    blurred_mask = blurred_mask.astype(np.float32) / 255.0
    overlay = np.full_like(frame, foundation_color, dtype=np.uint8)
    alpha = 0.15
    
    for c in range(3):
        frame[:, :, c] = (1 - blurred_mask * alpha) * frame[:, :, c] + (blurred_mask * alpha) * overlay[:, :, c]
    
    return frame.astype(np.uint8)

@app.route('/select-foundation', methods=['POST'])
def select_foundation():
    global selected_foundation
    data = request.json
    shade_color_hex = data.get('shadeColor', '#000000')
    foundation_color = tuple(int(shade_color_hex.lstrip('#')[i:i + 2], 16) for i in (4, 2, 0))
    selected_foundation = {"shade_color": foundation_color}
    print("shade_color" + selected_foundation)
    return jsonify({"status": "success", "selected": selected_foundation})

@app.route('/reset-foundation', methods=['POST'])
def reset_foundation():
    global selected_foundation
    selected_foundation = None
    print("Foundation reset.")
    return jsonify({"status": "reset"})

def generate_video():
    global selected_foundation
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Unable to capture video frame.")
            continue

        frame = cv2.flip(frame, 1)
        if selected_foundation:
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_detector(gray_frame)

            for face in faces:
                landmarks = shape_predictor2(gray_frame, face)
                landmarks = np.array([[p.x, p.y] for p in landmarks.parts()])
                apply_foundation(frame, selected_foundation["shade_color"], landmarks)

        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_video(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
