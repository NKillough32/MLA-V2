/**
 * Calculator Bridge - Wraps V1 Calculator Methods for V2
 * 
 * This module provides access to all 40+ calculator implementations
 * from the V1 codebase by wrapping them with the appropriate context.
 */

// Create a bridge object that mimics the V1 MLAQuizApp context
class CalculatorBridge {
    constructor() {
        this.eventBus = null;
        this.storageManager = null;
        this.analyticsManager = null;
    }

    initialize(eventBus, storageManager, analyticsManager) {
        this.eventBus = eventBus;
        this.storageManager = storageManager;
        this.analyticsManager = analyticsManager;
    }

    // Bridge method for trackToolUsage
    trackToolUsage(toolType, toolName) {
        if (this.analyticsManager && this.analyticsManager.trackToolUsage) {
            this.analyticsManager.trackToolUsage(toolType, toolName);
        }
    }

    // Bridge method for switchMedicalTool
    switchMedicalTool(toolName) {
        if (this.eventBus) {
            this.eventBus.emit('tool:switch', toolName);
        }
    }

    // Bridge method for showToast
    showToast(message, type = 'info') {
        if (this.eventBus) {
            this.eventBus.emit('toast:show', { message, type });
        }
    }

    // Stub methods for features not yet implemented
    setupExportFeatures() {
        // Export features - to be implemented later
    }

    setupCalculatorNotes(calcType) {
        // Calculator notes - to be implemented later
    }

    // ============================================
    // WELLS SCORE FOR PE
    // ============================================
    
    getWellsCalculator() {
        return `
            <div class="calculator-form">
                <h4>Wells Criteria for Pulmonary Embolism</h4>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="wells-clinical-signs"> Clinical signs/symptoms of DVT (3 points)</label>
                    <label><input type="checkbox" id="wells-pe-likely"> PE is #1 diagnosis or equally likely (3 points)</label>
                    <label><input type="checkbox" id="wells-hr"> Heart rate >100 bpm (1.5 points)</label>
                    <label><input type="checkbox" id="wells-immobile"> Immobilization =3 days or surgery in previous 4 weeks (1.5 points)</label>
                    <label><input type="checkbox" id="wells-prev-pe"> Previous PE or DVT (1.5 points)</label>
                    <label><input type="checkbox" id="wells-hemoptysis"> Hemoptysis (1 point)</label>
                    <label><input type="checkbox" id="wells-malignancy"> Malignancy (treatment within 6 months or palliative) (1 point)</label>
                </div>
                <button onclick="window.calculatorBridge.calculateWells()">Calculate</button>
                <div id="wells-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>
                        <strong>Interpretation:</strong><br>
                        Score =4: Low probability (1.3%)<br>
                        Score 2-6: Moderate probability (16.2%)<br>
                        Score >6: High probability (40.6%)
                    </small>
                </div>
            </div>
        `;
    }

    calculateWells() {
        let score = 0;
        
        if (document.getElementById('wells-clinical-signs')?.checked) score += 3;
        if (document.getElementById('wells-pe-likely')?.checked) score += 3;
        if (document.getElementById('wells-hr')?.checked) score += 1.5;
        if (document.getElementById('wells-immobile')?.checked) score += 1.5;
        if (document.getElementById('wells-prev-pe')?.checked) score += 1.5;
        if (document.getElementById('wells-hemoptysis')?.checked) score += 1;
        if (document.getElementById('wells-malignancy')?.checked) score += 1;

        const result = document.getElementById('wells-result');
        if (!result) return;

        let interpretation = '';
        let riskClass = '';

        if (score <= 4) {
            interpretation = 'Low probability (1.3%)';
            riskClass = 'low-risk';
        } else if (score >= 2 && score <= 6) {
            interpretation = 'Moderate probability (16.2%)';
            riskClass = 'moderate-risk';
        } else {
            interpretation = 'High probability (40.6%)';
            riskClass = 'high-risk';
        }

        result.innerHTML = `
            <div class="${riskClass}">
                <strong>Wells Score: ${score}</strong><br>
                ${interpretation}<br><br>
                <strong>Management:</strong><br>
                ${score <= 4 ? 'Consider D-dimer. If negative, PE unlikely.' : 'Proceed to CT pulmonary angiography (CTPA).'}
            </div>
        `;
    }

