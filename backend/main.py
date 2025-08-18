from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
from tensorflow.keras.models import load_model  # Using tf.keras to match installed TensorFlow

# -------------------------------
# CONFIG
# -------------------------------
MODEL_PATH = "../potatoes.h5"  # Relative path from backend/main.py
CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]

# -------------------------------
# FASTAPI APP INIT
# -------------------------------
app = FastAPI()

# CORS Settings
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",  # Vite dev server
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# LOAD MODEL
# -------------------------------
print("Loading model...")
MODEL = load_model(MODEL_PATH, compile=False)
print("✅ Model loaded successfully.")

# -------------------------------
# HEALTH CHECK
# -------------------------------
@app.get("/ping")
async def ping():
    return {"message": "Hello, I am alive!"}

# -------------------------------
# IMAGE PROCESSING
# -------------------------------
def read_file_as_image(data) -> np.ndarray:
    image = Image.open(BytesIO(data)).convert("RGB")
    image = image.resize((64, 64))  # 👈 Match training input size
    return np.array(image) / 255.0  # Normalize

# -------------------------------
# PREDICTION ENDPOINT
# -------------------------------
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, axis=0)

    predictions = MODEL.predict(img_batch)
    predicted_class = CLASS_NAMES[int(np.argmax(predictions[0]))]
    confidence = float(np.max(predictions[0]))

    return {
        "disease": predicted_class,  # match frontend expectation
        "confidence": confidence
    }

# -------------------------------
# MAIN
# -------------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
