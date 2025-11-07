/**
 * Extracted Calculators from app.js
 * Generated: 2025-11-05 (Complete Extraction)
 * Total calculator getters: 61
 * Total calculate functions: 65
 */

const ExtractedCalculators = {

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
                        Overweight: 25-29.9 | Obese: ≥30<br>
                        <strong>Asian populations:</strong> Overweight ≥23, Obese ≥27.5
                    </small>
                </div>
            </div>
        `;

    },

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

    },

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

    },

    getCHADS2VAScCalculator() {

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
                
                <button onclick="window.quizApp.calculateCHADS2VASc()">Calculate Score</button>
                <div id="chads-result" class="calc-result"></div>
            </div>
        `;

    },

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

    },

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

    },

    getAPACHECalculator() {

        return `
            <div class="calculator-form">
                <h4>APACHE II Score Calculator</h4>
                <p><small>Acute Physiology and Chronic Health Evaluation II - ICU mortality prediction</small></p>
                
                <div class="apache-sections">
                    <div class="apache-section">
                        <h5>🌡️ Physiologic Variables (worst values in first 24 hours)</h5>
                        
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
                            <label>PaO2 (mmHg) - if FiO2 ≥50%:</label>
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
                            <label>WBC Count (×10³/μL):</label>
                            <input type="number" id="apache-wbc" placeholder="8.0" step="0.1" min="0.1" max="100">
                            <small>Normal: 4.0-11.0 ×10³/μL</small>
                        </div>
                        
                        <div class="calc-input-group">
                            <label>Glasgow Coma Scale (3-15):</label>
                            <input type="number" id="apache-gcs" placeholder="15" min="3" max="15">
                            <small>Normal: 15, Severe impairment: ≤8</small>
                        </div>
                    </div>
                    
                    <div class="apache-section">
                        <h5>👤 Demographics & Health Status</h5>
                        
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
                        <li><strong>≥25:</strong> Extremely high risk (~55%+ mortality)</li>
                    </ul>
                    <small><strong>Note:</strong> APACHE II predicts hospital mortality for groups of critically ill patients, not individual patient outcomes.</small>
                </div>
            </div>
        `;

    },

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

    },

    getQRISKCalculator() {

        return `
            <div class="calculator-form">
                <h4>QRISK3 Calculator</h4>
                <p><small>10-year cardiovascular disease risk assessment (UK validated)</small></p>
                
                <div class="qrisk-sections">
                    <div class="qrisk-section">
                        <h5>👤 About You</h5>
                        
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
                        <h5>📊 Measurements</h5>
                        
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
                        <h5>🚬 Smoking</h5>
                        <div class="calc-input-group">
                            <label>Smoking Status:</label>
                            <select id="qrisk-smoking">
                                <option value="0">Non-smoker</option>
                                <option value="1">Former smoker</option>
                                <option value="2">Light smoker (1-9/day)</option>
                                <option value="3">Moderate smoker (10-19/day)</option>
                                <option value="4">Heavy smoker (≥20/day)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="qrisk-section">
                        <h5>🏥 Medical Conditions</h5>
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
                        <h5>📍 Social (Optional)</h5>
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

    },

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

    },

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

    },

    getCRB65Calculator() {

        return `
            <div class="calculator-form">
                <h4>CRB-65 Score</h4>
                <p><small>Community-acquired pneumonia severity assessment</small></p>
                
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="crb-confusion"> Confusion (AMT ≤8)</label>
                    <label><input type="checkbox" id="crb-rr"> Respiratory rate ≥30/min</label>
                    <label><input type="checkbox" id="crb-bp"> Systolic BP <90 or Diastolic BP ≤60</label>
                    <label><input type="checkbox" id="crb-age"> Age ≥65 years</label>
                </div>
                
                <button onclick="window.quizApp.calculateCRB65()">Calculate Score</button>
                <div id="crb65-result" class="calc-result"></div>
            </div>
        `;

    },

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
                        <option value="2">≥80 years (2 points)</option>
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

    },

    getChildPughCalculator() {

        return `
            <div class="calculator-form">
                <h4>Child-Pugh Score</h4>
                <p><small>Liver function assessment in cirrhosis</small></p>
                
                <div class="calc-input-group">
                    <label>Bilirubin (μmol/L) - UK units:</label>
                    <select id="cp-bilirubin">
                        <option value="1"><34 μmol/L (Normal: <20) (1 point)</option>
                        <option value="2">34-50 μmol/L (2 points)</option>
                        <option value="3">>50 μmol/L (3 points)</option>
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

    },

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

    },

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
                    <label>Serum Creatinine (μmol/L):</label>
                    <input type="number" id="egfr-creatinine" placeholder="80" min="20" max="2000">
                </div>
                
                <button onclick="window.quizApp.calculateEGFR()">Calculate eGFR</button>
                <div id="egfr-result" class="calc-result"></div>
                
                <div class="calc-reference">
                    <small>
                        <strong>CKD Stages (UK):</strong><br>
                        G1: ≥90 (normal/high)<br>
                        G2: 60-89 (mildly decreased)<br>
                        G3a: 45-59 (mild-moderate)<br>
                        G3b: 30-44 (moderate-severe)<br>
                        G4: 15-29 (severely decreased)<br>
                        G5: <15 (kidney failure)
                    </small>
                </div>
            </div>
        `;

    },

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
                    <label>Serum Creatinine (μmol/L):</label>
                    <input type="number" id="creatinine-value" placeholder="80" min="20" max="2000">
                    <small>Normal range: 60-110 μmol/L (men), 45-90 μmol/L (women)</small>
                </div>
                
                <button onclick="window.quizApp.calculateUreaCreatinine()">Calculate Ratio</button>
                <div id="urea-creatinine-result" class="calc-result"></div>
                
                <div class="calc-reference">
                    <small>
                        <strong>⚠️ Note:</strong> U:C ratio is NOT used for AKI diagnosis<br>
                        <strong>AKI Diagnostic Criteria (KDIGO/NICE CG169):</strong><br>
                        • Creatinine rise ≥26 μmol/L in 48h, OR<br>
                        • Creatinine ≥1.5× baseline in 7 days, OR<br>
                        • Urine output <0.5 mL/kg/hr for >6 hours<br><br>
                        <strong>U:C Ratio (contextual only):</strong><br>
                        40-100:1 typical | >100:1 may suggest prerenal causes<br>
                        <em>Always interpret with clinical context, AKI staging, and eGFR</em>
                    </small>
                </div>
            </div>
        `;

    },

    getABCD2Calculator() {

        return `
            <div class="calculator-form">
                <h4>ABCD² Score</h4>
                <p><small>Stroke risk after TIA (NICE CG68)</small></p>
                
                <div class="calc-input-group">
                    <label>Age:</label>
                    <select id="abcd2-age">
                        <option value="0"><60 years (0 points)</option>
                        <option value="1">≥60 years (1 point)</option>
                    </select>
                </div>
                <div class="calc-input-group">
                    <label>Blood Pressure:</label>
                    <select id="abcd2-bp">
                        <option value="0">SBP <140 and DBP <90 (0 points)</option>
                        <option value="1">SBP ≥140 or DBP ≥90 (1 point)</option>
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
                        <option value="2">≥60 minutes (2 points)</option>
                    </select>
                </div>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="abcd2-diabetes"> Diabetes mellitus (+1)</label>
                </div>
                
                <button onclick="window.quizApp.calculateABCD2()">Calculate Score</button>
                <div id="abcd2-result" class="calc-result"></div>
            </div>
        `;

    },

    getMUSTCalculator() {

        return `
            <div class="calculator-form">
                <h4>MUST Score</h4>
                <p><small>Malnutrition Universal Screening Tool (BAPEN)</small></p>
                
                <div class="calc-input-group">
                    <label>BMI:</label>
                    <select id="must-bmi">
                        <option value="0">BMI >20 (≥18.5 if >65yrs) (0 points)</option>
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
                        ≥2: High risk - treat/refer dietitian
                    </small>
                </div>
            </div>
        `;

    },

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

    },

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
                            <option value="glucose">Glucose (mmol/L ⇄ mg/dL)</option>
                            <option value="cholesterol">Cholesterol/Lipids (mmol/L ⇄ mg/dL)</option>
                            <option value="creatinine">Creatinine (μmol/L ⇄ mg/dL)</option>
                            <option value="bilirubin">Bilirubin (μmol/L ⇄ mg/dL)</option>
                            <option value="hba1c">HbA1c (% ⇄ mmol/mol)</option>
                            <option value="hemoglobin">Hemoglobin (g/dL ⇄ g/L)</option>
                        </optgroup>
                        <optgroup label="Electrolytes & Minerals">
                            <option value="calcium">Calcium (mmol/L ⇄ mg/dL)</option>
                            <option value="magnesium">Magnesium (mmol/L ⇄ mg/dL)</option>
                            <option value="phosphate">Phosphate (mmol/L ⇄ mg/dL)</option>
                            <option value="urea">Urea/BUN (mmol/L ⇄ mg/dL)</option>
                        </optgroup>
                        <optgroup label="Proteins & Lipids">
                            <option value="albumin">Albumin (g/L ⇄ g/dL)</option>
                            <option value="triglycerides">Triglycerides (mmol/L ⇄ mg/dL)</option>
                        </optgroup>
                        <optgroup label="Other Lab Values">
                            <option value="uric-acid">Uric Acid (μmol/L ⇄ mg/dL)</option>
                            <option value="vitamin-d">Vitamin D (nmol/L ⇄ ng/mL)</option>
                            <option value="ferritin">Ferritin (μg/L ⇄ ng/mL)</option>
                        </optgroup>
                        <optgroup label="Physical Measurements">
                            <option value="weight">Weight (kg ⇄ lbs)</option>
                            <option value="height">Height (cm ⇄ inches/feet)</option>
                            <option value="temperature">Temperature (°C ⇄ °F)</option>
                        </optgroup>
                        <optgroup label="Clinical Measurements">
                            <option value="pressure">Pressure (mmHg ⇄ kPa)</option>
                            <option value="blood-volume">Blood Volume (mL ⇄ units/pints)</option>
                            <option value="inr">INR ⇄ Prothrombin %</option>
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

    },

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
                    <strong>Example:</strong> Need 500mg, Stock is 1000mg/10ml → Draw up 5ml</small>
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

    },

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
                    <label>SpO₂ (%): <span id="spo2-scale">Scale 1</span></label>
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

    },

    getCURB65Calculator() {

        return `
            <div class="calculator-form">
                <h4>CURB-65 Score</h4>
                <p><small>Enhanced CAP severity assessment (includes urea)</small></p>
                
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="curb-confusion"> Confusion (AMT ≤8 or new disorientation)</label>
                    <label><input type="checkbox" id="curb-urea"> Urea >7 mmol/L</label>
                    <label><input type="checkbox" id="curb-rr"> Respiratory rate ≥30/min</label>
                    <label><input type="checkbox" id="curb-bp"> Systolic BP <90 or Diastolic BP ≤60</label>
                    <label><input type="checkbox" id="curb-age"> Age ≥65 years</label>
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

    },

    getPalliativeCalculator() {

        return `
            <div class="calculator-form">
                <h4>🌸 Palliative Care Drug Calculator</h4>
                <p><small>Morphine equivalents, breakthrough dosing, and symptom management</small></p>
                
                <div class="calc-section">
                    <h5>📊 Opioid Conversion</h5>
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
                    <h5>💉 Breakthrough Dosing</h5>
                    <div class="calc-input-group">
                        <label>Total Daily Morphine Equivalent (mg):</label>
                        <input type="number" id="palliative-daily-morphine" placeholder="60" step="1">
                    </div>
                    <button onclick="window.quizApp.calculateBreakthroughDose()">Calculate Breakthrough</button>
                    <div id="breakthrough-result" class="calc-result"></div>
                </div>

                <div class="calc-section">
                    <h5>🤧 Anti-emetic Calculator</h5>
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
                    <h5>🫁 Respiratory Secretions</h5>
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
                        <strong>⚠️ Important Notes:</strong><br>
                        • All doses are starting suggestions - titrate to effect<br>
                        • Consider 25-50% dose reduction if frail/elderly<br>
                        • Monitor for sedation and respiratory depression<br>
                        • Seek specialist palliative care advice for complex cases<br>
                        • These calculations are guidelines only
                    </small>
                </div>
            </div>
        `;

    },

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
                        • ≤0 points: DVT unlikely - consider D-dimer<br>
                        • 1-2 points: Moderate probability - D-dimer or imaging<br>
                        • ≥3 points: DVT likely - proceed to imaging<br>
                        • Two-level Wells: ≤1 = unlikely, ≥2 = likely
                    </small>
                </div>
            </div>
        `;

    },

    getPERCCalculator() {

        return `
            <div class="calc-section">
                <h3>PERC Rule (Pulmonary Embolism Rule-out Criteria)</h3>
                <p>Excludes PE without D-dimer if all criteria are negative</p>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="perc-age" value="1">
                        Age ≥50 years
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="perc-hr" value="1">
                        Heart rate ≥100 bpm
                    </label>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="perc-sats" value="1">
                        O₂ saturation <95% on room air
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

    },

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
                        Renal impairment (creatinine >177 μmol/L / 2 mg/dL) (+1)
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
                        • Class IV (≥3 points): >11% risk
                    </small>
                </div>
            </div>
        `;

    },

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

    },

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
                        Corrected Na⁺ = Measured Na⁺ + 0.3 × (Glucose - 5)<br>
                        <br>
                        <strong>Interpretation:</strong><br>
                        • For every 1 mmol/L rise in glucose above 5, sodium falls by ~0.3 mmol/L<br>
                        • Helps identify true hyponatremia vs pseudohyponatremia in hyperglycemia<br>
                        • Normal Na⁺: 135-145 mmol/L
                    </small>
                </div>
            </div>
        `;

    },

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
                        Calculated osmolality = 2(Na⁺) + Glucose + Urea<br>
                        Osmolal gap = Measured - Calculated<br>
                        <br>
                        <strong>Normal: <10 mOsm/kg</strong><br>
                        Elevated gap suggests: methanol, ethylene glycol, ethanol, isopropanol, propylene glycol
                    </small>
                </div>
            </div>
        `;

    },

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
                        <option value="-1">≥45 years (-1)</option>
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
                        • ≤0: No testing/antibiotics (1-2.5% strep)<br>
                        • 1: No testing/antibiotics (5-10% strep)<br>
                        • 2-3: Throat swab/rapid test (11-28% strep)<br>
                        • ≥4: Consider empirical antibiotics (51-53% strep)
                    </small>
                </div>
            </div>
        `;

    },

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

    },

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
                        <option value="6">≥25 (6 points)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label for="gbs-hb-male">Hemoglobin (g/L) - Males:</label>
                    <select id="gbs-hb-male">
                        <option value="0">≥130 (0 points)</option>
                        <option value="1">120-129 (1 point)</option>
                        <option value="3">100-119 (3 points)</option>
                        <option value="6"><100 (6 points)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label for="gbs-hb-female">Hemoglobin (g/L) - Females:</label>
                    <select id="gbs-hb-female">
                        <option value="0">≥120 (0 points)</option>
                        <option value="1">100-119 (1 point)</option>
                        <option value="6"><100 (6 points)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label for="gbs-sbp">Systolic BP (mmHg):</label>
                    <select id="gbs-sbp">
                        <option value="0">≥110 (0 points)</option>
                        <option value="1">100-109 (1 point)</option>
                        <option value="2">90-99 (2 points)</option>
                        <option value="3"><90 (3 points)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label>
                        <input type="checkbox" id="gbs-pulse" value="1">
                        Pulse ≥100 bpm (1 point)
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
                        • Score ≥6: High risk - admit for intervention
                    </small>
                </div>
            </div>
        `;

    },

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
                        <option value="2">≥100 bpm (2)</option>
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
                        • 4-6: Moderate depression (stimulation, O₂ may be needed)<br>
                        • 0-3: Severe depression (immediate resuscitation)<br>
                        <br>
                        Assess at 1 minute and 5 minutes; continue every 5 minutes if score <7
                    </small>
                </div>
            </div>
        `;

    },

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
                        <option value="3">≥5 cm (3)</option>
                    </select>
                </div>
                
                <div class="calc-input-group">
                    <label for="bishop-effacement">Cervical effacement (%):</label>
                    <select id="bishop-effacement">
                        <option value="0">0-30% (0)</option>
                        <option value="1">40-50% (1)</option>
                        <option value="2">60-70% (2)</option>
                        <option value="3">≥80% (3)</option>
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
                        • ≤5: Unfavorable cervix - consider cervical ripening (prostaglandins)<br>
                        • 6-7: Intermediate - may proceed with induction<br>
                        • ≥8: Favorable cervix - high chance of successful induction
                    </small>
                </div>
            </div>
        `;

    },

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
                        <strong>Formula:</strong> MAP = DBP + ⅓(SBP - DBP)<br>
                        <br>
                        <strong>Normal range:</strong> 70-100 mmHg<br>
                        • MAP <60: Risk of end-organ hypoperfusion<br>
                        • MAP 65-70: Minimum target in sepsis/critical illness<br>
                        • MAP >100: Considered hypertensive
                    </small>
                </div>
            </div>
        `;

    },

    getAAGradientCalculator() {

        return `
            <div class="calc-section">
                <h3>Alveolar-arterial (A-a) Oxygen Gradient</h3>
                <p>Evaluates cause of hypoxemia</p>
                
                <div class="calc-input-group">
                    <label for="aa-fio2">FiO₂ (%):</label>
                    <input type="number" id="aa-fio2" min="21" max="100" step="1" value="21" placeholder="21 for room air">
                    <small>Room air = 21%</small>
                </div>
                
                <div class="calc-input-group">
                    <label for="aa-pao2">PaO₂ (kPa):</label>
                    <input type="number" id="aa-pao2" min="3" max="50" step="0.1" placeholder="e.g., 10.5">
                    <small>From arterial blood gas</small>
                </div>
                
                <div class="calc-input-group">
                    <label for="aa-paco2">PaCO₂ (kPa):</label>
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
                        PAO₂ = (FiO₂ × [Patm - PH₂O]) - (PaCO₂ / 0.8)<br>
                        A-a gradient = PAO₂ - PaO₂<br>
                        <br>
                        <strong>Expected A-a gradient:</strong> (Age/4) + 4 kPa<br>
                        Elevated gradient suggests V/Q mismatch, shunt, or diffusion defect
                    </small>
                </div>
            </div>
        `;

    },

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
                        Corrected Ca²⁺ = Measured Ca²⁺ + 0.02 × (40 - Albumin)<br>
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

    },

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
                    <small>⚠️ Friedewald invalid if TG >4.5 mmol/L</small>
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

    },

    getWintersCalculator() {

        return `
            <div class="calc-section">
                <h3>Winters Formula</h3>
                <p>Expected pCO₂ in metabolic acidosis</p>
                
                <div class="calc-input-group">
                    <label for="winters-hco3">HCO₃⁻ (mmol/L):</label>
                    <input type="number" id="winters-hco3" min="5" max="35" step="0.1" placeholder="e.g., 15">
                    <small>Normal: 22-28 mmol/L</small>
                </div>
                
                <div class="calc-input-group">
                    <label for="winters-pco2">Actual pCO₂ (kPa):</label>
                    <input type="number" id="winters-pco2" min="2" max="10" step="0.1" placeholder="e.g., 3.5">
                    <small>Optional: for comparison with expected</small>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateWinters()">Calculate Expected pCO₂</button>
                <div id="winters-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Winters Formula:</strong><br>
                        Expected pCO₂ (kPa) = 0.16 + (0.16 × HCO₃⁻)<br>
                        <br>
                        <strong>Interpretation:</strong><br>
                        • If actual = expected ±0.27 kPa: Appropriate respiratory compensation<br>
                        • If actual > expected: Concomitant respiratory acidosis<br>
                        • If actual < expected: Concomitant respiratory alkalosis
                    </small>
                </div>
            </div>
        `;

    },

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
                        <label for="asthma-pulse-110">Pulse ≥110 bpm</label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="asthma-rr-25">
                        <label for="asthma-rr-25">Respiratory rate ≥25/min</label>
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
                    <label for="asthma-spo2">SpO₂ (%):</label>
                    <input type="number" id="asthma-spo2" min="70" max="100" step="1" placeholder="e.g., 92">
                    <small>On air or specify oxygen</small>
                </div>
                
                <button class="calc-button" onclick="window.quizApp.calculateAsthma()">Assess Severity</button>
                <div id="asthma-result" class="calc-result"></div>
                
                <div class="calc-notes">
                    <small>
                        <strong>Severity Classification:</strong><br>
                        • <strong>Life-threatening:</strong> Silent chest, cyanosis, exhaustion, confusion, arrhythmia, SpO₂ <92%, PEF <33%<br>
                        • <strong>Acute severe:</strong> Any of: Can't complete sentences, RR ≥25, HR ≥110, PEF 33-50%<br>
                        • <strong>Moderate:</strong> Increasing symptoms, PEF 50-75% predicted<br><br>
                        
                        <strong>Management:</strong><br>
                        • High-flow oxygen to maintain SpO₂ 94-98%<br>
                        • Salbutamol 5mg nebulised (back-to-back if severe)<br>
                        • Ipratropium 500mcg nebulised<br>
                        • Prednisolone 40-50mg PO or hydrocortisone 100mg IV<br>
                        • Consider IV magnesium sulphate 1.2-2g over 20min<br>
                        • Life-threatening: Senior help, ICU referral, consider IV salbutamol
                    </small>
                </div>
            </div>
        `;

    },

    getGRACECalculator() {

    return `
        <div class="calculator-form">
            <h4>GRACE Score for ACS Risk Assessment</h4>
            <div class="calc-input-group">
                <label>Age (years):</label>
                <input type="number" id="grace-age" placeholder="65" min="0" max="120">
            </div>
            <div class="calc-input-group">
                <label>Heart Rate (bpm):</label>
                <input type="number" id="grace-hr" placeholder="80" min="30" max="250">
            </div>
            <div class="calc-input-group">
                <label>Systolic BP (mmHg):</label>
                <input type="number" id="grace-sbp" placeholder="120" min="50" max="300">
            </div>
            <div class="calc-input-group">
                <label>Creatinine (μmol/L):</label>
                <input type="number" id="grace-creatinine" placeholder="100" min="50" max="1000">
            </div>
            <div class="calc-checkbox-group">
                <label><input type="checkbox" id="grace-killip2"> Killip Class II-IV</label>
                <label><input type="checkbox" id="grace-cardiac-arrest"> Cardiac arrest</label>
                <label><input type="checkbox" id="grace-st-deviation"> ST deviation</label>
                <label><input type="checkbox" id="grace-elevated-enzymes"> Elevated cardiac enzymes</label>
            </div>
            <button onclick="window.quizApp.calculateGRACE()">Calculate GRACE Score</button>
            <div id="grace-result" class="calc-result"></div>
            <div class="calc-reference">
                <small><strong>GRACE Risk:</strong> Low ≤108 | Intermediate 109-140 | High >140</small>
            </div>
        </div>
    `;

    },

    getCRUSADECalculator() {

    return `
        <div class="calculator-form">
            <h4>CRUSADE Bleeding Risk Score</h4>
            <div class="calc-input-group">
                <label>Baseline Haematocrit (%):</label>
                <input type="number" id="crusade-hct" placeholder="40" min="10" max="60" step="0.1">
            </div>
            <div class="calc-input-group">
                <label>Creatinine Clearance (ml/min):</label>
                <input type="number" id="crusade-ccr" placeholder="80" min="5" max="200">
            </div>
            <div class="calc-input-group">
                <label>Heart Rate (bpm):</label>
                <input type="number" id="crusade-hr" placeholder="70" min="30" max="250">
            </div>
            <div class="calc-input-group">
                <label>Systolic BP (mmHg):</label>
                <input type="number" id="crusade-sbp" placeholder="120" min="50" max="300">
            </div>
            <div class="calc-radio-group">
                <label>Sex:</label>
                <label><input type="radio" name="crusade-sex" value="male" checked> Male</label>
                <label><input type="radio" name="crusade-sex" value="female"> Female</label>
            </div>
            <div class="calc-checkbox-group">
                <label><input type="checkbox" id="crusade-chf"> Signs of CHF</label>
                <label><input type="checkbox" id="crusade-pvd"> Prior vascular disease</label>
                <label><input type="checkbox" id="crusade-diabetes"> Diabetes mellitus</label>
            </div>
            <button onclick="window.quizApp.calculateCRUSADE()">Calculate CRUSADE Score</button>
            <div id="crusade-result" class="calc-result"></div>
            <div class="calc-reference">
                <small><strong>Bleeding Risk:</strong> Very Low ≤20 | Low 21-30 | Moderate 31-40 | High 41-50 | Very High >50</small>
            </div>
        </div>
    `;

    },

    getPHQ9Calculator() {

    return `
        <div class="calculator-form">
            <h4>PHQ-9 Depression Severity Scale</h4>
            <p class="calc-description">Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
            
            <div class="phq9-questions">
                <div class="phq9-question">
                    <p>1. Little interest or pleasure in doing things</p>
                    <div class="radio-group">
                        <label><input type="radio" name="phq9-q1" value="0"> Not at all</label>
                        <label><input type="radio" name="phq9-q1" value="1"> Several days</label>
                        <label><input type="radio" name="phq9-q1" value="2"> More than half the days</label>
                        <label><input type="radio" name="phq9-q1" value="3"> Nearly every day</label>
                    </div>
                </div>
                
                <div class="phq9-question">
                    <p>2. Feeling down, depressed, or hopeless</p>
                    <div class="radio-group">
                        <label><input type="radio" name="phq9-q2" value="0"> Not at all</label>
                        <label><input type="radio" name="phq9-q2" value="1"> Several days</label>
                        <label><input type="radio" name="phq9-q2" value="2"> More than half the days</label>
                        <label><input type="radio" name="phq9-q2" value="3"> Nearly every day</label>
                    </div>
                </div>
                
                <div class="phq9-question">
                    <p>3. Trouble falling or staying asleep, or sleeping too much</p>
                    <div class="radio-group">
                        <label><input type="radio" name="phq9-q3" value="0"> Not at all</label>
                        <label><input type="radio" name="phq9-q3" value="1"> Several days</label>
                        <label><input type="radio" name="phq9-q3" value="2"> More than half the days</label>
                        <label><input type="radio" name="phq9-q3" value="3"> Nearly every day</label>
                    </div>
                </div>
                
                <div class="phq9-question">
                    <p>4. Feeling tired or having little energy</p>
                    <div class="radio-group">
                        <label><input type="radio" name="phq9-q4" value="0"> Not at all</label>
                        <label><input type="radio" name="phq9-q4" value="1"> Several days</label>
                        <label><input type="radio" name="phq9-q4" value="2"> More than half the days</label>
                        <label><input type="radio" name="phq9-q4" value="3"> Nearly every day</label>
                    </div>
                </div>
                
                <div class="phq9-question">
                    <p>5. Poor appetite or overeating</p>
                    <div class="radio-group">
                        <label><input type="radio" name="phq9-q5" value="0"> Not at all</label>
                        <label><input type="radio" name="phq9-q5" value="1"> Several days</label>
                        <label><input type="radio" name="phq9-q5" value="2"> More than half the days</label>
                        <label><input type="radio" name="phq9-q5" value="3"> Nearly every day</label>
                    </div>
                </div>
                
                <div class="phq9-question">
                    <p>6. Feeling bad about yourself or that you are a failure</p>
                    <div class="radio-group">
                        <label><input type="radio" name="phq9-q6" value="0"> Not at all</label>
                        <label><input type="radio" name="phq9-q6" value="1"> Several days</label>
                        <label><input type="radio" name="phq9-q6" value="2"> More than half the days</label>
                        <label><input type="radio" name="phq9-q6" value="3"> Nearly every day</label>
                    </div>
                </div>
                
                <div class="phq9-question">
                    <p>7. Trouble concentrating on things</p>
                    <div class="radio-group">
                        <label><input type="radio" name="phq9-q7" value="0"> Not at all</label>
                        <label><input type="radio" name="phq9-q7" value="1"> Several days</label>
                        <label><input type="radio" name="phq9-q7" value="2"> More than half the days</label>
                        <label><input type="radio" name="phq9-q7" value="3"> Nearly every day</label>
                    </div>
                </div>
                
                <div class="phq9-question">
                    <p>8. Moving or speaking slowly, or being fidgety/restless</p>
                    <div class="radio-group">
                        <label><input type="radio" name="phq9-q8" value="0"> Not at all</label>
                        <label><input type="radio" name="phq9-q8" value="1"> Several days</label>
                        <label><input type="radio" name="phq9-q8" value="2"> More than half the days</label>
                        <label><input type="radio" name="phq9-q8" value="3"> Nearly every day</label>
                    </div>
                </div>
                
                <div class="phq9-question">
                    <p>9. Thoughts that you would be better off dead or hurting yourself</p>
                    <div class="radio-group">
                        <label><input type="radio" name="phq9-q9" value="0"> Not at all</label>
                        <label><input type="radio" name="phq9-q9" value="1"> Several days</label>
                        <label><input type="radio" name="phq9-q9" value="2"> More than half the days</label>
                        <label><input type="radio" name="phq9-q9" value="3"> Nearly every day</label>
                    </div>
                </div>
            </div>
            
            <button onclick="window.quizApp.calculatePHQ9()">Calculate PHQ-9 Score</button>
            <div id="phq9-result" class="calc-result"></div>
            <div class="calc-reference">
                <small><strong>Severity:</strong> Minimal 1-4 | Mild 5-9 | Moderate 10-14 | Moderately Severe 15-19 | Severe 20-27</small>
            </div>
        </div>
    `;

    },

    getGAD7Calculator() {

    return `
        <div class="calculator-form">
            <h4>GAD-7 Anxiety Screening Scale</h4>
            <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
            
            <div class="calc-input-group">
                <label>Feeling nervous, anxious or on edge:</label>
                <select id="gad7-q1">
                    <option value="0">Not at all</option>
                    <option value="1">Several days</option>
                    <option value="2">More than half the days</option>
                    <option value="3">Nearly every day</option>
                </select>
            </div>
            
            <div class="calc-input-group">
                <label>Not being able to stop or control worrying:</label>
                <select id="gad7-q2">
                    <option value="0">Not at all</option>
                    <option value="1">Several days</option>
                    <option value="2">More than half the days</option>
                    <option value="3">Nearly every day</option>
                </select>
            </div>
            
            <div class="calc-input-group">
                <label>Worrying too much about different things:</label>
                <select id="gad7-q3">
                    <option value="0">Not at all</option>
                    <option value="1">Several days</option>
                    <option value="2">More than half the days</option>
                    <option value="3">Nearly every day</option>
                </select>
            </div>
            
            <div class="calc-input-group">
                <label>Trouble relaxing:</label>
                <select id="gad7-q4">
                    <option value="0">Not at all</option>
                    <option value="1">Several days</option>
                    <option value="2">More than half the days</option>
                    <option value="3">Nearly every day</option>
                </select>
            </div>
            
            <div class="calc-input-group">
                <label>Being so restless that it is hard to sit still:</label>
                <select id="gad7-q5">
                    <option value="0">Not at all</option>
                    <option value="1">Several days</option>
                    <option value="2">More than half the days</option>
                    <option value="3">Nearly every day</option>
                </select>
            </div>
            
            <div class="calc-input-group">
                <label>Becoming easily annoyed or irritable:</label>
                <select id="gad7-q6">
                    <option value="0">Not at all</option>
                    <option value="1">Several days</option>
                    <option value="2">More than half the days</option>
                    <option value="3">Nearly every day</option>
                </select>
            </div>
            
            <div class="calc-input-group">
                <label>Feeling afraid as if something awful might happen:</label>
                <select id="gad7-q7">
                    <option value="0">Not at all</option>
                    <option value="1">Several days</option>
                    <option value="2">More than half the days</option>
                    <option value="3">Nearly every day</option>
                </select>
            </div>
            
            <button onclick="window.quizApp.calculateGAD7()">Calculate GAD-7 Score</button>
            <div id="gad7-result" class="calc-result"></div>
            <div class="calc-reference">
                <small><strong>Anxiety Severity:</strong> Minimal 0-4 | Mild 5-9 | Moderate 10-14 | Severe 15-21</small>
            </div>
        </div>
    `;

    },

    getMSECalculator() {

    return `
        <div class="calculator-form">
            <h4>Mental State Examination (MSE)</h4>
            <p class="calc-description">Comprehensive psychiatric clinical assessment tool</p>
            
            <div class="calc-input-group">
                <label><strong>1. Appearance & Behavior</strong></label>
                <textarea id="mse-appearance" placeholder="E.g., Well-groomed, casually dressed, good eye contact, calm and cooperative" rows="2"></textarea>
            </div>
            
            <div class="calc-input-group">
                <label><strong>2. Speech</strong></label>
                <select id="mse-speech">
                    <option value="">Select...</option>
                    <option value="Normal rate, rhythm, volume">Normal rate, rhythm, volume</option>
                    <option value="Pressured">Pressured</option>
                    <option value="Slowed">Slowed</option>
                    <option value="Monotone">Monotone</option>
                    <option value="Loud">Loud</option>
                    <option value="Soft/Quiet">Soft/Quiet</option>
                    <option value="Stuttering">Stuttering</option>
                </select>
            </div>
            
            <div class="calc-input-group">
                <label><strong>3. Mood (Subjective)</strong></label>
                <input type="text" id="mse-mood" placeholder="Patient's own words, e.g., 'I feel depressed'">
            </div>
            
            <div class="calc-input-group">
                <label><strong>4. Affect (Objective)</strong></label>
                <select id="mse-affect">
                    <option value="">Select...</option>
                    <option value="Euthymic, full range, appropriate">Euthymic, full range, appropriate</option>
                    <option value="Anxious">Anxious</option>
                    <option value="Depressed">Depressed</option>
                    <option value="Elevated/Euphoric">Elevated/Euphoric</option>
                    <option value="Irritable">Irritable</option>
                    <option value="Flat/Blunted">Flat/Blunted</option>
                    <option value="Labile">Labile</option>
                    <option value="Incongruent">Incongruent</option>
                </select>
            </div>
            
            <div class="calc-input-group">
                <label><strong>5. Thought Process</strong></label>
                <select id="mse-thought-process">
                    <option value="">Select...</option>
                    <option value="Linear, logical, goal-directed">Linear, logical, goal-directed</option>
                    <option value="Tangential">Tangential</option>
                    <option value="Circumstantial">Circumstantial</option>
                    <option value="Flight of ideas">Flight of ideas</option>
                    <option value="Loose associations">Loose associations</option>
                    <option value="Perseveration">Perseveration</option>
                    <option value="Thought blocking">Thought blocking</option>
                </select>
            </div>
            
            <div class="calc-input-group">
                <label><strong>6. Thought Content</strong></label>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="mse-delusions"> Delusions</label>
                    <label><input type="checkbox" id="mse-suicidal"> Suicidal ideation</label>
                    <label><input type="checkbox" id="mse-homicidal"> Homicidal ideation</label>
                    <label><input type="checkbox" id="mse-paranoia"> Paranoia</label>
                    <label><input type="checkbox" id="mse-obsessions"> Obsessions</label>
                </div>
                <textarea id="mse-thought-content" placeholder="Additional details..." rows="2"></textarea>
            </div>
            
            <div class="calc-input-group">
                <label><strong>7. Perception</strong></label>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="mse-hallucinations-auditory"> Auditory hallucinations</label>
                    <label><input type="checkbox" id="mse-hallucinations-visual"> Visual hallucinations</label>
                    <label><input type="checkbox" id="mse-hallucinations-other"> Other hallucinations</label>
                    <label><input type="checkbox" id="mse-illusions"> Illusions</label>
                </div>
                <textarea id="mse-perception" placeholder="Additional details..." rows="2"></textarea>
            </div>
            
            <div class="calc-input-group">
                <label><strong>8. Cognition</strong></label>
                <select id="mse-orientation">
                    <option value="Oriented x3 (person, place, time)">Oriented x3 (person, place, time)</option>
                    <option value="Oriented x2">Oriented x2</option>
                    <option value="Oriented x1">Oriented x1</option>
                    <option value="Disoriented">Disoriented</option>
                </select>
                <select id="mse-memory" style="margin-top: 8px;">
                    <option value="Intact immediate, recent, remote memory">Intact immediate, recent, remote memory</option>
                    <option value="Impaired recent memory">Impaired recent memory</option>
                    <option value="Impaired remote memory">Impaired remote memory</option>
                    <option value="Global memory impairment">Global memory impairment</option>
                </select>
                <select id="mse-concentration" style="margin-top: 8px;">
                    <option value="Good concentration/attention">Good concentration/attention</option>
                    <option value="Mildly impaired">Mildly impaired concentration</option>
                    <option value="Moderately impaired">Moderately impaired concentration</option>
                    <option value="Severely impaired">Severely impaired concentration</option>
                </select>
            </div>
            
            <div class="calc-input-group">
                <label><strong>9. Insight</strong></label>
                <select id="mse-insight">
                    <option value="">Select...</option>
                    <option value="Good - recognizes illness, need for treatment">Good - recognizes illness, need for treatment</option>
                    <option value="Partial - some awareness of problems">Partial - some awareness of problems</option>
                    <option value="Poor - minimal awareness">Poor - minimal awareness</option>
                    <option value="Absent - denies illness completely">Absent - denies illness completely</option>
                </select>
            </div>
            
            <div class="calc-input-group">
                <label><strong>10. Judgment</strong></label>
                <select id="mse-judgment">
                    <option value="">Select...</option>
                    <option value="Good - able to make appropriate decisions">Good - able to make appropriate decisions</option>
                    <option value="Fair - some impairment in decision-making">Fair - some impairment in decision-making</option>
                    <option value="Poor - significant impairment">Poor - significant impairment</option>
                    <option value="Very poor - unable to make safe decisions">Very poor - unable to make safe decisions</option>
                </select>
            </div>
            
            <button onclick="window.quizApp.calculateMSE()">Generate MSE Summary</button>
            <div id="mse-result" class="calc-result"></div>
            <div class="calc-reference">
                <small><strong>Note:</strong> MSE is a comprehensive clinical interview documenting all aspects of mental status</small>
            </div>
        </div>
    `;

    },

    getMMSECalculator() {

    return `
        <div class="calculator-form">
            <h4>Mini Mental State Examination (MMSE)</h4>
            <p class="calc-description">Cognitive screening tool for dementia (Maximum score: 30)</p>
            
            <div class="calc-input-group">
                <label><strong>1. Orientation to Time (5 points)</strong></label>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="mmse-year"> Year (1 point)</label>
                    <label><input type="checkbox" id="mmse-season"> Season (1 point)</label>
                    <label><input type="checkbox" id="mmse-date"> Date (1 point)</label>
                    <label><input type="checkbox" id="mmse-day"> Day (1 point)</label>
                    <label><input type="checkbox" id="mmse-month"> Month (1 point)</label>
                </div>
            </div>
            
            <div class="calc-input-group">
                <label><strong>2. Orientation to Place (5 points)</strong></label>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="mmse-country"> Country (1 point)</label>
                    <label><input type="checkbox" id="mmse-county"> County (1 point)</label>
                    <label><input type="checkbox" id="mmse-town"> Town (1 point)</label>
                    <label><input type="checkbox" id="mmse-hospital"> Hospital (1 point)</label>
                    <label><input type="checkbox" id="mmse-floor"> Floor (1 point)</label>
                </div>
            </div>
            
            <div class="calc-input-group">
                <label><strong>3. Registration (3 points)</strong></label>
                <p style="font-size: 14px; margin: 5px 0;">Ask patient to repeat 3 words (e.g., "apple, table, penny")</p>
                <label>Number of words correctly repeated on first attempt:</label>
                <select id="mmse-registration">
                    <option value="3">3 words (3 points)</option>
                    <option value="2">2 words (2 points)</option>
                    <option value="1">1 word (1 point)</option>
                    <option value="0">0 words (0 points)</option>
                </select>
            </div>
            
            <div class="calc-input-group">
                <label><strong>4. Attention & Calculation (5 points)</strong></label>
                <p style="font-size: 14px; margin: 5px 0;">Serial 7s: 100-7, -7, -7, -7, -7 (93, 86, 79, 72, 65)<br>OR spell "WORLD" backwards (D-L-R-O-W)</p>
                <label>Number of correct answers:</label>
                <select id="mmse-attention">
                    <option value="5">5 correct (5 points)</option>
                    <option value="4">4 correct (4 points)</option>
                    <option value="3">3 correct (3 points)</option>
                    <option value="2">2 correct (2 points)</option>
                    <option value="1">1 correct (1 point)</option>
                    <option value="0">0 correct (0 points)</option>
                </select>
            </div>
            
            <div class="calc-input-group">
                <label><strong>5. Recall (3 points)</strong></label>
                <p style="font-size: 14px; margin: 5px 0;">Ask patient to recall the 3 words from Registration</p>
                <label>Number of words correctly recalled:</label>
                <select id="mmse-recall">
                    <option value="3">3 words (3 points)</option>
                    <option value="2">2 words (2 points)</option>
                    <option value="1">1 word (1 point)</option>
                    <option value="0">0 words (0 points)</option>
                </select>
            </div>
            
            <div class="calc-input-group">
                <label><strong>6. Naming (2 points)</strong></label>
                <p style="font-size: 14px; margin: 5px 0;">Show patient a watch and a pen, ask them to name each</p>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="mmse-naming-1"> Named first object (1 point)</label>
                    <label><input type="checkbox" id="mmse-naming-2"> Named second object (1 point)</label>
                </div>
            </div>
            
            <div class="calc-input-group">
                <label><strong>7. Repetition (1 point)</strong></label>
                <p style="font-size: 14px; margin: 5px 0;">Ask patient to repeat: "No ifs, ands, or buts"</p>
                <label><input type="checkbox" id="mmse-repetition"> Correctly repeated (1 point)</label>
            </div>
            
            <div class="calc-input-group">
                <label><strong>8. Three-Stage Command (3 points)</strong></label>
                <p style="font-size: 14px; margin: 5px 0;">"Take this paper in your right hand, fold it in half, and put it on the floor"</p>
                <div class="calc-checkbox-group">
                    <label><input type="checkbox" id="mmse-command-1"> Takes paper (1 point)</label>
                    <label><input type="checkbox" id="mmse-command-2"> Folds paper (1 point)</label>
                    <label><input type="checkbox" id="mmse-command-3"> Places on floor (1 point)</label>
                </div>
            </div>
            
            <div class="calc-input-group">
                <label><strong>9. Reading (1 point)</strong></label>
                <p style="font-size: 14px; margin: 5px 0;">Show patient "CLOSE YOUR EYES" and ask them to do what it says</p>
                <label><input type="checkbox" id="mmse-reading"> Closes eyes (1 point)</label>
            </div>
            
            <div class="calc-input-group">
                <label><strong>10. Writing (1 point)</strong></label>
                <p style="font-size: 14px; margin: 5px 0;">Ask patient to write a complete sentence</p>
                <label><input type="checkbox" id="mmse-writing"> Writes grammatically correct sentence (1 point)</label>
            </div>
            
            <div class="calc-input-group">
                <label><strong>11. Copying (1 point)</strong></label>
                <p style="font-size: 14px; margin: 5px 0;">Ask patient to copy two intersecting pentagons</p>
                <label><input type="checkbox" id="mmse-copying"> Correctly copies diagram (1 point)</label>
            </div>
            
            <button onclick="window.quizApp.calculateMMSE()">Calculate MMSE Score</button>
            <div id="mmse-result" class="calc-result"></div>
            <div class="calc-reference">
                <small><strong>Interpretation:</strong> 24-30 Normal | 18-23 Mild impairment | 10-17 Moderate | <10 Severe<br>
                <strong>Note:</strong> Adjust for age and education level. Not diagnostic alone - clinical judgment required.</small>
            </div>
        </div>
    `;

    },

    getInsulinSlidingCalculator() {

    return `
        <div class="calculator-form">
            <h4>Insulin Sliding Scale Calculator</h4>
            <div class="calc-input-group">
                <label>Current Blood Glucose (mmol/L):</label>
                <input type="number" id="insulin-glucose" placeholder="12.5" step="0.1" min="1" max="50">
            </div>
            <div class="calc-input-group">
                <label>Patient Weight (kg):</label>
                <input type="number" id="insulin-weight" placeholder="70" min="20" max="200">
            </div>
            <div class="calc-input-group">
                <label>Insulin Sensitivity:</label>
                <select id="insulin-sensitivity">
                    <option value="normal">Normal (0.5-1 unit/kg/day)</option>
                    <option value="resistant">Insulin resistant (>1 unit/kg/day)</option>
                    <option value="sensitive">Insulin sensitive (<0.5 unit/kg/day)</option>
                </select>
            </div>
            <div class="calc-checkbox-group">
                <label><input type="checkbox" id="insulin-critical"> Critically ill patient</label>
                <label><input type="checkbox" id="insulin-steroids"> On high-dose steroids</label>
            </div>
            <button onclick="window.quizApp.calculateInsulinSliding()">Calculate Insulin Dose</button>
            <div id="insulin-result" class="calc-result"></div>
            <div class="calc-reference">
                <small><strong>Target glucose:</strong> 6-10 mmol/L (general wards) | 6-8 mmol/L (critical care)</small>
            </div>
        </div>
    `;

    },

    getVasopressorCalculator() {

    return `
        <div class="calculator-form">
            <h4>Vasopressor Dosing Calculator</h4>
            <div class="calc-input-group">
                <label>Patient Weight (kg):</label>
                <input type="number" id="vaso-weight" placeholder="70" min="20" max="200">
            </div>
            <div class="calc-input-group">
                <label>Vasopressor:</label>
                <select id="vaso-drug">
                    <option value="noradrenaline">Noradrenaline</option>
                    <option value="adrenaline">Adrenaline</option>
                    <option value="dopamine">Dopamine</option>
                    <option value="dobutamine">Dobutamine</option>
                    <option value="vasopressin">Vasopressin</option>
                </select>
            </div>
            <div class="calc-input-group">
                <label>Target Dose (mcg/kg/min):</label>
                <input type="number" id="vaso-dose" placeholder="0.1" step="0.01" min="0.01" max="10">
            </div>
            <div class="calc-input-group">
                <label>Concentration (mg/ml):</label>
                <select id="vaso-concentration">
                    <option value="1">1 mg/ml (standard)</option>
                    <option value="4">4 mg/ml (concentrated)</option>
                    <option value="8">8 mg/ml (very concentrated)</option>
                </select>
            </div>
            <button onclick="window.quizApp.calculateVasopressor()">Calculate Infusion Rate</button>
            <div id="vaso-result" class="calc-result"></div>
            <div class="calc-reference">
                <small><strong>Typical ranges:</strong> Noradrenaline 0.01-3 mcg/kg/min | Adrenaline 0.01-1 mcg/kg/min</small>
            </div>
        </div>
    `;

    },

    getPaediatricDosingCalculator() {

    return `
        <div class="calculator-form">
            <h4>Paediatric Dosing Calculator</h4>
            <p><small>Weight-based pediatric drug dosing calculations</small></p>
            
            <div class="calc-input-group">
                <label>Child's Weight (kg):</label>
                <input type="number" id="paed-weight" placeholder="15" min="1" max="100" step="0.1">
            </div>
            <div class="calc-input-group">
                <label>Child's Age (years):</label>
                <input type="number" id="paed-age" placeholder="5" min="0" max="18" step="0.1">
            </div>
            <div class="calc-input-group">
                <label>Medication:</label>
                <select id="paed-medication">
                    <option value="">Select medication</option>
                    <option value="paracetamol">Paracetamol (Acetaminophen)</option>
                    <option value="ibuprofen">Ibuprofen</option>
                    <option value="amoxicillin">Amoxicillin</option>
                    <option value="prednisolone">Prednisolone</option>
                    <option value="salbutamol">Salbutamol</option>
                    <option value="azithromycin">Azithromycin</option>
                </select>
            </div>
            
            <button onclick="window.quizApp.calculatePaediatricDosing()">Calculate Dose</button>
            <div id="paed-dosing-result" class="calc-result"></div>
            
            <div class="calc-reference">
                <small><strong>Note:</strong> Always verify doses with current pediatric guidelines. For children under 3 months, seek specialist advice.</small>
            </div>
        </div>
    `;

    },

    getInfusionRateCalculator() {

    return `
        <div class="calculator-form">
            <h4>IV Infusion Rate Calculator</h4>
            <p><small>Calculate infusion rates for IV medications and fluids</small></p>
            
            <div class="calc-input-group">
                <label>Total Volume (ml):</label>
                <input type="number" id="infusion-volume" placeholder="1000" min="1" max="10000">
            </div>
            <div class="calc-input-group">
                <label>Infusion Time (hours):</label>
                <input type="number" id="infusion-time" placeholder="8" min="0.1" max="24" step="0.1">
            </div>
            <div class="calc-input-group">
                <label>Drop Factor (drops/ml):</label>
                <select id="drop-factor">
                    <option value="10">10 (Blood set)</option>
                    <option value="15">15 (Standard)</option>
                    <option value="20" selected>20 (Standard)</option>
                    <option value="60">60 (Micro-drip)</option>
                </select>
            </div>
            
            <button onclick="window.quizApp.calculateInfusionRate()">Calculate Rate</button>
            <div id="infusion-result" class="calc-result"></div>
            
            <div class="calc-reference">
                <small><strong>Formula:</strong> Rate (ml/hr) = Volume / Time; Drops/min = (Volume × Drop Factor) / (Time × 60)</small>
            </div>
        </div>
    `;

    },

    getCockcroftGaultCalculator() {

    return `
        <div class="calculator-form">
            <h4>Cockcroft-Gault eGFR Calculator</h4>
            <p><small>Estimate creatinine clearance based on age, weight, and serum creatinine</small></p>
            
            <div class="calc-input-group">
                <label>Age (years):</label>
                <input type="number" id="cg-age" placeholder="65" min="18" max="120">
            </div>
            <div class="calc-input-group">
                <label>Weight (kg):</label>
                <input type="number" id="cg-weight" placeholder="70" min="30" max="200" step="0.1">
            </div>
            <div class="calc-input-group">
                <label>Serum Creatinine (μmol/L):</label>
                <input type="number" id="cg-creatinine" placeholder="100" min="50" max="1000">
            </div>
            <div class="calc-checkbox-group">
                <label><input type="radio" name="cg-sex" value="male" checked> Male</label>
                <label><input type="radio" name="cg-sex" value="female"> Female</label>
            </div>
            
            <button onclick="window.quizApp.calculateCockcroftGault()">Calculate eGFR</button>
            <div id="cg-result" class="calc-result"></div>
            
            <div class="calc-reference">
                <small><strong>Formula:</strong> CrCl = ((140-age) × weight × K) / creatinine<br>
                K = 1.23 (male), 1.04 (female)</small>
            </div>
        </div>
    `;

    },

    getBSACalculator() {

    return `
        <div class="calculator-form">
            <h4>Body Surface Area Calculator</h4>
            <p><small>Calculate BSA using Dubois, Mosteller, and Haycock formulas</small></p>
            
            <div class="calc-input-group">
                <label>Weight (kg):</label>
                <input type="number" id="bsa-weight" placeholder="70" min="1" max="300" step="0.1">
            </div>
            <div class="calc-input-group">
                <label>Height (cm):</label>
                <input type="number" id="bsa-height" placeholder="170" min="50" max="250" step="0.1">
            </div>
            
            <button onclick="window.quizApp.calculateBSA()">Calculate BSA</button>
            <div id="bsa-result" class="calc-result"></div>
            
            <div class="calc-reference">
                <small><strong>Formulas:</strong><br>
                • Dubois: 0.007184 × W^0.425 × H^0.725<br>
                • Mosteller: √(W × H / 3600)<br>
                • Haycock: 0.024265 × W^0.5378 × H^0.3964</small>
            </div>
        </div>
    `;

    },

    getFluidBalanceCalculator() {

    return `
        <div class="calculator-form">
            <h4>Fluid Balance Calculator</h4>
            <p><small>Calculate daily fluid requirements and monitor fluid balance</small></p>
            
            <div class="calc-input-group">
                <label>Patient Weight (kg):</label>
                <input type="number" id="fluid-weight" placeholder="70" min="1" max="300" step="0.1">
            </div>
            <div class="calc-input-group">
                <label>Age (years):</label>
                <input type="number" id="fluid-age" placeholder="65" min="1" max="120">
            </div>
            <div class="calc-checkbox-group">
                <label><input type="checkbox" id="fluid-fever"> Fever (add 500ml per °C above 37°C)</label>
                <label><input type="checkbox" id="fluid-losses"> Abnormal losses (diarrhea, drains, etc.)</label>
                <label><input type="checkbox" id="fluid-heart-failure"> Heart failure (restrict fluids)</label>
                <label><input type="checkbox" id="fluid-renal"> Renal impairment</label>
            </div>
            <div class="calc-input-group">
                <label>Additional Losses (ml/day):</label>
                <input type="number" id="fluid-additional" placeholder="0" min="0" max="5000">
            </div>
            
            <button onclick="window.quizApp.calculateFluidBalance()">Calculate Requirements</button>
            <div id="fluid-result" class="calc-result"></div>
            
            <div class="calc-reference">
                <small><strong>Basic Formula:</strong> 30-35ml/kg/day for adults, 100ml/kg/day for infants</small>
            </div>
        </div>
    `;

    },

    getTIMICalculator() {

    return `
        <div class="calculator-form">
            <h4>TIMI Risk Score</h4>
            <p><small>Risk assessment for patients with acute coronary syndromes</small></p>
            
            <div class="calc-checkbox-group">
                <label><input type="checkbox" id="timi-age"> Age ≥65 years (+1)</label>
                <label><input type="checkbox" id="timi-risk-factors"> ≥3 CAD risk factors (+1)</label>
                <label><input type="checkbox" id="timi-known-cad"> Known CAD (stenosis ≥50%) (+1)</label>
                <label><input type="checkbox" id="timi-aspirin"> Aspirin use in prior 7 days (+1)</label>
                <label><input type="checkbox" id="timi-severe-angina"> Severe angina (≥2 episodes in 24h) (+1)</label>
                <label><input type="checkbox" id="timi-st-deviation"> ST deviation ≥0.5mm (+1)</label>
                <label><input type="checkbox" id="timi-cardiac-markers"> Elevated cardiac markers (+1)</label>
            </div>
            
            <button onclick="window.quizApp.calculateTIMI()">Calculate TIMI Score</button>
            <div id="timi-result" class="calc-result"></div>
            
            <div class="calc-reference">
                <small><strong>Risk factors:</strong> Family history, hypertension, hypercholesterolemia, diabetes, current smoker</small>
            </div>
        </div>
    `;

    },

    getNIHSSCalculator() {

    return `
        <div class="calculator-form">
            <h4>NIH Stroke Scale (NIHSS)</h4>
            <p><small>Neurological assessment for acute stroke severity</small></p>
            
            <div class="calc-input-group">
                <label>1a. Level of Consciousness:</label>
                <select id="nihss-loc">
                    <option value="0">Alert, responsive (0)</option>
                    <option value="1">Not alert, arousable (1)</option>
                    <option value="2">Not alert, requires stimulation (2)</option>
                    <option value="3">Unresponsive (3)</option>
                </select>
            </div>
            <div class="calc-input-group">
                <label>1b. LOC Questions (month, age):</label>
                <select id="nihss-questions">
                    <option value="0">Answers both correctly (0)</option>
                    <option value="1">Answers 1 correctly (1)</option>
                    <option value="2">Answers neither correctly (2)</option>
                </select>
            </div>
            <div class="calc-input-group">
                <label>1c. LOC Commands (open/close eyes, grip):</label>
                <select id="nihss-commands">
                    <option value="0">Performs both correctly (0)</option>
                    <option value="1">Performs 1 correctly (1)</option>
                    <option value="2">Performs neither correctly (2)</option>
                </select>
            </div>
            <div class="calc-input-group">
                <label>2. Best Gaze:</label>
                <select id="nihss-gaze">
                    <option value="0">Normal (0)</option>
                    <option value="1">Partial gaze palsy (1)</option>
                    <option value="2">Forced deviation (2)</option>
                </select>
            </div>
            <div class="calc-input-group">
                <label>3. Visual Fields:</label>
                <select id="nihss-visual">
                    <option value="0">No visual loss (0)</option>
                    <option value="1">Partial hemianopia (1)</option>
                    <option value="2">Complete hemianopia (2)</option>
                    <option value="3">Bilateral hemianopia (3)</option>
                </select>
            </div>
            <div class="calc-input-group">
                <label>4. Facial Palsy:</label>
                <select id="nihss-facial">
                    <option value="0">Normal (0)</option>
                    <option value="1">Minor paralysis (1)</option>
                    <option value="2">Partial paralysis (2)</option>
                    <option value="3">Complete paralysis (3)</option>
                </select>
            </div>
            <div class="calc-input-group">
                <label>5a. Motor Arm - Left:</label>
                <select id="nihss-arm-left">
                    <option value="0">No drift (0)</option>
                    <option value="1">Drift (1)</option>
                    <option value="2">Some effort against gravity (2)</option>
                    <option value="3">No effort against gravity (3)</option>
                    <option value="4">No movement (4)</option>
                    <option value="9">Amputation/joint fusion (9)</option>
                </select>
            </div>
            <div class="calc-input-group">
                <label>5b. Motor Arm - Right:</label>
                <select id="nihss-arm-right">
                    <option value="0">No drift (0)</option>
                    <option value="1">Drift (1)</option>
                    <option value="2">Some effort against gravity (2)</option>
                    <option value="3">No effort against gravity (3)</option>
                    <option value="4">No movement (4)</option>
                    <option value="9">Amputation/joint fusion (9)</option>
                </select>
            </div>
            <div class="calc-input-group">
                <label>6a. Motor Leg - Left:</label>
                <select id="nihss-leg-left">
                    <option value="0">No drift (0)</option>
                    <option value="1">Drift (1)</option>
                    <option value="2">Some effort against gravity (2)</option>
                    <option value="3">No effort against gravity (3)</option>
                    <option value="4">No movement (4)</option>
                    <option value="9">Amputation/joint fusion (9)</option>
                </select>
            </div>
            <div class="calc-input-group">
                <label>6b. Motor Leg - Right:</label>
                <select id="nihss-leg-right">
                    <option value="0">No drift (0)</option>
                    <option value="1">Drift (1)</option>
                    <option value="2">Some effort against gravity (2)</option>
                    <option value="3">No effort against gravity (3)</option>
                    <option value="4">No movement (4)</option>
                    <option value="9">Amputation/joint fusion (9)</option>
                </select>
            </div>
            <div class="calc-input-group">
                <label>7. Limb Ataxia:</label>
                <select id="nihss-ataxia">
                    <option value="0">Absent (0)</option>
                    <option value="1">Present in one limb (1)</option>
                    <option value="2">Present in two limbs (2)</option>
                    <option value="9">Unable to test (9)</option>
                </select>
            </div>
            <div class="calc-input-group">
                <label>8. Sensory:</label>
                <select id="nihss-sensory">
                    <option value="0">Normal (0)</option>
                    <option value="1">Mild-moderate loss (1)</option>
                    <option value="2">Severe/total loss (2)</option>
                </select>
            </div>
            <div class="calc-input-group">
                <label>9. Best Language:</label>
                <select id="nihss-language">
                    <option value="0">No aphasia (0)</option>
                    <option value="1">Mild-moderate aphasia (1)</option>
                    <option value="2">Severe aphasia (2)</option>
                    <option value="3">Mute/global aphasia (3)</option>
                </select>
            </div>
            <div class="calc-input-group">
                <label>10. Dysarthria:</label>
                <select id="nihss-dysarthria">
                    <option value="0">Normal (0)</option>
                    <option value="1">Mild-moderate (1)</option>
                    <option value="2">Severe (2)</option>
                    <option value="9">Intubated/unable to test (9)</option>
                </select>
            </div>
            <div class="calc-input-group">
                <label>11. Extinction/Inattention:</label>
                <select id="nihss-extinction">
                    <option value="0">No abnormality (0)</option>
                    <option value="1">Visual/tactile/auditory extinction (1)</option>
                    <option value="2">Profound hemi-inattention (2)</option>
                </select>
            </div>
            
            <button onclick="window.quizApp.calculateNIHSS()">Calculate NIHSS Score</button>
            <div id="nihss-result" class="calc-result"></div>
            
            <div class="calc-reference">
                <small><strong>Interpretation:</strong> 0 = Normal, 1-4 = Minor, 5-15 = Moderate, 16-20 = Moderate-severe, 21-42 = Severe</small>
            </div>
        </div>
    `;

    },

    getModifiedRankinCalculator() {

    return `
        <div class="calculator-form">
            <h4>Modified Rankin Scale</h4>
            <p><small>Assessment of functional disability after stroke</small></p>
            
            <div class="calc-input-group">
                <label>Patient Functional Status:</label>
                <select id="rankin-score">
                    <option value="0">0 - No symptoms</option>
                    <option value="1">1 - No significant disability (minor symptoms)</option>
                    <option value="2">2 - Slight disability (unable to do all previous activities)</option>
                    <option value="3">3 - Moderate disability (requires some help, walks unassisted)</option>
                    <option value="4">4 - Moderately severe disability (unable to walk unassisted)</option>
                    <option value="5">5 - Severe disability (requires constant care, bedridden)</option>
                    <option value="6">6 - Dead</option>
                </select>
            </div>
            
            <button onclick="window.quizApp.calculateModifiedRankin()">Assess Functional Status</button>
            <div id="rankin-result" class="calc-result"></div>
            
            <div class="calc-reference">
                <small><strong>Used for:</strong> Measuring degree of disability/dependence in daily activities. Lower scores indicate better outcomes.</small>
            </div>
        </div>
    `;

    },

    getRASSCalculator() {

    return `
        <div class="calculator-form">
            <h4>Richmond Agitation-Sedation Scale (RASS)</h4>
            <p><small>Assessment of sedation and agitation levels in critically ill patients</small></p>
            
            <div class="calc-input-group">
                <label>Patient's Current State:</label>
                <select id="rass-level">
                    <option value="+4">+4 - Combative (violent, immediate danger)</option>
                    <option value="+3">+3 - Very agitated (pulls/removes tubes, aggressive)</option>
                    <option value="+2">+2 - Agitated (frequent non-purposeful movement)</option>
                    <option value="+1">+1 - Restless (anxious, apprehensive, not aggressive)</option>
                    <option value="0" selected>0 - Alert and calm</option>
                    <option value="-1">-1 - Drowsy (not fully alert, sustained awakening to voice)</option>
                    <option value="-2">-2 - Light sedation (briefly awakens to voice <10 sec)</option>
                    <option value="-3">-3 - Moderate sedation (movement/eye opening to voice, no eye contact)</option>
                    <option value="-4">-4 - Deep sedation (no response to voice, movement to physical stimulation)</option>
                    <option value="-5">-5 - Unarousable (no response to voice or physical stimulation)</option>
                </select>
            </div>
            
            <button onclick="window.quizApp.calculateRASS()">Assess RASS Level</button>
            <div id="rass-result" class="calc-result"></div>
            
            <div class="calc-reference">
                <small>
                    <strong>Assessment:</strong><br>
                    • +4 to +1: Agitation states<br>
                    • 0: Alert and calm (target for most patients)<br>
                    • -1 to -3: Varying levels of sedation<br>
                    • -4 to -5: Deep sedation/unconscious<br>
                    <strong>Target:</strong> Usually 0 to -2 for mechanically ventilated patients
                </small>
            </div>
        </div>
    `;

    },

    getFractureRiskCalculator() {

    return `
        <div class="calculator-form">
            <h4>FRAX Fracture Risk Assessment</h4>
            <p><small>10-year probability of major osteoporotic fracture (UK version)</small></p>
            
            <div class="calc-input-group">
                <label>Age (years):</label>
                <input type="number" id="frax-age" placeholder="65" min="40" max="90">
            </div>
            <div class="calc-checkbox-group">
                <label><input type="radio" name="frax-sex" value="female"> Female</label>
                <label><input type="radio" name="frax-sex" value="male"> Male</label>
            </div>
            <div class="calc-input-group">
                <label>Weight (kg):</label>
                <input type="number" id="frax-weight" placeholder="70" min="25" max="125">
            </div>
            <div class="calc-input-group">
                <label>Height (cm):</label>
                <input type="number" id="frax-height" placeholder="160" min="100" max="220">
            </div>
            
            <h5>Risk Factors:</h5>
            <div class="calc-checkbox-group">
                <label><input type="checkbox" id="frax-previous-fracture"> Previous fracture after age 50</label>
                <label><input type="checkbox" id="frax-parent-fracture"> Parent fractured hip</label>
                <label><input type="checkbox" id="frax-smoking"> Current smoking</label>
                <label><input type="checkbox" id="frax-steroids"> Glucocorticoids (≥3 months)</label>
                <label><input type="checkbox" id="frax-ra"> Rheumatoid arthritis</label>
                <label><input type="checkbox" id="frax-secondary"> Secondary osteoporosis</label>
                <label><input type="checkbox" id="frax-alcohol"> Alcohol 3+ units daily</label>
            </div>
            
            <div class="calc-input-group">
                <label>Femoral neck BMD T-score (optional):</label>
                <input type="number" id="frax-bmd" placeholder="-2.5" min="-5" max="3" step="0.1">
                <small>Leave blank if unknown</small>
            </div>
            
            <button onclick="window.quizApp.calculateFractureRisk()">Calculate Fracture Risk</button>
            <div id="frax-result" class="calc-result"></div>
            
            <div class="calc-reference">
                <small>
                    <strong>Intervention thresholds (NICE):</strong><br>
                    • Major osteoporotic fracture: ≥10% (consider treatment)<br>
                    • Hip fracture: ≥3% (consider treatment)<br>
                    <strong>Note:</strong> This is a simplified assessment. Use official FRAX tool for clinical decisions.
                </small>
            </div>
        </div>
    `;

    },

    getAnionGapCalculator() {

    return `
        <div class="calculator-form">
            <h4>Anion Gap Calculator</h4>
            <p><small>Calculate serum anion gap from basic metabolic panel</small></p>
            
            <div class="calc-input-group">
                <label>Sodium (Na+) mEq/L:</label>
                <input type="number" id="ag-sodium" placeholder="140" step="0.1" min="120" max="160">
                <small>Normal: 136-145 mEq/L</small>
            </div>
            <div class="calc-input-group">
                <label>Chloride (Cl-) mEq/L:</label>
                <input type="number" id="ag-chloride" placeholder="103" step="0.1" min="90" max="120">
                <small>Normal: 98-107 mEq/L</small>
            </div>
            <div class="calc-input-group">
                <label>Bicarbonate (HCO3-) mEq/L:</label>
                <input type="number" id="ag-bicarbonate" placeholder="24" step="0.1" min="10" max="35">
                <small>Normal: 22-28 mEq/L</small>
            </div>
            
            <button onclick="window.quizApp.calculateAnionGap()">Calculate Anion Gap</button>
            <div id="anion-gap-result" class="calc-result"></div>
            
            <div class="calc-reference">
                <h5>Reference Values:</h5>
                <ul>
                    <li><strong>Normal:</strong> 8-12 mEq/L</li>
                    <li><strong>High Anion Gap (>12):</strong> Metabolic acidosis</li>
                    <li><strong>Low Anion Gap (<8):</strong> Rare, check for errors</li>
                </ul>
                <h5>High Anion Gap Causes (MUDPILES):</h5>
                <ul>
                    <li><strong>M</strong>ethanol</li>
                    <li><strong>U</strong>remia</li>
                    <li><strong>D</strong>iabetic ketoacidosis</li>
                    <li><strong>P</strong>aracetamol/Paraldehyde</li>
                    <li><strong>I</strong>soniazid/Iron</li>
                    <li><strong>L</strong>actic acidosis</li>
                    <li><strong>E</strong>thylene glycol</li>
                    <li><strong>S</strong>alicylates</li>
                </ul>
            </div>
        </div>
    `;

    },

    calculateReportData() {

        const totalQuestions = Object.keys(this.submittedAnswers).length;
        let correctAnswers = 0;
        
        Object.keys(this.submittedAnswers).forEach(questionId => {
            const question = this.questions.find(q => q.id == questionId);
            if (question && this.submittedAnswers[questionId] === question.correct_answer) {
                correctAnswers++;
            }
        });
        
        const incorrectAnswers = totalQuestions - correctAnswers;
        const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
        
        return {
            quizName: this.quizName,
            totalQuestions,
            correctAnswers,
            incorrectAnswers,
            accuracy,
            totalTime: this.sessionStats.totalTime,
            averageTime: this.sessionStats.averageTimePerQuestion,
            questionsAnswered: this.sessionStats.questionsAnswered,
            date: new Date().toLocaleDateString(),
            incorrectQuestionsList: this.getIncorrectQuestions(),
            answeredQuestionsList: (function(){
                const answered = [];
                Object.keys(this.submittedAnswers).forEach(questionId => {
                    const question = this.questions.find(q => q.id == questionId);
                    if (question) {
                        const questionIndex = this.questions.findIndex(q => q.id == questionId);
                        answered.push({
                            index: questionIndex,
                            question: question,
                            yourAnswer: this.submittedAnswers[questionId],
                            correctAnswer: question.correct_answer
                        });
                    }
                }, this);
                return answered;
            }).call(this),
            timePerQuestion: this.questionTimes
        };

    },

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

    },

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

    },

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

    },

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
                recommendation = 'Consider anticoagulation (men ≥1 or women ≥2 with non-sex risk factors)';
                color = '#FF9800';
            }
        } else {
            // Score ≥2
            risk = 'High risk (≥2.2%/year)';
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

    },

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

    },

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

    },

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
        
        // Oxygenation scoring (PaO2 if FiO2 ≥50%, A-a gradient if FiO2 <50%)
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
        scoreBreakdown.push(`WBC (${wbc} ×10³/μL): ${wbcScore} points`);
        
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
            mortality = '≥55%';
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

    },

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
            probability = 'Low probability (≤4)';
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

    },

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

        console.log('🔍 QRISK3 Input:', qriskInput);

        let risk = null;
        let usingOfficialLibrary = false;

        // Try to use the official QRISK3 library
        if (window.qrisk3 && typeof window.qrisk3.calculateScore === 'function') {
            try {
                risk = window.qrisk3.calculateScore(qriskInput);
                usingOfficialLibrary = true;
                console.log('✅ Used official QRISK3 library, result:', risk);
            } catch (error) {
                console.warn('❌ Official QRISK3 library failed:', error);
                risk = null;
            }
        } else {
            console.warn('⚠️ Official QRISK3 library not available');
        }

        // Fallback to simplified calculation if official library not available
        if (risk === null) {
            risk = this.calculateQRISKFallback(qriskInput);
            console.log('🔄 Used fallback calculation, result:', risk);
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
            riskLevel = 'High risk (≥20%)';
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
                            '✅ Official QRISK3 algorithm (sisuhealthgroup implementation)' : 
                            '⚠️ Simplified approximation - use official tool for clinical decisions'
                        }<br>
                        <strong>Reference:</strong> NICE NG238 (2023) - Cardiovascular disease: risk assessment and reduction
                    </small>
                </div>
            </div>
        `;

    },

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

    },

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

    },

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

    },

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
            mortality = '≥14% 30-day mortality';
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

    },

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

    },

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

    },

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

    },

    calculateEGFR() {

        const age = parseInt(document.getElementById('egfr-age').value);
        const sex = document.querySelector('input[name="egfr-sex"]:checked')?.value;
        const creatinine = parseFloat(document.getElementById('egfr-creatinine').value);
        
        if (!age || !sex || !creatinine) {
            document.getElementById('egfr-result').innerHTML = '<p class="error">Please fill in all fields</p>';
            return;
        }
        
        // Convert μmol/L to mg/dL
        const creatinine_mg = creatinine * 0.0113;
        
        // CKD-EPI 2021 equation (race-neutral) - NIDDK
        // 142 × min(Scr/κ,1)^α × max(Scr/κ,1)^−1.200 × 0.9938^Age × (×1.012 if female)
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

    },

    calculateUreaCreatinine() {

        const urea = parseFloat(document.getElementById('urea-value').value);
        const creatinine = parseFloat(document.getElementById('creatinine-value').value);
        
        if (!urea || !creatinine) {
            document.getElementById('urea-creatinine-result').innerHTML = 
                '<div class="calc-error"><strong>Please enter both urea and creatinine values</strong></div>';
            return;
        }
        
        // Calculate urea:creatinine ratio (UK standard: both in mmol/L)
        // Convert creatinine from μmol/L to mmol/L for ratio calculation
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
            additionalNotes += '⚠️ Significantly elevated urea - consider urgent nephrology review. ';
        }
        if (creatinine > 300) {
            additionalNotes += '⚠️ Severely elevated creatinine - may require acute dialysis. ';
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
                    <strong>Values:</strong> Urea ${urea} mmol/L | Creatinine ${creatinine} μmol/L<br>
                    <em>Always interpret alongside eGFR, clinical history, and AKI staging (KDIGO criteria)</em>
                </div>
            </div>
        `;

    },

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
                    All suspected TIA → same-day specialist assessment (within 24h)
                </div>
                <div style="margin-top: 6px; font-size: 0.85em; color: #666;">
                    Current UK guidance: ABCD² used for stroke risk stratification, not triage timing
                </div>
            </div>
        `;

    },

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

    },

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

    },

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
                '<div style="color: #ff9800; padding: 10px; background: #fff3e0; border-radius: 4px;">⚠️ Warning: Dose and stock units should match (both mass units, units, or mmol)</div>';
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
            practicality = '⚠️ Very small volume - difficult to draw up accurately. Consider alternative concentration.';
            warningClass = 'drug-warning-orange';
        } else if (volumeToDraw < 0.5) {
            practicality = '⚠️ Small volume - use 1ml syringe for accuracy';
            warningClass = 'drug-warning-orange';
        } else if (volumeToDraw > 20) {
            practicality = '⚠️ Large volume - may need to give as infusion or split into multiple injections';
            warningClass = 'drug-warning-orange';
        } else if (volumeToDraw > 50) {
            practicality = '⚠️ Very large volume - definitely give as infusion, check calculation';
            warningClass = 'drug-warning-red';
        } else {
            practicality = '✓ Practical volume to draw up';
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

    },

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

    },

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
            mortality = '≥27% 30-day mortality';
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

    },

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

    },

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
                    <p><strong>✓ PE can be excluded</strong></p>
                    <p>No further testing for PE required (no D-dimer, no CTPA)</p>
                    <p><small>⚠️ Only valid in LOW risk patients (pre-test probability <15%)</small></p>
                </div>
            `;
        } else {
            interpretation = `
                <div class="calc-warning">
                    <h4>PERC Rule: POSITIVE (${positiveCount}/8 criteria present)</h4>
                    <p><strong>⚠ Cannot exclude PE with PERC</strong></p>
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

    },

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

    },

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
            interpretation = '<strong>⚠️ SEVERELY PROLONGED</strong><br>High risk of Torsades de Pointes<br>Review medications, check electrolytes (K⁺, Mg²⁺, Ca²⁺)';
            cssClass = 'calc-error';
        } else if (qtc > 470) {
            interpretation = '<strong>⚠️ PROLONGED</strong><br>Increased arrhythmia risk<br>Review medications and electrolytes';
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

    },

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
            interpretation = '<strong>⚠️ Severe hyponatremia</strong><br>Risk of seizures/coma - urgent treatment needed';
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
            interpretation = '<strong>⚠️ Severe hypernatremia</strong><br>Risk of cerebral damage - treat urgently';
            cssClass = 'calc-error';
        }

        document.getElementById('corr-na-result').innerHTML = `
            <div class="${cssClass}">
                <h4>Corrected Sodium: ${correctedNa.toFixed(1)} mmol/L</h4>
                <p><small>Measured: ${measuredNa} mmol/L | Glucose: ${glucose} mmol/L</small></p>
                <p>${interpretation}</p>
            </div>
        `;

    },

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
            interpretation = '<strong>⚠️ Significantly elevated gap</strong><br>Strongly suggests toxic alcohol ingestion:<br>• Methanol<br>• Ethylene glycol<br>• Isopropanol<br>• Ethanol (if intoxicated)<br>• Propylene glycol<br><br>Check blood gases, lactate, and consider toxicology';
            cssClass = 'calc-error';
        }

        document.getElementById('osmolal-result').innerHTML = `
            <div class="${cssClass}">
                <h4>Osmolal Gap: ${gap.toFixed(1)} mOsm/kg</h4>
                <p><small>Calculated: ${calculated.toFixed(1)} | Measured: ${measured}</small></p>
                <p>${interpretation}</p>
            </div>
        `;

    },

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

    },

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
            management = '<strong>⚠️ Probable appendicitis</strong><br>Urgent surgical consultation<br>Imaging may not be necessary';
            cssClass = 'calc-error';
        }

        document.getElementById('alvarado-result').innerHTML = `
            <div class="${cssClass}">
                <h4>Alvarado Score: ${score}/10 points</h4>
                <p><strong>Risk: ${risk}</strong></p>
                <p>${management}</p>
            </div>
        `;

    },

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
            management = '<strong>✓ Safe for outpatient management</strong><br>No intervention likely needed<br>Outpatient follow-up appropriate';
            cssClass = 'calc-success';
        } else if (score <= 5) {
            risk = 'Low-Moderate';
            management = '<strong>Consider admission</strong><br>Monitor closely<br>May not require endoscopic intervention';
            cssClass = 'calc-warning';
        } else {
            risk = 'High';
            management = '<strong>⚠️ Admit for intervention</strong><br>High risk of needing transfusion or endoscopic therapy<br>Urgent gastroenterology referral';
            cssClass = 'calc-error';
        }

        document.getElementById('gbs-result').innerHTML = `
            <div class="${cssClass}">
                <h4>Glasgow-Blatchford Score: ${score} points</h4>
                <p><strong>Risk: ${risk}</strong></p>
                <p>${management}</p>
            </div>
        `;

    },

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
            interpretation = '<strong>⚠️ Moderate depression</strong><br>Stimulation and O₂ may be needed<br>Monitor closely';
            cssClass = 'calc-warning';
        } else {
            interpretation = '<strong>⚠️ SEVERE DEPRESSION</strong><br>Immediate resuscitation required<br>Call for senior support';
            cssClass = 'calc-error';
        }

        document.getElementById('apgar-result').innerHTML = `
            <div class="${cssClass}">
                <h4>APGAR Score: ${score}/10</h4>
                <p>${interpretation}</p>
                <p><small>Remember: Assess at 1 and 5 minutes (continue q5min if <7)</small></p>
            </div>
        `;

    },

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

    },

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
            interpretation = '<strong>⚠️ Critical hypotension</strong><br>Risk of end-organ hypoperfusion<br>Urgent intervention required';
            cssClass = 'calc-error';
        } else if (map < 65) {
            interpretation = '<strong>⚠️ Hypotension</strong><br>Below target for sepsis/critical illness<br>Consider fluid resuscitation/vasopressors';
            cssClass = 'calc-warning';
        } else if (map <= 100) {
            interpretation = '<strong>Normal MAP</strong><br>Adequate tissue perfusion';
            cssClass = 'calc-success';
        } else {
            interpretation = '<strong>⚠️ Elevated MAP</strong><br>Hypertensive - assess BP control';
            cssClass = 'calc-warning';
        }

        document.getElementById('map-result').innerHTML = `
            <div class="${cssClass}">
                <h4>MAP: ${map.toFixed(0)} mmHg</h4>
                <p><small>BP: ${sbp}/${dbp} mmHg</small></p>
                <p>${interpretation}</p>
            </div>
        `;

    },

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
            interpretation = '<strong>Normal A-a gradient</strong><br>Hypoxemia likely due to:<br>• Hypoventilation<br>• Low inspired O₂<br>• High altitude';
            cssClass = 'calc-success';
        } else {
            interpretation = `<strong>⚠️ Elevated A-a gradient</strong><br>Expected for age: ${expectedGradient.toFixed(1)} kPa<br><br>Causes:<br>• V/Q mismatch (PE, pneumonia, COPD)<br>• Shunt (pneumonia, pulmonary edema)<br>• Diffusion defect (ILD, pulmonary fibrosis)`;
            cssClass = 'calc-warning';
        }

        document.getElementById('aa-result').innerHTML = `
            <div class="${cssClass}">
                <h4>A-a Gradient: ${aaGradient.toFixed(1)} kPa</h4>
                <p><small>PAO₂: ${pao2Alveolar.toFixed(1)} kPa | PaO₂: ${pao2} kPa</small></p>
                <p>${interpretation}</p>
            </div>
        `;

    },

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
            interpretation = '<strong>⚠️ Severe hypocalcemia</strong><br>Risk of tetany, seizures, arrhythmias<br>Check PTH, vitamin D, Mg²⁺<br>Consider IV calcium';
            cssClass = 'calc-error';
        } else if (correctedCa < 2.20) {
            interpretation = '<strong>Hypocalcemia</strong><br>Investigate cause: PTH, vitamin D, renal function<br>Consider oral calcium/vitamin D';
            cssClass = 'calc-warning';
        } else if (correctedCa <= 2.60) {
            interpretation = '<strong>Normal corrected calcium</strong>';
            cssClass = 'calc-success';
        } else if (correctedCa <= 3.00) {
            interpretation = '<strong>⚠️ Hypercalcemia</strong><br>Investigate: PTH, vitamin D, malignancy screen<br>Ensure adequate hydration';
            cssClass = 'calc-warning';
        } else {
            interpretation = '<strong>⚠️ SEVERE HYPERCALCEMIA</strong><br>Medical emergency<br>• IV fluids 4-6 L/day<br>• Bisphosphonates<br>• Treat underlying cause<br>• Monitor ECG';
            cssClass = 'calc-error';
        }

        document.getElementById('ca-result').innerHTML = `
            <div class="${cssClass}">
                <h4>Corrected Calcium: ${correctedCa.toFixed(2)} mmol/L</h4>
                <p><small>Measured: ${measuredCa} mmol/L | Albumin: ${albumin} g/L</small></p>
                <p>${interpretation}</p>
            </div>
        `;

    },

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
                    <h4>⚠️ Friedewald Equation Invalid</h4>
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
            interpretation = '<strong>⚠️ Above target</strong><br>Consider lifestyle modification ± statin';
            cssClass = 'calc-warning';
        } else {
            interpretation = '<strong>⚠️ High LDL</strong><br>Significant CVD risk<br>Lifestyle modification + statin indicated';
            cssClass = 'calc-error';
        }

        document.getElementById('ldl-result').innerHTML = `
            <div class="${cssClass}">
                <h4>LDL Cholesterol: ${ldl.toFixed(1)} mmol/L</h4>
                <p><small>Non-HDL: ${nonHDL.toFixed(1)} mmol/L | HDL: ${hdl} mmol/L</small></p>
                <p>${interpretation}</p>
            </div>
        `;

    },

    calculateWinters() {

        const hco3 = parseFloat(document.getElementById('winters-hco3').value) || 0;
        const actualPco2 = parseFloat(document.getElementById('winters-pco2').value);

        if (hco3 === 0) {
            document.getElementById('winters-result').innerHTML = 
                '<div class="calc-error"><strong>Please enter HCO₃⁻ value</strong></div>';
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
                    <p><strong>✓ Appropriate respiratory compensation</strong></p>
                    <p>Actual pCO₂ (${actualPco2.toFixed(1)} kPa) matches expected range</p>
                    <p>Pure metabolic acidosis with compensation</p>
                `;
                cssClass = 'calc-success';
            } else if (actualPco2 > upperLimit) {
                comparison = `
                    <p><strong>⚠️ Concomitant respiratory acidosis</strong></p>
                    <p>Actual pCO₂ (${actualPco2.toFixed(1)} kPa) higher than expected</p>
                    <p>Mixed metabolic and respiratory acidosis</p>
                `;
                cssClass = 'calc-warning';
            } else {
                comparison = `
                    <p><strong>⚠️ Concomitant respiratory alkalosis</strong></p>
                    <p>Actual pCO₂ (${actualPco2.toFixed(1)} kPa) lower than expected</p>
                    <p>Mixed disorder or over-compensation</p>
                `;
                cssClass = 'calc-warning';
            }
        }

        document.getElementById('winters-result').innerHTML = `
            <div class="${cssClass}">
                <h4>Expected pCO₂: ${expectedPco2.toFixed(1)} kPa</h4>
                <p><small>Expected range: ${lowerLimit.toFixed(1)} - ${upperLimit.toFixed(1)} kPa</small></p>
                <p><small>HCO₃⁻: ${hco3} mmol/L</small></p>
                ${comparison}
            </div>
        `;

    },

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
            severity = '🚨 LIFE-THREATENING ASTHMA';
            cssClass = 'calc-error';
            urgency = '⚠️ IMMEDIATE ACTION REQUIRED';
            management = `
                <strong>Immediate Management:</strong>
                <ul style="margin-top: 10px; text-align: left;">
                    <li><strong>Call for senior help immediately</strong></li>
                    <li><strong>High-flow oxygen 15L/min</strong> (target SpO₂ 94-98%)</li>
                    <li><strong>Salbutamol 5mg nebulised</strong> continuously or back-to-back</li>
                    <li><strong>Ipratropium 500mcg nebulised</strong></li>
                    <li><strong>Hydrocortisone 100mg IV</strong> or prednisolone 40-50mg PO</li>
                    <li><strong>Magnesium sulphate 1.2-2g IV</strong> over 20 minutes</li>
                    <li>Consider <strong>IV salbutamol</strong> (ICU setting)</li>
                    <li>Prepare for <strong>intubation</strong> if deteriorating</li>
                    <li><strong>ICU referral</strong></li>
                </ul>
                <p style="margin-top: 10px;"><strong>Monitor:</strong> Continuous SpO₂, ECG, repeat ABG</p>
            `;
        } else if (acuteSevere) {
            severity = '⚠️ ACUTE SEVERE ASTHMA';
            cssClass = 'calc-warning';
            urgency = 'Urgent treatment required';
            management = `
                <strong>Urgent Management:</strong>
                <ul style="margin-top: 10px; text-align: left;">
                    <li><strong>High-flow oxygen</strong> (target SpO₂ 94-98%)</li>
                    <li><strong>Salbutamol 5mg nebulised</strong> (repeat every 15-30 min if needed)</li>
                    <li><strong>Ipratropium 500mcg nebulised</strong> (4-6 hourly)</li>
                    <li><strong>Prednisolone 40-50mg PO</strong> or hydrocortisone 100mg IV</li>
                    <li>Consider <strong>magnesium sulphate 1.2-2g IV</strong> if poor response</li>
                    <li>Senior review if not responding within 15-30 minutes</li>
                </ul>
                <p style="margin-top: 10px;"><strong>Monitor:</strong> SpO₂, PEFR every 15-30min, repeat assessment</p>
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
                <p style="margin-top: 10px;"><strong>Monitor:</strong> Clinical response, PEFR, SpO₂</p>
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
        if (pulse110) features.push('Pulse ≥110 bpm');
        if (rr25) features.push('RR ≥25/min');
        if (pulsusParadoxus) features.push('Pulsus paradoxus');
        if (silentChest) features.push('Silent chest');
        if (cyanosis) features.push('Cyanosis');
        if (exhaustion) features.push('Exhaustion/confusion');
        if (bradycardia) features.push('Bradycardia/arrhythmia');
        if (pefr) features.push(`PEFR ${pefr}%`);
        if (spo2) features.push(`SpO₂ ${spo2}%`);
        
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

    },

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
        // ⚠️ CRITICAL: Patch conversions are per mcg/hr, NOT total daily dose
        const toMorphineFactors = {
            'morphine-oral': 1,
            'morphine-sc': 2,  // SC morphine is twice as potent as oral
            'oxycodone-oral': 1.5,  // Oxycodone 1mg = 1.5mg morphine
            'fentanyl-patch': 2.4,  // UK: Fentanyl 12 mcg/hr ≈ 30-45mg OME/day → ~2.4-3.75 mg per mcg/hr
            'codeine': 0.1,  // Codeine 10mg = 1mg morphine
            'tramadol': 0.1,  // Tramadol 10mg = 1mg morphine
            'buprenorphine-patch': 2.4  // UK: Buprenorphine 5 mcg/hr ≈ 12mg OME/day → ~2.4 mg per mcg/hr
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

        let dosageForm = '';
        let administration = '';
        let frequency = '';

        switch (targetOpioid) {
            case 'morphine-oral':
                dosageForm = 'mg oral';
                administration = 'Give as modified-release BD or immediate-release 4-hourly';
                frequency = reducedTargetDose <= 30 ? '5-10mg 4-hourly PRN' : Math.round(reducedTargetDose/6) + 'mg 4-hourly PRN';
                break;
            case 'morphine-sc':
                dosageForm = 'mg subcutaneous';
                administration = 'Via syringe driver over 24 hours or divided into 4-6 hourly doses';
                frequency = Math.round(reducedTargetDose/6) + 'mg SC PRN (1/6 of daily dose)';
                break;
            case 'oxycodone-oral':
                dosageForm = 'mg oral';
                administration = 'Give as modified-release BD or immediate-release 4-hourly';
                frequency = Math.round(reducedTargetDose/6) + 'mg 4-hourly PRN';
                break;
            case 'fentanyl-patch':
                dosageForm = 'mcg/hr patch';
                administration = 'Change patch every 72 hours';
                frequency = 'Breakthrough: use fast-acting fentanyl products or oral morphine';
                break;
            case 'diamorphine-sc':
                dosageForm = 'mg subcutaneous';
                administration = 'Via syringe driver over 24 hours';
                frequency = Math.round(reducedTargetDose/6) + 'mg SC PRN (1/6 of daily dose)';
                break;
        }

        document.getElementById('opioid-conversion-result').innerHTML = `
            <div style="color: #2196F3;">
                <strong>Opioid Conversion Estimate:</strong><br>
                <strong>Oral Morphine Equivalent: ${Math.round(morphineEquivalent)} mg/day</strong><br>
                <strong>Recommended Starting Dose: ${Math.round(reducedTargetDose * 10) / 10} ${dosageForm}</strong><br>
                <em>Administration:</em> ${administration}<br>
                <em>Breakthrough:</em> ${frequency}<br><br>
                <div style="color: #D32F2F; font-weight: bold; margin: 8px 0; border: 2px solid #D32F2F; padding: 8px; background: #FFEBEE;">
                    ⚠️ FACULTY OF PAIN MEDICINE WARNING:<br>
                    • Reduce calculated doses by 25-50% when switching<br>
                    • Reduce more for high doses (>200mg OME/day) or elderly<br>
                    • Incomplete cross-tolerance between opioids<br>
                    • Titrate carefully and monitor closely
                </div>
                <small style="color: #666;">
                    Using UK Faculty of Pain Medicine & MHRA guidance<br>
                    Original: ${currentDose} ${currentOpioid.replace('-', ' ')}<br>
                    Estimated OME: ${Math.round(morphineEquivalent)} mg/day<br>
                    Full calculated: ${Math.round(fullTargetDose * 10) / 10} ${dosageForm} (50% reduction applied)<br>
                    <em>This is a simplified calculator - seek specialist advice for complex conversions</em>
                </small>
            </div>
        `;

    },

    calculateBreakthroughDose() {

        const dailyMorphine = parseFloat(document.getElementById('palliative-daily-morphine').value) || 0;

        if (dailyMorphine === 0) {
            document.getElementById('breakthrough-result').innerHTML = 
                '<div class="calc-error"><strong>Please enter daily morphine equivalent</strong></div>';
            return;
        }

        // Breakthrough dose is typically 1/6 of total daily dose
        const breakthroughDose = Math.round(dailyMorphine / 6);
        const scBreakthroughDose = Math.round(breakthroughDose / 2);

        document.getElementById('breakthrough-result').innerHTML = `
            <div class="calc-success">
                <strong>Breakthrough Dosing:</strong><br>
                <strong>Oral Morphine:</strong> ${breakthroughDose}mg every 1-2 hours PRN<br>
                <strong>SC Morphine:</strong> ${scBreakthroughDose}mg every 1-2 hours PRN<br>
                <strong>Oxycodone:</strong> ${Math.round(breakthroughDose * 0.67)}mg every 1-2 hours PRN<br><br>
                <em>Frequency:</em> Maximum 6 doses per 24 hours<br>
                <em>Review:</em> If >2 breakthrough doses/day, consider increasing background dose<br><br>
                <small class="calc-note">
                    💡 Rule: Breakthrough = 1/6 of total daily dose
                </small>
            </div>
        `;

    },

    calculateAntiemetic() {

        const weight = parseFloat(document.getElementById('palliative-weight').value) || 70;
        const cause = document.getElementById('palliative-nausea-cause').value;

        let firstLine = '';
        let secondLine = '';
        let notes = '';

        switch (cause) {
            case 'opioid':
                firstLine = `<strong>Haloperidol:</strong> 0.5-1.5mg PO BD or 1.5-5mg SC/24h<br>
                           <strong>Metoclopramide:</strong> 10mg TDS PO/SC (max 5 days)`;
                secondLine = `<strong>Ondansetron:</strong> 4-8mg TDS<br>
                            <strong>Levomepromazine:</strong> 6.25-25mg/24h SC`;
                notes = 'Avoid metoclopramide if bowel obstruction suspected';
                break;
            case 'chemotherapy':
                firstLine = `<strong>Ondansetron:</strong> 8mg BD PO or 8mg/24h SC<br>
                           <strong>Dexamethasone:</strong> 8-12mg daily`;
                secondLine = `<strong>Metoclopramide:</strong> 10mg TDS<br>
                            <strong>Levomepromazine:</strong> 6.25-12.5mg/24h SC`;
                notes = 'Consider NK1 antagonists for highly emetogenic chemotherapy';
                break;
            case 'bowel-obstruction':
                firstLine = `<strong>Levomepromazine:</strong> 6.25-25mg/24h SC<br>
                           <strong>Haloperidol:</strong> 2.5-10mg/24h SC`;
                secondLine = `<strong>Octreotide:</strong> 300-600mcg/24h SC<br>
                            <strong>Hyoscine butylbromide:</strong> 60-120mg/24h SC`;
                notes = '⚠️ AVOID metoclopramide - may worsen colic';
                break;
            case 'raised-icp':
                firstLine = `<strong>Dexamethasone:</strong> 8-16mg daily<br>
                           <strong>Cyclizine:</strong> 50mg TDS PO or 150mg/24h SC`;
                secondLine = `<strong>Levomepromazine:</strong> 6.25-12.5mg/24h SC`;
                notes = 'Treat underlying cause. Consider mannitol if acute';
                break;
            case 'metabolic':
                firstLine = `<strong>Haloperidol:</strong> 0.5-1.5mg BD PO or 2.5-5mg/24h SC<br>
                           <strong>Metoclopramide:</strong> 10mg TDS`;
                secondLine = `<strong>Ondansetron:</strong> 4-8mg TDS`;
                notes = 'Correct reversible causes (hypercalcaemia, uraemia, etc.)';
                break;
            case 'vestibular':
                firstLine = `<strong>Cyclizine:</strong> 50mg TDS PO or 150mg/24h SC<br>
                           <strong>Prochlorperazine:</strong> 5-10mg TDS`;
                secondLine = `<strong>Levomepromazine:</strong> 6.25-12.5mg/24h SC`;
                notes = 'Consider cause: drugs, infection, vestibular disorders';
                break;
        }

        document.getElementById('antiemetic-result').innerHTML = `
            <div style="color: #2196F3;">
                <strong>Recommended Anti-emetics for ${cause.replace('-', ' ')}:</strong><br><br>
                <strong>First Line:</strong><br>
                ${firstLine}<br><br>
                <strong>Second Line:</strong><br>
                ${secondLine}<br><br>
                <em>Clinical Notes:</em> ${notes}<br><br>
                <small style="color: #666;">
                    ⚠️ Weight: ${weight}kg considered. Adjust doses for renal/hepatic impairment<br>
                    💊 Can combine drugs with different mechanisms if single agent insufficient
                </small>
            </div>
        `;

    },

    calculateSecretionManagement() {

        const weight = parseFloat(document.getElementById('palliative-secretions-weight').value) || 70;
        const secretionType = document.getElementById('palliative-secretion-type').value;

        let primaryDrug = '';
        let alternativeDrugs = '';
        let nonPharmacological = '';

        switch (secretionType) {
            case 'bronchial':
                primaryDrug = `<strong>Hyoscine hydrobromide:</strong><br>
                             • 0.4-0.6mg SC TDS-QDS<br>
                             • Or 1.2-2.4mg SC/24h via syringe driver<br>
                             • Patches: 1mg/72h (change every 3 days)`;
                alternativeDrugs = `<strong>Glycopyrronium:</strong> 200-400mcg SC TDS-QDS<br>
                                  <strong>Atropine:</strong> 0.4-0.6mg SC QDS<br>
                                  <strong>Hyoscine butylbromide:</strong> 20mg SC TDS (less CNS effects)`;
                nonPharmacological = 'Positioning, gentle suction, reduce fluid intake';
                break;
            case 'salivary':
                primaryDrug = `<strong>Glycopyrronium:</strong><br>
                             • 200-400mcg SC TDS<br>
                             • Or 800-1200mcg SC/24h via syringe driver`;
                alternativeDrugs = `<strong>Hyoscine patches:</strong> 1mg/72h<br>
                                  <strong>Atropine drops:</strong> 1% drops sublingually<br>
                                  <strong>Amitriptyline:</strong> 25-75mg at night (if swallowing possible)`;
                nonPharmacological = 'Frequent mouth care, suction, positioning';
                break;
            case 'death-rattle':
                primaryDrug = `<strong>Hyoscine hydrobromide:</strong><br>
                             • 0.4-0.6mg SC STAT, then every 4-8h PRN<br>
                             • Or 1.2-2.4mg SC/24h continuous<br>
                             • Start early - less effective once established`;
                alternativeDrugs = `<strong>Glycopyrronium:</strong> 200-400mcg SC TDS<br>
                                  <strong>Atropine:</strong> 0.6mg SC TDS<br>
                                  <strong>Hyoscine butylbromide:</strong> 20mg SC TDS`;
                nonPharmacological = 'Family education that this doesn\'t cause distress to patient, positioning';
                break;
        }

        document.getElementById('secretion-result').innerHTML = `
            <div class="calc-success">
                <strong>Management of ${secretionType.replace('-', ' ')}:</strong><br><br>
                <strong>First Choice:</strong><br>
                ${primaryDrug}<br><br>
                <strong>Alternatives:</strong><br>
                ${alternativeDrugs}<br><br>
                <strong>Non-pharmacological:</strong><br>
                ${nonPharmacological}<br><br>
                <small class="calc-note">
                    💊 Weight: ${weight}kg - doses shown are standard adult doses<br>
                    ⚠️ All anticholinergics can cause drowsiness, confusion, and dry mouth<br>
                    🕒 Review effectiveness after 24-48 hours and adjust accordingly
                </small>
            </div>
        `;

    },

    calculateGRACE() {

    const age = parseInt(document.getElementById('grace-age').value);
    const hr = parseInt(document.getElementById('grace-hr').value);
    const sbp = parseInt(document.getElementById('grace-sbp').value);
    const creatinine = parseInt(document.getElementById('grace-creatinine').value);
    
    if (!age || !hr || !sbp || !creatinine) {
        document.getElementById('grace-result').innerHTML = '<p class="error">Please fill in all required fields</p>';
        return;
    }
    
    let score = 0;
    
    // Age scoring
    if (age < 30) score += 0;
    else if (age < 40) score += 8;
    else if (age < 50) score += 25;
    else if (age < 60) score += 41;
    else if (age < 70) score += 58;
    else if (age < 80) score += 75;
    else score += 91;
    
    // Heart rate scoring
    if (hr < 50) score += 0;
    else if (hr < 70) score += 3;
    else if (hr < 90) score += 9;
    else if (hr < 110) score += 15;
    else if (hr < 150) score += 24;
    else if (hr < 200) score += 38;
    else score += 46;
    
    // Systolic BP scoring
    if (sbp >= 200) score += 0;
    else if (sbp >= 160) score += 10;
    else if (sbp >= 140) score += 18;
    else if (sbp >= 120) score += 24;
    else if (sbp >= 100) score += 34;
    else if (sbp >= 80) score += 43;
    else score += 53;
    
    // Creatinine scoring
    if (creatinine < 35) score += 1;
    else if (creatinine < 71) score += 4;
    else if (creatinine < 107) score += 7;
    else if (creatinine < 177) score += 10;
    else if (creatinine < 354) score += 13;
    else score += 21;
    
    // Additional factors
    if (document.getElementById('grace-killip2').checked) score += 20;
    if (document.getElementById('grace-cardiac-arrest').checked) score += 43;
    if (document.getElementById('grace-st-deviation').checked) score += 28;
    if (document.getElementById('grace-elevated-enzymes').checked) score += 14;
    
    // Risk categorization
    let riskLevel, color, mortality;
    if (score <= 108) {
        riskLevel = 'Low Risk';
        color = '#16a34a';
        mortality = '<1%';
    } else if (score <= 140) {
        riskLevel = 'Intermediate Risk';
        color = '#eab308';
        mortality = '1-3%';
    } else {
        riskLevel = 'High Risk';
        color = '#dc2626';
        mortality = '>3%';
    }
    
    document.getElementById('grace-result').innerHTML = `
        <h4 style="color: ${color}">GRACE Score: ${score}</h4>
        <p><strong>Risk Level:</strong> ${riskLevel}</p>
        <p><strong>6-month mortality:</strong> ${mortality}</p>
        <div class="risk-interpretation">
            <p><strong>Management:</strong></p>
            <ul>
                <li>Low Risk: Early conservative management appropriate</li>
                <li>Intermediate Risk: Consider early invasive strategy</li>
                <li>High Risk: Urgent invasive management indicated</li>
            </ul>
        </div>
    `;

    },

    calculateCRUSADE() {

    const hct = parseFloat(document.getElementById('crusade-hct').value);
    const ccr = parseInt(document.getElementById('crusade-ccr').value);
    const hr = parseInt(document.getElementById('crusade-hr').value);
    const sbp = parseInt(document.getElementById('crusade-sbp').value);
    const sex = document.querySelector('input[name="crusade-sex"]:checked').value;
    
    if (!hct || !ccr || !hr || !sbp) {
        document.getElementById('crusade-result').innerHTML = '<p class="error">Please fill in all required fields</p>';
        return;
    }
    
    let score = 0;
    
    // Hematocrit scoring
    if (hct >= 40) score += 0;
    else if (hct >= 37) score += 2;
    else if (hct >= 34) score += 3;
    else if (hct >= 31) score += 7;
    else score += 9;
    
    // Creatinine clearance scoring
    if (ccr > 120) score += 0;
    else if (ccr > 90) score += 2;
    else if (ccr > 60) score += 5;
    else if (ccr > 30) score += 8;
    else if (ccr > 15) score += 13;
    else score += 17;
    
    // Heart rate scoring
    if (hr < 71) score += 0;
    else if (hr < 81) score += 1;
    else if (hr < 91) score += 3;
    else if (hr < 101) score += 6;
    else if (hr < 111) score += 8;
    else if (hr < 121) score += 10;
    else score += 11;
    
    // Blood pressure scoring
    if (sbp >= 141) score += 0;
    else if (sbp >= 121) score += 1;
    else if (sbp >= 101) score += 3;
    else if (sbp >= 91) score += 5;
    else score += 10;
    
    // Sex scoring
    if (sex === 'female') score += 8;
    
    // Additional conditions
    if (document.getElementById('crusade-chf').checked) score += 7;
    if (document.getElementById('crusade-pvd').checked) score += 6;
    if (document.getElementById('crusade-diabetes').checked) score += 6;
    
    // Risk categorization
    let riskLevel, color, bleedingRisk;
    if (score <= 20) {
        riskLevel = 'Very Low Risk';
        color = '#16a34a';
        bleedingRisk = '3.1%';
    } else if (score <= 30) {
        riskLevel = 'Low Risk';
        color = '#22c55e';
        bleedingRisk = '5.5%';
    } else if (score <= 40) {
        riskLevel = 'Moderate Risk';
        color = '#eab308';
        bleedingRisk = '8.6%';
    } else if (score <= 50) {
        riskLevel = 'High Risk';
        color = '#f97316';
        bleedingRisk = '11.9%';
    } else {
        riskLevel = 'Very High Risk';
        color = '#dc2626';
        bleedingRisk = '19.5%';
    }
    
    document.getElementById('crusade-result').innerHTML = `
        <h4 style="color: ${color}">CRUSADE Score: ${score}</h4>
        <p><strong>Bleeding Risk:</strong> ${riskLevel}</p>
        <p><strong>Major bleeding risk:</strong> ${bleedingRisk}</p>
        <div class="risk-interpretation">
            <p><strong>Clinical implications:</strong></p>
            <ul>
                <li>Consider bleeding risk vs thrombotic benefit</li>
                <li>High risk patients may benefit from shorter dual antiplatelet therapy</li>
                <li>Consider radial approach for procedures</li>
            </ul>
        </div>
    `;

    },

    calculatePHQ9() {

    let totalScore = 0;
    
    for (let i = 1; i <= 9; i++) {
        const questionValue = document.querySelector(`input[name="phq9-q${i}"]:checked`);
        if (!questionValue) {
            document.getElementById('phq9-result').innerHTML = '<p class="error">Please answer all questions</p>';
            return;
        }
        totalScore += parseInt(questionValue.value);
    }
    
    let severity, color, recommendation;
    if (totalScore <= 4) {
        severity = 'Minimal Depression';
        color = '#16a34a';
        recommendation = 'No treatment needed. Repeat screening as clinically indicated.';
    } else if (totalScore <= 9) {
        severity = 'Mild Depression';
        color = '#22c55e';
        recommendation = 'Watchful waiting. Self-help resources. Consider therapy if no improvement.';
    } else if (totalScore <= 14) {
        severity = 'Moderate Depression';
        color = '#eab308';
        recommendation = 'Treatment warranted. Consider antidepressants or psychotherapy.';
    } else if (totalScore <= 19) {
        severity = 'Moderately Severe Depression';
        color = '#f97316';
        recommendation = 'Active treatment with antidepressants and/or psychotherapy.';
    } else {
        severity = 'Severe Depression';
        color = '#dc2626';
        recommendation = 'Immediate treatment. Consider psychiatry referral. Assess suicide risk.';
    }
    
    document.getElementById('phq9-result').innerHTML = `
        <h4 style="color: ${color}">PHQ-9 Score: ${totalScore}</h4>
        <p><strong>Severity:</strong> ${severity}</p>
        <p><strong>Recommendation:</strong> ${recommendation}</p>
        ${totalScore >= 15 ? '<p style="color: #dc2626;"><strong>⚠️ High risk: Assess for suicidal ideation</strong></p>' : ''}
    `;

    },

    calculateGAD7() {

    let totalScore = 0;
    
    for (let i = 1; i <= 7; i++) {
        const value = parseInt(document.getElementById(`gad7-q${i}`).value);
        if (isNaN(value)) {
            document.getElementById('gad7-result').innerHTML = '<p class="error">Please answer all questions</p>';
            return;
        }
        totalScore += value;
    }
    
    let severity, color, recommendation;
    if (totalScore <= 4) {
        severity = 'Minimal Anxiety';
        color = '#16a34a';
        recommendation = 'No treatment needed. Monitor symptoms.';
    } else if (totalScore <= 9) {
        severity = 'Mild Anxiety';
        color = '#22c55e';
        recommendation = 'Mild anxiety. Consider self-help resources or brief therapy.';
    } else if (totalScore <= 14) {
        severity = 'Moderate Anxiety';
        color = '#eab308';
        recommendation = 'Moderate anxiety. Consider therapy or medication.';
    } else {
        severity = 'Severe Anxiety';
        color = '#dc2626';
        recommendation = 'Severe anxiety. Active treatment recommended. Consider specialist referral.';
    }
    
    document.getElementById('gad7-result').innerHTML = `
        <h4 style="color: ${color}">GAD-7 Score: ${totalScore}</h4>
        <p><strong>Severity:</strong> ${severity}</p>
        <p><strong>Recommendation:</strong> ${recommendation}</p>
        <div class="clinical-note">
            <p><strong>Note:</strong> Score ≥10 has good sensitivity and specificity for GAD</p>
        </div>
    `;

    },

    calculateMSE() {

    const appearance = document.getElementById('mse-appearance').value;
    const speech = document.getElementById('mse-speech').value;
    const mood = document.getElementById('mse-mood').value;
    const affect = document.getElementById('mse-affect').value;
    const thoughtProcess = document.getElementById('mse-thought-process').value;
    const thoughtContent = document.getElementById('mse-thought-content').value;
    const perception = document.getElementById('mse-perception').value;
    const orientation = document.getElementById('mse-orientation').value;
    const memory = document.getElementById('mse-memory').value;
    const concentration = document.getElementById('mse-concentration').value;
    const insight = document.getElementById('mse-insight').value;
    const judgment = document.getElementById('mse-judgment').value;
    
    // Check for concerning findings
    const delusions = document.getElementById('mse-delusions').checked;
    const suicidal = document.getElementById('mse-suicidal').checked;
    const homicidal = document.getElementById('mse-homicidal').checked;
    const paranoia = document.getElementById('mse-paranoia').checked;
    const obsessions = document.getElementById('mse-obsessions').checked;
    const auditoryHalluc = document.getElementById('mse-hallucinations-auditory').checked;
    const visualHalluc = document.getElementById('mse-hallucinations-visual').checked;
    const otherHalluc = document.getElementById('mse-hallucinations-other').checked;
    const illusions = document.getElementById('mse-illusions').checked;
    
    // Build thought content section
    let thoughtContentDetails = [];
    if (delusions) thoughtContentDetails.push('delusions present');
    if (suicidal) thoughtContentDetails.push('⚠️ SUICIDAL IDEATION');
    if (homicidal) thoughtContentDetails.push('⚠️ HOMICIDAL IDEATION');
    if (paranoia) thoughtContentDetails.push('paranoid ideation');
    if (obsessions) thoughtContentDetails.push('obsessive thoughts');
    if (thoughtContent) thoughtContentDetails.push(thoughtContent);
    
    const thoughtContentSummary = thoughtContentDetails.length > 0 
        ? thoughtContentDetails.join(', ') 
        : 'No abnormalities noted';
    
    // Build perception section
    let perceptionDetails = [];
    if (auditoryHalluc) perceptionDetails.push('auditory hallucinations');
    if (visualHalluc) perceptionDetails.push('visual hallucinations');
    if (otherHalluc) perceptionDetails.push('other hallucinations');
    if (illusions) perceptionDetails.push('illusions');
    if (perception) perceptionDetails.push(perception);
    
    const perceptionSummary = perceptionDetails.length > 0 
        ? perceptionDetails.join(', ') 
        : 'No perceptual disturbances';
    
    // Risk assessment
    let riskWarning = '';
    if (suicidal || homicidal) {
        riskWarning = `
            <div class="clinical-note" style="background: #fee2e2; border-color: #dc2626; margin-top: 15px;">
                <h4 style="color: #dc2626; margin-top: 0;">⚠️ RISK ALERT</h4>
                <p><strong>IMMEDIATE ACTION REQUIRED:</strong></p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    ${suicidal ? '<li>Suicidal ideation present - assess risk, ensure safety, consider crisis team</li>' : ''}
                    ${homicidal ? '<li>Homicidal ideation present - assess risk, ensure safety, consider urgent psychiatric review and duty to warn</li>' : ''}
                </ul>
            </div>
        `;
    }
    
    // Generate MSE summary
    const mseSummary = `
        <h4 style="color: #007AFF;">Mental State Examination Summary</h4>
        <div class="mse-summary" style="text-align: left; line-height: 1.8;">
            <p><strong>Appearance & Behavior:</strong> ${appearance || 'Not documented'}</p>
            <p><strong>Speech:</strong> ${speech || 'Not documented'}</p>
            <p><strong>Mood:</strong> ${mood ? `"${mood}"` : 'Not documented'}</p>
            <p><strong>Affect:</strong> ${affect || 'Not documented'}</p>
            <p><strong>Thought Process:</strong> ${thoughtProcess || 'Not documented'}</p>
            <p><strong>Thought Content:</strong> ${thoughtContentSummary}</p>
            <p><strong>Perception:</strong> ${perceptionSummary}</p>
            <p><strong>Cognition:</strong></p>
            <ul style="margin: 5px 0 10px 20px;">
                <li>Orientation: ${orientation}</li>
                <li>Memory: ${memory}</li>
                <li>Concentration: ${concentration}</li>
            </ul>
            <p><strong>Insight:</strong> ${insight || 'Not documented'}</p>
            <p><strong>Judgment:</strong> ${judgment || 'Not documented'}</p>
        </div>
        ${riskWarning}
        <div class="calc-reference" style="margin-top: 15px;">
            <small><strong>Clinical Use:</strong> Document this MSE in the patient's medical record. Repeat MSE if mental status changes.</small>
        </div>
    `;
    
    document.getElementById('mse-result').innerHTML = mseSummary;

    },

    calculateMMSE() {

    let score = 0;
    
    // Orientation to Time (5 points)
    if (document.getElementById('mmse-year').checked) score++;
    if (document.getElementById('mmse-season').checked) score++;
    if (document.getElementById('mmse-date').checked) score++;
    if (document.getElementById('mmse-day').checked) score++;
    if (document.getElementById('mmse-month').checked) score++;
    
    // Orientation to Place (5 points)
    if (document.getElementById('mmse-country').checked) score++;
    if (document.getElementById('mmse-county').checked) score++;
    if (document.getElementById('mmse-town').checked) score++;
    if (document.getElementById('mmse-hospital').checked) score++;
    if (document.getElementById('mmse-floor').checked) score++;
    
    // Registration (3 points)
    score += parseInt(document.getElementById('mmse-registration').value);
    
    // Attention & Calculation (5 points)
    score += parseInt(document.getElementById('mmse-attention').value);
    
    // Recall (3 points)
    score += parseInt(document.getElementById('mmse-recall').value);
    
    // Naming (2 points)
    if (document.getElementById('mmse-naming-1').checked) score++;
    if (document.getElementById('mmse-naming-2').checked) score++;
    
    // Repetition (1 point)
    if (document.getElementById('mmse-repetition').checked) score++;
    
    // Three-Stage Command (3 points)
    if (document.getElementById('mmse-command-1').checked) score++;
    if (document.getElementById('mmse-command-2').checked) score++;
    if (document.getElementById('mmse-command-3').checked) score++;
    
    // Reading (1 point)
    if (document.getElementById('mmse-reading').checked) score++;
    
    // Writing (1 point)
    if (document.getElementById('mmse-writing').checked) score++;
    
    // Copying (1 point)
    if (document.getElementById('mmse-copying').checked) score++;
    
    // Interpretation
    let interpretation, color, severity, recommendations;
    
    if (score >= 24) {
        interpretation = 'Normal Cognition';
        color = '#16a34a';
        severity = 'No cognitive impairment detected';
        recommendations = 'No further cognitive testing required at this time. Consider reassessment if concerns arise.';
    } else if (score >= 18) {
        interpretation = 'Mild Cognitive Impairment';
        color = '#eab308';
        severity = 'Mild impairment - may indicate early dementia or delirium';
        recommendations = 'Consider: Full cognitive assessment, medication review, exclude delirium (infection, metabolic), neuroimaging if new onset, referral to memory clinic.';
    } else if (score >= 10) {
        interpretation = 'Moderate Cognitive Impairment';
        color = '#f97316';
        severity = 'Moderate impairment - likely dementia or severe delirium';
        recommendations = 'Urgent actions: Exclude reversible causes (delirium, medication, B12, thyroid), neuroimaging, specialist referral, assess capacity, discuss safety and support needs.';
    } else {
        interpretation = 'Severe Cognitive Impairment';
        color = '#dc2626';
        severity = 'Severe impairment - advanced dementia or acute confusion';
        recommendations = 'Immediate actions: Exclude acute delirium (sepsis, stroke, metabolic), assess safety, urgent geriatric or psychiatric review, consider safeguarding needs.';
    }
    
    // Score breakdown
    const orientationTime = [
        document.getElementById('mmse-year').checked,
        document.getElementById('mmse-season').checked,
        document.getElementById('mmse-date').checked,
        document.getElementById('mmse-day').checked,
        document.getElementById('mmse-month').checked
    ].filter(x => x).length;
    
    const orientationPlace = [
        document.getElementById('mmse-country').checked,
        document.getElementById('mmse-county').checked,
        document.getElementById('mmse-town').checked,
        document.getElementById('mmse-hospital').checked,
        document.getElementById('mmse-floor').checked
    ].filter(x => x).length;
    
    const registration = parseInt(document.getElementById('mmse-registration').value);
    const attention = parseInt(document.getElementById('mmse-attention').value);
    const recall = parseInt(document.getElementById('mmse-recall').value);
    
    const naming = [
        document.getElementById('mmse-naming-1').checked,
        document.getElementById('mmse-naming-2').checked
    ].filter(x => x).length;
    
    const repetition = document.getElementById('mmse-repetition').checked ? 1 : 0;
    
    const command = [
        document.getElementById('mmse-command-1').checked,
        document.getElementById('mmse-command-2').checked,
        document.getElementById('mmse-command-3').checked
    ].filter(x => x).length;
    
    const reading = document.getElementById('mmse-reading').checked ? 1 : 0;
    const writing = document.getElementById('mmse-writing').checked ? 1 : 0;
    const copying = document.getElementById('mmse-copying').checked ? 1 : 0;
    
    const languageScore = naming + repetition + command + reading + writing + copying;
    
    document.getElementById('mmse-result').innerHTML = `
        <h4 style="color: ${color}">MMSE Score: ${score}/30</h4>
        <p><strong>Interpretation:</strong> ${interpretation}</p>
        <p><strong>Severity:</strong> ${severity}</p>
        
        <div class="mmse-breakdown" style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: left;">
            <h5 style="margin-top: 0;">Score Breakdown:</h5>
            <ul style="list-style: none; padding: 0; margin: 0;">
                <li>📍 Orientation to Time: ${orientationTime}/5</li>
                <li>🗺️ Orientation to Place: ${orientationPlace}/5</li>
                <li>📝 Registration: ${registration}/3</li>
                <li>🧮 Attention & Calculation: ${attention}/5</li>
                <li>🧠 Recall: ${recall}/3</li>
                <li>💬 Language: ${languageScore}/9</li>
            </ul>
        </div>
        
        <div class="clinical-note">
            <p><strong>Recommendations:</strong></p>
            <p>${recommendations}</p>
        </div>
        
        <div class="calc-reference" style="margin-top: 15px;">
            <small><strong>Important Notes:</strong><br>
            • MMSE should be adjusted for age, education, and cultural factors<br>
            • Not diagnostic alone - use alongside clinical assessment and history<br>
            • Consider MoCA for subtle cognitive impairment (more sensitive)<br>
            • Repeat testing useful to track progression</small>
        </div>
    `;

    },

    calculateInsulinSliding() {

    const glucose = parseFloat(document.getElementById('insulin-glucose').value);
    const weight = parseFloat(document.getElementById('insulin-weight').value);
    const sensitivity = document.getElementById('insulin-sensitivity').value;
    const critical = document.getElementById('insulin-critical').checked;
    const steroids = document.getElementById('insulin-steroids').checked;
    
    if (!glucose || !weight) {
        document.getElementById('insulin-result').innerHTML = '<p class="error">Please fill in glucose and weight</p>';
        return;
    }
    
    // Calculate insulin sensitivity factor
    let insulinSensitivity = 100; // mmol/L per unit of insulin
    if (sensitivity === 'resistant') insulinSensitivity = 50;
    if (sensitivity === 'sensitive') insulinSensitivity = 150;
    if (critical) insulinSensitivity *= 0.7; // More resistant when critically ill
    if (steroids) insulinSensitivity *= 0.5; // Much more resistant with steroids
    
    // Target glucose
    const targetGlucose = critical ? 7 : 8; // mmol/L
    
    // Calculate correction dose
    const glucoseExcess = glucose - targetGlucose;
    let correctionDose = 0;
    
    if (glucoseExcess > 0) {
        correctionDose = Math.round((glucoseExcess / insulinSensitivity) * weight * 10) / 10;
    }
    
    // Sliding scale recommendations
    let slidingScale = '';
    if (glucose < 4) {
        slidingScale = 'HOLD insulin. Give 15-20g glucose. Recheck in 15 minutes.';
    } else if (glucose < 6) {
        slidingScale = 'Consider holding insulin. Monitor closely.';
    } else if (glucose <= 10) {
        slidingScale = critical ? '1-2 units subcutaneous' : 'No additional insulin needed';
    } else if (glucose <= 15) {
        slidingScale = `2-4 units subcutaneous (calculated: ${correctionDose} units)`;
    } else if (glucose <= 20) {
        slidingScale = `4-6 units subcutaneous (calculated: ${correctionDose} units)`;
    } else {
        slidingScale = `6-8 units subcutaneous (calculated: ${correctionDose} units). Consider IV insulin if >25 mmol/L`;
    }
    
    document.getElementById('insulin-result').innerHTML = `
        <h4>Insulin Sliding Scale Recommendation</h4>
        <p><strong>Current glucose:</strong> ${glucose} mmol/L</p>
        <p><strong>Target glucose:</strong> ${targetGlucose} mmol/L</p>
        <p><strong>Calculated correction:</strong> ${correctionDose} units</p>
        <p><strong>Sliding scale:</strong> ${slidingScale}</p>
        <div class="clinical-note">
            <p><strong>Notes:</strong></p>
            <ul>
                <li>Recheck glucose in 1-2 hours after subcutaneous insulin</li>
                <li>Consider continuous IV insulin if glucose consistently >15 mmol/L</li>
                <li>Adjust doses based on response and clinical condition</li>
            </ul>
        </div>
    `;

    },

    calculateVasopressor() {

    const weight = parseFloat(document.getElementById('vaso-weight').value);
    const drug = document.getElementById('vaso-drug').value;
    const dose = parseFloat(document.getElementById('vaso-dose').value);
    const concentration = parseFloat(document.getElementById('vaso-concentration').value);
    
    if (!weight || !dose || !concentration) {
        document.getElementById('vaso-result').innerHTML = '<p class="error">Please fill in all fields</p>';
        return;
    }
    
    // Calculate infusion rate
    // Dose (mcg/kg/min) × Weight (kg) × 60 (min/hr) ÷ [Concentration (mg/ml) × 1000 (mcg/mg)] = ml/hr
    const infusionRate = (dose * weight * 60) / (concentration * 1000);
    
    // Drug-specific information
    let drugInfo = '';
    switch(drug) {
        case 'noradrenaline':
            drugInfo = 'Noradrenaline: First-line vasopressor for shock. Typical range 0.01-3 mcg/kg/min';
            break;
        case 'adrenaline':
            drugInfo = 'Adrenaline: Second-line for refractory shock. Typical range 0.01-1 mcg/kg/min';
            break;
        case 'dopamine':
            drugInfo = 'Dopamine: Consider if bradycardia. Typical range 5-20 mcg/kg/min';
            break;
        case 'dobutamine':
            drugInfo = 'Dobutamine: Inotrope for cardiogenic shock. Typical range 2.5-15 mcg/kg/min';
            break;
        case 'vasopressin':
            drugInfo = 'Vasopressin: Fixed dose 0.01-0.04 units/min (not weight-based)';
            break;
    }
    
    document.getElementById('vaso-result').innerHTML = `
        <h4>Vasopressor Infusion Calculation</h4>
        <p><strong>Drug:</strong> ${drug.charAt(0).toUpperCase() + drug.slice(1)}</p>
        <p><strong>Dose:</strong> ${dose} mcg/kg/min</p>
        <p><strong>Weight:</strong> ${weight} kg</p>
        <p><strong>Concentration:</strong> ${concentration} mg/ml</p>
        <h5 style="color: #007AFF;">Infusion Rate: ${infusionRate.toFixed(1)} ml/hr</h5>
        <div class="clinical-note">
            <p><strong>${drugInfo}</strong></p>
            <p><strong>Safety notes:</strong></p>
            <ul>
                <li>Use central venous access when possible</li>
                <li>Titrate to MAP >65 mmHg or clinical endpoints</li>
                <li>Monitor for arrhythmias and tissue ischemia</li>
                <li>Wean gradually when shock resolves</li>
            </ul>
        </div>
    `;

    },

    calculatePaediatricDosing() {

    const weight = parseFloat(document.getElementById('paed-weight').value);
    const age = parseFloat(document.getElementById('paed-age').value);
    const medication = document.getElementById('paed-medication').value;
    
    if (!weight || !age || !medication) {
        document.getElementById('paed-dosing-result').innerHTML = 
            '<div class="alert alert-warning">Please fill in all fields</div>';
        return;
    }
    
    const dosing = {
        'paracetamol': {
            dose: '15 mg/kg',
            frequency: 'every 4-6 hours',
            maxDaily: '60 mg/kg/day',
            maxSingle: '1g',
            route: 'PO/IV'
        },
        'ibuprofen': {
            dose: '5-10 mg/kg',
            frequency: 'every 6-8 hours',
            maxDaily: '30 mg/kg/day',
            maxSingle: '400mg',
            route: 'PO'
        },
        'amoxicillin': {
            dose: '20-40 mg/kg',
            frequency: 'every 8 hours',
            maxDaily: '90 mg/kg/day',
            maxSingle: '1g',
            route: 'PO'
        },
        'prednisolone': {
            dose: '1-2 mg/kg',
            frequency: 'once daily',
            maxDaily: '60 mg/day',
            maxSingle: '60mg',
            route: 'PO'
        },
        'salbutamol': {
            dose: '100-200 mcg (1-2 puffs)',
            frequency: 'every 4-6 hours PRN',
            maxDaily: '8 puffs/day',
            maxSingle: '200mcg',
            route: 'Inhaled'
        },
        'azithromycin': {
            dose: '10 mg/kg',
            frequency: 'once daily for 3 days',
            maxDaily: '500 mg/day',
            maxSingle: '500mg',
            route: 'PO'
        }
    };
    
    const drug = dosing[medication];
    const doseValue = parseFloat(drug.dose.split(' ')[0]);
    const calculatedDose = doseValue * weight;
    
    let ageWarning = '';
    if (age < 0.25) {
        ageWarning = '<div class="alert alert-danger">⚠️ Neonatal dosing requires specialist consultation</div>';
    } else if (age < 2) {
        ageWarning = '<div class="alert alert-warning">⚠️ Infant dosing - verify with pediatric guidelines</div>';
    }
    
    document.getElementById('paed-dosing-result').innerHTML = `
        ${ageWarning}
        <div class="result-section">
            <h5>${medication.charAt(0).toUpperCase() + medication.slice(1)} Dosing</h5>
            <div class="result-grid">
                <div><strong>Calculated Dose:</strong> ${calculatedDose.toFixed(1)} mg</div>
                <div><strong>Standard Dose:</strong> ${drug.dose}</div>
                <div><strong>Frequency:</strong> ${drug.frequency}</div>
                <div><strong>Route:</strong> ${drug.route}</div>
                <div><strong>Max Single Dose:</strong> ${drug.maxSingle}</div>
                <div><strong>Max Daily Dose:</strong> ${drug.maxDaily}</div>
            </div>
        </div>
    `;

    },

    calculateInfusionRate() {

    const volume = parseFloat(document.getElementById('infusion-volume').value);
    const time = parseFloat(document.getElementById('infusion-time').value);
    const dropFactor = parseFloat(document.getElementById('drop-factor').value);
    
    if (!volume || !time || !dropFactor) {
        document.getElementById('infusion-result').innerHTML = 
            '<div class="alert alert-warning">Please fill in all fields</div>';
        return;
    }
    
    const ratePerHour = volume / time;
    const dropsPerMinute = (volume * dropFactor) / (time * 60);
    const ratePerMinute = ratePerHour / 60;
    
    document.getElementById('infusion-result').innerHTML = `
        <div class="result-section">
            <h5>Infusion Rate Results</h5>
            <div class="result-grid">
                <div><strong>Rate:</strong> ${ratePerHour.toFixed(1)} ml/hr</div>
                <div><strong>Rate per minute:</strong> ${ratePerMinute.toFixed(2)} ml/min</div>
                <div><strong>Drops per minute:</strong> ${dropsPerMinute.toFixed(0)} drops/min</div>
                <div><strong>Total time:</strong> ${time} hours</div>
            </div>
            <div class="alert alert-info">
                💡 Set pump to <strong>${ratePerHour.toFixed(1)} ml/hr</strong> or count <strong>${dropsPerMinute.toFixed(0)} drops/min</strong>
            </div>
        </div>
    `;

    },

    calculateCockcroftGault() {

    const age = parseFloat(document.getElementById('cg-age').value);
    const weight = parseFloat(document.getElementById('cg-weight').value);
    const creatinine = parseFloat(document.getElementById('cg-creatinine').value);
    const sex = document.querySelector('input[name="cg-sex"]:checked').value;
    
    if (!age || !weight || !creatinine) {
        document.getElementById('cg-result').innerHTML = 
            '<div class="alert alert-warning">Please fill in all fields</div>';
        return;
    }
    
    const K = sex === 'male' ? 1.23 : 1.04;  // UK constants for μmol/L
    const crCl = ((140 - age) * weight * K) / creatinine;
    
    let doseAdjustment = '';
    let color = '';
    
    if (crCl >= 60) {
        doseAdjustment = 'No dose adjustment typically required for most medications';
        color = '#4CAF50';
    } else if (crCl >= 30) {
        doseAdjustment = 'Dose adjustment required for many renally-excreted drugs (e.g., metformin, DOACs, antibiotics)';
        color = '#FF9800';
    } else if (crCl >= 15) {
        doseAdjustment = 'Significant dose adjustment or contraindications for many drugs. Specialist review advised';
        color = '#F44336';
    } else {
        doseAdjustment = 'Severe renal impairment - many drugs contraindicated. Urgent specialist review';
        color = '#D32F2F';
    }
    
    document.getElementById('cg-result').innerHTML = `
        <div class="result-section">
            <h5>Cockcroft-Gault Results</h5>
            <div class="result-grid">
                <div><strong>Creatinine Clearance:</strong> ${crCl.toFixed(1)} mL/min</div>
                <div style="color: ${color};"><strong>Dose Adjustment Guidance:</strong> ${doseAdjustment}</div>
            </div>
            <div class="alert alert-warning">
                ⚠️ CrCl is used for drug dosing, NOT CKD staging<br>
                <small>UK CKD staging uses eGFR (G1-G5) + albuminuria (A1-A3)<br>
                Use eGFR calculator for CKD staging and monitoring</small>
            </div>
        </div>
    `;

    },

    calculateBSA() {

    const weight = parseFloat(document.getElementById('bsa-weight').value);
    const height = parseFloat(document.getElementById('bsa-height').value);
    
    if (!weight || !height) {
        document.getElementById('bsa-result').innerHTML = 
            '<div class="alert alert-warning">Please enter weight and height</div>';
        return;
    }
    
    // Dubois formula: 0.007184 × W^0.425 × H^0.725
    const dubois = 0.007184 * Math.pow(weight, 0.425) * Math.pow(height, 0.725);
    
    // Mosteller formula: √(W × H / 3600)
    const mosteller = Math.sqrt((weight * height) / 3600);
    
    // Haycock formula: 0.024265 × W^0.5378 × H^0.3964
    const haycock = 0.024265 * Math.pow(weight, 0.5378) * Math.pow(height, 0.3964);
    
    const average = (dubois + mosteller + haycock) / 3;
    
    document.getElementById('bsa-result').innerHTML = `
        <div class="result-section">
            <h5>Body Surface Area Results</h5>
            <div class="result-grid">
                <div><strong>Dubois Formula:</strong> ${dubois.toFixed(2)} m²</div>
                <div><strong>Mosteller Formula:</strong> ${mosteller.toFixed(2)} m²</div>
                <div><strong>Haycock Formula:</strong> ${haycock.toFixed(2)} m²</div>
                <div><strong>Average BSA:</strong> ${average.toFixed(2)} m²</div>
            </div>
            <div class="alert alert-info">
                💡 Mosteller formula is most commonly used for drug dosing
            </div>
        </div>
    `;

    },

    calculateFluidBalance() {

    const weight = parseFloat(document.getElementById('fluid-weight').value);
    const age = parseFloat(document.getElementById('fluid-age').value);
    const fever = document.getElementById('fluid-fever').checked;
    const losses = document.getElementById('fluid-losses').checked;
    const heartFailure = document.getElementById('fluid-heart-failure').checked;
    const renal = document.getElementById('fluid-renal').checked;
    const additional = parseFloat(document.getElementById('fluid-additional').value) || 0;
    
    if (!weight || !age) {
        document.getElementById('fluid-result').innerHTML = 
            '<div class="alert alert-warning">Please enter weight and age</div>';
        return;
    }
    
    let baseRequirement;
    
    // Calculate base fluid requirement
    if (age < 1) {
        baseRequirement = weight * 100; // 100ml/kg/day for infants
    } else if (age < 18) {
        if (weight <= 10) {
            baseRequirement = weight * 100;
        } else if (weight <= 20) {
            baseRequirement = 1000 + ((weight - 10) * 50);
        } else {
            baseRequirement = 1500 + ((weight - 20) * 20);
        }
    } else {
        baseRequirement = weight * 30; // 30ml/kg/day for adults
    }
    
    let adjustedRequirement = baseRequirement;
    let adjustments = [];
    
    if (fever) {
        const feverIncrease = 500;
        adjustedRequirement += feverIncrease;
        adjustments.push(`+${feverIncrease}ml for fever`);
    }
    
    if (losses) {
        const lossIncrease = 500;
        adjustedRequirement += lossIncrease;
        adjustments.push(`+${lossIncrease}ml for abnormal losses`);
    }
    
    if (additional > 0) {
        adjustedRequirement += additional;
        adjustments.push(`+${additional}ml for additional losses`);
    }
    
    if (heartFailure) {
        adjustedRequirement *= 0.8; // Restrict to 80%
        adjustments.push('Restricted to 80% due to heart failure');
    }
    
    if (renal) {
        adjustments.push('Consider further restriction for renal impairment');
    }
    
    const hourlyRate = adjustedRequirement / 24;
    
    document.getElementById('fluid-result').innerHTML = `
        <div class="result-section">
            <h5>Fluid Balance Results</h5>
            <div class="result-grid">
                <div><strong>Base Requirement:</strong> ${baseRequirement.toFixed(0)} ml/day</div>
                <div><strong>Adjusted Requirement:</strong> ${adjustedRequirement.toFixed(0)} ml/day</div>
                <div><strong>Hourly Rate:</strong> ${hourlyRate.toFixed(1)} ml/hr</div>
            </div>
            ${adjustments.length > 0 ? `
                <div class="adjustments">
                    <h6>Adjustments Applied:</h6>
                    <ul>
                        ${adjustments.map(adj => `<li>${adj}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            <div class="alert alert-info">
                💡 Monitor urine output (>0.5ml/kg/hr for adults, >1ml/kg/hr for children)
            </div>
        </div>
    `;

    },

    calculateTIMI() {

    let score = 0;
    
    if (document.getElementById('timi-age').checked) score += 1;
    if (document.getElementById('timi-risk-factors').checked) score += 1;
    if (document.getElementById('timi-known-cad').checked) score += 1;
    if (document.getElementById('timi-aspirin').checked) score += 1;
    if (document.getElementById('timi-severe-angina').checked) score += 1;
    if (document.getElementById('timi-st-deviation').checked) score += 1;
    if (document.getElementById('timi-cardiac-markers').checked) score += 1;
    
    let riskLevel = '';
    let riskPercentage = '';
    let recommendations = '';
    
    if (score <= 2) {
        riskLevel = 'Low Risk';
        riskPercentage = '4.7% risk of death/MI/urgent revascularization at 14 days';
        recommendations = 'Consider discharge with outpatient cardiology follow-up if clinically stable';
    } else if (score <= 4) {
        riskLevel = 'Intermediate Risk';
        riskPercentage = '19.9% risk of death/MI/urgent revascularization at 14 days';
        recommendations = 'Consider admission and cardiology consultation. Early invasive strategy may be beneficial';
    } else {
        riskLevel = 'High Risk';
        riskPercentage = '40.9% risk of death/MI/urgent revascularization at 14 days';
        recommendations = 'Admit for urgent cardiology evaluation. Early invasive strategy strongly recommended';
    }
    
    document.getElementById('timi-result').innerHTML = `
        <div class="result-section">
            <h5>TIMI Risk Score Results</h5>
            <div class="result-grid">
                <div><strong>Score:</strong> ${score}/7 points</div>
                <div><strong>Risk Level:</strong> ${riskLevel}</div>
                <div><strong>14-day Risk:</strong> ${riskPercentage}</div>
            </div>
            <div class="alert alert-info">
                <strong>Recommendations:</strong> ${recommendations}
            </div>
        </div>
    `;

    },

    calculateNIHSS() {

    let score = 0;
    
    score += parseInt(document.getElementById('nihss-loc').value);
    score += parseInt(document.getElementById('nihss-questions').value);
    score += parseInt(document.getElementById('nihss-commands').value);
    score += parseInt(document.getElementById('nihss-gaze').value);
    score += parseInt(document.getElementById('nihss-visual').value);
    score += parseInt(document.getElementById('nihss-facial').value);
    
    // Motor scores (excluding 9 = untestable)
    const armLeft = parseInt(document.getElementById('nihss-arm-left').value);
    const armRight = parseInt(document.getElementById('nihss-arm-right').value);
    const legLeft = parseInt(document.getElementById('nihss-leg-left').value);
    const legRight = parseInt(document.getElementById('nihss-leg-right').value);
    
    score += (armLeft === 9 ? 0 : armLeft);
    score += (armRight === 9 ? 0 : armRight);
    score += (legLeft === 9 ? 0 : legLeft);
    score += (legRight === 9 ? 0 : legRight);
    
    const ataxia = parseInt(document.getElementById('nihss-ataxia').value);
    score += (ataxia === 9 ? 0 : ataxia);
    
    score += parseInt(document.getElementById('nihss-sensory').value);
    score += parseInt(document.getElementById('nihss-language').value);
    
    const dysarthria = parseInt(document.getElementById('nihss-dysarthria').value);
    score += (dysarthria === 9 ? 0 : dysarthria);
    
    score += parseInt(document.getElementById('nihss-extinction').value);
    
    let severity = '';
    let interpretation = '';
    let thrombectomyEligible = '';
    
    if (score === 0) {
        severity = 'Normal';
        interpretation = 'No stroke symptoms';
        thrombectomyEligible = 'Not applicable';
    } else if (score <= 4) {
        severity = 'Minor Stroke';
        interpretation = 'Minor stroke - good prognosis';
        thrombectomyEligible = 'Generally not eligible for thrombectomy';
    } else if (score <= 15) {
        severity = 'Moderate Stroke';
        interpretation = 'Moderate stroke severity';
        thrombectomyEligible = 'Consider thrombectomy if large vessel occlusion and within time window';
    } else if (score <= 20) {
        severity = 'Moderate-Severe Stroke';
        interpretation = 'Moderate to severe stroke';
        thrombectomyEligible = 'Strong candidate for thrombectomy if large vessel occlusion';
    } else {
        severity = 'Severe Stroke';
        interpretation = 'Severe stroke - guarded prognosis';
        thrombectomyEligible = 'Consider thrombectomy with caution - discuss with neurology';
    }
    
    document.getElementById('nihss-result').innerHTML = `
        <div class="result-section">
            <h5>NIH Stroke Scale Results</h5>
            <div class="result-grid">
                <div><strong>Total Score:</strong> ${score}/42 points</div>
                <div><strong>Severity:</strong> ${severity}</div>
                <div><strong>Interpretation:</strong> ${interpretation}</div>
            </div>
            <div class="alert alert-info">
                <strong>Thrombectomy Consideration:</strong> ${thrombectomyEligible}
            </div>
            <div class="alert alert-warning">
                💡 <strong>Time is brain:</strong> Assess for thrombolysis (≤4.5h) and thrombectomy (≤24h for select cases)
            </div>
        </div>
    `;

    },

    calculateModifiedRankin() {

    const score = parseInt(document.getElementById('rankin-score').value);
    
    let description = '';
    let prognosis = '';
    let careNeeds = '';
    
    switch (score) {
        case 0:
            description = 'No symptoms at all';
            prognosis = 'Excellent functional outcome';
            careNeeds = 'No assistance required';
            break;
        case 1:
            description = 'No significant disability despite symptoms';
            prognosis = 'Excellent functional outcome';
            careNeeds = 'Able to carry out all usual duties and activities';
            break;
        case 2:
            description = 'Slight disability';
            prognosis = 'Good functional outcome';
            careNeeds = 'Unable to carry out all previous activities but able to look after own affairs without assistance';
            break;
        case 3:
            description = 'Moderate disability';
            prognosis = 'Moderate functional outcome';
            careNeeds = 'Requiring some help, but able to walk without assistance';
            break;
        case 4:
            description = 'Moderately severe disability';
            prognosis = 'Poor functional outcome';
            careNeeds = 'Unable to walk without assistance and unable to attend to bodily needs without assistance';
            break;
        case 5:
            description = 'Severe disability';
            prognosis = 'Poor functional outcome';
            careNeeds = 'Bedridden, incontinent, and requiring constant nursing care and attention';
            break;
        case 6:
            description = 'Dead';
            prognosis = 'Fatal outcome';
            careNeeds = 'Not applicable';
            break;
    }
    
    let outcome = '';
    if (score <= 2) {
        outcome = 'Favorable outcome (mRS 0-2)';
    } else if (score <= 5) {
        outcome = 'Unfavorable outcome (mRS 3-5)';
    } else {
        outcome = 'Death (mRS 6)';
    }
    
    document.getElementById('rankin-result').innerHTML = `
        <div class="result-section">
            <h5>Modified Rankin Scale Results</h5>
            <div class="result-grid">
                <div><strong>Score:</strong> ${score}/6</div>
                <div><strong>Description:</strong> ${description}</div>
                <div><strong>Outcome Category:</strong> ${outcome}</div>
                <div><strong>Prognosis:</strong> ${prognosis}</div>
            </div>
            <div class="care-needs">
                <h6>Care Requirements:</h6>
                <p>${careNeeds}</p>
            </div>
            <div class="alert alert-info">
                💡 <strong>Clinical Use:</strong> Primary outcome measure in stroke trials. mRS 0-2 considered good functional outcome.
            </div>
        </div>
    `;

    },

    calculateRASS() {

    const level = document.getElementById('rass-level').value;
    const score = parseInt(level);
    
    let category = '';
    let description = '';
    let management = '';
    let targetRange = '';
    
    if (score >= 3) {
        category = 'Severe Agitation';
        description = 'Patient is combative or very agitated';
        management = '• Consider sedation (propofol, midazolam)<br>• Assess for pain, delirium, hypoxia<br>• Ensure patient safety<br>• Consider physical restraints if necessary';
        targetRange = 'Aim to reduce to 0 to -2 range';
    } else if (score >= 1) {
        category = 'Mild-Moderate Agitation';
        description = 'Patient is restless or mildly agitated';
        management = '• Investigate underlying causes<br>• Consider non-pharmacological interventions<br>• Light sedation if needed<br>• Frequent reassessment';
        targetRange = 'Aim for 0 to -1 range';
    } else if (score === 0) {
        category = 'Alert and Calm';
        description = 'Ideal conscious level for most patients';
        management = '• No intervention needed<br>• Continue current management<br>• Monitor for changes';
        targetRange = 'Optimal level for most patients';
    } else if (score >= -2) {
        category = 'Light Sedation';
        description = 'Appropriate sedation level for many ICU patients';
        management = '• Appropriate for mechanically ventilated patients<br>• Consider daily sedation holds<br>• Monitor for oversedation';
        targetRange = 'Often target range for ventilated patients';
    } else if (score >= -3) {
        category = 'Moderate Sedation';
        description = 'Deeper sedation - assess necessity';
        management = '• Review sedation requirements<br>• Consider reducing sedation if appropriate<br>• Daily sedation interruption';
        targetRange = 'May be appropriate for specific indications';
    } else {
        category = 'Deep Sedation/Unconscious';
        description = 'Very deep sedation or unconscious';
        management = '• Review indication for deep sedation<br>• Consider reducing if possible<br>• Assess neurological status<br>• May indicate paralysis or coma';
        targetRange = 'Usually avoid unless specific indication';
    }
    
    document.getElementById('rass-result').innerHTML = `
        <div class="result-section">
            <h5>RASS Assessment Results</h5>
            <div class="result-grid">
                <div><strong>RASS Score:</strong> ${level}</div>
                <div><strong>Category:</strong> ${category}</div>
                <div><strong>Description:</strong> ${description}</div>
            </div>
            <div class="management-section">
                <h6>Management Recommendations:</h6>
                <div class="management-text">${management}</div>
            </div>
            <div class="alert alert-info">
                <strong>Target Range:</strong> ${targetRange}
            </div>
            <div class="alert alert-warning">
                💡 <strong>Remember:</strong> Assess RASS regularly. Target is usually 0 to -2 for mechanically ventilated patients.
            </div>
        </div>
    `;

    },

    calculateFractureRisk() {

    const age = parseInt(document.getElementById('frax-age').value);
    const sex = document.querySelector('input[name="frax-sex"]:checked')?.value;
    const weight = parseFloat(document.getElementById('frax-weight').value);
    const height = parseFloat(document.getElementById('frax-height').value);
    const bmd = document.getElementById('frax-bmd').value;
    
    if (!age || !sex || !weight || !height) {
        document.getElementById('frax-result').innerHTML = '<div class="error">Please fill in all required fields</div>';
        return;
    }
    
    // Calculate BMI
    const bmi = weight / ((height / 100) ** 2);
    
    // Count risk factors
    let riskFactors = 0;
    const riskInputs = [
        'frax-previous-fracture',
        'frax-parent-fracture', 
        'frax-smoking',
        'frax-steroids',
        'frax-ra',
        'frax-secondary',
        'frax-alcohol'
    ];
    
    riskInputs.forEach(id => {
        if (document.getElementById(id).checked) {
            riskFactors++;
        }
    });
    
    // Simplified risk calculation (real FRAX uses complex algorithms)
    let baseRisk = 0;
    
    // Age factor (increases significantly with age)
    if (age < 50) baseRisk += 2;
    else if (age < 60) baseRisk += 5;
    else if (age < 70) baseRisk += 10;
    else if (age < 80) baseRisk += 20;
    else baseRisk += 35;
    
    // Sex factor (women higher risk post-menopause)
    if (sex === 'female' && age >= 50) {
        baseRisk += 5;
    }
    
    // BMI factor (low BMI increases risk)
    if (bmi < 20) baseRisk += 3;
    else if (bmi < 22) baseRisk += 1;
    
    // Risk factors (each adds to risk)
    baseRisk += riskFactors * 3;
    
    // BMD adjustment if provided
    if (bmd) {
        const bmdValue = parseFloat(bmd);
        if (bmdValue < -2.5) baseRisk += 8;
        else if (bmdValue < -2.0) baseRisk += 5;
        else if (bmdValue < -1.0) baseRisk += 2;
    }
    
    // Cap at reasonable maximum
    const majorFractureRisk = Math.min(baseRisk, 50);
    const hipFractureRisk = Math.round(majorFractureRisk * 0.3); // Hip fractures are subset
    
    let riskCategory = '';
    let recommendation = '';
    
    if (majorFractureRisk < 10) {
        riskCategory = 'Low Risk';
        recommendation = 'Lifestyle measures: adequate calcium (1000-1200mg/day), vitamin D (800-1000 IU/day), weight-bearing exercise, fall prevention';
    } else if (majorFractureRisk < 20) {
        riskCategory = 'Moderate Risk';
        recommendation = 'Consider treatment. DEXA scan recommended. First-line: Alendronate 70mg weekly or Risedronate 35mg weekly';
    } else {
        riskCategory = 'High Risk';
        recommendation = 'Treatment recommended. Consider bisphosphonates, denosumab, or other anti-osteoporotic therapy. Specialist referral may be needed';
    }
    
    document.getElementById('frax-result').innerHTML = `
        <div class="result-section">
            <h5>FRAX Fracture Risk Results</h5>
            <div class="result-grid">
                <div><strong>BMI:</strong> ${bmi.toFixed(1)} kg/m²</div>
                <div><strong>Risk Factors:</strong> ${riskFactors}/7</div>
                <div><strong>Major Fracture Risk:</strong> ${majorFractureRisk}% (10-year)</div>
                <div><strong>Hip Fracture Risk:</strong> ${hipFractureRisk}% (10-year)</div>
                <div><strong>Risk Category:</strong> ${riskCategory}</div>
            </div>
            <div class="recommendation-section">
                <h6>Management Recommendations:</h6>
                <p>${recommendation}</p>
            </div>
            <div class="alert alert-warning">
                ⚠️ <strong>Important:</strong> This is a simplified calculation. Use official FRAX tool (www.sheffield.ac.uk/FRAX) for clinical decision-making.
            </div>
            <div class="alert alert-info">
                💡 <strong>NICE Thresholds:</strong> Consider treatment if major fracture risk ≥10% or hip fracture risk ≥3%
            </div>
        </div>
    `;

    },

    calculateAnionGap() {

    const sodium = parseFloat(document.getElementById('ag-sodium').value);
    const chloride = parseFloat(document.getElementById('ag-chloride').value);
    const bicarbonate = parseFloat(document.getElementById('ag-bicarbonate').value);
    
    if (!sodium || !chloride || !bicarbonate) {
        document.getElementById('anion-gap-result').innerHTML = '<p class="error">Please enter all values</p>';
        return;
    }
    
    if (sodium < 120 || sodium > 160) {
        document.getElementById('anion-gap-result').innerHTML = '<p class="error">Sodium value seems unrealistic (120-160 mEq/L expected)</p>';
        return;
    }
    
    if (chloride < 90 || chloride > 120) {
        document.getElementById('anion-gap-result').innerHTML = '<p class="error">Chloride value seems unrealistic (90-120 mEq/L expected)</p>';
        return;
    }
    
    if (bicarbonate < 10 || bicarbonate > 35) {
        document.getElementById('anion-gap-result').innerHTML = '<p class="error">Bicarbonate value seems unrealistic (10-35 mEq/L expected)</p>';
        return;
    }
    
    // Calculate anion gap: Na+ - (Cl- + HCO3-)
    const anionGap = sodium - (chloride + bicarbonate);
    
    let interpretation = '';
    let color = '';
    let recommendations = '';
    
    if (anionGap < 8) {
        interpretation = 'Low Anion Gap';
        color = '#2196F3';
        recommendations = `
            <strong>Possible Causes:</strong><br>
            • Laboratory error (most common)<br>
            • Hypoalbuminemia<br>
            • Multiple myeloma<br>
            • Hypercalcemia, hypermagnesemia<br>
            • Lithium intoxication<br>
            <strong>Action:</strong> Recheck labs, consider protein electrophoresis
        `;
    } else if (anionGap >= 8 && anionGap <= 12) {
        interpretation = 'Normal Anion Gap';
        color = '#4CAF50';
        recommendations = `
            <strong>Normal Range:</strong> No metabolic acidosis indicated<br>
            If acidosis present, consider:<br>
            • Normal anion gap metabolic acidosis<br>
            • Diarrhea, ureterosigmoidostomy<br>
            • Renal tubular acidosis<br>
            • Carbonic anhydrase inhibitors
        `;
    } else if (anionGap > 12 && anionGap <= 16) {
        interpretation = 'Mildly Elevated Anion Gap';
        color = '#FF9800';
        recommendations = `
            <strong>Mild Elevation:</strong> Monitor closely<br>
            • Early/mild metabolic acidosis<br>
            • Chronic kidney disease<br>
            • Dehydration<br>
            • Consider arterial blood gas<br>
            <strong>Action:</strong> Check serum lactate, ketones, creatinine
        `;
    } else {
        interpretation = 'High Anion Gap';
        color = '#F44336';
        recommendations = `
            <strong>High Anion Gap Metabolic Acidosis!</strong><br>
            <strong>MUDPILES causes:</strong><br>
            • <strong>Methanol</strong> poisoning<br>
            • <strong>Uremia</strong> (BUN >60)<br>
            • <strong>Diabetic</strong> ketoacidosis<br>
            • <strong>Paracetamol</strong>/Paraldehyde<br>
            • <strong>Isoniazid</strong>/Iron<br>
            • <strong>Lactic</strong> acidosis<br>
            • <strong>Ethylene glycol</strong><br>
            • <strong>Salicylates</strong><br>
            <strong>Urgent:</strong> ABG, lactate, ketones, osmolar gap
        `;
    }
    
    document.getElementById('anion-gap-result').innerHTML = `
        <div class="result-summary">
            <div class="result-value" style="color: ${color}">
                <strong>Anion Gap: ${anionGap.toFixed(1)} mEq/L</strong>
            </div>
            <div class="result-interpretation" style="color: ${color}">
                <strong>${interpretation}</strong>
            </div>
        </div>
        
        <div class="calculation-details">
            <h5>Calculation:</h5>
            <p>Anion Gap = Na<sup>+</sup> - (Cl<sup>-</sup> + HCO<sub>3</sub><sup>-</sup>)</p>
            <p>= ${sodium} - (${chloride} + ${bicarbonate}) = <strong>${anionGap.toFixed(1)} mEq/L</strong></p>
        </div>
        
        <div class="clinical-guidance">
            <h5>Clinical Interpretation:</h5>
            <div style="background-color: rgba(${color === '#F44336' ? '244,67,54' : color === '#FF9800' ? '255,152,0' : color === '#4CAF50' ? '76,175,80' : '33,150,243'}, 0.1); padding: 10px; border-radius: 5px; margin-top: 8px;">
                ${recommendations}
            </div>
        </div>
        
        <div class="additional-info">
            <h5>Additional Considerations:</h5>
            <ul>
                <li><strong>Delta ratio:</strong> If high AG acidosis, check Δ(AG)/Δ(HCO3-) for mixed disorders</li>
                <li><strong>Osmolar gap:</strong> Consider if methanol/ethylene glycol suspected</li>
                <li><strong>Albumin correction:</strong> For every 1 g/dL ↓ albumin, AG ↓ by ~2.5</li>
            </ul>
        </div>
    `;

    }

};

// Export to window for V2 bridge
if (typeof window !== 'undefined') {
    window.ExtractedCalculators = ExtractedCalculators;
}

console.log('✅ ExtractedCalculators loaded: 61 getters, 65 calculate functions');
