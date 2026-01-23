/**
 * GUIDE: Adding New Dermatology Conditions
 * 
 * This file shows the template for adding new conditions to the dermatology database.
 * Copy this template and fill in the relevant sections.
 */

// Example template - add to dermatologyDatabase in dermatology_data.js

export const newConditionTemplate = {
    'condition-id-kebab-case': {
        title: 'Full Condition Name',
        category: 'category-id', // Options: inflammatory-eczema, inflammatory-psoriasis, acne-rosacea, infection-bacterial, infection-viral, infection-fungal, skin-cancer, hair-disorders, nail-disorders, pigmentation
        
        clinicalPresentation: {
            description: 'Brief overview of the condition in 1-2 sentences',
            distribution: [
                'Where on the body it typically appears',
                'Any patterns (e.g., symmetrical, unilateral, dermatomal)'
            ],
            morphology: [
                'What it looks like (macule, papule, plaque, vesicle, etc.)',
                'Color, size, shape characteristics',
                'Surface features (scale, crust, etc.)'
            ],
            symptoms: [
                'What the patient experiences',
                'Pruritus, pain, burning, etc.'
            ],
            images: ['image1.jpg', 'image2.jpg'] // Optional - for future image integration
        },
        
        // Optional sections - include as relevant
        
        pathophysiology: [
            'Underlying mechanisms',
            'Cellular/molecular processes involved'
        ],
        
        variants: [
            '<strong>Subtype 1</strong>: Description',
            '<strong>Subtype 2</strong>: Description'
        ],
        
        subtypes: [
            // Alternative to variants if you prefer this structure
        ],
        
        riskFactors: [
            '<strong>Demographic</strong>: Age, gender, ethnicity',
            '<strong>Environmental</strong>: UV exposure, occupation',
            '<strong>Medical</strong>: Comorbidities, immunosuppression',
            '<strong>Genetic</strong>: Family history, specific genes'
        ],
        
        triggers: [
            'Factors that precipitate or worsen the condition',
            'Medications, stress, environmental factors'
        ],
        
        associations: [
            'Other conditions commonly seen with this',
            'Systemic associations',
            'Genetic syndromes'
        ],
        
        diagnosis: [
            '<strong>Clinical diagnosis</strong>: Criteria or features',
            '<strong>Investigations</strong>:',
            '  - Laboratory tests',
            '  - Imaging',
            '  - Biopsy findings',
            '<strong>Differential diagnosis</strong>: What else to consider'
        ],
        
        differentialDiagnosis: [
            'Condition 1 - distinguishing features',
            'Condition 2 - distinguishing features',
            'Condition 3 - distinguishing features'
        ],
        
        grading: [
            // If applicable (e.g., acne, psoriasis)
            '<strong>Mild</strong>: Definition',
            '<strong>Moderate</strong>: Definition',
            '<strong>Severe</strong>: Definition'
        ],
        
        management: [
            '<strong>General measures</strong>:',
            '  • Lifestyle modifications',
            '  • Trigger avoidance',
            '  • Skincare routine',
            '',
            '<strong>First-line treatment</strong>:',
            '  • Topical therapies with specific agents and strengths',
            '  • Dosing and duration',
            '',
            '<strong>Second-line treatment</strong>:',
            '  • Oral medications',
            '  • Phototherapy',
            '',
            '<strong>Third-line/specialist</strong>:',
            '  • Systemic immunosuppressants',
            '  • Biologics',
            '  • Procedures',
            '',
            '<strong>Monitoring</strong>:',
            '  • What to monitor',
            '  • Frequency',
            '',
            '<strong>Referral criteria</strong>:',
            '  • When to refer to dermatology',
            '  • Urgent vs routine'
        ],
        
        complications: [
            'Short-term complications',
            'Long-term sequelae',
            'Secondary infections',
            'Psychological impact'
        ],
        
        redFlags: [
            // IMPORTANT - use this for urgent/emergency features
            '⚠️ Feature requiring urgent action',
            'When to suspect more serious diagnosis',
            'When immediate referral needed'
        ],
        
        prognosis: [
            'Natural history',
            'Expected outcomes with treatment',
            'Factors affecting prognosis',
            'Recurrence rates'
        ]
    }
};

