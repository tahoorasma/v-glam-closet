import cv2
import dlib
import numpy as np
from flask import Flask, Response, request, jsonify, send_from_directory
from flask_cors import CORS
from ultralytics import YOLO
import os
import time
import logging
import shutil
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId
from bson.json_util import dumps

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

MONGO_URI = "mongodb+srv://tahoor:12345@vgccluster.vsvyy.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)
db = client["vglamcloset"]  
products_collection = db["Products"]
cart_collection = db["Cart"]
orders_collection = db["Orders"]
users_collection = db["User"]

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

selected_eyeshadow = None
selected_lipstick_color = None
selected_sunglasses = None
selected_jewelry = None
selected_foundation = None
selected_blush_color = None 

for index in range(3):
    cap = cv2.VideoCapture(index)
    if cap.isOpened():
        print(f"Camera found at index {index}")
        break
    else:
        print(f"Camera not found at index {index}")
if not cap.isOpened():
    print("Error: Unable to access the camera.")
    cap = None

model = None

def get_model():
    global model
    if model is None:
        model = YOLO('C:/Users/hp/Desktop/v-glam-closet/runs/detect/train2/weights/best.pt')
    return model

@app.route('/blushProducts', methods=['GET'])
def get_blush_products():
    subcategory = db["SubCategory"].find_one({"subCategoryID": "blush"})
    if not subcategory:
        return jsonify({"message": "Blush subcategory not found"}), 404
    products = list(products_collection.find({"subCategoryID": "blush"}, {"_id": 0}).sort("productID", 1))   
    return jsonify(products)

@app.route('/lipstickProducts', methods=['GET'])
def get_lipstick_products():
    subcategory = db["SubCategory"].find_one({"subCategoryID": "lipstick"})
    if not subcategory:
        return jsonify({"message": "Lipstick subcategory not found"}), 404
    products = list(products_collection.find({"subCategoryID": "lipstick"}, {"_id": 0}).sort("productID", 1)) 
    return jsonify(products)

@app.route('/foundationProducts', methods=['GET'])
def get_foundation_products():
    subcategory = db["SubCategory"].find_one({"subCategoryID": "foundation"})
    if not subcategory:
        return jsonify({"message": "Foundation subcategory not found"}), 404
    products = list(products_collection.find({"subCategoryID": "foundation"}, {"_id": 0}).sort("productID", 1)) 
    return jsonify(products)

@app.route('/eyeshadowProducts', methods=['GET'])
def get_eyeshadow_products():
    subcategory = db["SubCategory"].find_one({"subCategoryID": "eyeshadow"})
    if not subcategory:
        return jsonify({"message": "Eyeshadow subcategory not found"}), 404
    products = list(products_collection.find({"subCategoryID": "eyeshadow"}, {"_id": 0}).sort("productID", 1)) 
    return jsonify(products)

@app.route('/makeupCatalog', methods=['GET'])
def get_makeup_products():
    makeup_subcategories = db["SubCategory"].find({"categoryID": "C001"}, {"subCategoryID": 1, "_id": 0})
    makeup_subcategory_ids = [sub["subCategoryID"] for sub in makeup_subcategories]
    makeup_products = list(products_collection.find({"subCategoryID": {"$in": makeup_subcategory_ids}}, {"_id": 0}).sort("productID", 1)) 
    return jsonify(makeup_products)

@app.route('/product/<productID>', methods=['GET'])
def get_product_by_id(productID):
    product = products_collection.find_one({"productID": productID})
    if product:
        return dumps(product), 200
    return jsonify({"error": "Product not found"}), 404

@app.route('/accessoryCatalog', methods=['GET'])
def get_accessory_products():
    subcategory = request.args.get('subcategory', 'jewelry') 
    accessory_products = list(products_collection.find({"subCategoryID": subcategory}, {"_id": 0}).sort("productID", 1)) 
    return jsonify(accessory_products)

@app.route('/getCart', methods=['GET'])
def get_cart():
    user_id = request.args.get("userID")
    if not user_id:
        return jsonify({"message": "Missing userID"}), 400
    cart_items = list(cart_collection.find({"userID": user_id}, {"_id": 0}))
    for item in cart_items:
        product = products_collection.find_one({"productID": item["productID"]}, {"_id": 0})
        if product:
            item.update({key: product[key] for key in product if key != "quantity"})
    return jsonify(cart_items), 200

