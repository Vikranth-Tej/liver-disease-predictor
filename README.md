# Liver Disease Prediction Frontend

A React frontend application for liver disease risk assessment using machine learning. This application connects to a deployed Flask API backend for predictions.

##  Features

### Frontend (React.js)
- Modern, medical-themed user interface
- Comprehensive form with real-time validation
- Interactive prediction results display
- Clinical reference table with liver condition patterns
- Responsive design for all device sizes
- Professional medical styling

### Key Functionality
- **Risk Assessment**: Machine Learning-powered prediction of liver disease risk via API
- **Clinical Reference**: Comprehensive table of liver condition patterns
- **Form Validation**: Real-time input validation with medical constraints
- **Result Visualization**: Clear display of risk levels and confidence scores
- **Medical Disclaimer**: Appropriate disclaimers for medical applications

##  Laboratory Parameters

The application analyzes the following biomarkers:

### Demographics
- Age (years)
- Gender (Male/Female)

### Bilirubin Tests
- Total Bilirubin (mg/dL)
- Direct Bilirubin (mg/dL)

### Liver Enzymes
- Alkaline Phosphatase (U/L)
- ALT - Alanine Aminotransferase (U/L)
- AST - Aspartate Aminotransferase (U/L)

### Protein Markers
- Total Proteins (g/dL)
- Albumin (g/dL)
- A/G Ratio (Albumin/Globulin Ratio)

##  Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API URL (optional):**
   - `VITE_API_URL = https://liver-disease-predictor-8wm6.onrender.com`

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## 🔧 API Integration

The frontend connects to the deployed backend at:
```
https://liver-disease-predictor-8wm6.onrender.com
```

### API Endpoints Used

#### Health Check
```
GET /api/health
```

#### Prediction
```
POST /api/predict
```

#### Features Information
```
GET /api/features
```

##  Frontend Structure

```
src/
├── components/
│   ├── PredictionForm.jsx # Main prediction form component
│   └── ReferenceTable.jsx # Clinical reference table
├── App.jsx               # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

##  Design Features

- **Medical Theme**: Professional blue color scheme appropriate for healthcare
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Clinical Typography**: Clear, readable fonts with proper medical terminology
- **Form Validation**: Real-time validation with medical parameter constraints and ML confidence warnings
- **Result Visualization**: Clear risk assessment display with confidence indicators
- **Reference Materials**: Comprehensive clinical reference table

##  Clinical Reference

The app includes a comprehensive reference table covering:

- **Acute Viral Hepatitis**: Characteristic enzyme patterns
- **Alcoholic Liver Disease**: AST/ALT ratio patterns
- **Cholestasis**: Bilirubin and alkaline phosphatase patterns
- **Cirrhosis**: End-stage liver disease markers
- **Fatty Liver Disease (NAFLD)**: Common patterns in metabolic conditions

##  Deployment

### Local Development
Run locally for development and testing using `npm run dev`.

### Production Deployment
Deploy to platforms like:
- **Vercel**: `npm run build` then deploy `dist` folder
- **Netlify**: Connect GitHub repo, build command: `npm run build`, publish directory: `dist`
- **GitHub Pages**: Use GitHub Actions to build and deploy

### Environment Variables
- `VITE_API_URL`: Backend API URL (defaults to deployed backend)

##  Medical Disclaimer

This application uses Machine Learning for educational and informational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical decisions.

