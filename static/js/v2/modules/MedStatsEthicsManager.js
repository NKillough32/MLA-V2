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
                            'RCTs, cohort, case-control, cross-sectional and ecological designs; choose design to match causal question and feasibility.',
                            'Example: To test if a new drug reduces heart attacks, use RCT (gold standard for causality) over observational cohort (confounding risk).',
                            'Worked example: Investigating smoking and lung cancer - case-control study compares 500 lung cancer patients (cases) vs 500 healthy controls, finding OR=5.2 for smoking history.'
                        ]
                    },
                    {
                        heading: 'Clinical Trial Phases & Drug Development',
                        items: [
                            'Phase I: safety and dose-finding; Phase II: signal and dose-ranging; Phase III: definitive efficacy; Phase IV: post-marketing surveillance.',
                            'Drug development moves from preclinical safety through phased human trials with increasing sample sizes and endpoints.',
                            'Example: Phase I (n=20-100 healthy volunteers) tests safety; Phase II (n=100-500 patients) tests efficacy signal; Phase III (n=1000-5000) confirms benefits.',
                            'Worked example: COVID-19 vaccine trials progressed from Phase I (safety in 45 volunteers) to Phase II/III (efficacy in 43,000+ participants) in months.'
                        ]
                    },
                    {
                        heading: 'Significance Tests  -  Types & Interpretation',
                        items: [
                            'Parametric tests: t-test, ANOVA, linear regression; non-parametric: Mann–Whitney, Kruskal–Wallis.',
                            'Categorical tests: chi-square, Fisher exact; time-to-event: log-rank and Cox proportional hazards (yields hazard ratios).',
                            'Interpret p-values alongside effect sizes and CIs; avoid dichotomous thinking (significant vs not).',
                            'Example: Compare mean blood pressure between two groups - paired t-test if same patients before/after; unpaired t-test for different groups.',
                            'Worked example: Drug A vs placebo for cholesterol reduction. t-test shows mean difference -25mg/dL (95% CI: -30 to -20), p<0.001. Clinically meaningful despite small p-value.'
                        ]
                    },
                    {
                        heading: 'Confidence Intervals & Standard Error',
                        items: [
                            'CIs quantify estimate precision; SEM describes sampling variability of the mean (SD / √n).',
                            'Use 95% CIs for typical reporting and highlight clinical as well as statistical relevance.',
                            'Example: Mean cholesterol 180mg/dL ± 5mg/dL (SEM) vs 95% CI 170-190mg/dL (precision around estimate).',
                            'Worked example: Survey of 100 patients shows 65% satisfaction. 95% CI = 65% ± 9.8% (55.2-74.8%). Wider CI indicates less precision than if n=400 (CI ±4.9%).'
                        ]
                    },
                    {
                        heading: 'Effect Measures (RR / OR / HR) & NNT/ARR',
                        items: [
                            'Relative Risk and Odds Ratio describe relative differences; Hazard Ratio describes instantaneous event-rate ratios in survival analysis.',
                            'Absolute Risk Reduction = control risk − treatment risk; NNT = 1 / ARR (use absolute measures for patient communication).',
                            'Example: Vaccine reduces infection risk from 10% to 2%: RR=0.2, ARR=8%, NNT=12.5 (treat 13 to prevent 1 infection).',
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
                            'Example: SD=10 for outcome, want to detect 5-unit difference - need n=64 per group for 80% power (2×(1.96+0.84)²×SD²/effect²).',
                            'Worked example: Pilot study (n=30) shows SD=15 for pain score. To detect 3-point difference with 80% power: n=392 per group. Pilot was underpowered.'
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
                            'Example: Mammography for breast cancer: sensitivity 85% (detects 85% of cancers), specificity 90% (90% of normals are negative).',
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
                            'Example: Vaginal examination - offer chaperone, document patient\'s choice, ensure privacy and comfort.',
                            'Worked example: Male patient requests female chaperone for prostate exam. Doctor arranges appropriate chaperone, documents consent, proceeds with examination respecting patient preferences.'
                        ]
                    },
                    {
                        heading: 'Patients Who Refuse Treatment',
                        items: [
                            'Explore reasons, ensure informed refusal (capacity + information), document discussion, and offer alternatives or escalation when safety concerns exist.',
                            'Example: Patient refuses life-saving surgery. Explore fears, confirm understanding, document discussion, involve family if appropriate.',
                            'Worked example: Patient with pneumonia refuses antibiotics. Doctor explores concerns (side effects, natural healing belief), confirms capacity, documents discussion, offers oral alternatives before considering MCA assessment.'
                        ]
                    },
                    {
                        heading: 'Advance Directives & Advance Care Planning',
                        items: [
                            'Respect valid advance directives and advance decisions to refuse treatment; check applicability and record in the notes.',
                            'Example: Patient has DNACPR order. Confirm validity, applicability to current situation, document review in notes.',
                            'Worked example: Elderly patient admitted with chest infection has advance directive refusing ventilation. Team reviews directive, confirms it applies, documents decision, provides palliative care instead.'
                        ]
                    },
                    {
                        heading: 'GMC: Confidentiality (General)',
                        items: [
                            'Keep information confidential except where disclosure is required by law or justified in the public interest; share on a need-to-know basis.',
                            'Example: Patient\'s HIV status - only share with treating team; never discuss in public areas or with family without consent.',
                            'Worked example: Patient discloses domestic abuse. Doctor maintains confidentiality but discusses with patient the option of involving social services. No disclosure without consent.'
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
                            'Example: Patient admits to drink-driving. Report to authorities if poses ongoing risk; document decision-making.',
                            'Worked example: Patient confesses child abuse. Doctor reports to social services and police as required by law, documents actions taken, supports patient through process.'
                        ]
                    },
                    {
                        heading: 'Mental Capacity Act',
                        items: [
                            'Assess capacity for specific decisions, apply best interests principles, involve consultees and document reasoning carefully.',
                            'Example: Patient with dementia - assess capacity for treatment decision using MCA framework; involve family as consultees if appropriate.',
                            'Worked example: Confused patient needs surgery. Doctor assesses capacity (understand information, retain, weigh up, communicate), finds lacks capacity, applies best interests, documents assessment.'
                        ]
                    },
                    {
                        heading: 'Consent (Including Capacity Issues)',
                        items: [
                            'Obtain informed consent: explain nature, benefits, risks and alternatives; for incapacity follow MCA and involve appropriate surrogates.',
                            'Example: Surgery consent - explain procedure, risks, benefits, alternatives; document discussion and consent.',
                            'Worked example: Patient consents to chemotherapy. Doctor explains treatment, side effects, alternatives (palliative care), addresses questions, obtains written consent, documents discussion.'
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
     * Theme-aware palette for inline rendering (respects CSS variables + dark mode)
     */
    getThemeContext() {
        const fallback = {
            primary: '#6366f1',
            primaryRgb: '99, 102, 241',
            subtext: '#475569',
            summaryColor: '#111827'
        };

        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return {
                badgeBg: `rgba(${fallback.primaryRgb}, 0.12)`,
                badgeColor: fallback.primary,
                subsectionBg: 'rgba(15, 23, 42, 0.03)',
                subsectionBorder: 'rgba(15, 23, 42, 0.1)',
                subnoteColor: 'rgba(55, 65, 81, 0.85)',
                summaryColor: fallback.summaryColor,
                subtext: fallback.subtext
            };
        }

        const primary = this.getCssVar('--v2-primary', fallback.primary);
        const primaryRgb = this.getCssVar('--v2-primary-rgb', fallback.primaryRgb);
        const isDark = (document.documentElement?.dataset?.theme || '').toLowerCase() === 'dark';
        const summaryColor = isDark ? this.getCssVar('--v2-primary-light', primary) : primary;

        return {
            badgeBg: `rgba(${primaryRgb}, ${isDark ? 0.22 : 0.12})`,
            badgeColor: primary,
            subsectionBg: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.03)',
            subsectionBorder: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(15, 23, 42, 0.1)',
            subnoteColor: isDark ? 'rgba(226, 232, 240, 0.9)' : 'rgba(55, 65, 81, 0.85)',
            summaryColor,
            subtext: this.getCssVar('--v2-text-secondary', fallback.subtext)
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
