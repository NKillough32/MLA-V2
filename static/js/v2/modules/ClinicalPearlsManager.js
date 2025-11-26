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
            /* Grid + card shell */
            .knowledge-card-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 20px;
                width: 100%;
            }

            .knowledge-card {
                position: relative;
                overflow: hidden;
                border-radius: 14px;
                background: linear-gradient(145deg, rgba(79,70,229,0.04), rgba(59,130,246,0.03));
                border: 1px solid rgba(15,23,42,0.08);
                box-shadow: 0 10px 40px rgba(15,23,42,0.08);
                transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
            }

            .knowledge-card::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at 12% 18%, rgba(59,130,246,0.08), transparent 28%),
                            radial-gradient(circle at 88% 12%, rgba(236,72,153,0.08), transparent 26%);
                pointer-events: none;
            }

            .knowledge-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 16px 55px rgba(15,23,42,0.12);
                border-color: rgba(79,70,229,0.18);
            }

            .knowledge-card-header {
                display: flex;
                align-items: flex-start;
                gap: 10px;
                padding: 16px 16px 8px 16px;
                position: relative;
                z-index: 1;
            }

            .knowledge-card h3 {
                margin: 0;
                font-size: 1.05rem;
                letter-spacing: -0.01em;
            }

            .knowledge-card .card-summary {
                margin: 4px 0 0;
                color: #475569;
                font-size: 0.94rem;
                line-height: 1.5;
            }

            .badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 6px 10px;
                border-radius: 999px;
                font-weight: 600;
                font-size: 0.82rem;
                letter-spacing: 0.01em;
                background: rgba(79,70,229,0.1);
                color: #4f46e5;
                border: 1px solid rgba(79,70,229,0.22);
            }

            .section-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                padding: 0 16px 14px 16px;
            }

            .section-tag {
                padding: 6px 10px;
                border-radius: 999px;
                background: rgba(15,23,42,0.05);
                color: #0f172a;
                font-weight: 600;
                font-size: 0.85rem;
                letter-spacing: 0.01em;
            }

            .knowledge-card-body {
                padding: 2px 18px 18px 18px;
                position: relative;
                z-index: 1;
            }

            /* Subsection card - neutral surface with accessible defaults */
            .med-knowledge-subsection {
                border: 1px solid rgba(15,23,42,0.08);
                border-radius: 12px;
                padding: 12px 12px 10px;
                margin-bottom: 10px;
                background: #ffffff;
                color: #0f172a; /* default text colour for good contrast on light surfaces */
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
            }
            .med-knowledge-subsection summary {
                cursor: pointer;
                font-weight: 700;
                color: inherit;
                margin-bottom: 8px;
                list-style: none;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .med-knowledge-subsection summary .chevron {
                transition: transform 160ms ease;
                font-size: 0.9rem;
                color: rgba(15,23,42,0.5);
            }
            .med-knowledge-subsection[open] summary .chevron {
                transform: rotate(90deg);
                color: rgba(79,70,229,0.85);
            }
            .med-knowledge-subsection ul {
                margin: 0;
                padding-left: 20px;
                color: inherit;
                display: grid;
                gap: 6px;
            }
            .med-knowledge-subsection li {
                line-height: 1.5;
            }
            .med-knowledge-subnote { margin-top: 10px; font-style: italic; color: rgba(15,23,42,0.65); }

            .section-meta {
                display: flex;
                gap: 10px;
                align-items: center;
                padding: 0 16px 12px;
                margin: 12px 0 14px;
                color: rgba(15,23,42,0.6);
                font-size: 0.9rem;
            }

            .section-meta .pill {
                padding: 6px 10px;
                border-radius: 9999px;
                background: rgba(79,70,229,0.08);
                border: 1px solid rgba(79,70,229,0.12);
                color: #0f172a;
                font-weight: 600;
            }

            .section-meta strong { color: #0f172a; }

            @media (prefers-color-scheme: dark) {
                .med-knowledge-subsection {
                    border: 1px solid #2e2e2e;
                    background: #1a1a1a;
                    color: rgba(226,232,240,0.98);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.28);
                }
                .med-knowledge-subsection summary { color: inherit; }
                .med-knowledge-subnote { color: rgba(226,232,240,0.9); }
                .section-tag, .section-meta .pill {
                    background: #1f2533;
                    border-color: #2f3a50;
                    color: #e8edff;
                }
                .knowledge-card {
                    border: 1px solid #2e2e2e;
                    background: #1f1f1f;
                    box-shadow: 0 12px 32px rgba(0,0,0,0.28);
                    transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
                }
                .knowledge-card:hover {
                    background: #2a2a2a;
                    border-color: #3a3a3a;
                    box-shadow: 0 16px 36px rgba(0,0,0,0.32);
                    transform: translateY(-3px);
                }
                .knowledge-card h3 { color: #f1f1f1; }
                .knowledge-card .card-summary { color: #cfcfcf; }
                .section-meta { color: rgba(226,232,240,0.72); }
                .section-meta .pill {
                    background: #1f2533;
                    border-color: #2f3a50;
                    color: #e8edff;
                }
                .section-meta .pill:hover {
                    background: #252d3f;
                    border-color: #3a4b6b;
                }
            }

            /* Explicit theme toggle support (data-theme="dark") for in-app dark mode */
            [data-theme="dark"] .med-knowledge-subsection {
                border: 1px solid #343434;
                background: #11131c;
                color: rgba(226,232,240,0.98);
                box-shadow: 0 10px 28px rgba(0,0,0,0.38);
            }
            [data-theme="dark"] .med-knowledge-subsection summary { color: inherit; }
            [data-theme="dark"] .med-knowledge-subnote { color: rgba(226,232,240,0.9); }
            [data-theme="dark"] .section-tag,
            [data-theme="dark"] .section-meta .pill {
                background: #1c2130;
                border-color: #31405a;
                color: #e8edff;
            }
            [data-theme="dark"] .knowledge-card {
                border: 1px solid #343434;
                background: #12141d;
                box-shadow: 0 14px 32px rgba(0,0,0,0.34);
                transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
            }
            [data-theme="dark"] .knowledge-card:hover {
                background: #191b26;
                border-color: #3d3d3d;
                box-shadow: 0 18px 38px rgba(0,0,0,0.38);
                transform: translateY(-3px);
            }
            [data-theme="dark"] .knowledge-card h3 { color: #f5f7ff; }
            [data-theme="dark"] .knowledge-card .card-summary { color: #dce3ff; }
            [data-theme="dark"] .section-meta { color: rgba(226,232,240,0.76); }
            [data-theme="dark"] .section-meta .pill:hover {
                background: #242c3d;
                border-color: #3a4b6b;
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
                summary: 'Concise reminders that fast-track bedside decision making and oral recall.',
                tags: ['Rounds-ready', 'Recall cues', 'Rapid review'],
                subsections: [
                    {
                        heading: 'Endocrine & Metabolic',
                        items: [
                            "Graves' orbitopathy worsens with smoking; radioactive iodine can transiently aggravate eye disease—pre-treat with steroids if severe.",
                            'Toxic multinodular goitre → radioactive iodine is first-line in older adults; surgery is preferred for large goitres with compressive symptoms.',
                            'Primary hyperaldosteronism typically presents with hypertension + hypokalaemia; confirm with aldosterone:renin ratio then CT adrenals.',
                            'Measure PTH first when investigating unexplained hypercalcaemia; primary hyperparathyroidism is usually due to a solitary adenoma.',
                            'Over-replacement with thyroxine accelerates bone loss—always re-check TSH 6–8 weeks after dose changes.',
                            'In suspected adrenal insufficiency, draw cortisol and ACTH before steroids if safe; hydrocortisone 100 mg IV/IM is the emergency dose.'
                        ]
                    },
                    {
                        heading: 'Diabetes & Metabolic Emergencies',
                        items: [
                            'Two abnormal HbA1c or fasting glucose readings are required to diagnose asymptomatic type 2 diabetes.',
                            'Standard HbA1c target in T2DM is 48 mmol/mol; if on hypoglycaemia-inducing agents (e.g. sulfonylurea) aim for 53 mmol/mol.',
                            'SGLT2 inhibitors should follow metformin titration unless contraindicated; consider DPP-4 inhibitor where weight gain is a concern.',
                            'DKA: start with isotonic saline even if acidotic; once glucose <14 mmol/L, add 10% dextrose at 125 mL/hr while continuing insulin.',
                            'Cerebral oedema is the feared complication of DKA fluid therapy—watch for headache, bradycardia or reduced GCS.',
                            'Two hypoglycaemic episodes requiring third-party help mandate licence surrender to the DVLA/authorities.'
                        ]
                    },
                    {
                        heading: 'Cardio-Respiratory',
                        items: [
                            'Acute onset AF ≥48 hours or uncertain onset → rate control; rhythm control only after stroke risk has been addressed.',
                            'HFrEF: add an MRA on top of ACEi/ARB + beta-blocker if symptoms persist; start SGLT2 inhibitor early for mortality benefit.',
                            'Posterior MI: reciprocal ST depression with tall R waves in V1–V3—order posterior leads (V7–V9) to confirm.',
                            'COPD exacerbation with PaCO2 >6 kPa and pH <7.35 (≥7.26) despite maximal therapy → consider NIV early.',
                            'Legionella often causes hyponatraemia and relative bradycardia; urinary antigen test is the diagnostic shortcut.',
                            'MI related to cocaine: give IV benzodiazepines; avoid pure beta-blockade due to unopposed alpha effect.'
                        ]
                    },
                    {
                        heading: 'Gastroenterology & Hepatology',
                        items: [
                            'Crohn’s disease: transmural skip lesions and fistulae; perforation risk is higher than in ulcerative colitis.',
                            'AST:ALT >2:1 suggests alcoholic liver disease; check GGT to support heavy alcohol intake.',
                            'Primary sclerosing cholangitis is strongly linked to ulcerative colitis; monitor for cholangiocarcinoma.',
                            'Painless jaundice + weight loss → suspect pancreatic cancer; Courvoisier sign (palpable gallbladder) points to malignant obstruction.',
                            'Acute mesenteric ischaemia causes severe pain out of proportion to exam findings—do not delay CT angiography.',
                            'Upper GI bleed with haemodynamic instability → follow massive transfusion protocol rather than large-volume crystalloid.'
                        ]
                    },
                    {
                        heading: 'Obstetrics, Gynaecology & Paediatrics',
                        items: [
                            'PCOS diagnosis needs 2 of 3: oligo/anovulation, clinical/biochemical hyperandrogenism, or polycystic ovaries on scan.',
                            'Breastfed infants who lose >10% birth weight in week 1 require urgent lactation support review.',
                            'Avoid oral isotretinoin in pregnancy; erythromycin is the systemic acne option if needed.',
                            'Youth mental health: patients ≤25 years started on SSRIs should be reviewed after 1 week for suicidality.',
                            'Uncertain tetanus status with non-trivial wounds → give booster + immunoglobulin unless fully immunised within 10 years.',
                            'Obesity increases endometrial cancer risk; combined oral contraceptive pill is protective.'
                        ]
                    },
                    {
                        heading: 'Renal, Vascular & Acute Medicine',
                        items: [
                            'NICE AKI: creatinine rise >26 µmol/L in 48 h, >50% in 7 days, or urine output <0.5 mL/kg/hr for >6 h.',
                            'Low Wells (≤4) with negative D-dimer → stop anticoagulation and consider alternative diagnoses.',
                            'Negative CTPA but ongoing DVT concern → arrange proximal leg vein ultrasound; if D-dimer positive with negative scan, repeat in 1 week.',
                            'Send MSU in all women >65 with suspected UTI; overtreatment of asymptomatic bacteriuria is common.',
                            'Right-sided tenderness on PR exam should raise suspicion of appendicitis even with atypical labs.',
                            'Fast-acting oral carbohydrate is first-line for conscious hypoglycaemia; glucagon if no IV access.'
                        ]
                    },
                    {
                        heading: 'Dermatology, Musculoskeletal & General Practice',
                        items: [
                            'Plantar fasciitis: morning heel pain improves with stretching + rolling; weight loss and calf strengthening reduce recurrence.',
                            'Haemoarthroses are classic for haemophilia; aspirate a first presentation to confirm and exclude sepsis.',
                            'Erythema nodosum warrants chest X-ray to screen for sarcoidosis or TB.',
                            'Non-sedating antihistamines are first-line for urticaria; up-titrate to 4x dose before considering omalizumab.',
                            'Most metatarsal stress fractures occur at the 2nd metatarsal shaft; offload early to prevent non-union.',
                            'Lichen planus: potent topical steroids first-line; consider wick-insertion for oral lesions if symptomatic.'
                        ]
                    }
                ],
                note: 'Built from high-yield exam stems and frontline scenarios—use tags to target the right pearl set before rounds.'
            },
            {
                title: 'Critical Differentials & Red Flags',
                badge: 'Safety',
                summary: 'Signal serious pathology early with pattern-recognition prompts.',
                tags: ['Do not miss', 'Rapid escalation'],
                subsections: [
                    {
                        heading: 'Neurology & Stroke',
                        items: [
                            'Thunderclap headache + neck stiffness → exclude subarachnoid haemorrhage even if initial CT is normal (LP after 12 hours).',
                            'Painful third nerve palsy implies posterior communicating artery aneurysm until proven otherwise.',
                            'Suspected cauda equina: saddle anaesthesia, urinary retention, bilateral radiculopathy → urgent MRI + neurosurgical review.',
                            'Acute unilateral pupil-involving ptosis with diplopia could be an aneurysm—urgent imaging beats outpatient follow-up.'
                        ]
                    },
                    {
                        heading: 'Infection & Sepsis',
                        items: [
                            'Bilateral mid-to-lower zone patchy consolidation in older adults suggests Legionella—treat with macrolide/fluoroquinolone.',
                            'Non-blanching rash + fever → treat as meningococcal sepsis immediately with IM/IV benzylpenicillin pre-hospital.',
                            'Post-influenza deterioration with cavitating pneumonia → think Staphylococcus aureus and escalate antimicrobials.',
                            'Diabetic foot with disproportionate pain or crepitus → urgent imaging and surgical opinion for necrotising infection.'
                        ]
                    },
                    {
                        heading: 'Obstetric Red Flags',
                        items: [
                            'Painless per vaginam bleeding in late pregnancy → suspect placenta praevia—avoid digital exam, arrange urgent ultrasound.',
                            'Severe epigastric/RUQ pain + headache after 20 weeks → consider HELLP/preeclampsia; check platelets and LFTs promptly.',
                            'Reduced fetal movements warrant same-day assessment with CTG; never defer to routine clinic.',
                            'Suspected ectopic: shoulder tip pain, syncope or positive pregnancy test with abdominal pain → treat as emergency.'
                        ]
                    }
                ],
                note: 'Use these as huddle prompts on post-take ward rounds—aim to spot the outlier before the chart does.'
            },
            {
                title: 'Therapeutics at the Bedside',
                badge: 'Pharm',
                summary: 'Dose, de-risk and de-prescribe with confidence.',
                tags: ['Practical dosing', 'Interactions'],
                subsections: [
                    {
                        heading: 'Cardio & Antithrombotics',
                        items: [
                            'DOACs are contraindicated in mechanical valves—use warfarin with target INR per valve type.',
                            'Clopidogrel non-responders post-stent may benefit from ticagrelor; always check for drug interactions (e.g. carbamazepine).',
                            'ACEi/ARB in AKI: hold during sepsis/hypovolaemia; restart once euvolaemic and renal function recovering.',
                            'Perioperative AF: avoid amiodarone in patients with severe asthma/COPD—opt for beta-blocker or digoxin for rate control.'
                        ]
                    },
                    {
                        heading: 'Antimicrobials',
                        items: [
                            'Azithromycin prophylaxis in COPD: ensure optimised inhaler therapy first; check QTc and hearing before starting.',
                            'Penicillin allergy labels are wrong ~90% of the time—consider formal testing to widen antimicrobial options.',
                            'Vancomycin dosing should be weight + renal-function based; check trough just before 4th dose or earlier if renal impairment.',
                            'When switching from IV to oral antibiotics, ensure the oral bioavailability is high (e.g. levofloxacin, metronidazole).'
                        ]
                    },
                    {
                        heading: 'Deprescribing Signals',
                        items: [
                            'Falls + antihypertensives in older adults: review for postural drop and simplify to once-daily agents where possible.',
                            'Stop PPIs without indication; taper if long-term use to avoid rebound symptoms.',
                            'Long-term benzodiazepines: convert to diazepam equivalent and taper slowly (10–25% every 1–2 weeks).',
                            'Target HbA1c can be relaxed (≤58 mmol/mol) in frail adults or limited life expectancy—avoid hypoglycaemia at all costs.'
                        ]
                    }
                ],
                note: 'Pair with local antimicrobial guides for exact dosing; these cues focus on decision direction, not substitution for guidelines.'
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
                // match the CSS default surface for server-rendered content
                subsectionBg: '#ffffff',
                subsectionBorder: 'rgba(15, 23, 42, 0.1)',
                subnoteColor: 'rgba(55, 65, 81, 0.85)',
                summaryColor: fallback.summaryColor,
                subtext: fallback.subtext
            };
        }

        const primary = this.getCssVar('--v2-primary', fallback.primary);
        const primaryRgb = this.getCssVar('--v2-primary-rgb', fallback.primaryRgb);
        // Determine dark mode from either explicit data-theme or the user's
        // system preference. Relying only on dataset.theme means JS can force
        // light-mode inline styles even if the user prefers dark via media query.
        const dataTheme = (document.documentElement?.dataset?.theme || '').toLowerCase();
        const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = dataTheme === 'dark' || prefersDark;

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
                    <details class="med-knowledge-subsection" style="border-color:${theme.subsectionBorder};background:${theme.subsectionBg};color:${theme.subtext};">
                        <summary style="color:${theme.summaryColor};">
                            <span class="chevron">›</span>
                            ${subsection.heading}
                        </summary>
                        <ul>${itemsHtml}</ul>
                    </details>
                `;
            }).join('');

            const noteHtml = section.note ? `<div class="med-knowledge-subnote" style="color:${theme.subnoteColor};">${section.note}</div>` : '';
            const summaryHtml = section.summary ? `<div class="card-summary">${section.summary}</div>` : '';
            const tagsHtml = Array.isArray(section.tags) && section.tags.length
                ? `<div class="section-tags">${section.tags.map(tag => `<span class="section-tag">${tag}</span>`).join('')}</div>`
                : '';
            const stats = this.getStatistics();
            const metaHtml = `
                <div class="section-meta">
                    <span class="pill">${section.subsections?.length || 0} topic blocks</span>
                    <span class="pill">${(section.subsections || []).reduce((c, s) => c + (s.items?.length || 0), 0)} pearls</span>
                    <span class="pill">${stats.totalPoints} total pearls</span>
                </div>
            `;

            return `
                <section class="knowledge-card">
                    <div class="knowledge-card-header">
                        <span class="badge" style="background:${theme.badgeBg};color:${theme.badgeColor};">${section.badge}</span>
                        <h3>${section.title}</h3>
                    </div>
                    <div class="knowledge-card-body">
                        ${summaryHtml}
                        ${tagsHtml}
                        ${subsectionsHtml}
                        ${metaHtml}
                        ${noteHtml}
                    </div>
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
