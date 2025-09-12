import React from 'react';
import PredictionForm from './components/PredictionForm';
import ReferenceTable from './components/ReferenceTable';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center items-center">
          {/* Image */}
          <img
            src="https://as1.ftcdn.net/v2/jpg/12/05/07/76/1000_F_1205077684_guWAjSo7loyobY0Q26wt63rruxQzUq4v.jpg"
            alt="Liver health illustration"
            className="h-24 w-auto mr-6"
          />
          {/* Text */}
          <div className="text-center">
            <h1 className="text-3xl font-bold leading-tight">Liver Disease Prediction</h1>
            <p className="text-lg mt-1">Machine Learning Laboratory System</p>
          </div>
        </div>
      </header>


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Enter your laboratory test results below to get an ML-powered risk assessment for liver disease. 
            Our advanced machine learning model analyzes multiple biomarkers to provide comprehensive insights.
          </p>
        </div>

        {/* Prediction Form */}
        <div className="mb-12">
          <PredictionForm />
        </div>

        {/* Reference Table */}
        <div>
          <ReferenceTable />
        </div>

        {/* Footer Information */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Medical Disclaimer</h3>
            <p className="text-sm text-gray-700 max-w-4xl mx-auto">
              This tool is designed for educational and informational purposes only. It is not intended to replace 
              professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare 
              providers with any questions regarding medical conditions. Never disregard professional medical advice 
              or delay seeking it because of information obtained from this tool.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
