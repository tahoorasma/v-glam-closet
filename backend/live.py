from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import cv2
import dlib
import numpy as np
import os
import threading

app = Flask(__name__)
CORS(app)

# Initialize global variables for all makeup types
selected_foundation = None
selected_lipstick_color = None
selected_eyeshadow = None
selected_sunglasses = None
selected_blush_color = None
selected_jewelry = None

jewelry_lock = threading.Lock() 

# Initialize face detectors and predictors
predictor_path_81 = "shape_predictor_81_face_landmarks.dat"
predictor_path_68 = "shape_predictor_68_face_landmarks.dat"
face_detector = dlib.get_frontal_face_detector()
shape_predictor_81 = dlib.shape_predictor(predictor_path_81)
shape_predictor_68 = dlib.shape_predictor(predictor_path_68)

# Initialize camera
for index in range(3):
    cap = cv2.VideoCapture(index)
    if cap.isOpened():
        print(f"Camera found at index {index}")
        break
else:
    print("Error: Unable to access the camera.")
    cap = None

# Lipstick color definitions
lipstick_colors = {
    "1": (33, 15, 151),  
    "2": (83, 83, 195),  
    "3": (99, 73, 195),  
    "4": (17, 16, 226),  
    "5": (44, 10, 135),  
    "6": (89, 89, 173),  
    "7": (76, 70, 141),  
    "8": (106, 110, 199),  
    "9": (77, 75, 168),  
    "10": (89, 69, 191),  
    "11": (74, 83, 148),  
    "12": (119, 111, 207),  
    "13": (60, 66, 109),  
    "14": (87, 106, 166),  
    "15": (64, 39, 125),  
    "16": (66, 55, 189),  
    "17": (113, 94, 189)
}

# ==================== FOUNDATION FUNCTIONS ====================
def apply_foundation_vto(frame, foundation_color, landmarks):
    mask = np.zeros(frame.shape[:2], dtype=np.uint8)

    face_points = np.concatenate([
        np.array([[landmarks[i][0] + 6, landmarks[i + 1][1] - 4]]) 
        for i in range(8)] + [
        np.array([[landmarks[i][0] - 3, landmarks[i + 1][1] + 4]]) 
        for i in range(9,15)] + [
        np.array([[landmarks[78][0] - 6, landmarks[78][1] + 5]]),
        np.array([[landmarks[79][0] - 6, landmarks[79][1] + 5]]),
        np.array([[landmarks[80][0] + 9, landmarks[80][1] + 3]]),
        landmarks[71:70:-1],
        np.array([[landmarks[76][0] + 8, landmarks[76][1] - 5]]),
        np.array([[landmarks[77][0] + 6, landmarks[77][1]]])
    ], axis=0)

    cv2.fillPoly(mask, [face_points], 255)
    blurred_mask = cv2.GaussianBlur(mask, (51, 51), 0)
    blurred_mask = blurred_mask.astype(np.float32) / 255.0
    overlay = np.full_like(frame, foundation_color, dtype=np.uint8)
    alpha = 0.15
    
    for c in range(3):
        frame[:, :, c] = (1 - blurred_mask * alpha) * frame[:, :, c] + (blurred_mask * alpha) * overlay[:, :, c]
    
    return frame.astype(np.uint8)

@app.route('/select-foundation', methods=['POST'])
def select_foundation():
    global selected_foundation
    data = request.json
    shade_color_hex = data.get('shadeColor', '#000000')
    foundation_color = tuple(int(shade_color_hex.lstrip('#')[i:i + 2], 16) for i in (4, 2, 0))
    selected_foundation = {"shade_color": foundation_color}
    return jsonify({"status": "success", "selected": selected_foundation})

@app.route('/reset-foundation', methods=['POST'])
def reset_foundation():
    global selected_foundation
    selected_foundation = None
    print("Foundation reset.")
    return jsonify({"status": "reset"})

# ==================== LIPSTICK FUNCTIONS ====================
def get_lip_landmark(img):
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_detector(gray_img)
    all_faces_lmPoints = [] 

    for face in faces:
        lmPoints = []  
        landmarks = shape_predictor_68(gray_img, face)
        for n in range(48, 68):  
            x = landmarks.part(n).x
            y = landmarks.part(n).y
            lmPoints.append([x, y])
        all_faces_lmPoints.append(lmPoints)  
    return all_faces_lmPoints

