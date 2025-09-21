import React from 'react';

const ReferenceTable = () => {
  const conditions = [
    {
      condition: "Acute viral hepatitis (HAV, HBV, HCV)",
      bilirubin: "~5–15 mg/dL",
      alkphos: "~150–350 IU/L",
      astAltPattern: "AST 400–800 IU/L, ALT 600–1200 IU/L (AST/ALT < 1)",
      albumin: "3.5–5.0 g/dL",
      notes: "Hepatocellular injury from viral infection with prodrome (fever, malaise) followed by jaundice; ALT peaks early, before bilirubin rise.",
      prevention: [
        "Wash hands regularly and practice good personal hygiene",
        "Drink clean water and eat properly cooked food to avoid HAV",
        "Get vaccinated against hepatitis A and B",
        "Avoid sharing needles, razors, or contaminated fluids",
        "Practice safe sex and use barrier protection"
      ]
    },
    {
      condition: "Alcoholic liver disease",
      bilirubin: "~3–10 mg/dL",
      alkphos: "~120–250 IU/L",
      astAltPattern: "AST 150–400 IU/L, ALT 50–200 IU/L (AST/ALT ~2)",
      albumin: "2.5–3.5 g/dL",
      notes: "Chronic ethanol toxicity → fatty liver, alcoholic hepatitis, cirrhosis. Mitochondrial injury causes AST predominance; GGT is often elevated.",
      prevention: [
        "Completely avoid alcohol consumption",
        "Seek counseling/support groups for alcohol dependence",
        "Maintain a nutrient-rich, balanced diet with adequate protein",
        "Avoid self-medication with hepatotoxic drugs (e.g., high-dose acetaminophen)",
        "Schedule regular liver health check-ups"
      ]
    },
    {
      condition: "Cholestasis (biliary obstruction)",
      bilirubin: "~5–20 mg/dL",
      alkphos: "~300–900 IU/L",
      astAltPattern: "AST/ALT usually <200 IU/L",
      albumin: "3.5–5.0 g/dL",
      notes: "Bile duct obstruction (stones, tumors, strictures) causes conjugated hyperbilirubinemia. Presents with jaundice, intense pruritus, dark urine and pale stools.",
      prevention: [
        "Maintain healthy weight and diet to reduce gallstone risk",
        "Stay hydrated and include fiber to support bile flow",
        "Use ursodeoxycholic acid (UDCA) in early primary biliary cholangitis",
        "Get routine abdominal ultrasounds if at risk of gallstones or biliary disease",
        "Seek timely treatment for underlying causes (stones, strictures, tumors)"
      ]
    },
    {
      condition: "Cirrhosis (chronic liver disease)",
      bilirubin: "~2–15 mg/dL",
      alkphos: "~120–300 IU/L",
      astAltPattern: "AST 80–300 IU/L, ALT 40–200 IU/L (AST/ALT > 1)",
      albumin: "2.0–3.5 g/dL",
      notes: "End-stage fibrosis with portal hypertension. Signs include ascites, varices, encephalopathy. Synthetic dysfunction causes coagulopathy and hypoalbuminemia.",
      prevention: [
        "Abstain completely from alcohol",
        "Get vaccinated for hepatitis A and B, influenza, and pneumococcus",
        "Treat chronic hepatitis B or C promptly",
        "Maintain healthy weight, control diabetes, hypertension, and lipids",
        "Eat a well-balanced diet with adequate protein unless contraindicated",
        "Attend regular screenings for liver cancer (ultrasound ± AFP every 6 months)"
      ]
    },
    {
      condition: "NAFLD (nonalcoholic fatty liver)",
      bilirubin: "~0.8–2.0 mg/dL",
      alkphos: "~100–200 IU/L",
      astAltPattern: "AST 30–70 IU/L, ALT 40–100 IU/L (ratio ~0.7–1.5)",
      albumin: "3.5–5.0 g/dL",
      notes: "Hepatic steatosis associated with obesity and insulin resistance. Often asymptomatic; ALT predominance. Can progress to NASH and cirrhosis in metabolic syndrome.",
      prevention: [
        "Aim for 7–10% weight loss through gradual lifestyle changes",
        "Exercise at least 150 minutes per week (aerobic + resistance)",
        "Adopt a Mediterranean-style diet (high in fiber, lean proteins, healthy fats)",
        "Control blood sugar, cholesterol, and blood pressure",
        "Avoid sugary drinks, excess refined carbs, and saturated fats",
        "Go for periodic liver enzyme and ultrasound screening"
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Liver Condition Reference Guide</h2>

      <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-md">
        <p className="text-blue-800 text-sm font-medium">Clinical Reference Information</p>
        <p className="text-blue-700 text-sm mt-1">
          This table provides typical laboratory patterns for common liver conditions with approximate numeric values. Always interpret results clinically.
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
                <td className="border border-gray-200 px-4 py-3 text-sm">
                  <ul className="list-disc pl-5 text-gray-700 text-xs space-y-1">
                    {cond.prevention.map((tip, i) => (
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
          <strong>Important:</strong> Normal ranges may vary between laboratories. Always interpret results clinically and consult healthcare professionals for diagnosis and treatment.
        </p>
      </div>
    </div>
  );
};

export default ReferenceTable;
