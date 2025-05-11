import cv2
import dlib
import numpy as np
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
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


def overlay_image_alpha(background, overlay, position):
    x, y = position
    h, w = overlay.shape[:2]

    for i in range(h):
        for j in range(w):
            if x + i >= background.shape[0] or y + j >= background.shape[1]:
                continue
            alpha = overlay[i, j, 3] / 255.0
            background[x + i, y + j, :3] = (1 - alpha) * background[x + i, y + j, :3] + alpha * overlay[i, j, :3]


def apply_jewelry(image, jewelry, landmarks):
    left_ear_lobe = (landmarks.part(4).x, landmarks.part(4).y)  
    right_ear_lobe = (landmarks.part(13).x, landmarks.part(13).y)  
    jewelry_height, jewelry_width = jewelry.shape[:2]
    single_jewelry = jewelry[:, :jewelry_width // 2]  
    single_jewelry_resized = cv2.resize(single_jewelry, (40, 80), interpolation=cv2.INTER_AREA)
    overlay_image_alpha(image, single_jewelry_resized, (left_ear_lobe[1] - 60, left_ear_lobe[0] - 43))
    single_jewelry_flipped = cv2.flip(single_jewelry_resized, 1)
    overlay_image_alpha(image, single_jewelry_flipped, (right_ear_lobe[1] - 40, right_ear_lobe[0] - 2))


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
        
        if file:
            image_path = os.path.join(UPLOAD_FOLDER, 'uploaded_image.jpg')
            file.save(image_path)
            logging.debug(f"Uploaded image saved to: {image_path}")
        else:
            return jsonify({'error': 'No image uploaded'}), 400

        user_image = cv2.imread(image_path, -1)
        if user_image is None:
            logging.error(f"Error: Could not load user image: {image_path}")
            return jsonify({'error': 'Failed to load user image'}), 500

        jewelry_path = os.path.join('C:/Users/hp/Desktop/v-glam-closet/src/components/images/jewelry', f'{jewelry_choice}.png')  # Provide correct path
        jewelry_image = cv2.imread(jewelry_path, cv2.IMREAD_UNCHANGED)
        if jewelry_image is None:
            logging.error(f"Error: Could not load jewelry image: {jewelry_path}")
            return jsonify({'error': f'Failed to load jewelry image: {jewelry_choice}.png'}), 500
        
        gray_image = cv2.cvtColor(user_image, cv2.COLOR_BGR2GRAY)
        faces = face_detector(gray_image)

        if len(faces) > 0:
            for face in faces:
                landmarks = shape_predictor(gray_image, face)
                apply_jewelry(user_image, jewelry_image, landmarks)

            unique_filename = f'processed_{jewelry_choice}_{int(time.time())}.jpg'
            output_image_path = os.path.join(PROCESSED_FOLDER, unique_filename)
            cv2.imwrite(output_image_path, user_image)
            logging.debug(f"Processed image saved to: {output_image_path}")

            return jsonify({"status": "success", "processed_image_url": f'http://192.168.18.110:5000/processed/{unique_filename}'})
        else:
            return jsonify({'error': 'No face detected'}), 400

    except Exception as e:
        logging.error(f"Error processing jewelry: {e}")
        return jsonify({"error": "Failed to process jewelry"}), 500


if __name__ == '__main__':
    app.run(port=5000)
