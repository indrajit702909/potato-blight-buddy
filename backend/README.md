# Potato Disease Detection Backend

FastAPI backend for potato disease detection using machine learning.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:
- API docs: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

## Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `POST /predict` - Upload image for disease prediction

## Model Integration

To integrate your trained model:

1. Place your trained model file in the backend directory
2. Update the `load_model()` function in `main.py` to load your specific model
3. Modify the `predict_disease()` function to use your model's prediction format
4. Adjust the `preprocess_image()` function based on your model's input requirements