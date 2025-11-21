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
                items: [
                    'Study design: RCTs for causality; cohort for risk estimation; case-control for rare outcomes.',
                    'Hypothesis testing: p-value is probability of data under null—not a measure of effect size.',
                    'Confidence intervals: direction, precision, and overlap with null communicate certainty.',
                    'Effect size: always pair relative measures (RR/OR/HR) with absolute risk reduction and NNT.'
                ],
                note: 'Adjust for multiple testing (Bonferroni/FDR) and pre-specify primary outcomes to avoid data dredging.'
            },
            {
                title: 'Validity, Bias & Power',
                badge: 'Critical Appraisal',
                items: [
                    'Internal validity: randomization, allocation concealment, blinding, and minimal loss to follow-up.',
                    'External validity: population similarity, care setting, co-interventions, and outcome applicability.',
                    'Bias checks: selection bias (sampling), measurement bias (instrument/calibration), confounding (incomplete adjustment).',
                    'Power & sample size: driven by alpha, beta, event rate, expected effect, and variability.'
                ],
                note: 'Distinguish statistical from clinical significance when interpreting underpowered or overpowered studies.'
            },
            {
                title: 'Diagnostic Accuracy & Screening',
                badge: 'Screening',
                items: [
                    'Sensitivity/Specificity: rule-out vs rule-in; track reference standard quality.',
                    'Predictive values: PPV/NPV shift with prevalence—quote population context.',
                    'Likelihood ratios: LR+ >10 and LR- <0.1 generate decisive post-test shifts via Bayes.',
                    'Screening programmes: monitor interval cancers, uptake, and number needed to screen to prevent harm.'
                ],
                note: 'Use ROC/AUC for discriminatory ability and decision curves or net benefit to weigh harms vs benefits.'
            },
            {
                title: 'Risk Communication & Outcomes',
                badge: 'Patient Communication',
                items: [
                    'Time-to-event outcomes: report hazard ratios with median follow-up and proportional hazards checks.',
                    'Composite outcomes: list dominant components; avoid masking single-outcome harm signals.',
                    'Minimal clinically important difference (MCID): pair with patient preferences and baseline risk.',
                    'Harms: absolute risk increase, number needed to harm, and transparent reporting of withdrawals/adverse events.'
                ],
                note: 'Use plain language summaries and icon arrays where possible to support shared decision-making.'
            },
            {
                title: 'Epidemiology Operations',
                badge: 'Outbreaks',
                items: [
                    'Incidence vs prevalence: incidence reflects new cases over time; prevalence rises with chronicity or survival.',
                    'Transmission metrics: R₀ describes intrinsic spread; Re reflects immunity and controls; aim for Re<1.',
                    'Field investigation: define case definitions, build line lists, map epidemic curves, time-stamp exposures.',
                    'Control layers: isolation/cohorting, vaccination/PPx, vector/environment control, targeted communications.'
                ],
                note: 'Evaluate outbreak response using attack rates, secondary attack rates, and time-to-isolation.'
            },
            {
                title: 'Medical Ethics & Governance',
                badge: 'Ethics',
                items: [
                    'Principles: autonomy, beneficence, non-maleficence, justice; document value-based trade-offs.',
                    'Consent: presume capacity, support understanding, record voluntariness and material risks discussed.',
                    'Safeguarding: disclose minimum necessary information when safety/public health overrides confidentiality.',
                    'Escalation: seek senior review/ethics committee when conflicts arise; record rationale and patient voice.'
                ],
                note: 'Follow jurisdictional law (e.g., Mental Capacity, Gillick competence) and honor best-interest standards.'
            },
            {
                title: 'Data Stewardship & Research',
                badge: 'Data',
                items: [
                    'Data minimisation: collect only necessary fields; de-identify for teaching/research when possible.',
                    'Access control: role-based permissions, audit trails, and incident reporting for breaches.',
                    'Research governance: ethics approval, data controller/processor clarity, consent pathways for secondary use.',
                    'Documentation: version-controlled protocols, statistical analysis plans, and adverse event monitoring.'
                ],
                note: 'Combine technical safeguards (encryption, backups) with human factors (training, clear SOPs).'
            },
            {
                title: 'Quality Improvement & Safety',
                badge: 'QI',
                items: [
                    'Model for improvement: aim → measures → PDSA cycles with small tests of change.',
                    'Measure types: outcome (patient impact), process (adherence), balancing (unintended consequences).',
                    'Human factors: standardise handovers, checklists, and forced functions for high-risk steps.',
                    'Sustainability: embed ownership, visual dashboards, and post-implementation audits.'
                ],
                note: 'Close the loop with “act” steps—adopt, adapt, or abandon based on run-chart signals and SPC rules.'
            }
        ];
    }

    /**
     * Basic counts for analytics/telemetry hooks
     */
    getStatistics() {
        return {
            totalSections: this.sections.length,
            totalPoints: this.sections.reduce((count, section) => count + (section.items?.length || 0), 0)
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
        const listItems = (section.items || []).map(item => `<li>${item}</li>`).join('');
        const note = section.note ? `<div class="med-knowledge-note">${section.note}</div>` : '';

        return `
            <section class="med-knowledge-card">
                <h4>${section.title}${badge}</h4>
                <ul>${listItems}</ul>
                ${note}
            </section>
        `;
    }
}

export const medStatsEthicsManager = new MedStatsEthicsManager();
export default medStatsEthicsManager;