/**
 * CATEGORIES REFERENCE
 * 
 * Use one of these category IDs:
 * 
 * 1. 'inflammatory-eczema' - Eczema and dermatitis variants
 * 2. 'inflammatory-psoriasis' - Psoriasis and related conditions
 * 3. 'acne-rosacea' - Acne, rosacea, and related follicular disorders
 * 4. 'infection-bacterial' - Bacterial skin infections
 * 5. 'infection-viral' - Viral exanthems and infections
 * 6. 'infection-fungal' - Fungal and yeast infections
 * 7. 'skin-cancer' - Melanoma and non-melanoma skin cancers
 * 8. 'hair-disorders' - Alopecia and hair shaft disorders
 * 9. 'nail-disorders' - Nail pathology
 * 10. 'pigmentation' - Hyper/hypopigmentation disorders
 * 
 * If you need a new category, add it to:
 * - DermatologyManager.js categories array
 * - GlobalSearchManager.js categoryMap
 */

/**
 * STYLE GUIDE
 * 
 * 1. Use HTML tags for formatting:
 *    - <strong>Label</strong>: For headers/emphasis
 *    - Nested lists: Use proper indentation with spaces
 * 
 * 2. Medication formatting:
 *    - Drug name: Dose frequency duration
 *    - Example: "Prednisolone 40mg OD reducing over 2 weeks"
 * 
 * 3. Structure:
 *    - Start broad, then specific
 *    - Group related items
 *    - Use hierarchical organization
 * 
 * 4. Clinical detail level:
 *    - Enough for junior doctors/medical students
 *    - Include dosing for common medications
 *    - Practical management steps
 *    - When to escalate/refer
 * 
 * 5. Evidence base:
 *    - Reflect current UK guidelines (NICE, BAD)
 *    - Include recent advances (biologics, etc.)
 *    - Note when specialist-only
 */

/**
 * EXAMPLE: Complete condition entry
 */

