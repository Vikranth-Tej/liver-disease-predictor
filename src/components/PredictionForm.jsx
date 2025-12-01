import React, { useState } from "react";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    Total_Bilirubin: "",
    Direct_Bilirubin: "",
    Alkphos: "",
    Sgpt: "",
    Sgot: "",
    Total_Proteins: "",
    Albumin: "",
    AG_Ratio: "",
  });

  const FIELD_TOOLTIPS = {
    Age: "Age is a significant factor influencing liver health. As people age, the liver's ability to regenerate and repair decreases, making it more vulnerable to damage from toxins, infections, and chronic conditions. Older individuals are also more prone to non-alcoholic fatty liver disease (NAFLD), fibrosis, and cirrhosis.",
    Gender: "Gender influences susceptibility to liver diseases due to hormonal differences. For example, men are more likely to develop alcoholic liver disease and hepatocellular carcinoma, whereas women are more prone to autoimmune hepatitis and certain drug-induced liver injuries.",
    Total_Bilirubin: "Total bilirubin measures both direct and indirect bilirubin levels in the blood. Elevated levels can indicate liver dysfunction, hemolysis, or bile duct obstruction. Persistent high bilirubin may suggest conditions like hepatitis, cirrhosis, or cholestasis.",
    Direct_Bilirubin: "Direct (conjugated) bilirubin is processed by the liver and excreted into bile. Elevated levels typically indicate issues with bile flow, such as obstruction, gallstones, or hepatic diseases like cholestatic hepatitis. High direct bilirubin levels often point to impaired liver excretory function.",
    Alkphos: "Alkaline Phosphatase (ALP) is an enzyme produced in the liver, bile ducts, and bones. Elevated ALP levels can indicate blocked bile ducts, cholestasis, or liver inflammation. In combination with other liver enzymes, ALP helps identify specific liver disorders.",
    Sgpt: "SGPT, also known as ALT (Alanine Aminotransferase), is an enzyme primarily found in liver cells. Elevated ALT levels are a strong marker of liver cell injury, commonly seen in hepatitis, fatty liver disease, and drug-induced liver damage.",
    Sgot: "SGOT, also known as AST (Aspartate Aminotransferase), is found in the liver, heart, muscles, and kidneys. Elevated AST levels indicate potential liver damage but are less liver-specific than ALT. A high AST/ALT ratio may suggest alcoholic liver disease or advanced fibrosis.",
    Total_Proteins: "Total proteins represent the combined levels of albumin and globulin in the blood. Low total protein levels can indicate impaired liver synthesis, often seen in chronic liver disease, cirrhosis, or malnutrition.",
    Albumin: "Albumin is the main protein produced by the liver and is essential for maintaining blood volume and transporting hormones, vitamins, and drugs. Low albumin levels commonly occur in chronic liver diseases like cirrhosis.",
    AG_Ratio: "The Albumin-to-Globulin (A/G) Ratio helps assess liver function and protein balance. A low A/G ratio may indicate chronic liver disease, autoimmune hepatitis, or cirrhosis, whereas a high ratio can suggest genetic disorders or reduced globulin production.",
  };

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const Tooltip = ({ text }) => (
    <span className="relative group ml-1 cursor-pointer">
      <svg
        className="inline h-4 w-4 text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="white"
        />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="12"
          fill="currentColor"
        >
          i
        </text>
      </svg>
      <span className="absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {text}
      </span>
    </span>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const validateForm = () => {
    for (const [field, value] of Object.entries(formData)) {
      if (value === "") {
        setError("Please fill in all fields");
        return false;
      }
      if (field !== "Gender") {
        const num = parseFloat(value);
        if (isNaN(num) || num < 0) {
          setError(`${field.replace("_", " ")} must be a positive number`);
          return false;
        }
      }
    }
    if (
      parseFloat(formData.Direct_Bilirubin) >
      parseFloat(formData.Total_Bilirubin)
    ) {
      setError("Direct Bilirubin cannot be greater than Total Bilirubin");
      return false;
    }
    if (parseFloat(formData.Age) > 120) {
      setError("Age must be realistic (0–120 years)");
      return false;
    }
    return true;
  };

  // -------------------------------------------------
  // LAB PATTERN ANALYSIS — uses ONLY input values
  // -------------------------------------------------
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
      normal: 0,
    };

    // NORMAL
    if (tb >= 0.3 && tb <= 1.2) scores.normal += 2;
    if (alp >= 44 && alp <= 147) scores.normal += 2;
    if (ast >= 10 && ast <= 40) scores.normal += 1;
    if (alt >= 7 && alt <= 56) scores.normal += 1;
    if (albumin >= 3.5 && albumin <= 5.0) scores.normal += 2;

    // ACUTE VIRAL HEPATITIS
    if (tb >= 5 && tb <= 15) scores.acuteViral += 3;
    if (alp >= 150 && alp <= 350) scores.acuteViral += 2;
    if (ast >= 400 && ast <= 800) scores.acuteViral += 3;
    if (alt >= 600 && alt <= 1200 && astAltRatio < 1)
      scores.acuteViral += 3;
    if (albumin >= 3.5 && albumin <= 5.0) scores.acuteViral += 1;

    // ALCOHOLIC LIVER DISEASE
    if (tb >= 3 && tb <= 10) scores.alcoholic += 2;
    if (alp >= 120 && alp <= 250) scores.alcoholic += 2;
    if (ast >= 150 && ast <= 400) scores.alcoholic += 3;
    if (alt >= 50 && alt <= 200 && astAltRatio >= 1.8 && astAltRatio <= 2.3)
      scores.alcoholic += 3;
    if (albumin >= 2.5 && albumin <= 3.5) scores.alcoholic += 2;

    // CHOLESTASIS
    if (tb >= 5 && tb <= 20) scores.cholestasis += 3;
    if (db > 1.5) scores.cholestasis += 3;
    if (alp >= 300 && alp <= 900) scores.cholestasis += 4;
    if (ast < 200 && alt < 200) scores.cholestasis += 2;
    if (albumin >= 3.5 && albumin <= 5.0) scores.cholestasis += 1;

    // CIRRHOSIS / CHRONIC
    if (tb >= 2 && tb <= 15) scores.cirrhosis += 2;
    if (alp >= 120 && alp <= 300) scores.cirrhosis += 2;
    if (ast >= 80 && ast <= 300) scores.cirrhosis += 2;
    if (alt >= 40 && alt <= 200 && astAltRatio > 1)
      scores.cirrhosis += 2;
    if (albumin >= 2.0 && albumin <= 3.5) scores.cirrhosis += 3;
    if (age > 50) scores.cirrhosis += 1;
    if (totalProteins < 6.0) scores.cirrhosis += 1;

    // NAFLD
    if (tb >= 0.8 && tb <= 2.0) scores.nafld += 2;
    if (alp >= 100 && alp <= 200) scores.nafld += 2;
    if (ast >= 30 && ast <= 70) scores.nafld += 2;
    if (alt >= 40 && alt <= 100 && astAltRatio >= 0.7 && astAltRatio <= 1.5)
      scores.nafld += 3;
    if (albumin >= 3.5 && albumin <= 5.0) scores.nafld += 1;

    const maxScore = Math.max(...Object.values(scores));
    const rawKey = Object.keys(scores).find((k) => scores[k] === maxScore);

    const conditionMap = {
      normal: {
        name: "Normal Liver Function Pattern",
        recommendation: "Values fall within typical clinical reference ranges.",
      },
      acuteViral: {
        name: "Acute Viral Hepatitis Pattern",
        recommendation: "Pattern matches acute hepatocellular injury typically seen in viral hepatitis.",
      },
      alcoholic: {
        name: "Alcoholic Liver Disease Pattern",
        recommendation:
          "AST/ALT ratio and enzymes are consistent with alcohol-related liver injury.",
      },
      cholestasis: {
        name: "Cholestasis / Bile Obstruction Pattern",
        recommendation:
          "Profile suggests impaired bile flow or obstruction in the biliary system.",
      },
      cirrhosis: {
        name: "Cirrhosis / Chronic Liver Disease Pattern",
        recommendation:
          "Findings align with chronic fibrosis and reduced synthetic function.",
      },
      nafld: {
        name: "Non-Alcoholic Fatty Liver Disease (NAFLD) Pattern",
        recommendation: "Pattern is compatible with fatty infiltration of the liver.",
      },
    };

    const details = {
      acuteViral: [
        "Avoid alcohol and unnecessary medications.",
        "Ensure Hepatitis A and B vaccination if not done.",
        "Maintain proper hygiene and safe food/water practices.",
        "Seek prompt medical evaluation for jaundice, fatigue, or dark urine.",
      ],
      alcoholic: [
        "Completely avoid alcohol; even small amounts can worsen damage.",
        "Maintain a balanced, nutrient-rich diet.",
        "Discuss de-addiction and support options if needed.",
        "Regular liver function monitoring is strongly advised.",
      ],
      cholestasis: [
        "Follow a low-fat diet as advised by a clinician.",
        "Seek medical attention for persistent jaundice or itching.",
        "Avoid self-medication with hepatotoxic drugs or herbs.",
        "Further imaging (like ultrasound) may be required.",
      ],
      cirrhosis: [
        "Avoid alcohol and hepatotoxic substances.",
        "Keep salt intake low to reduce fluid retention.",
        "Get vaccinated for Hepatitis A and B after consulting a doctor.",
        "Regular follow-up with a liver specialist is essential.",
      ],
      nafld: [
        "Aim for gradual weight loss through diet and exercise.",
        "Limit sugary drinks and refined carbohydrates.",
        "Exercise 30–45 minutes at least 5 days a week.",
        "Manage diabetes, cholesterol, and blood pressure if present.",
      ],
      normal: [
        "Maintain a balanced diet and active lifestyle.",
        "Avoid excessive alcohol and unnecessary medications.",
        "Continue routine health checkups as per medical advice.",
      ],
    };

    const labConfidence =
      maxScore >= 8 ? "High" : maxScore >= 4 ? "Moderate" : "Low";

    return {
      rawKey,
      mostLikelyCondition:
        conditionMap[rawKey]?.name || "Liver Disease Pattern",
      recommendation:
        conditionMap[rawKey]?.recommendation ||
        "Abnormal liver profile that needs clinical evaluation.",
      scores,
      confidence: labConfidence,
      informativeDetails: details[rawKey] || [],
    };
  };

  // -------------------------------------------------
  // FUSION: ML RESULT + LAB PATTERN (ENHANCED RULE)
  // -------------------------------------------------
  const categorizeResult = (mlResult, probability, data) => {
    const hasDisease = mlResult === "Liver Disease Detected";
    const confidence = probability;
    const clinicalAnalysis = analyzeClinicalPatterns(data);

    let riskCategory = "";
    if (confidence >= 85) riskCategory = "Very High Risk";
    else if (confidence >= 70) riskCategory = "High Risk";
    else if (confidence >= 50) riskCategory = "Moderate Risk";
    else riskCategory = "Low Confidence";

    let showCondition = false;
    let doctorNote = "";
    let headlineMessage = "";
    let secondaryMessage = "";

    if (hasDisease) {
      // Disease detected by ML → always show most likely disease from labs
      showCondition = true;

      if (confidence < 50) {
        doctorNote =
          "The model is not very confident in this prediction. Please treat this only as a supportive tool and consult a qualified doctor for confirmation.";
        headlineMessage =
          "Liver disease is detected by the ML model, but with low confidence. Lab patterns suggest the condition shown below.";
      } else {
        doctorNote =
          "This tool does not replace a medical diagnosis. Please discuss these findings with a healthcare professional.";
        headlineMessage =
          "Liver disease is detected by the ML model, and the lab pattern below shows the most likely clinical picture.";
      }

      secondaryMessage = clinicalAnalysis.recommendation;
    } else {
      // No disease detected by ML
      showCondition = false;
      headlineMessage =
        clinicalAnalysis.rawKey === "normal"
          ? "ML model does not detect liver disease, and your lab pattern is close to normal ranges."
          : "ML model does not detect liver disease, but the lab pattern shows some deviations that may require clinical correlation.";
      doctorNote =
        "Even when the model suggests no disease, any symptoms or concerns should be discussed with a doctor.";
      secondaryMessage = clinicalAnalysis.recommendation;
    }

    return {
      hasDisease,
      confidence,
      riskCategory,
      showCondition,
      doctorNote,
      headlineMessage,
      secondaryMessage,
      clinicalAnalysis,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");
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
        AG_Ratio: parseFloat(formData.AG_Ratio),
      };

      const apiUrl =
        import.meta.env.VITE_API_URL ||
        "https://liver-disease-predictor-8wm6.onrender.com";

      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Prediction failed");
      }

      const resultData = await response.json();
      setResult(resultData);
    } catch (err) {
      setError(
        err.message || "An error occurred while processing your request"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      Age: "",
      Gender: "",
      Total_Bilirubin: "",
      Direct_Bilirubin: "",
      Alkphos: "",
      Sgpt: "",
      Sgot: "",
      Total_Proteins: "",
      Albumin: "",
      AG_Ratio: "",
    });
    setResult(null);
    setError("");
  };

  const categorization =
    result && result.result
      ? categorizeResult(result.result, result.probability, formData)
      : null;

  return (
    <div className="bg-gray-50 rounded-lg shadow-lg p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Laboratory Test Results
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Demographics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="Age"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="Gender"
              className="block text-sm font-medium text-gray-700"
            >
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
          <h3 className="text-lg font-semibold text-gray-800">
            Bilirubin Levels (mg/dL)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="Total_Bilirubin"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="Direct_Bilirubin"
                className="block text-sm font-medium text-gray-700"
              >
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
          <h3 className="text-lg font-semibold text-gray-800">
            Liver Enzymes (U/L)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="Alkphos"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="Sgpt"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="Sgot"
                className="block text-sm font-medium text-gray-700"
              >
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
          <h3 className="text-lg font-semibold text-gray-800">
            Protein Levels (g/dL)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="Total_Proteins"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="Albumin"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="AG_Ratio"
                className="block text-sm font-medium text-gray-700"
              >
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
            {loading ? "Analyzing..." : "Predict Risk"}
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
      {result && categorization && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">
            ML Prediction Result
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center border border-gray-100">
              <span className="text-sm text-gray-500 mb-1">Diagnosis (ML)</span>
              <span className="text-xl font-bold text-red-600">
                {result.result}
              </span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center border border-gray-100">
              <span className="text-sm text-gray-500 mb-1">
                Model Confidence
              </span>
              <span className="text-xl font-bold text-yellow-600">
                {result.probability}%
              </span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center border border-gray-100">
              <span className="text-sm text-gray-500 mb-1">
                Risk Category (ML)
              </span>
              <span className="text-xl font-bold text-indigo-600">
                {categorization.riskCategory}
              </span>
            </div>
          </div>

          {/* High-level interpretation */}
          <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
            <h4 className="font-semibold text-gray-800 text-lg mb-2">
              Final Interpretation
            </h4>
            <p className="text-gray-700 mb-2">
              {categorization.headlineMessage}
            </p>
            <p className="text-gray-700">
              {categorization.secondaryMessage}
            </p>
          </div>

          {/* Most Likely Condition – always shown when ML detects disease */}
          {categorization.showCondition && (
            <div className="bg-blue-100 p-6 rounded-xl border border-blue-200 shadow">
              <h4 className="font-semibold text-blue-800 text-lg mb-2">
                Most Likely Condition (Based on Lab Pattern)
              </h4>
              <p className="text-blue-900 font-bold mb-1">
                {
                  categorization.clinicalAnalysis
                    .mostLikelyCondition
                }
              </p>
              <p className="text-blue-900 mb-3">
                Confidence (Lab Pattern):{" "}
                <span className="font-semibold">
                  {categorization.clinicalAnalysis.confidence}
                </span>
              </p>
              <p className="mb-2 text-blue-900">
                {categorization.clinicalAnalysis.recommendation}
              </p>
              <p className="mb-2 font-semibold">
                Prevention & Lifestyle Recommendations:
              </p>
              <ul className="list-inside text-green-800 font-medium space-y-1">
                {categorization.clinicalAnalysis.informativeDetails.map(
                  (tip, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm"
                    >
                      <svg
                        className="h-5 w-5 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{tip}</span>
                    </li>
                  )
                )}
              </ul>
              {categorization.doctorNote && (
                <p className="mt-4 text-sm text-red-700 font-semibold">
                  {categorization.doctorNote}
                </p>
              )}
            </div>
          )}

          {/* Global disclaimer */}
          <p className="text-xs text-gray-500 italic">
            This tool is for educational and decision-support purposes only and
            does not replace professional medical diagnosis or treatment. Always
            consult a qualified healthcare professional for any health concerns.
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
