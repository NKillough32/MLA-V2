/**
 * V2 Calculator Implementations
 * Complete implementation of medical calculators for V2 system
 * Replaces the V1 bridge pattern with native V2 implementations
 */

import { TOOL_CATEGORIES } from './Constants.js';

/**
 * Calculator implementations organized by category
 */
class V2Calculators {
    constructor() {
        this.calculators = new Map();
        this.initializeCalculators();
    }
    
    /**
     * Initialize all calculator implementations
     */
    initializeCalculators() {
        // Register all calculators
        this.registerBodyMetricsCalculators();
        this.registerCardiologyCalculators();
        this.registerNeurologyCalculators();
        this.registerRespiratoryCalculators();
        this.registerCriticalCareCalculators();
        this.registerRenalCalculators();
        this.registerGastroenterologyCalculators();
        this.registerEmergencyCalculators();
        this.registerGeriatricsCalculators();
        this.registerPsychiatryCalculators();
        this.registerEndocrineCalculators();
        this.registerChemistryCalculators();
        this.registerObstetricsCalculators();
        this.registerOtherCalculators();
        
        console.log(`✅ V2 Calculators initialized: ${this.calculators.size} calculators`);
    }
    
    /**
     * Register Body Metrics calculators
     */
    registerBodyMetricsCalculators() {
        // BMI Calculator
        this.calculators.set('bmi', {
            id: 'bmi',
            name: 'BMI Calculator',
            category: TOOL_CATEGORIES.BODY_METRICS,
            description: 'Calculate BMI and assess weight status',
            keywords: ['bmi', 'body mass index', 'weight', 'obesity'],
            getTemplate: () => this.getBMITemplate(),
            calculate: () => this.calculateBMI(),
            bindEvents: () => this.bindBMIEvents()
        });
        
        // BSA Calculator
        this.calculators.set('bsa', {
            id: 'bsa',
            name: 'Body Surface Area',
            category: TOOL_CATEGORIES.BODY_METRICS,
            description: 'Calculate body surface area using DuBois formula',
            keywords: ['bsa', 'body surface area', 'dubois'],
            getTemplate: () => this.getBSATemplate(),
            calculate: () => this.calculateBSA(),
            bindEvents: () => this.bindBSAEvents()
        });
        
        // Fluid Balance Calculator
        this.calculators.set('fluid-balance', {
            id: 'fluid-balance',
            name: 'Fluid Balance Calculator',
            category: TOOL_CATEGORIES.BODY_METRICS,
            description: 'Calculate fluid balance and requirements',
            keywords: ['fluid', 'balance', 'intake', 'output'],
            getTemplate: () => this.getFluidBalanceTemplate(),
            calculate: () => this.calculateFluidBalance(),
            bindEvents: () => this.bindFluidBalanceEvents()
        });
    }
    
    /**
     * BMI Calculator Implementation
     */
    getBMITemplate() {
        return `
            <div class="calculator-form">
                <h4>BMI & Waist Circumference Calculator</h4>
                <div class="calc-input-group">
                    <label>Weight (kg):</label>
                    <input type="number" id="bmi-weight" placeholder="70" step="0.1">
                </div>
                <div class="calc-input-group">
                    <label>Height (cm):</label>
                    <input type="number" id="bmi-height" placeholder="175" step="0.1">
                </div>
                <div class="calc-input-group">
                    <label>Waist Circumference (cm) - Optional:</label>
                    <input type="number" id="bmi-waist" placeholder="85" step="0.1">
                </div>
                <div class="calc-input-group">
                    <label>Ethnicity:</label>
                    <select id="bmi-ethnicity">
                        <option value="european">European/Caucasian</option>
                        <option value="asian">Asian (Chinese, Japanese, South Asian)</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="calc-checkbox-group">
                    <label><input type="radio" name="bmi-sex" value="male"> Male</label>
                    <label><input type="radio" name="bmi-sex" value="female"> Female</label>
                </div>
                <button class="calc-button" data-calc="bmi">Calculate</button>
                <div id="bmi-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>
                        <strong>BMI Categories (WHO):</strong><br>
                        Underweight: &lt;18.5 | Normal: 18.5-24.9<br>
                        Overweight: 25-29.9 | Obese: ≥30<br>
                        <strong>Asian populations:</strong> Overweight ≥23, Obese ≥27.5
                    </small>
                </div>
            </div>
        `;
    }
    
    calculateBMI() {
        const weightInput = parseFloat(document.getElementById('bmi-weight')?.value);
        const heightInput = parseFloat(document.getElementById('bmi-height')?.value);
        const waist = parseFloat(document.getElementById('bmi-waist')?.value);
        const ethnicity = document.getElementById('bmi-ethnicity')?.value;
        const sex = document.querySelector('input[name="bmi-sex"]:checked')?.value;

        const weight = Number.isFinite(weightInput) ? weightInput : NaN;
        const heightCm = Number.isFinite(heightInput) ? heightInput : NaN;
        const height = Number.isFinite(heightCm) ? heightCm / 100 : NaN; // Convert cm to m

        if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(heightCm) || heightCm <= 0) {
            document.getElementById('bmi-result').innerHTML = '<p class="error">Enter weight > 0 kg and height > 0 cm</p>';
            return { error: 'Invalid anthropometric inputs' };
        }

        const bmi = weight / (height * height);
        let category = '';
        let color = '';
        let healthRisk = '';
        
        // Ethnic-specific BMI thresholds
        let overweightThreshold = 25;
        let obeseThreshold = 30;
        
        if (ethnicity === 'asian') {
            overweightThreshold = 23;
            obeseThreshold = 27.5;
        }
        
        if (bmi < 18.5) {
            category = 'Underweight';
            color = '#2196F3';
            healthRisk = 'Increased risk: nutritional deficiency, osteoporosis, immune dysfunction';
        } else if (bmi < overweightThreshold) {
            category = 'Normal weight';
            color = '#4CAF50';
            healthRisk = 'Optimal health risk profile';
        } else if (bmi < obeseThreshold) {
            category = 'Overweight';
            color = '#FF9800';
            healthRisk = 'Increased risk: diabetes, cardiovascular disease, sleep apnoea';
        } else if (bmi < 35) {
            category = 'Obese Class I';
            color = '#F44336';
            healthRisk = 'High risk: diabetes, CVD, stroke, certain cancers';
        } else if (bmi < 40) {
            category = 'Obese Class II';
            color = '#D32F2F';
            healthRisk = 'Very high risk: consider bariatric surgery consultation';
        } else {
            category = 'Obese Class III';
            color = '#B71C1C';
            healthRisk = 'Extremely high risk: urgent weight management, consider bariatric surgery';
        }
        
        // Waist circumference assessment
        let waistAssessment = '';
        if (waist && sex) {
            let waistRisk = '';
            let waistColor = '#4CAF50';
            
            if (sex === 'male') {
                if (waist >= 102) {
                    waistRisk = 'Very high risk';
                    waistColor = '#F44336';
                } else if (waist >= 94) {
                    waistRisk = 'Increased risk';
                    waistColor = '#FF9800';
                } else {
                    waistRisk = 'Low risk';
                }
            } else {
                if (waist >= 88) {
                    waistRisk = 'Very high risk';
                    waistColor = '#F44336';
                } else if (waist >= 80) {
                    waistRisk = 'Increased risk';
                    waistColor = '#FF9800';
                } else {
                    waistRisk = 'Low risk';
                }
            }
            
            waistAssessment = `
                <div style="margin-top: 8px; padding: 6px; background: #f5f5f5; border-radius: 4px;">
                    <strong>Waist Circumference:</strong> ${waist} cm<br>
                    <span style="color: ${waistColor}; font-weight: bold;">${waistRisk}</span> for metabolic complications
                </div>
            `;
        }
        
        const result = {
            bmi: bmi.toFixed(1),
            category,
            color,
            healthRisk,
            waistAssessment,
            ethnicity
        };
        
        document.getElementById('bmi-result').innerHTML = `
            <div class="bmi-result-display">
                <div class="bmi-value" style="color: ${color}; font-size: 1.2em;">
                    <strong>BMI: ${result.bmi} kg/m²</strong>
                </div>
                <div class="bmi-category" style="color: ${color}; font-weight: bold; margin: 4px 0;">
                    ${category}
                </div>
                <div style="margin-top: 8px; font-size: 0.9em; color: #666;">
                    ${healthRisk}
                </div>
                ${waistAssessment}
                <div style="margin-top: 8px; font-size: 0.8em; color: #666;">
                    ${ethnicity === 'asian' ? 'Using Asian-specific BMI thresholds' : 'Using WHO BMI thresholds'}
                </div>
            </div>
        `;
        
