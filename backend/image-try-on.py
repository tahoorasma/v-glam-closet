import cv2
import dlib
import numpy as np
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from ultralytics import YOLO
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
shape_predictor2 = dlib.shape_predictor('shape_predictor_81_face_landmarks.dat')
model = YOLO('C:/Users/hp/Desktop/v-glam-closet/runs/detect/train/weights/best.pt')

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
    shimmer_overlay = cv2.addWeighted(shimmer_image, 0.3, overlay, 0.7, 0)
    alpha = 0.6
    for c in range(3):
        image[:, :, c] = np.where((mask == 255), 
                                (1 - alpha) * image[:, :, c] + alpha * shimmer_overlay[:, :, c],
                                image[:, :, c])
        
def apply_shimmer_eyeshadow(image, shade_color, landmarks):
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
    shimmer_image = cv2.imread('C:/Users/HP/Desktop/v-glam-closet/src/components/images/silver-glitter.png')
    shimmer_image = cv2.resize(shimmer_image, (image.shape[1], image.shape[0]))
    shimmer_image = shimmer_image[:image.shape[0], :image.shape[1]]
    shimmer_overlay = cv2.addWeighted(shimmer_image, 0.4, overlay, 0.6, 0)
    alpha = 0.5
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
                elif glitter == 2:
                    apply_shimmer_eyeshadow(user_image, shade_color, landmarks)
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


def apply_foundation(image, shade_color, landmarks):
    mask = np.zeros(image.shape[:2], dtype=np.uint8)

    face_points = np.concatenate([
    landmarks[0:16],
    landmarks[78:80], 
    np.array([[landmarks[80][0] + 13, landmarks[80][1] - 8]]),
    np.array([[landmarks[71][0] + 13, landmarks[71][1] - 12]]),
    landmarks[71:68],
    np.array([[landmarks[68][0] + 13, landmarks[68][1] - 8]]),
    landmarks[76:77],
    ], axis=0)

    cv2.fillPoly(mask, [face_points], 255)

    print("shade color: ",shade_color)
    overlay = np.full_like(image, shade_color, dtype=np.uint8)

    alpha = 0.15
    for c in range(3): 
        original_pixel_value = image[:, :, c]
        print(f"Original pixel values for channel {c}: {original_pixel_value[0, 0]}")
        image[:, :, c] = np.where(mask == 255, 
                                  (1 - alpha) * image[:, :, c] + alpha * overlay[:, :, c], 
                                  image[:, :, c])

@app.route('/foundation-try-on', methods=['POST'])
def try_on_foundation():
    try:
        if 'image' not in request.files or 'foundation' not in request.form:
            return jsonify({'error': 'No image or foundation selection provided'}), 400

        file = request.files['image']
        shade_color_hex = request.form['foundation']
    
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
                landmarks = shape_predictor2(gray_image, face)
                landmarks = np.array([[p.x, p.y] for p in landmarks.parts()])
                apply_foundation(user_image, shade_color, landmarks)

            unique_filename = f'processed_foundation_{int(time.time())}.jpg'
            output_image_path = os.path.join(PROCESSED_FOLDER, unique_filename)
            cv2.imwrite(output_image_path, user_image)
            logging.debug(f"Processed image saved to: {output_image_path}")

            return jsonify({"status": "success", "processed_image_url": f'http://localhost:5000/processed/{unique_filename}'})
        else:
            return jsonify({'error': 'No face detected'}), 400

    except Exception as e:
        logging.error(f"Error processing foundation: {e}")
        return jsonify({"error": "Failed to process foundation"}), 500
    
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
    lmPoints = []

    for face in faces:
        landmarks = shape_predictor(gray_img, face)
        for n in range(48, 68):  
            x = landmarks.part(n).x
            y = landmarks.part(n).y
            lmPoints.append([x, y])
    return lmPoints

def coloring_lip(imgOriginal, lmPoints, color):
    img = imgOriginal.copy()
    poly1 = np.array(lmPoints[:12], np.int32).reshape((-1, 1, 2))
    poly2 = np.array(lmPoints[12:], np.int32).reshape((-1, 1, 2))
    colored = cv2.fillPoly(img, [poly1, poly2], color)
    colored = cv2.GaussianBlur(colored, (3, 3), 0)
    cv2.addWeighted(colored, 0.4, imgOriginal, 0.6, 0, colored)
    return colored

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
    "10": (99, 97, 175)  
}

