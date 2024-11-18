from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import dlib

app = Flask(__name__)
CORS(app)

predictor_path = "shape_predictor_68_face_landmarks.dat"
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(predictor_path)
for index in range(3):
    cap = cv2.VideoCapture(index)
    if cap.isOpened():
        print(f"Camera found at index {index}")
        break
    else:
        print(f"Camera not found at index {index}")
if not cap.isOpened():
    print("Error: Unable to access the camera.")
    cap = None
selected_blush_color = None 

def get_cheek_areas(img):
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = detector(gray_img)
    left_cheek_area = []
    right_cheek_area = []
    for face in faces:
        landmarks = predictor(gray_img, face)
        left_cheek_area = [(landmarks.part(2).x, landmarks.part(2).y - 13), 
                           (landmarks.part(3).x, landmarks.part(3).y - 13), 
                           (landmarks.part(31).x, landmarks.part(31).y - 13)]
        right_cheek_area = [(landmarks.part(13).x, landmarks.part(13).y - 10), 
                            (landmarks.part(14).x, landmarks.part(14).y - 10), 
                            (landmarks.part(35).x , landmarks.part(35).y - 10)]
    return left_cheek_area, right_cheek_area

def apply_blush(imgOriginal, cheek_areas, color):
    img = imgOriginal.copy()
    mask = np.zeros_like(imgOriginal, dtype=np.uint8)

    left_cheek = np.array(cheek_areas[0], np.int32).reshape((-1, 1, 2))
    right_cheek = np.array(cheek_areas[1], np.int32).reshape((-1, 1, 2))

    cv2.fillPoly(mask, [left_cheek], color)
    cv2.fillPoly(mask, [right_cheek], color)
    mask = cv2.GaussianBlur(mask, (121, 121), 0)

    blended = cv2.addWeighted(mask, 1.0, imgOriginal, 1.0, 0)
    return blended

@app.route('/select-blush', methods=['POST'])
def select_blush():
    global selected_blush_color
    data = request.json
    color_choice = data.get('color')
    blush_colors = {
        "1": (220, 110, 220),  # Baby Pink
        "2": (180, 105, 190),  # Light Pink
        "3": (190, 80, 200),   # Red
        "4":(250,167,166,255),
        "5":(245,138,143,255),
        "6":(255,130,136,255),
        "7":(168,77,75,255),
        "8":(239,142,141,255),
        "9":(237,111,94,255),
        "10":(184,98,98,255),
        "11":(191,99,107,255),
        "12":(223,123,126,255),
        "13":(223,123,126,255)
    }
    selected_blush_color = blush_colors.get(color_choice)
    if selected_blush_color is None:
        return jsonify({"status": "error", "message": "Invalid color choice."}), 400

    return jsonify({"status": "success", "selected_color": color_choice})

@app.route('/reset-blush', methods=['POST'])
def reset_blush():
    global selected_blush_color
    selected_blush_color = None
    return jsonify({"status": "reset"})

def generate_video():
    global selected_blush_color
    while True:
        ret, frame = cap.read()
        if not ret or frame is None:
            print("Error: Failed to capture frame")
            continue  
        if frame.ndim != 3 or frame.shape[2] != 3:
            print(f"Error: Invalid frame format. Expected BGR, got {frame.shape}")
            continue

        print(f"Captured frame shape: {frame.shape} dtype: {frame.dtype}")

        try:
            gray_img = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            if gray_img is None:
                print("Error: Gray image conversion failed")
                continue  
        except Exception as e:
            print(f"Error during cvtColor: {e}")
            continue  
        frame = cv2.flip(frame, 1)

        try:
            cheek_areas = get_cheek_areas(frame)
            if selected_blush_color and cheek_areas:
                frame = apply_blush(frame, cheek_areas, selected_blush_color)
        except RuntimeError as e:
            print(f"RuntimeError: {e}")
            continue  
        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        print("Sending frame...")
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
def video_feed():
    print("Video feed request received...")
    return Response(generate_video(), 
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