@app.route('/addToCart', methods=['POST'])
def add_to_cart():
    data = request.json
    user_id = data.get("userID")
    product_id = data.get("productID")
    product_name = data.get("productName")
    if not user_id or not product_id:
        return jsonify({"message": "Missing userID or productID"}), 400
    existing_item = cart_collection.find_one({"userID": user_id, "productID": product_id})
    if existing_item:
        cart_collection.update_one(
            {"_id": existing_item["_id"]}, {"$set": {"quantity": existing_item["quantity"] + 1}}
        )
    else:
        cart_collection.insert_one({
            "userID": user_id,
            "productID": product_id,
            "productName": product_name,
            "quantity": 1
        })
    return jsonify({"message": "Item added to cart successfully"}), 201

@app.route('/updateQuantity', methods=['POST'])
def update_quantity():
    data = request.json
    user_id = data.get("userID")
    product_id = data.get("productID")
    product_name = data.get("productName")
    action = data.get("action")
    if not user_id or not product_id or not action:
        return jsonify({"message": "Missing parameters"}), 400
    cart_item = cart_collection.find_one({"userID": user_id, "productID": product_id})
    if cart_item:
        new_quantity = cart_item["quantity"] + 1 if action == "increase" else max(1, cart_item["quantity"] - 1)
        cart_collection.update_one(
            {"_id": cart_item["_id"]}, 
            {"$set": {"quantity": new_quantity}}
        )
        return jsonify({"message": "Quantity updated", "newQuantity": new_quantity}), 200
    return jsonify({"message": "Item not found in cart"}), 404

@app.route('/removeFromCart', methods=['POST'])
def remove_from_cart():
    data = request.json
    user_id = data.get("userID")
    product_id = data.get("productID")
    product_name = data.get("productName")
    if not user_id or not product_id:
        return jsonify({"message": "Missing userID or productID"}), 400
    result = cart_collection.delete_one({"userID": user_id, "productID": product_id})
    if result.deleted_count == 0:
        return jsonify({"message": "Item not found in cart"}), 404
    return jsonify({"message": "Item removed successfully"}), 200

def generate_user_id():
    last_user = users_collection.find_one(sort=[("userID", -1)])
    if last_user:
        last_id = int(last_user["userID"][1:])  
        return f"U{last_id + 1:03d}" 
    else:
        return "U001" 