def apply_blush(image, cheek_areas, color):
    mask = np.zeros_like(image, dtype=np.uint8)
    left_cheek = np.array(cheek_areas[0], np.int32).reshape((-1, 1, 2))
    right_cheek = np.array(cheek_areas[1], np.int32).reshape((-1, 1, 2))

    cv2.fillPoly(mask, [left_cheek], color)
    cv2.fillPoly(mask, [right_cheek], color)
    mask = cv2.GaussianBlur(mask, (85, 85), 0)
    blended = cv2.add(image, mask)
    #blended = cv2.addWeighted(image, 1, mask, 0.4, 0)
    return blended

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
                left_cheek_area = [(landmarks.part(2).x + 5, landmarks.part(2).y - 13),
                                   (landmarks.part(3).x + 5, landmarks.part(3).y - 13),
                                   (landmarks.part(31).x + 5, landmarks.part(31).y - 13)]
                right_cheek_area = [(landmarks.part(13).x - 5, landmarks.part(13).y - 10),
                                    (landmarks.part(14).x - 5, landmarks.part(14).y - 10),
                                    (landmarks.part(35).x - 5, landmarks.part(35).y - 10)]
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

        results = model.predict(source=image_path, conf=0.1)
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
        return jsonify({"status": "success", "processed_image_url": f'http://localhost:5000/processed/{unique_filename}'})

    except Exception as e:
        logging.error(f"Error: {e}")
        return jsonify({"error": "Failed to process jewelry"}), 500


def apply_sunglasses(image, sunglasses, landmarks):
    left_eye_points = landmarks[36:42]
    right_eye_points = landmarks[42:48]

    left_eye_center = np.mean(left_eye_points, axis=0).astype(int)
    right_eye_center = np.mean(right_eye_points, axis=0).astype(int)

    eye_width = np.linalg.norm(right_eye_center - left_eye_center)

    sunglass_width = int(eye_width * 2)
    sunglass_height = int(sunglass_width * sunglasses.shape[0] / sunglasses.shape[1])
    resized_sunglasses = cv2.resize(sunglasses, (sunglass_width, sunglass_height))

    #angle = 0 
    angle = np.degrees(np.arctan2(right_eye_center[1] - left_eye_center[1],
                                  right_eye_center[0] - left_eye_center[0]))
    M = cv2.getRotationMatrix2D((sunglass_width // 2, sunglass_height // 2), angle, 1)
    rotated_sunglasses = cv2.warpAffine(resized_sunglasses, M, (sunglass_width, sunglass_height))

    top_left_x = int((left_eye_center[0] + right_eye_center[0]) / 2 - sunglass_width // 2)
    top_left_y = int((left_eye_center[1] + right_eye_center[1]) / 2 - sunglass_height // 2)

    overlay_image_alpha(image, rotated_sunglasses, (top_left_y, top_left_x))

def overlay_image_alpha(background, overlay, position):
    x, y = position
    h, w = overlay.shape[:2]

    if overlay.shape[2] == 3: 
        for i in range(h):
            for j in range(w):
                if x + i >= background.shape[0] or y + j >= background.shape[1]:
                    continue
                background[x + i, y + j] = overlay[i, j] 
    elif overlay.shape[2] == 4:  
        for i in range(h):
            for j in range(w):
                if x + i >= background.shape[0] or y + j >= background.shape[1]:
                    continue
                alpha = overlay[i, j, 3] / 255.0  
                background[x + i, y + j, :3] = (1 - alpha) * background[x + i, y + j, :3] + alpha * overlay[i, j, :3]
    else:
        print("Unexpected number of channels in overlay image.")

@app.route('/sunglasses-try-on', methods=['POST'])
def try_on_sunglasses():
    try:
        if 'image' not in request.files or 'sunglasses' not in request.form:
            return jsonify({'error': 'No image or sunglasses selection provided'}), 400

        file = request.files['image']
        sunglasses_choice = request.form['sunglasses']
        
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

        sunglasses_path = os.path.join('C:/Users/HP/Desktop/v-glam-closet/src/components/images/sunglasses', f'{sunglasses_choice}.png')
        sunglasses_image = cv2.imread(sunglasses_path, cv2.IMREAD_UNCHANGED)
        if sunglasses_image is None:
            logging.error(f"Error: Could not load sunglasses image: {sunglasses_path}")
            return jsonify({'error': f'Failed to load sunglasses image: {sunglasses_choice}.png'}), 500
        
        gray_image = cv2.cvtColor(user_image, cv2.COLOR_BGR2GRAY)
        faces = face_detector(gray_image)

        if len(faces) > 0:
            for face in faces:
                landmarks = shape_predictor(gray_image, face)
                landmarks = np.array([[p.x, p.y] for p in landmarks.parts()])
                apply_sunglasses(user_image, sunglasses_image, landmarks)

            unique_filename = f'processed_{sunglasses_choice}_{int(time.time())}.jpg'
            output_image_path = os.path.join(PROCESSED_FOLDER, unique_filename)
            cv2.imwrite(output_image_path, user_image)
            logging.debug(f"Processed image saved to: {output_image_path}")

            return jsonify({"status": "success", "processed_image_url": f'http://localhost:5000/processed/{unique_filename}'})
        else:
            return jsonify({'error': 'No face detected'}), 400

    except Exception as e:
        logging.error(f"Error processing sunglasses: {e}")
        return jsonify({"error": "Failed to process sunglasses"}), 500

if __name__ == '__main__':
    app.run(port=5000)
