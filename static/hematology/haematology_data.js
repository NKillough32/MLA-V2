/**
 * Haematology Database
 * Comprehensive guide to haematological conditions and blood film presentations
 */

export const haematologyDatabase = {
    // ANEMIAS - MICROCYTIC
    'iron-deficiency-anaemia': {
        title: 'Iron Deficiency Anaemia',
        category: 'anaemia-microcytic',
        bloodFilm: {
            findings: [
                'Microcytic hypochromic red cells',
                'Anisocytosis (variation in size)',
                'Poikilocytosis (variation in shape)',
                'Target cells (codocytes)',
                'Pencil cells (elliptocytes)'
            ],
            image: 'iron-deficiency.jpg',
            imageDescription: 'Pale, small RBCs with large central pallor (>1/3 of cell diameter)'
        },
        labs: {
            'MCV': '< 80 fL (low)',
            'MCH': 'Low',
            'MCHC': 'Low',
            'Ferritin': '< 15 μg/L (definitive)',
            'Serum Iron': 'Low',
            'TIBC': 'High (> 400 μg/dL)',
            'Transferrin Saturation': '< 15% (low)'
        },
        causes: [
            '<strong>Blood loss</strong> - GI bleeding (most common in men/post-menopausal women), menorrhagia',
            '<strong>Dietary</strong> - Poor intake, vegetarian/vegan diet',
            '<strong>Malabsorption</strong> - Coeliac disease, post-gastrectomy, H. pylori',
            '<strong>Increased demand</strong> - Pregnancy, lactation, growth spurts'
        ],
        clinicalFeatures: [
            '<strong>General anaemia symptoms</strong>: Fatigue, pallor, dyspnoea, headache',
            '<strong>Iron-specific</strong>: Koilonychia (spoon nails), angular stomatitis, glossitis',
            '<strong>Pica</strong> - Craving for ice (pagophagia) or non-food items',
            '<strong>Hair loss and brittle nails</strong>'
        ],
        management: [
            '<strong>Identify and treat underlying cause</strong> - Essential!',
            '<strong>Oral iron</strong>: Ferrous sulfate 200mg TDS (65mg elemental iron per tablet)',
            'Continue for 3 months after Hb normalizes to replenish stores',
            '<strong>IV iron</strong> - If intolerant, malabsorption, or ongoing losses',
            '<strong>Transfusion</strong> - Only if symptomatic or Hb < 70 g/L'
        ]
    },

    'thalassaemia': {
        title: 'Thalassaemia',
        category: 'anaemia-microcytic',
        bloodFilm: {
            findings: [
                'Microcytic hypochromic cells (more marked than IDA)',
                'Target cells (prominent feature)',
                'Basophilic stippling',
                'Nucleated RBCs (in severe cases)',
                'Polychromasia'
            ],
            image: 'thalassemia.jpg',
            imageDescription: 'Numerous target cells, marked microcytosis disproportionate to anaemia'
        },
        types: {
            'Alpha Thalassaemia': {
                genetics: '4 alpha genes on chromosome 16',
                variants: [
                    '<strong>Silent carrier</strong> (1 gene deleted): Normal, no anaemia',
                    '<strong>Alpha thal trait</strong> (2 genes): Mild microcytic anaemia',
                    '<strong>HbH disease</strong> (3 genes): Moderate anaemia, splenomegaly',
                    '<strong>Hb Bart\'s</strong> (4 genes): Incompatible with life (hydrops fetalis)'
                ]
            },
            'Beta Thalassaemia': {
                genetics: '2 beta genes on chromosome 11',
                variants: [
                    '<strong>Thal minor</strong> (heterozygous): Mild microcytic anaemia',
                    '<strong>Thal intermedia</strong>: Moderate anaemia, may need transfusions',
                    '<strong>Thal major</strong> (homozygous): Severe anaemia from 6 months, transfusion-dependent'
                ]
            }
        },
        labs: {
            'MCV': '< 70 fL (very low)',
            'RBC count': 'High (>5.5) despite low Hb',
            'Ferritin': 'Normal or high',
            'Hb electrophoresis': 'HbA2 > 3.5% (beta thal), HbF elevated',
            'Iron studies': 'Normal TIBC and transferrin saturation'
        },
        clinicalFeatures: [
            '<strong>Thal minor</strong>: Usually asymptomatic, mild anaemia',
            '<strong>Thal major</strong>: Severe anaemia, jaundice, hepatosplenomegaly',
            '<strong>Skeletal changes</strong>: Frontal bossing, maxillary overgrowth ("chipmunk facies")',
            '<strong>Growth retardation</strong>',
            '<strong>Iron overload</strong>: From repeated transfusions, causes cardiac, liver, endocrine damage'
        ],
        management: [
            '<strong>Thal minor</strong>: No treatment needed, avoid iron',
            '<strong>Thal major</strong>: Regular blood transfusions (every 2-4 weeks)',
            '<strong>Iron chelation</strong>: Desferrioxamine, deferasirox (prevent iron overload)',
            '<strong>Folic acid</strong> supplementation',
            '<strong>Splenectomy</strong> if hypersplenism',
            '<strong>Bone marrow transplant</strong>: Curative in selected cases'
        ]
    },

    'anaemia-chronic-disease': {
        title: 'Anaemia of Chronic Disease',
        category: 'anaemia-microcytic',
        bloodFilm: {
            findings: [
                'Normocytic or mildly microcytic',
                'Normochromic or slightly hypochromic',
                'Normal RBC morphology (no specific changes)'
            ],
            image: 'normal-blood-film.jpg',
            imageDescription: 'Usually normal appearance or mild microcytosis'
        },
        labs: {
            'MCV': '70-90 fL (normal or low)',
            'Ferritin': 'Normal or high (> 100)',
            'Serum Iron': 'Low',
            'TIBC': 'Low (< 300 μg/dL)',
            'Transferrin Saturation': 'Low-normal',
            'CRP/ESR': 'Elevated (inflammatory markers)'
        },
        causes: [
            '<strong>Chronic infections</strong>: TB, osteomyelitis, endocarditis',
            '<strong>Inflammatory diseases</strong>: RA, IBD, SLE',
            '<strong>Malignancy</strong>',
            '<strong>Chronic kidney disease</strong>'
        ],
        mechanism: 'Hepcidin ↑ → blocks iron release from stores → functional iron deficiency',
        management: [
            '<strong>Treat underlying condition</strong>',
            '<strong>EPO</strong> if CKD',
            '<strong>IV iron</strong> may help in some cases',
            'Oral iron usually ineffective'
        ]
    },

    'sideroblastic-anaemia': {
        title: 'Sideroblastic Anaemia',
        category: 'anaemia-microcytic',
        bloodFilm: {
            findings: [
                'Dimorphic picture (two populations of RBCs)',
                'Hypochromic microcytic cells',
                'Normal or macrocytic cells',
                'Basophilic stippling',
                'Pappenheimer bodies (iron granules)'
            ],
            image: 'basophilic-stippling.jpg',
            imageDescription: 'Dimorphic RBC population with basophilic stippling; ring sideroblasts visible on bone marrow'
        },
        labs: {
            'MCV': 'Low or normal',
            'Ferritin': 'High',
            'Serum Iron': 'High',
            'Transferrin Saturation': 'High',
            'Bone marrow': 'Ring sideroblasts (diagnostic)'
        },
        causes: [
            '<strong>Congenital</strong>: X-linked (ALAS2 mutation)',
            '<strong>Acquired</strong>: Myelodysplasia (most common), alcohol, lead poisoning, drugs (isoniazid)'
        ],
        management: [
            'Pyridoxine (vitamin B6) trial',
            'Treat underlying cause',
            'Avoid iron supplementation',
            'Transfusion if symptomatic'
        ]
    },

    // ANEMIAS - MACROCYTIC
    'b12-deficiency': {
        title: 'Vitamin B12 Deficiency',
        category: 'anaemia-macrocytic',
        bloodFilm: {
            findings: [
                'Macrocytic RBCs (MCV > 100 fL)',
                'Megaloblasts (large immature RBCs)',
                'Hypersegmented neutrophils (> 5 lobes, diagnostic)',
                'Pancytopenia in severe cases',
                'Anisocytosis and poikilocytosis'
            ],
            image: 'hypersegmented-neutrophil.jpg',
            imageDescription: 'Large oval RBCs, hypersegmented neutrophils (pathognomonic)'
        },
        labs: {
            'MCV': '> 100 fL (often > 110)',
            'B12': '< 200 pg/mL',
            'Homocysteine': 'Elevated',
            'Methylmalonic acid': 'Elevated (specific for B12)',
            'LDH': 'High (ineffective erythropoiesis)',
            'Bilirubin': 'Mildly raised (haemolysis)'
        },
        causes: [
            '<strong>Pernicious anaemia</strong> - Anti-IF antibodies, most common in UK',
            '<strong>Dietary</strong> - Strict vegans',
            '<strong>Malabsorption</strong> - Terminal ileum disease (Crohn\'s), post-gastrectomy',
            '<strong>Medications</strong> - Metformin, PPIs (long-term)',
            '<strong>Parasites</strong> - Fish tapeworm (Diphyllobothrium latum)'
        ],
        clinicalFeatures: [
            '<strong>Anaemia symptoms</strong>: Fatigue, pallor, dyspnoea',
            '<strong>Neurological</strong> (specific to B12):',
            '  • Subacute combined degeneration (dorsal columns, corticospinal tracts)',
            '  • Peripheral neuropathy (glove-and-stocking)',
            '  • Cognitive impairment, dementia',
            '  • Optic atrophy',
            '<strong>GI</strong>: Sore tongue (glossitis), angular stomatitis',
            '<strong>Psychiatric</strong>: Depression, psychosis'
        ],
        management: [
            '<strong>Pernicious anaemia / malabsorption</strong>:',
            '  • IM hydroxocobalamin 1mg 3x/week for 2 weeks',
            '  • Then 1mg every 3 months for life',
            '<strong>Dietary deficiency</strong>:',
            '  • Oral cyanocobalamin 50-150 μg daily',
            '<strong>Monitor</strong>: Reticulocyte count (peaks day 5-7)',
            '<strong>Warning</strong>: Give B12 before folate to avoid precipitating subacute combined degeneration'
        ]
    },

    'folate-deficiency': {
        title: 'Folate Deficiency',
        category: 'anaemia-macrocytic',
        bloodFilm: {
            findings: [
                'Identical to B12 deficiency',
                'Macrocytic RBCs',
                'Hypersegmented neutrophils',
                'Megaloblasts'
            ],
            image: 'megaloblastic.jpg',
            imageDescription: 'Cannot distinguish from B12 deficiency on blood film alone'
        },
        labs: {
            'MCV': '> 100 fL',
            'Serum folate': '< 4 ng/mL',
            'Red cell folate': '< 150 ng/mL (more reliable)',
            'Homocysteine': 'Elevated',
            'Methylmalonic acid': 'Normal (unlike B12 deficiency)'
        },
        causes: [
            '<strong>Dietary</strong> - Poor intake (elderly, alcoholics)',
            '<strong>Malabsorption</strong> - Coeliac disease, jejunal disease',
            '<strong>Increased demand</strong> - Pregnancy, haemolysis, malignancy',
            '<strong>Drugs</strong> - Methotrexate, phenytoin, trimethoprim'
        ],
        clinicalFeatures: [
            '<strong>Anaemia symptoms only</strong>',
            '<strong>NO neurological symptoms</strong> (key difference from B12)',
            'Glossitis, angular stomatitis',
            'Neural tube defects in pregnancy (if deficient preconception)'
        ],
        management: [
            '<strong>Oral folic acid</strong> 5mg daily',
            'Duration: Treat until cause corrected',
            '<strong>Prophylaxis in pregnancy</strong>: 400 μg daily (5mg if high risk)',
            '<strong>Never give folate alone without checking B12 first</strong>'
        ]
    },

    'alcohol-macrocytosis': {
        title: 'Alcohol-Related Macrocytosis',
        category: 'anaemia-macrocytic',
        bloodFilm: {
            findings: [
                'Macrocytic RBCs (round macrocytes)',
                'NO hypersegmented neutrophils',
                'Target cells',
                'Acanthocytes (spur cells) if liver disease'
            ],
            image: 'megaloblastic.jpg',
            imageDescription: 'Round macrocytes (vs oval in megaloblastic)'
        },
        labs: {
            'MCV': '100-110 fL',
            'B12 and folate': 'May be low (dietary)',
            'LFTs': 'Often elevated (AST > ALT)',
            'GGT': 'Elevated'
        },
        mechanism: 'Direct toxic effect on marrow, often with folate deficiency',
        management: [
            'Alcohol cessation',
            'Folate and thiamine supplementation',
            'MCV normalizes over 2-4 months after stopping'
        ]
    },

    'hypothyroid-anaemia': {
        title: 'Hypothyroidism-Related Anaemia',
        category: 'anaemia-macrocytic',
        bloodFilm: {
            findings: [
                'Mild macrocytosis',
                'Normal RBC morphology otherwise'
            ],
            image: 'normal-blood-film.jpg',
            imageDescription: 'Non-specific mild macrocytosis'
        },
        labs: {
            'MCV': '95-105 fL (mild elevation)',
            'TSH': 'Elevated',
            'Free T4': 'Low'
        },
        management: [
            'Treat hypothyroidism with levothyroxine',
            'Anaemia resolves with thyroid replacement'
        ]
    },

    // HAEMOLYTIC ANEMIAS - HEREDITARY
    'hereditary-spherocytosis': {
        title: 'Hereditary Spherocytosis',
        category: 'anaemia-haemolytic',
        bloodFilm: {
            findings: [
                'Spherocytes (small, round, dense RBCs)',
                'Loss of central pallor',
                'Polychromasia (reticulocytosis)',
                'No specific size or shape uniformity'
            ],
            image: 'spherocytes.jpg',
            imageDescription: 'Spherical RBCs lacking biconcave shape, dense appearance'
        },
        labs: {
            'Hb': 'Variable (mild to severe anaemia)',
            'MCV': 'Normal or slightly low',
            'MCHC': 'High (diagnostic clue)',
            'Reticulocytes': 'Elevated (5-20%)',
            'Bilirubin': 'Unconjugated hyperbilirubinaemia',
            'Haptoglobin': 'Low',
            'LDH': 'Elevated',
            'Osmotic fragility test': 'Positive (diagnostic)',
            'EMA binding test': 'Reduced (most sensitive)'
        },
        genetics: 'Autosomal dominant (75%), defect in spectrin/ankyrin',
        clinicalFeatures: [
            '<strong>Jaundice</strong> - Chronic, fluctuating',
            '<strong>Splenomegaly</strong> - Common',
            '<strong>Gallstones</strong> - Pigment stones (50% by age 50)',
            '<strong>Aplastic crises</strong> - Parvovirus B19 infection',
            '<strong>Haemolytic crises</strong> - With infections',
            '<strong>Family history</strong> - Often positive'
        ],
        management: [
            '<strong>Folic acid</strong> 5mg daily (increased demand)',
            '<strong>Splenectomy</strong>:',
            '  • Curative for anaemia',
            '  • Indicated if severe anaemia, symptomatic, or frequent crises',
            '  • Vaccinate 2 weeks before (pneumococcal, meningococcal, Hib)',
            '  • Penicillin V prophylaxis post-splenectomy',
            '<strong>Cholecystectomy</strong> if symptomatic gallstones',
            '<strong>Transfusion</strong> during severe crises'
        ]
    },

    'g6pd-deficiency': {
        title: 'G6PD Deficiency',
        category: 'anaemia-haemolytic',
        bloodFilm: {
            findings: [
                'Heinz bodies (denatured Hb, seen with special stain)',
                'Bite cells (RBCs with "bites" taken out)',
                'Blister cells',
                'Polychromasia',
                'Fragmented cells during haemolysis'
            ],
            image: 'g6pd-bite-cells.jpg',
            imageDescription: 'Bite cells and blister cells during acute haemolytic episode'
        },
        labs: {
            'G6PD enzyme assay': 'Low (definitive test)',
            'Timing': 'Test 3 months after acute episode (reticulocytes have normal G6PD)',
            'During crisis': 'Haemolysis markers elevated (↓haptoglobin, ↑LDH, ↑bilirubin)'
        },
        genetics: 'X-linked recessive (males affected, females carriers)',
        triggers: [
            '<strong>Drugs</strong>:',
            '  • Antimalarials: Primaquine, chloroquine',
            '  • Antibiotics: Nitrofurantoin, sulfonamides, quinolones',
            '  • Other: Aspirin (high dose), dapsone, rasburicase',
            '<strong>Infections</strong> - Any severe infection',
            '<strong>Fava beans</strong> (favism)',
            '<strong>Diabetic ketoacidosis</strong>',
            '<strong>Naphthalene</strong> (mothballs)'
        ],
        clinicalFeatures: [
            '<strong>Acute intravascular haemolysis</strong> 2-3 days after trigger',
            '<strong>Dark urine</strong> (haemoglobinuria)',
            '<strong>Jaundice</strong>',
            '<strong>Back/abdominal pain</strong>',
            '<strong>Usually asymptomatic between episodes</strong>'
        ],
        management: [
            '<strong>Avoid triggers</strong> - Patient education critical',
            '<strong>Supportive care</strong> during crisis',
            '<strong>Hydration</strong>',
            '<strong>Transfusion</strong> if severe',
            '<strong>Folic acid supplementation</strong>',
            'Self-limiting if trigger removed'
        ]
    },

    'sickle-cell-disease': {
        title: 'Sickle Cell Disease',
        category: 'anaemia-haemolytic',
        bloodFilm: {
            findings: [
                'Sickle cells (crescent-shaped RBCs)',
                'Target cells',
                'Howell-Jolly bodies (hyposplenism)',
                'Nucleated RBCs',
                'Polychromasia'
            ],
            image: 'howell-jolly-bodies.jpg',
            imageDescription: 'Sickle cells, target cells, and Howell-Jolly bodies (functional hyposplenism)'
        },
        labs: {
            'Hb': '60-80 g/L (chronic)',
            'MCV': 'Normal or slightly high',
            'Reticulocytes': '10-20% (high)',
            'Sickle solubility test': 'Positive (screening)',
            'Hb electrophoresis': 'HbSS (diagnostic)',
            'Bilirubin': 'Unconjugated ↑',
            'LDH': 'High'
        },
        genetics: 'Autosomal recessive, point mutation in β-globin gene (Glu→Val)',
        acuteCrises: {
            'Vaso-occlusive crisis': [
                'Most common',
                'Severe bone pain (dactylitis in children)',
                'Triggered by: dehydration, infection, cold, hypoxia',
                'Management: Analgesia (opioids), hydration, oxygen'
            ],
            'Acute chest syndrome': [
                'Fever, chest pain, pulmonary infiltrates',
                'Leading cause of death',
                'Management: O2, antibiotics, transfusion, analgesia'
            ],
            'Aplastic crisis': [
                'Parvovirus B19 infection',
                'Sudden drop in Hb, low reticulocytes',
                'Management: Transfusion if severe'
            ],
            'Sequestration crisis': [
                'Spleen/liver pooling of RBCs',
                'Rapid drop in Hb, shock',
                'Emergency: Transfusion'
            ],
            'Stroke': [
                '10% of children',
                'Transcranial Doppler screening',
                'Exchange transfusion'
            ]
        },
        chronicComplications: [
            '<strong>Autosplenectomy</strong> - Repeated infarcts by adulthood',
            '<strong>Infection risk</strong> - Encapsulated organisms (pneumococcus, H. influenzae)',
            '<strong>Leg ulcers</strong>',
            '<strong>Priapism</strong>',
            '<strong>Chronic kidney disease</strong>',
            '<strong>Pulmonary hypertension</strong>',
            '<strong>Retinopathy</strong>',
            '<strong>Avascular necrosis</strong> (hip, shoulder)'
        ],
        management: [
            '<strong>Prophylaxis</strong>:',
            '  • Penicillin V daily (lifelong from 3 months)',
            '  • Vaccinations: Pneumococcal, meningococcal, Hib, influenza',
            '  • Folic acid 5mg daily',
            '  • Hydroxycarbamide (↑HbF, reduces crises)',
            '<strong>Acute crisis</strong>: Analgesia, hydration, O2, treat infection',
            '<strong>Transfusion</strong>: For severe anaemia, acute chest, stroke',
            '<strong>Bone marrow transplant</strong>: Curative but high risk',
            '<strong>Gene therapy</strong>: Emerging option'
        ]
    },

    'autoimmune-haemolytic-anaemia': {
        title: 'Autoimmune Haemolytic Anaemia (AIHA)',
        category: 'anaemia-haemolytic',
        bloodFilm: {
            findings: [
                'Spherocytes (IgG-mediated)',
                'Agglutination (cold AIHA)',
                'Polychromasia',
                'Nucleated RBCs',
                'Fragmented cells possible'
            ],
            image: 'spherocytes.jpg',
            imageDescription: 'Spherocytes and clumping in warm AIHA; agglutination in cold AIHA'
        },
        labs: {
            'DAT (Direct Coombs test)': 'Positive (diagnostic)',
            'Haptoglobin': 'Low',
            'LDH': 'High',
            'Bilirubin': 'Unconjugated ↑',
            'Reticulocytes': 'High'
        },
        types: {
            'Warm AIHA (IgG)': {
                temperature: 'Active at 37°C',
                causes: [
                    'Idiopathic (50%)',
                    'Autoimmune: SLE, RA',
                    'Lymphoproliferative: CLL, lymphoma',
                    'Drugs: Methyldopa, penicillin'
                ],
                features: 'Extravascular haemolysis (spleen), spherocytes',
                management: [
                    'Steroids: Prednisolone 1mg/kg',
                    'Rituximab if steroid-refractory',
                    'Splenectomy if chronic',
                    'Immunosuppression: Azathioprine'
                ]
            },
            'Cold AIHA (IgM)': {
                temperature: 'Active at <4°C',
                causes: [
                    'Idiopathic',
                    'Infections: Mycoplasma, EBV',
                    'Lymphoma'
                ],
                features: 'Intravascular haemolysis, acrocyanosis in cold',
                management: [
                    'Keep warm',
                    'Rituximab (steroids less effective)',
                    'Treat underlying cause'
                ]
            }
        },
        clinicalFeatures: [
            'Acute or chronic anaemia',
            'Jaundice',
            'Splenomegaly (warm AIHA)',
            'Acrocyanosis (cold AIHA)',
            'Dark urine (haemoglobinuria)'
        ]
    },

    // NORMOCYTIC ANEMIAS
    'acute-blood-loss': {
        title: 'Acute Blood Loss Anaemia',
        category: 'anaemia-normocytic',
        bloodFilm: {
            findings: [
                'Initially normal',
                'Polychromasia after 2-3 days (reticulocytosis)',
                'Normocytic normochromic RBCs'
            ],
            image: 'normal-blood-film.jpg',
            imageDescription: 'Normal initially, then increased reticulocytes'
        },
        labs: {
            'Hb': 'May be normal initially (dilution takes 24-48h)',
            'MCV': 'Normal',
            'Reticulocytes': 'High after 2-3 days'
        },
        clinicalFeatures: [
            'Depends on volume and rate of loss',
            'Tachycardia, hypotension if >20% loss',
            'Shock if >40% loss'
        ],
        management: [
            'Identify and stop bleeding source',
            'Fluid resuscitation',
            'Transfusion if Hb <70 g/L or symptomatic',
            'Cross-match blood'
        ]
    },

    'aplastic-anaemia': {
        title: 'Aplastic Anaemia',
        category: 'anaemia-normocytic',
        bloodFilm: {
            findings: [
                'Pancytopenia (low RBC, WBC, platelets)',
                'Normocytic RBCs',
                'NO abnormal cells',
                'Relative lymphocytosis'
            ],
            image: 'normal-blood-film.jpg',
            imageDescription: 'Reduced cells of all lineages, normal morphology'
        },
        labs: {
            'Hb': 'Low',
            'WBC': 'Low (neutropenia)',
            'Platelets': 'Low',
            'Reticulocytes': 'Low (hypoproliferative)',
            'Bone marrow': 'Hypocellular (<25% cellularity), fatty replacement'
        },
        causes: [
            '<strong>Idiopathic</strong> (50%)',
            '<strong>Drugs</strong>: Chloramphenicol, carbimazole, gold, NSAIDs',
            '<strong>Chemicals</strong>: Benzene, pesticides',
            '<strong>Viruses</strong>: Hepatitis, EBV, HIV, parvovirus',
            '<strong>Radiation</strong>',
            '<strong>Inherited</strong>: Fanconi anaemia'
        ],
        clinicalFeatures: [
            '<strong>Anaemia</strong>: Fatigue, pallor, dyspnoea',
            '<strong>Neutropenia</strong>: Recurrent infections',
            '<strong>Thrombocytopenia</strong>: Bleeding, bruising, petechiae',
            'NO hepatosplenomegaly or lymphadenopathy'
        ],
        management: [
            '<strong>Supportive</strong>:',
            '  • Transfusions (RBC, platelets)',
            '  • Antibiotics for infections',
            '  • Neutropenic precautions',
            '<strong>Definitive</strong>:',
            '  • Bone marrow transplant (age <40, curative)',
            '  • Immunosuppression: Anti-thymocyte globulin + ciclosporin',
            '<strong>Remove causative agent</strong>'
        ]
    },

    // LEUKAEMIAS
    'acute-myeloid-leukaemia': {
        title: 'Acute Myeloid Leukaemia (AML)',
        category: 'leukaemia',
        bloodFilm: {
            findings: [
                'Blast cells >20% (diagnostic)',
                'Auer rods (pink/red rod-like inclusions in blasts)',
                'Myeloblasts with high N:C ratio',
                'Pancytopenia (anaemia, neutropenia, thrombocytopenia)',
                'Variable WBC (can be low, normal, or very high)'
            ],
            image: 'aml-blasts.jpg',
            imageDescription: 'Large blast cells with prominent nucleoli, Auer rods (pathognomonic for AML)'
        },
        labs: {
            'WBC': 'Variable (low to >100)',
            'Blasts': '>20% in blood or marrow',
            'Hb': 'Low',
            'Platelets': 'Low',
            'Bone marrow': '>20% blasts',
            'Immunophenotyping': 'Myeloid markers (CD13, CD33, MPO+)',
            'Cytogenetics': 'Prognostic (good: t(8;21), inv(16); poor: -5, -7)'
        },
        subtypes: [
            'M0: Minimally differentiated',
            'M1: Without maturation',
            'M2: With maturation',
            'M3: Acute promyelocytic (APL) - t(15;17), Auer rods, DIC',
            'M4: Myelomonocytic',
            'M5: Monocytic',
            'M6: Erythroid',
            'M7: Megakaryoblastic'
        ],
        clinicalFeatures: [
            '<strong>Marrow failure</strong>: Anaemia, infection, bleeding',
            '<strong>Tissue infiltration</strong>: Gum hypertrophy (M5), skin (leukaemia cutis)',
            '<strong>Hepatosplenomegaly</strong>',
            '<strong>DIC</strong> - Especially M3 (APL)',
            '<strong>Tumour lysis syndrome</strong> - After chemotherapy'
        ],
        management: [
            '<strong>APL (M3)</strong>: All-trans retinoic acid (ATRA) + arsenic trioxide - curative',
            '<strong>Other AML</strong>:',
            '  • Induction: Daunorubicin + cytarabine (3+7 regimen)',
            '  • Consolidation chemotherapy',
            '  • Allogeneic stem cell transplant if high-risk',
            '<strong>Supportive</strong>: Transfusions, antibiotics, allopurinol'
        ],
        prognosis: 'Varies by age and cytogenetics; <40 years: 40-50% cure rate'
    },

    'acute-lymphoblastic-leukaemia': {
        title: 'Acute Lymphoblastic Leukaemia (ALL)',
        category: 'leukaemia',
        bloodFilm: {
            findings: [
                'Lymphoblasts >20%',
                'Small to medium blasts with scant cytoplasm',
                'High nucleus:cytoplasm ratio',
                'No Auer rods',
                'Pancytopenia'
            ],
            image: 'all-lymphoblasts.jpg',
            imageDescription: 'Small uniform lymphoblasts with fine chromatin, no granules'
        },
        labs: {
            'WBC': 'Usually high (often >50)',
            'Blasts': '>20%',
            'Hb': 'Low',
            'Platelets': 'Low',
            'Immunophenotyping': 'B-cell (CD19, CD10) or T-cell (CD3, CD7)',
            'Cytogenetics': 't(9;22) Philadelphia chromosome (poor prognosis), t(12;21) (good)'
        },
        clinicalFeatures: [
            '<strong>Marrow failure</strong>: Anaemia, infection, bleeding',
            '<strong>Lymphadenopathy</strong>',
            '<strong>Hepatosplenomegaly</strong>',
            '<strong>CNS involvement</strong> - Headache, cranial nerve palsies',
            '<strong>Mediastinal mass</strong> - T-cell ALL',
            '<strong>Testicular infiltration</strong>'
        ],
        management: [
            '<strong>Induction</strong>: Vincristine, steroid, asparaginase ± anthracycline',
            '<strong>Consolidation</strong>: High-dose chemotherapy',
            '<strong>CNS prophylaxis</strong>: Intrathecal methotrexate',
            '<strong>Maintenance</strong>: 2-3 years (6-mercaptopurine, methotrexate)',
            '<strong>Philadelphia+</strong>: Add tyrosine kinase inhibitor (imatinib)',
            '<strong>Stem cell transplant</strong> if high-risk'
        ],
        prognosis: 'Children: 85-90% cure; Adults: 40% cure'
    },

    'chronic-myeloid-leukaemia': {
        title: 'Chronic Myeloid Leukaemia (CML)',
        category: 'leukaemia',
        bloodFilm: {
            findings: [
                'Marked leucocytosis (often >100)',
                'Full spectrum of myeloid cells (blasts to neutrophils)',
                'Basophilia (increased basophils)',
                'Eosinophilia',
                '<10% blasts in chronic phase',
                'Thrombocytosis common'
            ],
            image: 'cml-basophilia.jpg',
            imageDescription: 'Neutrophilia with left shift, full myeloid maturation spectrum visible'
        },
        labs: {
            'WBC': '50-500 x10⁹/L',
            'Basophils': 'Increased (diagnostic clue)',
            'Philadelphia chromosome': 't(9;22) BCR-ABL (95% positive, diagnostic)',
            'NAP score': 'Low (vs high in reactive leucocytosis)',
            'Uric acid': 'High',
            'B12': 'High'
        },
        phases: {
            'Chronic phase (85% at diagnosis)': [
                'Often asymptomatic',
                '<10% blasts',
                'Responds well to TKI',
                'Median 5-6 years'
            ],
            'Accelerated phase': [
                '10-20% blasts',
                'Increasing basophils',
                'Progressive splenomegaly',
                'Thrombocytopenia'
            ],
            'Blast crisis': [
                '>20% blasts (like acute leukaemia)',
                'Poor prognosis',
                '2/3 myeloid, 1/3 lymphoid'
            ]
        },
        clinicalFeatures: [
            '<strong>Often asymptomatic</strong> - Found incidentally',
            '<strong>Massive splenomegaly</strong> (70%)',
            '<strong>Hypermetabolic symptoms</strong>: Weight loss, sweats, fatigue',
            '<strong>Gout</strong> - High cell turnover'
        ],
        management: [
            '<strong>1st line: Tyrosine kinase inhibitor (TKI)</strong>',
            '  • Imatinib (Glivec) 400mg daily - 85% 10-year survival',
            '  • Dasatinib, nilotinib if resistant',
            '<strong>Allogeneic stem cell transplant</strong>: Only curative option',
            '<strong>Hydroxycarbamide</strong>: If TKI contraindicated',
            '<strong>Monitor BCR-ABL levels</strong> (PCR) every 3 months'
        ],
        prognosis: 'Excellent with TKI - near-normal life expectancy'
    },

    'chronic-lymphocytic-leukaemia': {
        title: 'Chronic Lymphocytic Leukaemia (CLL)',
        category: 'leukaemia',
        bloodFilm: {
            findings: [
                'Lymphocytosis (small, mature lymphocytes)',
                'Smudge/smear cells (fragile lymphocytes)',
                'Monomorphic small lymphocytes',
                'Occasional prolymphocytes (<10%)'
            ],
            image: 'cll-smudge-cells.jpg',
            imageDescription: 'Abundant small mature lymphocytes, smudge cells (pathognomonic)'
        },
        labs: {
            'WBC': '>5 with lymphocytes >5 (diagnostic)',
            'Immunophenotyping': 'CD5+, CD19+, CD23+ (diagnostic)',
            'Ig levels': 'Hypogammaglobulinaemia (late)',
            'DAT': 'May be positive (AIHA)',
            'LDH': 'Normal or slightly raised'
        },
        staging: {
            'Binet': [
                'Stage A: <3 lymphoid areas - median survival >10 years',
                'Stage B: ≥3 lymphoid areas - median survival 5-7 years',
                'Stage C: Anaemia (<100) or platelets (<100) - median survival 2-4 years'
            ],
            'Rai (US)': [
                'Stage 0: Lymphocytosis only',
                'Stage I-II: + lymphadenopathy/organomegaly',
                'Stage III-IV: + anaemia/thrombocytopenia'
            ]
        },
        clinicalFeatures: [
            '<strong>50% asymptomatic</strong> - Incidental finding',
            '<strong>Lymphadenopathy</strong> - Painless, symmetrical',
            '<strong>Hepatosplenomegaly</strong>',
            '<strong>B symptoms</strong>: Fever, weight loss, night sweats',
            '<strong>Recurrent infections</strong> - Hypogammaglobulinaemia',
            '<strong>Autoimmune complications</strong>: AIHA, ITP'
        ],
        complications: [
            '<strong>Richter transformation</strong> - Transforms to aggressive lymphoma (5%)',
            '<strong>AIHA/ITP</strong>',
            '<strong>Infections</strong> - Leading cause of death',
            '<strong>Second malignancies</strong>'
        ],
        management: [
            '<strong>Watch and wait</strong> if asymptomatic early stage',
            '<strong>Indications to treat</strong>:',
            '  • Progressive marrow failure',
            '  • Massive splenomegaly',
            '  • Constitutional symptoms',
            '  • Autoimmune complications',
            '<strong>Treatment</strong>:',
            '  • FCR: Fludarabine, cyclophosphamide, rituximab (fit patients)',
            '  • Ibrutinib (BTK inhibitor) or venetoclax (BCL-2 inhibitor)',
            '  • Chlorambucil + obinutuzumab (elderly)',
            '<strong>IVIG</strong> if recurrent infections',
            '<strong>Radiotherapy</strong> for bulky nodes'
        ],
        prognosis: 'Median survival 10 years; early stage may have normal lifespan'
    },

    // MYELOPROLIFERATIVE DISORDERS
    'polycythaemia-vera': {
        title: 'Polycythaemia Vera',
        category: 'myeloproliferative',
        bloodFilm: {
            findings: [
                'Increased RBC count and Hb',
                'Normal RBC morphology',
                'Often increased WBC (neutrophilia)',
                'Often increased platelets (thrombocytosis)'
            ],
            image: 'polycythaemia-vera.jpg',
            imageDescription: 'Increased RBC concentration, normal morphology'
        },
        labs: {
            'Hb': '>165 g/L (men), >160 g/L (women)',
            'Haematocrit': '>0.52 (men), >0.48 (women)',
            'JAK2 V617F mutation': 'Positive in 95% (diagnostic)',
            'EPO': 'Low (vs high in secondary polycythaemia)',
            'WBC': 'Often high',
            'Platelets': 'Often high',
            'Uric acid': 'High'
        },
        clinicalFeatures: [
            '<strong>Hyperviscosity</strong>: Headache, dizziness, visual disturbance, stroke',
            '<strong>Thrombosis</strong>: DVT, PE, MI, stroke, Budd-Chiari',
            '<strong>Bleeding</strong> - Paradoxical due to platelet dysfunction',
            '<strong>Pruritus</strong> - Especially after hot bath (aquagenic)',
            '<strong>Plethoric appearance</strong> - Red face',
            '<strong>Splenomegaly</strong> (75%)',
            '<strong>Gout</strong> - High cell turnover',
            '<strong>Peptic ulcers</strong> - Increased histamine'
        ],
        management: [
            '<strong>Target Hct <0.45</strong>',
            '<strong>Venesection</strong>: First-line, 400-500ml weekly until Hct normal',
            '<strong>Aspirin 75mg</strong> daily - Reduce thrombosis risk',
            '<strong>Hydroxycarbamide</strong>: If high-risk (age >60, thrombosis history)',
            '<strong>Ruxolitinib</strong> (JAK2 inhibitor) if resistant',
            '<strong>Allopurinol</strong> for hyperuricaemia',
            '<strong>Antihistamines</strong> for pruritus'
        ],
        complications: [
            'Thrombosis (30%)',
            'Transformation to myelofibrosis (15-20%)',
            'Transformation to AML (5-10%)'
        ],
        prognosis: 'Median survival 15-20 years with treatment'
    },

    'essential-thrombocythaemia': {
        title: 'Essential Thrombocythaemia',
        category: 'myeloproliferative',
        bloodFilm: {
            findings: [
                'Marked thrombocytosis (>450, often >1000)',
                'Large platelets',
                'Platelet anisocytosis (variation in size)',
                'Megakaryocyte fragments',
                'Abnormal platelet forms'
            ],
            image: 'essential-thrombocythaemia.jpg',
            imageDescription: 'Markedly increased platelets with size variation'
        },
        labs: {
            'Platelets': '>450 x10⁹/L sustained',
            'JAK2 V617F': 'Positive 50%',
            'CALR mutation': 'Positive 25%',
            'MPL mutation': 'Positive 5%',
            'Bone marrow': 'Megakaryocyte proliferation'
        },
        clinicalFeatures: [
            '<strong>Often asymptomatic</strong>',
            '<strong>Thrombosis</strong>: Arterial > venous (stroke, MI, DVT)',
            '<strong>Microvascular symptoms</strong>: Headache, visual disturbance, erythromelalgia',
            '<strong>Bleeding</strong> - Acquired von Willebrand syndrome (if platelets >1500)',
            '<strong>Splenomegaly</strong> - Mild',
            '<strong>Erythromelalgia</strong> - Burning pain in hands/feet, relieved by aspirin'
        ],
        management: [
            '<strong>Risk stratification</strong>:',
            '  • Low risk (age <60, no thrombosis): Aspirin alone',
            '  • High risk (age >60 or thrombosis): Cytoreduction + aspirin',
            '<strong>Aspirin 75mg</strong> daily (unless platelet >1500 - bleeding risk)',
            '<strong>Hydroxycarbamide</strong>: First-line cytoreduction',
            '<strong>Anagrelide</strong>: Alternative if HU intolerant',
            '<strong>Target platelets <400</strong>'
        ],
        prognosis: 'Near-normal life expectancy; 1-4% transform to AML/myelofibrosis'
    },

    'myelofibrosis': {
        title: 'Myelofibrosis',
        category: 'myeloproliferative',
        bloodFilm: {
            findings: [
                'Leukoerythroblastic picture (tear drop cells + nucleated RBCs)',
                'Dacrocytes/tear drop poikilocytes (hallmark)',
                'Nucleated red cells',
                'Giant platelets',
                'Left shift in WBC'
            ],
            image: 'myelofibrosis.jpg',
            imageDescription: 'Tear drop cells (dacrocytes) - pathognomonic'
        },
        labs: {
            'Hb': 'Low (anaemia)',
            'WBC': 'Variable',
            'Platelets': 'Variable (high early, low late)',
            'JAK2 V617F': 'Positive 50%',
            'LDH': 'High',
            'Bone marrow': 'Dry tap (fibrosis), reticulin/collagen fibrosis on biopsy'
        },
        clinicalFeatures: [
            '<strong>Massive splenomegaly</strong> (extramedullary haematopoiesis)',
            '<strong>B symptoms</strong>: Fever, sweats, weight loss',
            '<strong>Abdominal discomfort</strong> - Spleen',
            '<strong>Bone pain</strong>',
            '<strong>Gout</strong>',
            '<strong>Portal hypertension</strong>'
        ],
        management: [
            '<strong>Allogeneic stem cell transplant</strong>: Only curative (age <65)',
            '<strong>JAK inhibitor</strong>: Ruxolitinib - reduces spleen size, symptoms',
            '<strong>Supportive</strong>:',
            '  • Transfusions for anaemia',
            '  • Hydroxycarbamide if WBC/platelet high',
            '  • Splenectomy if massive/symptomatic',
            '  • Folic acid'
        ],
        prognosis: 'Median survival 5-7 years; 10-20% transform to AML'
    },

    // COAGULATION DISORDERS
    'haemophilia-a-b': {
        title: 'Haemophilia A & B',
        category: 'coagulation',
        bloodFilm: {
            findings: [
                'Normal blood film',
                'Anaemia if bleeding'
            ],
            image: 'normal-blood-film.jpg',
            imageDescription: 'Normal - coagulation disorder, not visible on film'
        },
        labs: {
            'APTT': 'Prolonged',
            'PT': 'Normal',
            'Bleeding time': 'Normal',
            'Factor VIII': 'Low in Haemophilia A',
            'Factor IX': 'Low in Haemophilia B (Christmas disease)',
            'vWF': 'Normal (distinguishes from vWD)'
        },
        genetics: 'X-linked recessive (males affected, females carriers)',
        severity: [
            '<strong>Severe</strong> (<1% factor): Spontaneous bleeds, joint/muscle bleeds',
            '<strong>Moderate</strong> (1-5%): Bleeds with minor trauma',
            '<strong>Mild</strong> (5-40%): Bleeds with surgery/major trauma'
        ],
        clinicalFeatures: [
            '<strong>Haemarthrosis</strong> - Spontaneous joint bleeds (knees, ankles, elbows)',
            '<strong>Muscle haematomas</strong>',
            '<strong>Prolonged bleeding</strong> after trauma/surgery',
            '<strong>Intracranial haemorrhage</strong> - Life-threatening',
            '<strong>No petechiae or mucosal bleeding</strong> (platelet function normal)',
            '<strong>Chronic arthropathy</strong> from repeated haemarthroses'
        ],
        management: [
            '<strong>Factor replacement</strong>:',
            '  • Haemophilia A: Factor VIII concentrate',
            '  • Haemophilia B: Factor IX concentrate',
            '<strong>Prophylaxis</strong> (severe): Regular factor infusions 2-3x/week',
            '<strong>Acute bleeds</strong>: Factor replacement immediately',
            '<strong>Desmopressin (DDAVP)</strong>: Mild Haemophilia A (releases stored FVIII)',
            '<strong>Tranexamic acid</strong>: Adjunct for mucosal bleeding',
            '<strong>Gene therapy</strong>: Emerging treatment',
            '<strong>Avoid</strong>: NSAIDs, aspirin, IM injections'
        ],
        complications: [
            'Chronic joint disease',
            'Inhibitor development (antibodies to factor VIII/IX) - 20-30%',
            'Transfusion-transmitted infections (historical)'
        ]
    },

    'von-willebrand-disease': {
        title: 'Von Willebrand Disease',
        category: 'coagulation',
        bloodFilm: {
            findings: [
                'Normal blood film',
                'May have mild thrombocytopenia (Type 2B)'
            ],
            image: 'normal-blood-film.jpg',
            imageDescription: 'Normal - coagulation disorder'
        },
        labs: {
            'APTT': 'Normal or prolonged',
            'Bleeding time': 'Prolonged',
            'vWF antigen': 'Low',
            'vWF activity (ristocetin cofactor)': 'Low',
            'Factor VIII': 'Low or normal (vWF carries FVIII)',
            'Platelet count': 'Normal (except Type 2B)'
        },
        genetics: 'Autosomal dominant (most common inherited bleeding disorder)',
        types: {
            'Type 1 (70%)': [
                'Partial quantitative deficiency',
                'Mild bleeding',
                'All vWF multimers present but reduced'
            ],
            'Type 2 (25%)': [
                'Qualitative defect',
                '2A: Loss of high molecular weight multimers',
                '2B: Increased platelet binding',
                '2M: Decreased platelet binding',
                '2N: Decreased FVIII binding'
            ],
            'Type 3 (5%)': [
                'Complete deficiency',
                'Severe bleeding',
                'Very rare, autosomal recessive'
            ]
        },
        clinicalFeatures: [
            '<strong>Mucocutaneous bleeding</strong> (platelet-type):',
            '  • Epistaxis (most common)',
            '  • Menorrhagia',
            '  • Easy bruising',
            '  • Gum bleeding',
            '  • Prolonged bleeding after dental work/surgery',
            '<strong>Joint/muscle bleeds rare</strong> (unlike haemophilia)',
            '<strong>Family history</strong> common'
        ],
        management: [
            '<strong>Type 1/2A/2M</strong>:',
            '  • Desmopressin (DDAVP) - Releases vWF stores (first-line)',
            '  • Tranexamic acid for minor bleeding',
            '<strong>Type 2B/2N/3</strong>:',
            '  • vWF/FVIII concentrate (Desmopressin contraindicated in 2B)',
            '<strong>Hormonal therapy</strong>: Combined OCP for menorrhagia',
            '<strong>Avoid</strong>: Aspirin, NSAIDs'
        ]
    },

    'dic': {
        title: 'Disseminated Intravascular Coagulation (DIC)',
        category: 'coagulation',
        bloodFilm: {
            findings: [
                'Schistocytes/fragmented RBCs (helmet cells, triangular cells)',
                'Thrombocytopenia',
                'Spherocytes',
                'Nucleated RBCs'
            ],
            image: 'schistocytes.jpg',
            imageDescription: 'Fragmented RBCs (schistocytes) - microangiopathic haemolysis'
        },
        labs: {
            'Platelets': 'Low',
            'PT': 'Prolonged',
            'APTT': 'Prolonged',
            'Fibrinogen': 'Low',
            'D-dimer': 'Very high (>4000)',
            'FDP': 'Elevated',
            'Blood film': 'Schistocytes'
        },
        causes: [
            '<strong>Sepsis</strong> - Most common (Gram-negative)',
            '<strong>Malignancy</strong> - APL (M3), mucin-secreting adenocarcinoma',
            '<strong>Obstetric</strong> - Abruption, amniotic fluid embolism, retained dead fetus',
            '<strong>Trauma</strong> - Major tissue injury, burns',
            '<strong>Liver disease</strong>',
            '<strong>Transfusion reaction</strong>'
        ],
        pathophysiology: 'Widespread activation of coagulation → consumes clotting factors + platelets → bleeding AND thrombosis',
        clinicalFeatures: [
            '<strong>Bleeding</strong>: Oozing from venepuncture sites, surgical wounds, mucosal',
            '<strong>Thrombosis</strong>: Digital ischaemia, renal failure, stroke',
            '<strong>Microangiopathic haemolytic anaemia</strong>',
            '<strong>Organ dysfunction</strong>: AKI, ARDS, hepatic failure'
        ],
        management: [
            '<strong>Treat underlying cause</strong> - Essential!',
            '<strong>Supportive</strong>:',
            '  • Platelet transfusion if <50 and bleeding',
            '  • FFP if prolonged PT/APTT and bleeding',
            '  • Cryoprecipitate if fibrinogen <1.5',
            '  • RBC transfusion for anaemia',
            '<strong>Heparin</strong> - Controversial, consider if thrombosis dominant',
            '<strong>APL</strong>: ATRA (treats cause)'
        ],
        prognosis: 'High mortality (30-50%), depends on underlying cause'
    },

    'itp': {
        title: 'Immune Thrombocytopenic Purpura (ITP)',
        category: 'coagulation',
        bloodFilm: {
            findings: [
                'Thrombocytopenia (<100)',
                'Large platelets (megathrombocytes)',
                'Otherwise normal RBC and WBC morphology'
            ],
            image: 'normal-blood-film.jpg',
            imageDescription: 'Reduced platelet count with occasional large platelets'
        },
        labs: {
            'Platelets': '<100 (often <30)',
            'Bone marrow': 'Increased megakaryocytes (if done)',
            'Antiplatelet antibodies': 'Often present but not routinely tested',
            'All other counts': 'Normal (isolated thrombocytopenia)'
        },
        types: {
            'Primary ITP': 'Autoimmune destruction of platelets',
            'Secondary ITP': 'SLE, CLL, HIV, H. pylori, drugs (heparin, quinine)'
        },
        clinicalFeatures: [
            '<strong>Petechiae and purpura</strong>',
            '<strong>Mucosal bleeding</strong> - Epistaxis, gum bleeding, menorrhagia',
            '<strong>Easy bruising</strong>',
            '<strong>Intracranial haemorrhage</strong> - Rare but life-threatening (if <10)',
            '<strong>No splenomegaly</strong> (unlike other causes of low platelets)'
        ],
        diagnosis: 'Diagnosis of exclusion - must rule out other causes of thrombocytopenia',
        management: [
            '<strong>Platelets >30 and asymptomatic</strong>: Observe only',
            '<strong>Platelets <30 or bleeding</strong>:',
            '  • Prednisolone 1mg/kg for 2-4 weeks',
            '  • IVIG if severe bleeding or emergency surgery',
            '  • Anti-D (if Rh+) - alternative to IVIG',
            '<strong>Second-line</strong>:',
            '  • Rituximab',
            '  • Thrombopoietin receptor agonists (eltrombopag, romiplostim)',
            '  • Splenectomy (if refractory)',
            '<strong>Emergency (ICH risk)</strong>:',
            '  • Platelet transfusion',
            '  • IVIG',
            '  • High-dose steroids',
            '<strong>H. pylori eradication</strong> if positive'
        ],
        prognosis: '80% of children remit spontaneously; adults often chronic'
    },

    'ttp': {
        title: 'Thrombotic Thrombocytopenic Purpura (TTP)',
        category: 'coagulation',
        bloodFilm: {
            findings: [
                'Schistocytes (fragmented RBCs) - prominent',
                'Thrombocytopenia',
                'Polychromasia (reticulocytosis)',
                'Nucleated RBCs'
            ],
            image: 'schistocytes.jpg',
            imageDescription: 'Numerous schistocytes - microangiopathic haemolytic anaemia'
        },
        labs: {
            'Platelets': 'Low (<30 typically)',
            'Haptoglobin': 'Undetectable',
            'LDH': 'Very high',
            'Bilirubin': 'Unconjugated ↑',
            'PT/APTT': 'Normal (unlike DIC)',
            'ADAMTS13': '<10% activity (severe deficiency)',
            'Creatinine': 'May be elevated'
        },
        pentad: [
            '<strong>Microangiopathic haemolytic anaemia</strong> (schistocytes)',
            '<strong>Thrombocytopenia</strong>',
            '<strong>Neurological symptoms</strong> (fluctuating, headache, confusion, seizures, stroke)',
            '<strong>Renal impairment</strong>',
            '<strong>Fever</strong>',
            '',
            '<strong>Note</strong>: Only need triad (MAHA + low platelets + symptoms) to diagnose'
        ],
        pathophysiology: 'ADAMTS13 deficiency → ultra-large vWF multimers → platelet microthrombi',
        clinicalFeatures: [
            '<strong>Fluctuating neurological signs</strong> - Confusion, seizures, stroke',
            '<strong>Purpura and petechiae</strong>',
            '<strong>Abdominal pain</strong>',
            '<strong>Cardiac ischaemia</strong>',
            '<strong>Medical emergency</strong> - high mortality if untreated'
        ],
        management: [
            '<strong>URGENT plasma exchange</strong> - Life-saving, start immediately',
            '  • Continue daily until platelets >150 and LDH normalizing',
            '<strong>Steroids</strong>: Prednisolone 1mg/kg',
            '<strong>Rituximab</strong>: Reduces relapse',
            '<strong>Caplacizumab</strong>: Anti-vWF antibody (if available)',
            '<strong>Avoid platelet transfusion</strong> - May worsen thrombosis',
            '<strong>Folic acid</strong>'
        ],
        prognosis: '90% survival with prompt plasma exchange; 10% if untreated'
    },

    // LYMPHOMAS
    'hodgkin-lymphoma': {
        title: 'Hodgkin Lymphoma',
        category: 'lymphoma',
        bloodFilm: {
            findings: [
                'Usually normal',
                'May have lymphocytosis',
                'Eosinophilia (in some cases)',
                'Anaemia (in advanced disease)'
            ],
            image: 'normal-blood-film.jpg',
            imageDescription: 'Reed-Sternberg cells (large binucleate "owl-eye" cells) seen on lymph node biopsy, not blood'
        },
        labs: {
            'FBC': 'Often normal; may have anaemia, eosinophilia',
            'ESR': 'Often raised (prognostic)',
            'LDH': 'May be elevated',
            'Lymph node biopsy': 'Reed-Sternberg cells in inflammatory background (diagnostic)'
        },
        subtypes: [
            '<strong>Nodular sclerosing (70%)</strong> - Young adults, mediastinal mass',
            '<strong>Mixed cellularity (20%)</strong> - Older patients, associated with EBV',
            '<strong>Lymphocyte-rich (5%)</strong> - Best prognosis',
            '<strong>Lymphocyte-depleted (rare)</strong> - Worst prognosis, HIV-associated'
        ],
        clinicalFeatures: [
            '<strong>Painless lymphadenopathy</strong> - Cervical/supraclavicular most common',
            '<strong>Contiguous spread</strong> - Spreads to adjacent node groups',
            '<strong>B symptoms</strong> (30%): Fever >38°C, drenching night sweats, weight loss >10%',
            '<strong>Alcohol-induced pain</strong> in nodes (rare but specific)',
            '<strong>Pruritus</strong>',
            '<strong>Mediastinal mass</strong> - SVC obstruction, cough'
        ],
        staging: {
            'Ann Arbor': [
                '<strong>Stage I</strong>: Single lymph node region',
                '<strong>Stage II</strong>: ≥2 regions, same side of diaphragm',
                '<strong>Stage III</strong>: Both sides of diaphragm',
                '<strong>Stage IV</strong>: Extranodal spread (liver, bone marrow, lung)',
                '',
                '<strong>A</strong> = No B symptoms',
                '<strong>B</strong> = B symptoms present (worse prognosis)'
            ]
        },
        management: [
            '<strong>Early stage (I-II)</strong>: ABVD chemotherapy 2-4 cycles ± radiotherapy',
            '<strong>Advanced stage (III-IV)</strong>: ABVD 6 cycles or escalated BEACOPP',
            '<strong>ABVD</strong> = Adriamycin, Bleomycin, Vinblastine, Dacarbazine',
            '<strong>Relapsed/refractory</strong>: Salvage chemotherapy + autologous stem cell transplant',
            '<strong>Brentuximab vedotin</strong>: Anti-CD30 for relapsed disease',
            '<strong>PET-CT</strong> for response assessment'
        ],
        prognosis: '80-90% cure rate overall; excellent in early stage'
    },

    'non-hodgkin-lymphoma': {
        title: 'Non-Hodgkin Lymphoma',
        category: 'lymphoma',
        bloodFilm: {
            findings: [
                'Variable depending on subtype',
                'May have lymphocytosis or circulating lymphoma cells',
                'Pancytopenia if marrow infiltration'
            ],
            image: 'normal-blood-film.jpg',
            imageDescription: 'Abnormal lymphocytes may be seen; morphology varies by subtype'
        },
        types: {
            'Indolent (Low-grade)': {
                examples: [
                    '<strong>Follicular lymphoma</strong> - t(14;18) BCL-2, waxing/waning nodes',
                    '<strong>Marginal zone lymphoma</strong> - MALT, gastric (H. pylori)',
                    '<strong>Small lymphocytic lymphoma</strong> - Same as CLL'
                ],
                features: 'Slow-growing, often incurable but long survival',
                management: '<strong>Watch and wait</strong> if asymptomatic; rituximab + chemotherapy if symptomatic'
            },
            'Aggressive (High-grade)': {
                examples: [
                    '<strong>Diffuse large B-cell lymphoma (DLBCL)</strong> - Most common (30%)',
                    '<strong>Burkitt lymphoma</strong> - t(8;14) MYC, jaw mass in Africa, abdominal in West',
                    '<strong>Mantle cell lymphoma</strong> - t(11;14), GI involvement',
                    '<strong>T-cell lymphomas</strong> - Peripheral T-cell, anaplastic large cell'
                ],
                features: 'Rapid growth, curable with treatment',
                management: '<strong>R-CHOP</strong> chemotherapy (rituximab + cyclophosphamide, doxorubicin, vincristine, prednisolone)'
            }
        },
        clinicalFeatures: [
            '<strong>Lymphadenopathy</strong> - May be peripheral or internal',
            '<strong>Non-contiguous spread</strong> (unlike Hodgkin)',
            '<strong>Extranodal involvement common</strong> - GI, bone marrow, CNS',
            '<strong>B symptoms</strong> - More common in aggressive types',
            '<strong>Hepatosplenomegaly</strong>'
        ],
        specialCases: {
            'Burkitt Lymphoma': [
                'Fastest-growing human tumour (doubling time 24-48h)',
                'Starry sky appearance (histology)',
                'Endemic (Africa, jaw mass, EBV+) vs Sporadic (West, abdominal)',
                'High tumour lysis syndrome risk',
                'Treatment: Intensive chemotherapy + CNS prophylaxis'
            ],
            'MALT Lymphoma': [
                'Marginal zone lymphoma of mucosa-associated lymphoid tissue',
                'Gastric most common (H. pylori-associated)',
                'Treatment: H. pylori eradication often curative in early stage'
            ]
        },
        prognosis: 'Variable; DLBCL 60% cure with R-CHOP; indolent types long survival but rarely cured'
    },

    // MULTIPLE MYELOMA
    'multiple-myeloma': {
        title: 'Multiple Myeloma',
        category: 'plasma-cell',
        bloodFilm: {
            findings: [
                'Rouleaux formation (RBCs stack like coins)',
                'Normocytic normochromic anaemia',
                'Plasma cells may be seen (normally <2%)',
                'Leukoerythroblastic picture if marrow infiltration'
            ],
            image: 'rouleaux.jpg',
            imageDescription: 'Rouleaux formation (RBC stacking) - due to high paraprotein'
        },
        labs: {
            'Hb': 'Low (anaemia)',
            'Calcium': 'High (bone resorption)',
            'Creatinine': 'Often high (myeloma kidney)',
            'Paraprotein': 'Monoclonal IgG or IgA (serum protein electrophoresis)',
            'Free light chains': 'Elevated κ or λ ratio abnormal',
            'Bence-Jones protein': 'Urine (light chains)',
            'Bone marrow': '>10% clonal plasma cells (diagnostic)',
            'β2-microglobulin': 'Prognostic marker'
        },
        diagnosticCriteria: [
            '<strong>≥10% clonal plasma cells</strong> in marrow OR biopsy-proven plasmacytoma',
            '<strong>PLUS</strong> one or more of:',
            '  • End-organ damage (CRAB criteria)',
            '  • ≥60% plasma cells',
            '  • Free light chain ratio ≥100',
            '  • >1 focal lesion on MRI'
        ],
        crabCriteria: [
            '<strong>C</strong> - <strong>Calcium</strong> elevated (>2.75 mmol/L)',
            '<strong>R</strong> - <strong>Renal impairment</strong> (Cr >177 μmol/L)',
            '<strong>A</strong> - <strong>Anaemia</strong> (Hb <100 g/L)',
            '<strong>B</strong> - <strong>Bone lesions</strong> (lytic lesions, osteoporosis)'
        ],
        clinicalFeatures: [
            '<strong>Bone pain</strong> - Back pain most common',
            '<strong>Pathological fractures</strong>',
            '<strong>Hypercalcaemia</strong> - Confusion, constipation, polyuria',
            '<strong>Renal failure</strong> - Light chain cast nephropathy',
            '<strong>Infections</strong> - Recurrent (immune paresis)',
            '<strong>Anaemia symptoms</strong>',
            '<strong>Hyperviscosity</strong> - Visual disturbance, bleeding, confusion',
            '<strong>Spinal cord compression</strong> - Emergency!'
        ],
        imaging: [
            '<strong>Skeletal survey</strong>: Lytic lesions ("punched out"), pathological fractures',
            '<strong>Whole-body MRI</strong>: More sensitive, replacing skeletal survey',
            '<strong>Skull X-ray</strong>: "Pepper-pot skull"'
        ],
        management: [
            '<strong>Transplant candidates (age <70, fit)</strong>:',
            '  • Induction: Bortezomib + thalidomide/lenalidomide + dexamethasone',
            '  • Stem cell harvest',
            '  • High-dose melphalan + autologous stem cell transplant',
            '<strong>Non-transplant</strong>:',
            '  • Continuous chemotherapy (VTD or VRD)',
            '<strong>Supportive</strong>:',
            '  • Bisphosphonates (zoledronic acid) - Prevent bone disease',
            '  • Radiotherapy for bone pain/pathological fractures',
            '  • Plasmapheresis if hyperviscosity',
            '  • Treat hypercalcaemia (fluids, bisphosphonates)',
            '  • Prophylactic aciclovir if on bortezomib',
            '<strong>Relapsed</strong>: Daratumumab (anti-CD38), carfilzomib, pomalidomide'
        ],
        prognosis: 'Median survival 5-7 years; not curable but increasingly chronic disease'
    }
};