        return result;
    }
    
    bindBMIEvents() {
        const button = document.querySelector('.calc-button[data-calc="bmi"]');
        if (button) {
            button.addEventListener('click', () => this.calculateBMI());
        }
    }
    
    /**
     * Register Cardiology calculators
     */
    registerCardiologyCalculators() {
        // CHA₂DS₂-VASc Score
        this.calculators.set('chads2vasc', {
            id: 'chads2vasc',
            name: 'CHA₂DS₂-VASc Score',
            category: TOOL_CATEGORIES.CARDIOLOGY,
            description: 'Stroke risk in atrial fibrillation',
            keywords: ['chads', 'vasc', 'stroke', 'atrial fibrillation'],
            getTemplate: () => this.getCHADS2VAScTemplate(),
            calculate: () => this.calculateCHADS2VASc(),
            bindEvents: () => this.bindCHADS2VAScEvents()
        });
        
        // HAS-BLED Score
        this.calculators.set('hasbled', {
            id: 'hasbled',
            name: 'HAS-BLED Score',
            category: TOOL_CATEGORIES.CARDIOLOGY,
            description: 'Bleeding risk with anticoagulation',
            keywords: ['hasbled', 'bleeding', 'anticoagulation'],
            getTemplate: () => this.getHASBLEDTemplate(),
            calculate: () => this.calculateHASBLED(),
            bindEvents: () => this.bindHASBLEDEvents()
        });
    }
    
    getCHADS2VAScTemplate() {
        return `
            <div class="calculator-form">
                <h4>CHA₂DS₂-VASc Score</h4>
                <p><small>Stroke risk assessment in atrial fibrillation</small></p>
                
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="chads-chf"> Congestive heart failure (+1)</label>
                    <label><input type="checkbox" id="chads-htn"> Hypertension (+1)</label>
                    <label><input type="checkbox" id="chads-age75"> Age ≥75 years (+2)</label>
                    <label><input type="checkbox" id="chads-diabetes"> Diabetes mellitus (+1)</label>
                    <label><input type="checkbox" id="chads-stroke"> Stroke/TIA/thromboembolism (+2)</label>
                    <label><input type="checkbox" id="chads-vascular"> Vascular disease (+1)</label>
                    <label><input type="checkbox" id="chads-age65"> Age 65-74 years (+1)</label>
                    <label><input type="checkbox" id="chads-female"> Female sex (+1)</label>
                </div>
                
                <button class="calc-button" data-calc="chads2vasc">Calculate Score</button>
                <div id="chads-result" class="calc-result"></div>
            </div>
        `;
    }
    
    calculateCHADS2VASc() {
        let baseScore = 0;

        if (document.getElementById('chads-chf')?.checked) baseScore += 1;
        if (document.getElementById('chads-htn')?.checked) baseScore += 1;
        if (document.getElementById('chads-age75')?.checked) baseScore += 2;
        if (document.getElementById('chads-diabetes')?.checked) baseScore += 1;
        if (document.getElementById('chads-stroke')?.checked) baseScore += 2;
        if (document.getElementById('chads-vascular')?.checked) baseScore += 1;
        if (document.getElementById('chads-age65')?.checked) baseScore += 1;

        const isFemale = document.getElementById('chads-female')?.checked;
        const femalePoint = isFemale && baseScore > 0 ? 1 : 0;
        const score = baseScore + femalePoint;

        let risk = '';
        let recommendation = '';
        let color = '';

        if (score === 0) {
            risk = 'Low risk (~0.2% per year)';
            recommendation = isFemale
                ? 'Female sex alone does not warrant anticoagulation.'
                : 'No anticoagulation recommended.';
            color = '#4CAF50';
        } else if (score === 1) {
            risk = 'Low-moderate risk (~1.3% per year)';
            recommendation = 'Consider anticoagulation after shared decision making (men with score of 1).';
            color = '#FF9800';
        } else {
            risk = 'High risk (≥2.2% per year)';
            recommendation = 'Anticoagulation recommended unless contraindicated.';
            color = '#F44336';
        }

        const femaleExplanation = isFemale
            ? (baseScore === 0
                ? 'Female sex was selected without additional risk factors, so no point was added.'
                : 'Female sex added one point because another CHA₂DS₂-VASc risk factor is present.')
            : 'Score reflects non-sex risk factors only.';

        const result = { score, baseScore, femalePoint, risk, recommendation, color, isFemale };

        document.getElementById('chads-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color}">
                    Score: <strong>${score}</strong>
                    ${isFemale ? `<span style="font-size: 0.8em; color: #555;">(Non-sex factors: ${baseScore}, Female point: ${femalePoint})</span>` : ''}
                </div>
                <div class="score-risk">${risk}</div>
                <div class="score-recommendation" style="color: ${color}">
                    <strong>${recommendation}</strong>
                </div>
                <div style="margin-top: 8px; font-size: 0.8em; color: #666;">
                    ${femaleExplanation}<br>
                    Based on ESC/ACC guidelines. Consider individual bleeding risk (HAS-BLED).
                </div>
            </div>
        `;

        return result;
    }
    
    bindCHADS2VAScEvents() {
        const button = document.querySelector('.calc-button[data-calc="chads2vasc"]');
        if (button) {
            button.addEventListener('click', () => this.calculateCHADS2VASc());
        }
    }
    
    /**
     * HAS-BLED Calculator Implementation
     */
    getHASBLEDTemplate() {
        return `
            <div class="calculator-form">
                <h4>HAS-BLED Score</h4>
                <p><small>Bleeding risk assessment in atrial fibrillation</small></p>
                
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="hasbled-htn"> Hypertension (+1)</label>
                    <label><input type="checkbox" id="hasbled-renal"> Abnormal renal function (+1)</label>
                    <label><input type="checkbox" id="hasbled-liver"> Abnormal liver function (+1)</label>
                    <label><input type="checkbox" id="hasbled-stroke"> Stroke history (+1)</label>
                    <label><input type="checkbox" id="hasbled-bleeding"> Prior bleeding/predisposition (+1)</label>
                    <label><input type="checkbox" id="hasbled-labile"> Labile INR (+1)</label>
                    <label><input type="checkbox" id="hasbled-elderly"> Elderly (>65 years) (+1)</label>
                    <label><input type="checkbox" id="hasbled-drugs"> Drugs/alcohol (+1)</label>
                </div>
                
                <button class="calc-button" data-calc="hasbled">Calculate Score</button>
                <div id="hasbled-result" class="calc-result"></div>
            </div>
        `;
    }
    
    calculateHASBLED() {
        let score = 0;
        
        if (document.getElementById('hasbled-htn')?.checked) score += 1;
        if (document.getElementById('hasbled-renal')?.checked) score += 1;
        if (document.getElementById('hasbled-liver')?.checked) score += 1;
        if (document.getElementById('hasbled-stroke')?.checked) score += 1;
        if (document.getElementById('hasbled-bleeding')?.checked) score += 1;
        if (document.getElementById('hasbled-labile')?.checked) score += 1;
        if (document.getElementById('hasbled-elderly')?.checked) score += 1;
        if (document.getElementById('hasbled-drugs')?.checked) score += 1;
        
        let risk = '';
        let bleedingRate = '';
        let recommendation = '';
        let color = '';
        
        if (score <= 2) {
            risk = 'Low bleeding risk';
            bleedingRate = '0.9-2.4% per year';
            recommendation = 'Anticoagulation generally safe - benefits likely outweigh bleeding risk';
            color = '#4CAF50';
        } else if (score === 3) {
            risk = 'Moderate bleeding risk';
            bleedingRate = '3.7% per year';
            recommendation = 'Anticoagulation possible but requires caution - regular monitoring essential';
            color = '#FF9800';
        } else {
            risk = 'High bleeding risk';
            bleedingRate = '8.7-12.5% per year';
            recommendation = 'Consider alternatives to anticoagulation or enhanced monitoring';
            color = '#F44336';
        }
        
        const result = { score, risk, bleedingRate, recommendation, color };
        
        document.getElementById('hasbled-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color}">
                    HAS-BLED Score: <strong>${score}/9</strong>
                </div>
                <div class="score-risk" style="color: ${color}; font-weight: bold;">
                    ${risk} (${bleedingRate})
                </div>
                <div class="score-recommendation" style="margin-top: 8px;">
                    <strong>Recommendation:</strong> ${recommendation}
                </div>
                <div style="margin-top: 8px; font-size: 0.8em; color: #666;">
                    Note: HAS-BLED should not be used alone to exclude anticoagulation but to identify patients requiring closer monitoring
                </div>
            </div>
        `;
        
        return result;
    }
    
    bindHASBLEDEvents() {
        const button = document.querySelector('.calc-button[data-calc="hasbled"]');
        if (button) {
            button.addEventListener('click', () => this.calculateHASBLED());
        }
    }
    
    /**
     * Register Neurology calculators
     */
    registerNeurologyCalculators() {
        // Glasgow Coma Scale
        this.calculators.set('gcs', {
            id: 'gcs',
            name: 'Glasgow Coma Scale',
            category: TOOL_CATEGORIES.NEUROLOGY,
            description: 'Assess level of consciousness',
            keywords: ['gcs', 'glasgow', 'coma', 'consciousness'],
            getTemplate: () => this.getGCSTemplate(),
            calculate: () => this.calculateGCS(),
            bindEvents: () => this.bindGCSEvents()
        });
    }
    
    /**
     * Glasgow Coma Scale Implementation
     */
    getGCSTemplate() {
        return `
            <div class="calculator-form">
                <h4>Glasgow Coma Scale</h4>
                
                <div class="calc-select-group">
                    <label>Eye Opening:</label>
                    <select id="gcs-eye">
                        <option value="1">No eye opening (1)</option>
                        <option value="2">Eye opening to pain (2)</option>
                        <option value="3">Eye opening to verbal command (3)</option>
                        <option value="4" selected>Eyes open spontaneously (4)</option>
                    </select>
                </div>
                
                <div class="calc-select-group">
                    <label>Verbal Response:</label>
                    <select id="gcs-verbal">
                        <option value="1">No verbal response (1)</option>
                        <option value="2">Incomprehensible sounds (2)</option>
                        <option value="3">Inappropriate words (3)</option>
                        <option value="4">Confused (4)</option>
                        <option value="5" selected>Oriented (5)</option>
                    </select>
                </div>
                
                <div class="calc-select-group">
                    <label>Motor Response:</label>
                    <select id="gcs-motor">
                        <option value="1">No motor response (1)</option>
                        <option value="2">Extension to pain (2)</option>
                        <option value="3">Flexion to pain (3)</option>
                        <option value="4">Withdrawal from pain (4)</option>
                        <option value="5">Localizes pain (5)</option>
                        <option value="6" selected>Obeys commands (6)</option>
                    </select>
                </div>
                
                <button class="calc-button" data-calc="gcs">Calculate GCS</button>
                <div id="gcs-result" class="calc-result"></div>
            </div>
        `;
    }
    
    calculateGCS() {
        const eye = parseInt(document.getElementById('gcs-eye')?.value);
        const verbal = parseInt(document.getElementById('gcs-verbal')?.value);
        const motor = parseInt(document.getElementById('gcs-motor')?.value);
        
        const total = eye + verbal + motor;
        
        let severity = '';
        let color = '';
        
        if (total <= 8) {
            severity = 'Severe brain injury';
            color = '#F44336';
        } else if (total <= 12) {
            severity = 'Moderate brain injury';
            color = '#FF9800';
        } else {
            severity = 'Mild brain injury';
            color = '#4CAF50';
        }
        
        const result = { eye, verbal, motor, total, severity, color };
        
        document.getElementById('gcs-result').innerHTML = `
            <div class="gcs-result-display">
                <div class="gcs-breakdown">
                    Eye: ${eye} + Verbal: ${verbal} + Motor: ${motor}
                </div>
                <div class="gcs-total" style="color: ${color}">
                    Total GCS: <strong>${total}/15</strong>
                </div>
                <div class="gcs-severity" style="color: ${color}">
                    ${severity}
                </div>
            </div>
        `;
        
        return result;
    }
    
    bindGCSEvents() {
        const button = document.querySelector('.calc-button[data-calc="gcs"]');
        if (button) {
            button.addEventListener('click', () => this.calculateGCS());
        }
    }
    
    registerRespiratoryCalculators() {
        this.calculators.set('wells-pe', {
            id: 'wells-pe',
            name: 'Wells Score for PE',
            category: TOOL_CATEGORIES.RESPIRATORY,
            description: 'Estimates pre-test probability of pulmonary embolism',
            keywords: ['wells', 'pulmonary embolism', 'pe', 'dvt'],
            getTemplate: () => this.getWellsPETemplate(),
            calculate: () => this.calculateWellsPE(),
            bindEvents: () => this.bindWellsPEEvents()
        });
    }

    /**
     * Respiratory – Wells PE Score
     */
    getWellsPETemplate() {
        return `
            <div class="calculator-form">
                <h4>Wells Score for Pulmonary Embolism</h4>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="wells-dvt"> Clinical signs of DVT (+3)</label>
                    <label><input type="checkbox" id="wells-alternative"> PE more likely than alternative diagnosis (+3)</label>
                    <label><input type="checkbox" id="wells-hr"> Heart rate &gt;100 bpm (+1.5)</label>
                    <label><input type="checkbox" id="wells-immobilization"> Immobilization/surgery in past 4 weeks (+1.5)</label>
                    <label><input type="checkbox" id="wells-history"> Previous DVT/PE (+1.5)</label>
                    <label><input type="checkbox" id="wells-hemoptysis"> Hemoptysis (+1)</label>
                    <label><input type="checkbox" id="wells-malignancy"> Malignancy treated in past 6 months (+1)</label>
                </div>
                <button class="calc-button" data-calc="wells-pe">Calculate Wells Score</button>
                <div id="wells-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>Reference: Wells PS et al. Ann Intern Med. 2001.</small>
                </div>
            </div>
        `;
    }

    calculateWellsPE() {
        let score = 0;

        if (document.getElementById('wells-dvt')?.checked) score += 3;
        if (document.getElementById('wells-alternative')?.checked) score += 3;
        if (document.getElementById('wells-hr')?.checked) score += 1.5;
        if (document.getElementById('wells-immobilization')?.checked) score += 1.5;
        if (document.getElementById('wells-history')?.checked) score += 1.5;
        if (document.getElementById('wells-hemoptysis')?.checked) score += 1;
        if (document.getElementById('wells-malignancy')?.checked) score += 1;

        let category = '';
        let probability = '';
        let recommendation = '';
        let color = '';

        if (score <= 1.5) {
            category = 'Low probability';
            probability = '≈10% prevalence of PE';
            recommendation = 'Consider D-dimer to rule out PE in low-risk patients.';
            color = '#4CAF50';
        } else if (score <= 6) {
            category = 'Moderate probability';
            probability = '≈25-30% prevalence of PE';
            recommendation = 'Obtain imaging (CTPA/VQ) or D-dimer depending on clinical context.';
            color = '#FF9800';
        } else {
            category = 'High probability';
            probability = '≈65% prevalence of PE';
            recommendation = 'Proceed directly to imaging or treat empirically if unstable.';
            color = '#F44336';
        }

        const result = { score, category, probability, recommendation, color };

        document.getElementById('wells-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color};">
                    Wells score: <strong>${score.toFixed(1)}</strong>
                </div>
                <div class="score-risk">${category} (${probability})</div>
                <div class="score-recommendation" style="color: ${color};">
                    ${recommendation}
                </div>
            </div>
        `;

        return result;
    }

    bindWellsPEEvents() {
        const button = document.querySelector('.calc-button[data-calc="wells-pe"]');
        if (button) {
            button.addEventListener('click', () => this.calculateWellsPE());
        }
    }

    /**
     * Critical Care – MEWS
     */
    getMEWSTemplate() {
        return `
            <div class="calculator-form">
                <h4>Modified Early Warning Score (MEWS)</h4>
                <div class="calc-input-group">
                    <label>Respiratory rate (breaths/min):</label>
                    <input type="number" id="mews-rr" placeholder="16" min="0" step="1">
                </div>
                <div class="calc-input-group">
                    <label>Heart rate (beats/min):</label>
                    <input type="number" id="mews-hr" placeholder="85" min="0" step="1">
                </div>
                <div class="calc-input-group">
                    <label>Systolic BP (mmHg):</label>
                    <input type="number" id="mews-sbp" placeholder="120" min="0" step="1">
                </div>
                <div class="calc-input-group">
                    <label>Temperature (°C):</label>
                    <input type="number" id="mews-temp" placeholder="37.0" step="0.1">
                </div>
                <div class="calc-select-group">
                    <label>Neurology (AVPU):</label>
                    <select id="mews-avpu">
                        <option value="0" selected>Alert (0)</option>
                        <option value="1">Responds to Voice (1)</option>
                        <option value="2">Responds to Pain (2)</option>
                        <option value="3">Unresponsive (3)</option>
                    </select>
                </div>
                <button class="calc-button" data-calc="mews">Calculate MEWS</button>
                <div id="mews-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>Based on Subbe CP et al. QJM. 2001.</small>
                </div>
            </div>
        `;
    }

    calculateMEWS() {
        const rr = parseFloat(document.getElementById('mews-rr')?.value);
        const hr = parseFloat(document.getElementById('mews-hr')?.value);
        const sbp = parseFloat(document.getElementById('mews-sbp')?.value);
        const temp = parseFloat(document.getElementById('mews-temp')?.value);
        const avpu = parseInt(document.getElementById('mews-avpu')?.value, 10);

        if (![rr, hr, sbp, temp].every(value => Number.isFinite(value) && value >= 0)) {
            document.getElementById('mews-result').innerHTML = '<p class="error">Enter valid vitals for RR, HR, BP, and temperature.</p>';
            return { error: 'Invalid MEWS inputs' };
        }

        const rrScore = rr <= 8 ? 3 : rr >= 9 && rr <= 14 ? 0 : rr <= 20 ? 1 : rr <= 29 ? 2 : 3;
        const hrScore = hr <= 40 ? 2 : hr <= 50 ? 1 : hr <= 100 ? 0 : hr <= 110 ? 1 : hr <= 129 ? 2 : 3;
        const sbpScore = sbp <= 70 ? 3 : sbp <= 80 ? 2 : sbp <= 100 ? 1 : sbp <= 199 ? 0 : 2;
        const tempScore = temp < 35 ? 2 : temp <= 38.4 ? 0 : 2;
        const neuroScore = Number.isFinite(avpu) ? avpu : 0;

        const total = rrScore + hrScore + sbpScore + tempScore + neuroScore;

        let riskLevel = '';
        let action = '';
        let color = '';

        if (total <= 1) {
            riskLevel = 'Low risk';
            action = 'Continue routine monitoring.';
            color = '#4CAF50';
        } else if (total <= 4) {
            riskLevel = 'Intermediate risk';
            action = 'Increase frequency of observations and consider clinical review.';
            color = '#FF9800';
        } else {
            riskLevel = 'High risk';
            action = 'Urgent clinical review / consider rapid response activation.';
            color = '#F44336';
        }

        const result = { total, riskLevel, action, componentScores: { rrScore, hrScore, sbpScore, tempScore, neuroScore } };

        document.getElementById('mews-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color};">MEWS: <strong>${total}</strong></div>
                <div class="score-risk">${riskLevel}</div>
                <div class="score-recommendation" style="color: ${color};">${action}</div>
                <div style="margin-top: 8px; font-size: 0.8em; color: #666;">
                    RR ${rrScore} | HR ${hrScore} | SBP ${sbpScore} | Temp ${tempScore} | AVPU ${neuroScore}
                </div>
            </div>
        `;

        return result;
    }

    bindMEWSEvents() {
        const button = document.querySelector('.calc-button[data-calc="mews"]');
        if (button) {
            button.addEventListener('click', () => this.calculateMEWS());
        }
    }

    /**
     * Renal – Cockcroft-Gault
     */
    getCockcroftGaultTemplate() {
        return `
            <div class="calculator-form">
                <h4>Cockcroft-Gault Creatinine Clearance</h4>
                <div class="calc-input-group">
                    <label>Age (years):</label>
                    <input type="number" id="cg-age" placeholder="65" min="0" step="1">
                </div>
                <div class="calc-input-group">
                    <label>Weight (kg):</label>
                    <input type="number" id="cg-weight" placeholder="70" min="0" step="0.1">
                </div>
                <div class="calc-input-group">
                    <label>Serum creatinine:</label>
                    <div class="calc-inline">
                        <input type="number" id="cg-creatinine" placeholder="1.2" min="0" step="0.01">
                        <select id="cg-creatinine-unit">
                            <option value="mgdl" selected>mg/dL</option>
                            <option value="umol">µmol/L</option>
                        </select>
                    </div>
                </div>
                <div class="calc-checkbox-group">
                    <label><input type="radio" name="cg-sex" value="male"> Male</label>
                    <label><input type="radio" name="cg-sex" value="female"> Female</label>
                </div>
                <button class="calc-button" data-calc="cockcroft-gault">Calculate CrCl</button>
                <div id="cg-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>Use actual body weight; consider adjusted weight if BMI ≥30 kg/m².</small>
                </div>
            </div>
        `;
    }

    calculateCockcroftGault() {
        const age = parseFloat(document.getElementById('cg-age')?.value);
        const weight = parseFloat(document.getElementById('cg-weight')?.value);
        const creatinineValue = parseFloat(document.getElementById('cg-creatinine')?.value);
        const unit = document.getElementById('cg-creatinine-unit')?.value || 'mgdl';
        const sex = document.querySelector('input[name="cg-sex"]:checked')?.value;

        if (!Number.isFinite(age) || age <= 0 || !Number.isFinite(weight) || weight <= 0 || !Number.isFinite(creatinineValue) || creatinineValue <= 0 || !sex) {
            document.getElementById('cg-result').innerHTML = '<p class="error">Enter age, weight, creatinine, and sex.</p>';
            return { error: 'Invalid Cockcroft inputs' };
        }

        const creatinineMgDl = unit === 'umol' ? creatinineValue / 88.4 : creatinineValue;
        const base = ((140 - age) * weight) / (72 * creatinineMgDl);
        const crcl = sex === 'female' ? base * 0.85 : base;

        let stage = '';
        let color = '';

        if (crcl >= 90) {
            stage = 'Normal kidney function';
            color = '#4CAF50';
        } else if (crcl >= 60) {
            stage = 'Mild impairment (CKD G2)';
            color = '#8BC34A';
        } else if (crcl >= 45) {
            stage = 'Mild-moderate impairment (CKD G3a)';
            color = '#FFC107';
        } else if (crcl >= 30) {
            stage = 'Moderate impairment (CKD G3b)';
            color = '#FF9800';
        } else if (crcl >= 15) {
            stage = 'Severe impairment (CKD G4)';
            color = '#FF5722';
        } else {
            stage = 'Kidney failure (CKD G5)';
            color = '#F44336';
        }

        const result = { crcl, stage, sex, unit };

        document.getElementById('cg-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color};">
                    Creatinine clearance: <strong>${crcl.toFixed(1)} mL/min</strong>
                </div>
                <div class="score-risk">${stage}</div>
                <div style="margin-top: 8px; font-size: 0.8em; color: #666;">
                    Based on Cockcroft-Gault equation; adjust for drug dosing per product information.
                </div>
            </div>
        `;

        return result;
    }

    bindCockcroftGaultEvents() {
        const button = document.querySelector('.calc-button[data-calc="cockcroft-gault"]');
        if (button) {
            button.addEventListener('click', () => this.calculateCockcroftGault());
        }
    }

    /**
     * Gastroenterology – Child-Pugh
     */
    getChildPughTemplate() {
        return `
            <div class="calculator-form">
                <h4>Child-Pugh Score</h4>
                <div class="calc-input-group">
                    <label>Total bilirubin (mg/dL):</label>
                    <input type="number" id="child-bilirubin" placeholder="1.8" min="0" step="0.1">
                </div>
                <div class="calc-input-group">
                    <label>Serum albumin (g/dL):</label>
                    <input type="number" id="child-albumin" placeholder="3.2" min="0" step="0.1">
                </div>
                <div class="calc-input-group">
                    <label>INR:</label>
                    <input type="number" id="child-inr" placeholder="1.4" min="0" step="0.1">
                </div>
                <div class="calc-select-group">
                    <label>Ascites:</label>
                    <select id="child-ascites">
                        <option value="1">None</option>
                        <option value="2">Mild (diuretic controlled)</option>
                        <option value="3">Moderate-severe (refractory)</option>
                    </select>
                </div>
                <div class="calc-select-group">
                    <label>Hepatic encephalopathy:</label>
                    <select id="child-encephalopathy">
                        <option value="1">None</option>
                        <option value="2">Grade I-II</option>
                        <option value="3">Grade III-IV</option>
                    </select>
                </div>
                <button class="calc-button" data-calc="child-pugh">Calculate Child-Pugh</button>
                <div id="child-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>Higher scores indicate worse hepatic reserve; consider MELD for transplant evaluation.</small>
                </div>
            </div>
        `;
    }

    calculateChildPugh() {
        const bilirubin = parseFloat(document.getElementById('child-bilirubin')?.value);
        const albumin = parseFloat(document.getElementById('child-albumin')?.value);
        const inr = parseFloat(document.getElementById('child-inr')?.value);
        const ascites = parseInt(document.getElementById('child-ascites')?.value, 10);
        const encephalopathy = parseInt(document.getElementById('child-encephalopathy')?.value, 10);

        if (![bilirubin, albumin, inr].every(value => Number.isFinite(value) && value >= 0)) {
            document.getElementById('child-result').innerHTML = '<p class="error">Enter numeric values for bilirubin, albumin, and INR.</p>';
            return { error: 'Invalid Child-Pugh inputs' };
        }

        const bilirubinScore = bilirubin < 2 ? 1 : bilirubin <= 3 ? 2 : 3;
        const albuminScore = albumin > 3.5 ? 1 : albumin >= 2.8 ? 2 : 3;
        const inrScore = inr < 1.7 ? 1 : inr <= 2.3 ? 2 : 3;
        const ascitesScore = Number.isFinite(ascites) ? ascites : 1;
        const encephalopathyScore = Number.isFinite(encephalopathy) ? encephalopathy : 1;

        const total = bilirubinScore + albuminScore + inrScore + ascitesScore + encephalopathyScore;

        let classification = '';
        let prognosis = '';
        let color = '';

        if (total <= 6) {
            classification = 'Class A';
            prognosis = 'Well-compensated disease (~100% 1-year survival)';
            color = '#4CAF50';
        } else if (total <= 9) {
            classification = 'Class B';
            prognosis = 'Significant functional compromise (~80% 1-year survival)';
            color = '#FF9800';
        } else {
            classification = 'Class C';
            prognosis = 'Decompensated disease (~45% 1-year survival)';
            color = '#F44336';
        }

        const result = {
            total,
            classification,
            prognosis,
            componentScores: { bilirubinScore, albuminScore, inrScore, ascitesScore, encephalopathyScore }
        };

        document.getElementById('child-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color};">Child-Pugh: <strong>${total}</strong> (${classification})</div>
                <div class="score-risk">${prognosis}</div>
                <div style="margin-top: 8px; font-size: 0.8em; color: #666;">
                    Bili ${bilirubinScore} | Alb ${albuminScore} | INR ${inrScore} | Ascites ${ascitesScore} | Encephalopathy ${encephalopathyScore}
                </div>
            </div>
        `;

        return result;
    }

    bindChildPughEvents() {
        const button = document.querySelector('.calc-button[data-calc="child-pugh"]');
        if (button) {
            button.addEventListener('click', () => this.calculateChildPugh());
        }
    }

    /**
     * Emergency – Modified Centor
     */
    getCentorTemplate() {
        return `
            <div class="calculator-form">
                <h4>Modified Centor (McIsaac) Score</h4>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="centor-exudate"> Tonsillar exudate/swelling (+1)</label>
                    <label><input type="checkbox" id="centor-adenopathy"> Tender anterior cervical adenopathy (+1)</label>
                    <label><input type="checkbox" id="centor-fever"> Temperature &gt;38°C (+1)</label>
                    <label><input type="checkbox" id="centor-cough"> Absence of cough (+1)</label>
                </div>
                <div class="calc-input-group">
                    <label>Age (years):</label>
                    <input type="number" id="centor-age" placeholder="25" min="0" step="1">
                </div>
                <button class="calc-button" data-calc="centor">Calculate Centor Score</button>
                <div id="centor-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>McIsaac WJ et al. JAMA. 2004.</small>
                </div>
            </div>
        `;
    }

    calculateCentor() {
        let score = 0;

        if (document.getElementById('centor-exudate')?.checked) score += 1;
        if (document.getElementById('centor-adenopathy')?.checked) score += 1;
        if (document.getElementById('centor-fever')?.checked) score += 1;
        if (document.getElementById('centor-cough')?.checked) score += 1;

        const age = parseFloat(document.getElementById('centor-age')?.value);
        if (Number.isFinite(age)) {
            if (age >= 3 && age <= 14) {
                score += 1;
            } else if (age >= 45) {
                score -= 1;
            }
        }

        let risk = '';
        let probability = '';
        let recommendation = '';
        let color = '';

        if (score <= 0) {
            risk = 'Very low risk';
            probability = '≤1% likelihood of Group A Streptococcus';
            recommendation = 'No testing or antibiotics needed unless clinical suspicion is high.';
            color = '#4CAF50';
        } else if (score <= 1) {
            risk = 'Low risk';
            probability = '5-10% likelihood';
            recommendation = 'Consider throat culture or rapid antigen test if symptoms persist.';
            color = '#8BC34A';
        } else if (score === 2) {
            risk = 'Intermediate risk';
            probability = '11-17% likelihood';
            recommendation = 'Perform rapid antigen test or culture; treat if positive.';
            color = '#FFC107';
        } else if (score === 3) {
            risk = 'Moderate risk';
            probability = '28-35% likelihood';
            recommendation = 'Test for strep; consider empiric treatment if testing unavailable.';
            color = '#FF9800';
        } else {
            risk = 'High risk';
            probability = '38-57% likelihood';
            recommendation = 'Empiric antibiotics or confirmatory testing recommended.';
            color = '#F44336';
        }

        const result = { score, risk, probability, recommendation, color };

        document.getElementById('centor-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color};">Centor score: <strong>${score}</strong></div>
                <div class="score-risk">${risk} (${probability})</div>
                <div class="score-recommendation" style="color: ${color};">${recommendation}</div>
            </div>
        `;

        return result;
    }

    bindCentorEvents() {
        const button = document.querySelector('.calc-button[data-calc="centor"]');
        if (button) {
            button.addEventListener('click', () => this.calculateCentor());
        }
    }

    /**
     * Geriatrics – Timed Up and Go
     */
    getTimedUpGoTemplate() {
        return `
            <div class="calculator-form">
                <h4>Timed Up &amp; Go (TUG) Test</h4>
                <div class="calc-input-group">
                    <label>Time to complete test (seconds):</label>
                    <input type="number" id="tug-time" placeholder="12" min="0" step="0.1">
                </div>
                <button class="calc-button" data-calc="timed-up-go">Assess Mobility</button>
                <div id="tug-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>Podsiadlo D &amp; Richardson S. J Am Geriatr Soc. 1991.</small>
                </div>
            </div>
        `;
    }

    calculateTimedUpGo() {
        const time = parseFloat(document.getElementById('tug-time')?.value);

        if (!Number.isFinite(time) || time <= 0) {
            document.getElementById('tug-result').innerHTML = '<p class="error">Enter a valid TUG time in seconds.</p>';
            return { error: 'Invalid TUG time' };
        }

        let category = '';
        let interpretation = '';
        let color = '';

        if (time < 10) {
            category = 'Normal mobility';
            interpretation = 'Independent with minimal fall risk.';
            color = '#4CAF50';
        } else if (time <= 19) {
            category = 'Mostly independent';
            interpretation = 'Low to moderate fall risk; review gait aids and home safety.';
            color = '#8BC34A';
        } else if (time <= 29) {
            category = 'Varied mobility';
            interpretation = 'Needs assistance for some activities; consider physiotherapy referral.';
            color = '#FFC107';
        } else {
            category = 'High fall risk';
            interpretation = 'Requires comprehensive falls assessment and support.';
            color = '#F44336';
        }

        const result = { time, category, interpretation };

        document.getElementById('tug-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color};">${time.toFixed(1)} seconds</div>
                <div class="score-risk">${category}</div>
                <div class="score-recommendation" style="color: ${color};">${interpretation}</div>
            </div>
        `;

        return result;
    }

    bindTimedUpGoEvents() {
        const button = document.querySelector('.calc-button[data-calc="timed-up-go"]');
        if (button) {
            button.addEventListener('click', () => this.calculateTimedUpGo());
        }
    }

    /**
     * Geriatrics – Clinical Frailty Scale
     */
    getClinicalFrailtyTemplate() {
        const options = [
            { value: 1, label: '1 – Very Fit (robust, active, energetic)' },
            { value: 2, label: '2 – Well (no active disease symptoms)' },
            { value: 3, label: '3 – Managing Well (medical issues well controlled)' },
            { value: 4, label: '4 – Vulnerable (not dependent, symptoms limit activities)' },
            { value: 5, label: '5 – Mildly Frail (needs help with higher order IADLs)' },
            { value: 6, label: '6 – Moderately Frail (needs help with outside and inside activities)' },
            { value: 7, label: '7 – Severely Frail (completely dependent for personal care)' },
            { value: 8, label: '8 – Very Severely Frail (completely dependent, approaching end of life)' },
            { value: 9, label: '9 – Terminally Ill (life expectancy <6 months)' }
        ];

        const optionsHtml = options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');

        return `
            <div class="calculator-form">
                <h4>Clinical Frailty Scale (CFS)</h4>
                <p><small>Use the best fitting description for baseline function over the last 2 weeks.</small></p>
                <div class="calc-select-group">
                    <label>Frailty category:</label>
                    <select id="cfs-score">${optionsHtml}</select>
                </div>
                <button class="calc-button" data-calc="clinical-frailty-scale">Calculate CFS</button>
                <div id="cfs-result" class="calc-result"></div>
                <div class="calc-reference"><small>Rockwood et al. CMAJ 2005; NICE NG159 recommends CFS to inform escalation decisions in older adults.</small></div>
            </div>
        `;
    }

    calculateClinicalFrailty() {
        const select = document.getElementById('cfs-score');
        const value = Number.parseInt(select?.value, 10);

        if (!Number.isInteger(value) || value < 1 || value > 9) {
            document.getElementById('cfs-result').innerHTML = '<p class="error">Select the description that best matches the patient.</p>';
            return { error: 'Invalid CFS selection' };
        }

        const interpretations = {
            1: { risk: 'Very fit', advice: 'Low perioperative risk. Optimise lifestyle and encourage strength/balance training.' },
            2: { risk: 'Well', advice: 'Monitor for decline; reinforce preventative health and vaccinations.' },
            3: { risk: 'Managing well', advice: 'Continue chronic disease optimisation and falls prevention.' },
            4: { risk: 'Vulnerable', advice: 'Offer comprehensive geriatric assessment and review polypharmacy.' },
            5: { risk: 'Mildly frail', advice: 'Plan support with instrumental activities, consider community therapy referral.' },
            6: { risk: 'Moderately frail', advice: 'Assess care package needs, advance care planning discussion recommended.' },
            7: { risk: 'Severely frail', advice: 'Coordinate multidisciplinary review, consider anticipatory medication and falls safeguards.' },
            8: { risk: 'Very severely frail', advice: 'Prioritise comfort, discuss ceilings of treatment and emergency plans.' },
            9: { risk: 'Terminally ill', advice: 'Focus on palliative goals, review resuscitation status and symptom control.' }
        };

        const interpretation = interpretations[value];
        const color = value <= 3 ? '#16a34a' : value <= 5 ? '#f59e0b' : '#dc2626';

        document.getElementById('cfs-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color};">CFS ${value}</div>
                <div class="score-risk">${interpretation.risk}</div>
                <div class="score-recommendation" style="color: ${color};">${interpretation.advice}</div>
            </div>
        `;

        return { score: value, ...interpretation };
    }

    bindClinicalFrailtyEvents() {
        const button = document.querySelector('.calc-button[data-calc="clinical-frailty-scale"]');
        if (button) {
            button.addEventListener('click', () => this.calculateClinicalFrailty());
        }
    }

    /**
     * Geriatrics – PRISMA-7
     */
    getPrisma7Template() {
        const questions = [
            { id: 'age', text: 'Are you older than 85 years?' },
            { id: 'male', text: 'Are you male?' },
            { id: 'health', text: 'In general, do you have any health problems that limit your activities?' },
            { id: 'help', text: 'Do you need someone to help you on a regular basis?' },
            { id: 'support', text: 'In the last 12 months, have you regularly needed support from another person?' },
            { id: 'mobility', text: 'Do you use a stick, walker, or wheelchair to get about?' },
            { id: 'transport', text: 'In general, do you have health problems that require you to stay at home?' }
        ];

        return `
            <div class="calculator-form">
                <h4>PRISMA-7 Screening Tool</h4>
                <p><small>Tick all statements that apply to the patient. Score ≥3 indicates high risk of frailty.</small></p>
                <div class="calc-checkbox-group">
                    ${questions.map(q => `
                        <label>
                            <input type="checkbox" id="prisma-${q.id}" value="1"> ${q.text}
                        </label>
                    `).join('')}
                </div>
                <button class="calc-button" data-calc="prisma-7">Calculate PRISMA-7</button>
                <div id="prisma-result" class="calc-result"></div>
                <div class="calc-reference"><small>Raîche et al. Age Ageing 2008 – validated frailty screen for community-dwelling older adults.</small></div>
            </div>
        `;
    }

    calculatePrisma7() {
        const ids = ['age', 'male', 'health', 'help', 'support', 'mobility', 'transport'];
        let score = 0;

        ids.forEach(id => {
            const checkbox = document.getElementById(`prisma-${id}`);
            if (checkbox?.checked) {
                score += Number(checkbox.value) || 0;
            }
        });

        const interpretation = score >= 3 ? 'High frailty risk – arrange comprehensive geriatric assessment' : score === 2 ? 'Intermediate risk – monitor, address modifiable risks' : 'Low frailty risk – continue health promotion';
        const color = score >= 3 ? '#dc2626' : score === 2 ? '#f59e0b' : '#16a34a';

        document.getElementById('prisma-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color};">Score ${score}/7</div>
                <div class="score-risk">${score >= 3 ? 'High risk' : score === 2 ? 'Intermediate risk' : 'Low risk'}</div>
                <div class="score-recommendation" style="color: ${color};">${interpretation}</div>
            </div>
        `;

        return { score, interpretation };
    }

    bindPrisma7Events() {
        const button = document.querySelector('.calc-button[data-calc="prisma-7"]');
        if (button) {
            button.addEventListener('click', () => this.calculatePrisma7());
        }
    }

    /**
     * Geriatrics – 4AT
     */
    getFourAtTemplate() {
        return `
            <div class="calculator-form">
                <h4>4AT Delirium Assessment</h4>
                <div class="calc-select-group">
                    <label>Alertness:</label>
                    <select id="fourat-alertness">
                        <option value="0">0 – Alert/normal</option>
                        <option value="0">0 – Mild sleepiness but easily rousable</option>
                        <option value="4">4 – Clearly abnormal (agitated, stupor, or coma)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>AMT4 errors (age, DOB, place, current year):</label>
                    <input type="number" id="fourat-amt-errors" min="0" max="4" step="1" value="0">
                </div>
                <div class="calc-input-group">
                    <label>Attention – months backwards correct:</label>
                    <input type="number" id="fourat-attention" min="0" max="12" step="1" value="12">
                </div>
                <div class="calc-select-group">
                    <label>Acute change or fluctuating course:</label>
                    <select id="fourat-acute">
                        <option value="0">0 – No</option>
                        <option value="4">4 – Yes, acute change</option>
                    </select>
                </div>
                <button class="calc-button" data-calc="4at">Calculate 4AT</button>
                <div id="fourat-result" class="calc-result"></div>
                <div class="calc-reference"><small>4AT (Bellelli et al. Age Ageing 2014) – rapid delirium screening endorsed by NICE NG103.</small></div>
            </div>
        `;
    }

    calculateFourAt() {
        const alertness = Number(document.getElementById('fourat-alertness')?.value ?? 0);
        const amtErrorsInput = Number(document.getElementById('fourat-amt-errors')?.value ?? 0);
        const attentionCorrect = Number(document.getElementById('fourat-attention')?.value ?? 0);
        const acuteChange = Number(document.getElementById('fourat-acute')?.value ?? 0);

        if ([alertness, amtErrorsInput, attentionCorrect, acuteChange].some(value => Number.isNaN(value) || value < 0)) {
            document.getElementById('fourat-result').innerHTML = '<p class="error">Check the inputs for alertness, AMT4 errors, and attention.</p>';
            return { error: 'Invalid 4AT inputs' };
        }

        const amtScore = amtErrorsInput === 0 ? 0 : amtErrorsInput === 1 ? 1 : 2;
        const attentionScore = attentionCorrect >= 7 ? 0 : attentionCorrect > 0 ? 1 : 2;

        const total = alertness + amtScore + attentionScore + acuteChange;
        let interpretation = '';
        let risk = '';
        let color = '';

        if (total >= 4) {
            interpretation = 'Possible delirium – urgent medical review and treat precipitating causes';
            risk = 'Delirium likely';
            color = '#dc2626';
        } else if (total >= 1) {
            interpretation = 'Possible cognitive impairment – perform cognitive testing (e.g., MoCA) and monitor closely';
            risk = 'Cognitive concern';
            color = '#f59e0b';
        } else {
            interpretation = 'Delirium unlikely, but continue routine observation if risk factors present';
            risk = 'Low risk';
            color = '#16a34a';
        }

        document.getElementById('fourat-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color};">Total ${total}</div>
                <div class="score-risk">${risk}</div>
                <div class="score-recommendation" style="color: ${color};">${interpretation}</div>
            </div>
        `;

        return { total, risk, interpretation, components: { alertness, amtScore, attentionScore, acuteChange } };
    }

    bindFourAtEvents() {
        const button = document.querySelector('.calc-button[data-calc="4at"]');
        if (button) {
            button.addEventListener('click', () => this.calculateFourAt());
        }
    }

    /**
     * Psychiatry – PHQ-9
     */
    getPHQ9Template() {
        const options = `
            <option value="0">Not at all (0)</option>
            <option value="1">Several days (1)</option>
            <option value="2">More than half the days (2)</option>
            <option value="3">Nearly every day (3)</option>
        `;

        return `
            <div class="calculator-form">
                <h4>PHQ-9 Depression Severity</h4>
                <p><small>Over the last two weeks, how often have you been bothered by the following problems?</small></p>
                ${Array.from({ length: 9 }).map((_, index) => `
                    <div class="calc-select-group">
                        <label>Question ${index + 1}</label>
                        <select id="phq-item${index + 1}">
                            ${options}
                        </select>
                    </div>
                `).join('')}
                <div class="calc-select-group">
                    <label>If you checked any problems, how difficult have these made work/home duties?</label>
                    <select id="phq-difficulty">
                        <option value="0" selected>Not difficult at all</option>
                        <option value="1">Somewhat difficult</option>
                        <option value="2">Very difficult</option>
                        <option value="3">Extremely difficult</option>
                    </select>
                </div>
                <button class="calc-button" data-calc="phq9">Calculate PHQ-9</button>
                <div id="phq-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>Kroenke K et al. J Gen Intern Med. 2001.</small>
                </div>
            </div>
        `;
    }

    calculatePHQ9() {
        let total = 0;
        const responses = [];

        for (let i = 1; i <= 9; i += 1) {
            const value = parseInt(document.getElementById(`phq-item${i}`)?.value, 10) || 0;
            responses.push(value);
            total += value;
        }

        const difficulty = parseInt(document.getElementById('phq-difficulty')?.value, 10) || 0;

        let severity = '';
        let recommendation = '';
        let color = '';

        if (total <= 4) {
            severity = 'Minimal depression';
            recommendation = 'Monitor; consider repeat screening if symptoms persist.';
            color = '#4CAF50';
        } else if (total <= 9) {
            severity = 'Mild depression';
            recommendation = 'Use watchful waiting; consider brief psychotherapy if symptoms impact function.';
            color = '#8BC34A';
        } else if (total <= 14) {
            severity = 'Moderate depression';
            recommendation = 'Develop treatment plan, which may include psychotherapy or medication.';
            color = '#FFC107';
        } else if (total <= 19) {
            severity = 'Moderately severe depression';
            recommendation = 'Initiate active treatment; consider combined therapy.';
            color = '#FF9800';
        } else {
            severity = 'Severe depression';
            recommendation = 'Immediate initiation of treatment and referral to mental health specialist recommended.';
            color = '#F44336';
        }

        const difficultyText = ['no reported difficulty', 'some difficulty', 'very difficult', 'extremely difficult'][difficulty] || 'no reported difficulty';

        const result = { total, severity, recommendation, responses, difficulty };

        document.getElementById('phq-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color};">PHQ-9 total: <strong>${total}</strong></div>
                <div class="score-risk">${severity}</div>
                <div class="score-recommendation" style="color: ${color};">${recommendation}</div>
                <div style="margin-top: 8px; font-size: 0.8em; color: #666;">Patient reports ${difficultyText} in daily functioning.</div>
            </div>
        `;

        return result;
    }

    bindPHQ9Events() {
        const button = document.querySelector('.calc-button[data-calc="phq9"]');
        if (button) {
            button.addEventListener('click', () => this.calculatePHQ9());
        }
    }

    /**
     * Endocrine – HbA1c to eAG
     */
    getHba1cTemplate() {
        return `
            <div class="calculator-form">
                <h4>HbA1c to Estimated Average Glucose (eAG)</h4>
                <div class="calc-input-group">
                    <label>HbA1c (%):</label>
                    <input type="number" id="hba1c-value" placeholder="7.2" min="0" step="0.1">
                </div>
                <div class="calc-select-group">
                    <label>Display eAG in:</label>
                    <select id="hba1c-eag-unit">
                        <option value="mgdl" selected>mg/dL</option>
                        <option value="mmol">mmol/L</option>
                    </select>
                </div>
                <button class="calc-button" data-calc="hba1c-eag">Convert HbA1c</button>
                <div id="hba1c-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>ADAG Study Group. Diabetes Care. 2008.</small>
                </div>
            </div>
        `;
    }

    calculateHba1cEag() {
        const a1c = parseFloat(document.getElementById('hba1c-value')?.value);
        const unit = document.getElementById('hba1c-eag-unit')?.value || 'mgdl';

        if (!Number.isFinite(a1c) || a1c <= 0) {
            document.getElementById('hba1c-result').innerHTML = '<p class="error">Enter a valid HbA1c percentage.</p>';
            return { error: 'Invalid HbA1c' };
        }

        const eagMg = 28.7 * a1c - 46.7;
        const eag = unit === 'mmol' ? eagMg / 18 : eagMg;

        const result = { a1c, eagMg, unit, eag };

        document.getElementById('hba1c-result').innerHTML = `
            <div class="score-result">
                <div class="score-value">Estimated average glucose: <strong>${unit === 'mmol' ? eag.toFixed(1) + ' mmol/L' : eag.toFixed(0) + ' mg/dL'}</strong></div>
                <div class="score-risk">Every 1% change in HbA1c ≈ 29 mg/dL (1.6 mmol/L) change in eAG.</div>
            </div>
        `;

        return result;
    }

    bindHba1cEvents() {
        const button = document.querySelector('.calc-button[data-calc="hba1c-eag"]');
        if (button) {
            button.addEventListener('click', () => this.calculateHba1cEag());
        }
    }

    /**
     * Chemistry – Anion Gap
     */
    getAnionGapTemplate() {
        return `
            <div class="calculator-form">
                <h4>Serum Anion Gap</h4>
                <div class="calc-input-group">
                    <label>Sodium (Na⁺) (mmol/L):</label>
                    <input type="number" id="anion-na" placeholder="140" step="0.1">
                </div>
                <div class="calc-input-group">
                    <label>Potassium (K⁺) (mmol/L) - optional:</label>
                    <input type="number" id="anion-k" placeholder="4.0" step="0.1">
                </div>
                <div class="calc-input-group">
                    <label>Chloride (Cl⁻) (mmol/L):</label>
                    <input type="number" id="anion-cl" placeholder="105" step="0.1">
                </div>
                <div class="calc-input-group">
                    <label>Bicarbonate (HCO₃⁻) (mmol/L):</label>
                    <input type="number" id="anion-hco3" placeholder="24" step="0.1">
                </div>
                <button class="calc-button" data-calc="anion-gap">Calculate Anion Gap</button>
                <div id="anion-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>Correct for albumin: add 2.5 mmol/L for each 1 g/dL decrease below 4.</small>
                </div>
            </div>
        `;
    }

    calculateAnionGap() {
        const sodium = parseFloat(document.getElementById('anion-na')?.value);
        const potassium = parseFloat(document.getElementById('anion-k')?.value);
        const chloride = parseFloat(document.getElementById('anion-cl')?.value);
        const bicarbonate = parseFloat(document.getElementById('anion-hco3')?.value);

        if (![sodium, chloride, bicarbonate].every(value => Number.isFinite(value))) {
            document.getElementById('anion-result').innerHTML = '<p class="error">Enter sodium, chloride, and bicarbonate values.</p>';
            return { error: 'Invalid anion gap inputs' };
        }

        const kComponent = Number.isFinite(potassium) ? potassium : 0;
        const ag = sodium + kComponent - (chloride + bicarbonate);

        let interpretation = '';
        let color = '';

        if (ag < 8) {
            interpretation = 'Low anion gap – consider laboratory error, hypoalbuminemia, or paraproteinemia.';
            color = '#03A9F4';
        } else if (ag <= 12) {
            interpretation = 'Normal anion gap – evaluate for non-gap metabolic acidosis if pH low.';
            color = '#4CAF50';
        } else if (ag <= 16) {
            interpretation = 'Borderline high – correlate clinically and consider albumin correction.';
            color = '#FFC107';
        } else {
            interpretation = 'High anion gap metabolic acidosis – assess for MUDPILES/“GOLDMARK” etiologies.';
            color = '#F44336';
        }

        const result = { ag, interpretation };

        document.getElementById('anion-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color};">Anion gap: <strong>${ag.toFixed(1)} mmol/L</strong></div>
                <div class="score-recommendation" style="color: ${color};">${interpretation}</div>
            </div>
        `;

        return result;
    }

    bindAnionGapEvents() {
        const button = document.querySelector('.calc-button[data-calc="anion-gap"]');
        if (button) {
            button.addEventListener('click', () => this.calculateAnionGap());
        }
    }

    /**
     * Obstetrics – Bishop Score
     */
    getBishopTemplate() {
        return `
            <div class="calculator-form">
                <h4>Bishop Score</h4>
                <div class="calc-select-group">
                    <label>Cervical dilation (cm):</label>
                    <select id="bishop-dilation">
                        <option value="0">Closed (0)</option>
                        <option value="1">1-2 cm (1)</option>
                        <option value="2">3-4 cm (2)</option>
                        <option value="3">5-6 cm (3)</option>
                    </select>
                </div>
                <div class="calc-select-group">
                    <label>Cervical effacement (%):</label>
                    <select id="bishop-effacement">
                        <option value="0">&lt;30% (0)</option>
                        <option value="1">40-50% (1)</option>
                        <option value="2">60-70% (2)</option>
                        <option value="3">&gt;=80% (3)</option>
                    </select>
                </div>
                <div class="calc-select-group">
                    <label>Fetal station:</label>
                    <select id="bishop-station">
                        <option value="0">-3 (0)</option>
                        <option value="1">-2 (1)</option>
                        <option value="2">-1 / 0 (2)</option>
                        <option value="3">+1 / +2 (3)</option>
                    </select>
                </div>
                <div class="calc-select-group">
                    <label>Cervical consistency:</label>
                    <select id="bishop-consistency">
                        <option value="0">Firm (0)</option>
                        <option value="1">Medium (1)</option>
                        <option value="2">Soft (2)</option>
                    </select>
                </div>
                <div class="calc-select-group">
                    <label>Cervical position:</label>
                    <select id="bishop-position">
                        <option value="0">Posterior (0)</option>
                        <option value="1">Mid-position (1)</option>
                        <option value="2">Anterior (2)</option>
                    </select>
                </div>
                <button class="calc-button" data-calc="bishop-score">Calculate Bishop Score</button>
                <div id="bishop-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>Score ≥8 suggests favourable cervix for induction.</small>
                </div>
            </div>
        `;
    }

    calculateBishop() {
        const dilation = parseInt(document.getElementById('bishop-dilation')?.value, 10) || 0;
        const effacement = parseInt(document.getElementById('bishop-effacement')?.value, 10) || 0;
        const station = parseInt(document.getElementById('bishop-station')?.value, 10) || 0;
        const consistency = parseInt(document.getElementById('bishop-consistency')?.value, 10) || 0;
        const position = parseInt(document.getElementById('bishop-position')?.value, 10) || 0;

        const total = dilation + effacement + station + consistency + position;

        let interpretation = '';
        let color = '';

        if (total >= 8) {
            interpretation = 'Favourable cervix – high likelihood of successful induction.';
            color = '#4CAF50';
        } else if (total >= 5) {
            interpretation = 'Intermediate – consider cervical ripening strategies before induction.';
            color = '#FFC107';
        } else {
            interpretation = 'Unfavourable cervix – cervical ripening recommended prior to induction.';
            color = '#F44336';
        }

        const result = { total, interpretation };

        document.getElementById('bishop-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color};">Bishop score: <strong>${total}</strong></div>
                <div class="score-recommendation" style="color: ${color};">${interpretation}</div>
            </div>
        `;

        return result;
    }

    bindBishopEvents() {
        const button = document.querySelector('.calc-button[data-calc="bishop-score"]');
        if (button) {
            button.addEventListener('click', () => this.calculateBishop());
        }
    }

    /**
     * Obstetrics – MEOWS Calculator
     */
    getMeowsTemplate() {
        return `
            <div class="calculator-form">
                <h4>Maternity Early Obstetric Warning Score (MEOWS)</h4>
                <p><small>Enter the most recent set of vital signs. Escalate according to local maternity early warning policy.</small></p>
                <div class="calc-grid">
                    <div class="calc-input-group">
                        <label>Respiratory rate (breaths/min):</label>
                        <input type="number" id="meows-resp" min="0" step="1" placeholder="18">
                    </div>
                    <div class="calc-input-group">
                        <label>SpO₂ (%):</label>
                        <input type="number" id="meows-spo2" min="0" max="100" step="1" placeholder="97">
                    </div>
                    <div class="calc-checkbox-group" style="margin-top: 8px;">
                        <label><input type="checkbox" id="meows-oxygen"> Receiving supplemental oxygen</label>
                    </div>
                    <div class="calc-input-group">
                        <label>Temperature (°C):</label>
                        <input type="number" id="meows-temp" step="0.1" placeholder="36.8">
                    </div>
                    <div class="calc-input-group">
                        <label>Systolic BP (mmHg):</label>
                        <input type="number" id="meows-sbp" min="0" step="1" placeholder="118">
                    </div>
                    <div class="calc-input-group">
                        <label>Diastolic BP (mmHg):</label>
                        <input type="number" id="meows-dbp" min="0" step="1" placeholder="70">
                    </div>
                    <div class="calc-input-group">
                        <label>Heart rate (beats/min):</label>
                        <input type="number" id="meows-hr" min="0" step="1" placeholder="88">
                    </div>
                    <div class="calc-select-group">
                        <label>Consciousness (AVPU):</label>
                        <select id="meows-consciousness">
                            <option value="0">Alert</option>
                            <option value="1">Responds to Voice</option>
                            <option value="2">Responds to Pain/Unresponsive</option>
                        </select>
                    </div>
                    <div class="calc-input-group">
                        <label>Urine output (ml/hour):</label>
                        <input type="number" id="meows-urine" min="0" step="1" placeholder="55">
                    </div>
                </div>
                <button class="calc-button" data-calc="meows">Calculate MEOWS</button>
                <div id="meows-result" class="calc-result"></div>
                <div class="calc-reference"><small>Based on UK Obstetric Surveillance System / NHS England MEOWS trigger thresholds. Always follow local escalation policies.</small></div>
            </div>
        `;
    }

    calculateMeows() {
        const resp = Number.parseFloat(document.getElementById('meows-resp')?.value ?? '');
        const spo2 = Number.parseFloat(document.getElementById('meows-spo2')?.value ?? '');
        const temp = Number.parseFloat(document.getElementById('meows-temp')?.value ?? '');
        const sbp = Number.parseFloat(document.getElementById('meows-sbp')?.value ?? '');
        const dbp = Number.parseFloat(document.getElementById('meows-dbp')?.value ?? '');
        const hr = Number.parseFloat(document.getElementById('meows-hr')?.value ?? '');
        const consciousness = Number.parseInt(document.getElementById('meows-consciousness')?.value ?? '0', 10);
        const urine = Number.parseFloat(document.getElementById('meows-urine')?.value ?? '');
        const onOxygen = Boolean(document.getElementById('meows-oxygen')?.checked);

        const numericInputs = [resp, spo2, temp, sbp, dbp, hr, urine];
        if (numericInputs.some(value => !Number.isFinite(value))) {
            document.getElementById('meows-result').innerHTML = '<p class="error">Please enter numeric values for all vital signs.</p>';
            return { error: 'Invalid MEOWS inputs' };
        }

        const scoreRange = (value, ranges) => {
            for (const range of ranges) {
                const aboveMin = typeof range.min === 'number' ? value >= range.min : true;
                const belowMax = typeof range.max === 'number' ? value <= range.max : true;
                if (aboveMin && belowMax) {
                    return range.score;
                }
            }
            return 0;
        };

        const respScore = scoreRange(resp, [
            { max: 10, score: 2 },
            { min: 11, max: 20, score: 0 },
            { min: 21, max: 24, score: 1 },
            { min: 25, score: 2 }
        ]);

        const spo2Score = scoreRange(spo2, [
            { min: 96, max: 100, score: 0 },
            { min: 94, max: 95, score: 1 },
            { max: 93.999, score: 2 }
        ]);

        const tempScore = scoreRange(temp, [
            { max: 34.9, score: 2 },
            { min: 35, max: 35.9, score: 1 },
            { min: 36, max: 37.4, score: 0 },
            { min: 37.5, max: 38, score: 1 },
            { min: 38.1, score: 2 }
        ]);

        const sbpScore = scoreRange(sbp, [
            { max: 89, score: 2 },
            { min: 90, max: 99, score: 1 },
            { min: 100, max: 139, score: 0 },
            { min: 140, max: 159, score: 1 },
            { min: 160, score: 2 }
        ]);

        const dbpScore = scoreRange(dbp, [
            { max: 49, score: 1 },
            { min: 50, max: 89, score: 0 },
            { min: 90, max: 99, score: 1 },
            { min: 100, score: 2 }
        ]);

        const hrScore = scoreRange(hr, [
            { max: 49, score: 2 },
            { min: 50, max: 59, score: 1 },
            { min: 60, max: 100, score: 0 },
            { min: 101, max: 120, score: 1 },
            { min: 121, score: 2 }
        ]);

        const oxygenScore = onOxygen ? 1 : 0;
        const urineScore = scoreRange(urine, [
            { min: 51, score: 0 },
            { min: 30, max: 50, score: 1 },
            { max: 29.999, score: 2 }
        ]);

        const scores = [respScore, spo2Score, tempScore, sbpScore, dbpScore, hrScore, oxygenScore, consciousness, urineScore];
        const total = scores.reduce((sum, val) => sum + val, 0);
        const redTriggers = scores.filter(val => val >= 2).length;
        const yellowTriggers = scores.filter(val => val === 1).length;

        let priority = '';
        let recommendation = '';
        let color = '';

        if (redTriggers >= 1 || total >= 4) {
            priority = 'Urgent medical review';
            recommendation = 'Escalate immediately to obstetric registrar/anaesthetics, initiate ABC approach and repeat observations every 15 minutes.';
            color = '#dc2626';
        } else if (yellowTriggers >= 2) {
            priority = 'Early escalation required';
            recommendation = 'Inform senior midwife or obstetric team within 30 minutes and repeat observations within 30 minutes.';
            color = '#f59e0b';
        } else {
            priority = 'Within normal limits';
            recommendation = 'Continue routine 4-hourly MEOWS monitoring and reassess if condition changes.';
            color = '#16a34a';
        }

        const breakdown = [
            { label: 'Respiratory rate', value: `${resp} /min`, score: respScore },
            { label: 'SpO₂', value: `${spo2}%${onOxygen ? ' (on O₂)' : ''}`, score: spo2Score + oxygenScore },
            { label: 'Temperature', value: `${temp.toFixed(1)} °C`, score: tempScore },
            { label: 'Systolic BP', value: `${sbp} mmHg`, score: sbpScore },
            { label: 'Diastolic BP', value: `${dbp} mmHg`, score: dbpScore },
            { label: 'Heart rate', value: `${hr} bpm`, score: hrScore },
            { label: 'Consciousness', value: ['Alert', 'Responds to Voice', 'Responds to Pain/Unresponsive'][consciousness] || 'Alert', score: consciousness },
            { label: 'Urine output', value: `${urine} ml/hour`, score: urineScore }
        ];

        document.getElementById('meows-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color};">Total MEOWS: <strong>${total}</strong></div>
                <div class="score-risk">${priority}</div>
                <div class="score-recommendation" style="color: ${color};">${recommendation}</div>
            </div>
            <div class="score-breakdown">
                <ul>
                    ${breakdown.map(item => `<li>${item.label}: ${item.value} (score ${item.score})</li>`).join('')}
                </ul>
            </div>
        `;

        return { total, redTriggers, yellowTriggers, priority, recommendation, breakdown };
    }

    bindMeowsEvents() {
        const button = document.querySelector('.calc-button[data-calc="meows"]');
        if (button) {
            button.addEventListener('click', () => this.calculateMeows());
        }
    }

    /**
     * Other – QTc Bazett
     */
    getQTCTemplate() {
        return `
            <div class="calculator-form">
                <h4>QTc (Bazett) Calculator</h4>
                <div class="calc-input-group">
                    <label>Measured QT interval (ms):</label>
                    <input type="number" id="qtc-qt" placeholder="420" min="0" step="1">
                </div>
                <div class="calc-input-group">
                    <label>Heart rate (beats/min):</label>
                    <input type="number" id="qtc-hr" placeholder="75" min="0" step="1">
                </div>
                <div class="calc-checkbox-group">
                    <label><input type="radio" name="qtc-sex" value="male"> Male</label>
                    <label><input type="radio" name="qtc-sex" value="female"> Female</label>
                </div>
                <button class="calc-button" data-calc="qtc-bazett">Calculate QTc</button>
                <div id="qtc-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>Bazett HC. Heart. 1920. Consider Fridericia correction at high heart rates.</small>
                </div>
            </div>
        `;
    }

    calculateQTC() {
        const qt = parseFloat(document.getElementById('qtc-qt')?.value);
        const hr = parseFloat(document.getElementById('qtc-hr')?.value);
        const sex = document.querySelector('input[name="qtc-sex"]:checked')?.value;

        if (!Number.isFinite(qt) || qt <= 0 || !Number.isFinite(hr) || hr <= 0) {
            document.getElementById('qtc-result').innerHTML = '<p class="error">Enter valid QT interval and heart rate.</p>';
            return { error: 'Invalid QTc inputs' };
        }

        const rr = 60 / hr; // seconds
        const qtc = qt / Math.sqrt(rr);

        let interpretation = '';
        let color = '';

        const threshold = sex === 'female' ? 470 : 450;
        if (qtc < threshold) {
            interpretation = 'Within normal limits.';
            color = '#4CAF50';
        } else if (qtc < 500) {
            interpretation = 'Borderline prolonged – review QT-prolonging medications and electrolytes.';
            color = '#FFC107';
        } else {
            interpretation = 'Marked QT prolongation – high torsades risk; urgent evaluation required.';
            color = '#F44336';
        }

        const result = { qtc, interpretation, rr, sex };

        document.getElementById('qtc-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color};">QTc: <strong>${qtc.toFixed(0)} ms</strong></div>
                <div class="score-risk">${interpretation}</div>
                <div style="margin-top: 8px; font-size: 0.8em; color: #666;">RR interval: ${rr.toFixed(2)} s${sex ? ` | Sex: ${sex}` : ''}</div>
            </div>
        `;

        return result;
    }

    bindQTCEvents() {
        const button = document.querySelector('.calc-button[data-calc="qtc-bazett"]');
        if (button) {
            button.addEventListener('click', () => this.calculateQTC());
        }
    }

    registerCriticalCareCalculators() {
        this.calculators.set('mews', {
            id: 'mews',
            name: 'Modified Early Warning Score (MEWS)',
            category: TOOL_CATEGORIES.CRITICAL_CARE,
            description: 'Physiologic track-and-trigger system to detect deterioration',
            keywords: ['mews', 'early warning', 'critical care'],
            getTemplate: () => this.getMEWSTemplate(),
            calculate: () => this.calculateMEWS(),
            bindEvents: () => this.bindMEWSEvents()
        });
    }

    registerRenalCalculators() {
        this.calculators.set('cockcroft-gault', {
            id: 'cockcroft-gault',
            name: 'Cockcroft-Gault CrCl',
            category: TOOL_CATEGORIES.RENAL,
            description: 'Estimate creatinine clearance for drug dosing',
            keywords: ['egfr', 'creatinine clearance', 'renal', 'cockcroft'],
            getTemplate: () => this.getCockcroftGaultTemplate(),
            calculate: () => this.calculateCockcroftGault(),
            bindEvents: () => this.bindCockcroftGaultEvents()
        });
    }

    registerGastroenterologyCalculators() {
        this.calculators.set('child-pugh', {
            id: 'child-pugh',
            name: 'Child-Pugh Score',
            category: TOOL_CATEGORIES.GASTROENTEROLOGY,
            description: 'Assess severity and prognosis of cirrhosis',
            keywords: ['child', 'pugh', 'cirrhosis', 'liver'],
            getTemplate: () => this.getChildPughTemplate(),
            calculate: () => this.calculateChildPugh(),
            bindEvents: () => this.bindChildPughEvents()
        });
    }

    registerEmergencyCalculators() {
        this.calculators.set('centor', {
            id: 'centor',
            name: 'Modified Centor (McIsaac) Score',
            category: TOOL_CATEGORIES.EMERGENCY,
            description: 'Predict streptococcal pharyngitis probability',
            keywords: ['centor', 'pharyngitis', 'sore throat'],
            getTemplate: () => this.getCentorTemplate(),
            calculate: () => this.calculateCentor(),
            bindEvents: () => this.bindCentorEvents()
        });
    }

    registerGeriatricsCalculators() {
        this.calculators.set('timed-up-go', {
            id: 'timed-up-go',
            name: 'Timed Up & Go Test',
            category: TOOL_CATEGORIES.GERIATRICS,
            description: 'Screen for mobility limitation and fall risk',
            keywords: ['timed up and go', 'fall risk', 'geriatrics'],
            getTemplate: () => this.getTimedUpGoTemplate(),
            calculate: () => this.calculateTimedUpGo(),
            bindEvents: () => this.bindTimedUpGoEvents()
        });

        this.calculators.set('clinical-frailty-scale', {
            id: 'clinical-frailty-scale',
            name: 'Clinical Frailty Scale (CFS)',
            category: TOOL_CATEGORIES.GERIATRICS,
            description: 'Nine-point frailty assessment to guide escalation decisions',
            keywords: ['frailty', 'cfs', 'geriatrics', 'rockwood'],
            getTemplate: () => this.getClinicalFrailtyTemplate(),
            calculate: () => this.calculateClinicalFrailty(),
            bindEvents: () => this.bindClinicalFrailtyEvents()
        });

        this.calculators.set('prisma-7', {
            id: 'prisma-7',
            name: 'PRISMA-7 Frailty Screen',
            category: TOOL_CATEGORIES.GERIATRICS,
            description: 'Rapid seven-item screen to identify high-risk older adults',
            keywords: ['prisma', 'frailty', 'screening', 'geriatrics'],
            getTemplate: () => this.getPrisma7Template(),
            calculate: () => this.calculatePrisma7(),
            bindEvents: () => this.bindPrisma7Events()
        });

        this.calculators.set('4at', {
            id: '4at',
            name: '4AT Delirium Screen',
            category: TOOL_CATEGORIES.GERIATRICS,
            description: 'Assess delirium risk and acute cognitive impairment',
            keywords: ['delirium', '4at', 'cognition', 'acute confusion'],
            getTemplate: () => this.getFourAtTemplate(),
            calculate: () => this.calculateFourAt(),
            bindEvents: () => this.bindFourAtEvents()
        });
    }

    registerPsychiatryCalculators() {
        this.calculators.set('phq9', {
            id: 'phq9',
            name: 'PHQ-9 Depression Severity',
            category: TOOL_CATEGORIES.PSYCHIATRY,
            description: 'Quantify depressive symptoms over the last 2 weeks',
            keywords: ['phq', 'depression', 'mental health'],
            getTemplate: () => this.getPHQ9Template(),
            calculate: () => this.calculatePHQ9(),
            bindEvents: () => this.bindPHQ9Events()
        });
    }

    registerEndocrineCalculators() {
        this.calculators.set('hba1c-eag', {
            id: 'hba1c-eag',
            name: 'HbA1c to eAG Converter',
            category: TOOL_CATEGORIES.ENDOCRINE,
            description: 'Translate HbA1c into estimated average glucose',
            keywords: ['hba1c', 'eag', 'diabetes'],
            getTemplate: () => this.getHba1cTemplate(),
            calculate: () => this.calculateHba1cEag(),
            bindEvents: () => this.bindHba1cEvents()
        });
    }

    registerChemistryCalculators() {
        this.calculators.set('anion-gap', {
            id: 'anion-gap',
            name: 'Serum Anion Gap',
            category: TOOL_CATEGORIES.CHEMISTRY,
            description: 'Evaluate metabolic acidosis etiology',
            keywords: ['anion gap', 'metabolic acidosis', 'chemistry'],
            getTemplate: () => this.getAnionGapTemplate(),
            calculate: () => this.calculateAnionGap(),
            bindEvents: () => this.bindAnionGapEvents()
        });
    }

    registerObstetricsCalculators() {
        this.calculators.set('bishop-score', {
            id: 'bishop-score',
            name: 'Bishop Score',
            category: TOOL_CATEGORIES.OBSTETRICS,
            description: 'Assess cervix favorability for induction of labour',
            keywords: ['bishop', 'labour', 'cervix'],
            getTemplate: () => this.getBishopTemplate(),
            calculate: () => this.calculateBishop(),
            bindEvents: () => this.bindBishopEvents()
        });

        this.calculators.set('meows', {
            id: 'meows',
            name: 'MEOWS Chart (Maternity Early Warning)',
            category: TOOL_CATEGORIES.OBSTETRICS,
            description: 'Aggregate score to prompt escalation in unwell maternity patients',
            keywords: ['meows', 'obstetric early warning', 'maternal observations'],
            getTemplate: () => this.getMeowsTemplate(),
            calculate: () => this.calculateMeows(),
            bindEvents: () => this.bindMeowsEvents()
        });
    }

    registerOtherCalculators() {
        this.calculators.set('qtc-bazett', {
            id: 'qtc-bazett',
            name: 'QTc (Bazett) Calculator',
            category: TOOL_CATEGORIES.OTHER,
            description: 'Correct QT interval for heart rate',
            keywords: ['qtc', 'ekg', 'bazett'],
            getTemplate: () => this.getQTCTemplate(),
            calculate: () => this.calculateQTC(),
            bindEvents: () => this.bindQTCEvents()
        });
    }
    
    getBSATemplate() {
        return `
            <div class="calculator-form">
                <h4>Body Surface Area (BSA)</h4>
                <p><small>Commonly used to dose chemotherapeutics and adjust physiological measurements</small></p>
                <div class="calc-input-group">
                    <label>Weight (kg):</label>
                    <input type="number" id="bsa-weight" placeholder="70" step="0.1" min="0">
                </div>
                <div class="calc-input-group">
                    <label>Height (cm):</label>
                    <input type="number" id="bsa-height" placeholder="175" step="0.1" min="0">
                </div>
                <div class="calc-select-group">
                    <label>Formula:</label>
                    <select id="bsa-formula">
                        <option value="mosteller" selected>Mosteller (1987)</option>
                        <option value="dubois">Du Bois &amp; Du Bois (1916)</option>
                        <option value="haycock">Haycock (1978)</option>
                    </select>
                </div>
                <button class="calc-button" data-calc="bsa">Calculate BSA</button>
                <div id="bsa-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>
                        <strong>References:</strong> Du Bois D, Arch Intern Med. 1916; Haycock GB, Clin Nephrol. 1978; Mosteller RD, N Engl J Med. 1987.
                    </small>
                </div>
            </div>
        `;
    }

    calculateBSA() {
        const weightInput = parseFloat(document.getElementById('bsa-weight')?.value);
        const heightInput = parseFloat(document.getElementById('bsa-height')?.value);
        const formula = document.getElementById('bsa-formula')?.value || 'mosteller';

        const weight = Number.isFinite(weightInput) ? weightInput : NaN;
        const height = Number.isFinite(heightInput) ? heightInput : NaN;

        if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0) {
            document.getElementById('bsa-result').innerHTML = '<p class="error">Enter weight &gt; 0 kg and height &gt; 0 cm.</p>';
            return { error: 'Invalid anthropometric inputs' };
        }

        let bsa = 0;
        let formulaName = '';
        let formulaExpression = '';

        switch (formula) {
            case 'dubois':
                bsa = 0.007184 * Math.pow(weight, 0.425) * Math.pow(height, 0.725);
                formulaName = 'Du Bois & Du Bois';
                formulaExpression = 'BSA = 0.007184 × W^0.425 × H^0.725';
                break;
            case 'haycock':
                bsa = 0.024265 * Math.pow(weight, 0.5378) * Math.pow(height / 100, 0.3964);
                formulaName = 'Haycock';
                formulaExpression = 'BSA = 0.024265 × W^0.5378 × (H in m)^0.3964';
                break;
            default:
                bsa = Math.sqrt((height * weight) / 3600);
                formulaName = 'Mosteller';
                formulaExpression = 'BSA = √((H × W) ÷ 3600)';
        }

        const bsaRounded = Math.round(bsa * 100) / 100;

        const result = {
            bsa: bsaRounded,
            rawBsa: bsa,
            formula: formulaName
        };

        document.getElementById('bsa-result').innerHTML = `
            <div class="score-result">
                <div class="score-value">
                    Estimated BSA: <strong>${bsaRounded.toFixed(2)} m²</strong>
                </div>
                <div class="score-risk" style="font-size: 0.9em; color: #555;">
                    Formula: ${formulaName}<br>
                    <span style="font-family: monospace;">${formulaExpression}</span>
                </div>
                <div style="margin-top: 8px; font-size: 0.8em; color: #666;">
                    Consider indexing drug doses and physiologic measurements (e.g., cardiac output) to patient-specific BSA.
                </div>
            </div>
        `;

        return result;
    }

    bindBSAEvents() {
        const button = document.querySelector('.calc-button[data-calc="bsa"]');
        if (button) {
            button.addEventListener('click', () => this.calculateBSA());
        }
    }

    getFluidBalanceTemplate() {
        return `
            <div class="calculator-form">
                <h4>24-hour Fluid Balance</h4>
                <p><small>Track intake, output, and net fluid status over a defined interval</small></p>
                <div class="calc-input-group">
                    <label>Oral intake (mL):</label>
                    <input type="number" id="fluid-oral" placeholder="1200" step="10" min="0">
                </div>
                <div class="calc-input-group">
                    <label>IV fluids/medications (mL):</label>
                    <input type="number" id="fluid-iv" placeholder="800" step="10" min="0">
                </div>
                <div class="calc-input-group">
                    <label>Other intake (tube feeds, etc.) (mL):</label>
                    <input type="number" id="fluid-other-intake" placeholder="0" step="10" min="0">
                </div>
                <hr>
                <div class="calc-input-group">
                    <label>Urine output (mL):</label>
                    <input type="number" id="fluid-urine" placeholder="1500" step="10" min="0">
                </div>
                <div class="calc-input-group">
                    <label>Drains/NG losses (mL):</label>
                    <input type="number" id="fluid-drains" placeholder="200" step="10" min="0">
                </div>
                <div class="calc-input-group">
                    <label>Insensible estimate (mL) - optional:</label>
                    <input type="number" id="fluid-insensible" placeholder="500" step="10" min="0">
                </div>
                <div class="calc-select-group">
                    <label>Assessment window:</label>
                    <select id="fluid-window">
                        <option value="24">24 hours</option>
                        <option value="12">12 hours</option>
                        <option value="8">8 hours</option>
                    </select>
                </div>
                <button class="calc-button" data-calc="fluid-balance">Calculate Balance</button>
                <div id="fluid-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>
                        Positive balance indicates fluid accumulation. Assess alongside weight trends and clinical exam.
                    </small>
                </div>
            </div>
        `;
    }

    calculateFluidBalance() {
        const oral = parseFloat(document.getElementById('fluid-oral')?.value) || 0;
        const iv = parseFloat(document.getElementById('fluid-iv')?.value) || 0;
        const otherIntake = parseFloat(document.getElementById('fluid-other-intake')?.value) || 0;
        const urine = parseFloat(document.getElementById('fluid-urine')?.value) || 0;
        const drains = parseFloat(document.getElementById('fluid-drains')?.value) || 0;
        const insensible = parseFloat(document.getElementById('fluid-insensible')?.value) || 0;
        const window = parseFloat(document.getElementById('fluid-window')?.value) || 24;

        const inputs = [oral, iv, otherIntake, urine, drains, insensible];
        const hasValues = inputs.some(value => Number.isFinite(value) && value > 0);

        if (!hasValues) {
            document.getElementById('fluid-result').innerHTML = '<p class="error">Enter at least one intake or output value.</p>';
            return { error: 'No values supplied' };
        }

        const totalIntake = oral + iv + otherIntake;
        const totalOutput = urine + drains + insensible;
        const net = totalIntake - totalOutput;

        let status = '';
        let color = '';
        if (net > 500) {
            status = 'Positive balance – consider diuresis or fluid restriction if clinically indicated.';
            color = '#F44336';
        } else if (net < -500) {
            status = 'Negative balance – ensure perfusion, assess for dehydration or over-diuresis.';
            color = '#FF9800';
        } else {
            status = 'Near-neutral balance – continue current plan if patient clinically stable.';
            color = '#4CAF50';
        }

        const hourly = net / window;

        const result = {
            intake: totalIntake,
            output: totalOutput,
            net,
            hourlyRate: hourly,
            windowHours: window
        };

        document.getElementById('fluid-result').innerHTML = `
            <div class="score-result">
                <div>Total intake: <strong>${totalIntake.toFixed(0)} mL</strong></div>
                <div>Total output: <strong>${totalOutput.toFixed(0)} mL</strong></div>
                <div class="score-value" style="color: ${color}; margin-top: 8px;">
                    Net balance (${window}-hour): <strong>${net >= 0 ? '+' : ''}${net.toFixed(0)} mL</strong>
                </div>
                <div style="font-size: 0.85em; color: #555;">Average net: ${net >= 0 ? '+' : ''}${hourly.toFixed(1)} mL/hour</div>
                <div class="score-recommendation" style="color: ${color}; margin-top: 8px;">
                    ${status}
                </div>
            </div>
        `;

        return result;
    }

    bindFluidBalanceEvents() {
        const button = document.querySelector('.calc-button[data-calc="fluid-balance"]');
        if (button) {
            button.addEventListener('click', () => this.calculateFluidBalance());
        }
    }
    
    /**
     * Get all calculators
     */
    getAllCalculators() {
        return Array.from(this.calculators.values());
    }
    
    /**
     * Get calculator by ID
     */
    getCalculator(id) {
        return this.calculators.get(id);
    }
    
    /**
     * Get calculators by category
     */
    getCalculatorsByCategory(category) {
        return this.getAllCalculators().filter(calc => calc.category === category);
    }
    
    /**
     * Get calculator count
     */
    getCalculatorCount() {
        return this.calculators.size;
    }
}

// Create and export singleton instance
export const v2Calculators = new V2Calculators();

console.log('✅ V2 Calculators module loaded with native implementations');
