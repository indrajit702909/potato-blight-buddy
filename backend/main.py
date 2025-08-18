from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from PIL import Image
import numpy as np
import io
import tensorflow as tf
from typing import List, Dict

app = FastAPI(title="Potato Disease Detection API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variable to store the model
model = None

def load_model():
    """Load the trained model. Replace with your actual model loading logic."""
    global model
    try:
        # Replace with your actual model path
        # model = tf.keras.models.load_model('path/to/your/model.h5')
        print("Model loading placeholder - implement your model loading logic here")
        return True
    except Exception as e:
        print(f"Error loading model: {e}")
        return False

@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    success = load_model()
    if not success:
        print("Warning: Model not loaded. Using mock predictions.")

@app.get("/")
async def root():
    return {"message": "Potato Disease Detection API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

def preprocess_image(image: Image.Image) -> np.ndarray:
    """Preprocess the image for model prediction"""
    # Resize image to model input size (adjust as needed)
    image = image.resize((224, 224))
    
    # Convert to RGB if not already
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Convert to numpy array and normalize
    image_array = np.array(image)
    image_array = image_array / 255.0
    
    # Add batch dimension
    image_array = np.expand_dims(image_array, axis=0)
    
    return image_array

def predict_disease(image_array: np.ndarray) -> List[Dict]:
    """Make prediction using the loaded model"""
    global model
    
    # Mock predictions for demonstration
    # Replace this with your actual model prediction logic
    mock_predictions = [
        {
            "name": "Late Blight",
            "confidence": 87,
            "severity": "high",
            "description": "Late blight is caused by the fungus-like organism Phytophthora infestans. It appears as dark, water-soaked lesions on leaves that can quickly spread and destroy the entire plant.",
            "treatment": "Apply fungicide immediately, improve air circulation, and remove infected plant material. Consider copper-based treatments for organic management."
        },
        {
            "name": "Early Blight",
            "confidence": 23,
            "severity": "medium",
            "description": "Early blight is caused by Alternaria solani and creates dark spots with concentric rings on older leaves.",
            "treatment": "Use preventive fungicide sprays and ensure proper plant spacing for air circulation."
        },
        {
            "name": "Healthy",
            "confidence": 12,
            "severity": "low",
            "description": "The leaf appears to be healthy with no visible signs of disease.",
            "treatment": "Continue current care practices and monitor regularly for any changes."
        }
    ]
    
    # If you have a real model, use this instead:
    # if model:
    #     predictions = model.predict(image_array)
    #     # Process predictions and return formatted results
    #     # You'll need to implement this based on your model's output format
    
    return mock_predictions

@app.post("/predict")
async def predict_potato_disease(file: UploadFile = File(...)):
    """
    Predict potato disease from uploaded image
    """
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read and process image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Preprocess image
        processed_image = preprocess_image(image)
        
        # Make prediction
        predictions = predict_disease(processed_image)
        
        return JSONResponse(content=predictions)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)