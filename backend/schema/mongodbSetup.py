from pymongo import MongoClient

MONGO_URI = "mongodb+srv://usmara:12345@vgccluster.vsvyy.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)
db = client["vglamcloset"]  

collection = db["SubCategory"]

items = [
    {
        "subCategoryID": "blush",
        "subCategoryName": "blush",
        "categoryID": "C001"
    },
    {
        "subCategoryID": "foundation",
        "subCategoryName": "foundation",
        "categoryID": "C001"
    },
    {
        "subCategoryID": "eyeshadow",
        "subCategoryName": "eyeshadow",
        "categoryID": "C001"
    },
    {
        "subCategoryID": "lipstick",
        "subCategoryName": "lipstick",
        "categoryID": "C001"
    },
    {
        "subCategoryID": "jewelry",
        "subCategoryName": "jewelry",
        "categoryID": "C002"
    },
    {
        "subCategoryID": "sunglasses",
        "subCategoryName": "sunglasses",
        "categoryID": "C002"
    }
]

if __name__ == "__main__":
    try:
        collection.insert_many(items)
        print("Inserted successfully into the collection!")
    except Exception as e:
        print(f"Error inserting: {e}")


