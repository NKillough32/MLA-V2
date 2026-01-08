// Clinical Guidelines Database
// UK NICE and specialty guidelines for common conditions

window.guidelinesDatabase = {
    'common-infections': {
        title: 'Common Infection Syndromes & Empiric Therapy (UK 2024)',
        category: 'infectious-diseases',
        evidenceLevel: 'NICE / UKHSA antimicrobial guidance',
        lastUpdated: '2024',
        organisation: 'NICE | UKHSA | BSAC',
        infectionOverview: {
            'Scope': 'High-frequency community and inpatient bacterial, viral, and fungal infections requiring empiric therapy. Adult dosing shown unless stated; always adjust for renal function, pregnancy, and paediatrics.',
            'Red flags': 'Suspected sepsis, meningism, haemodynamic instability, pregnancy, device-related infection, and immunosuppression require urgent senior review and early IV therapy.',
            'Cultures before drugs': 'Obtain blood cultures, urine, sputum, or wound samples before first dose where safe—but never delay antibiotics in life-threatening infection. De-escalate promptly with microbiology advice.'
        },
        bacterialInfections: {
            'ENT – Streptococcal tonsillitis': '1st line: Phenoxymethylpenicillin 500mg QDS (or 1g BD) for 10 days. 2nd line: Clarithromycin 500mg BD or clindamycin 300mg QDS for 5-10 days if penicillin allergy/recurrent infection.',
            'ENT – Acute otitis media (adult or child >2 years)': '1st line: Amoxicillin 500mg TDS (or 625mg TDS co-amoxiclav if perforation/systemic upset) for 5 days. 2nd line: Clarithromycin 500mg BD or co-amoxiclav 625mg TDS for 5 days when penicillin-allergic or treatment failure.',
            'Respiratory – Community-acquired pneumonia (CURB-65 0-1 outpatient)': '1st line: Amoxicillin 500mg TDS for 5 days (add clarithromycin if atypical risk). 2nd line: Doxycycline 200mg stat then 100mg OD 4 days or clarithromycin 500mg BD for 5 days when penicillin-allergic.',
            'Respiratory – Moderate/severe CAP (CURB-65 ≥2 inpatient)': '1st line: IV co-amoxiclav 1.2g TDS + clarithromycin 500mg BD. 2nd line: Ceftriaxone 2g OD + doxycycline 100mg BD or levofloxacin 500mg BD if severe beta-lactam allergy—seek ID/microbiology advice.',
            'Respiratory – Infective COPD exacerbation': '1st line: Amoxicillin 500mg TDS or doxycycline 200mg stat then 100mg OD for 5 days plus oral prednisolone 30mg for 5 days if increased sputum purulence/volume. 2nd line: Clarithromycin 500mg BD or co-amoxiclav 625mg TDS for 5 days guided by sputum cultures/Pseudomonas risk.',
            'CNS – Suspected meningococcal meningitis': '1st line: Pre-hospital benzylpenicillin 1.2g IM/IV followed by ceftriaxone 2g IV BD + dexamethasone; add ampicillin 2g IV Q4h if >60 years, pregnant, or immunocompromised. 2nd line: Cefotaxime 2g IV Q4-6h ± vancomycin if recent healthcare exposure/penicillin-resistant pneumococcus risk.',
            'Urinary – Uncomplicated cystitis (non-pregnant female)': '1st line: Nitrofurantoin MR 100mg BD for 3 days. 2nd line: Trimethoprim 200mg BD for 3 days (only if resistance <20%) or pivmecillinam 400mg TDS for 3 days.',
            'Urinary – Pyelonephritis/urosepsis': '1st line: IV ceftriaxone 1-2g OD or co-amoxiclav 1.2g TDS with step-down to oral ciprofloxacin 500mg BD for 7 days when afebrile. 2nd line: Gentamicin 5-7mg/kg OD + amoxicillin 1g TDS, or oral levofloxacin 500mg BD for 10 days if IV therapy unsuitable.',
            'Gastrointestinal – Acute uncomplicated diverticulitis': '1st line: Co-amoxiclav 625mg TDS orally for 5 days (extend to 7 days if slow response). 2nd line: Ciprofloxacin 500mg BD + metronidazole 400mg TDS for 5 days if penicillin allergy or high-risk Gram-negative resistance—arrange urgent imaging if peritonitis features.',
            'Gastrointestinal – C. difficile infection (non-severe)': '1st line: Oral vancomycin 125mg QDS for 10 days. 2nd line: Fidaxomicin 200mg BD for 10 days (preferred for recurrence) or bezlotoxumab adjunct in high-risk relapse—follow NICE NG199.',
            'Reproductive – Pelvic inflammatory disease': '1st line: Ceftriaxone 1g IM single dose + doxycycline 100mg BD + metronidazole 400mg BD for 14 days. 2nd line: Ofloxacin 400mg BD + metronidazole 400mg BD for 14 days if cephalosporin unsuitable (avoid if gonorrhoea likely).',
            'Reproductive – Uncomplicated gonorrhoea': '1st line: Ceftriaxone 1g IM single dose + doxycycline 100mg BD 7 days if chlamydia not excluded. 2nd line: Gentamicin 240mg IM + azithromycin 2g PO single doses if severe beta-lactam allergy—obtain culture/susceptibility and arrange TOC at 14 days.',
            'Skin/soft tissue – Cellulitis (non-purulent limb)': '1st line: Flucloxacillin 500mg–1g QDS for 5-7 days. 2nd line: Clarithromycin 500mg BD or doxycycline 100mg BD; escalate to IV flucloxacillin 1-2g QDS if systemic features or lymphangitis.',
            'Skin/soft tissue – Diabetic foot infection': '1st line: Co-amoxiclav 625mg TDS orally (or 1.2g IV TDS) ± metronidazole for anaerobic cover; urgent MDT review. 2nd line: Piperacillin-tazobactam 4.5g IV Q6-8h or ceftriaxone 2g OD + metronidazole when limb/life-threatening.',
            'Skin – Impetigo (non-bullous, limited lesions)': '1st line: Hydrogen peroxide 1% cream TDS for 5 days or topical fusidic acid TDS. 2nd line: Oral flucloxacillin 500mg QDS for 5 days (or clarithromycin 500mg BD) if widespread/recurrent; advise temporary school exclusion until lesions crusted.',
            'Musculoskeletal – Native joint septic arthritis': '1st line: Empiric IV flucloxacillin 2g Q6h (or vancomycin if MRSA risk) + gentamicin pending cultures with urgent orthopaedic washout. 2nd line: Ceftriaxone 2g OD + metronidazole 500mg TDS if Gram-negative risk or prosthetic joint—tailor to sensitivities with ID support.',
            'Dental – Odontogenic infection without systemic features': '1st line: Amoxicillin 500mg TDS + metronidazole 400mg TDS for 5 days alongside urgent dental drainage. 2nd line: Clindamycin 300mg QDS 5 days if penicillin allergy—advise hospital review if trismus, floor-of-mouth swelling, or airway compromise.',
            'Hepatobiliary – Acute cholecystitis/cholangitis': '1st line: Co-amoxiclav 1.2g IV TDS or ceftriaxone 2g OD + metronidazole 500mg TDS with early source control. 2nd line: Piperacillin-tazobactam 4.5g Q6h or meropenem 1g TDS for severe sepsis or ESBL/healthcare-associated risk.'
        },
        viralInfections: {
            'Seasonal influenza (high-risk or severe)': '1st line: Oseltamivir 75mg BD for 5 days (extend to 10 days in critical illness). 2nd line: Zanamivir 10mg inhaled BD for 5 days or IV zanamivir if unable to inhale; supportive care for low-risk cases.',
            'COVID-19 (non-hospitalised high risk)': '1st line: Nirmatrelvir/ritonavir 300/100mg BD for 5 days within 5 days of symptom onset (check interactions). 2nd line: 3-day IV remdesivir course (200mg day 1, then 100mg days 2-3) or molnupiravir 800mg BD for 5 days when ritonavir contraindicated.',
            'HSV-1/2 first episode or severe recurrence': '1st line: Aciclovir 400mg TDS for 5-10 days. 2nd line: Valaciclovir 500mg BD or famciclovir 250mg TDS for 5-10 days; consider suppressive therapy if ≥6 recurrences/year.',
            'Varicella zoster (shingles, >50 or ophthalmic)': '1st line: Aciclovir 800mg five times daily for 7 days (start within 72h or while new lesions appearing). 2nd line: Valaciclovir 1g TDS or famciclovir 500mg TDS for 7 days; IV aciclovir 10mg/kg TDS for immunocompromised/disseminated disease.',
            'Respiratory syncytial virus (infants/high-risk adults)': '1st line: Supportive care—oxygen, hydration, nasal suction, nutrition. 2nd line: Palivizumab prophylaxis for eligible infants or aerosolised ribavirin for severe immunocompromised cases following specialist guidance.',
            'Hepatitis B flare/reactivation': '1st line: Tenofovir alafenamide 25mg OD or entecavir 0.5mg OD if nucleos(t)ide-naïve. 2nd line: Switch to tenofovir disoproxil 245mg OD or add-on therapy guided by HBV DNA levels/resistance with hepatology input.',
            'Hepatitis C chronic infection (pan-genotypic)': '1st line: Sofosbuvir/velpatasvir 400/100mg OD for 12 weeks (F0-F3) with baseline fibrosis and viral load assessment. 2nd line: Glecaprevir/pibrentasvir 300/120mg OD with food for 8 weeks (non-cirrhotic) or 12 weeks (cirrhotic); refer to hepatology for salvage regimens.',
            'Viral gastroenteritis (norovirus/rotavirus)': '1st line: Oral rehydration solution, antiemetics (ondansetron) and early re-feeding. 2nd line: IV fluids ± electrolyte replacement for severe dehydration or inability to tolerate PO; isolate for 48h after symptom resolution to limit outbreaks.',
            'Genital warts (low-risk HPV types 6/11)': '1st line: Patient-applied imiquimod 5% cream TIW up to 16 weeks or podophyllotoxin solution BD for 3 days on/4 days off ×4 cycles. 2nd line: Cryotherapy every 1-2 weeks or surgical excision for bulky lesions—offer STI screening and HPV vaccination if eligible.'
        },
        fungalInfections: {
            'Oropharyngeal candidiasis': '1st line: Miconazole 2.5ml oral gel QDS for 7-14 days. 2nd line: Fluconazole 50mg OD for 7-14 days (systemic therapy) or itraconazole solution 100mg BD for azole-resistant cases.',
            'Vulvovaginal candidiasis': '1st line: Clotrimazole 500mg pessary single dose or 10% cream for 1-2 nights (topical preferred in pregnancy). 2nd line: Fluconazole 150mg single oral dose or boric acid 600mg PV nightly for 14 days for non-albicans species (specialist).',
            'Dermatophyte tinea pedis/corporis': '1st line: Topical terbinafine 1% OD for 1-2 weeks (continue 1 week after clearance). 2nd line: Oral terbinafine 250mg OD for 2-4 weeks or itraconazole 100mg BD for 1 week if extensive/refractory.',
            'Onychomycosis': '1st line: Oral terbinafine 250mg OD for 6 weeks (fingers) or 12 weeks (toes). 2nd line: Itraconazole pulse 200mg BD for 1 week/month (2 pulses fingers, 3-4 pulses toes) or topical amorolfine 5% lacquer weekly when oral therapy unsuitable.',
            'Invasive candidiasis (non-neutropenic)': '1st line: Echinocandin (e.g., anidulafungin 200mg IV load then 100mg OD). 2nd line: Step down to fluconazole 400-800mg OD once susceptible and clinically improved, or use liposomal amphotericin B 3mg/kg OD if echinocandin contraindicated.',
            'Invasive aspergillosis/chronic pulmonary aspergillosis': '1st line: Voriconazole 6mg/kg IV BD for 2 doses then 4mg/kg BD (switch to 200mg PO BD). 2nd line: Isavuconazole 200mg TDS for 2 days then OD or liposomal amphotericin B 3-5mg/kg OD when azoles not tolerated; coordinate with respiratory/ID specialists.'
        },
        stewardship: {
            '48-hour review': 'Reassess need for IV therapy at 48 hours—switch to oral, narrow spectrum, or stop if infection unlikely. Document indication, route, and planned duration on drug chart.',
            'Dosing considerations': 'Adjust for weight, renal/hepatic function, and drug interactions (e.g., DOACs, QT-prolonging agents). Use local dosing nomograms for aminoglycosides and vancomycin.',
            'Safety monitoring': 'Arrange baseline and follow-up FBC/U&E/LFT for prolonged therapy, monitor QT interval with macrolides/fluoroquinolones, check trough levels for vancomycin/aminoglycosides.',
            'Patient advice': 'Explain expected course, red flags requiring review, and importance of adherence. Counsel on contraception interactions (e.g., enzyme inducers), photosensitivity, and C. difficile risk.'
        }
    },
    'hypertension': {
        title: 'Hypertension Management (NICE NG136 2024)',
        category: 'cardiovascular',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        stages: {
            'Stage 1': 'Clinic BP ≥140/90 mmHg AND ABPM/HBPM ≥135/85 mmHg',
            'Stage 2': 'Clinic BP ≥160/100 mmHg AND ABPM/HBPM ≥150/95 mmHg',
            'Stage 3 (Severe)': 'Clinic systolic BP ≥180 mmHg OR clinic diastolic BP ≥120 mmHg'
        },
        treatment: {
            'Stage 1': 'Offer antihypertensive drug treatment if target organ damage, established CVD, renal disease, diabetes, or 10-year CVD risk ≥10%',
            'Stage 2': 'Offer antihypertensive drug treatment regardless of age',
            'Stage 3': 'Consider same-day specialist assessment. Immediate antihypertensive treatment'
        },
        targets: {
            'General': '<140/90 mmHg clinic, <135/85 mmHg home/ABPM',
            'Over 80 years': '<150/90 mmHg clinic, <145/85 mmHg home/ABPM',
            'Diabetes': '<140/90 mmHg clinic, <135/85 mmHg home/ABPM (consider <130/80 if kidney, eye or cerebrovascular damage)'
        },
        algorithm: {
            'Step 1': 'ACE inhibitor (or ARB if ACE inhibitor not tolerated). Consider CCB for black African/Caribbean ancestry',
            'Step 2': 'ACE inhibitor + CCB OR ACE inhibitor + thiazide-like diuretic',
            'Step 3': 'ACE inhibitor + CCB + thiazide-like diuretic',
            'Step 4': 'Add low-dose spironolactone (if K+ ≤4.5mmol/L) OR alpha-blocker OR beta-blocker'
        },
        lifestyle: 'Reduce salt intake to <6g/day, maintain healthy weight (BMI 20-25), exercise ≥150min/week moderate intensity, alcohol within recommended limits',
        monitoring: 'Annual review. More frequent if treatment changes or poorly controlled. QRISK3 assessment',
        specialPopulations: {
            'Pregnancy': 'Target <135/85 mmHg. First-line: labetalol. Alternatives: nifedipine, methyldopa',
            'Type 2 diabetes': 'ACE inhibitor or ARB first-line. Consider SGLT2 inhibitor',
            'CKD': 'ACE inhibitor or ARB first-line. Monitor eGFR and potassium'
        }
    },
    'asthma': {
        title: 'Asthma Management (NICE NG80 2024)',
        category: 'pulmonary',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        diagnosis: {
            'Clinical features': 'Wheeze, breathlessness, chest tightness, cough. Symptoms worse at night/early morning',
            'Investigations': 'Fractional exhaled nitric oxide (FeNO) if available. Spirometry with bronchodilator reversibility',
            'FeNO levels': '<25 ppb: asthma less likely. 25-50 ppb: intermediate. >50 ppb: high probability of asthma'
        },
        treatment: {
            'Step 1': 'SABA reliever therapy PRN (salbutamol 100-200 micrograms)',
            'Step 2': 'Add low-dose ICS preventer (beclometasone 200-400 micrograms/day or equivalent)',
            'Step 3': 'MART (Maintenance and Reliever Therapy) with ICS/formoterol OR ICS + LABA',
            'Step 4': 'Increase ICS to moderate dose OR add LTRA (montelukast)',
            'Step 5': 'High-dose ICS OR additional therapies (theophylline, LAMA). Consider specialist referral'
        },
        acute: {
            'Moderate': 'PEFR 50-75% best/predicted. Prednisolone 40-50mg daily for 5 days',
            'Severe': 'PEFR 33-50% best/predicted. Oxygen to maintain SpO2 94-98%. High-dose nebulised salbutamol',
            'Life-threatening': 'PEFR <33%. Silent chest, cyanosis, poor respiratory effort. IV magnesium sulfate, consider IV salbutamol'
        },
        monitoring: 'Annual asthma review. Assess inhaler technique, adherence, trigger avoidance',
        inhalers: {
            'pMDI': 'Pressurised metered dose inhaler - requires coordination. Use spacer device',
            'DPI': 'Dry powder inhaler - breath-actuated, needs adequate inspiratory flow',
            'Spacer': 'Reduces oropharyngeal deposition, improves drug delivery to lungs'
        },
        triggers: 'House dust mite, pollen, pets, exercise, viral infections, occupational allergens, drugs (aspirin, beta-blockers)'
    },
    'copd': {
        title: 'COPD Management (NICE NG115 2024)',
        category: 'pulmonary',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        diagnosis: 'Post-bronchodilator FEV1/FVC ratio <0.7 confirms airflow obstruction',
        stages: {
            'Stage 1 (Mild)': 'FEV1 ≥80% predicted',
            'Stage 2 (Moderate)': 'FEV1 50-79% predicted',
            'Stage 3 (Severe)': 'FEV1 30-49% predicted',
            'Stage 4 (Very severe)': 'FEV1 <30% predicted'
        },
        treatment: {
            'SABA/SAMA': 'Short-acting bronchodilator for breathlessness and exercise limitation',
            'LABA/LAMA': 'If symptoms persist. LAMA preferred if asthmatic features absent',
            'ICS': 'Consider adding ICS to LABA/LAMA if asthmatic features, eosinophilia, or steroid-responsive symptoms'
        },
        exacerbations: {
            'Mild-moderate': 'Increase bronchodilator use. Consider prednisolone 30mg daily for 5 days',
            'Severe': 'Oral prednisolone + antibiotics if purulent sputum/clinical signs of pneumonia',
            'Very severe': 'Hospital admission. Consider NIV if pH 7.25-7.35, O2 with target SpO2 88-92%'
        },
        lifestyle: 'Smoking cessation (most important intervention). Pulmonary rehabilitation. Annual influenza vaccination. Pneumococcal vaccination',
        monitoring: 'Annual review. MRC dyspnoea scale, exacerbation frequency, CAT score'
    },
    'oxygen-therapy': {
        title: 'Oxygen Therapy & Respiratory Support (BTS 2024)',
        category: 'pulmonary',
        evidenceLevel: 'BTS Guidelines & NICE',
        lastUpdated: '2024',
        organisation: 'British Thoracic Society',
        overview: 'Oxygen therapy is the cornerstone of managing acute hypoxaemia. The choice of delivery system depends on the severity of hypoxaemia, underlying respiratory condition, and risk of hypercapnic respiratory failure. Appropriate oxygen titration prevents both hypoxaemia and oxygen-induced hypercapnia.',
        targetSaturations: {
            'Standard patients': 'SpO2 94-98% - for most acutely unwell patients (e.g., ACS, sepsis, trauma, stroke)',
            'At-risk patients': 'SpO2 88-92% - for patients at risk of hypercapnic respiratory failure (COPD, obesity hypoventilation, neuromuscular disorders, chest wall deformities, cystic fibrosis, bronchiectasis)',
            'Critical note': 'COPD patients are at highest risk of hypercapnia. Use 28% Venturi mask at 4 l/min initially, then adjust based on blood gases. If pCO2 normal, can adjust target to 94-98%'
        },
        deliverySystems: {
            'Nasal cannulae': {
                'Flow rate': '1-6 L/min',
                'FiO2 achieved': '24-44% (approximate)',
                'Advantages': 'Comfortable, allows eating/speaking, well-tolerated for prolonged use',
                'Disadvantages': 'Variable FiO2, mouth breathing reduces effectiveness, drying of nasal mucosa at higher flows',
                'Indications': 'Mild hypoxaemia, stable patients requiring low-flow supplementation',
                'Clinical pearls': 'Each 1 L/min increases FiO2 by approximately 4%. Not suitable for patients requiring precise oxygen control'
            },
            'Simple face mask': {
                'Flow rate': '5-10 L/min (minimum 5 L/min to prevent CO2 rebreathing)',
                'FiO2 achieved': '40-60%',
                'Advantages': 'Higher FiO2 than nasal cannulae, readily available',
                'Disadvantages': 'Variable FiO2, uncomfortable, interferes with eating/speaking, risk of CO2 rebreathing if flow <5 L/min',
                'Indications': 'Moderate hypoxaemia requiring higher FiO2 than nasal cannulae',
                'Clinical pearls': 'Being superseded by Venturi masks in most clinical situations'
            },
            'Venturi mask (fixed performance)': {
                'Flow rate': 'As specified on valve (typically 2-15 L/min)',
                'FiO2 achieved': '24%, 28%, 31%, 35%, 40%, 60% (depending on valve colour)',
                'Advantages': 'Delivers precise, predictable FiO2 independent of breathing pattern. Essential for hypercapnic patients',
                'Disadvantages': 'Multiple mask changes needed, more expensive, bulky equipment',
                'Indications': 'Gold standard for COPD and patients at risk of hypercapnia. When precise oxygen control required',
                'Clinical pearls': 'Blue = 24% (2-4 L/min), White = 28% (4-6 L/min), Yellow = 35% (8-10 L/min), Red = 40% (10-12 L/min). Start with 28% at 4 L/min for COPD exacerbations'
            },
            'Non-rebreather mask (reservoir mask)': {
                'Flow rate': '10-15 L/min',
                'FiO2 achieved': 'Up to 85% (60-85% in practice)',
                'Advantages': 'Highest FiO2 from standard oxygen delivery, rapid correction of severe hypoxaemia',
                'Disadvantages': 'Cannot deliver precise low FiO2, not suitable for hypercapnic patients',
                'Indications': 'Severe hypoxaemia (SpO2 <85%), critical illness, pre-oxygenation for procedures',
                'Clinical pearls': 'Ensure reservoir bag remains inflated during inspiration. If inadequate, consider high-flow nasal oxygen or NIV'
            },
            'High-flow nasal oxygen (HFNO/Optiflow)': {
                'Flow rate': '30-70 L/min',
                'FiO2 achieved': '21-100% (titrated)',
                'Advantages': 'Heated and humidified, generates low-level PEEP (3-5 cmH2O), reduces work of breathing, better tolerated than NIV, allows eating/speaking',
                'Disadvantages': 'Requires specialist equipment, cannot measure delivered pressures, more expensive',
                'Indications': 'Type 1 respiratory failure unresponsive to standard oxygen, pre-oxygenation, weaning from NIV, palliative care',
                'Clinical pearls': 'Increasingly used as step before NIV. Flow rates ≥40 L/min provide meaningful respiratory support. Monitor for clinical deterioration - not a substitute for NIV in type 2 failure'
            }
        },
        acuteManagement: {
            'Initial assessment': {
                'Measure SpO2': 'Immediate oxygen saturation on arrival',
                'Target selection': 'Choose 94-98% or 88-92% based on risk factors (see above)',
                'Oxygen initiation': 'Start oxygen immediately if SpO2 below target',
                'Blood gases': 'Check ABG within 30-60 minutes if at risk of hypercapnia or deteriorating'
            },
            'COPD-specific approach': {
                'Initial therapy': '28% Venturi mask at 4 L/min - aim for SpO2 88-92%',
                'Monitoring': 'ABG within 30-60 minutes to check for CO2 retention and acidosis',
                'Adjustment': 'If pCO2 normal (4.6-6.0 kPa) and pH >7.35, can increase target to 94-98%. If pCO2 elevated with pH 7.25-7.35, continue 88-92% and consider NIV',
                'Red flag': 'pH <7.25 with elevated pCO2 indicates severe acidosis - requires urgent senior review and likely NIV/HDU care'
            },
            'Titration': 'Adjust oxygen delivery to maintain target saturations. Recheck ABG 30-60 minutes after any change in oxygen therapy or clinical deterioration'
        },
        nonInvasiveVentilation: {
            'Overview': 'NIV provides ventilatory support without endotracheal intubation using bilevel positive airway pressure (BiPAP). First-line for acute hypercapnic respiratory failure with respiratory acidosis',
            'Indications': {
                'Primary indication': 'COPD exacerbation with respiratory acidosis (pH 7.25-7.35, pCO2 >6.5 kPa) despite maximal medical therapy including controlled oxygen',
                'Other indications': 'Cardiogenic pulmonary oedema, obesity hypoventilation syndrome, neuromuscular disorders, chest wall deformities, decompensated OSA, weaning from invasive ventilation',
                'Bridge to decision': 'Ceiling of treatment discussions when intubation not appropriate'
            },
            'Contraindications': {
                'Absolute': 'Facial trauma/burns, fixed upper airway obstruction, unable to protect airway, vomiting, bowel obstruction, undrained pneumothorax',
                'Relative': 'Confusion/agitation (unless improving with NIV), copious secretions, haemodynamic instability, recent upper GI surgery'
            },
            'BiPAP settings': {
                'EPAP (Expiratory PAP)': '4-5 cmH2O initially. Improves oxygenation by recruiting alveoli and preventing collapse. Increase if hypoxia persists despite adequate ventilation (FiO2 >60% required)',
                'IPAP (Inspiratory PAP)': 'RCP: start 10 cmH2O, BTS: 12-15 cmH2O initially. Supports inspiration, reduces work of breathing, lowers pCO2',
                'Pressure support': 'IPAP minus EPAP (typically 8-12 cmH2O initially). This is the key ventilatory support',
                'Titration': 'Increase IPAP gradually by 2 cmH2O if persistently high/rising pCO2 with pH <7.30. Monitor patient comfort, air leaks, gastric distension. Maximum IPAP typically 20-25 cmH2O',
                'Backup rate': '12-15 breaths/min (triggers if patient breath rate falls below threshold)'
            },
            'Monitoring on NIV': {
                'Ward vs HDU': 'pH 7.25-7.35 can be managed on respiratory ward with NIV experience. pH <7.25 requires HDU/ICU with lower threshold for intubation',
                'Clinical response': 'Improvement in respiratory rate, reduced work of breathing, improved consciousness within 1-2 hours',
                'ABG timing': 'Repeat at 1, 4, and 12 hours. Look for rising pH, falling pCO2, stable/improving HCO3',
                'Failure criteria': 'Worsening or static pH, deteriorating consciousness, inability to tolerate NIV, haemodynamic instability. Requires senior review ± intubation'
            },
            'Interface selection': 'Full face mask (covers nose and mouth) - better seal, preferred in acute setting. Nasal mask - more comfortable for prolonged use but risk of mouth breathing',
            'Duration': 'Start with continuous NIV or intermittent periods (e.g., 1 hour on, 30 min off). Wean as clinical improvement occurs. Typical acute episode requires 24-48 hours'
        },
        severeExacerbations: {
            'Nebulised bronchodilators': {
                'Beta-agonists': 'Salbutamol 5mg nebulised every 4-6 hours (more frequently if severe)',
                'Anticholinergics': 'Ipratropium bromide 500mcg nebulised every 4-6 hours',
                'Combination': 'Often used together in acute setting for synergistic effect',
                'Oxygen-driven': 'Drive nebulisers with compressed air in COPD (to avoid worsening hypercapnia). Give supplemental oxygen via nasal cannulae during nebulisation to maintain target saturations'
            },
            'Corticosteroids': {
                'Oral': 'Prednisolone 30mg once daily for 5 days - reduces recovery time, prevents relapse',
                'IV alternative': 'Hydrocortisone 100mg QDS if unable to swallow or severe exacerbation. Switch to oral when able',
                'Duration': 'Do NOT extend beyond 5-7 days - no additional benefit and increased side effects'
            },
            'Antibiotics': 'If purulent sputum or clinical signs of pneumonia. See common-infections guideline for choice',
            'IV theophylline': {
                'Indication': 'Patients not responding to nebulised bronchodilators despite optimal doses',
                'Loading': 'Aminophylline 5mg/kg IV over 20 minutes (omit if on oral theophylline)',
                'Maintenance': '0.5mg/kg/hour continuous infusion',
                'Monitoring': 'Narrow therapeutic index - check levels, watch for arrhythmias, nausea. Rarely used in modern practice'
            },
            'Escalation pathway': 'Controlled oxygen → Nebulisers + steroids + antibiotics → NIV if pH 7.25-7.35 → HDU/ICU if pH <7.25 or NIV failure → Intubation and invasive ventilation'
        },
        specialScenarios: {
            'Acute asthma': 'Target SpO2 94-98%. High-flow oxygen via non-rebreather if severe. Back-to-back salbutamol nebulisers. IV magnesium sulfate if life-threatening',
            'Pneumonia': 'Target SpO2 94-98%. Oxygen to maintain saturations. May require HFNO or CPAP if bilateral infiltrates',
            'Pulmonary embolism': 'Target SpO2 94-98%. Oxygen as required. Consider thrombolysis if massive PE with haemodynamic compromise',
            'Acute pulmonary oedema': 'CPAP 5-10 cmH2O with high-flow oxygen reduces intubation rates. Give alongside diuretics and vasodilators',
            'Pneumothorax': 'High-flow oxygen (15 L/min) increases nitrogen gradient and speeds resolution if conservative management chosen. Contraindication to NIV until drained',
            'Palliative care': 'Use oxygen for symptomatic relief of breathlessness if SpO2 <90% or patient finds it helpful. HFNO increasingly used for comfort'
        },
        documentation: 'Prescribe oxygen on drug chart with target saturations clearly stated. Document oxygen device, flow rate, SpO2 achieved. Review daily and titrate to lowest FiO2 achieving target. Sign oxygen off when no longer required',
        safety: {
            'Fire risk': 'Oxygen accelerates combustion. Ensure no smoking. Remove if open flames/electrical equipment in use',
            'Humidification': 'Required for flows >4 L/min via nasal cannulae or prolonged use to prevent mucosal drying',
            'CO2 retention': 'Uncontrolled high-flow oxygen in COPD can worsen hypercapnia through Haldane effect and V/Q mismatch. Always use Venturi masks and check ABGs'
        }
    },
    'ckd': {
        title: 'Chronic Kidney Disease (NICE NG203 2024)',
        category: 'renal',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        stages: {
            'G1': 'eGFR ≥90 with kidney damage',
            'G2': 'eGFR 60-89 with kidney damage',
            'G3a': 'eGFR 45-59 (mild-moderate decrease)',
            'G3b': 'eGFR 30-44 (moderate-severe decrease)',
            'G4': 'eGFR 15-29 (severe decrease)',
            'G5': 'eGFR <15 (kidney failure)'
        },
        monitoring: {
            'G1-G2': 'Annual eGFR and ACR',
            'G3a': 'Annual eGFR and ACR',
            'G3b': '6-monthly eGFR and ACR',
            'G4-G5': '3-6 monthly eGFR and ACR. Prepare for RRT'
        },
        treatment: {
            'ACE inhibitor/ARB': 'If diabetes, hypertension, or ACR ≥3mg/mmol',
            'Statin': 'Atorvastatin 20mg for primary prevention of CVD',
            'Blood pressure': 'Target <140/90 mmHg (<130/80 if ACR >70mg/mmol)',
            'Mineral bone disease': 'Monitor calcium, phosphate, PTH, vitamin D'
        },
        referral: {
            'Immediate': 'AKI, eGFR <30, ACR >70mg/mmol, suspected renal artery stenosis',
            'Routine': 'eGFR 30-60 with progressive decline, ACR 30-70mg/mmol, hypertension difficult to control'
        },
        complications: 'Anaemia (Hb <110g/L), mineral bone disease, metabolic acidosis, cardiovascular disease'
    },
    'heart-failure': {
        title: 'Heart Failure (NICE NG106 2024)',
        category: 'cardiovascular',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        diagnosis: 'Clinical features + structural/functional cardiac abnormality. BNP >400pg/mL or NT-proBNP >2000pg/mL',
        classification: {
            'HFrEF': 'Heart failure with reduced ejection fraction (LVEF ≤40%)',
            'HFmrEF': 'Heart failure with mid-range ejection fraction (LVEF 41-49%)',
            'HFpEF': 'Heart failure with preserved ejection fraction (LVEF ≥50%)'
        },
        treatment: {
            'ACE inhibitor': 'First-line for HFrEF. Start ramipril 1.25mg twice daily, titrate to 5mg twice daily',
            'Beta-blocker': 'Add bisoprolol or carvedilol once ACE inhibitor established',
            'MRA': 'Add spironolactone if symptoms persist despite ACE inhibitor + beta-blocker',
            'ARB': 'If ACE inhibitor not tolerated. Candesartan or valsartan',
            'SGLT2 inhibitor': 'Consider dapagliflozin in HFrEF with diabetes or eGFR ≥25'
        },
        monitoring: 'U&Es within 1-2 weeks of starting/changing dose. Aim for target doses if tolerated',
        deviceTherapy: {
            'ICD': 'Primary prevention if LVEF ≤35% despite 3 months optimal medical therapy',
            'CRT': 'If LVEF ≤35%, QRS ≥130ms, sinus rhythm, on optimal medical therapy'
        },
        lifestyle: 'Daily weight monitoring. Fluid restriction if severe symptoms. Cardiac rehabilitation'
    },
    'af': {
        title: 'Atrial Fibrillation (NICE NG196 2024)',
        category: 'cardiovascular',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        types: {
            'Paroxysmal': 'Self-terminating within 7 days (usually <48 hours)',
            'Persistent': 'Lasts >7 days or requires cardioversion',
            'Long-standing persistent': '>12 months duration',
            'Permanent': 'Accepted long-term AF, no attempt at rhythm control'
        },
        rateControl: {
            'First-line': 'Beta-blocker or rate-limiting CCB (diltiazem, verapamil)',
            'Alternative': 'Digoxin (if sedentary or heart failure)',
            'Target': 'Resting heart rate <110 bpm (lenient control)',
            'Strict control': '<80 bpm if symptoms persist'
        },
        rhythmControl: {
            'Indications': 'Symptomatic AF despite rate control, younger patients, first presentation',
            'Cardioversion': 'If AF <48 hours or anticoagulated for ≥3 weeks',
            'Maintenance': 'Amiodarone, sotalol, flecainide (if no structural heart disease)'
        },
        anticoagulation: {
            'CHA2DS2-VASc': 'Calculate stroke risk. Anticoagulate if score ≥2 (men) or ≥3 (women)',
            'HAS-BLED': 'Assess bleeding risk but high score not contraindication',
            'DOAC': 'First-line: apixaban, dabigatran, edoxaban, rivaroxaban',
            'Warfarin': 'If DOAC contraindicated. Target INR 2.0-3.0'
        },
        monitoring: 'Annual review. Check for symptoms, pulse rate/rhythm, blood pressure, medication adherence'
    },
    'depression': {
        title: 'Depression Management (NICE NG222 2024)',
        category: 'mental-health',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        assessment: {
            'PHQ-9': 'Patient Health Questionnaire for severity assessment',
            'Mild': 'PHQ-9 score 5-9. Watchful waiting, self-help, brief interventions',
            'Moderate': 'PHQ-9 score 10-14. Psychological interventions or antidepressants',
            'Severe': 'PHQ-9 score 15-19. Antidepressants + psychological interventions'
        },
        psychological: {
            'First-line': 'CBT (individual or group), guided self-help, computerised CBT',
            'Alternatives': 'IPT (interpersonal therapy), counselling, mindfulness-based cognitive therapy'
        },
        pharmacological: {
            'First-line': 'SSRI (sertraline, citalopram, fluoxetine, paroxetine)',
            'Second-line': 'Different SSRI, SNRI (venlafaxine), mirtazapine',
            'Starting dose': 'Sertraline 50mg daily, citalopram 20mg daily'
        },
        monitoring: {
            'Initial': 'Review within 2 weeks of starting antidepressant',
            'Young people': 'Weekly for first month if <30 years old',
            'Ongoing': 'Every 2-4 weeks for first 3 months, then less frequently'
        },
        duration: 'Continue antidepressant for ≥6 months after remission. Consider longer if recurrent episodes',
        riskFactors: 'Discontinuation symptoms, suicide risk (especially early treatment), drug interactions'
    },
    'psychiatric-presentations': {
        title: 'Psychiatric Presentations & Treatment Ladder (2024 overview)',
        category: 'mental-health',
        evidenceLevel: 'Evidence-based summary (educational)',
        lastUpdated: '2024',
        organisation: 'Consensus summary',
        scope: 'Common psychiatric conditions with distinguishing features, stepped pharmacological/psychological options, investigations, and involuntary care triggers. Always follow local protocols.',
        conditions: {
            'Major depressive disorder': {
                presentation: '≥2 weeks of low mood/anhedonia, sleep/appetite change, fatigue, guilt, poor concentration; no mania/hypomania history',
                distinguishing: 'Episode length, anhedonia, psychomotor change; exclude bipolarity and substance causes',
                firstLine: 'SSRI/SNRI + evidence-based psychotherapy (CBT/IPT/behavioral activation); safety planning',
                secondLine: 'Switch SSRI/SNRI, mirtazapine or bupropion; augmentation with atypical antipsychotic or lithium in selected cases',
                treatmentResistant: 'ECT for severe/psychotic or resistant cases; consider rTMS where available',
                investigations: 'CBC, CMP, TSH, B12/folate, glucose/lipids (if starting some meds), pregnancy test if relevant; vitals, BMI',
                involuntaryCare: 'Risk to self/others or grave disability + impaired capacity; document assessment and consider least restrictive option'
            },
            'Bipolar disorder': {
                presentation: 'Episodic elevated/irritable mood, ↓need for sleep, pressured speech, risky behavior; depressive episodes common',
                distinguishing: 'History of mania/hypomania, family history, antidepressant-induced switches',
                firstLine: 'Mood stabilizer (lithium, valproate) or atypical antipsychotic; psychoeducation and sleep hygiene',
                secondLine: 'Alternative mood stabilizer or combo mood stabilizer + atypical antipsychotic; cautious antidepressant use only with mood stabilizer',
                treatmentResistant: 'Lithium or clozapine for refractory mania; ECT for severe mania/depression or catatonia',
                investigations: 'Renal/thyroid baseline for lithium, LFTs/platelets for valproate, pregnancy test if teratogenic risk, ECG if QT risk, glucose/lipids/weight',
                involuntaryCare: 'Dangerousness or inability to care for self due to mania/psychosis may justify detention per statute'
            },
            'Schizophrenia spectrum': {
                presentation: '≥6 months psychosis with functional decline; hallucinations, delusions, disorganized speech/behavior, negative symptoms',
                distinguishing: 'Chronicity, formal thought disorder, negative symptoms; rule out substance/medical causes',
                firstLine: 'Atypical antipsychotic + psychoeducation and social support',
                secondLine: 'Switch antipsychotic; consider long-acting injectable for adherence; psychosocial rehabilitation',
                treatmentResistant: 'Clozapine after two adequate antipsychotic trials; ECT for catatonia or select cases',
                investigations: 'CBC, CMP, fasting glucose/lipids, prolactin if symptomatic, ECG for QT risk, weight/BMI, waist circumference',
                involuntaryCare: 'When risk to self/others or grave disability; follow formal assessment, time-limited holds, appeal rights'
            },
            'Generalised anxiety disorder': {
                presentation: 'Excessive, hard-to-control worry ≥6 months with restlessness, muscle tension, sleep disturbance',
                distinguishing: 'Worry not limited to specific triggers; persistent somatic tension; exclude hyperthyroidism/substance use',
                firstLine: 'SSRI/SNRI plus CBT (worry exposure, cognitive restructuring)',
                secondLine: 'Buspirone or pregabalin per guidelines; switch SSRI/SNRI; short hydroxyzine where appropriate',
                treatmentResistant: 'Specialist review for augmentation strategies and comorbidities',
                investigations: 'TSH, CBC, CMP as indicated; substance use screen; consider GAD-7 monitoring',
                involuntaryCare: 'Rare—only if severe risk (e.g., suicidality) or inability to care for self'
            },
            'Panic disorder': {
                presentation: 'Recurrent unexpected panic attacks + persistent concern/avoidance; may have agoraphobia',
                distinguishing: 'Abrupt surges of intense fear with autonomic symptoms; fear of future attacks',
                firstLine: 'SSRI/SNRI and CBT with interoceptive exposure',
                secondLine: 'Switch SSRI/SNRI; short benzodiazepine bridge only if appropriate and brief',
                treatmentResistant: 'Higher-intensity CBT or medication adjustments with specialist input',
                investigations: 'Rule out mimics: ECG, TSH, glucose, CBC/CMP; urine tox if substance use suspected',
                involuntaryCare: 'Uncommon; consider only with acute safety risk'
            },
            'Post-traumatic stress disorder': {
                presentation: 'Trauma exposure with intrusion, avoidance, negative cognition/mood, and hyperarousal >1 month',
                distinguishing: 'Clear trauma link; re-experiencing and avoidance clusters',
                firstLine: 'Trauma-focused psychotherapy (TF-CBT, EMDR) plus SSRI/SNRI if needed',
                secondLine: 'Alternative SSRI/SNRI; prazosin for nightmares per guidelines',
                treatmentResistant: 'Specialist trauma programs; combined pharmacotherapy and psychotherapy',
                investigations: 'Labs guided by medication choice; screen for TBI and substance use; monitor BP if prazosin',
                involuntaryCare: 'Only if acute risk (suicidality/self-neglect) otherwise voluntary care preferred'
            },
            'Obsessive-compulsive disorder': {
                presentation: 'Intrusive obsessions with compulsions to reduce anxiety; insight varies',
                distinguishing: 'Time-consuming rituals, ego-dystonic thoughts; differentiate from psychosis',
                firstLine: 'High-dose SSRI plus CBT with exposure and response prevention',
                secondLine: 'Clomipramine or SSRI switch; augment with atypical antipsychotic in select cases; intensify ERP',
                treatmentResistant: 'Specialist OCD programs; rTMS (SMA target) in some settings; DBS in exceptional cases',
                investigations: 'ECG if clomipramine, CMP/Na for SSRIs when indicated; Y-BOCS for severity tracking',
                involuntaryCare: 'Rare unless severe risk or inability to self-care'
            },
            'ADHD (adult)': {
                presentation: 'Inattention and/or hyperactivity-impulsivity across settings since childhood with impairment',
                distinguishing: 'Developmental history, executive dysfunction; differentiate from anxiety/depression burnout',
                firstLine: 'Stimulants (methylphenidate/amphetamine classes) where suitable or atomoxetine; psychoeducation/organizational strategies',
                secondLine: 'Switch stimulant class or atomoxetine; consider guanfacine ER per guidelines',
                treatmentResistant: 'Behavioral coaching, workplace/school accommodations; specialist consultation',
                investigations: 'Baseline vitals/weight, cardiac history; ECG if cardiac risk, BP/HR monitoring',
                involuntaryCare: 'Not typically applicable'
            },
            'Eating disorders': {
                presentation: 'AN: restriction, low weight, fear of weight gain, body image disturbance. BN: binge/purge with normal weight and compensatory behaviors',
                distinguishing: 'Weight trajectory, compensatory behaviors, medical instability signs (bradycardia, hypotension)',
                firstLine: 'AN: nutritional rehabilitation + psychotherapy (FBT, CBT-E). BN: CBT-E + SSRI (fluoxetine)',
                secondLine: 'BN: alternative SSRI/SNRI or psychotherapy intensification. AN: specialist-led psychotherapy; olanzapine in some cases',
                treatmentResistant: 'Higher level of care (day/inpatient), NG feeding when indicated, multidisciplinary team',
                investigations: 'CBC, CMP, Mg/Phos, Ca, LFTs, glucose, ECG (QT risk), vitals, weight/BMI, orthostatics, pregnancy test if relevant; bone density in AN',
                involuntaryCare: 'May be used for life-threatening malnutrition/instability per local statutes with capacity review'
            }
        }
    },
    'obesity': {
        title: 'Obesity Management (NICE NG189 2024)',
        category: 'endocrine',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        classification: {
            'Overweight': 'BMI 25-29.9 kg/m²',
            'Obesity class I': 'BMI 30-34.9 kg/m²',
            'Obesity class II': 'BMI 35-39.9 kg/m²',
            'Obesity class III': 'BMI ≥40 kg/m²'
        },
        assessment: 'BMI, waist circumference, comorbidities (T2DM, hypertension, sleep apnoea), cardiovascular risk',
        lifestyle: {
            'Diet': 'Calorie deficit 600kcal/day. Mediterranean-style, low-calorie, low-fat diets',
            'Exercise': 'Gradually increase to 150-300 minutes moderate intensity per week',
            'Behaviour': 'Goal setting, self-monitoring, cognitive restructuring'
        },
        pharmacotherapy: {
            'Orlistat': 'BMI ≥30 or ≥28 with comorbidities. 120mg three times daily with meals',
            'GLP-1 agonists': 'Specialist initiation. Liraglutide if specific criteria met',
            'Monitoring': 'Weight loss target ≥5% at 3 months, ≥10% at 6 months'
        },
        surgery: {
            'Criteria': 'BMI ≥40 or ≥35 with comorbidities. Failed non-surgical methods',
            'Options': 'Gastric bypass, sleeve gastrectomy, adjustable gastric band',
            'Follow-up': 'Lifelong specialist monitoring, nutritional supplements'
        },
        comorbidities: 'Screen for T2DM, hypertension, dyslipidaemia, sleep apnoea, NAFLD, osteoarthritis'
    },
    'stroke': {
        title: 'Stroke Prevention & Management (NICE NG128 2024)',
        category: 'neurological',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        prevention: {
            'Antiplatelet': 'Aspirin 75mg + dipyridamole 200mg twice daily for secondary prevention',
            'Anticoagulation': 'For AF: DOAC first-line (apixaban, rivaroxaban, dabigatran)',
            'Statin': 'Atorvastatin 80mg daily for secondary prevention',
            'Blood pressure': 'Target <130/80 mmHg. Start 2 weeks after acute stroke'
        },
        acute: {
            'Recognition': 'FAST (Face, Arms, Speech, Time) assessment',
            'Thrombolysis': 'Alteplase within 4.5 hours of symptom onset if eligible',
            'Thrombectomy': 'Within 6 hours for proximal anterior circulation occlusion',
            'Aspirin': '300mg daily for 2 weeks, then 75mg daily long-term'
        },
        rehabilitation: {
            'Early': 'Mobilisation within 24 hours if medically stable',
            'MDT': 'Physiotherapy, occupational therapy, speech therapy, dietician',
            'Goals': 'Functional independence, swallowing assessment, mood screening'
        },
        riskFactors: 'Hypertension, AF, diabetes, smoking, hyperlipidaemia, carotid stenosis, previous TIA/stroke',
        monitoring: 'Annual review: BP, cholesterol, diabetes control, medication adherence, functional status'
    },
    'uti': {
        title: 'Urinary Tract Infections (NICE NG109 2024)',
        category: 'infectious-diseases',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        diagnosis: {
            'Uncomplicated UTI': 'Dysuria, frequency, urgency, suprapubic pain in healthy women',
            'Complicated UTI': 'Men, pregnant women, children, catheterised patients, immunocompromised',
            'Urine dipstick': 'Nitrites + leucocyte esterase positive. Blood may be present'
        },
        treatment: {
            'Uncomplicated cystitis': 'Nitrofurantoin 100mg twice daily for 3 days OR trimethoprim 200mg twice daily for 3 days',
            'Pyelonephritis': 'Ciprofloxacin 500mg twice daily for 7 days OR co-amoxiclav 500/125mg three times daily for 14 days',
            'Men': 'Trimethoprim 200mg twice daily for 7 days OR nitrofurantoin 100mg twice daily for 7 days',
            'Pregnancy': 'Nitrofurantoin 100mg twice daily for 7 days (avoid at term)'
        },
        recurrent: {
            'Definition': '≥3 UTIs in 12 months or ≥2 in 6 months',
            'Prevention': 'Post-coital prophylaxis, continuous prophylaxis, self-treatment',
            'Prophylaxis': 'Trimethoprim 100mg at night OR nitrofurantoin 50mg at night'
        },
        catheter: {
            'Symptomatic CAUTI': 'Treat with antibiotics based on local guidelines',
            'Asymptomatic bacteriuria': 'Do not treat unless immunocompromised or before invasive procedures'
        },
        advice: 'Adequate fluid intake, complete antibiotic course, cranberry products may help prevent recurrence'
    },
    'diabetes': {
        title: 'Type 2 Diabetes Management (NICE NG28 2024)',
        category: 'endocrine',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        diagnosis: {
            'HbA1c': '≥48 mmol/mol (≥6.5%) on two occasions OR single value if symptomatic',
            'Fasting glucose': '≥7.0 mmol/L (≥126 mg/dL)',
            'Random glucose': '≥11.1 mmol/L (≥200 mg/dL) with symptoms',
            'OGTT': '2-hour glucose ≥11.1 mmol/L (≥200 mg/dL)'
        },
        targets: {
            'HbA1c – general': 'Aim ≤48 mmol/mol (≤6.5%) for most adults with type 1 or type 2 diabetes (NICE NG17/NG28) when achievable without problematic hypoglycaemia.',
            'HbA1c – risk of hypoglycaemia': 'If on insulin/sulfonylurea or hypos are a concern, individualise to ≤53 mmol/mol (≤7.0%) and prioritise hypo avoidance.',
            'HbA1c – older adults/frailty (UK consensus)': 'Mild frailty: target ≤58–64 mmol/mol (7.5–8.0%). Moderate–severe frailty: ≤64–70 mmol/mol (8.0–8.5%) with focus on safety and quality of life.',
            'HbA1c – review cadence': 'Review regimen if HbA1c rises >58 mmol/mol (7.5%); check every 3–6 months until stable, then 6-monthly.',
            'Blood pressure': '<130/80 mmHg',
            'Cholesterol': 'Non-HDL <2.5 mmol/L'
        },
        lifestyle: {
            'Diet': 'Mediterranean-style, low glycaemic index, weight loss if BMI >25',
            'Exercise': '150 minutes moderate intensity per week, resistance training',
            'Weight': 'Target weight loss 5-10% if overweight'
        },
        medications: {
            'First-line': 'Metformin 500mg twice daily, titrate to 1g twice daily',
            'Second-line': 'SGLT2 inhibitor (if CVD/heart failure) OR DPP-4 inhibitor OR sulfonylurea',
            'Third-line': 'Triple therapy or insulin',
            'Insulin': 'Start with basal insulin (glargine, detemir) 10 units daily, titrate 2-4 units every 3-7 days'
        },
        monitoring: {
            'HbA1c': 'Every 3-6 months until stable, then 6-monthly',
            'Annual checks': 'Foot examination, eye screening, kidney function, lipids, blood pressure',
            'Sick day rules': 'Continue insulin, increase monitoring, seek help if vomiting'
        },
        complications: 'Retinopathy, nephropathy, neuropathy, cardiovascular disease, diabetic foot'
    },
    'pneumonia': {
        title: 'Pneumonia Management (NICE NG138 2024)',
        category: 'pulmonary',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        diagnosis: {
            'Clinical': 'Cough, fever, dyspnea, pleuritic chest pain, crackles',
            'CXR': 'New infiltrate (may be normal in early disease)',
            'Blood tests': 'FBC, CRP, U&E, LFT. Consider pneumococcal/legionella antigens'
        },
        severity: {
            'CURB-65': 'Confusion, Urea >7, RR ≥30, BP <90/60, age ≥65',
            'Score 0-1': 'Low severity - consider home treatment',
            'Score 2': 'Moderate severity - consider hospital admission',
            'Score ≥3': 'High severity - urgent hospital admission'
        },
        treatment: {
            'Mild CAP': 'Amoxicillin 500mg three times daily for 5 days',
            'Moderate CAP': 'Amoxicillin 500mg three times daily + clarithromycin 500mg twice daily for 5 days',
            'Severe CAP': 'Co-amoxiclav 1.2g three times daily IV + clarithromycin 500mg twice daily IV',
            'Atypical': 'Clarithromycin 500mg twice daily OR doxycycline 200mg on day 1, then 100mg daily'
        },
        admission: {
            'Criteria': 'CURB-65 ≥2, hypoxia <90%, inability to maintain oral intake, significant comorbidities',
            'Monitoring': 'Oxygen saturation, fluid balance, response to treatment',
            'Discharge': 'Clinically stable for 24 hours, able to maintain oral intake, oxygen saturation >90%'
        },
        prevention: 'Pneumococcal vaccination (≥65 years, immunocompromised), annual influenza vaccination'
    },
    'sepsis': {
        title: 'Sepsis Recognition & Management (NICE NG51 2024)',
        category: 'infectious-diseases',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        recognition: {
            'Red flags': 'Systolic BP <90, HR >130, RR ≥25, needs O2 to maintain sats ≥92%, non-blanching rash',
            'Amber flags': 'Relatives concerned about mental state, acute change in mental state, HR 91-130, T <36°C',
            'High-risk groups': 'Age >75, immunocompromised, recent surgery/invasive procedure, indwelling devices'
        },
        definitions: {
            'Sepsis': 'Life-threatening organ dysfunction due to dysregulated host response to infection',
            'Septic shock': 'Sepsis with circulatory/cellular dysfunction (lactate >2, vasopressors needed)',
            'qSOFA': 'Altered mental state, SBP ≤100, RR ≥22 (score ≥2 = high risk)'
        },
        management: {
            'Sepsis Six': '1. Give oxygen, 2. Take blood cultures, 3. Give antibiotics, 4. Give fluids, 5. Measure lactate, 6. Measure urine output',
            'Timeframe': 'Complete within 1 hour of recognition',
            'Antibiotics': 'Broad-spectrum within 1 hour. Adjust based on cultures and local guidelines',
            'Fluids': '500ml crystalloid bolus, reassess and repeat if needed'
        },
        antibiotics: {
            'Community-acquired': 'Amoxicillin 1g IV three times daily + gentamicin',
            'Hospital-acquired': 'Piperacillin-tazobactam 4.5g three times daily + gentamicin',
            'Neutropenic': 'Piperacillin-tazobactam + gentamicin',
            'Duration': 'Review daily, typically 5-7 days depending on source and response'
        },
        monitoring: 'Hourly observations, fluid balance, lactate, organ function, consider HDU/ICU if deteriorating'
    },
    'dvt-pe': {
        title: 'DVT & Pulmonary Embolism (NICE NG158 2024)',
        category: 'cardiovascular',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        assessment: {
            'Wells Score DVT': '<1 unlikely, ≥1 likely. Use 2-level score',
            'Wells Score PE': '≤4 unlikely, >4 likely. Use 2-level score',
            'D-dimer': 'If low probability. Negative D-dimer excludes VTE'
        },
        diagnosis: {
            'DVT': 'Doppler ultrasound within 4 hours or interim DOAC + scan within 24 hours',
            'PE': 'CTPA (CT pulmonary angiography) first-line imaging',
            'V/Q scan': 'If CTPA contraindicated (pregnancy, contrast allergy, renal impairment)'
        },
        treatment: {
            'Initial': 'DOAC (apixaban, rivaroxaban) first-line OR LMWH → warfarin',
            'Apixaban': '10mg twice daily for 7 days, then 5mg twice daily',
            'Rivaroxaban': '15mg twice daily for 21 days, then 20mg daily',
            'Warfarin': 'LMWH overlap until INR 2-3 for 2 consecutive days. Target INR 2.5',
            'Duration': 'Provoked: 3 months. Unprovoked: 3-6 months, consider longer if recurrent'
        },
        'massive PE': {
            'Definition': 'Hypotension, shock, cardiac arrest',
            'Treatment': 'Thrombolysis (alteplase), consider embolectomy',
            'HDU/ICU': 'Immediate admission, monitoring, vasopressor support'
        },
        thrombophilia: {
            'Screen if': 'Age <50, unprovoked VTE, recurrent VTE, unusual site, family history',
            'Tests': 'Protein C/S, antithrombin, factor V Leiden, prothrombin gene, antiphospholipid antibodies',
            'Timing': 'At least 3 months after stopping anticoagulation'
        },
        prevention: 'Risk assess all hospital admissions. LMWH prophylaxis if indicated. TED stockings if immobile'
    },
    'acs': {
        title: 'Acute Coronary Syndrome (NICE NG185 2024)',
        category: 'cardiovascular',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        recognition: {
            'Chest pain': 'Central, crushing, radiating to jaw/arm, associated with sweating, nausea',
            'Atypical': 'Epigastric pain, dyspnoea, syncope (especially elderly, diabetic, women)',
            'ECG': 'ST elevation (STEMI), ST depression/T wave inversion (NSTEMI), normal (possible ACS)'
        },
        'stemi': {
            'Diagnosis': 'ST elevation ≥1mm in ≥2 contiguous leads OR new LBBB',
            'Immediate': 'Aspirin 300mg, P2Y12 inhibitor (ticagrelor 180mg), morphine, antiemetic, GTN',
            'Reperfusion': 'Primary PCI <120 minutes OR thrombolysis if PCI not available <120 minutes',
            'Thrombolysis': 'Alteplase or tenecteplase. Give if PCI not achievable within 120 minutes'
        },
        'nstemi': {
            'Risk stratification': 'GRACE score determines management',
            'High risk': 'Coronary angiography within 72 hours',
            'Immediate': 'Aspirin 300mg, ticagrelor 180mg, fondaparinux 2.5mg SC daily',
            'Anticoagulation': 'Fondaparinux preferred unless angiography planned within 24 hours'
        },
        'secondary prevention': {
            'Antiplatelet': 'Aspirin 75mg + ticagrelor 90mg twice daily for 12 months, then aspirin alone',
            'Statin': 'Atorvastatin 80mg daily',
            'ACE inhibitor': 'Ramipril 1.25mg twice daily, titrate to 5mg twice daily',
            'Beta-blocker': 'Bisoprolol 1.25mg daily, titrate to 10mg daily',
            'Lifestyle': 'Cardiac rehabilitation, smoking cessation, BP <130/80, lipid target'
        },
        complications: 'Arrhythmias, heart failure, cardiogenic shock, mechanical complications (VSD, MR, rupture)',
        targets: 'Total cholesterol <4mmol/L, LDL <2mmol/L, non-HDL <2.5mmol/L'
    },
    'anaphylaxis': {
        title: 'Anaphylaxis Management (Resus Council UK 2024)',
        category: 'emergency',
        evidenceLevel: 'Emergency Guideline',
        lastUpdated: '2024',
        organisation: 'Resuscitation Council UK',
        recognition: {
            'ABC problems': 'Airway, breathing, circulation compromise',
            'Skin changes': 'Urticaria, angioedema, flushing (may be absent in 20%)',
            'Sudden onset': 'Minutes after exposure to known allergen',
            'Life-threatening': 'Airway/breathing/circulation problems'
        },
        treatment: {
            'IM Adrenaline': '500 micrograms (0.5ml of 1:1000) into anterolateral thigh. Repeat after 5 minutes if no improvement',
            'Position': 'Lie flat with legs raised (unless airway/breathing compromised)',
            'High-flow oxygen': '15L via non-rebreathing mask',
            'IV fluids': '500ml-1L crystalloid rapidly if signs of shock',
            'Antihistamine': 'Chlorphenamine 10mg IV/IM (after adrenaline)',
            'Steroid': 'Hydrocortisone 200mg IV/IM (after adrenaline)'
        },
        refractory: {
            'IV adrenaline': 'If no response to IM doses. Titrate carefully, cardiac monitoring',
            'Alternative': 'Glucagon 1-2mg IM if on beta-blockers'
        },
        observation: {
            'Minimum': '6-8 hours observation after resolution',
            'Biphasic reaction': 'Can occur up to 72 hours later (1-20% cases)',
            'Discharge': 'Ensure 2 adrenaline auto-injectors prescribed, referral to allergy clinic'
        },
        autoInjector: {
            'Indications': 'Previous anaphylaxis, high-risk foods (nuts, fish), venom allergy, idiopathic',
            'Training': 'Demonstrate use, provide written plan, MedicAlert bracelet',
            'Types': 'EpiPen, Jext, Emerade (150, 300, 500 microgram doses)'
        }
    },
    'osteoporosis': {
        title: 'Osteoporosis Prevention & Treatment (NICE NG239 2024)',
        category: 'endocrine',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        assessment: {
            'FRAX tool': 'Calculate 10-year fracture risk. Age, sex, BMI, risk factors',
            'DEXA scan': 'T-score ≤-2.5 = osteoporosis. -1 to -2.5 = osteopenia',
            'Indications for DEXA': 'Age >50 + fragility fracture, long-term steroids, FRAX intermediate/high risk'
        },
        riskFactors: {
            'Major': 'Age >75, previous fragility fracture, glucocorticoids, family history hip fracture',
            'Other': 'Low BMI <18.5, alcohol >14 units/week, smoking, rheumatoid arthritis, conditions causing secondary osteoporosis'
        },
        prevention: {
            'Calcium': '700-1200mg daily (diet or supplements)',
            'Vitamin D': '10-20 micrograms (400-800 IU) daily',
            'Exercise': 'Weight-bearing, balance, resistance training',
            'Lifestyle': 'Stop smoking, reduce alcohol, maintain healthy weight'
        },
        treatment: {
            'First-line': 'Oral bisphosphonate (alendronate 70mg weekly OR risedronate 35mg weekly)',
            'Administration': 'Take on empty stomach with full glass water, stay upright 30 minutes',
            'Second-line': 'IV bisphosphonate (zoledronic acid 5mg annually) OR denosumab 60mg SC 6-monthly',
            'Alternatives': 'Raloxifene (postmenopausal women), teriparatide (severe osteoporosis)',
            'Duration': 'Review after 5 years bisphosphonate, consider drug holiday'
        },
        monitoring: {
            'DEXA': 'Not routinely repeated if on treatment unless clinical indication',
            'Falls risk': 'Assess and address falls risk factors',
            'Fracture liaison': 'Post-fracture services for secondary prevention'
        },
        steroids: 'Consider bone protection if prednisolone ≥7.5mg daily for ≥3 months'
    },
    'gout': {
        title: 'Gout Management (BSR/BHPR Guidelines 2024)',
        category: 'rheumatologic',
        evidenceLevel: 'BSR Guideline',
        lastUpdated: '2024',
        organisation: 'British Society for Rheumatology',
        diagnosis: {
            'Clinical': 'Acute monoarthritis (typically 1st MTP joint), rapid onset, severe pain, red, hot, swollen',
            'Joint aspiration': 'Negatively birefringent needle-shaped crystals (monosodium urate)',
            'Serum urate': 'May be normal during acute attack. Check 2-4 weeks after attack'
        },
        acute: {
            'First-line': 'NSAID (naproxen 750mg stat, then 250mg three times daily) OR colchicine 500mcg 2-4 times daily',
            'Alternatives': 'Colchicine (if NSAID contraindicated), oral/IM steroid (if both contraindicated)',
            'Avoid': 'Do NOT start/stop allopurinol during acute attack',
            'Duration': 'Continue until 1-2 days after symptoms resolve'
        },
        uratelowering: {
            'Indications': '≥2 attacks/year, tophi, chronic gouty arthritis, urate stones, CKD stage ≥3',
            'Target': 'Serum urate <300 micromol/L (<5mg/dL)',
            'First-line': 'Allopurinol 100mg daily, increase by 100mg every 2-4 weeks to target (max 900mg)',
            'Prophylaxis': 'Give colchicine 500mcg once/twice daily OR NSAID when starting allopurinol',
            'Alternative': 'Febuxostat if allopurinol not tolerated'
        },
        lifestyle: {
            'Diet': 'Reduce purine-rich foods (red meat, seafood, organ meats, yeast extracts)',
            'Alcohol': 'Limit beer and spirits (wine less problematic)',
            'Drinks': 'Avoid sugar-sweetened drinks, increase water intake',
            'Weight': 'Gradual weight loss if overweight (rapid weight loss can trigger attacks)',
            'Vitamin C': '500mg daily may reduce urate'
        },
        monitoring: 'Check serum urate every 2-4 weeks when titrating allopurinol. Once at target, check 6-monthly',
        complications: 'Tophi (chronic urate deposits), chronic gouty arthritis, urate nephropathy'
    },
    'rheumatoid': {
        title: 'Rheumatoid Arthritis (NICE NG100 2024)',
        category: 'rheumatologic',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        diagnosis: {
            'Clinical': 'Symmetrical polyarthritis, morning stiffness >30 minutes, small joints of hands/feet',
            'Investigations': 'Rheumatoid factor, anti-CCP antibodies (more specific), inflammatory markers',
            'Imaging': 'X-rays of hands/feet. USS/MRI if X-ray normal but clinical suspicion high',
            'Referral': 'Urgent rheumatology if persistent synovitis (even if blood tests negative)'
        },
        treatment: {
            'Immediate': 'Symptom control with NSAIDs/steroids while awaiting rheumatology',
            'First-line DMARD': 'Methotrexate + short-term oral steroid OR methotrexate + another DMARD',
            'Methotrexate': '7.5mg weekly PO, increase to 15-25mg weekly. Take folic acid 5mg weekly (different day)',
            'Alternative DMARDs': 'Sulfasalazine, hydroxychloroquine, leflunomide',
            'Biologics': 'If inadequate response to ≥2 DMARDs (including methotrexate)'
        },
        monitoring: {
            'Methotrexate': 'FBC, U&E, LFT every 2 weeks until stable, then monthly for 3 months, then 2-3 monthly',
            'Disease activity': 'DAS28 score at diagnosis and after treatment changes',
            'Target': 'Remission (DAS28 <2.6) or low disease activity'
        },
        biologics: {
            'Anti-TNF': 'Adalimumab, etanercept, infliximab (if DAS28 >5.1 despite 2 DMARDs)',
            'Others': 'Rituximab, tocilizumab, abatacept, JAK inhibitors',
            'Monitoring': 'Screen for TB, hepatitis before starting. Regular infection monitoring'
        },
        complications: 'Joint damage, cardiovascular disease (increased risk), interstitial lung disease, cervical myelopathy',
        lifestyle: 'Regular exercise, smoking cessation (affects treatment response), foot care, occupational therapy'
    },
    'hypothyroidism': {
        title: 'Hypothyroidism Management (BTA Guidelines 2024)',
        category: 'endocrine',
        evidenceLevel: 'British Thyroid Association Guideline',
        lastUpdated: '2024',
        organisation: 'British Thyroid Association',
        diagnosis: {
            'TSH': '>10 mU/L with low free T4 = overt hypothyroidism',
            'Subclinical': 'TSH 5-10 mU/L with normal free T4',
            'Symptoms': 'Fatigue, weight gain, constipation, cold intolerance, bradycardia, dry skin',
            'Causes': 'Hashimoto thyroiditis (most common), post-thyroidectomy, radioiodine, drugs (amiodarone, lithium)'
        },
        treatment: {
            'Levothyroxine': 'Start 1.6 micrograms/kg/day (usually 50-100 micrograms)',
            'Elderly/cardiac': 'Start 25 micrograms daily, increase slowly',
            'Timing': 'Take on empty stomach, at least 30 minutes before food',
            'Interactions': 'Separate from calcium, iron, PPI by 4 hours'
        },
        monitoring: {
            'Initial': 'Check TSH after 6-8 weeks, adjust dose by 25-50 microgram increments',
            'Target TSH': '0.5-2.5 mU/L (lower half of reference range)',
            'Stable': 'Annual TSH once stable dose achieved',
            'Pregnancy': 'Increase dose by 25-50%, monitor TSH monthly'
        },
        subclinical: {
            'Treat if': 'TSH >10, symptoms, positive antibodies, goitre, pregnancy/planning pregnancy',
            'Monitor if': 'TSH 5-10 with no symptoms - repeat in 3-6 months'
        },
        'myxoedema coma': {
            'Emergency': 'Severe hypothyroidism with altered consciousness, hypothermia',
            'Treatment': 'IV levothyroxine 200-400 micrograms loading, IV hydrocortisone, supportive care',
            'ICU': 'High mortality, requires intensive care monitoring'
        }
    },
    'hyperthyroidism': {
        title: 'Hyperthyroidism Management (BTA Guidelines 2024)',
        category: 'endocrine',
        evidenceLevel: 'British Thyroid Association Guideline',
        lastUpdated: '2024',
        organisation: 'British Thyroid Association',
        diagnosis: {
            'TSH': 'Suppressed (<0.1 mU/L) with raised free T4 and/or T3',
            'Symptoms': 'Weight loss, heat intolerance, tremor, anxiety, palpitations, diarrhoea',
            'Causes': 'Graves disease (most common), toxic multinodular goitre, toxic adenoma, thyroiditis',
            'Graves': 'Diffuse goitre, eye signs, positive TRAb (TSH receptor antibodies)'
        },
        treatment: {
            'Carbimazole': '20-40mg daily initially, reduce to 5-15mg daily maintenance',
            'Propylthiouracil': 'If carbimazole not tolerated or pregnancy. 200-400mg daily',
            'Block and replace': 'High-dose antithyroid + levothyroxine (alternative regimen)',
            'Beta-blocker': 'Propranolol 10-40mg three times daily for symptom control'
        },
        definitive: {
            'Radioiodine': 'First-line definitive treatment for Graves. Single dose, permanent',
            'Contraindications': 'Pregnancy, breastfeeding, active Graves ophthalmopathy',
            'Outcome': 'Most become hypothyroid - need lifelong levothyroxine',
            'Surgery': 'Total thyroidectomy if large goitre, compression symptoms, or patient choice'
        },
        monitoring: {
            'Initial': 'TFTs every 4-6 weeks until stable, then 3-6 monthly',
            'FBC': 'Baseline and if sore throat/fever (agranulocytosis risk with carbimazole)',
            'LFTs': 'Propylthiouracil can cause hepatotoxicity',
            'Duration': '12-18 months antithyroid drugs, then stop and monitor for relapse'
        },
        'thyroid storm': {
            'Emergency': 'Severe thyrotoxicosis with fever, tachycardia, confusion, heart failure',
            'Treatment': 'Propylthiouracil 200mg 4-hourly, propranolol, hydrocortisone, supportive care',
            'ICU': 'High mortality, requires intensive monitoring'
        },
        pregnancy: 'Propylthiouracil preferred in 1st trimester. Aim for high-normal free T4'
    },
    'iron-deficiency': {
        title: 'Iron Deficiency Anaemia (NICE NG8 2024)',
        category: 'hematologic',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        diagnosis: {
            'FBC': 'Low Hb, low MCV (<80 fL), hypochromic red cells',
            'Iron studies': 'Low ferritin (<30 mcg/L), low serum iron, high TIBC, low transferrin saturation',
            'Clinical': 'Fatigue, dyspnoea, palpitations, pallor, angular stomatitis, koilonychia'
        },
        investigation: {
            'Men/post-menopausal women': 'Investigate for GI blood loss - urgent upper and lower GI endoscopy',
            'Pre-menopausal women': 'Menorrhagia most common cause, investigate if heavy/persistent',
            'Coeliac screen': 'Anti-TTG antibodies in all patients',
            'H. pylori': 'Test and treat if positive'
        },
        treatment: {
            'Oral iron': 'Ferrous sulfate 200mg (65mg elemental iron) twice/three times daily',
            'Alternatives': 'Ferrous fumarate, ferrous gluconate if side effects',
            'Duration': 'Continue for 3 months after Hb normalizes to replete stores',
            'Vitamin C': 'May enhance absorption - take with orange juice'
        },
        sideEffects: {
            'Common': 'Nausea, constipation, diarrhoea, black stools, abdominal pain',
            'Management': 'Take with food (reduces absorption slightly), reduce dose, try alternate day dosing'
        },
        'IV iron': {
            'Indications': 'Oral iron not tolerated/ineffective, malabsorption, ongoing blood loss, CKD',
            'Options': 'Iron isomaltoside, iron carboxymaltose - single dose possible',
            'Monitoring': 'Check Hb and ferritin 2-4 weeks after infusion'
        },
        monitoring: 'Check FBC after 2-4 weeks treatment. Hb should rise 10-20 g/L per week. Investigate if no response',
        transfusion: 'If Hb <70 g/L with symptoms OR <80 g/L with cardiovascular disease'
    },
    'type-2-diabetes': {
        title: 'Type 2 Diabetes Mellitus (NICE NG28 2024 update)',
        category: 'endocrine',
        evidenceLevel: 'NICE Clinical Guideline',
        lastUpdated: '2024',
        organisation: 'NICE',
        diagnosis: {
            'HbA1c': '≥48 mmol/mol (6.5%) on two separate tests (or ≥58 mmol/mol if symptomatic)',
            'Fasting glucose': '≥7.0 mmol/L (126 mg/dL)',
            'Random glucose': '≥11.1 mmol/L (200 mg/dL) with symptoms',
            'Screening': 'Offer testing to adults with BMI ≥25 (≥23 in South Asian) plus risk factors'
        },
        glycaemicTargets: {
            'General target': 'HbA1c ≤48 mmol/mol (6.5%) for most adults (including type 1) when safe and achievable',
            'On hypoglycaemia-causing therapy': '≤53 mmol/mol (≤7.0%) when using insulin or sulfonylureas, or if problematic hypos occur',
            'Frailty/limited life expectancy': 'Consider ≤58–64 mmol/mol (7.5–8.0%) for mild frailty and ≤64–70 mmol/mol (8.0–8.5%) for moderate–severe frailty to avoid hypos and preserve quality of life',
            'Review triggers & frequency': 'If HbA1c >58 mmol/mol (7.5%), review adherence and intensify therapy. Recheck every 3–6 months until stable, then 6-monthly',
            'Self-monitoring': 'Offer SMBG if on insulin or sulfonylurea, or evidence of hypoglycaemia'
        },
        treatment: {
            'Lifestyle': 'Structured education (e.g., DESMOND), weight loss 5-10%, 150 min moderate exercise weekly',
            'First-line': 'Metformin (start 500mg OD, titrate to 1g BD as tolerated)',
            'Dual therapy': 'Add SGLT2 inhibitor if high cardiovascular risk or established CVD; otherwise consider DPP-4 inhibitor, pioglitazone, sulfonylurea',
            'Triple therapy': 'Metformin + SGLT2 inhibitor + DPP-4 inhibitor OR GLP-1 receptor agonist',
            'Injectable therapy': 'Consider GLP-1 RA (semaglutide, liraglutide) if BMI ≥35 or if insulin unacceptable; basal insulin if inadequate control'
        },
        cardiovascularRisk: {
            'Blood pressure': 'Target <140/90 mmHg (<130/80 if albuminuria). ACE inhibitor first-line',
            'Lipid management': 'Offer atorvastatin 20mg for primary prevention',
            'Antiplatelet': 'Aspirin only if secondary prevention'
        },
        monitoring: 'Review every 3-6 months. Check HbA1c, renal function, lipid profile, weight, smoking status',
        complicationsScreening: {
            'Retinopathy': 'Annual digital retinal screening',
            'Nephropathy': 'Urine ACR and eGFR annually',
            'Neuropathy': 'Foot examination at least annually',
            'Cardiovascular': 'Assess QRISK3 score, manage risk factors aggressively'
        }
    },
    'labour-care-overview': {
        title: 'Labour Induction, Progression & Emergency Escalation (NICE NG207 / RCOG 2023)',
        category: 'obstetrics',
        evidenceLevel: 'NICE Guideline | RCOG Green-top | NHS England Safer Births',
        lastUpdated: '2023',
        organisation: 'NICE / RCOG',
        overview: {
            'Scope': 'Covers planned and emergency management of labour from cervical ripening to delivery, including Bishop score assessment, staged progress parameters, and escalation pathways.',
            'Key tools': 'Document baseline Bishop score (use in-app Bishop Score calculator) and partogram. Reassess maternal observations 4-hourly in latent labour and hourly in active labour.',
            'When to escalate': 'Failure to progress, abnormal CTG, vaginal bleeding, suspected infection, scar tenderness, cord prolapse or maternal collapse require immediate obstetric review and consideration of operative birth.'
        },
        inductionIndications: {
            'Prolonged pregnancy': 'Offer induction at 41+0 weeks (or by 42 weeks) to reduce stillbirth risk. Provide membrane sweep at 40 and 41 weeks if nulliparous (41 weeks if multiparous).',
            'Pre-labour rupture of membranes': 'If labour does not start spontaneously within 24 hours, offer induction with PGE2 or oxytocin/amniotomy. Consider immediate induction if GBS positive.',
            'Maternal conditions': 'Induce at 37-38 weeks for well-controlled pre-eclampsia, obstetric cholestasis with bile acids ≥40 µmol/L, or insulin-treated diabetes at 38-39 weeks. Individualise for fetal growth restriction or intrauterine fetal death.',
            'Safety checklist': 'Confirm cephalic presentation, exclude placenta previa, ensure CTG reassuring, consent documented, cannula sited and bloods grouped & saved before prostaglandins or oxytocin.'
        },
        bishopScore: {
            components: {
                'Cervical position': 'Posterior (0) / Mid (1) / Anterior (2)',
                'Consistency': 'Firm (0) / Intermediate (1) / Soft (2)',
                'Effacement': '0-30% (0) / 40-50% (1) / 60-70% (2) / ≥80% (3)',
                'Dilation': '<1 cm (0) / 1-2 cm (1) / 3-4 cm (2) / ≥5 cm (3)',
                'Fetal station': '-3 (0) / -2 (1) / -1 to 0 (2) / +1 or +2 (3)'
            },
            interpretation: {
                '<5': 'Unfavourable cervix – low chance of spontaneous labour; prioritise cervical ripening before amniotomy/oxytocin.',
                '5-7': 'Intermediate – consider combined methods and close review after each intervention.',
                '≥8': 'Favourable cervix – high likelihood of spontaneous labour or rapid response to amniotomy with oxytocin.'
            },
            managementLinks: {
                '≤6 (ripening required)': 'Offer prostaglandin E2 pessary/gel or oral misoprostol as per local policy; mechanical balloon catheter if prior caesarean or high hyperstimulation risk. Reassess Bishop score 6 hours after gel or 24 hours after pessary.',
                '>6 (ripe cervix)': 'Proceed to amniotomy followed by IV oxytocin infusion titrated to 4 contractions per 10 minutes. Start continuous CTG if oxytocin used or risk factors present.',
                'Failed ripening': 'After 2 prostaglandin cycles (or 24 hours with balloon) discuss repeat attempt versus caesarean, weighing maternal preference, parity, and fetal status.'
            }
        },
        cervicalRipeningOptions: {
            'Membrane sweep': 'Digital separation of membranes from lower uterine segment; can be offered from 40 weeks (nulliparous) or 41 weeks (multiparous). Reduces need for formal induction but may cause cramping/spotting.',
            'Dinoprostone (PGE2)': 'Vaginal tablet/gel (1-2 mg) or slow-release pessary (10 mg). Observe for uterine tachysystole; remove pessary and consider tocolysis (terbutaline 0.25 mg SC) if hyperstimulation with fetal compromise.',
            'Misoprostol (PGE1)': '25-50 micrograms orally 2-hourly (off-label UK) mainly for IUFD or when dinoprostone contraindicated. Avoid with previous uterine scar.',
            'Mechanical balloon': 'Double-balloon catheter inflated 30-80 ml each side for 12-24 h. Useful after caesarean or when prostaglandins contraindicated; combine with oxytocin if cervix favourable.',
            'Oxytocin + amniotomy': 'After Bishop >6, perform artificial rupture of membranes ensuring presenting part engaged, then start oxytocin 1-2 mU/min increasing every 30 minutes to achieve adequate contractions.'
        },
        labourStages: {
            'Latent first stage': 'Painful contractions with cervical change up to 3-4 cm. Offer supportive care, analgesia, hydration, and encourage mobilisation. Assess maternal obs 4-hourly; consider discharge if reassuring.',
            'Active first stage': 'Regular contractions with dilation ≥4 cm progressing ≥2 cm over 4 hours in nulliparas (≥1 cm in multiparas). Continuous CTG if risk factors. Failure to progress or oxytocin need triggers obstetric review.',
            'Transition/second stage': 'Full dilation to birth. Passive phase (up to 2 h) if no urge to push, then active pushing ≤2 h (nullip) or ≤1 h (multip) before senior review. Monitor fetal heart every 5 min (or continuous CTG if risk).',
            'Third stage': 'From birth of baby to placenta delivery. Active management with oxytocin 10 IU IM, controlled cord traction, uterine massage. Escalate for haemorrhage >500 ml.'
        },
        emergencySituations: {
            'Failure to progress': 'Confirm adequate contractions (via palpation or intrauterine pressure catheter). Correct hypotension, offer bladder emptying, escalate to oxytocin or operative delivery if no dilation progress ≥4 h.',
            'Fetal compromise': 'Continuous CTG with abnormal features (late decelerations, reduced variability). Actions: reposition (left lateral), stop oxytocin, treat tachysystole with tocolysis, give IV fluids/oxygen as per local policy, prepare for operative birth within 30 minutes if category-1.',
            'Cord prolapse': 'Call for help, elevate presenting part, place mother knee-chest, fill bladder with 500 ml saline, avoid handling cord, expedite caesarean unless imminent vaginal birth safe.',
            'Uterine rupture risk': 'Scar tenderness, sudden pain, fetal distress, loss of station. Stop oxytocin, prepare for emergency laparotomy and blood products.',
            'Infection/chorioamnionitis': 'Maternal fever >38°C, fetal tachycardia. Start broad-spectrum IV antibiotics (co-amoxiclav or cefuroxime + metronidazole) and expedite delivery.'
        },
        caesareanSection: {
            'Immediate (category 1)': 'Persistent fetal bradycardia, cord prolapse with fetal compromise, placental abruption with maternal instability, uterine rupture. Target decision-to-delivery ≤30 minutes.',
            'Urgent (category 2)': 'Failure to progress despite adequate contractions, failed instrumental delivery, failed induction after multiple ripening cycles, or maternal comorbidities worsening (e.g., severe pre-eclampsia). Aim ≤75 minutes.',
            'Elective/Planned': 'Malpresentation, placenta previa, ≥2 previous caesareans, macrosomia with diabetes, HIV with high viral load. Ensure VTE prophylaxis and antibiotic prophylaxis (e.g., cefuroxime + metronidazole).'
        },
        escalationBundles: {
            'Hyperstimulation management': 'Remove prostaglandin pessary or stop oxytocin, position lateral, give tocolysis (terbutaline 0.25 mg SC or IV salbutamol), continuous CTG until reassuring.',
            'Operative vaginal birth checklist': 'Confirm full dilation, engaged head, adequate analgesia, empty bladder, informed consent, neonatal team alerted, and theatre on standby.',
            'Documentation & debrief': 'Record Bishop score, interventions, CTG category, discussions about caesarean, and provide post-event counselling especially after emergencies or IUFD.'
        }
    },
    'preeclampsia': {
        title: 'Hypertension in Pregnancy & Preeclampsia (NICE NG133 2023 update)',
        category: 'obstetrics',
        evidenceLevel: 'NICE Guideline',
        lastUpdated: '2023',
        organisation: 'NICE',
        diagnosis: {
            'Gestational hypertension': 'New hypertension (≥140/90 mmHg) after 20 weeks without proteinuria',
            'Preeclampsia': 'Hypertension after 20 weeks with proteinuria (≥300 mg/24 h or PCR ≥30 mg/mmol) and/or maternal organ dysfunction',
            'Severe features': 'BP ≥160/110 mmHg, platelets <150 x10⁹/L, rising creatinine, elevated AST/ALT, headache/visual disturbance, pulmonary oedema, fetal growth restriction'
        },
        investigations: {
            'Maternal': 'Weekly FBC, U&E, LFTs in moderate disease; twice weekly if severe. Monitor urine PCR and clinical symptoms',
            'Fetal': 'Fortnightly growth scans and Dopplers, weekly CTG in severe disease'
        },
        management: {
            'BP control': 'Treat sustained BP ≥150/100 mmHg; target <135/85 mmHg. Use labetalol first-line, nifedipine MR or methyldopa alternatives',
            'Severe hypertension': 'Treat within 30 minutes. IV labetalol 20 mg bolus (repeat 40-80 mg) or hydralazine 5-10 mg IV. Consider oral nifedipine 10 mg if IV access delayed',
            'Seizure prophylaxis': 'Magnesium sulphate 4 g IV loading then 1 g/hour infusion for women with severe preeclampsia or eclampsia',
            'Fluid balance': 'Restrict to 80 ml/hour unless additional losses, monitor urine output, avoid fluid overload'
        },
        deliveryPlanning: {
            '<34 weeks': 'Expectant management in tertiary centre if maternal/fetal status stable',
            '34-36+6 weeks': 'Consider delivery if severe hypertension or maternal/fetal compromise',
            '≥37 weeks': 'Recommend birth within 24-48 h for confirmed preeclampsia'
        },
        postpartumCare: {
            'Monitoring': 'Continue magnesium sulphate for 24 h postpartum if used antenatally, monitor BP for 3 days then at 7-10 days',
            'Medication': 'Switch methyldopa within 2 days postpartum, continue antihypertensives tailored to breastfeeding safety',
            'Follow-up': 'Offer renal and BP review at 6-8 weeks postpartum; counsel regarding cardiovascular risk in future life'
        }
    },
    'gestational-diabetes': {
        title: 'Gestational Diabetes Mellitus (NICE NG3 2020 update)',
        category: 'obstetrics',
        evidenceLevel: 'NICE Guideline',
        lastUpdated: '2020',
        organisation: 'NICE',
        diagnosis: {
            'At booking': 'Offer early HbA1c to women with previous GDM, BMI ≥30, first-degree relative with diabetes, or high-risk ethnicity',
            'Standard 75 g OGTT': 'Fasting plasma glucose ≥5.6 mmol/L or 2-hour ≥7.8 mmol/L between 24-28 weeks confirms diagnosis'
        },
        glycaemicTargets: {
            'Fasting': '<5.3 mmol/L',
            '1-hour postprandial': '<7.8 mmol/L',
            '2-hour postprandial': '<6.4 mmol/L'
        },
        management: {
            'Lifestyle': 'Structured dietary advice, 30 minutes moderate exercise daily, weight management support',
            'Metformin': 'Start if lifestyle fails within 1-2 weeks and fasting glucose <7 mmol/L; titrate to 2 g/day as tolerated',
            'Insulin': 'Initiate if fasting glucose ≥7 mmol/L or if targets unmet on maximal metformin. Use basal-bolus regimen aligned to meals',
            'Aspirin': 'Offer 150 mg nocte from 12 weeks to women with GDM risk plus preeclampsia risk factors'
        },
        fetalSurveillance: {
            'Ultrasound': 'Growth scans at 28, 32, 36 weeks to monitor macrosomia and amniotic fluid',
            'Delivery planning': 'Offer induction or CS at 40+0 weeks if no complications; individualise earlier birth for macrosomia, maternal indications, or insulin use'
        },
        intrapartum: {
            'Glucose monitoring': 'Check hourly capillary glucose during labour aiming 4-7 mmol/L; use IV insulin/dextrose infusion if >7 mmol/L despite sips of water',
            'Neonatal': 'Ensure early feeding and measure neonatal glucose at 2-4 hours of age'
        },
        postnatalCare: {
            'Screening': '6-12 week 75 g OGTT or fasting plasma glucose, then annual HbA1c or fasting glucose',
            'Lifestyle': 'Encourage weight optimisation, physical activity, discuss 7-fold risk of type 2 diabetes and importance of future pregnancy planning'
        }
    },
    'hyperemesis-gravidarum': {
        title: 'Hyperemesis Gravidarum (RCOG Green-top 69, 2023)',
        category: 'obstetrics',
        evidenceLevel: 'Royal College Guideline',
        lastUpdated: '2023',
        organisation: 'RCOG',
        diagnosis: {
            'Definition': 'Protracted nausea and vomiting with weight loss >5% pre-pregnancy weight, dehydration or electrolyte imbalance',
            'Assessment': 'PUQE score ≥13 suggests severe disease; evaluate for differential diagnoses (thyroid disease, gastrointestinal pathology)'
        },
        management: {
            'Ambulatory care': 'Offer oral/IV antiemetics (cyclizine, prochlorperazine, ondansetron), thiamine supplementation, and hydration in day care settings when possible',
            'Inpatient care': 'Indicated if intractable vomiting, ketonuria, electrolyte disturbance, or inability to tolerate oral intake',
            'Escalation': 'Consider enteral or parenteral nutrition if weight loss persists despite therapy; involve dietetics early'
        },
        pharmacotherapy: {
            'First-line': 'Cyclizine, prochlorperazine or promethazine',
            'Second-line': 'Metoclopramide or ondansetron (off-label but supported by RCOG for refractory cases)',
            'Adjuncts': 'Thiamine 100 mg IV/IM prior to dextrose to prevent Wernicke’s encephalopathy; consider corticosteroids (hydrocortisone 100 mg IV q12h) for refractory hyperemesis after specialist input'
        },
        supportiveCare: {
            'Venous thromboembolism': 'Assess risk daily; provide LMWH prophylaxis during inpatient stay',
            'Psychological support': 'Offer counselling, peer support networks, occupational health review for work adjustments'
        }
    },
    'abortion-care': {
        title: 'Abortion Care (NICE NG140 2019, refreshed 2022)',
        category: 'obstetrics',
        evidenceLevel: 'NICE Guideline',
        lastUpdated: '2022',
        organisation: 'NICE',
        indications: {
            'Legal framework (England/Wales)': 'Requires certification by 2 registered medical practitioners per Abortion Act 1967 with grounds recorded (Sections A–E)',
            'Gestational limits': 'Medical abortion recommended up to 24 weeks in line with legislation; consider feticide if ≥22 weeks prior to surgical procedures'
        },
        assessment: {
            'Access': 'Offer self-referral routes and direct access to services without need for GP letter; provide telephone/telemedicine consultations when appropriate',
            'Dating': 'Use ultrasound to confirm gestational age when LMP uncertain, symptoms atypical, or ectopic pregnancy risk factors present',
            'Safeguarding': 'Screen for domestic/sexual abuse, coercion, trafficking and mental health issues at every contact'
        },
        medicalAbortion: {
            'Early medical (<10 weeks)': 'Mifepristone 200 mg PO followed 24–48 h later by misoprostol 800 micrograms buccal, sublingual, or vaginal (repeat 400 micrograms doses if incomplete). Offer home use of both medicines when clinically suitable',
            '10–23+6 weeks': 'Mifepristone 200 mg PO then misoprostol 800 micrograms PV/SL followed by 400 micrograms every 3 hours (max 5 doses in 24 h). Monitor in clinic after 14 weeks',
            'Anti-D prophylaxis': 'Offer 250 IU anti-D immunoglobulin to rhesus-negative women from 10 weeks gestation or earlier if surgical/medical evacuation required'
        },
        surgicalAbortion: {
            '<14 weeks': 'Vacuum aspiration under local or conscious sedation where possible. Offer cervical priming with misoprostol 400 micrograms SL 1–2 h pre-procedure (or mifepristone 200 mg 24 h prior) if nulliparous or 12–14 weeks',
            '≥14 weeks': 'Dilataion and evacuation by trained surgeons with ultrasound guidance where feasible; administer prophylactic antibiotics (e.g., doxycycline 100 mg BD 3 days)',
            'Anaesthesia': 'Use local anaesthesia plus sedation when safe to maximise choice; general anaesthesia reserved for complex cases'
        },
        aftercare: {
            'Contraception': 'Offer immediate contraception (LARC, pills, condoms) including same-visit fitting of implant or IUS when not contraindicated',
            'Follow-up': 'Routine review not required after uncomplicated early medical abortion; advise self-performed low-sensitivity pregnancy test at 2–3 weeks and provide helpline access',
            'Safety net': 'Inform patients about expected bleeding (up to 2 weeks), warning signs (soaking ≥2 pads/hour, fever, severe abdominal pain) and when to seek urgent care'
        }
    },
    'postpartum-haemorrhage': {
        title: 'Postpartum Haemorrhage (RCOG Green-top Guideline No. 52, 2016, reaffirmed 2021)',
        category: 'obstetrics',
        evidenceLevel: 'Royal College Guideline',
        lastUpdated: '2021',
        organisation: 'RCOG',
        definitions: {
            'Primary PPH': 'Blood loss ≥500ml within 24 hours of birth (≥1000ml considered major)',
            'Secondary PPH': 'Abnormal bleeding from 24 hours to 12 weeks postpartum'
        },
        riskAssessment: {
            'Antenatal': 'Previous PPH, placenta previa/accreta, multiple pregnancy, anaemia, fibroids',
            'Intrapartum': 'Prolonged labour, augmentation, operative delivery, macrosomia, retained placenta'
        },
        prevention: {
            'Active management of third stage': 'Offer to all women – uterotonic (oxytocin 10 IU IM), controlled cord traction',
            'Iron optimisation': 'Treat antenatal anaemia to Hb ≥105 g/L',
            'Birth planning': 'Deliver in consultant-led unit if high risk'
        },
        management: {
            'Initial response': 'Call for help, ABC assessment, uterine massage, two large-bore cannulae, blood tests (FBC, coagulation, fibrinogen)',
            'Uterotonic sequence': 'Oxytocin 10 IU IV/IM → Ergometrine 500 mcg IM (if no hypertension) → Carboprost 250 mcg IM q15min (max 8) → Misoprostol 800-1000 mcg PR',
            'Adjuncts': 'Tranexamic acid 1g IV within 3 hours (repeat once if needed), consider fibrinogen concentrate/cryoprecipitate if fibrinogen <2g/L',
            'Mechanical/Surgical': 'Balloon tamponade, B-Lynch suture, uterine artery embolisation, hysterectomy as last resort'
        },
        monitoring: 'Record cumulative blood loss, vital signs, urine output ≥30ml/hr, temperature. Repeat labs every 30-60 min while bleeding',
        postEventCare: 'Debrief patient, check for anaemia, consider iron therapy, document and plan for future pregnancies'
    }
};
