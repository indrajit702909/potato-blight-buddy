# Setup Instructions

## Project Structure Created

Your project now has a separate backend folder while keeping the frontend in the root:

```
├── src/              # React components and assets (frontend)
├── public/           # Static assets (frontend)  
├── backend/          # FastAPI backend (newly created)
│   ├── main.py       # FastAPI server with CORS enabled
│   ├── requirements.txt  # Python dependencies
│   └── README.md     # Backend setup instructions
├── package.json      # Frontend dependencies
├── vite.config.ts    # Frontend configuration
└── README.md         # Updated project documentation
```

## Next Steps

### 1. Frontend Setup
```bash
npm install
npm run dev
```
Frontend runs on: http://localhost:8080

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```
Backend runs on: http://localhost:8000

### 3. The backend includes:
- ✅ CORS middleware configured for frontend
- ✅ `/predict` endpoint that matches your frontend code
- ✅ Mock disease predictions (replace with your trained model)
- ✅ Image preprocessing pipeline
- ✅ FastAPI documentation at `/docs`

### 4. Your frontend will now work with the backend!
The frontend code already calls `http://localhost:8000/predict` - just start both servers and test the image upload functionality.

## Important Notes

- The current setup uses **mock predictions** in the backend
- To use your actual ML model, follow the instructions in `backend/README.md`
- Both frontend and backend can be developed and deployed independently
- The backend includes comprehensive error handling and CORS configuration