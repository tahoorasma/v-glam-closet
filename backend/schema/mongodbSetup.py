from pymongo import MongoClient

MONGO_URI = "mongodb+srv://tahoor:12345@vgccluster.vsvyy.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)
db = client["vglamcloset"]  

collection = db["Products"]

if __name__ == "__main__":
    try:
        #collection.insert_many(items)
        collection.delete_many({})
        print("Inserted successfully into the collection!")
    except Exception as e:
        print(f"Error inserting: {e}")


