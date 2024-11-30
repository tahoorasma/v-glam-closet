from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import cv2
import dlib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

selected_sunglasses = None  
cap = cv2.VideoCapture(0)  

face_detector = dlib.get_frontal_face_detector()
shape_predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

@app.route('/select-sunglasses', methods=['POST'])
def select_sunglasses():
    global selected_sunglasses
    data = request.json
    sunglasses_index = data.get('index')
    sunglasses_path = os.path.join(f'C:/Users/HP/Desktop/v-glam-closet/src/components/images/sunglasses/sg-{sunglasses_index}.png')

    selected_sunglasses = cv2.imread(sunglasses_path, cv2.IMREAD_UNCHANGED)

    if selected_sunglasses is None:
        print(f"Error: Sunglasses image not found at {sunglasses_path}.")
        return jsonify({"status": "error", "message": "Sunglasses image not found."}), 404

    print(f"Sunglasses selected: {sunglasses_index}")
    return jsonify({"status": "success", "selected": sunglasses_index})

def apply_sunglasses(frame, sunglasses):
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_detector(gray_frame)

    for face in faces:
        landmarks = shape_predictor(gray_frame, face)
        landmarks_array = np.array([[p.x, p.y] for p in landmarks.parts()])

        left_eye_center = np.mean(landmarks_array[36:42], axis=0).astype(int)
        right_eye_center = np.mean(landmarks_array[42:48], axis=0).astype(int)

        angle = 0
        # angle = np.degrees(np.arctan2(right_eye_center[1] - left_eye_center[1], 
        #                               right_eye_center[0] - left_eye_center[0]))

        eye_width = np.linalg.norm(right_eye_center - left_eye_center)
        sunglass_width = int(eye_width * 2)
        sunglass_height = int(sunglass_width * sunglasses.shape[0] / sunglasses.shape[1])

        resized_sunglasses = cv2.resize(sunglasses, (sunglass_width, sunglass_height))
        M = cv2.getRotationMatrix2D((sunglass_width // 2, sunglass_height // 2), angle, 1)
        rotated_sunglasses = cv2.warpAffine(resized_sunglasses, M, (sunglass_width, sunglass_height),
                                            flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_TRANSPARENT)

        top_left_x = int((left_eye_center[0] + right_eye_center[0]) / 2 - rotated_sunglasses.shape[1] / 2)
        top_left_y = int(left_eye_center[1] - rotated_sunglasses.shape[0] / 2)

        frame = overlay_image_alpha(frame, rotated_sunglasses, (top_left_y, top_left_x))

    return frame

def overlay_image_alpha(background, overlay, position):
    x, y = position
    h, w = overlay.shape[:2]

    if overlay.shape[2] == 4:  
        for i in range(h):
            for j in range(w):
                if x + i >= background.shape[0] or y + j >= background.shape[1]:
                    continue
                alpha = overlay[i, j, 3] / 255.0  
                background[x + i, y + j, :3] = (1 - alpha) * background[x + i, y + j, :3] + alpha * overlay[i, j, :3]
    return background

@app.route('/reset-sunglasses', methods=['POST'])
def reset_sunglasses():
    global selected_sunglasses
    selected_sunglasses = None
    print("Sunglasses reset.") 
    return jsonify({"status": "reset"})

def generate_video():
    global selected_sunglasses
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Unable to capture video frame.")
            break

        if selected_sunglasses is not None:
            frame = apply_sunglasses(frame, selected_sunglasses)

        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_video(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)