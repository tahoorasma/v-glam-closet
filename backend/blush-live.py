from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import dlib

app = Flask(__name__)
CORS(app)

predictor_path = "shape_predictor_68_face_landmarks.dat"
face_detector = dlib.get_frontal_face_detector()
shape_predictor = dlib.shape_predictor(predictor_path)

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
    faces = face_detector(gray_img)
    left_cheek_area = []
    right_cheek_area = []
    for face in faces:
        landmarks = shape_predictor(gray_img, face)
        left_cheek_area = [(landmarks.part(1).x + 15, landmarks.part(1).y),
                                   (landmarks.part(2).x + 15, landmarks.part(2).y),
                                   (landmarks.part(31).x, landmarks.part(31).y)]
        right_cheek_area = [(landmarks.part(14).x - 10, landmarks.part(14).y),
                                    (landmarks.part(15).x - 10, landmarks.part(15).y),
                                    (landmarks.part(35).x , landmarks.part(35).y)]
    return left_cheek_area, right_cheek_area

def apply_blush(imgOriginal, cheek_areas, color):
    img = imgOriginal.copy()
    mask = np.zeros_like(imgOriginal, dtype=np.uint8)
    left_cheek = np.array(cheek_areas[0], np.int32).reshape((-1, 1, 2))
    right_cheek = np.array(cheek_areas[1], np.int32).reshape((-1, 1, 2))
    cv2.fillPoly(mask, [left_cheek], color)
    cv2.fillPoly(mask, [right_cheek], color)
    mask = cv2.GaussianBlur(mask, (101, 101), 0)
    blush_video = cv2.add(imgOriginal, mask)
    return blush_video
    #blended = cv2.addWeighted(mask, 1.0, imgOriginal, 1.0 , 0)
    #return blended

@app.route('/select-blush', methods=['POST'])
def select_blush():
    global selected_blush_color
    data = request.json
    color_choice = data.get('color')
    blush_colors = {
    "1": (110, 105, 220),
    "2": (100, 80, 220),  
    "3": (90, 70, 210),  
    "4": (50, 70, 225), 
    "5": (141, 142, 225),  
    "6": (94, 111, 205),  
    "7": (98, 98, 184),  
    "8": (107, 99, 191), 
    "9": (126, 123, 210), 
    "10": (112, 102, 184),
    "11": (120, 126, 221),
    "12": (94, 106, 200),
    "13": (128, 120, 207),
    "14": (64, 69, 245),
    "15": (134, 127, 242),
    "16": (149, 139, 233),
    "17": (29, 58, 180),
    "18": (135, 78, 254),
    "19": (105, 128, 231)
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

<<<<<<< HEAD
def generate_blush_video():
=======
def generate_original_video():
    while True:
        ret, frame = cap.read()
        if not ret or frame is None:
            print("Error: Failed to capture frame")
            continue
        frame = cv2.flip(frame, 1)
        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

def generate_processed_video():
>>>>>>> 819cf2ab1dd689a491987a52749babbceef3fb9b
    global selected_blush_color
    while True:
        ret, frame = cap.read()
        if not ret or frame is None:
            print("Error: Failed to capture frame")
            continue
        frame = cv2.flip(frame, 1)  
        if selected_blush_color:
            cheek_areas = get_cheek_areas(frame)
            if cheek_areas:
                frame = apply_blush(frame, cheek_areas, selected_blush_color)

        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
<<<<<<< HEAD
def video_feed():
    print("Video feed request received...")
    return Response(generate_blush_video(), 
=======
def original_video_feed():
    return Response(generate_original_video(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/processed_video_feed')
def processed_video_feed():
    return Response(generate_processed_video(),
>>>>>>> 819cf2ab1dd689a491987a52749babbceef3fb9b
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
