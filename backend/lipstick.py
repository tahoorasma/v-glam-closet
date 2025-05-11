import cv2
import numpy as np
import dlib
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import time
import logging

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads/'
PROCESSED_FOLDER = 'processed/'

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)
logging.basicConfig(level=logging.DEBUG)
face_detector = dlib.get_frontal_face_detector()
shape_predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')
lipstick_colors = {
    "1": (20, 25, 170), 
    "2": (126, 109, 229),  
    "3": (110, 22, 240),  
    "4": (30, 30, 180),  
    "5": (0, 0, 130),  
    "6": (106, 105, 184),     
    "7": (14, 22, 139),   
    "8": (10, 10, 200),    
    "9": (90, 67, 230),   
    "10": (40, 10, 150)
}
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

def coloring_lip(imgOriginal, all_faces_lmPoints, color):
    img = imgOriginal.copy()
    for lmPoints in all_faces_lmPoints: 
        poly1 = np.array(lmPoints[:12], np.int32).reshape((-1, 1, 2))
        poly2 = np.array(lmPoints[12:], np.int32).reshape((-1, 1, 2))
        cv2.fillPoly(img, [poly1, poly2], color)

    img = cv2.GaussianBlur(img, (3, 3), 0)
    cv2.addWeighted(img, 0.4, imgOriginal, 0.6, 0, img)
    return img

@app.route('/processed/<path:filename>', methods=['GET'])
def serve_processed(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)

@app.route('/apply-lipstick', methods=['POST'])
def apply_lipstick_to_image():
    try:
        if 'image' not in request.files or 'lipstick' not in request.form:
            return jsonify({'error': 'No image or lipstick selection provided'}), 400

        file = request.files['image']
        lipstick_key = request.form['lipstick']

        lipstick_color = lipstick_colors.get(lipstick_key)
        if not lipstick_color:
            return jsonify({'error': f"Invalid lipstick key '{lipstick_key}'. Available options: {list(lipstick_colors.keys())}"}), 400

        unique_filename = f'uploaded_{int(time.time())}.jpg'
        uploaded_image_path = os.path.join(UPLOAD_FOLDER, unique_filename)
        file.save(uploaded_image_path)
        logging.debug(f"Uploaded image saved to: {uploaded_image_path}")

        user_image = cv2.imread(uploaded_image_path)
        if user_image is None:
            logging.error("Error: Could not load user image.")
            return jsonify({'error': 'Failed to load user image'}), 500

        lmPoints = get_lip_landmark(user_image)
        if not lmPoints:
            return jsonify({'error': 'No face detected'}), 400

        processed_image = coloring_lip(user_image, lmPoints, lipstick_color)
        processed_filename = f'processed_{int(time.time())}.jpg'
        processed_image_path = os.path.join(PROCESSED_FOLDER, processed_filename)
        cv2.imwrite(processed_image_path, processed_image)
        logging.debug(f"Processed image saved to: {processed_image_path}")
        return jsonify({
            "status": "success",
            "processed_image_url": f'http://localhost:5000/processed/{processed_filename}'
        }), 200

    except Exception as e:
        logging.error(f"Error applying lipstick: {e}")
        return jsonify({"error": "Failed to process lipstick"}), 500

if __name__ == '__main__':
    app.run(port=5000)
