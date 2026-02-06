class MSKInvestigationsManager {
    constructor() {
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.favoriteKey = 'msk_favorites';
        this.favorites = this.loadFavorites();
        
        this.investigations = this.buildInvestigations();
        this.init();
    }

    init() {
        this.ensureStyles();
        this.render();
        this.setupEventListeners();
        
        if (window.MLAQuizApp?.eventBus) {
            window.MLAQuizApp.eventBus.emit('sectionLoaded', 'MSK Investigations');
        }
    }

    buildInvestigations() {
        return [
            {
                badge: "🔬 MSK Tests & Findings",
                title: "MSK Investigations: Normal & Abnormal Findings",
                summary: "Comprehensive guide to MSK tests, their normal values, abnormal findings, clinical significance, and management",
                categories: [
                    {
                        title: "🩸 Essential Laboratory Tests",
                        investigations: [
                            {
                                name: "ESR (Erythrocyte Sedimentation Rate)",
                                normalRange: "Men: <age/2, Women: <(age+10)/2 mm/hr",
                                indications: "Suspected inflammatory arthritis, infection, malignancy, temporal arteritis",
                                abnormalFindings: {
                                    "Elevated ESR (>50mm/hr)": {
                                        significance: "Non-specific inflammatory response",
                                        causes: "RA, PMR, infection, malignancy, renal disease, pregnancy",
                                        firstLine: "Investigate underlying cause, repeat with CRP, clinical correlation essential"
                                    },
                                    "Very high ESR (>100mm/hr)": {
                                        significance: "Suggests serious underlying pathology",
                                        causes: "Temporal arteritis, malignancy, severe infection, myeloma",
                                        firstLine: "URGENT further investigation, consider temporal artery biopsy if >50 years"
                                    }
                                },
                                redFlags: "ESR >100mm/hr with visual symptoms - giant cell arteritis",
                                limitations: "Affected by age, gender, anaemia, pregnancy - less specific than CRP"
                            },
                            {
                                name: "CRP (C-Reactive Protein)",
                                normalRange: "<3 mg/L (varies by lab)",
                                indications: "Acute inflammation, infection, monitoring treatment response",
                                abnormalFindings: {
                                    "Moderately elevated (3-50 mg/L)": {
                                        significance: "Mild to moderate inflammatory response",
                                        causes: "Viral infection, mild bacterial infection, inflammatory arthritis flare",
                                        firstLine: "Clinical correlation, repeat in 1-2 weeks, investigate if persistent"
                                    },
                                    "Highly elevated (>50 mg/L)": {
                                        significance: "Significant inflammatory process",
                                        causes: "Bacterial infection, septic arthritis, severe inflammatory disease",
                                        firstLine: "Investigate infection source, blood cultures, consider antibiotics"
                                    },
                                    "Extreme elevation (>200 mg/L)": {
                                        significance: "Severe infection or inflammatory response",
                                        causes: "Sepsis, necrotizing fasciitis, severe bacterial infection",
                                        firstLine: "URGENT investigation, broad-spectrum antibiotics, intensive monitoring"
                                    }
                                },
                                redFlags: "CRP >200 mg/L - sepsis protocol, immediate assessment",
                                limitations: "Non-specific, can be normal in early infection or viral illness"
                            },
                            {
                                name: "Rheumatoid Factor (RF)",
                                normalRange: "<15 IU/mL (varies by lab)",
                                indications: "Suspected rheumatoid arthritis, Sjögren's syndrome, mixed connective tissue disease",
                                abnormalFindings: {
                                    "Positive RF (>15 IU/mL)": {
                                        significance: "Associated with rheumatoid arthritis but not specific",
                                        causes: "RA (70%), Sjögren's, SLE, elderly (5%), chronic infections, liver disease",
                                        firstLine: "Check anti-CCP antibodies, clinical assessment for RA criteria"
                                    },
                                    "High-titre RF (>100 IU/mL)": {
                                        significance: "More likely to be associated with RA, worse prognosis",
                                        causes: "RA with erosive disease, extra-articular manifestations",
                                        firstLine: "Early DMARD therapy, rheumatology referral, monitor for complications"
                                    }
                                },
                                patterns: "Over 99% of patients with SLE are ANA positive, therefore it is a useful rule out test",
                                limitations: "Present in 30% of RA patients, 5% of healthy elderly, non-specific"
                            },
                            {
                                name: "Anti-CCP Antibodies",
                                normalRange: "<20 units (varies by lab)",
                                indications: "Suspected RA, especially if RF negative, prognostic information",
                                abnormalFindings: {
                                    "Positive anti-CCP": {
                                        significance: "Highly specific for RA (95% specificity)",
                                        causes: "RA - associated with more aggressive, erosive disease",
                                        firstLine: "Early aggressive DMARD therapy, rheumatology referral within 6 weeks"
                                    },
                                    "High-titre anti-CCP": {
                                        significance: "Increased risk of joint damage and extra-articular features",
                                        causes: "RA with poor prognosis, higher disease activity",
                                        firstLine: "Combination DMARD therapy, biological agents consideration"
                                    }
                                },
                                limitations: "Can precede clinical RA by years, expensive test"
                            },
                            {
                                name: "Bone Profile (Calcium, Phosphate, ALP, PTH)",
                                normalRange: "Ca: 2.2-2.6 mmol/L, PO4: 0.8-1.4 mmol/L, ALP: 30-130 U/L, PTH: 1.1-6.8 pmol/L",
                                indications: "Suspected metabolic bone disease, monitoring bisphosphonate therapy",
                                abnormalFindings: {
                                    "Low Ca, Low PO4, Raised ALP, Raised PTH": {
                                        significance: "Classic pattern of osteomalacia",
                                        causes: "Vitamin D deficiency, malabsorption, renal disease, dietary insufficiency",
                                        firstLine: "Vitamin D replacement, investigate underlying cause, bone protection"
                                    },
                                    "Hypercalcemia": {
                                        significance: "May indicate malignancy, hyperparathyroidism, or granulomatous disease",
                                        causes: "Malignancy (most common), primary hyperparathyroidism, sarcoidosis, vitamin D toxicity",
                                        firstLine: "URGENT investigation if >3.0 mmol/L, PTH levels, imaging for malignancy"
                                    }
                                },
                                redFlags: "Hypocalcemia/vitamin D deficiency should be corrected before giving bisphosphonates",
                                limitations: "Multiple factors affect bone metabolism"
                            },
                            {
                                name: "Joint Aspiration & Synovial Fluid Analysis",
                                normalRange: "Clear, colourless, <200 WBC/μL, no crystals, negative culture",
                                indications: "Suspected septic arthritis, gout, pseudogout, inflammatory arthritis",
                                abnormalFindings: {
                                    "Purulent fluid, >50,000 WBC/μL": {
                                        significance: "Septic arthritis until proven otherwise",
                                        causes: "Bacterial infection (S. aureus most common), gonorrhea in young adults",
                                        firstLine: "URGENT IV antibiotics (flucloxacillin), surgical washout, joint protection"
                                    },
                                    "Needle-shaped, negatively birefringent crystals": {
                                        significance: "Monosodium urate crystals - confirms gout",
                                        causes: "Hyperuricemia, dietary factors, genetics, medications",
                                        firstLine: "Colchicine if NSAIDs contraindicated, then allopurinol after first attack"
                                    },
                                    "Rod-shaped, positively birefringent crystals": {
                                        significance: "Calcium pyrophosphate crystals - pseudogout/chondrocalcinosis",
                                        causes: "Age, previous trauma, haemochromatosis, hyperparathyroidism",
                                        firstLine: "NSAIDs, colchicine, intra-articular steroids, treat underlying causes"
                                    },
                                    "High WBC, predominantly PMNs, yellow cloudy": {
                                        significance: "Inflammatory arthritis (RA pattern)",
                                        causes: "RA, seronegative arthritis, crystal arthropathy",
                                        firstLine: "Joint aspirate shows high WBC count, predominantly PMNs with absence of crystals"
                                    }
                                },
                                redFlags: "In young adults with septic arthritis, Neisseria gonorrhoeae is the most common organism",
                                limitations: "Technical skill required, infection risk, may need repeat sampling"
                            }
                        ]
                    },
                    {
                        title: "📸 Essential Imaging Tests",
                        investigations: [
                            {
                                name: "X-rays (Plain Radiographs)",
                                normalRange: "Normal bone density, joint space preservation, no fractures or deformity",
                                indications: "Trauma evaluation, arthritis assessment, bone pain, deformity",
                                views: "Minimum 2 views (AP & lateral), additional oblique/specialized views as needed",
                                abnormalFindings: {
                                    "Fracture": {
                                        significance: "Bone discontinuity requiring specific management based on location/type",
                                        causes: "Trauma, osteoporosis, pathological (malignancy, infection)",
                                        firstLine: "Immobilization, analgesia, orthopedic referral. Fall onto outstretched hand (FOOSH) commonly results in Colle's fracture"
                                    },
                                    "Joint space narrowing": {
                                        significance: "Cartilage loss indicating osteoarthritis progression",
                                        causes: "Age-related degeneration, previous trauma, inflammatory arthritis",
                                        firstLine: "Activity modification, physiotherapy, NSAIDs, weight management"
                                    },
                                    "Osteophytes": {
                                        significance: "Bone spurs indicating degenerative joint disease",
                                        causes: "Chronic joint stress, age-related wear, genetic factors",
                                        firstLine: "Conservative management unless causing mechanical symptoms"
                                    },
                                    "Erosions": {
                                        significance: "Bone destruction typical of inflammatory arthritis",
                                        causes: "RA, psoriatic arthritis, infection, crystal arthropathy",
                                        firstLine: "Urgent rheumatology referral, early DMARD therapy"
                                    },
                                    "Sacroiliitis": {
                                        significance: "Inflammation of sacroiliac joints - ankylosing spondylitis",
                                        causes: "HLA-B27 associated spondyloarthropathy",
                                        firstLine: "Diagnosis of ankylosing spondylitis can be best supported by sacro-ilitis on pelvic X-ray"
                                    },
                                    "Subchondral sclerosis and squaring of lumbar vertebrae": {
                                        significance: "Ankylosing spondylitis - x-ray findings",
                                        causes: "Chronic inflammatory spondyloarthropathy with syndesmophyte formation",
                                        firstLine: "NSAIDs, physiotherapy, anti-TNF therapy, spine mobility exercises"
                                    }
                                },
                                redFlags: "X-rays should not be taken of obvious ankle injuries if neurovascular compromise is present - immediate reduction/stabilisation instead",
                                limitations: "Poor soft tissue detail, may miss early changes, 2D representation of 3D structure"
                            },
                            {
                                name: "MRI Scanning",
                                normalRange: "Normal signal intensity, no structural abnormalities, intact soft tissues",
                                indications: "Soft tissue injury, spinal pathology, early arthritis, osteomyelitis",
                                sequences: "T1, T2, STIR/fat-sat sequences, gadolinium enhancement when indicated",
                                abnormalFindings: {
                                    "Meniscal tear": {
                                        significance: "Horizontal, vertical, or complex tear affecting knee function",
                                        causes: "Acute injury (young), degenerative (>40), associated with ACL injury",
                                        firstLine: "MRI is the most appropriate imaging modality to diagnose meniscal tears"
                                    },
                                    "Bone marrow oedema": {
                                        significance: "High signal on STIR indicating bone stress, infection, or malignancy",
                                        causes: "Acute trauma, stress fracture, osteomyelitis, bone tumours",
                                        firstLine: "Investigate underlying cause, activity modification, specific treatment based on aetiology"
                                    },
                                    "Osteomyelitis changes": {
                                        significance: "Bone infection with marrow oedema and enhancement",
                                        causes: "Staphylococcus aureus most common, haematogenous or direct spread",
                                        firstLine: "Osteomyelitis: MRI is the imaging modality of choice. Long-term IV antibiotics"
                                    },
                                    "Disc degeneration/herniation": {
                                        significance: "Intervertebral disc pathology causing nerve compression",
                                        causes: "Age-related degeneration, trauma, genetic factors",
                                        firstLine: "Conservative management initially, surgical referral if neurological deficit"
                                    },
                                    "Spinal stenosis": {
                                        significance: "Narrowing of spinal canal causing neurogenic claudication",
                                        causes: "Degenerative changes, ligamentum flavum hypertrophy, disc bulging",
                                        firstLine: "Activity modification, physiotherapy, epidural injections, surgical decompression"
                                    }
                                },
                                redFlags: "Back pain with previous history of cancer is a red flag",
                                limitations: "Expensive, contraindications (pacemakers, claustrophobia), may show incidental findings"
                            },
                            {
                                name: "Ultrasound MSK",
                                normalRange: "Normal echogenicity, intact tendons/ligaments, no fluid collections",
                                indications: "Tendon pathology, guided injections, dynamic assessment, soft tissue masses",
                                technique: "High-frequency probe, multiple planes, dynamic assessment with movement",
                                abnormalFindings: {
                                    "Tendinopathy": {
                                        significance: "Tendon thickening with hypoechoic areas and possible tears",
                                        causes: "Overuse, aging, biomechanical factors, systemic disease",
                                        firstLine: "Load management, eccentric exercises, activity modification"
                                    },
                                    "Achilles rupture": {
                                        significance: "Complete or partial discontinuity of Achilles tendon",
                                        causes: "Acute loading of deconditioned tendon, fluoroquinolone use",
                                        firstLine: "Ultrasound is the initial imaging modality of choice for suspected Achilles tendon rupture"
                                    },
                                    "Rotator cuff tear": {
                                        significance: "Partial or full thickness tear affecting shoulder function",
                                        causes: "Degeneration, impingement, acute trauma, chronic overuse",
                                        firstLine: "Physiotherapy for partial tears, surgical consideration for full thickness tears"
                                    },
                                    "Joint effusion": {
                                        significance: "Fluid within joint space indicating inflammation or injury",
                                        causes: "Trauma, infection, inflammatory arthritis, crystal arthropathy",
                                        firstLine: "Investigate underlying cause, consider aspiration if large volume"
                                    }
                                },
                                redFlags: "Signs of infection, complete tendon rupture in active individuals",
                                limitations: "Operator dependent, limited penetration, cannot assess deep structures well"
                            }
                        ]
                    },
                    {
                        title: "⚠️ Red Flag Investigations",
                        investigations: [
                            {
                                name: "DEXA Scan (Bone Density)",
                                normalRange: "T-score >-1.0 (normal), -1.0 to -2.5 (osteopenia), <-2.5 (osteoporosis)",
                                indications: "Fracture risk assessment, monitoring osteoporosis treatment",
                                abnormalFindings: {
                                    "Osteoporosis (T-score <-2.5)": {
                                        significance: "Increased fracture risk, especially spine and hip",
                                        causes: "Post-menopause, steroid use, age, genetics, lifestyle factors",
                                        firstLine: "A postmenopausal woman who's had an osteoporotic vertebral fracture should be started on a bisphosphonate straight away - don't wait for a DEXA scan"
                                    },
                                    "Fragility fracture": {
                                        significance: "Fracture from minimal trauma indicating underlying bone weakness",
                                        causes: "Osteoporosis, osteomalacia, malignancy, hyperparathyroidism",
                                        firstLine: "Start alendronate in patients ≥75 years following a fragility fracture, without waiting for a DEXA scan"
                                    }
                                },
                                patterns: "Fragility fracture risk scores (QFracture/FRAX) can be used to guide the need for DEXA scanning",
                                redFlags: "Bisphosphonates are associated with an increased risk of atypical stress fractures"
                            }
                        ]
                    }
                ]
            },
            {
                badge: "🎯 Clinical Management Pearls",
                title: "Essential MSK Clinical Management",
                summary: "Critical clinical decision-making points and evidence-based management strategies",
                categories: [
                    {
                        title: "🦴 Fracture & Trauma Management",
                        investigations: [
                            {
                                name: "Ankle Injury Assessment",
                                indications: "Ankle trauma, pain, swelling, inability to bear weight",
                                patterns: "Ottawa ankle rules: bony tenderness over the malleoli zones OR an inability to walk four weight-bearing steps",
                                abnormalFindings: {
                                    "Ankle fracture": {
                                        significance: "Disruption of ankle mortise requiring urgent reduction",
                                        causes: "Inversion injury, high energy trauma, rotational forces",
                                        firstLine: "It is important to reduce an ankle fracture as soon as possible due to risk of damage to the skin"
                                    },
                                    "Ankle sprain": {
                                        significance: "Ligament injury, most commonly lateral ligament complex",
                                        causes: "Inversion of the foot is the most common mechanism of ankle sprain",
                                        firstLine: "RICE protocol, functional rehabilitation, consider physiotherapy"
                                    }
                                },
                                redFlags: "Neurovascular compromise requires immediate reduction, open fractures need urgent orthopaedic input"
                            },
                            {
                                name: "Hip Fracture Management",
                                indications: "Hip pain after fall, inability to weight bear, shortened externally rotated leg",
                                patterns: "Intracapsular vs extracapsular location affects blood supply and treatment choice",
                                abnormalFindings: {
                                    "Intertrochanteric fracture": {
                                        significance: "Extracapsular fracture with good blood supply",
                                        causes: "Osteoporotic bone, fall from standing height, elderly population",
                                        firstLine: "Dynamic hip screws are the preferred surgical management for intertrochanteric (extracapsular) proximal femoral fracture"
                                    },
                                    "Sciatic nerve injury": {
                                        significance: "Complication affecting foot dorsiflexion and sensation",
                                        causes: "Posterior hip dislocation, surgical trauma, prolonged pressure",
                                        firstLine: "Sciatic nerve injury is a common complication of posterior hip dislocation"
                                    }
                                },
                                redFlags: "Compartment syndrome most commonly associated with supracondylar and tibial shaft fractures"
                            },
                            {
                                name: "Scaphoid Fracture",
                                indications: "Wrist pain after FOOSH injury, anatomical snuffbox tenderness",
                                patterns: "High risk of non-union due to retrograde blood supply",
                                abnormalFindings: {
                                    "Suspected scaphoid fracture": {
                                        significance: "May not be visible on initial X-rays, high non-union risk",
                                        causes: "Fall onto outstretched hand, forced dorsiflexion of wrist",
                                        firstLine: "In the emergency department, suspected scaphoid fractures should be managed with immobilisation using a Futuro splint or standard below-elbow backslab before specialist review"
                                    }
                                },
                                redFlags: "Delayed diagnosis leads to non-union and long-term disability"
                            },
                            {
                                name: "Rib Fractures",
                                indications: "Chest trauma, localized chest wall pain, respiratory compromise",
                                patterns: "Most are managed conservatively, complications include pneumothorax and flail chest",
                                abnormalFindings: {
                                    "Simple rib fractures": {
                                        significance: "Usually heal well with conservative management",
                                        causes: "Direct trauma, coughing fits in elderly, pathological fractures",
                                        firstLine: "The majority of simple rib fractures are managed conservatively"
                                    },
                                    "Multiple rib fractures": {
                                        significance: "Risk of respiratory compromise and complications",
                                        causes: "High energy trauma, elderly osteoporotic bone",
                                        firstLine: "Nerve blocks may be considered if a rib fracture is not controlled by normal analgesia"
                                    }
                                },
                                patterns: "Marfan's syndrome is associated with repeated pneumothoraces"
                            }
                        ]
                    },
                    {
                        title: "💊 Arthritis & Inflammatory Management",
                        title: "💊 Arthritis & Inflammatory Management",
                        investigations: [
                            {
                                name: "Rheumatoid Arthritis Management",
                                indications: "Symmetrical polyarthritis, morning stiffness >1hr, positive RF/anti-CCP",
                                patterns: "Early aggressive treatment improves long-term outcomes",
                                abnormalFindings: {
                                    "New diagnosis RA": {
                                        significance: "Autoimmune inflammatory arthritis requiring immediate treatment",
                                        causes: "Genetic predisposition, environmental triggers, molecular mimicry",
                                        firstLine: "Rheumatoid arthritis: initial management is conventional DMARD monotherapy (usually methotrexate), often with short-term bridging corticosteroid"
                                    },
                                    "RA flare": {
                                        significance: "Increased disease activity requiring anti-inflammatory treatment",
                                        causes: "Inadequate disease control, stress, infection, medication non-compliance",
                                        firstLine: "Intramuscular steroids such as methylprednisolone are used to manage the acute flares of rheumatoid arthritis"
                                    },
                                    "Bilateral carpal tunnel syndrome": {
                                        significance: "Common complication of RA due to synovial inflammation",
                                        causes: "Synovial thickening in carpal tunnel, joint deformities",
                                        firstLine: "Rheumatoid arthritis is a common cause of bilateral carpal tunnel syndrome"
                                    },
                                    "Methotrexate monitoring": {
                                        significance: "Essential to prevent serious side effects",
                                        causes: "Hepatotoxicity, myelosuppression, mucositis potential",
                                        firstLine: "Methotrexate may cause hepatotoxicity - monitor LFTs. Prescribing folate with methotrexate reduces the risk of myelosuppression"
                                    }
                                },
                                redFlags: "It is important to perform a chest X-ray to look for TB prior to starting biologics for rheumatoid arthritis as they can cause reactivation",
                                patterns: "Folinic acid is the treatment of choice for methotrexate toxicity"
                            },
                            {
                                name: "Gout Management", 
                                indications: "1st metatarsophalangeal (MTP) joint pain and swelling → ? gout",
                                patterns: "Acute treatment different from long-term prevention",
                                abnormalFindings: {
                                    "Acute gout attack": {
                                        significance: "Intense inflammatory response to uric acid crystals",
                                        causes: "Hyperuricemia, dietary triggers, dehydration, medications",
                                        firstLine: "Colchicine should be used to treat acute gout if NSAIDs are contraindicated for example a peptic ulcer"
                                    },
                                    "First gout attack": {
                                        significance: "High likelihood of recurrence without prevention",
                                        causes: "Uric acid overproduction or underexcretion",
                                        firstLine: "Offer allopurinol to all patients after their first attack of gout"
                                    },
                                    "Reactive arthritis": {
                                        significance: "Post-infectious arthritis, not typically acute onset",
                                        causes: "Previous GI or GU infection, HLA-B27 association",
                                        firstLine: "Reactive arthritis is not typically acute - it can develop up to 4 weeks after precipitating infection and can run a relapsing-remitting course over several months. Acute reactive arthritis can be treated with NSAIDs, as long as there are no contraindications"
                                    }
                                },
                                patterns: "Haemochromatosis is a risk factor for pseudogout"
                            },
                            {
                                name: "Osteoarthritis Management",
                                indications: "Joint pain worse with activity, morning stiffness <30 minutes, crepitus",
                                patterns: "Conservative management first-line, topical before oral NSAIDs",
                                abnormalFindings: {
                                    "Hand osteoarthritis": {
                                        significance: "Common pattern affecting specific joints",
                                        causes: "Age, genetics, previous trauma, occupational factors",
                                        firstLine: "Carpometacarpal and distal interphalangeal joint involvement is characteristic of hand osteoarthritis. Squaring of the thumbs is a characteristic feature"
                                    },
                                    "Knee osteoarthritis": {
                                        significance: "Weight-bearing joint requiring specific management approach",
                                        causes: "Age, obesity, previous injury, mechanical alignment",
                                        firstLine: "Knee osteoarthritis - topical NSAIDs are first-line"
                                    }
                                },
                                patterns: "Bouchard's nodes (PIP) and Heberden's nodes (DIP) are characteristic of hand OA"
                            },
                            {
                                name: "Psoriatic Arthritis",
                                indications: "Asymmetrical arthritis, psoriatic skin changes, nail involvement",
                                patterns: "Several patterns: oligoarticular, polyarticular, axial, distal",
                                abnormalFindings: {
                                    "Moderate/severe psoriatic arthropathy": {
                                        significance: "Progressive joint destruction requiring DMARD therapy",
                                        causes: "Autoimmune process affecting skin and joints",
                                        firstLine: "Moderate/severe psoriatic arthropathy → methotrexate"
                                    }
                                },
                                redFlags: "Erosive arthritis, axial involvement, severe skin disease"
                            },
                            {
                                name: "Ankylosing Spondylitis",
                                indications: "Inflammatory back pain, morning stiffness, young male",
                                patterns: "Progressive spinal fusion, HLA-B27 positive in 90%",
                                abnormalFindings: {
                                    "Clinical findings": {
                                        significance: "Reduced spine mobility in multiple planes",
                                        causes: "Chronic inflammation leading to ankylosis",
                                        firstLine: "Clinical findings in ankylosing spondylitis include reduced chest expansion, reduced lateral flexion and reduced forward flexion (Schober's test)"
                                    },
                                    "Radiological changes": {
                                        significance: "Structural changes confirming diagnosis",
                                        causes: "Chronic enthesitis and syndesmophyte formation",
                                        firstLine: "Ankylosing spondylitis - x-ray findings: subchondral erosions, sclerosis and squaring of lumbar vertebrae"
                                    }
                                },
                                patterns: "Diagnosis of ankylosing spondylitis can be best supported by sacro-ilitis on a pelvic X-ray"
                            },
                            {
                                name: "Giant Cell Arteritis",
                                indications: "Temporal headache, jaw claudication, visual symptoms, age >50",
                                patterns: "Medical emergency if visual symptoms present",
                                abnormalFindings: {
                                    "Suspected GCA": {
                                        significance: "Risk of permanent visual loss if untreated",
                                        causes: "Large vessel vasculitis, genetic and environmental factors",
                                        firstLine: "Glucocorticoids should be given once a diagnosis of giant cell arteritis is suspected - don't wait for the temporal artery biopsy etc"
                                    },
                                    "Visual loss": {
                                        significance: "Anterior ischemic optic neuropathy - ophthalmological emergency",
                                        causes: "Arterial occlusion due to giant cell arteritis",
                                        firstLine: "Patients with suspected visual loss secondary to giant cell arteritis are usually given IV methylprednisolone initially. Anterior ischemic optic neuropathy - fundoscopy typically shows a swollen pale disc and blurred margins"
                                    }
                                },
                                redFlags: "Visual symptoms, jaw claudication, ESR >100 in elderly patient"
                            }
                        ]
                    },
                    {
                        title: "🚨 Septic Arthritis & Infection",
                        investigations: [
                            {
                                name: "Septic Arthritis Management",
                                indications: "Hot, swollen, tender joint, fever, systemic upset",
                                patterns: "Joint destruction occurs rapidly, early treatment crucial",
                                abnormalFindings: {
                                    "Suspected septic arthritis": {
                                        significance: "Joint destruction within hours, medical emergency",
                                        causes: "Staphylococcus aureus most common, haematogenous or direct spread",
                                        firstLine: "Septic arthritis: IV flucloxacillin"
                                    },
                                    "Young adult septic arthritis": {
                                        significance: "Different organism profile in sexually active adults",
                                        causes: "Neisseria gonorrhoeae more common in young adults",
                                        firstLine: "In young adults with septic arthritis, Neisseria gonorrhoeae is the most common organism found"
                                    }
                                },
                                redFlags: "Any red, hot, swollen joint requires urgent assessment and joint aspiration"
                            },
                            {
                                name: "Osteomyelitis & Discitis",
                                indications: "Bone pain, fever, systemic upset, risk factors for infection",
                                patterns: "Chronic infection requiring prolonged antibiotic therapy",
                                abnormalFindings: {
                                    "Osteomyelitis": {
                                        significance: "Bone infection requiring early recognition and treatment",
                                        causes: "Staphylococcus aureus is the most common cause of osteomyelitis",
                                        firstLine: "Long-term IV antibiotics, surgical debridement if indicated"
                                    },
                                    "Discitis": {
                                        significance: "Spinal infection that can cause cord compression",
                                        causes: "Staphylococcus aureus is the most common cause of discitis",
                                        firstLine: "IV antibiotics, immobilization, urgent spinal surgery if neurological compromise"
                                    }
                                },
                                patterns: "MRI is imaging of choice for both osteomyelitis and discitis"
                            }
                        ]
                    },
                    {
                        title: "💀 Bone Protection & Metabolism",
                        investigations: [
                            {
                                name: "Osteoporosis Management",
                                indications: "Fragility fracture, high risk factors, DEXA showing osteoporosis",
                                patterns: "Prevention better than cure, immediate treatment for fragility fractures",
                                abnormalFindings: {
                                    "Post-menopausal osteoporotic fracture": {
                                        significance: "Indicates established osteoporosis requiring immediate treatment",
                                        causes: "Estrogen deficiency, age, genetics, lifestyle factors",
                                        firstLine: "A postmenopausal woman who's had an osteoporotic vertebral fracture should be started on a bisphosphonate straight away - don't wait for a DEXA scan"
                                    },
                                    "Elderly fragility fracture": {
                                        significance: "High risk of further fractures within first year",
                                        causes: "Osteoporosis, falls risk, comorbidities",
                                        firstLine: "Start alendronate in patients ≥75 years following a fragility fracture, without waiting for a DEXA scan"
                                    },
                                    "Steroid-induced osteoporosis": {
                                        significance: "Rapid bone loss with steroid therapy",
                                        causes: "Suppressed osteoblast activity, increased osteoclast activity",
                                        firstLine: "Bone protection for patients who are going to take long-term steroids should start immediately"
                                    },
                                    "Osteomalacia": {
                                        significance: "Vitamin D deficiency causing bone pain and proximal weakness",
                                        causes: "Inadequate sun exposure, dietary deficiency, malabsorption",
                                        firstLine: "Bone pain, tenderness and proximal myopathy (→ waddling gait) → ?osteomalacia. Vitamin D replacement therapy"
                                    }
                                },
                                redFlags: "Hypocalcemia/vitamin D deficiency should be corrected before giving bisphosphonates"
                            }
                        ]
                    },
                    {
                        title: "🔍 Nerve & Soft Tissue Conditions",
                        investigations: [
                            {
                                name: "Carpal Tunnel Syndrome",
                                indications: "Numbness/tingling in median nerve distribution, night symptoms",
                                patterns: "Conservative treatment first, especially in pregnancy",
                                abnormalFindings: {
                                    "Positive Phalen's test": {
                                        significance: "Provocative test confirming median nerve compression",
                                        causes: "Synovial thickening, pregnancy, RA, diabetes, hypothyroidism",
                                        firstLine: "Phalen's test is used to assess carpal tunnel syndrome. The patient's wrist is held in maximum flexion (reverse prayer sign) for 30-60 seconds. The test is positive if there is numbness in the median nerve distribution"
                                    },
                                    "Mild-moderate CTS": {
                                        significance: "Symptoms may respond to conservative treatment",
                                        causes: "Compression of median nerve in carpal tunnel",
                                        firstLine: "Carpal tunnel syndrome: a trial of conservative treatment (wrist splint +/- steroid injection) should be tried initially for patients with mild-moderate symptoms"
                                    },
                                    "CTS in pregnancy": {
                                        significance: "Often resolves after delivery, avoid surgery",
                                        causes: "Fluid retention and hormonal changes",
                                        firstLine: "Wrist splinting is a particularly useful and effective treatment for carpal tunnel syndrome in pregnancy, as symptoms may settle following delivery"
                                    }
                                },
                                patterns: "Rheumatoid arthritis is a common cause of bilateral carpal tunnel syndrome"
                            },
                            {
                                name: "Sciatica & Radiculopathy",
                                indications: "Leg pain in dermatomal distribution, back pain with radiation",
                                patterns: "Conservative treatment first, surgery if persistent neurological deficit",
                                abnormalFindings: {
                                    "L5 radiculopathy": {
                                        significance: "Specific pattern of weakness and sensory loss",
                                        causes: "Disc herniation, spinal stenosis, nerve compression",
                                        firstLine: "L5 lesion features = loss of foot dorsiflexion + sensory loss dorsum of the foot"
                                    },
                                    "S1 radiculopathy": {
                                        significance: "Different pattern affecting plantar flexion and reflexes",
                                        causes: "Disc herniation at L5/S1 level, lateral recess stenosis",
                                        firstLine: "S1 lesion features = Sensory loss of posterolateral aspect of leg and lateral aspect of foot, weakness in plantar flexion of foot, reduced ankle reflex, positive sciatic nerve stretch test"
                                    },
                                    "Persistent sciatica": {
                                        significance: "Failed conservative treatment may need surgical assessment",
                                        causes: "Ongoing nerve compression, inflammatory response",
                                        firstLine: "A referral for sciatica is appropriate after 4-6 weeks of conservative treatment (analgesia and physiotherapy) has failed"
                                    }
                                },
                                patterns: "Radiculopathy follows a dermatomal distribution, unlike named nerve pathology"
                            },
                            {
                                name: "Tendon Conditions",
                                indications: "Localized tendon pain, swelling, functional impairment",
                                patterns: "Load management and eccentric exercises are key treatments",
                                abnormalFindings: {
                                    "De Quervain's tenosynovitis": {
                                        significance: "Inflammation of thumb extensors and abductors",
                                        causes: "Repetitive thumb movements, pregnancy, inflammatory conditions",
                                        firstLine: "De Quervain's tenosynovitis: inflammation of the sheath containing the extensor pollicis brevis and abductor pollicis longus tendons"
                                    },
                                    "Lateral epicondylitis": {
                                        significance: "Tennis elbow - common extensor origin tendinopathy",
                                        causes: "Overuse, poor technique, repetitive wrist extension",
                                        firstLine: "Lateral epicondylitis: worse on resisted wrist extension/supination whilst elbow extended"
                                    },
                                    "Frozen shoulder": {
                                        significance: "Adhesive capsulitis with progressive stiffness",
                                        causes: "Idiopathic, diabetes, thyroid disease, immobilization",
                                        firstLine: "External rotation (on both active and passive movement) is classically impaired in adhesive capsulitis"
                                    },
                                    "Meralgia paraesthetica": {
                                        significance: "Lateral femoral cutaneous nerve compression",
                                        causes: "Tight clothing, obesity, pregnancy, diabetes",
                                        firstLine: "Meralgia paraesthetica causes pain in the lateral cutaneous nerve of the thigh distribution"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        title: "🔬 Systemic Connective Tissue Conditions",
                        investigations: [
                            {
                                name: "Polymyositis & Dermatomyositis",
                                indications: "Proximal muscle weakness, raised CK, skin changes",
                                patterns: "High malignancy association, especially dermatomyositis",
                                abnormalFindings: {
                                    "Polymyositis": {
                                        significance: "Inflammatory muscle disease without skin involvement",
                                        causes: "Autoimmune inflammatory myopathy",
                                        firstLine: "Proximal muscle weakness + raised CK + no rash → ?polymyositis"
                                    },
                                    "New dermatomyositis": {
                                        significance: "Strong association with underlying malignancy",
                                        causes: "Paraneoplastic syndrome or idiopathic autoimmune",
                                        firstLine: "In patients with a new diagnosis of dermatomyositis, urgent malignancy screen is needed"
                                    }
                                },
                                redFlags: "New dermatomyositis requires urgent cancer screening"
                            },
                            {
                                name: "Drug-Induced MSK Conditions",
                                indications: "New symptoms after starting medications, medication history review",
                                patterns: "Important to recognize drug-related causes",
                                abnormalFindings: {
                                    "Hydroxychloroquine retinopathy": {
                                        significance: "Irreversible retinal damage with antimalarial",
                                        causes: "Cumulative dose-related toxicity",
                                        firstLine: "Hydroxychloroquine - may result in a severe and permanent retinopathy"
                                    },
                                    "Sulfasalazine allergy": {
                                        significance: "Cross-reactivity with aspirin allergies",
                                        causes: "Sulfonamide component causing allergic reaction",
                                        firstLine: "Patients who are allergic to aspirin may also react to sulfasalazine"
                                    }
                                },
                                patterns: "Always consider medication side effects in new symptoms"
                            },
                            {
                                name: "Chronic Fatigue & Vasculitis",
                                indications: "Unexplained fatigue, systemic symptoms, multi-organ involvement",
                                patterns: "Systemic conditions requiring multidisciplinary approach",
                                abnormalFindings: {
                                    "Chronic fatigue syndrome": {
                                        significance: "Disabling fatigue lasting >3 months",
                                        causes: "Unknown etiology, post-viral triggers possible",
                                        firstLine: "Chronic fatigue syndrome: the symptoms should be present for 3 months before making a diagnosis"
                                    },
                                    "ANCA-associated vasculitis": {
                                        significance: "Systemic necrotizing vasculitis affecting multiple organs",
                                        causes: "Granulomatosis with polyangiitis, microscopic polyangiitis, eosinophilic GPA",
                                        firstLine: "Renal impairment, respiratory symptoms, joint pain, systemic features → consider ANCA associated vasculitis"
                                    }
                                }
                            },
                            {
                                name: "Genetic Connective Tissue Disorders",
                                indications: "Family history, unusual features, multiple system involvement",
                                patterns: "Often multisystem involvement with MSK manifestations",
                                abnormalFindings: {
                                    "Ehlers-Danlos syndrome": {
                                        significance: "Connective tissue disorder with cardiovascular risks",
                                        causes: "Genetic collagen defects affecting multiple systems",
                                        firstLine: "Ehlers-Danlos is associated with an increased risk of aortic dissection"
                                    },
                                    "Marfan syndrome": {
                                        significance: "Connective tissue disorder with pulmonary complications",
                                        causes: "Fibrillin-1 gene mutations affecting connective tissue",
                                        firstLine: "Marfan's syndrome is associated with repeated pneumothoraces"
                                    }
                                }
                            },
                            {
                                name: "Bone Tumours",
                                indications: "Unexplained bone pain, pathological fracture, suspicious imaging",
                                patterns: "Age distribution helps differentiate primary tumours",
                                abnormalFindings: {
                                    "Osteosarcoma": {
                                        significance: "Most common primary bone malignancy in children/young adults",
                                        causes: "Unknown, possible genetic factors, radiation exposure",
                                        firstLine: "Osteosarcoma - malignant tumour that occurs most frequently in the metaphyseal region of long bones prior to epiphyseal closure"
                                    },
                                    "Suspicious bone lesion in child": {
                                        significance: "High index of suspicion needed for bone sarcomas",
                                        causes: "Primary bone tumours more common in children",
                                        firstLine: "Consider a very urgent (<48hr) referral for specialist assessment of children and young people with an X-ray which could suggest bone sarcoma"
                                    }
                                },
                                redFlags: "Bone pain in children, pathological fractures, rapid growth of lesions"
                            }
                        ]
                    }
                ]
            },
            {
                badge: "⚡ Emergency MSK",
                title: "MSK Emergencies & Trauma",
                summary: "Time-critical musculoskeletal conditions requiring immediate assessment and management",
                categories: [
                    {
                        title: "Fracture Complications",
                        investigations: [
                            {
                                name: "Compartment Syndrome",
                                indications: "Severe limb pain, swelling, neurological symptoms after trauma or surgery",
                                abnormalFindings: {
                                    "Acute compartment syndrome": {
                                        significance: "Surgical emergency - tissue death within 6 hours",
                                        causes: "Fractures (supracondylar, tibial shaft), burns, vascular injury",
                                        firstLine: "URGENT fasciotomy within 6 hours, pain relief, elevate limb"
                                    }
                                },
                                redFlags: "Compartment syndrome is most commonly associated with supracondylar and tibial shaft fractures"
                            }
                        ]
                    }
                ]
            },
            {
                badge: "🩸 Laboratory",
                title: "MSK Laboratory Investigations",
                summary: "Blood tests for inflammatory, autoimmune and metabolic bone conditions",
                categories: [
                    {
                        title: "Inflammatory Markers",
                        investigations: [
                            {
                                name: "ESR (Erythrocyte Sedimentation Rate)",
                                normalRange: "Men: <age/2, Women: <(age+10)/2 mm/hr",
                                indications: "Suspected inflammatory arthritis, infection, malignancy, temporal arteritis",
                                abnormalFindings: {
                                    "Elevated ESR (>50mm/hr)": {
                                        significance: "Non-specific inflammatory response",
                                        causes: "RA, PMR, infection, malignancy, renal disease, pregnancy",
                                        firstLine: "Investigate underlying cause, repeat with CRP, clinical correlation essential"
                                    },
                                    "Very high ESR (>100mm/hr)": {
                                        significance: "Suggests serious underlying pathology",
                                        causes: "Temporal arteritis, malignancy, severe infection, myeloma",
                                        firstLine: "URGENT further investigation, consider temporal artery biopsy if >50 years"
                                    }
                                },
                                limitations: "Affected by age, gender, anaemia, pregnancy - less specific than CRP"
                            },
                            {
                                name: "CRP (C-Reactive Protein)",
                                normalRange: "<3 mg/L (varies by lab)",
                                indications: "Acute inflammation, infection, monitoring treatment response",
                                abnormalFindings: {
                                    "Moderately elevated (3-50 mg/L)": {
                                        significance: "Mild to moderate inflammatory response",
                                        causes: "Viral infection, mild bacterial infection, inflammatory arthritis flare",
                                        firstLine: "Clinical correlation, repeat in 1-2 weeks, investigate if persistent"
                                    },
                                    "Highly elevated (>50 mg/L)": {
                                        significance: "Significant inflammatory process",
                                        causes: "Bacterial infection, septic arthritis, severe inflammatory disease",
                                        firstLine: "Investigate infection source, blood cultures, consider antibiotics"
                                    },
                                    "Extreme elevation (>200 mg/L)": {
                                        significance: "Severe infection or inflammatory response",
                                        causes: "Sepsis, necrotizing fasciitis, severe bacterial infection",
                                        firstLine: "URGENT investigation, broad-spectrum antibiotics, intensive monitoring"
                                    }
                                },
                                limitations: "Non-specific, can be normal in early infection or viral illness"
                            }
                        ]
                    },
                    {
                        title: "Autoimmune Markers",
                        investigations: [
                            {
                                name: "Rheumatoid Factor (RF)",
                                normalRange: "<15 IU/mL (varies by lab)",
                                indications: "Suspected rheumatoid arthritis, Sjögren's syndrome, mixed connective tissue disease",
                                abnormalFindings: {
                                    "Positive RF (>15 IU/mL)": {
                                        significance: "Associated with rheumatoid arthritis but not specific",
                                        causes: "RA (70%), Sjögren's, SLE, elderly (5%), chronic infections, liver disease",
                                        firstLine: "Check anti-CCP antibodies, clinical assessment for RA criteria"
                                    },
                                    "High-titre RF (>100 IU/mL)": {
                                        significance: "More likely to be associated with RA, worse prognosis",
                                        causes: "RA with erosive disease, extra-articular manifestations",
                                        firstLine: "Early DMARD therapy, rheumatology referral, monitor for complications"
                                    }
                                },
                                limitations: "Present in 30% of RA patients, 5% of healthy elderly, non-specific"
                            },
                            {
                                name: "Anti-CCP Antibodies",
                                normalRange: "<20 units (varies by lab)",
                                indications: "Suspected RA, especially if RF negative, prognostic information",
                                abnormalFindings: {
                                    "Positive anti-CCP": {
                                        significance: "Highly specific for RA (95% specificity)",
                                        causes: "RA - associated with more aggressive, erosive disease",
                                        firstLine: "Early aggressive DMARD therapy, rheumatology referral within 6 weeks"
                                    },
                                    "High-titre anti-CCP": {
                                        significance: "Increased risk of joint damage and extra-articular features",
                                        causes: "RA with poor prognosis, higher disease activity",
                                        firstLine: "Combination DMARD therapy, biological agents consideration"
                                    }
                                },
                                limitations: "Can precede clinical RA by years, expensive test"
                            },
                            {
                                name: "ANA (Antinuclear Antibodies)",
                                normalRange: "<1:80 titre (varies by lab)",
                                indications: "Suspected SLE, systemic sclerosis, Sjögren's syndrome, drug-induced lupus",
                                abnormalFindings: {
                                    "Positive ANA (>1:80)": {
                                        significance: "Screening test for autoimmune connective tissue disease",
                                        causes: "SLE, systemic sclerosis, Sjögren's, drug-induced lupus, 5% normal population",
                                        firstLine: "ENA screen if clinically indicated, clinical correlation essential"
                                    },
                                    "High-titre ANA (>1:320)": {
                                        significance: "More likely to be clinically significant",
                                        causes: "SLE (95% positive), systemic sclerosis, mixed CTD",
                                        firstLine: "Specific antibody testing (dsDNA, ENA), complement levels"
                                    }
                                },
                                patterns: "Homogeneous (dsDNA), Nucleolar (Scl-70), Speckled (Sm, SSA/SSB)",
                                limitations: "Positive in 5% normal population, requires clinical correlation"
                            }
                        ]
                    },
                    {
                        title: "Crystal Arthropathy",
                        investigations: [
                            {
                                name: "Serum Uric Acid",
                                normalRange: "Men: 200-430 μmol/L, Women: 140-360 μmol/L",
                                indications: "Suspected gout, recurrent monoarthritis, kidney stones, family history",
                                abnormalFindings: {
                                    "Hyperuricaemia (>420 μmol/L men, >360 μmol/L women)": {
                                        significance: "Risk factor for gout but can be normal during acute attack",
                                        causes: "Increased production (purines, cell turnover) or decreased excretion (renal impairment)",
                                        firstLine: "Lifestyle modification, treat if recurrent attacks or tophi present"
                                    },
                                    "Severe hyperuricaemia (>600 μmol/L)": {
                                        significance: "High risk of gout attacks, tophi formation, kidney stones",
                                        causes: "Genetic factors, myeloproliferative disease, chemotherapy, severe renal impairment",
                                        firstLine: "Allopurinol initiation (after acute attack settled), lifestyle advice"
                                    }
                                },
                                limitations: "Can be normal during acute gout attack, doesn't diagnose gout alone"
                            },
                            {
                                name: "Synovial Fluid Analysis",
                                normalRange: "Clear, viscous, WBC <200/μL, no crystals",
                                indications: "Acute monoarthritis, suspected septic arthritis, crystal arthropathy diagnosis",
                                abnormalFindings: {
                                    "Uric acid crystals (negatively birefringent)": {
                                        significance: "Diagnostic of gout",
                                        causes: "Hyperuricaemia leading to crystal deposition in synovium",
                                        firstLine: "NSAIDs, colchicine, or oral steroids for acute attack"
                                    },
                                    "Calcium pyrophosphate crystals (weakly positive birefringent)": {
                                        significance: "Diagnostic of pseudogout (CPPD arthropathy)",
                                        causes: "Age-related, hyperparathyroidism, hemochromatosis, hypomagnesemia",
                                        firstLine: "NSAIDs or intra-articular steroid injection, treat underlying cause"
                                    },
                                    "Purulent fluid (WBC >50,000/μL)": {
                                        significance: "Septic arthritis until proven otherwise",
                                        causes: "Bacterial infection (S.aureus, streptococci, gram-negatives)",
                                        firstLine: "URGENT IV antibiotics, surgical washout, blood cultures"
                                    }
                                },
                                redFlags: "Purulent appearance, gram-positive organisms, very high WBC count"
                            }
                        ]
                    }
                ]
            },
            {
                badge: "🔍 Specific Conditions",
                title: "Common MSK Conditions & Investigation Pathways",
                summary: "Evidence-based investigation and management of specific musculoskeletal conditions",
                categories: [
                    {
                        title: "Spinal Conditions",
                        investigations: [
                            {
                                name: "Mechanical Low Back Pain",
                                indications: "Most common cause of back pain (85-90%), diagnosis of exclusion",
                                clinicalFeatures: "Age 20-55, mechanical triggers, no red flags, improves with movement/rest",
                                abnormalFindings: {
                                    "Acute phase (<6 weeks)": {
                                        significance: "Usually self-limiting, avoid unnecessary imaging",
                                        causes: "Muscle strain, ligament sprain, minor disc disruption, facet joint irritation",
                                        firstLine: "Analgesia (paracetamol, NSAIDs), activity modification, early mobilization"
                                    },
                                    "Chronic phase (>12 weeks)": {
                                        significance: "May need imaging to exclude structural causes",
                                        causes: "Disc degeneration, facet arthropathy, spinal stenosis, psychological factors",
                                        firstLine: "MRI spine, physiotherapy, CBT, consider facet/epidural injections"
                                    },
                                    "Recurrent episodes": {
                                        significance: "Pattern suggests underlying predisposing factor",
                                        causes: "Poor core stability, occupational factors, disc pathology, lifestyle",
                                        firstLine: "Core strengthening, ergonomic assessment, weight management, physio"
                                    }
                                },
                                redFlags: "Age >50 with new pain, cancer history, fever, neurological deficit, sphincter dysfunction",
                                investigations: "Usually clinical diagnosis. MRI only if red flags or failed conservative treatment >6 weeks"
                            },
                            {
                                name: "Cervical Radiculopathy",
                                indications: "Neck pain with arm symptoms, neurological deficit, failed conservative treatment",
                                clinicalFeatures: "Dermatomal pain, motor weakness, reflex changes, positive Spurling's test",
                                abnormalFindings: {
                                    "C6 radiculopathy (most common)": {
                                        significance: "C5/6 disc causing C6 nerve root compression",
                                        causes: "Posterolateral disc prolapse, facet hypertrophy, osteophytes",
                                        firstLine: "Physiotherapy, NSAIDs, neuropathic agents, cervical traction"
                                    },
                                    "Myelopathy signs": {
                                        significance: "Spinal cord compression - urgent investigation needed",
                                        causes: "Central disc prolapse, spinal stenosis, ligamentum flavum hypertrophy",
                                        firstLine: "URGENT MRI cervical spine, neurosurgical referral, avoid manipulation"
                                    },
                                    "Hoffman's sign positive": {
                                        significance: "Upper motor neuron sign suggesting myelopathy",
                                        causes: "Cervical cord compression, central disc prolapse, severe stenosis",
                                        firstLine: "URGENT MRI, neurological examination, neurosurgical opinion"
                                    }
                                },
                                redFlags: "Myelopathy signs, bilateral symptoms, sphincter disturbance, fever",
                                investigations: "MRI cervical spine (T1, T2, STIR sequences), nerve conduction studies if multiple levels"
                            },
                            {
                                name: "Cauda Equina Syndrome",
                                indications: "Emergency diagnosis - bilateral leg pain, saddle anaesthesia, sphincter dysfunction",
                                clinicalFeatures: "Bilateral sciatica, saddle numbness, urinary retention, anal sphincter weakness",
                                abnormalFindings: {
                                    "Acute onset (<24 hours)": {
                                        significance: "Surgical emergency - permanent damage if delayed",
                                        causes: "Large central disc prolapse (L4/5 or L5/S1), tumor, abscess, trauma",
                                        firstLine: "IMMEDIATE MRI lumbar spine, urgent surgical decompression within 48hrs"
                                    },
                                    "Chronic/progressive onset": {
                                        significance: "May be chronic cauda equina or other pathology",
                                        causes: "Spinal stenosis, tumor compression, chronic disc disease",
                                        firstLine: "Urgent MRI, surgical assessment, may be less time-critical"
                                    },
                                    "Post-void residual >200ml": {
                                        significance: "Objective evidence of neurogenic bladder dysfunction",
                                        causes: "Parasympathetic nerve damage from cauda equina compression",
                                        firstLine: "Bladder catheter, urgent surgical decompression"
                                    }
                                },
                                redFlags: "ALL findings are red flags - this IS the red flag diagnosis",
                                investigations: "EMERGENCY MRI lumbar spine (within 4 hours if possible), bladder scan, urgent surgical opinion"
                            }
                        ]
                    },
                    {
                        title: "Joint Conditions",
                        investigations: [
                            {
                                name: "Septic Arthritis",
                                indications: "Hot, swollen joint with systemic illness, immunocompromised patient, prosthetic joint",
                                clinicalFeatures: "Severe joint pain, restricted movement, fever, systemically unwell",
                                abnormalFindings: {
                                    "Synovial WBC >50,000/μL": {
                                        significance: "Highly suggestive of septic arthritis",
                                        causes: "Bacterial infection (S.aureus, Streptococci, N.gonorrhoeae, gram-negatives)",
                                        firstLine: "URGENT IV antibiotics (flucloxacillin + gentamicin), surgical washout"
                                    },
                                    "Synovial glucose <50% serum": {
                                        significance: "Bacterial consumption of glucose in joint",
                                        causes: "Active bacterial metabolism within synovial fluid",
                                        firstLine: "Confirms need for urgent antimicrobial therapy"
                                    },
                                    "Positive gram stain/culture": {
                                        significance: "Definitive diagnosis, guides antibiotic choice",
                                        causes: "Identifies causative organism and sensitivities",
                                        firstLine: "Targeted antibiotic therapy based on culture results"
                                    },
                                    "Prosthetic joint infection": {
                                        significance: "More difficult to treat, biofilm formation",
                                        causes: "Early (<3 months): S.aureus, S.epidermidis. Late: S.epidermidis",
                                        firstLine: "Prolonged antibiotics, often requires revision surgery"
                                    }
                                },
                                redFlags: "Fever, systemic illness, prosthetic joint, inability to weight bear",
                                investigations: "URGENT joint aspiration, synovial fluid microscopy/culture, blood cultures, inflammatory markers"
                            },
                            {
                                name: "Osteoarthritis",
                                indications: "Joint pain worse with activity, morning stiffness <30 mins, joint deformity",
                                clinicalFeatures: "Activity-related pain, crepitus, reduced range of motion, joint enlargement",
                                abnormalFindings: {
                                    "Joint space narrowing": {
                                        significance: "Cartilage loss, hallmark of OA",
                                        causes: "Age-related degeneration, previous injury, genetic factors, mechanical stress",
                                        firstLine: "Activity modification, weight management, physiotherapy, NSAIDs"
                                    },
                                    "Osteophyte formation": {
                                        significance: "Bony spurs at joint margins",
                                        causes: "Body's attempt to redistribute load, cartilage breakdown products",
                                        firstLine: "Usually asymptomatic, treat underlying OA"
                                    },
                                    "Subchondral sclerosis": {
                                        significance: "Increased bone density due to abnormal loading",
                                        causes: "Loss of cartilage shock absorption, increased bone stress",
                                        firstLine: "Load modification, physiotherapy, consider joint replacement if severe"
                                    },
                                    "Bouchard's/Heberden's nodes": {
                                        significance: "Hand OA - PIP and DIP joint enlargement",
                                        causes: "Primary generalized OA, genetic predisposition",
                                        firstLine: "Splinting, activity modification, topical NSAIDs, joint protection"
                                    }
                                },
                                redFlags: "Rapid progression, systemic symptoms, young age, multiple joint involvement",
                                investigations: "X-rays (weight-bearing), clinical diagnosis. MRI if atypical features"
                            },
                            {
                                name: "Rheumatoid Arthritis",
                                indications: "Symmetrical small joint swelling, morning stiffness >1 hour, positive squeeze test",
                                clinicalFeatures: "Polyarthritis, systemic symptoms, extra-articular features",
                                abnormalFindings: {
                                    "Positive RF + Anti-CCP": {
                                        significance: "Confirms seropositive RA, worse prognosis",
                                        causes: "Autoimmune process targeting synovium",
                                        firstLine: "Early aggressive DMARD therapy (methotrexate), prednisolone bridge"
                                    },
                                    "Seronegative disease": {
                                        significance: "Clinical RA with negative serology (20-30%)",
                                        causes: "Same autoimmune process, may have different genetics",
                                        firstLine: "Same treatment as seropositive, clinical assessment paramount"
                                    },
                                    "Erosive changes on X-ray": {
                                        significance: "Established disease with joint damage",
                                        causes: "Chronic synovial inflammation causing bone/cartilage destruction",
                                        firstLine: "Intensive DMARD therapy, consider biological agents"
                                    },
                                    "Extra-articular features": {
                                        significance: "Rheumatoid nodules, lung fibrosis, eye involvement, vasculitis",
                                        causes: "Systemic inflammatory process beyond joints",
                                        firstLine: "Specialist rheumatology management, treat specific complications"
                                    }
                                },
                                redFlags: "Rapidly progressive joint destruction, extra-articular features, high disease activity",
                                investigations: "RF, anti-CCP, inflammatory markers, X-rays hands/feet, ultrasound for early synovitis"
                            }
                        ]
                    },
                    {
                        title: "Sports Injuries",
                        investigations: [
                            {
                                name: "ACL Injury",
                                indications: "Knee injury with 'pop', immediate swelling, instability, non-contact mechanism",
                                clinicalFeatures: "Positive Lachman test, anterior drawer, pivot shift",
                                abnormalFindings: {
                                    "Complete ACL tear": {
                                        significance: "Loss of anterior knee stability",
                                        causes: "Non-contact pivoting, hyperextension, direct trauma",
                                        firstLine: "RICE, physiotherapy, functional bracing, surgical reconstruction if active lifestyle"
                                    },
                                    "Partial ACL tear": {
                                        significance: "Some fibres intact, variable instability",
                                        causes: "Lower energy trauma, gradual attrition",
                                        firstLine: "Conservative treatment with physiotherapy, assess functional stability"
                                    },
                                    "Associated meniscal tear": {
                                        significance: "Concurrent injury in 50-70% of ACL tears",
                                        causes: "Same mechanism causing multiple structures to fail",
                                        firstLine: "Address both pathologies - ACL reconstruction + meniscal repair/debridement"
                                    },
                                    "Bone bruising": {
                                        significance: "Indicates significant trauma, affects rehabilitation timing",
                                        causes: "Bone-on-bone contact during injury mechanism",
                                        firstLine: "Protected weight bearing initially, delayed rehabilitation"
                                    }
                                },
                                redFlags: "Multi-ligament injury, vascular compromise, neurological deficit",
                                investigations: "MRI knee (sagittal PD, T2 fat-sat sequences), clinical examination under anaesthesia"
                            },
                            {
                                name: "Rotator Cuff Injury",
                                indications: "Shoulder pain, weakness, positive impingement signs, overhead activity history",
                                clinicalFeatures: "Painful arc, positive Hawkins/Neer signs, weakness in external rotation",
                                abnormalFindings: {
                                    "Partial thickness tear": {
                                        significance: "Incomplete tear, may heal with conservative treatment",
                                        causes: "Overuse, impingement, degenerative change, acute trauma",
                                        firstLine: "Physiotherapy, activity modification, NSAIDs, steroid injection"
                                    },
                                    "Full thickness tear <1cm": {
                                        significance: "Complete tear but small size may heal",
                                        causes: "Acute trauma on degenerative background, chronic attrition",
                                        firstLine: "Trial of conservative treatment, surgery if failed at 6 months"
                                    },
                                    "Full thickness tear >3cm": {
                                        significance: "Large tear unlikely to heal, may cause weakness",
                                        causes: "Significant trauma, chronic degeneration, steroid injections",
                                        firstLine: "Surgical repair recommended, especially if acute and <65 years"
                                    },
                                    "Muscle atrophy/fatty infiltration": {
                                        significance: "Chronic changes affecting surgical prognosis",
                                        causes: "Long-standing tear, denervation, disuse",
                                        firstLine: "May not be suitable for repair - consider debridement only"
                                    }
                                },
                                redFlags: "Acute complete tear in young patient, neurological symptoms, infection",
                                investigations: "USS shoulder (first-line, dynamic), MRI if surgical candidate, MR arthrogram for labral pathology"
                            },
                            {
                                name: "Ankle Sprain",
                                indications: "Ankle injury, difficulty weight bearing, swelling, mechanism of injury",
                                clinicalFeatures: "Pain, swelling, bruising, instability, tenderness over ligaments",
                                abnormalFindings: {
                                    "Grade I sprain (stretch)": {
                                        significance: "Microscopic tearing, minimal instability",
                                        causes: "Minor inversion injury, protective ankle reflex intact",
                                        firstLine: "RICE, early mobilization, proprioception exercises"
                                    },
                                    "Grade II sprain (partial tear)": {
                                        significance: "Partial ligament rupture, moderate instability",
                                        causes: "Moderate inversion force, some protective mechanism failure",
                                        firstLine: "Functional bracing, physiotherapy, gradual return to activity"
                                    },
                                    "Grade III sprain (complete tear)": {
                                        significance: "Complete ligament rupture, significant instability",
                                        causes: "High energy inversion, complete protective mechanism failure",
                                        firstLine: "Immobilization vs early mobilization (similar outcomes), consider surgery if chronic instability"
                                    },
                                    "High ankle sprain (syndesmosis)": {
                                        significance: "Injury to tibiofibular ligaments, longer recovery",
                                        causes: "External rotation mechanism, often in sport",
                                        firstLine: "Protected weight bearing, longer immobilization, may need surgical fixation"
                                    }
                                },
                                redFlags: "Suspected fracture (Ottawa rules), neurovascular compromise, open injury",
                                investigations: "X-ray if Ottawa ankle rules positive, MRI/USS if chronic instability, stress views if indicated"
                            }
                        ]
                    },
                    {
                        title: "Overuse Injuries",
                        investigations: [
                            {
                                name: "Lateral Epicondylitis (Tennis Elbow)",
                                indications: "Lateral elbow pain, grip weakness, repetitive wrist extension activities",
                                clinicalFeatures: "Tenderness over lateral epicondyle, pain with resisted wrist extension",
                                abnormalFindings: {
                                    "Tendinosis changes": {
                                        significance: "Degenerative rather than inflammatory process",
                                        causes: "Repetitive microtrauma, poor technique, equipment factors",
                                        firstLine: "Activity modification, eccentric strengthening, equipment assessment"
                                    },
                                    "Common extensor origin tear": {
                                        significance: "Structural damage to tendon attachment",
                                        causes: "Chronic overload, sudden forceful contraction",
                                        firstLine: "Conservative treatment, consider injection, surgery if failed >6 months"
                                    },
                                    "Posterolateral instability": {
                                        significance: "Associated ligamentous injury causing rotatory instability",
                                        causes: "Lateral collateral ligament complex injury",
                                        firstLine: "Specialist assessment, may require surgical reconstruction"
                                    }
                                },
                                redFlags: "Neurological symptoms, posterolateral instability, failed conservative treatment >12 months",
                                investigations: "Usually clinical diagnosis, USS if atypical, MRI if considering surgery"
                            },
                            {
                                name: "Plantar Fasciitis",
                                indications: "Heel pain worse first steps, activity-related pain, plantar heel tenderness",
                                clinicalFeatures: "Medial calcaneal tuberosity tenderness, pain after rest, improves with activity initially",
                                abnormalFindings: {
                                    "Plantar fascia thickening": {
                                        significance: "Chronic degenerative process rather than acute inflammation",
                                        causes: "Biomechanical overload, obesity, poor foot mechanics, training errors",
                                        firstLine: "Activity modification, stretching, orthotics, weight management"
                                    },
                                    "Calcaneal spur": {
                                        significance: "Often incidental finding, not usually cause of pain",
                                        causes: "Chronic traction at plantar fascia attachment",
                                        firstLine: "Treat plantar fasciitis, spur removal rarely needed"
                                    },
                                    "Fat pad atrophy": {
                                        significance: "Loss of heel cushioning, more common with age",
                                        causes: "Age-related degeneration, steroid injections, chronic trauma",
                                        firstLine: "Heel cushioning, avoid steroid injections, activity modification"
                                    },
                                    "Nerve entrapment": {
                                        significance: "Tarsal tunnel syndrome or medial calcaneal nerve",
                                        causes: "Anatomical compression, biomechanical factors",
                                        firstLine: "Nerve conduction studies, specialist assessment, surgical decompression"
                                    }
                                },
                                redFlags: "Bilateral symptoms, neurological features, night pain, systemic symptoms",
                                investigations: "Clinical diagnosis, USS if atypical features, X-ray to exclude other pathology"
                            }
                        ]
                    }
                ]
            },
            {
                badge: "⚡ Emergency MSK",
                title: "MSK Emergencies & Trauma",
                summary: "Time-critical musculoskeletal conditions requiring immediate assessment and management",
                categories: [
                    {
                        title: "Fracture Complications",
                        investigations: [
                            {
                                name: "Compartment Syndrome",
                                indications: "Post-trauma pain out of proportion, tight swollen limb, neurological deficit",
                                clinicalFeatures: "5 P's: Pain, Paraesthesia, Pallor, Pulselessness, Paralysis (late signs)",
                                abnormalFindings: {
                                    "Compartment pressure >30mmHg": {
                                        significance: "Elevated intracompartmental pressure compromising perfusion",
                                        causes: "Fracture hematoma, reperfusion oedema, tight dressings/casts",
                                        firstLine: "EMERGENCY fasciotomy within 6 hours, remove all dressings/casts"
                                    },
                                    "Delta P <30mmHg": {
                                        significance: "Difference between diastolic pressure and compartment pressure",
                                        causes: "Compromise of compartment perfusion pressure",
                                        firstLine: "URGENT fasciotomy indicated"
                                    },
                                    "Passive stretch pain": {
                                        significance: "Most sensitive early sign of compartment syndrome",
                                        causes: "Ischaemic muscle being stretched causing severe pain",
                                        firstLine: "High index of suspicion, measure compartment pressures"
                                    }
                                },
                                redFlags: "ALL signs are red flags - this IS an emergency",
                                investigations: "CLINICAL diagnosis, compartment pressure measurement if doubt, urgent surgical opinion"
                            },
                            {
                                name: "Fat Embolism Syndrome",
                                indications: "Long bone fracture with respiratory symptoms, confusion, petechial rash",
                                clinicalFeatures: "Triad: respiratory distress, neurological signs, petechial rash",
                                abnormalFindings: {
                                    "Respiratory symptoms": {
                                        significance: "Fat globules blocking pulmonary capillaries",
                                        causes: "Long bone fracture, intramedullary nailing, major trauma",
                                        firstLine: "Oxygen therapy, respiratory support, early fracture fixation"
                                    },
                                    "Neurological changes": {
                                        significance: "Cerebral fat emboli causing confusion/agitation",
                                        causes: "Fat emboli crossing to systemic circulation via lungs",
                                        firstLine: "Supportive care, may need intensive care monitoring"
                                    },
                                    "Petechial rash": {
                                        significance: "Pathognomonic sign - fat emboli in skin capillaries",
                                        causes: "Fat globules blocking dermal capillaries",
                                        firstLine: "Confirms diagnosis, supportive treatment"
                                    }
                                },
                                redFlags: "Major trauma, multiple fractures, respiratory distress, altered consciousness",
                                investigations: "Clinical diagnosis, ABG, CXR, platelet count, urinalysis for fat globules"
                            }
                        ]
                    },
                    {
                        title: "Spinal Trauma",
                        investigations: [
                            {
                                name: "Cervical Spine Injury",
                                indications: "High-velocity trauma, neurological symptoms, neck pain, Canadian C-spine rules",
                                clinicalFeatures: "Neck pain, neurological deficit, mechanism of injury",
                                abnormalFindings: {
                                    "Atlantooccipital dislocation": {
                                        significance: "Usually fatal, craniocervical dissociation",
                                        causes: "High-energy trauma, hyperextension/flexion",
                                        firstLine: "Immediate stabilization, emergency intubation, neurosurgical input"
                                    },
                                    "Hangman's fracture (C2)": {
                                        significance: "Bilateral pars fracture of C2",
                                        causes: "Hyperextension injury, judicial hanging mechanism",
                                        firstLine: "Immobilization, halo vest vs surgical fixation"
                                    },
                                    "Jefferson fracture (C1)": {
                                        significance: "Burst fracture of atlas",
                                        causes: "Axial loading, diving into shallow water",
                                        firstLine: "Assess for instability, halo immobilization vs surgery"
                                    },
                                    "Subaxial injury": {
                                        significance: "C3-C7 fracture/dislocation",
                                        causes: "Flexion, extension, or rotation mechanisms",
                                        firstLine: "Assess stability, reduction if displaced, surgical fixation"
                                    }
                                },
                                redFlags: "High-velocity trauma, neurological deficit, neck pain with risk factors",
                                investigations: "CT cervical spine (primary), MRI if neurological deficit, X-ray inadequate in trauma"
                            },
                            {
                                name: "Thoracolumbar Injury",
                                indications: "Fall from height, motor vehicle accident, back pain, neurological symptoms",
                                clinicalFeatures: "Back pain, deformity, neurological deficit, mechanism assessment",
                                abnormalFindings: {
                                    "Chance fracture": {
                                        significance: "Horizontal fracture through vertebral body and posterior elements",
                                        causes: "Seatbelt injury, flexion-distraction mechanism",
                                        firstLine: "Assess for intra-abdominal injury, surgical fixation often needed"
                                    },
                                    "Burst fracture": {
                                        significance: "Vertebral body fracture with retropulsion into canal",
                                        causes: "Axial loading, fall from height",
                                        firstLine: "Assess neurological status, surgical decompression if deficit"
                                    },
                                    "Flexion-distraction injury": {
                                        significance: "Unstable injury with high risk of neurological deterioration",
                                        causes: "High-energy trauma, primarily ligamentous",
                                        firstLine: "Immediate stabilization, surgical fixation"
                                    }
                                },
                                redFlags: "Neurological deficit, multiple trauma, unstable fracture pattern",
                                investigations: "CT thoracolumbar spine, MRI if neurological deficit, whole spine imaging in major trauma"
                            }
                        ]
                    }
                ]
            }
        ];
    }

    ensureStyles() {
        if (document.querySelector('#msk-investigations-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'msk-investigations-styles';
        style.textContent = `
            /* MSK Investigations Specific Styles */
            .msk-search-container {
                margin-bottom: 20px;
                position: relative;
            }
            
            .msk-search-input {
                width: 100%;
                padding: 12px 16px;
                border: 1px solid rgba(15,23,42,0.12);
                border-radius: 10px;
                font-size: 1rem;
                background: #fff;
                transition: border-color 0.2s, box-shadow 0.2s;
            }
            
            .msk-search-input:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
            }

            .msk-category {
                background: #fff;
                border: 1px solid rgba(15,23,42,0.08);
                border-radius: 12px;
                margin-bottom: 24px;
                overflow: hidden;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }

            .msk-category h3 {
                background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                color: white;
                margin: 0;
                padding: 16px 20px;
                font-size: 1.2rem;
                font-weight: 600;
            }

            .msk-investigation {
                border-bottom: 1px solid rgba(15,23,42,0.08);
                padding: 20px;
            }

            .msk-investigation:last-child {
                border-bottom: none;
            }

            .msk-investigation h4 {
                color: #0f172a;
                font-size: 1.1rem;
                font-weight: 600;
                margin: 0 0 12px 0;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .msk-normal-range {
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.2);
                color: #047857;
                padding: 8px 14px;
                border-radius: 6px;
                font-size: 0.875rem;
                font-weight: 600;
                margin-bottom: 12px;
                display: inline-block;
            }

            .msk-indications {
                background: rgba(59, 130, 246, 0.1);
                border: 1px solid rgba(59, 130, 246, 0.2);
                color: #1e40af;
                padding: 10px 14px;
                border-radius: 6px;
                font-size: 0.9rem;
                font-weight: 500;
                margin-bottom: 16px;
            }

            .msk-findings {
                margin-top: 16px;
            }

            .msk-finding {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-left: 4px solid #3b82f6;
                padding: 16px;
                margin-bottom: 12px;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }

            .msk-finding-name {
                font-weight: 700;
                color: #1e293b;
                font-size: 1rem;
                margin-bottom: 10px;
            }

            .msk-finding-detail {
                margin-bottom: 8px;
                font-size: 0.875rem;
                line-height: 1.6;
                padding: 8px 12px;
                border-radius: 6px;
                margin-left: 8px;
            }

            .msk-significance {
                background: rgba(59, 130, 246, 0.08);
                border-left: 3px solid #3b82f6;
                color: #1e40af;
                font-weight: 500;
            }

            .msk-causes {
                background: rgba(245, 158, 11, 0.08);
                border-left: 3px solid #f59e0b;
                color: #92400e;
                font-weight: 500;
            }

            .msk-treatment {
                background: rgba(16, 185, 129, 0.08);
                border-left: 3px solid #10b981;
                color: #047857;
                font-weight: 600;
                padding: 10px 14px;
                border-radius: 6px;
                margin: 8px 0 0 8px;
            }

            .msk-red-flags {
                background: rgba(239, 68, 68, 0.1);
                border: 1px solid rgba(239, 68, 68, 0.2);
                border-left: 4px solid #ef4444;
                color: #991b1b;
                padding: 12px 16px;
                border-radius: 6px;
                font-size: 0.875rem;
                font-weight: 600;
                margin-top: 16px;
            }

            .msk-limitations {
                background: rgba(251, 191, 36, 0.1);
                border: 1px solid rgba(251, 191, 36, 0.2);
                border-left: 4px solid #f59e0b;
                color: #92400e;
                padding: 12px 16px;
                border-radius: 6px;
                font-size: 0.875rem;
                font-weight: 500;
                margin-top: 16px;
            }

            .msk-views, .msk-sequences, .msk-technique {
                background: rgba(139, 92, 246, 0.1);
                border: 1px solid rgba(139, 92, 246, 0.2);
                color: #6b21a8;
                padding: 10px 14px;
                border-radius: 6px;
                font-size: 0.875rem;
                font-weight: 500;
                margin-bottom: 12px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            /* Severity indicators */
            .severity-urgent .msk-finding {
                border-left-color: #ef4444;
                background: rgba(239,68,68,0.05);
            }

            .severity-important .msk-finding {
                border-left-color: #f59e0b;
                background: rgba(251,191,36,0.05);
            }

            .severity-routine .msk-finding {
                border-left-color: #10b981;
                background: rgba(16,185,129,0.05);
            }

            /* Dark mode support */
            body.dark-mode .msk-search-input {
                background: #1e293b;
                border-color: rgba(148,163,184,0.3);
                color: #f1f5f9;
            }

            body.dark-mode .msk-category {
                background: #1e293b;
                border-color: rgba(148,163,184,0.2);
            }

            body.dark-mode .msk-investigation {
                border-color: rgba(148,163,184,0.2);
            }

            body.dark-mode .msk-investigation h4 {
                color: #f1f5f9;
            }

            body.dark-mode .msk-finding {
                background: #334155;
                border-color: rgba(148,163,184,0.3);
                border-left-color: #60a5fa;
            }

            body.dark-mode .msk-finding-name {
                color: #f1f5f9;
            }

            body.dark-mode .msk-significance {
                background: rgba(96, 165, 250, 0.15);
                border-left-color: #60a5fa;
                color: #bfdbfe;
            }

            body.dark-mode .msk-causes {
                background: rgba(251, 191, 36, 0.15);
                border-left-color: #fbbf24;
                color: #fde68a;
            }

            body.dark-mode .msk-treatment {
                background: rgba(52, 211, 153, 0.15);
                border-left-color: #34d399;
                color: #a7f3d0;
            }

            body.dark-mode .msk-indications {
                background: rgba(96, 165, 250, 0.15);
                border-color: rgba(96, 165, 250, 0.3);
                color: #bfdbfe;
            }

            body.dark-mode .msk-normal-range {
                background: rgba(52, 211, 153, 0.15);
                border-color: rgba(52, 211, 153, 0.3);
                color: #a7f3d0;
            }

            body.dark-mode .msk-red-flags {
                background: rgba(248, 113, 113, 0.15);
                border-color: rgba(248, 113, 113, 0.3);
                border-left-color: #f87171;
                color: #fca5a5;
            }

            body.dark-mode .msk-limitations {
                background: rgba(251, 191, 36, 0.15);
                border-color: rgba(251, 191, 36, 0.3);
                border-left-color: #fbbf24;
                color: #fde68a;
            }

            body.dark-mode .msk-views,
            body.dark-mode .msk-sequences,
            body.dark-mode .msk-technique {
                background: rgba(167, 139, 250, 0.15);
                border-color: rgba(167, 139, 250, 0.3);
                color: #c4b5fd;
            }

            /* Filter buttons */
            .msk-filters {
                display: flex;
                gap: 8px;
                margin-bottom: 20px;
                flex-wrap: wrap;
            }

            .msk-filter-btn {
                padding: 6px 12px;
                border: 1px solid #d1d5db;
                background: white;
                border-radius: 6px;
                font-size: 0.875rem;
                cursor: pointer;
                transition: all 0.2s;
            }

            .msk-filter-btn.active {
                background: #3b82f6;
                color: white;
                border-color: #3b82f6;
            }

            .msk-filter-btn:hover {
                background: #f3f4f6;
            }

            .msk-filter-btn.active:hover {
                background: #2563eb;
            }

            body.dark-mode .msk-filter-btn {
                background: #374151;
                border-color: #4b5563;
                color: #e5e7eb;
            }

            body.dark-mode .msk-filter-btn:hover {
                background: #4b5563;
            }
        `;
        
        document.head.appendChild(style);
    }

    render() {
        let container = document.getElementById('content-area');
        
        // If we're in the standalone MSK panel, find the content area within that panel
        if (!container || !container.offsetParent) {
            const mskPanel = document.getElementById('msk-investigations-panel');
            if (mskPanel) {
                container = mskPanel.querySelector('#content-area');
            }
        }
        
        if (!container) {
            console.error('❌ Content area not found for MSK investigations');
            return;
        }
        
        const html = `
            <div class="msk-investigations-container">
                <div class="msk-search-container">
                    <input 
                        type="text" 
                        class="msk-search-input" 
                        placeholder="Search MSK investigations, findings, or treatments..."
                        id="mskSearchInput"
                    >
                </div>
                
                <div class="msk-filters">
                    <button class="msk-filter-btn active" data-filter="all">All Investigations</button>
                    <button class="msk-filter-btn" data-filter="imaging">Imaging</button>
                    <button class="msk-filter-btn" data-filter="laboratory">Laboratory</button>
                    <button class="msk-filter-btn" data-filter="urgent">Urgent/Red Flags</button>
                </div>

                <div id="mskInvestigationsList">
                    ${this.renderInvestigations()}
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }

    renderInvestigations() {
        let html = '';
        
        this.investigations.forEach(section => {
            html += `
                <div class="workflow-section">
                    <div class="workflow-badge">${section.badge}</div>
                    <h2>${section.title}</h2>
                    <p class="workflow-summary">${section.summary}</p>
                    
                    ${section.categories.map(category => `
                        <div class="msk-category">
                            <h3>${category.title}</h3>
                            ${category.investigations.map(inv => this.renderInvestigation(inv)).join('')}
                        </div>
                    `).join('')}
                </div>
            `;
        });
        
        return html;
    }

    renderInvestigation(investigation) {
        return `
            <div class="msk-investigation">
                <h4>${investigation.name}</h4>
                
                ${investigation.normalRange ? `
                    <div class="msk-normal-range">
                        Normal Range: ${investigation.normalRange}
                    </div>
                ` : ''}
                
                <div class="msk-indications">
                    <strong>Indications:</strong> ${investigation.indications}
                </div>
                
                ${investigation.views ? `
                    <div class="msk-views">
                        <strong>Views:</strong> ${investigation.views}
                    </div>
                ` : ''}
                
                ${investigation.sequences ? `
                    <div class="msk-sequences">
                        <strong>Sequences:</strong> ${investigation.sequences}
                    </div>
                ` : ''}
                
                ${investigation.technique ? `
                    <div class="msk-technique">
                        <strong>Technique:</strong> ${investigation.technique}
                    </div>
                ` : ''}
                
                <div class="msk-findings">
                    <h5>Abnormal Findings & Management:</h5>
                    ${Object.entries(investigation.abnormalFindings).map(([finding, details]) => `
                        <div class="msk-finding">
                            <div class="msk-finding-name">${finding}</div>
                            <div class="msk-finding-detail msk-significance">
                                <strong>Significance:</strong> ${details.significance}
                            </div>
                            <div class="msk-finding-detail msk-causes">
                                <strong>Common Causes:</strong> ${details.causes}
                            </div>
                            <div class="msk-treatment">
                                <strong>First-line Treatment:</strong> ${details.firstLine}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                ${investigation.redFlags ? `
                    <div class="msk-red-flags">
                        <strong>🚨 Red Flags:</strong> ${investigation.redFlags}
                    </div>
                ` : ''}
                
                ${investigation.limitations ? `
                    <div class="msk-limitations">
                        <strong>⚠️ Limitations:</strong> ${investigation.limitations}
                    </div>
                ` : ''}
                
                ${investigation.patterns ? `
                    <div class="msk-limitations">
                        <strong>🔍 Patterns:</strong> ${investigation.patterns}
                    </div>
                ` : ''}
            </div>
        `;
    }

    setupEventListeners() {
        const searchInput = document.getElementById('mskSearchInput');
        const filterBtns = document.querySelectorAll('.msk-filter-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterContent();
            });
        }
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.filterContent();
            });
        });
    }

    filterContent() {
        const investigations = document.querySelectorAll('.msk-investigation');
        
        investigations.forEach(inv => {
            const text = inv.textContent.toLowerCase();
            const matchesSearch = !this.searchTerm || text.includes(this.searchTerm);
            const matchesFilter = this.currentFilter === 'all' || this.matchesFilter(inv);
            
            inv.style.display = matchesSearch && matchesFilter ? 'block' : 'none';
        });
        
        // Hide empty categories
        const categories = document.querySelectorAll('.msk-category');
        categories.forEach(cat => {
            const visibleInvestigations = cat.querySelectorAll('.msk-investigation[style*="block"], .msk-investigation:not([style*="none"])');
            cat.style.display = visibleInvestigations.length > 0 ? 'block' : 'none';
        });
    }

    matchesFilter(investigation) {
        const text = investigation.textContent.toLowerCase();
        
        switch (this.currentFilter) {
            case 'imaging':
                return text.includes('x-ray') || text.includes('mri') || text.includes('ultrasound') || 
                       text.includes('ct') || text.includes('imaging');
            case 'laboratory':
                return text.includes('blood') || text.includes('serum') || text.includes('esr') || 
                       text.includes('crp') || text.includes('antibodies');
            case 'urgent':
                return text.includes('urgent') || text.includes('red flag') || text.includes('emergency') ||
                       text.includes('immediate') || text.includes('🚨');
            default:
                return true;
        }
    }

    loadFavorites() {
        try {
            return JSON.parse(localStorage.getItem(this.favoriteKey)) || [];
        } catch {
            return [];
        }
    }

    saveFavorites() {
        localStorage.setItem(this.favoriteKey, JSON.stringify(this.favorites));
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MSKInvestigationsManager;
}

// ES6 export
export { MSKInvestigationsManager };