def coloring_lip_live(imgOriginal, all_faces_lmPoints, r, g, b):
    img = imgOriginal.copy()
    for lmPoints in all_faces_lmPoints:
        poly1 = np.array(lmPoints[:12], np.int32).reshape((-1, 1, 2))
        poly2 = np.array(lmPoints[12:], np.int32).reshape((-1, 1, 2))
        colored = cv2.fillPoly(img, [poly1, poly2], (r, g, b))
        colored = cv2.GaussianBlur(colored, (3, 3), 0)
    cv2.addWeighted(colored, 0.4, imgOriginal, 0.6, 0, colored)
    return colored

@app.route('/select-lipstick', methods=['POST'])
def select_lipstick():
    global selected_lipstick_color
    data = request.json
    lipstick_index = data.get('index')
    selected_lipstick_color = lipstick_colors.get(lipstick_index)
    if not selected_lipstick_color:
        return jsonify({"status": "error", "message": "Invalid lipstick index"}), 400
    print(f"Lipstick color selected: {selected_lipstick_color}")
    return jsonify({"status": "success", "selected_lipstick_color": selected_lipstick_color})

@app.route('/reset-lipstick', methods=['POST'])
def reset_lipstick():
    global selected_lipstick_color
    selected_lipstick_color = None
    print("Lipstick reset.")
    return jsonify({"status": "reset"})

# ==================== EYESHADOW FUNCTIONS ====================
def apply_eyeshadow_live(frame, shade_color, landmarks):
    mask = np.zeros(frame.shape[:2], dtype=np.uint8)
    left_eye_width = np.linalg.norm(landmarks[36] - landmarks[39])
    right_eye_width = np.linalg.norm(landmarks[42] - landmarks[45])
    avg_eye_width = (left_eye_width + right_eye_width) / 2
    scale_factor = avg_eye_width / 24
    
    left_eye_points = np.array([
        [landmarks[36][0] - int(10 * scale_factor), landmarks[36][1] - int(4 * scale_factor)],
        [landmarks[37][0] - int(6 * scale_factor), landmarks[37][1] - int(6 * scale_factor)],
        [landmarks[37][0], landmarks[37][1] - int(6 * scale_factor)],
        [landmarks[38][0] + int(2 * scale_factor), landmarks[38][1] - int(4 * scale_factor)],
        [landmarks[39][0] + int(4 * scale_factor), landmarks[39][1]],
        [landmarks[39][0], landmarks[39][1] - int(5 * scale_factor)],
        [landmarks[38][0], landmarks[38][1] - int(3 * scale_factor)],
        [landmarks[37][0], landmarks[37][1] - int(2 * scale_factor)],
        [landmarks[36][0] - int(4 * scale_factor), landmarks[36][1] - int(1 * scale_factor)],
    ], dtype=np.int32)
    
    right_eye_points = np.array([
        [landmarks[45][0] + int(10 * scale_factor), landmarks[45][1] - int(4 * scale_factor)],
        [landmarks[44][0] + int(6 * scale_factor), landmarks[44][1] - int(6 * scale_factor)],
        [landmarks[44][0], landmarks[44][1] - int(6 * scale_factor)],
        [landmarks[43][0] - int(2 * scale_factor), landmarks[43][1] - int(4 * scale_factor)],
        [landmarks[42][0] - int(4 * scale_factor), landmarks[42][1]],
        [landmarks[42][0], landmarks[42][1] - int(5 * scale_factor)],
        [landmarks[43][0], landmarks[43][1] - int(3 * scale_factor)],
        [landmarks[44][0], landmarks[44][1] - int(2 * scale_factor)],
        [landmarks[45][0] + int(4 * scale_factor), landmarks[45][1] - int(1 * scale_factor)],
    ], dtype=np.int32)
    
    cv2.fillPoly(mask, [left_eye_points], 255)
    cv2.fillPoly(mask, [right_eye_points], 255)
    overlay = np.full_like(frame, shade_color, dtype=np.uint8)
    alpha = 0.25
    for c in range(3):
        frame[:, :, c] = np.where(
            mask == 255,
            (1 - alpha) * frame[:, :, c] + alpha * overlay[:, :, c],
            frame[:, :, c]
        )
    return frame

