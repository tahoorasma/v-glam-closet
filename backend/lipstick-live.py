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
    "1": (33, 15, 151),  
    "2": (83, 83, 195),  
    "3": (99, 73, 195),  
    "4": (17, 16, 226),  
    "5": (44, 10, 135),  
    "6": (89, 89, 173),  
    "7": (76, 70, 141),  
    "8": (106, 110, 199),  
    "9": (77, 75, 168),  
    "10": (89, 69, 191),  
    "11": (74, 83, 148),  
    "12": (119, 111, 207),  
    "13": (60, 66, 109),  
    "14": (87, 106, 166),  
    "15": (64, 39, 125),  
    "16": (66, 55, 189),  
    "17": (113, 94, 189)
}

selected_lipstick_color = None
def get_lip_landmark(img):
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_detector(gray_img)
    all_faces_lmPoints = [] 

    for face in faces:
        lmPoints = []  
        landmarks = shape_predictor(gray_img, face)
        for n in range(48, 68):  
            x = landmarks.part(n).x
            y = landmarks.part(n).y
            lmPoints.append([x, y])
        all_faces_lmPoints.append(lmPoints)  
    return all_faces_lmPoints

def coloring_lip_live(imgOriginal, all_faces_lmPoints, r, g, b):
    img = imgOriginal.copy()
    for lmPoints in all_faces_lmPoints:
        poly1 = np.array(lmPoints[:12], np.int32).reshape((-1, 1, 2))
        poly2 = np.array(lmPoints[12:], np.int32).reshape((-1, 1, 2))
        colored = cv2.fillPoly(img, [poly1, poly2], (r, g, b))
        colored = cv2.GaussianBlur(colored, (3, 3), 0)
    cv2.addWeighted(colored, 0.4, imgOriginal, 0.6, 0, colored)
    return colored

@app.route('/select-lipstick', methods=['POST'])
def select_lipstick():
    global selected_lipstick_color
    data = request.json
    lipstick_index = data.get('index')
    selected_lipstick_color = lipstick_colors.get(lipstick_index)
    if not selected_lipstick_color:
        return jsonify({"status": "error", "message": "Invalid lipstick index"}), 400
    print(f"Lipstick color selected: {selected_lipstick_color}")
    return jsonify({"status": "success", "selected_lipstick_color": selected_lipstick_color})


def generate_video():
    global selected_lipstick_color
    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        frame = cv2.flip(frame, 1)
        if selected_lipstick_color:
            lm_points = get_lip_landmark(frame)
            if lm_points:
                frame = coloring_lip_live(frame, lm_points, *selected_lipstick_color)

        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')


@app.route('/video_feed')
def video_feed():
    return Response(generate_video(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/reset-lipstick', methods=['POST'])
def reset_lipstick():
    global selected_lipstick_color
    selected_lipstick_color = None
    print("Lipstick reset.")
    return jsonify({"status": "reset"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
