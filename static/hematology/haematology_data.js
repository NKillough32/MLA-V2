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
            alternativeImages: ['Iron Deficiency Anemia Moderate.jpg'],
            imageDescription: 'Red blood cells appear pale (hypochromic) with central pallor exceeding 1/3 of cell diameter, indicating reduced haemoglobin content. Cells are noticeably smaller than normal (microcytic). Variation in cell size (anisocytosis) and shape (poikilocytosis) is evident. Some cells show target cell appearance ("bull\'s eye"), and elongated pencil-shaped cells may be visible. These features reflect inadequate iron availability for haemoglobin synthesis.'
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
            alternativeImages: ['Beta-thalassemia major.jpg'],
            imageDescription: 'Numerous target cells (codocytes) with characteristic "bull\'s eye" appearance are the hallmark finding. Red cells show marked microcytosis that is disproportionate to the degree of anaemia (unlike iron deficiency). Basophilic stippling (blue-purple dots from ribosomal RNA) may be visible. In severe cases, nucleated red blood cells appear in peripheral circulation. The microcytosis is often more pronounced than in iron deficiency, with MCV typically <70 fL despite relatively preserved haemoglobin levels.'
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
            image: 'sideroblastic-anaemia.jpg',
            imageDescription: 'Characteristic dimorphic blood picture showing two distinct red cell populations: small, pale hypochromic cells alongside normal-sized or larger cells. Basophilic stippling (remnant ribosomal material) appears as fine blue dots scattered throughout some RBCs. Pappenheimer bodies (iron-containing granules) may be visible. The pathognomonic finding is ring sideroblasts in bone marrow (erythroblasts with iron-laden mitochondria forming a ring around the nucleus), seen with Prussian blue staining. This pattern reflects defective haem synthesis despite adequate iron stores.'
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
            image: 'Megaloblastic anemia.jpg',
            alternativeImages: ['megaloblastic.jpg', 'Hypersegmented neutrophil.jpg', 'hypersegmented-neutrophil.jpg'],
            imageDescription: 'Red blood cells are enlarged (macrocytic, MCV >100 fL) and oval-shaped (macro-ovalocytes), a distinctive feature of megaloblastic anaemia. The pathognomonic finding is hypersegmented neutrophils with ≥6 nuclear lobes (normal is 3-5 lobes), reflecting nuclear-cytoplasmic maturation asynchrony due to impaired DNA synthesis. Variation in cell size and shape is prominent. In severe deficiency, pancytopenia occurs with both red and white cell lineages affected. These changes are identical in B12 and folate deficiency and can only be distinguished by biochemical testing.'
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
            alternativeImages: ['Megaloblastic anemia.jpg'],
            imageDescription: 'Blood film appearance is morphologically identical to vitamin B12 deficiency and cannot be distinguished by microscopy alone. Large, oval-shaped red cells (macro-ovalocytes) dominate the film. Hypersegmented neutrophils with ≥6 nuclear lobes are present. The megaloblastic changes result from impaired DNA synthesis affecting all rapidly dividing cells. Unlike B12 deficiency, folate deficiency does NOT cause neurological damage, but the haematological picture is indistinguishable. Differentiation requires biochemical testing (serum/RBC folate levels, homocysteine elevated but methylmalonic acid normal).'
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
            image: 'non-megaloblastic macrocytosis.jpg',
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
            imageDescription: 'Spherocytes appear as small, densely staining red cells that have lost their normal biconcave disc shape and central pallor. They appear as uniformly dark, round cells due to increased cell density (elevated MCHC). The spherical shape results from membrane loss due to defects in RBC cytoskeletal proteins (spectrin, ankyrin). Polychromasia (blue-tinged cells) indicates increased reticulocyte production in response to haemolysis. These fragile spherical cells are trapped and destroyed in the spleen, leading to chronic extravascular haemolysis. The osmotic fragility test shows increased lysis in hypotonic saline.'
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
            imageDescription: 'Bite cells (degmacytes) show characteristic semi-circular indentations where splenic macrophages have removed Heinz bodies (denatured haemoglobin precipitates). Blister cells appear with haemoglobin pushed to one side. Heinz bodies are not visible on routine staining but require supravital stains (crystal violet/methyl violet). These features appear during acute oxidative haemolytic episodes triggered by drugs, infection, or fava beans. G6PD deficiency impairs the pentose phosphate pathway, leaving RBCs vulnerable to oxidative damage. Between episodes, the blood film may appear entirely normal.'
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
            image: 'sickle cell anemia.jpg',
            alternativeImages: ['sickle-cell.jpg'],
            imageDescription: 'Pathognomonic crescent or sickle-shaped red blood cells result from HbS polymerization under deoxygenated conditions. The abnormal haemoglobin (βGlu6Val mutation) forms rigid polymers, distorting cell shape. Target cells (codocytes) are common. Howell-Jolly bodies (nuclear remnants, small purple inclusions) indicate functional hyposplenism from repeated splenic infarction (autosplenectomy). Nucleated RBCs and polychromasia reflect bone marrow stress from chronic haemolysis. The percentage of irreversibly sickled cells correlates with disease severity. Sickle cells cause vaso-occlusion, leading to painful crises and organ damage.'
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
            alternativeImages: ['aml-auer-rods.jpg', 'Myeloblast with Auer rod.jpg', 'AML without maturation - 2..jpg'],
            imageDescription: 'Large myeloblasts dominate the blood film, characterized by high nucleus-to-cytoplasm ratio, fine chromatin, and prominent nucleoli. Auer rods are pathognomonic pink-red needle-like cytoplasmic inclusions formed from abnormal fusion of primary granules - their presence confirms myeloid lineage and excludes ALL. Blasts comprise >20% of cells (diagnostic threshold). Background shows pancytopenia with reduced normal mature cells. Myeloblasts may show varying degrees of maturation (M0-M7 FAB classification). The presence of numerous circulating blasts reflects bone marrow failure and uncontrolled proliferation of malignant myeloid precursors.'
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
            alternativeImages: ['B-Cell acute lymphoblastic leukemia.jpg', 'T-cell acute lymphoblastic leukemia.jpg'],
            imageDescription: 'Lymphoblasts are generally smaller and more uniform than myeloblasts, with higher nucleus-to-cytoplasm ratios and scant basophilic cytoplasm. Nuclear chromatin is finely dispersed with small, indistinct nucleoli. Critically, Auer rods are ABSENT (their presence would indicate AML). Lymphoblasts comprise >20% of cells. Background pancytopenia reflects marrow replacement. B-cell ALL (more common, 85%) and T-cell ALL appear morphologically similar on routine staining and require immunophenotyping (CD19+/CD10+ for B-ALL, CD3+/CD7+ for T-ALL) for definitive classification. ALL blasts are typically PAS-positive (glycogen).'
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
            imageDescription: 'Dramatic leucocytosis with the complete myeloid maturation spectrum visible in peripheral blood: myeloblasts, promyelocytes, myelocytes, metamyelocytes, bands, and mature neutrophils ("left shift to immaturity"). This orderly maturation distinguishes CML from acute leukaemia. Increased basophils are a key diagnostic clue (basophilia). Eosinophils are also elevated. In chronic phase, blasts remain <10%. Platelet count is often elevated. The Philadelphia chromosome t(9;22) creating BCR-ABL fusion is diagnostic. Low neutrophil alkaline phosphatase (NAP) score helps distinguish from reactive leucocytosis.'
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
            alternativeImages: ['Smudge cells.jpg'],
            imageDescription: 'Numerous small, mature-appearing lymphocytes with clumped chromatin and scant cytoplasm dominate the film. Smudge cells (Gumprecht shadows) are pathognomonic - these are ruptured lymphocytes appearing as bare nuclei smeared across the slide, reflecting cell fragility due to abnormal cytoskeleton. The lymphocytes are monomorphic (uniform appearance) with <10% larger prolymphocytes. Despite mature appearance, these are clonal malignant B-cells (CD5+/CD19+/CD23+). The blood film alone raises suspicion, but diagnosis requires immunophenotyping showing absolute lymphocyte count >5×10⁹/L with characteristic markers.'
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
            imageDescription: 'Markedly increased red blood cell concentration (haematocrit >0.52 in men, >0.48 in women) with cells tightly packed together. RBC morphology is typically normal - cells maintain normal size and shape without the abnormalities seen in other conditions. Often shows panmyelosis with increased neutrophils and platelets alongside the erythrocytosis. The diagnosis requires JAK2 V617F mutation (95% positive) and low erythropoietin to distinguish from secondary polycythaemia. High RBC mass leads to hyperviscosity symptoms. Background is relatively "clean" without dysplastic features.'
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
            image: 'Giant_platelets.jpg',
            alternativeImages: ['Essential thrombocythemia.jpg', 'essential-thrombocythaemia.jpg'],
            imageDescription: 'Dramatically elevated platelet count (often >1000×10⁹/L) with striking platelet anisocytosis (marked variation in size). Giant platelets approaching the size of red blood cells are characteristic. Abnormal platelet morphology including megakaryocyte fragments and bizarre forms may be seen. Despite high numbers, platelets show functional abnormalities causing both thrombosis (most common) and paradoxical bleeding (when very elevated >1500, acquired von Willebrand syndrome). JAK2 V617F (50%), CALR (25%), or MPL (5%) mutations confirm clonality. RBCs and WBCs are typically normal, distinguishing from other myeloproliferative neoplasms.'
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
            imageDescription: 'Classic leukoerythroblastic blood picture: tear-drop cells (dacrocytes) are the pathognomonic finding, formed as RBCs are forced through fibrotic bone marrow. Nucleated red blood cells (normoblasts) and immature white cells appear in peripheral blood due to extramedullary haematopoiesis. Giant, abnormal platelets are common. The combination of tear-drops + nucleated RBCs + left shift is highly suggestive of marrow infiltration or fibrosis. Bone marrow aspiration produces "dry tap" due to fibrosis; trephine biopsy shows reticulin/collagen fibrosis. This appearance can be primary myelofibrosis or secondary to PV/ET progression.'
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
            imageDescription: 'Schistocytes (fragmented red cells) appear as helmet cells, triangular fragments, and other irregular RBC fragments resulting from mechanical shearing through fibrin strands in small vessels (microangiopathic haemolytic anaemia). >1% schistocytes is abnormal. Thrombocytopenia reflects platelet consumption in widespread microthrombi. This combination of schistocytes + low platelets + coagulopathy (prolonged PT/APTT, low fibrinogen, high D-dimer) is diagnostic of DIC. Simultaneous bleeding and thrombosis occur. The blood film is critical for rapid diagnosis in this life-threatening emergency.'
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
            imageDescription: 'Prominent rouleaux formation showing red blood cells stacked in linear "coin-stack" formations like rolls of coins. This results from elevated plasma proteins (paraprotein - monoclonal immunoglobulin) reducing the negative charge between RBCs, allowing them to aggregate. While mild rouleaux can occur in inflammation, extensive rouleaux suggests paraproteinaemia (myeloma, Waldenström\'s). Background shows normocytic normochromic anaemia. Plasma cells (normally <2%) may be visible in peripheral blood in advanced disease. This finding should prompt protein electrophoresis and investigation for plasma cell dyscrasia.'
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
    },

    // ADDITIONAL BLOOD FILM FINDINGS
    'howell-jolly-bodies': {
        title: 'Howell-Jolly Bodies (Post-Splenectomy/Hyposplenism)',
        category: 'rbc-inclusions',
        bloodFilm: {
            findings: [
                'Howell-Jolly bodies (small round nuclear remnants)',
                'Target cells',
                'Acanthocytes (in severe liver disease)',
                'Pappenheimer bodies may be present',
                'Occasional nucleated RBCs'
            ],
            image: 'howell-jolly-bodies.jpg',
            alternativeImages: ['Howell-Jolly bodies.jpg'],
            imageDescription: 'Howell-Jolly bodies appear as small, round, dark purple inclusions (1-2 μm) within red blood cells, representing DNA remnants (nuclear fragments). Normally, the spleen removes these inclusions, so their presence indicates splenic dysfunction (hyposplenism/asplenia). Usually one inclusion per cell, located eccentrically near the cell margin. Common causes include post-splenectomy, sickle cell disease (autosplenectomy), coeliac disease, and congenital asplenia. Associated findings include target cells, acanthocytes, and occasionally nucleated RBCs. Patients are at increased infection risk from encapsulated organisms (pneumococcus, meningococcus, H. influenzae) requiring vaccinations and prophylactic antibiotics.'
        },
        causes: [
            '<strong>Post-splenectomy</strong> - Most common',
            '<strong>Functional hyposplenism</strong>: Sickle cell disease, coeliac disease',
            '<strong>Severe megaloblastic anaemia</strong>',
            '<strong>Myelodysplasia</strong>',
            '<strong>Congenital asplenia</strong>'
        ],
        clinicalSignificance: [
            'Marker of splenic dysfunction',
            'Increased infection risk from encapsulated organisms',
            'Requires vaccinations (pneumococcal, meningococcal, Hib)',
            'Lifelong penicillin prophylaxis post-splenectomy'
        ],
        management: [
            '<strong>Vaccinations</strong>: 2 weeks before splenectomy or immediately after if emergency',
            '  • Pneumococcal (PCV13 + PPV23)',
            '  • Meningococcal ACWY and B',
            '  • Haemophilus influenzae B',
            '  • Annual influenza',
            '<strong>Antibiotic prophylaxis</strong>: Penicillin V 250-500mg BD lifelong',
            '<strong>Patient education</strong>: Seek immediate medical attention for fever',
            '<strong>Medical alert card/bracelet</strong>'
        ]
    },

    'malaria': {
        title: 'Malaria (Plasmodium Infection)',
        category: 'rbc-parasites',
        bloodFilm: {
            findings: [
                'Intraerythrocytic parasites (ring forms, trophozoites, schizonts)',
                'Pigment (hemozoin) within parasitized RBCs',
                'Gametocytes (P. falciparum: banana-shaped)',
                'Multiple parasites per RBC (P. falciparum)',
                'Schüffner\'s dots (P. vivax, P. ovale)'
            ],
            image: 'malaria-falciparum.jpg',
            alternativeImages: ['Malaria Gametocyte of Plasmodium Falciparum.jpg'],
            imageDescription: 'Malaria parasites appear within red blood cells in various morphological stages. Plasmodium falciparum (most dangerous): early ring forms (small rings with 1-2 chromatin dots), multiple rings per RBC common, banana-shaped gametocytes are pathognomonic. P. vivax/ovale: larger rings, enlarged RBCs, Schüffner\'s dots (fine red stippling), oval gametocytes. P. malariae: band forms, rosette schizonts. Brown-black malarial pigment (hemozoin from digested haemoglobin) is visible in mature parasites and monocytes. Diagnosis requires thick films (sensitivity) and thin films (species identification). Parasitaemia >2% in falciparum indicates severe disease requiring urgent treatment.'
        },
        species: {
            'P. falciparum': [
                'Most dangerous - causes cerebral malaria, severe disease',
                'Multiple rings per RBC',
                'Only rings and gametocytes in peripheral blood',
                'Banana-shaped gametocytes (pathognomonic)',
                'High parasitaemia possible (>2% severe)',
                'No relapse (no liver stage)'
            ],
            'P. vivax': [
                'Most common globally',
                'Enlarged RBCs',
                'Schüffner\'s dots',
                'All stages in blood',
                'Hypnozoites cause relapse (needs primaquine)'
            ],
            'P. ovale': [
                'Similar to P. vivax',
                'Oval, fimbriated RBCs',
                'Relapsing (hypnozoites)'
            ],
            'P. malariae': [
                'Band forms characteristic',
                'Rosette schizonts (8-10 merozoites)',
                'Quartan fever (72h cycle)',
                'No relapse'
            ],
            'P. knowlesi': [
                'Zoonotic (from macaques)',
                'Resembles P. falciparum/malariae',
                '24h cycle',
                'Can be severe'
            ]
        },
        clinicalFeatures: [
            '<strong>Classic triad</strong>: Fever, rigors, sweating (cyclical)',
            '<strong>Severe malaria (P. falciparum)</strong>:',
            '  • Cerebral malaria - Seizures, coma',
            '  • Severe anaemia',
            '  • Acute kidney injury',
            '  • Acute respiratory distress syndrome',
            '  • Hypoglycaemia',
            '  • Shock (algid malaria)',
            '  • Blackwater fever (massive haemolysis)',
            '<strong>Splenomegaly</strong>',
            '<strong>Jaundice</strong>'
        ],
        diagnosis: [
            '<strong>Thick blood film</strong>: Screening (high sensitivity)',
            '<strong>Thin blood film</strong>: Species identification, parasitaemia count',
            '<strong>Rapid diagnostic tests (RDT)</strong>: Detect malaria antigens',
            '<strong>PCR</strong>: Most sensitive, species-specific',
            'Take samples during fever spikes',
            'Repeat if initial negative but high suspicion'
        ],
        management: [
            '<strong>Uncomplicated P. falciparum</strong>:',
            '  • Artemisinin combination therapy (ACT)',
            '  • Artemether-lumefantrine (Riamet) 1st line UK',
            '  • Atovaquone-proguanil (Malarone)',
            '<strong>Severe/complicated falciparum</strong>:',
            '  • IV artesunate (drug of choice)',
            '  • ICU admission',
            '  • Monitor parasitaemia daily',
            '<strong>P. vivax/ovale</strong>:',
            '  • Chloroquine (if sensitive)',
            '  • Primaquine to clear hypnozoites (check G6PD first!)',
            '<strong>P. malariae</strong>: Chloroquine',
            '<strong>Supportive</strong>: Fluids, transfusion if severe anaemia, anticonvulsants'
        ],
        prevention: [
            '<strong>Chemoprophylaxis</strong>: Depends on destination resistance patterns',
            '<strong>Mosquito avoidance</strong>: DEET, nets, protective clothing',
            '<strong>Awareness</strong>: Fever in returned traveller = malaria until proven otherwise'
        ]
    },

    'basophilic-stippling': {
        title: 'Basophilic Stippling',
        category: 'rbc-inclusions',
        bloodFilm: {
            findings: [
                'Fine or coarse blue-purple dots throughout RBC cytoplasm',
                'May be seen with other RBC abnormalities',
                'Variable number of stippled cells'
            ],
            image: 'basophilic-stippling.jpg',
            imageDescription: 'Basophilic stippling appears as fine or coarse blue-purple dots scattered throughout the red cell cytoplasm, representing aggregates of residual ribosomal RNA. Fine stippling can be seen in many conditions affecting erythropoiesis. Coarse stippling is more significant and suggests specific pathology. The intensity and coarseness vary by cause. Common in lead poisoning (characteristic coarse stippling), thalassaemia, sideroblastic anaemia, and megaloblastic anaemia. Also seen with accelerated erythropoiesis. While not specific, the pattern and associated findings help narrow differential diagnosis.'
        },
        causes: {
            'Coarse stippling (more specific)': [
                '<strong>Lead poisoning</strong> - Classic association',
                '<strong>Thalassaemia</strong>',
                '<strong>Sideroblastic anaemia</strong>',
                '<strong>Pyrimidine 5\' nucleotidase deficiency</strong> (rare)'
            ],
            'Fine stippling (non-specific)': [
                '<strong>Megaloblastic anaemia</strong>',
                '<strong>Haemolytic anaemia</strong>',
                '<strong>Myelodysplastic syndromes</strong>',
                '<strong>Alcoholism</strong>',
                '<strong>Liver disease</strong>',
                '<strong>Accelerated erythropoiesis</strong>'
            ]
        },
        leadPoisoning: {
            features: [
                '<strong>Coarse basophilic stippling</strong> - Characteristic',
                '<strong>Microcytic anaemia</strong>',
                '<strong>Elevated blood lead level</strong>',
                '<strong>Elevated free erythrocyte protoporphyrin (FEP)</strong>',
                '<strong>Urinary coproporphyrin</strong>'
            ],
            clinicalFeatures: [
                '<strong>Abdominal pain</strong> (lead colic)',
                '<strong>Neurological</strong>: Peripheral neuropathy (wrist drop), encephalopathy',
                '<strong>Gum lead line</strong> (Burton\'s line)',
                '<strong>Renal impairment</strong>',
                '<strong>Behavioural changes in children</strong>'
            ],
            management: [
                '<strong>Remove exposure</strong>',
                '<strong>Chelation therapy</strong> if symptomatic or very high levels:',
                '  • EDTA (calcium disodium edetate)',
                '  • Dimercaprol (BAL)',
                '  • DMSA (succimer) - oral option',
                '<strong>Supportive care</strong>'
            ]
        }
    },

    'poikilocytosis': {
        title: 'Poikilocytosis (Abnormal RBC Shapes)',
        category: 'rbc-morphology',
        bloodFilm: {
            findings: [
                'Various abnormal RBC shapes',
                'May include multiple types simultaneously'
            ],
            image: 'Poikilocytes_-_Red_blood_cell_types.jpg',
            imageDescription: 'Poikilocytosis refers to variation in red blood cell shape (from Greek "poikilos" = varied). This educational image shows multiple poikilocyte types: (1) Echinocytes (burr cells) - regular small projections; (2) Acanthocytes (spur cells) - irregular projections, seen in liver disease, abetalipoproteinaemia; (3) Schistocytes (fragments) - helmet cells, microangiopathic haemolysis; (4) Spherocytes - round, dense, no central pallor; (5) Target cells - bull\'s eye appearance; (6) Stomatocytes - mouth-like central pallor; (7) Elliptocytes/ovalocytes - oval shape, hereditary elliptocytosis; (8) Tear drops (dacrocytes) - myelofibrosis; (9) Sickle cells - HbS disease. The specific types present provide diagnostic clues to underlying pathology.'
        },
        types: {
            'Spherocytes': 'Hereditary spherocytosis, AIHA',
            'Target cells': 'Liver disease, thalassaemia, HbC, iron deficiency, post-splenectomy',
            'Schistocytes': 'Microangiopathic haemolysis (DIC, TTP, HUS, mechanical valves)',
            'Sickle cells': 'Sickle cell disease',
            'Elliptocytes': 'Hereditary elliptocytosis, iron deficiency, megaloblastic anaemia',
            'Tear drops (dacrocytes)': 'Myelofibrosis, marrow infiltration',
            'Acanthocytes': 'Liver disease, abetalipoproteinaemia, post-splenectomy',
            'Echinocytes (burr cells)': 'Uraemia, pyruvate kinase deficiency, artefact',
            'Stomatocytes': 'Hereditary stomatocytosis, alcoholism, liver disease',
            'Bite cells': 'G6PD deficiency'
        },
        clinicalSignificance: 'The pattern of poikilocytosis helps narrow differential diagnosis; specific shapes point to particular disorders'
    },

    // MYELODYSPLASTIC SYNDROME
    'myelodysplastic-syndrome': {
        title: 'Myelodysplastic Syndrome (MDS)',
        category: 'myeloproliferative',
        bloodFilm: {
            findings: [
                'Cytopenias (anaemia most common)',
                'Dysplastic cells (abnormal morphology)',
                'Hypogranular neutrophils',
                'Pseudo-Pelger-Huët anomaly (bilobed neutrophils)',
                'Macrocytosis',
                'Variable blast percentage (<20%)'
            ],
            image: 'normal-blood-film.jpg',
            imageDescription: 'Blood film shows cytopenias with dysplastic features: hypogranular or agranular neutrophils, pseudo-Pelger-Huët cells (neutrophils with only 2 lobes instead of normal 3-5), macrocytic red cells, and circulating blasts (but <20%, which would indicate AML). Monocytosis may be present. The hallmark is dysplasia (abnormal maturation) across multiple cell lineages. Bone marrow shows hypercellular marrow with dysplastic changes, increased blasts (5-19%), and often ring sideroblasts. MDS is a clonal stem cell disorder characterized by ineffective haematopoiesis leading to peripheral cytopenias despite a cellular marrow.'
        },
        labs: {
            'Hb': 'Low (anaemia in 80%)',
            'MCV': 'Often high (macrocytic)',
            'WBC': 'Low or normal',
            'Neutrophils': 'Often low',
            'Platelets': 'Low (thrombocytopenia)',
            'Bone marrow': 'Hypercellular with dysplasia, 5-19% blasts',
            'Cytogenetics': 'Abnormal in 50% (del(5q), -7, trisomy 8)',
            'Reticulocytes': 'Low (inappropriately low for anaemia)'
        },
        classification: {
            'WHO Classification': [
                '<strong>MDS with single lineage dysplasia</strong>',
                '<strong>MDS with multilineage dysplasia</strong>',
                '<strong>MDS with ring sideroblasts</strong> (>15% ring sideroblasts)',
                '<strong>MDS with excess blasts</strong> (5-19% blasts)',
                '<strong>MDS with isolated del(5q)</strong> - Best prognosis',
                '<strong>MDS, unclassifiable</strong>'
            ],
            'Risk Stratification (IPSS-R)': [
                'Very low / Low risk - Watch and wait',
                'Intermediate risk - Consider treatment',
                'High / Very high risk - Intensive treatment, transplant'
            ]
        },
        clinicalFeatures: [
            '<strong>Anaemia symptoms</strong> - Fatigue, dyspnoea (most common presentation)',
            '<strong>Infections</strong> - Due to neutropenia',
            '<strong>Bleeding/bruising</strong> - Due to thrombocytopenia',
            '<strong>Often elderly patients</strong> (median age 70)',
            '<strong>Asymptomatic</strong> - 30% found incidentally',
            '<strong>Hepatosplenomegaly</strong> - Rare (unlike leukaemia)'
        ],
        causes: [
            '<strong>Primary (idiopathic)</strong> - 80-90%',
            '<strong>Secondary (therapy-related)</strong>:',
            '  • Previous chemotherapy (alkylating agents, topoisomerase inhibitors)',
            '  • Previous radiotherapy',
            '  • Occurs 5-10 years after treatment',
            '<strong>Risk factors</strong>: Benzene exposure, smoking, previous chemotherapy'
        ],
        complications: [
            '<strong>Transformation to AML</strong> - 30% of cases (main concern)',
            '<strong>Severe infections</strong>',
            '<strong>Bleeding</strong>',
            '<strong>Iron overload</strong> - From repeated transfusions'
        ],
        management: [
            '<strong>Low-risk MDS</strong>:',
            '  • Watch and wait if asymptomatic',
            '  • RBC transfusions (maintain Hb >80-90)',
            '  • Erythropoietin (EPO) if EPO <500 and low transfusion need',
            '  • Lenalidomide for del(5q)',
            '<strong>High-risk MDS</strong>:',
            '  • Azacitidine or decitabine (hypomethylating agents) - improves survival',
            '  • Allogeneic stem cell transplant (only curative option, age <65-70)',
            '<strong>Supportive care</strong>:',
            '  • Transfusions (RBC, platelets)',
            '  • Iron chelation if >20 units transfused (deferasirox)',
            '  • G-CSF for severe neutropenia',
            '  • Antibiotics for infections',
            '<strong>Novel agents</strong>: Luspatercept (for ring sideroblasts)'
        ],
        prognosis: [
            'Highly variable based on risk score',
            'Low risk: Median survival 5-10 years',
            'High risk: Median survival <1 year',
            'Transplant can cure but carries significant morbidity/mortality'
        ]
    },

    // ACUTE INTERMITTENT PORPHYRIA
    'acute-intermittent-porphyria': {
        title: 'Acute Intermittent Porphyria (AIP)',
        category: 'rbc-disorders',
        bloodFilm: {
            findings: [
                'Usually normal blood film',
                'No specific haematological changes'
            ],
            image: 'normal-blood-film.jpg',
            imageDescription: 'Blood film is typically normal. Acute intermittent porphyria is a metabolic disorder affecting haem synthesis, not a primary blood disorder. The diagnosis is biochemical (urine porphobilinogen) rather than morphological. During acute attacks, there are no characteristic blood film findings. This is included in haematology because it affects the haem biosynthesis pathway, but clinical presentation is primarily neurological and abdominal rather than haematological.'
        },
        genetics: 'Autosomal dominant, deficiency of porphobilinogen deaminase (PBGD/HMBS gene)',
        pathophysiology: 'Defective haem synthesis → accumulation of toxic porphyrin precursors (ALA and PBG) → neurotoxicity',
        labs: {
            'Urine during attack': 'Dark red/brown urine on standing',
            'Urine PBG': 'Very high during acute attack (diagnostic)',
            'Urine ALA': 'Elevated',
            'FBC': 'Normal',
            'Urea & electrolytes': 'May show hyponatraemia (SIADH)',
            'LFTs': 'May be mildly abnormal'
        },
        clinicalFeatures: [
            '<strong>Classic triad</strong>: Abdominal pain + Neuropsychiatric symptoms + Autonomic dysfunction',
            '<strong>Abdominal pain</strong> - Severe, colicky, no peritonism (most common)',
            '<strong>Neurological</strong>:',
            '  • Peripheral neuropathy (motor > sensory)',
            '  • Acute ascending paralysis (can mimic Guillain-Barré)',
            '  • Seizures',
            '  • Confusion, psychosis, hallucinations',
            '<strong>Autonomic dysfunction</strong>:',
            '  • Tachycardia, hypertension',
            '  • Constipation, vomiting',
            '  • Urinary retention',
            '<strong>Hyponatraemia</strong> - SIADH common',
            '<strong>Dark urine</strong> - Red/brown on standing (oxidized porphyrins)',
            '',
            '<strong>Triggers of acute attacks</strong>:',
            '  • Drugs: Barbiturates, sulfonamides, alcohol, oral contraceptives, many others',
            '  • Hormonal: Menstruation, pregnancy',
            '  • Fasting/low-calorie diets',
            '  • Stress, infection',
            '  • Smoking'
        ],
        diagnosis: [
            '<strong>During acute attack</strong>:',
            '  • Urine PBG and ALA elevated (diagnostic)',
            '  • Urine darkens on standing',
            '<strong>Between attacks</strong>:',
            '  • May be normal',
            '  • Genetic testing (HMBS mutation)',
            '<strong>Family screening</strong> recommended'
        ],
        differentialDiagnosis: [
            'Acute abdomen (appendicitis, cholecystitis)',
            'Guillain-Barré syndrome',
            'Lead poisoning',
            'Acute psychosis'
        ],
        management: [
            '<strong>Acute attack</strong>:',
            '  • IV haem arginate (Normosang) 3mg/kg daily for 4 days - SPECIFIC TREATMENT',
            '  • High carbohydrate intake (IV glucose 10% if needed) - suppresses ALA synthase',
            '  • Analgesia (opiates safe)',
            '  • Treat hyponatraemia',
            '  • Stop precipitating drugs',
            '<strong>Supportive</strong>:',
            '  • Monitor respiratory function (may need ventilation)',
            '  • Antiemetics',
            '  • Beta-blockers for tachycardia/hypertension',
            '<strong>Prevention</strong>:',
            '  • Avoid triggers (critical - provide patient with safe drug list)',
            '  • Avoid fasting',
            '  • MedicAlert bracelet',
            '  • Consider prophylactic haem arginate for recurrent attacks',
            '  • Genetic counselling'
        ],
        prognosis: 'Good if diagnosed and triggers avoided; acute attacks can be fatal if untreated (respiratory paralysis)'
    },

    // AMYLOIDOSIS
    'amyloidosis': {
        title: 'Amyloidosis',
        category: 'plasma-cell',
        bloodFilm: {
            findings: [
                'Often normal',
                'May show rouleaux (if myeloma-associated)',
                'Thrombocytosis occasionally',
                'Circulating plasma cells (rare)'
            ],
            image: 'normal-blood-film.jpg',
            imageDescription: 'Blood film is usually normal or shows non-specific findings. In AL (light chain) amyloidosis associated with plasma cell dyscrasia, rouleaux formation may be seen due to paraprotein (similar to myeloma). The diagnosis of amyloidosis requires tissue biopsy showing Congo red-positive deposits with apple-green birefringence under polarized light. Amyloid is misfolded protein that deposits in tissues, causing organ dysfunction. Blood film does not show the amyloid deposits themselves.'
        },
        types: {
            'AL Amyloid (Primary)': {
                protein: 'Light chains (λ > κ) from plasma cells',
                associations: 'Plasma cell dyscrasia, multiple myeloma (15%)',
                prevalence: 'Most common in developed countries',
                prognosis: 'Median survival 1-2 years untreated; better with treatment'
            },
            'AA Amyloid (Secondary)': {
                protein: 'Serum amyloid A (acute phase protein)',
                associations: 'Chronic inflammation: RA, IBD, chronic infections (TB, osteomyelitis), FMF',
                prevalence: 'Common globally',
                prognosis: 'Variable; treat underlying condition'
            },
            'ATTR Amyloid': {
                protein: 'Transthyretin',
                associations: 'Hereditary (mutant TTR) or Wild-type (senile cardiac)',
                prevalence: 'Increasingly recognized',
                prognosis: 'Variable; new treatments available'
            },
            'Dialysis-related': {
                protein: 'β2-microglobulin',
                associations: 'Long-term dialysis (>10 years)',
                features: 'Carpal tunnel, bone cysts'
            }
        },
        labs: {
            'Serum protein electrophoresis': 'Monoclonal band (AL type)',
            'Serum free light chains': 'Abnormal κ/λ ratio (AL)',
            'Urine Bence-Jones protein': 'Positive (AL)',
            'SAP scintigraphy': 'Shows amyloid distribution',
            'NT-proBNP': 'Very elevated if cardiac involvement',
            'Troponin': 'Elevated (cardiac)',
            'Creatinine': 'Elevated (renal)',
            'Alkaline phosphatase': 'Elevated (hepatic)'
        },
        clinicalFeatures: [
            '<strong>Renal (50% AL)</strong>:',
            '  • Nephrotic syndrome (heavy proteinuria, oedema)',
            '  • Renal failure',
            '  • Large kidneys on imaging',
            '<strong>Cardiac (40% AL, most common in ATTR)</strong>:',
            '  • Restrictive cardiomyopathy',
            '  • Heart failure (preserved EF)',
            '  • Low-voltage ECG despite thick ventricles',
            '  • Arrhythmias, conduction defects',
            '  • Sparkling/granular appearance on echo',
            '<strong>Peripheral/Autonomic neuropathy</strong>:',
            '  • Carpal tunnel syndrome (often bilateral)',
            '  • Sensorimotor neuropathy',
            '  • Autonomic dysfunction (orthostatic hypotension, erectile dysfunction)',
            '<strong>GI tract</strong>:',
            '  • Macroglossia (enlarged tongue - pathognomonic)',
            '  • Malabsorption, diarrhoea',
            '  • Hepatomegaly',
            '<strong>Bleeding</strong>:',
            '  • Factor X deficiency (binds to amyloid)',
            '  • Easy bruising, periorbital purpura (raccoon eyes)',
            '<strong>Other</strong>:',
            '  • Shoulder pad sign (shoulder swelling)',
            '  • Arthropathy'
        ],
        diagnosis: [
            '<strong>Tissue biopsy</strong> (diagnostic):',
            '  • Rectal, fat pad, kidney, heart, or affected organ',
            '  • Congo red stain → apple-green birefringence under polarized light',
            '  • Immunohistochemistry to determine type',
            '<strong>Type AL</strong>: Serum/urine protein electrophoresis, free light chains',
            '<strong>Type AA</strong>: Elevated SAA, look for chronic inflammation',
            '<strong>Cardiac imaging</strong>: Echo, cardiac MRI (late gadolinium enhancement)',
            '<strong>Genetic testing</strong> if ATTR suspected'
        ],
        management: [
            '<strong>AL Amyloidosis</strong>:',
            '  • Chemotherapy targeting plasma cells:',
            '    - Bortezomib + cyclophosphamide + dexamethasone (CyBorD)',
            '    - Melphalan + dexamethasone',
            '  • Autologous stem cell transplant (selected patients)',
            '  • Daratumumab (anti-CD38) for relapsed',
            '<strong>AA Amyloidosis</strong>:',
            '  • Treat underlying inflammatory condition',
            '  • Anti-TNF therapy for RA/IBD',
            '  • Colchicine for FMF',
            '<strong>ATTR Amyloidosis</strong>:',
            '  • Tafamidis (TTR stabilizer) - approved for cardiac ATTR',
            '  • Patisiran, inotersen (TTR silencers)',
            '  • Liver transplant (hereditary ATTR)',
            '<strong>Supportive</strong>:',
            '  • Diuretics (heart failure)',
            '  • Dialysis (renal failure)',
            '  • Pacemaker/ICD if needed',
            '  • Avoid digoxin, calcium channel blockers (bind amyloid)'
        ],
        prognosis: [
            '<strong>AL</strong>: Median survival 1-2 years untreated; improving with modern therapy',
            '<strong>AA</strong>: Depends on control of underlying disease',
            '<strong>ATTR</strong>: Cardiac involvement has median survival 2-5 years; new treatments improving outcomes',
            'Poor prognostic factors: Cardiac involvement, troponin/BNP elevation, advanced age'
        ]
    },

    // CASTLEMAN'S DISEASE
    'castlemans-disease': {
        title: "Castleman's Disease",
        category: 'lymphoma',
        bloodFilm: {
            findings: [
                'Usually normal',
                'May show anaemia',
                'Polyclonal hypergammaglobulinaemia',
                'Rouleaux formation (elevated globulins)'
            ],
            image: 'normal-blood-film.jpg',
            imageDescription: 'Blood film is typically normal or shows non-specific findings. Anaemia of chronic disease may be present in multicentric disease. Rouleaux formation can occur due to polyclonal hypergammaglobulinaemia (elevated immunoglobulins). Unlike lymphoma, there are no circulating abnormal lymphocytes. Diagnosis requires lymph node biopsy showing characteristic histology. Castleman disease is a rare lymphoproliferative disorder characterized by enlarged lymph nodes with specific histological patterns.'
        },
        types: {
            'Unicentric Castleman Disease (UCD)': {
                features: [
                    'Single enlarged lymph node or node group',
                    'Usually asymptomatic or local symptoms',
                    'Most commonly mediastinal or abdominal',
                    'Hyaline vascular type (90%) or plasma cell type',
                    'Excellent prognosis with surgical excision'
                ],
                treatment: 'Surgical excision - curative'
            },
            'Multicentric Castleman Disease (MCD)': {
                features: [
                    'Multiple lymph node groups affected',
                    'Systemic inflammatory symptoms',
                    'Associated with HHV-8 (especially in HIV+)',
                    'Plasma cell type',
                    'Risk of lymphoma development'
                ],
                subtypes: [
                    '<strong>HHV-8 positive MCD</strong> - Associated with HIV',
                    '<strong>HHV-8 negative (idiopathic) MCD</strong> - IL-6 driven',
                    '<strong>POEMS-associated MCD</strong> - Rare'
                ],
                treatment: 'Immunotherapy, chemotherapy, antivirals'
            }
        },
        histology: {
            'Hyaline vascular (90% UCD)': [
                'Atretic germinal centers',
                'Onion-skin layering of mantle zone',
                'Interfollicular vascular proliferation',
                'Usually asymptomatic'
            ],
            'Plasma cell type (UCD/MCD)': [
                'Hyperplastic germinal centers',
                'Sheets of plasma cells in interfollicular areas',
                'More systemic symptoms'
            ],
            'Mixed type': 'Features of both'
        },
        clinicalFeatures: {
            'UCD (70%)': [
                '<strong>Localized lymphadenopathy</strong> - Single mass',
                '<strong>Often asymptomatic</strong>',
                'Discovered incidentally on imaging',
                'Chest: Cough, dyspnoea if large mediastinal mass',
                'Abdomen: Abdominal mass, discomfort'
            ],
            'MCD (30%)': [
                '<strong>Generalized lymphadenopathy</strong>',
                '<strong>B symptoms</strong>: Fever, night sweats, weight loss',
                '<strong>Hepatosplenomegaly</strong>',
                '<strong>Oedema, ascites, pleural effusions</strong>',
                '<strong>Skin rash, cherry haemangiomas</strong>',
                '<strong>Neuropathy</strong> (if POEMS-associated)',
                '<strong>Kaposi sarcoma</strong> (if HHV-8+)',
                '<strong>Autoimmune phenomena</strong>'
            ]
        },
        labs: {
            'MCD labs': [
                'Anaemia (chronic disease)',
                'Elevated CRP/ESR',
                'Polyclonal hypergammaglobulinaemia',
                'Hypoalbuminaemia',
                'Elevated IL-6 (pathogenic)',
                'Elevated VEGF',
                'HHV-8 serology/PCR if suspected'
            ],
            'POEMS syndrome (rare association)': [
                'Polyneuropathy',
                'Organomegaly',
                'Endocrinopathy',
                'Monoclonal protein',
                'Skin changes'
            ]
        },
        diagnosis: [
            '<strong>Lymph node biopsy</strong> - Essential for diagnosis',
            '<strong>CT/PET scan</strong> - Assess extent (UCD vs MCD)',
            '<strong>HHV-8 testing</strong> - If MCD suspected',
            '<strong>IL-6 levels</strong> - Elevated in MCD',
            'Exclude lymphoma, infection, autoimmune disease'
        ],
        management: [
            '<strong>UCD</strong>:',
            '  • Surgical excision - curative',
            '  • Radiotherapy if unresectable',
            '  • Observation acceptable if asymptomatic and stable',
            '<strong>HHV-8 positive MCD</strong>:',
            '  • Rituximab + antivirals (valganciclovir)',
            '  • Chemotherapy if severe',
            '  • Treat HIV if present (ART)',
            '<strong>HHV-8 negative (idiopathic) MCD</strong>:',
            '  • Siltuximab (anti-IL-6 antibody) - FDA approved, first-line',
            '  • Tocilizumab (anti-IL-6 receptor) - alternative',
            '  • Rituximab',
            '  • Chemotherapy (cyclophosphamide, etoposide) if severe',
            '  • Corticosteroids for symptom control',
            '<strong>Supportive care</strong>:',
            '  • Treat infections',
            '  • Monitor for lymphoma development'
        ],
        prognosis: [
            '<strong>UCD</strong>: Excellent - cured with excision',
            '<strong>MCD</strong>: Variable, depends on subtype and treatment response',
            '  • 5-year survival ~75% with treatment',
            '  • HHV-8+ worse prognosis',
            '  • Risk of transformation to lymphoma (plasmablastic lymphoma, NHL)',
            '  • POEMS-associated has specific prognosis based on POEMS severity'
        ]
    },

    // WALDENSTROM'S MACROGLOBULINAEMIA
    'waldenstroms-macroglobulinaemia': {
        title: "Waldenström's Macroglobulinaemia",
        category: 'lymphoma',
        bloodFilm: {
            findings: [
                'Rouleaux formation (prominent)',
                'Lymphocytosis (small lymphocytes)',
                'Lymphoplasmacytoid cells',
                'Background staining (high protein)',
                'No leukoerythroblastic picture'
            ],
            image: 'rouleaux.jpg',
            imageDescription: 'Marked rouleaux formation (red cells stacked like coins) is characteristic due to very high paraprotein levels (IgM monoclonal protein). Small, mature-appearing lymphocytes are increased. Lymphoplasmacytoid cells (lymphocytes with plasmacytic features) may be seen. Background staining appears blue due to high serum protein. Hyperviscosity may cause poor blood film spreading. Diagnosis requires bone marrow showing lymphoplasmacytic infiltration plus serum IgM paraprotein. Waldenstrom macroglobulinaemia is a low-grade B-cell lymphoma producing monoclonal IgM, causing hyperviscosity syndrome.'
        },
        genetics: 'MYD88 L265P mutation in >90% (diagnostic); CXCR4 mutations in 30%',
        labs: {
            'IgM paraprotein': 'Monoclonal IgM (diagnostic)',
            'Serum viscosity': 'Elevated (>1.8 relative to water)',
            'Hb': 'Low (anaemia)',
            'Platelets': 'May be low',
            'Bone marrow': 'Lymphoplasmacytic infiltration (>10%)',
            'Immunophenotype': 'CD19+, CD20+, surface IgM+, CD5-, CD10-, CD23-',
            'β2-microglobulin': 'Prognostic marker',
            'MYD88 mutation': 'Present in >90%'
        },
        clinicalFeatures: [
            '<strong>Hyperviscosity syndrome (30%)</strong> - Hallmark:',
            '  • Visual disturbance (blurred vision, diplopia)',
            '  • Retinal vein engorgement, flame haemorrhages on fundoscopy',
            '  • Neurological: Headache, dizziness, confusion, stroke',
            '  • Bleeding (mucosal, epistaxis)',
            '  • Cardiac: Heart failure',
            '<strong>Anaemia symptoms</strong> - Fatigue, dyspnoea',
            '<strong>B symptoms</strong> (25%): Fever, night sweats, weight loss',
            '<strong>Lymphadenopathy</strong> (15%) - Usually modest',
            '<strong>Hepatosplenomegaly</strong> (25%)',
            '<strong>Peripheral neuropathy</strong> (20%):',
            '  • Often due to IgM antibodies against myelin-associated glycoprotein (anti-MAG)',
            '  • Symmetric sensory neuropathy',
            '<strong>Cold agglutinin disease</strong>:',
            '  • IgM binds RBCs in cold → haemolysis',
            '  • Acrocyanosis, Raynaud phenomenon',
            '<strong>Cryoglobulinaemia</strong> - Purpura, arthralgia, renal disease',
            '<strong>Amyloidosis</strong> (5%) - AL type from light chains'
        ],
        diagnosis: [
            '<strong>IgM paraprotein</strong> - Monoclonal IgM on serum electrophoresis',
            '<strong>Bone marrow biopsy</strong>:',
            '  • >10% lymphoplasmacytic cells',
            '  • Intertrabecular pattern',
            '  • Mast cells often increased',
            '<strong>Immunophenotyping</strong>: CD19+, CD20+, sIgM+, CD5-, CD10-, CD23-',
            '<strong>MYD88 L265P mutation</strong> - Highly specific',
            '<strong>Imaging</strong>: CT (lymphadenopathy, organomegaly)',
            'Exclude other IgM-producing conditions (MGUS, CLL, lymphoma)'
        ],
        differentialDiagnosis: [
            'IgM MGUS (monoclonal gammopathy of undetermined significance)',
            'Marginal zone lymphoma',
            'CLL (CD5+ distinguishes)',
            'Follicular lymphoma',
            'Mantle cell lymphoma'
        ],
        management: [
            '<strong>Asymptomatic, low burden</strong>:',
            '  • Watch and wait',
            '  • Monitor every 3-6 months',
            '<strong>Indications to treat</strong>:',
            '  • Symptomatic hyperviscosity',
            '  • Symptomatic anaemia',
            '  • Bulky lymphadenopathy',
            '  • Progressive disease',
            '<strong>First-line therapy</strong>:',
            '  • Rituximab + bendamustine (most common)',
            '  • DRC: Dexamethasone, rituximab, cyclophosphamide',
            '  • Rituximab monotherapy (if hyperviscosity without cytopenias)',
            '<strong>Targeted therapy</strong>:',
            '  • Ibrutinib (BTK inhibitor) - very effective, especially if MYD88+/CXCR4 WT',
            '  • Acalabrutinib, zanubrutinib (alternative BTK inhibitors)',
            '<strong>Hyperviscosity management</strong>:',
            '  • Urgent plasmapheresis - Removes IgM, immediate symptom relief',
            '  • Start systemic therapy concurrently',
            '<strong>Avoid</strong>:',
            '  • Rituximab monotherapy can cause IgM flare (worsening hyperviscosity)',
            '  • Start rituximab with chemotherapy or after plasmapheresis',
            '<strong>Supportive</strong>:',
            '  • Transfusions for anaemia',
            '  • IVIG for recurrent infections',
            '  • Neuropathy management'
        ],
        prognosis: [
            'Indolent course - median survival 5-10 years',
            'Not curable but highly treatable',
            'Prognostic factors (IPSSWM score):',
            '  • Age >65',
            '  • Hb <115 g/L',
            '  • Platelets <100',
            '  • β2-microglobulin >3',
            '  • IgM >70 g/L',
            'Modern therapies (BTK inhibitors) improving outcomes'
        ]
    }
};
