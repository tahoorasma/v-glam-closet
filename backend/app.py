from flask import Flask, jsonify, request
from flask_cors import CORS
from flask import Flask, jsonify
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

MONGO_URI = "mongodb+srv://usmara:12345@vgccluster.vsvyy.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)
db = client["vglamcloset"]  
collection = db["Product"]
orders_collection = db["Order"]
users_collection = db["User"]

@app.route('/blushProducts', methods=['GET'])
def get_blush_products():
    subcategory = db["SubCategory"].find_one({"subCategoryID": "blush"})
    
    if not subcategory:
        return jsonify({"message": "Blush subcategory not found"}), 404

    products = list(db["Product"].find({"subCategoryID": "blush"}, {"_id": 0}).sort("productID", 1))   

    return jsonify(products)
@app.route('/lipstickProducts', methods=['GET'])
def get_lipstick_products():
    subcategory = db["SubCategory"].find_one({"subCategoryID": "lipstick"})
    
    if not subcategory:
        return jsonify({"message": "Lipstick subcategory not found"}), 404

    products = list(db["Product"].find({"subCategoryID": "lipstick"}, {"_id": 0}).sort("productID", 1)) 

    return jsonify(products)
@app.route('/foundationProducts', methods=['GET'])
def get_foundation_products():
    subcategory = db["SubCategory"].find_one({"subCategoryID": "foundation"})
    
    if not subcategory:
        return jsonify({"message": "Foundation subcategory not found"}), 404

    products = list(db["Product"].find({"subCategoryID": "foundation"}, {"_id": 0}).sort("productID", 1)) 

    return jsonify(products)
@app.route('/eyeshadowProducts', methods=['GET'])
def get_eyeshadow_products():
    subcategory = db["SubCategory"].find_one({"subCategoryID": "eyeshadow"})
    
    if not subcategory:
        return jsonify({"message": "Eyeshadow subcategory not found"}), 404

    products = list(db["Product"].find({"subCategoryID": "eyeshadow"}, {"_id": 0}).sort("productID", 1)) 

    return jsonify(products)

@app.route('/makeupCatalog', methods=['GET'])
def get_makeup_products():
    makeup_subcategories = db["SubCategory"].find({"categoryID": "C001"}, {"subCategoryID": 1, "_id": 0})
    makeup_subcategory_ids = [sub["subCategoryID"] for sub in makeup_subcategories]
    makeup_products = list(db["Product"].find({"subCategoryID": {"$in": makeup_subcategory_ids}}, {"_id": 0}).sort("productID", 1)) 
    return jsonify(makeup_products)

@app.route('/accessoryCatalog', methods=['GET'])
def get_accessory_products():
    subcategory = request.args.get('subcategory', 'jewelry') 
    accessory_products = list(db["Product"].find({"subCategoryID": subcategory}, {"_id": 0}).sort("productID", 1)) 
    return jsonify(accessory_products)

@app.route('/getCart', methods=['GET'])
def get_cart():
    user_id = request.args.get("userID")
    if not user_id:
        return jsonify({"message": "Missing userID"}), 400

    cart_items = list(db["Cart"].find({"userID": user_id}, {"_id": 0}))

    for item in cart_items:
        product = db["Product"].find_one({"productID": item["productID"]}, {"_id": 0})
        if product:
            item.update({key: product[key] for key in product if key != "quantity"})

    return jsonify(cart_items), 200

@app.route('/addToCart', methods=['POST'])
def add_to_cart():
    data = request.json
    user_id = data.get("userID")
    product_id = data.get("productID")

    if not user_id or not product_id:
        return jsonify({"message": "Missing userID or productID"}), 400

    existing_item = db["Cart"].find_one({"userID": user_id, "productID": product_id})

    if existing_item:
        db["Cart"].update_one(
            {"_id": existing_item["_id"]}, {"$set": {"quantity": existing_item["quantity"] + 1}}
        )
    else:
        db["Cart"].insert_one({
            "userID": user_id,
            "productID": product_id,
            "quantity": 1
        })

    return jsonify({"message": "Item added to cart successfully"}), 201

@app.route('/updateQuantity', methods=['POST'])
def update_quantity():
    data = request.json
    user_id = data.get("userID")
    product_id = data.get("productID")
    action = data.get("action")

    if not user_id or not product_id or not action:
        return jsonify({"message": "Missing parameters"}), 400

    cart_item = db["Cart"].find_one({"userID": user_id, "productID": product_id})

    if cart_item:
        new_quantity = cart_item["quantity"] + 1 if action == "increase" else max(1, cart_item["quantity"] - 1)

        db["Cart"].update_one(
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

    if not user_id or not product_id:
        return jsonify({"message": "Missing userID or productID"}), 400

    result = db["Cart"].delete_one({"userID": user_id, "productID": product_id})

    if result.deleted_count == 0:
        return jsonify({"message": "Item not found in cart"}), 404

    return jsonify({"message": "Item removed successfully"}), 200

def generate_user_id():
    last_user = users_collection.find_one(sort=[("userID", -1)])
    if last_user:
        last_id = int(last_user["userID"][1:])  # Extract numeric part
        return f"U{last_id + 1:03d}"  # Increment and format
    else:
        return "U001"  # Start with U001 if no users exist

@app.route('/addOrder', methods=['POST', 'OPTIONS'])
def create_order():
    if request.method == "OPTIONS":  # Handle preflight requests
        response = jsonify({'message': 'CORS preflight successful'})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        return response, 200

    data = request.json
    user_data = data.get("userData")
    order_data = data.get("orderData")

    # Validate required fields
    if not user_data or not order_data:
        response = jsonify({"message": "User data and order data are required"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        return response, 400

    # Check if user already exists
    existing_user = users_collection.find_one({"email": user_data["email"]})
    if existing_user:
        user_id = existing_user["userID"]  # Use existing userID
    else:
        # Create new user
        user_id = generate_user_id()
        new_user = {
            "userID": user_id,
            "name": user_data["name"],
            "email": user_data["email"],
            "address": user_data["address"]
        }
        users_collection.insert_one(new_user)

    # Create new order
    new_order = {
        "orderID": str(ObjectId()),  # Generate a unique orderID using ObjectId
        "userID": user_id,  # Use the same userID
        "productID": order_data["productID"],
        "orderDate": datetime.strptime(order_data["orderDate"], "%Y-%m-%d").isoformat(),
        "NoOfItems": order_data["NoOfItems"],
        "amount": order_data["amount"]
    }

    try:
        # Insert the order into the MongoDB collection
        result = orders_collection.insert_one(new_order)
        if result.inserted_id:
            # Convert ObjectId to string for JSON serialization
            new_order["_id"] = str(result.inserted_id)
            response = jsonify({
                "message": "Order placed successfully",
                "order": new_order,
                "userID": user_id  # Return the userID to the frontend
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)