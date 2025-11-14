import React, { useState } from 'react';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    Age: '',
    Gender: '',
    Total_Bilirubin: '',
    Direct_Bilirubin: '',
    Alkphos: '',
    Sgpt: '',
    Sgot: '',
    Total_Proteins: '',
    Albumin: '',
    AG_Ratio: ''
  });

  const FIELD_TOOLTIPS = {
    Age: "Age is a significant factor influencing liver health. As people age, the liver's ability to regenerate and repair decreases, making it more vulnerable to damage from toxins, infections, and chronic conditions. Older individuals are also more prone to non-alcoholic fatty liver disease (NAFLD), fibrosis, and cirrhosis.",
    Gender: "Gender influences susceptibility to liver diseases due to hormonal differences. For example, men are more likely to develop alcoholic liver disease and hepatocellular carcinoma, whereas women are more prone to autoimmune hepatitis and certain drug-induced liver injuries.",
    Total_Bilirubin: "Total bilirubin measures both direct and indirect bilirubin levels in the blood. Elevated levels can indicate liver dysfunction, hemolysis, or bile duct obstruction. Persistent high bilirubin may suggest conditions like hepatitis, cirrhosis, or cholestasis.",
    Direct_Bilirubin: "Direct (conjugated) bilirubin is processed by the liver and excreted into bile. Elevated levels typically indicate issues with bile flow, such as obstruction, gallstones, or hepatic diseases like cholestatic hepatitis. High direct bilirubin levels often point to impaired liver excretory function.",
    Alkphos: "Alkaline Phosphatase (ALP) is an enzyme produced in the liver, bile ducts, and bones. Elevated ALP levels can indicate blocked bile ducts, cholestasis, or liver inflammation. In combination with other liver enzymes, ALP helps identify specific liver disorders like primary biliary cholangitis or primary sclerosing cholangitis.",
    Sgpt: "SGPT, also known as ALT (Alanine Aminotransferase), is an enzyme primarily found in liver cells. Elevated ALT levels are a strong marker of liver cell injury, commonly seen in hepatitis, fatty liver disease, and drug-induced liver damage. Persistently high ALT suggests ongoing liver inflammation or necrosis.",
    Sgot: "SGOT, also known as AST (Aspartate Aminotransferase), is found in the liver, heart, muscles, and kidneys. Elevated AST levels indicate potential liver damage but are less liver-specific than ALT. A high AST/ALT ratio may suggest alcoholic liver disease or advanced fibrosis.",
    Total_Proteins: "Total proteins represent the combined levels of albumin and globulin in the blood. Low total protein levels can indicate impaired liver synthesis, often seen in chronic liver disease, cirrhosis, or malnutrition. Elevated levels may suggest inflammation or infections affecting the liver.",
    Albumin: "Albumin is the main protein produced by the liver and is essential for maintaining blood volume and transporting hormones, vitamins, and drugs. Low albumin levels (hypoalbuminemia) commonly occur in chronic liver diseases like cirrhosis, indicating reduced synthetic capacity.",
    AG_Ratio: "The Albumin-to-Globulin (A/G) Ratio helps assess liver function and protein balance. A low A/G ratio may indicate chronic liver disease, autoimmune hepatitis, or cirrhosis, whereas a high ratio can suggest genetic disorders or reduced globulin production. Abnormal ratios often point to impaired liver synthesis or immune dysfunction.",
  };

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const Tooltip = ({ text }) => (
    <span className="relative group ml-1 cursor-pointer">
      <svg className="inline h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor">i</text>
      </svg>
      <span className="absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {text}
      </span>
    </span>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateForm = () => {
    for (const [field, value] of Object.entries(formData)) {
      if (value === '') {
        setError('Please fill in all fields');
        return false;
      }
      if (field !== 'Gender') {
        const num = parseFloat(value);
        if (isNaN(num) || num < 0) {
          setError(`${field.replace('_', ' ')} must be a positive number`);
          return false;
        }
      }
    }
    if (parseFloat(formData.Direct_Bilirubin) > parseFloat(formData.Total_Bilirubin)) {
      setError('Direct Bilirubin cannot be greater than Total Bilirubin');
      return false;
    }
    return true;
  };

  const categorizeResult = (result, probability) => {
    const hasDisease = result === 'Liver Disease Detected';
    const confidence = probability;
    const clinicalAnalysis = analyzeClinicalPatterns(formData);

    let category = '';
    let riskLevel = '';
    let recommendation = '';
    let likelyCondition = '';

    // --- ML-driven risk label (kept as-is for UI badges) ---
    if (confidence >= 85) {
      category = hasDisease ? 'Very High Risk' : 'Very Low Risk';
      riskLevel = hasDisease ? 'Highly Likely' : 'Highly Unlikely';
    } else if (confidence >= 70) {
      category = hasDisease ? 'High Risk' : 'Low Risk';
      riskLevel = hasDisease ? 'Likely' : 'Unlikely';
    } else if (confidence >= 55) {
      category = hasDisease ? 'Moderate Risk' : 'Low-Moderate Risk';
      riskLevel = hasDisease ? 'Possibly' : 'Probably Not';
    } else {
      category = 'Uncertain';
      riskLevel = 'Inconclusive';
    }

    // ---------- HYBRID FUSION: ML + LABS ----------
    const fusion = computeFusionDecision({
      mlHasDisease: hasDisease,
      mlConfidence: confidence,
      clinicalAnalysis
    });

    // Option 3: DO NOT expose a specific disease label if ML says NO disease
    if (hasDisease && fusion.showCondition && clinicalAnalysis.rawKey !== 'normal') {
      likelyCondition = clinicalAnalysis.mostLikelyCondition;
      recommendation = clinicalAnalysis.recommendation;
    } else {
      likelyCondition = ''; // hides the “Most Likely Condition” box
      recommendation = fusion.message; // general guidance
    }

    return { category, riskLevel, recommendation, likelyCondition, clinicalAnalysis, fusion };
  };

  const analyzeClinicalPatterns = (data) => {
    const age = parseFloat(data.Age);
    const tb = parseFloat(data.Total_Bilirubin);
    const db = parseFloat(data.Direct_Bilirubin);
    const alp = parseFloat(data.Alkphos);
    const alt = parseFloat(data.Sgpt);
    const ast = parseFloat(data.Sgot);
    const albumin = parseFloat(data.Albumin);
    const totalProteins = parseFloat(data.Total_Proteins);

    const astAltRatio = alt > 0 ? ast / alt : 0;

    const scores = {
      acuteViral: 0,
      alcoholic: 0,
      cholestasis: 0,
      cirrhosis: 0,
      nafld: 0,
      normal: 0
    };

    // 🔵 NORMAL REFERENCE RANGE
    if (tb >= 0.3 && tb <= 1.2) scores.normal += 2;
    if (alp >= 44 && alp <= 147) scores.normal += 2;
    if (ast >= 10 && ast <= 40) scores.normal += 1;
    if (alt >= 7 && alt <= 56) scores.normal += 1;
    if (albumin >= 3.5 && albumin <= 5.0) scores.normal += 2;

    // 🟡 ACUTE VIRAL HEPATITIS
    if (tb >= 5 && tb <= 15) scores.acuteViral += 3;
    if (alp >= 150 && alp <= 350) scores.acuteViral += 2;
    if (ast >= 400 && ast <= 800) scores.acuteViral += 3;
    if (alt >= 600 && alt <= 1200 && astAltRatio < 1) scores.acuteViral += 3;
    if (albumin >= 3.5 && albumin <= 5.0) scores.acuteViral += 1;

    // 🟠 ALCOHOLIC LIVER DISEASE
    if (tb >= 3 && tb <= 10) scores.alcoholic += 2;
    if (alp >= 120 && alp <= 250) scores.alcoholic += 2;
    if (ast >= 150 && ast <= 400) scores.alcoholic += 3;
    if (alt >= 50 && alt <= 200 && astAltRatio >= 1.8 && astAltRatio <= 2.2) scores.alcoholic += 3;
    if (albumin >= 2.5 && albumin <= 3.5) scores.alcoholic += 2;

    // 🔴 CHOLESTASIS (BILE OBSTRUCTION)
    if (tb >= 5 && tb <= 20) scores.cholestasis += 3;
    if (db > 1.5) scores.cholestasis += 3;
    if (alp >= 300 && alp <= 900) scores.cholestasis += 4;
    if (ast < 200 && alt < 200) scores.cholestasis += 2;
    if (albumin >= 3.5 && albumin <= 5.0) scores.cholestasis += 1;

    // 🟤 CIRRHOSIS / CHRONIC LIVER DISEASE
    if (tb >= 2 && tb <= 15) scores.cirrhosis += 2;
    if (alp >= 120 && alp <= 300) scores.cirrhosis += 2;
    if (ast >= 80 && ast <= 300) scores.cirrhosis += 2;
    if (alt >= 40 && alt <= 200 && astAltRatio > 1) scores.cirrhosis += 2;
    if (albumin >= 2.0 && albumin <= 3.5) scores.cirrhosis += 3;
    if (age > 50) scores.cirrhosis += 1;
    if (totalProteins < 6.0) scores.cirrhosis += 1;

    // 🟢 NAFLD
    if (tb >= 0.8 && tb <= 2.0) scores.nafld += 2;
    if (alp >= 100 && alp <= 200) scores.nafld += 2;
    if (ast >= 30 && ast <= 70) scores.nafld += 2;
    if (alt >= 40 && alt <= 100 && astAltRatio >= 0.7 && astAltRatio <= 1.5) scores.nafld += 3;
    if (albumin >= 3.5 && albumin <= 5.0) scores.nafld += 1;

    const maxScore = Math.max(...Object.values(scores));
    const rawKey = Object.keys(scores).find(k => scores[k] === maxScore);

    const conditionMap = {
      normal: { name: 'Normal Liver Function', recommendation: 'Values fall inside healthy clinical ranges.' },
      acuteViral: { name: 'Acute Viral Hepatitis', recommendation: 'Pattern matches viral hepatocellular injury.' },
      alcoholic: { name: 'Alcoholic Liver Disease', recommendation: 'AST/ALT pattern consistent with ethanol toxicity.' },
      cholestasis: { name: 'Cholestasis (Bile Obstruction)', recommendation: 'Pattern matches biliary obstruction.' },
      cirrhosis: { name: 'Cirrhosis / Chronic Liver Disease', recommendation: 'Findings match chronic hepatic fibrosis.' },
      nafld: { name: 'Non-Alcoholic Fatty Liver Disease (NAFLD)', recommendation: 'Pattern consistent with hepatic steatosis.' }
    };

    const details = {
      acuteViral: [
        'Get vaccinated for Hepatitis A and B',
        'Maintain proper hand hygiene and food safety',
        'Avoid sharing personal items like razors, needles, or toothbrushes',
        'Use clean, sterile equipment for tattoos, piercings, or injections'
      ],
      alcoholic: [
        'Limit or completely avoid alcohol consumption',
        'Stay hydrated and maintain a balanced diet',
        'Regular liver check-ups if you drink occasionally',
        'Avoid binge drinking and mixing alcohol with medications',
        'Seek medical help if experiencing alcohol dependency'
      ],
      cholestasis: [
        'Maintain a healthy weight and balanced diet',
        'Avoid unnecessary medications or supplements that burden the liver',
        'Stay hydrated and consume a low-fat diet',
        'Seek medical advice promptly if persistent jaundice or itching occurs'
      ],
      cirrhosis: [
        'Avoid alcohol and hepatotoxic substances',
        'Follow a nutrient-rich, low-salt, balanced diet',
        'Go for regular liver screenings and follow medical guidance',
        'Stay updated on Hepatitis A and B vaccinations',
        'Avoid unprescribed herbal medicines or toxic substances'
      ],
      nafld: [
        'Maintain a healthy weight and body mass index (BMI)',
        'Exercise regularly (30–45 mins, at least 5 days a week)',
        'Adopt a low-sugar, low-processed-fat diet',
        'Reduce consumption of sugary drinks and refined carbs',
        'Manage diabetes, blood pressure, and cholesterol levels'
      ],
      normal: [
        'Maintain a balanced diet and active lifestyle',
        'Avoid excessive alcohol and unnecessary medications',
        'Continue routine health checkups and liver function tests as advised'
      ]
    };

    const labConfidence =
      maxScore >= 8 ? 'High' :
      maxScore >= 4 ? 'Moderate' :
      'Low';

    return {
      rawKey,
      mostLikelyCondition: conditionMap[rawKey]?.name || 'Liver Disease',
      recommendation: conditionMap[rawKey]?.recommendation || 'Abnormal liver function detected.',
      scores,
      confidence: labConfidence,
      informativeDetails: details[rawKey] || []
    };
  };

  const computeFusionDecision = ({ mlHasDisease, mlConfidence, clinicalAnalysis }) => {
    const labKey = clinicalAnalysis.rawKey;
    const labsSuggestDisease = labKey !== 'normal';

    // Map lab qualitative confidence to numeric
    const labConfNumeric =
      clinicalAnalysis.confidence === 'High' ? 80 :
      clinicalAnalysis.confidence === 'Moderate' ? 60 : 40;

    // Decide weights based on ML confidence
    let weightML, weightLabs;
    if (mlConfidence >= 50) {
      weightML = 0.6;
      weightLabs = 0.4;
    } else if (mlConfidence <= 40) {
      weightML = 0.3;
      weightLabs = 0.7;
    } else {
      weightML = 0.5;
      weightLabs = 0.5;
    }

    const mlScore = mlConfidence * weightML;
    const labScore = (labsSuggestDisease ? labConfNumeric : (labKey === 'normal' ? 80 : 40)) * weightLabs;

    let status = '';
    let message = '';
    let showCondition = false;

    // Case 1: ML = No Disease
    if (!mlHasDisease) {
      if (!labsSuggestDisease && labKey === 'normal') {
        status = 'Consistently Low Risk';
        message = 'Both the ML model and laboratory ranges fall within normal limits. This profile does not suggest liver disease based on current inputs. Continue regular health monitoring as advised by your clinician.';
      } else {
        status = 'Mixed Pattern – Needs Clinical Evaluation';
        message = 'The ML model does not detect liver disease, but laboratory values show a non-normal pattern. This conflict requires clinical correlation and possibly further diagnostic workup.';
      }
      // IMPORTANT: do not expose specific disease category when ML says no disease
      return { status, message, showCondition: false };
    }

    // Case 2: ML = Disease & Labs normal
    if (mlHasDisease && !labsSuggestDisease && labKey === 'normal') {
      status = 'Mixed Pattern – Needs Clinical Evaluation';
      message = 'The ML model flags potential liver disease, but lab values fall close to normal reference ranges. This could represent early, subclinical, or non-classical presentation. Clinical evaluation and follow-up testing are recommended.';
      return { status, message, showCondition: false };
    }

    // Case 3: ML = Disease & Labs suggest specific condition
    if (mlHasDisease && labsSuggestDisease) {
      // Simple fusion: if (labScore + mlScore) reasonably high, we trust the pattern
      const fusedScore = mlScore + labScore;

      if (fusedScore >= 90) {
        status = 'High Risk – ML & Labs Aligned';
        message = `Both the ML model and biochemical profile support the presence of liver disease. The lab pattern is most consistent with ${clinicalAnalysis.mostLikelyCondition}. Immediate specialist consultation is strongly recommended.`;
        showCondition = true;
      } else if (fusedScore >= 70) {
        status = 'Probable Risk – Pattern Suggestive';
        message = `The combined ML and lab evidence suggests liver dysfunction, with a pattern leaning towards ${clinicalAnalysis.mostLikelyCondition}. Further clinical evaluation and imaging/lab follow-up are recommended.`;
        showCondition = true;
      } else {
        status = 'Borderline Pattern – Inconclusive';
        message = 'The ML model detects disease, but the strength of alignment with classic lab patterns is modest. Additional tests and repeat labs may be needed to clarify the diagnosis.';
        showCondition = false;
      }

      return { status, message, showCondition };
    }

    // Fallback (shouldn’t normally hit)
    status = 'Inconclusive';
    message = 'The current pattern does not clearly fit a single diagnostic category. Please correlate with clinical history and additional investigations.';
    return { status, message, showCondition: false };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const apiData = {
        Age: parseFloat(formData.Age),
        Gender: formData.Gender,
        Total_Bilirubin: parseFloat(formData.Total_Bilirubin),
        Direct_Bilirubin: parseFloat(formData.Direct_Bilirubin),
        Alkphos: parseFloat(formData.Alkphos),
        Sgpt: parseFloat(formData.Sgpt),
        Sgot: parseFloat(formData.Sgot),
        Total_Proteins: parseFloat(formData.Total_Proteins),
        Albumin: parseFloat(formData.Albumin),
        AG_Ratio: parseFloat(formData.AG_Ratio)
      };

      const apiUrl = import.meta.env.VITE_API_URL || 'https://liver-disease-predictor-8wm6.onrender.com';
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Prediction failed');
      }

      const resultData = await response.json();
      setResult(resultData);
    } catch (err) {
      setError(err.message || 'An error occurred while processing your request');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      Age: '',
      Gender: '',
      Total_Bilirubin: '',
      Direct_Bilirubin: '',
      Alkphos: '',
      Sgpt: '',
      Sgot: '',
      Total_Proteins: '',
      Albumin: '',
      AG_Ratio: ''
    });
    setResult(null);
    setError('');
  };

  const categorization = result ? categorizeResult(result.result, result.probability) : null;

  return (
    <div className="bg-gray-50 rounded-lg shadow-lg p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Laboratory Test Results</h2>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Demographics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="Age" className="block text-sm font-medium text-gray-700">
              Age (years)
              <Tooltip text={FIELD_TOOLTIPS.Age} />
            </label>
            <input
              type="number"
              id="Age"
              name="Age"
              value={formData.Age}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter age"
              min="0"
              max="120"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">
              Gender
              <Tooltip text={FIELD_TOOLTIPS.Gender} />
            </label>
            <select
              id="Gender"
              name="Gender"
              value={formData.Gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* Bilirubin Levels */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Bilirubin Levels (mg/dL)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="Total_Bilirubin" className="block text-sm font-medium text-gray-700">
                Total Bilirubin
                <Tooltip text={FIELD_TOOLTIPS.Total_Bilirubin} />
              </label>
              <input
                type="number"
                id="Total_Bilirubin"
                name="Total_Bilirubin"
                value={formData.Total_Bilirubin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.0"
                step="0.1"
                min="0"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="Direct_Bilirubin" className="block text-sm font-medium text-gray-700">
                Direct Bilirubin
                <Tooltip text={FIELD_TOOLTIPS.Direct_Bilirubin} />
              </label>
              <input
                type="number"
                id="Direct_Bilirubin"
                name="Direct_Bilirubin"
                value={formData.Direct_Bilirubin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.0"
                step="0.1"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        {/* Liver Enzymes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Liver Enzymes (U/L)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="Alkphos" className="block text-sm font-medium text-gray-700">
                Alkaline Phosphatase
                <Tooltip text={FIELD_TOOLTIPS.Alkphos} />
              </label>
              <input
                type="number"
                id="Alkphos"
                name="Alkphos"
                value={formData.Alkphos}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="0"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="Sgpt" className="block text-sm font-medium text-gray-700">
                ALT (Alanine Aminotransferase)
                <Tooltip text={FIELD_TOOLTIPS.Sgpt} />
              </label>
              <input
                type="number"
                id="Sgpt"
                name="Sgpt"
                value={formData.Sgpt}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="0"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="Sgot" className="block text-sm font-medium text-gray-700">
                AST (Aspartate Aminotransferase)
                <Tooltip text={FIELD_TOOLTIPS.Sgot} />
              </label>
              <input
                type="number"
                id="Sgot"
                name="Sgot"
                value={formData.Sgot}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        {/* Protein Levels */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Protein Levels (g/dL)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="Total_Proteins" className="block text-sm font-medium text-gray-700">
                Total Proteins
                <Tooltip text={FIELD_TOOLTIPS.Total_Proteins} />
              </label>
              <input
                type="number"
                id="Total_Proteins"
                name="Total_Proteins"
                value={formData.Total_Proteins}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.0"
                step="0.1"
                min="0"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="Albumin" className="block text-sm font-medium text-gray-700">
                Albumin
                <Tooltip text={FIELD_TOOLTIPS.Albumin} />
              </label>
              <input
                type="number"
                id="Albumin"
                name="Albumin"
                value={formData.Albumin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.0"
                step="0.1"
                min="0"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="AG_Ratio" className="block text-sm font-medium text-gray-700">
                A/G Ratio
                <Tooltip text={FIELD_TOOLTIPS.AG_Ratio} />
              </label>
              <input
                type="number"
                id="AG_Ratio"
                name="AG_Ratio"
                value={formData.AG_Ratio}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.0"
                step="0.1"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <span className="text-red-700 font-medium">Error: {error}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Analyzing...' : 'Predict Risk'}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Results Section */}
      {result && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            ML Prediction Result
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center border border-gray-100">
              <span className="text-sm text-gray-500 mb-1">Diagnosis</span>
              <span className="text-xl font-bold text-red-600">{result.result}</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center border border-gray-100">
              <span className="text-sm text-gray-500 mb-1">Model Confidence</span>
              <span className="text-xl font-bold text-yellow-600">{result.probability}%</span>
            </div>
            {categorization && (
              <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center border border-gray-100">
                <span className="text-sm text-gray-500 mb-1">Risk Category (ML)</span>
                <span className="text-xl font-bold text-yellow-600">{categorization.category}</span>
              </div>
            )}
          </div>

          {/* Most Likely Condition – ONLY when ML says disease & fusion allows it */}
          {categorization && categorization.likelyCondition && (
            <div className="bg-blue-100 p-6 rounded-xl mb-6 border border-blue-200 shadow">
              <h4 className="font-semibold text-blue-800 text-lg mb-2">Most Likely Condition (Lab Pattern)</h4>
              <p className="text-blue-700 font-bold text-base mb-1">{categorization.likelyCondition}</p>
              <p className="mb-2">{categorization.clinicalAnalysis.recommendation}</p>
              <p className="mb-2 font-semibold">Prevention & Lifestyle Recommendations:</p>
              <ul className="list-inside text-green-700 font-medium space-y-1">
                {categorization.clinicalAnalysis.informativeDetails.map((tip, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Final Interpretation Card (Option B) */}
          {categorization && (
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <h4 className="font-semibold text-gray-800 text-lg mb-2">
                Final Interpretation:{' '}
                <span className="text-indigo-700">
                  {categorization.fusion?.status || categorization.riskLevel}
                </span>
              </h4>
              <p className="text-base text-gray-700 leading-relaxed mb-2">
                {categorization.fusion?.message || categorization.recommendation}
              </p>
              {result.probability < 70 && (
                <p className="text-xs text-gray-500 mt-2 italic">
                  Moderate to low ML confidence — results should always be interpreted alongside full clinical history and physician assessment.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
