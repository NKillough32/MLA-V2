/**
 * MLA Core Conditions Database
 * 
 * Comprehensive clinical reference covering conditions that are common or important 
 * in Foundation practice. Each condition includes:
 * - Recognition & Presentation (including atypical presentations)
 * - Investigation & Diagnosis
 * - Management (First-line and Second-line)
 * - Key Clinical Pearls
 * - Red Flags & Complications
 * 
 * Foundation doctors need a high level of confidence when taking part in patient care 
 * for these conditions.
 */

export const coreConditionsDatabase = {
    // ==========================================
    // CARDIOLOGY
    // ==========================================
    'acute-coronary-syndrome': {
        name: 'Acute Coronary Syndrome (ACS)',
        domain: 'Cardiology',
        synonyms: ['ACS', 'MI', 'Myocardial Infarction', 'Heart Attack', 'STEMI', 'NSTEMI', 'Unstable Angina'],
        
        recognition: {
            typical: [
                'Central crushing chest pain radiating to left arm, neck, or jaw',
                'Pain lasting >20 minutes',
                'Associated with diaphoresis, dyspnea, nausea/vomiting',
                'Symptoms not relieved by GTN',
                'May have preceding crescendo angina'
            ],
            atypical: [
                'Silent MI in diabetics or elderly (no chest pain)',
                'Epigastric pain mimicking indigestion',
                'Isolated dyspnea without chest pain',
                'Women may present with fatigue, nausea, back pain',
                'Syncope or acute confusion in elderly'
            ],
            examination: [
                'Patient may appear pale, sweaty, distressed',
                'Tachycardia or bradycardia',
                'Hypotension (especially in inferior MI)',
                'Signs of heart failure (JVP ↑, pulmonary crackles)',
                'New murmur (papillary muscle dysfunction)'
            ],
            redFlags: [
                'Cardiogenic shock (BP <90 mmHg, cold peripheries)',
                'Acute pulmonary edema',
                'Ventricular arrhythmias',
                'Complete heart block (especially inferior MI)',
                'Mechanical complications (free wall rupture, VSD, mitral regurgitation)'
            ]
        },
        
        investigation: {
            immediate: [
                'ECG within 10 minutes: ST elevation (STEMI), ST depression/T-wave inversion (NSTEMI), or normal',
                'Troponin (T or I): Peak at 12-24h, remain elevated 7-14 days',
                'FBC, U&Es, glucose',
                'Chest X-ray: Heart failure, alternative diagnoses'
            ],
            further: [
                'Serial troponins (0h and 3h)',
                'Echocardiography: Wall motion abnormalities, complications',
                'Coronary angiography: Definitive diagnosis and treatment',
                'Lipid profile (after acute phase)',
                'HbA1c for diabetes screening'
            ],
            interpretation: [
                'STEMI: ST elevation ≥2mm in chest leads or ≥1mm in limb leads',
                'NSTEMI: Troponin ↑ without ST elevation',
                'Unstable Angina: Crescendo symptoms without troponin rise',
                'Posterior MI: Tall R waves V1-V2, ST depression V1-V3, consider posterior leads',
                'Right ventricular MI: ST elevation in V4R (with inferior MI)'
            ]
        },
        
        diagnosis: {
            criteria: 'Two of: typical history, ECG changes, elevated cardiac biomarkers',
            differential: [
                'Pulmonary embolism: Sudden onset, pleuritic pain, risk factors for VTE',
                'Aortic dissection: Tearing pain radiating to back, pulse deficits',
                'Pericarditis: Pleuritic pain, relieved sitting forward, PR depression on ECG',
                'GERD: Burning quality, related to meals, relieved by antacids',
                'Musculoskeletal: Reproducible with palpation, positional',
                'Pneumothorax: Sudden onset, decreased breath sounds'
            ]
        },
        
        management: {
            firstLine: {
                immediate: [
                    'MONA: Morphine, Oxygen (if hypoxic), Nitrates, Aspirin 300mg',
                    'Aspirin 300mg loading dose (unless contraindicated)',
                    'P2Y12 inhibitor: Ticagrelor 180mg or Prasugrel 60mg or Clopidogrel 300mg',
                    'Fondaparinux 2.5mg SC or LMWH if going for angiography',
                    'High-intensity statin (Atorvastatin 80mg)',
                    'IV access, continuous ECG monitoring',
                    'Oxygen only if SpO2 <94%'
                ],
                stemi: [
                    'Primary PCI within 120 minutes door-to-balloon time (preferred)',
                    'If PCI not available: Thrombolysis within 12 hours (if no contraindications)',
                    'Thrombolysis contraindications: Recent surgery, stroke, bleeding disorder'
                ],
                nstemi: [
                    'GRACE score to assess risk',
                    'High risk (GRACE >140): Urgent angiography within 24h',
                    'Intermediate risk: Angiography within 72h',
                    'Low risk: Conservative management, consider stress test'
                ],
                longTerm: [
                    'Dual antiplatelet therapy (DAPT) for 12 months',
                    'Beta-blocker (e.g., Bisoprolol 2.5-10mg OD)',
                    'ACE inhibitor (e.g., Ramipril 10mg OD, especially if LV dysfunction)',
                    'High-intensity statin (Atorvastatin 80mg)',
                    'Cardiac rehabilitation',
                    'Risk factor modification: Smoking cessation, diet, exercise'
                ]
            },
            secondLine: [
                'Glycoprotein IIb/IIIa inhibitors (e.g., Tirofiban) for high-risk patients',
                'Ivabradine if heart rate >70 despite beta-blocker',
                'Eplerenone if evidence of heart failure or LVEF <40%',
                'ICD if persistent LVEF <35% after 3 months',
                'Consider coronary artery bypass surgery if complex disease'
            ],
            complications: [
                'Arrhythmias (VT/VF common in first 24h)',
                'Heart failure',
                'Cardiogenic shock',
                'Mechanical complications: VSD, papillary muscle rupture, free wall rupture',
                'Pericarditis (early: 1-3 days; Dressler syndrome: weeks-months)',
                'Ventricular aneurysm',
                'Mural thrombus → systemic embolization'
            ]
        },
        
        clinicalPearls: [
            'Women, diabetics, elderly often have atypical presentations',
            'Normal ECG does not exclude ACS - repeat ECGs and troponins',
            'Posterior MI can be missed - look for dominant R wave in V1-V2',
            'Right ventricular MI: Give fluid, avoid nitrates (cause hypotension)',
            'Inferior MI associated with bradycardia and heart block',
            'High-sensitivity troponin: Earlier detection but less specific',
            'GTN can help differentiate cardiac from non-cardiac pain, but not always',
            'β-blockers contraindicated in cocaine-induced ACS'
        ],
        
        prognosis: 'STEMI 30-day mortality ~7%. GRACE score predicts 6-month mortality. Long-term prognosis depends on LVEF, extent of disease, and secondary prevention compliance.',
        
        keywords: ['chest pain', 'MI', 'STEMI', 'NSTEMI', 'troponin', 'PCI', 'thrombolysis', 'cardiac'],
        
        relatedConditions: ['angina', 'heart-failure', 'arrhythmias', 'cardiogenic-shock']
    },

    'atrial-fibrillation': {
        name: 'Atrial Fibrillation (AF)',
        domain: 'Cardiology',
        synonyms: ['AF', 'AFib', 'A Fib'],
        
        recognition: {
            typical: [
                'Palpitations - fast, irregular heartbeat',
                'Dyspnea on exertion',
                'Fatigue, reduced exercise tolerance',
                'Chest discomfort',
                'Dizziness or lightheadedness'
            ],
            atypical: [
                'Asymptomatic (found incidentally)',
                'Presenting with stroke or TIA',
                'Heart failure exacerbation',
                'Syncope',
                'Acute confusion in elderly'
            ],
            examination: [
                'Irregularly irregular pulse',
                'Pulse deficit (radial rate < apex rate)',
                'Tachycardia or bradycardia',
                'Signs of heart failure',
                'Signs of hyperthyroidism (tremor, goiter)'
            ],
            redFlags: [
                'Hemodynamic instability (hypotension, shock)',
                'Acute heart failure/pulmonary edema',
                'Ongoing chest pain (concurrent ACS)',
                'Heart rate >150 bpm with symptoms',
                'Syncope'
            ]
        },
        
        investigation: {
            immediate: [
                'ECG: Absent P waves, irregular R-R intervals, fibrillation waves',
                'FBC: Anemia, infection',
                'U&Es: Electrolyte disturbances',
                'TFTs: Hyperthyroidism',
                'Troponin if chest pain'
            ],
            further: [
                'Echocardiography: Structural heart disease, LV function, left atrial size',
                'CXR: Heart failure, lung pathology',
                'Holter monitoring or event recorder: Paroxysmal AF',
                'Coagulation screen if considering anticoagulation',
                'HbA1c: Diabetes screening'
            ],
            interpretation: [
                'Ventricular rate: Tachycardia (>100 bpm) or bradycardia',
                'Duration: Paroxysmal (<7 days), persistent (>7 days), permanent',
                'First detected episode',
                'Look for underlying cause: IHD, valve disease, cardiomyopathy'
            ]
        },
        
        diagnosis: {
            criteria: 'ECG showing irregularly irregular rhythm with absent P waves',
            differential: [
                'Atrial flutter: Regular "sawtooth" flutter waves, often 2:1 or 3:1 block',
                'Multifocal atrial tachycardia: Multiple P-wave morphologies',
                'Sinus rhythm with frequent ectopics',
                'Ventricular tachycardia: Wide QRS complexes'
            ]
        },
        
        management: {
            firstLine: {
                acute: [
                    'Assess hemodynamic stability',
                    'If unstable: DC cardioversion (synchronized)',
                    'If stable: Rate or rhythm control strategy',
                    'Rate control: Beta-blocker (Bisoprolol) or rate-limiting CCB (Diltiazem)',
                    'Target heart rate <110 bpm (lenient) or <80 bpm (strict)',
                    'Anticoagulation decision using CHA₂DS₂-VASc score'
                ],
                rateControl: [
                    'Beta-blocker: Bisoprolol 2.5-10mg OD (first-line)',
                    'Diltiazem 120-360mg daily (if beta-blockers contraindicated)',
                    'Digoxin 62.5-250mcg OD (if sedentary or heart failure)',
                    'Combination therapy if monotherapy inadequate'
                ],
                rhythmControl: [
                    'Flecainide (if no structural heart disease)',
                    'Amiodarone (if structural heart disease present)',
                    'Consider if: First episode, young, symptomatic despite rate control',
                    'Electrical cardioversion (if planned, requires 3 weeks anticoagulation or TOE)'
                ],
                anticoagulation: [
                    'CHA₂DS₂-VASc ≥2 (men) or ≥3 (women): Anticoagulate',
                    'DOACs preferred: Apixaban, Rivaroxaban, Edoxaban, Dabigatran',
                    'Warfarin if valvular AF or severe renal impairment (target INR 2-3)',
                    'Assess bleeding risk with HAS-BLED score (≥3 = high risk)'
                ]
            },
            secondLine: [
                'Catheter ablation for symptomatic paroxysmal AF refractory to medications',
                'Surgical maze procedure during cardiac surgery',
                'Left atrial appendage occlusion (if anticoagulation contraindicated)',
                'AV node ablation + pacemaker (last resort for rate control)',
                'Combination antiarrhythmic therapy under specialist guidance'
            ],
            complications: [
                'Thromboembolic stroke (5× risk without anticoagulation)',
                'Heart failure with reduced ejection fraction',
                'Tachycardia-induced cardiomyopathy',
                'Atrial fibrillation with RVR (rapid ventricular response)',
                'Cognitive decline (possibly related to microemboli)'
            ]
        },
        
        clinicalPearls: [
            'CHA₂DS₂-VASc: CHF, HTN, Age≥75 (2 points), Diabetes, Stroke/TIA (2 points), Vascular disease, Age 65-74, Sex (female)',
            'HAS-BLED: HTN, Abnormal renal/liver, Stroke, Bleeding, Labile INR, Elderly, Drugs/alcohol',
            'Paroxysmal AF still requires anticoagulation if CHA₂DS₂-VASc indicates',
            'Avoid rate-limiting CCBs in heart failure with reduced EF',
            'Digoxin less effective for exercise-induced tachycardia',
            'Screen for sleep apnea - common and worsens AF',
            'Lifestyle: Alcohol reduction, weight loss can reduce AF burden'
        ],
        
        prognosis: '1-2% annual stroke risk without anticoagulation. DOACs reduce stroke by 60-70%. AF associated with 2× mortality risk.',
        
        keywords: ['AF', 'atrial fibrillation', 'palpitations', 'irregular pulse', 'anticoagulation', 'stroke risk'],
        
        relatedConditions: ['atrial-flutter', 'heart-failure', 'stroke', 'hyperthyroidism']
    },

    // ==========================================
    // RESPIRATORY
    // ==========================================
    'asthma': {
        name: 'Asthma',
        domain: 'Respiratory',
        synonyms: ['Reactive airway disease', 'Bronchial asthma'],
        
        recognition: {
            typical: [
                'Episodic wheeze, chest tightness, cough',
                'Symptoms worse at night or early morning',
                'Triggered by exercise, cold air, allergens, viral infections',
                'Personal or family history of atopy (eczema, hay fever)',
                'Response to bronchodilators'
            ],
            atypical: [
                'Cough-variant asthma: Dry cough without wheeze',
                'Exercise-induced bronchoconstriction only',
                'Occupational asthma: Symptoms improve away from work',
                'Aspirin-exacerbated respiratory disease',
                'Silent chest in severe exacerbation (life-threatening)'
            ],
            examination: [
                'Expiratory wheeze (polyphonic)',
                'Prolonged expiratory phase',
                'Reduced peak flow',
                'Normal examination between exacerbations',
                'In severe: Use of accessory muscles, inability to complete sentences'
            ],
            redFlags: [
                'Silent chest (no wheeze despite respiratory distress)',
                'Exhaustion, confusion, reduced consciousness',
                'SpO2 <92% or PaO2 <8 kPa',
                'PaCO2 normal or elevated (indicates tiring)',
                'Peak flow <33% predicted or best',
                'Bradycardia, hypotension (pre-arrest)'
            ]
        },
        
        investigation: {
            immediate: [
                'Peak expiratory flow rate (PEFR): Compare to predicted or personal best',
                'Oxygen saturation: Target 94-98%',
                'ABG if severe (SpO2 <92%): Look for hypoxia, normal/elevated CO2',
                'CXR: Pneumothorax, pneumonia, hyperinflation'
            ],
            further: [
                'Spirometry with bronchodilator reversibility: FEV1/FVC <0.7, FEV1 ↑ ≥12% and 200ml post-bronchodilator',
                'FeNO (fractional exhaled nitric oxide): >40 ppb suggests eosinophilic inflammation',
                'Skin prick tests or specific IgE for allergens',
                'Peak flow diary: Diurnal variation >20%',
                'CT chest if diagnostic uncertainty'
            ],
            interpretation: [
                'Spirometry: Obstructive pattern (FEV1/FVC <0.7) that reverses',
                'Peak flow variability: >20% suggests asthma',
                'FeNO: Helps identify steroid-responsive asthma',
                'Normal tests don't exclude asthma - repeat when symptomatic'
            ]
        },
        
        diagnosis: {
            criteria: 'Episodic respiratory symptoms + variable airflow obstruction (spirometry or peak flow) + response to treatment',
            differential: [
                'COPD: Smoking history, older age, fixed airflow obstruction',
                'Bronchiectasis: Chronic productive cough, recurrent infections',
                'Heart failure: Orthopnea, PND, raised JVP, pulmonary edema',
                'GERD: Can mimic and trigger asthma',
                'Vocal cord dysfunction: Inspiratory wheeze, paradoxical vocal cord movement',
                'Pulmonary embolism: Sudden onset, pleuritic pain, risk factors'
            ]
        },
        
        management: {
            firstLine: {
                chronic: [
                    'SABA (e.g., Salbutamol 100-200mcg PRN): Reliever for all patients',
                    'Step 1: SABA alone',
                    'Step 2: Add low-dose ICS (e.g., Beclomethasone 200-400mcg/day)',
                    'Step 3: LABA (e.g., Salmeterol) + ICS (combination inhaler)',
                    'Step 4: Increase ICS dose to medium (Beclomethasone 400-800mcg) or add LTRA (Montelukast)',
                    'Ensure inhaler technique regularly checked',
                    'Written asthma action plan'
                ],
                acute: [
                    'Mild-Moderate: Salbutamol 4-6 puffs via spacer, repeat every 20min',
                    'Oxygen: Target SpO2 94-98%',
                    'Prednisolone 40-50mg PO (or IV hydrocortisone 100mg)',
                    'Continue regular ICS',
                    'If not improving: Nebulized Salbutamol 5mg + Ipratropium 500mcg'
                ],
                severe: [
                    'Life-threatening features: ICU involvement',
                    'Back-to-back nebulizers (Salbutamol 5mg + Ipratropium 500mcg)',
                    'IV Magnesium sulfate 2g over 20 minutes',
                    'Consider IV Salbutamol, IV Aminophylline',
                    'Intubation and ventilation if deteriorating'
                ]
            },
            secondLine: [
                'Step 5: High-dose ICS or add Theophylline',
                'Biological therapy: Anti-IgE (Omalizumab), Anti-IL5 (Mepolizumab, Benralizumab)',
                'Oral corticosteroids: Maintenance dose if severe uncontrolled',
                'Bronchial thermoplasty (specialist centers)',
                'Allergen immunotherapy for specific allergies'
            ],
            complications: [
                'Status asthmaticus (life-threatening exacerbation)',
                'Pneumothorax',
                'Pneumonia',
                'Side effects of steroids: Osteoporosis, hyperglycemia, adrenal suppression',
                'Poor growth in children on high-dose ICS',
                'Vocal cord dysfunction from ICS'
            ]
        },
        
        clinicalPearls: [
            'SABA overuse (>3 canisters/year) indicates poor control',
            'Inhaler technique critical - up to 70% use inhalers incorrectly',
            'Eosinophilia and high FeNO predict steroid response',
            'Consider vocal cord dysfunction if wheeze predominantly inspiratory',
            'Avoid beta-blockers (including eye drops) in asthmatics',
            'Check compliance and triggers before escalating therapy',
            'Normal PaCO2 in acute asthma is concerning (should be low)',
            'Occupational asthma: >400 potential workplace triggers'
        ],
        
        prognosis: 'Well-controlled asthma: Normal life expectancy and quality of life. 1000-1500 deaths/year in UK. Severe asthma significantly impacts quality of life.',
        
        keywords: ['wheeze', 'asthma', 'SOB', 'bronchodilator', 'inhaler', 'exacerbation'],
        
        relatedConditions: ['copd', 'anaphylaxis', 'allergic-disorders']
    },

    'copd': {
        name: 'Chronic Obstructive Pulmonary Disease (COPD)',
        domain: 'Respiratory',
        synonyms: ['Chronic bronchitis', 'Emphysema', 'COAD'],
        
        recognition: {
            typical: [
                'Progressive dyspnea on exertion',
                'Chronic productive cough (≥3 months in 2 consecutive years)',
                'Purulent sputum during exacerbations',
                'Smoking history (typically >20 pack-years)',
                'Wheeze, chest tightness',
                'Recurrent lower respiratory tract infections'
            ],
            atypical: [
                'Alpha-1 antitrypsin deficiency: Young, non-smoker, lower lobe emphysema',
                'Weight loss and cachexia in severe disease',
                'Acute confusion (hypercapnic encephalopathy)',
                'Ankle edema (cor pulmonale)',
                'Asymptomatic with abnormal spirometry'
            ],
            examination: [
                'Barrel chest, hyperinflation',
                'Reduced chest expansion',
                'Hyperresonant percussion',
                'Reduced breath sounds, expiratory wheeze',
                'Prolonged expiratory phase',
                'Use of accessory muscles, pursed-lip breathing',
                'Cyanosis, raised JVP (cor pulmonale)',
                'Cachexia in severe disease'
            ],
            redFlags: [
                'Respiratory failure: Type 2 (↑CO2, acidosis)',
                'Cor pulmonale: Right heart failure, peripheral edema, raised JVP',
                'Pneumonia, pneumothorax',
                'Confusion, drowsiness (CO2 retention)',
                'Hemodynamic instability',
                'Inability to complete sentences'
            ]
        },
        
        investigation: {
            immediate: [
                'Spirometry (diagnostic): Post-bronchodilator FEV1/FVC <0.7',
                'ABG: Hypoxia, hypercapnia, respiratory acidosis',
                'CXR: Hyperinflation, flattened diaphragm, bullae',
                'FBC: Polycythemia (chronic hypoxia)',
                'Sputum culture in exacerbations'
            ],
            further: [
                'CT chest: Emphysema distribution, bronchiectasis, lung cancer',
                'Alpha-1 antitrypsin level (if age <45 or non-smoker)',
                'ECG and echo: Right heart strain, cor pulmonale',
                'Transfer factor (TLCO): Reduced in emphysema',
                'Exercise testing or 6-minute walk test'
            ],
            interpretation: [
                'Severity by FEV1: Mild (≥80%), Moderate (50-79%), Severe (30-49%), Very severe (<30%)',
                'GOLD classification: Combines symptoms and spirometry',
                'Type 1 RF: Low O2, normal/low CO2',
                'Type 2 RF: Low O2, high CO2 (>6.5 kPa)',
                'Polycythemia: Hematocrit >52% suggests chronic hypoxia'
            ]
        },
        
        diagnosis: {
            criteria: 'Post-bronchodilator FEV1/FVC <0.7 in appropriate clinical context (symptoms + smoking history)',
            differential: [
                'Asthma: Reversible airflow obstruction, younger age, atopy',
                'Bronchiectasis: Daily purulent sputum, recurrent infections',
                'Heart failure: Orthopnea, PND, raised JVP, peripheral edema',
                'Lung fibrosis: Restrictive pattern on spirometry, fine crackles',
                'Lung cancer: Weight loss, hemoptysis, mass on imaging',
                'Tuberculosis: Night sweats, weight loss, upper lobe changes'
            ]
        },
        
        management: {
            firstLine: {
                stable: [
                    'Smoking cessation: Most important intervention',
                    'SABA or SAMA PRN for breathlessness',
                    'If symptomatic or ≥2 exacerbations/year:',
                    '- LABA + ICS if asthmatic features or eosinophils ≥300',
                    '- LAMA (e.g., Tiotropium) if no asthmatic features',
                    'Pulmonary rehabilitation',
                    'Annual influenza and pneumococcal vaccination',
                    'LTOT if PaO2 <7.3 kPa (≥15h/day improves survival)'
                ],
                exacerbation: [
                    'Increase SABA/SAMA frequency',
                    'Prednisolone 30mg OD for 5 days',
                    'Antibiotics if purulent sputum (Amoxicillin, Doxycycline, or Clarithromycin)',
                    'Controlled oxygen: Target SpO2 88-92%',
                    'Nebulized bronchodilators if severe',
                    'Consider NIV if pH <7.35 despite treatment'
                ],
                respiratory: [
                    'NIV (BIPAP) if: pH 7.25-7.35, pCO2 >6.5 kPa, respiratory acidosis despite treatment',
                    'Controlled oxygen: Target 88-92% (venturi mask 24-28%)',
                    'IV Aminophylline if bronchodilators insufficient',
                    'Intubation if NIV fails or contraindicated'
                ]
            },
            secondLine: [
                'Triple therapy: LABA + LAMA + ICS if still symptomatic',
                'Roflumilast (PDE-4 inhibitor) if severe and frequent exacerbations',
                'Azithromycin prophylaxis (3×/week) if frequent exacerbations',
                'Carbocysteine as mucolytic if productive cough',
                'Lung volume reduction surgery or bullectomy (selected cases)',
                'Lung transplantation if very severe'
            ],
            complications: [
                'Acute exacerbations',
                'Type 2 respiratory failure',
                'Cor pulmonale (right heart failure)',
                'Pneumonia',
                'Pneumothorax',
                'Lung cancer (20× risk)',
                'Depression and anxiety',
                'Osteoporosis',
                'Polycythemia'
            ]
        },
        
        clinicalPearls: [
            'Target SpO2 88-92% in COPD - avoid high-flow oxygen (risk of CO2 retention)',
            'Not all COPD patients are "CO2 retainers" - check ABG first',
            'NIV contraindications: Vomiting, facial trauma, GCS <8, hemodynamic instability',
            'Eosinophil count helps decide on ICS: ≥300 = likely to benefit',
            'Pink puffer (emphysema): Thin, pursed lips, not cyanosed',
                'Blue bloater (chronic bronchitis): Overweight, cyanosed, edema',
            'Check inhaler technique - major cause of treatment failure',
            'LTOT improves survival only if used ≥15h/day'
        ],
        
        prognosis: 'BODE index predicts survival (BMI, Obstruction, Dyspnea, Exercise). Median survival after first ICU admission: 2 years. Smoking cessation most effective intervention.',
        
        keywords: ['COPD', 'SOB', 'wheeze', 'chronic bronchitis', 'emphysema', 'smoking', 'exacerbation'],
        
        relatedConditions: ['asthma', 'respiratory-failure', 'pneumonia', 'lung-cancer', 'cor-pulmonale']
    },

    // ==========================================
    // ENDOCRINE
    // ==========================================
    'type-1-diabetes': {
        name: 'Type 1 Diabetes Mellitus',
        domain: 'Endocrine',
        synonyms: ['T1DM', 'IDDM', 'Insulin-dependent diabetes'],
        
        recognition: {
            typical: [
                'Polyuria, polydipsia',
                'Weight loss despite normal/increased appetite',
                'Fatigue, lethargy',
                'Blurred vision',
                'Typically presents in childhood/young adults (<30 years)',
                'Acute onset over days-weeks'
            ],
            atypical: [
                'LADA (Latent Autoimmune Diabetes in Adults): Slower onset in >30s',
                'Diabetic ketoacidosis (DKA) as first presentation',
                'Recurrent infections (thrush, UTIs)',
                'Asymptomatic hyperglycemia found incidentally',
                'Diabetic complications at diagnosis (rare)'
            ],
            examination: [
                'Often no abnormal signs at diagnosis',
                'Weight loss, dehydration',
                'Signs of DKA: Kussmaul breathing, ketotic breath, abdominal pain',
                'Look for lipohypertrophy at injection sites (established disease)',
                'Assess for complications: Retinopathy, neuropathy, nephropathy'
            ],
            redFlags: [
                'DKA: Glucose >11 mmol/L, pH <7.3, ketones >3 mmol/L',
                'Severe dehydration',
                'Altered consciousness',
                'Vomiting (unable to tolerate oral intake)',
                'Abdominal pain',
                'Hypoglycemia (over-treatment)'
            ]
        },
        
        investigation: {
            immediate: [
                'Random glucose ≥11.1 mmol/L or fasting ≥7.0 mmol/L (on 2 occasions if asymptomatic)',
                'HbA1c ≥48 mmol/mol (≥6.5%)',
                'C-peptide: Low (differentiates from T2DM)',
                'Urinalysis: Glycosuria, ketonuria',
                'U&Es: Check for DKA complications'
            ],
            further: [
                'Autoantibodies: Anti-GAD, Anti-IA2, Anti-insulin (confirm autoimmune)',
                'TFTs: Screen for other autoimmune diseases',
                'Lipid profile: Baseline cardiovascular risk',
                'ACR (albumin:creatinine ratio): Screen for nephropathy',
                'Annual retinal screening',
                'Foot examination'
            ],
            interpretation: [
                'Diabetes diagnosis: Symptoms + random glucose ≥11.1 OR fasting ≥7.0 OR HbA1c ≥48',
                'C-peptide <200 pmol/L suggests Type 1',
                'Positive autoantibodies confirm autoimmune etiology',
                'HbA1c target: <48 mmol/mol (<6.5%) to minimize complications'
            ]
        },
        
        diagnosis: {
            criteria: 'Hyperglycemia + low C-peptide ± autoantibodies in young patient',
            differential: [
                'Type 2 diabetes: Older, obese, C-peptide preserved',
                'MODY: Family history, not overweight, younger onset',
                'Secondary diabetes: Pancreatic disease, steroids, Cushing syndrome',
                'LADA: Type 1 presenting in adulthood',
                'Hyperglycemia from stress/illness (transient)'
            ]
        },
        
        management: {
            firstLine: {
                insulin: [
                    'Basal-bolus regimen: Most physiological',
                    '- Basal: Long-acting (Glargine, Detemir, Degludec) OD/BD',
                    '- Bolus: Rapid-acting (NovoRapid, Humalog) with meals',
                    'Starting dose: 0.5-0.6 units/kg/day (30% basal, 70% bolus)',
                    'Carbohydrate counting and dose adjustment',
                    'Alternative: Twice-daily biphasic insulin'
                ],
                monitoring: [
                    'Fingerprick glucose: Before meals and bedtime (minimum QDS)',
                    'Target glucose: 5-7 mmol/L fasting, 4-7 mmol/L pre-meals, <9 mmol/L 2h post-meal',
                    'HbA1c every 3-6 months (target <48 mmol/mol)',
                    'Continuous glucose monitoring (CGM) or Flash glucose monitoring',
                    'Annual screening: Retinopathy, nephropathy (ACR), foot check'
                ],
                education: [
                    'Structured education program (DAFNE or equivalent)',
                    'Sick day rules: Never stop insulin, check glucose/ketones frequently',
                    'Hypoglycemia awareness and treatment (15g fast-acting carbs)',
                    'DVLA notification (can drive if aware of hypos)',
                    'Exercise management: May need less insulin or extra carbs'
                ]
            },
            secondLine: [
                'Insulin pump therapy (CSII) if: Poor control, recurrent hypos, or high insulin requirements',
                'Hybrid closed-loop systems (artificial pancreas)',
                'Adjunct: Metformin if overweight or PCOS',
                'SGLT-2 inhibitors (off-label): For weight loss and CV protection',
                'Islet cell or pancreas transplantation (rare, specialist centers)'
            ],
            complications: [
                'Acute: DKA, hypoglycemia, hyperosmolar state',
                'Microvascular: Retinopathy, nephropathy, neuropathy',
                'Macrovascular: CVD, stroke, peripheral vascular disease',
                'Diabetic foot: Ulcers, Charcot arthropathy, amputation',
                'Increased infection risk',
                'Psychological: Anxiety, depression, eating disorders'
            ]
        },
        
        clinicalPearls: [
            'Never stop insulin in Type 1 diabetes, even when nil by mouth',
            'DKA can occur with normal glucose ("euglycemic DKA")',
            'Honeymoon period: Temporary reduced insulin needs after diagnosis',
            'Dawn phenomenon: Early morning glucose rise (increase basal insulin)',
            'Somogyi effect: Rebound hyperglycemia after nocturnal hypo (reduce evening insulin)',
            'Lipohypertrophy: Rotate injection sites to prevent',
            'Driving: Must inform DVLA, test before driving, carry fast-acting carbs',
            'Pregnancy: Aim for HbA1c <48 mmol/mol preconception, tight control in pregnancy'
        ],
        
        prognosis: 'Life expectancy 10-15 years reduced. Tight glycemic control reduces complications by 25-50%. Modern management improving outcomes.',
        
        keywords: ['diabetes', 'T1DM', 'insulin', 'DKA', 'hyperglycemia', 'polyuria', 'polydipsia'],
        
        relatedConditions: ['dka', 'hypoglycemia', 'diabetic-retinopathy', 'diabetic-nephropathy', 'diabetic-neuropathy']
    },

    'type-2-diabetes': {
        name: 'Type 2 Diabetes Mellitus',
        domain: 'Endocrine',
        synonyms: ['T2DM', 'NIDDM', 'Adult-onset diabetes'],
        
        recognition: {
            typical: [
                'Often asymptomatic (detected on screening)',
                'Polyuria, polydipsia (if glucose very high)',
                'Fatigue, lethargy',
                'Slow wound healing',
                'Recurrent infections (thrush, UTIs, skin infections)',
                'Typically overweight/obese, age >40 (or >25 South Asian)',
                'Gradual onset over months-years'
            ],
            atypical: [
                'Younger age presentation (<40 years, especially with obesity)',
                'Complications at diagnosis (neuropathy, retinopathy) - suggests long-standing disease',
                'Hyperosmolar hyperglycemic state (HHS) as first presentation',
                'Weight loss (very high glucose or concurrent illness)',
                'Acanthosis nigricans (velvety dark skin in axilla, neck)'
            ],
            examination: [
                'BMI typically >25 kg/m² (>23 in South Asians)',
                'Central obesity',
                'Acanthosis nigricans (insulin resistance)',
                'Signs of complications: Reduced sensation (neuropathy), absent pulses (PVD)',
                'Fundoscopy: Diabetic retinopathy',
                'Blood pressure: Often elevated'
            ],
            redFlags: [
                'Hyperosmolar hyperglycemic state: Glucose >30 mmol/L, osmolality >320, no ketones',
                'Visual impairment: Maculopathy, vitreous hemorrhage',
                'Diabetic foot ulcer or cellulitis',
                'Acute coronary syndrome (diabetes is CVD equivalent)',
                'Acute kidney injury'
            ]
        },
        
        investigation: {
            immediate: [
                'HbA1c ≥48 mmol/mol (≥6.5%) on 2 occasions',
                'Fasting glucose ≥7.0 mmol/L or random ≥11.1 mmol/L',
                'Impaired fasting glucose: 6.1-6.9 mmol/L (pre-diabetes)',
                'Impaired glucose tolerance: 2h OGTT 7.8-11.0 mmol/L (pre-diabetes)',
                'Urinalysis: Glycosuria'
            ],
            further: [
                'ACR (albumin:creatinine ratio): Screen for nephropathy (annual)',
                'Lipid profile: Assess cardiovascular risk',
                'U&Es, eGFR: Baseline renal function',
                'TFTs: Rule out hypothyroidism',
                'Liver function: NAFLD common',
                'ECG: Asymptomatic coronary disease common',
                'Retinal screening: Annual',
                'Foot examination: Annual',
                'QRISK: Cardiovascular risk assessment'
            ],
            interpretation: [
                'Diabetes: HbA1c ≥48 mmol/mol OR fasting glucose ≥7.0 OR random ≥11.1 (with symptoms)',
                'Pre-diabetes: HbA1c 42-47 mmol/mol OR IFG 6.1-6.9',
                'ACR >3 mg/mmol = microalbuminuria (nephropathy)',
                'Target HbA1c: ≤48 mmol/mol on lifestyle ± single drug, ≤53 on medications'
            ]
        },
        
        diagnosis: {
            criteria: 'HbA1c ≥48 mmol/mol on 2 occasions (or once if symptomatic + glucose elevated)',
            differential: [
                'Type 1 diabetes: Younger, not obese, DKA, low C-peptide',
                'MODY: Family history, young, not obese',
                'Steroid-induced diabetes',
                'Pancreatic diabetes: History of pancreatitis, pancreatic cancer',
                'Cushing syndrome: Central obesity, striae, moon face',
                'Acromegaly: Enlarged hands/feet, frontal bossing'
            ]
        },
        
        management: {
            firstLine: {
                lifestyle: [
                    'Weight loss: 5-10% reduction improves glycemic control',
                    'Mediterranean or low-carbohydrate diet',
                    'Exercise: 150 min/week moderate-intensity',
                    'Smoking cessation',
                    'Alcohol reduction',
                    'Structured education program (DESMOND)'
                ],
                pharmacological: [
                    'Metformin 500mg OD, titrate to 1g BD (first-line)',
                    'If HbA1c >58 mmol/mol despite lifestyle + Metformin:',
                    '- Add SGLT-2 inhibitor (if CVD, HF, or CKD) OR',
                    '- Add DPP-4 inhibitor (Sitagliptin) OR',
                    '- Add Sulfonylurea (Gliclazide) OR',
                    '- Add Pioglitazone',
                    'If HbA1c still >58: Triple therapy or start insulin',
                    'Consider GLP-1 agonist if BMI >35 kg/m²'
                ],
                cardiovascular: [
                    'Statin: Atorvastatin 20mg (primary prevention)',
                    'ACE inhibitor or ARB if: Hypertension, nephropathy, or CVD',
                    'Aspirin 75mg if established CVD (not for primary prevention)',
                    'Blood pressure target: <140/80 mmHg (or <130/80 if complications)',
                    'SGLT-2 inhibitors: Cardiovascular and renal benefits'
                ]
            },
            secondLine: [
                'GLP-1 receptor agonists: Exenatide, Liraglutide, Semaglutide (weight loss, CV benefit)',
                'Basal insulin: Glargine, Detemir, Degludec (continue Metformin)',
                'Basal-bolus insulin if inadequate control on basal alone',
                'Combination therapy: Insulin + GLP-1 agonist',
                'Bariatric surgery: If BMI >35 and poor control',
                'Intensive lifestyle interventions: DiRECT trial showed remission with very low-calorie diet'
            ],
            complications: [
                'Microvascular: Retinopathy (leading cause blindness), nephropathy (leading cause ESRF), neuropathy',
                'Macrovascular: CAD (2-4× risk), stroke, peripheral arterial disease',
                'Diabetic foot: Ulceration, infection, Charcot arthropathy, amputation',
                'Hyperosmolar hyperglycemic state (HHS)',
                'Hypoglycemia (on sulfonylureas or insulin)',
                'Increased infection risk',
                'Erectile dysfunction',
                'Depression'
            ]
        },
        
        clinicalPearls: [
            'Metformin: Stop if eGFR <30, reduce dose if eGFR 30-45',
            'SGLT-2 inhibitors: Risk of genital infections and DKA, check for CKD benefit',
            'Sulfonylureas: Risk of hypoglycemia and weight gain',
            'Thiazolidinediones: Avoid in heart failure (fluid retention)',
            'Screen for complications at diagnosis (disease often present for years)',
            'Annual retinal screening prevents blindness',
            'Foot care: Daily inspection, podiatry, proper footwear',
            'Diabetes remission possible: Weight loss (>15kg), very low-calorie diets, bariatric surgery',
            'South Asians: Higher risk, use lower BMI threshold (≥23 kg/m²)'
        ],
        
        prognosis: '2-4× cardiovascular mortality. Life expectancy reduced by 5-10 years. Intensive glycemic and BP control reduces complications by 25%. Type 2 diabetes can be reversed with significant weight loss.',
        
        keywords: ['diabetes', 'T2DM', 'metformin', 'hyperglycemia', 'obesity', 'HbA1c'],
        
        relatedConditions: ['hyperosmolar-state', 'diabetic-retinopathy', 'diabetic-nephropathy', 'diabetic-neuropathy', 'obesity', 'hypertension', 'dyslipidemia']
    },

    // ==========================================
    // NEUROLOGY
    // ==========================================
    'stroke': {
        name: 'Stroke (Cerebrovascular Accident)',
        domain: 'Neurology',
        synonyms: ['CVA', 'Brain attack', 'Cerebral infarction'],
        
        recognition: {
            typical: [
                'Sudden onset focal neurological deficit',
                'Face drooping (facial weakness)',
                'Arm weakness (unilateral)',
                'Speech disturbance (dysarthria or dysphasia)',
                'Visual loss or diplopia',
                'Ataxia, vertigo, nystagmus (posterior circulation)',
                'Loss of consciousness (severe)',
                'Onset during activity or at rest'
            ],
            atypical: [
                'Isolated vertigo or imbalance (posterior circulation stroke)',
                'Acute confusion without obvious focal signs',
                'Seizure at onset (cortical stroke)',
                'Sudden severe headache (hemorrhagic stroke)',
                'Young patient with stroke (dissection, vasculitis, thrombophilia)',
                'Gradual symptom progression over hours (mimics stroke mimic)'
            ],
            examination: [
                'FAST: Face (facial droop), Arms (drift), Speech (slurred), Time (call 999)',
                'NIHSS score: Quantify severity',
                'Atrial fibrillation (cardioembolic source)',
                'Carotid bruit (carotid stenosis)',
                'Hypertension',
                'Signs of endocarditis (embolic source)',
                'Fundoscopy: Hypertensive or diabetic retinopathy'
            ],
            redFlags: [
                'Reduced GCS <8 (consider airway protection)',
                'Rapidly deteriorating conscious level',
                'Signs of raised ICP: Bradycardia, hypertension, irregular breathing',
                'Seizures',
                'Cerebellar stroke with brainstem compression',
                'Large territory infarct or hemorrhage'
            ]
        },
        
        investigation: {
            immediate: [
                'Non-contrast CT head: Distinguish ischemic vs hemorrhagic stroke (within 1 hour)',
                'Glucose: Hypo/hyperglycemia can mimic stroke',
                'ECG: Atrial fibrillation, recent MI',
                'Bloods: FBC, U&Es, clotting, lipids',
                'NIHSS score: Severity assessment'
            ],
            further: [
                'CT angiography: Large vessel occlusion (for thrombectomy)',
                'MRI brain with diffusion-weighted imaging: Most sensitive for acute ischemia',
                'Carotid Doppler ultrasound: Assess stenosis',
                'Echocardiography (TTE ± TOE): Cardiac source of embolism',
                '24-48h ECG monitoring: Paroxysmal AF',
                'Thrombophilia screen (if young, no vascular risk factors)',
                'Vasculitis screen (if young or systemic features)'
            ],
            interpretation: [
                'CT: Ischemic stroke may show no changes in first 6-24h, look for early signs (hyperdense MCA, loss of grey-white differentiation)',
                'Hemorrhagic stroke: Hyperdense (white) on CT',
                'Bamford classification: TACS, PACS, LACS, POCS (guides prognosis)',
                'Carotid stenosis >70%: Consider endarterectomy or stenting'
            ]
        },
        
        diagnosis: {
            criteria: 'Sudden onset focal neurological deficit lasting >24h (or causing death), with imaging excluding hemorrhage',
            differential: [
                'Hypoglycemia: Check glucose immediately',
                'Seizure with Todd paresis: Post-ictal weakness',
                'Hemiplegic migraine: Younger, history of migraine, fully resolves',
                'Functional neurological disorder (conversion)',
                'Space-occupying lesion (tumor, abscess)',
                'Subdural hematoma: Gradual onset, history of trauma',
                'Multiple sclerosis: Younger, gradual onset, previous episodes',
                'Bell palsy: Isolated facial weakness (forehead involved)'
            ]
        },
        
        management: {
            firstLine: {
                acute: [
                    'Call stroke team immediately - time is brain',
                    'ABCDE assessment',
                    'Nil by mouth until swallow screen passed',
                    'IV access, bloods, glucose',
                    'CT head within 1 hour',
                    'Thrombolysis (Alteplase 0.9mg/kg IV): Within 4.5h if ischemic stroke',
                    '- Exclude hemorrhage, recent surgery, BP >185/110',
                    'Mechanical thrombectomy: Large vessel occlusion within 6h (up to 24h selected)',
                    'Aspirin 300mg for 2 weeks (after thrombolysis or if not eligible)',
                    'Stroke unit admission: Reduces mortality and disability'
                ],
                subacute: [
                    'DVT prophylaxis: TED stockings, LMWH if immobile',
                    'Nutrition: NGT if unsafe swallow',
                    'Pressure area care',
                    'Physiotherapy, occupational therapy, SALT',
                    'Mood assessment: Depression common',
                    'Blood pressure: Permissive hypertension initially (<220/120 acceptable)',
                    'Glucose control: Avoid hypo- and hyperglycemia'
                ],
                secondary: [
                    'Antiplatelet: Clopidogrel 75mg OD long-term',
                    'Anticoagulation: If AF (start after 2 weeks, earlier if small infarct)',
                    'Statin: Atorvastatin 80mg OD',
                    'Antihypertensive: Target <130/80 after acute phase',
                    'Carotid endarterectomy: If stenosis >70% symptomatic (within 2 weeks)',
                    'Diabetes and lipid management',
                    'Smoking cessation, lifestyle modification'
                ]
            },
            secondLine: [
                'Decompressive craniectomy: Large MCA territory infarct with swelling (<48h)',
                'VP shunt: Hydrocephalus from cerebellar infarct',
                'Intra-arterial thrombolysis (specialist centers)',
                'Intensive rehabilitation programs',
                'Botulinum toxin for spasticity',
                'Antidepressants for post-stroke depression',
                'Anticonvulsants if seizures'
            ],
            complications: [
                'Cerebral edema and herniation (days 2-5)',
                'Hemorrhagic transformation (especially post-thrombolysis)',
                'Seizures (5-10%)',
                'Aspiration pneumonia',
                'DVT and pulmonary embolism',
                'Pressure sores',
                'Depression (30%)',
                'Spasticity and contractures',
                'Recurrent stroke (10% in first year)'
            ]
        },
        
        clinicalPearls: [
            'Thrombolysis: "Tissue is salvageable, time is critical" - treat up to 4.5h',
            'Wake-up stroke: Consider thrombolysis if DWI-FLAIR mismatch on MRI',
            'Posterior circulation strokes: May have normal CT initially, high mortality',
            'Cerebellar stroke: Watch for hydrocephalus and brainstem compression',
            'Young stroke: Think dissection (neck pain), vasculitis, thrombophilia, PFO',
            'AF: 5× stroke risk - anticoagulation reduces by 60%',
            'TIA: 10% risk of stroke in next 7 days - urgent assessment',
            'Blood pressure: Avoid aggressive lowering acutely (reduces penumbral perfusion)',
            'Dysphagia: 50% of strokes - aspiration pneumonia major cause of death'
        ],
        
        prognosis: '30-day mortality ~15%. 1-year mortality 30%. 30% have significant disability. Younger age, smaller infarct, prompt thrombolysis improve outcomes.',
        
        keywords: ['stroke', 'CVA', 'weakness', 'facial droop', 'dysphasia', 'thrombolysis', 'FAST'],
        
        relatedConditions: ['tia', 'atrial-fibrillation', 'hypertension', 'carotid-stenosis']
    }

    // Additional conditions will be added incrementally
    // This structure provides a comprehensive template for all ~600+ conditions
};

