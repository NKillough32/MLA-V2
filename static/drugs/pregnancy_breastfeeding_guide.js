/**
 * PregnancyBreastfeedingManager.js
 * Comprehensive reference for drug safety in pregnancy and breastfeeding
 * Provides rapid reference content for contraindicated drugs and safe alternatives
 */
class PregnancyBreastfeedingManager {
    constructor() {
        this.sections = this.buildSections();
        this.searchTerm = '';
        this.container = null;
        this.version = "1.0.0";
        this.lastUpdated = "2026-02-05";
    }

    async initialize() {
        return Promise.resolve();
    }

    getStatistics() {
        const drugSection = this.sections.find(s => Array.isArray(s.drugs));
        const totalDrugs = drugSection ? drugSection.drugs.length : 0;
        return {
            totalSections: this.sections.length,
            totalDrugs
        };
    }

    ensureStyles() {
        if (document.querySelector('#pregnancy-bf-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'pregnancy-bf-styles';
        style.textContent = `
            .pregnancy-search-container {
                margin-bottom: 20px;
                position: relative;
            }
            .pregnancy-search-input {
                width: 100%;
                padding: 12px 16px;
                border: 1px solid rgba(15,23,42,0.12);
                border-radius: 10px;
                font-size: 1rem;
                background: #fff;
                transition: border-color 0.2s, box-shadow 0.2s;
            }
            .pregnancy-search-input:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
            }
            .pregnancy-search-stats {
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                color: #64748b;
                font-size: 0.875rem;
                pointer-events: none;
            }
            
            .pregnancy-card {
                background: #fff;
                border: 1px solid rgba(15,23,42,0.08);
                border-radius: 12px;
                padding: 16px 20px;
                margin-bottom: 16px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                transition: box-shadow 0.2s;
            }
            .pregnancy-badge {
                display: inline-block;
                background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                color: white;
                padding: 4px 10px;
                border-radius: 6px;
                font-size: 0.8rem;
                font-weight: 600;
                margin-bottom: 8px;
            }
            .pregnancy-card h3 {
                margin: 8px 0;
                color: #0f172a;
                font-size: 1.3rem;
                font-weight: 700;
            }
            .card-summary {
                color: #475569;
                font-size: 0.95rem;
                margin-bottom: 12px;
                line-height: 1.6;
            }
            
            .pregnancy-columns { 
                display: grid; 
                gap: 10px; 
            }
            .pregnancy-subsection {
                border: 1px solid rgba(15,23,42,0.08);
                border-radius: 10px;
                padding: 10px 12px;
                background: #fff;
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
            }
            .pregnancy-subsection h4 { 
                margin: 0 0 6px 0; 
                font-size: 0.96rem; 
                color: #1d4ed8;
            }
            .pregnancy-subsection ul { 
                margin: 0; 
                padding-left: 18px; 
                display: grid; 
                gap: 6px; 
            }
            .pregnancy-subsection li { 
                line-height: 1.5; 
                font-size: 0.9rem;
            }
            
            .pregnancy-drug-grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
                gap: 14px; 
            }
            .pregnancy-drug-card { 
                border: 1px solid rgba(15,23,42,0.08); 
                border-radius: 12px; 
                padding: 14px 16px; 
                background: #fff; 
                box-shadow: 0 2px 4px rgba(0,0,0,0.04);
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .pregnancy-drug-card:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .pregnancy-drug-card .drug-name { 
                font-weight: 700; 
                font-size: 1.1rem; 
                color: #1e40af; 
                margin: 0 0 6px 0;
                border-bottom: 1px solid rgba(15,23,42,0.06);
                padding-bottom: 8px;
            }
            .pregnancy-drug-card .drug-examples {
                font-size: 0.85rem;
                color: #64748b;
                margin-bottom: 10px;
                font-style: italic;
            }
            .pregnancy-drug-card .drug-section { 
                margin: 8px 0; 
            }
            .pregnancy-drug-card .section-title { 
                color: #dc2626; 
                font-size: 0.88rem;
                display: block;
                margin-bottom: 4px;
                font-weight: 600;
            }
            .pregnancy-drug-card .section-content { 
                font-size: 0.9rem; 
                line-height: 1.45;
                margin-left: 8px;
            }
            .pregnancy-drug-card .severity-absolute { color: #dc2626; font-weight: 700; }
            .pregnancy-drug-card .severity-avoid { color: #ea580c; font-weight: 600; }
            .pregnancy-drug-card .severity-caution { color: #d97706; font-weight: 600; }
            .pregnancy-drug-card .alternatives {
                background: rgba(34,197,94,0.05);
                border-left: 3px solid #22c55e;
                padding: 8px 10px;
                margin-top: 8px;
                border-radius: 0 6px 6px 0;
            }
            .pregnancy-drug-card .alternatives .section-title { color: #166534; }
            
            .pregnancy-note { 
                margin-top: 12px; 
                color: #475569; 
                font-style: italic; 
                font-size: 0.9rem;
            }
            
            /* Dark mode support */
            [data-theme="dark"] .pregnancy-search-input { 
                background: #334155; 
                border-color: rgba(148,163,184,0.3); 
                color: #f1f5f9;
            }
            [data-theme="dark"] .pregnancy-card { 
                background: #1e293b; 
                border-color: rgba(148,163,184,0.2); 
            }
            [data-theme="dark"] .pregnancy-card h3 { color: #f1f5f9; }
            [data-theme="dark"] .card-summary { color: #cbd5e1; }
            [data-theme="dark"] .pregnancy-subsection { 
                background: #334155; 
                border-color: rgba(148,163,184,0.2); 
            }
            [data-theme="dark"] .pregnancy-subsection h4 { color: #93c5fd; }
            [data-theme="dark"] .pregnancy-drug-card { 
                background: #1e293b; 
                border-color: rgba(148,163,184,0.2); 
            }
            [data-theme="dark"] .pregnancy-drug-card .drug-name { color: #93c5fd; }
            [data-theme="dark"] .pregnancy-drug-card .drug-examples { color: #94a3b8; }
            [data-theme="dark"] .pregnancy-drug-card .alternatives { 
                background: rgba(34,197,94,0.1); 
            }
            [data-theme="dark"] .pregnancy-note { color: #cbd5e1; }
        `;
        document.head.appendChild(style);
    }

    buildSections() {
        return [
            {
                title: 'Drug Safety Overview',
                badge: 'Safety Categories',
                summary: 'Understanding contraindications and risk levels for medications in pregnancy and breastfeeding.',
                columns: [
                    {
                        heading: 'Pregnancy Risk Categories',
                        items: [
                            '🚫 Absolute Contraindication: Never use - proven teratogenic effects (e.g., Thalidomide, Isotretinoin)',
                            '⚠️ Avoid: High risk of harm - use only if benefit clearly outweighs risk (e.g., ACE inhibitors, Warfarin)',
                            '⚡ Use with Caution: Some risk data available - specialist advice recommended (e.g., newer drugs)',
                            '✅ Generally Safe: Extensive safety data available (e.g., Paracetamol, Insulin)'
                        ]
                    },
                    {
                        heading: 'Breastfeeding Considerations',
                        items: [
                            'Drug transfer into breast milk depends on molecular weight, protein binding, and lipophilicity',
                            'Timing of feeds can minimize infant exposure for some medications',
                            'Benefits of breastfeeding often outweigh small risks from maternal medication',
                            'Neonatal age affects drug metabolism - higher risk in premature/very young infants',
                            'Monitor infant for sedation, feeding problems, or unusual symptoms'
                        ]
                    }
                ]
            },
            {
                title: 'Critical Trimester Risks',
                badge: 'Timing',
                summary: 'Different medications pose risks at specific pregnancy stages - timing is crucial for safe prescribing.',
                columns: [
                    {
                        heading: 'First Trimester (0-12 weeks)',
                        items: [
                            'Major organogenesis period - highest teratogenic risk',
                            'Folate antagonists (Trimethoprim, Methotrexate) - neural tube defects',
                            'Paroxetine - cardiac malformations',
                            'Isotretinoin - multiple severe abnormalities',
                            'Valproate - neural tube defects, developmental delay'
                        ]
                    },
                    {
                        heading: 'Second/Third Trimester',
                        items: [
                            'Functional development and growth effects predominate',
                            'NSAIDs after 30 weeks - premature ductus arteriosus closure',
                            'ACE inhibitors/ARBs - renal dysgenesis, oligohydramnios',
                            'Aminoglycosides - ototoxicity (8th cranial nerve damage)',
                            'Tetracyclines - dental discoloration after 4-5 months'
                        ]
                    },
                    {
                        heading: 'Pre-conception Planning',
                        items: [
                            'Optimize maternal health and medications before conception',
                            'Switch from unsafe to safe alternatives (e.g., ACEI → Methyldopa)',
                            'Start folic acid 400mcg (5mg if high risk) at least 1 month before',
                            'Review chronic medications with specialist input',
                            'Ensure vaccinations up to date'
                        ]
                    }
                ]
            },
            {
                title: 'Clinical Guidelines & Resources',
                badge: 'Guidelines',
                summary: 'Essential resources and decision-making frameworks for safe prescribing.',
                columns: [
                    {
                        heading: 'Key Resources',
                        items: [
                            'UK Teratology Information Service (UKTIS) - specialist telephone advice',
                            'BNF Pregnancy appendix - up-to-date prescribing guidance',
                            'RCOG Green-top Guidelines - obstetric prescribing standards',
                            'LactMed Database (NIH) - comprehensive breastfeeding drug information',
                            'Breastfeeding Network - UK charity medication factsheets'
                        ]
                    },
                    {
                        heading: 'Clinical Decision Making',
                        items: [
                            'Always weigh maternal benefit vs fetal/infant risk',
                            'Use lowest effective dose for shortest duration',
                            'Document rationale for decisions in notes',
                            'Involve patient in shared decision making',
                            'Seek specialist advice for complex cases or high-risk medications'
                        ]
                    }
                ]
            },
            {
                title: 'Contraindicated Drugs by Category',
                badge: 'Drug Database',
                summary: 'Comprehensive list of drugs to avoid or use with caution in pregnancy and breastfeeding.',
                drugs: [
                    {
                        name: 'ACE Inhibitors',
                        examples: ['Ramipril', 'Lisinopril', 'Perindopril', 'Enalapril'],
                        pregnancy: ['Fetotoxic - renal dysgenesis, oligohydramnios, IUGR', 'Skull hypoplasia, neonatal renal failure, death', 'ABSOLUTE CONTRAINDICATION all trimesters'],
                        breastfeeding: ['Small amounts in milk', 'Use with caution in first few weeks after birth'],
                        alternatives: ['Pregnancy: Methyldopa, Labetalol, Nifedipine', 'Breastfeeding: Enalapril, Captopril preferred']
                    },
                    {
                        name: 'ARBs (Angiotensin Receptor Blockers)',
                        examples: ['Losartan', 'Candesartan', 'Irbesartan', 'Valsartan'],
                        pregnancy: ['Similar fetotoxicity to ACE inhibitors', 'Renal dysgenesis, oligohydramnios, IUGR', 'ABSOLUTE CONTRAINDICATION all trimesters'],
                        breastfeeding: ['Insufficient data - avoid', 'Contraindicated by manufacturer'],
                        alternatives: ['Pregnancy: Methyldopa, Labetalol, Nifedipine', 'Breastfeeding: Alternative antihypertensives']
                    },
                    {
                        name: 'Statins',
                        examples: ['Atorvastatin', 'Simvastatin', 'Rosuvastatin', 'Pravastatin'],
                        pregnancy: ['Congenital anomalies in animal studies', 'Interferes with cholesterol synthesis', 'CONTRAINDICATED all trimesters'],
                        breastfeeding: ['Unknown if excreted in milk', 'Potential for adverse effects - avoid'],
                        alternatives: ['Pregnancy: Discontinue 3 months before conception', 'Breastfeeding: Delay treatment or formula feed']
                    },
                    {
                        name: 'Warfarin',
                        examples: ['Warfarin'],
                        pregnancy: ['Warfarin embryopathy (6-12 weeks)', 'Nasal hypoplasia, bone abnormalities, CNS malformations', 'AVOID especially weeks 6-12'],
                        breastfeeding: ['Safe - not present in milk'],
                        alternatives: ['Pregnancy: LMWH (Enoxaparin, Dalteparin)', 'Breastfeeding: Warfarin is safe']
                    },
                    {
                        name: 'DOACs',
                        examples: ['Apixaban', 'Rivaroxaban', 'Edoxaban', 'Dabigatran'],
                        pregnancy: ['Insufficient safety data', 'Animal data suggests problems', 'AVOID - manufacturer contraindication'],
                        breastfeeding: ['Insufficient data', 'Manufacturer advises avoid'],
                        alternatives: ['Pregnancy: LMWH (Enoxaparin, Dalteparin)', 'Breastfeeding: Warfarin, LMWH']
                    },
                    {
                        name: 'NSAIDs (after 30 weeks)',
                        examples: ['Ibuprofen', 'Diclofenac', 'Naproxen'],
                        pregnancy: ['Premature closure of ductus arteriosus', 'Persistent pulmonary hypertension, oligohydramnios', 'AVOID from 30 weeks gestation'],
                        breastfeeding: ['Ibuprofen preferred', 'Lowest effective dose for shortest duration'],
                        alternatives: ['Pregnancy: Paracetamol; NSAIDs acceptable <30 weeks', 'Breastfeeding: Ibuprofen or Paracetamol']
                    },
                    {
                        name: 'Tetracyclines',
                        examples: ['Doxycycline', 'Lymecycline', 'Tetracycline'],
                        pregnancy: ['Dental discoloration after 4-5 months gestation', 'Enamel hypoplasia, maternal hepatotoxicity with IV', 'AVOID especially 2nd/3rd trimester'],
                        breastfeeding: ['Avoid prolonged use', 'Theoretical risk of dental staining'],
                        alternatives: ['Pregnancy: Penicillins, Cephalosporins, Erythromycin', 'Breastfeeding: Safe at short courses']
                    },
                    {
                        name: 'Aminoglycosides',
                        examples: ['Gentamicin', 'Amikacin', 'Tobramycin'],
                        pregnancy: ['Ototoxicity - 8th cranial nerve damage', 'Congenital deafness (especially streptomycin)', 'AVOID unless essential with monitoring'],
                        breastfeeding: ['Minimal GI absorption', 'Acceptable for short courses'],
                        alternatives: ['Pregnancy: β-lactams if possible, monitor levels', 'Breastfeeding: Safe in short courses with monitoring']
                    },
                    {
                        name: 'Quinolones',
                        examples: ['Ciprofloxacin', 'Levofloxacin', 'Moxifloxacin'],
                        pregnancy: ['Arthropathy in animal studies', 'Cartilage damage in weight-bearing joints', 'AVOID - use only if no alternative'],
                        breastfeeding: ['Small amounts in milk', 'Avoid unless essential'],
                        alternatives: ['Pregnancy: Cephalosporins, Nitrofurantoin, Trimethoprim', 'Breastfeeding: Alternative antibiotics preferred']
                    },
                    {
                        name: 'Paroxetine',
                        examples: ['Paroxetine'],
                        pregnancy: ['Increased risk of congenital heart defects', 'Especially in 1st trimester', 'AVOID - prefer other SSRIs'],
                        breastfeeding: ['Present in milk', 'Use with caution, monitor infant'],
                        alternatives: ['Pregnancy: Sertraline, Fluoxetine preferred', 'Breastfeeding: Sertraline (lowest milk levels)']
                    },
                    {
                        name: 'Valproate',
                        examples: ['Sodium Valproate', 'Valproic Acid'],
                        pregnancy: ['Neural tube defects (1-2%)', 'Developmental delay, autism spectrum', 'AVOID in women of childbearing potential'],
                        breastfeeding: ['Present in milk but amounts small', 'Monitor infant for sedation'],
                        alternatives: ['Pregnancy: Lamotrigine, Levetiracetam preferred', 'Breastfeeding: Generally acceptable with monitoring']
                    },
                    {
                        name: 'Lithium',
                        examples: ['Lithium Carbonate'],
                        pregnancy: ['Ebstein\'s anomaly (cardiac malformation)', 'Neonatal toxicity, polyhydramnios', 'AVOID 1st trimester if possible'],
                        breastfeeding: ['High levels in milk', 'Risk of neonatal toxicity - avoid'],
                        alternatives: ['Pregnancy: Antipsychotics with specialist input', 'Breastfeeding: Consider alternative mood stabilizers']
                    },
                    {
                        name: 'Isotretinoin',
                        examples: ['Isotretinoin', 'Roaccutane'],
                        pregnancy: ['Severe teratogenicity', 'CNS, cardiac, facial abnormalities', 'ABSOLUTE CONTRAINDICATION'],
                        breastfeeding: ['Highly lipophilic - avoid', 'Insufficient data but likely harmful'],
                        alternatives: ['Pregnancy: Topical treatments, antibiotics', 'Breastfeeding: Delay treatment']
                    },
                    {
                        name: 'Methotrexate',
                        examples: ['Methotrexate'],
                        pregnancy: ['Folate antagonist - neural tube defects', 'Multiple congenital anomalies', 'STOP 3-6 months before conception'],
                        breastfeeding: ['Present in milk', 'Risk of immunosuppression - avoid'],
                        alternatives: ['Pregnancy: Sulfasalazine + 5mg folic acid', 'Breastfeeding: Sulfasalazine acceptable']
                    },
                    {
                        name: 'Codeine (breastfeeding)',
                        examples: ['Codeine', 'Co-codamol', 'Co-dydramol'],
                        pregnancy: ['Neonatal withdrawal if prolonged use', 'USE WITH CAUTION - avoid prolonged use'],
                        breastfeeding: ['Risk of morphine toxicity in infant', 'MHRA warning - infant deaths reported'],
                        alternatives: ['Pregnancy: Paracetamol alone, short courses if needed', 'Breastfeeding: Paracetamol, Ibuprofen']
                    },
                    {
                        name: 'Amiodarone',
                        examples: ['Amiodarone'],
                        pregnancy: ['Neonatal goitre, thyroid dysfunction', 'Bradycardia, prematurity', 'AVOID unless life-threatening arrhythmia'],
                        breastfeeding: ['Present in milk', 'Risk of neonatal hypothyroidism'],
                        alternatives: ['Pregnancy: β-blockers, Flecainide specialist use', 'Breastfeeding: Alternative anti-arrhythmics']
                    }
                ]
            }
        ];
    }

    filterDrugs(searchTerm) {
        const drugSection = this.sections.find(s => Array.isArray(s.drugs));
        if (!drugSection || !searchTerm) return drugSection?.drugs || [];
        
        const term = searchTerm.toLowerCase();
        return drugSection.drugs.filter(drug => 
            drug.name.toLowerCase().includes(term) ||
            drug.examples.some(ex => ex.toLowerCase().includes(term)) ||
            drug.pregnancy.some(p => p.toLowerCase().includes(term)) ||
            drug.breastfeeding.some(b => b.toLowerCase().includes(term)) ||
            drug.alternatives.some(a => a.toLowerCase().includes(term))
        );
    }

    render(container) {
        if (!container) return;
        this.container = container;
        this.ensureStyles();

        // Search box HTML
        const searchHtml = `
            <div class="pregnancy-search-container">
                <input type="text" class="pregnancy-search-input" placeholder="🔍 Search drugs (e.g., warfarin, ACE, antibiotics...)" />
                <div class="pregnancy-search-stats">${this.sections.find(s => s.drugs)?.drugs.length || 0} drugs available</div>
            </div>
        `;

        const sectionHtml = this.sections.map(section => {
            const badge = `<span class="pregnancy-badge">${section.badge}</span>`;
            const summary = section.summary ? `<p class="card-summary">${section.summary}</p>` : '';

            let body = '';
            
            // Handle column-based sections (like ophthalmology)
            if (Array.isArray(section.columns)) {
                const columns = section.columns.map(col => `
                    <div class="pregnancy-subsection">
                        <h4>${col.heading}</h4>
                        <ul>${(col.items || []).map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                `).join('');
                body = `<div class="pregnancy-columns">${columns}</div>`;
            }

            // Handle drug-based sections
            if (Array.isArray(section.drugs)) {
                const drugs = section.drugs.map(drug => `
                    <article class="pregnancy-drug-card" data-drug="${drug.name.toLowerCase()}">
                        <h4 class="drug-name">${drug.name}</h4>
                        <div class="drug-examples">${drug.examples.join(', ')}</div>
                        
                        <div class="drug-section">
                            <strong class="section-title severity-avoid">🤰 Pregnancy Risk:</strong>
                            <div class="section-content">
                                ${drug.pregnancy.map(p => `• ${p}`).join('<br>')}
                            </div>
                        </div>
                        
                        <div class="drug-section">
                            <strong class="section-title">🤱 Breastfeeding:</strong>
                            <div class="section-content">
                                ${drug.breastfeeding.map(b => `• ${b}`).join('<br>')}
                            </div>
                        </div>
                        
                        <div class="alternatives">
                            <strong class="section-title">✅ Safe Alternatives:</strong>
                            <div class="section-content">
                                ${drug.alternatives.map(a => `• ${a}`).join('<br>')}
                            </div>
                        </div>
                    </article>
                `).join('');
                body = `<div class="pregnancy-drug-grid">${drugs}</div>`;
            }

            return `
                <article class="pregnancy-card">
                    ${badge}
                    <h3>${section.title}</h3>
                    ${summary}
                    ${body}
                </article>
            `;
        }).join('');

        const clinicalPearls = `
            <article class="pregnancy-card">
                <span class="pregnancy-badge">💡 Clinical Pearls</span>
                <h3>Key Prescribing Reminders</h3>
                <div class="pregnancy-subsection">
                    <ul>
                        <li>Always check BNF and UKTIS for the most up-to-date information</li>
                        <li>Many drug safety classifications are based on limited data - specialist advice often needed</li>
                        <li>Folic acid 5mg daily should be given pre-conception and throughout pregnancy for women on antiepileptics</li>
                        <li>LMWH is the anticoagulant of choice in pregnancy - warfarin and DOACs contraindicated</li>
                        <li>Low-dose aspirin (75mg) is SAFE in pregnancy for pre-eclampsia prophylaxis despite NSAIDs being contraindicated</li>
                        <li>SSRIs: Sertraline preferred in breastfeeding (lowest milk levels); avoid Paroxetine in pregnancy (cardiac defects)</li>
                        <li>Methotrexate: STOP 3-6 months before conception + 5mg folic acid until after delivery</li>
                        <li>ACE inhibitors/ARBs: Fetotoxic - switch to Methyldopa, Labetalol or Nifedipine BEFORE conception if possible</li>
                        <li>Isotretinoin and valproate require Pregnancy Prevention Programme - mandatory contraception</li>
                        <li>Neonatal withdrawal can occur with prolonged opiate, SSRI, or benzodiazepine use</li>
                    </ul>
                </div>
            </article>
        `;

        container.innerHTML = searchHtml + sectionHtml + clinicalPearls;

        // Add search functionality
        const searchInput = container.querySelector('.pregnancy-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.updateSearchResults();
            });
        }
    }

    updateSearchResults() {
        if (!this.container) return;
        
        const drugGrid = this.container.querySelector('.pregnancy-drug-grid');
        if (!drugGrid) return;

        const filteredDrugs = this.filterDrugs(this.searchTerm);
        const drugCards = drugGrid.querySelectorAll('.pregnancy-drug-card');
        
        drugCards.forEach(card => {
            const drugName = card.dataset.drug;
            const shouldShow = !this.searchTerm || 
                filteredDrugs.some(drug => drug.name.toLowerCase() === drugName);
            
            card.style.display = shouldShow ? 'block' : 'none';
        });

        // Update search stats
        const searchStats = this.container.querySelector('.pregnancy-search-stats');
        if (searchStats) {
            const visibleCount = filteredDrugs.length;
            const totalCount = this.sections.find(s => s.drugs)?.drugs.length || 0;
            searchStats.textContent = this.searchTerm ? 
                `${visibleCount} of ${totalCount} drugs shown` : 
                `${totalCount} drugs available`;
        }
    }
}

export const pregnancyBreastfeedingManager = new PregnancyBreastfeedingManager();
export default pregnancyBreastfeedingManager;