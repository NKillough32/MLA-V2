/**
 * LaddersManager.js - V2 Clinical Treatment Ladders Manager
 * 
 * Manages steroid and pain treatment ladders with equivalent dosing and conversion guides.
 * Extracted from V1 to provide clean, modular architecture for V2.
 * 
 * Features:
 * - Steroid potency comparison and equivalent dosing
 * - WHO Pain Ladder with systematic approach
 * - Opioid conversion calculations
 * - Adjuvant analgesics for different pain types
 * - Clinical pearls and safety guidelines
 * - Tab-based navigation between different ladders
 */

class LaddersManager {
    constructor() {
        this.ladderTabsInitialized = false;
        this.activeLadder = 'steroids';
        this.laddersData = this.initializeLaddersData();
        
        console.log('🪜 LaddersManager initialized with Clinical Treatment Ladders');
    }

    /**
     * Initialize the ladders manager
     */
    initialize() {
        console.log('🪜 LaddersManager initialize() called');
        // Manager is already initialized in constructor
        return Promise.resolve();
    }

    /**
     * Initialize the ladders data structure
     * @returns {Object} Complete ladders data
     */
    initializeLaddersData() {
        return {
            steroids: {
                name: 'Corticosteroid Ladder',
                description: 'Glucocorticoid potency and equivalent dosing',
                icon: '💊',
                medications: [
                    {
                        name: 'Cortisone',
                        potency: '0.8x',
                        equivalentDose: '25 mg',
                        duration: '8-12h',
                        clinicalUses: 'Rarely used (requires hepatic conversion)',
                        category: 'low'
                    },
                    {
                        name: 'Hydrocortisone',
                        potency: '1x (baseline)',
                        equivalentDose: '20 mg',
                        duration: '8-12h',
                        clinicalUses: 'Addison\'s, adrenal crisis, septic shock',
                        category: 'medium'
                    },
                    {
                        name: 'Prednisolone',
                        potency: '4x',
                        equivalentDose: '5 mg',
                        duration: '12-36h',
                        clinicalUses: 'Asthma, COPD, polymyalgia rheumatica, IBD',
                        category: 'high'
                    },
                    {
                        name: 'Methylprednisolone',
                        potency: '5x',
                        equivalentDose: '4 mg',
                        duration: '12-36h',
                        clinicalUses: 'Acute asthma, COPD, spinal cord injury',
                        category: 'high'
                    },
                    {
                        name: 'Dexamethasone',
                        potency: '25-30x',
                        equivalentDose: '0.75 mg',
                        duration: '36-54h',
                        clinicalUses: 'Cerebral oedema, croup, severe asthma, COVID-19',
                        category: 'ultra-high'
                    },
                    {
                        name: 'Betamethasone',
                        potency: '25-30x',
                        equivalentDose: '0.75 mg',
                        duration: '36-54h',
                        clinicalUses: 'Fetal lung maturation, severe inflammation',
                        category: 'ultra-high'
                    }
                ],
                categories: {
                    'medium': {
                        name: 'Low Potency (Short-acting)',
                        color: '#f8c837ff',
                        medications: 'Hydrocortisone',
                        features: [
                            'Physiological replacement therapy',
                            'Addison\'s disease',
                            'Adrenal crisis',
                            'Has mineralocorticoid activity'
                        ]
                    },
                    'high': {
                        name: 'Intermediate Potency',
                        color: '#db6707ff',
                        medications: 'Prednisolone, Methylprednisolone',
                        features: [
                            'Most common for systemic use',
                            'Acute asthma exacerbations',
                            'COPD exacerbations',
                            'Autoimmune conditions',
                            'IBD flares'
                        ]
                    },
                    'ultra-high': {
                        name: 'High Potency (Long-acting)',
                        color: '#f33043ff',
                        medications: 'Dexamethasone, Betamethasone',
                        features: [
                            'Minimal mineralocorticoid activity',
                            'Suitable for cerebral oedema',
                            'Used in fetal lung maturation',
                            'Severe inflammatory conditions'
                        ]
                    }
                },
                clinicalPearls: [
                    'Conversion: Prednisolone 40mg ≈ Hydrocortisone 100mg ≈ Dexamethasone 6mg',
                    'Tapering: Required if >3 weeks use, >40mg/day prednisolone, or evening doses',
                    'Side effects: Hyperglycaemia, immunosuppression, osteoporosis, adrenal suppression',
                    'Morning dosing: Mimics physiological cortisol rhythm (except dexamethasone)',
                    'PPI protection: Consider if high-dose, elderly, or GI risk factors'
                ]
            },
            guidelines: {
                name: 'NICE Treatment Pathways',
                description: 'Stepwise escalation and de-escalation sequences aligned with current UK NICE/BTS-SIGN guidance.',
                icon: '🧭',
                steps: new Array(12).fill(null),
                ladders: [
                    {
                        key: 'asthma',
                        title: 'Asthma (Adults & Children) – Step-Up/Step-Down',
                        shortTitle: 'Asthma Step-Up/Down',
                        reference: 'NICE NG245 / BTS-SIGN 2024',
                        summary: 'Progress from reliever-only therapy to maintenance-and-reliever treatment, then add-on controllers and biologics while reviewing inhaler technique and adherence at each step. MART (maintenance-and-reliever therapy) licensed inhalers in the UK include Fostair (beclometasone/formoterol) and Symbicort (budesonide/formoterol). Always check the product SPC for the maximum licensed daily formoterol dose (some preparations have maxima ≈ 54 µg/day); avoid exceeding licensed formoterol limits.',
                        steps: [
                            { stage: 'Paediatric pathways', trigger: '<5y / 5–11y / ≥12y', therapy: '<5y: focus on as-needed SABA and consider specialist review before any controller; trial of low-dose nebulised/low-dose inhaled ICS under paediatric advice. 5–11y: consider daily low-dose ICS, LTRA (montelukast) or MART where licensed for the age and inhaler device. ≥12y: consider MART (licensed ICS/formoterol inhalers such as Fostair, Symbicort) as maintenance-and-reliever therapy when appropriate; tailor device and dosing by age and ability.', notes: 'Involve paediatric respiratory team for recurrent or severe disease; ensure spacer/device education.' },
                            { stage: 'Initial', trigger: 'Infrequent symptoms, no night waking', therapy: 'SABA PRN ± intermittent low-dose ICS when SABA used', notes: 'Educate on trigger avoidance, inhaler technique and adherence; review smoking exposure.' },
                            { stage: 'Step 2', trigger: 'Symptoms ≥3/week or night waking', therapy: 'Daily low-dose ICS OR MART (low-dose ICS/formoterol) if patient ≥12y and a licensed product is suitable (eg Fostair, Symbicort).', notes: 'Observe maximum daily formoterol dose per SPC; use caution with repeated high reliever use.' },
                            { stage: 'Step 3', trigger: 'Persistent symptoms despite low-dose ICS', therapy: 'Add LABA via fixed-dose ICS/LABA or continue MART where licensed; consider add-on LAMA (tiotropium) from age-appropriate thresholds.', notes: 'Check adherence, inhaler technique, comorbidities (rhinitis, reflux, obesity) and smoking; consider phenotyping.' },
                            { stage: 'Step 4', trigger: 'Uncontrolled on MART or medium-dose ICS/LABA', therapy: 'Increase ICS to medium/high dose; consider LAMA, treat comorbidities, and assess for biologic eligibility if type 2 inflammation suspected.', notes: 'Biomarkers: FeNO ≥25 ppb and/or blood eosinophils ≥0.3 ×10^9/L indicate type 2 inflammation and higher chance of response to anti-IL/anti-IgE biologics.' },
                            { stage: 'Step 5 — Severe / Difficult-to-treat', trigger: 'Frequent exacerbations or severe symptoms despite optimized therapy', therapy: 'Refer to specialist severe asthma service for multidisciplinary assessment and consideration of biologics (omalizumab, mepolizumab, benralizumab, dupilumab) or maintenance oral corticosteroids where unavoidable.', notes: 'Referral triggers: ≥2 steroid-requiring exacerbations in 12 months, hospital admission for asthma, continuous or frequent oral corticosteroid use, FeNO ≥25 ppb, blood eosinophils ≥0.3 ×10^9/L, documented allergic phenotype, or persistently poor lung function despite optimization.' },
                            { stage: 'Acute severe asthma', trigger: 'Severe dyspnoea, inability to speak in sentences, SpO2 <92% or PEFR <50% predicted', therapy: 'Oxygen to target SpO2 94–98% (adults); high-flow if required. Nebulised salbutamol 5 mg repeat 5–15 min ± ipratropium 500 mcg if severe. Give oral prednisolone 40 mg PO (or IV hydrocortisone 100–200 mg if unable to take PO). Consider IV magnesium sulphate 2 g IV over 20 minutes if poor response to inhaled therapy.', notes: 'Monitor for hypercapnia; prepare for continuous nebulisation, consider IV bronchodilators and escalation to ICU if worsening or PaCO2 rising.' },
                            { stage: 'Life-threatening asthma', trigger: 'Silent chest, cyanosis, bradycardia, altered consciousness, or rising PaCO2', therapy: 'Immediate senior/anaesthetic/ICU review; consider intubation and mechanical ventilation, continuous bronchodilator therapy, and IV bronchodilators or ketamine as per local critical care protocols.', notes: 'ICU triggers: worsening hypoxia despite oxygen, hypercapnia, respiratory acidosis, exhaustion, reduced conscious level, or haemodynamic instability.' }
                        ]
                    },
                    {
                        key: 'copd',
                        title: 'COPD Stepwise Pharmacological Escalation & AECOPD',
                        shortTitle: 'COPD Escalation',
                        reference: 'NICE NG115 (2023 update)',
                        summary: 'Escalate based on symptoms, exacerbation risk and eosinophil phenotype. Treat exacerbations promptly with controlled oxygen, short course steroids and selected antibiotics when indicated.',
                        steps: [
                            { stage: 'Initial', trigger: 'New diagnosis with intermittent symptoms', therapy: 'SABA or SAMA PRN; offer smoking cessation and pulmonary rehabilitation', notes: 'Ensure accurate inhaler technique and review comorbidities.' },
                            { stage: 'Step 2', trigger: 'Persistent breathlessness', therapy: 'Start single long-acting bronchodilator (LABA or LAMA) and review', notes: 'Choose device patient can use reliably.' },
                            { stage: 'Step 3', trigger: 'Persistent symptoms or exacerbations', therapy: 'Dual bronchodilation (LABA + LAMA)', notes: 'Review within 3 months; check blood eosinophils to guide ICS decisions.' },
                            { stage: 'Step 4', trigger: 'Exacerbations or eosinophilic phenotype', therapy: 'Consider LABA/LAMA/ICS (triple therapy) when eosinophils ≥300 cells/µL or asthma features present', notes: 'Discuss pneumonia risk with ICS and monitor.' },
                            { stage: 'Phenotype-targeted therapy', trigger: 'Chronic bronchitis phenotype or frequent exacerbations', therapy: 'Consider roflumilast for severe chronic bronchitis with FEV1 <50% and frequent exacerbations; consider long-term macrolide (azithromycin) in selected patients after specialist review.', notes: 'Patients with eosinophils ≥300 cells/µL derive more benefit from ICS-containing regimens.' },
                            { stage: 'AECOPD (acute exacerbation)', trigger: 'Worsening dyspnoea, sputum change +/- systemic features', therapy: 'Controlled oxygen target SpO2 88–92% (unless other indication); give prednisolone 30 mg PO for 5 days; consider antibiotics if increased sputum purulence or severity — first-line amoxicillin, doxycycline or (if severe/high-risk) co-amoxiclav.', notes: 'Reserve co-amoxiclav for severe infection or risk factors for gram-negative organisms; reassess need for antibiotics within 48–72 hours.' },
                            { stage: 'LTOT criteria', trigger: 'Assessment after stabilization', therapy: 'Long-term oxygen therapy indicated when PaO2 ≤7.3 kPa on air (≤55 mmHg) or PaO2 7.3–8.0 kPa (55–60 mmHg) with evidence of cor pulmonale, polycythaemia (haemoglobin/haematocrit), or nocturnal desaturation.', notes: 'Ensure appropriate oxygen assessment after a period of clinical stability and smoking cessation counselling.' }
                        ]
                    },
                    {
                        key: 'hfref',
                        title: 'Heart Failure with Reduced EF – Disease-Modifying Core',
                        shortTitle: 'HFrEF Optimisation',
                        reference: 'NICE NG106 (2024 surveillance)',
                        summary: 'Initiate foundational therapy promptly (ACEI/ARB/ARNI, β-blocker, MRA, SGLT2) and titrate to target doses as tolerated; consider devices and specialist referral for advanced therapies.',
                        steps: [
                            { stage: 'Step 1', trigger: 'Confirmed HFrEF (LVEF ≤40%)', therapy: 'Start ACEI (or ARB) and titrate; consider sacubitril/valsartan where indicated and after stopping ACEI with washout.', notes: 'Assess renal function and potassium after each change.' },
                            { stage: 'Step 2', trigger: 'Early follow-up', therapy: 'Add evidence-based β-blocker (bisoprolol, carvedilol, nebivolol) and uptitrate as tolerated', notes: 'Delay only if unstable or fluid overloaded—optimise diuretics first.' },
                            { stage: 'Step 3', trigger: 'Persistent symptoms or at-risk', therapy: 'Add MRA (spironolactone or eplerenone) and SGLT2 inhibitor (dapagliflozin/empagliflozin) regardless of diabetes status', notes: 'Monitor U&Es and renal function; SGLT2 provides mortality and HF hospitalisation benefit.' },
                            { stage: 'Step 4', trigger: 'Refractory symptoms', therapy: 'Consider sacubitril/valsartan swap for ACEI/ARB, ivabradine if sinus rhythm and HR ≥75, and evaluate for device therapy (CRT/ICD) as per criteria.', notes: 'Refer to HF MDT for complex optimisation.' }
                        ]
                    },
                    {
                        key: 'hfmr',
                        title: 'Heart Failure with Mid-Range EF (HFmrEF)',
                        shortTitle: 'HFmrEF (EF 41–49%)',
                        reference: 'NICE / ESC consensus',
                        summary: 'Patients with LVEF 41–49% may benefit from similar therapies to HFrEF; evidence is less robust but consider disease-modifying therapy guided by symptoms and comorbidities.',
                        steps: [
                            { stage: 'Assessment', trigger: 'LVEF 41–49%', therapy: 'Treat comorbidities; consider ACEI/ARB/ARNI and β-blocker where indicated', notes: 'Consider SGLT2 inhibitor in symptomatic patients given emerging evidence.' },
                            { stage: 'Referral', trigger: 'Ongoing symptoms or deterioration', therapy: 'Referral to HF specialist for consideration of advanced therapies or trial eligibility', notes: 'Shared decision-making important due to less definitive evidence base.' }
                        ]
                    },
                    {
                        key: 'hfpef',
                        title: 'Heart Failure with Preserved EF (HFpEF)',
                        shortTitle: 'HFpEF',
                        reference: 'NICE / ESC 2023-24 updates',
                        summary: 'Management focuses on targeted therapy for congestion, BP control, rate control for AF and SGLT2 inhibitors for outcome benefit in selected patients.',
                        steps: [
                            { stage: 'Symptom control', trigger: 'Clinical signs of congestion', therapy: 'Diuretics to control fluid overload', notes: 'Monitor renal function and electrolytes.' },
                            { stage: 'Comorbidity optimisation', trigger: 'AF, hypertension, IHD, CKD', therapy: 'Control AF rate/rhythm, strict BP control, address ischaemia', notes: 'ACEI/ARB/β-blocker only if other indications present.' },
                            { stage: 'Disease-modifying', trigger: 'Suitable patients', therapy: 'Consider SGLT2 inhibitor for symptomatic HFpEF per license and guidance', notes: 'Evidence supports reduction in HF hospitalisations in selected cohorts.' }
                        ]
                    },
                    {
                        key: 'hypertension',
                        title: 'Hypertension Stepwise Therapy',
                        shortTitle: 'Hypertension',
                        reference: 'NICE NG136 (2023 update)',
                        summary: 'Tailor therapy by age, ethnicity and pregnancy status; escalate using complementary drug classes and investigate secondary causes for resistant hypertension.',
                        steps: [
                            { stage: 'Step 1', trigger: 'Clinic BP ≥140/90 mmHg', therapy: 'ACEI/ARB if <55y; CCB if ≥55y or Black African/Caribbean origin', notes: 'Avoid ACEI/ARB in pregnancy; discuss lifestyle interventions.' },
                            { stage: 'Step 2', trigger: 'BP uncontrolled on Step 1', therapy: 'Combine ACEI/ARB + CCB', notes: 'Swap to thiazide-like diuretic if CCB not tolerated.' },
                            { stage: 'Step 3', trigger: 'BP ≥140/90 after Step 2', therapy: 'Triple therapy ACEI/ARB + CCB + thiazide-like diuretic', notes: 'Check adherence and secondary causes.' },
                            { stage: 'Step 4 / Resistant', trigger: 'BP uncontrolled on triple therapy', therapy: 'Add low-dose spironolactone (if K+ ≤4.5 mmol/L) or consider α-/β-blocker where spironolactone contraindicated', notes: 'Seek specialist advice for resistant cases; avoid combining ACEI + ARB.' },
                            { stage: 'Pregnancy hypertension', trigger: 'Pregnancy with hypertension', therapy: 'First-line: labetalol or nifedipine modified-release; methyldopa as alternative', notes: 'Avoid ACEI/ARB; liaise with obstetric services for shared care.' },
                            { stage: 'Accelerated/malignant hypertension', trigger: 'Severe BP with end-organ signs', therapy: 'Immediate same-day assessment/admission; urgent BP lowering as guided by specialist', notes: 'Red flags: papilloedema, malignant headache, visual changes, chest pain—admit immediately.' }
                        ]
                    },
                    {
                        key: 't2dm',
                        title: 'Type 2 Diabetes – First-line to Intensification and Complex Cases',
                        shortTitle: 'Type 2 Diabetes',
                        reference: 'NICE NG28 (2024 amendment)',
                        summary: 'Prioritise cardiovascular and renal protection with SGLT2 inhibitors for high-risk groups; modify therapy across renal function, CVD and hypoglycaemia risk profiles.',
                        steps: [
                            { stage: 'Foundation', trigger: 'New diagnosis', therapy: 'Lifestyle measures + structured education', notes: 'Review HbA1c at 3–6 months.' },
                            { stage: 'Step 1', trigger: 'HbA1c above target', therapy: 'Metformin (if eGFR ≥30); consider SGLT2 first-line if CVD, HF or CKD present', notes: 'Stop metformin if eGFR <30 mL/min/1.73m²; SGLT2s (eg dapagliflozin) may be continued/initiated down to eGFR thresholds stated in product guidance (some agents to eGFR 20).' },
                            { stage: 'CVD/CKD pathway', trigger: 'Established ASCVD, HF or CKD stage 3+', therapy: 'Prioritise SGLT2 inhibitor; add GLP-1 RA (semaglutide, dulaglutide) if additional weight loss/CV benefit needed or SGLT2 unsuitable', notes: 'Individualise therapy considering renal dosing and adverse effects.' },
                            { stage: 'Hypoglycaemia risk', trigger: 'Older adults or drivers', therapy: 'Avoid or use low-dose sulfonylureas cautiously; consider agents with low hypoglycaemia risk (SGLT2, DPP-4, GLP-1)', notes: 'Provide DVLA/driver guidance for hypoglycaemia risk and self-monitoring.' },
                            { stage: 'Insulin initiation', trigger: 'Persistent high HbA1c despite oral/injectable therapy', therapy: 'Start basal insulin and titrate; continue metformin if tolerated and not contraindicated', notes: 'Provide hypoglycaemia education and driving advice.' }
                        ]
                    },
                    {
                        key: 'mental-health',
                        title: 'Depression & Anxiety – Stepped Care + Complex Pathways',
                        shortTitle: 'Depression & Anxiety',
                        reference: 'NICE NG222 / CG113',
                        summary: 'Match intervention intensity to symptom severity; escalate to combined pharmacological and psychological input for complex or treatment-resistant cases.',
                        steps: [
                            { stage: 'Step 1', trigger: 'Mild symptoms', therapy: 'Detection, psychoeducation, active monitoring', notes: 'Address social needs and refer to low-intensity psychological interventions.' },
                            { stage: 'Step 2', trigger: 'Moderate symptoms', therapy: 'High-intensity psychological therapy (CBT, IPT) ± SSRI (sertraline first-line)', notes: 'Consider pregnancy/perinatal choices: sertraline preferred; avoid paroxetine where possible and discuss risks in pregnancy/breastfeeding.' },
                            { stage: 'Treatment-resistant depression', trigger: 'Insufficient response to adequate therapy', therapy: 'Consider augmentation with mirtazapine or atypical antipsychotic (quetiapine, aripiprazole) and refer to secondary care', notes: 'Evaluate for bipolar disorder, adherence, and psychosocial factors.' },
                            { stage: 'Crisis management', trigger: 'Suicidal ideation, severe risk, or psychiatric emergency', therapy: 'Immediate safety planning, urgent referral to crisis/home treatment team or emergency services', notes: 'Arrange 2-week urgent psychiatric review for high-risk but non-emergent presentations and ensure safety planning.' }
                        ]
                    },
                    {
                        key: 'epilepsy',
                        title: 'Epilepsy – Antiseizure Pathway & Emergencies',
                        shortTitle: 'Epilepsy ASM Pathway',
                        reference: 'NICE NG217 (2022)',
                        summary: 'Optimise monotherapy before combining agents; manage emergencies with time-critical benzodiazepine administration and escalate to second-line IV agents and ICU when required.',
                        steps: [
                            { stage: 'Step 1', trigger: 'New diagnosis', therapy: 'Begin appropriate monotherapy (lamotrigine, levetiracetam, carbamazepine) per seizure type', notes: 'Counsel on adherence and driving restrictions.' },
                            { stage: 'Status epilepticus (emergency)', trigger: 'Ongoing seizure >5 minutes or repeated seizures without recovery', therapy: 'First-line: buccal midazolam 10 mg (adult) or rectal diazepam per local dosing; IV lorazepam if IV access. Second-line: load levetiracetam or valproate IV; proceed to anaesthetic/ICU if refractory.', notes: 'Call critical care early for refractory status epilepticus; secure airway and consider continuous EEG.' },
                            { stage: 'Refractory epilepsy', trigger: 'Two or more ASM failures', therapy: 'Refer for tertiary review, consider epilepsy surgery/VNS/keto diet', notes: 'Discuss specialist options and pregnancy considerations.' }
                        ]
                    },
                    {
                        key: 'osteoporosis',
                        title: 'Osteoporosis Management Ladder',
                        shortTitle: 'Osteoporosis',
                        reference: 'NICE NG226 (2023)',
                        summary: 'Stratify fracture risk, optimise calcium/vitamin D, and escalate antiresorptive/anabolic therapy with specialist input for very high-risk cohorts.',
                        steps: [
                            { stage: 'Assessment', trigger: 'Adults ≥50y with risk factors', therapy: 'FRAX/QFracture assessment + DEXA where indicated', notes: 'Address falls risk and secondary causes.' },
                            { stage: 'Foundation', trigger: 'Confirmed vitamin D deficiency or inadequate intake', therapy: 'Vitamin D (800 IU) + calcium supplementation', notes: 'Advise weight-bearing exercise.' },
                            { stage: 'Step 1', trigger: 'High fracture risk', therapy: 'First-line oral bisphosphonate (alendronate/risedronate) for 5 years', notes: 'Check renal function and dental status.' },
                            { stage: 'Step 2', trigger: 'Oral therapy intolerance or very high risk', therapy: 'IV zoledronate yearly or denosumab 60mg SC q6m', notes: 'Plan transition to avoid rebound vertebral fractures.' },
                            { stage: 'Step 3', trigger: 'Severe osteoporosis (multiple fractures/very high risk)', therapy: 'Specialist anabolic options (romosozumab for 12 months, teriparatide for 24 months)', notes: 'Follow with antiresorptive to maintain gains.' }
                        ]
                    },
                    {
                        key: 'chronic-pain',
                        title: 'Chronic Primary Pain (Non-cancer) Measures',
                        shortTitle: 'Chronic Primary Pain',
                        reference: 'NICE NG193 (2021)',
                        summary: 'Emphasise non-pharmacological management, reserving medicines and interventional options for carefully selected neuropathic presentations. Provide condition-specific neuropathic sub-pathways for common syndromes.',
                        steps: [
                            { stage: 'Step 1', trigger: 'Initial presentation', therapy: 'Education, supported self-management, graded exercise/physiotherapy', notes: 'Discuss realistic goals and flare management.' },
                            { stage: 'Step 2', trigger: 'Ongoing functional impairment', therapy: 'Psychological interventions (CBT, ACT, mindfulness)', notes: 'Encourage group programmes where available.' },
                            { stage: 'Neuropathic sub-ladders', trigger: 'Neuropathic pain phenotype', therapy: 'Tailor first-line neuropathic agents to syndrome', notes: 'See sub-rows: Diabetic neuropathy, Post-herpetic neuralgia, Trigeminal neuralgia, CRPS.' },
                            { stage: 'Diabetic neuropathy', trigger: 'Distal symmetric painful neuropathy', therapy: 'First-line: duloxetine or amitriptyline; alternatives: pregabalin/gabapentin; consider topical capsaicin 8% for localized pain', notes: 'Optimize glycaemic control and treat comorbid depression/anxiety.' },
                            { stage: 'Post-herpetic neuralgia', trigger: 'Persistent neuropathic pain post-shingles', therapy: 'First-line: gabapentin/pregabalin or TCAs; consider topical lidocaine or capsaicin patches', notes: 'Refer for specialist pain therapies if refractory.' },
                            { stage: 'Trigeminal neuralgia', trigger: 'Paroxysmal facial pain', therapy: 'First-line: carbamazepine or oxcarbazepine; neurosurgical review for refractory cases', notes: 'Avoid tricyclics where cardiovascular risk present; consider specialist neurologist referral early.' },
                            { stage: 'CRPS (complex regional pain syndrome)', trigger: 'Severe regional pain with autonomic changes', therapy: 'Multidisciplinary approach: physiotherapy, analgesia, neuropathic agents and pain specialist review; consider sympathetic block where indicated', notes: 'Early specialist involvement improves outcomes.' },
                            { stage: 'Step 4', trigger: 'Persistent disabling pain despite above', therapy: 'Specialist interventional procedures (nerve blocks, spinal cord stimulation) or multidisciplinary pain service review', notes: 'Review opioid use—avoid long-term high-dose therapy.' }
                        ]
                    },
                    {
                        key: 'ckd',
                        title: 'Chronic Kidney Disease Intervention Algorithm',
                        shortTitle: 'CKD Intervention',
                        reference: 'NICE NG203 (2021)',
                        summary: 'Slow progression through renoprotective drugs, cardiovascular risk reduction, and timely referral for advanced therapies. Include acute management for hyperkalaemia, anaemia algorithms and renal bone disease guidance.',
                        steps: [
                            { stage: 'Step 1', trigger: 'Albuminuria (ACR ≥3 mg/mmol) or hypertension', therapy: 'ACEI/ARB titrated to maximum tolerated dose', notes: 'Monitor creatinine and potassium within 2 weeks.' },
                            { stage: 'SGLT2 in CKD', trigger: 'Type 2 diabetes or eGFR 20–45 with albuminuria', therapy: 'Add SGLT2 inhibitor (dapagliflozin, empagliflozin) where indicated', notes: 'Continue unless eGFR drops below agent-specific thresholds; coordinate with nephrology if eGFR <20.' },
                            { stage: 'Anaemia of CKD', trigger: 'Hb below target for CKD stage', therapy: 'Assess iron (ferritin, TSAT) and correct iron deficiency; consider ESA referral when appropriate', notes: 'Typical targets: ferritin >100 µg/L and TSAT >20% before ESA; refer to nephrology for ESA initiation per local protocol.' },
                            { stage: 'Hyperkalaemia — immediate', trigger: 'K+ ≥6.0 mmol/L or ECG changes', therapy: 'Stabilise with IV calcium, shift K+ intracellularly with insulin + dextrose and nebulised salbutamol; consider sodium zirconium cyclosilicate for ongoing reduction and urgent nephrology advice for dialysis threshold', notes: 'Review ACEI/ARB use and potassium-sparing agents; balance long-term cardio-renal benefits vs hyperkalaemia risk.' },
                            { stage: 'Renal bone disease', trigger: 'CKD-MBD biochemical abnormalities', therapy: 'Manage phosphate with binders, consider active vitamin D (calcitriol) if indicated and monitor PTH', notes: 'Refer to nephrology/endocrine for severe derangements.' },
                            { stage: 'Step 4', trigger: 'Declining eGFR (<30) or complications', therapy: 'Refer to nephrology, plan for renal replacement therapy or conservative care', notes: 'Assess for anaemia, metabolic bone disease and prepare for RRT if required.' }
                        ]
                    },
                    {
                        key: 'alcohol',
                        title: 'Alcohol Dependence – Stepped Interventions',
                        shortTitle: 'Alcohol Dependence',
                        reference: 'NICE CG115',
                        summary: 'Start with identification and brief advice, progressing to pharmacological support or inpatient detox according to dependence severity.',
                        steps: [
                            { stage: 'Step 1', trigger: 'Opportunistic contact', therapy: 'Identification and brief advice (AUDIT-C screening, motivational interviewing)', notes: 'Document units and readiness to change.' },
                            { stage: 'Step 2', trigger: 'Hazardous/harmful use', therapy: 'Extended brief interventions, psychosocial therapy, facilitated self-help', notes: 'Involve family/support networks.' },
                            { stage: 'Step 3', trigger: 'Moderate to severe dependence', therapy: 'Structured community psychological programmes + pharmacotherapy (acamprosate, disulfiram, naltrexone)', notes: 'Ensure thiamine supplementation.' },
                            { stage: 'Step 4', trigger: 'High-risk withdrawal or failed community detox', therapy: 'Inpatient medically assisted withdrawal/detoxification', notes: 'Plan relapse prevention and aftercare on discharge.' }
                        ]
                    },
                    {
                        key: 'smoking',
                        title: 'Smoking Cessation Ladder',
                        shortTitle: 'Smoking Cessation',
                        reference: 'NICE NG209 (2021)',
                        summary: 'Combine very brief advice with behavioural support and pharmacotherapy; escalate to specialist services for complex cases.',
                        steps: [
                            { stage: 'Step 1', trigger: 'Every clinical encounter', therapy: 'Very brief advice (ASK-ADVISE-ACT) + offer referral', notes: 'Document smoking status as vital sign.' },
                            { stage: 'Step 2', trigger: 'Ready to quit', therapy: 'Behavioural support (face-to-face, telephone, digital) with personalised quit plan', notes: 'Set quit date within 2 weeks.' },
                            { stage: 'Step 3', trigger: 'Pharmacotherapy decision', therapy: 'NRT combination therapy, varenicline, or nicotine-containing e-cigarettes', notes: 'Continue for ≥12 weeks with follow-up.' },
                            { stage: 'Step 4', trigger: 'Complex dependence or repeated relapse', therapy: 'Referral to specialist tobacco dependence services', notes: 'Consider dual therapy (varenicline + NRT) with close monitoring.' }
                        ]
                    }
                ],
                clinicalPearls: [
                    'Always review inhaler technique, adherence, and comorbidities before stepping up respiratory ladders.',
                    'Escalation should be paired with a plan to reassess and step down once control is maintained for ≥3 months.',
                    'Use multidisciplinary teams (HF nurses, diabetes specialist teams, pain services) to optimise complex therapy.',
                    'Document shared decision-making, especially when initiating biologics, advanced devices, or high-cost agents.'
                ]
            },
            pain: {
                name: 'WHO Analgesic Ladder',
                description: 'Stepwise approach to pain management',
                icon: '🎚️',
                steps: [
                    {
                        step: 1,
                        severity: 'Mild Pain (1-3/10)',
                        color: '#28a745',
                        approach: 'Non-opioid ± Adjuvant',
                        medications: [
                            {
                                name: 'Paracetamol',
                                dose: '1g PO/IV 6-hourly (max 4g/day)',
                                note: 'Safe, minimal side effects'
                            },
                            {
                                name: 'Ibuprofen',
                                dose: '400mg PO 8-hourly (max 2.4g/day)',
                                note: 'Anti-inflammatory, GI risk'
                            },
                            {
                                name: 'Naproxen',
                                dose: '250-500mg PO 12-hourly',
                                note: 'Longer-acting NSAID'
                            },
                            {
                                name: 'Diclofenac',
                                dose: '50mg PO 8-hourly',
                                note: 'Potent NSAID, CV risk'
                            }
                        ]
                    },
                    {
                        step: 2,
                        severity: 'Moderate Pain (4-6/10)',
                        color: '#fd7e14',
                        approach: 'Weak Opioids ± Non-opioid ± Adjuvant',
                        medications: [
                            {
                                name: 'Codeine',
                                dose: '30-60mg PO 4-6 hourly (max 240mg/day)',
                                note: 'Prodrug, 10% morphine potency'
                            },
                            {
                                name: 'Tramadol',
                                dose: '50-100mg PO/IV 6-hourly (max 400mg/day)',
                                note: 'Mixed mechanism, lower dependence risk'
                            },
                            {
                                name: 'Dihydrocodeine',
                                dose: '30mg PO 4-6 hourly',
                                note: 'Similar to codeine'
                            }
                        ]
                    },
                    {
                        step: 3,
                        severity: 'Severe Pain (7-10/10)',
                        color: '#dc3545',
                        approach: 'Strong Opioids ± Non-opioid ± Adjuvant',
                        medications: [
                            {
                                name: 'Morphine',
                                dose: '5-10mg PO/2.5-5mg SC/IV 4-hourly (immediate release)',
                                note: 'Gold standard, predictable'
                            },
                            {
                                name: 'Oxycodone',
                                dose: '5-10mg PO 4-6 hourly',
                                note: '1.5x potency of morphine'
                            },
                            {
                                name: 'Fentanyl',
                                dose: '12-25mcg/hr patch (change 72-hourly)',
                                note: '100x morphine potency, for stable pain'
                            },
                            {
                                name: 'Buprenorphine',
                                dose: '5-20mcg/hr patch (change weekly)',
                                note: 'Partial agonist, ceiling effect'
                            }
                        ]
                    }
                ],
                adjuvants: {
                    'Neuropathic Pain': [
                        'Amitriptyline: 10-75mg nocte',
                        'Gabapentin: 300mg-1.2g TDS',
                        'Pregabalin: 75-300mg BD',
                        'Duloxetine: 60mg OD'
                    ],
                    'Bone Pain': [
                        'Bisphosphonates (e.g., zoledronic acid)',
                        'Radiotherapy for metastases',
                        'NSAIDs (if safe)'
                    ],
                    'Muscle Spasm': [
                        'Baclofen: 5-20mg TDS',
                        'Diazepam: 2-5mg BD-TDS'
                    ],
                    'Inflammatory Pain': [
                        'Corticosteroids (e.g., dexamethasone 4-8mg OD)'
                    ]
                },
                conversions: [
                    {
                        medication: 'Morphine',
                        route: 'Oral',
                        equivalent: '1 (baseline)'
                    },
                    {
                        medication: 'Morphine',
                        route: 'SC/IV',
                        equivalent: '2-3x oral dose'
                    },
                    {
                        medication: 'Oxycodone',
                        route: 'Oral',
                        equivalent: '1.5-2x'
                    },
                    {
                        medication: 'Codeine',
                        route: 'Oral',
                        equivalent: '÷10'
                    },
                    {
                        medication: 'Tramadol',
                        route: 'Oral',
                        equivalent: '÷10'
                    },
                    {
                        medication: 'Fentanyl patch',
                        route: 'Transdermal',
                        equivalent: '12mcg/hr ≈ 30mg oral morphine/day'
                    },
                    {
                        medication: 'Buprenorphine patch',
                        route: 'Transdermal',
                        equivalent: '5mcg/hr ≈ 12mg oral morphine/day'
                    }
                ],
                clinicalPearls: [
                    'Breakthrough pain: 1/6th of total daily opioid dose for rescue',
                    'Starting strong opioids: Morphine 5mg PO 4-hourly or 2.5mg SC 4-hourly',
                    'Titration: Increase by 30-50% if inadequate pain control',
                    'Constipation: ALL patients on opioids need laxatives (senna + docusate)',
                    'Nausea: Common in first week, prescribe antiemetic prophylactically',
                    'Renal impairment: Avoid morphine, codeine (toxic metabolites); use oxycodone, fentanyl, buprenorphine',
                    'Hepatic impairment: Reduce doses, avoid codeine',
                    'By the mouth: Oral route preferred when possible',
                    'By the clock: Regular dosing, not PRN alone',
                    'Multimodal: Combine paracetamol + NSAID + opioid for additive effect'
                ]
            }
        };
    }

