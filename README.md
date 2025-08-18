# Potato Disease Detection System

A full-stack application for detecting potato diseases using AI/ML with a React frontend and FastAPI backend.

## Project Structure

```
├── src/               # React TypeScript frontend source
├── public/            # Static assets
├── backend/           # FastAPI Python backend
│   ├── main.py
│   ├── requirements.txt
│   └── README.md
├── package.json       # Frontend dependencies
├── vite.config.ts     # Frontend build configuration
└── README.md
```

## Quick Start

### Frontend (React)

```bash
npm install
npm run dev
```

The frontend will be available at `http://localhost:8080`

### Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

The backend API will be available at `http://localhost:8000`

## Features

- **Image Upload**: Drag-and-drop or click to upload potato leaf images
- **AI Analysis**: Machine learning model analyzes images for disease detection
- **Disease Information**: Detailed results with confidence scores and treatment recommendations
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Results**: Instant analysis and feedback

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- shadcn/ui components
- React Query for state management

### Backend
- FastAPI for high-performance API
- Python with machine learning libraries
- Image processing with PIL
- CORS enabled for cross-origin requests

## Development

### Frontend Development
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Run linting
```

### Backend Development
```bash
cd backend
python main.py  # Start development server
```

Visit `http://localhost:8000/docs` for interactive API documentation.

## API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `POST /predict` - Upload image for disease prediction

## Model Integration

To integrate your trained model:

1. Place your model file in the `backend/` directory
2. Update `load_model()` function in `backend/main.py`
3. Modify `predict_disease()` to use your model's output format
4. Adjust `preprocess_image()` based on your model's input requirements

## Production Deployment

### Frontend
Deploy the root directory (excluding `backend/`) to any static hosting service (Vercel, Netlify, etc.)

### Backend
Deploy the `backend/` directory to a Python hosting service (Railway, Heroku, AWS, etc.)

Make sure to update the API endpoint in the frontend code to point to your deployed backend URL.