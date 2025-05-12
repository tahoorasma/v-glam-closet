from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import dlib
import cv2

app = Flask(__name__)
CORS(app)

predictor_path_81 = "shape_predictor_81_face_landmarks.dat"
detector = dlib.get_frontal_face_detector()
shape_predictor2 = dlib.shape_predictor(predictor_path_81)

def lighten_color(rgb, factor=0.3):
    """Blend the RGB color with white based on factor (0–1)"""
    white = np.array([255, 255, 255])
    lightened = rgb + factor * (white - rgb)
    return np.clip(lightened, 0, 255).astype(int)

@app.route('/analyze-skintone', methods=['POST'])
def analyze_skintone():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']
    image = Image.open(image_file).convert('RGB')
    img_np = np.array(image)
    gray = cv2.cvtColor(img_np, cv2.COLOR_RGB2GRAY)

    faces = detector(gray)
    if len(faces) == 0:
        return jsonify({'error': 'No face detected'}), 400

    face = faces[0]
    landmarks = shape_predictor2(gray, face)

    left_brow = landmarks.part(21)
    right_brow = landmarks.part(22)
    center_brow = landmarks.part(27)
    offset = 20
    sample_points = [
        (left_brow.x, max(0, left_brow.y - offset)),
        (center_brow.x, max(0, center_brow.y - offset)),
        (right_brow.x, max(0, right_brow.y - offset)),
    ]

    forehead_pixels = []
    for (x, y) in sample_points:
        patch = img_np[y-5:y+5, x-5:x+5]
        if patch.size > 0:
            forehead_pixels.append(patch.reshape(-1, 3))

    if forehead_pixels:
        all_pixels = np.vstack(forehead_pixels)
        avg_color = all_pixels.mean(axis=0)
        lighter_color = lighten_color(avg_color, factor=0.1) 
        hex_color = '#{:02x}{:02x}{:02x}'.format(*lighter_color)
    else:
        hex_color = '#000000'

    print("Detected skin shade:", hex_color)
    return jsonify({'hex_color': hex_color})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
