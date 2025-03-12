from flask import Flask, jsonify, request
from flask_cors import CORS
from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)


MONGO_URI = "mongodb+srv://usmara:12345@vgccluster.vsvyy.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)
db = client["vglamcloset"]  
collection = db["Product"]

@app.route('/makeupCatalog', methods=['GET'])
def get_items():
    items = list(collection.find({}, {"_id": 0})) 
    return jsonify(items)
product_collection = db["Product"]
subcategory_collection = db["SubCategory"]

@app.route('/blushProducts', methods=['GET'])
def get_blush_products():
    subcategory = subcategory_collection.find_one({"subCategoryID": "blush"})
    
    if not subcategory:
        return jsonify({"message": "Blush subcategory not found"}), 404

    products = list(product_collection.find({"subCategoryID": "blush"}, {"_id": 0}))  

    return jsonify(products)
@app.route('/lipstickProducts', methods=['GET'])
def get_lipstick_products():
    subcategory = subcategory_collection.find_one({"subCategoryID": "lipstick"})
    
    if not subcategory:
        return jsonify({"message": "Lipstick subcategory not found"}), 404

    products = list(product_collection.find({"subCategoryID": "lipstick"}, {"_id": 0}))  

    return jsonify(products)
@app.route('/foundationProducts', methods=['GET'])
def get_foundation_products():
    subcategory = subcategory_collection.find_one({"subCategoryID": "foundation"})
    
    if not subcategory:
        return jsonify({"message": "Foundation subcategory not found"}), 404

    products = list(product_collection.find({"subCategoryID": "foundation"}, {"_id": 0}))  

    return jsonify(products)
@app.route('/eyeshadowProducts', methods=['GET'])
def get_eyeshadow_products():
    subcategory = subcategory_collection.find_one({"subCategoryID": "eyeshadow"})
    
    if not subcategory:
        return jsonify({"message": "Eyeshadow subcategory not found"}), 404

    products = list(product_collection.find({"subCategoryID": "eyeshadow"}, {"_id": 0}))  

    return jsonify(products)


if __name__ == '__main__':
    app.run(debug=True)