    // ============================================
    // CRUSADE SCORE
    // ============================================
    
    getCRUSADECalculator() {
        return `
            <div class="calculator-form">
                <h4>CRUSADE Bleeding Risk Score</h4>
                <p><small>For ACS patients - predicts in-hospital major bleeding</small></p>
                
                <div class="calc-input-group">
                    <label>Heart Rate (bpm):</label>
                    <input type="number" id="crusade-hr" placeholder="80">
                </div>
                
                <div class="calc-input-group">
                    <label>Systolic BP (mmHg):</label>
                    <input type="number" id="crusade-sbp" placeholder="120">
                </div>
                
                <div class="calc-input-group">
                    <label>Hematocrit (%):</label>
                    <input type="number" id="crusade-hct" placeholder="40" step="0.1">
                </div>
                
                <div class="calc-input-group">
                    <label>Creatinine Clearance (mL/min):</label>
                    <input type="number" id="crusade-crcl" placeholder="90">
                </div>
                
                <div class="calc-checkbox-group">
                    <label><input type="radio" name="crusade-sex" value="female"> Female</label>
                    <label><input type="radio" name="crusade-sex" value="male"> Male</label>
                </div>
                
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="crusade-chf"> Signs of CHF at presentation</label>
                    <label><input type="checkbox" id="crusade-prev-vasc"> Previous vascular disease</label>
                    <label><input type="checkbox" id="crusade-diabetes"> Diabetes mellitus</label>
                </div>
                
                <button onclick="window.calculatorBridge.calculateCRUSADE()">Calculate</button>
                <div id="crusade-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>
                        <strong>Risk Categories:</strong><br>
                        Very Low: =20 (3.1% risk) | Low: 21-30 (5.5%)<br>
                        Moderate: 31-40 (8.6%) | High: 41-50 (11.9%)<br>
                        Very High: >50 (19.5%)
                    </small>
                </div>
            </div>
        `;
    }

    calculateCRUSADE() {
        const hr = parseFloat(document.getElementById('crusade-hr')?.value || 0);
        const sbp = parseFloat(document.getElementById('crusade-sbp')?.value || 0);
        const hct = parseFloat(document.getElementById('crusade-hct')?.value || 0);
        const crcl = parseFloat(document.getElementById('crusade-crcl')?.value || 0);
        const sex = document.querySelector('input[name="crusade-sex"]:checked')?.value;
        const chf = document.getElementById('crusade-chf')?.checked;
        const prevVasc = document.getElementById('crusade-prev-vasc')?.checked;
        const diabetes = document.getElementById('crusade-diabetes')?.checked;

        const result = document.getElementById('crusade-result');
        if (!result) return;

        if (!hr || !sbp || !hct || !crcl || !sex) {
            result.innerHTML = '<p class="error">Please fill in all required fields</p>';
            return;
        }

        let score = 0;

        // Heart rate points
        if (hr <= 70) score += 0;
        else if (hr <= 80) score += 1;
        else if (hr <= 90) score += 3;
        else if (hr <= 100) score += 6;
        else if (hr <= 110) score += 8;
        else if (hr <= 120) score += 10;
        else score += 11;

        // Systolic BP points
        if (sbp < 90) score += 10;
        else if (sbp < 100) score += 8;
        else if (sbp < 120) score += 5;
        else if (sbp < 180) score += 1;
        else if (sbp < 200) score += 3;
        else score += 5;

        // Hematocrit points
        if (hct < 31) score += 9;
        else if (hct < 34) score += 7;
        else if (hct < 37) score += 3;
        else if (hct < 40) score += 2;
        else score += 0;

        // Creatinine clearance points
        if (crcl <= 15) score += 39;
        else if (crcl <= 30) score += 35;
        else if (crcl <= 60) score += 28;
        else if (crcl <= 90) score += 17;
        else if (crcl <= 120) score += 7;
        else score += 0;

        // Female sex: +8 points
        if (sex === 'female') score += 8;

        // Signs of CHF: +7 points
        if (chf) score += 7;

        // Previous vascular disease: +6 points
        if (prevVasc) score += 6;

        // Diabetes: +6 points
        if (diabetes) score += 6;

        let risk = '';
        let bleedingRisk = '';

        if (score <= 20) {
            risk = 'Very Low';
            bleedingRisk = '3.1%';
        } else if (score <= 30) {
            risk = 'Low';
            bleedingRisk = '5.5%';
        } else if (score <= 40) {
            risk = 'Moderate';
            bleedingRisk = '8.6%';
        } else if (score <= 50) {
            risk = 'High';
            bleedingRisk = '11.9%';
        } else {
            risk = 'Very High';
            bleedingRisk = '19.5%';
        }

        result.innerHTML = `
            <div>
                <strong>CRUSADE Score: ${score}</strong><br>
                <strong>Risk Category: ${risk}</strong><br>
                <strong>Predicted In-Hospital Major Bleeding Risk: ${bleedingRisk}</strong><br><br>
                <strong>Clinical Use:</strong> Helps balance bleeding vs ischemic risk when choosing anticoagulation intensity in ACS.
            </div>
        `;
    }

