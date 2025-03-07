from pymongo import MongoClient

MONGO_URI = "mongodb+srv://tahoor:12345@vgccluster.vsvyy.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)
db = client["vglamcloset"]  

collections = {
    "Category": {
        "categoryID": "string",
        "categoryName": "string"
    },
    "SubCategory": {
        "subCategoryID": "string",
        "subCategoryName": "string",
        "categoryID": "string"
    },
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
    "User": {
        "userID": "string",
        "name": "string",
        "email": "string",
        "address": "string"
    },
    "Cart": {
        "cartID": "string",
        "userID": "string",
        "productID": "string",
        "quantity": "int"
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

product_collection = db["Product"]

products = [
    {
        "productID": "P001",
        "productName": "NARS-Powder Blush 237",
        "description": "",
        "price": 9500.00,
        "quantity": 100,
        "imageLink": "C:\\Users\\HP\\Desktop\\v-glam-closet\\src\\components\\images\\catalog\\blush\\nars-237.png",
        "subCategoryID": "blush",
        "rating": 4.8,
        "sellingCount": 250,
        "accessCount": 500
    },
    {
        "productID": "P002",
        "productName": "NARS-Powder Blush 252",
        "description": "",
        "price": 9500.00,
        "quantity": 150,
        "imageLink": "C:\\Users\\HP\\Desktop\\v-glam-closet\\src\\components\\images\\catalog\\blush\\nars-252.png",
        "subCategoryID": "blush",
        "rating": 4.7,
        "sellingCount": 180,
        "accessCount": 450
    },
    {
        "productID": "P003",
        "productName": "NARS-Powder Blush 775",
        "description": "",
        "price": 9500.00,
        "quantity": 80,
        "imageLink": "C:\\Users\\HP\\Desktop\\v-glam-closet\\src\\components\\images\\catalog\\blush\\nars-775.png",
        "subCategoryID": "blush",
        "rating": 4.6,
        "sellingCount": 200,
        "accessCount": 600
    },
    {
        "productID": "P004",
        "productName": "NARS-Powder Blush 776",
        "description": "",
        "price": 9500.00,
        "quantity": 50,
        "imageLink": "C:\\Users\\HP\\Desktop\\v-glam-closet\\src\\components\\images\\catalog\\blush\\nars-776.png",
        "subCategoryID": "blush",
        "rating": 4.8,
        "sellingCount": 120,
        "accessCount": 300
    },
    {
        "productID": "P005",
        "productName": "NARS-Powder Blush 777",
        "description": "",
        "price": 9500.00,
        "quantity": 60,
        "imageLink": "C:\\Users\\HP\\Desktop\\v-glam-closet\\src\\components\\images\\catalog\\blush\\nars-777.png",
        "subCategoryID": "blush",
        "rating": 4.9,
        "sellingCount": 100,
        "accessCount": 200
    },
    {
        "productID": "P006",
        "productName": "NARS-Powder Blush 778",
        "description": "",
        "price": 9500.00,
        "quantity": 75,
        "imageLink": "C:\\Users\\HP\\Desktop\\v-glam-closet\\src\\components\\images\\catalog\\blush\\nars-778.png",
        "subCategoryID": "blush",
        "rating": 4.7,
        "sellingCount": 140,
        "accessCount": 280
    },
    {
        "productID": "P007",
        "productName": "NARS-Powder Blush 888",
        "description": "",
        "price": 9500.00,
        "quantity": 90,
        "imageLink": "C:\\Users\\HP\\Desktop\\v-glam-closet\\src\\components\\images\\catalog\\blush\\nars-888.png",
        "subCategoryID": "blush",
        "rating": 4.6,
        "sellingCount": 170,
        "accessCount": 350
    },
    {
        "productID": "P008",
        "productName": "NARS-Powder Blush 901",
        "description": "",
        "price": 9500.00,
        "quantity": 40,
        "imageLink": "C:\\Users\\HP\\Desktop\\v-glam-closet\\src\\components\\images\\catalog\\blush\\nars-901.png",
        "subCategoryID": "blush",
        "rating": 4.9,
        "sellingCount": 90,
        "accessCount": 190
    },
    {
        "productID": "P009",
        "productName": "NARS-Powder Blush 902",
        "description": "",
        "price": 9500.00,
        "quantity": 85,
        "imageLink": "C:\\Users\\HP\\Desktop\\v-glam-closet\\src\\components\\images\\catalog\\blush\\nars-902.png",
        "subCategoryID": "blush",
        "rating": 4.8,
        "sellingCount": 130,
        "accessCount": 270
    },
    {
        "productID": "P010",
        "productName": "Rare Beauty-Soft Pinch Liquid Blush-Bliss",
        "description": "",
        "price": 7000.00,
        "quantity": 120,
        "imageLink": "C:\\Users\\HP\\Desktop\\v-glam-closet\\src\\components\\images\\catalog\\blush\\rare-bliss.png",
        "subCategoryID": "blush",
        "rating": 4.5,
        "sellingCount": 160,
        "accessCount": 320
    }
]

if __name__ == "__main__":
    #try:
    #    create_collections()
    #    print("\nAll collections created successfully!")
    #except Exception as e:
    #    print(f"Error creating collections: {e}")
    try:
        product_collection.insert_many(products)
        print("Products inserted successfully into the Product collection!")
    except Exception as e:
        print(f"Error inserting products: {e}")

