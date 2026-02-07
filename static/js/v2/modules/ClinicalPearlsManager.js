/**
 * ClinicalPearlsManager.js - Dedicated renderer for high-yield clinical pearls
 * across specialties. Splitting from MedStatsEthicsManager keeps statistics content
 * lean while providing a focused clinical reference deck.
 */
import { StandardizedSearchComponent } from './StandardizedSearchComponent.js';

class ClinicalPearlsManager {
    constructor() {
        this.sections = this.buildSections();
        
        // Initialize search component with clinical pearls-specific filters
        this.searchComponent = new StandardizedSearchComponent({
            placeholder: "Search clinical pearls (DKA fluids, aortic dissection, procedures)...",
            searchIcon: "💎",
            emptyStateMessage: "No clinical pearls match your search criteria",
            filterOptions: [
                { value: 'all', label: 'All Pearls' },
                { value: 'emergency', label: 'Emergency Medicine' },
                { value: 'cardiology', label: 'Cardiology' },
                { value: 'pulmonology', label: 'Pulmonology' },
                { value: 'nephrology', label: 'Nephrology' },
                { value: 'endocrinology', label: 'Endocrinology' },
                { value: 'neurology', label: 'Neurology' },
                { value: 'gastroenterology', label: 'Gastroenterology' },
                { value: 'hematology', label: 'Hematology' },
                { value: 'obstetrics', label: 'Obstetrics/Gynecology' },
                { value: 'procedures', label: 'Procedures' }
            ],
            onSearch: (searchTerm, filter) => this.handleSearch(searchTerm, filter),
            onFilter: (filter, searchTerm) => this.handleFilter(filter, searchTerm),
            onClear: () => this.handleClear()
        });

        this.currentSearchTerm = '';
        this.currentFilter = 'all';
    }

    async initialize() {
        return Promise.resolve();
    }

