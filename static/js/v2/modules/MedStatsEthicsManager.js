/**
 * MedStatsEthicsManager.js - Centralized renderer for medical statistics,
 * epidemiology, and ethics reference content.
 *
 * Bayes conversion (practical): pre-test odds = p / (1 - p). post-test odds = pre-test odds * LR. post-test probability = post-test odds / (1 + post-test odds).
 * Worked example: PSA test LR+ = 2.5, LR- = 0.6. Pre-test probability 10% → pre-test odds = 0.1 / 0.9 = 0.111. Positive: post odds = 0.111*2.5=0.277 → post-prob = 0.277/(1+0.277)=0.217 → 21.7%. Negative: post odds = 0.111*0.6=0.067 → post-prob = 6.2%.
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
     * Ensure the component CSS is injected once. Uses prefers-color-scheme to
     * provide improved dark-mode colours instead of relying on inline RGBA.
     */
    ensureStyles() {
        if (document.getElementById('med-stats-ethics-styles')) return;
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
            /* Let inline styles / computed palette provide the precise summary colour - use inherit as a safe default */
            .med-knowledge-subsection summary {
                cursor: pointer;
                font-weight: 600;
                color: inherit;
                margin-bottom: 8px;
                list-style: none;
            }
            .med-knowledge-subsection ul { margin: 0; padding-left: 20px; color: inherit; }
            .med-knowledge-subnote { margin-top: 8px; font-style: italic; color: rgba(15,23,42,0.65); }

            /* Dark mode adjustments: ensure high contrast text on dark surfaces */
            @media (prefers-color-scheme: dark) {
                .med-knowledge-subsection {
                    border: 1px solid rgba(255,255,255,0.06);
                    background: rgba(6, 10, 26, 0.72);
                    color: rgba(226,232,240,0.98); /* near-white text for contrast */
                }
                .med-knowledge-subsection summary { color: inherit; }
                .med-knowledge-subnote { color: rgba(226,232,240,0.9); }
            }

            /* Explicit theme toggle support (data-theme="dark") to match in-app switch */
            [data-theme="dark"] .med-knowledge-subsection {
                border: 1px solid rgba(255,255,255,0.08);
                background: rgba(6, 10, 26, 0.82);
                color: rgba(226,232,240,0.98);
                box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
            }
            [data-theme="dark"] .med-knowledge-subsection summary { color: inherit; }
            [data-theme="dark"] .med-knowledge-subnote { color: rgba(226,232,240,0.9); }
        `;
        const style = document.createElement('style');
        style.id = 'med-stats-ethics-styles';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
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
                            'RCTs, cohort, case-control, cross-sectional and ecological designs; choose design to match causal question, timelines and feasibility.',
                            'Example: To test if a new drug reduces heart attacks, use RCT (gold standard for causality) over observational cohort (confounding risk); pragmatic trials help when strict controls are impractical.',
                            'Worked example: Investigating smoking and lung cancer - case-control study compares 500 lung cancer patients (cases) vs 500 healthy controls, finding OR=5.2 for smoking history. Matching on age/sex and adjusting for asbestos exposure strengthens causal interpretation.'
                        ]
                    },
                    {
                        heading: 'Clinical Trial Phases & Drug Development',
                        items: [
                            'Phase I: safety and dose-finding; Phase II: signal and dose-ranging; Phase III: definitive efficacy; Phase IV: post-marketing surveillance.',
                            'Drug development moves from preclinical safety through phased human trials with increasing sample sizes and endpoints.',
                            'Example: Phase I (n=20-100 healthy volunteers) tests safety; Phase II (n=100-500 patients) tests efficacy signal; Phase III (n=1000-5000) confirms benefits with predefined endpoints.',
                            'Worked example: COVID-19 vaccine trials progressed from Phase I (safety in 45 volunteers) to Phase II/III (efficacy in 43,000+ participants) in months, using DSMB oversight, adaptive stopping rules, and global recruitment to shorten timelines while preserving rigour.'
                        ]
                    },
                    {
                        heading: 'Significance Tests  -  Types & Interpretation',
                        items: [
                            'Parametric tests: t-test, ANOVA, linear regression; non-parametric: Mann–Whitney, Kruskal–Wallis.',
                            'Categorical tests: chi-square, Fisher exact; time-to-event: log-rank and Cox proportional hazards (yields hazard ratios). Check assumptions (normality, proportional hazards, independence).',
                            'Interpret p-values alongside effect sizes and CIs; avoid dichotomous thinking (significant vs not). Pre-specify primary endpoints and adjust for multiple comparisons.',
                            'Example: Compare mean blood pressure between two groups - paired t-test if same patients before/after; unpaired t-test for different groups; Wilcoxon alternatives if skewed.',
                            'Worked example: Drug A vs placebo for cholesterol reduction. t-test shows mean difference -25mg/dL (95% CI: -30 to -20), p<0.001. Clinically meaningful despite small p-value. Sensitivity analysis excluding statin users yields -22mg/dL (95% CI: -27 to -17) reinforcing robustness.'
                        ]
                    },
                    {
                        heading: 'Confidence Intervals & Standard Error',
                        items: [
                            'CIs quantify estimate precision; SEM describes sampling variability of the mean (SD / √n).',
                            'Use 95% CIs for typical reporting and highlight clinical as well as statistical relevance.',
                            'Practical formulas: SE(mean) = SD / sqrt(n). 95% CI(mean) ≈ mean ± 1.96 * SE (use the t_{n-1} quantile for small n). SE(proportion) = sqrt(p*(1-p)/n). For small n or p near 0 or 1, prefer Wilson or exact (Clopper–Pearson) CIs.',
                            'Example: Mean cholesterol 180 mg/dL with SD=25 and n=100 → SE = 25/√100 = 2.5. 95% CI ≈ 180 ± 1.96*2.5 = (175.1, 184.9).',
                            'Worked example (proportion): 65/100 satisfied → p=0.65, SE = sqrt(0.65*0.35/100)=0.0477. 95% CI ≈ 0.65 ± 1.96*0.0477 = (0.556, 0.744) i.e. 55.6%–74.4%. Use exact/Wilson intervals when n small.'
                        ]
                    },
                    {
                        heading: 'Effect Measures (RR / OR / HR) & NNT/ARR',
                        items: [
                            'Relative Risk and Odds Ratio describe relative differences; Hazard Ratio describes instantaneous event-rate ratios in survival analysis.',
                            'Absolute Risk Reduction = control risk − treatment risk; NNT = 1 / ARR (use absolute measures for patient communication).',
                            'Formulas & guidance: ARR = Rc − Rt. NNT = 1 / ARR (express ARR as a proportion, e.g. 0.08). When computing CIs for NNT, derive limits from the CI of ARR; if ARR CI crosses zero, NNT is not meaningful. Round NNT up to the next integer for benefit interpretation.',
                            'Example: Vaccine reduces infection risk from 10% to 2%: RR = 0.2. ARR = 0.10 − 0.02 = 0.08 → NNT = 1 / 0.08 = 12.5 → round up to 13. If 95% CI for ARR = (0.04, 0.12), NNT CI ≈ (8.3, 25) (interpret with caution).',
                            'Worked example: Statin trial: control group 10% heart attacks/year, treatment 6%. ARR=4%, NNT=25. OR=0.57 (odds of event reduced by 43%).'
                        ]
                    },
                    {
                        heading: 'Intention-To-Treat & Analysis Populations',
                        items: [
                            'Intention-to-treat preserves randomization by analysing participants in assigned groups; per-protocol and as-treated are complementary but prone to bias.',
                            'Example: Drug trial where 20% stop treatment - ITT includes all (preserves randomization); per-protocol excludes non-adherent (overestimates effect).',
                            'Worked example: Weight loss trial: ITT shows 3kg loss (includes dropouts); per-protocol shows 5kg loss (only completers). ITT is more conservative and realistic.'
                        ]
                    },
                    {
                        heading: 'Variance & Power',
                        items: [
                            'Variance (SD²) drives precision and sample-size calculations; power is the probability to detect an effect of a given size (1−β).',
                            'Underpowered studies risk false negatives; overpowered studies may detect trivial differences.',
                            'Key formula (two-sample means, equal n per group): n per group ≈ 2 * (Z_{1−α/2} + Z_{1−β})^2 * σ^2 / δ^2. For α=0.05 (Z≈1.96) and 80% power (Z≈0.84) this simplifies to the common approximation shown in worked examples below. Round up and inflate for expected dropout.',
                            'Worked numeric example: SD=10, δ=5, α=0.05, power=80% → n ≈ 2*(1.96+0.84)^2*(10^2)/(5^2) = 2*(2.8)^2*100/25 = 2*7.84*4 = 62.72 → round up to 63 per group; inflate by 10% → 70 per group.',
                            'Two-proportion approx. formula: n ≈ (Z_{1−α/2}^2 * (p1(1−p1)+p2(1−p2))) / (p1−p2)^2 — always round up and account for loss to follow-up.'
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
                            'Histogram, density plots and boxplots visualise distribution; normal distribution underpins many parametric tests.',
                            'Example: Blood pressure data - histogram shows bell-shaped curve; boxplot displays median, quartiles, outliers.',
                            'Worked example: 1000 patients\' cholesterol levels: mean 200mg/dL, SD 40mg/dL. 68% within 1SD (160-240), 95% within 2SD (120-280). Normal Q-Q plot confirms normality.'
                        ]
                    },
                    {
                        heading: 'Forest Plots',
                        items: [
                            'Forest plots display point estimates and CIs across studies or subgroups - useful for meta-analysis and subgroup summaries.',
                            'Example: Meta-analysis of 10 RCTs for drug efficacy - each horizontal line shows study result and CI; diamond shows pooled estimate.',
                            'Worked example: Aspirin for CVD prevention: 8 trials show RR 0.75-0.95. Forest plot reveals heterogeneity (I²=60%); pooled RR=0.82 (95% CI 0.76-0.89).'
                        ]
                    },
                    {
                        heading: 'Funnel Plots & Publication Bias',
                        items: [
                            'Funnel plots assess small-study effects/publication bias; asymmetry may indicate bias or heterogeneity.',
                            'Example: Plot effect size vs study precision (1/SE) - symmetric funnel suggests no bias; asymmetric suggests missing small negative studies.',
                            'Worked example: Vitamin D supplementation meta-analysis: funnel plot shows asymmetry with missing small studies showing no effect. Egger test p=0.03 confirms publication bias.'
                        ]
                    },
                    {
                        heading: 'Survival Plots & Kaplan–Meier',
                        items: [
                            'Kaplan–Meier curves show cumulative event-free probabilities over time; accompany with log-rank tests and HR estimates.',
                            'Example: Cancer treatment comparison - KM curves diverge early if treatment effective; censoring marks patients lost to follow-up.',
                            'Worked example: Chemo vs supportive care for lung cancer: 2-year survival 25% vs 10%, HR=0.65 (95% CI 0.52-0.81), log-rank p<0.001. Curves show separation at 6 months.'
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
                            'Randomization, allocation concealment, blinding, handling missing data and pre-specified analysis plans.',
                            'Example: RCT validity requires concealed randomization (participants can\'t predict assignment) and blinding (participants/double-blind).',
                            'Worked example: Pain medication trial: concealed randomization prevents selection bias; blinding prevents placebo effect differences. Missing data handled by multiple imputation.'
                        ]
                    },
                    {
                        heading: 'Bias Types',
                        items: [
                            'Selection bias, measurement/information bias, confounding, performance and detection bias; consider publication bias in syntheses.',
                            'Example: Selection bias - hospital controls exclude healthy people; confounding - smoking correlates with both coffee drinking and lung cancer.',
                            'Worked example: Drug trial at wealthy hospital - selection bias favors healthier patients. Confounding by socioeconomic status affects outcome interpretation.'
                        ]
                    },
                    {
                        heading: 'Reliability & Validity',
                        items: [
                            'Reliability (repeatability) vs validity (measuring the intended construct); ensure instruments and endpoints are validated.',
                            'Example: Blood pressure cuff - reliable (consistent readings) but invalid if faulty; depression scale - valid for depression but not anxiety.',
                            'Worked example: New diagnostic test: reliability (kappa=0.85 between observers); validity (sensitivity 90%, specificity 95% vs gold standard).'
                        ]
                    },
                    {
                        heading: 'Power & Sample Size',
                        items: [
                            'Sample size calculations require expected effect, variance, alpha and beta; consider interim analyses and multiplicity adjustments.',
                            'Example: Detect 10mmHg BP reduction, SD=15mmHg, 80% power, α=0.05: n=96 per group (2×(1.96+0.84)²×SD²/effect²).',
                            'Worked example: Pilot study shows effect size d=0.3. For 80% power: n=176 per group. Trial stopped early for futility when interim analysis showed no trend.'
                        ]
                    },
                    {
                        heading: 'Confounding & Adjustment',
                        items: [
                            'Identify potential confounders a priori and use stratification, multivariable models or propensity methods to mitigate bias.',
                            'Example: Age confounds treatment effect - use age-adjusted analysis or regression models controlling for age.',
                            'Worked example: Obesity study: BMI confounds diet-cancer link. Propensity score matching creates comparable diet groups by BMI. Adjusted OR drops from 2.5 to 1.2.'
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
                            'Sensitivity, specificity, PPV, NPV, likelihood ratios and area under ROC; consider spectrum effects and reference-standard bias.',
                            'Formulas (2x2 table): Sensitivity = TP/(TP+FN); Specificity = TN/(TN+FP); PPV = TP/(TP+FP); NPV = TN/(TN+FN); LR+ = Sensitivity/(1−Specificity); LR− = (1−Sensitivity)/Specificity.',
                            'Example: Mammography for breast cancer: sensitivity 85% (detects 85% of cancers), specificity 90% (90% of normals are negative).',
                            'Worked example with data: 1,000 patients tested; disease prevalence 10% → TP=80, FN=20, FP=18, TN=882. Sensitivity = 80/(80+20)=0.80; Specificity = 882/(882+18)=0.98; PPV = 80/(80+18)=0.82; NPV = 882/(882+20)=0.98; LR+ ≈ 40; LR− ≈ 0.20.',
                            'Worked example: COVID test: sensitivity 95%, specificity 98%. In low prevalence (1%), PPV=16% (many false positives); in high prevalence (20%), PPV=83%.'
                        ]
                    },
                    {
                        heading: 'Likelihoods & Decision Tools',
                        items: [
                            'Likelihood ratios: LR+ >10 and LR- <0.1 generate decisive post-test shifts via Bayes.',
                            'Decision curves and net benefit help weigh harms vs benefits across thresholds.',
                            'Example: D-dimer for PE: LR+ = 3.5 (modest increase in probability); LR- = 0.25 (useful to rule out).',
                            'Worked example: PSA test LR+ = 2.5, LR- = 0.6. Pre-test probability 10% for prostate cancer. Positive result: post-test prob = 22%; negative: 6%.'
                        ]
                    },
                    {
                        heading: 'Screening Programmes & Metrics',
                        items: [
                            'Monitor uptake, interval cancers, lead-time and length-time bias; calculate number needed to screen when possible.',
                            'Example: Breast screening: uptake 70%, interval cancers 20% of expected, lead-time bias overestimates survival benefit.',
                            'Worked example: Cervical screening program: screens 1000 women/year, detects 8 cancers. NNS = 125. Interval cancers = 2/year. Program sensitivity = 80%.'
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
                            'Interpretation note: HR is a relative measure of instantaneous risk—do not directly convert HR to absolute risk without a baseline hazard. Check proportional-hazards assumption (e.g., Schoenfeld residuals) and present median/absolute risks alongside HR where possible.',
                            'Composite outcomes: list dominant components; avoid masking single-outcome harm signals.',
                            'Example: Cardiovascular trial: composite of death, MI, stroke. HR=0.75 (25% risk reduction) but stroke increased - composite masks harm.',
                            'Worked example: Diabetes trial: composite endpoint (retinopathy, nephropathy, neuropathy). Treatment HR=0.7 but neuropathy worsened. Individual outcomes revealed trade-offs.'
                        ]
                    },
                    {
                        heading: 'NNT & Absolute Risk Reduction',
                        items: [
                            'Absolute Risk Reduction = control risk − treatment risk; NNT = 1 / ARR. Use ARR and NNT for patient-facing discussions.',
                            'Example: Drug reduces mortality from 2% to 1%: ARR=1%, NNT=100 (treat 100 to save 1 life).',
                            'Worked example: Statin for primary prevention: 5-year CVD risk 5% vs 3%. ARR=2%, NNT=50. Patient understands "50 people need treatment to prevent 1 heart problem".'
                        ]
                    },
                    {
                        heading: 'Effect Measures & Interpretation',
                        items: [
                            'Relative Risk, Odds Ratio and Hazard Ratio: understand denominator, baseline risk and time-dependency when interpreting.',
                            'Example: RR=0.8 means 20% relative reduction; baseline risk matters - RR=0.8 reduces 20% risk whether baseline is 2% or 20%.',
                            'Worked example: Cancer drug: RR=0.7 (30% relative reduction). For rare cancer (baseline 2%): ARR=0.6%, NNT=167. For common cancer (20%): ARR=6%, NNT=17.'
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
                            'Transmission metrics: R₀ describes intrinsic spread; Re reflects immunity and controls; aim for Re<1.',
                            'Example: COVID-19: incidence = new cases/day/100,000; prevalence = current active cases/total population.',
                            'Worked example: Disease X: incidence 50/100,000/year, prevalence 200/100,000. Average duration = prevalence/incidence = 4 years. R₀=2.5, Re=0.8 after interventions.'
                        ]
                    },
                    {
                        heading: 'Field Investigation',
                        items: [
                            'Define case definitions, build line lists, map epidemic curves, time-stamp exposures.',
                            'Example: Food poisoning outbreak - case definition includes symptoms + exposure to restaurant; epidemic curve shows point-source vs propagated outbreak.',
                            'Worked example: Salmonella outbreak: 47 cases, median incubation 24 hours. Line list shows all ate chicken at wedding. Epidemic curve peaks at day 1, confirming common exposure.'
                        ]
                    },
                    {
                        heading: 'Control & Response',
                        items: [
                            'Isolation/cohorting, vaccination/PPx, vector/environment control, targeted communications.',
                            'Example: Ebola outbreak: isolation of cases, contact tracing, safe burials, ring vaccination around cases.',
                            'Worked example: Measles outbreak in school: isolated 3 index cases, vaccinated 500 contacts within 72 hours. Attack rate dropped from 15% to 2% in exposed classrooms.'
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
                        heading: 'GMC: Good Medical Practice  -  Maintaining Trust',
                        items: [
                            'Act with honesty and integrity, put patients first, and maintain professional boundaries to preserve public trust.',
                            'Example: Disclose medical errors promptly and fully, even if not asked. Never alter records to hide mistakes.',
                            'Worked example: Junior doctor discovers senior colleague\'s error. Reports through proper channels while maintaining confidentiality. GMC guidance prioritizes patient safety over colleague protection.'
                        ]
                    },
                    {
                        heading: 'Intimate Examinations & Chaperones',
                        items: [
                            'Offer a chaperone for intimate examinations, document consent/refusal, and respect patient dignity and gender preferences.',
                            'Example: Vaginal examination - offer chaperone, document patient\'s choice, ensure privacy and comfort; explain steps aloud to maintain transparency.',
                            'Worked example: Male patient requests female chaperone for prostate exam. Doctor arranges appropriate chaperone, documents consent, proceeds with examination respecting patient preferences.',
                            'Scenario: Patient declines chaperone but appears uncertain. Clinician pauses, revisits explanation of role, offers rescheduling with trusted staff, and records the discussion to demonstrate respectful consent.'
                        ]
                    },
                    {
                        heading: 'Patients Who Refuse Treatment',
                        items: [
                            'Explore reasons, ensure informed refusal (capacity + information), document discussion, and offer alternatives or escalation when safety concerns exist.',
                            'Example: Patient refuses life-saving surgery. Explore fears, confirm understanding, document discussion, involve family if appropriate; safety-net with clear advice on when to return.',
                            'Worked example: Patient with pneumonia refuses antibiotics. Doctor explores concerns (side effects, natural healing belief), confirms capacity, documents discussion, offers oral alternatives before considering MCA assessment.',
                            'Scenario: Capacity borderline after head injury. Team repeats explanation at different times of day, involves next of kin, and escalates to senior/liaison psychiatry before concluding patient lacks capacity and proceeding in best interests.'
                        ]
                    },
                    {
                        heading: 'Advance Directives & Advance Care Planning',
                        items: [
                            'Respect valid advance directives and advance decisions to refuse treatment; check applicability and record in the notes.',
                            'Example: Patient has DNACPR order. Confirm validity, applicability to current situation, document review in notes and communicate clearly at handover.',
                            'Worked example: Elderly patient admitted with chest infection has advance directive refusing ventilation. Team reviews directive, confirms it applies, documents decision, provides palliative care instead.',
                            'Scenario: Advance directive unclear about non-invasive ventilation. Clinician discusses with family, checks prior conversations, and documents a time-limited NIV trial aligned with patient values.'
                        ]
                    },
                    {
                        heading: 'GMC: Confidentiality (General)',
                        items: [
                            'Keep information confidential except where disclosure is required by law or justified in the public interest; share on a need-to-know basis.',
                            'Example: Patient\'s HIV status - only share with treating team; never discuss in public areas or with family without consent. Consider anonymised teaching only when risk of identification is minimal.',
                            'Worked example: Patient discloses domestic abuse. Doctor maintains confidentiality but discusses with patient the option of involving social services. No disclosure without consent.',
                            'Scenario: Journalist requests comment about local celebrity admission. Clinician declines to confirm or deny, escalates to communications team, and documents the request/refusal to protect confidentiality.'
                        ]
                    },
                    {
                        heading: 'Using & Disclosing Patient Information for Direct Care',
                        items: [
                            'Share information accurately and securely with the team involved in direct care; obtain consent where appropriate and log disclosures.',
                            'Example: Share radiology results with surgical team; log all disclosures in patient record.',
                            'Worked example: Patient transferred between hospitals. Doctor obtains consent for information sharing, securely transmits records, documents disclosure in notes.'
                        ]
                    },
                    {
                        heading: 'Reporting Criminal Proceedings',
                        items: [
                            'Follow local policies and legal requirements when reporting criminal activity; balance confidentiality with safety and legal duties.',
                            'Example: Patient admits to drink-driving. Report to authorities if poses ongoing risk; document decision-making and rationale with senior review.',
                            'Worked example: Patient confesses child abuse. Doctor reports to social services and police as required by law, documents actions taken, supports patient through process.',
                            'Scenario: Gang-related knife injury with suspected retaliation risk. Team informs safeguarding lead, completes weapon injury reporting, and coordinates with police liaison while maintaining necessary clinical confidentiality.'
                        ]
                    },
                    {
                        heading: 'Mental Capacity Act',
                        items: [
                            'Assess capacity for specific decisions, apply best interests principles, involve consultees and document reasoning carefully.',
                            'Example: Patient with dementia - assess capacity for treatment decision using MCA framework; involve family as consultees if appropriate; assume capacity unless proven otherwise.',
                            'Worked example: Confused patient needs surgery. Doctor assesses capacity (understand information, retain, weigh up, communicate), finds lacks capacity, applies best interests, documents assessment.',
                            'Scenario: Fluctuating capacity in delirium. Team schedules consent discussions when alert, documents improvements/declines, and uses best-interests meeting when capacity cannot be sustained for the decision.'
                        ]
                    },
                    {
                        heading: 'Consent (Including Capacity Issues)',
                        items: [
                            'Obtain informed consent: explain nature, benefits, risks and alternatives; for incapacity follow MCA and involve appropriate surrogates.',
                            'Example: Surgery consent - explain procedure, risks, benefits, alternatives; document discussion and consent; provide written materials and time for questions.',
                            'Worked example: Patient consents to chemotherapy. Doctor explains treatment, side effects, alternatives (palliative care), addresses questions, obtains written consent, documents discussion.',
                            'Scenario: Language barrier and no family present. Clinician arranges professional interpreter, repeats explanations to confirm understanding, and defers consent until patient can engage meaningfully.'
                        ]
                    },
                    {
                        heading: 'Death Certification & Notifiable Deaths',
                        items: [
                            'Complete death certification accurately; notify coroners or public health authorities for reportable deaths as required by law.',
                            'Example: Cancer patient dies - certify if cause clear; refer to coroner if sudden, unexplained, or suspicious.',
                            'Worked example: Elderly patient dies after fall. Doctor reviews history, examines body, certifies natural causes. If suspicious bruising noted, refers to coroner instead.'
                        ]
                    },
                    {
                        heading: 'Controlled Drugs',
                        items: [
                            'Prescribe, record and store controlled drugs following legal/regulatory requirements; monitor for diversion and document rationale for use.',
                            'Example: Opioid prescription - follow guidelines, monitor for misuse signs, document indications and monitoring.',
                            'Worked example: Patient needs morphine for pain. Doctor prescribes minimal effective dose, documents rationale, arranges follow-up, monitors for dependence signs.'
                        ]
                    },
                    {
                        heading: 'Decisions Relating to CPR',
                        items: [
                            'Discuss CPR candidacy with patients where appropriate, document DNACPR decisions and communicate to the team and care settings.',
                            'Example: Frail elderly patient - discuss CPR futility, document DNACPR decision, ensure all staff aware.',
                            'Worked example: Terminal cancer patient. Doctor discusses prognosis, explains CPR unlikely to work, obtains consent for DNACPR, documents discussion, communicates to ward team.'
                        ]
                    },
                    {
                        heading: "GMC: Doctor's Health",
                        items: [
                            'Seek support if health (mental or physical) affects practice; employers and regulators expect clinicians to act to protect patients.',
                            'Example: Doctor with depression - seek help early, inform employer if affects work, take sick leave if needed.',
                            'Worked example: Stressed junior doctor makes prescribing error. Recognizes burnout contribution, seeks counseling, reports incident, takes time off to recover.'
                        ]
                    },
                    {
                        heading: 'Clinical Audit & Quality Improvement',
                        items: [
                            'Engage in audit cycles and QI projects to improve care; ensure governance and patient data safeguards during review.',
                            'Example: Audit antibiotic prescribing - collect data, benchmark against standards, implement changes, re-audit.',
                            'Worked example: Ward audit shows 30% inappropriate antibiotic use. Team implements education and guidelines, re-audit shows improvement to 10%.'
                        ]
                    },
                    {
                        heading: 'Confirmation of Death',
                        items: [
                            'Follow accepted clinical criteria for confirming death and document findings; liaise with senior staff and bereavement services.',
                            'Example: Confirm brainstem death using strict criteria; document examination findings and time of death.',
                            'Worked example: ICU patient brain dead after trauma. Two doctors perform independent examinations confirming brainstem death criteria, document findings, inform family.'
                        ]
                    },
                    {
                        heading: 'DVLA: Psychiatric Disorders',
                        items: [
                            'Advise patients about driving and report to DVLA where statutory duties require, balancing patient confidentiality with public safety.',
                            'Example: Patient with psychosis - advise about driving risks, report to DVLA if poses danger to public.',
                            'Worked example: Patient develops severe depression. Doctor advises stopping driving, discusses with patient, reports to DVLA as required for safety.'
                        ]
                    },
                    {
                        heading: 'Gifts from Patients',
                        items: [
                            'Accept small gifts with courtesy but decline large or influential gifts; declare and seek advice for potential conflicts.',
                            'Example: Patient offers bottle of wine - accept with thanks; expensive watch - politely decline and explain policy.',
                            'Worked example: Grateful patient offers £500 gift. Doctor declines politely, explains GMC guidance, suggests donation to charity instead.'
                        ]
                    },
                    {
                        heading: 'Teaching, Training & Assessment',
                        items: [
                            'Supervise and assess trainees fairly, document feedback, and maintain patient safety during teaching encounters.',
                            'Example: Medical student examination - supervise closely, provide constructive feedback, ensure patient comfort.',
                            'Worked example: Student performs venipuncture. Supervisor guides technique, provides immediate feedback, documents competency assessment.'
                        ]
                    },
                    {
                        heading: 'Good Medical Practice  -  Communication, Partnership & Teamwork',
                        items: [
                            'Communicate clearly, work collaboratively with colleagues, and involve patients and carers in shared decision-making.',
                            'Example: Handover - use SBAR format, ensure information transfer, confirm understanding.',
                            'Worked example: Complex discharge planning. Doctor communicates with patient, family, nurses, therapists, social worker. Documents shared decisions, ensures follow-up arranged.'
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
                            'Data minimisation: collect only necessary fields; de-identify for teaching/research when possible.',
                            'Example: Research database - collect only age, sex, diagnosis; remove names, addresses, full dates.',
                            'Worked example: COVID study needs vaccination status and outcomes. Collect minimal identifiers (study ID only), de-identify data for analysis, destroy identifiers after linkage.'
                        ]
                    },
                    {
                        heading: 'Access & Governance',
                        items: [
                            'Role-based permissions, audit trails, incident reporting, ethics approval, and clear controller/processor responsibilities.',
                            'Example: Electronic health record - clinicians access patient data; researchers get de-identified extracts only.',
                            'Worked example: Hospital database breach. Incident reported immediately, access logs reviewed, affected patients informed, governance review conducted.'
                        ]
                    },
                    {
                        heading: 'Documentation',
                        items: [
                            'Version-controlled protocols, statistical analysis plans, adverse event monitoring.',
                            'Example: Clinical trial - preregister protocol, document amendments, maintain audit trail of changes.',
                            'Worked example: Drug safety study. SAP specifies primary analysis (ITT), secondary analyses, subgroup analyses. All deviations documented and justified.'
                        ]
                    },
                    {
                        heading: 'AI/ML & Bias Guardrails',
                        items: [
                            'Audit datasets for imbalance, drift, missingness, and label quality before model training; refresh cohorts regularly.',
                            'Fairness review: track subgroup performance (sex, age, ethnicity), document mitigation steps, and set go/no-go thresholds.',
                            'Operational safety: keep humans in the loop for overrides, log model-assisted decisions, and roll back or retrain on alert triggers.'
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
                            'Model for improvement: aim → measures → PDSA cycles with small tests of change.',
                            'Example: Reduce hospital falls - aim: 50% reduction; measure: falls/month; PDSA: test bed alarms on one ward.',
                            'Worked example: Medication error reduction. Aim: 30% fewer errors. Measure: errors per 1000 doses. PDSA cycle: barcode scanning trial on pilot ward, then spread.'
                        ]
                    },
                    {
                        heading: 'Measurement & Human Factors',
                        items: [
                            'Outcome/process/balancing measures; standardise handovers, checklists, and forced functions for high-risk steps.',
                            'Example: Surgical safety checklist - standardised briefing, verification, debriefing reduces complications.',
                            'Worked example: Central line infections. Process measure: checklist compliance 95%. Outcome: infections drop from 5 to 1 per 1000 line-days. Balancing measure: insertion time unchanged.'
                        ]
                    },
                    {
                        heading: 'Sustainability',
                        items: [
                            'Embed ownership, visual dashboards, and post-implementation audits.',
                            'Example: Hand hygiene campaign - champions on each ward, daily audits, public dashboards showing compliance.',
                            'Worked example: Falls prevention bundle. Ward champions trained, visual cues placed, monthly audits. After 6 months, compliance 90%, falls reduced 40%, sustained for 2 years.'
                        ]
                    }
                ],
                note: 'Close the loop with “act” steps - adopt, adapt, or abandon based on run-chart signals and SPC rules.'
            },
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
     * Theme-aware palette for inline rendering (respects CSS variables + dark mode)
     */
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
                // keep SSR output consistent with CSS defaults (light surface)
                subsectionBg: '#ffffff',
                subsectionBorder: 'rgba(15, 23, 42, 0.1)',
                subnoteColor: 'rgba(55, 65, 81, 0.85)',
                summaryColor: fallback.summaryColor,
                subtext: fallback.subtext
            };
        }

        const primary = this.getCssVar('--v2-primary', fallback.primary);
        const primaryRgb = this.getCssVar('--v2-primary-rgb', fallback.primaryRgb);
        // Respect either the explicit in-app theme toggle or the user's OS/UA
        // preference so JS-driven inline styles won't force light colours when
        // the system prefers dark mode.
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

    /**
     * Safe getter for CSS variables (handles SSR/tests without DOM)
     */
    getCssVar(name, fallback) {
        try {
            const value = getComputedStyle(document.documentElement).getPropertyValue(name);
            return value ? value.trim() || fallback : fallback;
        } catch (err) {
            return fallback;
        }
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
        // Ensure theme-aware styles are available before rendering
        try { this.ensureStyles(); } catch (e) { /* ignore if DOM not ready */ }

        const container = panel.querySelector('#med-stats-ethics-container') || panel;
        const theme = this.getThemeContext();
        container.innerHTML = this.sections
            .map(section => this.renderCard(section, theme))
            .join('');

        panel.scrollTop = 0;
        container.scrollTop = 0;
    }
    renderCard(section, theme) {
        const palette = theme || this.getThemeContext();
        const badge = section.badge ? `<span class="badge" style="background: ${palette.badgeBg}; color: ${palette.badgeColor}; padding: 4px 8px; border-radius: 999px; font-size: 12px; margin-left: 6px;">${section.badge}</span>` : '';
        const note = section.note ? `<div class="med-knowledge-note">${section.note}</div>` : '';

        // Render either the new subsections structure or fall back to the legacy items array
        let subsectionsHtml = '';
        if (Array.isArray(section.subsections)) {
            subsectionsHtml = section.subsections.map(ss => `
                <details class="med-knowledge-subsection" style="border: 1px solid ${palette.subsectionBorder}; border-radius: 10px; padding: 12px; margin-bottom: 10px; background: ${palette.subsectionBg};">
                    <summary style="cursor: pointer; font-weight: 650; color: ${palette.summaryColor}; margin-bottom: 8px;">${ss.heading || ''}</summary>
                    <ul style="margin: 0; padding-left: 20px; color: ${palette.subtext};">
                        ${(ss.items || []).map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    ${ss.note ? `<div class="med-knowledge-subnote" style="margin-top: 8px; font-style: italic; color: ${palette.subnoteColor};">${ss.note}</div>` : ''}
                </details>
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
