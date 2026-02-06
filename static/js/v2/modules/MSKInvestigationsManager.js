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
                badge: "🔬 Imaging",
                title: "MSK Imaging Investigations",
                summary: "Comprehensive guide to musculoskeletal imaging modalities and findings",
                categories: [
                    {
                        title: "Plain Radiographs (X-rays)",
                        investigations: [
                            {
                                name: "Cervical Spine X-ray",
                                indications: "Neck trauma, chronic pain, neurological symptoms, rheumatoid arthritis screening",
                                views: "AP, Lateral (C1-C7), Odontoid peg view, Flexion/Extension (if stable)",
                                abnormalFindings: {
                                    "Loss of cervical lordosis": {
                                        significance: "Muscle spasm, degenerative change, or structural abnormality",
                                        causes: "Acute injury, chronic degeneration, inflammatory arthritis",
                                        firstLine: "NSAIDs, physiotherapy, muscle relaxants if acute spasm"
                                    },
                                    "Osteophytes": {
                                        significance: "Degenerative change (cervical spondylosis)",
                                        causes: "Age-related wear, previous injury, genetic predisposition",
                                        firstLine: "Conservative management, NSAIDs, physiotherapy, activity modification"
                                    },
                                    "Joint space narrowing": {
                                        significance: "Cartilage loss, facet joint arthritis",
                                        causes: "Osteoarthritis, inflammatory arthritis, previous trauma",
                                        firstLine: "Analgesia, physiotherapy, ergonomic assessment"
                                    },
                                    "Atlantoaxial subluxation": {
                                        significance: "C1-C2 instability (>3mm adults, >5mm children)",
                                        causes: "Rheumatoid arthritis, Down syndrome, trauma, infection",
                                        firstLine: "URGENT orthopaedic/neurosurgical referral, immobilization"
                                    }
                                },
                                redFlags: "Neurological deficit, high-velocity trauma, rheumatoid arthritis with new symptoms",
                                limitations: "Poor soft tissue visualization, requires multiple views for adequacy"
                            },
                            {
                                name: "Lumbar Spine X-ray",
                                indications: "Low back pain >6 weeks, trauma, red flag symptoms, pre-surgical assessment",
                                views: "AP and Lateral weight-bearing, Oblique if spondylolysis suspected",
                                abnormalFindings: {
                                    "Disc space narrowing": {
                                        significance: "Intervertebral disc degeneration",
                                        causes: "Age, mechanical stress, genetic factors, previous injury",
                                        firstLine: "Activity modification, physiotherapy, NSAIDs, weight management"
                                    },
                                    "Spondylolisthesis": {
                                        significance: "Forward slippage of vertebra (Grade I-V)",
                                        causes: "Degenerative, isthmic (pars defect), dysplastic, traumatic",
                                        firstLine: "Grade I-II: Conservative with physio. Grade III+: Surgical referral"
                                    },
                                    "Pars interarticularis defect": {
                                        significance: "Stress fracture of neural arch (spondylolysis)",
                                        causes: "Repetitive hyperextension (gymnastics, cricket fast bowling)",
                                        firstLine: "Activity restriction, bracing, physiotherapy, gradual return"
                                    },
                                    "Schmorl's nodes": {
                                        significance: "Disc herniation into vertebral body",
                                        causes: "Developmental, trauma, degenerative change",
                                        firstLine: "Usually asymptomatic - no specific treatment needed"
                                    }
                                },
                                redFlags: "Cauda equina symptoms, progressive neurological deficit, suspected malignancy",
                                limitations: "Cannot visualize discs, nerve roots, or soft tissues adequately"
                            },
                            {
                                name: "Hip X-ray",
                                indications: "Hip pain, trauma, developmental dysplasia screening, arthritis assessment",
                                views: "AP pelvis, Lateral hip (frog-leg or cross-table)",
                                abnormalFindings: {
                                    "Joint space narrowing": {
                                        significance: "Cartilage loss indicating osteoarthritis",
                                        causes: "Primary OA, secondary to dysplasia/FAI, inflammatory arthritis",
                                        firstLine: "Weight management, physiotherapy, NSAIDs, activity modification"
                                    },
                                    "Acetabular dysplasia": {
                                        significance: "Shallow socket predisposing to OA (CE angle <20°)",
                                        causes: "Developmental, genetic factors, positioning in utero",
                                        firstLine: "Activity modification, strengthening, orthopaedic referral if symptomatic"
                                    },
                                    "Femoroacetabular impingement": {
                                        significance: "Cam (femoral) or Pincer (acetabular) morphology causing impingement",
                                        causes: "Developmental, athletic activity, genetic predisposition",
                                        firstLine: "Activity modification, physiotherapy, NSAIDs, consider arthroscopy"
                                    },
                                    "Neck of femur #": {
                                        significance: "Fracture classification affects treatment (Garden, AO)",
                                        causes: "Osteoporotic fragility fracture, high-energy trauma",
                                        firstLine: "URGENT orthopaedic referral, analgesia, DVT prophylaxis"
                                    }
                                },
                                redFlags: "Inability to weight bear, severe pain, suspected fracture, AVN risk factors",
                                limitations: "Early AVN not visible, labral tears not seen"
                            },
                            {
                                name: "Knee X-ray",
                                indications: "Persistent knee pain, trauma (Ottawa rules), suspected arthritis, loose bodies",
                                views: "AP, Lateral, Skyline/Sunrise (patellofemoral), Tunnel view (OCD)",
                                abnormalFindings: {
                                    "Tibiofemoral joint space narrowing": {
                                        significance: "Medial/lateral compartment osteoarthritis",
                                        causes: "Primary OA, meniscal tear, previous injury, malalignment",
                                        firstLine: "Physiotherapy, weight management, NSAIDs, activity modification"
                                    },
                                    "Patellofemoral arthritis": {
                                        significance: "Cartilage loss behind patella/trochlear groove",
                                        causes: "Maltracking, previous dislocation, overuse, genetics",
                                        firstLine: "Quadriceps strengthening, patella taping, activity modification"
                                    },
                                    "Osteochondritis dissecans": {
                                        significance: "Subchondral bone necrosis with overlying cartilage damage",
                                        causes: "Repetitive microtrauma, vascular insufficiency, genetic factors",
                                        firstLine: "Activity restriction, physiotherapy, orthopaedic referral"
                                    },
                                    "Loose bodies": {
                                        significance: "Free bone/cartilage fragments causing mechanical symptoms",
                                        causes: "Osteochondral fracture, arthritis, synovial chondromatosis",
                                        firstLine: "Arthroscopic removal if symptomatic, physiotherapy"
                                    }
                                },
                                redFlags: "Unable to straight leg raise, severe effusion, suspected fracture, locked knee",
                                limitations: "Meniscal tears invisible, cruciate ligament integrity not assessed"
                            }
                        ]
                    },
                    {
                        title: "Advanced Imaging",
                        investigations: [
                            {
                                name: "MRI Spine",
                                indications: "Neurological deficit, failed conservative treatment >6 weeks, red flags, surgical planning",
                                sequences: "T1, T2, STIR sagittal + T2 axial, +/- gadolinium if infection/tumor suspected",
                                abnormalFindings: {
                                    "Disc prolapse/herniation": {
                                        significance: "Disc material compressing neural structures",
                                        causes: "Degenerative, acute injury, genetic predisposition",
                                        firstLine: "Conservative: physio, NSAIDs, neuropathic pain agents, epidural injection"
                                    },
                                    "Spinal stenosis": {
                                        significance: "Narrowing of spinal canal causing neurogenic claudication",
                                        causes: "Degenerative (ligamentum flavum hypertrophy), congenital, spondylolisthesis",
                                        firstLine: "Physiotherapy, activity modification, epidural injections, surgical decompression"
                                    },
                                    "Modic changes": {
                                        significance: "Vertebral endplate changes (Type I-III indicating inflammation/sclerosis)",
                                        causes: "Degenerative disc disease, biomechanical stress, possible infection",
                                        firstLine: "Type I: Anti-TNF therapy consideration, physio. Type II/III: Conservative"
                                    },
                                    "Cord compression": {
                                        significance: "Spinal cord signal change with compression",
                                        causes: "Disc herniation, tumor, hematoma, abscess, stenosis",
                                        firstLine: "URGENT neurosurgical referral, high-dose steroids if acute"
                                    }
                                },
                                redFlags: "Myelopathy signs, cauda equina syndrome, progressive neurological deficit",
                                limitations: "Contraindicated with some implants, claustrophobia, cost"
                            },
                            {
                                name: "MRI Shoulder",
                                indications: "Rotator cuff pathology, instability, persistent pain, pre-arthroscopy planning",
                                sequences: "Oblique coronal/sagittal T1, T2, PD fat-sat, +/- arthrogram for labral tears",
                                abnormalFindings: {
                                    "Rotator cuff tear": {
                                        significance: "Partial or full thickness tear affecting function",
                                        causes: "Degenerative, acute trauma, impingement, chronic overuse",
                                        firstLine: "Physiotherapy, NSAIDs, steroid injection, surgery if full thickness >1cm"
                                    },
                                    "Subacromial impingement": {
                                        significance: "Narrowed subacromial space causing pain",
                                        causes: "Acromial morphology, rotator cuff weakness, overuse",
                                        firstLine: "Physiotherapy (scapular stabilization), activity modification, injection"
                                    },
                                    "Labral tear": {
                                        significance: "SLAP lesion or Bankart lesion affecting stability",
                                        causes: "Trauma, repetitive overhead activity, degenerative",
                                        firstLine: "Physiotherapy, activity modification, arthroscopic repair if unstable"
                                    },
                                    "Frozen shoulder": {
                                        significance: "Capsular thickening and inflammation",
                                        causes: "Idiopathic, diabetes, thyroid disease, immobilization",
                                        firstLine: "Early mobilization, steroid injection, physiotherapy, patience (2-3 years)"
                                    }
                                },
                                redFlags: "Acute complete tear in young patient, neurological symptoms, infection signs",
                                limitations: "Arthrogram needed for small labral tears, patient positioning important"
                            },
                            {
                                name: "MRI Knee",
                                indications: "Meniscal/ligament injury, persistent effusion, osteochondral lesions, pre-arthroscopy",
                                sequences: "Sagittal PD, T2 fat-sat, Coronal PD fat-sat, Axial T2 fat-sat",
                                abnormalFindings: {
                                    "ACL tear": {
                                        significance: "Complete/partial rupture affecting knee stability",
                                        causes: "Non-contact pivoting injury, direct trauma, degenerative in older patients",
                                        firstLine: "RICE, physiotherapy, functional bracing, surgical reconstruction if active"
                                    },
                                    "Meniscal tear": {
                                        significance: "Horizontal, vertical, or complex tear affecting function",
                                        causes: "Acute injury (young), degenerative (>40), associated with ACL injury",
                                        firstLine: "Conservative if degenerative, arthroscopic repair if traumatic and repairable"
                                    },
                                    "Bone marrow edema": {
                                        significance: "High signal on STIR indicating bone stress/injury",
                                        causes: "Acute trauma, stress fracture, AVN, infection, tumour",
                                        firstLine: "Activity modification, analgesia, investigate underlying cause"
                                    },
                                    "Baker's cyst": {
                                        significance: "Popliteal cyst often associated with intra-articular pathology",
                                        causes: "Knee effusion, meniscal tear, arthritis causing one-way valve effect",
                                        firstLine: "Treat underlying knee pathology, aspiration if large, physiotherapy"
                                    }
                                },
                                redFlags: "Suspected fracture, infection, tumour, acute locked knee",
                                limitations: "Motion artifact, metallic implants cause artifact"
                            }
                        ]
                    },
                    {
                        title: "Ultrasound MSK",
                        investigations: [
                            {
                                name: "Shoulder Ultrasound",
                                indications: "Rotator cuff assessment, guided injections, dynamic evaluation, cost-effective imaging",
                                technique: "High-frequency probe, multiple planes, dynamic assessment with movement",
                                abnormalFindings: {
                                    "Rotator cuff tendinosis": {
                                        significance: "Thickened, heterogeneous tendon without tear",
                                        causes: "Overuse, aging, repetitive microtrauma, poor posture",
                                        firstLine: "Load management, eccentric strengthening, NSAIDs, activity modification"
                                    },
                                    "Subacromial bursitis": {
                                        significance: "Thickened, inflamed bursa with or without effusion",
                                        causes: "Impingement, overuse, crystal arthropathy, infection (rare)",
                                        firstLine: "Rest, NSAIDs, physiotherapy, steroid injection if severe"
                                    },
                                    "Calcific tendinitis": {
                                        significance: "Calcium deposits within tendon (usually supraspinatus)",
                                        causes: "Degenerative process, metabolic factors, genetic predisposition",
                                        firstLine: "NSAIDs, physiotherapy, steroid injection, shock wave therapy, needling"
                                    },
                                    "Biceps tendinopathy": {
                                        significance: "Thickening/tear of long head of biceps in bicipital groove",
                                        causes: "Overuse, impingement, SLAP lesion, degenerative change",
                                        firstLine: "Activity modification, physiotherapy, injection, surgery if unstable"
                                    }
                                },
                                redFlags: "Complete rotator cuff tear in young patient, signs of infection",
                                limitations: "Operator dependent, limited by patient habitus, bone shadowing"
                            },
                            {
                                name: "Achilles Ultrasound",
                                indications: "Posterior heel pain, suspected rupture, tendinopathy assessment, guided injection",
                                technique: "High-frequency probe, longitudinal and transverse views, compare with contralateral",
                                abnormalFindings: {
                                    "Achilles tendinopathy": {
                                        significance: "Thickened tendon with hypoechoic areas and neovascularisation",
                                        causes: "Overuse, training errors, biomechanical factors, fluoroquinolones",
                                        firstLine: "Load management, eccentric strengthening, heel raise, activity modification"
                                    },
                                    "Achilles rupture": {
                                        significance: "Complete or partial discontinuity of tendon fibres",
                                        causes: "Acute loading of deconditioned tendon, steroid use, fluoroquinolones",
                                        firstLine: "Partial: Conservative with boot. Complete: Surgical repair vs conservative"
                                    },
                                    "Retrocalcaneal bursitis": {
                                        significance: "Inflamed bursa between Achilles and calcaneus",
                                        causes: "Shoe irritation, Haglund's deformity, inflammatory arthritis",
                                        firstLine: "Heel pads, shoe modification, NSAIDs, injection if severe"
                                    },
                                    "Insertional tendinopathy": {
                                        significance: "Degenerative change at bone-tendon junction with calcification",
                                        causes: "Mechanical overload, Haglund's deformity, inflammatory conditions",
                                        firstLine: "Activity modification, heel lifts, eccentric exercises, shock wave therapy"
                                    }
                                },
                                redFlags: "Complete rupture needing surgical consideration, suspected infection",
                                limitations: "Cannot assess intrasubstance tears as well as MRI"
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
                background: rgba(34,197,94,0.1);
                color: #15803d;
                padding: 6px 12px;
                border-radius: 6px;
                font-size: 0.85rem;
                font-weight: 500;
                margin-bottom: 12px;
                display: inline-block;
            }

            .msk-indications {
                background: rgba(59,130,246,0.1);
                color: #1d4ed8;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.9rem;
                margin-bottom: 16px;
            }

            .msk-findings {
                margin-top: 16px;
            }

            .msk-finding {
                background: #f8fafc;
                border-left: 4px solid #e2e8f0;
                padding: 12px 16px;
                margin-bottom: 12px;
                border-radius: 0 8px 8px 0;
            }

            .msk-finding-name {
                font-weight: 600;
                color: #0f172a;
                font-size: 0.95rem;
                margin-bottom: 8px;
            }

            .msk-finding-detail {
                margin-bottom: 6px;
                font-size: 0.875rem;
                line-height: 1.5;
            }

            .msk-significance {
                color: #0369a1;
            }

            .msk-causes {
                color: #7c2d12;
            }

            .msk-treatment {
                color: #15803d;
                font-weight: 500;
                background: rgba(34,197,94,0.05);
                padding: 4px 8px;
                border-radius: 4px;
                margin-top: 4px;
            }

            .msk-red-flags {
                background: rgba(239,68,68,0.1);
                border-left: 4px solid #ef4444;
                color: #dc2626;
                padding: 8px 12px;
                border-radius: 0 6px 6px 0;
                font-size: 0.875rem;
                font-weight: 500;
                margin-top: 12px;
            }

            .msk-limitations {
                background: rgba(251,191,36,0.1);
                border-left: 4px solid #f59e0b;
                color: #d97706;
                padding: 8px 12px;
                border-radius: 0 6px 6px 0;
                font-size: 0.875rem;
                margin-top: 12px;
            }

            .msk-views, .msk-sequences, .msk-technique {
                background: rgba(168,85,247,0.1);
                color: #7c3aed;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.85rem;
                margin-bottom: 12px;
                font-family: 'Segoe UI', monospace;
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
                border-color: rgba(148,163,184,0.2);
                color: #e2e8f0;
            }

            body.dark-mode .msk-category {
                background: #1e293b;
                border-color: rgba(148,163,184,0.1);
            }

            body.dark-mode .msk-investigation {
                border-color: rgba(148,163,184,0.1);
            }

            body.dark-mode .msk-investigation h4 {
                color: #e2e8f0;
            }

            body.dark-mode .msk-finding {
                background: #334155;
                border-left-color: #64748b;
            }

            body.dark-mode .msk-finding-name {
                color: #e2e8f0;
            }

            body.dark-mode .msk-indications {
                background: rgba(59,130,246,0.2);
                color: #93c5fd;
            }

            body.dark-mode .msk-normal-range {
                background: rgba(34,197,94,0.2);
                color: #86efac;
            }

            body.dark-mode .msk-treatment {
                background: rgba(34,197,94,0.1);
                color: #86efac;
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
        const container = document.getElementById('content-area');
        
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