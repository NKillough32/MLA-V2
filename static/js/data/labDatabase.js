// Lab Values Database for MLA Quiz PWA
// Extracted from app.js for better organization

window.labDatabase = {
    'cbc': {
        name: 'Complete Blood Count (CBC)',
        values: {
            'WBC': { 
                normal: '4.0-11.0 × 10⁹/L', 
                low: 'Immunosuppression, viral infection, autoimmune disease, chemotherapy', 
                high: 'Bacterial infection, leukaemia, stress, tissue necrosis, smoking',
                critical: '<1.0 or >30 × 10⁹/L',
                ageVariations: 'Neonate: 9-30, Child: 5-17, Adult: 4.0-11.0',
                clinicalSignificance: 'Left shift suggests bacterial infection. Lymphocytosis in viral infections.'
            },
            'RBC': { 
                normal: 'M: 4.5-6.5, F: 3.8-5.8 × 10¹²/L', 
                low: 'Anaemia (iron deficiency, chronic disease, haemolysis), bleeding, kidney disease', 
                high: 'Polycythaemia vera, dehydration, COPD, high altitude',
                critical: '<2.5 or >7.0 × 10¹²/L',
                ageVariations: 'Neonate: 4.0-6.6, Child: 3.7-5.3',
                clinicalSignificance: 'Combined with Hb/Hct for anaemia classification. MCV helps determine type.'
            },
            'Haemoglobin': { 
                normal: 'M: 130-180 g/L, F: 115-165 g/L', 
                low: 'Anaemia, bleeding, iron deficiency, chronic kidney disease', 
                high: 'Polycythaemia, dehydration, COPD, smoking',
                critical: '<70 or >200 g/L',
                ageVariations: 'Neonate: 140-240, Child: 110-160, Pregnancy: 110-130',
                clinicalSignificance: 'Best indicator of oxygen-carrying capacity. Transfusion threshold typically <70-80 g/L.'
            },
            'Platelets': { 
                normal: '150-450 × 10⁹/L', 
                low: 'ITP, drug-induced, hypersplenism, viral infection, heparin', 
                high: 'Essential thrombocythaemia, reactive (infection, malignancy), iron deficiency',
                critical: '<20 or >1000 × 10⁹/L',
                ageVariations: 'Consistent across ages',
                clinicalSignificance: 'Bleeding risk increases <50. Spontaneous bleeding <10. Thrombosis risk >1000.'
            },
            'MCV': {
                normal: '82-98 fL',
                low: 'Iron deficiency, thalassaemia, chronic disease, lead poisoning',
                high: 'B12/folate deficiency, alcohol use, hypothyroidism, reticulocytosis',
                critical: '<70 or >120 fL',
                ageVariations: 'Child: 70-90, Adult: 82-98',
                clinicalSignificance: 'Microcytic: iron studies. Macrocytic: B12/folate levels. Normocytic: chronic disease.'
            }
        }
    },
    'bmp': {
        name: 'Basic Metabolic Panel (BMP)',
        values: {
            'Glucose': { 
                normal: '3.9-5.6 mmol/L (fasting), <7.8 random', 
                low: 'Hypoglycaemia: insulin excess, liver disease, adrenal insufficiency, starvation', 
                high: 'Diabetes, prediabetes, stress, steroids, pancreatic disease',
                critical: '<2.2 or >22 mmol/L',
                ageVariations: 'Child: 3.3-5.6, Adult: 3.9-5.6, Elderly: may be slightly higher',
                clinicalSignificance: 'Fasting >7.0 or random >11.1 suggests diabetes. HbA1c >48 mmol/mol diagnostic.'
            },
            'Urea': { 
                normal: '2.5-7.5 mmol/L', 
                low: 'Liver disease, malnutrition, overhydration, low protein diet', 
                high: 'Acute/chronic kidney disease, dehydration, GI bleeding, high protein diet',
                critical: '>35 mmol/L',
                ageVariations: 'Child: 1.8-6.4, Adult: 2.5-7.5, Elderly: may be elevated',
                clinicalSignificance: 'Urea:Creatinine ratio >100:1 suggests prerenal azotemia. <40:1 suggests liver disease.'
            },
            'Creatinine': { 
                normal: 'M: 62-115 μmol/L, F: 53-97 μmol/L', 
                low: 'Low muscle mass, malnutrition, pregnancy', 
                high: 'Acute/chronic kidney disease, dehydration, muscle breakdown',
                critical: '>354 μmol/L or >3× baseline',
                ageVariations: 'Child: 27-62, Adult varies by muscle mass, Elderly: lower baseline',
                clinicalSignificance: 'Use eGFR for kidney function. ≥26 μmol/L rise in 48h = AKI. Delayed rise after injury.'
            },
            'eGFR': {
                normal: '>90 mL/min/1.73m²',
                low: 'CKD stages: 60-89 (stage 2), 45-59 (3a), 30-44 (3b), 15-29 (4), <15 (5)',
                high: 'Hyperfiltration (early diabetes), pregnancy',
                critical: '<15 mL/min/1.73m² (dialysis consideration)',
                ageVariations: 'Declines ~1 mL/min/year after age 40',
                clinicalSignificance: 'More accurate than creatinine alone. Adjust medications at <60. Nephrology referral <30.'
            },
            'Sodium': { 
                normal: '135-145 mmol/L', 
                low: 'SIADH, diuretics, heart failure, liver disease, hypothyroidism', 
                high: 'Dehydration, diabetes insipidus, excess salt intake, hyperaldosteronism',
                critical: '<125 or >160 mmol/L',
                ageVariations: 'Consistent across ages',
                clinicalSignificance: 'Hyponatraemia symptoms: confusion, seizures. Correct slowly (8-12 mmol/L/day) to avoid osmotic demyelination.'
            },
            'Potassium': {
                normal: '3.5-5.0 mmol/L',
                low: 'Diuretics, diarrhoea, hyperaldosteronism, poor intake, alkalosis',
                high: 'Kidney disease, ACE inhibitors, tissue breakdown, acidosis, haemolysis',
                critical: '<2.5 or >6.5 mmol/L',
                ageVariations: 'Consistent across ages',
                clinicalSignificance: 'Cardiac effects: peaked T-waves >6.5, paralysis >8.0. Replace cautiously in kidney disease.'
            },
            'Bicarbonate': {
                normal: '22-29 mmol/L',
                low: 'Metabolic acidosis (DKA, lactic acidosis, renal failure)',
                high: 'Metabolic alkalosis (vomiting, diuretics), respiratory acidosis',
                critical: '<15 or >35 mmol/L',
                ageVariations: 'Child: 20-28, Adult: 22-29',
                clinicalSignificance: 'Reflects bicarbonate level. Low HCO3 with high anion gap suggests metabolic acidosis.'
            },
            'Chloride': {
                normal: '98-106 mmol/L',
                low: 'Vomiting, NG suction, loop diuretics, metabolic alkalosis',
                high: 'Dehydration, renal tubular acidosis, metabolic acidosis, bromide toxicity',
                critical: '<85 or >115 mmol/L',
                ageVariations: 'Consistent across ages',
                clinicalSignificance: 'Interpret alongside sodium, bicarbonate and anion gap. Hypochloraemia drives metabolic alkalosis; hyperchloraemia can indicate saline overload.'
            },
            'Calcium (corrected)': {
                normal: '2.20-2.60 mmol/L',
                low: 'Hypoparathyroidism, vitamin D deficiency, CKD, pancreatitis',
                high: 'Primary hyperparathyroidism, malignancy, vitamin D toxicity, thiazide diuretics',
                critical: '<1.90 or >3.00 mmol/L',
                ageVariations: 'Consistent across ages',
                clinicalSignificance: 'Correct for albumin: Corrected Ca = measured Ca + 0.02 × (40 - albumin g/L). Hypercalcaemia >3 mmol/L can cause arrhythmia and coma.'
            },
            'Magnesium': {
                normal: '0.7-1.0 mmol/L',
                low: 'Diuretics, malnutrition, alcoholism, diarrhoea, PPIs',
                high: 'Renal failure, excessive supplementation, tumour lysis, adrenal insufficiency',
                critical: '<0.5 or >2.5 mmol/L',
                ageVariations: 'Slightly lower in paediatrics',
                clinicalSignificance: 'Low magnesium worsens hypokalaemia and hypocalcaemia; severe deficiency causes torsades. High magnesium depresses reflexes and respiration.'
            },
            'Phosphate': {
                normal: '0.8-1.5 mmol/L',
                low: 'Refeeding syndrome, DKA treatment, alcohol misuse, hyperparathyroidism',
                high: 'Renal failure, tumour lysis, rhabdomyolysis, hypoparathyroidism',
                critical: '<0.3 or >2.5 mmol/L',
                ageVariations: 'Higher in children due to bone turnover',
                clinicalSignificance: 'Severe hypophosphataemia causes respiratory failure and haemolysis. Correct slowly, monitor calcium to avoid precipitation.'
            },
            'Anion Gap': {
                normal: '8-16 mmol/L',
                low: 'Hypoalbuminaemia, lab error, multiple myeloma',
                high: 'MUDPILES causes (methanol, uremia, DKA, propylene glycol, isoniazid/iron, lactic acidosis, ethylene glycol, salicylates)',
                critical: '>20 mmol/L suggests high anion gap metabolic acidosis',
                ageVariations: 'Slightly lower in elderly with low albumin',
                clinicalSignificance: 'AG = Na - (Cl + HCO3). Guides differential for metabolic acidosis and triggers lactate/ketone testing.'
            }
        }
    },
    'lft': {
        name: 'Liver Function Tests (LFT)',
        values: {
            'ALT': { 
                normal: 'M: 5-40 U/L, F: 5-35 U/L', 
                low: 'Rarely clinically significant', 
                high: 'Hepatocellular injury: hepatitis, drugs, alcohol, NASH, Wilson disease',
                critical: '>1000 U/L (acute hepatic necrosis)',
                ageVariations: 'Child: 5-25, Adult varies by gender',
                clinicalSignificance: 'More liver-specific than AST. ALT>AST suggests hepatocellular injury. Peak in acute hepatitis: 1000-5000.'
            },
            'AST': { 
                normal: 'M: 5-40 U/L, F: 5-35 U/L', 
                low: 'Rarely clinically significant', 
                high: 'Liver/muscle damage, MI, haemolysis, alcohol use',
                critical: '>1000 U/L',
                ageVariations: 'Child: 15-40, Adult varies by gender',
                clinicalSignificance: 'AST>ALT (ratio >2) suggests alcohol. Also elevated in muscle disease, MI, haemolysis.'
            },
            'Alkaline Phosphatase': { 
                normal: '30-130 U/L (adult)', 
                low: 'Hypothyroidism, malnutrition, Wilson disease', 
                high: 'Cholestasis, bone disease, pregnancy, malignancy, Paget disease',
                critical: '>5× upper limit',
                ageVariations: 'Child/adolescent: 100-390 (bone growth), Pregnancy: elevated',
                clinicalSignificance: 'Elevated with GGT suggests hepatic source. Isolated elevation: bone disease, pregnancy.'
            },
            'GGT': {
                normal: 'M: 5-55 U/L, F: 5-35 U/L',
                low: 'Rarely significant',
                high: 'Alcohol use, cholestasis, drugs, NASH',
                critical: '>10× upper limit',
                ageVariations: 'Increases with age',
                clinicalSignificance: 'Most sensitive for alcohol use. Helps differentiate hepatic vs. bone source of elevated ALP.'
            },
            'Total Bilirubin': { 
                normal: '5-20 μmol/L', 
                low: 'Rarely significant', 
                high: 'Haemolysis, liver disease, Gilbert syndrome, cholestasis',
                critical: '>340 μmol/L',
                ageVariations: 'Newborn: physiologic elevation first week',
                clinicalSignificance: 'Conjugated >34 μmol/L suggests hepatic/post-hepatic cause. Unconjugated elevation: haemolysis, Gilbert.'
            },
            'Albumin': { 
                normal: '35-50 g/L', 
                low: 'Liver disease, malnutrition, nephrotic syndrome, inflammation', 
                high: 'Dehydration (rare)',
                critical: '<20 g/L',
                ageVariations: 'Child: 34-48, Adult: 35-50, Elderly: may be lower',
                clinicalSignificance: 'Half-life 20 days, reflects chronic liver function. Low albumin increases drug free fractions.'
            },
            'PT/INR': { 
                normal: 'PT: 10-14 sec, INR: 0.9-1.2', 
                low: 'Hypercoagulable state (rare)', 
                high: 'Liver disease, warfarin, vitamin K deficiency, factor deficiencies',
                critical: 'INR >5.0',
                ageVariations: 'Consistent across ages',
                clinicalSignificance: 'Reflects hepatic synthetic function. Warfarin target INR: 2-3 (most), 2.5-3.5 (mechanical valves).'
            }
        }
    },
    'lipids': {
        name: 'Lipid Panel',
        values: {
            'Total Cholesterol': { 
                normal: '<5.0 mmol/L (optimal)', 
                low: 'Malnutrition, hyperthyroidism, liver disease, malabsorption', 
                high: 'Familial hypercholesterolaemia, diabetes, hypothyroidism, diet',
                critical: '>7.5 mmol/L',
                ageVariations: 'Increases with age until menopause (women)',
                clinicalSignificance: 'Borderline high: 5.0-6.2. High: ≥6.2. Less important than LDL for risk assessment.'
            },
            'LDL': { 
                normal: '<2.6 mmol/L (optimal), <1.8 (high risk)', 
                low: 'Overtreatment, malnutrition, hyperthyroidism', 
                high: 'Primary hyperlipidaemia, diabetes, hypothyroidism, diet',
                critical: '>4.9 mmol/L',
                ageVariations: 'Increases with age',
                clinicalSignificance: 'Primary target for statin therapy. Goals: <1.8 (very high risk), <2.6 (high risk), <3.0 (moderate risk).'
            },
            'HDL': { 
                normal: 'M: >1.0 mmol/L, F: >1.3 mmol/L', 
                low: 'Metabolic syndrome, diabetes, smoking, sedentary lifestyle', 
                high: 'Cardioprotective, exercise, moderate alcohol, genetics',
                critical: '<0.6 mmol/L',
                ageVariations: 'Higher in premenopausal women',
                clinicalSignificance: 'Low HDL major CAD risk factor. HDL >1.5 is protective.'
            },
            'Triglycerides': { 
                normal: '<1.7 mmol/L', 
                low: 'Malnutrition, hyperthyroidism', 
                high: 'Diabetes, alcohol, obesity, familial hypertriglyceridaemia',
                critical: '>11.3 mmol/L (pancreatitis risk)',
                ageVariations: 'Increases with age',
                clinicalSignificance: 'High: 2.3-5.6. Very high: ≥5.6. Pancreatitis risk >10.0. Fasting required for accuracy.'
            }
        }
    },
    'thyroid': {
        name: 'Thyroid Function Tests',
        values: {
            'TSH': {
                normal: '0.4-4.0 mIU/L',
                low: 'Hyperthyroidism, central hypothyroidism, pregnancy (1st trimester)',
                high: 'Primary hypothyroidism, subclinical hypothyroidism',
                critical: '<0.01 or >20 mIU/L',
                ageVariations: 'Elderly: upper limit may be 6-7 mIU/L',
                clinicalSignificance: 'Best screening test. Suppressed in hyperthyroidism, elevated in primary hypothyroidism.'
            },
            'Free T4': {
                normal: '12-22 pmol/L',
                low: 'Hypothyroidism, central thyroid disease, severe illness',
                high: 'Hyperthyroidism, excess thyroid hormone replacement',
                critical: '<5 or >50 pmol/L',
                ageVariations: 'Consistent across ages',
                clinicalSignificance: 'Reflects thyroid hormone activity. Normal with abnormal TSH suggests subclinical disease.'
            },
            'Free T3': {
                normal: '3.1-6.8 pmol/L',
                low: 'Hypothyroidism, sick euthyroid syndrome',
                high: 'Hyperthyroidism, T3 toxicosis',
                critical: '<2.0 or >15 pmol/L',
                ageVariations: 'Decreases slightly with age',
                clinicalSignificance: 'Most metabolically active hormone. May be normal in early hypothyroidism.'
            }
        }
    },
    'cardiac_markers': {
        name: 'Cardiac Markers',
        values: {
            'Troponin I': {
                normal: '<0.04 μg/L',
                low: 'No clinical significance',
                high: 'MI, myocarditis, PE, renal failure, sepsis, heart failure',
                critical: '>10× upper limit',
                ageVariations: 'May be slightly elevated in elderly',
                clinicalSignificance: 'Most specific for myocardial injury. Rise 3-6h, peak 12-24h, elevated 7-14 days. High-sensitivity assays available.'
            },
            'BNP': {
                normal: '<100 pg/mL',
                low: 'Heart failure unlikely',
                high: 'Heart failure, renal failure, PE, atrial fibrillation',
                critical: '>1000 pg/mL',
                ageVariations: 'Increases with age',
                clinicalSignificance: 'Excellent negative predictive value for heart failure. NT-proBNP alternative with different cutoffs.'
            }
        }
    },
    'inflammatory_markers': {
        name: 'Inflammatory Markers',
        values: {
            'CRP': {
                normal: '<3 mg/L',
                low: 'No active inflammation',
                high: 'Infection, inflammation, malignancy, tissue necrosis',
                critical: '>200 mg/L',
                ageVariations: 'Consistent across ages',
                clinicalSignificance: 'Acute phase protein. Rises within 6h, peaks 24-48h. Useful for monitoring treatment response.'
            },
            'ESR': {
                normal: 'M: <age/2, F: <(age+10)/2',
                low: 'Polycythemia, severe heart failure, hypofibrinogenemia',
                high: 'Infection, inflammation, malignancy, anemia, pregnancy',
                critical: '>100 mm/h',
                ageVariations: 'Increases significantly with age',
                clinicalSignificance: 'Non-specific. Takes days to change. Still useful in temporal arteritis, polymyalgia rheumatica.'
            }
        }
    },
    'vitamins_minerals': {
        name: 'Vitamins & Minerals',
        values: {
            'Vitamin B12': {
                normal: '200-900 ng/L',
                low: 'Pernicious anaemia, malabsorption, vegan diet, metformin use, gastric surgery',
                high: 'B12 supplementation, liver disease, myeloproliferative disorders',
                critical: '<150 ng/L',
                ageVariations: 'Absorption decreases with age',
                clinicalSignificance: 'Deficiency causes macrocytic anaemia, neuropathy. Check MMA/homocysteine if borderline. Treat empirically if symptomatic.'
            },
            'Folate': {
                normal: '3-20 μg/L',
                low: 'Poor diet, malabsorption, alcohol, antifolate drugs (methotrexate), pregnancy',
                high: 'Folate supplementation, rarely clinically significant',
                critical: '<2 μg/L',
                ageVariations: 'Requirements increase in pregnancy',
                clinicalSignificance: 'Deficiency causes macrocytic anaemia. Always check B12 concurrently. Treat B12 deficiency before folate.'
            },
            'Vitamin D': {
                normal: '>50 nmol/L (adequate), 30-50 (insufficient), <30 (deficient)',
                low: 'Limited sun exposure, malabsorption, CKD, obesity, dark skin',
                high: 'Vitamin D toxicity, excessive supplementation',
                critical: '<25 nmol/L (severe deficiency)',
                ageVariations: 'Elderly at higher risk of deficiency',
                clinicalSignificance: 'Deficiency causes osteomalacia, osteoporosis. Supplement if <50. Check PTH if low. Common in UK population.'
            },
            'Ferritin': {
                normal: 'M: 30-300 μg/L, F: 15-200 μg/L',
                low: 'Iron deficiency anaemia, blood loss, poor intake, malabsorption',
                high: 'Inflammation, infection, liver disease, haemochromatosis, malignancy',
                critical: '<15 μg/L (iron deficiency)',
                ageVariations: 'Lower in premenopausal women due to menstruation',
                clinicalSignificance: 'Best test for iron stores. <30 suggests iron deficiency even if not anaemic. Acute phase protein - can be falsely elevated.'
            }
        }
    },
    'coagulation': {
        name: 'Coagulation Profile',
        values: {
            'Prothrombin Time (PT)': {
                normal: '10-14 seconds',
                low: 'Shortened PT rarely clinically significant (can indicate high Factor VII activity)',
                high: 'Vitamin K deficiency, liver disease, warfarin therapy, disseminated intravascular coagulation',
                critical: '>20 seconds or INR >5',
                ageVariations: 'Neonates have mildly prolonged PT due to immature liver function',
                clinicalSignificance: 'Prolonged PT suggests extrinsic pathway defect; monitor warfarin therapy'
            },
            'International Normalised Ratio (INR)': {
                normal: '0.9-1.2 (non-anticoagulated)',
                low: 'Hypercoagulable state (rare, usually lab variation)',
                high: 'Warfarin overdose, vitamin K deficiency, liver failure, DIC',
                critical: '>5.0 or any elevation with bleeding',
                ageVariations: 'Consistent across ages; therapeutic ranges depend on indication',
                clinicalSignificance: 'Target 2.0-3.0 for AF/DVT/PE; 2.5-3.5 for mechanical mitral valve'
            },
            'Activated Partial Thromboplastin Time (APTT)': {
                normal: '25-35 seconds',
                low: 'Shortened APTT rarely significant (e.g., high Factor VIII)',
                high: 'Heparin therapy, lupus anticoagulant, factor deficiencies (VIII, IX, XI), DIC',
                critical: '>70 seconds or any elevation with bleeding',
                ageVariations: 'Slightly prolonged in neonates',
                clinicalSignificance: 'Evaluates intrinsic pathway; monitor unfractionated heparin therapy'
            },
            'Fibrinogen': {
                normal: '1.5-4.0 g/L',
                low: 'DIC, liver disease, massive transfusion, congenital hypofibrinogenaemia',
                high: 'Inflammation, pregnancy, malignancy',
                critical: '<1.0 g/L (bleeding risk)',
                ageVariations: 'Increases in pregnancy (up to 6.0 g/L)',
                clinicalSignificance: 'Key target in major haemorrhage – aim >2.0 g/L in obstetric bleeding'
            },
            'D-dimer': {
                normal: '<500 ng/mL FEU (age-adjusted: age × 10 over 50 years)',
                low: 'Effectively rules out VTE in low clinical probability when combined with Wells score',
                high: 'VTE, DIC, infection, malignancy, pregnancy, recent surgery',
                critical: '>4000 ng/mL FEU raises concern for severe thrombosis/DIC but must be interpreted clinically',
                ageVariations: 'Increases with age and pregnancy; use age-adjusted cut-offs where validated',
                clinicalSignificance: 'Highly sensitive but poorly specific; only order when VTE probability is low or intermediate to avoid unnecessary imaging.'
            }
        }
    },
    'abg': {
        name: 'Arterial Blood Gas (ABG)',
        values: {
            'pH': {
                normal: '7.35-7.45',
                low: 'Metabolic acidosis (DKA, renal failure), respiratory acidosis (CO2 retention)',
                high: 'Metabolic alkalosis (vomiting, diuretics), respiratory alkalosis (hyperventilation)',
                critical: '<7.10 or >7.60 associated with arrhythmia and reduced cerebral blood flow',
                clinicalSignificance: 'Primary acid–base status. Always interpret with PaCO2, HCO3- and anion gap. Mixed disorders common in critical illness.'
            },
            'pCO2': {
                normal: '35-45 mmHg (4.7-6.0 kPa)',
                low: 'Hyperventilation, pulmonary embolism, pain/anxiety, high altitude',
                high: 'Hypoventilation, COPD, opiate overdose, neuromuscular disease',
                critical: '>60 mmHg suggests ventilatory failure needing urgent support',
                clinicalSignificance: 'Respiratory contribution to acid–base balance. Acute vs chronic retention determined by pH and bicarbonate compensation.'
            },
            'pO2': {
                normal: '80-100 mmHg (10.6-13.3 kPa) on room air',
                low: 'Hypoventilation, diffusion defects, V/Q mismatch, shunt',
                high: 'Supplemental oxygen',
                critical: '<60 mmHg (8 kPa) indicates significant hypoxaemia',
                clinicalSignificance: 'Assess oxygenation relative to FiO2. Calculate A–a gradient to refine differential.'
            },
            'HCO3-': {
                normal: '22-26 mmol/L',
                low: 'Metabolic acidosis (renal failure, DKA, lactic acidosis)',
                high: 'Metabolic alkalosis, chronic respiratory acidosis compensation',
                critical: '<12 or >40 mmol/L',
                clinicalSignificance: 'Metabolic component of acid–base status. Compare with calculated bicarbonate from CO2 to ensure internal consistency.'
            },
            'Base excess': {
                normal: '-2 to +2 mmol/L',
                low: 'Negative BE indicates metabolic acidosis or inadequate perfusion',
                high: 'Positive BE suggests metabolic alkalosis or chronic CO2 retention',
                critical: '<-10 or >+10 mmol/L',
                clinicalSignificance: 'Represents metabolic buffer reserve. Helpful when multiple simultaneous disorders suspected.'
            },
            'Lactate': {
                normal: '<2 mmol/L',
                high: 'Sepsis, shock, seizure, hepatic failure, beta-agonists, metformin',
                critical: '≥4 mmol/L indicates severe tissue hypoperfusion and worse prognosis',
                clinicalSignificance: 'Trend with resuscitation. Rapid rise or failure to clear >2 mmol/L warrants escalation and search for occult hypoperfusion.'
            }
        }
    },
    'amylase_lipase': {
        name: 'Pancreatic Enzymes',
        values: {
            'Serum Amylase': {
                normal: '23-85 U/L (lab-dependent)',
                low: 'Exocrine pancreatic insufficiency, chronic pancreatitis with gland burnout',
                high: 'Acute pancreatitis, salivary gland disease, perforated ulcer, intestinal obstruction, renal failure',
                critical: '>3× upper limit strongly suggests acute pancreatitis',
                clinicalSignificance: 'Rises within hours but normalises quickly. Lipase has greater sensitivity and specificity.'
            },
            'Serum Lipase': {
                normal: '0-160 U/L (lab-dependent)',
                low: 'Exocrine pancreatic insufficiency (rare)',
                high: 'Acute pancreatitis, pancreatic duct obstruction, renal failure, DKA, bowel obstruction',
                critical: '>3× upper limit with epigastric pain diagnostic for pancreatitis per NICE guidelines',
                clinicalSignificance: 'Preferred test – remains elevated for 8-14 days allowing later presentation diagnosis.'
            }
        }
    },
    'muscle_markers': {
        name: 'Muscle Injury Markers',
        values: {
            'Creatine Kinase (CK)': {
                normal: '25-200 U/L (lab-dependent)',
                low: 'Reduced muscle mass, advanced myopathy',
                high: 'Rhabdomyolysis, statin toxicity, seizures, strenuous exercise, myocardial infarction',
                critical: '>5000 U/L associated with AKI risk – check potassium and renal function',
                clinicalSignificance: 'Trend downwards with hydration. If CK >10,000 U/L consider aggressive IV fluids and urine alkalinisation.'
            },
            'CK-MB': {
                normal: '<5% of total CK or <25 U/L',
                high: 'Myocardial infarction, myocarditis, cardiac surgery, severe skeletal muscle injury',
                critical: 'Rapid rise/fall pattern >5% CK highly suggestive of myocardial damage',
                clinicalSignificance: 'Superseded by troponin but useful for reinfarction because of shorter half-life.'
            },
            'Myoglobin': {
                normal: '<90 ng/mL',
                high: 'Early marker of rhabdomyolysis or MI; also rises with seizures, crush injury',
                clinicalSignificance: 'Appears within 2 hours of muscle injury. High renal clearance – monitor urine colour and renal function.'
            }
        }
    },
    'metabolic_special': {
        name: 'Metabolic & Critical Care Markers',
        values: {
            'Ammonia': {
                normal: '11-35 μmol/L (lab-dependent)',
                low: 'Rarely clinically significant',
                high: 'Hepatic encephalopathy, urea cycle disorders, valproate therapy',
                critical: '>150 μmol/L with encephalopathy warrants urgent treatment',
                clinicalSignificance: 'Transport on ice and analyse rapidly. Elevated levels do not exclude other causes of encephalopathy; repeat if clinical suspicion high.'
            },
            'Serum Osmolality': {
                normal: '275-295 mOsm/kg',
                low: 'Overhydration, SIADH, adrenal insufficiency',
                high: 'Hypernatraemia, hyperglycaemia, toxic alcohol ingestion',
                critical: '>320 mOsm/kg associated with hyperosmolar states',
                clinicalSignificance: 'Calculate osmolar gap = measured - calculated. Gap >10 suggests toxic alcohols (methanol, ethylene glycol, propylene glycol).'
            },
            'Procalcitonin': {
                normal: '<0.05 μg/L',
                low: 'Bacterial infection unlikely',
                high: '>0.5 μg/L suggests bacterial sepsis or severe bacterial infection',
                critical: '>2.0 μg/L associated with high risk of organ dysfunction',
                clinicalSignificance: 'Use to guide antibiotic stewardship in sepsis and lower respiratory tract infections. Viral infections usually produce minimal rise.'
            }
        }
    },
    'pregnancy_tests': {
        name: 'Pregnancy Testing',
        values: {
            'Urine hCG (qualitative)': {
                normal: 'Negative',
                high: 'Positive indicates pregnancy but may also reflect recent miscarriage or hCG-secreting tumours',
                clinicalSignificance: 'Detects pregnancy from ~4 weeks gestation. False negatives occur with dilute urine or very early testing.'
            },
            'Serum β-hCG (quantitative)': {
                normal: '<5 IU/L (non-pregnant)',
                high: 'Normal pregnancy (rises ~66% every 48 h early on), ectopic pregnancy (plateau), gestational trophoblastic disease (extremely high)',
                critical: 'Falling or plateauing levels with pain/bleeding suggest ectopic – urgent ultrasound',
                clinicalSignificance: 'Essential before teratogenic drugs or radiology, for monitoring miscarriage/ectopic, and in suspected trophoblastic tumours.'
            }
        }
    },
    'therapeutic_levels': {
        name: 'Therapeutic Drug Levels (common examples)',
        values: {
            'Vancomycin (trough)': {
                normal: '10-15 mg/L for mild infections, 15-20 mg/L for MRSA pneumonia/endocarditis',
                high: '>25 mg/L increases nephrotoxicity risk',
                clinicalSignificance: 'Draw just before 4th dose. Adjust interval in renal impairment and monitor creatinine.'
            },
            'Gentamicin (peak/trough)': {
                normal: 'Peak 5-10 mg/L (synergy 3-5 mg/L), trough <1 mg/L',
                high: 'Peak >12 mg/L or trough ≥2 mg/L linked to ototoxicity/nephrotoxicity',
                clinicalSignificance: 'Timing critical—peak 30 min post infusion, trough immediately pre-dose. Use nomograms for extended-interval dosing.'
            },
            'Lithium': {
                normal: '0.6-1.0 mmol/L (maintenance), 0.8-1.2 mmol/L (acute mania)',
                high: '>1.5 mmol/L causes tremor, ataxia, confusion; >2.0 mmol/L is medical emergency',
                clinicalSignificance: 'Check 12 h post-dose every 3 months. Monitor renal/thyroid function and review interacting drugs (ACEi, NSAIDs, thiazides).'
            },
            'Digoxin': {
                normal: '0.5-2.0 ng/mL (0.6-2.6 nmol/L)',
                high: '>2.5 ng/mL associated with arrhythmias, GI upset, visual halos',
                clinicalSignificance: 'Draw ≥6 h post dose. Toxicity risk increases with hypokalaemia or renal dysfunction.'
            },
            'Phenytoin': {
                normal: '10-20 mg/L (40-80 μmol/L)',
                high: '>20 mg/L causes nystagmus, ataxia; >30 mg/L may cause coma',
                clinicalSignificance: 'Highly protein bound—correct for albumin. Non-linear kinetics so dose adjustments must be small.'
            },
            'Theophylline': {
                normal: '10-20 mg/L',
                high: '>20 mg/L leads to arrhythmias, seizures, persistent vomiting',
                clinicalSignificance: 'Levels rise rapidly with CYP inhibitors and in sepsis. Obtain immediately in toxicity or after dose changes.'
            }
        }
    },
    'blood_film': {
        name: 'Blood Film',
        indication: 'Detailed examination of blood cells under microscopy',
        clinicalSignificance: 'Ordered when CBC shows abnormalities or when specific conditions suspected (malaria, leukaemia, haemolysis)',
        findings: {
            'Normal': 'RBCs: normocytic, normochromic, central pallor. WBCs: normal distribution. Platelets: adequate.',
            'Microcytic anaemia': 'Hypochromic, microcytic RBCs, pencil cells (iron deficiency). Target cells (thalassaemia)',
            'Macrocytic anaemia': 'Macrocytes, hypersegmented neutrophils (B12/folate deficiency). Megaloblasts if severe',
            'Haemolytic anaemia': 'Spherocytes (hereditary spherocytosis, AIHA), schistocytes (MAHA), sickle cells',
            'Leukaemia': 'Blast cells, immature WBCs, Auer rods (AML)',
            'Infection': 'Toxic granulation, left shift, reactive lymphocytes (viral)',
            'Malaria': 'Parasites within RBCs, ring forms, gametocytes',
            'Others': 'Howell-Jolly bodies (hyposplenism), Heinz bodies (G6PD deficiency), rouleaux (myeloma)'
        }
    },
    'group_save_crossmatch': {
        name: 'Group & Save / Crossmatch',
        indication: 'Pre-operative or before transfusion',
        clinicalSignificance: 'Group & Save: blood group (ABO, Rh) identified and antibodies screened, no blood reserved. Crossmatch: compatible blood units reserved for patient',
        values: {
            'Blood Group': {
                normal: 'O, A, B, AB with Rh +ve or -ve',
                clinicalSignificance: 'O -ve is universal donor. AB +ve is universal recipient. Rh -ve mothers need anti-D prophylaxis if baby Rh +ve'
            },
            'Antibody Screen': {
                normal: 'Negative',
                positive: 'Indicates atypical antibodies (from previous transfusions, pregnancy). Extended crossmatch needed',
                clinicalSignificance: 'Positive screen may delay transfusion while compatible units located'
            }
        }
    },
    'hba1c': {
        name: 'Haemoglobin A1c (Glycated Haemoglobin)',
        values: {
            'HbA1c': {
                normal: '<42 mmol/mol (<6.0%)',
                high: 'Prediabetes: 42-47 mmol/mol (6.0-6.4%). Diabetes: ≥48 mmol/mol (≥6.5%)',
                target: 'Diabetes target: 48-53 mmol/mol (6.5-7.0%) for most. <53 if diet/single agent. <75 if elderly/frail',
                critical: '>86 mmol/mol (>10%) indicates very poor control - review urgently',
                clinicalSignificance: 'Reflects average glucose over 2-3 months. Not affected by recent meals. Invalid in haemolysis, recent transfusion, haemoglobinopathies. Check every 3-6 months in diabetes'
            }
        }
    },
    'tumour_markers': {
        name: 'Tumour Markers',
        values: {
            'PSA (Prostate Specific Antigen)': {
                normal: '<3 ng/mL (age-dependent: <50y: <2.5, 50-59y: <3.5, 60-69y: <4.5, >70y: <6.5)',
                high: 'Prostate cancer, BPH, prostatitis, recent ejaculation, recent DRE',
                critical: '>10 ng/mL suggests malignancy. >20 ng/mL suggests locally advanced/metastatic disease',
                clinicalSignificance: 'Not diagnostic alone - combine with DRE, MRI, biopsy. Rising PSA on surveillance suggests progression. Avoid ejaculation/cycling for 48h, DRE for 1 week before test'
            },
            'CA125': {
                normal: '<35 U/mL',
                high: 'Ovarian cancer (>200 U/mL suspicious), endometriosis, PID, menstruation, pregnancy, heart failure, cirrhosis',
                critical: '>200 U/mL with pelvic mass highly suspicious for ovarian malignancy',
                clinicalSignificance: 'Used with RMI (risk of malignancy index) in ovarian masses. Monitor response to treatment and recurrence. Not specific - many benign causes'
            },
            'CEA (Carcinoembryonic Antigen)': {
                normal: '<5 ng/mL (higher in smokers)',
                high: 'Colorectal cancer, pancreatic cancer, lung cancer, cirrhosis, IBD, smoking',
                critical: '>20 ng/mL suggests advanced malignancy or metastases',
                clinicalSignificance: 'Monitor colorectal cancer recurrence post-resection. Rising levels suggest recurrence. Not suitable for screening due to poor specificity'
            },
            'CA19-9': {
                normal: '<37 U/mL',
                high: 'Pancreatic cancer, cholangiocarcinoma, gastric cancer, pancreatitis, biliary obstruction',
                critical: '>1000 U/mL suggests unresectable pancreatic cancer',
                clinicalSignificance: 'Elevated in 80% pancreatic cancers. Correlates with tumour burden. False negative in Lewis antigen-negative patients (5-10%). Not diagnostic alone - needs imaging correlation'
            },
            'AFP (Alpha-fetoprotein)': {
                normal: '<10 ng/mL',
                high: 'Hepatocellular carcinoma, germ cell tumours, pregnancy, hepatitis, cirrhosis',
                critical: '>400 ng/mL highly suspicious for HCC',
                clinicalSignificance: 'Monitor HCC in cirrhosis (6-monthly with ultrasound). Elevated in 60-70% HCC. Also elevated in testicular non-seminomatous germ cell tumours'
            }
        }
    },
    'faecal_calprotectin': {
        name: 'Faecal Calprotectin',
        values: {
            'Calprotectin': {
                normal: '<50 μg/g',
                borderline: '50-200 μg/g - consider repeat or further investigation',
                high: '>200 μg/g suggests IBD (Crohn\'s, UC), infection, malignancy, NSAID enteropathy',
                critical: '>250 μg/g highly suspicious for IBD',
                clinicalSignificance: 'Distinguishes IBD from IBS (high sensitivity/specificity). Monitor IBD disease activity and response to treatment. Avoid if GI bleeding, recent NSAIDs, or diarrhoea <3 days'
            }
        }
    },
    'autoantibodies': {
        name: 'Autoantibodies & Immunology',
        values: {
            'ANA (Anti-Nuclear Antibodies)': {
                normal: 'Negative or titre <1:40',
                positive: 'SLE (high titre), drug-induced lupus, Sjögren syndrome, scleroderma, 5-10% healthy population (low titre)',
                clinicalSignificance: 'Screening test for connective tissue diseases. Titre >1:160 more significant. Positive ANA requires ENA panel to identify specific antibodies. Pattern (homogeneous, speckled, centromere) guides diagnosis'
            },
            'Anti-dsDNA': {
                normal: 'Negative or <30 IU/mL',
                positive: 'SLE (60-70% sensitivity, 95% specificity). Titre correlates with disease activity and nephritis risk',
                clinicalSignificance: 'Highly specific for SLE. Rising titres suggest flare. Monitor every 3 months in active disease'
            },
            'Anti-ENA (Extractable Nuclear Antigens)': {
                normal: 'Negative (no ENA antibodies detected)',
                'Anti-Ro (SS-A)': 'Sjögren syndrome, SLE, subacute cutaneous lupus, congenital heart block',
                'Anti-La (SS-B)': 'Sjögren syndrome (usually with anti-Ro), SLE',
                'Anti-Sm (Smith)': 'SLE (highly specific but only 30% sensitive)',
                'Anti-RNP': 'Mixed connective tissue disease, SLE',
                'Anti-Scl-70': 'Diffuse systemic sclerosis (scleroderma)',
                'Anti-Jo-1': 'Polymyositis, dermatomyositis, antisynthetase syndrome',
                'Anti-centromere': 'Limited systemic sclerosis (CREST syndrome)',
                description: 'Order after a positive ANA to refine connective tissue disease diagnosis.',
                clinicalSignificance: 'Ordered after positive ANA to identify specific disease. Multiple antibodies may be present'
            },
            'Rheumatoid Factor (RF)': {
                normal: '<15 IU/mL',
                positive: 'Rheumatoid arthritis (70-80%), Sjögren syndrome, SLE, cryoglobulinaemia, chronic infections (hepatitis C, TB), 5% healthy elderly',
                clinicalSignificance: 'Positive in 70-80% RA but not specific. High titres (>100 IU/mL) more specific. Presence correlates with erosive disease and extra-articular manifestations'
            },
            'Anti-CCP (Cyclic Citrullinated Peptide)': {
                normal: '<7 U/mL',
                positive: 'Rheumatoid arthritis (70% sensitive, 95% specific)',
                critical: 'High titres (>100 U/mL) predict aggressive erosive disease',
                clinicalSignificance: 'More specific than RF for RA. Can be positive before clinical symptoms (pre-RA). Helps distinguish RA from other inflammatory arthritis. High titre = worse prognosis'
            },
            'Coeliac Serology': {
                normal: 'Negative serology while consuming gluten',
                'tTG-IgA (Tissue Transglutaminase)': 'Normal: <7 U/mL. High: >10 U/mL (98% sensitive for coeliac disease)',
                'Total IgA': 'Check to exclude IgA deficiency (2-3% coeliacs) which causes false negative tTG-IgA',
                'EMA-IgA (Endomysial Antibody)': '99% specific for coeliac disease but less sensitive than tTG',
                'DGP-IgG (Deamidated Gliadin Peptide)': 'Useful if IgA deficient or age <2 years',
                clinicalSignificance: 'Test on gluten-containing diet (6 weeks). Positive serology → duodenal biopsy for diagnosis. Repeat serology yearly to monitor adherence to gluten-free diet'
            },
            'Thyroid Autoantibodies': {
                normal: 'Negative thyroid autoantibodies',
                'Anti-TPO (Thyroid Peroxidase)': 'Normal: <35 IU/mL. Positive: Hashimoto thyroiditis (90%), Graves disease (70%), postpartum thyroiditis',
                'Anti-Thyroglobulin': 'Hashimoto thyroiditis, Graves disease (less sensitive than TPO)',
                'TSH Receptor Antibodies (TRAb)': 'Graves disease (98% sensitivity/specificity). Stimulating antibodies cause hyperthyroidism',
                clinicalSignificance: 'Anti-TPO positive predicts progression to hypothyroidism. TRAb diagnostic for Graves disease. Monitor TRAb in pregnancy (crosses placenta - risk of neonatal thyrotoxicosis)'
            },
            'Liver Autoantibodies': {
                normal: 'Negative for liver-specific autoantibodies',
                'AMA (Anti-Mitochondrial)': 'Primary biliary cholangitis (95% sensitive/specific). M2 subtype most specific',
                'ANA in liver disease': 'Autoimmune hepatitis, PBC',
                'Anti-SMA (Smooth Muscle)': 'Autoimmune hepatitis type 1',
                'Anti-LKM (Liver-Kidney Microsomal)': 'Autoimmune hepatitis type 2 (children/young adults)',
                'pANCA': 'Primary sclerosing cholangitis, autoimmune hepatitis',
                clinicalSignificance: 'AMA highly specific for PBC. Autoimmune hepatitis requires ANA/SMA + elevated IgG + histology. Check before diagnosing "cryptogenic" hepatitis'
            }
        }
    },
    'microbiology': {
        name: 'Microbiology Investigations',
        values: {
            'Blood Cultures': {
                normal: 'No growth after 5 days of incubation',
                indication: 'Suspected bacteraemia/sepsis, endocarditis, fever of unknown origin',
                sampling: 'Draw 2-3 sets (aerobic + anaobic bottles each) from different sites before antibiotics if possible. Take when spiking temperature',
                results: {
                    'Positive': 'Identifies organism and sensitivities. May take 24-48h for organism, 48-72h for full sensitivities',
                    'Negative': 'Does not exclude infection (sensitivity 70-80%). May be negative if prior antibiotics, fastidious organisms, non-bacteraemic infections',
                    'Contamination': 'Coagulase-negative Staph, Corynebacterium, Bacillus, Propionibacterium - usually contaminants unless ≥2 sets positive or prosthetic material present'
                },
                clinicalSignificance: 'Always draw before antibiotics. Positive blood cultures with same organism in ≥2 sets or ≥1 set with typical pathogen = true bacteraemia'
            },
            'Urine Culture': {
                normal: '<10^5 CFU/mL',
                positive: '≥10^5 CFU/mL single organism = UTI. Lower counts (10^4) significant if symptomatic or straight catheter sample',
                contamination: 'Mixed growth (≥3 organisms) suggests contamination - repeat MSU',
                clinicalSignificance: 'Always send before antibiotics in suspected pyelonephritis. Asymptomatic bacteriuria (positive culture, no symptoms) usually does not need treatment except in pregnancy'
            },
            'Sputum Culture': {
                normal: 'Mixed upper airway flora or no significant growth',
                indication: 'Pneumonia, COPD exacerbation, TB, suspected atypical organism',
                results: {
                    'Common pathogens': 'Strep pneumoniae, H. influenzae, Moraxella, Staph aureus (including MRSA)',
                    'Atypical': 'Mycoplasma, Legionella, Chlamydia (require special tests - not routine culture)',
                    'TB': 'Requires 3 sputum samples on consecutive days. Smear (Ziehl-Neelsen) gives rapid result. Culture takes 6 weeks. PCR/GeneXpert rapid'
                },
                clinicalSignificance: 'Quality assessed by microscopy (<10 epithelial cells/field = good sample). Difficult to distinguish colonization from infection especially in COPD'
            },
            'Stool Culture & Testing': {
                normal: 'No enteric pathogens or toxins detected',
                'Standard Culture': 'Detects Salmonella, Shigella, Campylobacter, E. coli O157',
                'Stool Antigen Tests': 'Rapid tests for C. difficile toxin, Giardia, Cryptosporidium, H. pylori',
                'C. difficile': 'Test for toxin (GDH + toxin or PCR). Send sample if diarrhoea ≥3 loose stools in 24h and recent antibiotics or hospital stay',
                'Ova, Cysts & Parasites': 'Requires 3 samples. For persistent diarrhoea especially if travel history',
                clinicalSignificance: 'Only send if diarrhoea ≥3 days (unless bloody, severe, immunocompromised, or recent travel). C. diff testing only valid with diarrhoea'
            },
                'Wound & Skin Swabs': {
                normal: 'No pathogenic growth (skin commensals only)',
                indication: 'Infected wounds, cellulitis (aspirate if fluctuant), MRSA screening',
                'MRSA Screening': 'Nasal swab ± groin/perineum. Pre-op for high-risk surgery or if previous MRSA. Decolonize with nasal mupirocin + chlorhexidine washes if positive',
                results: 'Common pathogens: Staph aureus (including MRSA), Strep pyogenes, Pseudomonas (chronic wounds), anaerobes (diabetic foot)',
                clinicalSignificance: 'Superficial swabs often grow skin commensals. Aspirate or deep tissue sample better if possible. Diabetic foot ulcers need deep swab or bone biopsy if osteomyelitis suspected'
            },
            'Viral Serology': {
                normal: 'Negative serology (IgM and IgG absent)',
                'HIV': 'Combined antigen/antibody test (4th generation). Window period 45 days. Positive screen needs confirmatory test. CD4 count and viral load if positive',
                'Hepatitis B': 'HBsAg (acute infection), Anti-HBs (immunity from vaccine/recovery), Anti-HBc (past/current infection), HBeAg (high infectivity)',
                'Hepatitis C': 'Anti-HCV antibody (screen), HCV RNA PCR (confirms active infection). Treat if RNA positive',
                'EBV': 'Monospot/Paul-Bunnell (heterophile antibodies) - positive by week 2. VCA-IgM (acute), VCA-IgG + EBNA (past infection)',
                'CMV': 'CMV IgM (acute), CMV IgG (past). Check in transplant recipients, HIV, pregnancy',
                clinicalSignificance: 'Always interpret with clinical context. IgM suggests recent infection, IgG indicates past exposure/immunity'
            }
        }
    },
    'csf_analysis': {
        name: 'Cerebrospinal Fluid (CSF) Analysis',
        indication: 'Suspected meningitis, encephalitis, subarachnoid haemorrhage, MS, GBS, CNS malignancy',
        contraindications: 'Raised ICP with mass effect, coagulopathy, local infection at LP site, cardiorespiratory compromise',
        values: {
            'Opening Pressure': {
                normal: '10-20 cmH2O (lateral decubitus)',
                high: '>25 cmH2O suggests raised ICP (idiopathic intracranial hypertension, meningitis, SAH, malignancy)',
                low: '<5 cmH2O suggests CSF leak, dehydration',
                clinicalSignificance: 'Always measure if no contraindications. Essential for diagnosis of idiopathic intracranial hypertension'
            },
            'Appearance': {
                normal: 'Crystal clear, colourless CSF',
                'Clear': 'Normal or viral meningitis',
                'Turbid/cloudy': 'Bacterial meningitis (high WCC)',
                'Bloody': 'Traumatic tap vs SAH (distinguish with xanthochromia, three-tube test)',
                'Yellow (xanthochromia)': 'SAH (bilirubin from RBC breakdown - takes 12h to develop)',
                clinicalSignificance: 'Xanthochromia by spectrophotometry confirms SAH if LP >12h post headache onset. Turbid CSF = bacterial meningitis until proven otherwise'
            },
            'White Cell Count': {
                normal: '<5 cells/μL',
                'Viral meningitis': '10-1000 cells/μL (lymphocyte predominance)',
                'Bacterial meningitis': '100-5000 cells/μL (neutrophil predominance)',
                'TB meningitis': '10-500 cells/μL (lymphocyte predominance)',
                'Fungal meningitis': '10-500 cells/μL (lymphocyte predominance)',
                clinicalSignificance: 'Bacterial meningitis = neutrophils >50%. TB/viral = lymphocytes >50%. Early viral can be neutrophilic (repeat LP)'
            },
            'Protein': {
                normal: '0.15-0.45 g/L',
                'Viral meningitis': '0.4-0.8 g/L',
                'Bacterial meningitis': '1-5 g/L',
                'TB meningitis': '1-5 g/L',
                'GBS': '>1 g/L with normal WCC (albuminocytologic dissociation)',
                clinicalSignificance: 'Elevated in most CNS pathology. Very high (>5 g/L) suggests bacterial meningitis, spinal block, or Froin syndrome'
            },
            'Glucose': {
                normal: '2.8-4.2 mmol/L (CSF:serum ratio >0.6)',
                'Viral meningitis': 'Normal or slightly low (ratio >0.6)',
                'Bacterial meningitis': '<2.2 mmol/L (ratio <0.4)',
                'TB meningitis': '<2.2 mmol/L (ratio <0.4)',
                clinicalSignificance: 'Always compare to paired blood glucose (taken within 1h). Low CSF glucose with high protein = bacterial or TB meningitis'
            },
            'Microbiology': {
                normal: 'Negative Gram stain, PCR and culture',
                'Gram stain': 'Immediate result. Positive in 60-90% bacterial meningitis. Guides initial antibiotics',
                'Culture': 'Gold standard but takes 24-48h. Sensitivity reduced if antibiotics given',
                'PCR': 'Meningococcal/pneumococcal PCR rapid. Viral PCR (HSV, VZV, enteroviruses) - 95% sensitive',
                clinicalSignificance: 'Never delay antibiotics for LP in bacterial meningitis. PCR useful if prior antibiotics given. HSV PCR essential in encephalitis'
            },
            'Oligoclonal Bands': {
                normal: 'Negative or present equally in serum and CSF',
                positive: 'Present in CSF but not serum - suggests MS (90% sensitive), neurosarcoidosis, Lyme disease, SSPE',
                clinicalSignificance: 'Demonstrates intrathecal IgG synthesis. Positive in 90% MS but not specific. Combine with MRI findings and clinical history'
            }
        },
        interpretation: {
            'Bacterial meningitis': 'Turbid, ↑↑WCC (neutrophils), ↑↑protein, ↓↓glucose. Give antibiotics immediately before LP if delayed',
            'Viral meningitis': 'Clear, ↑WCC (lymphocytes), normal/↑protein, normal glucose. Supportive care',
            'TB meningitis': 'Fibrin web, ↑WCC (lymphocytes), ↑↑protein, ↓glucose. AFB rare on microscopy - high suspicion needed',
            'SAH': 'Bloody/xanthochromia (after 12h), normal biochemistry. RBC count similar in bottles 1 and 3 (vs traumatic tap)',
            'MS': 'Normal cells/glucose, ↑protein, +ve oligoclonal bands (CSF only), ↑IgG index',
            'GBS': '↑↑protein, normal WCC (albuminocytologic dissociation). Usually week 2 of illness'
        }
    },
    'ecg': {
        name: 'Electrocardiogram (ECG)',
        values: {
            'Indications': {
                normal: 'Chest pain, palpitations, breathlessness, syncope, pre-op assessment, cardiovascular screening'
            },
            'Normal Parameters': {
                normal: 'Heart rate 60-100 bpm; PR 120-200 ms (3-5 small squares); QRS <120 ms (<3 small squares); QTc <440 ms (men) <460 ms (women) using QT/√RR; Axis -30° to +90°; R wave progression increases V1→V6 with transition V3-V4'
            },
            'Common Abnormalities': {
                normal: 'STEMI: ST elevation ≥1mm limb or ≥2mm chest leads in contiguous leads with reciprocal depression—activate cath lab. NSTEMI/UA: ST depression/T wave inversion with troponin rise. AF: irregularly irregular rhythm without P waves. Flutter: sawtooth waves (II/III/aVF) with regular ~150 bpm or variable block. SVT: narrow complex tachycardia 150-220 bpm. VT: broad complex 120-250 bpm with AV dissociation/capture beats. Complete heart block: AV dissociation with escape 30-50 bpm. LBBB: QRS ≥120ms, broad R V5-6, deep S V1-2, no septal Q. RBBB: QRS ≥120ms, RSR\' V1-2, wide S V5-6. LVH: S(V1)+R(V5/6)>35mm ± strain. PE: S1Q3T3/right heart strain/RBBB/right axis. Pericarditis: widespread saddle-shaped ST elevation with PR depression and no reciprocal changes. Hyperkalaemia: peaked T >5.5, broad QRS 6.5-7.5, sine wave >8. Hypokalaemia: U waves, flat T, ST depression, prolonged QT. Digoxin effect: downsloping ST (Salvador Dalí moustache), short QT, T inversion.'
            },
            'Clinical Significance': {
                normal: 'Always compare with prior ECGs and obtain serial tracings in chest pain. Treat ST elevation in contiguous leads as STEMI until proven otherwise and call cardiology immediately.'
            }
        }
    },
    'imaging_radiology': {
        name: 'Radiology & Imaging',
        values: {
            'Chest X-ray (CXR)': {
                normal: 'Indications: pneumonia, heart failure, pneumothorax, malignancy, TB, trauma. Views: PA standard, AP portable (apparent cardiomegaly), lateral. Approach: ABCDEFGHI (Airway, Breathing, Cardiac, Diaphragm, Everything else, Fields, Great vessels, Hardware, Impression). Typical findings—Pneumonia: consolidation/air bronchograms/effusion. Pulmonary oedema: bat wing shadowing, Kerley B lines, cardiomegaly, effusions, upper lobe diversion. Pneumothorax: absent peripheral markings, visible lung edge. Effusion: meniscus sign, blunted costophrenic angles (>500 ml erect). Lung cancer: mass/hilar enlargement/collapse/effusion. COPD: hyperinflation >6 anterior ribs, flat diaphragms, bullae.'
            },
            'Abdominal X-ray (AXR)': {
                normal: 'Indications: bowel obstruction, perforation, constipation, renal calculi. Approach: gas pattern, bowel loops, organs, bones, foreign bodies; supine view standard. Findings—Small bowel obstruction: central gas >3 cm with valvulae crossing full width. Large bowel obstruction: peripheral gas >6 cm (>9 cm caecum) with haustra. Perforation: free gas under diaphragm (erect CXR better). Toxic megacolon: colon >6 cm with mucosal oedema/thumbprinting. Volvulus: coffee bean sign (sigmoid) or dilated caecum.'
            },
            'CT Head': {
                normal: 'Indications: stroke, head injury, raised ICP, seizures, headache with red flags. Non-contrast first-line for stroke (<4.5 h thrombolysis), haemorrhage, fractures. Findings—Acute stroke: loss of grey-white differentiation, hyperdense MCA sign, obscured lentiform nucleus. Haemorrhage: hyperdense blood (subarachnoid, subdural, extradural, intracerebral). Raised ICP: midline shift, sulcal/ventricular effacement, herniation. Hydrocephalus: dilated ventricles. Clinical significance: perform within 1 h for head injury (GCS <13, focal neurology, skull fracture) and within thrombolysis window for stroke.'
            },
            'CT Chest/Abdomen/Pelvis (CTAP)': {
                normal: 'Indications: malignancy staging, trauma, PE, AAA, appendicitis, diverticulitis. Contrast: IV contrast for vascular/organ detail; oral contrast less common. CT PE protocol: contrast-timed pulmonary arteries—filling defect = PE. CT KUB (non-contrast): renal stones (≈90% visible), hydronephrosis. Clinical significance: CT is gold standard for trauma/PE/AAA/malignancy but carries radiation—justify use.'
            },
            'Ultrasound': {
                normal: 'Advantages: no radiation, bedside, real-time, inexpensive, safe in pregnancy. Indications—Abdominal: gallstones, AAA, hepatobiliary, renal, ascites. Renal: hydronephrosis/obstructive uropathy, stones (not all visible), cysts, masses. Pelvic: pregnancy, ovarian masses, fibroids. Vascular: DVT compression ultrasound, carotid stenosis. Cardiac: EF, valves, pericardial effusion. Limitations: operator dependent; gas/obesity reduce image quality.'
            },
            'MRI': {
                normal: 'Advantages: no radiation, excellent soft tissue contrast, multiplanar imaging. Indications—Brain: MS, acute stroke (DWI), tumours, pituitary, infection. Spine: cord compression, disc prolapse, infection, tumour. MSK: soft tissue injuries, joints, osteomyelitis. Cardiac: myocarditis, cardiomyopathy, congenital heart disease. Contraindications: non-MRI-safe pacemakers, metallic foreign bodies (orbital), cochlear implants, severe claustrophobia. Clinical significance: gold standard for brain/spinal cord; DWI detects acute stroke; 30-60 min study.'
            },
            'DEXA Scan': {
                normal: 'Indications: osteoporosis screening ≥75 years, previous fragility fracture, steroids ≥3 months. Measurement: bone mineral density at lumbar spine and hip. Interpretation—T-score ≥-1.0 normal; -1.0 to -2.5 osteopenia; ≤-2.5 osteoporosis; ≤-2.5 plus fracture severe osteoporosis. Clinical significance: treat if T-score ≤-2.5 or ≤-1.5 with risk factors.'
            },
            'Ultrasound vs CT': {
                normal: 'Use ultrasound first for pregnancy, children, gallstones, AAA screening, renal obstruction, ascites, DVT. Use CT for trauma, PE, acute abdomen if ultrasound negative, malignancy staging, renal stones with hydronephrosis. Principle: minimize radiation when safe and escalate to CT when ultrasound is inadequate or time-critical.'
            }
        }
    },
    'neurophysiology': {
        name: 'Neurophysiology Studies',
        values: {
            'Electroencephalography (EEG)': {
                normal: 'Posterior dominant alpha rhythm (8-13 Hz), symmetric with normal reactivity',
                indication: 'Seizures, encephalopathy, encephalitis, brain death',
                findings: {
                    'Normal': 'Posterior dominant rhythm 8-13 Hz (alpha), symmetrical',
                    'Epilepsy': 'Focal spikes/sharp waves (focal epilepsy), generalized spike-wave (absence - 3Hz, JME - 4-6Hz)',
                    'Status epilepticus': 'Continuous seizure activity',
                    'Encephalopathy': 'Diffuse slowing, triphasic waves (hepatic)',
                    'Encephalitis': 'Focal slowing, PLEDS (herpes)',
                    'CJD': 'Periodic sharp wave complexes'
                },
                clinicalSignificance: 'Normal EEG does not exclude epilepsy (50% sensitivity). Repeat or sleep-deprived EEG increases yield. Video-telemetry gold standard'
            },
            'Nerve Conduction Studies (NCS)': {
                normal: 'Normal conduction velocities and amplitudes without conduction block',
                indication: 'Peripheral neuropathy, radiculopathy, carpal tunnel syndrome, GBS',
                measurements: 'Sensory and motor nerve conduction velocities, amplitudes, latencies',
                findings: {
                    'Axonal neuropathy': 'Reduced amplitudes, normal/mildly slow velocities (diabetes, toxins, chemotherapy)',
                    'Demyelinating neuropathy': 'Slow velocities, prolonged latencies, conduction block (GBS, CIDP, CMT1)',
                    'Carpal tunnel': 'Prolonged median sensory latency at wrist',
                    'Radiculopathy': 'Normal (lesion proximal to DRG)'
                },
                clinicalSignificance: 'Distinguishes axonal from demyelinating neuropathy - guides treatment. Delay 2-3 weeks post injury for Wallerian degeneration'
            },
            'Electromyography (EMG)': {
                normal: 'Insertional activity only with no spontaneous discharges',
                indication: 'Myopathy, anterior horn cell disease (MND), radiculopathy',
                technique: 'Needle electrode inserted into muscle - records spontaneous and voluntary activity',
                findings: {
                    'Normal': 'Insertional activity only, no spontaneous activity, normal motor unit potentials',
                    'Denervation': 'Fibrillations, positive sharp waves, fasciculations (MND, radiculopathy)',
                    'Myopathy': 'Small polyphasic motor units, early recruitment',
                    'Myotonia': 'Dive bomber sound (myotonic dystrophy)'
                },
                clinicalSignificance: 'Combined with NCS to localize lesion. EMG changes appear 2-3 weeks after denervation'
            }
        }
    }
};
