from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import cv2
import dlib
import numpy as np
import os
import threading
 
app = Flask(__name__)
CORS(app)
 
selected_jewelry = None
jewelry_lock = threading.Lock() 
 
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
             landmarks = shape_predictor(gray_frame, face)
             with jewelry_lock:
                 if selected_jewelry is not None:
                     apply_jewelry(frame, selected_jewelry, landmarks)
 
         _, buffer = cv2.imencode('.jpg', frame)
         yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
 
@app.route('/video_feed')
def video_feed():
     return Response(generate_video(), mimetype='multipart/x-mixed-replace; boundary=frame')
 
if __name__ == "__main__":
     app.run(host="0.0.0.0", port=5000)