    // ============================================
    // ASTHMA SEVERITY
    // ============================================
    
    getAsthmaCalculator() {
        return `
            <div class="calculator-form">
                <h4>Asthma Severity Assessment</h4>
                <p><small>BTS/SIGN Guidelines</small></p>
                
                <div class="calc-input-group">
                    <label>Peak Expiratory Flow (L/min):</label>
                    <input type="number" id="asthma-pef" placeholder="400">
                </div>
                
                <div class="calc-input-group">
                    <label>Predicted or Best PEF (L/min):</label>
                    <input type="number" id="asthma-predicted-pef" placeholder="500">
                </div>
                
                <div class="calc-input-group">
                    <label>Oxygen Saturation (%):</label>
                    <input type="number" id="asthma-spo2" placeholder="95" min="0" max="100">
                </div>
                
                <div class="calc-input-group">
                    <label>Respiratory Rate (breaths/min):</label>
                    <input type="number" id="asthma-rr" placeholder="20">
                </div>
                
                <div class="calc-input-group">
                    <label>Heart Rate (bpm):</label>
                    <input type="number" id="asthma-hr" placeholder="100">
                </div>
                
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="asthma-speech"> Cannot complete sentences</label>
                    <label><input type="checkbox" id="asthma-wheeze"> Absent breath sounds/silent chest</label>
                    <label><input type="checkbox" id="asthma-cyanosis"> Cyanosis</label>
                    <label><input type="checkbox" id="asthma-exhaustion"> Exhaustion/poor respiratory effort</label>
                    <label><input type="checkbox" id="asthma-altered"> Altered consciousness/confusion</label>
                </div>
                
                <button onclick="window.calculatorBridge.calculateAsthma()">Calculate</button>
                <div id="asthma-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>
                        <strong>Management:</strong> Life-threatening features require immediate senior review and ITU consideration
                    </small>
                </div>
            </div>
        `;
    }