def apply_glitter_eyeshadow_live(image, shade_color, landmarks):
    mask = np.zeros(image.shape[:2], dtype=np.uint8)
    left_eye_width = np.linalg.norm(landmarks[36] - landmarks[39])
    right_eye_width = np.linalg.norm(landmarks[42] - landmarks[45])
    avg_eye_width = (left_eye_width + right_eye_width) / 2
    scale_factor = avg_eye_width / 24
    
    left_eye_points = np.array([
        [landmarks[36][0] - int(10 * scale_factor), landmarks[36][1] - int(4 * scale_factor)],
        [landmarks[37][0] - int(6 * scale_factor), landmarks[37][1] - int(6 * scale_factor)],
        [landmarks[37][0], landmarks[37][1] - int(6 * scale_factor)],
        [landmarks[38][0] + int(2 * scale_factor), landmarks[38][1] - int(4 * scale_factor)],
        [landmarks[39][0] + int(4 * scale_factor), landmarks[39][1]],
        [landmarks[39][0], landmarks[39][1] - int(5 * scale_factor)],
        [landmarks[38][0], landmarks[38][1] - int(3 * scale_factor)],
        [landmarks[37][0], landmarks[37][1] - int(2 * scale_factor)],
        [landmarks[36][0] - int(4 * scale_factor), landmarks[36][1] - int(1 * scale_factor)],
    ], dtype=np.int32)
    
    right_eye_points = np.array([
        [landmarks[45][0] + int(10 * scale_factor), landmarks[45][1] - int(4 * scale_factor)],
        [landmarks[44][0] + int(6 * scale_factor), landmarks[44][1] - int(6 * scale_factor)],
        [landmarks[44][0], landmarks[44][1] - int(6 * scale_factor)],
        [landmarks[43][0] - int(2 * scale_factor), landmarks[43][1] - int(4 * scale_factor)],
        [landmarks[42][0] - int(4 * scale_factor), landmarks[42][1]],
        [landmarks[42][0], landmarks[42][1] - int(5 * scale_factor)],
        [landmarks[43][0], landmarks[43][1] - int(3 * scale_factor)],
        [landmarks[44][0], landmarks[44][1] - int(2 * scale_factor)],
        [landmarks[45][0] + int(4 * scale_factor), landmarks[45][1] - int(1 * scale_factor)],
    ], dtype=np.int32)
    
    cv2.fillPoly(mask, [left_eye_points], 255)
    cv2.fillPoly(mask, [right_eye_points], 255)
    overlay = np.full_like(image, shade_color, dtype=np.uint8)
    shimmer_image = cv2.imread('C:/Users/HP/Desktop/v-glam-closet/src/components/images/gold-glitter.png')
    if shimmer_image is not None:
        shimmer_image = cv2.resize(shimmer_image, (image.shape[1], image.shape[0]))
        shimmer_image = shimmer_image[:image.shape[0], :image.shape[1]]
        shimmer_overlay = cv2.addWeighted(shimmer_image, 0.3, overlay, 0.7, 0)
        alpha = 0.35
        for c in range(3):
            image[:, :, c] = np.where((mask == 255),
                                    (1 - alpha) * image[:, :, c] + alpha * shimmer_overlay[:, :, c],
                                    image[:, :, c])
    return image

