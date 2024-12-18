from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import cv2
import dlib
import numpy as np

app = Flask(__name__)
CORS(app)

predictor_path = 'shape_predictor_68_face_landmarks.dat'
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

lipstick_colors = {
    "1": (20, 25, 170),
    "2": (30, 30, 120),
    "3": (110, 22, 240),
    "4": (30, 30, 180),
    "5": (0, 0, 130),
    "6": (106, 105, 184),
    "7": (14, 22, 139),
    "8": (16, 16, 170),
    "9": (90, 67, 230),
    "10": (40, 10, 150),
}

selected_color = None
def get_lip_landmark(img):
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_detector(gray_img)
    lm_points = []

    for face in faces:
        landmarks = shape_predictor(gray_img, face)
        for n in range(48, 68): 
            x = landmarks.part(n).x
            y = landmarks.part(n).y
            lm_points.append([x, y])
    return lm_points


def coloring_lip(imgOriginal, lmPoints, r, g, b):
    img = imgOriginal.copy()
    poly1 = np.array(lmPoints[:12], np.int32).reshape((-1, 1, 2))
    poly2 = np.array(lmPoints[12:], np.int32).reshape((-1, 1, 2))
    colored = cv2.fillPoly(img, [poly1, poly2], (r, g, b))
    colored = cv2.GaussianBlur(colored, (3, 3), 0)
    cv2.addWeighted(colored, 0.4, imgOriginal, 0.6, 0, colored)
    return colored

@app.route('/select-lipstick', methods=['POST'])
def select_lipstick():
    global selected_color
    data = request.json
    lipstick_index = data.get('index')
    selected_color = lipstick_colors.get(lipstick_index)
    if not selected_color:
        return jsonify({"status": "error", "message": "Invalid lipstick index"}), 400
    print(f"Lipstick color selected: {selected_color}")
    return jsonify({"status": "success", "selected_color": selected_color})


def generate_video():
    global selected_color
    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        frame = cv2.flip(frame, 1)
        if selected_color:
            lm_points = get_lip_landmark(frame)
            if lm_points:
                frame = coloring_lip(frame, lm_points, *selected_color)

        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')


@app.route('/video_feed')
def video_feed():
    return Response(generate_video(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/reset-lipstick', methods=['POST'])
def reset_lipstick():
    global selected_color
    selected_color = None
    print("Lipstick reset.")
    return jsonify({"status": "reset"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
