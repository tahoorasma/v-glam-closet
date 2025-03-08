from pymongo import MongoClient

MONGO_URI = "mongodb+srv://tahoor:12345@vgccluster.vsvyy.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)
db = client["vglamcloset"]  

product_collection = db["Product"]

products = [
    
]

if __name__ == "__main__":
    try:
        product_collection.insert_many(products)
        print("Products inserted successfully into the Product collection!")
    except Exception as e:
        print(f"Error inserting products: {e}")