def apply_shimmer_eyeshadow_live(image, shade_color, landmarks):
    mask = np.zeros(image.shape[:2], dtype=np.uint8)
    left_eye_width = np.linalg.norm(landmarks[36] - landmarks[39])
    right_eye_width = np.linalg.norm(landmarks[42] - landmarks[45])
    avg_eye_width = (left_eye_width + right_eye_width) / 2
    scale_factor = avg_eye_width / 24
    
    left_eye_points = np.array([
        [landmarks[36][0] - int(10 * scale_factor), landmarks[36][1] - int(4 * scale_factor)],
        [landmarks[37][0] - int(6 * scale_factor), landmarks[37][1] - int(6 * scale_factor)],
        [landmarks[37][0], landmarks[37][1] - int(6 * scale_factor)],
        [landmarks[38][0] + int(2 * scale_factor), landmarks[38][1] - int(4 * scale_factor)],
        [landmarks[39][0] + int(4 * scale_factor), landmarks[39][1]],
        [landmarks[39][0], landmarks[39][1] - int(5 * scale_factor)],
        [landmarks[38][0], landmarks[38][1] - int(3 * scale_factor)],
        [landmarks[37][0], landmarks[37][1] - int(2 * scale_factor)],
        [landmarks[36][0] - int(4 * scale_factor), landmarks[36][1] - int(1 * scale_factor)],
    ], dtype=np.int32)
    
    right_eye_points = np.array([
        [landmarks[45][0] + int(10 * scale_factor), landmarks[45][1] - int(4 * scale_factor)],
        [landmarks[44][0] + int(6 * scale_factor), landmarks[44][1] - int(6 * scale_factor)],
        [landmarks[44][0], landmarks[44][1] - int(6 * scale_factor)],
        [landmarks[43][0] - int(2 * scale_factor), landmarks[43][1] - int(4 * scale_factor)],
        [landmarks[42][0] - int(4 * scale_factor), landmarks[42][1]],
        [landmarks[42][0], landmarks[42][1] - int(5 * scale_factor)],
        [landmarks[43][0], landmarks[43][1] - int(3 * scale_factor)],
        [landmarks[44][0], landmarks[44][1] - int(2 * scale_factor)],
        [landmarks[45][0] + int(4 * scale_factor), landmarks[45][1] - int(1 * scale_factor)],
    ], dtype=np.int32)
    
    cv2.fillPoly(mask, [left_eye_points], 255)
    cv2.fillPoly(mask, [right_eye_points], 255)
    overlay = np.full_like(image, shade_color, dtype=np.uint8)
    shimmer_image = cv2.imread('C:/Users/HP/Desktop/v-glam-closet/src/components/images/silver-glitter.png')
    if shimmer_image is not None:
        shimmer_image = cv2.resize(shimmer_image, (image.shape[1], image.shape[0]))
        shimmer_image = shimmer_image[:image.shape[0], :image.shape[1]]
        shimmer_overlay = cv2.addWeighted(shimmer_image, 0.4, overlay, 0.6, 0)
        alpha = 0.25
        for c in range(3):
            image[:, :, c] = np.where((mask == 255),
                                    (1 - alpha) * image[:, :, c] + alpha * shimmer_overlay[:, :, c],
                                    image[:, :, c])
    return image

@app.route('/select-eyeshadow', methods=['POST'])
def select_eyeshadow():
    global selected_eyeshadow
    data = request.json
    shade_color_hex = data.get('shadeColor', '#000000')
    is_glitter = int(data.get('isGlitter', 0))
    shade_color = tuple(int(shade_color_hex.lstrip('#')[i:i + 2], 16) for i in (4, 2, 0))
    selected_eyeshadow = {"shade_color": shade_color, "is_glitter": is_glitter}
    return jsonify({"status": "success", "selected": selected_eyeshadow})

@app.route('/reset-eyeshadow', methods=['POST'])
def reset_eyeshadow():
    global selected_eyeshadow
    selected_eyeshadow = None
    print("Eyeshadow reset.")
    return jsonify({"status": "reset"})

# ==================== SUNGLASSES FUNCTIONS ====================
def overlay_image_alpha_sg_live(bg, overlay, x, y):
    h, w = overlay.shape[:2]
    if x >= bg.shape[0] or y >= bg.shape[1]:
        return bg
    overlay_area = bg[x:x+h, y:y+w]

    if overlay.shape[2] == 4:
        alpha_mask = overlay[:, :, 3] / 255.0
        for c in range(3):
            overlay_area[:, :, c] = overlay_area[:, :, c] * (1 - alpha_mask) + overlay[:, :, c] * alpha_mask

    bg[x:x+h, y:y+w] = overlay_area
    return bg

