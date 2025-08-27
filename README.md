# 🩺 Liver Disease Predictor

A **Machine Learning-based predictive model** built using a **Dense Neural Network (DNN)** with **Keras** to assess the risk of **liver disease** based on patient clinical attributes.  
The project involves **data preprocessing, visualization, model training, and deployment** through a **Flask REST API**, with an optional **React.js frontend** for user interaction.

---

##  Tech Stack
- **Frontend:** React.js + Vite (medical-themed UI, responsive design)  
- **Backend:** Flask (Python API)  
- **Model:** Deep learning-Dense Neural Network; Keras `.keras` model + `scaler.pkl`  
- **Deployment:** Render 
  
```
  https://liver-disease-predictor-frma.onrender.com/
```
---

## 🔬 Input Features
- **Demographics:** Age, Gender  
- **Bilirubin Tests:** Total & Direct Bilirubin  
- **Liver Enzymes:** Alkaline Phosphatase, SGPT (ALT), SGOT (AST)  
- **Protein Markers:** Total Proteins, Albumin, A/G Ratio  

---

##  Features
- **Risk Prediction:** ML-powered liver disease risk prediction via **Flask API** (`/api/predict`)
- **Real-time Validation:** Validates clinical parameters with medical constraints before prediction
- **Result Visualization:** Displays **risk levels** and **confidence scores** for better interpretation
- **Clinical Reference Table:** Provides biomarker ranges for common liver conditions:
  - Hepatitis
  - Cirrhosis
  - Cholestasis
  - NAFLD (Non-Alcoholic Fatty Liver Disease)
  - Alcoholic Liver Disease
- **Medical Disclaimer:** Informational use only; **not medical advice**  

---
## Model Training

-**Architecture:** Dense Neural Network (DNN)
-**Layers:** Input → Hidden (ReLU + Dropout) → Output (Sigmoid)
-**Loss Function:** Binary Crossentropy
-**Optimizer:** Adam
-**Metrics:** Accuracy, Precision, Recall, F1-score

---
## Model Architecture
A **Dense Neural Network (DNN)** built with **Keras**:

| Layer | Units | Activation | Dropout |
|-------|-------|------------|---------|
| Dense | 64    | ReLU       | 0.3     |
| Dense | 32    | ReLU       | 0.2     |
| Output| 1     | Sigmoid    | —       |

- **Loss Function:** Binary Crossentropy  
- **Optimizer:** Adam  
- **Callbacks:** EarlyStopping (`patience=10`, `restore_best_weights=True`)  
- **Batch Size:** 32  
- **Epochs:** 100  

---

##  Installation & Setup

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



