
```markdown
# 🧬 Liver Disease Predictor

A full‑stack web application for liver disease risk assessment using Machine Learning.  
Frontend (React) for user interaction and visualization, Backend (Flask) with a trained Keras model for predictions.

---

##  Tech Stack
- **Frontend**: React.js (medical‑themed UI, validation, result visualization)  
- **Backend**: Flask (Python API)  
- **Model**: Keras `.keras` + `scaler.pkl`

---

## Input Features
- Age, Gender  
- Total & Direct Bilirubin  
- Alkaline Phosphatase, SGPT (ALT), SGOT (AST)  
- Total Proteins, Albumin, A/G Ratio  

---

##  Features
- **Risk Prediction**: ML model via Flask API (`/api/predict`)  
- **Real‑time Validation** of clinical parameters  
- **Result Visualization** with risk level & confidence score  
- **Reference Table**: Liver condition biomarkers (Hepatitis, Cirrhosis, Cholestasis, NAFLD, Alcoholic disease)  
- **Medical Theme**: Responsive UI with professional styling  
- **Disclaimer**: Informational only, not medical advice  


```

---

##  Installation & Setup

### Backend
```

cd backend
python -m venv venv
source venv/bin/activate   \# (Windows: venv\Scripts\activate)
pip install -r requirements.txt
python app.py

```

### Frontend
```

cd frontend
npm install
npm run dev   

```

Frontend → `http://localhost:5173`  
Backend → `http://localhost:5000`

---

##  Deployment
- **Frontend**: Render (`npm run build` → deploy `dist/`)  
- **Backend**: Render 
- **Env**: `VITE_API_URL`

---

##  API Endpoints
- `GET /api/health` – Health check  
- `POST /api/predict` – Prediction request  
- `GET /api/features` – Input features info  

---

##  Disclaimer
This application is for **educational and informational purposes only**.  
Not a substitute for professional medical advice, diagnosis, or treatment.
```

