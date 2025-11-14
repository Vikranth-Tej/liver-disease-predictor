import React from 'react';

const ReferenceTable = () => {
  const conditions = [
    {
      condition: "Normal Reference Values",
      bilirubin: "0.3–1.2 mg/dL",
      alkphos: "44–147 IU/L",
      astAltPattern: "AST 10–40 IU/L, ALT 7–56 IU/L",
      albumin: "3.5–5.0 g/dL",
      notes: "Baseline liver values for healthy adults.",
      prevention: ["Baseline health maintenance"],
      screening: "Routine annual health check-up",
      interpretation: "Safe / normal physiology"
    },
    {
      condition: "Acute Viral Hepatitis (HAV, HBV, HCV)",
      bilirubin: "~5–15 mg/dL",
      alkphos: "~150–350 IU/L",
      astAltPattern: "AST 400–800 IU/L, ALT 600–1200 IU/L (ALT > AST; AST/ALT < 1)",
      albumin: "3.5–5.0 g/dL",
      notes: "Hepatocellular injury from viral infection; ALT rises earliest.",
      prevention: [
        "Get vaccinated for Hepatitis A & B",
        "Avoid sharing needles, razors, toothbrushes",
        "Ensure food and water hygiene",
        "Practice safe sex",
        "Wash hands regularly"
      ],
      screening: "Hepatitis A/B/C serology if symptomatic or exposed",
      interpretation: "Potentially harmful — acute liver injury"
    },
    {
      condition: "Alcoholic Liver Disease",
      bilirubin: "~3–10 mg/dL",
      alkphos: "~120–250 IU/L",
      astAltPattern: "AST 150–400 IU/L, ALT 50–200 IU/L (AST/ALT ≈ 2)",
      albumin: "2.5–3.5 g/dL",
      notes: "Ethanol toxicity → steatosis → hepatitis → cirrhosis.",
      prevention: [
        "Complete alcohol cessation",
        "Nutrient-rich, balanced diet",
        "Avoid hepatotoxic drugs",
        "Regular clinical monitoring",
        "Seek help for alcohol dependence"
      ],
      screening: "Ultrasound, Fibroscan, LFT every 6–12 months",
      interpretation: "Harmful — chronic liver stress, risk of fibrosis/cirrhosis"
    },
    {
      condition: "Cholestasis (Biliary Obstruction)",
      bilirubin: "~5–20 mg/dL",
      alkphos: "~300–900 IU/L",
      astAltPattern: "AST < 200 IU/L, ALT < 200 IU/L",
      albumin: "3.5–5.0 g/dL",
      notes: "Obstruction → conjugated hyperbilirubinemia, dark urine, pale stools.",
      prevention: [
        "Maintain healthy weight",
        "Stay hydrated",
        "Low-fat diet",
        "UDCA for primary biliary cholangitis",
        "Periodic ultrasound if high risk"
      ],
      screening: "Ultrasound, MRCP, periodic LFTs",
      interpretation: "Potentially harmful — indicates obstruction / cholestasis"
    },
    {
      condition: "Cirrhosis (Chronic Liver Disease)",
      bilirubin: "~2–15 mg/dL",
      alkphos: "~120–300 IU/L",
      astAltPattern: "AST 80–300 IU/L, ALT 40–200 IU/L (AST/ALT > 1)",
      albumin: "2.0–3.5 g/dL",
      notes: "End-stage fibrosis → portal hypertension, ascites, varices.",
      prevention: [
        "Avoid alcohol",
        "Vaccinate for Hepatitis A/B",
        "Balanced diet and protein intake",
        "Manage metabolic syndrome",
        "Liver cancer screening every 6 months"
      ],
      screening: "Ultrasound + AFP every 6 months",
      interpretation: "Harmful — advanced chronic liver disease"
    },
    {
      condition: "NAFLD (Non-alcoholic Fatty Liver Disease)",
      bilirubin: "~0.8–2.0 mg/dL",
      alkphos: "~100–200 IU/L",
      astAltPattern: "AST 30–70 IU/L, ALT 40–100 IU/L (ALT > AST mildly; ratio 0.7–1.5)",
      albumin: "3.5–5.0 g/dL",
      notes: "Steatosis due to obesity/insulin resistance; ALT predominance.",
      prevention: [
        "Lose 7–10% body weight",
        "Exercise 150 min/week",
        "Mediterranean diet",
        "Control sugar, cholesterol, and BP",
        "Avoid sugary drinks & refined carbs"
      ],
      screening: "Liver Ultrasound, Fibroscan annually",
      interpretation: "Mildly harmful — risk for progression to NASH/cirrhosis"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Liver Condition Reference Guide</h2>

      <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-md">
        <p className="text-blue-800 text-sm font-medium">Clinical Reference Information</p>
        <p className="text-blue-700 text-sm mt-1">
          Exact clinical liver marker values, screening recommendations, and prevention tips for various liver conditions.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">Condition</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">Total bilirubin</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">ALP (IU/L)</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">AST / ALT</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">Albumin (g/dL)</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">Clinical notes</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">Screening / Monitoring</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">Interpretation</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">Prevention</th>
            </tr>
          </thead>
          <tbody>
            {conditions.map((cond, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">{cond.condition}</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">{cond.bilirubin}</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">{cond.alkphos}</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">{cond.astAltPattern}</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">{cond.albumin}</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">{cond.notes}</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">{cond.screening || '-'}</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">{cond.interpretation}</td>
                <td className="border border-gray-200 px-4 py-3 text-sm bg-green-50">
                  <ul className="list-disc pl-5 text-green-800 text-xs space-y-1">
                    {cond.prevention?.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-md">
        <p className="text-amber-800 text-sm">
          <strong>Important:</strong> Values are approximate and interpretation is general guidance; consult healthcare professionals for accurate diagnosis and management.
        </p>
      </div>
    </div>
  );
};

export default ReferenceTable;
