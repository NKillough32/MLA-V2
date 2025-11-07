    loadCalculator(calcType) {
        // Track tool usage
        this.trackToolUsage('calculator', calcType);
        
        // Switch to dedicated calculator panel
        this.switchMedicalTool('calculator-detail');
        
        const container = document.getElementById('calculator-detail-container');
        if (!container) return;
        
        // Add back button and structured content
        let calculatorContent = `
            <div class="calculator-header">
                <button class="back-btn" onclick="window.quizApp.switchMedicalTool('calculators'); event.stopPropagation();">? Back to Calculators</button>
                <h3 id="calculator-title"></h3>
            </div>
            <div class="calculator-content">
        `;
        
        let calculatorTitle = '';
        
        switch (calcType) {
            case 'bmi':
                calculatorTitle = 'BMI Calculator';
                calculatorContent += this.getBMICalculator();
                break;
            case 'chads2vasc':
                calculatorTitle = 'CHA2DS2-VASc Score';
                calculatorContent += this.getCHADS2VAScCalculator();
                break;
            case 'hasbled':
                calculatorTitle = 'HAS-BLED Score';
                calculatorContent += this.getHASBLEDCalculator();
                break;
            case 'gcs':
                calculatorTitle = 'Glasgow Coma Scale';
                calculatorContent += this.getGCSCalculator();
                break;
            case 'apache':
                calculatorTitle = 'APACHE II Score';
                calculatorContent += this.getAPACHECalculator();
                break;
            case 'wells':
                calculatorTitle = 'Wells Score for PE';
                calculatorContent += this.getWellsCalculator();
                break;
            case 'qrisk':
                calculatorTitle = 'QRISK3 Calculator';
                calculatorContent += this.getQRISKCalculator();
                break;
            case 'madders':
                calculatorTitle = 'MADDERS Score';
                calculatorContent += this.getMADDERSCalculator();
                break;
            case 'mews':
                calculatorTitle = 'MEWS Score';
                calculatorContent += this.getMEWSCalculator();
                break;
            case 'crb65':
                calculatorTitle = 'CRB-65 Score';
                calculatorContent += this.getCRB65Calculator();
                break;
            case 'rockall':
                calculatorTitle = 'Rockall Score';
                calculatorContent += this.getRockallCalculator();
                break;
            case 'child-pugh':
                calculatorTitle = 'Child-Pugh Score';
                calculatorContent += this.getChildPughCalculator();
                break;
            case 'ottawa-ankle':
                calculatorTitle = 'Ottawa Ankle Rules';
                calculatorContent += this.getOttawaAnkleCalculator();
                break;
            case 'egfr':
                calculatorTitle = 'eGFR Calculator';
                calculatorContent += this.getEGFRCalculator();
                break;
            case 'urea-creatinine':
                calculatorTitle = 'Urea:Creatinine Ratio';
                calculatorContent += this.getUreaCreatinineCalculator();
                break;
            case 'abcd2':
                calculatorTitle = 'ABCD² Score';
                calculatorContent += this.getABCD2Calculator();
                break;
            case 'must':
                calculatorTitle = 'MUST Score';
                calculatorContent += this.getMUSTCalculator();
                break;
            case 'waterlow':
                calculatorTitle = 'Waterlow Score';
                calculatorContent += this.getWaterlowCalculator();
                break;
            case 'grace':
                calculatorTitle = 'GRACE Score';
                calculatorContent += this.getGRACECalculator();
                break;
            case 'crusade':
                calculatorTitle = 'CRUSADE Score';
                calculatorContent += this.getCRUSADECalculator();
                break;
            case 'phq9':
                calculatorTitle = 'PHQ-9 Depression Scale';
                calculatorContent += this.getPHQ9Calculator();
                break;
            case 'gad7':
                calculatorTitle = 'GAD-7 Anxiety Scale';
                calculatorContent += this.getGAD7Calculator();
                break;
            case 'mse':
                calculatorTitle = 'Mental State Examination';
                calculatorContent += this.getMSECalculator();
                break;
            case 'mmse':
                calculatorTitle = 'Mini Mental State Examination';
                calculatorContent += this.getMMSECalculator();
                break;
            case 'insulin-sliding':
                calculatorTitle = 'Insulin Sliding Scale';
                calculatorContent += this.getInsulinSlidingCalculator();
                break;
            case 'vasopressor':
                calculatorTitle = 'Vasopressor Dosing';
                calculatorContent += this.getVasopressorCalculator();
                break;
            case 'unit-converter':
                calculatorTitle = 'Clinical Unit Converter';
                calculatorContent += this.getUnitConverterCalculator();
                break;
            case 'drug-volume':
                calculatorTitle = 'Drug Volume Calculator';
                calculatorContent += this.getDrugVolumeCalculator();
                break;
            case 'news2':
                calculatorTitle = 'NEWS2 Score';
                calculatorContent += this.getNEWS2Calculator();
                break;
            case 'curb65':
                calculatorTitle = 'CURB-65 Score';
                calculatorContent += this.getCURB65Calculator();
                break;
            case 'palliative':
                calculatorTitle = 'Palliative Care Calculator';
                calculatorContent += this.getPalliativeCalculator();
                break;
            case 'paediatric-dosing':
                calculatorTitle = 'Paediatric Dosing Calculator';
                calculatorContent += this.getPaediatricDosingCalculator();
                break;
            case 'infusion-rate':
                calculatorTitle = 'Infusion Rate Calculator';
                calculatorContent += this.getInfusionRateCalculator();
                break;
            case 'rass':
                calculatorTitle = 'RASS Scale';
                calculatorContent += this.getRASSCalculator();
                break;
            case 'frax-fracture':
                calculatorTitle = 'FRAX Fracture Risk';
                calculatorContent += this.getFractureRiskCalculator();
                break;
            case 'cockcroft-gault':
                calculatorTitle = 'Cockcroft-Gault eGFR';
                calculatorContent += this.getCockcroftGaultCalculator();
                break;
            case 'bsa':
                calculatorTitle = 'Body Surface Area Calculator';
                calculatorContent += this.getBSACalculator();
                break;
            case 'fluid-balance':
                calculatorTitle = 'Fluid Balance Calculator';
                calculatorContent += this.getFluidBalanceCalculator();
                break;
            case 'timi':
                calculatorTitle = 'TIMI Risk Score';
                calculatorContent += this.getTIMICalculator();
                break;
            case 'nihss':
                calculatorTitle = 'NIH Stroke Scale';
                calculatorContent += this.getNIHSSCalculator();
                break;
            case 'rankin':
                calculatorTitle = 'Modified Rankin Scale';
                calculatorContent += this.getModifiedRankinCalculator();
                break;
            case 'frailty':
                calculatorTitle = 'Clinical Frailty Scale (Rockwood)';
                calculatorContent += this.getFrailtyCalculator();
                break;
            case 'barthel':
                calculatorTitle = 'Barthel Index (ADL)';
                calculatorContent += this.getBarthelCalculator();
                break;
            case 'anion-gap':
                calculatorTitle = 'Anion Gap Calculator';
                calculatorContent += this.getAnionGapCalculator();
                break;
            case 'wells-dvt':
                calculatorTitle = 'Wells DVT Score';
                calculatorContent += this.getWellsDVTCalculator();
                break;
            case 'perc':
                calculatorTitle = 'PERC Rule';
                calculatorContent += this.getPERCCalculator();
                break;
            case 'rcri':
                calculatorTitle = 'Revised Cardiac Risk Index';
                calculatorContent += this.getRCRICalculator();
                break;
            case 'qtc':
                calculatorTitle = 'Corrected QT Calculator';
                calculatorContent += this.getQTcCalculator();
                break;
            case 'corrected-sodium':
                calculatorTitle = 'Corrected Sodium';
                calculatorContent += this.getCorrectedSodiumCalculator();
                break;
            case 'osmolal-gap':
                calculatorTitle = 'Osmolal Gap';
                calculatorContent += this.getOsmolalGapCalculator();
                break;
            case 'centor':
                calculatorTitle = 'Centor Score';
                calculatorContent += this.getCentorCalculator();
                break;
            case 'alvarado':
                calculatorTitle = 'Alvarado Score';
                calculatorContent += this.getAlvaradoCalculator();
                break;
            case 'glasgow-blatchford':
                calculatorTitle = 'Glasgow-Blatchford Score';
                calculatorContent += this.getGlasgowBlatchfordCalculator();
                break;
            case 'apgar':
                calculatorTitle = 'APGAR Score';
                calculatorContent += this.getAPGARCalculator();
                break;
            case 'bishop':
                calculatorTitle = 'Bishop Score';
                calculatorContent += this.getBishopCalculator();
                break;
            case 'map':
                calculatorTitle = 'Mean Arterial Pressure';
                calculatorContent += this.getMAPCalculator();
                break;
            case 'aa-gradient':
                calculatorTitle = 'A-a Gradient';
                calculatorContent += this.getAAGradientCalculator();
                break;
            case 'corrected-calcium':
                calculatorTitle = 'Corrected Calcium';
                calculatorContent += this.getCorrectedCalciumCalculator();
                break;
            case 'ldl-calc':
                calculatorTitle = 'LDL Calculator';
                calculatorContent += this.getLDLCalculator();
                break;
            case 'winters':
                calculatorTitle = 'Winters Formula';
                calculatorContent += this.getWintersCalculator();
                break;
            case 'asthma':
                calculatorTitle = 'Asthma Severity Assessment';
                calculatorContent += this.getAsthmaCalculator();
                break;
            default:
                calculatorTitle = 'Calculator';
                calculatorContent += '<p>Calculator not found.</p>';
        }
        
        calculatorContent += '</div>';
        calculatorContent = calculatorContent.replace('<h3 id="calculator-title"></h3>', `<h3 id="calculator-title">${calculatorTitle}</h3>`);
        container.innerHTML = calculatorContent;

        // Attach export buttons to results and per-calculator notes area
        try {
            // Ensure export features are available across calc-result blocks
            if (typeof this.setupExportFeatures === 'function') {
                this.setupExportFeatures();
            }

            // Add notes area for this calculator (persisted via localStorage)
            if (typeof this.setupCalculatorNotes === 'function') {
                this.setupCalculatorNotes(calcType);
            }
        } catch (err) {
            console.warn('?? Failed to setup export/features or notes for calculator:', err);
        }

        console.log('?? Loaded calculator:', calcType);
    }

    getBMICalculator() {
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
                <button onclick="window.quizApp.calculateBMI()">Calculate</button>
                <div id="bmi-result" class="calc-result"></div>
                <div class="calc-reference">
                    <small>
                        <strong>BMI Categories (WHO):</strong><br>
                        Underweight: &lt;18.5 | Normal: 18.5-24.9<br>
                        Overweight: 25-29.9 | Obese: =30<br>
                        <strong>Asian populations:</strong> Overweight =23, Obese =27.5
                    </small>
                </div>
            </div>
        `;
    }

    getFrailtyCalculator() {
        return `
            <div class="calculator-form">
                <h4>Clinical Frailty Scale (Rockwood)</h4>
                <p><small>Select the category that best matches the patient</small></p>
                <div class="calc-input-group" id="frailty-options-detail">
                    <select id="frailty-select">
                        <option value="">-- Select frailty score --</option>
                        <option value="1">1 — Very fit</option>
                        <option value="2">2 — Well</option>
                        <option value="3">3 — Managing well</option>
                        <option value="4">4 — Vulnerable</option>
                        <option value="5">5 — Mildly frail</option>
                        <option value="6">6 — Moderately frail</option>
                        <option value="7">7 — Severely frail</option>
                        <option value="8">8 — Very severely frail</option>
                        <option value="9">9 — Terminally ill</option>
                    </select>
                </div>
                <button onclick="window.quizApp.calculateFrailty()">Calculate</button>
                <div id="frailty-detail-result" class="calc-result"></div>
                <div class="calc-reference"><small>Rockwood Clinical Frailty Scale (1–9): use as an aid to clinical judgement.</small></div>
            </div>
        `;
    }

    calculateFrailty() {
        const sel = document.getElementById('frailty-select');
        const out = document.getElementById('frailty-detail-result');
        if (!sel || !out) return;
        const val = sel.value;
        if (!val) {
            out.innerHTML = '<p class="error">Please select a frailty score</p>';
            return;
        }
        const descriptions = {
            1: 'Very fit — robust, active, energetic and motivated. Typically exercises regularly.',
            2: 'Well — no active disease symptoms but less fit than category 1.',
            3: 'Managing well — medical problems are well controlled, not regularly active beyond routine activities.',
            4: 'Vulnerable — not dependent on others for daily help, but symptoms limit activities.',
            5: 'Mildly frail — evident slowing and need help in high order instrumental activities of daily living.',
            6: 'Moderately frail — need help with all outside activities and with keeping house.',
            7: 'Severely frail — completely dependent for personal care, but stable and not at high risk of dying within 6 months.',
            8: 'Very severely frail — completely dependent, approaching the end of life. Typically approaching high risk of dying.',
            9: 'Terminally ill — life expectancy <6 months, not otherwise evidently frail.'
        };
        const guidance = (n) => {
            const num = parseInt(n, 10);
            if (num <= 3) return 'Not frail — encourage activity and prevention.';
            if (num === 4) return 'Pre-frail/vulnerable — consider targeted interventions (exercise, medication review).';
            if (num >=5 && num <=6) return 'Frailty present — consider CGA, falls review and medication optimisation.';
            return 'High dependency — prioritise care needs, consider palliative needs assessment where appropriate.';
        };

        out.innerHTML = `
            <div>
                <strong>Score: ${val}</strong>
                <div style="margin-top:8px">${descriptions[val]}</div>
                <div style="margin-top:8px;color:#374151;font-weight:600">${guidance(val)}</div>
            </div>
        `;
    }

    getBarthelCalculator() {
        return `
            <div class="calculator-form">
                <h4>Barthel Index (ADL)</h4>
                <p><small>Complete the items and press Calculate</small></p>
                <div class="calc-input-group" id="barthel-detail-items">
                    <!-- Simplified form: items named to match common Barthel scoring -->
                    <label>Feeding: <select id="b-feeding"><option value="0">Dependent (0)</option><option value="5">Needs assistance (5)</option><option value="10">Independent (10)</option></select></label>
                    <label>Bathing: <select id="b-bathing"><option value="0">Dependent (0)</option><option value="5">Independent (5)</option></select></label>
                    <label>Grooming: <select id="b-grooming"><option value="0">Needs help (0)</option><option value="5">Independent (5)</option></select></label>
                    <label>Dressing: <select id="b-dressing"><option value="0">Dependent (0)</option><option value="5">Needs help (5)</option><option value="10">Independent (10)</option></select></label>
                    <label>Bowels: <select id="b-bowels"><option value="0">Incontinent (0)</option><option value="5">Occasional accident (5)</option><option value="10">Continent (10)</option></select></label>
                    <label>Bladder: <select id="b-bladder"><option value="0">Incontinent (0)</option><option value="5">Occasional accident (5)</option><option value="10">Continent (10)</option></select></label>
                    <label>Toilet use: <select id="b-toilet"><option value="0">Dependent (0)</option><option value="5">Needs some help (5)</option><option value="10">Independent (10)</option></select></label>
                    <label>Transfers (bed-chair): <select id="b-transfers"><option value="0">Dependent (0)</option><option value="5">Major help (5)</option><option value="10">Minor help (10)</option><option value="15">Independent (15)</option></select></label>
                    <label>Mobility (level): <select id="b-mobility"><option value="0">Dependent (0)</option><option value="5">Immobile (5)</option><option value="10">Walks with help (10)</option><option value="15">Independent (15)</option></select></label>
                    <label>Stairs: <select id="b-stairs"><option value="0">Unable (0)</option><option value="5">Needs help (5)</option><option value="10">Independent (10)</option></select></label>
                </div>
                <button onclick="window.quizApp.calculateBarthel()">Calculate</button>
                <div id="barthel-detail-result" class="calc-result"></div>
                <div class="calc-reference"><small>Score 0-100. Higher scores indicate greater independence.</small></div>
            </div>
        `;
    }

    calculateBarthel() {
        const ids = ['b-feeding','b-bathing','b-grooming','b-dressing','b-bowels','b-bladder','b-toilet','b-transfers','b-mobility','b-stairs'];
        let total = 0;
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) total += parseInt(el.value, 10) || 0;
        });
        let interpretation = 'Total dependency';
        if (total === 100) interpretation = 'Independent';
        else if (total >= 91) interpretation = 'Slight dependency';
        else if (total >= 61) interpretation = 'Moderate dependency';
        else if (total >= 21) interpretation = 'Severe dependency';
        document.getElementById('barthel-detail-result').innerHTML = `
            <div>
                <strong>Barthel Total: ${total} / 100</strong>
                <div style="margin-top:8px">Interpretation: ${interpretation}</div>
            </div>
        `;
    }

    calculateBMI() {
        const weight = parseFloat(document.getElementById('bmi-weight').value);
        const height = parseFloat(document.getElementById('bmi-height').value) / 100; // Convert cm to m
        const waist = parseFloat(document.getElementById('bmi-waist').value);
        const ethnicity = document.getElementById('bmi-ethnicity').value;
        const sex = document.querySelector('input[name="bmi-sex"]:checked')?.value;
        
        if (!weight || !height) {
            document.getElementById('bmi-result').innerHTML = '<p class="error">Please enter valid weight and height</p>';
            return;
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
        
        document.getElementById('bmi-result').innerHTML = `
            <div class="bmi-result-display">
                <div class="bmi-value" style="color: ${color}; font-size: 1.2em;">
                    <strong>BMI: ${bmi.toFixed(1)} kg/m²</strong>
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
    }

    getCHADS2VAScCalculator() {
        return `
            <div class="calculator-form">
                <h4>CHA2DS2-VASc Score</h4>
                <p><small>Stroke risk assessment in atrial fibrillation</small></p>
                
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="chads-chf"> Congestive heart failure (+1)</label>
                    <label><input type="checkbox" id="chads-htn"> Hypertension (+1)</label>
                    <label><input type="checkbox" id="chads-age75"> Age =75 years (+2)</label>
                    <label><input type="checkbox" id="chads-diabetes"> Diabetes mellitus (+1)</label>
                    <label><input type="checkbox" id="chads-stroke"> Stroke/TIA/thromboembolism (+2)</label>
                    <label><input type="checkbox" id="chads-vascular"> Vascular disease (+1)</label>
                    <label><input type="checkbox" id="chads-age65"> Age 65-74 years (+1)</label>
                    <label><input type="checkbox" id="chads-female"> Female sex (+1)</label>
                </div>
                
                <button onclick="window.quizApp.calculateCHADS2VASc()">Calculate Score</button>
                <div id="chads-result" class="calc-result"></div>
            </div>
        `;
    }

    calculateCHADS2VASc() {
        let score = 0;
        
        if (document.getElementById('chads-chf').checked) score += 1;
        if (document.getElementById('chads-htn').checked) score += 1;
        if (document.getElementById('chads-age75').checked) score += 2;
        if (document.getElementById('chads-diabetes').checked) score += 1;
        if (document.getElementById('chads-stroke').checked) score += 2;
        if (document.getElementById('chads-vascular').checked) score += 1;
        if (document.getElementById('chads-age65').checked) score += 1;
        
        const isFemale = document.getElementById('chads-female').checked;
        if (isFemale) score += 1;
        
        let risk = '';
        let recommendation = '';
        let color = '';
        
        // Updated UK guidelines: sex-specific treatment recommendations
        if (score === 0) {
            risk = 'Low risk (0.2%/year)';
            recommendation = 'No anticoagulation recommended';
            color = '#4CAF50';
        } else if (score === 1) {
            if (isFemale && score === 1) {
                // Female with score 1 (sex alone) - special case
                risk = 'Low-moderate risk (0.6%/year)';
                recommendation = 'Female sex alone: generally no anticoagulation. Consider other risk factors';
                color = '#FF9800';
            } else {
                // Male with score 1 or female with other risk factors
                risk = 'Low-moderate risk (0.6%/year)';
                recommendation = 'Consider anticoagulation (men =1 or women =2 with non-sex risk factors)';
                color = '#FF9800';
            }
        } else {
            // Score =2
            risk = 'High risk (=2.2%/year)';
            recommendation = 'Anticoagulation recommended unless contraindicated';
            color = '#F44336';
        }
        
        document.getElementById('chads-result').innerHTML = `
            <div class="score-result">
                <div class="score-value" style="color: ${color}">
                    Score: <strong>${score}</strong>
                </div>
                <div class="score-risk">${risk}</div>
                <div class="score-recommendation" style="color: ${color}">
                    <strong>${recommendation}</strong>
                </div>
                <div style="margin-top: 8px; font-size: 0.8em; color: #666;">
                    Based on current UK guidelines. Consider individual bleeding risk (HAS-BLED).
                </div>
            </div>
        `;
    }

    getHASBLEDCalculator() {
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
                
                <button onclick="window.quizApp.calculateHASBLED()">Calculate Score</button>
                <div id="hasbled-result" class="calc-result"></div>
            </div>
        `;
    }

    calculateHASBLED() {
        let score = 0;
        
        if (document.getElementById('hasbled-htn').checked) score += 1;
        if (document.getElementById('hasbled-renal').checked) score += 1;
        if (document.getElementById('hasbled-liver').checked) score += 1;
        if (document.getElementById('hasbled-stroke').checked) score += 1;
        if (document.getElementById('hasbled-bleeding').checked) score += 1;
        if (document.getElementById('hasbled-labile').checked) score += 1;
        if (document.getElementById('hasbled-elderly').checked) score += 1;
        if (document.getElementById('hasbled-drugs').checked) score += 1;
        
        let risk = '';
        let bleedingRate = '';
        let recommendation = '';
        let modifiableFactors = '';
        let color = '';
        
        if (score <= 2) {
            risk = 'Low bleeding risk';
            bleedingRate = '0.9-2.4% per year';
            recommendation = 'Anticoagulation generally safe - benefits likely outweigh bleeding risk';
            color = '#4CAF50';
            modifiableFactors = 'Continue regular monitoring. Address any modifiable factors.';
        } else if (score === 3) {
            risk = 'Moderate bleeding risk';
            bleedingRate = '3.7% per year';
            recommendation = 'Anticoagulation possible but requires caution - regular monitoring essential';
            color = '#FF9800';
            modifiableFactors = 'Review modifiable factors: alcohol intake, drug interactions, INR stability';
        } else {
            risk = 'High bleeding risk';
            bleedingRate = '8.7-12.5% per year';
            recommendation = 'Consider alternatives to anticoagulation or enhanced monitoring';
            color = '#F44336';
            modifiableFactors = 'Priority: Address modifiable factors (alcohol, drugs, BP control, INR stability)';
        }
        
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
                <div style="margin-top: 8px; font-size: 0.9em; color: #666;">
                    <strong>Action:</strong> ${modifiableFactors}
                </div>
                <div style="margin-top: 8px; font-size: 0.8em; color: #666;">
                    Note: HAS-BLED should not be used alone to exclude anticoagulation but to identify patients requiring closer monitoring
                </div>
            </div>
        `;
    }

    getGCSCalculator() {
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
                
                <button onclick="window.quizApp.calculateGCS()">Calculate GCS</button>
                <div id="gcs-result" class="calc-result"></div>
            </div>
        `;
    }

    calculateGCS() {
        const eye = parseInt(document.getElementById('gcs-eye').value);
        const verbal = parseInt(document.getElementById('gcs-verbal').value);
        const motor = parseInt(document.getElementById('gcs-motor').value);
        
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
    }

    getAPACHECalculator() {
        return `
            <div class="calculator-form">
                <h4>APACHE II Score Calculator</h4>
                <p><small>Acute Physiology and Chronic Health Evaluation II - ICU mortality prediction</small></p>
                
                <div class="apache-sections">
                    <div class="apache-section">
                        <h5>??? Physiologic Variables (worst values in first 24 hours)</h5>
                        
                        <div class="calc-input-group">
                            <label>Temperature (°C):</label>
                            <input type="number" id="apache-temp" placeholder="37.0" step="0.1" min="25" max="45">
                            <small>Normal: 36-38°C</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>Mean Arterial Pressure (MAP) mmHg:</label>
                            <input type="number" id="apache-map" placeholder="70" min="30" max="200">
                            <small>Normal: 70-100 mmHg</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>Heart Rate (bpm):</label>
                            <input type="number" id="apache-hr" placeholder="80" min="30" max="250">
                            <small>Normal: 60-100 bpm</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>Respiratory Rate (breaths/min):</label>
                            <input type="number" id="apache-rr" placeholder="16" min="5" max="60">
                            <small>Normal: 12-20 breaths/min</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>FiO2 (%):</label>
                            <input type="number" id="apache-fio2" placeholder="21" min="21" max="100">
                            <small>Room air: 21%, Ventilated: typically >50%</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>PaO2 (mmHg) - if FiO2 =50%:</label>
                            <input type="number" id="apache-pao2" placeholder="80" min="30" max="500">
                            <small>Normal: 80-100 mmHg</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>A-a Gradient (mmHg) - if FiO2 <50%:</label>
                            <input type="number" id="apache-aa-grad" placeholder="15" min="0" max="600">
                            <small>Normal: <20 mmHg</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>Arterial pH:</label>
                            <input type="number" id="apache-ph" placeholder="7.40" step="0.01" min="6.8" max="7.8">
                            <small>Normal: 7.35-7.45</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>Serum Sodium (mEq/L):</label>
                            <input type="number" id="apache-sodium" placeholder="140" min="110" max="180">
                            <small>Normal: 136-145 mEq/L</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>Serum Potassium (mEq/L):</label>
                            <input type="number" id="apache-potassium" placeholder="4.0" step="0.1" min="1.5" max="8.0">
                            <small>Normal: 3.5-5.0 mEq/L</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>Serum Creatinine (mg/dL):</label>
                            <input type="number" id="apache-creatinine" placeholder="1.0" step="0.1" min="0.2" max="15.0">
                            <small>Normal: 0.6-1.2 mg/dL</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>Hematocrit (%):</label>
                            <input type="number" id="apache-hematocrit" placeholder="40" step="0.1" min="10" max="70">
                            <small>Normal: Men 41-50%, Women 36-44%</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>WBC Count (×10³/µL):</label>
                            <input type="number" id="apache-wbc" placeholder="8.0" step="0.1" min="0.1" max="100">
                            <small>Normal: 4.0-11.0 ×10³/µL</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>Glasgow Coma Scale (3-15):</label>
                            <input type="number" id="apache-gcs" placeholder="15" min="3" max="15">
                            <small>Normal: 15, Severe impairment: =8</small>
                        </div>
                    </div>
                    
                    <div class="apache-section">
                        <h5>?? Demographics & Health Status</h5>
                        
                        <div class="calc-input-group">
                            <label>Age (years):</label>
                            <input type="number" id="apache-age" placeholder="65" min="0" max="120">
                        </div>
                        
                        <div class="calc-checkbox-group">
                            <label><strong>Chronic Health Problems:</strong></label>
                            <label><input type="checkbox" id="apache-liver"> Severe liver disease (cirrhosis, portal hypertension)</label>
                            <label><input type="checkbox" id="apache-cardiovascular"> Severe cardiovascular disease (NYHA Class IV)</label>
                            <label><input type="checkbox" id="apache-pulmonary"> Severe pulmonary disease (severe restriction/obstruction)</label>
                            <label><input type="checkbox" id="apache-renal"> Chronic renal failure (on dialysis)</label>
                            <label><input type="checkbox" id="apache-immunocompromised"> Immunocompromised state</label>
                        </div>
                        
                        <div class="calc-checkbox-group">
                            <label><strong>Operative Status:</strong></label>
                            <label><input type="radio" name="apache-surgery" value="none"> No surgery</label>
                            <label><input type="radio" name="apache-surgery" value="elective"> Elective surgery</label>
                            <label><input type="radio" name="apache-surgery" value="emergency"> Emergency surgery</label>
                        </div>
                    </div>
                </div>
                
                <button onclick="window.quizApp.calculateAPACHE()">Calculate APACHE II Score</button>
                <div id="apache-result" class="calc-result"></div>
                
                <div class="calc-reference">
                    <h5>APACHE II Interpretation:</h5>
                    <ul>
                        <li><strong>0-4:</strong> Very low risk (~4% mortality)</li>
                        <li><strong>5-9:</strong> Low risk (~8% mortality)</li>
                        <li><strong>10-14:</strong> Moderate risk (~15% mortality)</li>
                        <li><strong>15-19:</strong> High risk (~25% mortality)</li>
                        <li><strong>20-24:</strong> Very high risk (~40% mortality)</li>
                        <li><strong>=25:</strong> Extremely high risk (~55%+ mortality)</li>
                    </ul>
                    <small><strong>Note:</strong> APACHE II predicts hospital mortality for groups of critically ill patients, not individual patient outcomes.</small>
                </div>
            </div>
        `;
    }

    calculateAPACHE() {
        // Get all input values
        const temp = parseFloat(document.getElementById('apache-temp').value);
        const map = parseFloat(document.getElementById('apache-map').value);
        const hr = parseFloat(document.getElementById('apache-hr').value);
        const rr = parseFloat(document.getElementById('apache-rr').value);
        const fio2 = parseFloat(document.getElementById('apache-fio2').value);
        const pao2 = parseFloat(document.getElementById('apache-pao2').value);
        const aaGrad = parseFloat(document.getElementById('apache-aa-grad').value);
        const ph = parseFloat(document.getElementById('apache-ph').value);
        const sodium = parseFloat(document.getElementById('apache-sodium').value);
        const potassium = parseFloat(document.getElementById('apache-potassium').value);
        const creatinine = parseFloat(document.getElementById('apache-creatinine').value);
        const hematocrit = parseFloat(document.getElementById('apache-hematocrit').value);
        const wbc = parseFloat(document.getElementById('apache-wbc').value);
        const gcs = parseInt(document.getElementById('apache-gcs').value);
        const age = parseInt(document.getElementById('apache-age').value);
        
        // Check required fields
        const requiredFields = [temp, map, hr, rr, fio2, ph, sodium, potassium, creatinine, hematocrit, wbc, gcs, age];
        const requiredNames = ['Temperature', 'MAP', 'Heart Rate', 'Respiratory Rate', 'FiO2', 'pH', 'Sodium', 'Potassium', 'Creatinine', 'Hematocrit', 'WBC', 'GCS', 'Age'];
        
        for (let i = 0; i < requiredFields.length; i++) {
            if (isNaN(requiredFields[i]) || requiredFields[i] === null) {
                document.getElementById('apache-result').innerHTML = `<p class="error">Please enter ${requiredNames[i]}</p>`;
                return;
            }
        }
        
        let physScore = 0;
        let scoreBreakdown = [];
        
        // Temperature scoring
        let tempScore = 0;
        if (temp >= 41) tempScore = 4;
        else if (temp >= 39) tempScore = 3;
        else if (temp >= 38.5) tempScore = 1;
        else if (temp >= 36) tempScore = 0;
        else if (temp >= 34) tempScore = 1;
        else if (temp >= 32) tempScore = 2;
        else if (temp >= 30) tempScore = 3;
        else tempScore = 4;
        physScore += tempScore;
        scoreBreakdown.push(`Temperature (${temp}°C): ${tempScore} points`);
        
        // MAP scoring
        let mapScore = 0;
        if (map >= 160) mapScore = 4;
        else if (map >= 130) mapScore = 3;
        else if (map >= 110) mapScore = 2;
        else if (map >= 70) mapScore = 0;
        else if (map >= 50) mapScore = 2;
        else mapScore = 4;
        physScore += mapScore;
        scoreBreakdown.push(`MAP (${map} mmHg): ${mapScore} points`);
        
        // Heart Rate scoring
        let hrScore = 0;
        if (hr >= 180) hrScore = 4;
        else if (hr >= 140) hrScore = 3;
        else if (hr >= 110) hrScore = 2;
        else if (hr >= 70) hrScore = 0;
        else if (hr >= 55) hrScore = 2;
        else if (hr >= 40) hrScore = 3;
        else hrScore = 4;
        physScore += hrScore;
        scoreBreakdown.push(`Heart Rate (${hr} bpm): ${hrScore} points`);
        
        // Respiratory Rate scoring
        let rrScore = 0;
        if (rr >= 50) rrScore = 4;
        else if (rr >= 35) rrScore = 3;
        else if (rr >= 25) rrScore = 1;
        else if (rr >= 12) rrScore = 0;
        else if (rr >= 10) rrScore = 1;
        else if (rr >= 6) rrScore = 2;
        else rrScore = 4;
        physScore += rrScore;
        scoreBreakdown.push(`Respiratory Rate (${rr}/min): ${rrScore} points`);
        
        // Oxygenation scoring (PaO2 if FiO2 =50%, A-a gradient if FiO2 <50%)
        let oxyScore = 0;
        if (fio2 >= 50) {
            // Use PaO2
            if (!isNaN(pao2)) {
                if (pao2 >= 500) oxyScore = 4;
                else if (pao2 >= 350) oxyScore = 3;
                else if (pao2 >= 200) oxyScore = 2;
                else if (pao2 >= 70) oxyScore = 0;
                else if (pao2 >= 61) oxyScore = 1;
                else if (pao2 >= 55) oxyScore = 3;
                else oxyScore = 4;
                scoreBreakdown.push(`PaO2 (${pao2} mmHg, FiO2 ${fio2}%): ${oxyScore} points`);
            }
        } else {
            // Use A-a gradient
            if (!isNaN(aaGrad)) {
                if (aaGrad >= 500) oxyScore = 4;
                else if (aaGrad >= 350) oxyScore = 3;
                else if (aaGrad >= 200) oxyScore = 2;
                else oxyScore = 0;
                scoreBreakdown.push(`A-a Gradient (${aaGrad} mmHg, FiO2 ${fio2}%): ${oxyScore} points`);
            }
        }
        physScore += oxyScore;
        
        // pH scoring
        let phScore = 0;
        if (ph >= 7.7) phScore = 4;
        else if (ph >= 7.6) phScore = 3;
        else if (ph >= 7.5) phScore = 1;
        else if (ph >= 7.33) phScore = 0;
        else if (ph >= 7.25) phScore = 2;
        else if (ph >= 7.15) phScore = 3;
        else phScore = 4;
        physScore += phScore;
        scoreBreakdown.push(`pH (${ph}): ${phScore} points`);
        
        // Sodium scoring
        let naScore = 0;
        if (sodium >= 180) naScore = 4;
        else if (sodium >= 160) naScore = 3;
        else if (sodium >= 155) naScore = 2;
        else if (sodium >= 150) naScore = 1;
        else if (sodium >= 130) naScore = 0;
        else if (sodium >= 120) naScore = 2;
        else if (sodium >= 111) naScore = 3;
        else naScore = 4;
        physScore += naScore;
        scoreBreakdown.push(`Sodium (${sodium} mEq/L): ${naScore} points`);
        
        // Potassium scoring
        let kScore = 0;
        if (potassium >= 7) kScore = 4;
        else if (potassium >= 6) kScore = 3;
        else if (potassium >= 5.5) kScore = 1;
        else if (potassium >= 3.5) kScore = 0;
        else if (potassium >= 3) kScore = 1;
        else if (potassium >= 2.5) kScore = 2;
        else kScore = 4;
        physScore += kScore;
        scoreBreakdown.push(`Potassium (${potassium} mEq/L): ${kScore} points`);
        
        // Creatinine scoring
        let creatScore = 0;
        if (creatinine >= 3.5) creatScore = 4;
        else if (creatinine >= 2) creatScore = 3;
        else if (creatinine >= 1.5) creatScore = 2;
        else creatScore = 0;
        physScore += creatScore;
        scoreBreakdown.push(`Creatinine (${creatinine} mg/dL): ${creatScore} points`);
        
        // Hematocrit scoring
        let hctScore = 0;
        if (hematocrit >= 60) hctScore = 4;
        else if (hematocrit >= 50) hctScore = 2;
        else if (hematocrit >= 46) hctScore = 1;
        else if (hematocrit >= 30) hctScore = 0;
        else if (hematocrit >= 20) hctScore = 2;
        else hctScore = 4;
        physScore += hctScore;
        scoreBreakdown.push(`Hematocrit (${hematocrit}%): ${hctScore} points`);
        
        // WBC scoring
        let wbcScore = 0;
        if (wbc >= 40) wbcScore = 4;
        else if (wbc >= 20) wbcScore = 2;
        else if (wbc >= 15) wbcScore = 1;
        else if (wbc >= 3) wbcScore = 0;
        else if (wbc >= 1) wbcScore = 2;
        else wbcScore = 4;
        physScore += wbcScore;
        scoreBreakdown.push(`WBC (${wbc} ×10³/µL): ${wbcScore} points`);
        
        // GCS scoring (15 - actual GCS)
        const gcsScore = 15 - gcs;
        physScore += gcsScore;
        scoreBreakdown.push(`GCS (${gcs}): ${gcsScore} points`);
        
        // Age scoring
        let ageScore = 0;
        if (age >= 75) ageScore = 6;
        else if (age >= 65) ageScore = 5;
        else if (age >= 55) ageScore = 3;
        else if (age >= 45) ageScore = 2;
        else ageScore = 0;
        
        // Chronic health scoring
        let chronicScore = 0;
        const hasLiver = document.getElementById('apache-liver').checked;
        const hasCV = document.getElementById('apache-cardiovascular').checked;
        const hasPulm = document.getElementById('apache-pulmonary').checked;
        const hasRenal = document.getElementById('apache-renal').checked;
        const hasImmuno = document.getElementById('apache-immunocompromised').checked;
        
        if (hasLiver || hasCV || hasPulm || hasRenal || hasImmuno) {
            const surgery = document.querySelector('input[name="apache-surgery"]:checked')?.value;
            if (surgery === 'emergency') {
                chronicScore = 5;
            } else if (surgery === 'elective' || surgery === 'none') {
                chronicScore = 2;
            }
        }
        
        const totalScore = physScore + ageScore + chronicScore;
        
        // Mortality estimation
        let mortality = '';
        let mortalityColor = '';
        if (totalScore <= 4) {
            mortality = '~4%';
            mortalityColor = '#4CAF50';
        } else if (totalScore <= 9) {
            mortality = '~8%';
            mortalityColor = '#8BC34A';
        } else if (totalScore <= 14) {
            mortality = '~15%';
            mortalityColor = '#FF9800';
        } else if (totalScore <= 19) {
            mortality = '~25%';
            mortalityColor = '#FF5722';
        } else if (totalScore <= 24) {
            mortality = '~40%';
            mortalityColor = '#F44336';
        } else {
            mortality = '=55%';
            mortalityColor = '#9C27B0';
        }
        
        let chronicHealthText = '';
        if (chronicScore > 0) {
            const conditions = [];
            if (hasLiver) conditions.push('Liver disease');
            if (hasCV) conditions.push('Cardiovascular disease');
            if (hasPulm) conditions.push('Pulmonary disease');
            if (hasRenal) conditions.push('Renal failure');
            if (hasImmuno) conditions.push('Immunocompromised');
            chronicHealthText = `Chronic health (${conditions.join(', ')}): ${chronicScore} points`;
        }
        
        document.getElementById('apache-result').innerHTML = `
            <div class="apache-result-display">
                <div class="result-summary">
                    <div class="result-value" style="color: ${mortalityColor}">
                        <strong>APACHE II Score: ${totalScore}</strong>
                    </div>
                    <div class="result-interpretation" style="color: ${mortalityColor}">
                        <strong>Predicted Hospital Mortality: ${mortality}</strong>
                    </div>
                </div>
                
                <div class="score-breakdown">
                    <h5>Score Breakdown:</h5>
                    <div class="breakdown-section">
                        <strong>Physiologic Score: ${physScore}</strong>
                        <ul style="font-size: 0.9em; margin: 5px 0;">
                            ${scoreBreakdown.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="breakdown-section">
                        <strong>Age Score: ${ageScore}</strong> (Age: ${age} years)
                    </div>
                    
                    ${chronicScore > 0 ? `
                    <div class="breakdown-section">
                        <strong>Chronic Health Score: ${chronicScore}</strong><br>
                        <small>${chronicHealthText}</small>
                    </div>
                    ` : ''}
                </div>
                
                <div class="clinical-guidance">
                    <h5>Clinical Interpretation:</h5>
                    <div style="background-color: rgba(${mortalityColor === '#4CAF50' ? '76,175,80' : mortalityColor === '#8BC34A' ? '139,195,74' : mortalityColor === '#FF9800' ? '255,152,0' : mortalityColor === '#FF5722' ? '255,87,34' : mortalityColor === '#F44336' ? '244,67,54' : '156,39,176'}, 0.1); padding: 10px; border-radius: 5px; margin-top: 8px;">
                        ${totalScore <= 4 ? 'Very low risk group. Good prognosis with appropriate care.' : 
                          totalScore <= 9 ? 'Low risk group. Standard ICU care indicated.' :
                          totalScore <= 14 ? 'Moderate risk group. Close monitoring and aggressive care.' :
                          totalScore <= 19 ? 'High risk group. Consider goals of care discussion.' :
                          totalScore <= 24 ? 'Very high risk group. Intensive care with careful consideration of prognosis.' :
                          'Extremely high risk group. Palliative care consultation may be appropriate.'}
                    </div>
                </div>
                
                <div class="important-notes">
                    <h5>Important Notes:</h5>
                    <ul>
                        <li>APACHE II predicts <strong>group mortality</strong>, not individual patient outcomes</li>
                        <li>Use worst physiologic values from first 24 hours of ICU admission</li>
                        <li>Score should be interpreted in clinical context</li>
                        <li>Higher scores indicate need for more intensive monitoring and care</li>
                    </ul>
                </div>
            </div>
        `;
    }

    getWellsCalculator() {
        return `
            <div class="calculator-form">
                <h4>Wells Score for PE</h4>
                <p><small>Pulmonary embolism clinical probability</small></p>
                
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="wells-clinical"> Clinical signs of DVT (+3)</label>
                    <label><input type="checkbox" id="wells-likely"> PE as likely as alternative diagnosis (+3)</label>
                    <label><input type="checkbox" id="wells-hr"> Heart rate >100 (+1.5)</label>
                    <label><input type="checkbox" id="wells-immobility"> Immobilization/surgery in past 4 weeks (+1.5)</label>
                    <label><input type="checkbox" id="wells-previous"> Previous DVT/PE (+1.5)</label>
                    <label><input type="checkbox" id="wells-hemoptysis"> Hemoptysis (+1)</label>
                    <label><input type="checkbox" id="wells-malignancy"> Malignancy (+1)</label>
                </div>
                
                <button onclick="window.quizApp.calculateWells()">Calculate Score</button>
                <div id="wells-result" class="calc-result"></div>
            </div>
        `;
    }

    calculateWells() {
        let score = 0;
        
        if (document.getElementById('wells-clinical').checked) score += 3;
        if (document.getElementById('wells-likely').checked) score += 3;
        if (document.getElementById('wells-hr').checked) score += 1.5;
        if (document.getElementById('wells-immobility').checked) score += 1.5;
        if (document.getElementById('wells-previous').checked) score += 1.5;
        if (document.getElementById('wells-hemoptysis').checked) score += 1;
        if (document.getElementById('wells-malignancy').checked) score += 1;
        
        let probability = '';
        let recommendation = '';
        let color = '';
        
        if (score <= 4) {
            probability = 'Low probability (=4)';
            recommendation = 'D-dimer; if negative, PE unlikely';
            color = '#4CAF50';
        } else if (score <= 6) {
            probability = 'Moderate probability (4-6)';
            recommendation = 'Consider CT pulmonary angiogram';
            color = '#FF9800';
        } else {
            probability = 'High probability (>6)';
            recommendation = 'CT pulmonary angiogram recommended';
            color = '#F44336';
        }
        
        document.getElementById('wells-result').innerHTML = `
            <div class="wells-result-display">
                <div class="wells-score" style="color: ${color}">
                    Score: <strong>${score}</strong>
                </div>
                <div class="wells-probability">${probability}</div>
                <div class="wells-recommendation" style="color: ${color}">
                    <strong>${recommendation}</strong>
                </div>
            </div>
        `;
    }

    getQRISKCalculator() {
        return `
            <div class="calculator-form">
                <h4>QRISK3 Calculator</h4>
                <p><small>10-year cardiovascular disease risk assessment (UK validated)</small></p>
                
                <div class="qrisk-sections">
                    <div class="qrisk-section">
                        <h5>?? About You</h5>
                        
                        <div class="calc-input-group">
                            <label>Age (25-84 years):</label>
                            <input type="number" id="qrisk-age" placeholder="50" min="25" max="84">
                            <small>QRISK3 is validated for ages 25-84 years</small>
                        </div>
                        
                        <div class="calc-checkbox-group">
                            <label><strong>Sex:</strong></label>
                            <label><input type="radio" name="qrisk-sex" value="male"> Male</label>
                            <label><input type="radio" name="qrisk-sex" value="female"> Female</label>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>Ethnicity:</label>
                            <select id="qrisk-ethnicity">
                                <option value="1">White/not stated</option>
                                <option value="2">Indian</option>
                                <option value="3">Pakistani</option>
                                <option value="4">Bangladeshi</option>
                                <option value="5">Other Asian</option>
                                <option value="6">Caribbean</option>
                                <option value="7">Black African</option>
                                <option value="8">Chinese</option>
                                <option value="9">Other ethnic group</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="qrisk-section">
                        <h5>?? Measurements</h5>
                        
                        <div class="calc-input-group">
                            <label>BMI (kg/m²):</label>
                            <input type="number" id="qrisk-bmi" placeholder="25.0" min="15" max="50" step="0.1">
                            <small>Normal: 18.5-24.9 kg/m²</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>Systolic Blood Pressure (mmHg):</label>
                            <input type="number" id="qrisk-sbp" placeholder="130" min="80" max="250">
                            <small>Normal: <120 mmHg</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>Total Cholesterol (mmol/L):</label>
                            <input type="number" id="qrisk-cholesterol" placeholder="5.0" min="2" max="15" step="0.1">
                            <small>Desirable: <5.0 mmol/L</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>HDL Cholesterol (mmol/L):</label>
                            <input type="number" id="qrisk-hdl" placeholder="1.2" min="0.5" max="5" step="0.1">
                            <small>Good: >1.0 (men), >1.3 (women) mmol/L</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>Systolic BP Standard Deviation (optional):</label>
                            <input type="number" id="qrisk-sbpsd" placeholder="0" min="0" max="50" step="0.1">
                            <small>Measure of BP variability, 0 if unknown</small>
                        </div>
                    </div>
                    
                    <div class="qrisk-section">
                        <h5>?? Smoking</h5>
                        <div class="calc-input-group">
                            <label>Smoking Status:</label>
                            <select id="qrisk-smoking">
                                <option value="0">Non-smoker</option>
                                <option value="1">Former smoker</option>
                                <option value="2">Light smoker (1-9/day)</option>
                                <option value="3">Moderate smoker (10-19/day)</option>
                                <option value="4">Heavy smoker (=20/day)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="qrisk-section">
                        <h5>?? Medical Conditions</h5>
                        <div class="calc-checkbox-group">
                            <label><input type="checkbox" id="qrisk-diabetes-type1"> Type 1 diabetes</label>
                            <label><input type="checkbox" id="qrisk-diabetes-type2"> Type 2 diabetes</label>
                            <label><input type="checkbox" id="qrisk-family-history"> Family history of CHD in first degree relative <60 years</label>
                            <label><input type="checkbox" id="qrisk-ckd"> Chronic kidney disease (stage 4/5)</label>
                            <label><input type="checkbox" id="qrisk-af"> Atrial fibrillation</label>
                            <label><input type="checkbox" id="qrisk-bp-treatment"> On blood pressure treatment</label>
                            <label><input type="checkbox" id="qrisk-ra"> Rheumatoid arthritis</label>
                            <label><input type="checkbox" id="qrisk-lupus"> Systemic lupus erythematosus</label>
                            <label><input type="checkbox" id="qrisk-smi"> Severe mental illness</label>
                            <label><input type="checkbox" id="qrisk-antipsychotic"> On atypical antipsychotics</label>
                            <label><input type="checkbox" id="qrisk-steroid"> On regular steroid tablets</label>
                            <label><input type="checkbox" id="qrisk-erectile"> Erectile dysfunction (males only)</label>
                            <label><input type="checkbox" id="qrisk-migraine"> Migraine</label>
                        </div>
                    </div>
                    
                    <div class="qrisk-section">
                        <h5>?? Social (Optional)</h5>
                        <div class="calc-input-group">
                            <label>Townsend Deprivation Score:</label>
                            <input type="number" id="qrisk-townsend" placeholder="0" step="0.1" min="-6" max="15">
                            <small>Postcode-based deprivation measure, 0 if unknown</small>
                        </div>
                    </div>
                </div>
                
                <button onclick="window.quizApp.calculateQRISK()">Calculate QRISK3 Score</button>
                <div id="qrisk-result" class="calc-result"></div>
                
                <div class="calc-reference">
                    <h5>QRISK3 Information:</h5>
                    <ul>
                        <li>Predicts 10-year cardiovascular disease risk</li>
                        <li>Based on UK population data</li>
                        <li>Includes traditional and novel risk factors</li>
                        <li>Used in NICE guidelines for statin therapy decisions</li>
                    </ul>
                    <small><strong>Clinical Use:</strong> Use official QRISK3 tool at <a href="https://qrisk.org" target="_blank">qrisk.org</a> for clinical decisions</small>
                </div>
            </div>
        `;
    }

    calculateQRISK() {
        // Get input values
        const age = parseInt(document.getElementById('qrisk-age').value);
        const sex = document.querySelector('input[name="qrisk-sex"]:checked')?.value;
        const ethnicity = parseInt(document.getElementById('qrisk-ethnicity').value);
        const bmi = parseFloat(document.getElementById('qrisk-bmi').value);
        const sbp = parseFloat(document.getElementById('qrisk-sbp').value);
        const cholesterol = parseFloat(document.getElementById('qrisk-cholesterol').value);
        const hdl = parseFloat(document.getElementById('qrisk-hdl').value);
        const sbpSD = parseFloat(document.getElementById('qrisk-sbpsd').value) || 0;
        const smokingStatus = parseInt(document.getElementById('qrisk-smoking').value);
        const townsend = parseFloat(document.getElementById('qrisk-townsend').value) || 0;
        
        // Validate required fields
        if (!age || !sex || !bmi || !sbp || !cholesterol || !hdl) {
            document.getElementById('qrisk-result').innerHTML = 
                '<p class="error">Please fill in all required fields (age, sex, BMI, blood pressure, cholesterol and HDL)</p>';
            return;
        }

        // QRISK3 age validation
        if (age < 25 || age > 84) {
            document.getElementById('qrisk-result').innerHTML = 
                '<p class="error">QRISK3 is validated for ages 25-84 years only</p>';
            return;
        }

        // Get medical conditions
        const diabetesType1 = document.getElementById('qrisk-diabetes-type1').checked;
        const diabetesType2 = document.getElementById('qrisk-diabetes-type2').checked;
        
        // Validate diabetes - can't have both types
        if (diabetesType1 && diabetesType2) {
            document.getElementById('qrisk-result').innerHTML = 
                '<p class="error">Please select only Type 1 OR Type 2 diabetes, not both</p>';
            return;
        }

        // Calculate cholesterol to HDL ratio
        const cholesterolHdlRatio = cholesterol / hdl;

        // Build QRISK3 input object (following sisuhealthgroup/qrisk3 format)
        const qriskInput = {
            sex: sex,
            age: age,
            atrialFibrillation: document.getElementById('qrisk-af').checked,
            onAtypicalAntipsychoticsMedication: document.getElementById('qrisk-antipsychotic').checked,
            onRegularSteroidTablets: document.getElementById('qrisk-steroid').checked,
            diagnosisOrTreatmentOfErectileDisfunction: document.getElementById('qrisk-erectile').checked,
            migraine: document.getElementById('qrisk-migraine').checked,
            rheumatoidArthritis: document.getElementById('qrisk-ra').checked,
            chronicKidneyDiseaseStage345: document.getElementById('qrisk-ckd').checked,
            severeMentalIllness: document.getElementById('qrisk-smi').checked,
            systemicLupusErythematosus: document.getElementById('qrisk-lupus').checked,
            bloodPressureTreatment: document.getElementById('qrisk-bp-treatment').checked,
            diabetesType1: diabetesType1,
            diabetesType2: diabetesType2,
            bmi: bmi,
            ethnicity: ethnicity,
            familyAnginaOrHeartAttack: document.getElementById('qrisk-family-history').checked,
            cholesterolHdlRatio: cholesterolHdlRatio,
            systolicBloodPressure: sbp,
            systolicStandardDeviation: sbpSD,
            smokerStatus: smokingStatus,
            survivorSpan: 10, // QRISK3 only works with 10 years
            townsendScore: townsend
        };

        console.log('?? QRISK3 Input:', qriskInput);

        let risk = null;
        let usingOfficialLibrary = false;

        // Try to use the official QRISK3 library
        if (window.qrisk3 && typeof window.qrisk3.calculateScore === 'function') {
            try {
                risk = window.qrisk3.calculateScore(qriskInput);
                usingOfficialLibrary = true;
                console.log('? Used official QRISK3 library, result:', risk);
            } catch (error) {
                console.warn('? Official QRISK3 library failed:', error);
                risk = null;
            }
        } else {
            console.warn('?? Official QRISK3 library not available');
        }

        // Fallback to simplified calculation if official library not available
        if (risk === null) {
            risk = this.calculateQRISKFallback(qriskInput);
            console.log('?? Used fallback calculation, result:', risk);
        }

        // Ensure risk is a valid number
        if (isNaN(risk) || risk < 0) {
            document.getElementById('qrisk-result').innerHTML = 
                '<p class="error">Unable to calculate risk. Please check your inputs.</p>';
            return;
        }

        // Cap risk at 99% for display
        risk = Math.min(risk, 99);

        // NICE CG181 and NG238 risk categorization
        let riskLevel = '';
        let color = '';
        let recommendation = '';

        if (risk < 10) {
            riskLevel = 'Low risk (<10%)';
            color = '#4CAF50';
            recommendation = 'NICE NG238: Lifestyle advice. Reassess in 5 years. Consider statin if additional risk factors or patient preference.';
        } else if (risk < 20) {
            riskLevel = 'Moderate risk (10-20%)';
            color = '#FF9800';
            recommendation = 'NICE NG238: Offer atorvastatin 20mg daily with lifestyle advice. Shared decision-making important.';
        } else {
            riskLevel = 'High risk (=20%)';
            color = '#F44336';
            recommendation = 'NICE NG238: Offer atorvastatin 20mg daily with lifestyle advice. Consider higher intensity if required.';
        }

        // Additional risk factors for context
        const riskFactors = [];
        if (diabetesType1) riskFactors.push('Type 1 diabetes');
        if (diabetesType2) riskFactors.push('Type 2 diabetes');
        if (qriskInput.atrialFibrillation) riskFactors.push('Atrial fibrillation');
        if (qriskInput.familyAnginaOrHeartAttack) riskFactors.push('Family history of CHD');
        if (qriskInput.chronicKidneyDiseaseStage345) riskFactors.push('Chronic kidney disease');
        if (qriskInput.rheumatoidArthritis) riskFactors.push('Rheumatoid arthritis');
        if (qriskInput.systemicLupusErythematosus) riskFactors.push('SLE');
        if (smokingStatus > 0) {
            const smokingLabels = ['Non-smoker', 'Former smoker', 'Light smoker', 'Moderate smoker', 'Heavy smoker'];
            riskFactors.push(smokingLabels[smokingStatus] || 'Smoker');
        }

        document.getElementById('qrisk-result').innerHTML = `
            <div class="qrisk-result-display">
                <div class="result-summary">
                    <div class="result-value" style="color: ${color}">
                        <strong>10-year CVD Risk: ${risk.toFixed(1)}%</strong>
                    </div>
                    <div class="result-interpretation" style="color: ${color}">
                        <strong>${riskLevel}</strong>
                    </div>
                </div>
                
                <div class="clinical-guidance">
                    <h5>NICE Guidance:</h5>
                    <div style="background-color: rgba(${color === '#4CAF50' ? '76,175,80' : color === '#FF9800' ? '255,152,0' : '244,67,54'}, 0.1); padding: 10px; border-radius: 5px; margin-top: 8px;">
                        ${recommendation}
                    </div>
                </div>
                
                <div class="risk-factors">
                    <h5>Key Measurements:</h5>
                    <ul>
                        <li><strong>Cholesterol/HDL ratio:</strong> ${cholesterolHdlRatio.toFixed(2)} ${cholesterolHdlRatio > 4.5 ? '(elevated)' : '(good)'}</li>
                        <li><strong>BMI:</strong> ${bmi} kg/m² ${bmi >= 30 ? '(obese)' : bmi >= 25 ? '(overweight)' : '(normal)'}</li>
                        <li><strong>Blood pressure:</strong> ${sbp} mmHg ${sbp >= 140 ? '(high)' : sbp >= 120 ? '(elevated)' : '(normal)'}</li>
                        ${riskFactors.length > 0 ? `<li><strong>Risk factors:</strong> ${riskFactors.join(', ')}</li>` : ''}
                    </ul>
                </div>
                
                <div class="calculation-info">
                    <small>
                        <strong>Calculation method:</strong> ${usingOfficialLibrary ? 
                            '? Official QRISK3 algorithm (sisuhealthgroup implementation)' : 
                            '?? Simplified approximation - use official tool for clinical decisions'
                        }<br>
                        <strong>Reference:</strong> NICE NG238 (2023) - Cardiovascular disease: risk assessment and reduction
                    </small>
                </div>
            </div>
        `;
    }

    // Fallback calculation if official QRISK3 library not available
    calculateQRISKFallback(input) {
        // This is a simplified approximation based on QRISK3 risk factors
        // For clinical use, always use the official QRISK3 tool
        
        let logRisk = 0;
        
        // Age (strongest predictor)
        const ageYears = input.age;
        if (input.sex === 'male') {
            logRisk += (ageYears - 40) * 0.05;
        } else {
            logRisk += (ageYears - 40) * 0.04;
        }
        
        // BMI (J-shaped curve)
        const bmiOptimal = 23;
        const bmiDeviation = Math.abs(input.bmi - bmiOptimal);
        logRisk += bmiDeviation * 0.02;
        
        // Blood pressure
        const sbpDeviation = Math.max(0, input.systolicBloodPressure - 120);
        logRisk += sbpDeviation * 0.01;
        
        // Cholesterol ratio
        const cholRatioDeviation = Math.max(0, input.cholesterolHdlRatio - 3.5);
        logRisk += cholRatioDeviation * 0.3;
        
        // Ethnicity multipliers (approximate)
        const ethnicityFactors = [1.0, 1.0, 1.4, 1.6, 1.8, 1.2, 1.2, 0.9, 0.8, 1.1];
        logRisk += Math.log(ethnicityFactors[input.ethnicity - 1] || 1.0);
        
        // Major risk factors
        if (input.diabetesType1) logRisk += 1.2;
        if (input.diabetesType2) logRisk += 0.8;
        if (input.atrialFibrillation) logRisk += 0.9;
        if (input.familyAnginaOrHeartAttack) logRisk += 0.5;
        if (input.chronicKidneyDiseaseStage345) logRisk += 0.8;
        if (input.rheumatoidArthritis) logRisk += 0.4;
        if (input.systemicLupusErythematosus) logRisk += 0.9;
        if (input.severeMentalIllness) logRisk += 0.3;
        if (input.bloodPressureTreatment) logRisk += 0.4;
        if (input.onRegularSteroidTablets) logRisk += 0.4;
        if (input.onAtypicalAntipsychoticsMedication) logRisk += 0.3;
        if (input.diagnosisOrTreatmentOfErectileDisfunction) logRisk += 0.2;
        if (input.migraine) logRisk += 0.2;
        
        // Smoking
        const smokingFactors = [0, 0.4, 0.5, 0.7, 0.9]; // non, former, light, moderate, heavy
        logRisk += smokingFactors[input.smokerStatus] || 0;
        
        // Townsend deprivation
        logRisk += input.townsendScore * 0.03;
        
        // Convert to percentage (simplified baseline risk)
        const baselineRisk = input.sex === 'male' ? 8 : 5; // Approximate 10-year baseline risk %
        const risk = baselineRisk * Math.exp(logRisk);
        
        return Math.min(risk, 99);
    }

    getMADDERSCalculator() {
        return `
            <div class="calculator-form">
                <h4>MADDERS Score</h4>
                <p><small>Delirium assessment tool</small></p>
                
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="madders-memory"> Memory impairment</label>
                    <label><input type="checkbox" id="madders-attention"> Attention deficit</label>
                    <label><input type="checkbox" id="madders-disorientation"> Disorientation</label>
                    <label><input type="checkbox" id="madders-delusions"> Delusions/hallucinations</label>
                    <label><input type="checkbox" id="madders-emotional"> Emotional lability</label>
                    <label><input type="checkbox" id="madders-reversal"> Sleep-wake reversal</label>
                    <label><input type="checkbox" id="madders-symptoms"> Symptom fluctuation</label>
                </div>
                
                <button onclick="window.quizApp.calculateMADDERS()">Calculate Score</button>
                <div id="madders-result" class="calc-result"></div>
            </div>
        `;
    }

    calculateMADDERS() {
        let score = 0;
        
        if (document.getElementById('madders-memory').checked) score += 1;
        if (document.getElementById('madders-attention').checked) score += 1;
        if (document.getElementById('madders-disorientation').checked) score += 1;
        if (document.getElementById('madders-delusions').checked) score += 1;
        if (document.getElementById('madders-emotional').checked) score += 1;
        if (document.getElementById('madders-reversal').checked) score += 1;
        if (document.getElementById('madders-symptoms').checked) score += 1;

        let interpretation = '';
        let color = '';

        if (score === 0) {
            interpretation = 'No delirium';
            color = '#4CAF50';
        } else if (score <= 2) {
            interpretation = 'Possible subsyndromal delirium';
            color = '#FF9800';
        } else if (score <= 4) {
            interpretation = 'Probable delirium';
            color = '#F44336';
        } else {
            interpretation = 'Definite delirium';
            color = '#D32F2F';
        }

        document.getElementById('madders-result').innerHTML = `
            <div style="color: ${color}">
                <strong>MADDERS Score: ${score}/7</strong><br>
                <strong>${interpretation}</strong>
            </div>
        `;
    }

    getMEWSCalculator() {
        return `
            <div class="calculator-form">
                <h4>MEWS (Modified Early Warning Score)</h4>
                <p><small>Early warning score for clinical deterioration (UK hospitals often use NEWS2)</small></p>
                
                <div class="calc-input-group">
                    <label>Systolic BP (mmHg):</label>
                    <input type="number" id="mews-sbp" placeholder="120">
                </div>
                <div class="calc-input-group">
                    <label>Heart Rate (bpm):</label>
                    <input type="number" id="mews-hr" placeholder="80">
                </div>
                <div class="calc-input-group">
                    <label>Respiratory Rate (breaths/min):</label>
                    <input type="number" id="mews-rr" placeholder="16">
                </div>
                <div class="calc-input-group">
                    <label>Temperature (°C):</label>
                    <input type="number" id="mews-temp" placeholder="36.5" step="0.1">
                </div>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="mews-neuro"> Neurological concern (AVPU < Alert)</label>
                </div>
                
                <button onclick="window.quizApp.calculateMEWS()">Calculate MEWS</button>
                <div id="mews-result" class="calc-result"></div>
            </div>
        `;
    }

    calculateMEWS() {
        const sbp = parseInt(document.getElementById('mews-sbp').value) || 0;
        const hr = parseInt(document.getElementById('mews-hr').value) || 0;
        const rr = parseInt(document.getElementById('mews-rr').value) || 0;
        const temp = parseFloat(document.getElementById('mews-temp').value) || 0;
        const neuro = document.getElementById('mews-neuro').checked;

        let score = 0;

        // Systolic BP scoring
        if (sbp < 70) score += 3;
        else if (sbp < 80) score += 2;
        else if (sbp < 100) score += 1;
        else if (sbp > 199) score += 2;

        // Heart rate scoring
        if (hr < 40) score += 2;
        else if (hr < 50) score += 1;
        else if (hr > 129) score += 3;
        else if (hr > 109) score += 2;
        else if (hr > 99) score += 1;

        // Respiratory rate scoring
        if (rr < 9) score += 2;
        else if (rr > 29) score += 3;
        else if (rr > 24) score += 2;
        else if (rr > 20) score += 1;

        // Temperature scoring
        if (temp < 35) score += 2;
        else if (temp > 38.4) score += 2;

        // Neurological scoring
        if (neuro) score += 3;

        let risk = '';
        let color = '';
        let action = '';

        if (score === 0) {
            risk = 'Low risk';
            color = '#4CAF50';
            action = 'Continue routine monitoring';
        } else if (score <= 2) {
            risk = 'Low-medium risk';
            color = '#FFC107';
            action = 'Increase monitoring frequency';
        } else if (score <= 4) {
            risk = 'Medium risk';
            color = '#FF9800';
            action = 'Consider medical review';
        } else {
            risk = 'High risk';
            color = '#F44336';
            action = 'Urgent medical review required';
        }

        document.getElementById('mews-result').innerHTML = `
            <div style="color: ${color}">
                <strong>MEWS Score: ${score}</strong><br>
                <strong>${risk}</strong><br>
                ${action}
            </div>
        `;
    }

    getCRB65Calculator() {
        return `
            <div class="calculator-form">
                <h4>CRB-65 Score</h4>
                <p><small>Community-acquired pneumonia severity assessment</small></p>
                
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="crb-confusion"> Confusion (AMT =8)</label>
                    <label><input type="checkbox" id="crb-rr"> Respiratory rate =30/min</label>
                    <label><input type="checkbox" id="crb-bp"> Systolic BP <90 or Diastolic BP =60</label>
                    <label><input type="checkbox" id="crb-age"> Age =65 years</label>
                </div>
                
                <button onclick="window.quizApp.calculateCRB65()">Calculate Score</button>
                <div id="crb65-result" class="calc-result"></div>
            </div>
        `;
    }

    calculateCRB65() {
        let score = 0;
        
        if (document.getElementById('crb-confusion').checked) score += 1;
        if (document.getElementById('crb-rr').checked) score += 1;
        if (document.getElementById('crb-bp').checked) score += 1;
        if (document.getElementById('crb-age').checked) score += 1;

        let mortality = '';
        let management = '';
        let color = '';

        if (score === 0) {
            mortality = '<1% 30-day mortality';
            management = 'Home treatment suitable (NICE CG191)';
            color = '#4CAF50';
        } else if (score === 1) {
            mortality = '2.7% 30-day mortality';
            management = 'Consider home treatment or short stay admission';
            color = '#FFC107';
        } else if (score === 2) {
            mortality = '6.8% 30-day mortality';
            management = 'Hospital admission recommended';
            color = '#FF9800';
        } else if (score >= 3) {
            mortality = '=14% 30-day mortality';
            management = 'Urgent hospital admission (consider ICU assessment)';
            color = '#F44336';
        }

        document.getElementById('crb65-result').innerHTML = `
            <div style="color: ${color}">
                <strong>CRB-65 Score: ${score}/4</strong><br>
                <strong>${mortality}</strong><br>
                <strong>Management: ${management}</strong>
            </div>
        `;
    }

    getRockallCalculator() {
        return `
            <div class="calculator-form">
                <h4>Rockall Score</h4>
                <p><small>Upper GI bleeding risk stratification</small></p>
                
                <div class="calc-input-group">
                    <label>Age:</label>
                    <select id="rockall-age">
                        <option value="0"><60 years (0 points)</option>
                        <option value="1">60-79 years (1 point)</option>
                        <option value="2">=80 years (2 points)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Shock:</label>
                    <select id="rockall-shock">
                        <option value="0">No shock (0 points)</option>
                        <option value="1">Tachycardia (1 point)</option>
                        <option value="2">Hypotension (2 points)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Comorbidity:</label>
                    <select id="rockall-comorbid">
                        <option value="0">None (0 points)</option>
                        <option value="2">Cardiac failure, IHD (2 points)</option>
                        <option value="3">Renal/liver failure, malignancy (3 points)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Diagnosis:</label>
                    <select id="rockall-diagnosis">
                        <option value="0">Mallory-Weiss tear (0 points)</option>
                        <option value="1">Other diagnosis (1 point)</option>
                        <option value="2">Malignancy of upper GI tract (2 points)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Stigmata of bleeding:</label>
                    <select id="rockall-stigmata">
                        <option value="0">None/dark spot (0 points)</option>
                        <option value="2">Blood in upper GI tract/clot/visible vessel (2 points)</option>
                    </select>
                </div>
                
                <button onclick="window.quizApp.calculateRockall()">Calculate Score</button>
                <div id="rockall-result" class="calc-result"></div>
            </div>
        `;
    }

    calculateRockall() {
        let score = 0;
        
        score += parseInt(document.getElementById('rockall-age').value) || 0;
        score += parseInt(document.getElementById('rockall-shock').value) || 0;
        score += parseInt(document.getElementById('rockall-comorbid').value) || 0;
        score += parseInt(document.getElementById('rockall-diagnosis').value) || 0;
        score += parseInt(document.getElementById('rockall-stigmata').value) || 0;

        let risk = '';
        let mortality = '';
        let rebleed = '';
        let color = '';

        if (score <= 2) {
            risk = 'Low risk';
            mortality = '<0.2% mortality';
            rebleed = '5% rebleeding risk';
            color = '#4CAF50';
        } else if (score <= 4) {
            risk = 'Intermediate risk';
            mortality = '5.6% mortality';
            rebleed = '11% rebleeding risk';
            color = '#FF9800';
        } else {
            risk = 'High risk';
            mortality = '24.6% mortality';
            rebleed = '25% rebleeding risk';
            color = '#F44336';
        }

        document.getElementById('rockall-result').innerHTML = `
            <div style="color: ${color}">
                <strong>Rockall Score: ${score}</strong><br>
                <strong>${risk}</strong><br>
                ${mortality}<br>
                ${rebleed}
            </div>
        `;
    }

    getChildPughCalculator() {
        return `
            <div class="calculator-form">
                <h4>Child-Pugh Score</h4>
                <p><small>Liver function assessment in cirrhosis</small></p>
                
                <div class="calc-input-group">
                    <label>Bilirubin (µmol/L) - UK units:</label>
                    <select id="cp-bilirubin">
                        <option value="1"><34 µmol/L (Normal: <20) (1 point)</option>
                        <option value="2">34-50 µmol/L (2 points)</option>
                        <option value="3">>50 µmol/L (3 points)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Albumin (g/L) - UK units:</label>
                    <select id="cp-albumin">
                        <option value="1">>35 g/L (Normal: 35-50) (1 point)</option>
                        <option value="2">28-35 g/L (2 points)</option>
                        <option value="3"><28 g/L (3 points)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>INR:</label>
                    <select id="cp-inr">
                        <option value="1"><1.7 (1 point)</option>
                        <option value="2">1.7-2.3 (2 points)</option>
                        <option value="3">>2.3 (3 points)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Ascites:</label>
                    <select id="cp-ascites">
                        <option value="1">None (1 point)</option>
                        <option value="2">Slight (2 points)</option>
                        <option value="3">Moderate/severe (3 points)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Encephalopathy:</label>
                    <select id="cp-enceph">
                        <option value="1">None (1 point)</option>
                        <option value="2">Grade 1-2 (2 points)</option>
                        <option value="3">Grade 3-4 (3 points)</option>
                    </select>
                </div>
                
                <button onclick="window.quizApp.calculateChildPugh()">Calculate Score</button>
                <div id="cp-result" class="calc-result"></div>
            </div>
        `;
    }

    calculateChildPugh() {
        let score = 0;
        
        score += parseInt(document.getElementById('cp-bilirubin').value) || 0;
        score += parseInt(document.getElementById('cp-albumin').value) || 0;
        score += parseInt(document.getElementById('cp-inr').value) || 0;
        score += parseInt(document.getElementById('cp-ascites').value) || 0;
        score += parseInt(document.getElementById('cp-enceph').value) || 0;

        let grade = '';
        let survival = '';
        let color = '';

        if (score <= 6) {
            grade = 'Child-Pugh A';
            survival = '100% 1-year survival, 85% 2-year survival';
            color = '#4CAF50';
        } else if (score <= 9) {
            grade = 'Child-Pugh B';
            survival = '81% 1-year survival, 57% 2-year survival';
            color = '#FF9800';
        } else {
            grade = 'Child-Pugh C';
            survival = '45% 1-year survival, 35% 2-year survival';
            color = '#F44336';
        }

        document.getElementById('cp-result').innerHTML = `
            <div style="color: ${color}">
                <strong>Score: ${score} points</strong><br>
                <strong>${grade}</strong><br>
                ${survival}
            </div>
        `;
    }

    getOttawaAnkleCalculator() {
        return `
            <div class="calculator-form">
                <h4>Ottawa Ankle Rules</h4>
                <p><small>Determine need for ankle/foot X-ray after injury</small></p>
                
                <h5>Ankle X-ray required if:</h5>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="ottawa-ankle-pain"> Bone tenderness at posterior edge/tip of lateral malleolus</label>
                    <label><input type="checkbox" id="ottawa-ankle-medial"> Bone tenderness at posterior edge/tip of medial malleolus</label>
                    <label><input type="checkbox" id="ottawa-ankle-walk"> Unable to bear weight both immediately and in ED (4 steps)</label>
                </div>
                
                <h5>Foot X-ray required if:</h5>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="ottawa-foot-5th"> Bone tenderness at base of 5th metatarsal</label>
                    <label><input type="checkbox" id="ottawa-foot-navicular"> Bone tenderness at navicular</label>
                    <label><input type="checkbox" id="ottawa-foot-walk"> Unable to bear weight both immediately and in ED (4 steps)</label>
                </div>
                
                <button onclick="window.quizApp.calculateOttawaAnkle()">Assess Need for X-ray</button>
                <div id="ottawa-result" class="calc-result"></div>
            </div>
        `;
    }

    calculateOttawaAnkle() {
        const ankleIndicated = 
            document.getElementById('ottawa-ankle-pain').checked ||
            document.getElementById('ottawa-ankle-medial').checked ||
            document.getElementById('ottawa-ankle-walk').checked;

        const footIndicated = 
            document.getElementById('ottawa-foot-5th').checked ||
            document.getElementById('ottawa-foot-navicular').checked ||
            document.getElementById('ottawa-foot-walk').checked;

        let result = '';
        let color = '';

        if (ankleIndicated && footIndicated) {
            result = '<strong>Both ankle AND foot X-rays indicated</strong>';
            color = '#F44336';
        } else if (ankleIndicated) {
            result = '<strong>Ankle X-ray indicated</strong>';
            color = '#F44336';
        } else if (footIndicated) {
            result = '<strong>Foot X-ray indicated</strong>';
            color = '#F44336';
        } else {
            result = '<strong>No X-rays indicated</strong><br>99% sensitivity for excluding fractures';
            color = '#4CAF50';
        }

        document.getElementById('ottawa-result').innerHTML = `
            <div style="color: ${color}">
                ${result}
            </div>
        `;
    }

    // New UK-Relevant Calculators
    
    getEGFRCalculator() {
        return `
            <div class="calculator-form">
                <h4>eGFR Calculator (CKD-EPI 2021)</h4>
                <p><small>Estimated Glomerular Filtration Rate - UK standard (race-neutral equation)</small></p>
                
                <div class="calc-input-group">
                    <label>Age (years):</label>
                    <input type="number" id="egfr-age" placeholder="50" min="18" max="120">
                </div>
                <div class="calc-checkbox-group">
                    <label><input type="radio" name="egfr-sex" value="male"> Male</label>
                    <label><input type="radio" name="egfr-sex" value="female"> Female</label>
                </div>
                <div class="calc-input-group">
                    <label>Serum Creatinine (µmol/L):</label>
                    <input type="number" id="egfr-creatinine" placeholder="80" min="20" max="2000">
                </div>
                
                <button onclick="window.quizApp.calculateEGFR()">Calculate eGFR</button>
                <div id="egfr-result" class="calc-result"></div>
                
                <div class="calc-reference">
                    <small>
                        <strong>CKD Stages (UK):</strong><br>
                        G1: =90 (normal/high)<br>
                        G2: 60-89 (mildly decreased)<br>
                        G3a: 45-59 (mild-moderate)<br>
                        G3b: 30-44 (moderate-severe)<br>
                        G4: 15-29 (severely decreased)<br>
                        G5: <15 (kidney failure)
                    </small>
                </div>
            </div>
        `;
    }

    calculateEGFR() {
        const age = parseInt(document.getElementById('egfr-age').value);
        const sex = document.querySelector('input[name="egfr-sex"]:checked')?.value;
        const creatinine = parseFloat(document.getElementById('egfr-creatinine').value);
        
        if (!age || !sex || !creatinine) {
            document.getElementById('egfr-result').innerHTML = '<p class="error">Please fill in all fields</p>';
            return;
        }
        
        // Convert µmol/L to mg/dL
        const creatinine_mg = creatinine * 0.0113;
        
        // CKD-EPI 2021 equation (race-neutral) - NIDDK
        // 142 × min(Scr/?,1)^a × max(Scr/?,1)^-1.200 × 0.9938^Age × (×1.012 if female)
        let k, alpha;
        if (sex === 'female') {
            k = 0.7;
            alpha = -0.241;  // Female exponent for CKD-EPI 2021
        } else {
            k = 0.9;
            alpha = -0.302;  // Male exponent for CKD-EPI 2021
        }
        
        let egfr = 142 * Math.pow(Math.min(creatinine_mg / k, 1), alpha) * 
                   Math.pow(Math.max(creatinine_mg / k, 1), -1.200) * 
                   Math.pow(0.9938, age);
                   
        if (sex === 'female') egfr *= 1.012;
        // Race multiplier removed as per CKD-EPI 2021 recommendations
        
        egfr = Math.round(egfr);
        
        let stage = '';
        let color = '';
        let clinical = '';
        
        if (egfr >= 90) {
            stage = 'G1 (Normal/High)';
            color = '#4CAF50';
            clinical = 'Normal kidney function (if no other evidence of kidney damage)';
        } else if (egfr >= 60) {
            stage = 'G2 (Mildly decreased)';
            color = '#8BC34A';
            clinical = 'Mildly decreased kidney function';
        } else if (egfr >= 45) {
            stage = 'G3a (Mild-moderate decrease)';
            color = '#FF9800';
            clinical = 'Mild to moderate decrease. Monitor and consider nephrology referral';
        } else if (egfr >= 30) {
            stage = 'G3b (Moderate-severe decrease)';
            color = '#FF5722';
            clinical = 'Moderate to severe decrease. Nephrology referral recommended';
        } else if (egfr >= 15) {
            stage = 'G4 (Severely decreased)';
            color = '#F44336';
            clinical = 'Severely decreased. Prepare for renal replacement therapy';
        } else {
            stage = 'G5 (Kidney failure)';
            color = '#D32F2F';
            clinical = 'Kidney failure. Urgent nephrology referral for RRT';
        }
        
        document.getElementById('egfr-result').innerHTML = `
            <div style="color: ${color}">
                <strong>eGFR: ${egfr} mL/min/1.73m²</strong><br>
                <strong>CKD Stage: ${stage}</strong><br>
                <div style="margin-top: 8px; font-size: 0.9em;">
                    ${clinical}
                </div>
                <div style="margin-top: 8px; font-size: 0.8em; color: #666;">
                    Using CKD-EPI 2021 race-neutral equation
                </div>
            </div>
        `;
    }

    getUreaCreatinineCalculator() {
        return `
            <div class="calculator-form">
                <h4>Urea:Creatinine Ratio Calculator</h4>
                <p><small>Contextual information for kidney function assessment</small></p>
                
                <div class="calc-input-group">
                    <label>Serum Urea (mmol/L):</label>
                    <input type="number" id="urea-value" placeholder="7.0" min="1" max="50" step="0.1">
                    <small>Normal range: 2.5-7.5 mmol/L</small>
                </div>
                <div class="calc-input-group">
                    <label>Serum Creatinine (µmol/L):</label>
                    <input type="number" id="creatinine-value" placeholder="80" min="20" max="2000">
                    <small>Normal range: 60-110 µmol/L (men), 45-90 µmol/L (women)</small>
                </div>
                
                <button onclick="window.quizApp.calculateUreaCreatinine()">Calculate Ratio</button>
                <div id="urea-creatinine-result" class="calc-result"></div>
                
                <div class="calc-reference">
                    <small>
                        <strong>?? Note:</strong> U:C ratio is NOT used for AKI diagnosis<br>
                        <strong>AKI Diagnostic Criteria (KDIGO/NICE CG169):</strong><br>
                        • Creatinine rise =26 µmol/L in 48h, OR<br>
                        • Creatinine =1.5× baseline in 7 days, OR<br>
                        • Urine output <0.5 mL/kg/hr for >6 hours<br><br>
                        <strong>U:C Ratio (contextual only):</strong><br>
                        40-100:1 typical | >100:1 may suggest prerenal causes<br>
                        <em>Always interpret with clinical context, AKI staging, and eGFR</em>
                    </small>
                </div>
            </div>
        `;
    }

    getABCD2Calculator() {
        return `
            <div class="calculator-form">
                <h4>ABCD² Score</h4>
                <p><small>Stroke risk after TIA (NICE CG68)</small></p>
                
                <div class="calc-input-group">
                    <label>Age:</label>
                    <select id="abcd2-age">
                        <option value="0"><60 years (0 points)</option>
                        <option value="1">=60 years (1 point)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Blood Pressure:</label>
                    <select id="abcd2-bp">
                        <option value="0">SBP <140 and DBP <90 (0 points)</option>
                        <option value="1">SBP =140 or DBP =90 (1 point)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Clinical Features:</label>
                    <select id="abcd2-clinical">
                        <option value="0">Other (0 points)</option>
                        <option value="1">Speech disturbance without weakness (1 point)</option>
                        <option value="2">Unilateral weakness (2 points)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Duration of TIA:</label>
                    <select id="abcd2-duration">
                        <option value="0"><10 minutes (0 points)</option>
                        <option value="1">10-59 minutes (1 point)</option>
                        <option value="2">=60 minutes (2 points)</option>
                    </select>
                </div>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="abcd2-diabetes"> Diabetes mellitus (+1)</label>
                </div>
                
                <button onclick="window.quizApp.calculateABCD2()">Calculate Score</button>
                <div id="abcd2-result" class="calc-result"></div>
            </div>
        `;
    }

    calculateUreaCreatinine() {
        const urea = parseFloat(document.getElementById('urea-value').value);
        const creatinine = parseFloat(document.getElementById('creatinine-value').value);
        
        if (!urea || !creatinine) {
            document.getElementById('urea-creatinine-result').innerHTML = 
                '<div class="calc-error"><strong>Please enter both urea and creatinine values</strong></div>';
            return;
        }
        
        // Calculate urea:creatinine ratio (UK standard: both in mmol/L)
        // Convert creatinine from µmol/L to mmol/L for ratio calculation
        const creatinineMmol = creatinine / 1000;
        const ratio = urea / creatinineMmol;
        
        let interpretation = '';
        let color = '';
        let clinicalContext = '';
        let niceGuidance = '';
        
        if (ratio < 40) {
            interpretation = 'Low ratio (<40:1)';
            color = '#FF5722';
            clinicalContext = 'Unusual - check sample integrity. May suggest intrinsic renal disease with reduced urea production.';
            niceGuidance = 'Consider liver disease, malnutrition, or analytical error.';
        } else if (ratio >= 40 && ratio <= 100) {
            interpretation = 'Normal ratio (40-100:1)';
            color = '#4CAF50';
            clinicalContext = 'Normal kidney function or stable CKD. Ratio within expected range.';
            niceGuidance = 'Continue standard monitoring as per NICE CG169.';
        } else if (ratio > 100 && ratio <= 150) {
            interpretation = 'Elevated ratio (100-150:1)';
            color = '#FF9800';
            clinicalContext = 'Suggests prerenal AKI - assess volume status, BP, medications (ACEi/ARB, diuretics).';
            niceGuidance = 'Check fluid balance, stop nephrotoxic drugs, consider IV fluids if volume depleted.';
        } else {
            interpretation = 'Very high ratio (>150:1)';
            color = '#F44336';
            clinicalContext = 'Strongly suggests severe prerenal AKI or early post-renal obstruction.';
            niceGuidance = 'Urgent assessment required. Consider IV fluids, review medications, bladder scan, nephrology review.';
        }
        
        // Additional context based on absolute values
        let additionalNotes = '';
        if (urea > 20) {
            additionalNotes += '?? Significantly elevated urea - consider urgent nephrology review. ';
        }
        if (creatinine > 300) {
            additionalNotes += '?? Severely elevated creatinine - may require acute dialysis. ';
        }
        
        document.getElementById('urea-creatinine-result').innerHTML = `
            <div style="color: ${color}">
                <strong>Urea:Creatinine Ratio: ${Math.round(ratio)}:1</strong><br>
                <strong>${interpretation}</strong><br>
                <div style="margin-top: 8px; font-size: 0.9em;">
                    <strong>Clinical Context:</strong> ${clinicalContext}
                </div>
                <div style="margin-top: 8px; font-size: 0.9em; color: #2E7D32;">
                    <strong>NICE Guidance:</strong> ${niceGuidance}
                </div>
                ${additionalNotes ? `<div style="margin-top: 8px; font-size: 0.9em; color: #D84315;"><strong>${additionalNotes}</strong></div>` : ''}
                <div style="margin-top: 12px; font-size: 0.8em; color: #666; border-top: 1px solid #eee; padding-top: 8px;">
                    <strong>Values:</strong> Urea ${urea} mmol/L | Creatinine ${creatinine} µmol/L<br>
                    <em>Always interpret alongside eGFR, clinical history, and AKI staging (KDIGO criteria)</em>
                </div>
            </div>
        `;
    }

    calculateABCD2() {
        let score = 0;
        
        score += parseInt(document.getElementById('abcd2-age').value) || 0;
        score += parseInt(document.getElementById('abcd2-bp').value) || 0;
        score += parseInt(document.getElementById('abcd2-clinical').value) || 0;
        score += parseInt(document.getElementById('abcd2-duration').value) || 0;
        if (document.getElementById('abcd2-diabetes').checked) score += 1;
        
        let risk = '';
        let dayStroke = '';
        let color = '';
        
        if (score <= 3) {
            risk = 'Low risk';
            dayStroke = '1% 2-day stroke risk';
            color = '#4CAF50';
        } else if (score <= 5) {
            risk = 'Moderate risk';
            dayStroke = '4.1% 2-day stroke risk';
            color = '#FF9800';
        } else {
            risk = 'High risk';
            dayStroke = '8.1% 2-day stroke risk';
            color = '#F44336';
        }
        
        document.getElementById('abcd2-result').innerHTML = `
            <div style="color: ${color}">
                <strong>ABCD² Score: ${score}/7</strong><br>
                <strong>${risk}</strong><br>
                ${dayStroke}<br>
                <div style="margin-top: 8px; font-weight: bold; color: #2196F3;">
                    All suspected TIA ? same-day specialist assessment (within 24h)
                </div>
                <div style="margin-top: 6px; font-size: 0.85em; color: #666;">
                    Current UK guidance: ABCD² used for stroke risk stratification, not triage timing
                </div>
            </div>
        `;
    }

    getMUSTCalculator() {
        return `
            <div class="calculator-form">
                <h4>MUST Score</h4>
                <p><small>Malnutrition Universal Screening Tool (BAPEN)</small></p>
                
                <div class="calc-input-group">
                    <label>BMI:</label>
                    <select id="must-bmi">
                        <option value="0">BMI >20 (=18.5 if >65yrs) (0 points)</option>
                        <option value="1">BMI 18.5-20 (1 point)</option>
                        <option value="2">BMI <18.5 (2 points)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Unplanned Weight Loss (3-6 months):</label>
                    <select id="must-weight">
                        <option value="0"><5% (0 points)</option>
                        <option value="1">5-10% (1 point)</option>
                        <option value="2">>10% (2 points)</option>
                    </select>
                </div>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="must-acute"> Acute disease effect - patient acutely ill and no nutritional intake >5 days (+2)</label>
                </div>
                
                <button onclick="window.quizApp.calculateMUST()">Calculate MUST Score</button>
                <div id="must-result" class="calc-result"></div>
                
                <div class="calc-reference">
                    <small>
                        <strong>MUST Actions:</strong><br>
                        0: Low risk - routine care<br>
                        1: Medium risk - observe/document<br>
                        =2: High risk - treat/refer dietitian
                    </small>
                </div>
            </div>
        `;
    }

    calculateMUST() {
        let score = 0;
        
        score += parseInt(document.getElementById('must-bmi').value) || 0;
        score += parseInt(document.getElementById('must-weight').value) || 0;
        if (document.getElementById('must-acute').checked) score += 2;
        
        let risk = '';
        let action = '';
        let color = '';
        
        if (score === 0) {
            risk = 'Low risk';
            action = 'Routine clinical care. Repeat screening weekly (hospital) or annually (community)';
            color = '#4CAF50';
        } else if (score === 1) {
            risk = 'Medium risk';
            action = 'Observe and document dietary intake for 3 days. Repeat screening weekly';
            color = '#FF9800';
        } else {
            risk = 'High risk';
            action = 'Treat - refer to dietitian, improve nutritional intake, monitor and review';
            color = '#F44336';
        }
        
        document.getElementById('must-result').innerHTML = `
            <div style="color: ${color}">
                <strong>MUST Score: ${score}</strong><br>
                <strong>${risk}</strong><br>
                <div style="margin-top: 8px; font-size: 0.9em;">
                    ${action}
                </div>
            </div>
        `;
    }

    getWaterlowCalculator() {
        return `
            <div class="calculator-form">
                <h4>Waterlow Pressure Ulcer Risk Assessment</h4>
                <p><small>UK standard pressure ulcer risk screening</small></p>
                
                <div class="calc-input-group">
                    <label>Age:</label>
                    <select id="waterlow-age">
                        <option value="1">14-49 years (1 point)</option>
                        <option value="2">50-64 years (2 points)</option>
                        <option value="3">65-74 years (3 points)</option>
                        <option value="4">75-80 years (4 points)</option>
                        <option value="5">81+ years (5 points)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Sex/Build:</label>
                    <select id="waterlow-build">
                        <option value="0">Male (0 points)</option>
                        <option value="1">Female (1 point)</option>
                        <option value="1">Below average build (1 point)</option>
                        <option value="2">Above average build (2 points)</option>
                        <option value="3">Obese (3 points)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Continence:</label>
                    <select id="waterlow-continence">
                        <option value="0">Complete/catheterised (0 points)</option>
                        <option value="1">Occasional incontinence (1 point)</option>
                        <option value="2">Catheterised/incontinent of faeces (2 points)</option>
                        <option value="3">Doubly incontinent (3 points)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Mobility:</label>
                    <select id="waterlow-mobility">
                        <option value="0">Fully mobile (0 points)</option>
                        <option value="1">Restless/fidgety (1 point)</option>
                        <option value="2">Apathetic (2 points)</option>
                        <option value="3">Restricted (3 points)</option>
                        <option value="4">Bedfast (4 points)</option>
                        <option value="5">Chairfast (5 points)</option>
                    </select>
                </div>
                
                <button onclick="window.quizApp.calculateWaterlow()">Calculate Risk</button>
                <div id="waterlow-result" class="calc-result"></div>
            </div>
        `;
    }

    calculateWaterlow() {
        let score = 0;
        
        score += parseInt(document.getElementById('waterlow-age').value) || 0;
        score += parseInt(document.getElementById('waterlow-build').value) || 0;
        score += parseInt(document.getElementById('waterlow-continence').value) || 0;
        score += parseInt(document.getElementById('waterlow-mobility').value) || 0;
        
        let risk = '';
        let action = '';
        let color = '';
        
        if (score < 10) {
            risk = 'At risk';
            action = 'Basic preventive measures';
            color = '#4CAF50';
        } else if (score < 15) {
            risk = 'High risk';
            action = 'Enhanced preventive measures + pressure relieving aids';
            color = '#FF9800';
        } else if (score < 20) {
            risk = 'Very high risk';
            action = 'Maximum preventive measures + high-specification foam mattress';
            color = '#F44336';
        } else {
            risk = 'Extremely high risk';
            action = 'As above + specialist mattress/bed + expert advice';
            color = '#D32F2F';
        }
        
        document.getElementById('waterlow-result').innerHTML = `
            <div style="color: ${color}">
                <strong>Waterlow Score: ${score}</strong><br>
                <strong>${risk}</strong><br>
                <div style="margin-top: 8px; font-size: 0.9em;">
                    ${action}
                </div>
            </div>
        `;
    }

    getUnitConverterCalculator() {
        return `
            <div class="calculator-form">
                <h4>Clinical Unit Converter</h4>
                <p><small>Convert between common medical units</small></p>
                
                <div class="calc-input-group">
                    <label>Conversion Type:</label>
                    <select id="unit-type" onchange="window.quizApp.updateUnitConverter()">
                        <option value="">Select conversion type</option>
                        <optgroup label="Laboratory Values - Common">
                            <option value="glucose">Glucose (mmol/L ? mg/dL)</option>
                            <option value="cholesterol">Cholesterol/Lipids (mmol/L ? mg/dL)</option>
                            <option value="creatinine">Creatinine (µmol/L ? mg/dL)</option>
                            <option value="bilirubin">Bilirubin (µmol/L ? mg/dL)</option>
                            <option value="hba1c">HbA1c (% ? mmol/mol)</option>
                            <option value="hemoglobin">Hemoglobin (g/dL ? g/L)</option>
                        </optgroup>
                        <optgroup label="Electrolytes & Minerals">
                            <option value="calcium">Calcium (mmol/L ? mg/dL)</option>
                            <option value="magnesium">Magnesium (mmol/L ? mg/dL)</option>
                            <option value="phosphate">Phosphate (mmol/L ? mg/dL)</option>
                            <option value="urea">Urea/BUN (mmol/L ? mg/dL)</option>
                        </optgroup>
                        <optgroup label="Proteins & Lipids">
                            <option value="albumin">Albumin (g/L ? g/dL)</option>
                            <option value="triglycerides">Triglycerides (mmol/L ? mg/dL)</option>
                        </optgroup>
                        <optgroup label="Other Lab Values">
                            <option value="uric-acid">Uric Acid (µmol/L ? mg/dL)</option>
                            <option value="vitamin-d">Vitamin D (nmol/L ? ng/mL)</option>
                            <option value="ferritin">Ferritin (µg/L ? ng/mL)</option>
                        </optgroup>
                        <optgroup label="Physical Measurements">
                            <option value="weight">Weight (kg ? lbs)</option>
                            <option value="height">Height (cm ? inches/feet)</option>
                            <option value="temperature">Temperature (°C ? °F)</option>
                        </optgroup>
                        <optgroup label="Clinical Measurements">
                            <option value="pressure">Pressure (mmHg ? kPa)</option>
                            <option value="blood-volume">Blood Volume (mL ? units/pints)</option>
                            <option value="inr">INR ? Prothrombin %</option>
                        </optgroup>
                    </select>
                </div>
                
                <div id="unit-converter-fields"></div>
                
                <div id="unit-result" class="calc-result"></div>
                
                <div class="calc-reference">
                    <small id="conversion-info"></small>
                </div>
            </div>
        `;
    }

    updateUnitConverter() {
        const unitType = document.getElementById('unit-type').value;
        const fieldsContainer = document.getElementById('unit-converter-fields');
        const conversionInfo = document.getElementById('conversion-info');
        
        if (!unitType) {
            fieldsContainer.innerHTML = '';
            conversionInfo.innerHTML = '';
            document.getElementById('unit-result').innerHTML = '';
            return;
        }
        
        let fieldsHtml = '';
        let infoText = '';
        
        switch(unitType) {
            case 'glucose':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>mmol/L:</label>
                        <input type="number" id="unit-input-1" placeholder="5.5" step="0.1" 
                               oninput="window.quizApp.convertUnits('glucose', 'mmol')">
                    </div>
                    <div class="calc-input-group">
                        <label>mg/dL:</label>
                        <input type="number" id="unit-input-2" placeholder="100" step="1" 
                               oninput="window.quizApp.convertUnits('glucose', 'mgdl')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> mg/dL = mmol/L × 18 | Normal fasting: 3.9-5.6 mmol/L (70-100 mg/dL)';
                break;
                
            case 'cholesterol':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>mmol/L:</label>
                        <input type="number" id="unit-input-1" placeholder="5.0" step="0.1" 
                               oninput="window.quizApp.convertUnits('cholesterol', 'mmol')">
                    </div>
                    <div class="calc-input-group">
                        <label>mg/dL:</label>
                        <input type="number" id="unit-input-2" placeholder="193" step="1" 
                               oninput="window.quizApp.convertUnits('cholesterol', 'mgdl')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> mg/dL = mmol/L × 38.67 | Target total cholesterol: <5.0 mmol/L (<193 mg/dL)';
                break;
                
            case 'creatinine':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>µmol/L:</label>
                        <input type="number" id="unit-input-1" placeholder="100" step="1" 
                               oninput="window.quizApp.convertUnits('creatinine', 'umol')">
                    </div>
                    <div class="calc-input-group">
                        <label>mg/dL:</label>
                        <input type="number" id="unit-input-2" placeholder="1.13" step="0.01" 
                               oninput="window.quizApp.convertUnits('creatinine', 'mgdl')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> mg/dL = µmol/L × 0.0113 | Normal: M 62-115 µmol/L, F 53-97 µmol/L';
                break;
                
            case 'bilirubin':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>µmol/L:</label>
                        <input type="number" id="unit-input-1" placeholder="20" step="1" 
                               oninput="window.quizApp.convertUnits('bilirubin', 'umol')">
                    </div>
                    <div class="calc-input-group">
                        <label>mg/dL:</label>
                        <input type="number" id="unit-input-2" placeholder="1.17" step="0.01" 
                               oninput="window.quizApp.convertUnits('bilirubin', 'mgdl')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> mg/dL = µmol/L × 0.0585 | Normal: 5-20 µmol/L (0.3-1.2 mg/dL)';
                break;
                
            case 'hba1c':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>% (DCCT):</label>
                        <input type="number" id="unit-input-1" placeholder="6.5" step="0.1" 
                               oninput="window.quizApp.convertUnits('hba1c', 'percent')">
                    </div>
                    <div class="calc-input-group">
                        <label>mmol/mol (IFCC):</label>
                        <input type="number" id="unit-input-2" placeholder="48" step="1" 
                               oninput="window.quizApp.convertUnits('hba1c', 'mmol')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> mmol/mol = (% - 2.15) × 10.929 | Diabetes: =48 mmol/mol (=6.5%)';
                break;
                
            case 'weight':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>Kilograms (kg):</label>
                        <input type="number" id="unit-input-1" placeholder="70" step="0.1" 
                               oninput="window.quizApp.convertUnits('weight', 'kg')">
                    </div>
                    <div class="calc-input-group">
                        <label>Pounds (lbs):</label>
                        <input type="number" id="unit-input-2" placeholder="154" step="0.1" 
                               oninput="window.quizApp.convertUnits('weight', 'lbs')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> 1 kg = 2.20462 lbs | 1 lb = 0.453592 kg';
                break;
                
            case 'height':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>Centimeters (cm):</label>
                        <input type="number" id="unit-input-1" placeholder="175" step="0.1" 
                               oninput="window.quizApp.convertUnits('height', 'cm')">
                    </div>
                    <div class="calc-input-group">
                        <label>Feet:</label>
                        <input type="number" id="unit-input-2" placeholder="5" step="1" 
                               oninput="window.quizApp.convertUnits('height', 'feet')">
                    </div>
                    <div class="calc-input-group">
                        <label>Inches:</label>
                        <input type="number" id="unit-input-3" placeholder="9" step="1" 
                               oninput="window.quizApp.convertUnits('height', 'inches')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> 1 inch = 2.54 cm | 1 foot = 12 inches = 30.48 cm';
                break;
                
            case 'temperature':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>Celsius (°C):</label>
                        <input type="number" id="unit-input-1" placeholder="37" step="0.1" 
                               oninput="window.quizApp.convertUnits('temperature', 'celsius')">
                    </div>
                    <div class="calc-input-group">
                        <label>Fahrenheit (°F):</label>
                        <input type="number" id="unit-input-2" placeholder="98.6" step="0.1" 
                               oninput="window.quizApp.convertUnits('temperature', 'fahrenheit')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> °F = (°C × 9/5) + 32 | Normal body temp: 36.5-37.5°C (97.7-99.5°F)';
                break;
                
            case 'pressure':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>mmHg:</label>
                        <input type="number" id="unit-input-1" placeholder="120" step="1" 
                               oninput="window.quizApp.convertUnits('pressure', 'mmhg')">
                    </div>
                    <div class="calc-input-group">
                        <label>kPa:</label>
                        <input type="number" id="unit-input-2" placeholder="16" step="0.1" 
                               oninput="window.quizApp.convertUnits('pressure', 'kpa')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> 1 kPa = 7.50062 mmHg | Normal BP: <120/80 mmHg (<16/10.7 kPa)';
                break;
                
            case 'hemoglobin':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>g/dL:</label>
                        <input type="number" id="unit-input-1" placeholder="14.5" step="0.1" 
                               oninput="window.quizApp.convertUnits('hemoglobin', 'gdl')">
                    </div>
                    <div class="calc-input-group">
                        <label>g/L:</label>
                        <input type="number" id="unit-input-2" placeholder="145" step="1" 
                               oninput="window.quizApp.convertUnits('hemoglobin', 'gl')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> g/L = g/dL × 10 | Normal: M 130-180 g/L (13-18 g/dL), F 120-160 g/L (12-16 g/dL)';
                break;
                
            case 'calcium':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>mmol/L:</label>
                        <input type="number" id="unit-input-1" placeholder="2.4" step="0.01" 
                               oninput="window.quizApp.convertUnits('calcium', 'mmol')">
                    </div>
                    <div class="calc-input-group">
                        <label>mg/dL:</label>
                        <input type="number" id="unit-input-2" placeholder="9.6" step="0.1" 
                               oninput="window.quizApp.convertUnits('calcium', 'mgdl')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> mg/dL = mmol/L × 4.008 | Normal: 2.2-2.6 mmol/L (8.8-10.4 mg/dL) | Adjust for albumin';
                break;
                
            case 'magnesium':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>mmol/L:</label>
                        <input type="number" id="unit-input-1" placeholder="0.85" step="0.01" 
                               oninput="window.quizApp.convertUnits('magnesium', 'mmol')">
                    </div>
                    <div class="calc-input-group">
                        <label>mg/dL:</label>
                        <input type="number" id="unit-input-2" placeholder="2.07" step="0.01" 
                               oninput="window.quizApp.convertUnits('magnesium', 'mgdl')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> mg/dL = mmol/L × 2.431 | Normal: 0.7-1.0 mmol/L (1.7-2.4 mg/dL)';
                break;
                
            case 'phosphate':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>mmol/L:</label>
                        <input type="number" id="unit-input-1" placeholder="1.0" step="0.01" 
                               oninput="window.quizApp.convertUnits('phosphate', 'mmol')">
                    </div>
                    <div class="calc-input-group">
                        <label>mg/dL:</label>
                        <input type="number" id="unit-input-2" placeholder="3.1" step="0.1" 
                               oninput="window.quizApp.convertUnits('phosphate', 'mgdl')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> mg/dL = mmol/L × 3.097 | Normal: 0.8-1.5 mmol/L (2.5-4.5 mg/dL)';
                break;
                
            case 'urea':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>mmol/L (Urea):</label>
                        <input type="number" id="unit-input-1" placeholder="5.0" step="0.1" 
                               oninput="window.quizApp.convertUnits('urea', 'mmol')">
                    </div>
                    <div class="calc-input-group">
                        <label>mg/dL (BUN):</label>
                        <input type="number" id="unit-input-2" placeholder="14" step="1" 
                               oninput="window.quizApp.convertUnits('urea', 'mgdl')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> BUN (mg/dL) = Urea (mmol/L) × 2.8 | Normal: 2.5-7.8 mmol/L (7-22 mg/dL BUN)';
                break;
                
            case 'albumin':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>g/L:</label>
                        <input type="number" id="unit-input-1" placeholder="40" step="1" 
                               oninput="window.quizApp.convertUnits('albumin', 'gl')">
                    </div>
                    <div class="calc-input-group">
                        <label>g/dL:</label>
                        <input type="number" id="unit-input-2" placeholder="4.0" step="0.1" 
                               oninput="window.quizApp.convertUnits('albumin', 'gdl')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> g/dL = g/L × 0.1 | Normal: 35-50 g/L (3.5-5.0 g/dL)';
                break;
                
            case 'triglycerides':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>mmol/L:</label>
                        <input type="number" id="unit-input-1" placeholder="1.5" step="0.1" 
                               oninput="window.quizApp.convertUnits('triglycerides', 'mmol')">
                    </div>
                    <div class="calc-input-group">
                        <label>mg/dL:</label>
                        <input type="number" id="unit-input-2" placeholder="133" step="1" 
                               oninput="window.quizApp.convertUnits('triglycerides', 'mgdl')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> mg/dL = mmol/L × 88.57 | Target: <1.7 mmol/L (<150 mg/dL)';
                break;
                
            case 'uric-acid':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>µmol/L:</label>
                        <input type="number" id="unit-input-1" placeholder="350" step="10" 
                               oninput="window.quizApp.convertUnits('uric-acid', 'umol')">
                    </div>
                    <div class="calc-input-group">
                        <label>mg/dL:</label>
                        <input type="number" id="unit-input-2" placeholder="5.9" step="0.1" 
                               oninput="window.quizApp.convertUnits('uric-acid', 'mgdl')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> mg/dL = µmol/L × 0.0168 | Normal: M 200-430 µmol/L, F 140-360 µmol/L | Gout: >360 µmol/L';
                break;
                
            case 'vitamin-d':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>nmol/L:</label>
                        <input type="number" id="unit-input-1" placeholder="75" step="1" 
                               oninput="window.quizApp.convertUnits('vitamin-d', 'nmol')">
                    </div>
                    <div class="calc-input-group">
                        <label>ng/mL:</label>
                        <input type="number" id="unit-input-2" placeholder="30" step="1" 
                               oninput="window.quizApp.convertUnits('vitamin-d', 'ngml')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> ng/mL = nmol/L × 0.4 | Deficient: <25 nmol/L (<10 ng/mL) | Sufficient: >50 nmol/L (>20 ng/mL)';
                break;
                
            case 'ferritin':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>µg/L:</label>
                        <input type="number" id="unit-input-1" placeholder="100" step="1" 
                               oninput="window.quizApp.convertUnits('ferritin', 'ugl')">
                    </div>
                    <div class="calc-input-group">
                        <label>ng/mL:</label>
                        <input type="number" id="unit-input-2" placeholder="100" step="1" 
                               oninput="window.quizApp.convertUnits('ferritin', 'ngml')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> 1 µg/L = 1 ng/mL (same value, different units) | Normal: M 30-400, F 15-150 µg/L';
                break;
                
            case 'blood-volume':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>Milliliters (mL):</label>
                        <input type="number" id="unit-input-1" placeholder="450" step="10" 
                               oninput="window.quizApp.convertUnits('blood-volume', 'ml')">
                    </div>
                    <div class="calc-input-group">
                        <label>Units (blood transfusion):</label>
                        <input type="number" id="unit-input-2" placeholder="1" step="0.1" 
                               oninput="window.quizApp.convertUnits('blood-volume', 'units')">
                    </div>
                    <div class="calc-input-group">
                        <label>Pints:</label>
                        <input type="number" id="unit-input-3" placeholder="0.95" step="0.01" 
                               oninput="window.quizApp.convertUnits('blood-volume', 'pints')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> 1 unit ˜ 450-500 mL ˜ 0.95 pints | 1 pint = 473 mL | RBC increases Hb by ~10 g/L per unit';
                break;
                
            case 'inr':
                fieldsHtml = `
                    <div class="calc-input-group">
                        <label>INR:</label>
                        <input type="number" id="unit-input-1" placeholder="2.5" step="0.1" 
                               oninput="window.quizApp.convertUnits('inr', 'inr')">
                    </div>
                    <div class="calc-input-group">
                        <label>Prothrombin Time (%):</label>
                        <input type="number" id="unit-input-2" placeholder="40" step="1" 
                               oninput="window.quizApp.convertUnits('inr', 'percent')">
                    </div>
                `;
                infoText = '<strong>Conversion:</strong> PT% = 100 ÷ INR | Normal INR: 0.8-1.2 (100-83%) | Therapeutic: AF 2-3, DVT/PE 2-3, Mechanical valve 2.5-3.5';
                break;
        }
        
        fieldsContainer.innerHTML = fieldsHtml;
        conversionInfo.innerHTML = infoText;
        document.getElementById('unit-result').innerHTML = '';
    }

    convertUnits(unitType, sourceUnit) {
        const input1 = document.getElementById('unit-input-1');
        const input2 = document.getElementById('unit-input-2');
        const input3 = document.getElementById('unit-input-3');
        const resultDiv = document.getElementById('unit-result');
        
        let value, converted, resultText = '';
        
        switch(unitType) {
            case 'glucose':
                if (sourceUnit === 'mmol') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = value * 18;
                        input2.value = converted.toFixed(1);
                        resultText = `${value} mmol/L = ${converted.toFixed(1)} mg/dL`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = value / 18;
                        input1.value = converted.toFixed(1);
                        resultText = `${value} mg/dL = ${converted.toFixed(1)} mmol/L`;
                    }
                }
                break;
                
            case 'cholesterol':
                if (sourceUnit === 'mmol') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = value * 38.67;
                        input2.value = converted.toFixed(0);
                        resultText = `${value} mmol/L = ${converted.toFixed(0)} mg/dL`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = value / 38.67;
                        input1.value = converted.toFixed(2);
                        resultText = `${value} mg/dL = ${converted.toFixed(2)} mmol/L`;
                    }
                }
                break;
                
            case 'creatinine':
                if (sourceUnit === 'umol') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = value * 0.0113;
                        input2.value = converted.toFixed(2);
                        resultText = `${value} µmol/L = ${converted.toFixed(2)} mg/dL`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = value / 0.0113;
                        input1.value = converted.toFixed(0);
                        resultText = `${value} mg/dL = ${converted.toFixed(0)} µmol/L`;
                    }
                }
                break;
                
            case 'bilirubin':
                if (sourceUnit === 'umol') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = value * 0.0585;
                        input2.value = converted.toFixed(2);
                        resultText = `${value} µmol/L = ${converted.toFixed(2)} mg/dL`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = value / 0.0585;
                        input1.value = converted.toFixed(0);
                        resultText = `${value} mg/dL = ${converted.toFixed(0)} µmol/L`;
                    }
                }
                break;
                
            case 'hba1c':
                if (sourceUnit === 'percent') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = (value - 2.15) * 10.929;
                        input2.value = converted.toFixed(0);
                        resultText = `${value}% = ${converted.toFixed(0)} mmol/mol`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = (value / 10.929) + 2.15;
                        input1.value = converted.toFixed(1);
                        resultText = `${value} mmol/mol = ${converted.toFixed(1)}%`;
                    }
                }
                break;
                
            case 'weight':
                if (sourceUnit === 'kg') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = value * 2.20462;
                        input2.value = converted.toFixed(1);
                        resultText = `${value} kg = ${converted.toFixed(1)} lbs`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = value * 0.453592;
                        input1.value = converted.toFixed(1);
                        resultText = `${value} lbs = ${converted.toFixed(1)} kg`;
                    }
                }
                break;
                
            case 'height':
                if (sourceUnit === 'cm') {
                    value = parseFloat(input1.value);
                    if (value) {
                        const totalInches = value / 2.54;
                        const feet = Math.floor(totalInches / 12);
                        const inches = Math.round(totalInches % 12);
                        input2.value = feet;
                        input3.value = inches;
                        resultText = `${value} cm = ${feet}' ${inches}"`;
                    }
                } else {
                    const feet = parseFloat(input2.value) || 0;
                    const inches = parseFloat(input3.value) || 0;
                    if (feet || inches) {
                        const totalInches = (feet * 12) + inches;
                        converted = totalInches * 2.54;
                        input1.value = converted.toFixed(1);
                        resultText = `${feet}' ${inches}" = ${converted.toFixed(1)} cm`;
                    }
                }
                break;
                
            case 'temperature':
                if (sourceUnit === 'celsius') {
                    value = parseFloat(input1.value);
                    if (value !== undefined && value !== null && value !== '') {
                        converted = (value * 9/5) + 32;
                        input2.value = converted.toFixed(1);
                        resultText = `${value}°C = ${converted.toFixed(1)}°F`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value !== undefined && value !== null && value !== '') {
                        converted = (value - 32) * 5/9;
                        input1.value = converted.toFixed(1);
                        resultText = `${value}°F = ${converted.toFixed(1)}°C`;
                    }
                }
                break;
                
            case 'pressure':
                if (sourceUnit === 'mmhg') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = value / 7.50062;
                        input2.value = converted.toFixed(1);
                        resultText = `${value} mmHg = ${converted.toFixed(1)} kPa`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = value * 7.50062;
                        input1.value = converted.toFixed(0);
                        resultText = `${value} kPa = ${converted.toFixed(0)} mmHg`;
                    }
                }
                break;
                
            case 'hemoglobin':
                if (sourceUnit === 'gdl') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = value * 10;
                        input2.value = converted.toFixed(0);
                        resultText = `${value} g/dL = ${converted.toFixed(0)} g/L`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = value / 10;
                        input1.value = converted.toFixed(1);
                        resultText = `${value} g/L = ${converted.toFixed(1)} g/dL`;
                    }
                }
                break;
                
            case 'calcium':
                if (sourceUnit === 'mmol') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = value * 4.008;
                        input2.value = converted.toFixed(1);
                        resultText = `${value} mmol/L = ${converted.toFixed(1)} mg/dL`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = value / 4.008;
                        input1.value = converted.toFixed(2);
                        resultText = `${value} mg/dL = ${converted.toFixed(2)} mmol/L`;
                    }
                }
                break;
                
            case 'magnesium':
                if (sourceUnit === 'mmol') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = value * 2.431;
                        input2.value = converted.toFixed(2);
                        resultText = `${value} mmol/L = ${converted.toFixed(2)} mg/dL`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = value / 2.431;
                        input1.value = converted.toFixed(2);
                        resultText = `${value} mg/dL = ${converted.toFixed(2)} mmol/L`;
                    }
                }
                break;
                
            case 'phosphate':
                if (sourceUnit === 'mmol') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = value * 3.097;
                        input2.value = converted.toFixed(1);
                        resultText = `${value} mmol/L = ${converted.toFixed(1)} mg/dL`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = value / 3.097;
                        input1.value = converted.toFixed(2);
                        resultText = `${value} mg/dL = ${converted.toFixed(2)} mmol/L`;
                    }
                }
                break;
                
            case 'urea':
                if (sourceUnit === 'mmol') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = value * 2.8;
                        input2.value = converted.toFixed(0);
                        resultText = `${value} mmol/L (Urea) = ${converted.toFixed(0)} mg/dL (BUN)`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = value / 2.8;
                        input1.value = converted.toFixed(1);
                        resultText = `${value} mg/dL (BUN) = ${converted.toFixed(1)} mmol/L (Urea)`;
                    }
                }
                break;
                
            case 'albumin':
                if (sourceUnit === 'gl') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = value * 0.1;
                        input2.value = converted.toFixed(1);
                        resultText = `${value} g/L = ${converted.toFixed(1)} g/dL`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = value * 10;
                        input1.value = converted.toFixed(0);
                        resultText = `${value} g/dL = ${converted.toFixed(0)} g/L`;
                    }
                }
                break;
                
            case 'triglycerides':
                if (sourceUnit === 'mmol') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = value * 88.57;
                        input2.value = converted.toFixed(0);
                        resultText = `${value} mmol/L = ${converted.toFixed(0)} mg/dL`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = value / 88.57;
                        input1.value = converted.toFixed(2);
                        resultText = `${value} mg/dL = ${converted.toFixed(2)} mmol/L`;
                    }
                }
                break;
                
            case 'uric-acid':
                if (sourceUnit === 'umol') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = value * 0.0168;
                        input2.value = converted.toFixed(1);
                        resultText = `${value} µmol/L = ${converted.toFixed(1)} mg/dL`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = value / 0.0168;
                        input1.value = converted.toFixed(0);
                        resultText = `${value} mg/dL = ${converted.toFixed(0)} µmol/L`;
                    }
                }
                break;
                
            case 'vitamin-d':
                if (sourceUnit === 'nmol') {
                    value = parseFloat(input1.value);
                    if (value) {
                        converted = value * 0.4;
                        input2.value = converted.toFixed(0);
                        resultText = `${value} nmol/L = ${converted.toFixed(0)} ng/mL`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        converted = value / 0.4;
                        input1.value = converted.toFixed(0);
                        resultText = `${value} ng/mL = ${converted.toFixed(0)} nmol/L`;
                    }
                }
                break;
                
            case 'ferritin':
                if (sourceUnit === 'ugl') {
                    value = parseFloat(input1.value);
                    if (value) {
                        input2.value = value;
                        resultText = `${value} µg/L = ${value} ng/mL (same numeric value)`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value) {
                        input1.value = value;
                        resultText = `${value} ng/mL = ${value} µg/L (same numeric value)`;
                    }
                }
                break;
                
            case 'blood-volume':
                if (sourceUnit === 'ml') {
                    value = parseFloat(input1.value);
                    if (value) {
                        const units = value / 475; // Average of 450-500
                        const pints = value / 473;
                        input2.value = units.toFixed(2);
                        if (input3) input3.value = pints.toFixed(2);
                        resultText = `${value} mL = ${units.toFixed(2)} units = ${pints.toFixed(2)} pints`;
                    }
                } else if (sourceUnit === 'units') {
                    value = parseFloat(input2.value);
                    if (value) {
                        const ml = value * 475;
                        const pints = ml / 473;
                        input1.value = ml.toFixed(0);
                        if (input3) input3.value = pints.toFixed(2);
                        resultText = `${value} units = ${ml.toFixed(0)} mL = ${pints.toFixed(2)} pints`;
                    }
                } else if (sourceUnit === 'pints') {
                    value = parseFloat(input3.value);
                    if (value) {
                        const ml = value * 473;
                        const units = ml / 475;
                        input1.value = ml.toFixed(0);
                        input2.value = units.toFixed(2);
                        resultText = `${value} pints = ${ml.toFixed(0)} mL = ${units.toFixed(2)} units`;
                    }
                }
                break;
                
            case 'inr':
                if (sourceUnit === 'inr') {
                    value = parseFloat(input1.value);
                    if (value && value > 0) {
                        converted = 100 / value;
                        input2.value = converted.toFixed(0);
                        resultText = `INR ${value} = ${converted.toFixed(0)}% prothrombin time`;
                    }
                } else {
                    value = parseFloat(input2.value);
                    if (value && value > 0) {
                        converted = 100 / value;
                        input1.value = converted.toFixed(1);
                        resultText = `${value}% prothrombin time = INR ${converted.toFixed(1)}`;
                    }
                }
                break;
        }
        
        if (resultText) {
            resultDiv.innerHTML = `<div class="unit-converter-result" style="font-weight: bold; padding: 10px; border-radius: 4px;">${resultText}</div>`;
        }
    }

    getDrugVolumeCalculator() {
        return `
            <div class="calculator-form">
                <h4>Drug Volume Calculator</h4>
                <p><small>Calculate volume to draw up for required dose</small></p>
                
                <div class="calc-input-group">
                    <label>Dose Required:</label>
                    <input type="number" id="drug-dose-required" placeholder="500" step="0.1" min="0">
                    <select id="drug-dose-unit">
                        <option value="mg">mg</option>
                        <option value="g">g</option>
                        <option value="mcg">mcg</option>
                        <option value="units">units</option>
                        <option value="mmol">mmol</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label>Stock Concentration:</label>
                    <input type="number" id="drug-stock-amount" placeholder="1000" step="0.1" min="0">
                    <select id="drug-stock-unit">
                        <option value="mg">mg</option>
                        <option value="g">g</option>
                        <option value="mcg">mcg</option>
                        <option value="units">units</option>
                        <option value="mmol">mmol</option>
                    </select>
                    <span> per </span>
                    <input type="number" id="drug-stock-volume" placeholder="10" step="0.1" min="0" style="width: 80px;">
                    <select id="drug-volume-unit">
                        <option value="ml">ml</option>
                        <option value="L">L</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label>Drug Name (optional):</label>
                    <input type="text" id="drug-name" placeholder="e.g., Amoxicillin">
                </div>
                
                <button onclick="window.quizApp.calculateDrugVolume()">Calculate Volume</button>
                <div id="drug-volume-result" class="calc-result"></div>
                
                <div class="calc-reference">
                    <small><strong>Formula:</strong> Volume = (Dose Required ÷ Stock Concentration) × Stock Volume<br>
                    <strong>Example:</strong> Need 500mg, Stock is 1000mg/10ml ? Draw up 5ml</small>
                </div>
                
                <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 15px;">
                    <h5>Quick Common Drug Calculations:</h5>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        <button class="quick-drug-btn" onclick="window.quizApp.quickDrugCalc('adrenaline1000')">Adrenaline 1:1000</button>
                        <button class="quick-drug-btn" onclick="window.quizApp.quickDrugCalc('adrenaline10000')">Adrenaline 1:10000 (ALS)</button>
                        <button class="quick-drug-btn" onclick="window.quizApp.quickDrugCalc('atropine')">Atropine</button>
                        <button class="quick-drug-btn" onclick="window.quizApp.quickDrugCalc('amiodarone')">Amiodarone</button>
                        <button class="quick-drug-btn" onclick="window.quizApp.quickDrugCalc('naloxone')">Naloxone</button>
                        <button class="quick-drug-btn" onclick="window.quizApp.quickDrugCalc('benzylpenicillin')">Benzylpenicillin</button>
                        <button class="quick-drug-btn" onclick="window.quizApp.quickDrugCalc('gentamicin')">Gentamicin</button>
                        <button class="quick-drug-btn" onclick="window.quizApp.quickDrugCalc('morphine')">Morphine</button>
                    </div>
                </div>
            </div>
        `;
    }

    calculateDrugVolume() {
        const doseRequired = parseFloat(document.getElementById('drug-dose-required').value);
        const doseUnit = document.getElementById('drug-dose-unit').value;
        const stockAmount = parseFloat(document.getElementById('drug-stock-amount').value);
        const stockUnit = document.getElementById('drug-stock-unit').value;
        const stockVolume = parseFloat(document.getElementById('drug-stock-volume').value);
        const volumeUnit = document.getElementById('drug-volume-unit').value;
        const drugName = document.getElementById('drug-name').value;
        
        if (!doseRequired || !stockAmount || !stockVolume) {
            document.getElementById('drug-volume-result').innerHTML = 
                '<div style="color: #f44336; padding: 10px; background: #ffebee; border-radius: 4px;">Please fill in all required fields</div>';
            return;
        }
        
        // Convert units to same base (mg)
        const unitConversion = {
            'g': 1000,
            'mg': 1,
            'mcg': 0.001,
            'units': 1,
            'mmol': 1
        };
        
        // Check units match
        if ((doseUnit === 'units' && stockUnit !== 'units') || 
            (doseUnit === 'mmol' && stockUnit !== 'mmol') ||
            (doseUnit !== 'units' && doseUnit !== 'mmol' && (stockUnit === 'units' || stockUnit === 'mmol'))) {
            document.getElementById('drug-volume-result').innerHTML = 
                '<div style="color: #ff9800; padding: 10px; background: #fff3e0; border-radius: 4px;">?? Warning: Dose and stock units should match (both mass units, units, or mmol)</div>';
            return;
        }
        
        // Convert to base units
        const doseInBase = doseRequired * unitConversion[doseUnit];
        const stockInBase = stockAmount * unitConversion[stockUnit];
        
        // Convert stock volume to ml if in L
        const stockVolumeInMl = volumeUnit === 'L' ? stockVolume * 1000 : stockVolume;
        
        // Calculate volume to draw up
        const volumeToDraw = (doseInBase / stockInBase) * stockVolumeInMl;
        
        // Determine if volume is practical
        let practicality = '';
        let warningClass = 'drug-warning-green';
        
        if (volumeToDraw < 0.1) {
            practicality = '?? Very small volume - difficult to draw up accurately. Consider alternative concentration.';
            warningClass = 'drug-warning-orange';
        } else if (volumeToDraw < 0.5) {
            practicality = '?? Small volume - use 1ml syringe for accuracy';
            warningClass = 'drug-warning-orange';
        } else if (volumeToDraw > 20) {
            practicality = '?? Large volume - may need to give as infusion or split into multiple injections';
            warningClass = 'drug-warning-orange';
        } else if (volumeToDraw > 50) {
            practicality = '?? Very large volume - definitely give as infusion, check calculation';
            warningClass = 'drug-warning-red';
        } else {
            practicality = '? Practical volume to draw up';
        }
        
        const drugNameDisplay = drugName ? `<div style="margin-bottom: 10px;"><strong>Drug:</strong> ${drugName}</div>` : '';
        
        document.getElementById('drug-volume-result').innerHTML = `
            <div class="drug-calc-result-container" style="border-left: 4px solid; padding: 15px; border-radius: 4px;">
                ${drugNameDisplay}
                <div style="margin-bottom: 10px;">
                    <div><strong>Dose Required:</strong> ${doseRequired} ${doseUnit}</div>
                    <div><strong>Stock Concentration:</strong> ${stockAmount} ${stockUnit} per ${stockVolume} ${volumeUnit}</div>
                </div>
                <div class="${warningClass}" style="padding: 15px; margin: 15px 0; border-radius: 8px; border: 2px solid;">
                    <div class="drug-calc-dose-display">
                        Draw up: ${volumeToDraw.toFixed(2)} ml
                    </div>
                    <div style="font-weight: 500;">${practicality}</div>
                </div>
                <div class="drug-calc-working" style="font-weight: bold; margin-bottom: 5px;">
                    <div style="font-weight: bold; margin-bottom: 5px;">Working:</div>
                    <div>Volume = (${doseRequired} ${doseUnit} ÷ ${stockAmount} ${stockUnit}) × ${stockVolume} ${volumeUnit}</div>
                    <div>Volume = (${doseInBase} ÷ ${stockInBase}) × ${stockVolumeInMl} ml = <strong>${volumeToDraw.toFixed(2)} ml</strong></div>
                </div>
            </div>
        `;
    }

    quickDrugCalc(drugType) {
        const drugs = {
            'adrenaline1000': {
                name: 'Adrenaline 1:1000 (Anaphylaxis)',
                dose: 500,
                doseUnit: 'mcg',
                stock: 1,
                stockUnit: 'mg',
                volume: 1,
                volumeUnit: 'ml',
                info: 'Adult IM dose for anaphylaxis. 1:1000 = 1mg/ml. Repeat after 5 min if needed.'
            },
            'adrenaline10000': {
                name: 'Adrenaline 1:10000 (ALS/Cardiac Arrest)',
                dose: 1,
                doseUnit: 'mg',
                stock: 0.1,
                stockUnit: 'mg',
                volume: 1,
                volumeUnit: 'ml',
                info: 'Cardiac arrest: 1mg IV (10ml of 1:10000). Repeat every 3-5 mins during CPR.'
            },
            'atropine': {
                name: 'Atropine (Bradycardia)',
                dose: 600,
                doseUnit: 'mcg',
                stock: 600,
                stockUnit: 'mcg',
                volume: 1,
                volumeUnit: 'ml',
                info: 'Adult dose for bradycardia. May repeat to max 3mg. Stock usually 600mcg/ml or 1mg/ml.'
            },
            'amiodarone': {
                name: 'Amiodarone (VT/VF)',
                dose: 300,
                doseUnit: 'mg',
                stock: 50,
                stockUnit: 'mg',
                volume: 1,
                volumeUnit: 'ml',
                info: 'Cardiac arrest VT/VF: 300mg IV after 3rd shock. Further 150mg after 5th shock. Stock 50mg/ml.'
            },
            'naloxone': {
                name: 'Naloxone (Opioid Reversal)',
                dose: 400,
                doseUnit: 'mcg',
                stock: 400,
                stockUnit: 'mcg',
                volume: 1,
                volumeUnit: 'ml',
                info: 'Opioid overdose: 400mcg IV/IM/SC, repeat every 2-3 mins if needed. Max 2mg initially.'
            },
            'benzylpenicillin': {
                name: 'Benzylpenicillin',
                dose: 1.2,
                doseUnit: 'g',
                stock: 600,
                stockUnit: 'mg',
                volume: 1,
                volumeUnit: 'ml',
                info: 'Reconstitute 600mg vial with 1.6ml WFI to give 600mg/ml. Meningitis dose.'
            },
            'gentamicin': {
                name: 'Gentamicin',
                dose: 280,
                doseUnit: 'mg',
                stock: 80,
                stockUnit: 'mg',
                volume: 2,
                volumeUnit: 'ml',
                info: 'Typical 70kg patient dose (4-7mg/kg). Stock usually 80mg/2ml. Check levels.'
            },
            'morphine': {
                name: 'Morphine',
                dose: 10,
                doseUnit: 'mg',
                stock: 10,
                stockUnit: 'mg',
                volume: 1,
                volumeUnit: 'ml',
                info: 'Standard stock concentration 10mg/ml. Titrate to effect in pain/acute dyspnoea.'
            }
        };
        
        const drug = drugs[drugType];
        
        document.getElementById('drug-dose-required').value = drug.dose;
        document.getElementById('drug-dose-unit').value = drug.doseUnit;
        document.getElementById('drug-stock-amount').value = drug.stock;
        document.getElementById('drug-stock-unit').value = drug.stockUnit;
        document.getElementById('drug-stock-volume').value = drug.volume;
        document.getElementById('drug-volume-unit').value = drug.volumeUnit;
        document.getElementById('drug-name').value = drug.name;
        
        this.calculateDrugVolume();
        
        // Add info to result
        setTimeout(() => {
            const resultDiv = document.getElementById('drug-volume-result');
            if (resultDiv.innerHTML) {
                resultDiv.innerHTML += `
                    <div class="drug-info-box">
                        <strong>?? ${drug.name}:</strong> ${drug.info}
                    </div>
                `;
            }
        }, 100);
    }

    getNEWS2Calculator() {
        return `
            <div class="calculator-form">
                <h4>NEWS2 (National Early Warning Score 2)</h4>
                <p><small>UK standard early warning score (RCP 2017)</small></p>
                
                <div class="calc-input-group">
                    <label>Respiratory Rate (breaths/min):</label>
                    <input type="number" id="news2-rr" placeholder="16" min="5" max="60">
                </div>
                <div class="calc-input-group">
                    <label>SpO2 (%): <span id="spo2-scale">Scale 1</span></label>
                    <input type="number" id="news2-spo2" placeholder="98" min="70" max="100">
                </div>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="news2-air"> Supplemental oxygen</label>
                    <label><input type="checkbox" id="news2-hypercapnic"> Hypercapnic respiratory failure (COPD) - use Scale 2</label>
                </div>
                <div class="calc-input-group">
                    <label>Systolic BP (mmHg):</label>
                    <input type="number" id="news2-sbp" placeholder="120" min="50" max="300">
                </div>
                <div class="calc-input-group">
                    <label>Heart Rate (bpm):</label>
                    <input type="number" id="news2-hr" placeholder="80" min="30" max="200">
                </div>
                <div class="calc-input-group">
                    <label>AVPU:</label>
                    <select id="news2-avpu">
                        <option value="0">Alert (0 points)</option>
                        <option value="3">Voice, Pain, or Unresponsive (3 points)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Temperature (°C):</label>
                    <input type="number" id="news2-temp" placeholder="36.5" step="0.1" min="30" max="45">
                </div>
                
                <button onclick="window.quizApp.calculateNEWS2()">Calculate NEWS2</button>
                <div id="news2-result" class="calc-result"></div>
            </div>
        `;
    }

    calculateNEWS2() {
        const rr = parseInt(document.getElementById('news2-rr').value) || 0;
        const spo2 = parseInt(document.getElementById('news2-spo2').value) || 0;
        const sbp = parseInt(document.getElementById('news2-sbp').value) || 0;
        const hr = parseInt(document.getElementById('news2-hr').value) || 0;
        const avpu = parseInt(document.getElementById('news2-avpu').value) || 0;
        const temp = parseFloat(document.getElementById('news2-temp').value) || 0;
        const oxygen = document.getElementById('news2-air').checked;
        const hypercapnic = document.getElementById('news2-hypercapnic').checked;
        
        let score = 0;
        
        // Respiratory rate
        if (rr <= 8) score += 3;
        else if (rr <= 11) score += 1;
        else if (rr <= 20) score += 0;
        else if (rr <= 24) score += 2;
        else score += 3;
        
        // SpO2 (Scale 1 or 2)
        if (hypercapnic) {
            // Scale 2 (COPD patients)
            if (spo2 <= 83) score += 3;
            else if (spo2 <= 85) score += 2;
            else if (spo2 <= 87) score += 1;
            else if (spo2 <= 92) score += 0;
            else if (spo2 <= 94) score += 1;
            else if (spo2 <= 96) score += 2;
            else score += 3;
        } else {
            // Scale 1 (standard)
            if (spo2 <= 91) score += 3;
            else if (spo2 <= 93) score += 2;
            else if (spo2 <= 95) score += 1;
            else score += 0;
        }
        
        // Supplemental oxygen
        if (oxygen) score += 2;
        
        // Systolic BP
        if (sbp <= 90) score += 3;
        else if (sbp <= 100) score += 2;
        else if (sbp <= 110) score += 1;
        else if (sbp <= 219) score += 0;
        else score += 3;
        
        // Heart rate
        if (hr <= 40) score += 3;
        else if (hr <= 50) score += 1;
        else if (hr <= 90) score += 0;
        else if (hr <= 110) score += 1;
        else if (hr <= 130) score += 2;
        else score += 3;
        
        // AVPU
        score += avpu;
        
        // Temperature
        if (temp <= 35.0) score += 3;
        else if (temp <= 36.0) score += 1;
        else if (temp <= 38.0) score += 0;
        else if (temp <= 39.0) score += 1;
        else score += 2;
        
        let risk = '';
        let action = '';
        let color = '';
        
        if (score === 0) {
            risk = 'Low risk';
            action = 'Continue routine monitoring (12 hourly)';
            color = '#4CAF50';
        } else if (score <= 4) {
            risk = 'Low-medium risk';
            action = 'Increase monitoring (4-6 hourly). Consider medical review';
            color = '#FFC107';
        } else if (score <= 6) {
            risk = 'Medium risk';
            action = 'Hourly monitoring. Urgent medical review';
            color = '#FF9800';
        } else {
            risk = 'High risk';
            action = 'Continuous monitoring. Immediate medical review. Consider critical care';
            color = '#F44336';
        }
        
        document.getElementById('news2-result').innerHTML = `
            <div style="color: ${color}">
                <strong>NEWS2 Score: ${score}</strong><br>
                <strong>${risk}</strong><br>
                <div style="margin-top: 8px; font-weight: bold;">
                    ${action}
                </div>
            </div>
        `;
    }

    getCURB65Calculator() {
        return `
            <div class="calculator-form">
                <h4>CURB-65 Score</h4>
                <p><small>Enhanced CAP severity assessment (includes urea)</small></p>
                
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="curb-confusion"> Confusion (AMT =8 or new disorientation)</label>
                    <label><input type="checkbox" id="curb-urea"> Urea >7 mmol/L</label>
                    <label><input type="checkbox" id="curb-rr"> Respiratory rate =30/min</label>
                    <label><input type="checkbox" id="curb-bp"> Systolic BP <90 or Diastolic BP =60</label>
                    <label><input type="checkbox" id="curb-age"> Age =65 years</label>
                </div>
                
                <button onclick="window.quizApp.calculateCURB65()">Calculate Score</button>
                <div id="curb65-result" class="calc-result"></div>
                
                <div class="calc-reference">
                    <small>
                        <strong>Comparison with CRB-65:</strong><br>
                        CURB-65 includes urea level, providing more accurate risk stratification than CRB-65
                    </small>
                </div>
            </div>
        `;
    }

    calculateCURB65() {
        let score = 0;
        
        if (document.getElementById('curb-confusion').checked) score += 1;
        if (document.getElementById('curb-urea').checked) score += 1;
        if (document.getElementById('curb-rr').checked) score += 1;
        if (document.getElementById('curb-bp').checked) score += 1;
        if (document.getElementById('curb-age').checked) score += 1;

        let mortality = '';
        let management = '';
        let color = '';

        if (score === 0) {
            mortality = '0.7% 30-day mortality';
            management = 'Home treatment (NICE CG191)';
            color = '#4CAF50';
        } else if (score === 1) {
            mortality = '2.1% 30-day mortality';
            management = 'Home treatment or short hospital stay';
            color = '#8BC34A';
        } else if (score === 2) {
            mortality = '9.2% 30-day mortality';
            management = 'Hospital admission recommended';
            color = '#FF9800';
        } else if (score === 3) {
            mortality = '14.5% 30-day mortality';
            management = 'Hospital admission - consider ICU assessment';
            color = '#F44336';
        } else if (score >= 4) {
            mortality = '=27% 30-day mortality';
            management = 'Urgent hospital admission - high dependency/ICU care';
            color = '#D32F2F';
        }

        document.getElementById('curb65-result').innerHTML = `
            <div style="color: ${color}">
                <strong>CURB-65 Score: ${score}/5</strong><br>
                <strong>${mortality}</strong><br>
                <strong>Management: ${management}</strong>
            </div>
        `;
    }

    getPalliativeCalculator() {
        return `
            <div class="calculator-form">
                <h4>?? Palliative Care Drug Calculator</h4>
                <p><small>Morphine equivalents, breakthrough dosing, and symptom management</small></p>
                
                <div class="calc-section">
                    <h5>?? Opioid Conversion</h5>
                    <div class="calc-input-group">
                        <label>Current Opioid:</label>
                        <select id="palliative-current-opioid">
                            <option value="morphine-oral">Morphine (oral)</option>
                            <option value="morphine-sc">Morphine (subcutaneous)</option>
                            <option value="oxycodone-oral">Oxycodone (oral)</option>
                            <option value="fentanyl-patch">Fentanyl (patch mcg/hr)</option>
                            <option value="codeine">Codeine</option>
                            <option value="tramadol">Tramadol</option>
                            <option value="buprenorphine-patch">Buprenorphine (patch mcg/hr)</option>
                        </select>
                    </div>
                    <div class="calc-input-group">
                        <label>Current Daily Dose (mg or mcg/hr for patches):</label>
                        <input type="number" id="palliative-current-dose" placeholder="60" step="0.1">
                    </div>
                    <div class="calc-input-group">
                        <label>Convert to:</label>
                        <select id="palliative-target-opioid">
                            <option value="morphine-oral">Morphine (oral)</option>
                            <option value="morphine-sc">Morphine (subcutaneous)</option>
                            <option value="oxycodone-oral">Oxycodone (oral)</option>
                            <option value="fentanyl-patch">Fentanyl (patch mcg/hr)</option>
                            <option value="diamorphine-sc">Diamorphine (subcutaneous)</option>
                        </select>
                    </div>
                    <button onclick="window.quizApp.calculateOpioidConversion()">Convert Opioid</button>
                    <div id="opioid-conversion-result" class="calc-result"></div>
                </div>

                <div class="calc-section">
                    <h5>?? Breakthrough Dosing</h5>
                    <div class="calc-input-group">
                        <label>Total Daily Morphine Equivalent (mg):</label>
                        <input type="number" id="palliative-daily-morphine" placeholder="60" step="1">
                    </div>
                    <button onclick="window.quizApp.calculateBreakthroughDose()">Calculate Breakthrough</button>
                    <div id="breakthrough-result" class="calc-result"></div>
                </div>

                <div class="calc-section">
                    <h5>?? Anti-emetic Calculator</h5>
                    <div class="calc-input-group">
                        <label>Patient Weight (kg):</label>
                        <input type="number" id="palliative-weight" placeholder="70" step="1">
                    </div>
                    <div class="calc-input-group">
                        <label>Cause of Nausea:</label>
                        <select id="palliative-nausea-cause">
                            <option value="opioid">Opioid-induced</option>
                            <option value="chemotherapy">Chemotherapy</option>
                            <option value="bowel-obstruction">Bowel obstruction</option>
                            <option value="raised-icp">Raised ICP</option>
                            <option value="metabolic">Metabolic</option>
                            <option value="vestibular">Vestibular</option>
                        </select>
                    </div>
                    <button onclick="window.quizApp.calculateAntiemetic()">Recommend Anti-emetic</button>
                    <div id="antiemetic-result" class="calc-result"></div>
                </div>

                <div class="calc-section">
                    <h5>?? Respiratory Secretions</h5>
                    <div class="calc-input-group">
                        <label>Patient Weight (kg):</label>
                        <input type="number" id="palliative-secretions-weight" placeholder="70" step="1">
                    </div>
                    <div class="calc-input-group">
                        <label>Secretion Type:</label>
                        <select id="palliative-secretion-type">
                            <option value="bronchial">Bronchial secretions</option>
                            <option value="salivary">Excessive salivation</option>
                            <option value="death-rattle">Death rattle</option>
                        </select>
                    </div>
                    <button onclick="window.quizApp.calculateSecretionManagement()">Calculate Doses</button>
                    <div id="secretion-result" class="calc-result"></div>
                </div>

                <div class="calc-reference">
                    <small>
                        <strong>?? Important Notes:</strong><br>
                        • All doses are starting suggestions - titrate to effect<br>
                        • Consider 25-50% dose reduction if frail/elderly<br>
                        • Monitor for sedation and respiratory depression<br>
                        • Seek specialist palliative care advice for complex cases<br>
                        • These calculations are guidelines only
                    </small>
                </div>
            </div>
        `;
    }

    // Wells DVT Score Calculator
    getWellsDVTCalculator() {
        return `
            <div class="calc-section">
                <h3>Wells Score for DVT</h3>
                <p>Assesses probability of deep vein thrombosis</p>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="wells-dvt-cancer" value="1">
                        Active cancer (treatment within 6 months or palliative) (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="wells-dvt-paralysis" value="1">
                        Paralysis, paresis, or recent plaster immobilisation of lower extremity (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="wells-dvt-bedridden" value="1">
                        Recently bedridden >3 days or major surgery within 12 weeks (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="wells-dvt-tenderness" value="1">
                        Localized tenderness along deep venous system (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="wells-dvt-swelling" value="1">
                        Entire leg swollen (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="wells-dvt-calf" value="1">
                        Calf swelling >3cm compared to asymptomatic leg (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="wells-dvt-pitting" value="1">
                        Pitting edema confined to symptomatic leg (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="wells-dvt-veins" value="1">
                        Collateral superficial veins (non-varicose) (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="wells-dvt-previous" value="1">
                        Previously documented DVT (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="wells-dvt-alternative" value="-2">
                        Alternative diagnosis at least as likely as DVT (-2)
                    </label>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateWellsDVT()">Calculate Wells DVT Score</button>
                <div id="wells-dvt-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Clinical Use:</strong><br>
                        • =0 points: DVT unlikely - consider D-dimer<br>
                        • 1-2 points: Moderate probability - D-dimer or imaging<br>
                        • =3 points: DVT likely - proceed to imaging<br>
                        • Two-level Wells: =1 = unlikely, =2 = likely
                    </small>
                </div>
            </div>
        `;
    }

    calculateWellsDVT() {
        const items = [
            'wells-dvt-cancer', 'wells-dvt-paralysis', 'wells-dvt-bedridden',
            'wells-dvt-tenderness', 'wells-dvt-swelling', 'wells-dvt-calf',
            'wells-dvt-pitting', 'wells-dvt-veins', 'wells-dvt-previous', 'wells-dvt-alternative'
        ];
        
        let score = 0;
        items.forEach(id => {
            const element = document.getElementById(id);
            if (element && element.checked) {
                score += parseInt(element.value);
            }
        });

        let interpretation = '';
        let riskClass = '';
        
        if (score <= 0) {
            riskClass = 'Low';
            interpretation = '<strong>DVT Unlikely</strong><br>DVT prevalence ~5%<br>• Consider D-dimer testing<br>• If D-dimer negative, DVT excluded<br>• If D-dimer positive, proceed to imaging';
        } else if (score <= 2) {
            riskClass = 'Moderate';
            interpretation = '<strong>Moderate Probability</strong><br>DVT prevalence ~17%<br>• D-dimer or proceed directly to imaging<br>• Consider clinical context';
        } else {
            riskClass = 'High';
            interpretation = '<strong>DVT Likely</strong><br>DVT prevalence ~17-53%<br>• Proceed directly to compression ultrasound<br>• Do not rely on D-dimer alone';
        }

        document.getElementById('wells-dvt-result').innerHTML = `
            <div class="calc-success">
                <h4>Wells DVT Score: ${score} points</h4>
                <p><strong>Risk: ${riskClass}</strong></p>
                <p>${interpretation}</p>
            </div>
        `;
    }

    // PERC Rule Calculator
    getPERCCalculator() {
        return `
            <div class="calc-section">
                <h3>PERC Rule (Pulmonary Embolism Rule-out Criteria)</h3>
                <p>Excludes PE without D-dimer if all criteria are negative</p>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="perc-age" value="1">
                        Age =50 years
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="perc-hr" value="1">
                        Heart rate =100 bpm
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="perc-sats" value="1">
                        O2 saturation <95% on room air
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="perc-hemoptysis" value="1">
                        Hemoptysis present
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="perc-estrogen" value="1">
                        Estrogen use (oral contraceptives, HRT)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="perc-surgery" value="1">
                        Previous DVT or PE
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="perc-trauma" value="1">
                        Trauma or surgery requiring hospitalization within 4 weeks
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="perc-swelling" value="1">
                        Unilateral leg swelling
                    </label>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculatePERC()">Apply PERC Rule</button>
                <div id="perc-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Clinical Use:</strong><br>
                        • Only apply in LOW risk patients (gestalt <15% pre-test probability)<br>
                        • If ALL 8 criteria are ABSENT: PE can be excluded without D-dimer<br>
                        • If ANY criterion is present: proceed with standard workup<br>
                        • PERC negative has <2% risk of PE at 3 months
                    </small>
                </div>
            </div>
        `;
    }

    calculatePERC() {
        const items = [
            'perc-age', 'perc-hr', 'perc-sats', 'perc-hemoptysis',
            'perc-estrogen', 'perc-surgery', 'perc-trauma', 'perc-swelling'
        ];
        
        let positiveCount = 0;
        items.forEach(id => {
            const element = document.getElementById(id);
            if (element && element.checked) {
                positiveCount++;
            }
        });

        let interpretation = '';
        
        if (positiveCount === 0) {
            interpretation = `
                <div class="calc-success">
                    <h4>PERC Rule: NEGATIVE (0/8 criteria)</h4>
                    <p><strong>? PE can be excluded</strong></p>
                    <p>No further testing for PE required (no D-dimer, no CTPA)</p>
                    <p><small>?? Only valid in LOW risk patients (pre-test probability <15%)</small></p>
                </div>
            `;
        } else {
            interpretation = `
                <div class="calc-warning">
                    <h4>PERC Rule: POSITIVE (${positiveCount}/8 criteria present)</h4>
                    <p><strong>? Cannot exclude PE with PERC</strong></p>
                    <p>Proceed with standard workup:</p>
                    <ul style="text-align: left; margin: 10px 0;">
                        <li>Calculate Wells PE score</li>
                        <li>Order D-dimer if PE unlikely</li>
                        <li>Consider CTPA if PE likely or D-dimer positive</li>
                    </ul>
                </div>
            `;
        }

        document.getElementById('perc-result').innerHTML = interpretation;
    }

    // RCRI Calculator
    getRCRICalculator() {
        return `
            <div class="calc-section">
                <h3>Revised Cardiac Risk Index (RCRI)</h3>
                <p>Estimates risk of perioperative cardiac complications</p>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="rcri-ihd" value="1">
                        History of ischemic heart disease (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="rcri-hf" value="1">
                        History of congestive heart failure (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="rcri-stroke" value="1">
                        History of cerebrovascular disease (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="rcri-diabetes" value="1">
                        Diabetes mellitus requiring insulin (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="rcri-renal" value="1">
                        Renal impairment (creatinine >177 µmol/L / 2 mg/dL) (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="rcri-surgery" value="1">
                        High-risk surgery (intraperitoneal, intrathoracic, or suprainguinal vascular) (+1)
                    </label>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateRCRI()">Calculate RCRI</button>
                <div id="rcri-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Risk Estimates (cardiac death, MI, cardiac arrest):</strong><br>
                        • Class I (0 points): 0.4% risk<br>
                        • Class II (1 point): 0.9% risk<br>
                        • Class III (2 points): 6.6% risk<br>
                        • Class IV (=3 points): >11% risk
                    </small>
                </div>
            </div>
        `;
    }

    calculateRCRI() {
        const items = ['rcri-ihd', 'rcri-hf', 'rcri-stroke', 'rcri-diabetes', 'rcri-renal', 'rcri-surgery'];
        
        let score = 0;
        items.forEach(id => {
            const element = document.getElementById(id);
            if (element && element.checked) {
                score++;
            }
        });

        let riskClass = '';
        let risk = '';
        let management = '';
        
        if (score === 0) {
            riskClass = 'I';
            risk = '0.4%';
            management = 'Very low risk - routine perioperative care';
        } else if (score === 1) {
            riskClass = 'II';
            risk = '0.9%';
            management = 'Low risk - routine perioperative care, consider beta-blockers if already on them';
        } else if (score === 2) {
            riskClass = 'III';
            risk = '6.6%';
            management = 'Moderate risk - consider cardiology consultation, optimize medical therapy';
        } else {
            riskClass = 'IV';
            risk = '>11%';
            management = 'High risk - strongly consider cardiology consultation, may need further cardiac workup, optimize medical therapy';
        }

        document.getElementById('rcri-result').innerHTML = `
            <div class="calc-success">
                <h4>RCRI Score: ${score} points (Class ${riskClass})</h4>
                <p><strong>Cardiac Event Risk: ${risk}</strong></p>
                <p>${management}</p>
                <p><small>Risk includes: MI, cardiac arrest, or cardiac death within 30 days of surgery</small></p>
            </div>
        `;
    }

    // QTc Calculator
    getQTcCalculator() {
        return `
            <div class="calc-section">
                <h3>QTc Calculator (Corrected QT Interval)</h3>
                <p>Corrects QT interval for heart rate</p>
                
                <div class="calc-input-group">
                    <label for="qtc-qt">QT interval (ms):</label>
                    <input type="number" id="qtc-qt" min="200" max="700" step="1" placeholder="e.g., 400">
                </div>
                
                <div class="calc-input-group">
                    <label for="qtc-hr">Heart rate (bpm):</label>
                    <input type="number" id="qtc-hr" min="30" max="200" step="1" placeholder="e.g., 75">
                </div>
                
                <div class="calc-input-group">
                    <label for="qtc-formula">Formula:</label>
                    <select id="qtc-formula">
                        <option value="bazett">Bazett (most common)</option>
                        <option value="fridericia">Fridericia (more accurate at high/low HR)</option>
                    </select>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateQTc()">Calculate QTc</button>
                <div id="qtc-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Normal Ranges:</strong><br>
                        • Men: QTc <450 ms<br>
                        • Women: QTc <460 ms<br>
                        • Prolonged if >470 ms (men) or >480 ms (women)<br>
                        • Severely prolonged if >500 ms (high risk of Torsades de Pointes)
                    </small>
                </div>
            </div>
        `;
    }

    calculateQTc() {
        const qt = parseFloat(document.getElementById('qtc-qt').value) || 0;
        const hr = parseFloat(document.getElementById('qtc-hr').value) || 0;
        const formula = document.getElementById('qtc-formula').value;

        if (qt === 0 || hr === 0) {
            document.getElementById('qtc-result').innerHTML = 
                '<div class="calc-error"><strong>Please enter both QT interval and heart rate</strong></div>';
            return;
        }

        // Calculate RR interval in seconds
        const rr = 60 / hr;
        
        // Calculate QTc based on formula
        let qtc = 0;
        let formulaName = '';
        
        if (formula === 'bazett') {
            qtc = qt / Math.sqrt(rr);
            formulaName = 'Bazett';
        } else {
            qtc = qt / Math.pow(rr, 1/3);
            formulaName = 'Fridericia';
        }

        // Determine if prolonged
        let interpretation = '';
        let cssClass = 'calc-success';
        
        if (qtc > 500) {
            interpretation = '<strong>?? SEVERELY PROLONGED</strong><br>High risk of Torsades de Pointes<br>Review medications, check electrolytes (K?, Mg²?, Ca²?)';
            cssClass = 'calc-error';
        } else if (qtc > 470) {
            interpretation = '<strong>?? PROLONGED</strong><br>Increased arrhythmia risk<br>Review medications and electrolytes';
            cssClass = 'calc-warning';
        } else if (qtc > 450) {
            interpretation = '<strong>Borderline prolonged</strong><br>Monitor if on QT-prolonging drugs';
            cssClass = 'calc-warning';
        } else {
            interpretation = '<strong>Normal QTc</strong>';
            cssClass = 'calc-success';
        }

        document.getElementById('qtc-result').innerHTML = `
            <div class="${cssClass}">
                <h4>QTc: ${qtc.toFixed(0)} ms</h4>
                <p><small>(${formulaName} formula)</small></p>
                <p>${interpretation}</p>
            </div>
        `;
    }

    // Corrected Sodium Calculator
    getCorrectedSodiumCalculator() {
        return `
            <div class="calc-section">
                <h3>Corrected Sodium for Hyperglycemia</h3>
                <p>Adjusts sodium level for elevated glucose</p>
                
                <div class="calc-input-group">
                    <label for="corr-na-measured">Measured sodium (mmol/L):</label>
                    <input type="number" id="corr-na-measured" min="100" max="180" step="0.1" placeholder="e.g., 130">
                </div>
                
                <div class="calc-input-group">
                    <label for="corr-na-glucose">Glucose (mmol/L):</label>
                    <input type="number" id="corr-na-glucose" min="3" max="100" step="0.1" placeholder="e.g., 20">
                    <small>Normal: 4-6 mmol/L</small>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateCorrectedSodium()">Calculate Corrected Sodium</button>
                <div id="corr-na-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Formula:</strong><br>
                        Corrected Na? = Measured Na? + 0.3 × (Glucose - 5)<br>
                        <br>
                        <strong>Interpretation:</strong><br>
                        • For every 1 mmol/L rise in glucose above 5, sodium falls by ~0.3 mmol/L<br>
                        • Helps identify true hyponatremia vs pseudohyponatremia in hyperglycemia<br>
                        • Normal Na?: 135-145 mmol/L
                    </small>
                </div>
            </div>
        `;
    }

    calculateCorrectedSodium() {
        const measuredNa = parseFloat(document.getElementById('corr-na-measured').value) || 0;
        const glucose = parseFloat(document.getElementById('corr-na-glucose').value) || 0;

        if (measuredNa === 0 || glucose === 0) {
            document.getElementById('corr-na-result').innerHTML = 
                '<div class="calc-error"><strong>Please enter both sodium and glucose values</strong></div>';
            return;
        }

        // Corrected sodium formula: add 0.3 mmol/L for every 1 mmol/L glucose above 5
        const correctedNa = measuredNa + (0.3 * (glucose - 5));

        let interpretation = '';
        let cssClass = 'calc-success';
        
        if (correctedNa < 125) {
            interpretation = '<strong>?? Severe hyponatremia</strong><br>Risk of seizures/coma - urgent treatment needed';
            cssClass = 'calc-error';
        } else if (correctedNa < 135) {
            interpretation = '<strong>Hyponatremia</strong><br>Investigate cause and treat appropriately';
            cssClass = 'calc-warning';
        } else if (correctedNa <= 145) {
            interpretation = '<strong>Normal corrected sodium</strong><br>Apparent hyponatremia due to hyperglycemia';
            cssClass = 'calc-success';
        } else if (correctedNa <= 150) {
            interpretation = '<strong>Mild hypernatremia</strong><br>Assess hydration status';
            cssClass = 'calc-warning';
        } else {
            interpretation = '<strong>?? Severe hypernatremia</strong><br>Risk of cerebral damage - treat urgently';
            cssClass = 'calc-error';
        }

        document.getElementById('corr-na-result').innerHTML = `
            <div class="${cssClass}">
                <h4>Corrected Sodium: ${correctedNa.toFixed(1)} mmol/L</h4>
                <p><small>Measured: ${measuredNa} mmol/L | Glucose: ${glucose} mmol/L</small></p>
                <p>${interpretation}</p>
            </div>
        `;
    }

    // Osmolal Gap Calculator
    getOsmolalGapCalculator() {
        return `
            <div class="calc-section">
                <h3>Osmolal Gap Calculator</h3>
                <p>Detects unmeasured osmoles (toxins, alcohols)</p>
                
                <div class="calc-input-group">
                    <label for="osmolal-measured">Measured osmolality (mOsm/kg):</label>
                    <input type="number" id="osmolal-measured" min="200" max="500" step="1" placeholder="e.g., 320">
                    <small>Requires lab measurement</small>
                </div>
                
                <div class="calc-input-group">
                    <label for="osmolal-sodium">Sodium (mmol/L):</label>
                    <input type="number" id="osmolal-sodium" min="100" max="180" step="1" placeholder="e.g., 140">
                </div>
                
                <div class="calc-input-group">
                    <label for="osmolal-glucose">Glucose (mmol/L):</label>
                    <input type="number" id="osmolal-glucose" min="3" max="100" step="0.1" placeholder="e.g., 5">
                </div>
                
                <div class="calc-input-group">
                    <label for="osmolal-urea">Urea (mmol/L):</label>
                    <input type="number" id="osmolal-urea" min="1" max="50" step="0.1" placeholder="e.g., 5">
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateOsmolalGap()">Calculate Osmolal Gap</button>
                <div id="osmolal-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Formula:</strong><br>
                        Calculated osmolality = 2(Na?) + Glucose + Urea<br>
                        Osmolal gap = Measured - Calculated<br>
                        <br>
                        <strong>Normal: <10 mOsm/kg</strong><br>
                        Elevated gap suggests: methanol, ethylene glycol, ethanol, isopropanol, propylene glycol
                    </small>
                </div>
            </div>
        `;
    }

    calculateOsmolalGap() {
        const measured = parseFloat(document.getElementById('osmolal-measured').value) || 0;
        const sodium = parseFloat(document.getElementById('osmolal-sodium').value) || 0;
        const glucose = parseFloat(document.getElementById('osmolal-glucose').value) || 0;
        const urea = parseFloat(document.getElementById('osmolal-urea').value) || 0;

        if (measured === 0 || sodium === 0 || glucose === 0 || urea === 0) {
            document.getElementById('osmolal-result').innerHTML = 
                '<div class="calc-error"><strong>Please enter all values</strong></div>';
            return;
        }

        // Calculate osmolality
        const calculated = (2 * sodium) + glucose + urea;
        const gap = measured - calculated;

        let interpretation = '';
        let cssClass = 'calc-success';
        
        if (gap < 10) {
            interpretation = '<strong>Normal osmolal gap</strong><br>No evidence of unmeasured osmoles';
            cssClass = 'calc-success';
        } else if (gap < 20) {
            interpretation = '<strong>Mildly elevated gap</strong><br>Consider toxic alcohols, but may be normal variant';
            cssClass = 'calc-warning';
        } else {
            interpretation = '<strong>?? Significantly elevated gap</strong><br>Strongly suggests toxic alcohol ingestion:<br>• Methanol<br>• Ethylene glycol<br>• Isopropanol<br>• Ethanol (if intoxicated)<br>• Propylene glycol<br><br>Check blood gases, lactate, and consider toxicology';
            cssClass = 'calc-error';
        }

        document.getElementById('osmolal-result').innerHTML = `
            <div class="${cssClass}">
                <h4>Osmolal Gap: ${gap.toFixed(1)} mOsm/kg</h4>
                <p><small>Calculated: ${calculated.toFixed(1)} | Measured: ${measured}</small></p>
                <p>${interpretation}</p>
            </div>
        `;
    }

    // Centor Score Calculator
    getCentorCalculator() {
        return `
            <div class="calc-section">
                <h3>Centor Score (Modified/McIsaac)</h3>
                <p>Estimates probability of streptococcal pharyngitis</p>
                
                <div class="calc-input-group">
                    <label for="centor-age">Age:</label>
                    <select id="centor-age">
                        <option value="1">3-14 years (+1)</option>
                        <option value="0" selected>15-44 years (0)</option>
                        <option value="-1">=45 years (-1)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="centor-exudate" value="1">
                        Tonsillar exudate present (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="centor-lymph" value="1">
                        Tender anterior cervical lymphadenopathy (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="centor-fever" value="1">
                        Temperature >38°C (+1)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="centor-cough" value="1">
                        Absence of cough (+1)
                    </label>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateCentor()">Calculate Centor Score</button>
                <div id="centor-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Management:</strong><br>
                        • =0: No testing/antibiotics (1-2.5% strep)<br>
                        • 1: No testing/antibiotics (5-10% strep)<br>
                        • 2-3: Throat swab/rapid test (11-28% strep)<br>
                        • =4: Consider empirical antibiotics (51-53% strep)
                    </small>
                </div>
            </div>
        `;
    }

    calculateCentor() {
        const age = parseInt(document.getElementById('centor-age').value);
        const exudate = document.getElementById('centor-exudate').checked ? 1 : 0;
        const lymph = document.getElementById('centor-lymph').checked ? 1 : 0;
        const fever = document.getElementById('centor-fever').checked ? 1 : 0;
        const cough = document.getElementById('centor-cough').checked ? 1 : 0;

        const score = age + exudate + lymph + fever + cough;

        let probability = '';
        let management = '';
        let cssClass = 'calc-success';
        
        if (score <= 0) {
            probability = '1-2.5%';
            management = '<strong>No further testing or antibiotics</strong><br>Supportive care only';
        } else if (score === 1) {
            probability = '5-10%';
            management = '<strong>No further testing or antibiotics</strong><br>Supportive care, safety-net advice';
        } else if (score === 2 || score === 3) {
            probability = '11-28%';
            management = '<strong>Throat swab or rapid antigen test</strong><br>Antibiotics if positive<br>Consider delayed prescription';
            cssClass = 'calc-warning';
        } else {
            probability = '51-53%';
            management = '<strong>Consider empirical antibiotics</strong><br>High probability of strep throat<br>Phenoxymethylpenicillin 500mg QDS 10 days';
            cssClass = 'calc-warning';
        }

        document.getElementById('centor-result').innerHTML = `
            <div class="${cssClass}">
                <h4>Centor Score: ${score} points</h4>
                <p><strong>Strep Probability: ${probability}</strong></p>
                <p>${management}</p>
            </div>
        `;
    }

    // Alvarado Score Calculator
    getAlvaradoCalculator() {
        return `
            <div class="calc-section">
                <h3>Alvarado Score</h3>
                <p>Risk stratification for acute appendicitis</p>
                
                <h4>Symptoms (1 point each):</h4>
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="alvarado-migration" value="1">
                        Migration of pain to RLQ
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="alvarado-anorexia" value="1">
                        Anorexia
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="alvarado-nausea" value="1">
                        Nausea/vomiting
                    </label>
                </div>
                
                <h4>Signs:</h4>
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="alvarado-tenderness" value="2">
                        Tenderness in RLQ (2 points)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="alvarado-rebound" value="1">
                        Rebound tenderness (1 point)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="alvarado-fever" value="1">
                        Elevated temperature >37.3°C (1 point)
                    </label>
                </div>
                
                <h4>Laboratory:</h4>
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="alvarado-wbc" value="2">
                        Leukocytosis >10,000 (2 points)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="alvarado-shift" value="1">
                        Neutrophil left shift (1 point)
                    </label>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateAlvarado()">Calculate Alvarado Score</button>
                <div id="alvarado-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Interpretation:</strong><br>
                        • 1-4: Low risk (appendicitis unlikely)<br>
                        • 5-6: Intermediate risk (observe, consider imaging)<br>
                        • 7-8: High risk (likely appendicitis - surgical consult)<br>
                        • 9-10: Very high risk (probable appendicitis)
                    </small>
                </div>
            </div>
        `;
    }

    calculateAlvarado() {
        const items = [
            { id: 'alvarado-migration', value: 1 },
            { id: 'alvarado-anorexia', value: 1 },
            { id: 'alvarado-nausea', value: 1 },
            { id: 'alvarado-tenderness', value: 2 },
            { id: 'alvarado-rebound', value: 1 },
            { id: 'alvarado-fever', value: 1 },
            { id: 'alvarado-wbc', value: 2 },
            { id: 'alvarado-shift', value: 1 }
        ];
        
        let score = 0;
        items.forEach(item => {
            const element = document.getElementById(item.id);
            if (element && element.checked) {
                score += item.value;
            }
        });

        let risk = '';
        let management = '';
        let cssClass = 'calc-success';
        
        if (score <= 4) {
            risk = 'Low';
            management = '<strong>Appendicitis unlikely</strong><br>Consider alternative diagnoses<br>Discharge with safety-net advice or observe';
            cssClass = 'calc-success';
        } else if (score <= 6) {
            risk = 'Intermediate';
            management = '<strong>Possible appendicitis</strong><br>Consider imaging (ultrasound or CT)<br>Observe and reassess';
            cssClass = 'calc-warning';
        } else if (score <= 8) {
            risk = 'High';
            management = '<strong>Likely appendicitis</strong><br>Surgical consultation<br>Consider imaging to confirm';
            cssClass = 'calc-error';
        } else {
            risk = 'Very High';
            management = '<strong>?? Probable appendicitis</strong><br>Urgent surgical consultation<br>Imaging may not be necessary';
            cssClass = 'calc-error';
        }

        document.getElementById('alvarado-result').innerHTML = `
            <div class="${cssClass}">
                <h4>Alvarado Score: ${score}/10 points</h4>
                <p><strong>Risk: ${risk}</strong></p>
                <p>${management}</p>
            </div>
        `;
    }

    // Glasgow-Blatchford Score Calculator
    getGlasgowBlatchfordCalculator() {
        return `
            <div class="calc-section">
                <h3>Glasgow-Blatchford Score (GBS)</h3>
                <p>Predicts need for intervention in upper GI bleeding</p>
                
                <div class="calc-input-group">
                    <label for="gbs-urea">Urea (mmol/L):</label>
                    <select id="gbs-urea">
                        <option value="0"><6.5 (0 points)</option>
                        <option value="2">6.5-7.9 (2 points)</option>
                        <option value="3">8.0-9.9 (3 points)</option>
                        <option value="4">10.0-24.9 (4 points)</option>
                        <option value="6">=25 (6 points)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label for="gbs-hb-male">Hemoglobin (g/L) - Males:</label>
                    <select id="gbs-hb-male">
                        <option value="0">=130 (0 points)</option>
                        <option value="1">120-129 (1 point)</option>
                        <option value="3">100-119 (3 points)</option>
                        <option value="6"><100 (6 points)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label for="gbs-hb-female">Hemoglobin (g/L) - Females:</label>
                    <select id="gbs-hb-female">
                        <option value="0">=120 (0 points)</option>
                        <option value="1">100-119 (1 point)</option>
                        <option value="6"><100 (6 points)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label for="gbs-sbp">Systolic BP (mmHg):</label>
                    <select id="gbs-sbp">
                        <option value="0">=110 (0 points)</option>
                        <option value="1">100-109 (1 point)</option>
                        <option value="2">90-99 (2 points)</option>
                        <option value="3"><90 (3 points)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="gbs-pulse" value="1">
                        Pulse =100 bpm (1 point)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="gbs-melena" value="1">
                        Melena present (1 point)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="gbs-syncope" value="2">
                        Syncope (2 points)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="gbs-liver" value="2">
                        Hepatic disease (2 points)
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="gbs-cardiac" value="2">
                        Cardiac failure (2 points)
                    </label>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateGlasgowBlatchford()">Calculate GBS</button>
                <div id="gbs-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Interpretation:</strong><br>
                        • Score 0: Very low risk - safe for outpatient management<br>
                        • Score 1-5: Low-moderate risk - consider admission<br>
                        • Score =6: High risk - admit for intervention
                    </small>
                </div>
            </div>
        `;
    }

    calculateGlasgowBlatchford() {
        const urea = parseInt(document.getElementById('gbs-urea').value);
        const hbMale = parseInt(document.getElementById('gbs-hb-male').value);
        const hbFemale = parseInt(document.getElementById('gbs-hb-female').value);
        const sbp = parseInt(document.getElementById('gbs-sbp').value);
        const pulse = document.getElementById('gbs-pulse').checked ? 1 : 0;
        const melena = document.getElementById('gbs-melena').checked ? 1 : 0;
        const syncope = document.getElementById('gbs-syncope').checked ? 2 : 0;
        const liver = document.getElementById('gbs-liver').checked ? 2 : 0;
        const cardiac = document.getElementById('gbs-cardiac').checked ? 2 : 0;

        // Use whichever Hb score is higher (assumes user enters one gender)
        const hb = Math.max(hbMale, hbFemale);
        
        const score = urea + hb + sbp + pulse + melena + syncope + liver + cardiac;

        let risk = '';
        let management = '';
        let cssClass = 'calc-success';
        
        if (score === 0) {
            risk = 'Very Low';
            management = '<strong>? Safe for outpatient management</strong><br>No intervention likely needed<br>Outpatient follow-up appropriate';
            cssClass = 'calc-success';
        } else if (score <= 5) {
            risk = 'Low-Moderate';
            management = '<strong>Consider admission</strong><br>Monitor closely<br>May not require endoscopic intervention';
            cssClass = 'calc-warning';
        } else {
            risk = 'High';
            management = '<strong>?? Admit for intervention</strong><br>High risk of needing transfusion or endoscopic therapy<br>Urgent gastroenterology referral';
            cssClass = 'calc-error';
        }

        document.getElementById('gbs-result').innerHTML = `
            <div class="${cssClass}">
                <h4>Glasgow-Blatchford Score: ${score} points</h4>
                <p><strong>Risk: ${risk}</strong></p>
                <p>${management}</p>
            </div>
        `;
    }

    // APGAR Score Calculator
    getAPGARCalculator() {
        return `
            <div class="calc-section">
                <h3>APGAR Score</h3>
                <p>Neonatal assessment at 1 and 5 minutes after birth</p>
                
                <div class="calc-input-group">
                    <label for="apgar-appearance">Appearance (color):</label>
                    <select id="apgar-appearance">
                        <option value="0">Blue/pale all over (0)</option>
                        <option value="1">Blue extremities, pink body (1)</option>
                        <option value="2">Pink all over (2)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label for="apgar-pulse">Pulse (heart rate):</label>
                    <select id="apgar-pulse">
                        <option value="0">Absent (0)</option>
                        <option value="1"><100 bpm (1)</option>
                        <option value="2">=100 bpm (2)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label for="apgar-grimace">Grimace (reflex irritability):</label>
                    <select id="apgar-grimace">
                        <option value="0">No response (0)</option>
                        <option value="1">Grimace/weak cry (1)</option>
                        <option value="2">Cry/active withdrawal (2)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label for="apgar-activity">Activity (muscle tone):</label>
                    <select id="apgar-activity">
                        <option value="0">Limp (0)</option>
                        <option value="1">Some flexion (1)</option>
                        <option value="2">Active movement (2)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label for="apgar-respiration">Respiration:</label>
                    <select id="apgar-respiration">
                        <option value="0">Absent (0)</option>
                        <option value="1">Weak/irregular (1)</option>
                        <option value="2">Strong cry (2)</option>
                    </select>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateAPGAR()">Calculate APGAR</button>
                <div id="apgar-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Interpretation:</strong><br>
                        • 7-10: Normal (reassuring)<br>
                        • 4-6: Moderate depression (stimulation, O2 may be needed)<br>
                        • 0-3: Severe depression (immediate resuscitation)<br>
                        <br>
                        Assess at 1 minute and 5 minutes; continue every 5 minutes if score <7
                    </small>
                </div>
            </div>
        `;
    }

    calculateAPGAR() {
        const appearance = parseInt(document.getElementById('apgar-appearance').value);
        const pulse = parseInt(document.getElementById('apgar-pulse').value);
        const grimace = parseInt(document.getElementById('apgar-grimace').value);
        const activity = parseInt(document.getElementById('apgar-activity').value);
        const respiration = parseInt(document.getElementById('apgar-respiration').value);

        const score = appearance + pulse + grimace + activity + respiration;

        let interpretation = '';
        let cssClass = 'calc-success';
        
        if (score >= 7) {
            interpretation = '<strong>Normal</strong><br>Reassuring - routine postnatal care';
            cssClass = 'calc-success';
        } else if (score >= 4) {
            interpretation = '<strong>?? Moderate depression</strong><br>Stimulation and O2 may be needed<br>Monitor closely';
            cssClass = 'calc-warning';
        } else {
            interpretation = '<strong>?? SEVERE DEPRESSION</strong><br>Immediate resuscitation required<br>Call for senior support';
            cssClass = 'calc-error';
        }

        document.getElementById('apgar-result').innerHTML = `
            <div class="${cssClass}">
                <h4>APGAR Score: ${score}/10</h4>
                <p>${interpretation}</p>
                <p><small>Remember: Assess at 1 and 5 minutes (continue q5min if <7)</small></p>
            </div>
        `;
    }

    // Bishop Score Calculator
    getBishopCalculator() {
        return `
            <div class="calc-section">
                <h3>Bishop Score</h3>
                <p>Assesses cervical readiness for induction of labor</p>
                
                <div class="calc-input-group">
                    <label for="bishop-dilation">Cervical dilation (cm):</label>
                    <select id="bishop-dilation">
                        <option value="0">Closed (0)</option>
                        <option value="1">1-2 cm (1)</option>
                        <option value="2">3-4 cm (2)</option>
                        <option value="3">=5 cm (3)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label for="bishop-effacement">Cervical effacement (%):</label>
                    <select id="bishop-effacement">
                        <option value="0">0-30% (0)</option>
                        <option value="1">40-50% (1)</option>
                        <option value="2">60-70% (2)</option>
                        <option value="3">=80% (3)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label for="bishop-station">Fetal station:</label>
                    <select id="bishop-station">
                        <option value="0">-3 (0)</option>
                        <option value="1">-2 (1)</option>
                        <option value="2">-1, 0 (2)</option>
                        <option value="3">+1, +2 (3)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label for="bishop-consistency">Cervical consistency:</label>
                    <select id="bishop-consistency">
                        <option value="0">Firm (0)</option>
                        <option value="1">Medium (1)</option>
                        <option value="2">Soft (2)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label for="bishop-position">Cervical position:</label>
                    <select id="bishop-position">
                        <option value="0">Posterior (0)</option>
                        <option value="1">Mid (1)</option>
                        <option value="2">Anterior (2)</option>
                    </select>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateBishop()">Calculate Bishop Score</button>
                <div id="bishop-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Interpretation:</strong><br>
                        • =5: Unfavorable cervix - consider cervical ripening (prostaglandins)<br>
                        • 6-7: Intermediate - may proceed with induction<br>
                        • =8: Favorable cervix - high chance of successful induction
                    </small>
                </div>
            </div>
        `;
    }

    calculateBishop() {
        const dilation = parseInt(document.getElementById('bishop-dilation').value);
        const effacement = parseInt(document.getElementById('bishop-effacement').value);
        const station = parseInt(document.getElementById('bishop-station').value);
        const consistency = parseInt(document.getElementById('bishop-consistency').value);
        const position = parseInt(document.getElementById('bishop-position').value);

        const score = dilation + effacement + station + consistency + position;

        let interpretation = '';
        let cssClass = 'calc-success';
        
        if (score <= 5) {
            interpretation = '<strong>Unfavorable cervix</strong><br>Low likelihood of successful induction<br>Consider cervical ripening (e.g., vaginal prostaglandins)';
            cssClass = 'calc-warning';
        } else if (score <= 7) {
            interpretation = '<strong>Intermediate</strong><br>May proceed with induction<br>Success rate moderate';
            cssClass = 'calc-warning';
        } else {
            interpretation = '<strong>Favorable cervix</strong><br>High chance of successful vaginal delivery<br>Proceed with induction';
            cssClass = 'calc-success';
        }

        document.getElementById('bishop-result').innerHTML = `
            <div class="${cssClass}">
                <h4>Bishop Score: ${score}/13 points</h4>
                <p>${interpretation}</p>
            </div>
        `;
    }

    // MAP Calculator
    getMAPCalculator() {
        return `
            <div class="calc-section">
                <h3>Mean Arterial Pressure (MAP)</h3>
                <p>Average arterial pressure during one cardiac cycle</p>
                
                <div class="calc-input-group">
                    <label for="map-sbp">Systolic BP (mmHg):</label>
                    <input type="number" id="map-sbp" min="50" max="250" step="1" placeholder="e.g., 120">
                </div>
                
                <div class="calc-input-group">
                    <label for="map-dbp">Diastolic BP (mmHg):</label>
                    <input type="number" id="map-dbp" min="30" max="150" step="1" placeholder="e.g., 80">
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateMAP()">Calculate MAP</button>
                <div id="map-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Formula:</strong> MAP = DBP + ?(SBP - DBP)<br>
                        <br>
                        <strong>Normal range:</strong> 70-100 mmHg<br>
                        • MAP <60: Risk of end-organ hypoperfusion<br>
                        • MAP 65-70: Minimum target in sepsis/critical illness<br>
                        • MAP >100: Considered hypertensive
                    </small>
                </div>
            </div>
        `;
    }

    calculateMAP() {
        const sbp = parseFloat(document.getElementById('map-sbp').value) || 0;
        const dbp = parseFloat(document.getElementById('map-dbp').value) || 0;

        if (sbp === 0 || dbp === 0) {
            document.getElementById('map-result').innerHTML = 
                '<div class="calc-error"><strong>Please enter both systolic and diastolic BP</strong></div>';
            return;
        }

        const map = dbp + (sbp - dbp) / 3;

        let interpretation = '';
        let cssClass = 'calc-success';
        
        if (map < 60) {
            interpretation = '<strong>?? Critical hypotension</strong><br>Risk of end-organ hypoperfusion<br>Urgent intervention required';
            cssClass = 'calc-error';
        } else if (map < 65) {
            interpretation = '<strong>?? Hypotension</strong><br>Below target for sepsis/critical illness<br>Consider fluid resuscitation/vasopressors';
            cssClass = 'calc-warning';
        } else if (map <= 100) {
            interpretation = '<strong>Normal MAP</strong><br>Adequate tissue perfusion';
            cssClass = 'calc-success';
        } else {
            interpretation = '<strong>?? Elevated MAP</strong><br>Hypertensive - assess BP control';
            cssClass = 'calc-warning';
        }

        document.getElementById('map-result').innerHTML = `
            <div class="${cssClass}">
                <h4>MAP: ${map.toFixed(0)} mmHg</h4>
                <p><small>BP: ${sbp}/${dbp} mmHg</small></p>
                <p>${interpretation}</p>
            </div>
        `;
    }

    // A-a Gradient Calculator
    getAAGradientCalculator() {
        return `
            <div class="calc-section">
                <h3>Alveolar-arterial (A-a) Oxygen Gradient</h3>
                <p>Evaluates cause of hypoxemia</p>
                
                <div class="calc-input-group">
                    <label for="aa-fio2">FiO2 (%):</label>
                    <input type="number" id="aa-fio2" min="21" max="100" step="1" value="21" placeholder="21 for room air">
                    <small>Room air = 21%</small>
                </div>
                
                <div class="calc-input-group">
                    <label for="aa-pao2">PaO2 (kPa):</label>
                    <input type="number" id="aa-pao2" min="3" max="50" step="0.1" placeholder="e.g., 10.5">
                    <small>From arterial blood gas</small>
                </div>
                
                <div class="calc-input-group">
                    <label for="aa-paco2">PaCO2 (kPa):</label>
                    <input type="number" id="aa-paco2" min="2" max="15" step="0.1" placeholder="e.g., 5.3">
                    <small>From arterial blood gas</small>
                </div>
                
                <div class="calc-input-group">
                    <label for="aa-age">Age (years):</label>
                    <input type="number" id="aa-age" min="18" max="120" step="1" placeholder="e.g., 65">
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateAAGradient()">Calculate A-a Gradient</button>
                <div id="aa-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Formula:</strong><br>
                        PAO2 = (FiO2 × [Patm - PH2O]) - (PaCO2 / 0.8)<br>
                        A-a gradient = PAO2 - PaO2<br>
                        <br>
                        <strong>Expected A-a gradient:</strong> (Age/4) + 4 kPa<br>
                        Elevated gradient suggests V/Q mismatch, shunt, or diffusion defect
                    </small>
                </div>
            </div>
        `;
    }

    calculateAAGradient() {
        const fio2 = parseFloat(document.getElementById('aa-fio2').value) || 0;
        const pao2 = parseFloat(document.getElementById('aa-pao2').value) || 0;
        const paco2 = parseFloat(document.getElementById('aa-paco2').value) || 0;
        const age = parseFloat(document.getElementById('aa-age').value) || 0;

        if (fio2 === 0 || pao2 === 0 || paco2 === 0 || age === 0) {
            document.getElementById('aa-result').innerHTML = 
                '<div class="calc-error"><strong>Please enter all values</strong></div>';
            return;
        }

        // Convert FiO2 to decimal
        const fio2Decimal = fio2 / 100;
        
        // Atmospheric pressure at sea level in kPa
        const patm = 101.3;
        // Water vapor pressure in kPa
        const ph2o = 6.3;
        // Respiratory quotient
        const rq = 0.8;
        
        // Calculate alveolar oxygen (PAO2)
        const pao2Alveolar = (fio2Decimal * (patm - ph2o)) - (paco2 / rq);
        
        // Calculate A-a gradient
        const aaGradient = pao2Alveolar - pao2;
        
        // Expected A-a gradient based on age (in kPa)
        const expectedGradient = (age / 4) + 4;

        let interpretation = '';
        let cssClass = 'calc-success';
        
        if (aaGradient <= expectedGradient) {
            interpretation = '<strong>Normal A-a gradient</strong><br>Hypoxemia likely due to:<br>• Hypoventilation<br>• Low inspired O2<br>• High altitude';
            cssClass = 'calc-success';
        } else {
            interpretation = `<strong>?? Elevated A-a gradient</strong><br>Expected for age: ${expectedGradient.toFixed(1)} kPa<br><br>Causes:<br>• V/Q mismatch (PE, pneumonia, COPD)<br>• Shunt (pneumonia, pulmonary edema)<br>• Diffusion defect (ILD, pulmonary fibrosis)`;
            cssClass = 'calc-warning';
        }

        document.getElementById('aa-result').innerHTML = `
            <div class="${cssClass}">
                <h4>A-a Gradient: ${aaGradient.toFixed(1)} kPa</h4>
                <p><small>PAO2: ${pao2Alveolar.toFixed(1)} kPa | PaO2: ${pao2} kPa</small></p>
                <p>${interpretation}</p>
            </div>
        `;
    }

    // Corrected Calcium Calculator
    getCorrectedCalciumCalculator() {
        return `
            <div class="calc-section">
                <h3>Corrected Calcium</h3>
                <p>Adjusts calcium for albumin level</p>
                
                <div class="calc-input-group">
                    <label for="ca-measured">Measured calcium (mmol/L):</label>
                    <input type="number" id="ca-measured" min="1" max="4" step="0.01" placeholder="e.g., 2.20">
                    <small>Normal: 2.20-2.60 mmol/L</small>
                </div>
                
                <div class="calc-input-group">
                    <label for="ca-albumin">Albumin (g/L):</label>
                    <input type="number" id="ca-albumin" min="10" max="60" step="1" placeholder="e.g., 35">
                    <small>Normal: 35-50 g/L</small>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateCorrectedCalcium()">Calculate Corrected Calcium</button>
                <div id="ca-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Formula:</strong><br>
                        Corrected Ca²? = Measured Ca²? + 0.02 × (40 - Albumin)<br>
                        <br>
                        <strong>Interpretation:</strong><br>
                        • Normal: 2.20-2.60 mmol/L<br>
                        • <2.20: Hypocalcemia<br>
                        • >2.60: Hypercalcemia<br>
                        • >3.00: Severe hypercalcemia (requires urgent treatment)
                    </small>
                </div>
            </div>
        `;
    }

    calculateCorrectedCalcium() {
        const measuredCa = parseFloat(document.getElementById('ca-measured').value) || 0;
        const albumin = parseFloat(document.getElementById('ca-albumin').value) || 0;

        if (measuredCa === 0 || albumin === 0) {
            document.getElementById('ca-result').innerHTML = 
                '<div class="calc-error"><strong>Please enter both calcium and albumin values</strong></div>';
            return;
        }

        // Corrected calcium formula
        const correctedCa = measuredCa + (0.02 * (40 - albumin));

        let interpretation = '';
        let cssClass = 'calc-success';
        
        if (correctedCa < 1.90) {
            interpretation = '<strong>?? Severe hypocalcemia</strong><br>Risk of tetany, seizures, arrhythmias<br>Check PTH, vitamin D, Mg²?<br>Consider IV calcium';
            cssClass = 'calc-error';
        } else if (correctedCa < 2.20) {
            interpretation = '<strong>Hypocalcemia</strong><br>Investigate cause: PTH, vitamin D, renal function<br>Consider oral calcium/vitamin D';
            cssClass = 'calc-warning';
        } else if (correctedCa <= 2.60) {
            interpretation = '<strong>Normal corrected calcium</strong>';
            cssClass = 'calc-success';
        } else if (correctedCa <= 3.00) {
            interpretation = '<strong>?? Hypercalcemia</strong><br>Investigate: PTH, vitamin D, malignancy screen<br>Ensure adequate hydration';
            cssClass = 'calc-warning';
        } else {
            interpretation = '<strong>?? SEVERE HYPERCALCEMIA</strong><br>Medical emergency<br>• IV fluids 4-6 L/day<br>• Bisphosphonates<br>• Treat underlying cause<br>• Monitor ECG';
            cssClass = 'calc-error';
        }

        document.getElementById('ca-result').innerHTML = `
            <div class="${cssClass}">
                <h4>Corrected Calcium: ${correctedCa.toFixed(2)} mmol/L</h4>
                <p><small>Measured: ${measuredCa} mmol/L | Albumin: ${albumin} g/L</small></p>
                <p>${interpretation}</p>
            </div>
        `;
    }

    // LDL Calculator
    getLDLCalculator() {
        return `
            <div class="calc-section">
                <h3>LDL Cholesterol Calculator (Friedewald)</h3>
                <p>Calculates LDL from lipid panel</p>
                
                <div class="calc-input-group">
                    <label for="ldl-total">Total cholesterol (mmol/L):</label>
                    <input type="number" id="ldl-total" min="2" max="15" step="0.1" placeholder="e.g., 5.2">
                </div>
                
                <div class="calc-input-group">
                    <label for="ldl-hdl">HDL cholesterol (mmol/L):</label>
                    <input type="number" id="ldl-hdl" min="0.5" max="3" step="0.1" placeholder="e.g., 1.3">
                </div>
                
                <div class="calc-input-group">
                    <label for="ldl-trig">Triglycerides (mmol/L):</label>
                    <input type="number" id="ldl-trig" min="0.5" max="20" step="0.1" placeholder="e.g., 1.5">
                    <small>?? Friedewald invalid if TG >4.5 mmol/L</small>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateLDL()">Calculate LDL</button>
                <div id="ldl-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Friedewald Formula:</strong><br>
                        LDL = Total chol - HDL - (TG / 2.2)<br>
                        <br>
                        <strong>UK NICE Targets:</strong><br>
                        • Primary prevention: Non-HDL <4 mmol/L (LDL <3 mmol/L)<br>
                        • Secondary prevention: Non-HDL <2.5 mmol/L (LDL <2.0 mmol/L)<br>
                        • High-risk: Consider LDL <1.8 mmol/L
                    </small>
                </div>
            </div>
        `;
    }

    calculateLDL() {
        const totalChol = parseFloat(document.getElementById('ldl-total').value) || 0;
        const hdl = parseFloat(document.getElementById('ldl-hdl').value) || 0;
        const trig = parseFloat(document.getElementById('ldl-trig').value) || 0;

        if (totalChol === 0 || hdl === 0 || trig === 0) {
            document.getElementById('ldl-result').innerHTML = 
                '<div class="calc-error"><strong>Please enter all lipid values</strong></div>';
            return;
        }

        // Check if Friedewald is valid
        if (trig > 4.5) {
            document.getElementById('ldl-result').innerHTML = `
                <div class="calc-error">
                    <h4>?? Friedewald Equation Invalid</h4>
                    <p>Triglycerides >4.5 mmol/L (${trig.toFixed(1)} mmol/L)</p>
                    <p>LDL must be measured directly</p>
                    <p><small>Non-HDL cholesterol = ${(totalChol - hdl).toFixed(1)} mmol/L</small></p>
                </div>
            `;
            return;
        }

        // Friedewald equation (in mmol/L, divide TG by 2.2)
        const ldl = totalChol - hdl - (trig / 2.2);
        const nonHDL = totalChol - hdl;

        let interpretation = '';
        let cssClass = 'calc-success';
        
        if (ldl < 1.8) {
            interpretation = '<strong>Optimal LDL</strong><br>Target achieved for high-risk patients';
            cssClass = 'calc-success';
        } else if (ldl < 2.0) {
            interpretation = '<strong>Target for secondary prevention</strong><br>Good control for CVD patients';
            cssClass = 'calc-success';
        } else if (ldl < 3.0) {
            interpretation = '<strong>Acceptable for primary prevention</strong><br>Target for low-risk patients';
            cssClass = 'calc-success';
        } else if (ldl < 4.0) {
            interpretation = '<strong>?? Above target</strong><br>Consider lifestyle modification ± statin';
            cssClass = 'calc-warning';
        } else {
            interpretation = '<strong>?? High LDL</strong><br>Significant CVD risk<br>Lifestyle modification + statin indicated';
            cssClass = 'calc-error';
        }

        document.getElementById('ldl-result').innerHTML = `
            <div class="${cssClass}">
                <h4>LDL Cholesterol: ${ldl.toFixed(1)} mmol/L</h4>
                <p><small>Non-HDL: ${nonHDL.toFixed(1)} mmol/L | HDL: ${hdl} mmol/L</small></p>
                <p>${interpretation}</p>
            </div>
        `;
    }

    // Winters Formula Calculator
    getWintersCalculator() {
        return `
            <div class="calc-section">
                <h3>Winters Formula</h3>
                <p>Expected pCO2 in metabolic acidosis</p>
                
                <div class="calc-input-group">
                    <label for="winters-hco3">HCO3? (mmol/L):</label>
                    <input type="number" id="winters-hco3" min="5" max="35" step="0.1" placeholder="e.g., 15">
                    <small>Normal: 22-28 mmol/L</small>
                </div>
                
                <div class="calc-input-group">
                    <label for="winters-pco2">Actual pCO2 (kPa):</label>
                    <input type="number" id="winters-pco2" min="2" max="10" step="0.1" placeholder="e.g., 3.5">
                    <small>Optional: for comparison with expected</small>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateWinters()">Calculate Expected pCO2</button>
                <div id="winters-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Winters Formula:</strong><br>
                        Expected pCO2 (kPa) = 0.16 + (0.16 × HCO3?)<br>
                        <br>
                        <strong>Interpretation:</strong><br>
                        • If actual = expected ±0.27 kPa: Appropriate respiratory compensation<br>
                        • If actual > expected: Concomitant respiratory acidosis<br>
                        • If actual < expected: Concomitant respiratory alkalosis
                    </small>
                </div>
            </div>
        `;
    }

    // Asthma Severity Assessment Calculator
    getAsthmaCalculator() {
        return `
            <div class="calc-section">
                <h3>Acute Asthma Severity Assessment</h3>
                <p>British Thoracic Society / SIGN Guidelines</p>
                
                <div class="calc-input-group">
                    <label>Clinical Features:</label>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="asthma-unable-complete">
                        <label for="asthma-unable-complete">Unable to complete sentences in one breath</label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="asthma-pulse-110">
                        <label for="asthma-pulse-110">Pulse =110 bpm</label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="asthma-rr-25">
                        <label for="asthma-rr-25">Respiratory rate =25/min</label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="asthma-pulse-paradoxus">
                        <label for="asthma-pulse-paradoxus">Pulsus paradoxus present</label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="asthma-silent-chest">
                        <label for="asthma-silent-chest">Silent chest / poor air entry</label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="asthma-cyanosis">
                        <label for="asthma-cyanosis">Cyanosis</label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="asthma-exhaustion">
                        <label for="asthma-exhaustion">Exhaustion / confusion / altered consciousness</label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="asthma-bradycardia">
                        <label for="asthma-bradycardia">Bradycardia / hypotension / arrhythmia</label>
                    </div>
                </div>
                
                <div class="calc-input-group">
                    <label for="asthma-pefr">Peak Expiratory Flow Rate (PEFR) % predicted:</label>
                    <input type="number" id="asthma-pefr" min="0" max="100" step="1" placeholder="e.g., 50">
                    <small>Leave blank if unknown</small>
                </div>
                
                <div class="calc-input-group">
                    <label for="asthma-spo2">SpO2 (%):</label>
                    <input type="number" id="asthma-spo2" min="70" max="100" step="1" placeholder="e.g., 92">
                    <small>On air or specify oxygen</small>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateAsthma()">Assess Severity</button>
                <div id="asthma-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Severity Classification:</strong><br>
                        • <strong>Life-threatening:</strong> Silent chest, cyanosis, exhaustion, confusion, arrhythmia, SpO2 <92%, PEF <33%<br>
                        • <strong>Acute severe:</strong> Any of: Can't complete sentences, RR =25, HR =110, PEF 33-50%<br>
                        • <strong>Moderate:</strong> Increasing symptoms, PEF 50-75% predicted<br><br>
                        
                        <strong>Management:</strong><br>
                        • High-flow oxygen to maintain SpO2 94-98%<br>
                        • Salbutamol 5mg nebulised (back-to-back if severe)<br>
                        • Ipratropium 500mcg nebulised<br>
                        • Prednisolone 40-50mg PO or hydrocortisone 100mg IV<br>
                        • Consider IV magnesium sulphate 1.2-2g over 20min<br>
                        • Life-threatening: Senior help, ICU referral, consider IV salbutamol
                    </small>
                </div>
            </div>
        `;
    }

    calculateWinters() {
        const hco3 = parseFloat(document.getElementById('winters-hco3').value) || 0;
        const actualPco2 = parseFloat(document.getElementById('winters-pco2').value);

        if (hco3 === 0) {
            document.getElementById('winters-result').innerHTML = 
                '<div class="calc-error"><strong>Please enter HCO3? value</strong></div>';
            return;
        }

        // Winters formula: Expected pCO2 (kPa) = 0.16 + (0.16 × HCO3)
        const expectedPco2 = 0.16 + (0.16 * hco3);
        const lowerLimit = expectedPco2 - 0.27;
        const upperLimit = expectedPco2 + 0.27;

        let comparison = '';
        let cssClass = 'calc-success';
        
        if (actualPco2) {
            if (actualPco2 >= lowerLimit && actualPco2 <= upperLimit) {
                comparison = `
                    <p><strong>? Appropriate respiratory compensation</strong></p>
                    <p>Actual pCO2 (${actualPco2.toFixed(1)} kPa) matches expected range</p>
                    <p>Pure metabolic acidosis with compensation</p>
                `;
                cssClass = 'calc-success';
            } else if (actualPco2 > upperLimit) {
                comparison = `
                    <p><strong>?? Concomitant respiratory acidosis</strong></p>
                    <p>Actual pCO2 (${actualPco2.toFixed(1)} kPa) higher than expected</p>
                    <p>Mixed metabolic and respiratory acidosis</p>
                `;
                cssClass = 'calc-warning';
            } else {
                comparison = `
                    <p><strong>?? Concomitant respiratory alkalosis</strong></p>
                    <p>Actual pCO2 (${actualPco2.toFixed(1)} kPa) lower than expected</p>
                    <p>Mixed disorder or over-compensation</p>
                `;
                cssClass = 'calc-warning';
            }
        }

        document.getElementById('winters-result').innerHTML = `
            <div class="${cssClass}">
                <h4>Expected pCO2: ${expectedPco2.toFixed(1)} kPa</h4>
                <p><small>Expected range: ${lowerLimit.toFixed(1)} - ${upperLimit.toFixed(1)} kPa</small></p>
                <p><small>HCO3?: ${hco3} mmol/L</small></p>
                ${comparison}
            </div>
        `;
    }

    calculateAsthma() {
        // Check clinical features
        const unableComplete = document.getElementById('asthma-unable-complete').checked;
        const pulse110 = document.getElementById('asthma-pulse-110').checked;
        const rr25 = document.getElementById('asthma-rr-25').checked;
        const pulsusParadoxus = document.getElementById('asthma-pulse-paradoxus').checked;
        const silentChest = document.getElementById('asthma-silent-chest').checked;
        const cyanosis = document.getElementById('asthma-cyanosis').checked;
        const exhaustion = document.getElementById('asthma-exhaustion').checked;
        const bradycardia = document.getElementById('asthma-bradycardia').checked;
        
        const pefr = parseFloat(document.getElementById('asthma-pefr').value);
        const spo2 = parseFloat(document.getElementById('asthma-spo2').value);
        
        // Life-threatening features
        const lifeThreatening = silentChest || cyanosis || exhaustion || bradycardia || 
                               (spo2 && spo2 < 92) || (pefr && pefr < 33);
        
        // Acute severe features
        const acuteSevere = unableComplete || pulse110 || rr25 || 
                           (pefr && pefr >= 33 && pefr <= 50);
        
        let severity = '';
        let cssClass = '';
        let management = '';
        let urgency = '';
        
        if (lifeThreatening) {
            severity = '?? LIFE-THREATENING ASTHMA';
            cssClass = 'calc-error';
            urgency = '?? IMMEDIATE ACTION REQUIRED';
            management = `
                <strong>Immediate Management:</strong>
                <ul style="margin-top: 10px; text-align: left;">
                    <li><strong>Call for senior help immediately</strong></li>
                    <li><strong>High-flow oxygen 15L/min</strong> (target SpO2 94-98%)</li>
                    <li><strong>Salbutamol 5mg nebulised</strong> continuously or back-to-back</li>
                    <li><strong>Ipratropium 500mcg nebulised</strong></li>
                    <li><strong>Hydrocortisone 100mg IV</strong> or prednisolone 40-50mg PO</li>
                    <li><strong>Magnesium sulphate 1.2-2g IV</strong> over 20 minutes</li>
                    <li>Consider <strong>IV salbutamol</strong> (ICU setting)</li>
                    <li>Prepare for <strong>intubation</strong> if deteriorating</li>
                    <li><strong>ICU referral</strong></li>
                </ul>
                <p style="margin-top: 10px;"><strong>Monitor:</strong> Continuous SpO2, ECG, repeat ABG</p>
            `;
        } else if (acuteSevere) {
            severity = '?? ACUTE SEVERE ASTHMA';
            cssClass = 'calc-warning';
            urgency = 'Urgent treatment required';
            management = `
                <strong>Urgent Management:</strong>
                <ul style="margin-top: 10px; text-align: left;">
                    <li><strong>High-flow oxygen</strong> (target SpO2 94-98%)</li>
                    <li><strong>Salbutamol 5mg nebulised</strong> (repeat every 15-30 min if needed)</li>
                    <li><strong>Ipratropium 500mcg nebulised</strong> (4-6 hourly)</li>
                    <li><strong>Prednisolone 40-50mg PO</strong> or hydrocortisone 100mg IV</li>
                    <li>Consider <strong>magnesium sulphate 1.2-2g IV</strong> if poor response</li>
                    <li>Senior review if not responding within 15-30 minutes</li>
                </ul>
                <p style="margin-top: 10px;"><strong>Monitor:</strong> SpO2, PEFR every 15-30min, repeat assessment</p>
            `;
        } else if (pefr && pefr >= 50 && pefr <= 75) {
            severity = 'Moderate Asthma Exacerbation';
            cssClass = 'calc-success';
            urgency = 'Treatment recommended';
            management = `
                <strong>Management:</strong>
                <ul style="margin-top: 10px; text-align: left;">
                    <li><strong>Salbutamol 5mg nebulised</strong> or 4-6 puffs via spacer</li>
                    <li><strong>Prednisolone 40-50mg PO</strong></li>
                    <li>Consider admission if inadequate response</li>
                    <li>Reassess after 1 hour</li>
                </ul>
                <p style="margin-top: 10px;"><strong>Monitor:</strong> Clinical response, PEFR, SpO2</p>
            `;
        } else {
            severity = 'Mild or Improving';
            cssClass = 'calc-success';
            urgency = 'Continue monitoring';
            management = `
                <strong>Management:</strong>
                <ul style="margin-top: 10px; text-align: left;">
                    <li>Regular bronchodilators</li>
                    <li>Consider prednisolone if symptoms persist</li>
                    <li>Ensure follow-up arranged</li>
                    <li>Review inhaler technique and action plan</li>
                </ul>
            `;
        }
        
        // List present features
        let features = [];
        if (unableComplete) features.push('Unable to complete sentences');
        if (pulse110) features.push('Pulse =110 bpm');
        if (rr25) features.push('RR =25/min');
        if (pulsusParadoxus) features.push('Pulsus paradoxus');
        if (silentChest) features.push('Silent chest');
        if (cyanosis) features.push('Cyanosis');
        if (exhaustion) features.push('Exhaustion/confusion');
        if (bradycardia) features.push('Bradycardia/arrhythmia');
        if (pefr) features.push(`PEFR ${pefr}%`);
        if (spo2) features.push(`SpO2 ${spo2}%`);
        
        const featuresText = features.length > 0 
            ? `<p style="text-align: left;"><strong>Present features:</strong><br>${features.join(', ')}</p>`
            : '';
        
        document.getElementById('asthma-result').innerHTML = `
            <div class="${cssClass}">
                <h4>${severity}</h4>
                <p><strong>${urgency}</strong></p>
                ${featuresText}
                ${management}
            </div>
        `;
    }

    calculateOpioidConversion() {
        const currentOpioid = document.getElementById('palliative-current-opioid').value;
        const currentDose = parseFloat(document.getElementById('palliative-current-dose').value) || 0;
        const targetOpioid = document.getElementById('palliative-target-opioid').value;

        if (currentDose === 0) {
            document.getElementById('opioid-conversion-result').innerHTML = 
                '<div class="calc-error"><strong>Please enter current dose</strong></div>';
            return;
        }

        // UK opioid conversion factors - Faculty of Pain Medicine guidance
        // ?? CRITICAL: Patch conversions are per mcg/hr, NOT total daily dose
        const toMorphineFactors = {
            'morphine-oral': 1,
            'morphine-sc': 2,  // SC morphine is twice as potent as oral
            'oxycodone-oral': 1.5,  // Oxycodone 1mg = 1.5mg morphine
            'fentanyl-patch': 2.4,  // UK: Fentanyl 12 mcg/hr ˜ 30-45mg OME/day ? ~2.4-3.75 mg per mcg/hr
            'codeine': 0.1,  // Codeine 10mg = 1mg morphine
            'tramadol': 0.1,  // Tramadol 10mg = 1mg morphine
            'buprenorphine-patch': 2.4  // UK: Buprenorphine 5 mcg/hr ˜ 12mg OME/day ? ~2.4 mg per mcg/hr
        };

        // Conversion factors from oral morphine equivalents
        const fromMorphineFactors = {
            'morphine-oral': 1,
            'morphine-sc': 0.5,  // Oral to SC morphine
            'oxycodone-oral': 0.67,  // Morphine to oxycodone
            'fentanyl-patch': 0.4,  // Conservative: ~2.5mg OME per mcg/hr
            'diamorphine-sc': 0.33  // Oral morphine to SC diamorphine
        };

        // Convert current dose to morphine equivalents
        const morphineEquivalent = currentDose * toMorphineFactors[currentOpioid];
        
        // Faculty of Pain Medicine: Reduce by 25-50% when switching (more for high doses/elderly)
        const fullTargetDose = morphineEquivalent * fromMorphineFactors[targetOpioid];
        const reducedTargetDose = fullTargetDose * 0.5; // 50% reduction for safety
