from flask import Flask, jsonify, request
from flask_cors import CORS
from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

MONGO_URI = "mongodb+srv://tahoor:12345@vgccluster.vsvyy.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)
db = client["vglamcloset"]  
collection = db["Product"]

@app.route('/makeupCatalog', methods=['GET'])
def get_items():
    makeup_subcategories = db["SubCategory"].find({"categoryID": "C001"}, {"subCategoryID": 1, "_id": 0})
    
    # Extract subCategoryIDs from query result
    makeup_subcategory_ids = [sub["subCategoryID"] for sub in makeup_subcategories]

    # Fetch only products that belong to the retrieved subcategories
    makeup_products = list(db["Product"].find({"subCategoryID": {"$in": makeup_subcategory_ids}}, {"_id": 0}))

    return jsonify(makeup_products)

if __name__ == '__main__':
    app.run(debug=True)