    calculateAsthma() {
        const pef = parseFloat(document.getElementById('asthma-pef')?.value || 0);
        const predictedPef = parseFloat(document.getElementById('asthma-predicted-pef')?.value || 0);
        const spo2 = parseFloat(document.getElementById('asthma-spo2')?.value || 100);
        const rr = parseFloat(document.getElementById('asthma-rr')?.value || 0);
        const hr = parseFloat(document.getElementById('asthma-hr')?.value || 0);
        
        const speech = document.getElementById('asthma-speech')?.checked;
        const wheeze = document.getElementById('asthma-wheeze')?.checked;
        const cyanosis = document.getElementById('asthma-cyanosis')?.checked;
        const exhaustion = document.getElementById('asthma-exhaustion')?.checked;
        const altered = document.getElementById('asthma-altered')?.checked;

        const result = document.getElementById('asthma-result');
        if (!result) return;

        if (!pef || !predictedPef) {
            result.innerHTML = '<p class="error">Please enter PEF values</p>';
            return;
        }

        const pefPercent = (pef / predictedPef) * 100;
        
        let severity = '';
        let management = '';

        // Life-threatening features
        if (pefPercent < 33 || spo2 < 92 || wheeze || cyanosis || exhaustion || altered || pef < 33) {
            severity = 'LIFE-THREATENING';
            management = `
                <strong style="color: #dc2626;">?? IMMEDIATE SENIOR REVIEW REQUIRED</strong><br>
                - Oxygen to maintain SpO2 94-98%<br>
                - Nebulized salbutamol 5mg + ipratropium 500mcg<br>
                - Prednisolone 40-50mg PO or hydrocortisone 100mg IV<br>
                - Magnesium sulfate 2g IV over 20min<br>
                - Consider aminophylline, ITU referral
            `;
        }
        // Acute severe features
        else if (pefPercent >= 33 && pefPercent < 50 || rr >= 25 || hr >= 110 || speech) {
            severity = 'ACUTE SEVERE';
            management = `
                <strong style="color: #ea580c;">?? URGENT TREATMENT</strong><br>
                - Oxygen to maintain SpO2 94-98%<br>
                - Nebulized salbutamol 5mg + ipratropium 500mcg<br>
                - Prednisolone 40-50mg PO or hydrocortisone 100mg IV<br>
                - Monitor closely, consider magnesium if not improving
            `;
        }
        // Moderate
        else if (pefPercent >= 50 && pefPercent < 75) {
            severity = 'MODERATE';
            management = `
                - Nebulized salbutamol 5mg (or 10 puffs via spacer)<br>
                - Prednisolone 40-50mg PO<br>
                - Oxygen if SpO2 <94%<br>
                - Reassess after 15-30 minutes
            `;
        }
        // Mild
        else {
            severity = 'MILD';
            management = `
                - Salbutamol inhaler 4-10 puffs via spacer<br>
                - Consider oral prednisolone if not improving<br>
                - Review asthma action plan
            `;
        }

        result.innerHTML = `
            <div>
                <strong>PEF: ${pef} L/min (${pefPercent.toFixed(1)}% of predicted)</strong><br>
                <strong>Severity: ${severity}</strong><br>
                SpO2: ${spo2}% | RR: ${rr} | HR: ${hr}<br><br>
                <strong>Management:</strong><br>
                ${management}
            </div>
        `;
    }
}

// Create singleton instance
const bridge = new CalculatorBridge();

// Make it available globally for onclick handlers
if (typeof window !== 'undefined') {
    window.calculatorBridge = bridge;
    
    // Bridge the ExtractedCalculators methods to work with our system
    // This allows the extracted calculators (which use window.quizApp) to work in V2
    if (window.ExtractedCalculators) {
        // Create a bridge context object that mimics window.quizApp
        const quizAppBridge = {
            // Copy all methods from ExtractedCalculators
            ...window.ExtractedCalculators,
            
            // Add V2 bridge methods for compatibility
            trackToolUsage: (type, name) => bridge.trackToolUsage(type, name),
            switchMedicalTool: (name) => bridge.switchMedicalTool(name),
            showToast: (msg, type) => bridge.showToast(msg, type)
        };
        
        // Make the bridge available as window.quizApp for onclick handlers
        window.quizApp = quizAppBridge;
        
        console.log('✅ ExtractedCalculators bridged to window.quizApp');
    }
}

export default bridge;
