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

blush_colors = {
    "1": (235, 150, 235),  # Soft Lavender Pink
    "2": (200, 120, 200),  # Light Rose Pink
    "3": (230, 120, 150),  # Soft Rosy Red  
    "4": (139, 229, 229),  # Gentle Reddish Peach
    "5": (245, 160, 130),  # Soft Peach
    "6": (250, 190, 160),  # Light Coral Peach
    "7": (255, 160, 170),  # Gentle Coral Pink
    "8": (255, 229, 170),  # Peachy Pink
    "9": (240, 100, 100),  # Warm Rosy Red
    "10": (255, 130, 110), # Soft Warm Orange
    "11": (240, 140, 140)  # Soft Mauve
}

def apply_blush(image, cheek_areas, color):
    mask = np.zeros_like(image, dtype=np.uint8)
    left_cheek = np.array(cheek_areas[0], np.int32).reshape((-1, 1, 2))
    right_cheek = np.array(cheek_areas[1], np.int32).reshape((-1, 1, 2))

    cv2.fillPoly(mask, [left_cheek], color)
    cv2.fillPoly(mask, [right_cheek], color)
    mask = cv2.GaussianBlur(mask, (121, 121), 0)
    blended = cv2.addWeighted(mask, 1.0, image, 1.0, 0)
    return blended

@app.route('/processed/<path:filename>', methods=['GET'])
def serve_processed(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)

@app.route('/apply-blush', methods=['POST'])
def apply_blush_to_image():
    try:
        if 'image' not in request.files or 'blush' not in request.form:
            return jsonify({'error': 'No image or blush selection provided'}), 400

        file = request.files['image']
        blush_choice = request.form['blush']

        if blush_choice not in blush_colors:
            return jsonify({'error': 'Invalid blush choice'}), 400
        
        selected_blush_color = blush_colors[blush_choice]

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

        gray_image = cv2.cvtColor(user_image, cv2.COLOR_BGR2GRAY)
        faces = face_detector(gray_image)

        if len(faces) > 0:
            for face in faces:
                landmarks = shape_predictor(gray_image, face)

                
                left_cheek_area = [(landmarks.part(2).x, landmarks.part(2).y - 13),
                                   (landmarks.part(3).x, landmarks.part(3).y - 13),
                                   (landmarks.part(31).x, landmarks.part(31).y - 13)]
                right_cheek_area = [(landmarks.part(13).x, landmarks.part(13).y - 10),
                                    (landmarks.part(14).x, landmarks.part(14).y - 10),
                                    (landmarks.part(35).x , landmarks.part(35).y - 10)]

               
                user_image = apply_blush(user_image, (left_cheek_area, right_cheek_area), selected_blush_color)

            unique_filename = f'processed_blush_{int(time.time())}.jpg'
            output_image_path = os.path.join(PROCESSED_FOLDER, unique_filename)
            cv2.imwrite(output_image_path, user_image)
            logging.debug(f"Processed image saved to: {output_image_path}")

            return jsonify({"status": "success", "processed_image_url": f'http://localhost:5000/processed/{unique_filename}'})
        else:
            return jsonify({'error': 'No face detected'}), 400

    except Exception as e:
        logging.error(f"Error processing blush: {e}")
        return jsonify({"error": "Failed to apply blush"}), 500

if __name__ == '__main__':
    app.run(port=5000)
