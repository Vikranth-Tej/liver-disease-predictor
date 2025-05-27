import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    total_bilirubin: '',
    direct_bilirubin: '',
    Alkphos_Alkaline_Phosphotase: '',
    Sgpt_Alamine_Aminotransferase: '',
    sgot_Aspartate_Aminotransferase: '',
    total_proteins: '',
    ALB_Albumin: '',
    Albumin_Globulin_Ratio: ''
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Age: parseFloat(formData.age),
      Gender: formData.gender === 'male' ? 'Male' : 'Female',
      Total_Bilirubin: parseFloat(formData.total_bilirubin),
      Direct_Bilirubin: parseFloat(formData.direct_bilirubin),
      Alkphos: parseFloat(formData.Alkphos_Alkaline_Phosphotase),
      Sgpt: parseFloat(formData.Sgpt_Alamine_Aminotransferase),
      Sgot: parseFloat(formData.sgot_Aspartate_Aminotransferase),
      Total_Proteins: parseFloat(formData.total_proteins),
      Albumin: parseFloat(formData.ALB_Albumin),
      AG_Ratio: parseFloat(formData.Albumin_Globulin_Ratio)
    };

    try {
      const res = await axios.post('https://liver-disease-predictor-8wm6.onrender.com/predict', payload);
      setPrediction({
        result: res.data.result,
        probability: res.data.probability
      });
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="App">
      <h1>Liver Disease Predictor</h1>
      <form onSubmit={handleSubmit} className="form-grid">

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Total Bilirubin</label>
          <input
            type="number"
            name="total_bilirubin"
            value={formData.total_bilirubin}
            onChange={handleChange}
            step="any"
            required
          />
        </div>

        <div className="form-group">
          <label>Direct Bilirubin</label>
          <input
            type="number"
            name="direct_bilirubin"
            value={formData.direct_bilirubin}
            onChange={handleChange}
            step="any"
            required
          />
        </div>

        <div className="form-group">
          <label>Alkaline Phosphotase</label>
          <input
            type="number"
            name="Alkphos_Alkaline_Phosphotase"
            value={formData.Alkphos_Alkaline_Phosphotase}
            onChange={handleChange}
            step="any"
            required
          />
        </div>

        <div className="form-group">
          <label>Alamine Aminotransferase (SGPT)</label>
          <input
            type="number"
            name="Sgpt_Alamine_Aminotransferase"
            value={formData.Sgpt_Alamine_Aminotransferase}
            onChange={handleChange}
            step="any"
            required
          />
        </div>

        <div className="form-group">
          <label>Aspartate Aminotransferase (SGOT)</label>
          <input
            type="number"
            name="sgot_Aspartate_Aminotransferase"
            value={formData.sgot_Aspartate_Aminotransferase}
            onChange={handleChange}
            step="any"
            required
          />
        </div>

        <div className="form-group">
          <label>Total Proteins</label>
          <input
            type="number"
            name="total_proteins"
            value={formData.total_proteins}
            onChange={handleChange}
            step="any"
            required
          />
        </div>

        <div className="form-group">
          <label>Albumin</label>
          <input
            type="number"
            name="ALB_Albumin"
            value={formData.ALB_Albumin}
            onChange={handleChange}
            step="any"
            required
          />
        </div>

        <div className="form-group">
          <label>Albumin/Globulin Ratio</label>
          <input
            type="number"
            name="Albumin_Globulin_Ratio"
            value={formData.Albumin_Globulin_Ratio}
            onChange={handleChange}
            step="any"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Predict</button>
      </form>

      {prediction && (
        <div className="result">
          <h2>{prediction.result === "Liver Disease Detected" ? "⚠️" : "✅"} {prediction.result}</h2>
          <p>Confidence: {prediction.probability}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
