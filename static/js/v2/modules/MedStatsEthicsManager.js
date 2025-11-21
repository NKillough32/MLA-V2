/**
 * MedStatsEthicsManager.js - Centralized renderer for medical statistics,
 * epidemiology, and ethics reference content.
 *
 * Keeps the knowledge cards modular and reusable across the Medical Tools
 * panel without hard-coding them into HTML templates.
 */
class MedStatsEthicsManager {
    constructor() {
        this.sections = this.buildSections();
    }

    /**
     * Initialize the manager (placeholder for future async loading)
     */
    async initialize() {
        return Promise.resolve();
    }

    /**
     * Structured knowledge deck used in the Medical Tools panel
     */
    buildSections() {
        return [
            {
                title: 'Medical Statistics Essentials',
                badge: 'Statistics',
                subsections: [
                    {
                        heading: 'Study Design',
                        items: [
                            'RCTs, cohort, case-control, cross-sectional and ecological designs; choose design to match causal question and feasibility.'
                        ]
                    },
                    {
                        heading: 'Clinical Trial Phases & Drug Development',
                        items: [
                            'Phase I: safety and dose-finding; Phase II: signal and dose-ranging; Phase III: definitive efficacy; Phase IV: post-marketing surveillance.',
                            'Drug development moves from preclinical safety through phased human trials with increasing sample sizes and endpoints.'
                        ]
                    },
                    {
                        heading: 'Significance Tests — Types & Interpretation',
                        items: [
                            'Parametric tests: t-test, ANOVA, linear regression; non-parametric: Mann–Whitney, Kruskal–Wallis.',
                            'Categorical tests: chi-square, Fisher exact; time-to-event: log-rank and Cox proportional hazards (yields hazard ratios).',
                            'Interpret p-values alongside effect sizes and CIs; avoid dichotomous thinking (significant vs not).' 
                        ]
                    },
                    {
                        heading: 'Confidence Intervals & Standard Error',
                        items: [
                            'CIs quantify estimate precision; SEM describes sampling variability of the mean (SD / √n).',
                            'Use 95% CIs for typical reporting and highlight clinical as well as statistical relevance.'
                        ]
                    },
                    {
                        heading: 'Effect Measures (RR / OR / HR) & NNT/ARR',
                        items: [
                            'Relative Risk and Odds Ratio describe relative differences; Hazard Ratio describes instantaneous event-rate ratios in survival analysis.',
                            'Absolute Risk Reduction = control risk − treatment risk; NNT = 1 / ARR (use absolute measures for patient communication).' 
                        ]
                    },
                    {
                        heading: 'Intention-To-Treat & Analysis Populations',
                        items: [
                            'Intention-to-treat preserves randomization by analysing participants in assigned groups; per-protocol and as-treated are complementary but prone to bias.'
                        ]
                    },
                    {
                        heading: 'Variance & Power',
                        items: [
                            'Variance (SD²) drives precision and sample-size calculations; power is the probability to detect an effect of a given size (1−β).',
                            'Underpowered studies risk false negatives; overpowered studies may detect trivial differences.'
                        ]
                    }
                ],
                note: 'Adjust for multiple testing (Bonferroni/FDR), prespecify endpoints and sample-size justification in protocols and SAPs.'
            },
            {
                title: 'Graphical Representations & Distributions',
                badge: 'Visuals',
                subsections: [
                    {
                        heading: 'Normal Distribution & Summary Plots',
                        items: [
                            'Histogram, density plots and boxplots visualise distribution; normal distribution underpins many parametric tests.'
                        ]
                    },
                    {
                        heading: 'Forest Plots',
                        items: [
                            'Forest plots display point estimates and CIs across studies or subgroups—useful for meta-analysis and subgroup summaries.'
                        ]
                    },
                    {
                        heading: 'Funnel Plots & Publication Bias',
                        items: [
                            'Funnel plots assess small-study effects/publication bias; asymmetry may indicate bias or heterogeneity.'
                        ]
                    },
                    {
                        heading: 'Survival Plots & Kaplan–Meier',
                        items: [
                            'Kaplan–Meier curves show cumulative event-free probabilities over time; accompany with log-rank tests and HR estimates.'
                        ]
                    }
                ],
                note: 'Choose visualisations that accurately reflect distribution, scale and uncertainty; annotate axes and CIs for clarity.'
            },
            {
                title: 'Validity, Bias & Power',
                badge: 'Critical Appraisal',
                subsections: [
                    {
                        heading: 'Internal Validity',
                        items: [
                            'Randomization, allocation concealment, blinding, handling missing data and pre-specified analysis plans.'
                        ]
                    },
                    {
                        heading: 'Bias Types',
                        items: [
                            'Selection bias, measurement/information bias, confounding, performance and detection bias; consider publication bias in syntheses.'
                        ]
                    },
                    {
                        heading: 'Reliability & Validity',
                        items: [
                            'Reliability (repeatability) vs validity (measuring the intended construct); ensure instruments and endpoints are validated.'
                        ]
                    },
                    {
                        heading: 'Power & Sample Size',
                        items: [
                            'Sample size calculations require expected effect, variance, alpha and beta; consider interim analyses and multiplicity adjustments.'
                        ]
                    },
                    {
                        heading: 'Confounding & Adjustment',
                        items: [
                            'Identify potential confounders a priori and use stratification, multivariable models or propensity methods to mitigate bias.'
                        ]
                    }
                ],
                note: 'Distinguish statistical from clinical significance and plan analyses to mitigate known sources of bias.'
            },
            {
                title: 'Diagnostic Accuracy & Screening',
                badge: 'Screening',
                subsections: [
                    {
                        heading: 'Screening Test Statistics',
                        items: [
                            'Sensitivity, specificity, PPV, NPV, likelihood ratios and area under ROC; consider spectrum effects and reference-standard bias.'
                        ]
                    },
                    {
                        heading: 'Likelihoods & Decision Tools',
                        items: [
                            'Likelihood ratios: LR+ >10 and LR- <0.1 generate decisive post-test shifts via Bayes.',
                            'Decision curves and net benefit help weigh harms vs benefits across thresholds.'
                        ]
                    },
                    {
                        heading: 'Screening Programmes & Metrics',
                        items: [
                            'Monitor uptake, interval cancers, lead-time and length-time bias; calculate number needed to screen when possible.'
                        ]
                    }
                ],
                note: 'Use ROC/AUC for discriminatory ability and decision curves or net benefit to weigh harms vs benefits.'
            },
            {
                title: 'Risk Communication & Outcomes',
                badge: 'Patient Communication',
                subsections: [
                    {
                        heading: 'Time-to-Event & Composite Outcomes',
                        items: [
                            'Report hazard ratios with median follow-up and proportional hazards checks (Cox models).',
                            'Composite outcomes: list dominant components; avoid masking single-outcome harm signals.'
                        ]
                    },
                    {
                        heading: 'NNT & Absolute Risk Reduction',
                        items: [
                            'Absolute Risk Reduction = control risk − treatment risk; NNT = 1 / ARR. Use ARR and NNT for patient-facing discussions.'
                        ]
                    },
                    {
                        heading: 'Effect Measures & Interpretation',
                        items: [
                            'Relative Risk, Odds Ratio and Hazard Ratio: understand denominator, baseline risk and time-dependency when interpreting.'
                        ]
                    }
                ],
                note: 'Use plain language summaries, icon arrays and absolute measures where possible to support shared decision-making.'
            },
            {
                title: 'Epidemiology Operations',
                badge: 'Outbreaks',
                subsections: [
                    {
                        heading: 'Basic Metrics',
                        items: [
                            'Incidence vs prevalence: incidence reflects new cases over time; prevalence rises with chronicity or survival.',
                            'Transmission metrics: R₀ describes intrinsic spread; Re reflects immunity and controls; aim for Re<1.'
                        ]
                    },
                    {
                        heading: 'Field Investigation',
                        items: [
                            'Define case definitions, build line lists, map epidemic curves, time-stamp exposures.'
                        ]
                    },
                    {
                        heading: 'Control & Response',
                        items: [
                            'Isolation/cohorting, vaccination/PPx, vector/environment control, targeted communications.'
                        ]
                    }
                ],
                note: 'Evaluate outbreak response using attack rates, secondary attack rates, and time-to-isolation.'
            },
            {
                title: 'Medical Ethics & Governance',
                badge: 'Ethics',
                subsections: [
                    {
                        heading: 'GMC: Good Medical Practice — Maintaining Trust',
                        items: [
                            'Act with honesty and integrity, put patients first, and maintain professional boundaries to preserve public trust.'
                        ]
                    },
                    {
                        heading: 'Intimate Examinations & Chaperones',
                        items: [
                            'Offer a chaperone for intimate examinations, document consent/refusal, and respect patient dignity and gender preferences.'
                        ]
                    },
                    {
                        heading: 'Patients Who Refuse Treatment',
                        items: [
                            'Explore reasons, ensure informed refusal (capacity + information), document discussion, and offer alternatives or escalation when safety concerns exist.'
                        ]
                    },
                    {
                        heading: 'Advance Directives & Advance Care Planning',
                        items: [
                            'Respect valid advance directives and advance decisions to refuse treatment; check applicability and record in the notes.'
                        ]
                    },
                    {
                        heading: 'GMC: Confidentiality (General)',
                        items: [
                            'Keep information confidential except where disclosure is required by law or justified in the public interest; share on a need-to-know basis.'
                        ]
                    },
                    {
                        heading: 'Using & Disclosing Patient Information for Direct Care',
                        items: [
                            'Share information accurately and securely with the team involved in direct care; obtain consent where appropriate and log disclosures.'
                        ]
                    },
                    {
                        heading: 'Reporting Criminal Proceedings',
                        items: [
                            'Follow local policies and legal requirements when reporting criminal activity; balance confidentiality with safety and legal duties.'
                        ]
                    },
                    {
                        heading: 'Mental Capacity Act',
                        items: [
                            'Assess capacity for specific decisions, apply best interests principles, involve consultees and document reasoning carefully.'
                        ]
                    },
                    {
                        heading: 'Consent (Including Capacity Issues)',
                        items: [
                            'Obtain informed consent: explain nature, benefits, risks and alternatives; for incapacity follow MCA and involve appropriate surrogates.'
                        ]
                    },
                    {
                        heading: 'Death Certification & Notifiable Deaths',
                        items: [
                            'Complete death certification accurately; notify coroners or public health authorities for reportable deaths as required by law.'
                        ]
                    },
                    {
                        heading: 'Controlled Drugs',
                        items: [
                            'Prescribe, record and store controlled drugs following legal/regulatory requirements; monitor for diversion and document rationale for use.'
                        ]
                    },
                    {
                        heading: 'Decisions Relating to CPR',
                        items: [
                            'Discuss CPR candidacy with patients where appropriate, document DNACPR decisions and communicate to the team and care settings.'
                        ]
                    },
                    {
                        heading: "GMC: Doctor's Health",
                        items: [
                            'Seek support if health (mental or physical) affects practice; employers and regulators expect clinicians to act to protect patients.'
                        ]
                    },
                    {
                        heading: 'Clinical Audit & Quality Improvement',
                        items: [
                            'Engage in audit cycles and QI projects to improve care; ensure governance and patient data safeguards during review.'
                        ]
                    },
                    {
                        heading: 'Confirmation of Death',
                        items: [
                            'Follow accepted clinical criteria for confirming death and document findings; liaise with senior staff and bereavement services.'
                        ]
                    },
                    {
                        heading: 'DVLA: Psychiatric Disorders',
                        items: [
                            'Advise patients about driving and report to DVLA where statutory duties require, balancing patient confidentiality with public safety.'
                        ]
                    },
                    {
                        heading: 'Gifts from Patients',
                        items: [
                            'Accept small gifts with courtesy but decline large or influential gifts; declare and seek advice for potential conflicts.'
                        ]
                    },
                    {
                        heading: 'Teaching, Training & Assessment',
                        items: [
                            'Supervise and assess trainees fairly, document feedback, and maintain patient safety during teaching encounters.'
                        ]
                    },
                    {
                        heading: 'Good Medical Practice — Communication, Partnership & Teamwork',
                        items: [
                            'Communicate clearly, work collaboratively with colleagues, and involve patients and carers in shared decision-making.'
                        ]
                    }
                ],
                note: 'Follow jurisdictional law and GMC guidance; document decisions, capacity assessments and disclosures carefully.'
            },
            {
                title: 'Data Stewardship & Research',
                badge: 'Data',
                subsections: [
                    {
                        heading: 'Data Principles',
                        items: [
                            'Data minimisation: collect only necessary fields; de-identify for teaching/research when possible.'
                        ]
                    },
                    {
                        heading: 'Access & Governance',
                        items: [
                            'Role-based permissions, audit trails, incident reporting, ethics approval, and clear controller/processor responsibilities.'
                        ]
                    },
                    {
                        heading: 'Documentation',
                        items: [
                            'Version-controlled protocols, statistical analysis plans, and adverse event monitoring.'
                        ]
                    }
                ],
                note: 'Combine technical safeguards (encryption, backups) with human factors (training, clear SOPs).'
            },
            {
                title: 'Quality Improvement & Safety',
                badge: 'QI',
                subsections: [
                    {
                        heading: 'Improvement Framework',
                        items: [
                            'Model for improvement: aim → measures → PDSA cycles with small tests of change.'
                        ]
                    },
                    {
                        heading: 'Measurement & Human Factors',
                        items: [
                            'Outcome/process/balancing measures; standardise handovers, checklists, and forced functions for high-risk steps.'
                        ]
                    },
                    {
                        heading: 'Sustainability',
                        items: [
                            'Embed ownership, visual dashboards, and post-implementation audits.'
                        ]
                    }
                ],
                note: 'Close the loop with “act” steps—adopt, adapt, or abandon based on run-chart signals and SPC rules.'
            }
        ];
    }

