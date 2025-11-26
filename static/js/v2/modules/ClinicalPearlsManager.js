/**
 * ClinicalPearlsManager.js - Dedicated renderer for high-yield clinical pearls
 * across specialties. Splitting from MedStatsEthicsManager keeps statistics content
 * lean while providing a focused clinical reference deck.
 */
class ClinicalPearlsManager {
    constructor() {
        this.sections = this.buildSections();
    }

    async initialize() {
        return Promise.resolve();
    }

    ensureStyles() {
        if (document.getElementById('clinical-pearls-styles')) return;
        const css = `
            /* Subsection card - neutral surface with accessible defaults */
            .med-knowledge-subsection {
                border: 1px solid rgba(15,23,42,0.06);
                border-radius: 6px;
                padding: 12px;
                margin-bottom: 8px;
                background: #ffffff;
                color: #0f172a; /* default text colour for good contrast on light surfaces */
            }
            .med-knowledge-subsection summary {
                cursor: pointer;
                font-weight: 600;
                color: inherit;
                margin-bottom: 8px;
                list-style: none;
            }
            .med-knowledge-subsection ul { margin: 0; padding-left: 20px; color: inherit; }
            .med-knowledge-subnote { margin-top: 8px; font-style: italic; color: rgba(15,23,42,0.65); }

            @media (prefers-color-scheme: dark) {
                .med-knowledge-subsection {
                    border: 1px solid rgba(255,255,255,0.06);
                    background: rgba(6, 10, 26, 0.72);
                    color: rgba(226,232,240,0.98);
                }
                .med-knowledge-subsection summary { color: inherit; }
                .med-knowledge-subnote { color: rgba(226,232,240,0.86); }
            }
        `;
        const style = document.createElement('style');
        style.id = 'clinical-pearls-styles';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    buildSections() {
        return [
            {
                title: 'High-Yield Clinical Pearls',
                badge: 'Clinical',
                subsections: [
                    {
                        heading: 'Endocrine & Metabolic',
                        items: [
                            'Toxic multinodular goitre – radioactive iodine is the treatment of choice.',
                            "Graves' disease is the most common cause of thyrotoxicosis and is driven by IgG antibodies to the TSH receptor.",
                            'Over-replacement with thyroxine increases osteoporosis risk; myxoedemic coma is treated with thyroxine and hydrocortisone.',
                            "Cushing's disease: cortisol is not suppressed by low-dose dexamethasone but is suppressed by high-dose dexamethasone.",
                            'Primary hyperaldosteronism typically presents with hypertension and hypokalaemia and is managed with spironolactone.',
                            'Measuring PTH is the first step when investigating hypercalcaemia; primary hyperparathyroidism is usually due to a solitary adenoma.',
                            'Depression, nausea, constipation and bone pain point toward primary hyperparathyroidism; pepperpot skull is a classic radiological sign.'
                        ]
                    },
                    {
                        heading: 'Diabetes & Metabolic Emergencies',
                        items: [
                            'Asymptomatic abnormal HbA1c or fasting glucose requires a second abnormal reading before confirming type 2 diabetes.',
                            'Standard HbA1c target in type 2 diabetes is 48 mmol/mol; if on a drug that can cause hypoglycaemia (e.g. sulfonylurea) aim for 53 mmol/mol.',
                            'If starting an SGLT-2 inhibitor as initial therapy, ensure metformin has been titrated first; DPP-4 inhibitors are helpful in obese T2DM patients.',
                            'When metformin is contraindicated and there is no CVD/HF risk, initial T2DM therapy can be a DPP-4 inhibitor, pioglitazone, sulfonylurea or SGLT-2 (if NICE criteria met).',
                            'Hypoglycaemia when conscious: give fast-acting oral carbohydrate; if GCS is impaired and IV access available: give IV glucose.',
                            'DKA: start with isotonic saline even if acidotic; once glucose is <14 mmol/L, add 10% dextrose at 125 mL/hr alongside saline.',
                            'Cerebral oedema is an important complication of fluid resuscitation in DKA, especially in young patients.',
                            'A patient with diabetes who has two hypoglycaemic episodes requiring help must surrender their driving licence.'
                        ]
                    },
                    {
                        heading: 'Cardio-Respiratory',
                        items: [
                            'Acute onset atrial fibrillation ≥48 hours or uncertain onset → rate control.',
                            'Offer a mineralocorticoid receptor antagonist in addition to an ACE inhibitor (or ARB) and beta-blocker for HFrEF if symptoms persist.',
                            'Adenocarcinoma accounts for the majority of lung cancer cases in non-smokers.',
                            'Rheumatic fever is the most common cause of mitral stenosis worldwide.',
                            'Posterior MIs show reciprocal horizontal ST depression, tall broad R waves, upright T waves and a dominant R wave in V2.',
                            'Patients with MI secondary to cocaine use should be given IV benzodiazepines as part of acute coronary treatment.',
                            'COPD severity is based on FEV1; azithromycin prophylaxis is an option in selected patients with ongoing exacerbations.',
                            'NIV should be considered in acute COPD exacerbations with PaCO2 >6 kPa and pH <7.35 (≥7.26) despite maximal medical therapy.',
                            'Bilateral mid-to-lower zone patchy consolidation in an older patient suggests Legionella; the urinary antigen test is the best diagnostic tool.',
                            'Painful third nerve palsy indicates a posterior communicating artery aneurysm; smokers may normally have carboxyhaemoglobin levels up to 10%.',
                            'Use of large volumes of 0.9% sodium chloride risks hyperchloraemic metabolic acidosis; beta-blockers should be avoided where possible in myasthenia gravis.'
                        ]
                    },
                    {
                        heading: 'Gastroenterology & Hepatology',
                        items: [
                            'Patients over 60 with iron deficiency anaemia should be investigated for colorectal cancer.',
                            'Acute pancreatitis is the most common complication of ERCP; abdominal distension with absent stool/flatus and minimal vomiting suggests large bowel obstruction.',
                            'Oesophago-gastro-duodenoscopy with biopsy is the investigation of choice for suspected gastric cancer.',
                            "Glucocorticoids are generally used to induce remission of Crohn's disease; mild–moderate distal ulcerative colitis responds first-line to topical rectal aminosalicylates.",
                            'Pancreatic cancer may present with cholestatic LFTs; AST/ALT ratio of 2:1 suggests alcoholic hepatitis.',
                            'Isolated rise in GGT with a macrocytic anaemia points toward alcohol excess as the cause.',
                            'High urea levels can indicate an upper GI bleed; arterial pH is the key prognostic marker in paracetamol overdose.',
                            'Early signs of haemochromatosis include fatigue, erectile dysfunction and arthralgia; ursodeoxycholic acid is first-line in primary biliary cholangitis to slow progression.'
                        ]
                    },
                    {
                        heading: 'Infectious Diseases & Antimicrobials',
                        items: [
                            'Chickenpox has a prodrome of fever before a torso/face rash.',
                            'History of rash with penicillin is not a contraindication to benzylpenicillin or ceftriaxone in meningococcal sepsis; true anaphylaxis warrants IV chloramphenicol and urgent transfer.',
                            'Patients suffering from C. difficile need isolation for at least 48 hours; oral vancomycin is first-line therapy.',
                            'Life-threatening C. difficile infection: oral vancomycin plus IV metronidazole, and opioids should be stopped.',
                            'Preventing C. difficile spread requires hand washing and disposable gloves/apron for all contacts.',
                            'Campylobacter infection is often self-limiting, but severe cases merit clarithromycin; azithromycin is the treatment of choice for chlamydia in pregnancy (erythromycin or amoxicillin are alternatives).',
                            'Co-trimoxazole contains trimethoprim and must never be prescribed with methotrexate.',
                            'Positive IGRA with normal CXR and no symptoms should be treated as latent tuberculosis.',
                            'Mothers with previous Group B Streptococcus carriage should receive intrapartum antibiotics or late-pregnancy testing; a multi-level pregnancy test is required 2 weeks after a medical termination of pregnancy.',
                            'Jarisch-Herxheimer reaction: fever, rash, chills and headache after antibiotics for syphilis.',
                            'Genital ulcers: painful ulcers are more commonly herpes than chancroid; painless ulcers are more often syphilis than lymphogranuloma venereum.'
                        ]
                    },
                    {
                        heading: 'Haematology & Oncology',
                        items: [
                            'The combined oral contraceptive pill is a protective factor for endometrial cancer, whereas obesity is a significant risk factor.',
                            'Aspirin is given in polycythaemia vera to reduce thrombotic events; platelet transfusions have a higher risk of bacterial contamination because they are stored at room temperature.',
                            "Stage III Ann-Arbor lymphoma involves lymph nodes on both sides of the diaphragm; nodular sclerosing Hodgkin's lymphoma is the most common subtype.",
                            'Nasopharyngeal carcinoma may present as painless lymphadenopathy due to early spread.',
                            'Renal transplant patients most commonly develop skin cancer (particularly squamous cell) as a malignancy related to immunosuppression.',
                            'Disproportionate microcytic anaemia should prompt suspicion of beta-thalassaemia trait.',
                            'Persistent mouth ulceration should raise concern for squamous cell carcinoma.'
                        ]
                    },
                    {
                        heading: 'Neurology & Psychiatry',
                        items: [
                            'Flight of ideas is a feature of mania; OCD with severe functional impairment should be referred to secondary care (treatment can start while waiting).',
                            'More than one episode of vomiting after a head injury is an indication for CT head within 1 hour.',
                            "Wernicke's aphasia localises to a lesion of the superior temporal gyrus; cranial nerves V, VII and VIII are affected in vestibular schwannomas.",
                            'Chronic fatigue syndrome requires symptoms for at least 3 months before diagnosis.',
                            'Hiccups in palliative care can be treated with chlorpromazine or haloperidol.',
                            'Cyclizine is a good first-line anti-emetic for intracranial causes of nausea and vomiting.',
                            'Stopping SSRIs abruptly can cause discontinuation syndrome with gastrointestinal upset such as diarrhoea.',
                            'Subacute combined degeneration affects the dorsal columns and lateral corticospinal tracts of the spinal cord.'
                        ]
                    },
                    {
                        heading: 'Obstetrics, Gynaecology & Paediatrics',
                        items: [
                            'PCOS diagnosis requires 2 of 3: oligomenorrhoea, clinical/biochemical hyperandrogenism, or polycystic ovaries on ultrasound.',
                            'Breastfed infants who lose >10% of birth weight in the first week should be referred to a midwife-led breastfeeding clinic.',
                            'Acne vulgaris in pregnancy can be treated with oral erythromycin if needed; oral isotretinoin must only be used under specialist supervision.',
                            'Patients ≤25 years started on an SSRI should be reviewed after 1 week.',
                            'Pityriasis rosea often follows a viral infection; acute tear-drop scaly papules on the trunk/limbs suggest guttate psoriasis.',
                            'If tetanus vaccination history is uncertain, give a booster and immunoglobulin unless the wound is very minor and <6 hours old; if five doses with the last <10 years have been received, no booster or immunoglobulin is needed regardless of wound severity.',
                            'Obesity is a significant risk factor for endometrial cancer, while the combined oral contraceptive pill is protective.'
                        ]
                    },
                    {
                        heading: 'Renal, Vascular & Acute Medicine',
                        items: [
                            'NICE AKI criteria: creatinine rise >26µmol/L in 48 hours, or >50% in 7 days, or urine output <0.5 mL/kg/hr for >6 hours.',
                            'Investigating suspected PE: Wells score ≤4 with a negative D-dimer → stop anticoagulation and consider alternative diagnoses.',
                            'If CTPA is negative but DVT is suspected, arrange a proximal leg vein ultrasound; if initial DVT scan is negative but D-dimer positive, stop anticoagulation and repeat the scan in 1 week.',
                            'MSU should be sent for all women over 65 with suspected UTI.',
                            'High urea levels can indicate an upper GI bleed; right-sided tenderness on PR examination should prompt consideration of appendicitis.',
                            'Use fast-acting oral carbohydrate as first-line treatment for conscious hypoglycaemia; non-sedating antihistamines are first-line for acute urticaria.'
                        ]
                    },
                    {
                        heading: 'Dermatology, Musculoskeletal & General Practice',
                        items: [
                            'Plantar fasciitis is best managed initially with rest, stretching and weight loss if overweight.',
                            'Haemoarthroses are a common feature of haemophilia.',
                            'Chest X-ray should be performed in all patients with erythema nodosum.',
                            'Non-sedating antihistamines are first-line for acute urticaria.',
                            "Most metatarsal stress fractures occur at the 2nd metatarsal shaft; Parkinson's disease is associated with seborrhoeic dermatitis.",
                            'HBsAg negative, anti-HBs positive, IgG anti-HBc negative indicates previous hepatitis B immunisation.',
                            'Potent topical steroids are first-line treatment for lichen planus; brimonidine gel can help rosacea with predominant flushing.',
                            'Right-sided tenderness on PR examination should prompt consideration of appendicitis.'
                        ]
                    }
                ]
            }
        ];
    }

    getStatistics() {
        const subsectionCount = this.sections.reduce((acc, s) => acc + (s.subsections ? s.subsections.length : (s.items ? 1 : 0)), 0);
        const pointCount = this.sections.reduce((count, section) => {
            if (Array.isArray(section.subsections)) {
                return count + section.subsections.reduce((c2, ss) => c2 + (ss.items?.length || 0), 0);
            }
            return count + (section.items?.length || 0);
        }, 0);

        return {
            totalSections: this.sections.length,
            totalSubsections: subsectionCount,
            totalPoints: pointCount
        };
    }

    getThemeContext() {
        const fallback = {
            primary: '#4f46e5',
            primaryRgb: '79, 70, 229',
            subtext: '#0f172a',
            summaryColor: '#0f172a'
        };

        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return {
                badgeBg: `rgba(${fallback.primaryRgb}, 0.12)`,
                badgeColor: fallback.primary,
                subsectionBg: 'rgba(75, 101, 163, 0.76)',
                subsectionBorder: 'rgba(15, 23, 42, 0.1)',
                subnoteColor: 'rgba(55, 65, 81, 0.85)',
                summaryColor: fallback.summaryColor,
                subtext: fallback.subtext
            };
        }

        const primary = this.getCssVar('--v2-primary', fallback.primary);
        const primaryRgb = this.getCssVar('--v2-primary-rgb', fallback.primaryRgb);
        const isDark = (document.documentElement?.dataset?.theme || '').toLowerCase() === 'dark';

        return {
            badgeBg: `rgba(${primaryRgb}, ${isDark ? 0.18 : 0.12})`,
            badgeColor: primary,
            subsectionBg: isDark ? 'rgba(6, 10, 26, 0.72)' : '#ffffff',
            subsectionBorder: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)',
            subnoteColor: isDark ? 'rgba(226, 232, 240, 0.86)' : 'rgba(15, 23, 42, 0.65)',
            summaryColor: isDark ? 'rgba(255,255,255,0.98)' : 'rgba(15,23,42,0.95)',
            subtext: isDark ? 'rgba(226,232,240,0.98)' : 'rgba(15,23,42,0.95)'
        };
    }

    getCssVar(name, fallback) {
        try {
            const value = getComputedStyle(document.documentElement).getPropertyValue(name);
            return value ? value.trim() || fallback : fallback;
        } catch (err) {
            return fallback;
        }
    }

    render(panel) {
        if (!panel) {
            console.error('ClinicalPearlsManager: render called without panel');
            return;
        }

        const container = panel.querySelector('#clinical-pearls-container') || panel;
        if (!container) {
            console.error('ClinicalPearlsManager: container not found');
            return;
        }

        this.ensureStyles();
        const theme = this.getThemeContext();

        const cardsHtml = this.sections.map(section => {
            const subsectionsHtml = (section.subsections || []).map(subsection => {
                const itemsHtml = (subsection.items || []).map(item => `<li>${item}</li>`).join('');
                return `
                    <div class="med-knowledge-subsection" style="border-color:${theme.subsectionBorder};background:${theme.subsectionBg};color:${theme.subtext};">
                        <summary style="color:${theme.summaryColor};">${subsection.heading}</summary>
                        <ul>${itemsHtml}</ul>
                    </div>
                `;
            }).join('');

            const noteHtml = section.note ? `<div class="med-knowledge-subnote" style="color:${theme.subnoteColor};">${section.note}</div>` : '';

            return `
                <section class="knowledge-card">
                    <div class="knowledge-card-header">
                        <span class="badge" style="background:${theme.badgeBg};color:${theme.badgeColor};">${section.badge}</span>
                        <h3>${section.title}</h3>
                    </div>
                    ${subsectionsHtml}
                    ${noteHtml}
                </section>
            `;
        }).join('');

        container.innerHTML = `
            <div class="knowledge-card-grid">
                ${cardsHtml}
            </div>
        `;
    }
}

export const clinicalPearlsManager = new ClinicalPearlsManager();
