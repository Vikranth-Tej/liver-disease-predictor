# 🩺 Liver Disease Predictor

A **Machine Learning-based predictive model** built using a **Dense Neural Network (DNN)** with **Keras** to assess the risk of **liver disease** based on patient clinical attributes.  
The project involves **data preprocessing, visualization, model training, and deployment** through a **Flask REST API**, with an optional **React.js frontend** for user interaction.

---

##  Tech Stack
- **Model:** Deep Learning — Dense Neural Network (DNN) using **Keras** (`.keras` model) + **StandardScaler** (`scaler.pkl`)
- **Data Visualization:** Matplotlib, Seaborn
- **Machine Learning Libraries:**  
  - Scikit-learn (Logistic Regression, Random Forest, Decision Tree, KNN, SVM, Naive Bayes)
  - Voting Classifiers for ensemble learning
- **Data Handling:** Pandas, NumPy, Scikit-learn `SimpleImputer`
- **Class Imbalance Handling:** Random Oversampling (`imblearn`)
- **Backend:** Flask (Python REST API)
- **Frontend:** React.js + Vite (responsive design)
- **Deployment:** Render
  
```
  https://liver-disease-predictor-frma.onrender.com/
```
---

## 🔬 Input
- **Demographics:** Age, Gender  
- **Bilirubin Tests:** Total & Direct Bilirubin  
- **Liver Enzymes:** Alkaline Phosphatase, SGPT (ALT), SGOT (AST)  
- **Protein Markers:** Total Proteins, Albumin, A/G Ratio  

---
## Model Training

- **Architecture:** Dense Neural Network (DNN)
- **Layers:** Input → Hidden (ReLU + Dropout) → Output (Sigmoid)
- **Loss Function:** Binary Crossentropy
- **Optimizer:** Adam
- **Metrics:** Accuracy, Precision, Recall, F1-score

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
##  Features
- **Risk Prediction:** ML-powered liver disease risk prediction via **Flask API** (`/api/predict`)
- **Real-time Validation:** Validates clinical parameters with medical constraints before prediction
- **Result Visualization:** Displays **risk levels** and **confidence scores** for better interpretation
- **Data Visualization:** Uses **Matplotlib** and **Seaborn** to visualize:
  - Attribute distributions
  - Correlations between biomarkers
  - Disease vs non-disease patterns
- **Clinical Reference Table:** Provides biomarker ranges for common liver conditions:
  - Hepatitis
  - Cirrhosis
  - Cholestasis
  - NAFLD (Non-Alcoholic Fatty Liver Disease)
  - Alcoholic Liver Disease
- **Medical Disclaimer:** Informational use only; **not medical advice**

---

##  API Endpoints

| Endpoint        | Method | Description                  |
|-----------------|--------|------------------------------|
| `/api/health`   | GET    | Health check                 |
| `/api/predict`  | POST   | Predict liver disease risk   |
| `/api/features` | GET    | Input features information   |


---

## ⚠️ Medical Disclaimer
This application is developed for **educational and informational purposes only**.  
It must **not** be used as a substitute for professional medical advice, diagnosis, or treatment.  
Always consult qualified healthcare providers for medical decisions.



