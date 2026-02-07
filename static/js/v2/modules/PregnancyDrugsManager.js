/**
 * PregnancyDrugsManager.js
 * Comprehensive reference for drug safety in pregnancy and breastfeeding
 * Provides rapid reference content for contraindicated drugs and safe alternatives
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { analytics } from './AnalyticsManager.js';
import { StandardizedSearchComponent } from '../components/StandardizedSearchComponent.js';

export class PregnancyDrugsManager {
    constructor() {
        this.eventBus = eventBus;
        this.storage = storage;
        this.sections = this.buildSections();
        this.searchTerm = '';
        this.container = null;
        this.favorites = new Set();
        this.currentCategory = 'all';
        this.initialized = false;
        this.version = "1.0.0";
        this.lastUpdated = "2026-02-05";
        
        // Initialize search component with pregnancy drug-specific filters
        this.searchComponent = new StandardizedSearchComponent({
            placeholder: "Search pregnancy/lactation drug safety (e.g., warfarin, ACE, antibiotics)...",
            searchIcon: "🤰",
            emptyStateMessage: "No drugs match your safety criteria",
            filterOptions: [
                { value: 'all', label: 'All Categories' },
                { value: 'contraindicated', label: 'Contraindicated' },
                { value: 'cautionRequired', label: 'Caution Required' },
                { value: 'generallyNot', label: 'Generally Not Used' },
                { value: 'safeLimited', label: 'Safe with Limited Data' },
                { value: 'safeExtensive', label: 'Safe with Extensive Data' },
                { value: 'cardiovascular', label: 'Cardiovascular' },
                { value: 'antibiotics', label: 'Antibiotics' },
                { value: 'analgesics', label: 'Analgesics' },
                { value: 'psychiatric', label: 'Psychiatric' },
                { value: 'endocrine', label: 'Endocrine' }
            ],
            onSearch: (searchTerm, filter) => this.handleSearch(searchTerm, filter),
            onFilter: (filter, searchTerm) => this.handleFilter(filter, searchTerm),
            onClear: () => this.handleClear()
        });

        this.currentSearchTerm = '';
        this.currentFilter = 'all';
    }

    async initialize() {
        if (this.initialized) {
            console.warn('⚠️ PregnancyDrugsManager already initialized');
            return;
        }

        try {
            console.log('🤰 Initializing PregnancyDrugsManager...');
            
            // Load favorites
            await this.loadFavorites();

            // Setup UI
            this.setupUI();

            this.initialized = true;
            console.log('✅ PregnancyDrugsManager initialized');

        } catch (error) {
            console.error('❌ Failed to initialize PregnancyDrugsManager:', error);
            throw error;
        }
    }

    async setupUI() {
        console.log('🔧 Setting up PregnancyDrugsManager UI...');
        
        // Find the pregnancy tab container
        const container = document.getElementById('pregnancy-tab');
        if (!container) {
            console.error('❌ pregnancy-tab container not found');
            return;
        }

        // Render the content
        this.render(container);
        
        console.log('✅ PregnancyDrugsManager UI setup complete');
    }

    buildSections() {
        return [
            {
                badge: "⚡ Quick Reference",
                title: "Drug Safety Overview", 
                summary: "Rapidly identify safe vs contraindicated medications",
                quickReferenceLists: {
                    safePregnancy: [
                        "Paracetamol", "Penicillins (Amoxicillin, Flucloxacillin)", "Cephalosporins (Cefalexin, Cefuroxime)",
                        "Erythromycin (not estolate)", "Azithromycin", "Insulin", "Metformin (specialist use)",
                        "Levothyroxine", "Folic acid", "Iron supplements", "Vitamin D", "Methyldopa", "Labetalol",
                        "Nifedipine", "Heparin / LMWH", "Ranitidine", "Omeprazole", "Lactulose", "Senna",
                        "Antiemetics (Cyclizine, Promethazine, Ondansetron)"
                    ],
                    safeBreastfeeding: [
                        "Paracetamol", "Ibuprofen", "Penicillins", "Cephalosporins", "Most SSRIs (Sertraline preferred)",
                        "Warfarin", "Heparin / LMWH", "Insulin", "Metformin", "Levothyroxine", "Folic acid",
                        "Iron", "Vitamin D", "PPIs (Omeprazole)", "H2 antagonists", "Lactulose", "Senna"
                    ],
                    absoluteContraindications: [
                        "ACE Inhibitors", "ARBs", "Statins", "Warfarin (especially weeks 6-12)", "DOACs",
                        "Oral retinoids (Isotretinoin, Acitretin)", "Methotrexate", "Mycophenolate", "Leflunomide",
                        "Valproate", "Finasteride/Dutasteride", "Misoprostol (unless for termination/induction)"
                    ]
                }
            },
            {
                badge: "🚨 Critical Alerts",
                title: "Critical Trimester Risks",
                summary: "Medications with specific timing-dependent risks",
                columns: [
                    {
                        heading: "First Trimester (Weeks 0-13)",
                        items: [
                            "Teratogenic period - organ formation",
                            "⚠️ Valproate: Neural tube defects (1-2%)", 
                            "⚠️ Retinoids: Craniofacial/cardiac defects",
                            "⚠️ Warfarin: Embryopathy (weeks 6-12)",
                            "⚠️ Paroxetine: Cardiac defects",
                            "⚠️ Lithium: Ebstein's anomaly",
                            "⚠️ Carbamazepine: Spina bifida (0.5-1%)"
                        ]
                    },
                    {
                        heading: "Second/Third Trimester",
                        items: [
                            "Fetal growth and development period",
                            "⚠️ NSAIDs >30 weeks: Ductus arteriosus closure",
                            "⚠️ Tetracyclines: Dental discoloration",
                            "⚠️ Aminoglycosides: 8th cranial nerve damage",
                            "⚠️ ACE/ARBs: Renal dysgenesis, oligohydramnios",
                            "⚠️ Nitrofurantoin at term: Neonatal haemolysis"
                        ]
                    }
                ]
            },
            {
                badge: "💊 Guidelines",
                title: "Clinical Guidelines",
                summary: "Evidence-based prescribing recommendations",
                columns: [
                    {
                        heading: "Pre-conception Planning",
                        items: [
                            "Folic acid 5mg daily for antiepileptic users",
                            "Stop methotrexate 3-6 months before conception", 
                            "ACE inhibitors → switch to methyldopa/labetalol",
                            "Warfarin → switch to LMWH pre-conception",
                            "Optimize chronic disease control",
                            "Review all medications for safety"
                        ]
                    },
                    {
                        heading: "Breastfeeding Principles",
                        items: [
                            "Most drugs transfer in clinically insignificant amounts",
                            "Consider timing of doses with feeds",
                            "Monitor infant for adverse effects",
                            "Use lowest effective dose for shortest time",
                            "Prefer drugs with established safety data",
                            "Consider maternal health benefits vs infant risks"
                        ]
                    },
                    {
                        heading: "Monitoring in Pregnancy",
                        items: [
                            "TDM for narrow therapeutic index drugs (lithium, phenytoin)",
                            "Increased monitoring frequency due to physiological changes",
                            "Dose adjustments often needed - increased clearance", 
                            "Regular fetal monitoring for essential teratogenic drugs",
                            "Specialist input for complex cases",
                            "Document risks/benefits and patient counselling"
                        ]
                    },
                    {
                        heading: "Emergency Situations", 
                        items: [
                            "Life-threatening maternal condition takes priority",
                            "Use safest effective drug with shortest exposure",
                            "Single dose exposure rarely causes major problems",
                            "Consider pregnancy test before any X-rays/CT",
                            "Emergency contraception within 120 hours (ulipristal 120h, levonorgestrel 72h)",
                            "Immediate specialist obstetric input if concerns"
                        ]
                    }
                ]
            },
            {
                drugs: [
                    // Cardiovascular
                    {
                        category: "Cardiovascular",
                        list: [
                            {
                                name: "ACE Inhibitors",
                                examples: "Ramipril, Lisinopril, Perindopril, Enalapril",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: [],
                                severity: "absolute",
                                reason: "Fetotoxic - renal dysgenesis, oligohydramnios, IUGR, skull hypoplasia, neonatal renal failure, death",
                                alternatives: "Methyldopa, Labetalol, Nifedipine"
                            },
                            {
                                name: "ARBs (Angiotensin Receptor Blockers)",
                                examples: "Losartan, Candesartan, Irbesartan, Valsartan",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "absolute",
                                reason: "Similar fetotoxicity to ACE inhibitors - renal dysgenesis, oligohydramnios, IUGR",
                                alternatives: "Methyldopa, Labetalol, Nifedipine"
                            },
                            {
                                name: "Statins",
                                examples: "Atorvastatin, Simvastatin, Rosuvastatin, Pravastatin",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "Congenital anomalies - developmental toxicity in animals, interferes with cholesterol synthesis",
                                alternatives: "Discontinue 3 months before conception - manage with diet"
                            },
                            {
                                name: "Amiodarone",
                                examples: "Amiodarone",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "Neonatal goitre, hypo/hyperthyroidism, bradycardia, prematurity",
                                alternatives: "β-blockers, Flecainide (specialist use)"
                            },
                            {
                                name: "Spironolactone",
                                examples: "Spironolactone, Eplerenone",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "Anti-androgenic effects - feminization of male fetus",
                                alternatives: "Amiloride (limited data but safer)"
                            }
                        ]
                    },
                    // Antibiotics & Antimicrobials
                    {
                        category: "Antibiotics & Antimicrobials",
                        list: [
                            {
                                name: "Tetracyclines",
                                examples: "Doxycycline, Lymecycline, Tetracycline",
                                pregnancy: ["pregnancy_t2", "pregnancy_t3"],
                                breastfeeding: [],
                                severity: "contraindicated",
                                reason: "Dental discoloration, enamel hypoplasia after 4-5 months gestation; maternal hepatotoxicity with IV use",
                                alternatives: "Penicillins, Cephalosporins, Erythromycin"
                            },
                            {
                                name: "Aminoglycosides",
                                examples: "Gentamicin, Amikacin, Tobramycin",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: [],
                                severity: "contraindicated",
                                reason: "Ototoxicity - 8th cranial nerve damage, congenital deafness (especially streptomycin)",
                                alternatives: "β-lactams if possible, use aminoglycosides only if essential with drug level monitoring"
                            },
                            {
                                name: "Quinolones",
                                examples: "Ciprofloxacin, Levofloxacin, Moxifloxacin",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: [],
                                severity: "contraindicated",
                                reason: "Arthropathy in animal studies - cartilage damage in weight-bearing joints",
                                alternatives: "Cephalosporins, Nitrofurantoin (avoid at term), Trimethoprim"
                            },
                            {
                                name: "Trimethoprim",
                                examples: "Trimethoprim, Co-trimoxazole",
                                pregnancy: ["pregnancy_t1"],
                                breastfeeding: [],
                                severity: "contraindicated",
                                reason: "Folate antagonist - theoretical risk of neural tube defects, congenital malformations",
                                alternatives: "Nitrofurantoin (avoid at term), Cefalexin; supplement 5mg folic acid if used"
                            },
                            {
                                name: "Metronidazole",
                                examples: "Metronidazole",
                                pregnancy: ["pregnancy_t1"],
                                breastfeeding: [],
                                severity: "contraindicated",
                                reason: "Theoretical risk in 1st trimester - avoid high doses",
                                alternatives: "Acceptable after 1st trimester for bacterial vaginosis, trichomoniasis"
                            },
                            {
                                name: "Nitrofurantoin",
                                examples: "Nitrofurantoin",
                                pregnancy: ["pregnancy_t3"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "Risk of neonatal haemolysis if used at term due to immature erythrocyte enzyme systems",
                                alternatives: "Cefalexin, Amoxicillin (safe throughout)"
                            },
                            {
                                name: "Chloramphenicol",
                                examples: "Chloramphenicol",
                                pregnancy: ["pregnancy_t3"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "Neonatal grey baby syndrome - circulatory collapse",
                                alternatives: "Alternative broad-spectrum antibiotics"
                            }
                        ]
                    },
                    // Anticoagulants
                    {
                        category: "Anticoagulants",
                        list: [
                            {
                                name: "Warfarin",
                                examples: "Warfarin",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: [],
                                severity: "contraindicated",
                                reason: "Warfarin embryopathy (6-12 weeks) - nasal hypoplasia, bone abnormalities; CNS malformations; fetal/maternal bleeding",
                                alternatives: "LMWH (Enoxaparin, Dalteparin) throughout pregnancy"
                            },
                            {
                                name: "DOACs",
                                examples: "Apixaban, Rivaroxaban, Edoxaban, Dabigatran",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "Insufficient safety data - risk unknown, animal data suggests problems",
                                alternatives: "LMWH (Enoxaparin, Dalteparin)"
                            }
                        ]
                    },
                    // Analgesics & NSAIDs
                    {
                        category: "Analgesics & NSAIDs",
                        list: [
                            {
                                name: "NSAIDs",
                                examples: "Ibuprofen, Diclofenac, Naproxen, Aspirin >75mg",
                                pregnancy: ["pregnancy_t3"],
                                breastfeeding: [],
                                severity: "contraindicated",
                                reason: "Premature closure of ductus arteriosus, persistent pulmonary hypertension, oligohydramnios, delayed labour",
                                alternatives: "Paracetamol throughout; NSAIDs acceptable <30 weeks if essential"
                            },
                            {
                                name: "Aspirin (high dose)",
                                examples: "Aspirin >75mg daily",
                                pregnancy: ["pregnancy_t3"],
                                breastfeeding: [],
                                severity: "contraindicated",
                                reason: "Impaired platelet function, delayed labour/delivery, premature closure of ductus arteriosus",
                                alternatives: "Paracetamol; Low-dose aspirin (75mg) is safe for pre-eclampsia prophylaxis"
                            },
                            {
                                name: "Codeine",
                                examples: "Codeine, Co-codamol, Co-dydramol",
                                pregnancy: [],
                                breastfeeding: ["breastfeeding"],
                                severity: "caution",
                                reason: "Neonatal withdrawal if prolonged use; respiratory depression (minimal risk with normal doses)",
                                alternatives: "Paracetamol alone; short courses acceptable if necessary"
                            }
                        ]
                    },
                    // Antidepressants & Psychiatry
                    {
                        category: "Antidepressants & Psychiatry",
                        list: [
                            {
                                name: "Paroxetine",
                                examples: "Paroxetine",
                                pregnancy: ["pregnancy_t1"],
                                breastfeeding: [],
                                severity: "contraindicated",
                                reason: "Increased risk of congenital heart defects (especially in 1st trimester)",
                                alternatives: "Sertraline, Fluoxetine (preferred SSRIs in pregnancy)"
                            },
                            {
                                name: "Benzodiazepines",
                                examples: "Diazepam, Lorazepam, Temazepam",
                                pregnancy: ["pregnancy_t1", "pregnancy_t3"],
                                breastfeeding: [],
                                severity: "contraindicated",
                                reason: "T1: possible oral cleft; T3: floppy baby syndrome, neonatal withdrawal, respiratory depression",
                                alternatives: "Psychological therapies; short-term use acceptable if severe anxiety"
                            },
                            {
                                name: "Lithium",
                                examples: "Lithium carbonate",
                                pregnancy: ["pregnancy_t1"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "Ebstein's anomaly (cardiac malformation), neonatal goitre, polyhydramnios, toxicity in neonate",
                                alternatives: "Antipsychotics (Olanzapine, Quetiapine) for acute mania - specialist input"
                            },
                            {
                                name: "Valproate",
                                examples: "Sodium valproate",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: [],
                                severity: "absolute",
                                reason: "Neural tube defects (spina bifida 1-2%), facial abnormalities, developmental delay (30-40%), congenital malformations",
                                alternatives: "Lamotrigine, Levetiracetam, Carbamazepine (all safer but still need specialist review)"
                            }
                        ]
                    },
                    // Endocrine & Diabetes
                    {
                        category: "Endocrine & Diabetes",
                        list: [
                            {
                                name: "Oral Hypoglycaemics (most)",
                                examples: "Gliclazide, Pioglitazone, SGLT2 inhibitors, DPP4 inhibitors",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "Insufficient data; risk of congenital malformations and neonatal hypoglycaemia",
                                alternatives: "Insulin ± Metformin (acceptable in pregnancy)"
                            },
                            {
                                name: "Metformin",
                                examples: "Metformin",
                                pregnancy: [],
                                breastfeeding: [],
                                severity: "safe",
                                reason: "Generally considered safe - widely used for gestational diabetes and PCOS",
                                alternatives: "Insulin if additional glucose control needed"
                            },
                            {
                                name: "Carbimazole",
                                examples: "Carbimazole",
                                pregnancy: ["pregnancy_t1"],
                                breastfeeding: [],
                                severity: "safe",
                                reason: "Congenital malformations (aplasia cutis, choanal/oesophageal atresia) - especially 1st trimester",
                                alternatives: "Propylthiouracil preferred in 1st trimester; Carbimazole in 2nd/3rd trimester"
                            }
                        ]
                    },
                    // Dermatology & Retinoids
                    {
                        category: "Dermatology & Retinoids",
                        list: [
                            {
                                name: "Retinoids (oral)",
                                examples: "Isotretinoin, Acitretin",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "absolute",
                                reason: "Severe teratogenicity - craniofacial, cardiac, thymic and CNS malformations",
                                alternatives: "Topical treatments for acne; MUST use 2 forms of contraception + pregnancy testing"
                            },
                            {
                                name: "Topical Retinoids",
                                examples: "Tretinoin, Adapalene gel",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: [],
                                severity: "contraindicated",
                                reason: "Theoretical risk - minimize absorption, avoid extensive application",
                                alternatives: "Topical antibiotics (Erythromycin), Azelaic acid, Benzoyl peroxide"
                            }
                        ]
                    },
                    // Anticonvulsants
                    {
                        category: "Anticonvulsants",
                        list: [
                            {
                                name: "Phenytoin",
                                examples: "Phenytoin",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: [],
                                severity: "contraindicated",
                                reason: "Fetal hydantoin syndrome - craniofacial abnormalities, limb defects, developmental delay",
                                alternatives: "Lamotrigine, Levetiracetam (safer but specialist review essential)"
                            },
                            {
                                name: "Carbamazepine",
                                examples: "Carbamazepine",
                                pregnancy: ["pregnancy_t1"],
                                breastfeeding: [],
                                severity: "safe",
                                reason: "Neural tube defects (0.5-1%), craniofacial defects, developmental delay",
                                alternatives: "Lamotrigine, Levetiracetam (lower risk but specialist review)"
                            }
                        ]
                    },
                    // Immunosuppressants & DMARDs
                    {
                        category: "Immunosuppressants & DMARDs",
                        list: [
                            {
                                name: "Methotrexate",
                                examples: "Methotrexate",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "absolute",
                                reason: "Severe teratogen - craniofacial, skeletal and cardiac defects; fetal death",
                                alternatives: "Hydroxychloroquine, Sulfasalazine (safe), Biologic agents (Certolizumab, Adalimumab - specialist)"
                            },
                            {
                                name: "Mycophenolate",
                                examples: "Mycophenolate mofetil",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "absolute",
                                reason: "Congenital malformations (facial clefts, cardiac, renal), spontaneous abortion",
                                alternatives: "Azathioprine, Tacrolimus (safer options - specialist use)"
                            },
                            {
                                name: "Leflunomide",
                                examples: "Leflunomide",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "absolute",
                                reason: "Teratogenic and fetotoxic in animal studies",
                                alternatives: "Hydroxychloroquine, Sulfasalazine"
                            }
                        ]
                    },
                    // Gastrointestinal
                    {
                        category: "Gastrointestinal",
                        list: [
                            {
                                name: "Misoprostol",
                                examples: "Misoprostol",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: [],
                                severity: "absolute",
                                reason: "Potent uterotonic - causes uterine contractions, abortion, premature labour",
                                alternatives: "Omeprazole, H2 antagonists for peptic ulcer disease"
                            },
                            {
                                name: "Loperamide (high dose)",
                                examples: "Loperamide >16mg daily",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: [],
                                severity: "contraindicated", 
                                reason: "Limited safety data at high doses, potential for withdrawal in neonate",
                                alternatives: "Oral rehydration, dietary modification, low-dose loperamide if essential"
                            },
                            {
                                name: "Magnesium trisilicate antacids",
                                examples: "Magnesium trisilicate mixtures",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: [],
                                severity: "contraindicated",
                                reason: "Risk of renal stones and hypermagnasaemia with prolonged use",
                                alternatives: "Calcium carbonate, Gaviscon, lifestyle modifications"
                            }
                        ]
                    },
                    // Respiratory
                    {
                        category: "Respiratory", 
                        list: [
                            {
                                name: "Theophylline (high dose)",
                                examples: "Theophylline >300mg daily",
                                pregnancy: ["pregnancy_t3"],
                                breastfeeding: ["breastfeeding"],
                                severity: "caution",
                                reason: "Neonatal irritability, apnoea, tachycardia if maternal levels high",
                                alternatives: "Inhaled bronchodilators preferred (Salbutamol, Salmeterol)"
                            },
                            {
                                name: "Pseudoephedrine",
                                examples: "Pseudoephedrine, Phenylephrine",
                                pregnancy: ["pregnancy_t1"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "Vasoconstriction, potential gastroschisis risk in 1st trimester",
                                alternatives: "Saline nasal drops, steam inhalation, topical decongestants (short-term)"
                            }
                        ]
                    },
                    // Oncology & Chemotherapy
                    {
                        category: "Oncology & Chemotherapy",
                        list: [
                            {
                                name: "Cytotoxic Chemotherapy",
                                examples: "Cyclophosphamide, Doxorubicin, Cisplatin, 5-FU",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "absolute",
                                reason: "Severe teratogenicity, fetal death, growth retardation, congenital malformations",
                                alternatives: "Delay treatment if possible, specialist oncology input essential"
                            },
                            {
                                name: "Tamoxifen",
                                examples: "Tamoxifen",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "absolute", 
                                reason: "Teratogenic - genital tract malformations, DES-like syndrome",
                                alternatives: "Discontinue 2 months before conception, consider other hormonal therapies"
                            }
                        ]
                    },
                    // Hormones & Contraception
                    {
                        category: "Hormones & Contraception",
                        list: [
                            {
                                name: "Combined Oral Contraceptive",
                                examples: "Ethinylestradiol/Levonorgestrel, Microgynon",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "No benefit in pregnancy, potential masculinization of female fetus", 
                                alternatives: "Discontinue if pregnancy suspected, progesterone-only methods while breastfeeding"
                            },
                            {
                                name: "Testosterone",
                                examples: "Testosterone gel, injections, patches",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "absolute",
                                reason: "Masculinization of female fetus - ambiguous genitalia",
                                alternatives: "N/A - contraindicated in women of childbearing potential"
                            }
                        ]
                    },
                    // Infectious Diseases
                    {
                        category: "Infectious Diseases",
                        list: [
                            {
                                name: "Ribavirin",
                                examples: "Ribavirin",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "absolute",
                                reason: "Severe teratogen - embryocidal and teratogenic in all animal species tested",
                                alternatives: "Avoid conception for 6 months after treatment, alternative antivirals"
                            },
                            {
                                name: "Live Vaccines",
                                examples: "MMR, Varicella, BCG, Yellow Fever",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: [],
                                severity: "contraindicated",
                                reason: "Theoretical risk of fetal infection from live attenuated organisms",
                                alternatives: "Inactivated vaccines where available, delay until post-delivery"
                            }
                        ]
                    },
                    // Neurology
                    {
                        category: "Neurology",
                        list: [
                            {
                                name: "Ergot Alkaloids",
                                examples: "Ergotamine, Dihydroergotamine, Methysergide",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "absolute",
                                reason: "Potent uterotonic activity - uterine contractions, fetal death",
                                alternatives: "Triptans (Sumatriptan has most data), paracetamol, magnesium"
                            },
                            {
                                name: "Vigabatrin",
                                examples: "Vigabatrin",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: [],
                                severity: "contraindicated",
                                reason: "Retinal toxicity, teratogenic in animals - cleft palate, microphthalmia",
                                alternatives: "Levetiracetam, lamotrigine (specialist review essential)"
                            }
                        ]
                    },
                    // Rheumatology & Autoimmune
                    {
                        category: "Rheumatology & Autoimmune",
                        list: [
                            {
                                name: "Cyclophosphamide",
                                examples: "Cyclophosphamide",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "absolute",
                                reason: "Severe teratogen - growth retardation, CNS malformations, limb defects",
                                alternatives: "Azathioprine, rituximab (specialist use), prednisolone"
                            },
                            {
                                name: "JAK Inhibitors",
                                examples: "Tofacitinib, Baricitinib, Upadacitinib",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "Limited human data, teratogenic in animal studies",
                                alternatives: "Biologic DMARDs (Adalimumab, Etanercept), conventional DMARDs"
                            }
                        ]
                    },
                    // Other Important Drugs
                    {
                        category: "Other Important Drugs",
                        list: [
                            {
                                name: "Finasteride / Dutasteride",
                                examples: "Finasteride, Dutasteride",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "Feminization of male fetus - abnormalities of external genitalia",
                                alternatives: "N/A - not used in women"
                            },
                            {
                                name: "Ergotamine",
                                examples: "Ergotamine",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "Oxytoxic - uterine contractions, vasoconstriction",
                                alternatives: "Paracetamol, Triptans (Sumatriptan has most data)"
                            }
                        ]
                    },
                    // Ophthalmology
                    {
                        category: "Ophthalmology",
                        list: [
                            {
                                name: "Chloramphenicol (topical)",
                                examples: "Chloramphenicol eye drops/ointment",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "Risk of aplastic anaemia (rare), Grey baby syndrome in neonates",
                                alternatives: "Fusidic acid, Gentamicin drops, Azithromycin"
                            },
                            {
                                name: "Prednisolone (topical)",
                                examples: "Prednisolone eye drops",
                                pregnancy: [],
                                breastfeeding: [],
                                severity: "safe",
                                reason: "Minimal systemic absorption from topical use - generally safe",
                                alternatives: "Use minimal effective dose and duration"
                            }
                        ]
                    },
                    // Dermatology Advanced
                    {
                        category: "Dermatology Advanced",
                        list: [
                            {
                                name: "Topical Steroids (potent)",
                                examples: "Clobetasol propionate, Betamethasone dipropionate",
                                pregnancy: [],
                                breastfeeding: [],
                                severity: "caution",
                                reason: "Potent steroids may have systemic effects if used extensively",
                                alternatives: "Moderate potency steroids, emollients, minimize duration"
                            },
                            {
                                name: "Calcipotriol",
                                examples: "Calcipotriol (Dovonex)",
                                pregnancy: [],
                                breastfeeding: [],
                                severity: "caution",
                                reason: "Risk of hypercalcaemia with extensive use - theoretical teratogenic risk",
                                alternatives: "Topical steroids, coal tar preparations"
                            }
                        ]
                    },
                    // Anaesthetics & Sedatives
                    {
                        category: "Anaesthetics & Sedatives",
                        list: [
                            {
                                name: "Nitrous Oxide (prolonged)",
                                examples: "Entonox (prolonged labour use), dental nitrous oxide",
                                pregnancy: ["pregnancy_t1"],
                                breastfeeding: [],
                                severity: "caution",
                                reason: "Prolonged exposure may interfere with DNA synthesis, teratogenic in animals",
                                alternatives: "Regional anaesthesia, minimize exposure duration"
                            },
                            {
                                name: "Propofol",
                                examples: "Propofol",
                                pregnancy: [],
                                breastfeeding: [],
                                severity: "safe",
                                reason: "Commonly used in obstetric anaesthesia - no known teratogenic effects",
                                alternatives: "Standard anaesthetic of choice in pregnancy"
                            }
                        ]
                    },
                    // Advanced Therapeutics
                    {
                        category: "Advanced Therapeutics",
                        list: [
                            {
                                name: "Monoclonal Antibodies",
                                examples: "Rituximab, Bevacizumab, Trastuzumab",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "Large molecules, limited data - potential for immunosuppression and organ development issues",
                                alternatives: "Conventional chemotherapy with known pregnancy profiles where essential"
                            },
                            {
                                name: "Aminosalicylates",
                                examples: "Mesalazine, Olsalazine, Balsalazide",
                                pregnancy: [],
                                breastfeeding: [],
                                severity: "safe",
                                reason: "Generally safe for IBD maintenance - benefits outweigh risks",
                                alternatives: "Continue treatment - disease control more important than drug risk"
                            }
                        ]
                    },
                    // Emergency & Critical Care
                    {
                        category: "Emergency & Critical Care",
                        list: [
                            {
                                name: "Adrenaline/Epinephrine",
                                examples: "Adrenaline auto-injectors (EpiPen), IV adrenaline",
                                pregnancy: [],
                                breastfeeding: [],
                                severity: "safe",
                                reason: "Life-saving in anaphylaxis - benefits far outweigh any theoretical risks",
                                alternatives: "No alternatives for severe anaphylaxis - use without hesitation"
                            },
                            {
                                name: "Atropine",
                                examples: "Atropine",
                                pregnancy: [],
                                breastfeeding: [],
                                severity: "safe",
                                reason: "Crosses placenta but no evidence of harm - safe in emergencies",
                                alternatives: "Essential emergency drug - use when indicated"
                            },
                            {
                                name: "Amiodarone",
                                examples: "Amiodarone",
                                pregnancy: ["pregnancy_all"],
                                breastfeeding: ["breastfeeding"],
                                severity: "contraindicated",
                                reason: "Fetal thyroid dysfunction, growth retardation, IUGR",
                                alternatives: "DC cardioversion, other antiarrhythmics (flecainide, sotalol), β-blockers"
                            }
                        ]
                    },
                    // Vaccines & Immunizations
                    {
                        category: "Vaccines & Immunizations",
                        list: [
                            {
                                name: "COVID-19 Vaccines (mRNA)",
                                examples: "Pfizer-BioNTech, Moderna",
                                pregnancy: [],
                                breastfeeding: [],
                                severity: "safe",
                                reason: "Recommended in pregnancy - vaccines do not contain live virus, excellent safety data",
                                alternatives: "Benefits outweigh risks - pregnant women at higher risk from COVID-19"
                            },
                            {
                                name: "Influenza Vaccine",
                                examples: "Inactivated influenza vaccine",
                                pregnancy: [],
                                breastfeeding: [],
                                severity: "safe",
                                reason: "Recommended in pregnancy (any trimester) - reduces maternal and neonatal morbidity",
                                alternatives: "Annual vaccination strongly recommended"
                            },
                            {
                                name: "Pertussis Vaccine",
                                examples: "dTaP (combined diphtheria, tetanus, acellular pertussis)",
                                pregnancy: [],
                                breastfeeding: [],
                                severity: "safe",
                                reason: "Recommended 16-32 weeks (ideally 20-32 weeks) - maternal antibodies protect newborn",
                                alternatives: "Essential for neonatal protection - give each pregnancy"
                            }
                        ]
                    }
                ]
            }
        ];
    }

    ensureStyles() {
        if (document.querySelector('#pregnancy-drugs-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'pregnancy-drugs-styles';
        style.textContent = `
            .pregnancy-search-container {
                margin-bottom: 20px;
                position: relative;
            }
            .pregnancy-search-input {
                width: 100%;
                padding: 12px 16px;
                border: 1px solid rgba(15,23,42,0.12);
                border-radius: 10px;
                font-size: 1rem;
                background: #fff;
                transition: border-color 0.2s, box-shadow 0.2s;
            }
            .pregnancy-search-input:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
            }
            .pregnancy-search-stats {
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                color: #64748b;
                font-size: 0.875rem;
                pointer-events: none;
            }

            /* Card Styles */
            .pregnancy-card {
                background: #fff;
                border: 1px solid rgba(15,23,42,0.08);
                border-radius: 12px;
                padding: 16px 20px;
                margin-bottom: 16px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                transition: box-shadow 0.2s;
            }
            .pregnancy-badge {
                display: inline-block;
                background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                color: white;
                padding: 4px 10px;
                border-radius: 6px;
                font-size: 0.8rem;
                font-weight: 600;
                margin-bottom: 8px;
            }
            .pregnancy-card h3 {
                margin: 8px 0;
                color: #0f172a;
                font-size: 1.3rem;
                font-weight: 700;
            }
            .card-summary {
                color: #475569;
                font-size: 0.95rem;
                margin-bottom: 12px;
                line-height: 1.6;
            }
            
            /* Column Layout */
            .pregnancy-columns { 
                display: grid; 
                gap: 10px; 
            }
            .pregnancy-subsection {
                border: 1px solid rgba(15,23,42,0.08);
                border-radius: 10px;
                padding: 10px 12px;
                background: #fff;
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
            }
            .pregnancy-subsection h4 { 
                margin: 0 0 6px 0; 
                font-size: 0.96rem; 
                color: #1d4ed8;
            }
            .pregnancy-subsection ul { 
                margin: 0; 
                padding-left: 18px; 
                display: grid; 
                gap: 6px; 
            }
            .pregnancy-subsection li { 
                line-height: 1.5; 
                font-size: 0.9rem;
            }

            /* Quick Reference Pills */
            .qr-pill-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 8px;
                margin-top: 10px;
            }
            .qr-pill {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 0.875rem;
                font-weight: 500;
                transition: all 0.2s;
                cursor: pointer;
            }
            .qr-pill--safe {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
            }
            .qr-pill--danger {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
            }
            .qr-pill:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.12);
            }
            .qr-pill__icon {
                font-weight: bold;
            }
            .qr-pill__name {
                flex: 1;
            }

            /* Drug Category Sections */
            .pregnancy-category-section {
                margin-bottom: 24px;
            }
            .category-header {
                font-size: 1.25rem;
                font-weight: 700;
                color: #1e293b;
                margin-bottom: 12px;
                padding-bottom: 6px;
                border-bottom: 2px solid #e2e8f0;
            }
            .drugs-grid {
                display: grid;
                gap: 12px;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            }

            /* Drug Cards */
            .preg-card {
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                transition: all 0.3s ease;
                cursor: pointer;
                border: 1px solid rgba(15,23,42,0.08);
            }
            .preg-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            }
            .preg-card__top-bar {
                height: 4px;
            }
            .severity-absolute .preg-card__top-bar {
                background: linear-gradient(90deg, #dc2626, #ef4444);
            }
            .severity-contraindicated .preg-card__top-bar {
                background: linear-gradient(90deg, #f59e0b, #f97316);
            }
            .severity-caution .preg-card__top-bar {
                background: linear-gradient(90deg, #eab308, #facc15);
            }
            .severity-safe .preg-card__top-bar {
                background: linear-gradient(90deg, #10b981, #059669);
            }
            .preg-card__body {
                padding: 16px;
            }
            .preg-card__header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 12px;
            }
            .preg-card__name {
                font-size: 1.1rem;
                font-weight: 700;
                color: #1e293b;
                margin: 0 0 4px 0;
            }
            .preg-card__examples {
                font-size: 0.85rem;
                color: #64748b;
                font-style: italic;
            }
            .preg-card__fav {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: background 0.2s;
            }
            .preg-card__fav:hover {
                background: rgba(59,130,246,0.1);
            }
            .preg-card__severity {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 0.875rem;
                font-weight: 600;
                margin-bottom: 12px;
            }
            .severity-absolute .preg-card__severity {
                background: rgba(239,68,68,0.1);
                color: #dc2626;
            }
            .severity-contraindicated .preg-card__severity {
                background: rgba(249,115,22,0.1);
                color: #ea580c;
            }
            .severity-caution .preg-card__severity {
                background: rgba(251,191,36,0.1);
                color: #d97706;
            }
            .severity-safe .preg-card__severity {
                background: rgba(16,185,129,0.1);
                color: #059669;
            }
            .preg-card__badges {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                margin-bottom: 12px;
            }
            .preg-badge {
                font-size: 0.75rem;
                padding: 3px 8px;
                border-radius: 12px;
                font-weight: 600;
                color: white;
            }
            .preg-badge--all { background: #dc2626; }
            .preg-badge--t1 { background: #7c3aed; }
            .preg-badge--t2 { background: #2563eb; }
            .preg-badge--t3 { background: #0891b2; }
            .preg-badge--bf { background: #ec4899; }
            .preg-card__reason {
                margin-bottom: 12px;
            }
            .preg-card__reason-label {
                font-size: 0.75rem;
                font-weight: 600;
                color: #374151;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 4px;
            }
            .preg-card__reason-text {
                font-size: 0.875rem;
                color: #4b5563;
                line-height: 1.5;
                margin: 0;
            }
            .preg-card__alt {
                margin-bottom: 12px;
            }
            .preg-card__alt-label {
                font-size: 0.75rem;
                font-weight: 600;
                color: #059669;
                margin-bottom: 4px;
            }
            .preg-card__alt-text {
                font-size: 0.875rem;
                color: #4b5563;
                line-height: 1.5;
                margin: 0;
            }
            .preg-card__footer {
                text-align: right;
                border-top: 1px solid #f1f5f9;
                padding-top: 8px;
            }
            .preg-card__cta {
                font-size: 0.8rem;
                color: #3b82f6;
                font-weight: 500;
            }

            /* Clinical Pearls */
            .clinical-pearls-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .clinical-pearls-list li {
                padding: 8px 0;
                border-bottom: 1px solid #f1f5f9;
                font-size: 0.9rem;
                line-height: 1.5;
            }
            .clinical-pearls-list li:last-child {
                border-bottom: none;
            }

            /* Resources */
            .resource-card {
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 12px;
                background: #fff;
            }
            .resource-card h4 {
                margin: 0 0 8px 0;
                color: #1e293b;
                font-size: 1rem;
            }
            .resource-card p {
                margin: 0 0 8px 0;
                color: #64748b;
                font-size: 0.875rem;
            }
            .resource-card a {
                color: #3b82f6;
                text-decoration: none;
                font-weight: 500;
                font-size: 0.875rem;
            }
            .resource-card a:hover {
                text-decoration: underline;
            }

            /* Dark Mode Support */
            body.dark-mode .pregnancy-card {
                background: #1e293b;
                border-color: rgba(148,163,184,0.1);
                color: #e2e8f0;
            }
            body.dark-mode .pregnancy-card h3 {
                color: #f1f5f9;
            }
            body.dark-mode .card-summary {
                color: #94a3b8;
            }
            body.dark-mode .pregnancy-search-input {
                background: #334155;
                border-color: rgba(148,163,184,0.2);
                color: #e2e8f0;
            }
            body.dark-mode .pregnancy-search-input::placeholder {
                color: #94a3b8;
            }
            body.dark-mode .pregnancy-search-stats {
                color: #94a3b8;
            }
            body.dark-mode .pregnancy-subsection {
                background: #334155;
                border-color: rgba(148,163,184,0.1);
            }
            body.dark-mode .pregnancy-subsection h4 {
                color: #60a5fa;
            }
            body.dark-mode .pregnancy-subsection li {
                color: #cbd5e1;
            }
            body.dark-mode .category-header {
                color: #f1f5f9;
                border-color: #475569;
            }
            body.dark-mode .preg-card {
                background: #334155;
                border-color: rgba(148,163,184,0.1);
            }
            body.dark-mode .preg-card__name {
                color: #f1f5f9;
            }
            body.dark-mode .preg-card__examples {
                color: #94a3b8;
            }
            body.dark-mode .preg-card__reason-label,
            body.dark-mode .preg-card__alt-label {
                color: #cbd5e1;
            }
            body.dark-mode .preg-card__reason-text,
            body.dark-mode .preg-card__alt-text {
                color: #94a3b8;
            }
            body.dark-mode .preg-card__footer {
                border-color: #475569;
            }
            body.dark-mode .preg-card__cta {
                color: #60a5fa;
            }
            body.dark-mode .preg-card__fav:hover {
                background: rgba(96,165,250,0.1);
            }
            body.dark-mode .clinical-pearls-list li {
                border-color: #475569;
                color: #cbd5e1;
            }
            body.dark-mode .resource-card {
                background: #334155;
                border-color: rgba(148,163,184,0.1);
            }
            body.dark-mode .resource-card h4 {
                color: #f1f5f9;
            }
            body.dark-mode .resource-card p {
                color: #94a3b8;
            }
            body.dark-mode .resource-card a {
                color: #60a5fa;
            }
            body.dark-mode .qr-pill {
                color: white;
            }
            body.dark-mode .qr-pill:hover {
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            }
        `;
        document.head.appendChild(style);
    }

    render(container) {
        if (!container) return;
        this.container = container;
        this.ensureStyles();

        // Search box HTML
        const searchHtml = `
            <div class="pregnancy-search-container">
                <input type="text" class="pregnancy-search-input" placeholder="🔍 Search drugs (e.g., warfarin, ACE, antibiotics...)" />
                <div class="pregnancy-search-stats">${this.sections.find(s => s.drugs)?.drugs.length || 0} drugs available</div>
            </div>
        `;

        const sectionHtml = this.sections.map(section => {
            const badge = `<span class="pregnancy-badge">${section.badge}</span>`;
            const summary = section.summary ? `<p class="card-summary">${section.summary}</p>` : '';

            let body = '';
            
            // Handle column-based sections (like ophthalmology)
            if (Array.isArray(section.columns)) {
                const columns = section.columns.map(col => `
                    <div class="pregnancy-subsection">
                        <h4>${col.heading}</h4>
                        <ul>${(col.items || []).map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                `).join('');
                body = `<div class="pregnancy-columns">${columns}</div>`;
            }

            // Handle quick reference lists
            if (section.quickReferenceLists) {
                body = `
                    <div id="safePregDrugs">
                        <div class="qr-pill-grid">
                            ${section.quickReferenceLists.safePregnancy.map(drug => `
                                <div class="qr-pill qr-pill--safe">
                                    <span class="qr-pill__icon">✓</span>
                                    <span class="qr-pill__name">${drug}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // Handle drug-based sections
            if (Array.isArray(section.drugs)) {
                const drugsByCategory = section.drugs.map(category => `
                    <div class="pregnancy-category-section">
                        <h3 class="category-header">${category.category}</h3>
                        <div class="drugs-grid">
                            ${category.list.map(drug => this.renderDrugCard(drug)).join('')}
                        </div>
                    </div>
                `).join('');
                body = `<div id="pregnancyDrugsList">${drugsByCategory}</div>`;
            }

            return `
                <div class="pregnancy-card">
                    ${badge}
                    <h3>${section.title}</h3>
                    ${summary}
                    ${body}
                </div>
            `;
        }).join('');

        const clinicalPearlsHtml = `
            <div id="pregnancyClinicalPearls">
                <ul class="clinical-pearls-list">
                    <li>💡 Always check BNF and UKTIS for the most up-to-date information</li>
                    <li>💡 Many drug safety classifications are based on limited data - specialist advice often needed</li>
                    <li>💡 Folic acid 5mg daily should be given pre-conception and throughout pregnancy for women on antiepileptics</li>
                    <li>💡 Metformin is increasingly used in pregnancy (GDM, PCOS) but is off-license - specialist supervision</li>
                    <li>💡 LMWH is the anticoagulant of choice in pregnancy - warfarin and DOACs contraindicated</li>
                    <li>💡 Low-dose aspirin (75mg) is SAFE in pregnancy for pre-eclampsia prophylaxis despite NSAIDs being contraindicated</li>
                    <li>💡 Most drugs enter breast milk in small amounts - consider risk/benefit for each case</li>
                    <li>💡 Isotretinoin and valproate require Pregnancy Prevention Programme - mandatory contraception</li>
                    <li>💡 SSRIs: Sertraline preferred in breastfeeding (lowest milk levels); avoid Paroxetine in pregnancy (cardiac defects)</li>
                    <li>💡 Methotrexate: STOP 3-6 months before conception + 5mg folic acid until after delivery</li>
                    <li>💡 Neonatal withdrawal can occur with prolonged opiate, SSRI, or benzodiazepine use</li>
                    <li>💡 ACE inhibitors/ARBs: Fetotoxic - switch to Methyldopa, Labetalol or Nifedipine BEFORE conception if possible</li>
                    <li>💊 Physiological changes: ↑GFR, ↑cardiac output, ↓albumin, ↑progesterone → altered pharmacokinetics</li>
                    <li>💊 Critical periods: Weeks 3-8 (organogenesis), weeks 8-15 (palatogenesis), throughout (growth/development)</li>
                    <li>💊 Breastfeeding timing: Dose immediately after feeding to minimize infant exposure at next feed</li>
                    <li>💊 Live vaccines contraindicated in pregnancy but most inactivated vaccines are safe and recommended</li>
                    <li>💊 Insulin requirements typically ↑ 50-100% during pregnancy - frequent monitoring essential</li>
                    <li>💊 Antiepileptic levels often ↓ in pregnancy due to increased clearance - monitor levels monthly</li>
                    <li>💊 Psychiatric medications: Don't stop abruptly - risk of relapse often outweighs teratogenic risk</li>
                    <li>💊 Emergency situations: Maternal life takes priority - use safest effective treatment</li>
                    <li>💊 Herbal remedies not automatically safe - many lack safety data and have drug interactions</li>
                    <li>💊 Smoking cessation: Nicotine replacement safer than continued smoking, but behavioural support first-line</li>
                </ul>
            </div>
        `;

        const resourcesHtml = `
            <div id="pregnancyResourcesList">
                <div class="resource-card">
                    <h4>UK Teratology Information Service (UKTIS)</h4>
                    <p>Specialist advice on medication in pregnancy</p>
                    <a href="https://www.uktis.org" target="_blank" rel="noopener noreferrer">Visit Resource →</a>
                </div>
                <div class="resource-card">
                    <h4>BNF Pregnancy Guidance</h4>
                    <p>Up-to-date prescribing information</p>
                    <a href="https://bnf.nice.org.uk/" target="_blank" rel="noopener noreferrer">Visit Resource →</a>
                </div>
                <div class="resource-card">
                    <h4>RCOG Guidelines</h4>
                    <p>Royal College guidance on medications in pregnancy</p>
                    <a href="https://www.rcog.org.uk/" target="_blank" rel="noopener noreferrer">Visit Resource →</a>
                </div>
                <div class="resource-card">
                    <h4>Drugs in Lactation (LactMed)</h4>
                    <p>US NIH database on drugs and breastfeeding</p>
                    <a href="https://www.ncbi.nlm.nih.gov/books/NBK501922/" target="_blank" rel="noopener noreferrer">Visit Resource →</a>
                </div>
                <div class="resource-card">
                    <h4>Breastfeeding Network</h4>
                    <p>UK charity with medication information for breastfeeding</p>
                    <a href="https://www.breastfeedingnetwork.org.uk/" target="_blank" rel="noopener noreferrer">Visit Resource →</a>
                </div>
            </div>
        `;

        container.innerHTML = searchHtml + sectionHtml + clinicalPearlsHtml + resourcesHtml;
        this.setupEventListeners();
    }

    renderDrugCard(drug) {
        const severityClass = drug.severity || 'contraindicated';
        const severityIcon = severityClass === 'absolute' ? '⛔' : 
                           severityClass === 'contraindicated' ? '⚠️' : 
                           severityClass === 'caution' ? '⚡' :
                           severityClass === 'safe' ? '⚡' : '⚠️';
        
        const severityText = severityClass === 'absolute' ? 'ABSOLUTE CONTRAINDICATION' :
                           severityClass === 'contraindicated' ? 'CONTRAINDICATED' :
                           severityClass === 'caution' ? 'USE WITH CAUTION - avoid prolonged use' :
                           severityClass === 'safe' ? 'SAFE - specialist use' : 'AVOID unless life-threatening arrhythmia';

        const badges = [
            ...(drug.pregnancy.includes('pregnancy_all') ? ['🚫 All Trimesters'] : []),
            ...(drug.pregnancy.includes('pregnancy_t1') ? ['T1'] : []),
            ...(drug.pregnancy.includes('pregnancy_t2') ? ['T2'] : []),
            ...(drug.pregnancy.includes('pregnancy_t3') ? ['T3'] : []),
            ...(drug.breastfeeding.includes('breastfeeding') ? ['🤱 Breastfeeding'] : [])
        ];

        return `
            <div class="preg-card severity-${severityClass}" data-drug="${drug.name}">
                <div class="preg-card__top-bar severity-${severityClass}"></div>
                <div class="preg-card__body">
                    <div class="preg-card__header">
                        <div class="preg-card__title-wrap">
                            <h4 class="preg-card__name">${drug.name}</h4>
                            <span class="preg-card__examples">${drug.examples}</span>
                        </div>
                        <button class="preg-card__fav " data-drug="${drug.name}" title="Add to favorites">
                            ☆
                        </button>
                    </div>

                    <div class="preg-card__severity severity-${severityClass}">
                        <span class="preg-card__severity-icon">${severityIcon}</span>
                        <span class="preg-card__severity-text">${severityText}</span>
                    </div>

                    <div class="preg-card__badges">
                        ${badges.map(badge => `<span class="preg-badge preg-badge--${badge.includes('T1') ? 't1' : badge.includes('T2') ? 't2' : badge.includes('T3') ? 't3' : badge.includes('Breastfeeding') ? 'bf' : 'all'}">${badge}</span>`).join('')}
                    </div>

                    <div class="preg-card__reason">
                        <div class="preg-card__reason-label">Risk</div>
                        <p class="preg-card__reason-text">${drug.reason}</p>
                    </div>

                    <div class="preg-card__alt">
                        <div class="preg-card__alt-label">✅ Alternative</div>
                        <p class="preg-card__alt-text">${drug.alternatives}</p>
                    </div>
                </div>
            </div>
        `;
    }

    updateSearchResults() {
        if (!this.container) return;
        
        const cards = this.container.querySelectorAll('.preg-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const drugName = card.dataset.drug.toLowerCase();
            const shouldShow = !this.searchTerm || drugName.includes(this.searchTerm);
            
            if (shouldShow) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update search stats
        const searchStats = this.container.querySelector('.pregnancy-search-stats');
        if (searchStats) {
            const totalCount = cards.length;
            searchStats.textContent = this.searchTerm ? 
                `${visibleCount} of ${totalCount} drugs shown` : 
                `${totalCount} drugs available`;
        }
    }

    filterDrugs() {
        if (!this.container) return;
        
        const cards = this.container.querySelectorAll('.preg-card');
        
        cards.forEach(card => {
            const badges = card.querySelectorAll('.preg-badge');
            let shouldShow = this.currentCategory === 'all';
            
            if (!shouldShow) {
                badges.forEach(badge => {
                    if ((this.currentCategory === 'pregnancy_all' && badge.textContent.includes('All Trimesters')) ||
                        (this.currentCategory === 'pregnancy_t1' && badge.textContent.includes('T1')) ||
                        (this.currentCategory === 'pregnancy_t2' && badge.textContent.includes('T2')) ||
                        (this.currentCategory === 'pregnancy_t3' && badge.textContent.includes('T3')) ||
                        (this.currentCategory === 'breastfeeding' && badge.textContent.includes('Breastfeeding'))) {
                        shouldShow = true;
                    }
                });
            }
            
            card.style.display = shouldShow ? 'block' : 'none';
        });
    }

    async loadFavorites() {
        try {
            const stored = await this.storage.get('pregnancyDrugsFavorites');
            this.favorites = new Set(stored || []);
        } catch (error) {
            console.warn('Failed to load favorites:', error);
            this.favorites = new Set();
        }
    }

    async toggleFavorite(drugName) {
        if (this.favorites.has(drugName)) {
            this.favorites.delete(drugName);
        } else {
            this.favorites.add(drugName);
        }

        // Update storage
        try {
            await this.storage.set('pregnancyDrugsFavorites', Array.from(this.favorites));
        } catch (error) {
            console.warn('Failed to save favorites:', error);
        }

        // Update UI
        if (!this.container) return;
        
        const favButton = this.container.querySelector(`[data-drug="${drugName}"]`);
        if (favButton) {
            favButton.textContent = this.favorites.has(drugName) ? '★' : '☆';
        }
    }

    showDrugDetail(drugName) {
        console.log(`Showing detail for drug: ${drugName}`);
        // Implementation for showing detailed drug information
    }

    setupEventListeners() {
        // Check if container exists (render hasn't been called yet)
        if (!this.container) {
            console.log('🔧 PregnancyDrugsManager: Container not ready, skipping event listeners for now');
            return;
        }

        // Search functionality
        const searchInput = this.container.querySelector('.pregnancy-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.updateSearchResults();
            });
        }

        // Category filter buttons
        const categoryButtons = document.querySelectorAll('.pregnancy-category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category;
                this.filterDrugs();
                if (analytics) {
                    analytics.track('pregnancy_drugs_category_selected', { category: this.currentCategory });
                }
            });
        });

        // Favorite buttons
        this.container.querySelectorAll('.preg-card__fav').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const drugName = btn.dataset.drug;
                this.toggleFavorite(drugName);
            });
        });

        // Drug detail cards
        this.container.querySelectorAll('.preg-card').forEach(card => {
            card.addEventListener('click', () => {
                const drugName = card.dataset.drug;
                this.showDrugDetail(drugName);
            });
        });

        // Listen for global search
        if (this.eventBus) {
            this.eventBus.on('global-search-query', (query) => {
                this.searchTerm = query.toLowerCase();
                this.updateSearchResults();
            });
        }
    }

    async destroy() {
        if (this.eventBus) {
            this.eventBus.off('global-search-query');
        }
        this.initialized = false;
    }

    getStatistics() {
        const drugsSection = this.sections.find(s => s.drugs);
        const totalDrugs = drugsSection ? drugsSection.drugs.reduce((sum, cat) => sum + cat.list.length, 0) : 0;
        return {
            totalSections: this.sections.length,
            totalDrugs,
            version: this.version,
            lastUpdated: this.lastUpdated
        };
    }

    /**
     * Handle search from StandardizedSearchComponent
     */
    handleSearch(searchTerm, filter) {
        this.currentSearchTerm = searchTerm;
        this.currentFilter = filter;
        this.searchTerm = searchTerm.toLowerCase();
        if (this.container) {
            this.updateSearchResults();
        }
        console.log(`Pregnancy drugs search: "${searchTerm}" with filter: "${filter}"`);
    }

    /**
     * Handle filter change from StandardizedSearchComponent
     */
    handleFilter(filter, searchTerm) {
        this.currentFilter = filter;
        this.currentSearchTerm = searchTerm;
        this.searchTerm = searchTerm.toLowerCase();
        if (this.container) {
            this.updateSearchResults();
        }
        console.log(`Pregnancy drugs filter changed: "${filter}" with search: "${searchTerm}"`);
    }

    /**
     * Handle clear from StandardizedSearchComponent
     */
    handleClear() {
        this.currentSearchTerm = '';
        this.currentFilter = 'all';
        this.searchTerm = '';
        if (this.container) {
            this.updateSearchResults();
        }
        console.log('Pregnancy drugs search cleared');
    }
}

export const pregnancyDrugsManager = new PregnancyDrugsManager();
export default pregnancyDrugsManager;