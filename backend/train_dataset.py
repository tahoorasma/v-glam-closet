import os
from ultralytics import YOLO

dataset_yaml = 'dataset.yaml'  
train_images = 'C:/Users/hp/Downloads/earDataset/train/images'   
val_images = 'C:/Users/hp/Downloads/earDataset/valid/images'     

with open(dataset_yaml, 'w') as f:
    f.write(f'train: {train_images}\n')
    f.write(f'val: {val_images}\n')
    f.write('nc: 4\n') 
    f.write('names: ["earlobe", "eye", "nose", "wholeear"]\n') 

#model = YOLO('yolov8n.yaml') 
model = YOLO('C:/Users/hp/Desktop/v-glam-closet/runs/detect/train/weights/best.pt') 
#model.train(data=dataset_yaml, epochs=3)

results = model.predict(source='C:/Users/hp/Desktop/v-glam-closet/src/components/images/models/model2.jpg', conf=0.1)  # Lower confidence level

for result in results:
    if result.boxes:
        print("Detections found:", result.boxes.xyxy)  
        result.save(f'C:/Users/hp/Downloads/b_output.jpg')  
    else:
        print("No detections made.")




