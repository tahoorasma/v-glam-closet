import cv2
import dlib
import numpy as np
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import time
import logging
import shutil

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads/'
PROCESSED_FOLDER = 'processed/'

try:
    if os.path.exists(UPLOAD_FOLDER):
        shutil.rmtree(UPLOAD_FOLDER)
    os.makedirs(UPLOAD_FOLDER)
    if os.path.exists(PROCESSED_FOLDER):
        shutil.rmtree(PROCESSED_FOLDER)
    os.makedirs(PROCESSED_FOLDER)
except Exception as e:
    logging.error(f"Failed to delete or recreate folder {PROCESSED_FOLDER}. Reason: {e}")

logging.basicConfig(level=logging.DEBUG)

face_detector = dlib.get_frontal_face_detector()
shape_predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

def apply_eyeshadow(image, shade_color, landmarks):
    mask = np.zeros(image.shape[:2], dtype=np.uint8)
    
    left_eye_points = np.array([
        [landmarks[36][0] - 13, landmarks[36][1] - 8],
        [landmarks[37][0] - 6, landmarks[37][1] - 10],
        [landmarks[37][0], landmarks[37][1] - 10],
        [landmarks[38][0] - 2, landmarks[38][1] - 8],
        [landmarks[39][0] + 3, landmarks[39][1] - 6],
        [landmarks[39][0] + 5, landmarks[39][1]],
        [landmarks[39][0], landmarks[39][1] - 5],
        [landmarks[38][0], landmarks[38][1] - 3],
        [landmarks[37][0], landmarks[37][1] - 5], 
        [landmarks[36][0] - 8, landmarks[36][1] - 2],
    ], dtype=np.int32)

    right_eye_points = np.array(
        [[landmarks[45][0] + 13, landmarks[45][1] - 8],
        [landmarks[44][0] + 6, landmarks[44][1] - 10],
        [landmarks[44][0], landmarks[44][1] - 10],
        [landmarks[43][0] + 2, landmarks[43][1] - 8],
        [landmarks[42][0] - 3, landmarks[42][1] - 6],
        [landmarks[42][0] - 5, landmarks[42][1]],
        [landmarks[42][0], landmarks[42][1] - 5],
        [landmarks[43][0], landmarks[43][1] - 3],
        [landmarks[44][0], landmarks[44][1] - 5], 
        [landmarks[45][0] + 8, landmarks[45][1] - 2],
    ], dtype=np.int32)  

    cv2.fillPoly(mask, [left_eye_points], 255)
    cv2.fillPoly(mask, [right_eye_points], 255)

    print("shade color: ",shade_color)
    overlay = np.full_like(image, shade_color, dtype=np.uint8)

    alpha = 0.4
    for c in range(3):
        image[:, :, c] = np.where((mask == 255), 
                                (1 - alpha) * image[:, :, c] + alpha * overlay[:, :, c],
                                image[:, :, c])
        
def apply_glitter_eyeshadow(image, shade_color, landmarks):
    mask = np.zeros(image.shape[:2], dtype=np.uint8)
    
    left_eye_points = np.array([
        [landmarks[36][0] - 13, landmarks[36][1] - 8],
        [landmarks[37][0] - 6, landmarks[37][1] - 10],
        [landmarks[37][0], landmarks[37][1] - 10],
        [landmarks[38][0] - 2, landmarks[38][1] - 8],
        [landmarks[39][0] + 3, landmarks[39][1] - 6],
        [landmarks[39][0] + 5, landmarks[39][1]],
        [landmarks[39][0], landmarks[39][1] - 5],
        [landmarks[38][0], landmarks[38][1] - 3],
        [landmarks[37][0], landmarks[37][1] - 5], 
        [landmarks[36][0] - 8, landmarks[36][1] - 2],
    ], dtype=np.int32)

    right_eye_points = np.array([
        [landmarks[45][0] + 13, landmarks[45][1] - 8],
        [landmarks[44][0] + 6, landmarks[44][1] - 10],
        [landmarks[44][0], landmarks[44][1] - 10],
        [landmarks[43][0] + 2, landmarks[43][1] - 8],
        [landmarks[42][0] - 3, landmarks[42][1] - 6],
        [landmarks[42][0] - 5, landmarks[42][1]],
        [landmarks[42][0], landmarks[42][1] - 5],
        [landmarks[43][0], landmarks[43][1] - 3],
        [landmarks[44][0], landmarks[44][1] - 5], 
        [landmarks[45][0] + 8, landmarks[45][1] - 2],
    ], dtype=np.int32)  

    cv2.fillPoly(mask, [left_eye_points], 255)
    cv2.fillPoly(mask, [right_eye_points], 255)

    print("glitter shade color: ",shade_color)

    overlay = np.full_like(image, shade_color, dtype=np.uint8)
    shimmer_image = cv2.imread('C:/Users/HP/Desktop/v-glam-closet/src/components/images/gold-glitter.png')
    shimmer_image = cv2.resize(shimmer_image, (image.shape[1], image.shape[0]))
    shimmer_image = shimmer_image[:image.shape[0], :image.shape[1]]
    alpha = 0.2
    shimmer_overlay = cv2.addWeighted(shimmer_image, alpha, overlay, 1 - alpha, 0)

    alpha = 0.7
    for c in range(3):
        image[:, :, c] = np.where((mask == 255), 
                                (1 - alpha) * image[:, :, c] + alpha * shimmer_overlay[:, :, c],
                                image[:, :, c])

@app.route('/processed/<path:filename>', methods=['GET'])
def serve_processed(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)

@app.route('/eyeshadow-try-on', methods=['POST'])
def try_on_eyeshadow():
    try:
        if 'image' not in request.files or 'eyeShadow' not in request.form:
            return jsonify({'error': 'No image or eyeshadow selection provided'}), 400

        file = request.files['image']
        shade_color_hex = request.form['eyeShadow']
        glitter = int(request.form['glitter'])

        shade_color = tuple(int(shade_color_hex.lstrip('#')[i:i + 2], 16) for i in (4, 2, 0))

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
                landmarks = np.array([[p.x, p.y] for p in landmarks.parts()])
                print("isglitter:", glitter)
                if glitter == 1:
                    apply_glitter_eyeshadow(user_image, shade_color, landmarks)
                else:
                    apply_eyeshadow(user_image, shade_color, landmarks)

            unique_filename = f'processed_eyeshadow_{int(time.time())}.jpg'
            output_image_path = os.path.join(PROCESSED_FOLDER, unique_filename)
            cv2.imwrite(output_image_path, user_image)
            logging.debug(f"Processed image saved to: {output_image_path}")

            return jsonify({"status": "success", "processed_image_url": f'http://localhost:5000/processed/{unique_filename}'})
        else:
            return jsonify({'error': 'No face detected'}), 400

    except Exception as e:
        logging.error(f"Error processing eyeshadow: {e}")
        return jsonify({"error": "Failed to process eyeshadow"}), 500

if __name__ == '__main__':
    app.run(port=5000)
