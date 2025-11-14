const conditions = [
  {
    condition: "Normal reference",
    bilirubin: "0.3–1.2 mg/dL",
    alkphos: "44–147 IU/L",
    astAltPattern: "AST 10–40 IU/L, ALT 7–56 IU/L",
    albumin: "3.5–5.0 g/dL",
    notes: "Baseline liver values for healthy adults.",
    prevention: ["Baseline health — no intervention needed"],
    screening: "Routine annual health check-up",
    interpretation: "Safe / normal physiology"
  },
  {
    condition: "Acute viral hepatitis (HAV, HBV, HCV)",
    bilirubin: "~5–15 mg/dL",
    alkphos: "~150–350 IU/L",
    astAltPattern: "AST 400–800 IU/L, ALT 600–1200 IU/L (ALT > AST; AST/ALT < 1)",
    albumin: "3.5–5.0 g/dL",
    notes: "Hepatocellular injury from viral infection; ALT rises earliest before bilirubin.",
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
    condition: "Alcoholic liver disease",
    bilirubin: "~3–10 mg/dL",
    alkphos: "~120–250 IU/L",
    astAltPattern: "AST 150–400 IU/L, ALT 50–200 IU/L (AST/ALT ≈ 2)",
    albumin: "2.5–3.5 g/dL",
    notes: "Ethanol toxicity leading to steatosis → hepatitis → cirrhosis.",
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
    condition: "Cholestasis (biliary obstruction)",
    bilirubin: "~5–20 mg/dL",
    alkphos: "~300–900 IU/L",
    astAltPattern: "AST < 200 IU/L, ALT < 200 IU/L",
    albumin: "3.5–5.0 g/dL",
    notes: "Obstruction causing conjugated hyperbilirubinemia, dark urine, pale stools.",
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
    condition: "Cirrhosis (chronic liver disease)",
    bilirubin: "~2–15 mg/dL",
    alkphos: "~120–300 IU/L",
    astAltPattern: "AST 80–300 IU/L, ALT 40–200 IU/L (AST/ALT > 1)",
    albumin: "2.0–3.5 g/dL",
    notes: "End-stage fibrosis causing portal hypertension, ascites, varices.",
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
    condition: "NAFLD (nonalcoholic fatty liver)",
    bilirubin: "~0.8–2.0 mg/dL",
    alkphos: "~100–200 IU/L",
    astAltPattern: "AST 30–70 IU/L, ALT 40–100 IU/L (ALT > AST; ratio 0.7–1.5)",
    albumin: "3.5–5.0 g/dL",
    notes: "Steatosis due to obesity/insulin resistance; ALT predominance.",
    prevention: [
      "Lose 7–10% body weight",
      "Exercise 150 min/week",
      "Mediterranean diet",
      "Control sugar, cholesterol, blood pressure",
      "Avoid sugary drinks & refined carbs"
    ],
    screening: "Liver Ultrasound, Fibroscan annually",
    interpretation: "Mildly harmful — risk for progression to NASH/cirrhosis"
  }
];