def apply_sunglasses_live(frame, sunglasses):
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_detector(gray_frame)

    for face in faces:
        landmarks = shape_predictor_68(gray_frame, face)
        landmarks_array = np.array([[p.x, p.y] for p in landmarks.parts()])

        left_eye = landmarks_array[36:42]
        right_eye = landmarks_array[42:48]

        left_eye_center = np.mean(left_eye, axis=0).astype(int)
        right_eye_center = np.mean(right_eye, axis=0).astype(int)

        eye_width = np.linalg.norm(right_eye_center - left_eye_center)
        sunglass_width = int(eye_width * 2)
        sunglass_height = int(sunglass_width * sunglasses.shape[0] / sunglasses.shape[1])

        resized_sunglasses = cv2.resize(sunglasses, (sunglass_width, sunglass_height), interpolation=cv2.INTER_AREA)

        x = int((left_eye_center[1] + right_eye_center[1]) / 2 - sunglass_height / 2)
        y = int((left_eye_center[0] + right_eye_center[0]) / 2 - sunglass_width / 2)

        frame = overlay_image_alpha_sg_live(frame, resized_sunglasses, x, y)

    return frame

@app.route('/select-sunglasses', methods=['POST'])
def select_sunglasses():
    global selected_sunglasses
    data = request.json
    sunglasses_index = data.get('index')
    sunglasses_path = os.path.join(
        f'C:/Users/HP/Desktop/v-glam-closet/src/components/images/sunglasses/sg-{sunglasses_index}.png')

    selected_sunglasses = cv2.imread(sunglasses_path, cv2.IMREAD_UNCHANGED)

    if selected_sunglasses is None:
        print(f"Error: Sunglasses image not found at {sunglasses_path}.")
        return jsonify({"status": "error", "message": "Sunglasses image not found."}), 404

    print(f"Sunglasses selected: {sunglasses_index}")
    return jsonify({"status": "success", "selected": sunglasses_index})

@app.route('/reset-sunglasses', methods=['POST'])
def reset_sunglasses():
    global selected_sunglasses
    selected_sunglasses = None
    print("Sunglasses reset.")
    return jsonify({"status": "reset"})

# ==================== BLUSH FUNCTIONS ====================
def get_cheek_areas(img):
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_detector(gray_img)
    all_cheek_areas = []
    
    for face in faces:
        landmarks = shape_predictor_68(gray_img, face)
        left_cheek = [
            (landmarks.part(1).x + 15, landmarks.part(1).y),
            (landmarks.part(2).x + 15, landmarks.part(2).y),
            (landmarks.part(31).x, landmarks.part(31).y)
        ]
        right_cheek = [
            (landmarks.part(14).x - 10, landmarks.part(14).y),
            (landmarks.part(15).x - 10, landmarks.part(15).y),
            (landmarks.part(35).x, landmarks.part(35).y)
        ]
        all_cheek_areas.append((left_cheek, right_cheek))
    
    return all_cheek_areas

def apply_blush_live(imgOriginal, all_cheek_areas, color):
    img = imgOriginal.copy()
    mask = np.zeros_like(imgOriginal, dtype=np.uint8)
    for left_cheek, right_cheek in all_cheek_areas:
        left_cheek_np = np.array(left_cheek, np.int32).reshape((-1, 1, 2))
        right_cheek_np = np.array(right_cheek, np.int32).reshape((-1, 1, 2))
        cv2.fillPoly(mask, [left_cheek_np], color)
        cv2.fillPoly(mask, [right_cheek_np], color)
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

# ==================== JEWELRY FUNCTIONS ====================
def overlay_image_alpha(background, overlay, position):
     x, y = position
     h, w = overlay.shape[:2]
     
     for i in range(h):
         for j in range(w):
             if x + i >= background.shape[0] or y + j >= background.shape[1]:
                 continue
             alpha = overlay[i, j, 3] / 255.0  
             background[x + i, y + j, :3] = (1 - alpha) * background[x + i, y + j, :3] + alpha * overlay[i, j, :3]

