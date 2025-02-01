import os
from ultralytics import YOLO

# Paths for the dataset and configuration
dataset_yaml = 'dataset.yaml'  
train_images = 'C:/Users/hp/Downloads/earDataset/train/images'   
val_images = 'C:/Users/hp/Downloads/earDataset/valid/images'     

# Create dataset.yaml if it doesn't exist
if not os.path.exists(dataset_yaml):
    with open(dataset_yaml, 'w') as f:
        f.write(f'train: {train_images}\n')
        f.write(f'val: {val_images}\n')
        f.write('nc: 4\n') 
        f.write('names: ["earlobe", "eye", "nose", "wholeear"]\n')

# Load the trained model
model = YOLO('C:/Users/hp/Desktop/v-glam-closet/runs/detect/train/weights/best.pt') 

# Train the model (uncomment this section if you want to train again)
model.train(data='dataset.yaml', epochs=20, imgsz=416, batch=16, save_period=-1, patience=5)

# Predict on an image
results = model.predict(source='C:/Users/hp/Desktop/v-glam-closet/src/components/images/models/model2.jpg', conf=0.1)

# Process and save predictions
for result in results:
    if result.boxes:
        print("Detections found:", result.boxes.xyxy)  # Print bounding box coordinates
        result.plot()  # Plot predictions on the image
        result.save(f'C:/Users/hp/Downloads/b_output/')  # Save all results to this folder
    else:
        print("No detections made.")
