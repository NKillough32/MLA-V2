/**
 * Dermatology Database
 * Comprehensive guide to dermatological conditions and skin presentations
 * Evidence-based content for medical education
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
            images: ['35.jpg', '36.jpg']
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
            'Psychological impact, sleep disturbance',
            'Growth impairment (severe childhood eczema)',
            'Eye complications: Keratoconus, cataracts (chronic facial eczema)'
        ],
        redFlags: [
            '⚠️ Eczema herpeticum: Punched-out erosions, monomorphic vesicles, fever - start IV aciclovir',
            '⚠️ Erythroderma: >90% BSA involvement - risk of hypothermia, high-output cardiac failure',
            'Widespread impetiginization requiring systemic antibiotics',
            'Failure to thrive in infants'
        ],
        prognosis: [
            '60% of children with atopic eczema improve by adolescence',
            'Adult-onset eczema tends to be more chronic',
            'Hand eczema persists in 30% into adulthood',
            'Persistent disease associated with early onset, severe disease, family history',
            'Increased lifetime risk of asthma and allergic rhinitis'
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
            images: ['26.jpg', '27.jpg']
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
        complications: ['Chronic hand eczema', 'Secondary infection', 'Occupational disability', 'Psychological distress'],
        prognosis: [
            'Excellent if allergen identified and avoided',
            'Complete resolution within weeks of allergen cessation',
            'Occupational contact dermatitis may require career change',
            'Patch test positivity helps with targeted avoidance'
        ]
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
            images: ['28.jpg', '29.jpg', '30.jpg', '31.jpg']
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
        complications: [
            'Psoriatic arthritis (10-30% - screen with PEST questionnaire)',
            'Erythroderma (life-threatening)',
            'Psychological impact: Depression, anxiety, reduced QOL',
            'Cardiovascular disease: 50% increased MI risk',
            'Metabolic syndrome components'
        ],
        redFlags: [
            '⚠️ Erythrodermic psoriasis: >90% BSA, systemic upset - urgent hospital admission',
            '⚠️ Pustular psoriasis: Fever, malaise, widespread pustules - medical emergency',
            'Joint pain/stiffness: Screen for psoriatic arthritis',
            'Extensive guttate post-streptococcal infection'
        ],
        prognosis: [
            'Chronic lifelong condition with remissions and flares',
            'Unpredictable course',
            'Guttate psoriasis: 40% develop chronic plaque psoriasis',
            'Early-onset disease (<20 years) tends to be more severe',
            'Excellent response to biologics in most patients (PASI 75-90 in 70-80%)',
            'Improved life expectancy with cardiovascular risk management'
        ]
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
            images: ['32.jpg', '33.jpg', '34.jpg']
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
        complications: [
            'Scarring (atrophic, ice-pick, rolling, boxcar)',
            'Hypertrophic scarring and keloids',
            'Post-inflammatory hyperpigmentation (especially darker skin)',
            'Psychological impact: Depression, anxiety, low self-esteem',
            'Acne fulminans (rare severe variant with systemic symptoms)'
        ],
        redFlags: [
            'Acne fulminans: Severe nodular acne + fever, arthralgia, malaise - urgent referral',
            'Signs of PCOS in females: Hirsutism, irregular periods, obesity',
            'Rapid onset in adult (especially >25 years) - consider hormonal cause or drug-induced',
            'Severe nodulocystic acne - early isotretinoin to prevent scarring'
        ],
        prognosis: [
            'Typically resolves by mid-20s but can persist into adulthood (12% women, 3% men >45 years)',
            'Isotretinoin: 85% clear or nearly clear after one course; 15% require second course',
            'Scarring permanent but can be improved with laser resurfacing, peels, microneedling',
            'Early aggressive treatment prevents scarring',
            'Adult female acne often more resistant to treatment'
        ]
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
            images: ['35.jpg', '36.jpg']
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
        ],
        complications: [
            'Ocular rosacea complications: Keratitis, corneal ulceration (vision-threatening)',
            'Rhinophyma: Disfiguring nasal hypertrophy',
            'Persistent erythema and telangiectasia',
            'Psychological distress'
        ],
        redFlags: [
            'Ocular symptoms: Photophobia, visual changes - urgent ophthalmology referral',
            'Unilateral presentation - consider alternative diagnosis (lupus, sarcoidosis)',
            'Granulomatous rosacea - may need biopsy to exclude other granulomatous conditions'
        ],
        prognosis: [
            'Chronic relapsing condition',
            'Requires long-term management and trigger avoidance',
            'Good response to treatment in most cases',
            'Remissions possible but recurrence common',
            'Telangiectasia permanent unless treated with laser'
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
            images: ['37.jpg', '38.jpg']
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
            images: ['39.jpg', '40.jpg']
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
            'Post-streptococcal glomerulonephritis (rare - 1-5% after streptococcal impetigo)',
            'Cellulitis or lymphangitis',
            'Staphylococcal scalded skin syndrome (SSSS) - in children <5 years',
            'Scarring (rare)'
        ],
        redFlags: [
            'Widespread bullous impetigo in neonate - risk of SSSS',
            'Systemic symptoms: Fever, malaise - consider deeper infection',
            'Haematuria after streptococcal impetigo - check for post-strep GN'
        ],
        prognosis: [
            'Excellent with treatment - resolves in 7-10 days',
            'High cure rates with topical or oral antibiotics',
            'Recurrence common if poor hygiene or nasal S. aureus carriage',
            'No scarring if treated promptly'
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
            images: ['41.jpg', '42.jpg']
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
            'Erythema multiforme (often HSV-triggered)',
            'Aseptic meningitis (rare)',
            'Neonatal herpes (vertical transmission - can be fatal)',
            'Disseminated HSV in immunocompromised',
            'HSV keratitis (vision-threatening)'
        ],
        redFlags: [
            '⚠️ Eczema herpeticum: Widespread punched-out erosions on eczematous skin - start IV aciclovir',
            '⚠️ Immunocompromised patient with extensive/severe HSV - risk of dissemination',
            'Eye involvement: Pain, photophobia, visual changes - ophthalmology referral',
            'Primary genital HSV in pregnancy (especially 3rd trimester) - risk to neonate'
        ],
        prognosis: [
            'Lifelong infection - virus remains dormant in sensory ganglia',
            'Recurrence rate variable: Average 2-4 episodes/year',
            'Recurrences typically milder and shorter than primary infection',
            'Frequency decreases over time in many patients',
            'Suppressive therapy reduces recurrences by 70-80%',
            'No cure but highly manageable with antivirals'
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
            images: ['43.jpg', '44.jpg', '45.jpg']
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
            '  • Shingles vaccine (Shingrix) - ≥50 years or immunocompromised',
            '  • Varicella vaccine - children (not routine in UK)'
        ],
        redFlags: [
            '⚠️ Ophthalmic zoster (V1 distribution) - urgent ophthalmology referral same day',
            '⚠️ Hutchinson sign: Vesicles on tip of nose - high risk of ocular involvement',
            '⚠️ Ramsay Hunt syndrome: Facial palsy + ear vesicles - ENT/neurology referral',
            'Disseminated zoster (>2 dermatomes) - indicates immunocompromise',
            'Motor weakness in affected dermatome - zoster paresis',
            'Severe headache/meningism - CNS involvement'
        ],
        prognosis: [
            '<strong>Chickenpox</strong>:',
            '  • Self-limiting in children - resolves in 1-2 weeks',
            '  • More severe in adults and immunocompromised',
            '  • Lifelong immunity after infection (but VZV remains dormant)',
            '<strong>Shingles</strong>:',
            '  • Rash resolves in 2-4 weeks with treatment',
            '  • Post-herpetic neuralgia (PHN): 10-20% overall, 50% in >60 years',
            '  • PHN duration: Resolves in 50% by 3 months, may persist >1 year in 10%',
            '  • Early antiviral therapy reduces PHN risk',
            '  • Recurrence rare (5%) but higher in immunocompromised',
            '  • Vaccine reduces shingles incidence by 90% and PHN by 85%'
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
            images: ['46.jpg', '47.jpg', '48.jpg']
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
        redFlags: [
            'Rapid growth or change in long-standing lesion',
            'Central ulceration (rodent ulcer) - more aggressive',
            'Morphoeic/sclerosing subtype - ill-defined, higher recurrence',
            'Periocular, nasal, or ear location - may require Mohs surgery',
            'Large size (>2cm) - higher risk features',
            'Gorlin syndrome (multiple BCCs) - genetic counselling'
        ],
        prognosis: [
            'Excellent prognosis - rarely metastasizes (<0.1%)',
            'Cure rate >95% with appropriate surgical treatment',
            'Local recurrence: 5% after standard excision, 1-2% after Mohs',
            'Morphoeic/infiltrative types: Higher recurrence (10-15%)',
            'Can be locally destructive if untreated (especially facial)',
            '40% risk of developing another BCC within 3 years',
            'Metastatic BCC extremely rare but has poor prognosis'
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
            images: ['49.jpg', '50.jpg', '51.jpg']
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
        redFlags: [
            '⚠️ Rapidly growing nodule in organ transplant patient - very high metastatic risk',
            'Lesion >2cm or >4mm deep (Breslow thickness)',
            'Poorly differentiated histology',
            'Perineural or lymphovascular invasion',
            'SCC on lip, ear, or genitals - higher risk sites',
            'Palpable lymph nodes - urgent staging',
            'Recurrent SCC after previous treatment'
        ],
        prognosis: [
            'Overall 5-year survival: >95% if localized and treated',
            '<strong>Metastasis risk</strong>:',
            '  • Low-risk SCC: 2-5%',
            '  • Immunosuppressed: 10-16% (organ transplant patients 100x risk)',
            '  • High-risk features: Up to 20-30%',
            '<strong>Recurrence</strong>:',
            '  • Local recurrence: 8% at 5 years',
            '  • Mohs surgery reduces recurrence to <3%',
            '<strong>Survival if metastatic</strong>:',
            '  • 5-year survival with lymph node mets: 25-40%',
            '  • Distant metastases: <20%',
            'High-risk features: >2cm, >4mm depth, poorly differentiated, perineural invasion, ear/lip location, immunosuppression'
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
            images: ['3.jpg', '52.jpg', '53.jpg', '54.jpg']
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
        redFlags: [
            '⚠️ Any new pigmented lesion in adult or changing mole - 2-week-wait',
            '⚠️ Nodular melanoma: Rapidly growing pigmented/amelanotic nodule - aggressive',
            'Amelanotic melanoma: Flesh-colored/pink nodule - easily missed',
            'Satellite lesions or in-transit metastases',
            'Lymphadenopathy - stage III disease',
            'Systemic symptoms: Weight loss, bone pain, neurological signs',
            'Bleeding, ulceration, or pain in pigmented lesion'
        ],
        prognosis: [
            '<strong>5-year survival by stage</strong>:',
            '  • Stage 0 (in situ): 99%',
            '  • Stage IA: 97%',
            '  • Stage IB: 92%',
            '  • Stage II: 65-90% (depends on Breslow thickness)',
            '  • Stage III: 40-78% (depends on nodal burden)',
            '  • Stage IV: 15-30% (improved with immunotherapy)',
            '<strong>Prognostic factors</strong>:',
            '  • <strong>Breslow thickness</strong>: Most important',
            '    - <1mm: Excellent prognosis',
            '    - 1-2mm: Good prognosis',
            '    - 2-4mm: Intermediate',
            '    - >4mm: Poor prognosis',
            '  • Ulceration: Worsens prognosis by one sub-stage',
            '  • Mitotic rate: >1/mm² worse prognosis',
            '  • Lymph node involvement: Significant reduction in survival',
            '<strong>Response to treatment</strong>:',
            '  • Combination immunotherapy (ipilimumab + nivolumab): 58% response rate in metastatic',
            '  • BRAF-targeted therapy: 68% response rate in BRAF+ metastatic',
            '  • Adjuvant therapy reduces recurrence by 50% in Stage III',
            '<strong>Follow-up</strong>:',
            '  • Lifetime risk of second primary melanoma: 5-10%'
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
            images: ['55.jpg', '56.jpg']
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
        differentialDiagnosis: [
            'Trichotillomania (hair pulling) - irregular patches, broken hairs varying lengths',
            'Tinea capitis (fungal) - scale, broken hairs, inflammatory',
            'Androgenetic alopecia - diffuse thinning, miniaturization',
            'Telogen effluvium - diffuse shedding after stress/illness',
            'Scarring alopecia - destroyed follicles, smooth shiny scalp'
        ],
        redFlags: [
            'Scarring or atrophy of scalp - indicates scarring alopecia, not alopecia areata',
            'Scale or inflammation - consider tinea capitis (get fungal culture)',
            'Rapidly progressive to totalis/universalis - poor prognostic sign',
            'Associated severe nail dystrophy - worse prognosis',
            'Ophiasis pattern (band around occipital/temporal) - resistant to treatment'
        ],
        prognosis: [
            '<strong>Overall</strong>: Unpredictable course with high variability',
            '<strong>Limited patches</strong>:',
            '  • Single patch: 60-80% spontaneous regrowth within 1 year',
            '  • Few patches (<50% scalp): 40-50% complete regrowth',
            '<strong>Extensive disease</strong>:',
            '  • >50% scalp involvement: 10% complete regrowth',
            '  • Alopecia totalis: <10% full regrowth',
            '  • Alopecia universalis: <5% full regrowth',
            '<strong>Recurrence</strong>: Common (30% within 1 year, 50-80% lifetime)',
            '<strong>Poor prognostic factors</strong>:',
            '  • Childhood onset (<10 years)',
            '  • Extensive hair loss (>50%)',
            '  • Rapid progression to totalis/universalis',
            '  • Ophiasis pattern',
            '  • Nail dystrophy',
            '  • Atopy',
            '  • Family history of alopecia areata',
            '  • Long duration (>1 year without regrowth)'
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
            images: ['57.jpg', '58.jpg']
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
        differentialDiagnosis: [
            '<strong>Psoriasis</strong>: Nail pitting, oil drop sign, subungual hyperkeratosis - can coexist with onychomycosis',
            '<strong>Lichen planus</strong>: Nail thinning, longitudinal ridging, pterygium',
            '<strong>Trauma</strong>: Occupational/footwear, single nail, history of injury',
            '<strong>Eczema/dermatitis</strong>: Irregular pitting, ridging',
            '<strong>Melanoma</strong>: Longitudinal melanonychia - must exclude!',
            '<strong>Yellow nail syndrome</strong>: All nails, slow growth, pleural effusions'
        ],
        redFlags: [
            '⚠️ Proximal subungual pattern in immunocompetent - unusual, investigate for immunodeficiency',
            '⚠️ Single dark longitudinal band (melanonychia) - exclude subungual melanoma',
            'Rapid onset or painful nail changes - consider alternative diagnosis',
            'Total nail dystrophy with systemic symptoms - investigate further',
            'Check LFTs before oral antifungals - contraindicated in liver disease'
        ],
        prognosis: [
            '<strong>Cure rates (mycological + clinical)</strong>:',
            '  • Terbinafine: 60-70% for toenails, 75-80% for fingernails',
            '  • Itraconazole: 50-60% for toenails',
            '  • Topical alone: 30-50% (only for mild distal disease)',
            '<strong>Time to cure</strong>:',
            '  • Fingernails: 4-6 months visible improvement, 6-9 months complete',
            '  • Toenails: 6-12 months visible improvement, 12-18 months complete',
            '  • Must wait for complete nail regrowth (takes longer in elderly)',
            '<strong>Recurrence</strong>: Common (20-50% within 3 years)',
            '<strong>Factors affecting cure</strong>:',
            '  • Poor: Lateral disease, total dystrophy, matrix involvement, elderly, immunosuppression',
            '  • Good: Distal disease, <50% nail involvement, white superficial type, younger age',
            '<strong>Relapse prevention</strong>:',
            '  • Treat tinea pedis',
            '  • Antifungal foot powder',
            '  • Breathable footwear',
            '  • Avoid trauma'
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
            images: ['59.jpg', '60.jpg']
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
        differentialDiagnosis: [
            'Pityriasis alba - common in children, ill-defined hypopigmentation',
            'Tinea versicolor - scaly hypopigmented patches, KOH positive',
            'Post-inflammatory hypopigmentation - history of trauma/eczema',
            'Chemical leukoderma - occupational exposure',
            'Halo nevus - depigmented ring around mole (associated with vitiligo)',
            'Piebaldism - congenital, white forelock, stable'
        ],
        redFlags: [
            'Rapidly progressive vitiligo - may benefit from systemic immunosuppression',
            'Koebner phenomenon (lesions at trauma sites) - marker of activity',
            'Associated symptoms: Fatigue, weight loss, hyperpigmentation - screen for Addison disease',
            'Extensive vitiligo (>50% BSA) - consider depigmentation therapy',
            'Halo nevi + vitiligo in young person - screen for melanoma family history'
        ],
        prognosis: [
            '<strong>Natural history</strong>:',
            '  • Unpredictable, chronic progressive',
            '  • Spontaneous repigmentation: 10-20% (more in children)',
            '  • Segmental vitiligo: Stabilizes after 6-24 months, remains stable',
            '  • Non-segmental vitiligo: Progressive in 80%, waxing/waning in 20%',
            '<strong>Treatment response</strong>:',
            '  • 30-50% achieve some repigmentation with treatment',
            '  • Face and trunk: Best response (up to 70%)',
            '  • Hands and feet: Poor response (<20%)',
            '  • Lips and genitalia: Very poor response',
            '  • Recent onset (<2 years): Better response',
            '<strong>Factors favoring repigmentation</strong>:',
            '  • Childhood onset',
            '  • Recent onset',
            '  • Darker skin type (follicular repigmentation easier to see)',
            '  • Facial/truncal location',
            '  • Trichrome vitiligo (tan zone between white and normal)',
            '<strong>Psychosocial impact</strong>:',
            '  • Significant in visible areas and darker skin types',
            '  • Depression and anxiety common',
            '  • Camouflage makeup highly effective for quality of life'
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
            images: ['61.jpg', '62.jpg']
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
        differentialDiagnosis: [
            'Post-inflammatory hyperpigmentation - history of trauma/inflammation',
            'Drug-induced hyperpigmentation - minocycline, antimalarials, phenytoin',
            'Exogenous ochronosis - from prolonged hydroquinone use',
            'Hori nevus - blue-grey pigmentation, deeper dermal',
            'Addison disease - generalized hyperpigmentation + symptoms',
            'Riehl melanosis - occupational/cosmetic contact dermatitis'
        ],
        redFlags: [
            'Unilateral distribution - consider alternative diagnosis',
            'Associated systemic symptoms - investigate for Addison disease',
            'Blue-grey color - suggests dermal pigment (poor treatment response)',
            'Ochronosis (blue-black darkening) - from chronic hydroquinone use',
            'Porphyria cutanea tarda if photosensitivity + hyperpigmentation'
        ],
        prognosis: [
            '<strong>Natural course</strong>:',
            '  • Chronic and relapsing in most cases',
            '  • May improve after pregnancy (chloasma gravidarum) - 30% clear within 1 year postpartum',
            '  • May improve after stopping OCP/HRT',
            '  • Rarely resolves completely without treatment',
            '<strong>Treatment response</strong>:',
            '  • Epidermal pigment: Good response (70-80% with triple therapy)',
            '  • Dermal pigment: Poor response (<30%)',
            '  • Mixed epidermal-dermal: Variable response',
            '  • Triple combination cream: Most effective (60-80% good/excellent improvement)',
            '  • Improvement visible in 4-8 weeks, maximum at 12-24 weeks',
            '<strong>Recurrence</strong>:',
            '  • Very common (50-80%) without maintenance',
            '  • UV exposure most important trigger',
            '  • Requires lifelong sun protection',
            '  • Intermittent treatment may be needed',
            '<strong>Factors affecting prognosis</strong>:',
            '  • Epidermal vs dermal pigment (Wood lamp assessment)',
            '  • Skin type: Fitzpatrick III-VI more challenging',
            '  • Compliance with sun protection',
            '  • Ongoing hormonal triggers',
            '  • Laser treatment risk: Post-inflammatory hyperpigmentation in darker skin types'
        ]
    }
};

// Export for use in other modules
export default dermatologyDatabase;
