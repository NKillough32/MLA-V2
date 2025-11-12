/**
 * Genetics reference data extracted from templates/index.html
 * Exported as an ES module for dynamic rendering by the Genetics panel
 */

export const geneticsDatabase = {
    'sickle-cell-disease': {
        title: 'Sickle Cell Disease',
        tags: ['Autosomal recessive', 'HBB missense (β-globin Glu6Val)'],
        sections: [
            {
                heading: 'Classic presentation',
                items: [
                    'Symptomatic after 6 months as HbF declines; dactylitis or severe hemolytic anemia in infancy.',
                    'Recurrent vaso-occlusive pain crises triggered by infection, dehydration, or hypoxia.',
                    'Functional asplenia → Howell-Jolly bodies, susceptibility to encapsulated organisms.',
                    'Protective heterozygous trait against severe Plasmodium falciparum malaria.'
                ]
            },
            {
                heading: 'Key complications',
                items: [
                    'Acute chest syndrome, stroke, avascular necrosis, priapism.',
                    'Salmonella osteomyelitis and overwhelming sepsis post-autosplenectomy.',
                    'Splenic sequestration crises in young children; chronic kidney injury.'
                ]
            }
        ],
        pearls: 'Hydroxyurea boosts HbF and reduces crises; give penicillin prophylaxis in childhood and vaccinate broadly (pneumococcus, meningococcus, Hib).'
    },
    'cystic-fibrosis': {
        title: 'Cystic Fibrosis',
        tags: ['Autosomal recessive', 'CFTR ΔF508 (Class II)'],
        sections: [
            {
                heading: 'Classic presentation',
                items: [
                    'Neonate with meconium ileus or failure to thrive; salty-tasting skin.',
                    'Chronic sinopulmonary infections (Staphylococcus aureus, later Pseudomonas) with productive cough and bronchiectasis.',
                    'Pancreatic insufficiency → steatorrhea, fat-soluble vitamin deficiency, recurrent nasal polyps.',
                    'Male infertility from congenital bilateral absence of the vas deferens.'
                ]
            },
            {
                heading: 'Diagnostic highlights',
                items: [
                    'Elevated sweat chloride (>60 mmol/L) on pilocarpine iontophoresis confirms diagnosis.',
                    'Newborn screen with immunoreactive trypsinogen; follow-up genetic sequencing or panel testing.',
                    'Obstructive lung disease with hyperinflation on imaging; fat malabsorption labs (↓fecal elastase).'
                ]
            }
        ],
        pearls: 'Airway clearance, aggressive infection control, and CFTR modulators (e.g., elexacaftor/tezacaftor/ivacaftor) improve survival; supplement pancreatic enzymes and ADEK vitamins.'
    },
    'trisomy-21': {
        title: 'Trisomy 21 (Down Syndrome)',
        tags: ['Meiotic nondisjunction (≈95%)', 'Robertsonian translocation (~4%)'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Hypotonia, developmental delay, flat facial profile, upslanting palpebral fissures, epicanthal folds.',
                    'Single palmar crease, sandal gap toes, Brushfield spots, excessive skin at the nape.',
                    'Congenital heart disease (atrioventricular septal defect), duodenal atresia, Hirschsprung disease.'
                ]
            },
            {
                heading: 'High-yield associations',
                items: [
                    '↑β-hCG, ↑inhibin A, ↓AFP, ↓estriol on second-trimester screening; ↑nuchal translucency.',
                    'Early-onset Alzheimer-like dementia (extra APP), increased risk of AML/ALL, atlantoaxial instability.',
                    'Thyroid dysfunction, obstructive sleep apnea, and chronic otitis media common in childhood.'
                ]
            }
        ],
        pearls: 'Offer parental karyotype if translocation suspected; counsel on prenatal screening and need for early cardiac and thyroid evaluation.'
    },
    'trisomy-18': {
        title: 'Trisomy 18 (Edwards Syndrome)',
        tags: ['Meiotic nondisjunction', 'Mosaicism rare (<5%)'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Severe growth restriction, micrognathia, low-set ears, prominent occiput.',
                    'Clenched fists with overlapping index over third finger, rocker-bottom feet.',
                    'Congenital heart defects (VSD/PDA), renal malformations, omphalocele or diaphragmatic hernia.'
                ]
            },
            {
                heading: 'Prenatal clues',
                items: [
                    'Quad screen: markedly ↓AFP, ↓β-hCG, ↓estriol, ↓inhibin A.',
                    'Ultrasound: choroid plexus cysts, clenched hands, single umbilical artery, polyhydramnios.',
                    'High mortality—median survival <1 year, often due to cardiac or respiratory failure.'
                ]
            }
        ],
        pearls: 'Supportive care discussions are essential; recurrence risk increases with advanced maternal age though far lower than trisomy 21.'
    },
    'marfan-syndrome': {
        title: 'Marfan Syndrome',
        tags: ['Autosomal dominant', 'FBN1 mutation (fibrillin-1)'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Tall, thin habitus with long limbs, arachnodactyly, hypermobile joints.',
                    'Lens subluxation (upward/outward) causing visual disturbances.',
                    'Pectus deformities, scoliosis, and high-arched palate common in adolescence.'
                ]
            },
            {
                heading: 'Critical complications',
                items: [
                    'Progressive aortic root dilation leading to aneurysm or dissection.',
                    'Mitral valve prolapse with regurgitation; risk of sudden cardiac death.',
                    'Dural ectasia causing chronic low back pain and neurologic symptoms.'
                ]
            }
        ],
        pearls: 'Beta-blockers or angiotensin receptor blockers slow aortic dilation; annual echocardiographic surveillance and lifestyle counseling (avoid contact sports) are essential.'
    },
    'fragile-x-syndrome': {
        title: 'Fragile X Syndrome',
        tags: ['X-linked dominant', 'FMR1 CGG repeat expansion'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Developmental delay and intellectual disability, often with autism spectrum behaviors.',
                    'Long, narrow face with large ears, prominent jaw, and high-arched palate.',
                    'Macroorchidism after puberty; hyperextensible joints and mitral valve prolapse.'
                ]
            },
            {
                heading: 'Diagnostic pearls',
                items: [
                    'Fragile site seen on cytogenetic testing due to methylated FMR1 promoter.',
                    'Prenatal diagnosis via chorionic villus sampling or amniocentesis for CGG repeat size.',
                    'Carrier females may have premature ovarian insufficiency or anxiety disorders.'
                ]
            }
        ],
        pearls: 'Early developmental interventions and behavioral therapy improve outcomes; consider genetic counseling for family planning and anticipation of fragile X-associated tremor/ataxia in older carriers.'
    },
    'turner-syndrome': {
        title: 'Turner Syndrome (45,X)',
        tags: ['X chromosome monosomy', 'Mosaicism in ~30%'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Short stature, webbed neck, low posterior hairline, broad chest with widely spaced nipples.',
                    'Streak ovaries causing primary amenorrhea and infertility; coarctation of the aorta or bicuspid aortic valve.',
                    'Lymphedema of hands/feet in neonates; horseshoe kidney and recurrent otitis media.'
                ]
            },
            {
                heading: 'Management essentials',
                items: [
                    'Growth hormone therapy in childhood to optimize adult height.',
                    'Estrogen replacement at puberty for secondary sexual development and bone health.',
                    'Screen for cardiovascular malformations, thyroid disease, and glucose intolerance.'
                ]
            }
        ],
        pearls: 'Elevated FSH/LH with low estrogen is typical; offer fertility counseling (donor oocyte IVF) and evaluate for aortic dilation prior to pregnancy.'
    },
    'nf1': {
        title: 'Neurofibromatosis Type 1',
        tags: ['Autosomal dominant', 'NF1 tumor suppressor (chromosome 17)'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Multiple café-au-lait macules and axillary/inguinal freckling by early childhood.',
                    'Lisch nodules (iris hamartomas) on slit lamp exam; optic pathway gliomas.',
                    'Cutaneous neurofibromas appearing in later childhood or adolescence.'
                ]
            },
            {
                heading: 'Key complications',
                items: [
                    'Learning disabilities, ADHD, and scoliosis are common.',
                    'Risk of malignant peripheral nerve sheath tumors and pheochromocytoma.',
                    'Hypertension from renal artery stenosis or catecholamine excess.'
                ]
            }
        ],
        pearls: 'Diagnosis requires ≥2 NIH criteria (skin findings, family history, or tumors); screen vision and blood pressure annually and counsel on autosomal dominant inheritance with variable expressivity.'
    },
    'pku': {
        title: 'Phenylketonuria (PKU)',
        tags: ['Autosomal recessive', 'Phenylalanine hydroxylase deficiency'],
        sections: [
            {
                heading: 'Classic presentation',
                items: [
                    'Normal at birth but develop intellectual disability without treatment.',
                    'Fair complexion, eczema, and musty/mousy body odor.',
                    'Seizures, growth failure, and microcephaly if phenylalanine is uncontrolled.'
                ]
            },
            {
                heading: 'Diagnostic pearls',
                items: [
                    'Newborn screening detects elevated phenylalanine.',
                    'Maternal PKU causes congenital heart defects, microcephaly, and growth restriction in offspring.',
                    'Tetrahydrobiopterin (BH4) defects present similarly but require cofactor supplementation.'
                ]
            }
        ],
        pearls: 'Lifelong low-phenylalanine diet with tyrosine supplementation prevents neurologic sequelae; women must normalize levels before conception to avoid teratogenic maternal PKU effects.'
    },
    'duchenne': {
        title: 'Duchenne Muscular Dystrophy',
        tags: ['X-linked recessive', 'DMD frameshift/nonsense'],
        sections: [
            {
                heading: 'Classic presentation',
                items: [
                    'Progressive proximal muscle weakness in boys age 2–5 with delayed motor milestones.',
                    'Calf pseudohypertrophy, Gowers sign, and waddling gait.',
                    'Markedly elevated CK and transaminases on screening labs.'
                ]
            },
            {
                heading: 'Key complications',
                items: [
                    'Cardiomyopathy with conduction abnormalities; requires regular cardiac imaging.',
                    'Progressive restrictive lung disease necessitating pulmonary function monitoring.',
                    'Loss of ambulation in adolescence and shortened lifespan without advanced care.'
                ]
            }
        ],
        pearls: 'Genetic testing detects out-of-frame deletions; offer carrier testing to female relatives and initiate glucocorticoids plus supportive respiratory/cardiac management early.'
    },
    'huntington-disease': {
        title: 'Huntington Disease',
        tags: ['Autosomal dominant', 'HTT CAG repeat expansion'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Onset in 30s–40s with choreiform movements and progressive gait instability.',
                    'Psychiatric changes (depression, irritability, psychosis) and cognitive decline.',
                    'Family history with anticipation; earlier and more severe disease through paternal transmission.'
                ]
            },
            {
                heading: 'Diagnostic highlights',
                items: [
                    'Caudate and putamen atrophy with ex vacuo ventriculomegaly on MRI.',
                    'Genetic testing quantifies CAG repeats (>36 pathogenic).',
                    '↓GABA, ↓ACh, and ↓substance P levels in basal ganglia.'
                ]
            }
        ],
        pearls: 'No disease-modifying therapy; manage symptoms (VMAT2 inhibitors for chorea) and provide genetic counseling with presymptomatic testing options for at-risk relatives.'
    }
    ,
    'brca1-2': {
        title: 'BRCA1/2 Hereditary Breast & Ovarian Cancer',
        tags: ['Autosomal dominant', 'BRCA1/2 tumor suppressors'],
        sections: [
            {
                heading: 'Key features',
                items: [
                    'Early-onset breast cancer (often <50 years), bilateral disease and male breast cancer.',
                    'High lifetime ovarian cancer risk; also increased pancreatic and prostate cancer risks.'
                ]
            },
            {
                heading: 'Clinical actions',
                items: [
                    'Offer enhanced surveillance (earlier MRI/mammography), risk-reducing salpingo-oophorectomy, and consideration of bilateral mastectomy.',
                    'PARP inhibitors effective in BRCA-mutant cancers; cascade testing of relatives is high-yield.'
                ]
            }
        ],
        pearls: 'Strongly consider referral for genetic counselling and cascade testing; preventive surgery reduces cancer-specific mortality.'
    },
    'lynch-syndrome': {
        title: 'Lynch Syndrome (HNPCC)',
        tags: ['Autosomal dominant', 'MMR genes: MLH1, MSH2, MSH6, PMS2, EPCAM'],
        sections: [
            {
                heading: 'Clinical features',
                items: [
                    'Early colorectal cancer (median age ~44), endometrial and other GI/urogenital malignancies.',
                    'Family history meeting Amsterdam/Bethesda criteria raises suspicion.'
                ]
            },
            {
                heading: 'Diagnostics & management',
                items: [
                    'Tumor testing for microsatellite instability (MSI) or MMR immunohistochemistry; confirm with germline testing.',
                    'High-intensity surveillance: colonoscopy every 1–2 years starting younger; consider prophylactic hysterectomy after childbearing.'
                ]
            }
        ],
        pearls: 'Recognize families with multiple early cancers—referral for germline testing changes surveillance and management.'
    },
    'familial-hypercholesterolemia': {
        title: 'Familial Hypercholesterolemia (FH)',
        tags: ['Autosomal dominant', 'LDLR / PCSK9 / APOB'],
        sections: [
            {
                heading: 'Presentation',
                items: [
                    'Very high LDL cholesterol from birth, tendon xanthomas, premature atherosclerotic cardiovascular disease.',
                    'Heterozygotes present in adulthood; homozygotes present in childhood with severe ASCVD.'
                ]
            },
            {
                heading: 'Management',
                items: [
                    'Aggressive lipid-lowering: high-intensity statin ± ezetimibe; PCSK9 inhibitors for refractory LDL.',
                    'Cascade screening of first-degree relatives is essential.'
                ]
            }
        ],
        pearls: 'Think FH in young patients with premature ASCVD or very high LDL (>190 mg/dL adult threshold) — early treatment changes outcomes.'
    },
    'hemochromatosis': {
        title: 'Hereditary Hemochromatosis (HFE)',
        tags: ['Autosomal recessive', 'HFE C282Y'],
        sections: [
            {
                heading: 'Clinical clues',
                items: [
                    'Fatigue, bronze skin pigmentation, diabetes, arthropathy, cirrhosis and cardiomyopathy in later stages.',
                    'Often incidental high ferritin or transferrin saturation.'
                ]
            },
            {
                heading: 'Diagnosis & treatment',
                items: [
                    'Screen with transferrin saturation & ferritin; confirm with HFE genotyping and consider liver assessment.',
                    'Mainstay treatment is regular phlebotomy; chelation for non-phlebotomy candidates.'
                ]
            }
        ],
        pearls: 'Detect early via iron studies—phlebotomy before end-organ damage prevents disease progression.'
    },
    'thalassemias': {
        title: 'Thalassemias (α and β)',
        tags: ['Autosomal recessive / gene deletions'],
        sections: [
            {
                heading: 'Key points',
                items: [
                    'Microcytic anemia not corrected by iron suggests thalassemia trait or disease; family ancestry important (Mediterranean, SEA, Middle East).',
                    'β-thalassemia major causes transfusion-dependent anemia; α-thalassemia extremes cause hydrops fetalis or Hb H disease.'
                ]
            },
            {
                heading: 'Investigations & management',
                items: [
                    'Hemoglobin electrophoresis and molecular testing differentiate types; manage severe disease with transfusion, iron chelation, and curative stem-cell transplant in selected cases.'
                ]
            }
        ],
        pearls: 'Use red-cell indices and electrophoresis to differentiate from iron deficiency; avoid unnecessary iron if not deficient.'
    },
    'g6pd-deficiency': {
        title: 'G6PD Deficiency',
        tags: ['X-linked recessive', 'Enzyme deficiency'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Episodic hemolysis triggered by oxidant drugs (primaquine, dapsone, nitrofurantoin), fava beans, or infection.',
                    'Bite cells and Heinz bodies on blood smear during hemolysis.'
                ]
            },
            {
                heading: 'Management',
                items: [
                    'Avoid triggers; supportive care and transfusion for severe hemolysis.'
                ]
            }
        ],
        pearls: 'Screening often considered in at-risk populations before prescribing known oxidant drugs.'
    },
    'hemophilia-a-b': {
        title: 'Hemophilia A & B',
        tags: ['X-linked recessive', 'Factor VIII (A) / Factor IX (B)'],
        sections: [
            {
                heading: 'Presentation',
                items: [
                    'Deep tissue bleeding and hemarthroses in males; prolonged aPTT with normal PT.',
                    'Severity correlates with factor level; severe disease causes spontaneous bleeds.'
                ]
            },
            {
                heading: 'Treatment',
                items: [
                    'Replacement therapy with factor concentrates; prophylaxis reduces joint disease; desmopressin useful in mild Hemophilia A.'
                ]
            }
        ],
        pearls: 'Consider inhibitor formation (antibodies) in patients with poor response to replacement—specialist management required.'
    },
    'von-willebrand-disease': {
        title: 'von Willebrand Disease (vWD)',
        tags: ['Common', 'vWF quantitative/qualitative defects'],
        sections: [
            {
                heading: 'Clinical features',
                items: [
                    'Mucocutaneous bleeding: epistaxis, menorrhagia, easy bruising.',
                    'Laboratory: prolonged bleeding time, variable aPTT, low vWF antigen or activity.'
                ]
            },
            {
                heading: 'Management',
                items: [
                    'Desmopressin (DDAVP) for many type 1 patients; vWF-containing concentrates for severe disease or when DDAVP ineffective.'
                ]
            }
        ],
        pearls: 'Most common inherited bleeding disorder — consider in women with heavy menstrual bleeding.'
    },
    'wilson-disease': {
        title: 'Wilson Disease',
        tags: ['Autosomal recessive', 'ATP7B'],
        sections: [
            {
                heading: 'Presentation',
                items: [
                    'Hepatic dysfunction, neuropsychiatric symptoms, and movement disorders; Kayser–Fleischer rings on slit-lamp exam.',
                    'Young patients with unexplained liver disease or movement disorder should prompt testing.'
                ]
            },
            {
                heading: 'Diagnosis & treatment',
                items: [
                    'Low serum ceruloplasmin, elevated 24-hour urinary copper, and genetic testing confirm diagnosis.',
                    'Chelation with penicillamine or trientine and zinc therapy; early treatment prevents progression.'
                ]
            }
        ],
        pearls: 'Consider Kayser–Fleischer ring and check copper studies in young patients with liver or neuro symptoms.'
    },
    'spinal-muscular-atrophy': {
        title: 'Spinal Muscular Atrophy (SMN1)',
        tags: ['Autosomal recessive', 'SMN1 deletion'],
        sections: [
            {
                heading: 'Presentation',
                items: [
                    'Floppy infant with progressive weakness; spectrum from severe infantile (type 1) to milder later-onset forms.',
                    'Hypotonia, poor feeding, respiratory failure in severe cases.'
                ]
            },
            {
                heading: 'Therapies',
                items: [
                    'Disease-modifying therapies available (nusinersen, risdiplam, onasemnogene gene therapy) — early diagnosis changes outcomes.'
                ]
            }
        ],
        pearls: 'Newborn screening and early treatment are practice-changing; refer to neuromuscular/genetics specialists.'
    },
    'tay-sachs-disease': {
        title: 'Tay–Sachs Disease',
        tags: ['Autosomal recessive', 'HEX A deficiency'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Progressive neurodegeneration in infancy, loss of motor milestones, exaggerated startle, cherry-red macula.',
                    'Common founder risk in Ashkenazi Jewish population; carrier screening reduces incidence.'
                ]
            }
        ],
        pearls: 'No cure; focus on supportive care and carrier screening in high-risk populations.'
    },
    'klinefelter-syndrome': {
        title: 'Klinefelter Syndrome (47,XXY)',
        tags: ['Chromosomal aneuploidy'],
        sections: [
            {
                heading: 'Features',
                items: [
                    'Tall, eunuchoid habitus, small firm testes, infertility, learning difficulties and psychosocial issues.',
                    'Often undiagnosed until fertility evaluation.'
                ]
            },
            {
                heading: 'Management',
                items: [
                    'Testosterone replacement improves secondary sexual development, bone health and mood; fertility options include assisted reproduction.'
                ]
            }
        ],
        pearls: 'Consider in males with small testes, infertility, or learning problems—karyotype confirms diagnosis.'
    },
    'prader-willi-syndrome': {
        title: 'Prader–Willi Syndrome',
        tags: ['Imprinting disorder', 'Loss of paternal 15q11-13 expression'],
        sections: [
            {
                heading: 'Course',
                items: [
                    'Neonatal hypotonia and poor feeding, later hyperphagia, obesity, short stature, hypogonadism and developmental delay.',
                    'Behavioral problems and risk of severe obesity-related complications.'
                ]
            },
            {
                heading: 'Management',
                items: [
                    'Multidisciplinary care: strict diet, growth hormone for short stature, endocrine and behavioral support.'
                ]
            }
        ],
        pearls: 'Recognize the transition from hypotonia/feeding difficulty to hyperphagia in childhood — early nutrition/behavior interventions are critical.'
    },
    'angelman-syndrome': {
        title: 'Angelman Syndrome',
        tags: ['Imprinting disorder', 'Loss of maternal 15q11-13 expression'],
        sections: [
            {
                heading: 'Key features',
                items: [
                    'Severe intellectual disability, ataxia, frequent laughter/smiling ("happy" appearance), seizures and microcephaly.',
                    'Distinctive EEG patterns and developmental regression common.'
                ]
            },
            {
                heading: 'Management',
                items: [
                    'Supportive therapies, seizure control, and genetic counseling; early intervention improves function.'
                ]
            }
        ],
        pearls: 'Differentiate from Prader–Willi by the opposite imprinting pattern and markedly different phenotype.'
    },
    'alpha-1-antitrypsin-deficiency': {
        title: 'Alpha-1 Antitrypsin Deficiency',
        tags: ['Codominant', 'SERPINA1'],
        sections: [
            {
                heading: 'Presentation',
                items: [
                    'Early panacinar emphysema (basilar-predominant) and variable liver disease (cirrhosis), often in younger patients or never-smokers.',
                    'Family history and low serum A1AT level are diagnostic clues.'
                ]
            },
            {
                heading: 'Management',
                items: [
                    'Smoking cessation, bronchodilators, and augmentation therapy with pooled A1AT for selected patients; consider liver transplant for end-stage disease.'
                ]
            }
        ],
        pearls: 'Test alpha-1 levels in younger patients with emphysema or unexplained liver disease.'
    },
    'long-qt-syndrome': {
        title: 'Congenital Long QT Syndromes',
        tags: ['Channelopathies', 'KCNQ1, KCNH2, SCN5A'],
        sections: [
            {
                heading: 'Clinical relevance',
                items: [
                    'Syncope, seizure-like episodes, or sudden cardiac death precipitated by exercise, startle, or drugs.',
                    'ECG shows prolonged QT interval; family history of sudden death is a red flag.'
                ]
            },
            {
                heading: 'Management',
                items: [
                    'Beta-blockers (non-selective) are first-line; avoid QT-prolonging medications; consider ICD for high-risk patients.'
                ]
            }
        ],
        pearls: 'Always check family history and medication lists in unexplained syncope — identification prevents catastrophic arrhythmia.'
    }
};

export function getAllGenetics() {
    return geneticsDatabase;
}
