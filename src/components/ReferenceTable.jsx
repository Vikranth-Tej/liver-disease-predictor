import React from 'react';

const ReferenceTable = () => {
  const conditions = [
    {
      condition: "Acute viral hepatitis (HAV, HBV, HCV)",
      bilirubin: "Elevated total bilirubin, predominantly conjugated",
      alkphos: "Moderately elevated",
      astAltPattern: "Markedly elevated (often ≥ 400 IU/L); ALT higher than AST (AST/ALT ratio < 1)",
      albumin: "Usually normal (falls only in fulminant cases)",
      notes: "Hepatocellular injury from viral infection with prodrome (fever, malaise) followed by jaundice; ALT peaks early, before bilirubin rise.",
      prevention: [
        "Good hygiene and safe food/water (especially to prevent hepatitis A)",
        "Vaccinate against hepatitis A and B",
        "Avoid contaminated needles/fluids"
      ]
    },
    {
      condition: "Alcoholic liver disease",
      bilirubin: "Elevated total bilirubin (mixed increase; mostly conjugated)",
      alkphos: "Mildly elevated",
      astAltPattern: "Elevated AST (often about 2× ALT); AST higher than ALT (AST/ALT ratio > 1)",
      albumin: "Decreased (impaired synthesis, malnutrition)",
      notes: "Chronic ethanol toxicity → fatty liver, alcoholic hepatitis, cirrhosis. Mitochondrial injury causes AST predominance; GGT is often elevated.",
      prevention: [
        "Strict abstinence from alcohol",
        "Avoid other hepatotoxins",
        "Ensure good nutrition"
      ]
    },
    {
      condition: "Cholestasis (biliary obstruction)",
      bilirubin: "Markedly elevated total bilirubin (mostly conjugated)",
      alkphos: "Markedly elevated (~3× or more above normal)",
      astAltPattern: "AST and ALT normal or mildly elevated (usually < 10×)",
      albumin: "Usually normal (decrease only in late chronic disease)",
      notes: "Bile duct obstruction (stones, tumors, strictures) causes conjugated hyperbilirubinemia. Presents with jaundice, intense pruritus, dark urine and pale stools.",
      prevention: [
        "Maintain healthy weight and diet to reduce gallstone risk",
        "Use ursodeoxycholic acid (UDCA) for primary biliary cholangitis",
        "Treat underlying causes"
      ]
    },
    {
      condition: "Cirrhosis (chronic liver disease)",
      bilirubin: "Elevated total bilirubin (especially direct in decompensated)",
      alkphos: "Normal or mildly elevated (higher if cholestatic features)",
      astAltPattern: "AST often ≥ ALT (AST usually higher; AST/ALT ratio > 1)",
      albumin: "Decreased (synthetic failure)",
      notes: "End-stage fibrosis with portal hypertension. Signs include ascites, varices, encephalopathy. “AST>ALT” (ratio>1) is common. Synthetic dysfunction causes coagulopathy and hypoalbuminemia.",
      prevention: [
        "Abstain from alcohol",
        "Treat viral hepatitis",
        "Control metabolic syndrome",
        "Vaccinate for hepatitis A and B (and influenza, pneumococcus)",
        "Maintain healthy weight and manage diabetes/HTN"
      ]
    },
    {
      condition: "NAFLD (nonalcoholic fatty liver)",
      bilirubin: "Normal or mildly elevated total bilirubin",
      alkphos: "Normal or mildly elevated",
      astAltPattern: "Mildly elevated; ALT higher than AST (AST/ALT ratio ~0.7–1.5)",
      albumin: "Normal",
      notes: "Hepatic steatosis associated with obesity and insulin resistance. Often asymptomatic; ALT predominance. Can progress to NASH and cirrhosis in metabolic syndrome.",
      prevention: [
        "Weight loss (aim 7–10% of body weight) and regular exercise",
        "Adopt a healthy diet",
        "Control diabetes and hyperlipidemia"
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Liver Condition Reference Guide</h2>

      <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-md">
        <p className="text-blue-800 text-sm font-medium">Clinical Reference Information</p>
        <p className="text-blue-700 text-sm mt-1">
          This table provides typical laboratory patterns for common liver conditions. Values may vary between individuals and laboratories. Always interpret results clinically.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">Condition</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">Total bilirubin (mostly direct)</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">ALP level</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">AST and ALT (ratio)</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">Albumin (synthetic)</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">Clinical notes</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">Prevention (Lifestyle/Medical)</th>
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