    /**
     * Basic counts for analytics/telemetry hooks
     */
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

    /**
     * Render the knowledge cards into the provided panel
     * @param {HTMLElement} panel - target panel element
     */
    render(panel) {
        if (!panel) {
            console.error('MedStatsEthicsManager: render called without panel');
            return;
        }

        const container = panel.querySelector('#med-stats-ethics-container') || panel;
        container.innerHTML = this.sections
            .map(section => this.renderCard(section))
            .join('');

        panel.scrollTop = 0;
        container.scrollTop = 0;
    }
    renderCard(section) {
        const badge = section.badge ? `<span class="badge" style="background: rgba(99,102,241,0.1); color: var(--v2-primary); padding: 4px 8px; border-radius: 999px; font-size: 12px; margin-left: 6px;">${section.badge}</span>` : '';
        const note = section.note ? `<div class="med-knowledge-note">${section.note}</div>` : '';

        // Render either the new subsections structure or fall back to the legacy items array
        let subsectionsHtml = '';
        if (Array.isArray(section.subsections)) {
            subsectionsHtml = section.subsections.map(ss => `
                <div class="med-knowledge-subsection">
                    <h5>${ss.heading || ''}</h5>
                    <ul>
                        ${(ss.items || []).map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    ${ss.note ? `<div class="med-knowledge-subnote">${ss.note}</div>` : ''}
                </div>
            `).join('');
        } else {
            // Legacy fallback
            const listItems = (section.items || []).map(item => `<li>${item}</li>`).join('');
            subsectionsHtml = `<ul>${listItems}</ul>`;
        }

        return `
            <section class="med-knowledge-card">
                <h4>${section.title}${badge}</h4>
                ${subsectionsHtml}
                ${note}
            </section>
        `;
    }
}

export const medStatsEthicsManager = new MedStatsEthicsManager();
export default medStatsEthicsManager;