    /**
     * Initialize ladder tabs functionality
     */
    initializeLadderTabs() {
        try {
            // Delegate clicks from the tabs container. This is robust when the
            // tabs DOM is replaced (e.g. loadLadders writes innerHTML) and avoids
            // stale listeners attached to removed nodes.
            const tabsContainer = document.querySelector('.ladder-tabs');
            if (!tabsContainer) {
                console.warn('⚠️ Ladder tabs container not found');
                return;
            }

            // Remove previous delegated handler if present
            if (this._ladderTabsHandler) {
                try { tabsContainer.removeEventListener('click', this._ladderTabsHandler); } catch (e) {/* ignore */}
                this._ladderTabsHandler = null;
            }

            this._ladderTabsHandler = (e) => {
                const btn = e.target.closest && e.target.closest('.ladder-tab-btn');
                if (!btn) return;
                e.stopPropagation();
                const targetLadder = btn.getAttribute('data-ladder');

                const tabButtons = tabsContainer.querySelectorAll('.ladder-tab-btn');
                const tabContents = document.querySelectorAll('.ladder-tab-content');

                // Remove active class from all buttons and contents
                tabButtons.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Activate clicked button and corresponding content
                btn.classList.add('active');
                const targetContent = document.getElementById(`${targetLadder}-ladder`);
                if (targetContent) {
                    targetContent.classList.add('active');
                    this.activeLadder = targetLadder;
                    console.log(`🪜 Switched to ${targetLadder} ladder`);
                } else {
                    console.warn(`⚠️ Ladder content element not found for: ${targetLadder}`);
                }
            };

            tabsContainer.addEventListener('click', this._ladderTabsHandler);
            this.ladderTabsInitialized = true;
            console.log('✅ Ladder tabs delegated handler attached');
        } catch (err) {
            console.error('❌ Error initializing ladder tabs (delegation):', err);
        }
    }

