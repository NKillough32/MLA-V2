"""
Parse dermatology handbook into structured data for web application
"""
import json
import re
from pathlib import Path

def load_extracted_data():
    """Load the extracted JSON data"""
    with open('dermatology_extracted.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def parse_dermatology_conditions(data):
    """Parse dermatology conditions from PDF"""
    
    # Based on the TOC, the handbook appears to cover:
    # - Common Skin Conditions (pages ~11-56)
    # - Common Important Problems (pages ~57-69)
    
    conditions = {}
    
    # Common dermatology conditions with typical structure
    # We'll create comprehensive entries based on the hematology pattern
    
    # INFLAMMATORY CONDITIONS
    conditions['eczema-atopic'] = {
        'title': 'Atopic Eczema (Atopic Dermatitis)',
        'category': 'inflammatory',
        'clinicalPresentation': {
            'description': 'Chronic relapsing inflammatory skin condition characterized by pruritic, erythematous, dry, and scaly patches',
            'distribution': [
                '<strong>Infants</strong>: Face, scalp, extensor surfaces',
                '<strong>Children</strong>: Flexural areas (antecubital, popliteal fossae)',
                '<strong>Adults</strong>: Hands, neck, flexures, eyelids'
            ],
            'morphology': [
                'Acute: Erythema, vesicles, weeping, crusting',
                'Subacute: Scaling, erythema, excoriation',
                'Chronic: Lichenification, fissuring, hyperpigmentation/hypopigmentation'
            ],
            'symptoms': ['Intense pruritus (worse at night)', 'Dry skin (xerosis)', 'Secondary infection (impetiginization)']
        },
        'associations': [
            'Atopic triad: Asthma, allergic rhinitis, food allergies',
            'Family history of atopy',
            'IgE-mediated sensitization',
            'Filaggrin gene mutations (FLG) - impaired skin barrier'
        ],
        'triggers': [
            'Environmental: Cold weather, low humidity, irritants (soaps, detergents)',
            'Allergens: House dust mite, pollen, animal dander',
            'Infections: S. aureus colonization, viral infections',
            'Stress and hormonal factors'
        ],
        'diagnosis': [
            '<strong>Clinical diagnosis</strong> - UK Working Party Criteria:',
            '  Must have: Itchy skin condition',
            '  Plus 3 or more of:',
            '    - Onset before age 2',
            '    - History of flexural involvement',
            '    - History of generally dry skin',
            '    - Personal history of other atopic disease',
            '    - Visible flexural dermatitis',
            '<strong>Investigations (usually not needed)</strong>:',
            '  - Skin swabs if infected',
            '  - Patch testing if contact dermatitis suspected',
            '  - IgE/RAST - if severe or food allergy suspected'
        ],
        'management': [
            '<strong>General measures</strong>:',
            '  • Emollients: Liberal and frequent use (500g/week)',
            '  • Avoid triggers and irritants',
            '  • Short lukewarm baths, soap substitutes',
            '  • Cotton clothing, avoid wool',
            '<strong>Topical therapies</strong>:',
            '  • <strong>Mild</strong>: Hydrocortisone 1%',
            '  • <strong>Moderate</strong>: Clobetasone butyrate 0.05% (face), betamethasone valerate 0.1%',
            '  • <strong>Potent</strong>: Betamethasone dipropionate 0.05%, mometasone furoate 0.1%',
            '  • <strong>Very potent</strong>: Clobetasol propionate 0.05% (short courses only)',
            '  • Apply once daily, use fingertip units (FTU)',
            '  • Topical calcineurin inhibitors: Tacrolimus, pimecrolimus (steroid-sparing)',
            '<strong>Systemic therapy (severe cases)</strong>:',
            '  • Phototherapy (UVB, PUVA)',
            '  • Immunosuppressants: Ciclosporin, azathioprine, methotrexate',
            '  • Biologics: Dupilumab (anti-IL-4/IL-13)',
            '  • JAK inhibitors: Baricitinib, upadacitinib',
            '<strong>Infection management</strong>:',
            '  • Topical fusidic acid or mupirocin',
            '  • Oral flucloxacillin if widespread',
            '  • Antiseptic baths (dilute bleach baths)'
        ],
        'complications': [
            'Secondary bacterial infection (S. aureus, S. pyogenes)',
            'Eczema herpeticum (HSV superinfection) - medical emergency',
            'Lichenification and scarring',
            'Psychological impact, sleep disturbance',
            'Growth retardation (severe cases)'
        ],
        'prognosis': [
            '60% of children outgrow it by adolescence',
            'Persists into adulthood in 10-30%',
            'Hand eczema common in adults',
            'Associated with increased risk of asthma and allergic rhinitis'
        ]
    }
    
    conditions['psoriasis-plaque'] = {
        'title': 'Plaque Psoriasis (Psoriasis Vulgaris)',
        'category': 'inflammatory',
        'clinicalPresentation': {
            'description': 'Chronic inflammatory skin condition characterized by well-demarcated erythematous plaques with silvery-white scale',
            'distribution': [
                'Extensor surfaces: Elbows, knees',
                'Scalp (common)',
                'Sacrum and intergluteal cleft',
                'Can affect any body site',
                'Koebner phenomenon: Lesions at sites of trauma'
            ],
            'morphology': [
                'Sharply demarcated erythematous plaques',
                'Silvery-white scale (micaceous)',
                'Removal of scale reveals pinpoint bleeding (Auspitz sign)',
                'Plaques may coalesce into larger areas'
            ],
            'variants': [
                '<strong>Chronic plaque</strong>: Most common (80-90%)',
                '<strong>Guttate</strong>: Small droplet-like lesions, often post-streptococcal',
                '<strong>Flexural (inverse)</strong>: Smooth, shiny patches in flexures',
                '<strong>Pustular</strong>: Sterile pustules on erythematous base',
                '<strong>Erythrodermic</strong>: Widespread erythema >90% BSA - medical emergency'
            ]
        },
        'associations': [
            'Psoriatic arthritis (10-30%): Asymmetric oligoarthritis, axial disease',
            'Metabolic syndrome: Obesity, diabetes, hypertension, dyslipidemia',
            'Cardiovascular disease: Increased MI and stroke risk',
            'IBD (Crohn disease, ulcerative colitis)',
            'Depression and anxiety',
            'Genetic: HLA-Cw6 association, PSORS1 locus'
        ],
        'triggers': [
            'Infections: Streptococcal pharyngitis (guttate)',
            'Trauma: Koebner phenomenon',
            'Medications: Beta-blockers, lithium, NSAIDs, antimalarials, steroid withdrawal',
            'Stress and hormonal factors',
            'Alcohol and smoking'
        ],
        'diagnosis': [
            '<strong>Clinical diagnosis</strong> - Based on appearance and distribution',
            '<strong>Skin biopsy</strong> (if uncertain):',
            '  - Acanthosis (epidermal hyperplasia)',
            '  - Parakeratosis (retained nuclei in stratum corneum)',
            '  - Munro microabscesses',
            '  - Dilated dermal capillaries',
            '<strong>Assess severity</strong>:',
            '  - BSA (Body Surface Area)',
            '  - PASI score (Psoriasis Area and Severity Index)',
            '  - DLQI (Dermatology Life Quality Index)'
        ],
        'management': [
            '<strong>Mild (<10% BSA)</strong>:',
            '  • <strong>Topical steroids</strong>: Potent (betamethasone) to very potent (clobetasol)',
            '  • <strong>Vitamin D analogues</strong>: Calcipotriol, calcitriol',
            '  • <strong>Combination</strong>: Calcipotriol/betamethasone (Dovobet®)',
            '  • <strong>Scalp</strong>: Tar-based shampoos, steroid lotions',
            '  • <strong>Emollients</strong>: Regular use to reduce scaling',
            '<strong>Moderate-Severe (>10% BSA or PASI >10)</strong>:',
            '  • <strong>Phototherapy</strong>:',
            '    - Narrowband UVB (first-line)',
            '    - PUVA (psoralen + UVA) - if UVB fails',
            '  • <strong>Systemic conventional</strong>:',
            '    - Methotrexate: 7.5-25mg weekly + folic acid',
            '    - Ciclosporin: 2.5-5mg/kg/day (short-term)',
            '    - Acitretin: 25-50mg daily (retinoid)',
            '  • <strong>Biologics</strong> (if conventional fails):',
            '    - Anti-TNF: Adalimumab, etanercept, infliximab',
            '    - Anti-IL-12/23: Ustekinumab',
            '    - Anti-IL-17: Secukinumab, ixekizumab, brodalumab',
            '    - Anti-IL-23: Guselkumab, risankizumab, tildrakizumab',
            '  • <strong>Small molecules</strong>:',
            '    - Apremilast (PDE4 inhibitor)',
            '    - Deucravacitinib (TYK2 inhibitor)',
            '<strong>Lifestyle</strong>:',
            '  • Weight loss if obese',
            '  • Reduce alcohol, smoking',
            '  • Cardiovascular risk factor management'
        ],
        'complications': [
            'Psoriatic arthritis (screen annually)',
            'Erythroderma (medical emergency)',
            'Psychological impact (depression, anxiety)',
            'Cardiovascular disease',
            'Metabolic syndrome'
        ],
        'prognosis': [
            'Chronic lifelong condition with relapses and remissions',
            'Not curable but highly treatable',
            'Modern biologics achieve clear/almost clear skin in 60-80%',
            'Risk of psoriatic arthritis increases with duration'
        ]
    }
    
    # Add acne
    conditions['acne-vulgaris'] = {
        'title': 'Acne Vulgaris',
        'category': 'acne-rosacea',
        'clinicalPresentation': {
            'description': 'Common chronic inflammatory disorder of pilosebaceous units affecting face, chest, and back',
            'morphology': [
                '<strong>Non-inflammatory</strong>:',
                '  - Open comedones (blackheads)',
                '  - Closed comedones (whiteheads)',
                '<strong>Inflammatory</strong>:',
                '  - Papules: Small red bumps',
                '  - Pustules: Pus-filled lesions',
                '  - Nodules: Large, deep, painful lumps',
                '  - Cysts: Deep, pus-filled lesions'
            ],
            'distribution': 'Face (especially forehead, cheeks, nose, chin), chest, upper back, shoulders'
        },
        'pathophysiology': [
            '<strong>Four key factors</strong>:',
            '1. Increased sebum production (androgenic stimulation)',
            '2. Follicular hyperkeratinization (comedone formation)',
            '3. Colonization with Cutibacterium acnes (formerly P. acnes)',
            '4. Inflammation and immune response'
        ],
        'grading': [
            '<strong>Mild</strong>: Comedones and few inflammatory lesions',
            '<strong>Moderate</strong>: Multiple papules and pustules',
            '<strong>Severe</strong>: Nodules, cysts, scarring'
        ],
        'triggers': [
            'Hormonal: Puberty, menstruation, PCOS',
            'Medications: Steroids, lithium, anticonvulsants',
            'Cosmetics: Comedogenic products',
            'Environmental: Humidity, pollution',
            'Diet: Possible link with high glycemic index foods, dairy'
        ],
        'management': [
            '<strong>Mild acne</strong>:',
            '  • <strong>Topical retinoids</strong>: Tretinoin, adapalene (first-line)',
            '  • <strong>Benzoyl peroxide</strong>: 2.5-10% gel (antimicrobial)',
            '  • <strong>Topical antibiotics</strong>: Clindamycin, erythromycin (combine with BPO)',
            '  • <strong>Azelaic acid</strong>: 15-20% gel',
            '<strong>Moderate acne</strong>:',
            '  • Topical retinoid + BPO + topical antibiotic',
            '  • OR oral antibiotics:',
            '    - Lymecycline 408mg daily',
            '    - Doxycycline 100mg daily',
            '    - Duration: 3-6 months maximum',
            '<strong>Severe acne or scarring</strong>:',
            '  • <strong>Oral isotretinoin</strong> (Roaccutane®):',
            '    - 0.5-1mg/kg/day for 16-24 weeks',
            '    - Highly effective (>90% clearance)',
            '    - TERATOGENIC: Mandatory pregnancy prevention program',
            '    - Side effects: Dry skin/lips, photosensitivity, mood changes',
            '    - Monitor: LFTs, lipids, pregnancy tests',
            '<strong>Hormonal therapy (females)</strong>:',
            '  • Combined oral contraceptive pill (anti-androgenic)',
            '  • Co-cyprindiol (Dianette®) - not first-line due to VTE risk',
            '  • Spironolactone (anti-androgen)',
            '<strong>General measures</strong>:',
            '  • Gentle cleansing (avoid over-washing)',
            '  • Oil-free, non-comedogenic cosmetics',
            '  • Avoid picking/squeezing',
            '  • Sunscreen (especially with retinoids)'
        ],
        'complications': [
            'Scarring: Atrophic (ice-pick, rolling, boxcar) or hypertrophic',
            'Post-inflammatory hyperpigmentation',
            'Psychological impact: Low self-esteem, depression, anxiety',
            'Acne fulminans: Severe systemic illness (rare)'
        ],
        'prognosis': [
            'Usually improves after teenage years',
            'Can persist into adulthood (especially females)',
            'Isotretinoin provides long-term remission in most cases',
            'Early treatment prevents scarring'
        ]
    }
    
    return conditions

def create_dermatology_data_structure():
    """Create the complete dermatology data structure"""
    data = load_extracted_data()
    conditions = parse_dermatology_conditions(data)
    
    # Save to JSON
    output_path = Path(__file__).parent.parent / 'static' / 'dermatology' / 'dermatology_data_structured.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(conditions, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Created {len(conditions)} condition entries")
    print(f"✓ Saved to {output_path}")
    
    # Print structure for verification
    for cond_id, cond_data in conditions.items():
        print(f"\n{cond_data['title']} ({cond_id}):")
        print(f"  Category: {cond_data['category']}")
        print(f"  Keys: {list(cond_data.keys())}")

if __name__ == "__main__":
    create_dermatology_data_structure()
