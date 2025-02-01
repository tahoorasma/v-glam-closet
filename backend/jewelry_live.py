import os
import cv2
import dlib
import numpy as np
from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import time
import logging

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

#model = YOLO('C:/Users/hp/Desktop/v-glam-closet/runs/detect/train2/weights/best.pt')
model = None 

def get_model():
    global model
    if model is None:
        model = YOLO('C:/Users/hp/Desktop/v-glam-closet/runs/detect/train2/weights/best.pt')
    return model


cap = cv2.VideoCapture(0) 
selected_jewelry = None

def overlay_image_alpha(background, overlay, position):
    x, y = position
    h, w = overlay.shape[:2]

    for i in range(h):
        for j in range(w):
            if x + i >= background.shape[0] or y + j >= background.shape[1]:
                continue
            alpha = overlay[i, j, 3] / 255.0
            background[x + i, y + j, :3] = (1 - alpha) * background[x + i, y + j, :3] + alpha * overlay[i, j, :3]

@app.route('/reset-jewelry', methods=['POST'])
def reset_jewelry():
    global selected_jewelry
    selected_jewelry = None
    print("Jewelry reset.")
    return jsonify({"status": "reset"})

def apply_jewelry(image, jewelry, earlobe_coords):
    if len(earlobe_coords) < 2:
        return  
    left_ear_lobe = earlobe_coords[0]  
    right_ear_lobe = earlobe_coords[1]  
    jewelry_height, jewelry_width = jewelry.shape[:2]

    left_jewelry = jewelry[:, :jewelry_width // 2]  
    right_jewelry = jewelry[:, jewelry_width // 2:]  

    left_jewelry_resized = cv2.resize(left_jewelry, (40, 80), interpolation=cv2.INTER_AREA)
    right_jewelry_resized = cv2.resize(right_jewelry, (40, 80), interpolation=cv2.INTER_AREA)

    left_position = (int(left_ear_lobe[0]-10), int(left_ear_lobe[1]-27))  
    overlay_image_alpha(image, left_jewelry_resized, left_position)
    right_position = (int(right_ear_lobe[0]-10), int(right_ear_lobe[1]-12)) 
    overlay_image_alpha(image, right_jewelry_resized, right_position)

@app.route('/select-jewelry', methods=['POST'])
def select_jewelry():
    global selected_jewelry
    data = request.json
    jewelry_choice = data.get('jewelry')
    jewelry_path = os.path.join('C:/Users/hp/Desktop/v-glam-closet/src/components/images/jewelry', f'{jewelry_choice}.png')
    
    logging.debug(f"Received request for jewelry: {jewelry_choice}")
    logging.debug(f"Attempting to load jewelry image from: {jewelry_path}")

    if not os.path.exists(jewelry_path):
        logging.error(f"Jewelry image not found at: {jewelry_path}")
        return jsonify({"status": "error", "message": "Failed to load jewelry image."}), 400

    selected_jewelry = cv2.imread(jewelry_path, cv2.IMREAD_UNCHANGED)
    if selected_jewelry is None:
        logging.error("Failed to load jewelry image into OpenCV.")
        return jsonify({"status": "error", "message": "Failed to load jewelry image."}), 400

    return jsonify({"status": "success", "selected_jewelry": jewelry_choice})
"""
def generate_video():
    global selected_jewelry
    frame_count = 0
    prediction_interval = 3  
    while True:
        ret, frame = cap.read()
        if not ret:
            continue
        frame = cv2.resize(frame, (640, 480))
        frame = cv2.flip(frame, 1)

        if frame_count % prediction_interval == 0: 

            results = get_model().predict(source=frame, conf=0.2) 
            earlobe_coords = []
            EARLOBE_CLASS_ID = 0

            for result in results:
                if result.boxes:
                    for box, cls in zip(result.boxes, result.boxes.cls.cpu().numpy()):
                        if int(cls) == EARLOBE_CLASS_ID:
                            coords = box.xyxy[0].cpu().numpy()
                            center_y = int((coords[1] + coords[3]) / 2)
                            center_x = int((coords[0] + coords[2]) / 2)
                            earlobe_coords.append((center_y, center_x))

            if selected_jewelry is not None and len(earlobe_coords) >= 2:
                left_ear = min(earlobe_coords, key=lambda x: x[1])
                right_ear = max(earlobe_coords, key=lambda x: x[1])
                earlobe_coords = [left_ear, right_ear]

                apply_jewelry(frame, selected_jewelry, earlobe_coords)

        frame_count += 1
        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

def generate_video():
    global selected_jewelry
    frame_count = 0
    prediction_interval = 3  
    while True:
        ret, frame = cap.read()
        if not ret:
            continue
        frame = cv2.resize(frame, (640, 480))
        frame = cv2.flip(frame, 1)

        if frame_count % prediction_interval == 0: 

            results = get_model().predict(source=frame, conf=0.2) 
            earlobe_coords = []
            EARLOBE_CLASS_ID = 0

            for result in results:
                if result.boxes:
                    for box, cls in zip(result.boxes, result.boxes.cls.cpu().numpy()):
                        if int(cls) == EARLOBE_CLASS_ID:
                            coords = box.xyxy[0].cpu().numpy()
                            center_y = int((coords[1] + coords[3]) / 2)
                            center_x = int((coords[0] + coords[2]) / 2)
                            earlobe_coords.append((center_y, center_x))

            if selected_jewelry is not None and len(earlobe_coords) >= 2:
                left_ear = min(earlobe_coords, key=lambda x: x[1])
                right_ear = max(earlobe_coords, key=lambda x: x[1])
                earlobe_coords = [left_ear, right_ear]

                apply_jewelry(frame, selected_jewelry, earlobe_coords)

        frame_count += 1
        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

def generate_video():
    global selected_jewelry
    while True:
        ret, frame = cap.read()
        if not ret:
            continue
        frame = cv2.resize(frame, (640, 480))
        frame = cv2.flip(frame, 1)

        results = get_model().predict(source=frame, conf=0.3)
        earlobe_coords = []
        EARLOBE_CLASS_ID = 0

        for result in results:
            if result.boxes:
                for box, cls in zip(result.boxes, result.boxes.cls.cpu().numpy()):
                    if int(cls) == EARLOBE_CLASS_ID:
                        coords = box.xyxy[0].cpu().numpy()
                        center_y = int((coords[1] + coords[3]) / 2)
                        center_x = int((coords[0] + coords[2]) / 2)
                        earlobe_coords.append((center_y, center_x))

        if selected_jewelry is not None and len(earlobe_coords) >= 2:
            left_ear = min(earlobe_coords, key=lambda x: x[1])
            right_ear = max(earlobe_coords, key=lambda x: x[1])
            earlobe_coords = [left_ear, right_ear]

            apply_jewelry(frame, selected_jewelry, earlobe_coords)

        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')


def generate_video():
    global selected_jewelry
    prev_time = 0  # To track the time of the last frame
    fps_limit = 1  # 1 FPS

    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        # Get the current time
        current_time = time.time()
        
        # Process a frame only if 1 second has passed
        if current_time - prev_time >= 1 / fps_limit:
            prev_time = current_time

            # Flip the frame horizontally
            frame = cv2.flip(frame, 1)

            # Detect earlobes using the model
            results = get_model().predict(source=frame, conf=0.2)  # Suppress model output
            earlobe_coords = []
            EARLOBE_CLASS_ID = 0

            for result in results:
                if result.boxes:
                    for box, cls in zip(result.boxes, result.boxes.cls.cpu().numpy()):
                        if int(cls) == EARLOBE_CLASS_ID:
                            coords = box.xyxy[0].cpu().numpy()
                            center_y = int((coords[1] + coords[3]) / 2)
                            center_x = int((coords[0] + coords[2]) / 2)
                            earlobe_coords.append((center_y, center_x))

            if selected_jewelry is not None and len(earlobe_coords) >= 2:
                left_ear = min(earlobe_coords, key=lambda x: x[1])
                right_ear = max(earlobe_coords, key=lambda x: x[1])
                earlobe_coords = [left_ear, right_ear]

                apply_jewelry(frame, selected_jewelry, earlobe_coords)

            _, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
        else:
            time.sleep(0.1)

def generate_video():
    global selected_jewelry
    frame_count = 0
    prediction_interval = 5  # Increased to process fewer frames

    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        frame = cv2.resize(frame, (640, 480))
        frame = cv2.flip(frame, 1)

        if frame_count % prediction_interval == 0:  
            small_frame = cv2.resize(frame, (320, 240))  # Reduce input size
            results = get_model().predict(source=small_frame, conf=0.2)

            earlobe_coords = []
            EARLOBE_CLASS_ID = 0

            for result in results:
                if result.boxes:
                    for box, cls in zip(result.boxes, result.boxes.cls.cpu().numpy()):
                        if int(cls) == EARLOBE_CLASS_ID:
                            coords = box.xyxy[0].cpu().numpy()
                            center_y = int((coords[1] + coords[3]) / 2)
                            center_x = int((coords[0] + coords[2]) / 2)
                            earlobe_coords.append((center_y, center_x))

            if selected_jewelry is not None and len(earlobe_coords) >= 2:
                left_ear = min(earlobe_coords, key=lambda x: x[1])
                right_ear = max(earlobe_coords, key=lambda x: x[1])
                earlobe_coords = [left_ear, right_ear]

                apply_jewelry(frame, selected_jewelry, earlobe_coords)

        frame_count += 1
        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
"""

@app.route('/video_feed')
def video_feed():
    return Response(generate_video(), 
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=False)