    ensureStyles() {
        if (document.getElementById('clinical-pearls-styles')) return;
        const css = `
            .clinical-pearls-hero {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                align-items: center;
                justify-content: space-between;
                padding: 22px 24px;
                margin-bottom: 18px;
                border-radius: 18px;
                background: linear-gradient(135deg, rgba(79,70,229,0.12), rgba(56,189,248,0.08));
                border: 1px solid rgba(15,23,42,0.08);
                box-shadow: 0 18px 40px rgba(15,23,42,0.08);
            }

            .clinical-pearls-hero h2 {
                margin: 0 0 8px;
                font-size: 1.6rem;
                letter-spacing: -0.02em;
            }

            .clinical-pearls-hero p {
                margin: 0;
                max-width: 520px;
                color: #475569;
                line-height: 1.5;
            }

            .clinical-pearls-stats {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
            }

            .clinical-pearls-stat {
                padding: 10px 14px;
                border-radius: 12px;
                background: rgba(255,255,255,0.8);
                border: 1px solid rgba(15,23,42,0.08);
                min-width: 110px;
                text-align: center;
            }

            .clinical-pearls-stat .stat-value {
                font-size: 1.1rem;
                font-weight: 700;
                color: #0f172a;
            }

            .clinical-pearls-stat .stat-label {
                display: block;
                font-size: 0.78rem;
                text-transform: uppercase;
                letter-spacing: 0.06em;
                color: #64748b;
            }

            .clinical-pearls-toolbar {
                display: grid;
                gap: 16px;
                margin-bottom: 18px;
            }

            .clinical-pearls-search label {
                display: block;
                font-weight: 600;
                margin-bottom: 6px;
            }

            .search-input {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 10px 12px;
                border-radius: 12px;
                border: 1px solid rgba(15,23,42,0.12);
                background: #ffffff;
                box-shadow: 0 6px 16px rgba(15,23,42,0.06);
            }

            .search-input input {
                border: none;
                outline: none;
                font-size: 0.98rem;
                width: 100%;
                background: transparent;
                color: #0f172a;
            }

            .search-hint {
                margin-top: 6px;
                font-size: 0.85rem;
                color: #64748b;
            }

            .clinical-pearls-filters {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }

            .filter-pill {
                border: 1px solid rgba(15,23,42,0.12);
                background: #ffffff;
                padding: 8px 12px;
                border-radius: 999px;
                font-weight: 600;
                cursor: pointer;
                transition: all 160ms ease;
            }

            .filter-pill.active {
                background: rgba(79,70,229,0.16);
                border-color: rgba(79,70,229,0.4);
                color: #312e81;
            }

            .clinical-pearls-actions {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }

            .action-btn {
                border: 1px solid rgba(15,23,42,0.12);
                padding: 8px 12px;
                border-radius: 10px;
                background: #f8fafc;
                font-weight: 600;
                cursor: pointer;
                transition: all 160ms ease;
            }

            .action-btn:hover {
                background: #eef2ff;
                border-color: rgba(79,70,229,0.4);
            }

            .pearl-empty {
                padding: 18px;
                border-radius: 12px;
                border: 1px dashed rgba(148,163,184,0.6);
                color: #64748b;
                background: rgba(248,250,252,0.8);
                margin-bottom: 16px;
                display: none;
            }

            .pearl-highlight {
                background: rgba(250,204,21,0.35);
                border-radius: 4px;
                padding: 0 2px;
            }

            /* Grid + card shell */
            .knowledge-card-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 20px;
                width: 100%;
            }

            .knowledge-card {
                position: relative;
                overflow: hidden;
                border-radius: 14px;
                background: linear-gradient(145deg, rgba(79,70,229,0.04), rgba(59,130,246,0.03));
                border: 1px solid rgba(15,23,42,0.08);
                box-shadow: 0 10px 40px rgba(15,23,42,0.08);
                transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
            }

            .knowledge-card::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at 12% 18%, rgba(59,130,246,0.08), transparent 28%),
                            radial-gradient(circle at 88% 12%, rgba(236,72,153,0.08), transparent 26%);
                pointer-events: none;
            }

            .knowledge-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 16px 55px rgba(15,23,42,0.12);
                border-color: rgba(79,70,229,0.18);
            }

            .knowledge-card-header {
                display: flex;
                align-items: flex-start;
                gap: 10px;
                padding: 16px 16px 8px 16px;
                position: relative;
                z-index: 1;
            }

            .knowledge-card h3 {
                margin: 0;
                font-size: 1.05rem;
                letter-spacing: -0.01em;
            }

            .knowledge-card .card-summary {
                margin: 4px 0 0;
                color: #475569;
                font-size: 0.94rem;
                line-height: 1.5;
            }

            .badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 6px 10px;
                border-radius: 999px;
                font-weight: 600;
                font-size: 0.82rem;
                letter-spacing: 0.01em;
                background: rgba(79,70,229,0.1);
                color: #4f46e5;
                border: 1px solid rgba(79,70,229,0.22);
            }

            .section-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                padding: 0 16px 14px 16px;
            }

            .section-tag {
                padding: 6px 10px;
                border-radius: 999px;
                background: rgba(15,23,42,0.05);
                color: #0f172a;
                font-weight: 600;
                font-size: 0.85rem;
                letter-spacing: 0.01em;
            }

            .knowledge-card-body {
                padding: 2px 18px 18px 18px;
                position: relative;
                z-index: 1;
            }

            /* Subsection card - neutral surface with accessible defaults */
            .med-knowledge-subsection {
                border: 1px solid rgba(15,23,42,0.08);
                border-radius: 12px;
                padding: 12px 12px 10px;
                margin-bottom: 10px;
                background: #ffffff;
                color: #0f172a; /* default text colour for good contrast on light surfaces */
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
            }
            .med-knowledge-subsection summary {
                cursor: pointer;
                font-weight: 700;
                color: inherit;
                margin-bottom: 8px;
                list-style: none;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .med-knowledge-subsection summary .chevron {
                transition: transform 160ms ease;
                font-size: 0.9rem;
                color: rgba(15,23,42,0.5);
            }
            .med-knowledge-subsection[open] summary .chevron {
                transform: rotate(90deg);
                color: rgba(79,70,229,0.85);
            }
            .med-knowledge-subsection ul {
                margin: 0;
                padding-left: 20px;
                color: inherit;
                display: grid;
                gap: 6px;
            }
            .med-knowledge-subsection li {
                line-height: 1.5;
            }
            .med-knowledge-subnote { margin-top: 10px; font-style: italic; color: rgba(15,23,42,0.65); }

            .section-meta {
                display: flex;
                gap: 10px;
                align-items: center;
                padding: 0 16px 12px;
                margin: 12px 0 14px;
                color: rgba(15,23,42,0.6);
                font-size: 0.9rem;
            }

            .section-meta .pill {
                padding: 6px 10px;
                border-radius: 9999px;
                background: rgba(79,70,229,0.08);
                border: 1px solid rgba(79,70,229,0.12);
                color: #0f172a;
                font-weight: 600;
            }

            .section-meta strong { color: #0f172a; }

            @media (prefers-color-scheme: dark) {
                .med-knowledge-subsection {
                    border: 1px solid #2e2e2e;
                    background: #1a1a1a;
                    color: rgba(226,232,240,0.98);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.28);
                }
                .med-knowledge-subsection summary { color: inherit; }
                .med-knowledge-subnote { color: rgba(226,232,240,0.9); }
                .section-tag, .section-meta .pill {
                    background: #1f2533;
                    border-color: #2f3a50;
                    color: #e8edff;
                }
                .knowledge-card {
                    border: 1px solid #2e2e2e;
                    background: #1f1f1f;
                    box-shadow: 0 12px 32px rgba(0,0,0,0.28);
                    transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
                }
                .knowledge-card:hover {
                    background: #2a2a2a;
                    border-color: #3a3a3a;
                    box-shadow: 0 16px 36px rgba(0,0,0,0.32);
                    transform: translateY(-3px);
                }
                .knowledge-card h3 { color: #f1f1f1; }
                .knowledge-card .card-summary { color: #cfcfcf; }
                .section-meta { color: rgba(226,232,240,0.72); }
                .section-meta .pill {
                    background: #1f2533;
                    border-color: #2f3a50;
                    color: #e8edff;
                }
                .section-meta .pill:hover {
                    background: #252d3f;
                    border-color: #3a4b6b;
                }
                .clinical-pearls-hero {
                    background: linear-gradient(135deg, rgba(59,130,246,0.18), rgba(15,23,42,0.25));
                    border-color: #2e2e2e;
                    box-shadow: 0 16px 32px rgba(0,0,0,0.28);
                }
                .clinical-pearls-hero p { color: rgba(226,232,240,0.82); }
                .clinical-pearls-stat {
                    background: rgba(15,23,42,0.6);
                    border-color: rgba(148,163,184,0.2);
                }
                .clinical-pearls-stat .stat-value { color: #f8fafc; }
                .clinical-pearls-stat .stat-label { color: rgba(226,232,240,0.6); }
                .search-input {
                    background: #0f172a;
                    border-color: rgba(148,163,184,0.3);
                }
                .search-input input { color: #f8fafc; }
                .search-hint { color: rgba(226,232,240,0.7); }
                .filter-pill {
                    background: #0f172a;
                    border-color: rgba(148,163,184,0.3);
                    color: #e2e8f0;
                }
                .filter-pill.active {
                    background: rgba(59,130,246,0.35);
                    border-color: rgba(59,130,246,0.6);
                    color: #e0e7ff;
                }
                .action-btn {
                    background: #111827;
                    color: #e2e8f0;
                    border-color: rgba(148,163,184,0.3);
                }
                .pearl-empty {
                    background: rgba(15,23,42,0.6);
                    border-color: rgba(148,163,184,0.4);
                    color: rgba(226,232,240,0.8);
                }
            }

            /* Explicit theme toggle support (data-theme="dark") for in-app dark mode */
            [data-theme="dark"] .med-knowledge-subsection {
                border: 1px solid #343434;
                background: #11131c;
                color: rgba(226,232,240,0.98);
                box-shadow: 0 10px 28px rgba(0,0,0,0.38);
            }
            [data-theme="dark"] .med-knowledge-subsection summary { color: inherit; }
            [data-theme="dark"] .med-knowledge-subnote { color: rgba(226,232,240,0.9); }
            [data-theme="dark"] .section-tag,
            [data-theme="dark"] .section-meta .pill {
                background: #1c2130;
                border-color: #31405a;
                color: #e8edff;
            }
            [data-theme="dark"] .knowledge-card {
                border: 1px solid #343434;
                background: #12141d;
                box-shadow: 0 14px 32px rgba(0,0,0,0.34);
                transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
            }
            [data-theme="dark"] .knowledge-card:hover {
                background: #191b26;
                border-color: #3d3d3d;
                box-shadow: 0 18px 38px rgba(0,0,0,0.38);
                transform: translateY(-3px);
            }
            [data-theme="dark"] .knowledge-card h3 { color: #f5f7ff; }
            [data-theme="dark"] .knowledge-card .card-summary { color: #dce3ff; }
            [data-theme="dark"] .section-meta { color: rgba(226,232,240,0.76); }
            [data-theme="dark"] .section-meta .pill:hover {
                background: #242c3d;
                border-color: #3a4b6b;
            }
            [data-theme="dark"] .clinical-pearls-hero {
                background: linear-gradient(135deg, rgba(59,130,246,0.2), rgba(15,23,42,0.35));
                border-color: #2c2c2c;
                box-shadow: 0 18px 38px rgba(0,0,0,0.38);
            }
            [data-theme="dark"] .clinical-pearls-hero p { color: rgba(226,232,240,0.78); }
            [data-theme="dark"] .clinical-pearls-stat {
                background: rgba(15,23,42,0.7);
                border-color: rgba(148,163,184,0.2);
            }
            [data-theme="dark"] .clinical-pearls-stat .stat-value { color: #f8fafc; }
            [data-theme="dark"] .clinical-pearls-stat .stat-label { color: rgba(226,232,240,0.6); }
            [data-theme="dark"] .search-input {
                background: #0b1220;
                border-color: rgba(148,163,184,0.3);
            }
            [data-theme="dark"] .search-input input { color: #f8fafc; }
            [data-theme="dark"] .filter-pill {
                background: #0b1220;
                border-color: rgba(148,163,184,0.3);
                color: #e2e8f0;
            }
            [data-theme="dark"] .filter-pill.active {
                background: rgba(59,130,246,0.38);
                border-color: rgba(59,130,246,0.6);
                color: #e0e7ff;
            }
            [data-theme="dark"] .action-btn {
                background: #0b1220;
                color: #e2e8f0;
                border-color: rgba(148,163,184,0.3);
            }
            [data-theme="dark"] .pearl-empty {
                background: rgba(15,23,42,0.7);
                border-color: rgba(148,163,184,0.4);
                color: rgba(226,232,240,0.8);
            }
        `;
        const style = document.createElement('style');
        style.id = 'clinical-pearls-styles';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    buildSections() {
        return [
            {
                title: 'High-Yield Clinical Pearls',
                badge: 'Clinical',
                summary: 'Concise reminders that fast-track bedside decision making and oral recall.',
                tags: ['Rounds-ready', 'Recall cues', 'Rapid review'],
                subsections: [
                    {
                        heading: 'Endocrine & Metabolic',
                        items: [
                            "Graves' orbitopathy worsens with smoking; radioactive iodine can transiently aggravate eye disease—pre-treat with steroids if severe.",
                            'Graves disease is the commonest cause of thyrotoxicosis and is autoimmune — IgG antibodies to the TSH receptor drive hormone excess.',
                            'Toxic multinodular goitre → radioactive iodine is first-line in older adults; surgery is preferred for large goitres with compressive symptoms.',
                            'Primary hyperaldosteronism typically presents with hypertension + hypokalaemia; confirm with aldosterone:renin ratio then CT adrenals.',
                            'Primary hyperaldosteronism is commonly managed medically with a mineralocorticoid receptor antagonist (eg spironolactone or eplerenone) while arranging confirmatory testing and possible adrenalectomy for unilateral disease.',
                            'Measure PTH first when investigating unexplained hypercalcaemia; primary hyperparathyroidism is usually due to a solitary adenoma.',
                            'Over-replacement with thyroxine accelerates bone loss—always re-check TSH 6–8 weeks after dose changes.',
                            'In suspected adrenal insufficiency, draw cortisol and ACTH before steroids if safe; hydrocortisone 100 mg IV/IM is the emergency dose.'
                        ]
                    },
                    {
                        heading: 'Diabetes & Metabolic Emergencies',
                        items: [
                            'Two abnormal HbA1c or fasting glucose readings are required to diagnose asymptomatic type 2 diabetes.',
                            'Standard HbA1c target in T2DM is 48 mmol/mol; if on hypoglycaemia-inducing agents (e.g. sulfonylurea) aim for 53 mmol/mol.',
                            'SGLT2 inhibitors should follow metformin titration unless contraindicated; consider DPP-4 inhibitor where weight gain is a concern.',
                            'DKA: start with isotonic saline even if acidotic; once glucose <14 mmol/L, add 10% dextrose at 125 mL/hr while continuing insulin.',
                            'Cerebral oedema is the feared complication of DKA fluid therapy—watch for headache, bradycardia or reduced GCS.',
                            'HHS (hyperosmolar hyperglycaemic state) commonly presents with profound hyperglycaemia (>30 mmol/L), severe dehydration and marked hyperosmolarity without significant ketosis—manage mainly with aggressive IV fluids, correct electrolytes and start insulin once volume resuscitation has begun; consider ICU for severe cases.',
                            'Two hypoglycaemic episodes requiring third-party help mandate licence surrender to the DVLA/authorities.'
                        ]
                    },
                    {
                        heading: 'Cardio-Respiratory',
                        items: [
                            'Acute onset AF ≥48 hours or uncertain onset → rate control; rhythm control only after stroke risk has been addressed.',
                            'HFrEF: add an MRA on top of ACEi/ARB + beta-blocker if symptoms persist; start SGLT2 inhibitor early for mortality benefit.',
                            'Posterior MI: reciprocal ST depression with tall R waves in V1–V3—order posterior leads (V7–V9) to confirm.',
                            'Hypertension is the most common predisposing association for aortic dissection; suspect dissection with sudden severe chest/back pain and unequal pulses.',
                            'CT angiography is the investigation of choice for suspected aortic dissection in clinically stable patients; unstable patients require immediate resuscitation and specialist input.',
                            'Massive pulmonary embolism causing hypotension or shock should prompt urgent consideration of thrombolysis in the appropriate setting.',
                            'Airway first: always follow the airway‑breathing‑circulation sequence — call for help early, position, suction and oxygenate while preparing definitive airway plans.',
                            'Difficult airway: follow the DAS/rural airway algorithm — optimise positioning, consider awake intubation or videolaryngoscopy, use supraglottic device if intubation fails and proceed to emergency front‑of‑neck access (cricothyroidotomy) if you cannot ventilate.',
                            'COPD exacerbation with PaCO2 >6 kPa and pH <7.35 (≥7.26) despite maximal therapy → consider NIV early.',
                            'Oxygen therapy in COPD: target saturation 88–92% in patients at risk of CO2 retention; use ABGs to guide oxygen titration if hypercapnia suspected.',
                            'Legionella often causes hyponatraemia and relative bradycardia; urinary antigen test is the diagnostic shortcut.',
                            'In non-smokers presenting with lung cancer, adenocarcinoma is the most common histological subtype.',
                            'MI related to cocaine: give IV benzodiazepines; avoid pure beta-blockade due to unopposed alpha effect.'
                        ]
                    },
                    {
                        heading: 'Gastroenterology & Hepatology',
                        items: [
                            'Crohn’s disease: transmural skip lesions and fistulae; perforation risk is higher than in ulcerative colitis.',
                            'New iron deficiency anaemia in adults aged >60 should prompt investigation for colorectal cancer (eg colonoscopy) unless another clear cause is identified.',
                            'AST:ALT >2:1 suggests alcoholic liver disease; check GGT to support heavy alcohol intake.',
                            'Primary sclerosing cholangitis is strongly linked to ulcerative colitis; monitor for cholangiocarcinoma.',
                            'Painless jaundice + weight loss → suspect pancreatic cancer; Courvoisier sign (palpable gallbladder) points to malignant obstruction.',
                            'Pancreatic cancer may present with cholestatic LFTs (raised ALP/bilirubin) and unexplained weight-loss — arrange urgent imaging and specialist referral.',
                            'Oesophago-gastro-duodenoscopy (OGD/upper GI endoscopy) with biopsy is the investigation of choice for suspected gastric cancer — histology is required for definitive diagnosis and staging.',
                            'ERCP can cause post-procedural pancreatitis — acute pancreatitis is the commonest complication following ERCP and should be considered after new or worsening abdominal pain post-procedure.',
                            'A disproportional rise in urea relative to creatinine may suggest an upper GI source of bleeding (e.g., haematemesis) rather than a lower GI bleed.',
                            'Acute mesenteric ischaemia causes severe pain out of proportion to exam findings—do not delay CT angiography.',
                            'Large-bowel obstruction typically presents with abdominal distension, failure to pass flatus or stool and later-onset vomiting — suspect colonic obstruction and image appropriately (AXR/CT).',
                            'Upper GI bleed with haemodynamic instability → follow massive transfusion protocol rather than large-volume crystalloid.',
                            'Use scoring systems (eg Glasgow-Blatchford / Rockall) to triage urgency of endoscopy and predict need for intervention in upper GI bleeds.'
                        ]
                    },
                    {
                        heading: 'Obstetrics, Gynaecology & Paediatrics',
                        items: [
                            'PCOS diagnosis needs 2 of 3: oligo/anovulation, clinical/biochemical hyperandrogenism, or polycystic ovaries on scan.',
                            'Women at moderate or high risk of pre-eclampsia should be offered aspirin 75–150 mg daily from 12 weeks until delivery according to local guidance.',
                            'If placental abruption occurs and the fetus is alive and <36 weeks without distress, admit for monitoring and give antenatal corticosteroids for fetal lung maturation while planning delivery based on maternal and fetal condition.',
                            'Neonatology: cyanotic congenital heart disease presenting in the first days of life suggests transposition of the great arteries (TGA); cyanosis developing at 1–2 months suggests tetralogy of Fallot (TOF).',
                            'Chickenpox commonly has a prodrome of fever and systemic symptoms before the characteristic vesicular rash that begins on the trunk and face.' ,
                            'Breastfed infants who lose >10% birth weight in week 1 require urgent lactation support review.',
                            'Avoid oral isotretinoin in pregnancy; erythromycin is the systemic acne option if needed.',
                            'Youth mental health: patients ≤25 years started on SSRIs should be reviewed after 1 week for suicidality.',
                            'Severe obsessive-compulsive disorder causing major functional impairment should prompt referral to secondary mental health services; pharmacological or psychological treatment may be started while waiting for assessment according to local pathways.',
                            'If trauma-focused psychotherapy (eg CBT or EMDR) is unsuccessful for PTSD, consider first-line pharmacotherapy options such as an SSRI or venlafaxine according to local guidance and specialist advice.',
                            'Uncertain tetanus status with non-trivial wounds → give booster + immunoglobulin unless fully immunised within 10 years.',
                            'Obesity increases endometrial cancer risk; combined oral contraceptive pill is protective.'
                        ]
                    },
                    {
                        heading: 'Renal, Vascular & Acute Medicine',
                        items: [
                            'NICE AKI: creatinine rise >26 µmol/L in 48 h, >50% in 7 days, or urine output <0.5 mL/kg/hr for >6 h.',
                            'Uraemia causing encephalopathy, pericarditis or refractory metabolic disturbance is an indication to consider urgent dialysis and nephrology review.',
                            'Following head injury more than one episode of vomiting (or new focal neurological signs) is an indication to arrange CT head within 1 hour — escalate as an emergency.',
                            'Low Wells (≤4) with negative D-dimer → stop anticoagulation and consider alternative diagnoses.',
                            'Age-adjusted D-dimer: in patients >50y consider using an age-adjusted threshold (eg age × 10 in the same units as your lab) to increase specificity; always interpret results with assay-specific reference ranges.',
                            'Negative CTPA but ongoing DVT concern → arrange proximal leg vein ultrasound; if D-dimer positive with negative scan, repeat in 1 week.',
                            'Send MSU in all women >65 with suspected UTI; overtreatment of asymptomatic bacteriuria is common.',
                            'Right-sided tenderness on PR exam should raise suspicion of appendicitis even with atypical labs.',
                            'Fast-acting oral carbohydrate is first-line for conscious hypoglycaemia; glucagon if no IV access. If the patient has an impaired level of consciousness or cannot swallow, give IV glucose (50% glucose bolus or as per local protocol) and consider critical care escalation.',
                            'Paracetamol (acetaminophen) overdose: use the nomogram for single acute ingestions and start N‑acetylcysteine within recommended time windows — for staggered/suspected repeated overdoses treat empirically and seek toxicology advice.',
                            'TCA overdose with widened QRS or arrhythmia: give bolus sodium bicarbonate and proceed per toxicology guidance; monitor for seizures and arrhythmias.',
                            'Opioid overdose: prioritise airway and ventilation; naloxone reverses respiratory depression but titrate cautiously to avoid abrupt withdrawal and re-sedation may require repeated dosing or infusion.'
                        ]
                    },
                    {
                        heading: 'Dermatology, Musculoskeletal & General Practice',
                        items: [
                            'Plantar fasciitis: morning heel pain improves with stretching + rolling; weight loss and calf strengthening reduce recurrence.',
                            'Propranolol remains the first-line drug treatment for symptomatic essential tremor where pharmacotherapy is indicated.',
                            'Diabetes is a risk factor for retinal detachment (tractional detachments in proliferative diabetic retinopathy) — screen and refer early for visual change.',
                            'Myxoedema coma is a life-threatening hypothyroid emergency treated with IV levothyroxine and intravenous hydrocortisone; suspect when hypothermia, hypoventilation, marked bradycardia or reduced consciousness occur.',
                            'Temporal (giant cell) arteritis: begin high-dose glucocorticoids immediately if suspected to prevent irreversible visual loss — do not wait for temporal artery biopsy to start treatment.',
                            'Haemoarthroses are classic for haemophilia; aspirate a first presentation to confirm and exclude sepsis.',
                            'Erythema nodosum warrants chest X-ray to screen for sarcoidosis or TB.',
                            'Non-sedating antihistamines are first-line for urticaria; up-titrate to 4x dose before considering omalizumab.',
                            'Most metatarsal stress fractures occur at the 2nd metatarsal shaft; offload early to prevent non-union.',
                            'Lichen planus: potent topical steroids first-line; consider wick-insertion for oral lesions if symptomatic.'
                            ,
                            'Parkinson\'s disease typically causes an asymmetric resting tremor that often improves with voluntary movement; remember associated non-motor features and functional impact.'
                        ]
                    }
                ],
                note: 'Built from high-yield exam stems and frontline scenarios—use tags to target the right pearl set before rounds.'
            },
            {
                title: 'Critical Differentials & Red Flags',
                badge: 'Safety',
                summary: 'Signal serious pathology early with pattern-recognition prompts.',
                tags: ['Do not miss', 'Rapid escalation'],
                subsections: [
                    {
                        heading: 'Neurology & Stroke',
                        items: [
                            'Thunderclap headache + neck stiffness → exclude subarachnoid haemorrhage even if initial CT is normal (LP after 12 hours).',
                            'Acute ischaemic stroke: consider IV alteplase within 4.5 hours for eligible patients — perform urgent CT and NIHSS pre-treatment.',
                            'Posterior strokes may present with vomiting, vertigo or ataxia — do not rely solely on FAST for posterior circulation infarcts.',
                            'Painful third nerve palsy implies posterior communicating artery aneurysm until proven otherwise.',
                            'Suspected cauda equina: saddle anaesthesia, urinary retention, bilateral radiculopathy → urgent MRI + neurosurgical review.',
                            'Acute unilateral pupil-involving ptosis with diplopia could be an aneurysm—urgent imaging beats outpatient follow-up.'
                        ]
                    },
                    {
                        heading: 'Infection & Sepsis',
                        items: [
                            'Bilateral mid-to-lower zone patchy consolidation in older adults suggests Legionella—treat with macrolide/fluoroquinolone.',
                            'Non-blanching rash + fever → treat as meningococcal sepsis immediately with IM/IV benzylpenicillin pre-hospital.',
                            'Sepsis early management (eg 1‑hour bundle): draw blood cultures, give broad-spectrum IV antibiotics promptly and give 30 mL/kg crystalloid for hypotension or lactate ≥4 mmol/L; arrange urgent source control where indicated.',
                            'Post-influenza deterioration with cavitating pneumonia → think Staphylococcus aureus and escalate antimicrobials.',
                            'Severe C. difficile (toxic megacolon/ileus, rising lactate, hypotension): stop offending antibiotics, isolate the patient, start oral vancomycin or fidaxomicin promptly; if ileus consider oral vancomycin ± rectal administration and IV metronidazole while arranging early surgical/ICU escalation for fulminant disease.',
                            'Diabetic foot with disproportionate pain or crepitus → urgent imaging and surgical opinion for necrotising infection.'
                        ]
                    },
                    {
                        heading: 'Obstetric Red Flags',
                        items: [
                            'Painless per vaginam bleeding in late pregnancy → suspect placenta praevia—avoid digital exam, arrange urgent ultrasound.',
                            'Severe epigastric/RUQ pain + headache after 20 weeks → consider HELLP/preeclampsia; check platelets and LFTs promptly.',
                            'Reduced fetal movements warrant same-day assessment with CTG; never defer to routine clinic.',
                            'Suspected ectopic: shoulder tip pain, syncope or positive pregnancy test with abdominal pain → treat as emergency.'
                        ]
                    }
                ],
                note: 'Use these as huddle prompts on post-take ward rounds—aim to spot the outlier before the chart does.'
            },
            {
                title: 'Therapeutics at the Bedside',
                badge: 'Pharm',
                summary: 'Dose, de-risk and de-prescribe with confidence.',
                tags: ['Practical dosing', 'Interactions'],
                subsections: [
                    {
                        heading: 'Cardio & Antithrombotics',
                        items: [
                            'DOACs are contraindicated in mechanical valves—use warfarin with target INR per valve type.',
                            'Clopidogrel non-responders post-stent may benefit from ticagrelor; always check for drug interactions (e.g. carbamazepine).',
                            'ACEi/ARB in AKI: hold during sepsis/hypovolaemia; restart once euvolaemic and renal function recovering.',
                            'Perioperative AF: avoid amiodarone in patients with severe asthma/COPD—opt for beta-blocker or digoxin for rate control.',
                            'For stable, regular broad-complex tachycardias without adverse features, IV amiodarone is a commonly used first-line antiarrhythmic — follow local algorithms for unstable or polymorphic rhythms.'
                        ]
                    },
                    {
                        heading: 'Antimicrobials',
                        items: [
                            'Azithromycin prophylaxis in COPD: ensure optimised inhaler therapy first; check QTc and hearing before starting.',
                            'Penicillin allergy labels are wrong ~90% of the time—consider formal testing to widen antimicrobial options.',
                            'Vancomycin dosing should be weight + renal-function based; check trough just before 4th dose or earlier if renal impairment.',
                            'When switching from IV to oral antibiotics, ensure the oral bioavailability is high (e.g. levofloxacin, metronidazole).'
                        ]
                    },
                    {
                        heading: 'Deprescribing Signals',
                        items: [
                            'Falls + antihypertensives in older adults: review for postural drop and simplify to once-daily agents where possible.',
                            'Stop PPIs without indication; taper if long-term use to avoid rebound symptoms.',
                            'Long-term benzodiazepines: convert to diazepam equivalent and taper slowly (10–25% every 1–2 weeks).',
                            'Target HbA1c can be relaxed (≤58 mmol/mol) in frail adults or limited life expectancy—avoid hypoglycaemia at all costs.'
                        ]
                    }
                ],
                note: 'Pair with local antimicrobial guides for exact dosing; these cues focus on decision direction, not substitution for guidelines.'
            }
        ];
    }


    getStatistics() {
        const subsectionCount = this.sections.reduce((acc, s) => acc + (s.subsections ? s.subsections.length : (s.items ? 1 : 0)), 0);
        const pointCount = this.sections.reduce((count, section) => {
            if (Array.isArray(section.subsections)) {
                return count + section.subsections.reduce((c2, ss) => c2 + (ss.items?.length || 0), 0);
            }
            return count + (section.items?.length || 0);
        }, 0);

        return {
            totalSections: this.sections.length,
            totalSubsections: subsectionCount,
            totalPoints: pointCount
        };
    }

    getThemeContext() {
        const fallback = {
            primary: '#4f46e5',
            primaryRgb: '79, 70, 229',
            subtext: '#0f172a',
            summaryColor: '#0f172a'
        };

        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return {
                badgeBg: `rgba(${fallback.primaryRgb}, 0.12)`,
                badgeColor: fallback.primary,
                // match the CSS default surface for server-rendered content
                subsectionBg: '#ffffff',
                subsectionBorder: 'rgba(15, 23, 42, 0.1)',
                subnoteColor: 'rgba(55, 65, 81, 0.85)',
                summaryColor: fallback.summaryColor,
                subtext: fallback.subtext
            };
        }

        const primary = this.getCssVar('--v2-primary', fallback.primary);
        const primaryRgb = this.getCssVar('--v2-primary-rgb', fallback.primaryRgb);
        // Determine dark mode from either explicit data-theme or the user's
        // system preference. Relying only on dataset.theme means JS can force
        // light-mode inline styles even if the user prefers dark via media query.
        const dataTheme = (document.documentElement?.dataset?.theme || '').toLowerCase();
        const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = dataTheme === 'dark' || prefersDark;

        return {
            badgeBg: `rgba(${primaryRgb}, ${isDark ? 0.18 : 0.12})`,
            badgeColor: primary,
            subsectionBg: isDark ? 'rgba(6, 10, 26, 0.72)' : '#ffffff',
            subsectionBorder: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)',
            subnoteColor: isDark ? 'rgba(226, 232, 240, 0.86)' : 'rgba(15, 23, 42, 0.65)',
            summaryColor: isDark ? 'rgba(255,255,255,0.98)' : 'rgba(15,23,42,0.95)',
            subtext: isDark ? 'rgba(226,232,240,0.98)' : 'rgba(15,23,42,0.95)'
        };
    }

    getCssVar(name, fallback) {
        try {
            const value = getComputedStyle(document.documentElement).getPropertyValue(name);
            return value ? value.trim() || fallback : fallback;
        } catch (err) {
            return fallback;
        }
    }

    escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    render(panel) {
        if (!panel) {
            console.error('ClinicalPearlsManager: render called without panel');
            return;
        }

        const container = panel.querySelector('#clinical-pearls-container') || panel;
        if (!container) {
            console.error('ClinicalPearlsManager: container not found');
            return;
        }

        this.ensureStyles();
        const theme = this.getThemeContext();

        const cardsHtml = this.sections.map(section => {
            const subsectionsHtml = (section.subsections || []).map(subsection => {
                const itemsHtml = (subsection.items || []).map(item => {
                    const safeItem = this.escapeHtml(item);
                    return `<li data-pearl="${safeItem}">${safeItem}</li>`;
                }).join('');
                return `
                    <details class="med-knowledge-subsection" style="border-color:${theme.subsectionBorder};background:${theme.subsectionBg};color:${theme.subtext};">
                        <summary style="color:${theme.summaryColor};">
                            <span class="chevron">›</span>
                            ${subsection.heading}
                        </summary>
                        <ul>${itemsHtml}</ul>
                    </details>
                `;
            }).join('');

            const noteHtml = section.note ? `<div class="med-knowledge-subnote" style="color:${theme.subnoteColor};">${section.note}</div>` : '';
            const summaryHtml = section.summary ? `<div class="card-summary">${section.summary}</div>` : '';
            const tagsHtml = Array.isArray(section.tags) && section.tags.length
                ? `<div class="section-tags">${section.tags.map(tag => `<span class="section-tag">${tag}</span>`).join('')}</div>`
                : '';
            const stats = this.getStatistics();
            const metaHtml = `
                <div class="section-meta">
                    <span class="pill">${section.subsections?.length || 0} topic blocks</span>
                    <span class="pill">${(section.subsections || []).reduce((c, s) => c + (s.items?.length || 0), 0)} pearls</span>
                    <span class="pill">${stats.totalPoints} total pearls</span>
                </div>
            `;

            return `
                <section class="knowledge-card" data-section="${this.escapeHtml(section.title)}">
                    <div class="knowledge-card-header">
                        <span class="badge" style="background:${theme.badgeBg};color:${theme.badgeColor};">${section.badge}</span>
                        <h3>${section.title}</h3>
                    </div>
                    <div class="knowledge-card-body">
                        ${summaryHtml}
                        ${tagsHtml}
                        ${subsectionsHtml}
                        ${metaHtml}
                        ${noteHtml}
                    </div>
                </section>
            `;
        }).join('');

        const stats = this.getStatistics();
        const filterButtons = [
            `<button class="filter-pill active" type="button" data-filter="all">All pearls</button>`,
            ...this.sections.map(section => `<button class="filter-pill" type="button" data-filter="${this.escapeHtml(section.title)}">${section.title}</button>`)
        ].join('');

        container.innerHTML = `
            <div class="clinical-pearls-hero">
                <div>
                    <h2>Clinical Pearl Playbook</h2>
                    <p>Navigate high-yield pearls by specialty, filter by focus area, and surface the key line you need before seeing the next patient.</p>
                </div>
                <div class="clinical-pearls-stats">
                    <div class="clinical-pearls-stat">
                        <span class="stat-value">${stats.totalSections}</span>
                        <span class="stat-label">Collections</span>
                    </div>
                    <div class="clinical-pearls-stat">
                        <span class="stat-value">${stats.totalSubsections}</span>
                        <span class="stat-label">Topics</span>
                    </div>
                    <div class="clinical-pearls-stat">
                        <span class="stat-value">${stats.totalPoints}</span>
                        <span class="stat-label">Pearls</span>
                    </div>
                </div>
            </div>
            <div class="clinical-pearls-toolbar">
                <div class="clinical-pearls-search">
                    <label for="clinical-pearls-search">Search pearls</label>
                    <div class="search-input">
                        <span>🔎</span>
                        <input id="clinical-pearls-search" type="text" placeholder="Try: DKA fluids, aortic dissection, postpartum hemorrhage" data-role="pearl-search" />
                    </div>
                    <div class="search-hint"><span class="match-count">${stats.totalPoints} pearls available</span></div>
                </div>
                <div class="clinical-pearls-filters">
                    ${filterButtons}
                </div>
                <div class="clinical-pearls-actions">
                    <button class="action-btn" type="button" data-action="expand">Expand all</button>
                    <button class="action-btn" type="button" data-action="collapse">Collapse all</button>
                </div>
            </div>
            <div class="pearl-empty" data-role="pearl-empty">No pearls match that search. Try a broader term or clear filters.</div>
            <div class="knowledge-card-grid">
                ${cardsHtml}
            </div>
        `;

        const searchInput = container.querySelector('[data-role="pearl-search"]');
        const emptyState = container.querySelector('[data-role="pearl-empty"]');
        const matchCount = container.querySelector('.match-count');
        const filterPills = Array.from(container.querySelectorAll('.filter-pill'));
        const actionButtons = Array.from(container.querySelectorAll('[data-action]'));
        const cards = Array.from(container.querySelectorAll('.knowledge-card'));
        let activeFilter = 'all';

        const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const updateHighlights = (li, query) => {
            const baseText = li.dataset.pearl || li.textContent;
            if (!query) {
                li.innerHTML = baseText;
                return;
            }
            const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
            li.innerHTML = baseText.replace(regex, '<mark class="pearl-highlight">$1</mark>');
        };

        const applyFilters = () => {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
            let totalMatches = 0;

            cards.forEach(card => {
                const matchesFilter = activeFilter === 'all' || card.dataset.section === activeFilter;
                let cardMatches = 0;

                const details = Array.from(card.querySelectorAll('.med-knowledge-subsection'));
                details.forEach(detail => {
                    let detailMatches = 0;
                    const items = Array.from(detail.querySelectorAll('li'));
                    items.forEach(li => {
                        const text = (li.dataset.pearl || '').toLowerCase();
                        const matchesSearch = !query || text.includes(query);
                        if (matchesFilter && matchesSearch) {
                            li.style.display = '';
                            updateHighlights(li, query);
                            detailMatches += 1;
                        } else {
                            li.style.display = 'none';
                        }
                    });

                    if (matchesFilter && detailMatches > 0) {
                        detail.style.display = '';
                        detail.open = Boolean(query);
                        cardMatches += detailMatches;
                    } else {
                        detail.style.display = 'none';
                    }
                });

                card.style.display = matchesFilter && cardMatches > 0 ? '' : 'none';
                totalMatches += cardMatches;
            });

            if (matchCount) {
                matchCount.textContent = query
                    ? `${totalMatches} match${totalMatches === 1 ? '' : 'es'}`
                    : `${stats.totalPoints} pearls available`;
            }
            if (emptyState) {
                emptyState.style.display = totalMatches === 0 ? 'block' : 'none';
            }
        };

        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.forEach(btn => btn.classList.remove('active'));
                pill.classList.add('active');
                activeFilter = pill.dataset.filter || 'all';
                applyFilters();
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        }

        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                const visibleDetails = Array.from(container.querySelectorAll('.med-knowledge-subsection')).filter(detail => detail.style.display !== 'none');
                visibleDetails.forEach(detail => {
                    detail.open = action === 'expand';
                });
            });
        });

        applyFilters();
    }

    /**
     * Handle search from StandardizedSearchComponent
     */
    handleSearch(searchTerm, filter) {
        this.currentSearchTerm = searchTerm;
        this.currentFilter = filter;
        // Trigger existing search functionality if render has been called
        console.log(`Clinical pearls search: "${searchTerm}" with filter: "${filter}"`);
    }

    /**
     * Handle filter change from StandardizedSearchComponent
     */
    handleFilter(filter, searchTerm) {
        this.currentFilter = filter;
        this.currentSearchTerm = searchTerm;
        console.log(`Clinical pearls filter changed: "${filter}" with search: "${searchTerm}"`);
    }

    /**
     * Handle clear from StandardizedSearchComponent
     */
    handleClear() {
        this.currentSearchTerm = '';
        this.currentFilter = 'all';
        console.log('Clinical pearls search cleared');
    }
}

export const clinicalPearlsManager = new ClinicalPearlsManager();