/**
 * Utility Functions
 */

// Get condition by ID
export function getCondition(conditionId) {
    return coreConditionsDatabase[conditionId];
}

// Search conditions by keyword
export function searchConditions(query) {
    const lowercaseQuery = query.toLowerCase();
    return Object.entries(coreConditionsDatabase)
        .filter(([id, condition]) => {
            return condition.name.toLowerCase().includes(lowercaseQuery) ||
                   condition.domain.toLowerCase().includes(lowercaseQuery) ||
                   condition.synonyms.some(syn => syn.toLowerCase().includes(lowercaseQuery)) ||
                   condition.keywords.some(kw => kw.toLowerCase().includes(lowercaseQuery));
        })
        .map(([id, condition]) => ({ id, ...condition }));
}

// Get conditions by domain
export function getConditionsByDomain(domain) {
    return Object.entries(coreConditionsDatabase)
        .filter(([id, condition]) => condition.domain === domain)
        .map(([id, condition]) => ({ id, ...condition }));
}

// Get all domains
export function getAllDomains() {
    const domains = new Set();
    Object.values(coreConditionsDatabase).forEach(condition => {
        domains.add(condition.domain);
    });
    return Array.from(domains).sort();
}

// Get statistics
export function getStatistics() {
    const domains = getAllDomains();
    const stats = {
        total: Object.keys(coreConditionsDatabase).length,
        byDomain: {}
    };
    
    domains.forEach(domain => {
        stats.byDomain[domain] = getConditionsByDomain(domain).length;
    });
    
    return stats;
}