@app.route('/addOrder', methods=['POST', 'OPTIONS'])
def create_order():
    if request.method == "OPTIONS": 
        response = jsonify({'message': 'CORS preflight successful'})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        return response, 200
    data = request.json
    user_data = data.get("userData")
    order_data = data.get("orderData")
    user_id = data.get("userID")  
    if not user_data or not order_data:
        response = jsonify({"message": "User data and order data are required"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        return response, 400
    existing_user = users_collection.find_one({"email": user_data["email"]})
    if existing_user:
        user_id = existing_user["userID"]  
    else:
        user_id = generate_user_id()
        new_user = {
            "userID": user_id,
            "name": user_data["name"],
            "email": user_data["email"],
            "address": user_data["address"]
        }
        users_collection.insert_one(new_user)
    new_order = {
        "orderID": str(ObjectId()), 
        "userID": user_id, 
        "productID": order_data["productID"],
        "orderDate": datetime.strptime(order_data["orderDate"], "%Y-%m-%d").isoformat(),
        "NoOfItems": order_data["NoOfItems"],
        "amount": order_data["amount"]
    }
    try:
        result = orders_collection.insert_one(new_order)
        if result.inserted_id:
            cart_collection.delete_many({"userID": user_id})
            new_order["_id"] = str(result.inserted_id)
            response = jsonify({
                "message": "Order placed successfully",
                "order": new_order,
                "userID": user_id  
            })
            response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
            return response, 201
        else:
            response = jsonify({"message": "Failed to place order"})
            response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
            return response, 500
    except Exception as e:
        print(f"Error inserting order into MongoDB: {str(e)}")
        response = jsonify({"message": "Internal server error", "error": str(e)})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        return response, 500

@app.route('/clearCart', methods=['DELETE'])
def clear_cart():
    result = cart_collection.delete_many({})
    if result.deleted_count > 0:
        return jsonify({"message": "Cart cleared successfully"}), 200
    else:
        return jsonify({"message": "Cart is already empty"}), 200

@app.route('/updateInventory', methods=['POST'])
def update_inventory():
    data = request.get_json()
    cart_items = data.get('cartItems', [])
    try:
        for item in cart_items:
            products_collection.update_one(
                {"productID": item["productID"]},
                {"$inc": {"quantity": -item["quantity"]}}
            )
        return jsonify({"message": "Inventory updated successfully"}), 200
    except Exception as error:
        print(f"Error updating inventory: {error}")
        return jsonify({"message": "Failed to update inventory"}), 500

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
    # "1": (166, 167, 250)  
    # "2": (143, 138, 245)  
    # "3": (136, 130, 255)  
    # "4": (75, 77, 168)  
    # "5": (141, 142, 239)  
    # "6": (99, 97, 175)  
    # "7": (98, 98, 184)  
    # "8": (107, 99, 191)  
    # "9": (210, 123, 126)  
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

def apply_blush(image, cheek_areas, color):
    mask = np.zeros_like(image, dtype=np.uint8)
    left_cheek = np.array(cheek_areas[0], np.int32).reshape((-1, 1, 2))
    right_cheek = np.array(cheek_areas[1], np.int32).reshape((-1, 1, 2))

    cv2.fillPoly(mask, [left_cheek], color)
    cv2.fillPoly(mask, [right_cheek], color)
    mask = cv2.GaussianBlur(mask, (65, 65), 0)
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

def get_cheek_areas(img):
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_detector(gray_img)
    left_cheek_area = []
    right_cheek_area = []
    for face in faces:
        landmarks = shape_predictor(gray_img, face)
        left_cheek_area = [(landmarks.part(1).x + 15, landmarks.part(1).y),
                                   (landmarks.part(2).x + 15, landmarks.part(2).y),
                                   (landmarks.part(31).x, landmarks.part(31).y)]
        right_cheek_area = [(landmarks.part(14).x - 10, landmarks.part(14).y),
                                    (landmarks.part(15).x - 10, landmarks.part(15).y),
                                    (landmarks.part(35).x , landmarks.part(35).y)]
    return left_cheek_area, right_cheek_area

def apply_blush(imgOriginal, cheek_areas, color):
    img = imgOriginal.copy()
    mask = np.zeros_like(imgOriginal, dtype=np.uint8)
    left_cheek = np.array(cheek_areas[0], np.int32).reshape((-1, 1, 2))
    right_cheek = np.array(cheek_areas[1], np.int32).reshape((-1, 1, 2))
    cv2.fillPoly(mask, [left_cheek], color)
    cv2.fillPoly(mask, [right_cheek], color)
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

def generate_blush_video():
    global selected_blush_color
    while True:
        ret, frame = cap.read()
        if not ret or frame is None:
            print("Error: Failed to capture frame")
            continue  
        if frame.ndim != 3 or frame.shape[2] != 3:
            print(f"Error: Invalid frame format. Expected BGR, got {frame.shape}")
            continue

        print(f"Captured frame shape: {frame.shape} dtype: {frame.dtype}")

        try:
            gray_img = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            if gray_img is None:
                print("Error: Gray image conversion failed")
                continue  
        except Exception as e:
            print(f"Error during cvtColor: {e}")
            continue  
        frame = cv2.flip(frame, 1)

        try:
            cheek_areas = get_cheek_areas(frame)
            if selected_blush_color and cheek_areas:
                frame = apply_blush(frame, cheek_areas, selected_blush_color)
        except RuntimeError as e:
            print(f"RuntimeError: {e}")
            continue  
        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        print("Sending frame...")
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

def apply_eyeshadow(frame, shade_color, landmarks):
    mask = np.zeros(frame.shape[:2], dtype=np.uint8)
    left_eye_width = np.linalg.norm(landmarks[36] - landmarks[39])
    right_eye_width = np.linalg.norm(landmarks[42] - landmarks[45])
    avg_eye_width = (left_eye_width + right_eye_width) / 2
    scale_factor = avg_eye_width / 24
    # scale_factor = 1
    left_eye_points = np.array([
        [landmarks[36][0] - int(10 * scale_factor), landmarks[36][1] - int(4 * scale_factor)],
        [landmarks[37][0] - int(6 * scale_factor), landmarks[37][1] - int(6 * scale_factor)],
        [landmarks[37][0], landmarks[37][1] - int(6 * scale_factor)],
        [landmarks[38][0] + int(2 * scale_factor), landmarks[38][1] - int(4 * scale_factor)],
        #[landmarks[39][0] + 3, landmarks[39][1] - 6],
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
        #[landmarks[42][0] - 3, landmarks[42][1] - 6],
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

def apply_glitter_eyeshadow(image, shade_color, landmarks):
    mask = np.zeros(image.shape[:2], dtype=np.uint8)
    left_eye_width = np.linalg.norm(landmarks[36] - landmarks[39])
    right_eye_width = np.linalg.norm(landmarks[42] - landmarks[45])
    avg_eye_width = (left_eye_width + right_eye_width) / 2
    scale_factor = avg_eye_width / 24
    # scale_factor = 1
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
    shimmer_image = cv2.resize(shimmer_image, (image.shape[1], image.shape[0]))
    shimmer_image = shimmer_image[:image.shape[0], :image.shape[1]]
    shimmer_overlay = cv2.addWeighted(shimmer_image, 0.3, overlay, 0.7, 0)
    alpha = 0.35
    for c in range(3):
        image[:, :, c] = np.where((mask == 255),
                                  (1 - alpha) * image[:, :, c] + alpha * shimmer_overlay[:, :, c],
                                  image[:, :, c])
        
def apply_shimmer_eyeshadow(image, shade_color, landmarks):
    mask = np.zeros(image.shape[:2], dtype=np.uint8)
    left_eye_width = np.linalg.norm(landmarks[36] - landmarks[39])
    right_eye_width = np.linalg.norm(landmarks[42] - landmarks[45])
    avg_eye_width = (left_eye_width + right_eye_width) / 2
    scale_factor = avg_eye_width / 24
    # scale_factor = 1
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
    shimmer_image = cv2.resize(shimmer_image, (image.shape[1], image.shape[0]))
    shimmer_image = shimmer_image[:image.shape[0], :image.shape[1]]
    shimmer_overlay = cv2.addWeighted(shimmer_image, 0.4, overlay, 0.6, 0)
    alpha = 0.25
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

def generate_eyeshadow_video():
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

            for face in faces:
                landmarks = shape_predictor(gray_frame, face)
                landmarks_array = np.array([[p.x, p.y] for p in landmarks.parts()])
                #print("isglitter:", glitter)
                if glitter == 1:
                    apply_glitter_eyeshadow(frame, selected_eyeshadow["shade_color"], landmarks_array)
                elif glitter == 2:
                    apply_shimmer_eyeshadow(frame, selected_eyeshadow["shade_color"], landmarks_array)
                else:
                    apply_eyeshadow(frame, selected_eyeshadow["shade_color"], landmarks_array)

        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

def apply_foundation(frame, foundation_color, landmarks):
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

    overlay = np.full_like(frame, foundation_color, dtype=np.uint8)
    alpha = 0.15
    for c in range(3):
        frame[:, :, c] = np.where(
            mask == 255,
            (1 - alpha) * frame[:, :, c] + alpha * overlay[:, :, c],
            frame[:, :, c]
        )
    return frame

@app.route('/select-foundation', methods=['POST'])
def select_foundation():
    global selected_foundation
    data = request.json
    shade_color_hex = data.get('shadeColor', '#000000')
    foundation_color = tuple(int(shade_color_hex.lstrip('#')[i:i + 2], 16) for i in (4, 2, 0))
    selected_foundation = {"shade_color": foundation_color}
    print("shade_color" + selected_foundation)
    return jsonify({"status": "success", "selected": selected_foundation})

@app.route('/reset-foundation', methods=['POST'])
def reset_foundation():
    global selected_foundation
    selected_foundation = None
    print("Foundation reset.")
    return jsonify({"status": "reset"})

def generate_foundation_video():
    global selected_foundation
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Unable to capture video frame.")
            continue

        frame = cv2.flip(frame, 1)
        if selected_foundation:
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_detector(gray_frame)

            for face in faces:
                landmarks = shape_predictor2(gray_frame, face)
                landmarks = np.array([[p.x, p.y] for p in landmarks.parts()])
                apply_foundation(frame, selected_foundation["shade_color"], landmarks)

        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

def overlay_image_alpha(background, overlay, position):
    x, y = position
    h, w = overlay.shape[:2]

    for i in range(h):
        for j in range(w):
            if x + i >= background.shape[0] or y + j >= background.shape[1]:
                continue
            alpha = overlay[i, j, 3] / 255.0
            background[x + i, y + j, :3] = (1 - alpha) * background[x + i, y + j, :3] + alpha * overlay[i, j, :3]

@app.route('/reset-jewelry', methods=['POST'])
def reset_jewelry():
    global selected_jewelry
    selected_jewelry = None
    print("Jewelry reset.")
    return jsonify({"status": "reset"})

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
    right_position = (int(right_ear_lobe[0]-10), int(right_ear_lobe[1]-12)) 
    overlay_image_alpha(image, right_jewelry_resized, right_position)

@app.route('/select-jewelry', methods=['POST'])
def select_jewelry():
    global selected_jewelry
    data = request.json
    jewelry_choice = data.get('jewelry')
    jewelry_path = os.path.join('C:/Users/hp/Desktop/v-glam-closet/src/components/images/jewelry', f'{jewelry_choice}.png')
    
    logging.debug(f"Received request for jewelry: {jewelry_choice}")
    logging.debug(f"Attempting to load jewelry image from: {jewelry_path}")

    if not os.path.exists(jewelry_path):
        logging.error(f"Jewelry image not found at: {jewelry_path}")
        return jsonify({"status": "error", "message": "Failed to load jewelry image."}), 400

    selected_jewelry = cv2.imread(jewelry_path, cv2.IMREAD_UNCHANGED)
    if selected_jewelry is None:
        logging.error("Failed to load jewelry image into OpenCV.")
        return jsonify({"status": "error", "message": "Failed to load jewelry image."}), 400

    return jsonify({"status": "success", "selected_jewelry": jewelry_choice})
def generate_jewelry_video():
    global selected_jewelry
    frame_count = 0
    prediction_interval = 3  
    while True:
        ret, frame = cap.read()
        if not ret:
            continue
        frame = cv2.resize(frame, (640, 480))
        frame = cv2.flip(frame, 1)

        if frame_count % prediction_interval == 0: 

            results = get_model().predict(source=frame, conf=0.2) 
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

            if selected_jewelry is not None and len(earlobe_coords) >= 2:
                left_ear = min(earlobe_coords, key=lambda x: x[1])
                right_ear = max(earlobe_coords, key=lambda x: x[1])
                earlobe_coords = [left_ear, right_ear]

                apply_jewelry(frame, selected_jewelry, earlobe_coords)

        frame_count += 1
        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

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

def generate_lipstick_video():
    global selected_lipstick_color
    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        frame = cv2.flip(frame, 1)
        if selected_lipstick_color:
            lm_points = get_lip_landmark(frame)
            if lm_points:
                frame = coloring_lip_live(frame, lm_points, *selected_lipstick_color)

        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

@app.route('/reset-lipstick', methods=['POST'])
def reset_lipstick():
    global selected_lipstick_color
    selected_lipstick_color = None
    print("Lipstick reset.")
    return jsonify({"status": "reset"})

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

def overlay_image_alpha(bg, overlay, x, y):
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

def apply_sunglasses(frame, sunglasses):
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_detector(gray_frame)

    for face in faces:
        landmarks = shape_predictor(gray_frame, face)
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

        frame = overlay_image_alpha(frame, resized_sunglasses, x, y)

    return frame

@app.route('/reset-sunglasses', methods=['POST'])
def reset_sunglasses():
    global selected_sunglasses
    selected_sunglasses = None
    print("Sunglasses reset.")
    return jsonify({"status": "reset"})

def generate_sunglasses_video():
    global selected_sunglasses
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Unable to capture video frame.")
            generate_sunglasses_video()
            continue

        frame = cv2.flip(frame, 1)
        if selected_sunglasses is not None:
            frame = apply_sunglasses(frame, selected_sunglasses)

        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

def generate_video():
    global selected_blush_color
    global selected_eyeshadow
    global selected_foundation
    global selected_jewelry
    global selected_lipstick_color
    global selected_sunglasses
    
    frame_count = 0
    prediction_interval = 3
    
    while True:
        ret, frame = cap.read()
        if not ret or frame is None:
            print("Error: Failed to capture frame")
            continue
        if frame is not None and (frame.ndim != 3 or frame.shape[2] != 3):
            print(f"Error: Invalid frame format. Expected BGR, got {frame.shape}")
            continue
            
        print(f"Captured frame shape: {frame.shape} dtype: {frame.dtype}")
        if selected_jewelry is not None:
            frame = cv2.resize(frame, (640, 480))
        frame = cv2.flip(frame, 1)
        
        if selected_blush_color:
            try:
                gray_img = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                if gray_img is None:
                    print("Error: Gray image conversion failed")
                    continue
                    
                cheek_areas = get_cheek_areas(frame)
                if cheek_areas:
                    frame = apply_blush(frame, cheek_areas, selected_blush_color)
            except RuntimeError as e:
                print(f"RuntimeError: {e}")
                continue
            except Exception as e:
                print(f"Error during cvtColor: {e}")
                continue
        if selected_eyeshadow:
            try:
                gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                faces = face_detector(gray_frame)
                glitter = selected_eyeshadow["is_glitter"]

                for face in faces:
                    landmarks = shape_predictor(gray_frame, face)
                    landmarks_array = np.array([[p.x, p.y] for p in landmarks.parts()])
                    #print("isglitter:", glitter)
                    if glitter == 1:
                        apply_glitter_eyeshadow(frame, selected_eyeshadow["shade_color"], landmarks_array)
                    elif glitter == 2:
                        apply_shimmer_eyeshadow(frame, selected_eyeshadow["shade_color"], landmarks_array)
                    else:
                        apply_eyeshadow(frame, selected_eyeshadow["shade_color"], landmarks_array)
            except Exception as e:
                print(f"Error applying eyeshadow: {e}")
                continue
        if selected_foundation:
            try:
                gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                faces = face_detector(gray_frame)

                for face in faces:
                    landmarks = shape_predictor2(gray_frame, face)
                    landmarks = np.array([[p.x, p.y] for p in landmarks.parts()])
                    apply_foundation(frame, selected_foundation["shade_color"], landmarks)
            except Exception as e:
                print(f"Error applying foundation: {e}")
                continue
        if selected_jewelry is not None:
            if frame_count % prediction_interval == 0:
                try:
                    results = get_model().predict(source=frame, conf=0.2)
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

                    if len(earlobe_coords) >= 2:
                        left_ear = min(earlobe_coords, key=lambda x: x[1])
                        right_ear = max(earlobe_coords, key=lambda x: x[1])
                        earlobe_coords = [left_ear, right_ear]

                        apply_jewelry(frame, selected_jewelry, earlobe_coords)
                except Exception as e:
                    print(f"Error applying jewelry: {e}")
            
            frame_count += 1
        if selected_lipstick_color:
            try:
                lm_points = get_lip_landmark(frame)
                if lm_points:
                    frame = coloring_lip_live(frame, lm_points, *selected_lipstick_color)
            except Exception as e:
                print(f"Error applying lipstick: {e}")
                continue
        if selected_sunglasses is not None:
            try:
                frame = apply_sunglasses(frame, selected_sunglasses)
            except Exception as e:
                print(f"Error applying sunglasses: {e}")
                continue
        try:
            _, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()
            print("Sending frame...")
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
        except Exception as e:
            print(f"Error encoding frame: {e}")
            continue

@app.route('/video_feed')
def video_feed():
    return Response(generate_video(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(port=5000)
