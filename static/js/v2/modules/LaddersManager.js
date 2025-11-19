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
        
        console.log('🪜 LaddersManager initialized with steroid and pain ladders');
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
                    'ultra-high': {
                        name: 'High Potency (Long-acting)',
                        color: '#dc3545',
                        medications: 'Dexamethasone, Betamethasone',
                        features: [
                            'Minimal mineralocorticoid activity',
                            'Suitable for cerebral oedema',
                            'Used in fetal lung maturation',
                            'Severe inflammatory conditions'
                        ]
                    },
                    'high': {
                        name: 'Intermediate Potency',
                        color: '#fd7e14',
                        medications: 'Prednisolone, Methylprednisolone',
                        features: [
                            'Most common for systemic use',
                            'Acute asthma exacerbations',
                            'COPD exacerbations',
                            'Autoimmune conditions',
                            'IBD flares'
                        ]
                    },
                    'medium': {
                        name: 'Low Potency (Short-acting)',
                        color: '#ffc107',
                        medications: 'Hydrocortisone',
                        features: [
                            'Physiological replacement therapy',
                            'Addison\'s disease',
                            'Adrenal crisis',
                            'Has mineralocorticoid activity'
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
                        summary: 'Progress from reliever-only therapy to maintenance-and-reliever treatment, then add-on controllers and biologics while reviewing inhaler technique and adherence at each step.',
                        steps: [
                            { stage: 'Initial', trigger: 'Infrequent symptoms, no night waking', therapy: 'SABA as needed ± intermittent low-dose ICS whenever SABA used', notes: 'Educate on trigger avoidance and technique before escalation.' },
                            { stage: 'Step 2', trigger: 'Symptoms ≥3/week or night waking', therapy: 'Daily low-dose ICS (or MART with low-dose ICS/formoterol if ≥12y)', notes: 'Consider leukotriene receptor antagonist (LTRA) in children <5y.' },
                            { stage: 'Step 3', trigger: 'Persistent symptoms despite low-dose ICS', therapy: 'Add LABA via fixed-dose ICS/LABA inhaler; offer MART (ICS-formoterol) for adults/adolescents.', notes: 'Ensure adherence before stepping up.' },
                            { stage: 'Step 4', trigger: 'Uncontrolled on MART or low-dose ICS/LABA', therapy: 'Increase ICS to medium/high dose and/or add LTRA, LAMA (tiotropium) from 6y.', notes: 'Assess for phenotype-directed biologics if exacerbations continue.' },
                            { stage: 'Step 5', trigger: 'Severe asthma with frequent exacerbations', therapy: 'Add-on biologics (omalizumab, mepolizumab, benralizumab, dupilumab) ± maintenance oral corticosteroids.', notes: 'Regularly attempt step-down after ≥3 months of good control.' }
                        ]
                    },
                    {
                        key: 'copd',
                        title: 'COPD Stepwise Pharmacological Escalation',
                        shortTitle: 'COPD Escalation',
                        reference: 'NICE NG115 (2023 update)',
                        summary: 'Escalate based on breathlessness/exacerbation risk, guided by eosinophil count and inhaler optimisation.',
                        steps: [
                            { stage: 'Initial', trigger: 'New diagnosis with intermittent symptoms', therapy: 'Short-acting bronchodilator (SABA or SAMA) PRN', notes: 'Offer pulmonary rehabilitation and smoking cessation concurrently.' },
                            { stage: 'Step 2', trigger: 'Persistent breathlessness', therapy: 'Long-acting bronchodilator (LABA or LAMA) monotherapy', notes: 'Select device patient can use reliably.' },
                            { stage: 'Step 3', trigger: 'Persistent symptoms or exacerbations', therapy: 'Dual bronchodilation with LABA/LAMA', notes: 'Review within 3 months and check eosinophils.' },
                            { stage: 'Step 4', trigger: 'Exacerbations with eosinophils ≥300 or asthma features', therapy: 'Triple therapy LABA/LAMA/ICS', notes: 'Monitor pneumonia risk and continue non-pharmacological support.' },
                            { stage: 'Step 5', trigger: 'Severe exacerbations despite triple therapy', therapy: 'Add roflumilast (chronic bronchitis, FEV1 <50%) or long-term macrolide (azithromycin)', notes: 'Consider specialist referral for lung volume reduction/oxygen.' }
                        ]
                    },
                    {
                        key: 'hfref',
                        title: 'Heart Failure with Reduced EF – Disease-Modifying Core',
                        shortTitle: 'HFrEF Optimisation',
                        reference: 'NICE NG106 (2024 surveillance)',
                        summary: 'Initiate foundational quadruple therapy promptly, titrating every 2–4 weeks to target doses before considering devices or advanced options.',
                        steps: [
                            { stage: 'Step 1', trigger: 'Confirmed HFrEF (LVEF ≤40%)', therapy: 'Start ACEI (or ARB) and titrate upwards as tolerated', notes: 'Assess renal function and potassium after each change.' },
                            { stage: 'Step 2', trigger: 'Within days of ACEI/ARB initiation', therapy: 'Add evidence-based β-blocker (bisoprolol, carvedilol, nebivolol)', notes: 'Delay only if fluid overloaded—optimise diuretics first.' },
                            { stage: 'Step 3', trigger: 'Persistent symptoms', therapy: 'Add mineralocorticoid receptor antagonist (spironolactone or eplerenone)', notes: 'Monitor U&Es 1 week after dose change.' },
                            { stage: 'Step 4', trigger: 'All above tolerated', therapy: 'Add SGLT2 inhibitor (dapagliflozin or empagliflozin) regardless of diabetes', notes: 'Benefits occur without titration; monitor renal function.' },
                            { stage: 'Step 5', trigger: 'Ongoing symptoms despite quadruple therapy', therapy: 'Consider sacubitril/valsartan swap for ACEI/ARB, ivabradine if sinus rhythm HR ≥75, CRT/ICD for QRS ≥130ms.', notes: 'Refer to HF multidisciplinary team for device eligibility.' }
                        ]
                    },
                    {
                        key: 'hypertension',
                        title: 'Hypertension Stepwise Therapy',
                        shortTitle: 'Hypertension',
                        reference: 'NICE NG136 (2023 update)',
                        summary: 'Tailor first-line agent by age/ethnicity, then combine complementary mechanisms before considering resistant hypertension strategies.',
                        steps: [
                            { stage: 'Step 1', trigger: 'Clinic BP ≥140/90 mmHg with confirmed diagnosis', therapy: 'ACEI/ARB if <55y; CCB (dihydropyridine) if ≥55y or Black African/Caribbean origin', notes: 'Offer lifestyle optimisation in parallel.' },
                            { stage: 'Step 2', trigger: 'BP uncontrolled on Step 1', therapy: 'Combine ACEI/ARB + CCB', notes: 'Swap to thiazide-like diuretic if CCB not tolerated (ankle swelling).' },
                            { stage: 'Step 3', trigger: 'BP ≥140/90 after Step 2', therapy: 'Triple therapy ACEI/ARB + CCB + thiazide-like diuretic (indapamide/chlortalidone)', notes: 'Check adherence, secondary causes.' },
                            { stage: 'Step 4', trigger: 'Resistant hypertension (BP ≥140/90 on triple therapy)', therapy: 'Add low-dose spironolactone (if K+ ≤4.5 mmol/L) or α-/β-blocker if hyperkalaemia risk', notes: 'Seek specialist advice if still uncontrolled.' }
                        ]
                    },
                    {
                        key: 't2dm',
                        title: 'Type 2 Diabetes – First-line to Intensification',
                        shortTitle: 'Type 2 Diabetes',
                        reference: 'NICE NG28 (2024 amendment)',
                        summary: 'Prioritise cardiovascular and renal protection with SGLT2 inhibitors for high-risk groups, layering therapies according to HbA1c and comorbidity burden.',
                        steps: [
                            { stage: 'Foundation', trigger: 'New diagnosis', therapy: 'Lifestyle measures (dietary, physical activity) + structured education', notes: 'Review HbA1c at 3–6 months.' },
                            { stage: 'Step 1', trigger: 'HbA1c above individualised target', therapy: 'Metformin (if eGFR ≥30); consider SGLT2 inhibitor first-line if CVD, CKD, or HF present', notes: 'Use modified-release if GI side effects.' },
                            { stage: 'Step 2', trigger: 'HbA1c remains above target', therapy: 'Add SGLT2 inhibitor to metformin (or first-line if indicated); consider dual therapy with DPP-4 if SGLT2 unsuitable', notes: 'Monitor for ketoacidosis risk situations.' },
                            { stage: 'Step 3', trigger: 'Further HbA1c elevation', therapy: 'Add GLP-1 receptor agonist (semaglutide, dulaglutide) especially with obesity/CVD', notes: 'Assess for weight-loss benefits and GI tolerance.' },
                            { stage: 'Step 4', trigger: 'Persistent uncontrolled HbA1c', therapy: 'Initiate basal insulin (NPH or degludec) then progress to basal-bolus/mixed regimens if needed', notes: 'Continue metformin/SGLT2 if tolerated; review driving guidance.' }
                        ]
                    },
                    {
                        key: 'mental-health',
                        title: 'Depression & Anxiety – Stepped Care',
                        shortTitle: 'Depression & Anxiety',
                        reference: 'NICE NG222 / CG113',
                        summary: 'Match intervention intensity to symptom severity, escalating to combined pharmacological and psychological input for complex cases.',
                        steps: [
                            { stage: 'Step 1', trigger: 'Recognition in primary care or community settings', therapy: 'Detection, psychoeducation, active monitoring, signposting', notes: 'Address social needs and comorbidities.' },
                            { stage: 'Step 2', trigger: 'Persistent mild to moderate symptoms', therapy: 'Low-intensity psychological interventions (guided self-help, digital CBT, group CBT)', notes: 'Offer perinatal-specific options where relevant.' },
                            { stage: 'Step 3', trigger: 'Moderate to severe symptoms or insufficient response', therapy: 'SSRIs (sertraline first-line) plus high-intensity therapy (CBT/IPT/BA)', notes: 'Review risk, concordance, and side effects regularly.' },
                            { stage: 'Step 4', trigger: 'Severe, chronic, or treatment-resistant presentations', therapy: 'Multidisciplinary psychiatric care, combined pharmacotherapy (augmentation, antipsychotics), crisis planning', notes: 'Consider ECT or specialist services.' }
                        ]
                    },
                    {
                        key: 'epilepsy',
                        title: 'Epilepsy – Antiseizure Medication Pathway',
                        shortTitle: 'Epilepsy ASM Pathway',
                        reference: 'NICE NG217 (2022)',
                        summary: 'Optimise monotherapy before combining agents; involve tertiary services for refractory epilepsy or surgical evaluation.',
                        steps: [
                            { stage: 'Step 1', trigger: 'New diagnosis of focal or generalised epilepsy', therapy: 'First-line monotherapy (lamotrigine, levetiracetam, carbamazepine per seizure type)', notes: 'Educate regarding adherence and SUDEP risk.' },
                            { stage: 'Step 2', trigger: 'Seizures persist on therapeutic monotherapy', therapy: 'Switch to an alternative monotherapy appropriate for seizure classification', notes: 'Avoid abrupt withdrawal; overlap during transition.' },
                            { stage: 'Step 3', trigger: 'Seizures persist after two monotherapies', therapy: 'Introduce dual therapy tailored to seizure type (e.g., lamotrigine + levetiracetam)', notes: 'Consider drug interactions and teratogenicity.' },
                            { stage: 'Step 4', trigger: 'Drug-resistant epilepsy', therapy: 'Refer for epilepsy surgery evaluation, vagus nerve stimulation, ketogenic diet', notes: 'Access tertiary multidisciplinary team.' }
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
                        summary: 'Emphasise non-pharmacological management, reserving medicines and interventional options for carefully selected neuropathic presentations.',
                        steps: [
                            { stage: 'Step 1', trigger: 'Initial presentation', therapy: 'Education, supported self-management, graded exercise/physiotherapy', notes: 'Discuss realistic goals and flare management.' },
                            { stage: 'Step 2', trigger: 'Ongoing functional impairment', therapy: 'Psychological interventions (CBT, ACT, mindfulness)', notes: 'Encourage group programmes where available.' },
                            { stage: 'Step 3', trigger: 'Neuropathic component identified', therapy: 'Neuropathic agents (duloxetine first-line; amitriptyline/gabapentinoids as alternatives)', notes: 'Avoid initiating strong opioids for chronic primary pain.' },
                            { stage: 'Step 4', trigger: 'Persistent disabling pain despite above', therapy: 'Specialist interventional procedures (nerve blocks, spinal cord stimulation) or multidisciplinary pain service review', notes: 'Review opioid use—avoid long-term high-dose therapy.' }
                        ]
                    },
                    {
                        key: 'ckd',
                        title: 'Chronic Kidney Disease Intervention Algorithm',
                        shortTitle: 'CKD Intervention',
                        reference: 'NICE NG203 (2021)',
                        summary: 'Slow progression through renoprotective drugs, cardiovascular risk reduction, and timely referral for advanced therapies.',
                        steps: [
                            { stage: 'Step 1', trigger: 'Albuminuria (ACR ≥3 mg/mmol) or hypertension', therapy: 'ACEI/ARB titrated to maximum tolerated dose', notes: 'Monitor creatinine and potassium within 2 weeks.' },
                            { stage: 'Step 2', trigger: 'Type 2 diabetes or eGFR 20–45 with albuminuria', therapy: 'Add SGLT2 inhibitor (dapagliflozin, empagliflozin)', notes: 'Continue unless eGFR <20 and symptomatic.' },
                            { stage: 'Step 3', trigger: 'BP above target or cardiovascular risk', therapy: 'Optimise BP control (target <140/90; <130/80 if ACR ≥70) + statin (atorvastatin 20mg)', notes: 'Include lifestyle and vaccination review.' },
                            { stage: 'Step 4', trigger: 'Declining eGFR (<30) or complications', therapy: 'Refer to nephrology, plan for renal replacement, assess for anaemia, metabolic bone disease', notes: 'Discuss conservative management options.' }
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
     * Load and display ladders panel
     */
    loadLadders() {
        try {
            const container = document.getElementById('ladders-panel');
            if (!container) {
                console.error('❌ Ladders panel container not found');
                return;
            }

            container.innerHTML = `
                <div class="ladders-container">
                    <h2>🪜 Clinical Treatment Ladders</h2>
                    
                    <!-- Tab Navigation -->
                    <div class="ladder-tabs" aria-label="Treatment ladder tabs">
                        <button class="ladder-tab-btn active" data-ladder="steroids">💊 Steroid Ladder</button>
                        <button class="ladder-tab-btn" data-ladder="pain">🎚️ Pain Ladder</button>
                        <button class="ladder-tab-btn" data-ladder="guidelines">🧭 NICE Ladders</button>
                    </div>
                    
                    <!-- Steroid Ladder Tab Content -->
                    <div id="steroids-ladder" class="ladder-tab-content active">
                        ${this.renderSteroidLadder()}
                    </div>
                    
                    <!-- Pain Ladder Tab Content -->
                    <div id="pain-ladder" class="ladder-tab-content">
                        ${this.renderPainLadder()}
                    </div>

                    <!-- Guideline Ladders Tab Content -->
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
                        .guideline-ladder-card { background: var(--card-bg); border:1px solid var(--border-color,#e4e4e7); border-radius:12px; padding:16px; display:flex; flex-direction:column; gap:12px; }
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
     * Render NICE guideline ladders content
     * @returns {string} HTML content for guideline ladders
     */
    renderGuidelineLadders() {
        const guidelineData = this.laddersData.guidelines || {};
        const laddersArr = Array.isArray(guidelineData.ladders) ? guidelineData.ladders : [];
        const pearls = Array.isArray(guidelineData.clinicalPearls) ? guidelineData.clinicalPearls : [];

        return `
            <div class="ladder-section">
                <h3>🧭 NICE Clinical Treatment Ladders</h3>
                <p class="ladder-intro">${guidelineData.description || 'Concise, guideline-aligned stepwise escalation pathways for common long-term conditions.'}</p>
                <div class="guideline-ladders-list">
                    ${laddersArr.map(ladder => `
                        <article class="guideline-ladder-card" id="guideline-${ladder.key}">
                            <div class="guideline-ladder-header">
                                <h4>${ladder.shortTitle || ladder.title}</h4>
                                <span class="guideline-badge">${ladder.reference}</span>
                            </div>
                            <p class="guideline-meta">${ladder.summary}</p>
                            ${Array.isArray(ladder.steps) ? `
                                <div class="guideline-table-wrapper">
                                    <table class="guideline-steps-table">
                                        <thead>
                                            <tr>
                                                <th>Stage</th>
                                                <th>When to escalate</th>
                                                <th>Therapy</th>
                                                <th>Key notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${ladder.steps.map(step => `
                                                <tr>
                                                    <td><strong>${step.stage}</strong></td>
                                                    <td>${step.trigger}</td>
                                                    <td>${step.therapy}</td>
                                                    <td>${step.notes || ''}</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            ` : ''}
                        </article>
                    `).join('')}
                </div>
                <div class="clinical-pearl">
                    <h4>💡 Implementation Pearls</h4>
                    <ul>
                        ${pearls.map(pearl => `<li>${pearl}</li>`).join('')}
                    </ul>
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
            console.log(`🪜 Switched to ${ladderType} ladder`);
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