    /**
     * Initialize NICE guideline ladder sub-tabs
     */
    initializeGuidelineTabs() {
        try {
            const tabsContainer = document.querySelector('.guideline-ladder-tabs');
            if (!tabsContainer) {
                this._guidelineTabsHandler = null;
                console.log('ℹ️ Guideline ladders rendered in stacked layout (no tabs to initialise).');
                return;
            }

            if (this._guidelineTabsHandler) {
                try { tabsContainer.removeEventListener('click', this._guidelineTabsHandler); } catch (e) {/* ignore */}
                this._guidelineTabsHandler = null;
            }

            this._guidelineTabsHandler = (e) => {
                const btn = e.target.closest && e.target.closest('.guideline-tab-btn');
                if (!btn) return;
                e.stopPropagation();
                const targetKey = btn.getAttribute('data-guideline');

                const buttons = tabsContainer.querySelectorAll('.guideline-tab-btn');
                const contents = document.querySelectorAll('.guideline-ladder-content');
                buttons.forEach(b => b.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const targetContent = document.getElementById(`guideline-${targetKey}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                } else {
                    console.warn(`⚠️ Guideline ladder content not found for key: ${targetKey}`);
                }
            };

            tabsContainer.addEventListener('click', this._guidelineTabsHandler);
            console.log('✅ Guideline ladder tabs handler attached');
        } catch (err) {
            console.error('❌ Error initializing guideline ladder tabs:', err);
        }
    }

    /**
     * Initialize accessible accordion behavior for guideline ladder steps
     */
    initializeGuidelineAccordions() {
        try {
            // Inject minimal accordion styles if not already present
            if (!document.getElementById('ladders-accordion-styles')) {
                const s = document.createElement('style');
                s.id = 'ladders-accordion-styles';
                s.textContent = `
                    .accordion-item { border-top: 1px solid var(--border-color,#e6e6e6); }
                    .accordion-header { display:flex; align-items:center; justify-content:space-between; width:100%; padding:10px 12px; background:transparent; border:0; text-align:left; cursor:pointer; font-weight:700; }
                    .accordion-header .chev { transition: transform 0.18s ease; }
                    .accordion-item.open .accordion-header .chev { transform: rotate(90deg); }
                    .accordion-body { padding: 8px 12px 16px 12px; display:none; font-size:0.95em; color:var(--secondary-text,#444); }
                    .accordion-item.open .accordion-body { display:block; }
                    .accordion-meta { font-size:0.9em; color:var(--muted,#666); margin-top:6px; }
                `;
                document.head.appendChild(s);
            }

            // Delegate clicks for accordions to container for robustness
            const container = document.querySelector('.guideline-ladders-list');
            if (!container) return;

            if (this._guidelineAccordionHandler) {
                try { container.removeEventListener('click', this._guidelineAccordionHandler); } catch (e) {}
                this._guidelineAccordionHandler = null;
            }

            this._guidelineAccordionHandler = (e) => {
                const btn = e.target.closest && e.target.closest('.accordion-header');
                if (!btn) return;
                const item = btn.closest('.accordion-item');
                if (!item) return;
                const willOpen = !item.classList.contains('open');
                // Close other opened items in the same card (accordion behavior)
                const siblings = item.parentElement.querySelectorAll('.accordion-item.open');
                siblings.forEach(sib => {
                    if (sib !== item) {
                        sib.classList.remove('open');
                        const sibBtn = sib.querySelector('.accordion-header');
                        if (sibBtn) sibBtn.setAttribute('aria-expanded', 'false');
                    }
                });
                if (willOpen) {
                    item.classList.add('open');
                    btn.setAttribute('aria-expanded', 'true');
                } else {
                    item.classList.remove('open');
                    btn.setAttribute('aria-expanded', 'false');
                }
            };

            container.addEventListener('click', this._guidelineAccordionHandler);
            console.log('✅ Guideline accordions initialized');
        } catch (err) {
            console.warn('⚠️ Failed to initialize guideline accordions', err);
        }
    }

    /**
     * Initialize pill-style tabs inside each guideline card (Overview / Step-by-step / Red flags / Complex cases)
     */
    initializeGuidelinePillTabs() {
        try {
            const container = document.querySelector('.guideline-ladders-list');
            if (!container) return;

            if (this._guidelinePillHandler) {
                try { container.removeEventListener('click', this._guidelinePillHandler); } catch (e) {}
                this._guidelinePillHandler = null;
            }

            this._guidelinePillHandler = (e) => {
                const btn = e.target.closest && e.target.closest('.guideline-pill-btn');
                if (!btn) return;
                const card = btn.closest('.guideline-ladder-card');
                if (!card) return;
                const key = btn.getAttribute('data-pill');
                const buttons = card.querySelectorAll('.guideline-pill-btn');
                const contents = card.querySelectorAll('.pill-content');
                buttons.forEach(b => b.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                const target = card.querySelector(`.pill-content[data-pill="${key}"]`);
                if (target) target.classList.add('active');
            };

            container.addEventListener('click', this._guidelinePillHandler);
            console.log('✅ Guideline pill tabs initialized');
        } catch (err) {
            console.warn('⚠️ Failed to initialize guideline pill tabs', err);
        }
    }

    /**
     * Load and display ladders panel
     */
    loadLadders() {
        try {
            const container = document.getElementById('ladders-panel');
            if (!container) {
                console.error('❌ Ladders panel container not found');
                return;
            }

            const guidelineLadders = (this.laddersData.guidelines && Array.isArray(this.laddersData.guidelines.ladders))
                ? this.laddersData.guidelines.ladders
                : [];

            const ladderTabsHtml = [
                { key: 'steroids', label: '💊 Steroid Ladder', active: true },
                { key: 'pain', label: '🎚️ Pain Ladder' },
                { key: 'guidelines', label: '🧭 NICE Treatment Pathways' }
            ].map(tab => `
                <button class="ladder-tab-btn${tab.active ? ' active' : ''}" data-ladder="${tab.key}">${tab.label}</button>
            `).join('');

            container.innerHTML = `
                <div class="ladders-container">
                    <h2>🪜 Clinical Treatment Ladders</h2>

                    <!-- Tab Navigation -->
                    <div class="ladder-tabs" aria-label="Treatment ladder tabs">
                        ${ladderTabsHtml}
                    </div>

                    <!-- Steroid Ladder Tab Content -->
                    <div id="steroids-ladder" class="ladder-tab-content active">
                        ${this.renderSteroidLadder()}
                    </div>

                    <!-- Pain Ladder Tab Content -->
                    <div id="pain-ladder" class="ladder-tab-content">
                        ${this.renderPainLadder()}
                    </div>

                    <div id="guidelines-ladder" class="ladder-tab-content">
                        ${this.renderGuidelineLadders()}
                    </div>
                </div>
            `;
            
            // Defer tab initialization briefly to avoid race with DOM insertion in some host pages
            // and add diagnostics so we can see why a specific ladder (e.g., pain) might not render.
            console.log('🪜 Ladders data stats:', this.getStatistics());
            setTimeout(() => {
                this.initializeLadderTabs();
                this.initializeGuidelineTabs();
                // Initialize collapsible accordions for guideline steps
                if (typeof this.initializeGuidelineAccordions === 'function') {
                    try { this.initializeGuidelineAccordions(); } catch (e) { console.warn('Could not init guideline accordions', e); }
                }
                // Initialize pill tabs inside guidelines
                if (typeof this.initializeGuidelinePillTabs === 'function') {
                    try { this.initializeGuidelinePillTabs(); } catch (e) { console.warn('Could not init guideline pill tabs', e); }
                }
                // Verify tab elements exist after initialization
                const btns = document.querySelectorAll('.ladder-tab-btn');
                const contents = document.querySelectorAll('.ladder-tab-content');
                console.log(`🪜 Ladder tab buttons: ${btns.length}, tab contents: ${contents.length}`);
                try {
                    const painSteps = (this.laddersData.pain && Array.isArray(this.laddersData.pain.steps)) ? this.laddersData.pain.steps.length : 0;
                    console.log(`🪜 Pain ladder steps count: ${painSteps}`);
                } catch (e) {
                    console.warn('⚠️ Could not read pain ladder steps', e && e.message);
                }
            }, 0);
            // Inject small, local styles for ladders to improve default spacing
            try {
                if (!document.getElementById('ladders-styles')) {
                    const s = document.createElement('style');
                    s.id = 'ladders-styles';
                    s.textContent = `
                        .ladders-container { padding: 12px 8px; }
                        .ladder-section { margin-bottom: 18px; }

                        /* Pain ladder layout improvements */
                        .pain-ladder-visual { display: flex; flex-direction: column; gap: 16px; margin: 24px 0; }

                        /* Each step is a two-column layout: badge + content */
                        .ladder-step { display: grid; grid-template-columns: 64px 1fr; gap: 12px; align-items: start; margin-bottom: 12px; }
                        .ladder-step .step-number { width:56px; height:56px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:700; color:#fff; box-shadow: 0 2px 6px rgba(0,0,0,0.08); }

                        .ladder-step .step-content { min-width: 0; }
                        .ladder-step .step-content h4 { margin: 0 0 8px 0; }

                        /* Make medication list responsive and tidy */
                        .medication-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 8px; margin-top: 8px; }
                        .med-item { background: var(--card-bg); padding: 12px; border-radius:8px; display:flex; flex-direction:column; gap:6px; border: 1px solid var(--border-color, #eaeaea); min-width:0; }
                        .med-item strong { font-size: 0.98em; display:block; margin-bottom:4px; }
                        .med-dose { display:block; color: var(--secondary-text, #666); font-size: 0.95em; line-height:1.2; overflow-wrap: anywhere; word-break: break-word; }

                        .adjuvant-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:12px; }
                        .adjuvant-card { background:var(--card-bg); padding:12px; border-radius:8px; }

                        .opioid-conversion-table table { width:100%; border-collapse:collapse }
                        .opioid-conversion-table td, .opioid-conversion-table th { padding:8px; border-bottom:1px solid var(--border) }

                        .ladder-tabs { display:flex; gap:8px; margin-bottom:16px; border-bottom: 2px solid var(--border-color, #e0e0e0); padding: 0 6px 6px; overflow-x:auto; scrollbar-width: thin; -webkit-overflow-scrolling: touch; }
                        .ladder-tab-btn { flex:0 0 auto; white-space: nowrap; }
                        .ladder-tabs::-webkit-scrollbar { height:6px; }
                        .ladder-tabs::-webkit-scrollbar-thumb { background: var(--border-color,#d4d4d8); border-radius:999px; }

                        .guideline-ladder-tabs { display:flex; gap:8px; margin: 12px 0 16px; padding: 0 6px 6px; overflow-x:auto; border-bottom:1px solid var(--border-color,#e4e4e7); scrollbar-width: thin; -webkit-overflow-scrolling: touch; }
                        .guideline-tab-btn { background:var(--card-bg); border:1px solid var(--border-color,#e4e4e7); border-bottom:3px solid transparent; border-radius:10px; padding:10px 14px; font-weight:600; color:var(--text-primary,#1f2937); cursor:pointer; transition:all 0.2s ease; flex:0 0 auto; white-space: nowrap; }
                        .guideline-tab-btn.active { border-color: var(--primary-color); border-bottom-color: var(--primary-color); color: var(--primary-color); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                        .guideline-ladder-tabs::-webkit-scrollbar { height:6px; }
                        .guideline-ladder-tabs::-webkit-scrollbar-thumb { background: var(--border-color,#d4d4d8); border-radius:999px; }

                        .guideline-ladders-grid { margin-top:16px; }
                        .guideline-ladders-list { width: 100%; }
                            /* Pill tabs inside guideline cards */
                            .guideline-pill-tabs { display:flex; gap:8px; overflow-x:auto; padding:6px 0 12px; }
                            .guideline-pill-btn { background:var(--card-bg); border:1px solid var(--border-color,#e4e4e7); border-radius:999px; padding:8px 12px; font-weight:600; cursor:pointer; white-space:nowrap; flex:0 0 auto; }
                            .guideline-pill-btn.active { background:var(--primary-color); color:#fff; border-color:var(--primary-color); box-shadow:0 6px 18px rgba(0,0,0,0.06); }
                            .pill-content { display:none; }
                            .pill-content.active { display:block; }

                            /* Safety callout */
                            .nice-warning { background: #ffe9e3; border-left: 4px solid #d73720; padding: 8px; border-radius: 6px; margin:8px 0; }
                        .guideline-ladder-card { background: var(--card-bg); border:1px solid var(--border-color,#e4e4e7); border-radius:12px; padding:16px; display:flex; flex-direction:column; gap:12px; width: 100%; }
                        .guideline-table-wrapper { width: 100%; }
                        .guideline-ladder-card h4 { margin:0; display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
                        .guideline-meta { font-size:0.9em; color:var(--secondary-text,#555); }
                        .guideline-steps-table { width:100%; border-collapse:collapse; font-size:0.92em; }
                        .guideline-steps-table th, .guideline-steps-table td { padding:6px; border-bottom:1px solid var(--border-color,#e4e4e7); vertical-align:top; }
                        .guideline-steps-table th { background:var(--table-header-bg,rgba(0,0,0,0.03)); font-weight:600; }
                        .guideline-badge { display:inline-flex; align-items:center; background:var(--pill-bg,#eef2ff); color:var(--pill-text,#4338ca); border-radius:999px; padding:2px 10px; font-size:0.85em; }
                        .guideline-ladder-content { display:none; }
                        .guideline-ladder-content.active { display:block; }

                        @media (max-width: 640px) {
                            .ladder-step { grid-template-columns: 48px 1fr; }
                            .ladder-step .step-number { width:48px; height:48px; }
                            .medication-list { grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
                        }
                    `;
                    document.head.appendChild(s);
                }
            } catch (e) {
                console.debug('Could not inject ladders styles', e && e.message);
            }
            console.log('✅ Ladders loaded successfully!');
            
        } catch (error) {
            console.error('❌ Error loading ladders:', error);
            this.showError('Unable to load treatment ladders. Please refresh the page.');
        }
    }

    /**
     * Render steroid ladder content
     * @returns {string} HTML content for steroid ladder
     */
    renderSteroidLadder() {
        const steroidData = this.laddersData.steroids;
        
        const medicationsTable = steroidData.medications.map(med => `
            <tr class="potency-${med.category}">
                <td><strong>${med.name}</strong></td>
                <td>${med.potency}</td>
                <td>${med.equivalentDose}</td>
                <td>${med.duration}</td>
                <td>${med.clinicalUses}</td>
            </tr>
        `).join('');

        const categoriesCards = Object.entries(steroidData.categories).map(([key, category]) => `
            <div class="category-card">
                <h4 style="color: ${category.color};">🔴 ${category.name}</h4>
                <p><strong>${category.medications}</strong></p>
                <ul>
                    ${category.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        return `
            <div class="ladder-section">
                <h3>💊 Corticosteroid Ladder</h3>
                <p class="ladder-intro">${steroidData.description}</p>
                
                <div class="steroid-comparison">
                    <table class="ladder-table">
                        <thead>
                            <tr>
                                <th>Steroid</th>
                                <th>Relative Potency</th>
                                <th>Equivalent Dose</th>
                                <th>Duration</th>
                                <th>Clinical Uses</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${medicationsTable}
                        </tbody>
                    </table>
                </div>
                
                <div class="steroid-categories">
                    ${categoriesCards}
                </div>
                
                <div class="clinical-pearl">
                    <h4>💡 Clinical Pearls</h4>
                    <ul>
                        ${steroidData.clinicalPearls.map(pearl => `<li>${pearl}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    /**
     * Render pain ladder content
     * @returns {string} HTML content for pain ladder
     */
    renderPainLadder() {
        const painData = this.laddersData.pain || {};
        const stepsArr = Array.isArray(painData.steps) ? painData.steps : [];
        const adjuvantsObj = painData.adjuvants && typeof painData.adjuvants === 'object' ? painData.adjuvants : {};
        const conversionsArr = Array.isArray(painData.conversions) ? painData.conversions : [];
        const pearlsArr = Array.isArray(painData.clinicalPearls) ? painData.clinicalPearls : [];

        const stepsHtml = stepsArr.map(step => `
            <div class="ladder-step step-${step.step}">
                <div class="step-number" style="background: ${step.color};">Step ${step.step}</div>
                <div class="step-content">
                    <h4 style="color: ${step.color};">${step.severity}</h4>
                    <p><strong>${step.approach}</strong></p>
                    <div class="medication-list">
                        ${Array.isArray(step.medications) ? step.medications.map(med => `
                            <div class="med-item" role="group" aria-label="${med.name}">
                                <strong>${med.name}</strong>
                                <div class="med-dose">${med.dose}</div>
                                ${med.note ? `<div class="med-note" style="color:var(--muted);font-size:0.9em;margin-top:6px">${med.note}</div>` : ''}
                            </div>
                        `).join('') : ''}
                    </div>
                </div>
            </div>
        `).join('');

        const adjuvantsHtml = Object.entries(adjuvantsObj).map(([type, medications]) => `
            <div class="adjuvant-card">
                <h5>${type}</h5>
                <ul>
                    ${Array.isArray(medications) ? medications.map(med => `<li>${med}</li>`).join('') : ''}
                </ul>
            </div>
        `).join('');

        const conversionsTable = conversionsArr.map(conv => `
            <tr>
                <td>${conv.medication}</td>
                <td>${conv.route}</td>
                <td>${conv.equivalent}</td>
            </tr>
        `).join('');

        return `
            <div class="ladder-section">
                <h3>🎚️ WHO Analgesic Ladder</h3>
                <p class="ladder-intro">${painData.description}</p>
                
                <div class="pain-ladder-visual">
                    ${stepsHtml}
                </div>
                
                <div class="adjuvant-section">
                    <h4>➕ Adjuvant Analgesics (All Steps)</h4>
                    <div class="adjuvant-grid">
                        ${adjuvantsHtml}
                    </div>
                </div>
                
                <div class="opioid-conversion-table">
                    <h4>🔄 Opioid Conversion Guide</h4>
                    <table class="ladder-table">
                        <thead>
                            <tr>
                                <th>Medication</th>
                                <th>Route</th>
                                <th>Oral Morphine Equivalent</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${conversionsTable}
                        </tbody>
                    </table>
                </div>
                
                <div class="clinical-pearl">
                    <h4>💡 Clinical Pearls</h4>
                    <ul>
                        ${pearlsArr.map(pearl => `<li>${pearl}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    /**
     * Render a single NICE guideline ladder
     * @param {Object} ladder - Ladder configuration object
     * @returns {string} HTML content for the ladder
     */
    renderGuidelineLadder(ladder) {
        if (!ladder) return '';

        const pearls = Array.isArray(this.laddersData.guidelines?.clinicalPearls)
            ? this.laddersData.guidelines.clinicalPearls
            : [];
        // Render as accessible accordion-style card for better mobile readability
        const iconMap = {
            asthma: '🌬️',
            copd: '🫁',
            hfref: '❤️',
            hfmr: '❤️',
            hfpef: '❤️',
            epilepsy: '🧠',
            t2dm: '🍬',
            hypertension: '🩺',
            alcohol: '🍷',
            'chronic-pain': '🩺'
        };

        const ladderIcon = iconMap[ladder.key] || (this.laddersData.guidelines && this.laddersData.guidelines.icon) || '🧭';

        const makeStepHtml = (step, idx) => {
            const title = step.stage || ('Stage ' + (idx + 1));
            const trigger = step.trigger || '';
            const therapy = step.therapy || '';
            const notes = step.notes || '';

            // Determine if note is safety-critical and should be a callout
            const safetyKeywords = ['refer', 'referral', 'icu', 'oxygen', 'stop', 'contraindic', 'life-threatening', 'hospital', 'admit'];
            const isSafety = safetyKeywords.some(k => (notes + ' ' + therapy + ' ' + trigger).toLowerCase().includes(k));

            return `
                <div class="accordion-item" data-step-index="${idx}">
                    <button class="accordion-header" type="button" aria-expanded="false">
                        <span style="display:flex;flex-direction:column;align-items:flex-start;">
                            <strong>${ladderIcon} ${title}</strong>
                            <small class="accordion-meta">${trigger}</small>
                        </span>
                        <span class="chev">›</span>
                    </button>
                    <div class="accordion-body" role="region">
                        <div class="accordion-therapy"><strong>Therapy:</strong><div style="margin-top:6px">${therapy}</div></div>
                        ${notes ? (isSafety ? `<div class="nice-warning"><strong>Safety:</strong><div style="margin-top:6px">${notes}</div></div>` : `<div class="accordion-notes" style="margin-top:10px"><strong>Notes:</strong><div style="margin-top:6px">${notes}</div></div>`) : ''}
                    </div>
                </div>
            `;
        };

        const stepsHtml = Array.isArray(ladder.steps) ? ladder.steps.map((s, i) => makeStepHtml(s, i)).join('') : '';

        // Build filtered sections for pill tabs
        const overviewHtml = `${ladder.summary || ''}`;
        const redFlags = (Array.isArray(ladder.steps) ? ladder.steps.filter(s => (s.stage || '').toLowerCase().includes('life') || (s.trigger || '').toLowerCase().includes('life') || (s.notes || '').toLowerCase().includes('icu') || (s.trigger || '').toLowerCase().includes('spO2'.toLowerCase()) ) : []);
        const complexFlags = (Array.isArray(ladder.steps) ? ladder.steps.filter(s => (s.stage || '').toLowerCase().includes('severe') || (s.stage || '').toLowerCase().includes('difficult') || (s.notes || '').toLowerCase().includes('phenotype') || (s.notes || '').toLowerCase().includes('biomarker')) : []);

        const redFlagsHtml = redFlags.length ? redFlags.map((s, i) => `<div class="pill-flag">${s.stage}: ${s.trigger || ''} — ${s.therapy || ''} ${s.notes ? `<div class="nice-warning">${s.notes}</div>` : ''}</div>`).join('') : '<div class="pill-flag">No immediate red flags listed.</div>';
        const complexHtml = complexFlags.length ? complexFlags.map((s, i) => `<div class="pill-complex"><strong>${s.stage}</strong><div>${s.therapy || ''}</div><div style="font-size:0.95em;color:var(--muted)">${s.notes || ''}</div></div>`).join('') : '<div class="pill-complex">No complex cases listed.</div>';

        // Mini-summary box (one-line high-yield)
        const miniSummary = ladder.summary ? `<div class="mini-summary" style="background:var(--pill-bg,#f3f4f6);padding:8px 12px;border-radius:8px;margin:8px 0;font-weight:600">Core objective: ${ladder.summary.split('.').slice(0,1).join('').trim()}</div>` : '';

        return `
            <div class="ladder-section">
                <h3>${ladder.title || ladder.shortTitle || '🧭 NICE Clinical Ladder'}</h3>
                ${ladder.reference ? `<div style="margin-bottom:8px"><span class="guideline-badge">${ladder.reference}</span></div>` : ''}
                ${miniSummary}
                <div class="guideline-ladders-list">
                    <article class="guideline-ladder-card" id="guideline-${ladder.key}">
                        <div class="guideline-ladder-header">
                            <h4 style="margin:0">${ladderIcon} ${ladder.shortTitle || ladder.title}</h4>
                        </div>

                        <div class="guideline-pill-tabs" role="tablist" aria-label="Guideline sections">
                            <button class="guideline-pill-btn active" data-pill="overview">Overview</button>
                            <button class="guideline-pill-btn" data-pill="steps">Step-by-step</button>
                            <button class="guideline-pill-btn" data-pill="redflags">Red flags</button>
                            <button class="guideline-pill-btn" data-pill="complex">Complex cases</button>
                        </div>

                        <div class="pill-content active" data-pill="overview">
                            <div class="guideline-meta">${overviewHtml}</div>
                        </div>

                        <div class="pill-content" data-pill="steps">
                            <div class="guideline-accordion">
                                ${stepsHtml}
                            </div>
                        </div>

                        <div class="pill-content" data-pill="redflags">
                            ${redFlagsHtml}
                        </div>

                        <div class="pill-content" data-pill="complex">
                            ${complexHtml}
                        </div>

                    </article>
                </div>
                ${pearls.length ? `
                    <div class="clinical-pearl">
                        <h4>💡 Implementation Pearls</h4>
                        <ul>
                            ${pearls.map(pearl => `<li>${pearl}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
    }

    /**
     * Render NICE guideline ladders content
     * @returns {string} HTML content for guideline ladders
     */
    renderGuidelineLadders() {
        const guidelineData = this.laddersData.guidelines || {};
        const laddersArr = Array.isArray(guidelineData.ladders) ? guidelineData.ladders : [];

        if (!laddersArr.length) {
            return `
                <div class="ladder-section">
                    <h3>🧭 NICE Clinical Treatment Ladders</h3>
                    <p class="ladder-intro">No guideline ladders available.</p>
                </div>
            `;
        }

        const tabButtonsHtml = laddersArr.map((ladder, idx) => `
            <button
                class="guideline-tab-btn${idx === 0 ? ' active' : ''}"
                data-guideline="${ladder.key}"
                type="button"
            >
                ${ladder.shortTitle || ladder.title || ladder.key}
            </button>
        `).join('');

        const guidelineSectionsHtml = laddersArr.map((ladder, idx) => `
            <div id="guideline-${ladder.key}" class="guideline-ladder-content${idx === 0 ? ' active' : ''}">
                ${this.renderGuidelineLadder(ladder)}
            </div>
        `).join('');

        return `
            <div class="ladder-section">
                <h3>🧭 NICE Clinical Treatment Ladders</h3>
                <p class="ladder-intro">${guidelineData.description || 'Concise, guideline-aligned stepwise escalation pathways for common long-term conditions.'}</p>
                <div class="guideline-ladder-tabs" role="tablist" aria-label="Guideline ladders">
                    ${tabButtonsHtml}
                </div>
                <div class="guideline-ladders-grid">
                    ${guidelineSectionsHtml}
                </div>
            </div>
        `;
    }

    /**
     * Switch to a specific ladder tab
     * @param {string} ladderType - Type of ladder (e.g. 'steroids', 'pain', 'guidelines')
     */
    switchToLadder(ladderType) {
        const tabButtons = document.querySelectorAll('.ladder-tab-btn');
        const tabContents = document.querySelectorAll('.ladder-tab-content');

        // Remove active class from all
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Activate the selected ladder
        const targetButton = document.querySelector(`[data-ladder="${ladderType}"]`);
        const targetContent = document.getElementById(`${ladderType}-ladder`);

        if (targetButton && targetContent) {
            targetButton.classList.add('active');
            targetContent.classList.add('active');
            this.activeLadder = ladderType;
            console.log(`🪜 Switched to ${ladderType} ladders`);
        }
    }

    /**
     * Get steroid conversion calculation
     * @param {string} fromSteroid - Source steroid name
     * @param {number} dose - Dose amount
     * @param {string} toSteroid - Target steroid name
     * @returns {Object} Conversion result
     */
    convertSteroid(fromSteroid, dose, toSteroid) {
        const steroids = this.laddersData.steroids.medications;
        const fromMed = steroids.find(s => s.name.toLowerCase() === fromSteroid.toLowerCase());
        const toMed = steroids.find(s => s.name.toLowerCase() === toSteroid.toLowerCase());

        if (!fromMed || !toMed) {
            return { error: 'Steroid not found' };
        }

        // Extract numeric potency values
        const fromPotency = parseFloat(fromMed.potency.replace('x', '').replace('(baseline)', '1'));
        const toPotency = parseFloat(toMed.potency.replace('x', '').replace('(baseline)', '1'));

        const convertedDose = (dose * fromPotency) / toPotency;

        return {
            fromSteroid: fromMed.name,
            fromDose: dose,
            toSteroid: toMed.name,
            convertedDose: Math.round(convertedDose * 100) / 100,
            equivalentDose: toMed.equivalentDose,
            duration: toMed.duration
        };
    }

    /**
     * Calculate opioid conversion
     * @param {string} fromOpioid - Source opioid
     * @param {number} dose - Daily dose
     * @param {string} toOpioid - Target opioid
     * @returns {Object} Conversion result
     */
    convertOpioid(fromOpioid, dose, toOpioid) {
        const conversions = this.laddersData.pain.conversions;
        const fromConv = conversions.find(c => c.medication.toLowerCase().includes(fromOpioid.toLowerCase()));
        const toConv = conversions.find(c => c.medication.toLowerCase().includes(toOpioid.toLowerCase()));

        if (!fromConv || !toConv) {
            return { error: 'Opioid not found in conversion table' };
        }

        // This is a simplified conversion - real clinical conversions need more complex calculations
        return {
            fromOpioid: fromConv.medication,
            fromDose: dose,
            toOpioid: toConv.medication,
            note: 'Clinical conversion requires individual assessment and dose adjustment',
            fromEquivalent: fromConv.equivalent,
            toEquivalent: toConv.equivalent
        };
    }

    /**
     * Get current active ladder
     * @returns {string} Active ladder type
     */
    getActiveLadder() {
        return this.activeLadder;
    }

    /**
     * Get ladder data
     * @param {string} ladderType - Type of ladder
     * @returns {Object} Ladder data
     */
    getLadderData(ladderType) {
        return this.laddersData[ladderType];
    }

    /**
     * Get statistics about ladders
     * @returns {Object} Statistics object
     */
    getStatistics() {
        const steroidCount = this.laddersData.steroids.medications.length;
        const painStepsCount = this.laddersData.pain.steps.length;
        const adjuvantCount = Object.keys(this.laddersData.pain.adjuvants).length;
        const conversionCount = this.laddersData.pain.conversions.length;
        const guidelineCount = (this.laddersData.guidelines.ladders || []).length;

        return {
            totalLadders: Object.keys(this.laddersData).length,
            steroids: {
                medications: steroidCount,
                categories: Object.keys(this.laddersData.steroids.categories).length
            },
            pain: {
                steps: painStepsCount,
                adjuvantTypes: adjuvantCount,
                conversions: conversionCount
            },
            guidelines: {
                ladders: guidelineCount
            }
        };
    }

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        const container = document.getElementById('ladders-panel');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ Ladders Loading Error</h3>
                    <p>${message}</p>
                    <button onclick="window.laddersManager.loadLadders()">Retry</button>
                </div>
            `;
        }
    }
}

// Create singleton instance
const laddersManager = new LaddersManager();

// Export singleton instance
export { laddersManager };
export default laddersManager;