# 🧬 Liver Disease Predictor

A full-stack web application that predicts the likelihood of liver disease using a trained deep learning model (Keras) and a standard scaler.

## 🚀 Tech Stack
- **Frontend**: React.js
- **Backend**: Flask (Python)
- **Model**: Keras `.keras` model + `scaler.pkl`
- **Deployment**: Render

## 🩺 Input Features
- Age
- Gender
- Total Bilirubin
- Direct Bilirubin
- Alkaline Phosphatase
- SGPT, SGOT
- Total Proteins
- Albumin
- A/G Ratio

## 📦 Installation

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py

# Frontend
cd ../frontend
npm install
npm start
