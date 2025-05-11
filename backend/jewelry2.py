import os
import cv2
import dlib
import numpy as np
from flask import Flask, request, jsonify, send_from_directory
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

model = YOLO('C:/Users/hp/Desktop/v-glam-closet/runs/detect/train2/weights/best.pt')

def overlay_image_alpha(background, overlay, position):
    x, y = position
    h, w = overlay.shape[:2]

    for i in range(h):
        for j in range(w):
            if x + i >= background.shape[0] or y + j >= background.shape[1]:
                continue
            alpha = overlay[i, j, 3] / 255.0
            background[x + i, y + j, :3] = (1 - alpha) * background[x + i, y + j, :3] + alpha * overlay[i, j, :3]

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
    right_position = (int(right_ear_lobe[0]-10), int(right_ear_lobe[1] -12)) 
    overlay_image_alpha(image, right_jewelry_resized, right_position)

@app.route('/processed/<path:filename>', methods=['GET'])
def serve_processed(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)

@app.route('/jewelry-try-on', methods=['POST'])
def try_on_jewelry():
    try:
        if 'image' not in request.files or 'jewelry' not in request.form:
            return jsonify({'error': 'No image or jewelry selection provided'}), 400

        file = request.files['image']
        jewelry_choice = request.form['jewelry']
        image_path = os.path.join(UPLOAD_FOLDER, 'uploaded_image.jpg')
        file.save(image_path)

        user_image = cv2.imread(image_path)
        jewelry_path = os.path.join('C:/Users/hp/Desktop/v-glam-closet/src/components/images/jewelry', f'{jewelry_choice}.png')
        jewelry_image = cv2.imread(jewelry_path, cv2.IMREAD_UNCHANGED)

        if user_image is None or jewelry_image is None:
            return jsonify({'error': 'Failed to load image or jewelry'}), 500

        results = model.predict(source=image_path, conf=0.3)
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

        if len(earlobe_coords) < 2:
            logging.debug("Insufficient earlobe detections.")
            return jsonify({'error': 'No earlobes detected, jewelry cannot be applied.'}), 400

        left_ear = min(earlobe_coords, key=lambda x: x[1])
        right_ear = max(earlobe_coords, key=lambda x: x[1])
        earlobe_coords = [left_ear, right_ear]

        apply_jewelry(user_image, jewelry_image, earlobe_coords)

        unique_filename = f'processed_{jewelry_choice}_{int(time.time())}.jpg'
        output_image_path = os.path.join(PROCESSED_FOLDER, unique_filename)
        cv2.imwrite(output_image_path, user_image)
        return jsonify({"status": "success", "processed_image_url": f'http://192.168.18.110:5000/processed/{unique_filename}'})

    except Exception as e:
        logging.error(f"Error: {e}")
        return jsonify({"error": "Failed to process jewelry"}), 500


if __name__ == '__main__':
    app.run(port=5000)
