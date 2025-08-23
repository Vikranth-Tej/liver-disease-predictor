# 🩺 Liver Disease Predictor

A **full‑stack web application** for **liver disease risk assessment** using **Machine Learning**.  
Built with a **React.js** frontend for user interaction and visualization, and a **Flask API backend** powered by a trained **Keras model** for predictions.

---

##  Tech Stack
- **Frontend:** React.js + Vite (medical-themed UI, responsive design)  
- **Backend:** Flask (Python API)  
- **Model:** Keras `.keras` model + `scaler.pkl`  
- **Deployment:** Render 
Access at: 
```
  https://liver-disease-predictor-frma.onrender.com/
```
---

##  Input Features
- **Demographics:** Age, Gender  
- **Bilirubin Tests:** Total & Direct Bilirubin  
- **Liver Enzymes:** Alkaline Phosphatase, SGPT (ALT), SGOT (AST)  
- **Protein Markers:** Total Proteins, Albumin, A/G Ratio  

---

##  Features
- ** Risk Prediction:** ML-powered prediction via Flask API (`/api/predict`)  
- ** Real-time Validation:** Clinical parameter checks with constraints  
- ** Result Visualization:** Displays risk levels and confidence scores  
- ** Clinical Reference Table:** Biomarkers for common liver conditions:  
  - Hepatitis  
  - Cirrhosis  
  - Cholestasis  
  - NAFLD  
  - Alcoholic Liver Disease  
- ** Medical-Themed UI:** Professional styling, fully responsive  
- ** Medical Disclaimer:** Informational use only; **not medical advice**  

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```
    git clone https://github.com/Vikranth-Tej/liver-disease-predictor.git
    cd liver-disease-predictor
```

### 2. Backend Setup
```
    cd backend
    python -m venv venv
    source venv/bin/activate # Windows: venv\Scripts\activate
    pip install -r requirements.txt
    python app.py

```
Backend will run at:  
 `http://localhost:5000`

### 3. Frontend Setup
```
    cd ../frontend
    npm install
    npm run dev

```

Frontend will run at:  
 `http://localhost:5173`

---

##  API Endpoints

| Endpoint        | Method | Description                  |
|-----------------|--------|------------------------------|
| `/api/health`   | GET    | Health check                 |
| `/api/predict`  | POST   | Predict liver disease risk   |
| `/api/features` | GET    | Input features information   |

---

##  Deployment Guide

### Frontend (Static Site)
- **Build Command:**  
```
npm run build
```
- **Publish Directory:** `dist`  
- Deployed via **Render**

### Backend (Flask API)
- Deployed on **Render**


---

##  Project Structure
```
liver-disease-predictor/
│── backend/ # Flask API + Model
│ ├── app.py
│ ├── model.keras
│ ├── scaler.pkl
│ └── requirements.txt
│
│── frontend/ # React + Vite Frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── PredictionForm.jsx
│ │ │ └── ReferenceTable.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── vite.config.js
│ ├── package.json
│ └── dist/ # Generated after build
│
└── README.md

```
---

## ⚠️ Medical Disclaimer
This application is developed for **educational and informational purposes only**.  
It must **not** be used as a substitute for professional medical advice, diagnosis, or treatment.  
Always consult qualified healthcare providers for medical decisions.



