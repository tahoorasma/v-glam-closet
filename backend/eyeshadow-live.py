from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import cv2
import dlib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

selected_eyeshadow = None
predictor_path = "shape_predictor_68_face_landmarks.dat"
face_detector = dlib.get_frontal_face_detector()
shape_predictor = dlib.shape_predictor(predictor_path)

for index in range(3):
    cap = cv2.VideoCapture(index)
    if cap.isOpened():
        print(f"Camera found at index {index}")
        break
else:
    print("Error: Unable to access the camera.")
    cap = None

def apply_eyeshadow(frame, shade_color, landmarks):
    mask = np.zeros(frame.shape[:2], dtype=np.uint8)

    left_eye_points = np.array([
        [landmarks[36][0] - 10, landmarks[36][1] - 4],
        [landmarks[37][0] - 6, landmarks[37][1] - 6],
        [landmarks[37][0], landmarks[37][1] - 6],
        [landmarks[38][0] + 2, landmarks[38][1] - 4],
        #[landmarks[39][0] + 3, landmarks[39][1] - 6],
        [landmarks[39][0] + 4, landmarks[39][1]],
        [landmarks[39][0], landmarks[39][1] - 5],
        [landmarks[38][0], landmarks[38][1] - 3],
        [landmarks[37][0], landmarks[37][1] - 2],
        [landmarks[36][0] - 4, landmarks[36][1] - 1],
    ], dtype=np.int32)

    right_eye_points = np.array([
        [landmarks[45][0] + 10, landmarks[45][1] - 4],
        [landmarks[44][0] + 6, landmarks[44][1] - 6],
        [landmarks[44][0], landmarks[44][1] - 6],
        [landmarks[43][0] - 2, landmarks[43][1] - 4],
        #[landmarks[42][0] - 3, landmarks[42][1] - 6],
        [landmarks[42][0] - 4, landmarks[42][1]],
        [landmarks[42][0], landmarks[42][1] - 5],
        [landmarks[43][0], landmarks[43][1] - 3],
        [landmarks[44][0], landmarks[44][1] - 2],
        [landmarks[45][0] + 4, landmarks[45][1] - 1],
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


def apply_glitter_eyeshadow(image, shade_color, landmarks):
    mask = np.zeros(image.shape[:2], dtype=np.uint8)
    left_eye_points = np.array([
        [landmarks[36][0] - 10, landmarks[36][1] - 4],
        [landmarks[37][0] - 6, landmarks[37][1] - 6],
        [landmarks[37][0], landmarks[37][1] - 6],
        [landmarks[38][0] + 2, landmarks[38][1] - 4],
        #[landmarks[39][0] + 3, landmarks[39][1] - 6],
        [landmarks[39][0] + 4, landmarks[39][1]],
        [landmarks[39][0], landmarks[39][1] - 5],
        [landmarks[38][0], landmarks[38][1] - 3],
        [landmarks[37][0], landmarks[37][1] - 2],
        [landmarks[36][0] - 4, landmarks[36][1] - 1],
    ], dtype=np.int32)

    right_eye_points = np.array([
        [landmarks[45][0] + 10, landmarks[45][1] - 4],
        [landmarks[44][0] + 6, landmarks[44][1] - 6],
        [landmarks[44][0], landmarks[44][1] - 6],
        [landmarks[43][0] - 2, landmarks[43][1] - 4],
        #[landmarks[42][0] - 3, landmarks[42][1] - 6],
        [landmarks[42][0] - 4, landmarks[42][1]],
        [landmarks[42][0], landmarks[42][1] - 5],
        [landmarks[43][0], landmarks[43][1] - 3],
        [landmarks[44][0], landmarks[44][1] - 2],
        [landmarks[45][0] + 4, landmarks[45][1] - 1],
    ], dtype=np.int32)
    cv2.fillPoly(mask, [left_eye_points], 255)
    cv2.fillPoly(mask, [right_eye_points], 255)
    overlay = np.full_like(image, shade_color, dtype=np.uint8)
    shimmer_image = cv2.imread('C:/Users/HP/Desktop/v-glam-closet/src/components/images/gold-glitter.png')
    shimmer_image = cv2.resize(shimmer_image, (image.shape[1], image.shape[0]))
    shimmer_image = shimmer_image[:image.shape[0], :image.shape[1]]
    shimmer_overlay = cv2.addWeighted(shimmer_image, 0.3, overlay, 0.7, 0)
    alpha = 0.35
    for c in range(3):
        image[:, :, c] = np.where((mask == 255),
                                  (1 - alpha) * image[:, :, c] + alpha * shimmer_overlay[:, :, c],
                                  image[:, :, c])

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

def generate_video():
    global selected_eyeshadow
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Unable to capture video frame.")
            continue

        frame = cv2.flip(frame, 1)
        if selected_eyeshadow:
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_detector(gray_frame)
            glitter = selected_eyeshadow["is_glitter"]
            #print("isglitter:", glitter)

            for face in faces:
                landmarks = shape_predictor(gray_frame, face)
                landmarks_array = np.array([[p.x, p.y] for p in landmarks.parts()])
                if glitter == 1:
                    apply_glitter_eyeshadow(frame, selected_eyeshadow["shade_color"], landmarks_array)
                else:
                    apply_eyeshadow(frame, selected_eyeshadow["shade_color"], landmarks_array)

        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_video(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