export const completeExample = {
    'lichen-planus': {
        title: 'Lichen Planus',
        category: 'inflammatory-eczema',
        
        clinicalPresentation: {
            description: 'Inflammatory condition characterized by pruritic, polygonal, purple papules and plaques with characteristic white lacy network (Wickham striae)',
            distribution: [
                'Flexor wrists, ankles, shins most common',
                'Mucous membranes (oral, genital)',
                'Scalp (scarring alopecia)',
                'Nails (longitudinal ridging, pterygium)'
            ],
            morphology: [
                'Purple (violaceous) flat-topped papules',
                'Polygonal shape',
                'Wickham striae (white lacy network) on surface',
                'Koebner phenomenon (lesions at sites of trauma)'
            ],
            symptoms: [
                'Intense pruritus',
                'Oral pain/burning (if mucosal involvement)',
                'Nail changes if affected'
            ],
            images: ['lichen-planus-wrist.jpg', 'lichen-planus-oral.jpg']
        },
        
        associations: [
            'Hepatitis C infection (screen all patients)',
            'Autoimmune conditions (thyroid, vitiligo)',
            'Drugs: Thiazides, NSAIDs, ACE inhibitors, antimalarials',
            'Graft-versus-host disease'
        ],
        
        diagnosis: [
            '<strong>Clinical diagnosis</strong>: Based on 6 Ps:',
            '  - Purple',
            '  - Pruritic',
            '  - Polygonal',
            '  - Planar (flat-topped)',
            '  - Papules and Plaques',
            '  - Plus Wickham striae',
            '<strong>Biopsy</strong> (if uncertain):',
            '  - Hyperkeratosis, irregular acanthosis',
            '  - Band-like lymphocytic infiltrate at dermoepidermal junction',
            '  - Civatte bodies (apoptotic keratinocytes)',
            '<strong>Investigations</strong>:',
            '  - Hepatitis C serology (all patients)',
            '  - LFTs',
            '  - Consider autoimmune screen if suggested by history'
        ],
        
        differentialDiagnosis: [
            'Psoriasis - silvery scale, extensor distribution',
            'Eczema - poorly defined, no Wickham striae',
            'Secondary syphilis - palm/sole involvement, serology',
            'Pityriasis rosea - herald patch, Christmas tree distribution',
            'Lichen simplex chronicus - single plaque, lichenified'
        ],
        
        management: [
            '<strong>General measures</strong>:',
            '  • Avoid triggers (check medication list)',
            '  • Emollients for dry skin',
            '  • Oral hygiene for oral lichen planus',
            '',
            '<strong>Cutaneous lichen planus</strong>:',
            '  • <strong>Topical steroids</strong>:',
            '    - Potent: Betamethasone valerate 0.1% BD',
            '    - Very potent: Clobetasol propionate 0.05% (short course)',
            '  • <strong>Antihistamines</strong>: For itch (sedating at night)',
            '',
            '<strong>Oral lichen planus</strong>:',
            '  • <strong>Topical steroids</strong>:',
            '    - Betamethasone mouthwash (0.5mg in 10ml water, rinse & spit QDS)',
            '    - Beclometasone spray',
            '  • <strong>Topical calcineurin inhibitors</strong>:',
            '    - Tacrolimus 0.1% ointment (for refractory cases)',
            '  • Avoid spicy foods, alcohol-based mouthwashes',
            '',
            '<strong>Extensive/refractory</strong>:',
            '  • <strong>Phototherapy</strong>: Narrowband UVB',
            '  • <strong>Systemic</strong>:',
            '    - Oral prednisolone (short courses)',
            '    - Acitretin 25-50mg daily',
            '    - Methotrexate, azathioprine (specialist)',
            '',
            '<strong>Monitoring</strong>:',
            '  • Annual oral examination (malignant transformation risk 1-3%)',
            '  • Monitor for treatment side effects',
            '',
            '<strong>Referral</strong>:',
            '  • Dermatology: Extensive, refractory, or diagnostic uncertainty',
            '  • Oral medicine/maxillofacial: Severe oral involvement',
            '  • Trichology: Scarring alopecia'
        ],
        
        complications: [
            'Post-inflammatory hyperpigmentation (especially in darker skin)',
            'Scarring alopecia if scalp involved',
            'Squamous cell carcinoma (oral LP - 1-3% risk)',
            'Nail dystrophy/pterygium',
            'Genital scarring (erosive LP)'
        ],
        
        redFlags: [
            'Erosive oral LP with persistent ulcers - malignant transformation',
            'Rapidly progressive scarring alopecia - urgent referral',
            'Severe genital involvement - risk of adhesions'
        ],
        
        prognosis: [
            'Self-limiting in many cases',
            'Cutaneous: Resolves spontaneously in 1-2 years (50-70%)',
            'Oral: More chronic, may persist for years',
            'Recurrence common (10-20%)',
            'Post-inflammatory hyperpigmentation may persist'
        ]
    }
};

/**
 * QUICK CHECKLIST BEFORE ADDING
 * 
 * ✓ Unique condition ID (kebab-case)
 * ✓ Appropriate category assigned
 * ✓ Clinical presentation clearly described
 * ✓ Practical management with doses/frequencies
 * ✓ Red flags included if relevant
 * ✓ Evidence-based (UK guidelines)
 * ✓ Medical student/junior doctor appropriate level
 * ✓ Proper HTML formatting
 * ✓ Consistent style with existing entries
 * 
 * Then add to dermatologyDatabase object in dermatology_data.js
 */
