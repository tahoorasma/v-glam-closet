from pymongo import MongoClient

MONGO_URI = "mongodb+srv://tahoor:12345@vgccluster.vsvyy.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)
db = client["vglamcloset"]  

collections = {
    "Product": {
        "productID": "string",
        "productName": "string",
        "description": "string",
        "price": "double",
        "quantity": "int",
        "imageLink": "string",
        "subCategoryID": "string",
        "rating": "double",
        "sellingCount": "int",
        "accessCount": "int"
    },
    "Cart": {
        "cartID": "string",
        "userID": "string",
        "productID": "string",
        "quantity": "int"
    }
    ,
    "User": {
        "userID": "string",
        "name": "string",
        "email": "string",
        "address": "string"
    },
    "Category": {
        "categoryID": "string",
        "categoryName": "string"
    },
    "SubCategory": {
        "subCategoryID": "string",
        "subCategoryName": "string",
        "categoryID": "string"
    },
    "Order": {
        "orderID": "string",
        "userID": "string",
        "productID": "string",
        "orderDate": "string",
        "NoOfItems": "int",
        "amount": "double"
    },
    "FrequentlyBoughtItems": {
        "fbtID": "string",
        "productID": "string",
        "fbProductID": "string",
        "count": "int"
    }
}

def create_collections():
    for collection_name, schema in collections.items():
        db.create_collection(collection_name, check_exists=False)
        print(f"Collection '{collection_name}' created successfully!")

if __name__ == "__main__":
    try:
        create_collections()
        print("\nAll collections created successfully!")
    except Exception as e:
        print(f"Error creating collections: {e}")

