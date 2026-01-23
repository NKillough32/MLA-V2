/**
 * Dermatology Database
 * Comprehensive guide to dermatological conditions and skin presentations
 * Based on the British Association of Dermatologists Handbook (3rd Edition, 2020)
 */

export const dermatologyDatabase = {
    // INFLAMMATORY CONDITIONS - ECZEMA
    'eczema-atopic': {
        title: 'Atopic Eczema (Atopic Dermatitis)',
        category: 'inflammatory-eczema',
        clinicalPresentation: {
            description: 'Chronic relapsing inflammatory skin condition characterized by pruritic, erythematous, dry, and scaly patches',
            distribution: [
                '<strong>Infants</strong>: Face, scalp, extensor surfaces',
                '<strong>Children</strong>: Flexural areas (antecubital, popliteal fossae)',
                '<strong>Adults</strong>: Hands, neck, flexures, eyelids'
            ],
            morphology: [
                'Acute: Erythema, vesicles, weeping, crusting',
                'Subacute: Scaling, erythema, excoriation',
                'Chronic: Lichenification, fissuring, hyperpigmentation/hypopigmentation'
            ],
            symptoms: ['Intense pruritus (worse at night)', 'Dry skin (xerosis)', 'Secondary infection (impetiginization)'],
            images: ['atopic-eczema-flexures.jpg', 'eczema-lichenification.jpg']
        },
        associations: [
            'Atopic triad: Asthma, allergic rhinitis, food allergies',
            'Family history of atopy',
            'IgE-mediated sensitization',
            'Filaggrin gene mutations (FLG) - impaired skin barrier'
        ],
        triggers: [
            'Environmental: Cold weather, low humidity, irritants (soaps, detergents)',
            'Allergens: House dust mite, pollen, animal dander',
            'Infections: S. aureus colonization, viral infections',
            'Stress and hormonal factors'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong> - UK Working Party Criteria:',
            '  Must have: Itchy skin condition',
            '  Plus 3 or more of:',
            '    - Onset before age 2',
            '    - History of flexural involvement',
            '    - History of generally dry skin',
            '    - Personal history of other atopic disease',
            '    - Visible flexural dermatitis'
        ],
        management: [
            '<strong>General measures</strong>:',
            '  • Emollients: Liberal and frequent use (500g/week)',
            '  • Avoid triggers and irritants',
            '  • Short lukewarm baths, soap substitutes',
            '  • Cotton clothing, avoid wool',
            '<strong>Topical therapies</strong>:',
            '  • Mild: Hydrocortisone 1%',
            '  • Moderate: Clobetasone butyrate 0.05%, betamethasone valerate 0.1%',
            '  • Potent: Betamethasone dipropionate 0.05%, mometasone furoate 0.1%',
            '  • Very potent: Clobetasol propionate 0.05% (short courses)',
            '  • Calcineurin inhibitors: Tacrolimus, pimecrolimus (steroid-sparing)',
            '<strong>Systemic therapy (severe)</strong>:',
            '  • Phototherapy (UVB, PUVA)',
            '  • Immunosuppressants: Ciclosporin, azathioprine, methotrexate',
            '  • Biologics: Dupilumab (anti-IL-4/IL-13)',
            '  • JAK inhibitors: Baricitinib, upadacitinib',
            '<strong>Infection management</strong>:',
            '  • Topical fusidic acid or mupirocin',
            '  • Oral flucloxacillin if widespread'
        ],
        complications: [
            'Secondary bacterial infection (S. aureus, S. pyogenes)',
            'Eczema herpeticum (HSV superinfection) - emergency!',
            'Lichenification and scarring',
            'Psychological impact, sleep disturbance'
        ]
    },

    'eczema-contact-allergic': {
        title: 'Allergic Contact Dermatitis',
        category: 'inflammatory-eczema',
        clinicalPresentation: {
            description: 'Type IV delayed hypersensitivity reaction to specific allergen causing eczematous eruption',
            distribution: ['Site of contact with allergen', 'May spread beyond contact site', 'Common sites: Hands, face, eyelids, ears'],
            morphology: ['Erythema, vesicles, weeping, scaling', 'Well-demarcated initially', 'Chronic: Lichenification, fissuring'],
            symptoms: ['Pruritus', 'Burning sensation', 'Delayed onset (24-72 hours after exposure)'],
            images: ['allergic-contact-dermatitis-nickel.jpg', 'contact-dermatitis-hands.jpg']
        },
        commonAllergens: [
            '<strong>Metals</strong>: Nickel (jewelry, belt buckles), chromate, cobalt',
            '<strong>Fragrances</strong>: Perfumes, cosmetics, topical medications',
            '<strong>Preservatives</strong>: Methylisothiazolinone, formaldehyde',
            '<strong>Rubber</strong>: Thiurams, carbamates (gloves, footwear)',
            '<strong>Plants</strong>: Poison ivy, primula',
            '<strong>Medications</strong>: Neomycin, benzocaine, topical antibiotics'
        ],
        diagnosis: [
            '<strong>Clinical history</strong>: Occupation, hobbies, exposure patterns',
            '<strong>Patch testing</strong>: Gold standard',
            '  - European baseline series + targeted panels',
            '  - Applied for 48 hours, read at 48-96 hours',
            '  - Positive: Erythema, infiltration, vesicles'
        ],
        management: [
            '<strong>Allergen avoidance</strong>: Essential once identified',
            '<strong>Acute phase</strong>:',
            '  • Potent topical corticosteroids',
            '  • Emollients',
            '  • Oral antihistamines for itch',
            '<strong>Severe cases</strong>:',
            '  • Oral prednisolone (30-40mg reducing course)',
            '<strong>Protective measures</strong>:',
            '  • Barrier creams',
            '  • Protective gloves (cotton-lined vinyl)',
            '  • Occupational modifications'
        ],
        complications: ['Chronic hand eczema', 'Secondary infection', 'Occupational disability']
    },

    // PSORIASIS
    'psoriasis-plaque': {
        title: 'Plaque Psoriasis (Psoriasis Vulgaris)',
        category: 'inflammatory-psoriasis',
        clinicalPresentation: {
            description: 'Chronic inflammatory skin condition with well-demarcated erythematous plaques and silvery-white scale',
            distribution: [
                'Extensor surfaces: Elbows, knees',
                'Scalp (very common)',
                'Sacrum and intergluteal cleft',
                'Koebner phenomenon: Lesions at trauma sites'
            ],
            morphology: [
                'Sharply demarcated erythematous plaques',
                'Silvery-white scale (micaceous)',
                'Auspitz sign: Pinpoint bleeding on scale removal',
                'Plaques may coalesce'
            ],
            images: ['plaque-psoriasis-elbow.jpg', 'psoriasis-knee.jpg', 'scalp-psoriasis.jpg']
        },
        variants: [
            '<strong>Chronic plaque</strong>: Most common (80-90%)',
            '<strong>Guttate</strong>: Small droplet-like lesions, post-streptococcal',
            '<strong>Flexural (inverse)</strong>: Smooth patches in flexures',
            '<strong>Pustular</strong>: Sterile pustules on erythematous base',
            '<strong>Erythrodermic</strong>: >90% BSA - emergency!'
        ],
        associations: [
            'Psoriatic arthritis (10-30%): Oligoarthritis, axial disease',
            'Metabolic syndrome: Obesity, diabetes, hypertension',
            'Cardiovascular disease: Increased MI/stroke risk',
            'IBD (Crohn disease, ulcerative colitis)',
            'Depression and anxiety',
            'Genetic: HLA-Cw6, PSORS1 locus'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Severity assessment</strong>:',
            '  - BSA (Body Surface Area)',
            '  - PASI score',
            '  - DLQI (quality of life)',
            '<strong>Biopsy</strong> (if uncertain):',
            '  - Acanthosis, parakeratosis',
            '  - Munro microabscesses',
            '  - Dilated dermal capillaries'
        ],
        management: [
            '<strong>Mild (<10% BSA)</strong>:',
            '  • Topical steroids: Potent to very potent',
            '  • Vitamin D analogues: Calcipotriol',
            '  • Combination: Calcipotriol/betamethasone (Dovobet®)',
            '  • Emollients',
            '<strong>Moderate-Severe (>10% BSA)</strong>:',
            '  • <strong>Phototherapy</strong>: Narrowband UVB, PUVA',
            '  • <strong>Systemic</strong>:',
            '    - Methotrexate: 7.5-25mg weekly + folic acid',
            '    - Ciclosporin: 2.5-5mg/kg/day',
            '    - Acitretin: 25-50mg daily',
            '  • <strong>Biologics</strong>:',
            '    - Anti-TNF: Adalimumab, etanercept',
            '    - Anti-IL-12/23: Ustekinumab',
            '    - Anti-IL-17: Secukinumab, ixekizumab',
            '    - Anti-IL-23: Guselkumab, risankizumab',
            '  • <strong>Small molecules</strong>:',
            '    - Apremilast (PDE4 inhibitor)',
            '    - Deucravacitinib (TYK2 inhibitor)'
        ],
        complications: ['Psoriatic arthritis', 'Erythroderma', 'Psychological impact', 'CVD risk']
    },

    // ACNE AND ROSACEA
    'acne-vulgaris': {
        title: 'Acne Vulgaris',
        category: 'acne-rosacea',
        clinicalPresentation: {
            description: 'Chronic inflammatory disorder of pilosebaceous units affecting face, chest, and back',
            morphology: [
                '<strong>Non-inflammatory</strong>: Comedones (blackheads, whiteheads)',
                '<strong>Inflammatory</strong>: Papules, pustules, nodules, cysts'
            ],
            distribution: 'Face (forehead, cheeks, nose, chin), chest, upper back, shoulders',
            images: ['acne-vulgaris-face.jpg', 'acne-comedones.jpg', 'acne-nodular.jpg']
        },
        pathophysiology: [
            '1. Increased sebum production (androgenic)',
            '2. Follicular hyperkeratinization (comedones)',
            '3. Cutibacterium acnes colonization',
            '4. Inflammation and immune response'
        ],
        grading: [
            '<strong>Mild</strong>: Comedones and few inflammatory lesions',
            '<strong>Moderate</strong>: Multiple papules and pustules',
            '<strong>Severe</strong>: Nodules, cysts, scarring'
        ],
        management: [
            '<strong>Mild</strong>:',
            '  • Topical retinoids: Tretinoin, adapalene',
            '  • Benzoyl peroxide: 2.5-10%',
            '  • Topical antibiotics: Clindamycin + BPO',
            '  • Azelaic acid: 15-20%',
            '<strong>Moderate</strong>:',
            '  • Topical combination therapy',
            '  • Oral antibiotics:',
            '    - Lymecycline 408mg daily',
            '    - Doxycycline 100mg daily',
            '    - 3-6 months maximum',
            '<strong>Severe or scarring</strong>:',
            '  • <strong>Oral isotretinoin</strong> (Roaccutane®):',
            '    - 0.5-1mg/kg/day for 16-24 weeks',
            '    - TERATOGENIC - pregnancy prevention mandatory',
            '    - Monitor: LFTs, lipids, pregnancy',
            '    - Side effects: Dry skin/lips, photosensitivity',
            '<strong>Hormonal (females)</strong>:',
            '  • Combined OCP (anti-androgenic)',
            '  • Co-cyprindiol (Dianette®)',
            '  • Spironolactone'
        ],
        complications: ['Scarring (atrophic, hypertrophic)', 'Post-inflammatory hyperpigmentation', 'Psychological impact']
    },

    'rosacea': {
        title: 'Rosacea',
        category: 'acne-rosacea',
        clinicalPresentation: {
            description: 'Chronic inflammatory facial skin condition characterized by flushing, erythema, telangiectasia, and papulopustules',
            distribution: 'Central face: Cheeks, nose, forehead, chin',
            morphology: [
                'Persistent erythema',
                'Telangiectasia',
                'Papules and pustules (NO comedones)',
                'Flushing and burning sensation'
            ],
            images: ['rosacea-erythema.jpg', 'rosacea-rhinophyma.jpg']
        },
        subtypes: [
            '<strong>Erythematotelangiectatic</strong>: Flushing, persistent erythema, telangiectasia',
            '<strong>Papulopustular</strong>: Papules and pustules on erythematous base',
            '<strong>Phymatous</strong>: Thickening of skin (rhinophyma - bulbous nose)',
            '<strong>Ocular</strong>: Blepharitis, conjunctivitis, keratitis (30-50%)'
        ],
        triggers: [
            'Sun exposure',
            'Hot drinks and spicy foods',
            'Alcohol',
            'Temperature extremes',
            'Stress',
            'Topical steroids (can worsen)'
        ],
        management: [
            '<strong>General measures</strong>:',
            '  • Avoid triggers',
            '  • Sun protection (SPF 30+)',
            '  • Gentle skincare',
            '<strong>Erythematotelangiectatic</strong>:',
            '  • Topical brimonidine (vasoconstrictor)',
            '  • Laser therapy for telangiectasia',
            '<strong>Papulopustular</strong>:',
            '  • Topical metronidazole 0.75% or azelaic acid 15%',
            '  • Topical ivermectin 1%',
            '  • Oral doxycycline 40mg daily (anti-inflammatory)',
            '<strong>Severe</strong>:',
            '  • Oral isotretinoin (low dose)',
            '<strong>Rhinophyma</strong>:',
            '  • CO2 laser ablation or surgical debulking',
            '<strong>Ocular</strong>:',
            '  • Lid hygiene, artificial tears',
            '  • Oral doxycycline',
            '  • Ophthalmology referral if severe'
        ]
    },

    // INFECTIONS - BACTERIAL
    'cellulitis': {
        title: 'Cellulitis',
        category: 'infection-bacterial',
        clinicalPresentation: {
            description: 'Acute bacterial infection of the dermis and subcutaneous tissue',
            morphology: [
                'Spreading erythema, warmth, swelling',
                'Poorly defined margins',
                'Tender to touch',
                'May have blistering or purpura'
            ],
            distribution: 'Lower limbs most common (>70%), but can affect any site',
            systemicFeatures: ['Fever, rigors', 'Malaise', 'Lymphangitis (red streaks)', 'Regional lymphadenopathy'],
            images: ['cellulitis-leg.jpg', 'cellulitis-arm.jpg']
        },
        causativeOrganisms: [
            '<strong>Most common</strong>: Streptococcus pyogenes (Group A Strep)',
            'Staphylococcus aureus (especially if pustules/abscesses)',
            'Less common: Strep Group B, C, G'
        ],
        riskFactors: [
            'Skin breaks: Tinea pedis, leg ulcers, trauma',
            'Lymphoedema or venous insufficiency',
            'Obesity',
            'Immunosuppression: Diabetes, HIV, chemotherapy',
            'Previous cellulitis'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Investigations</strong>:',
            '  - Blood cultures if systemically unwell',
            '  - FBC, CRP',
            '  - Wound swab if discharge/broken skin',
            '<strong>Eron classification</strong> (severity):',
            '  - Class I: No systemic toxicity, no comorbidities',
            '  - Class II: Systemically well or unwell + comorbidities',
            '  - Class III: Significant systemic upset or unstable comorbidity',
            '  - Class IV: Sepsis or life-threatening infection'
        ],
        differentialDiagnosis: [
            'DVT (check Wells score, D-dimer if needed)',
            'Erysipelas (more superficial, raised, sharply defined)',
            'Necrotizing fasciitis (severe pain, rapid progression, crepitus - EMERGENCY)',
            'Lipodermatosclerosis',
            'Contact dermatitis',
            'Insect bite reaction'
        ],
        management: [
            '<strong>Mild (Eron Class I)</strong> - Outpatient oral antibiotics:',
            '  • <strong>First-line</strong>: Flucloxacillin 500mg-1g QDS 5-7 days',
            '  • <strong>Penicillin allergy</strong>: Clarithromycin 500mg BD or doxycycline 200mg loading then 100mg BD',
            '  • Mark extent with pen, review in 24-48 hours',
            '<strong>Moderate-Severe (Eron Class II-III)</strong> - Consider admission:',
            '  • IV flucloxacillin 1-2g QDS',
            '  • If penicillin allergic: IV vancomycin or teicoplanin',
            '  • Switch to oral when improving (usually 2-3 days)',
            '<strong>Severe/necrotizing features (Class IV)</strong> - Urgent admission:',
            '  • Broad-spectrum IV: Piperacillin-tazobactam + clindamycin',
            '  • Urgent surgical review for necrotizing fasciitis',
            '<strong>Supportive</strong>:',
            '  • Leg elevation',
            '  • Analgesia',
            '  • Hydration',
            '  • Treat predisposing factors (tinea pedis, leg ulcers)',
            '<strong>Prevention of recurrence</strong>:',
            '  • Prophylactic antibiotics if ≥2 episodes/year:',
            '    - Penicillin V 250mg BD or phenoxymethylpenicillin 500mg daily',
            '  • Emollients and skin care',
            '  • Treat tinea pedis, eczema',
            '  • Compression for lymphoedema'
        ],
        complications: [
            'Sepsis and multi-organ failure',
            'Abscess formation',
            'Necrotizing fasciitis',
            'Chronic lymphoedema',
            'Recurrent cellulitis'
        ],
        redFlags: [
            'Severe pain disproportionate to appearance',
            'Rapid progression despite antibiotics',
            'Crepitus or gas in tissues',
            'Hemorrhagic bullae or skin necrosis',
            'Systemic toxicity (sepsis)',
            '→ Consider necrotizing fasciitis - URGENT SURGICAL REVIEW'
        ]
    },

    'impetigo': {
        title: 'Impetigo',
        category: 'infection-bacterial',
        clinicalPresentation: {
            description: 'Superficial bacterial skin infection, highly contagious',
            types: [
                '<strong>Non-bullous (70%)</strong>: Honey-colored crusted lesions',
                '<strong>Bullous (30%)</strong>: Flaccid bullae that rupture easily'
            ],
            distribution: 'Face (perioral, nose), extremities',
            images: ['impetigo-honey-crust.jpg', 'impetigo-bullous.jpg']
        },
        causativeOrganisms: [
            'Staphylococcus aureus (most common)',
            'Streptococcus pyogenes',
            'Mixed infection'
        ],
        management: [
            '<strong>Localized</strong>:',
            '  • Topical fusidic acid TDS 7 days',
            '  • OR topical mupirocin TDS 5 days',
            '<strong>Widespread or systemically unwell</strong>:',
            '  • Oral flucloxacillin 500mg QDS 7 days',
            '  • OR clarithromycin if penicillin allergic',
            '<strong>General measures</strong>:',
            '  • Avoid school/work until lesions crusted or 48h on antibiotics',
            '  • Good hand hygiene',
            '  • Separate towels and face cloths'
        ],
        complications: [
            'Post-streptococcal glomerulonephritis (rare)',
            'Cellulitis',
            'Staphylococcal scalded skin syndrome (SSSS) - in children'
        ]
    },

    // INFECTIONS - VIRAL
    'herpes-simplex': {
        title: 'Herpes Simplex Virus (HSV)',
        category: 'infection-viral',
        clinicalPresentation: {
            description: 'Viral infection causing grouped vesicles on erythematous base',
            types: [
                '<strong>Primary infection</strong>: Painful grouped vesicles, systemic symptoms',
                '<strong>Recurrent infection</strong>: Milder, often prodromal tingling'
            ],
            distribution: [
                '<strong>HSV-1</strong>: Mainly orofacial (cold sores)',
                '<strong>HSV-2</strong>: Mainly genital (but HSV-1 can affect genitals too)'
            ],
            images: ['hsv-cold-sore.jpg', 'hsv-primary-gingivostomatitis.jpg']
        },
        triggers: [
            'UV exposure',
            'Stress',
            'Immunosuppression',
            'Menstruation',
            'Fever/illness'
        ],
        management: [
            '<strong>Mild/infrequent</strong>:',
            '  • Topical aciclovir cream 5% - apply at first sign',
            '  • Symptomatic relief: Paracetamol, cold compresses',
            '<strong>Severe or frequent (>6/year)</strong>:',
            '  • Oral aciclovir 200mg 5x daily for 5 days',
            '  • OR valaciclovir 500mg BD for 5 days',
            '<strong>Suppressive therapy</strong> (if ≥6 recurrences/year):',
            '  • Aciclovir 400mg BD long-term',
            '  • OR valaciclovir 500mg daily',
            '<strong>Immunocompromised</strong>:',
            '  • Higher doses, longer duration',
            '  • IV aciclovir if severe'
        ],
        complications: [
            'Eczema herpeticum (HSV on eczematous skin) - emergency!',
            'Erythema multiforme',
            'Aseptic meningitis',
            'Neonatal herpes (vertical transmission)'
        ]
    },

    'varicella-zoster': {
        title: 'Varicella Zoster Virus (Chickenpox & Shingles)',
        category: 'infection-viral',
        clinicalPresentation: {
            chickenpox: [
                'Primary VZV infection',
                'Pruritic vesicular rash with "crops" in different stages',
                'Distribution: Starts on trunk, spreads centrifugally',
                'Prodrome: Fever, malaise',
                'Lesions: "Dew drop on rose petal"'
            ],
            shingles: [
                'Reactivation of latent VZV in dorsal root ganglion',
                'Painful vesicular rash in dermatomal distribution',
                'Prodrome: Pain, tingling, burning (2-3 days before rash)',
                'Commonest: Thoracic (50%), trigeminal (20%)',
                'Usually unilateral and does NOT cross midline'
            ],
            images: ['chickenpox-vesicles.jpg', 'shingles-thoracic.jpg', 'shingles-trigeminal.jpg']
        },
        complications: [
            '<strong>Chickenpox</strong>:',
            '  - Bacterial superinfection',
            '  - Pneumonia (adults, immunocompromised)',
            '  - Encephalitis (rare)',
            '<strong>Shingles</strong>:',
            '  - Post-herpetic neuralgia (PHN) - commonest',
            '  - Ramsay Hunt syndrome (facial nerve palsy)',
            '  - Ophthalmic zoster - ophthalmology referral',
            '  - Disseminated zoster (immunocompromised)'
        ],
        management: [
            '<strong>Chickenpox (immunocompetent)</strong>:',
            '  • Symptomatic: Antihistamines, calamine lotion',
            '  • Advise isolation until all lesions crusted',
            '<strong>Chickenpox (high risk)</strong>:',
            '  • Oral aciclovir 800mg 5x daily for 7 days',
            '  • High risk: Pregnant, immunocompromised, adults',
            '<strong>Shingles (immunocompetent)</strong>:',
            '  • Antivirals if <72h from rash onset:',
            '    - Valaciclovir 1g TDS for 7 days (first-line)',
            '    - OR famciclovir 500mg TDS for 7 days',
            '    - OR aciclovir 800mg 5x daily for 7 days',
            '  • Analgesia: Paracetamol, NSAIDs, neuropathic agents',
            '<strong>Shingles (immunocompromised or severe)</strong>:',
            '  • IV aciclovir 10mg/kg TDS',
            '<strong>Ophthalmic zoster</strong>:',
            '  • Urgent ophthalmology referral',
            '  • Oral antivirals',
            '<strong>Post-herpetic neuralgia</strong>:',
            '  • Amitriptyline, gabapentin, pregabalin',
            '  • Topical capsaicin cream',
            '<strong>Prevention</strong>:',
            '  • Shingles vaccine (Shingrix) - ≥50 years or immunocompromised'
        ]
    },

    // SKIN CANCER
    'basal-cell-carcinoma': {
        title: 'Basal Cell Carcinoma (BCC)',
        category: 'skin-cancer',
        clinicalPresentation: {
            description: 'Most common skin cancer, slow-growing malignancy of basal keratinocytes',
            morphology: [
                '<strong>Nodular (most common)</strong>: Pearly/translucent nodule with telangiectasia, may ulcerate (rodent ulcer)',
                '<strong>Superficial</strong>: Erythematous scaly patch/plaque with fine border',
                '<strong>Morphoeic/sclerosing</strong>: Ill-defined, scar-like, indurated plaque',
                '<strong>Pigmented</strong>: Brown/black pigmentation'
            ],
            distribution: 'Sun-exposed sites: Face (especially nose), ears, scalp, neck',
            images: ['bcc-nodular.jpg', 'bcc-rodent-ulcer.jpg', 'bcc-superficial.jpg']
        },
        riskFactors: [
            'UV exposure (cumulative sun damage)',
            'Fair skin (Fitzpatrick I-II)',
            'Increasing age',
            'Previous BCC or SCC',
            'Immunosuppression',
            'Genetic: Gorlin syndrome (multiple BCCs)'
        ],
        diagnosis: [
            '<strong>Clinical + dermoscopy</strong>',
            '<strong>Biopsy</strong>: Punch or excision',
            '<strong>Histology</strong>: Nests of basaloid cells with peripheral palisading'
        ],
        management: [
            '<strong>Surgical excision</strong>: First-line for most',
            '  • 4-5mm margins for well-defined, low-risk BCC',
            '<strong>Mohs micrographic surgery</strong>:',
            '  • High-risk sites (face, ears)',
            '  • Recurrent BCCs',
            '  • Morphoeic/infiltrative subtypes',
            '  • Tissue preservation crucial',
            '<strong>Non-surgical</strong> (superficial BCCs):',
            '  • Topical imiquimod 5% (immunomodulator)',
            '  • Topical 5-fluorouracil',
            '  • Photodynamic therapy (PDT)',
            '  • Cryotherapy (selected cases)',
            '<strong>Radiotherapy</strong>:',
            '  • If surgery inappropriate (elderly, comorbidities)',
            '<strong>Systemic therapy</strong> (advanced/metastatic):',
            '  • Hedgehog pathway inhibitors: Vismodegib, sonidegib',
            '<strong>Follow-up</strong>:',
            '  • Self-examination',
            '  • Annual skin checks if multiple BCCs',
            '  • Sun protection advice'
        ],
        prognosis: [
            'Excellent prognosis, rarely metastasizes (<0.1%)',
            'Local recurrence: 5% after excision, higher for morphoeic type',
            'Can be locally destructive if untreated'
        ]
    },

    'squamous-cell-carcinoma': {
        title: 'Squamous Cell Carcinoma (SCC)',
        category: 'skin-cancer',
        clinicalPresentation: {
            description: 'Malignancy of keratinocytes with potential to metastasize',
            morphology: [
                'Indurated, hyperkeratotic nodule or plaque',
                'May ulcerate or bleed',
                'Firm on palpation',
                'Rapidly growing (weeks-months)'
            ],
            distribution: 'Sun-exposed sites: Scalp, face, ears, dorsal hands, lower lip',
            images: ['scc-keratotic-nodule.jpg', 'scc-ulcerated.jpg']
        },
        precursors: [
            '<strong>Actinic keratosis</strong>: Rough, scaly patches on sun-exposed skin',
            '<strong>Bowen disease</strong>: SCC in situ (well-demarcated erythematous scaly plaque)'
        ],
        riskFactors: [
            'UV exposure',
            'Fair skin',
            'Immunosuppression (esp. organ transplant - 65-250x risk)',
            'Chronic wounds, ulcers, scars',
            'HPV infection (genital/periungual SCC)',
            'Previous radiotherapy',
            'Arsenic exposure',
            'Genetic: Xeroderma pigmentosum, albinism'
        ],
        diagnosis: [
            '<strong>Urgent 2-week-wait referral if suspected SCC</strong>',
            '<strong>Biopsy</strong>: Punch or excision',
            '<strong>Staging</strong> (if high-risk):',
            '  - Lymph node examination',
            '  - CT/MRI if nodal involvement or high-risk features'
        ],
        management: [
            '<strong>Surgical excision</strong>: First-line',
            '  • 4-6mm margins for well-defined, low-risk',
            '  • 6-10mm margins for high-risk',
            '<strong>Mohs surgery</strong>: High-risk sites',
            '<strong>Radiotherapy</strong>:',
            '  • Adjuvant if incomplete excision or perineural invasion',
            '  • Primary if surgery inappropriate',
            '<strong>Systemic therapy</strong> (advanced/metastatic):',
            '  • PD-1 inhibitors: Cemiplimab, pembrolizumab',
            '  • EGFR inhibitors: Cetuximab',
            '  • Chemotherapy',
            '<strong>Prevention</strong>:',
            '  • Sun protection',
            '  • Treat actinic keratoses (cryotherapy, topical 5-FU, imiquimod)',
            '  • Regular surveillance if immunosuppressed'
        ],
        prognosis: [
            'Overall 5-year survival: >90% if localized',
            'Metastasis risk: 2-5% overall, higher if immunosuppressed (10-16%)',
            'High-risk features: >2cm, >4mm depth, perineural invasion, immunosuppression'
        ]
    },

    'melanoma': {
        title: 'Malignant Melanoma',
        category: 'skin-cancer',
        clinicalPresentation: {
            description: 'Malignancy of melanocytes, aggressive with metastatic potential',
            ABCDECriteria: [
                '<strong>A</strong>symmetry: One half unlike the other',
                '<strong>B</strong>order: Irregular, scalloped, or poorly defined',
                '<strong>C</strong>olor: Varied shades of brown, black, tan, red, white, blue',
                '<strong>D</strong>iameter: >6mm (but can be smaller)',
                '<strong>E</strong>volving: Change in size, shape, color, or symptoms'
            ],
            uglyDuckling: 'Lesion that looks different from surrounding moles',
            images: ['melanoma-superficial-spreading.jpg', 'melanoma-nodular.jpg', 'amelanotic-melanoma.jpg']
        },
        subtypes: [
            '<strong>Superficial spreading (70%)</strong>: Irregular pigmented macule/patch, slow horizontal growth',
            '<strong>Nodular (15%)</strong>: Rapidly growing pigmented nodule, vertical growth, worse prognosis',
            '<strong>Lentigo maligna (5-10%)</strong>: Face, elderly, slowly expanding pigmented patch',
            '<strong>Acral lentiginous (5%)</strong>: Palms, soles, nail beds, more common in darker skin types',
            '<strong>Amelanotic melanoma</strong>: Non-pigmented, easily missed'
        ],
        riskFactors: [
            'Fair skin (Fitzpatrick I-II)',
            'History of sunburn, especially in childhood',
            'Family history of melanoma',
            'Multiple/atypical nevi (>50 moles)',
            'Previous melanoma or other skin cancer',
            'Immunosuppression',
            'Genetic: CDKN2A, BRAF mutations'
        ],
        diagnosis: [
            '<strong>Urgent 2-week-wait referral if suspected melanoma</strong>',
            '<strong>Excision biopsy</strong>: Gold standard (avoid punch/shave)',
            '  • 2mm clinical margin',
            '<strong>Histology</strong>:',
            '  - <strong>Breslow thickness</strong>: Most important prognostic factor',
            '  - Mitotic rate',
            '  - Ulceration',
            '  - Lymphovascular invasion',
            '<strong>Staging</strong>:',
            '  - Sentinel lymph node biopsy (SLNB) if Breslow >1mm or ulcerated',
            '  - CT/PET-CT if high-risk or node positive'
        ],
        staging: [
            '<strong>Stage 0</strong>: In situ',
            '<strong>Stage I</strong>: Breslow <2mm, no ulceration',
            '<strong>Stage II</strong>: Breslow >2mm or ulceration, no nodes',
            '<strong>Stage III</strong>: Regional lymph node involvement',
            '<strong>Stage IV</strong>: Distant metastases'
        ],
        management: [
            '<strong>Wide local excision</strong>:',
            '  • In situ: 5mm margins',
            '  • <1mm: 1cm margins',
            '  • 1-2mm: 1-2cm margins',
            '  • >2mm: 2cm margins',
            '<strong>Sentinel lymph node biopsy</strong>:',
            '  • If Breslow >1mm or ulcerated',
            '  • If positive → completion lymphadenectomy (controversial)',
            '<strong>Adjuvant therapy</strong> (Stage III/high-risk Stage II):',
            '  • Immune checkpoint inhibitors:',
            '    - Nivolumab, pembrolizumab (anti-PD-1)',
            '  • Targeted therapy (if BRAF V600 mutation):',
            '    - Dabrafenib + trametinib',
            '<strong>Metastatic disease (Stage IV)</strong>:',
            '  • Immunotherapy: Ipilimumab + nivolumab, pembrolizumab',
            '  • Targeted therapy (BRAF+): Dabrafenib + trametinib, vemurafenib',
            '  • Clinical trials',
            '<strong>Follow-up</strong>:',
            '  • Stage 0-IIA: Annual for 5 years',
            '  • Stage IIB-IV: Every 3-6 months for 3 years, then annually',
            '  • Self-examination, sun protection advice'
        ],
        prognosis: [
            '5-year survival by stage:',
            '  • Stage I: >95%',
            '  • Stage II: 65-90%',
            '  • Stage III: 40-78%',
            '  • Stage IV: 15-20%',
            'Breslow thickness most important prognostic factor',
            'Ulceration and mitotic rate also significant'
        ]
    },

    // HAIR DISORDERS
    'alopecia-areata': {
        title: 'Alopecia Areata',
        category: 'hair-disorders',
        clinicalPresentation: {
            description: 'Autoimmune non-scarring hair loss with well-demarcated patches',
            morphology: [
                'Smooth, round/oval patches of complete hair loss',
                'Scalp skin appears normal',
                'Exclamation mark hairs at periphery (broken hairs, narrow at base)',
                'May affect eyebrows, eyelashes, beard'
            ],
            variants: [
                '<strong>Patchy</strong>: Single or multiple patches (most common)',
                '<strong>Alopecia totalis</strong>: Complete scalp hair loss',
                '<strong>Alopecia universalis</strong>: Loss of all body hair'
            ],
            images: ['alopecia-areata-patch.jpg', 'exclamation-mark-hairs.jpg']
        },
        associations: [
            'Atopy (asthma, eczema, allergic rhinitis)',
            'Autoimmune diseases: Thyroid disease, vitiligo, pernicious anemia',
            'Down syndrome'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Pull test</strong>: Positive at active margins',
            '<strong>Dermoscopy</strong>: Yellow dots, black dots, exclamation mark hairs',
            '<strong>Investigations</strong> (if indicated):',
            '  - Thyroid function',
            '  - FBC (check B12, folate)',
            '  - Skin biopsy (rarely needed)'
        ],
        management: [
            '<strong>Limited patchy (<50% scalp)</strong>:',
            '  • Reassurance - high spontaneous remission rate',
            '  • <strong>Topical corticosteroids</strong>: Potent (betamethasone) BD',
            '  • <strong>Intralesional steroids</strong>: Triamcinolone 10mg/ml every 4-6 weeks (most effective)',
            '  • <strong>Topical immunotherapy</strong>: Diphenylcyclopropenone (DPCP) - specialist',
            '<strong>Extensive (>50% scalp)</strong>:',
            '  • <strong>Systemic steroids</strong>: Short courses (limited efficacy, high relapse)',
            '  • <strong>Contact immunotherapy</strong>: DPCP',
            '  • <strong>JAK inhibitors</strong>: Baricitinib, ritlecitinib (emerging evidence)',
            '<strong>Supportive</strong>:',
            '  • Wigs, hairpieces',
            '  • Camouflage',
            '  • Psychological support',
            '  • Patient support groups (Alopecia UK)',
            '<strong>Poor prognostic features</strong>:',
            '  - Extensive hair loss',
            '  - Ophiasis pattern (band-like around scalp periphery)',
            '  - Childhood onset',
            '  - Nail changes',
            '  - Atopy'
        ],
        prognosis: [
            'Unpredictable course',
            'Single patch: 60-80% regrow within 1 year',
            'Multiple patches or extensive: Poorer prognosis',
            'Alopecia totalis/universalis: <10% achieve full regrowth',
            'Recurrence common'
        ]
    },

    // NAIL DISORDERS
    'onychomycosis': {
        title: 'Onychomycosis (Fungal Nail Infection)',
        category: 'nail-disorders',
        clinicalPresentation: {
            description: 'Fungal infection of nail plate causing thickening, discoloration, and dystrophy',
            morphology: [
                'Nail thickening (onychauxis)',
                'Yellow/white/brown discoloration',
                'Subungual hyperkeratosis',
                'Onycholysis (separation from nail bed)',
                'Brittle, crumbly nails'
            ],
            types: [
                '<strong>Distal lateral subungual</strong>: Most common, starts at distal/lateral edge',
                '<strong>Superficial white</strong>: White patches on nail surface',
                '<strong>Proximal subungual</strong>: Rare, starts at proximal nail fold (suspect immunosuppression)',
                '<strong>Total dystrophic</strong>: Entire nail affected'
            ],
            images: ['onychomycosis-distal.jpg', 'onychomycosis-white.jpg']
        },
        causativeOrganisms: [
            '<strong>Dermatophytes (90%)</strong>: Trichophyton rubrum (most common)',
            '<strong>Yeasts</strong>: Candida (esp. fingernails, chronic paronychia)',
            '<strong>Non-dermatophyte molds</strong>: Fusarium, Scopulariopsis'
        ],
        riskFactors: [
            'Increasing age',
            'Tinea pedis',
            'Trauma',
            'Diabetes',
            'Immunosuppression',
            'Peripheral vascular disease',
            'Hyperhidrosis',
            'Communal bathing (swimming pools, gyms)'
        ],
        diagnosis: [
            '<strong>Clinical + mycology confirmation (essential before treatment)</strong>:',
            '  • Nail clippings + subungual debris',
            '  • Microscopy (KOH preparation) + culture',
            '  • PCR (faster, more sensitive)',
            '<strong>Differential diagnosis</strong>:',
            '  - Psoriasis (pitting, onycholysis, oil drop sign)',
            '  - Lichen planus',
            '  - Trauma',
            '  - Eczema'
        ],
        management: [
            '<strong>Mild (distal <50% nail, no matrix involvement)</strong>:',
            '  • <strong>Topical amorolfine</strong> 5% nail lacquer weekly for 6-12 months',
            '  • File down thickened nail before application',
            '<strong>Moderate-Severe or treatment failure</strong>:',
            '  • <strong>Oral terbinafine</strong>: First-line',
            '    - Fingernails: 250mg daily for 6 weeks',
            '    - Toenails: 250mg daily for 12 weeks',
            '    - Check LFTs baseline and 6 weeks',
            '  • <strong>Oral itraconazole</strong>: Alternative',
            '    - Pulse therapy: 200mg BD for 1 week/month',
            '    - Fingernails: 2 pulses',
            '    - Toenails: 3-4 pulses',
            '<strong>Combination</strong>:',
            '  • Oral + topical may improve cure rates',
            '<strong>Nail avulsion</strong>:',
            '  • Chemical (40% urea) or surgical',
            '  • If painful, thick, single nail',
            '<strong>General measures</strong>:',
            '  • Treat tinea pedis if present',
            '  • Keep feet dry',
            '  • Avoid sharing towels, nail clippers',
            '  • Cotton socks, breathable footwear'
        ],
        prognosis: [
            'Cure rates:',
            '  • Terbinafine: 60-70%',
            '  • Itraconazole: 50-60%',
            '  • Topical alone: 30-50%',
            'Recurrence common (20-50%)',
            'Complete clearance takes 12-18 months (time for nail to grow out)',
            'Toenails slower than fingernails'
        ]
    },

    // PIGMENTATION DISORDERS
    'vitiligo': {
        title: 'Vitiligo',
        category: 'pigmentation',
        clinicalPresentation: {
            description: 'Acquired depigmentation due to loss of melanocytes',
            morphology: [
                'Well-demarcated depigmented (chalk-white) macules and patches',
                'No scale or inflammation',
                'Hairs may be depigmented (poliosis)',
                'Wood lamp examination accentuates depigmentation'
            ],
            distribution: [
                '<strong>Non-segmental (90%)</strong>: Symmetrical, face, hands, wrists, knees, genitals',
                '<strong>Segmental (10%)</strong>: Unilateral, dermatomal, early onset, stable'
            ],
            images: ['vitiligo-hands.jpg', 'vitiligo-face.jpg', 'segmental-vitiligo.jpg']
        },
        associations: [
            'Autoimmune diseases (20-30%):',
            '  - Thyroid disease (commonest)',
            '  - Type 1 diabetes',
            '  - Pernicious anemia',
            '  - Addison disease',
            'Halo nevi'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Wood lamp</strong>: Accentuates depigmentation',
            '<strong>Investigations</strong>:',
            '  - Thyroid function (screen for autoimmune thyroid disease)',
            '  - FBC, B12, folate (if indicated)',
            '  - Autoantibodies if systemic features'
        ],
        management: [
            '<strong>General measures</strong>:',
            '  • Sun protection (SPF 50+) - prevent sunburn',
            '  • Camouflage cosmetics (e.g., Dermablend, Covermark)',
            '  • Psychological support',
            '<strong>Active treatment (for progressive or cosmetically distressing vitiligo)</strong>:',
            '  • <strong>Topical corticosteroids</strong>:',
            '    - Potent (betamethasone valerate) for body',
            '    - Moderate (clobetasone butyrate) for face',
            '    - Trial for 3-4 months',
            '  • <strong>Topical calcineurin inhibitors</strong>:',
            '    - Tacrolimus 0.1% (face, flexures)',
            '    - May be combined with phototherapy',
            '  • <strong>Phototherapy</strong>:',
            '    - Narrowband UVB: 2-3 times weekly',
            '    - Most effective, especially for widespread vitiligo',
            '    - Combined with topical treatments',
            '  • <strong>Excimer laser</strong>: 308nm targeted phototherapy for localized patches',
            '  • <strong>Topical ruxolitinib</strong>: JAK inhibitor (newly approved)',
            '<strong>Surgical</strong> (stable, localized vitiligo):',
            '  • Autologous skin grafting',
            '  • Melanocyte transplantation',
            '<strong>Depigmentation</strong> (extensive vitiligo >50% BSA):',
            '  • Monobenzyl ether of hydroquinone 20%',
            '  • Irreversible - permanent depigmentation of remaining skin',
            '<strong>Systemic</strong> (rapidly progressive):',
            '  • Oral corticosteroids: Short pulse therapy',
            '  • Oral JAK inhibitors: Under investigation'
        ],
        prognosis: [
            'Unpredictable, chronic',
            'Spontaneous repigmentation rare (10-20%)',
            'Segmental vitiligo: Usually stable after initial spread',
            'Non-segmental vitiligo: Progressive in most',
            'Response to treatment variable (30-50% achieve some repigmentation)',
            'Face and trunk respond better than hands and feet'
        ]
    },

    'melasma': {
        title: 'Melasma (Chloasma)',
        category: 'pigmentation',
        clinicalPresentation: {
            description: 'Acquired symmetrical facial hyperpigmentation',
            morphology: [
                'Irregular brown/grey-brown patches',
                'Symmetrical distribution',
                'No scale or inflammation',
                'Wood lamp: Epidermal (accentuated) vs dermal (not accentuated) pigment'
            ],
            distribution: [
                '<strong>Centrofacial (50%)</strong>: Forehead, cheeks, nose, upper lip, chin',
                '<strong>Malar (20%)</strong>: Cheeks and nose',
                '<strong>Mandibular (15%)</strong>: Jaw'
            ],
            images: ['melasma-centrofacial.jpg', 'melasma-pregnancy.jpg']
        },
        triggers: [
            '<strong>Hormonal</strong>: Pregnancy (chloasma gravidarum), combined OCP, HRT',
            '<strong>UV exposure</strong>: Essential trigger',
            '<strong>Genetic predisposition</strong>: Darker skin types (Fitzpatrick III-VI)',
            'Phototoxic medications'
        ],
        management: [
            '<strong>Essential</strong>:',
            '  • <strong>Broad-spectrum sunscreen SPF 50+</strong>: Daily, reapply frequently',
            '  • Protective clothing, avoid UV',
            '  • Stop OCP/HRT if possible (discuss with patient)',
            '<strong>Topical depigmenting agents</strong>:',
            '  • <strong>Hydroquinone 2-4%</strong>: BD for 8-12 weeks (first-line)',
            '    - Side effects: Irritation, ochronosis (avoid long-term)',
            '  • <strong>Triple combination cream</strong>:',
            '    - Hydroquinone 4% + tretinoin 0.05% + fluocinolone acetonide 0.01% (Tri-Luma)',
            '    - Most effective',
            '  • <strong>Azelaic acid 15-20%</strong>: Alternative to hydroquinone',
            '  • <strong>Kojic acid, vitamin C, niacinamide</strong>: Adjuncts',
            '  • <strong>Retinoids</strong>: Tretinoin 0.025-0.1% (enhances penetration)',
            '<strong>Procedures</strong> (specialist):',
            '  • Chemical peels: Glycolic acid, TCA',
            '  • Laser therapy: Q-switched Nd:YAG (caution - risk of PIH)',
            '<strong>Maintenance</strong>:',
            '  • Lifelong sun protection',
            '  • Intermittent topical agents',
            '  • High recurrence rate'
        ],
        prognosis: [
            'Chronic and relapsing',
            'May improve after pregnancy or stopping OCP',
            'Epidermal pigment responds better than dermal',
            'Recurrence common without sun protection',
            'Complete clearance difficult'
        ]
    }
};

// Export for use in other modules
export default dermatologyDatabase;