def apply_jewelry_live(image, jewelry, landmarks):
     if jewelry is None:
         return  
     
     left_ear_lobe = (landmarks.part(5).x, landmarks.part(5).y)  
     right_ear_lobe = (landmarks.part(12).x, landmarks.part(12).y)  
     jewelry_height, jewelry_width = jewelry.shape[:2]
     single_jewelry = jewelry[:, :jewelry_width // 2]  
     single_jewelry_resized = cv2.resize(single_jewelry, (40, 60), interpolation=cv2.INTER_AREA)
     
     overlay_image_alpha(image, single_jewelry_resized, (left_ear_lobe[1] - 60, left_ear_lobe[0] - 43))
     single_jewelry_flipped = cv2.flip(single_jewelry_resized, 1)
     overlay_image_alpha(image, single_jewelry_flipped, (right_ear_lobe[1] - 40, right_ear_lobe[0]-2))

@app.route('/select-jewelry', methods=['POST'])
def select_jewelry():
     global selected_jewelry
     data = request.json
     jewelry_index = data.get('jewelry')
     jewelry_path = os.path.join('C:/Users/HP/Desktop/v-glam-closet/src/components/images/jewelry', f'{jewelry_index}.png')
     
     with jewelry_lock:
         selected_jewelry = cv2.imread(jewelry_path, cv2.IMREAD_UNCHANGED)
 
     if selected_jewelry is None:
         print(f"Error: Jewelry image not found at {jewelry_path}.")
         return jsonify({"status": "error", "message": "Jewelry image not found."}), 404
 
     print(f"Jewelry selected: {jewelry_index}")
     return jsonify({"status": "success", "selected": jewelry_index})
 
@app.route('/reset-jewelry', methods=['POST'])
def reset_jewelry():
     global selected_jewelry
     with jewelry_lock: 
         selected_jewelry = None
     print("Jewelry reset.")
     return jsonify({"status": "reset"})
 
# ==================== VIDEO PROCESSING ====================
def generate_video():
     global selected_jewelry
     while True:
         ret, frame = cap.read()
         if not ret:
             print("Error: Unable to capture video frame.")
             continue
         
         frame = cv2.resize(frame, (640, 480)) 
         frame = cv2.flip(frame, 1)
         gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
         faces = face_detector(gray_frame)
 
         for face in faces:
             landmarks = shape_predictor_68(gray_frame, face)
             with jewelry_lock:
                 if selected_jewelry is not None:
                     apply_jewelry_live(frame, selected_jewelry, landmarks)

def generate_video():
    global selected_foundation, selected_lipstick_color, selected_eyeshadow, selected_sunglasses, selected_blush_color
    
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Unable to capture video frame.")
            continue

        frame = cv2.flip(frame, 1)
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_detector(gray_frame)

        if faces:
            # Apply foundation if selected
            if selected_foundation:
                landmarks = shape_predictor_81(gray_frame, faces[0])
                landmarks_array = np.array([[p.x, p.y] for p in landmarks.parts()])
                frame = apply_foundation_vto(frame, selected_foundation["shade_color"], landmarks_array)

            # Apply eyeshadow if selected
            if selected_eyeshadow:
                landmarks = shape_predictor_68(gray_frame, faces[0])
                landmarks_array = np.array([[p.x, p.y] for p in landmarks.parts()])
                glitter = selected_eyeshadow["is_glitter"]
                
                if glitter == 1:
                    frame = apply_glitter_eyeshadow_live(frame, selected_eyeshadow["shade_color"], landmarks_array)
                elif glitter == 2:
                    frame = apply_shimmer_eyeshadow_live(frame, selected_eyeshadow["shade_color"], landmarks_array)
                else:
                    frame = apply_eyeshadow_live(frame, selected_eyeshadow["shade_color"], landmarks_array)

            # Apply lipstick if selected
            if selected_lipstick_color:
                lm_points = get_lip_landmark(frame)
                if lm_points:
                    frame = coloring_lip_live(frame, lm_points, *selected_lipstick_color)

            # Apply sunglasses if selected
            if selected_sunglasses is not None:
                frame = apply_sunglasses_live(frame, selected_sunglasses)

            # Apply blush if selected
            if selected_blush_color is not None:
                        cheek_areas = get_cheek_areas(frame)
                        if cheek_areas:
                            frame = apply_blush_live(frame, cheek_areas, selected_blush_color)

            # Apply jewelry if selected
            if selected_jewelry is not None:
                for face in faces:
                    landmarks = shape_predictor_68(gray_frame, face)
                with jewelry_lock:
                        apply_jewelry_live(frame, selected_jewelry, landmarks)

        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_video(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)