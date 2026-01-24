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
            images: [
                'Eczema – Atopic.jpg',
                'Eczema – Atopic2.jpg',
                'Eczema – Atopic3.jpg',
                'Eczema.jpg',
                'Excoriations in eczema.jpg',
                'Lichenification due to chronic rubbing in eczema.jpg',
                'Lichenification due to chronic rubbing in eczema2.jpg',
                'Lichenification in darker skin types.jpg'
            ]
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
            images: [
                'Acute hand eczema.jpg',
                'Chronic fissured hand eczema.jpg'
            ]
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
            images: [
                'Plaque Psoriasis.jpg',
                'Plaque Psoriasis2.jpg',
                'Psoriasis.jpg',
                'Psoriasis2.jpg',
                'Scalp Psoriasis.jpg',
                'Pitting.jpg',
                'Nail changes and arthropathy.jpg',
                'Köebner phenomenon.jpg'
            ]
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
            images: [
                'Acne.jpg',
                'Closed comedones.jpg',
                'Open comedones.jpg',
                'Comedones2.jpg'
            ]
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
            images: ['Rosacea.jpg']
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
            images: [
                'Cellulitis.jpg',
                'Cellulitis2.jpg',
                'Cellulitis with elephantiasis of the penis.jpg',
                'Erysipelas.jpg',
                'Erysipelas2.jpg'
            ]
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
            images: ['Impetigo.jpg', 'Bullous impetigo in a new tattoo.jpg']
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
            images: ['Herpes simplex.jpg']
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
            images: ['Herpes zoster (shingles).jpg']
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
            images: ['Basal cell carcinoma – nodular type.jpg']
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
            images: [
                'Squamous cell carcinoma – adjacent to ear.jpg',
                'Squamous cell carcinoma – glans penis.jpg'
            ]
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
            images: [
                'Acral lentiginous melanoma.jpg',
                'Acral lentiginous melanoma (in situ).png',
                'Lentigo maligna melanoma.jpg',
                'Nodular melanoma.jpg',
                'Superficial spreading melanoma.jpg'
            ]
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
            images: ['Alopecia areata.jpg', 'Alopecia areata2.jpg', 'Alopecia areata3.jpg']
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
            images: ['Tinea pedis with associated tinea unguium.jpg']
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
            images: ['Vitiligo.jpg', 'Vitiligo2.jpg', 'Vitiligo3.jpg']
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
            images: ['Melasma.jpg', 'Melasma2.jpg']
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
    },

    // ADDITIONAL ECZEMA AND ECZEMA-RELATED PRESENTATIONS
    'eczema-hand': {
        title: 'Hand Eczema',
        category: 'inflammatory-eczema',
        clinicalPresentation: {
            description: 'Eczematous inflammation of the hands with erythema, fissuring, and scaling',
            morphology: ['Erythema, vesiculation or fissuring', 'Hyperkeratosis and lichenification in chronic disease'],
            distribution: 'Palms, fingers, and dorsal hands',
            images: ['Acute hand eczema.jpg', 'Chronic fissured hand eczema.jpg']
        },
        subtypes: [
            '<strong>Irritant contact</strong>: Repeated wet work, detergents, solvents',
            '<strong>Allergic contact</strong>: Delayed hypersensitivity to allergens (e.g., nickel, rubber)',
            '<strong>Atopic hand eczema</strong>: Associated with atopic dermatitis',
            '<strong>Pompholyx (dyshidrotic)</strong>: Deep vesicles on sides of fingers/palms'
        ],
        riskFactors: [
            'Occupational wet work (healthcare, hairdressers, cleaners)',
            'Frequent handwashing or sanitizers',
            'Atopic history',
            'Allergen exposure (metals, fragrances, preservatives)',
            'Cold weather and low humidity'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Patch testing</strong>: If allergic contact suspected',
            '<strong>Skin swab</strong>: If secondary infection suspected',
            '<strong>Differentials</strong>: Tinea manuum, psoriasis, scabies, palmoplantar pustulosis'
        ],
        management: [
            '<strong>General measures</strong>:',
            '  • Emollients after every handwash',
            '  • Avoid irritants, use soap substitutes',
            '  • Protective gloves (cotton-lined for wet work)',
            '<strong>Topical therapy</strong>:',
            '  • Potent topical corticosteroids short courses',
            '  • Calcineurin inhibitors for maintenance',
            '<strong>Severe/refractory</strong>:',
            '  • Phototherapy (NB-UVB or PUVA)',
            '  • Systemic therapy (alitretinoin, methotrexate, ciclosporin)',
            '<strong>Infection</strong>:',
            '  • Treat secondary bacterial infection with topical/oral antibiotics'
        ],
        complications: [
            'Chronic fissuring and pain',
            'Secondary infection (impetiginization)',
            'Occupational impairment',
            'Post-inflammatory hyperpigmentation'
        ],
        redFlags: [
            'Widespread fissuring with systemic symptoms - consider erythroderma',
            'Unilateral hand rash with scaling - consider tinea manuum',
            'Failure to respond to potent steroids - consider allergic contact dermatitis or psoriasis'
        ],
        prognosis: [
            'Chronic relapsing course common',
            'Better outcomes with trigger avoidance and early treatment',
            'Occupational cases may persist if exposure continues'
        ]
    },

    'eczema-discoid': {
        title: 'Discoid Eczema (Nummular Eczema)',
        category: 'inflammatory-eczema',
        clinicalPresentation: {
            description: 'Coin-shaped, pruritic, eczematous plaques often on limbs',
            morphology: ['Well-demarcated round or oval plaques', 'Scaling or weeping surface'],
            images: ['Discoid Eczema.jpg']
        },
        associations: [
            'Xerosis (dry skin), especially in older adults',
            'Atopic tendency (less strong than atopic eczema)',
            'Skin trauma or insect bites can trigger lesions'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Differentials</strong>: Tinea corporis, psoriasis, contact dermatitis',
            '<strong>Consider swab</strong>: If oozing/crusting to rule out infection'
        ],
        management: [
            '<strong>General</strong>: Liberal emollients, avoid irritants',
            '<strong>Topical corticosteroids</strong>: Potent for acute flares',
            '<strong>Wet wraps</strong>: For severe oozing lesions',
            '<strong>Antibiotics</strong>: If secondary infection',
            '<strong>Phototherapy</strong>: For refractory disease'
        ],
        complications: [
            'Secondary infection',
            'Post-inflammatory pigment changes',
            'Chronic lichenification'
        ],
        redFlags: [
            'Failure to respond to steroids - exclude tinea (consider fungal culture)',
            'Widespread disease with systemic symptoms - consider erythroderma'
        ],
        prognosis: [
            'Often chronic with relapses',
            'May resolve with good emollient use and avoidance of triggers'
        ]
    },

    'eczema-herpeticum': {
        title: 'Eczema Herpeticum',
        category: 'infection-viral',
        clinicalPresentation: {
            description: 'Disseminated HSV infection on eczematous skin causing monomorphic vesicles and erosions',
            morphology: ['Punched-out erosions', 'Grouped vesicles', 'Systemic upset may occur'],
            images: ['Eczema herpeticum.jpg']
        },
        riskFactors: [
            'Atopic eczema (most common)',
            'Immunosuppression',
            'Infants and young children',
            'Poorly controlled skin barrier disease'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong> (fever + monomorphic vesicles/erosions)',
            '<strong>HSV PCR</strong> from swab of lesion',
            '<strong>Consider bacterial cultures</strong> if secondary infection'
        ],
        management: [
            '<strong>Emergency - treat urgently</strong>:',
            '  • Oral aciclovir 400-800mg 5x daily (mild/moderate)',
            '  • IV aciclovir if severe, systemic symptoms, or immunocompromised',
            '  • Supportive care: analgesia, fluids',
            '<strong>Stop topical steroids temporarily</strong> if severe infection; may restart once improving',
            '<strong>Infection control</strong>: Isolation from neonates/immunocompromised'
        ],
        complications: [
            'Keratoconjunctivitis (vision-threatening)',
            'Secondary bacterial infection and sepsis',
            'Disseminated HSV (life-threatening)'
        ],
        redFlags: [
            '⚠️ Fever, lethargy, widespread erosions - urgent admission',
            '⚠️ Eye involvement: Pain, photophobia, red eye - urgent ophthalmology',
            '⚠️ Immunocompromised patient - high risk of dissemination'
        ],
        prognosis: [
            'Rapid improvement with early antiviral therapy',
            'Delayed treatment increases risk of systemic complications'
        ]
    },

    // URTICARIA AND ANGIOEDEMA
    'urticaria': {
        title: 'Urticaria',
        category: 'hypersensitivity',
        clinicalPresentation: {
            description: 'Transient wheals with pruritus and dermal edema',
            morphology: ['Evanescent wheals', 'Dermal edema with erythematous borders'],
            images: ['Urticaria.jpg', 'Urticaria2.jpg', 'Urticaria3.jpg', 'Urticaria4.jpg']
        },
        types: [
            '<strong>Acute</strong>: <6 weeks (often infection, drugs, foods)',
            '<strong>Chronic</strong>: >6 weeks (often idiopathic or autoimmune)',
            '<strong>Physical</strong>: Dermographism, cold, pressure, cholinergic'
        ],
        triggers: [
            'Infections (viral, bacterial)',
            'Drugs: NSAIDs, antibiotics',
            'Foods: Nuts, shellfish, strawberries',
            'Physical stimuli: Pressure, cold, heat, exercise',
            'Stress'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>History</strong>: Duration, triggers, drug exposure',
            '<strong>Investigations</strong>: Usually not needed; consider FBC, ESR/CRP if chronic'
        ],
        management: [
            '<strong>First-line</strong>: Non-sedating antihistamines (cetirizine, loratadine)',
            '<strong>Up-titrate</strong>: Up to 4x dose if chronic',
            '<strong>Short course steroids</strong>: Prednisolone for severe flares',
            '<strong>Refractory</strong>: Omalizumab or ciclosporin (specialist)',
            '<strong>Avoid triggers</strong>: NSAIDs, alcohol, heat'
        ],
        complications: [
            'Angioedema',
            'Sleep disturbance and reduced quality of life'
        ],
        redFlags: [
            '⚠️ Signs of anaphylaxis: Wheeze, hypotension, airway swelling',
            'Urticaria lasting >24h in fixed location - consider urticarial vasculitis'
        ],
        prognosis: [
            'Acute urticaria resolves within days to weeks',
            'Chronic urticaria resolves within 1 year in ~50%'
        ]
    },

    'angioedema': {
        title: 'Angioedema',
        category: 'hypersensitivity',
        clinicalPresentation: {
            description: 'Deeper dermal and subcutaneous swelling, often involving lips, eyelids, or tongue',
            morphology: ['Non-pitting swelling', 'May occur with or without urticaria'],
            images: ['Angioedema.jpg']
        },
        causes: [
            '<strong>Histamine-mediated</strong>: Allergy, urticaria, anaphylaxis',
            '<strong>Bradykinin-mediated</strong>: ACE inhibitors, hereditary angioedema',
            '<strong>Idiopathic</strong>: No clear cause'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Airway assessment</strong>: Voice changes, stridor',
            '<strong>Investigations</strong>: C4/C1 esterase inhibitor for hereditary angioedema if recurrent'
        ],
        management: [
            '<strong>Emergency if airway involvement</strong>:',
            '  • IM adrenaline if anaphylaxis',
            '  • High-flow oxygen, IV fluids',
            '<strong>Histamine-mediated</strong>: Antihistamines, steroids, adrenaline if severe',
            '<strong>Bradykinin-mediated</strong>: Stop ACE inhibitor; consider icatibant or C1 inhibitor',
            '<strong>Observation</strong>: Monitor for progression'
        ],
        complications: [
            'Airway obstruction',
            'Recurrent episodes impacting quality of life'
        ],
        redFlags: [
            '⚠️ Tongue or laryngeal swelling',
            '⚠️ Stridor, hoarseness, drooling',
            '⚠️ Rapid progression after ACE inhibitor use'
        ],
        prognosis: [
            'Histamine-mediated episodes resolve within 24-72 hours',
            'Hereditary angioedema may recur without prophylaxis'
        ]
    },

    // BACTERIAL INFECTIONS
    'erysipelas': {
        title: 'Erysipelas',
        category: 'infection-bacterial',
        clinicalPresentation: {
            description: 'Superficial bacterial skin infection with sharply demarcated erythema',
            morphology: ['Bright red, raised plaques', 'Well-demarcated borders'],
            images: ['Erysipelas.jpg', 'Erysipelas2.jpg']
        },
        causativeOrganisms: [
            'Streptococcus pyogenes (Group A strep) most common',
            'Streptococcus groups B, C, G less common'
        ],
        riskFactors: [
            'Skin barrier disruption: Tinea pedis, eczema, trauma',
            'Lymphoedema or venous insufficiency',
            'Diabetes, immunosuppression'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Consider labs</strong>: FBC, CRP if systemic features',
            '<strong>Blood cultures</strong>: If febrile or unwell'
        ],
        management: [
            '<strong>Oral antibiotics</strong>: Flucloxacillin 500mg QDS 5-7 days',
            '<strong>Penicillin allergy</strong>: Clarithromycin or doxycycline',
            '<strong>Severe/systemic</strong>: IV antibiotics and admission',
            '<strong>Supportive</strong>: Elevation, analgesia, treat portal of entry'
        ],
        complications: [
            'Sepsis',
            'Recurrent infection',
            'Abscess formation'
        ],
        redFlags: [
            'Rapid progression with severe pain - consider necrotizing fasciitis',
            'Systemic toxicity - urgent admission'
        ],
        prognosis: [
            'Improves rapidly with antibiotics',
            'Recurrence common if predisposing factors persist'
        ]
    },

    'staphylococcal-scalded-skin-syndrome': {
        title: 'Staphylococcal Scalded Skin Syndrome',
        category: 'infection-bacterial',
        clinicalPresentation: {
            description: 'Toxin-mediated blistering disease with diffuse erythema and superficial desquamation',
            morphology: ['Tender erythema', 'Fragile blisters', 'Sheet-like desquamation'],
            images: ['Staphylococcal scalded skin syndrome.jpg', 'Staphylococcal scalded skin syndrome2.jpg']
        },
        riskFactors: [
            'Neonates and young children (<5 years)',
            'Renal impairment',
            'Immunosuppression'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Positive Nikolsky sign</strong>',
            '<strong>Culture</strong>: From primary infection site (blood cultures often negative)',
            '<strong>Differentials</strong>: SJS/TEN (mucosal involvement), bullous impetigo'
        ],
        management: [
            '<strong>Emergency admission</strong>: Manage like burns',
            '<strong>IV antibiotics</strong>: Flucloxacillin; add clindamycin to reduce toxin',
            '<strong>Supportive care</strong>: Fluids, analgesia, wound care, thermoregulation',
            '<strong>Isolation</strong>: Prevent nosocomial spread'
        ],
        complications: [
            'Dehydration and electrolyte imbalance',
            'Secondary infection and sepsis',
            'Hypothermia'
        ],
        redFlags: [
            '⚠️ Widespread blistering in child with fever - urgent admission',
            '⚠️ Mucosal involvement - consider SJS/TEN'
        ],
        prognosis: [
            'Excellent in children with prompt treatment',
            'Higher mortality in adults due to comorbidities'
        ]
    },

    'periungual-abscess': {
        title: 'Periungual Abscess (Paronychia)',
        category: 'infection-bacterial',
        clinicalPresentation: {
            description: 'Localized infection of the nail fold with erythema and purulent collection',
            morphology: ['Tender swelling of nail fold', 'Possible pus discharge'],
            images: ['Periungual abscess.jpg']
        },
        causes: [
            'Staphylococcus aureus (acute)',
            'Candida (chronic paronychia)',
            'Trauma: Nail biting, manicures, ingrown nails'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Consider swab</strong> if recurrent or not responding'
        ],
        management: [
            '<strong>Mild</strong>: Warm soaks, topical antiseptics',
            '<strong>Abscess</strong>: Incision and drainage',
            '<strong>Antibiotics</strong>: Flucloxacillin if cellulitis; consider doxycycline for MRSA risk',
            '<strong>Chronic</strong>: Avoid wet work, topical steroids + antifungals'
        ],
        complications: [
            'Felon (deep pulp infection)',
            'Osteomyelitis (rare)',
            'Nail dystrophy'
        ],
        redFlags: [
            'Spreading cellulitis or systemic symptoms',
            'Severe pain or swelling of finger pulp'
        ],
        prognosis: [
            'Excellent with drainage and antibiotics',
            'Chronic cases require trigger avoidance'
        ]
    },

    // FUNGAL INFECTIONS
    'tinea-capitis': {
        title: 'Tinea Capitis',
        category: 'infection-fungal',
        clinicalPresentation: {
            description: 'Dermatophyte infection of the scalp causing scaling and hair loss',
            morphology: ['Patchy alopecia with scale', 'Inflammatory or non-inflammatory'],
            images: ['Tinea capitis.jpg', 'Diffuse Tinea capitis.jpg']
        },
        variants: [
            '<strong>Non-inflammatory</strong>: Grey patch or black dot',
            '<strong>Inflammatory</strong>: Kerion (boggy tender mass)',
            '<strong>Favus</strong>: Yellow crusts (scutula)'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Mycology</strong>: Hair pluckings and scalp scrapings for microscopy/culture',
            '<strong>Wood lamp</strong>: Some species fluoresce (Microsporum)',
            '<strong>Differentials</strong>: Alopecia areata, psoriasis, seborrheic dermatitis'
        ],
        management: [
            '<strong>Systemic antifungals</strong> (topicals alone ineffective):',
            '  • Oral terbinafine (first-line for Trichophyton)',
            '  • Oral griseofulvin (Microsporum)',
            '<strong>Adjunct</strong>: Antifungal shampoo (selenium sulfide/ketoconazole)',
            '<strong>Contacts</strong>: Treat household contacts if symptomatic',
            '<strong>School</strong>: Can attend once treatment started'
        ],
        complications: [
            'Scarring alopecia (kerion if untreated)',
            'Secondary bacterial infection'
        ],
        redFlags: [
            'Painful boggy mass (kerion) - urgent treatment',
            'Cervical lymphadenopathy or fever'
        ],
        prognosis: [
            'Good with prompt systemic therapy',
            'Hair regrowth usually complete unless scarring'
        ]
    },

    'tinea-corporis': {
        title: 'Tinea Corporis',
        category: 'infection-fungal',
        clinicalPresentation: {
            description: 'Ring-shaped dermatophyte infection of glabrous skin',
            morphology: ['Annular plaques with central clearing', 'Raised scaly border'],
            images: ['Tinea corporis.jpg']
        },
        riskFactors: [
            'Contact with infected humans/animals',
            'Warm, humid environments',
            'Immunosuppression'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>KOH microscopy</strong> of skin scrapings',
            '<strong>Differentials</strong>: Nummular eczema, psoriasis, pityriasis rosea'
        ],
        management: [
            '<strong>Topical antifungals</strong>: Terbinafine or azoles for 2-4 weeks',
            '<strong>Extensive</strong>: Oral terbinafine or itraconazole',
            '<strong>Hygiene</strong>: Avoid sharing towels, treat pets if infected'
        ],
        complications: [
            'Tinea incognito (steroid-modified infection)',
            'Spread to other sites'
        ],
        redFlags: [
            'Failure to respond to topical therapy - consider alternative diagnosis or systemic therapy'
        ],
        prognosis: [
            'Excellent with appropriate antifungal treatment'
        ]
    },

    'tinea-manuum': {
        title: 'Tinea Manuum',
        category: 'infection-fungal',
        clinicalPresentation: {
            description: 'Dermatophyte infection of the hands, often with scaling and hyperkeratosis',
            morphology: ['Dry scale on palms', 'Hyperkeratosis or fissuring'],
            images: ['Tinea manuum.jpg']
        },
        associations: [
            'Often unilateral ("two feet-one hand" syndrome)',
            'Coexisting tinea pedis or onychomycosis'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>KOH microscopy</strong> and culture',
            '<strong>Differentials</strong>: Hand eczema, psoriasis'
        ],
        management: [
            '<strong>Topical antifungals</strong>: Terbinafine or azole for 2-4 weeks',
            '<strong>Extensive or hyperkeratotic</strong>: Oral terbinafine',
            '<strong>Treat other sites</strong>: Feet/nails to prevent recurrence'
        ],
        complications: [
            'Chronic fissuring and secondary infection'
        ],
        redFlags: [
            'Unilateral palmar scaling not responding to steroids - suspect tinea'
        ],
        prognosis: [
            'Good with appropriate antifungal therapy'
        ]
    },

    'tinea-pedis': {
        title: 'Tinea Pedis (Athlete’s Foot)',
        category: 'infection-fungal',
        clinicalPresentation: {
            description: 'Dermatophyte infection of the feet with scaling and maceration',
            morphology: ['Interdigital scaling', 'Plantar hyperkeratosis'],
            images: ['Tinea pedis with associated tinea unguium.jpg']
        },
        types: [
            '<strong>Interdigital</strong>: Maceration between toes',
            '<strong>Moccasin</strong>: Diffuse plantar scaling',
            '<strong>Vesicular</strong>: Vesicles on instep'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>KOH microscopy</strong> if uncertain',
            '<strong>Differentials</strong>: Eczema, psoriasis, contact dermatitis'
        ],
        management: [
            '<strong>Topical antifungals</strong>: Terbinafine/azole for 1-4 weeks',
            '<strong>Extensive</strong>: Oral terbinafine or itraconazole',
            '<strong>Foot care</strong>: Keep feet dry, change socks, breathable shoes'
        ],
        complications: [
            'Secondary bacterial infection',
            'Onychomycosis',
            'Recurrent cellulitis'
        ],
        redFlags: [
            'Signs of bacterial infection (increasing pain, erythema, fever)'
        ],
        prognosis: [
            'Good with treatment but recurrence common without preventive measures'
        ]
    },

    'pityriasis-versicolor': {
        title: 'Pityriasis Versicolor',
        category: 'infection-fungal',
        clinicalPresentation: {
            description: 'Malassezia infection causing hypo- or hyperpigmented scaly macules',
            morphology: ['Fine scale', 'Mottled pigmentation'],
            images: ['Pityriasis versicolor.jpg', 'Pityriasis versicolor 2.jpg', 'Pityriasis versicolor3.jpg']
        },
        riskFactors: [
            'Hot, humid climates',
            'Oily skin, sweating',
            'Immunosuppression'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>KOH prep</strong>: "Spaghetti and meatballs" hyphae and spores',
            '<strong>Wood lamp</strong>: Yellow-green fluorescence (sometimes)'
        ],
        management: [
            '<strong>Topical antifungals</strong>: Selenium sulfide shampoo, ketoconazole shampoo/cream',
            '<strong>Oral antifungals</strong>: Itraconazole or fluconazole for extensive disease',
            '<strong>Maintenance</strong>: Weekly selenium sulfide or ketoconazole to prevent recurrence'
        ],
        complications: [
            'Post-inflammatory hypo/hyperpigmentation (may persist for months)'
        ],
        redFlags: [
            'Failure to respond - consider alternative diagnosis (vitiligo, pityriasis alba)'
        ],
        prognosis: [
            'Good with treatment but high recurrence rates'
        ]
    },

    'candidiasis-intertrigo': {
        title: 'Candidiasis (Intertrigo)',
        category: 'infection-fungal',
        clinicalPresentation: {
            description: 'Candida infection of skin folds with erythema and satellite pustules',
            morphology: ['Moist erythematous plaques', 'Satellite pustules'],
            images: ['Candidiasis (right axilla).jpg']
        },
        riskFactors: [
            'Obesity and skin folds',
            'Diabetes mellitus',
            'Moisture and friction',
            'Immunosuppression',
            'Incontinence'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>KOH microscopy</strong> if uncertain (pseudohyphae)',
            '<strong>Differentials</strong>: Inverse psoriasis, irritant intertrigo, erythrasma'
        ],
        management: [
            '<strong>General</strong>: Keep area dry, weight management, reduce friction',
            '<strong>Topical antifungals</strong>: Clotrimazole or miconazole BD 2-4 weeks',
            '<strong>Severe</strong>: Oral fluconazole',
            '<strong>Barrier creams</strong>: Zinc oxide for moisture control'
        ],
        complications: [
            'Secondary bacterial infection',
            'Recurrent episodes'
        ],
        redFlags: [
            'Refractory or extensive disease - screen for diabetes or immunosuppression'
        ],
        prognosis: [
            'Good with treatment and moisture control'
        ]
    },

    // PARASITIC INFESTATION
    'scabies': {
        title: 'Scabies',
        category: 'infection-parasitic',
        clinicalPresentation: {
            description: 'Infestation with Sarcoptes scabiei causing pruritic papules and burrows',
            morphology: ['Excoriated papules', 'Burrows in web spaces'],
            images: ['Scabies.jpg']
        },
        distribution: [
            'Web spaces of fingers, wrists, axillae, waist, genital area',
            'Infants: Scalp, palms, soles'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Dermatoscopy</strong>: Delta wing sign in burrow',
            '<strong>Microscopy</strong>: Skin scraping with mites/eggs',
            '<strong>Differentials</strong>: Eczema, insect bites, dermatitis herpetiformis'
        ],
        management: [
            '<strong>Topical permethrin 5%</strong>: Apply to whole body, repeat in 7 days',
            '<strong>Oral ivermectin</strong>: For outbreaks or crusted scabies',
            '<strong>Household contacts</strong>: Treat all close contacts simultaneously',
            '<strong>Environmental</strong>: Wash bedding/clothes at 60°C or bag for 72 hours'
        ],
        complications: [
            'Secondary bacterial infection (impetigo)',
            'Post-scabetic itch (can persist for weeks)',
            'Crusted scabies in immunocompromised'
        ],
        redFlags: [
            'Crusted scabies (hyperkeratotic, widespread) - urgent treatment and isolation',
            'Infants or elderly with severe infestation'
        ],
        prognosis: [
            'Cures with appropriate treatment and contact management'
        ]
    },

    // AUTOIMMUNE / IMMUNOLOGIC CONDITIONS
    'bullous-pemphigoid': {
        title: 'Bullous Pemphigoid',
        category: 'autoimmune-bullous',
        clinicalPresentation: {
            description: 'Autoimmune blistering disease with tense bullae on erythematous skin',
            morphology: ['Tense bullae', 'Urticated plaques'],
            images: ['Bullous pemphigoid.jpg']
        },
        associations: [
            'Elderly patients (most common >70 years)',
            'Neurological disease (Parkinson, dementia)',
            'Drug triggers: Loop diuretics, DPP-4 inhibitors'
        ],
        diagnosis: [
            '<strong>Skin biopsy</strong>: Subepidermal blister',
            '<strong>Direct immunofluorescence</strong>: Linear IgG/C3 at basement membrane',
            '<strong>Serology</strong>: BP180/BP230 antibodies'
        ],
        management: [
            '<strong>Topical high-potency steroids</strong> (clobetasol) for localized disease',
            '<strong>Systemic steroids</strong> for extensive disease',
            '<strong>Steroid-sparing</strong>: Doxycycline, azathioprine, mycophenolate',
            '<strong>Supportive</strong>: Wound care, infection prevention'
        ],
        complications: [
            'Secondary infection',
            'Fluid/electrolyte imbalance (extensive disease)'
        ],
        redFlags: [
            'Extensive blistering with systemic symptoms',
            'Mucosal involvement (rare in BP) - consider pemphigus vulgaris'
        ],
        prognosis: [
            'Chronic relapsing course; remission possible with treatment',
            'Mortality increased in elderly due to comorbidities'
        ]
    },

    'pemphigus-vulgaris': {
        title: 'Pemphigus Vulgaris',
        category: 'autoimmune-bullous',
        clinicalPresentation: {
            description: 'Autoimmune blistering disease with flaccid bullae and mucosal involvement',
            morphology: ['Flaccid bullae', 'Painful erosions', 'Oral mucosal lesions'],
            images: ['Pemphigus vulgaris.jpg', 'Pemphigus vulgaris affecting the oral mucosa.jpg']
        },
        associations: [
            'Middle-aged or elderly',
            'Other autoimmune disease',
            'Drug-induced (penicillamine, ACE inhibitors)'
        ],
        diagnosis: [
            '<strong>Skin biopsy</strong>: Intraepidermal acantholysis',
            '<strong>Direct immunofluorescence</strong>: Intercellular IgG ("fishnet")',
            '<strong>Serology</strong>: Desmoglein 1/3 antibodies'
        ],
        management: [
            '<strong>High-dose systemic steroids</strong>',
            '<strong>Steroid-sparing agents</strong>: Azathioprine, mycophenolate, rituximab',
            '<strong>Supportive</strong>: Wound care, infection control, nutrition'
        ],
        complications: [
            'Secondary infection and sepsis',
            'Fluid loss and electrolyte imbalance',
            'Malnutrition due to oral involvement'
        ],
        redFlags: [
            'Extensive mucosal involvement or dysphagia',
            'Signs of sepsis'
        ],
        prognosis: [
            'Chronic disease with significant morbidity',
            'Improved survival with early immunosuppressive therapy'
        ]
    },

    'stevens-johnson-syndrome': {
        title: 'Stevens-Johnson Syndrome',
        category: 'drug-reaction',
        clinicalPresentation: {
            description: 'Severe mucocutaneous reaction with epidermal detachment',
            morphology: ['Targetoid lesions', 'Painful erosions', 'Mucosal involvement'],
            images: ['Stevens-Johnson syndrome.jpg']
        },
        causes: [
            'Drugs: Sulfonamides, antiepileptics, allopurinol, NSAIDs',
            'Infections: Mycoplasma, HSV (less common)'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Skin biopsy</strong>: Full-thickness epidermal necrosis',
            '<strong>Severity</strong>: BSA involvement (SJS <10%, TEN >30%)'
        ],
        management: [
            '<strong>Emergency admission</strong>: Burns/ICU',
            '<strong>Stop offending drug</strong> immediately',
            '<strong>Supportive care</strong>: Fluids, wound care, pain control',
            '<strong>Specialist input</strong>: Dermatology, ophthalmology',
            '<strong>Consider</strong>: IVIG, ciclosporin (specialist)'
        ],
        complications: [
            'Sepsis and multi-organ failure',
            'Ocular scarring and vision loss',
            'Long-term mucosal strictures'
        ],
        redFlags: [
            '⚠️ Widespread skin pain + mucosal involvement',
            '⚠️ Rapidly progressive epidermal detachment'
        ],
        prognosis: [
            'Mortality: SJS 5-10%, TEN 30-50%',
            'Early drug withdrawal improves outcomes'
        ]
    },

    'erythema-multiforme': {
        title: 'Erythema Multiforme',
        category: 'hypersensitivity',
        clinicalPresentation: {
            description: 'Acute hypersensitivity reaction with target lesions',
            morphology: ['Targetoid lesions', 'Acral distribution'],
            images: ['Erythema multiforme.jpg']
        },
        triggers: [
            'HSV infection (most common)',
            'Mycoplasma pneumoniae',
            'Medications (less common than SJS)'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Differentials</strong>: Urticaria, SJS/TEN',
            '<strong>Investigations</strong>: HSV testing if recurrent'
        ],
        management: [
            '<strong>Supportive</strong>: Topical steroids, antihistamines',
            '<strong>Treat trigger</strong>: Antivirals for HSV',
            '<strong>Severe mucosal involvement</strong>: Consider short course systemic steroids'
        ],
        complications: [
            'Recurrence (especially HSV-associated)',
            'Mild mucosal involvement'
        ],
        redFlags: [
            'Extensive mucosal involvement or systemic symptoms - consider SJS'
        ],
        prognosis: [
            'Self-limiting over 2-4 weeks',
            'Recurrence common if HSV not controlled'
        ]
    },

    'erythema-nodosum': {
        title: 'Erythema Nodosum',
        category: 'panniculitis',
        clinicalPresentation: {
            description: 'Tender erythematous nodules, usually on shins',
            morphology: ['Tender subcutaneous nodules', 'No ulceration'],
            images: ['Erythema nodosum.jpg']
        },
        causes: [
            'Infections: Streptococcal, TB',
            'Sarcoidosis',
            'IBD',
            'Drugs: OCP, antibiotics'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Investigations</strong>: FBC, ESR/CRP, throat swab, CXR',
            '<strong>Differentials</strong>: Cellulitis, vasculitis, panniculitis'
        ],
        management: [
            '<strong>Treat underlying cause</strong>',
            '<strong>Supportive</strong>: Rest, NSAIDs, compression',
            '<strong>Severe</strong>: Short course oral steroids'
        ],
        complications: [
            'Prolonged tenderness and bruising',
            'Recurrence if underlying cause persists'
        ],
        redFlags: [
            'Systemic symptoms (fever, cough, weight loss) - evaluate for TB or sarcoidosis'
        ],
        prognosis: [
            'Resolves over 3-6 weeks with residual bruising',
            'Recurrence possible'
        ]
    },

    // VASCULAR AND PURPURA
    'actinic-purpura': {
        title: 'Actinic Purpura',
        category: 'vascular',
        clinicalPresentation: {
            description: 'Purpuric patches on sun-damaged skin from dermal fragility',
            morphology: ['Purple ecchymoses', 'Thin atrophic skin'],
            images: ['Actinic purpura.jpg']
        },
        riskFactors: [
            'Chronic sun exposure',
            'Older age',
            'Topical/systemic steroid use',
            'Anticoagulants'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Differentials</strong>: Vasculitis, thrombocytopenia, trauma'
        ],
        management: [
            '<strong>Reassurance</strong>: Benign condition',
            '<strong>Sun protection</strong>: Prevent further dermal damage',
            '<strong>Review medications</strong>: Consider contribution from anticoagulants'
        ],
        complications: [
            'Cosmetic concerns',
            'Skin tears with minor trauma'
        ],
        redFlags: [
            'Systemic bruising or mucosal bleeding - evaluate platelet/coagulation disorders'
        ],
        prognosis: [
            'Chronic condition with recurrent lesions'
        ]
    },

    'henoch-schonlein-purpura': {
        title: 'Henoch-Schönlein Purpura (IgA Vasculitis)',
        category: 'vascular',
        clinicalPresentation: {
            description: 'Palpable purpura with systemic features such as arthralgia or abdominal pain',
            morphology: ['Palpable purpura on lower limbs', 'Petechiae and ecchymoses'],
            images: ['Henoch-Schönlein purpura.jpg', 'Henoch-Schönlein purpura2.jpg']
        },
        features: [
            'Purpura (palpable) - mandatory',
            'Arthralgia/arthritis',
            'Abdominal pain or GI bleeding',
            'Renal involvement (hematuria, proteinuria)'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Urinalysis</strong>: Hematuria/proteinuria',
            '<strong>Bloods</strong>: U&E, FBC, ESR/CRP',
            '<strong>Biopsy</strong>: IgA deposition if uncertain'
        ],
        management: [
            '<strong>Supportive</strong>: Analgesia, hydration',
            '<strong>Renal monitoring</strong>: Regular urine/blood pressure checks',
            '<strong>Steroids</strong>: For severe abdominal or renal involvement'
        ],
        complications: [
            'Renal impairment',
            'Intussusception (children)',
            'GI bleeding'
        ],
        redFlags: [
            'Gross hematuria or rising creatinine',
            'Severe abdominal pain or GI bleeding'
        ],
        prognosis: [
            'Most children recover completely within weeks',
            'Renal involvement determines long-term prognosis'
        ]
    },

    'vascular-malformation': {
        title: 'Vascular Malformation',
        category: 'vascular',
        clinicalPresentation: {
            description: 'Congenital vascular lesions that grow proportionally with the patient',
            morphology: ['Soft compressible lesions', 'Color varies by vessel type'],
            images: ['Vascular malformation.jpg']
        },
        types: [
            '<strong>Capillary</strong>: Port-wine stain',
            '<strong>Venous</strong>: Blue, compressible',
            '<strong>Lymphatic</strong>: Vesicular or cystic',
            '<strong>Arteriovenous</strong>: Warm, pulsatile, bruit'
        ],
        diagnosis: [
            '<strong>Clinical assessment</strong>',
            '<strong>Imaging</strong>: Ultrasound, MRI for extent',
            '<strong>Differentials</strong>: Infantile hemangioma (proliferative)'
        ],
        management: [
            '<strong>Observation</strong>: Many are stable',
            '<strong>Laser therapy</strong>: Capillary malformations',
            '<strong>Sclerotherapy</strong>: Venous/lymphatic lesions',
            '<strong>Surgery</strong>: Selected cases with complications'
        ],
        complications: [
            'Bleeding or ulceration',
            'Pain and functional impairment',
            'High-output cardiac failure (AV malformations)'
        ],
        redFlags: [
            'Rapid growth, pain, bleeding, or ulceration',
            'Signs of high-flow lesion (thrill/bruit)'
        ],
        prognosis: [
            'Lifelong condition; stable with appropriate management'
        ]
    },

    'palmar-erythema': {
        title: 'Palmar Erythema',
        category: 'vascular',
        clinicalPresentation: {
            description: 'Diffuse erythema of palms, often due to systemic causes',
            morphology: ['Redness over thenar and hypothenar eminences'],
            images: ['Palmar erythema.jpg']
        },
        causes: [
            'Physiological (pregnancy)',
            'Chronic liver disease',
            'Thyrotoxicosis',
            'Rheumatoid arthritis'
        ],
        diagnosis: [
            '<strong>Clinical finding</strong>',
            '<strong>Investigations</strong>: LFTs, thyroid function if indicated'
        ],
        management: [
            '<strong>Treat underlying cause</strong>',
            '<strong>Reassurance</strong> if physiological'
        ],
        redFlags: [
            'Associated systemic symptoms (jaundice, weight loss)'
        ],
        prognosis: [
            'Depends on underlying cause'
        ]
    },

    // ULCERS AND WOUNDS
    'venous-ulcer': {
        title: 'Venous Ulcer',
        category: 'ulcers',
        clinicalPresentation: {
            description: 'Shallow, irregular ulcers in the gaiter area due to venous insufficiency',
            morphology: ['Irregular shallow ulcer', 'Surrounding hemosiderin staining'],
            images: ['Venous ulcer.jpg', 'Venous ulcer2.jpg', 'Leg ulcers.jpg']
        },
        riskFactors: [
            'Chronic venous insufficiency',
            'Varicose veins',
            'Previous DVT',
            'Obesity and immobility'
        ],
        diagnosis: [
            '<strong>Clinical assessment</strong>',
            '<strong>Doppler ultrasound</strong>: Assess venous reflux and arterial supply (ABPI)',
            '<strong>Differentials</strong>: Arterial ulcer, vasculitic ulcer, malignancy'
        ],
        management: [
            '<strong>Compression therapy</strong>: Mainstay if ABPI adequate',
            '<strong>Wound care</strong>: Debridement, dressings',
            '<strong>Elevate legs</strong>',
            '<strong>Treat infection</strong>: Antibiotics if cellulitis',
            '<strong>Surgical/vascular</strong>: Consider venous ablation'
        ],
        complications: [
            'Recurrent ulceration',
            'Infection and cellulitis',
            'Malignant transformation (Marjolin ulcer)'
        ],
        redFlags: [
            'Non-healing ulcer despite treatment - consider biopsy',
            'Signs of arterial disease (cold, pulseless foot)'
        ],
        prognosis: [
            'Healing with compression in most, recurrence common'
        ]
    },

    'arterial-ulcer': {
        title: 'Arterial Ulcer',
        category: 'ulcers',
        clinicalPresentation: {
            description: 'Painful, punched-out ulcers due to arterial insufficiency',
            morphology: ['Well-demarcated ulcer', 'Pale or necrotic base'],
            images: ['Arterial ulcer.jpg']
        },
        riskFactors: [
            'Peripheral arterial disease',
            'Smoking',
            'Diabetes',
            'Hyperlipidemia'
        ],
        diagnosis: [
            '<strong>Clinical assessment</strong>',
            '<strong>ABPI</strong> and Doppler ultrasound',
            '<strong>Assess pulses</strong> and capillary refill'
        ],
        management: [
            '<strong>Urgent vascular referral</strong>',
            '<strong>Revascularization</strong> if possible',
            '<strong>Analgesia</strong>',
            '<strong>Avoid compression</strong> unless arterial flow adequate',
            '<strong>Risk factor modification</strong>: Smoking cessation, statins'
        ],
        complications: [
            'Critical limb ischemia',
            'Gangrene',
            'Amputation'
        ],
        redFlags: [
            'Rest pain or black eschar - critical ischemia',
            'Cold, pulseless limb - emergency'
        ],
        prognosis: [
            'Dependent on vascular status and revascularization'
        ]
    },

    'neuropathic-ulcer': {
        title: 'Neuropathic Ulcer',
        category: 'ulcers',
        clinicalPresentation: {
            description: 'Pressure-related ulcer in areas of reduced sensation',
            morphology: ['Punched-out ulcer', 'Callused surrounding skin'],
            images: ['Neuropathic ulcer.jpg']
        },
        riskFactors: [
            'Diabetic neuropathy',
            'Charcot foot',
            'Peripheral neuropathy (alcohol, B12 deficiency)'
        ],
        diagnosis: [
            '<strong>Clinical assessment</strong>',
            '<strong>Monofilament testing</strong> for neuropathy',
            '<strong>Foot X-ray</strong> if deep ulcer or suspected osteomyelitis'
        ],
        management: [
            '<strong>Offloading</strong>: Total contact cast or special footwear',
            '<strong>Wound care</strong>: Debridement and dressings',
            '<strong>Infection management</strong>: Antibiotics if infected',
            '<strong>Glycemic control</strong>'
        ],
        complications: [
            'Osteomyelitis',
            'Amputation',
            'Recurrent ulcers'
        ],
        redFlags: [
            'Deep ulcer with bone exposure',
            'Systemic signs of infection'
        ],
        prognosis: [
            'Healing possible with offloading and control of risk factors'
        ]
    },

    // PIGMENTATION AND MELANOCYTIC LESIONS
    'melanocytic-nevus': {
        title: 'Benign Melanocytic Naevi',
        category: 'pigmentation',
        clinicalPresentation: {
            description: 'Benign proliferations of melanocytes with uniform pigmentation',
            morphology: ['Well-circumscribed macules or papules', 'Uniform color'],
            images: ['Pigmented melanocytic naevus.jpg', 'Congenital naevus.jpg']
        },
        types: [
            '<strong>Junctional</strong>: Flat, pigmented',
            '<strong>Compound</strong>: Slightly raised',
            '<strong>Intradermal</strong>: Skin-colored, dome-shaped',
            '<strong>Congenital</strong>: Present at birth'
        ],
        diagnosis: [
            '<strong>Clinical assessment</strong>',
            '<strong>ABCDE criteria</strong> to screen for melanoma',
            '<strong>Dermoscopy</strong> if atypical'
        ],
        management: [
            '<strong>Reassurance</strong> if benign and stable',
            '<strong>Excision biopsy</strong> if suspicious or changing',
            '<strong>Sun protection</strong> advice'
        ],
        complications: [
            'Rare malignant transformation (especially large congenital nevi)'
        ],
        redFlags: [
            'Change in size, shape, or color',
            'Bleeding or ulceration',
            'New lesion in adult'
        ],
        prognosis: [
            'Benign with excellent prognosis',
            'Routine monitoring for atypical nevi'
        ]
    },

    'freckles': {
        title: 'Freckles (Ephelides)',
        category: 'pigmentation',
        clinicalPresentation: {
            description: 'Small hyperpigmented macules on sun-exposed skin',
            morphology: ['Discrete light brown macules', 'Increase with sun exposure'],
            images: ['Freckles.jpg']
        },
        associations: [
            'Fair skin and red/blonde hair',
            'Sun exposure'
        ],
        management: [
            '<strong>Reassurance</strong>',
            '<strong>Sun protection</strong> to reduce darkening'
        ],
        redFlags: [
            'New pigmented lesion with change in asymmetry or color - evaluate for melanoma'
        ],
        prognosis: [
            'Benign and may fade with reduced sun exposure'
        ]
    },

    // HAIR AND HORMONAL
    'hirsutism': {
        title: 'Hirsutism',
        category: 'hair-disorders',
        clinicalPresentation: {
            description: 'Excess terminal hair in androgen-dependent areas in women',
            morphology: ['Coarse terminal hair growth'],
            images: ['Hirsutism.jpg']
        },
        causes: [
            'Polycystic ovary syndrome (most common)',
            'Idiopathic',
            'Congenital adrenal hyperplasia',
            'Androgen-secreting tumors'
        ],
        diagnosis: [
            '<strong>Clinical assessment</strong>: Ferriman-Gallwey score',
            '<strong>Labs</strong>: Testosterone, DHEAS, LH/FSH, prolactin if indicated',
            '<strong>Consider pelvic ultrasound</strong> for PCOS'
        ],
        management: [
            '<strong>Lifestyle</strong>: Weight loss if overweight',
            '<strong>Hormonal therapy</strong>: Combined OCP, anti-androgens (spironolactone)',
            '<strong>Cosmetic</strong>: Shaving, waxing, laser hair removal'
        ],
        redFlags: [
            'Rapid onset or virilization (deep voice, clitoromegaly) - urgent endocrine review'
        ],
        prognosis: [
            'Improves with hormonal control and cosmetic measures'
        ]
    },

    'hypertrichosis': {
        title: 'Hypertrichosis',
        category: 'hair-disorders',
        clinicalPresentation: {
            description: 'Excessive hair growth in non-androgen dependent areas',
            morphology: ['Generalized or localized increased hair'],
            images: ['Hypertrichosis.jpg']
        },
        causes: [
            'Congenital syndromes',
            'Medications (phenytoin, ciclosporin, minoxidil)',
            'Systemic illness (porphyria, hypothyroidism)'
        ],
        diagnosis: [
            '<strong>Clinical assessment</strong>',
            '<strong>Medication review</strong>',
            '<strong>Investigations</strong> if systemic disease suspected'
        ],
        management: [
            '<strong>Treat underlying cause</strong>',
            '<strong>Cosmetic measures</strong>: Laser hair removal, depilatories'
        ],
        prognosis: [
            'Depends on underlying cause; may resolve if drug-induced'
        ]
    },

    // NAIL AND CLUBBING
    'onycholysis': {
        title: 'Onycholysis',
        category: 'nail-disorders',
        clinicalPresentation: {
            description: 'Separation of the nail plate from the nail bed',
            morphology: ['Distal nail lifting', 'White or yellow discoloration'],
            images: ['Onycholysis.jpg']
        },
        causes: [
            'Trauma or repetitive microtrauma',
            'Onychomycosis',
            'Psoriasis',
            'Thyroid disease'
        ],
        diagnosis: [
            '<strong>Clinical assessment</strong>',
            '<strong>Consider fungal culture</strong>',
            '<strong>Assess for psoriasis or thyroid disease</strong>'
        ],
        management: [
            '<strong>Trim detached nail</strong>',
            '<strong>Treat underlying cause</strong>',
            '<strong>Keep nails dry</strong> to prevent infection'
        ],
        complications: [
            'Secondary infection'
        ],
        prognosis: [
            'Improves when underlying cause treated'
        ]
    },

    'koilonychia': {
        title: 'Koilonychia',
        category: 'nail-disorders',
        clinicalPresentation: {
            description: 'Spoon-shaped nails often linked to iron deficiency or systemic disease',
            morphology: ['Concave nail plates'],
            images: ['Koilonychia.jpg']
        },
        causes: [
            'Iron deficiency anemia',
            'Hemochromatosis (rare)',
            'Trauma or occupational exposure'
        ],
        diagnosis: [
            '<strong>Clinical assessment</strong>',
            '<strong>Iron studies</strong> if suspected deficiency'
        ],
        management: [
            '<strong>Treat underlying cause</strong>: Iron replacement',
            '<strong>Monitor resolution</strong> with nail growth'
        ],
        prognosis: [
            'Reversible with correction of underlying cause'
        ]
    },

    'clubbing': {
        title: 'Clubbing',
        category: 'nail-disorders',
        clinicalPresentation: {
            description: 'Bulbous enlargement of distal digits associated with systemic disease',
            morphology: ['Loss of nail bed angle', 'Broadening of fingertips'],
            images: ['Clubbing.jpg']
        },
        causes: [
            'Pulmonary: Lung cancer, bronchiectasis, cystic fibrosis',
            'Cardiac: Cyanotic heart disease, endocarditis',
            'GI: IBD, liver disease'
        ],
        diagnosis: [
            '<strong>Clinical assessment</strong>: Schamroth sign',
            '<strong>Investigations</strong>: Chest X-ray, echocardiogram if indicated'
        ],
        management: [
            '<strong>Treat underlying disease</strong>'
        ],
        redFlags: [
            'New clubbing with systemic symptoms - urgent evaluation for malignancy'
        ],
        prognosis: [
            'Depends on underlying cause'
        ]
    },

    // PAPULOSQUAMOUS / INFLAMMATORY
    'lichen-planus': {
        title: 'Lichen Planus',
        category: 'inflammatory-papulosquamous',
        clinicalPresentation: {
            description: 'Pruritic, violaceous papules with fine white lines (Wickham striae)',
            morphology: ['Polygonal flat-topped papules', 'Wickham striae'],
            images: ['Lichen planus.jpg', 'Lichen planus2.jpg', 'Lichen planus3.jpg', 'Wickham’s striae.jpg']
        },
        associations: [
            'Hepatitis C infection',
            'Drug-induced (thiazides, antimalarials)',
            'Oral and genital mucosal involvement'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Biopsy</strong>: Saw-tooth lymphocytic infiltrate',
            '<strong>Investigations</strong>: Hepatitis C screening if indicated'
        ],
        management: [
            '<strong>Topical steroids</strong>: Potent for cutaneous lesions',
            '<strong>Oral lesions</strong>: Topical steroid mouthwash',
            '<strong>Severe</strong>: Systemic steroids or retinoids',
            '<strong>Pruritus</strong>: Antihistamines'
        ],
        complications: [
            'Post-inflammatory hyperpigmentation',
            'Scarring alopecia (lichen planopilaris)',
            'Oral SCC risk in erosive disease'
        ],
        redFlags: [
            'Persistent erosive oral lesions - monitor for malignancy'
        ],
        prognosis: [
            'Often resolves within 1-2 years',
            'Recurrence possible'
        ]
    },

    'discoid-lupus': {
        title: 'Chronic Discoid Lupus Erythematosus',
        category: 'connective-tissue',
        clinicalPresentation: {
            description: 'Chronic scarring inflammatory plaques on sun-exposed skin',
            morphology: ['Erythematous plaques with scale', 'Scarring and pigment change'],
            images: ['Chronic discoid lupus erythematosus.jpg']
        },
        associations: [
            'Photosensitivity',
            'May occur with systemic lupus (5-10%)'
        ],
        diagnosis: [
            '<strong>Skin biopsy</strong>: Interface dermatitis with follicular plugging',
            '<strong>ANA</strong> if systemic features'
        ],
        management: [
            '<strong>Sun protection</strong>: SPF 50+, protective clothing',
            '<strong>Topical steroids</strong>: Potent',
            '<strong>Topical calcineurin inhibitors</strong>',
            '<strong>Systemic therapy</strong>: Hydroxychloroquine for refractory disease'
        ],
        complications: [
            'Scarring alopecia',
            'Dyspigmentation',
            'SCC in chronic lesions (rare)'
        ],
        redFlags: [
            'Systemic symptoms (arthralgia, renal issues) - evaluate for SLE'
        ],
        prognosis: [
            'Chronic with risk of scarring if untreated',
            'Improves with photoprotection'
        ]
    },

    'erythroderma': {
        title: 'Erythroderma',
        category: 'inflammatory-eczema',
        clinicalPresentation: {
            description: 'Generalized erythema and scaling involving most of the body surface',
            morphology: ['Diffuse erythema', 'Scaling and exfoliation'],
            images: ['Erythroderma.jpg', 'Erythroderma2.jpg']
        },
        causes: [
            'Psoriasis',
            'Eczema',
            'Drug reactions',
            'Cutaneous T-cell lymphoma'
        ],
        diagnosis: [
            '<strong>Clinical emergency</strong>',
            '<strong>Investigations</strong>: FBC, U&E, LFTs, skin biopsy',
            '<strong>Monitor</strong>: Temperature, fluid balance'
        ],
        management: [
            '<strong>Urgent admission</strong>',
            '<strong>Supportive care</strong>: Warm environment, fluids, emollients',
            '<strong>Treat underlying cause</strong>',
            '<strong>Infection control</strong>: Monitor for sepsis'
        ],
        complications: [
            'Hypothermia',
            'Fluid/electrolyte loss',
            'High-output cardiac failure',
            'Infection'
        ],
        redFlags: [
            '⚠️ Systemic instability or fever - urgent admission',
            '⚠️ Rapid progression with drug exposure'
        ],
        prognosis: [
            'Depends on underlying cause; mortality higher in elderly'
        ]
    },

    // LESION MORPHOLOGY AND BENIGN TUMORS
    'papules': {
        title: 'Papules',
        category: 'lesion-morphology',
        clinicalPresentation: {
            description: 'Raised, solid lesions less than 1 cm in diameter',
            morphology: ['Discrete raised lesions'],
            images: ['Papules.jpg']
        },
        causes: [
            'Inflammatory (eczema, acne)',
            'Infectious (warts, molluscum)',
            'Neoplastic (BCC, SCC)'
        ],
        assessment: [
            'Assess size, color, surface, distribution',
            'Look for scale, crust, or umbilication'
        ],
        redFlags: [
            'Rapid growth, ulceration, bleeding - consider malignancy'
        ]
    },

    'nodules': {
        title: 'Nodules',
        category: 'lesion-morphology',
        clinicalPresentation: {
            description: 'Solid lesions extending into the dermis or subcutis',
            morphology: ['Larger, deeper lesions than papules'],
            images: ['Nodules.jpg']
        },
        causes: [
            'Inflammatory (erythema nodosum)',
            'Infectious (abscess)',
            'Neoplastic (SCC, melanoma)'
        ],
        assessment: [
            'Check size, depth, tenderness, mobility',
            'Consider ultrasound or biopsy if uncertain'
        ],
        redFlags: [
            'Hard fixed nodule with ulceration or rapid growth'
        ]
    },

    'seborrhoeic-keratoses': {
        title: 'Seborrhoeic Keratoses',
        category: 'benign-tumors',
        clinicalPresentation: {
            description: 'Benign epidermal tumors with a “stuck-on” appearance',
            morphology: ['Waxy or verrucous plaques', 'Variable pigmentation'],
            images: ['Seborrhoeic keratoses.jpg']
        },
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Dermoscopy</strong>: Milia-like cysts, comedo-like openings'
        ],
        management: [
            '<strong>Reassurance</strong>',
            '<strong>Removal</strong>: Cryotherapy or curettage if symptomatic'
        ],
        redFlags: [
            'Sudden eruption of multiple lesions (Leser-Trélat sign) - consider malignancy workup',
            'Atypical lesion - consider biopsy to rule out melanoma'
        ],
        prognosis: [
            'Benign and common with age'
        ]
    },

    'pyogenic-granuloma': {
        title: 'Pyogenic Granuloma',
        category: 'benign-tumors',
        clinicalPresentation: {
            description: 'Rapidly growing vascular papule prone to bleeding',
            morphology: ['Friable red papule', 'Bleeds easily'],
            images: ['Pyogenic granuloma.jpg']
        },
        associations: [
            'Trauma',
            'Pregnancy (epulis)',
            'Certain medications (retinoids)'
        ],
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Biopsy</strong> if atypical or recurrent'
        ],
        management: [
            '<strong>Curettage and cautery</strong>',
            '<strong>Excision</strong> if large or recurrent',
            '<strong>Topical treatments</strong>: Timolol for small lesions (specialist)'
        ],
        complications: [
            'Bleeding and ulceration',
            'Recurrence'
        ],
        redFlags: [
            'Lesion that does not respond to treatment or has atypical pigmentation'
        ],
        prognosis: [
            'Excellent with removal; recurrence possible'
        ]
    },

    'keloid-scars': {
        title: 'Keloid Scars',
        category: 'benign-tumors',
        clinicalPresentation: {
            description: 'Excessive scar tissue extending beyond the original wound',
            morphology: ['Firm raised scar', 'May be itchy or painful'],
            images: ['Keloid scars.jpg', 'Keloid scars2.jpg']
        },
        riskFactors: [
            'Darker skin types',
            'Family history',
            'Chest, shoulders, earlobes'
        ],
        management: [
            '<strong>Intralesional steroids</strong>: Triamcinolone injections',
            '<strong>Silicone gel sheeting</strong>',
            '<strong>Pressure therapy</strong>',
            '<strong>Laser therapy</strong> or cryotherapy for refractory scars'
        ],
        complications: [
            'Pruritus and pain',
            'Cosmetic distress',
            'High recurrence after excision'
        ],
        redFlags: [
            'Rapidly enlarging scar - consider hypertrophic scar vs keloid'
        ],
        prognosis: [
            'Chronic with high recurrence; requires long-term management'
        ]
    },

    'reaction-insect-bites': {
        title: 'Reaction to Insect Bites',
        category: 'hypersensitivity',
        clinicalPresentation: {
            description: 'Localized papular urticaria following insect bites',
            morphology: ['Pruritic papules', 'Central punctum may be present'],
            images: ['Reaction to insect bites.jpg']
        },
        diagnosis: [
            '<strong>Clinical diagnosis</strong>',
            '<strong>Differentials</strong>: Scabies, papular urticaria, contact dermatitis'
        ],
        management: [
            '<strong>Topical steroids</strong> for itch',
            '<strong>Antihistamines</strong> for pruritus',
            '<strong>Avoidance</strong>: Insect repellents, protective clothing'
        ],
        complications: [
            'Secondary infection from scratching'
        ],
        redFlags: [
            'Systemic allergic reaction - consider anaphylaxis'
        ],
        prognosis: [
            'Resolves in days to weeks'
        ]
    },

    'sunburn': {
        title: 'Sunburn',
        category: 'photodermatoses',
        clinicalPresentation: {
            description: 'Acute inflammatory response to ultraviolet exposure',
            morphology: ['Erythema and tenderness', 'Possible blistering'],
            images: ['Sunburn.jpg']
        },
        severity: [
            '<strong>First-degree</strong>: Erythema, pain',
            '<strong>Second-degree</strong>: Blistering'
        ],
        management: [
            '<strong>Cool compresses</strong> and moisturizers',
            '<strong>NSAIDs</strong> for pain',
            '<strong>Hydration</strong>',
            '<strong>Avoid further sun exposure</strong>'
        ],
        complications: [
            'Dehydration',
            'Secondary infection if blistered',
            'Increased skin cancer risk'
        ],
        redFlags: [
            'Extensive blistering with systemic symptoms - consider heat illness'
        ],
        prognosis: [
            'Usually resolves within 3-7 days'
        ]
    },

    'striae': {
        title: 'Striae',
        category: 'connective-tissue',
        clinicalPresentation: {
            description: 'Linear atrophic bands due to dermal stretching',
            morphology: ['Pink or violaceous striae', 'Later become pale'],
            images: ['Striae.jpg']
        },
        causes: [
            'Pregnancy',
            'Rapid weight gain',
            'Cushing syndrome',
            'Long-term steroid use'
        ],
        management: [
            '<strong>Reassurance</strong>',
            '<strong>Topical tretinoin</strong> for early striae (specialist)',
            '<strong>Laser therapy</strong> for cosmetic improvement'
        ],
        prognosis: [
            'Fade over time but often permanent'
        ]
    },

    'xanthomata': {
        title: 'Xanthomata',
        category: 'metabolic',
        clinicalPresentation: {
            description: 'Lipid-laden deposits in skin associated with dyslipidemia',
            morphology: ['Yellow papules or plaques'],
            images: ['Xanthomata.jpg']
        },
        types: [
            '<strong>Xanthelasma</strong>: Eyelids',
            '<strong>Tuberous</strong>: Elbows, knees',
            '<strong>Tendinous</strong>: Achilles tendon',
            '<strong>Eruptive</strong>: Sudden crops of papules'
        ],
        diagnosis: [
            '<strong>Lipid profile</strong>',
            '<strong>Assess cardiovascular risk</strong>'
        ],
        management: [
            '<strong>Treat dyslipidemia</strong>: Statins, lifestyle',
            '<strong>Removal</strong>: Laser or excision for cosmetic reasons'
        ],
        complications: [
            'Indicator of familial hypercholesterolemia',
            'Increased cardiovascular risk'
        ],
        redFlags: [
            'Eruptive xanthomata - consider severe hypertriglyceridemia'
        ],
        prognosis: [
            'Improve with lipid control; may recur'
        ]
    }
};

// Export for use in other modules
export default dermatologyDatabase;
