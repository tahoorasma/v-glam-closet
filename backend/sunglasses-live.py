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

def apply_sunglasses(image, sunglasses, landmarks):
    left_eye_points = landmarks[36:42]
    right_eye_points = landmarks[42:48]
    left_eye_center = np.mean(left_eye_points, axis=0).astype(int)
    right_eye_center = np.mean(right_eye_points, axis=0).astype(int)
    eye_width = np.linalg.norm(right_eye_center - left_eye_center)
    sunglass_width = int(eye_width * 2)
    sunglass_height = int(sunglass_width * sunglasses.shape[0] / sunglasses.shape[1])
    resized_sunglasses = cv2.resize(sunglasses, (sunglass_width, sunglass_height))
    angle = 0
    M = cv2.getRotationMatrix2D((sunglass_width // 2, sunglass_height // 2), angle, 1)
    rotated_sunglasses = cv2.warpAffine(resized_sunglasses, M, (sunglass_width, sunglass_height))
    y_offset = left_eye_center[1] - sunglass_height // 2
    x_offset = left_eye_center[0] - sunglass_width // 4
    y1, y2 = max(0, y_offset), min(image.shape[0], y_offset + sunglass_height)
    x1, x2 = max(0, x_offset), min(image.shape[1], x_offset + sunglass_width)
    sunglasses_alpha = rotated_sunglasses[:, :, 3] / 255.0
    for c in range(3):
        image[y1:y2, x1:x2, c] = (1.0 - sunglasses_alpha) * image[y1:y2, x1:x2, c] + sunglasses_alpha * rotated_sunglasses[:y2 - y1, :x2 - x1, c]
    return image

@app.route('/sunglasses-try-on-live', methods=['POST'])
def sunglasses_try_on_live():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image_file = request.files['image']
    sunglasses_type = request.form.get('sunglasses')
    filename = f"{int(time.time())}.jpg"
    image_path = os.path.join(UPLOAD_FOLDER, filename)
    image_file.save(image_path)
    logging.debug(f"Received frame and saved at {image_path}")
    
    #sunglasses_path = f'C:/Users/HP/Desktop/v-glam-closet/src/components/images/sunglasses/{sunglasses_type}.png'
    sunglasses_path = os.path.join('C:/Users/HP/Desktop/v-glam-closet/src/components/images/sunglasses', f'{sunglasses_type}.png')
    #sunglasses_path = f'sunglasses/{sunglasses_type}.png'
    sunglasses = cv2.imread(sunglasses_path, cv2.IMREAD_UNCHANGED)

    image = cv2.imread(image_path)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_detector(gray_image)

    if len(faces) == 0:
        logging.debug("No face detected in the frame")
        return jsonify({'error': 'No face detected'}), 400

    for face in faces:
        landmarks = shape_predictor(gray_image, face)
        landmarks = np.array([[p.x, p.y] for p in landmarks.parts()])
        image_with_sunglasses = apply_sunglasses(image, sunglasses, landmarks)
        processed_filename = f"processed_{filename}"
        processed_image_path = os.path.join(PROCESSED_FOLDER, processed_filename)
        cv2.imwrite(processed_image_path, image_with_sunglasses)
        logging.debug(f"Processed frame saved at {processed_image_path}")
        return jsonify({
            'processed_image_url': f'http://localhost:5000/processed/{processed_filename}',
            'faces_processed': len(faces)
        })

    return jsonify({'error': 'Could not process image'}), 500

@app.route('/processed/<filename>')
def serve_processed_image(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)

if __name__ == '__main__':
    app.run(port=5000)
