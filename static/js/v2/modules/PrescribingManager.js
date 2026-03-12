/**
 * PrescribingManager.js
 *
 * Standalone module for the Prescribing section.
 * Contains all data (scenarios, interactions, dose adjustments, cases,
 * antibiotic stewardship) and logic for every sub-tab.
 *
 * Follows the same class-singleton pattern as MedStatsEthicsManager.js
 * so it can be imported and initialised in main.js alongside every other
 * feature manager.
 *
 * Sub-tabs
 * ─────────
 *  1. Prescription Simulator   – scenario-based prescribing with instant feedback
 *  2. Drug Interaction Checker – 20 high-yield pairs; live lookup
 *  3. Renal & Hepatic Dosing   – eGFR / Child-Pugh dose tables for 12 drugs
 *  4. Prescribing Error Cases  – 10 MCQ cases with score tracking
 *  5. Controlled Drug Rules    – static reference (HTML, no JS needed)
 *  6. Antibiotic Stewardship   – empirical regimens + IV-to-oral switch
 */

class PrescribingManager {

    constructor() {
        this._caseAnswers = {};
        this._initialized = false;
    }

    /* ═══════════════════════════════════════════════════════════════
       PUBLIC API – called by main.js
       ═══════════════════════════════════════════════════════════════ */

    async initialize() {
        if (this._initialized) return;
        this._initSubNavTabs();
        this._renderCases();
        this._buildQuickCards();
        this._buildAbxGrid();
        this._exposeWindowHandlers();
        this._initialized = true;
    }

    /** Minimal stats object expected by main.js */
    getStatistics() {
        return {
            scenarios:    Object.keys(SIM_SCENARIOS).length,
            interactions: INTERACTIONS.length,
            doseEntries:  DOSE_TABLE.length,
            cases:        CASES.length,
            abxConditions: ABX_DATA.length
        };
    }

    /* ═══════════════════════════════════════════════════════════════
       1. SUB-NAV TAB SWITCHING
       ═══════════════════════════════════════════════════════════════ */

    _initSubNavTabs() {
        const btns = document.querySelectorAll('.prx-tab-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('.prx-tab-content').forEach(c => c.classList.remove('active'));
                const target = document.getElementById('prx-' + btn.dataset.prx);
                if (target) target.classList.add('active');
            });
        });
    }

    /* ═══════════════════════════════════════════════════════════════
       2. PRESCRIPTION SIMULATOR
       ═══════════════════════════════════════════════════════════════ */

    loadScenario() {
        const sel = document.getElementById('prxScenario').value;
        const box = document.getElementById('prxScenarioBox');
        const txt = document.getElementById('prxScenarioText');
        document.getElementById('prxFeedback').innerHTML =
            '<p style="color:var(--v2-text-tertiary);font-size:13px;">Fill in your prescription and press <em>Check</em>.</p>';
        if (sel && SIM_SCENARIOS[sel]) {
            box.style.display = 'block';
            txt.textContent = SIM_SCENARIOS[sel].text;
        } else {
            box.style.display = 'none';
        }
    }

    checkPrescription() {
        const scenario = document.getElementById('prxScenario').value;
        const drug     = document.getElementById('prxDrug').value.trim();
        const dose     = document.getElementById('prxDose').value.trim();
        const route    = document.getElementById('prxRoute').value;
        const freq     = document.getElementById('prxFreq').value;
        const fb       = document.getElementById('prxFeedback');

        if (!scenario) { fb.innerHTML = '<div class="prx-result-item warn">⚠️ Please select a scenario first.</div>'; return; }
        if (!drug)     { fb.innerHTML = '<div class="prx-result-item warn">⚠️ Please enter a drug name.</div>'; return; }

        const sc = SIM_SCENARIOS[scenario];
        let html = '';
        let allGood = true;

        sc.checks.forEach(chk => {
            if (!chk.test(drug, dose, route, freq)) {
                allGood = false;
                html += `<div class="prx-result-item ${chk.type}">❌ ${chk.fail}</div>`;
            }
        });

        if (allGood) {
            html = `<div class="prx-result-item ok">✅ Excellent! Your prescription looks correct for this scenario. Drug: <strong>${drug}</strong>, Dose: <strong>${dose}</strong>, Route: <strong>${route}</strong>, Frequency: <strong>${freq}</strong>.</div>`;
        }

        html += `<div class="prx-result-item info" style="margin-top:10px;">📌 <strong>Scenario tip:</strong> ${sc.text}</div>`;
        fb.innerHTML = html;
    }

    clearSimulator() {
        ['prxDrug','prxDose','prxIndication'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        ['prxRoute','prxFreq','prxScenario'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        const box = document.getElementById('prxScenarioBox');
        if (box) box.style.display = 'none';
        document.getElementById('prxFeedback').innerHTML =
            '<p style="color:var(--v2-text-tertiary);font-size:13px;">Select a scenario, fill in your prescription, and press <em>Check</em>.</p>';
    }

    /* ═══════════════════════════════════════════════════════════════
       3. DRUG INTERACTION CHECKER
       ═══════════════════════════════════════════════════════════════ */

    checkInteractions() {
        const a  = document.getElementById('prxIntDrugA').value.trim();
        const b  = document.getElementById('prxIntDrugB').value.trim();
        const c  = document.getElementById('prxIntDrugC').value.trim();
        const box = document.getElementById('prxIntResults');

        if (!a || !b) {
            box.innerHTML = '<div class="prx-result-item warn">⚠️ Please enter at least two drug names.</div>';
            return;
        }

        const drugList = [a, b, c].filter(Boolean);
        const found    = this._findInteractions(drugList);

        if (!found.length) {
            box.innerHTML = `<div class="prx-result-item ok">✅ No major interactions found between <strong>${drugList.join(', ')}</strong> in our database. Always verify with a pharmacist or BNF for patient-specific factors.</div>`;
            return;
        }

        const sevColour = { severe: 'error', moderate: 'warn', minor: 'info' };
        box.innerHTML = found.map(int => `
            <div class="prx-result-item ${sevColour[int.severity] || 'info'}">
                <strong>${int.severity.toUpperCase()} — ${int.drugs.join(' + ')}</strong><br>
                <em>Mechanism:</em> ${int.mechanism}<br>
                <em>Effect:</em> ${int.effect}<br>
                <em>Action:</em> ${int.advice}
            </div>
        `).join('');
    }

    _normalizeDrug(s) {
        return s.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    _findInteractions(drugList) {
        const normalized = drugList.map(d => this._normalizeDrug(d)).filter(Boolean);
        return INTERACTIONS.filter(int => {
            return int.drugs.every(id =>
                normalized.some(n => n.includes(this._normalizeDrug(id)) || this._normalizeDrug(id).includes(n))
            );
        });
    }

    _buildQuickCards() {
        const el = document.getElementById('prxIntQuickCards');
        if (!el) return;
        el.innerHTML = QUICK_PAIRS.map(p => `
            <div class="prx-card">
                <h4><span class="prx-badge ${p.badge}">${p.badge === 'danger' ? 'SEVERE' : 'MODERATE'}</span>${p.pair}</h4>
                <p>${p.note}</p>
            </div>
        `).join('');
    }

    /* ═══════════════════════════════════════════════════════════════
       4. RENAL & HEPATIC DOSE ADJUSTMENT
       ═══════════════════════════════════════════════════════════════ */

    showDoseAdjust() {
        const egfr   = parseFloat(document.getElementById('prxEGFR').value);
        const cp     = document.getElementById('prxChildPugh').value;
        const filter = document.getElementById('prxRenalDrug').value.trim().toLowerCase();
        const box    = document.getElementById('prxDoseResults');

        let drugs = DOSE_TABLE;
        if (filter) drugs = drugs.filter(d => d.drug.toLowerCase().includes(filter));

        if (!drugs.length) {
            box.innerHTML = '<div class="prx-result-item warn">No drugs matched your search.</div>';
            return;
        }

        box.innerHTML = drugs.map(d => {
            let renalText = '—', renalFlag = 'green';
            if (!isNaN(egfr)) {
                const row = (d.renal || []).find(r => egfr >= r.min && egfr <= r.max);
                if (row) { renalText = row.dose; renalFlag = row.flag; }
            } else { renalText = 'Enter eGFR above'; }

            let hepaticText = '—';
            if (cp && d.hepatic && d.hepatic[cp]) hepaticText = d.hepatic[cp];

            return `
                <div class="prx-dose-card">
                    <div class="drug-name">💊 ${d.drug}</div>
                    <div class="dose-row"><span>Normal dose:</span><span>${d.normal}</span></div>
                    <div class="dose-row"><span>Renal (eGFR ${isNaN(egfr) ? '?' : egfr}):</span><span class="flag-${renalFlag}">${renalText}</span></div>
                    <div class="dose-row"><span>Hepatic (${cp || '?'}):</span><span>${hepaticText}</span></div>
                </div>
            `;
        }).join('');
    }

    /* ═══════════════════════════════════════════════════════════════
       5. PRESCRIBING ERROR CASES
       ═══════════════════════════════════════════════════════════════ */

    _renderCases() {
        const box = document.getElementById('prxCasesContainer');
        if (!box) return;

        box.innerHTML = CASES.map((c, idx) => `
            <div class="prx-case-card" id="prxCase_${c.id}">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
                    <strong style="font-size:14px;color:var(--v2-text-primary);">Case ${idx + 1}: ${c.title}</strong>
                    ${this._caseAnswers[c.id] !== undefined
                        ? (this._caseAnswers[c.id] === c.correct
                            ? '<span class="prx-badge success">✅ Correct</span>'
                            : '<span class="prx-badge danger">❌ Incorrect</span>')
                        : ''}
                </div>
                <div class="case-vignette">${c.vignette}</div>
                <div class="prx-case-options">
                    ${c.options.map((opt, oi) => {
                        let cls = 'prx-case-opt';
                        let disabled = '';
                        if (this._caseAnswers[c.id] !== undefined) {
                            disabled = 'disabled';
                            if (oi === c.correct) cls += ' correct';
                            else if (oi === this._caseAnswers[c.id]) cls += ' incorrect';
                        }
                        return `<button class="${cls}" ${disabled} onclick="window.prescribingManager.answerCase(${c.id}, ${oi})">${String.fromCharCode(65 + oi)}. ${opt}</button>`;
                    }).join('')}
                </div>
                <div class="prx-case-explanation" id="prxExp_${c.id}"
                     style="${this._caseAnswers[c.id] !== undefined ? 'display:block' : 'display:none'}">
                    📚 <strong>Explanation:</strong> ${c.explanation}
                </div>
            </div>
        `).join('');

        this._updateCaseScore();
    }

    _updateCaseScore() {
        const answered = Object.keys(this._caseAnswers).length;
        const correct  = Object.entries(this._caseAnswers)
            .filter(([id, ans]) => {
                const c = CASES.find(c => c.id === parseInt(id));
                return c && c.correct === ans;
            }).length;
        const el = document.getElementById('prxCaseScore');
        if (el) el.textContent = `${correct} / ${answered} correct  (${CASES.length - answered} remaining)`;
    }

    answerCase(caseId, optionIdx) {
        if (this._caseAnswers[caseId] !== undefined) return;
        this._caseAnswers[caseId] = optionIdx;
        this._renderCases();
    }

    resetCases() {
        this._caseAnswers = {};
        this._renderCases();
    }

    /* ═══════════════════════════════════════════════════════════════
       6. ANTIBIOTIC STEWARDSHIP
       ═══════════════════════════════════════════════════════════════ */

    _buildAbxGrid() {
        const el = document.getElementById('prxAbxGrid');
        if (!el) return;
        el.innerHTML = ABX_DATA.map(d => `
            <div class="abx-card">
                <h4>${d.condition} <span class="abx-iv-oral ${d.route}">${d.route === 'oral' ? 'ORAL' : d.route === 'iv' ? 'IV' : 'IV→ORAL'}</span></h4>
                <div class="abx-row"><strong>Severity:</strong> ${d.severity}</div>
                <div class="abx-row"><strong>1st line:</strong> ${d.firstLine}</div>
                <div class="abx-row"><strong>If penicillin allergy:</strong> ${d.ifAllergy}</div>
                <div class="abx-row"><strong>Severe/failing:</strong> ${d.severe}</div>
                <div class="abx-row"><strong>Review:</strong> ${d.review}</div>
                ${d.notes ? `<div class="abx-switch-criteria">💡 ${d.notes}</div>` : ''}
            </div>
        `).join('');
    }

    /* ═══════════════════════════════════════════════════════════════
       WINDOW HANDLER BRIDGE
       Exposes methods that HTML onclick attributes call.
       ═══════════════════════════════════════════════════════════════ */

    _exposeWindowHandlers() {
        window.prescribingManager = this;

        // Legacy short-name aliases used by inline onclick attributes in the HTML panel
        window.prxLoadScenario      = () => this.loadScenario();
        window.prxCheckPrescription = () => this.checkPrescription();
        window.prxClear             = () => this.clearSimulator();
        window.prxCheckInteractions = () => this.checkInteractions();
        window.prxShowDoseAdjust    = () => this.showDoseAdjust();
        window.prxAnswerCase        = (id, idx) => this.answerCase(id, idx);
        window.prxResetCases        = () => this.resetCases();
    }
}

/* ═══════════════════════════════════════════════════════════════════
   DATA TABLES
   Kept as module-level constants so they are easy to find and edit.
   ═══════════════════════════════════════════════════════════════════ */

/* ── Prescription Simulator scenarios ──────────────────────────── */
const SIM_SCENARIOS = {
    acs: {
        text: '67-year-old man, 30 min of crushing central chest pain, 12-lead ECG shows ST elevation V1-V4. BP 138/82, HR 94. No known drug allergies. Aspirin not yet given.',
        checks: [
            { test: d => /aspirin/i.test(d),                                   fail: 'Drug should be aspirin for STEMI loading dose.',                                         type: 'error' },
            { test: (d, dose) => parseFloat(dose) === 300,                      fail: 'Correct STEMI loading dose is 300 mg (not 75 mg).',                                     type: 'error' },
            { test: (d, dose, route) => /oral|po/i.test(route),                 fail: 'Route should be oral for aspirin.',                                                      type: 'error' },
            { test: (d, dose, route, freq) => /stat|once/i.test(freq),          fail: 'Aspirin 300 mg is given as a STAT (one-off) loading dose.',                             type: 'warn'  },
        ]
    },
    heartfailure: {
        text: '72-year-old woman. Acute SOB, bilateral basal crepitations, bilateral ankle oedema, JVP elevated. CXR: pulmonary oedema. HR 102, BP 155/90. eGFR 58.',
        checks: [
            { test: d => /furosemide|frusemide/i.test(d),                       fail: 'IV furosemide is first-line for acute decompensated heart failure.',                    type: 'error' },
            { test: (d, dose) => parseFloat(dose) >= 40 && parseFloat(dose) <= 80, fail: 'Typical IV furosemide dose is 40–80 mg (higher if already on oral furosemide).',    type: 'warn'  },
            { test: (d, dose, route) => /iv/i.test(route),                      fail: 'IV route is preferred in acute pulmonary oedema for rapid diuresis.',                  type: 'error' },
        ]
    },
    pneumonia: {
        text: '45-year-old woman, 3 days of productive cough, fever 38.6 °C, RR 18, O₂ sats 96% on air. CXR: right lower lobe consolidation. CURB-65 = 1. No penicillin allergy.',
        checks: [
            { test: d => /amoxicillin/i.test(d),                                fail: 'Amoxicillin is first-line for mild/moderate CAP (CURB-65 0–1).',                       type: 'error' },
            { test: (d, dose) => parseFloat(dose) === 500,                      fail: 'Standard dose is amoxicillin 500 mg TDS (severe: 1 g TDS).',                           type: 'warn'  },
            { test: (d, dose, route) => /oral|po/i.test(route),                 fail: 'Oral route is appropriate for mild CAP (CURB-65 ≤1).',                                  type: 'error' },
            { test: (d, dose, route, freq) => /tds|three/i.test(freq),          fail: 'Amoxicillin should be given TDS — three times daily.',                                  type: 'error' },
        ]
    },
    uti: {
        text: '28-year-old woman, dysuria, frequency, no fever, no loin pain. Urine dip: nitrites +, leucocytes ++. Not pregnant. No kidney disease.',
        checks: [
            { test: d => /trimethoprim|nitrofurantoin/i.test(d),
              fail: 'First-line options are trimethoprim 200 mg BD or nitrofurantoin MR 100 mg BD (check local guidelines).', type: 'error' },
            { test: (d, dose) => {
                if (/trimethoprim/i.test(d))   return parseFloat(dose) === 200;
                if (/nitrofurantoin/i.test(d)) return parseFloat(dose) === 100;
                return false;
              }, fail: 'Trimethoprim: 200 mg BD. Nitrofurantoin MR: 100 mg BD. Duration: 3 days.',                           type: 'warn'  },
            { test: (d, dose, route, freq) => /bd|twice/i.test(freq),           fail: 'Both first-line UTI drugs are given BD (twice daily).',                                 type: 'error' },
        ]
    },
    afib: {
        text: '58-year-old man, palpitations 2h. ECG: AF, ventricular rate 138 bpm. BP 126/78. No heart failure, no WPW. Haemodynamically stable.',
        checks: [
            { test: d => /bisoprolol|metoprolol|diltiazem|verapamil/i.test(d),
              fail: 'Rate control first: beta-blocker (bisoprolol) or rate-limiting CCB (diltiazem / verapamil) are preferred.', type: 'error' },
            { test: (d, dose, route) => /oral|po/i.test(route),                 fail: 'Oral is appropriate in stable AF for rate control.',                                    type: 'warn'  },
            { test: d => !/amiodarone/i.test(d),
              fail: 'Amiodarone for rate control is only for haemodynamically unstable patients or where other agents have failed.', type: 'warn' },
        ]
    },
    pe: {
        text: '55-year-old woman, pleuritic chest pain and mild dyspnoea. CTPA confirms right-sided PE. sPESI 0 (low risk). eGFR 75. No contraindication to anticoagulation.',
        checks: [
            { test: d => /apixaban|rivaroxaban|dabigatran|edoxaban/i.test(d),
              fail: 'DOACs (apixaban, rivaroxaban) are first-line for PE. Apixaban: 10 mg BD for 7 days, then 5 mg BD.', type: 'error' },
            { test: (d, dose) => {
                if (/apixaban/i.test(d))    return parseFloat(dose) === 10;
                if (/rivaroxaban/i.test(d)) return parseFloat(dose) === 15;
                return true;
              }, fail: 'Apixaban loading: 10 mg BD × 7 days. Rivaroxaban loading: 15 mg BD × 21 days.',                       type: 'warn'  },
            { test: (d, dose, route) => /oral|po/i.test(route),                 fail: 'DOACs are given orally.',                                                               type: 'error' },
        ]
    },
    pain: {
        text: '42-year-old man, day 1 post-appendicectomy. Requesting analgesia. eGFR 90, no allergy. Current meds: paracetamol 1 g QDS.',
        checks: [
            { test: d => !/codeine|dihydrocodeine|tramadol|morphine/i.test(d),
              fail: 'Consider adding an NSAID (e.g. ibuprofen) before escalating to opioids in post-op pain if not contraindicated.', type: 'warn' },
            { test: d => /ibuprofen|naproxen|diclofenac|ketorolac/i.test(d),
              fail: 'Adding an NSAID to regular paracetamol (multi-modal analgesia) is recommended first step.', type: 'error' },
            { test: (d, dose) => parseFloat(dose) <= 400,
              fail: 'Ibuprofen dose: 200–400 mg TDS with food. Consider PPI if risk factors for GI bleeding.', type: 'warn' },
        ]
    },
    dka: {
        text: '24-year-old man, T1DM, drowsy, Kussmaul breathing. BM 28 mmol/L, ketones 4.2 mmol/L, pH 7.12, K⁺ 3.8 mEq/L. BP 88/60.',
        checks: [
            { test: d => /sodium.chloride|0\.9.*nacl|normal saline|saline/i.test(d),
              fail: 'Initial fluid resuscitation in DKA: 0.9% sodium chloride 1 L IV over 1h.', type: 'error' },
            { test: (d, dose, route) => /iv/i.test(route),
              fail: 'IV route is essential for fluid resuscitation in DKA.', type: 'error' },
            { test: d => !/dextrose|5%.*/i.test(d),
              fail: '5% dextrose is only added later (when blood glucose < 14 mmol/L) — do not start with glucose.', type: 'warn' },
        ]
    },
    anaphylaxis: {
        text: '22-year-old woman, minutes after eating at a restaurant. Stridor, facial swelling, urticaria, BP 72/40, SpO₂ 90% on air. No known allergies previously documented.',
        checks: [
            { test: d => /adrenaline|epinephrine/i.test(d),
              fail: 'IM adrenaline (epinephrine) 0.5 mg is first-line in anaphylaxis — given before antihistamines or steroids.', type: 'error' },
            { test: (d, dose) => parseFloat(dose) === 0.5,
              fail: 'Adult dose: 500 micrograms (0.5 mg = 0.5 mL of 1:1000). Repeat IM every 5 min if no improvement.', type: 'error' },
            { test: (d, dose, route) => /im|intramuscular/i.test(route),
              fail: 'Route must be IM (anterolateral thigh). NOT IV — IV adrenaline in non-arrested patients risks dangerous hypertension/arrhythmia.', type: 'error' },
            { test: (d, dose, route, freq) => /stat|once/i.test(freq),
              fail: 'Give as STAT dose. Can repeat every 5 min if no clinical improvement.', type: 'warn' },
        ]
    },
    status_epilepticus: {
        text: '35-year-old man, known epilepsy, generalised tonic-clonic seizure now 8 minutes in A&E. IV access in situ. No benzodiazepine given yet.',
        checks: [
            { test: d => /lorazepam|diazepam|midazolam/i.test(d),
              fail: 'IV lorazepam 4 mg is first-line in status epilepticus with IV access. Alternatives: IV diazepam 10–20 mg, or buccal/IM midazolam 10 mg if no IV access.', type: 'error' },
            { test: (d, dose) => {
                if (/lorazepam/i.test(d)) return parseFloat(dose) === 4;
                if (/diazepam/i.test(d)) return parseFloat(dose) >= 10 && parseFloat(dose) <= 20;
                if (/midazolam/i.test(d)) return parseFloat(dose) === 10;
                return true;
              }, fail: 'Lorazepam 4 mg IV (repeat once after 10 min). Diazepam 10–20 mg IV. If no IV access: midazolam 10 mg buccal/IM.', type: 'error' },
            { test: (d, dose, route) => /iv|intravenous|buccal|im|intramuscular/i.test(route),
              fail: 'IV preferred with IV access. Use buccal or IM midazolam if no IV access.', type: 'error' },
            { test: (d, dose, route, freq) => /stat|once/i.test(freq),
              fail: 'STAT dose; can repeat once. If seizure continues after 2 doses → second-line IV phenobarbital or levetiracetam.', type: 'warn' },
        ]
    },
    sepsis_fluids: {
        text: '58-year-old man, confusion, RR 24, HR 118, BP 82/50, T 39.1°C, SpO₂ 94% on air. Suspected urosepsis. Sepsis 6 bundle initiated. IV access in situ.',
        checks: [
            { test: d => /sodium.chloride|0\.9.*nacl|normal.saline|saline/i.test(d),
              fail: 'Initial sepsis fluid resuscitation: 500 mL crystalloid (0.9% sodium chloride) IV bolus. Repeat to 30 mL/kg in first hour if inadequate response.', type: 'error' },
            { test: (d, dose) => parseFloat(dose) === 500,
              fail: 'Give 500 mL bolus initially; reassess fluid status and MAP after each bolus.', type: 'warn' },
            { test: (d, dose, route) => /iv/i.test(route),
              fail: 'IV administration required — oral absorption unreliable in septic shock.', type: 'error' },
            { test: (d, dose, route, freq) => /stat|once|bolus/i.test(freq),
              fail: 'Give over 15 min as a bolus. Reassess cardiac status frequently.', type: 'warn' },
        ]
    },
    hypertensive_emergency: {
        text: '52-year-old woman, severe headache, visual disturbance, BP 218/134 mmHg. Grade III retinopathy on fundoscopy. Alert, no focal neurology. No aortic dissection.',
        checks: [
            { test: d => /labetalol|nicardipine|hydralazine|glyceryl.trinitrate|gtn|sodium.nitroprusside/i.test(d),
              fail: 'IV labetalol is first-line for hypertensive emergency (if no contraindication). Nicardipine or hydralazine IV are alternatives. Aim 20–25% MAP reduction in first hour — not to normal.', type: 'error' },
            { test: (d, dose, route) => /iv/i.test(route),
              fail: 'IV route required for controlled, titrated reduction. Oral/sublingual agents cause uncontrolled BP drops.', type: 'error' },
            { test: d => !/nifedipine/i.test(d),
              fail: 'Rapid-acting sublingual nifedipine is DANGEROUS — causes uncontrolled BP drop → risk of ischaemic stroke from cerebral hypoperfusion.', type: 'error' },
        ]
    },
    copd_exacerbation: {
        text: '70-year-old man, GOLD stage 3 COPD, acutely breathless, RR 28, SpO₂ 82% on air, widespread wheeze. Using accessory muscles. No IV access yet.',
        checks: [
            { test: d => /salbutamol|albuterol|ipratropium/i.test(d),
              fail: 'Nebulised salbutamol 2.5–5 mg is first-line bronchodilator in COPD exacerbation. Add ipratropium 500 mcg neb. Use AIR-driven nebuliser (not high-flow oxygen) if CO₂ retention suspected.', type: 'error' },
            { test: (d, dose) => {
                if (/salbutamol/i.test(d)) return parseFloat(dose) >= 2.5 && parseFloat(dose) <= 5;
                if (/ipratropium/i.test(d)) return parseFloat(dose) === 500;
                return true;
              }, fail: 'Salbutamol 2.5–5 mg neb every 20–30 min; ipratropium 500 mcg neb every 4–6h. Target SpO₂ 88–92%.', type: 'warn' },
            { test: (d, dose, route) => /inhaled|nebulised|neb/i.test(route),
              fail: 'Nebulised route for bronchodilators. Deliver using air-driven nebuliser if CO₂ retention risk.', type: 'error' },
        ]
    },
    asthma_acute: {
        text: '19-year-old woman, known asthma, PEFR 32% predicted, cannot complete sentences, SpO₂ 90% on air, HR 118. Acute severe asthma (not life-threatening yet).',
        checks: [
            { test: d => /salbutamol|albuterol|prednisolone|hydrocortisone/i.test(d),
              fail: 'Acute severe asthma: nebulised salbutamol 5 mg IMMEDIATELY + systemic corticosteroid (prednisolone 40–50 mg PO or hydrocortisone 100 mg IV). Give both treatments simultaneously.', type: 'error' },
            { test: (d, dose) => {
                if (/salbutamol/i.test(d)) return parseFloat(dose) === 5;
                if (/prednisolone/i.test(d)) return parseFloat(dose) >= 40 && parseFloat(dose) <= 50;
                if (/hydrocortisone/i.test(d)) return parseFloat(dose) === 100;
                return true;
              }, fail: 'Salbutamol 5 mg neb (repeat every 15–20 min). Prednisolone 40–50 mg PO. Add ipratropium 500 mcg for severe/life-threatening.', type: 'warn' },
            { test: d => !/beta.?blocker|bisoprolol|atenolol|propranolol|metoprolol|carvedilol/i.test(d),
              fail: 'Beta-blockers are ABSOLUTELY CONTRAINDICATED in asthma — even cardioselective beta-blockers can provoke fatal bronchospasm.', type: 'error' },
        ]
    },
    gi_bleed: {
        text: '61-year-old man, 3 episodes of melaena and one haematemesis, HR 115, BP 95/60, Hb 72 g/L. On aspirin. Suspected acute upper GI bleed. Endoscopy planned within 12h.',
        checks: [
            { test: d => /pantoprazole|omeprazole|esomeprazole|ppi|proton.pump/i.test(d),
              fail: 'Pre-endoscopy IV PPI: pantoprazole 80 mg bolus then 8 mg/h infusion. Reduces the need for endoscopic intervention and rebleeding risk.', type: 'error' },
            { test: (d, dose, route) => /iv/i.test(route),
              fail: 'IV route required — oral absorption cannot be guaranteed in haemodynamic compromise/active bleeding.', type: 'error' },
            { test: (d, dose) => {
                if (/pantoprazole|omeprazole/i.test(d)) return parseFloat(dose) === 80;
                return true;
              }, fail: 'Give 80 mg IV bolus, then 8 mg/h infusion. Simultaneously start 0.9% saline IV resuscitation.', type: 'warn' },
        ]
    },
    paracetamol_od: {
        text: '21-year-old woman, intentional paracetamol overdose 3h ago (~18 g, estimated 18 tablets). Clinically well, nausea only. 4h serum paracetamol level above nomogram treatment line. Weight 60 kg.',
        checks: [
            { test: d => /acetylcysteine|n.acetylcysteine|nac|parvolex/i.test(d),
              fail: 'N-acetylcysteine (Parvolex) is the antidote. Start IV NAC immediately when level exceeds nomogram line — do NOT wait for LFT results (hepatotoxicity lags by 24–72h).', type: 'error' },
            { test: (d, dose, route) => /iv/i.test(route),
              fail: 'NAC is given IV (3-bag regimen over 21h): 150 mg/kg in 200 mL glucose over 1h → 50 mg/kg in 500 mL over 4h → 100 mg/kg in 1L over 16h.', type: 'error' },
            { test: d => !/activated.charcoal/i.test(d),
              fail: 'Activated charcoal (50 g) is only useful within 1h of ingestion. At 3h it is too late and should not be routinely given.', type: 'warn' },
        ]
    },
    stroke_thrombolysis: {
        text: '67-year-old man, right arm weakness + expressive dysphasia onset 90 min ago. NIHSS 12. CT head: no haemorrhage. BP 165/90. No contraindications to thrombolysis confirmed.',
        checks: [
            { test: d => /alteplase|t.?pa|rt.?pa|actilyse/i.test(d),
              fail: 'Alteplase (IV tPA) is the licensed thrombolytic for acute ischaemic stroke within 4.5h of onset. Time is brain — every 30 minutes of delay costs ~2 million neurones.', type: 'error' },
            { test: (d, dose) => parseFloat(dose) === 0.9,
              fail: 'Alteplase: 0.9 mg/kg (max 90 mg total). Give 10% as IV bolus over 1 min, remaining 90% as infusion over 60 min.', type: 'warn' },
            { test: (d, dose, route) => /iv/i.test(route),
              fail: 'Only IV route is licensed for stroke thrombolysis. Confirm contraindications are absent (haemorrhage, recent surgery, anticoagulation use, BP >185/110 despite treatment).', type: 'error' },
        ]
    },
    hyperkalaemia: {
        text: '55-year-old man on ramipril + spironolactone for heart failure. K⁺ 7.4 mEq/L, ECG shows peaked T waves and widened QRS. BP 118/76. Haemodynamically stable.',
        checks: [
            { test: d => /calcium.gluconate|calcium.chloride/i.test(d),
              fail: 'IMMEDIATE step: cardiac membrane stabilisation with 10 mL 10% calcium gluconate IV over 5–10 min. This is the first priority when ECG changes are present.', type: 'error' },
            { test: (d, dose) => parseFloat(dose) === 10,
              fail: '10 mL of 10% calcium gluconate IV. Onset 1–3 min. Does NOT lower potassium — protects the heart while K⁺-shifting measures take effect.', type: 'warn' },
            { test: (d, dose, route) => /iv/i.test(route),
              fail: 'Must be given IV slowly over 5–10 min with continuous cardiac monitoring.', type: 'error' },
            { test: (d, dose, route, freq) => /stat|once/i.test(freq),
              fail: 'STAT dose; repeat in 5 min if ECG persists. Then give insulin-dextrose (10 units actrapid + 50 mL 50% glucose IV) to shift K⁺ intracellularly.', type: 'warn' },
        ]
    }
};

/* ── Drug Interactions ──────────────────────────────────────────── */
const INTERACTIONS = [
    { drugs: ['warfarin','aspirin'],           severity:'severe',   mechanism:'Pharmacodynamic – additive anticoagulant + antiplatelet effects.',                                    effect:'↑↑ bleeding risk (GI, intracranial).',                                              advice:'Avoid combination; if unavoidable, use PPI cover and monitor INR closely.' },
    { drugs: ['warfarin','nsaid'],             severity:'severe',   mechanism:'NSAIDs inhibit COX-1 (antiplatelet) AND displace warfarin from plasma proteins.',                     effect:'↑ bleeding risk + GI mucosal damage.',                                             advice:'Avoid; use paracetamol for analgesia instead.' },
    { drugs: ['warfarin','amiodarone'],        severity:'severe',   mechanism:'Amiodarone inhibits CYP2C9 (warfarin metabolism).',                                                   effect:'↑ INR — risk of major bleeding.',                                                   advice:'Reduce warfarin dose ~30–50%; monitor INR weekly initially.' },
    { drugs: ['warfarin','fluconazole'],       severity:'severe',   mechanism:'Fluconazole inhibits CYP2C9 and CYP3A4.',                                                             effect:'↑ INR markedly.',                                                                   advice:'Avoid if possible; if needed, reduce warfarin dose and monitor INR daily.' },
    { drugs: ['warfarin','metronidazole'],     severity:'severe',   mechanism:'Metronidazole inhibits CYP2C9.',                                                                      effect:'↑ INR.',                                                                             advice:'Monitor INR closely; consider empirical warfarin dose reduction.' },
    { drugs: ['methotrexate','nsaid'],         severity:'severe',   mechanism:'NSAIDs reduce renal tubular secretion of methotrexate.',                                              effect:'↑ methotrexate levels → toxicity (myelosuppression, mucositis).',                   advice:'Avoid NSAIDs; use paracetamol. Weekly methotrexate dose only — never daily.' },
    { drugs: ['methotrexate','trimethoprim'],  severity:'severe',   mechanism:'Both folate antagonists; compete for DHFR.',                                                          effect:'Risk of bone marrow suppression.',                                                   advice:'Avoid combination; check FBC.' },
    { drugs: ['lithium','nsaid'],              severity:'severe',   mechanism:'NSAIDs reduce renal lithium clearance.',                                                              effect:'↑ lithium levels → toxicity (tremor, confusion, arrhythmia).',                     advice:'Avoid; if essential, reduce lithium dose and monitor levels closely.' },
    { drugs: ['lithium','ace inhibitor'],      severity:'severe',   mechanism:'ACEi reduce GFR → reduce lithium excretion.',                                                         effect:'↑ lithium levels → toxicity.',                                                       advice:'Monitor lithium levels closely; dose reduction usually needed.' },
    { drugs: ['lithium','thiazide'],           severity:'severe',   mechanism:'Thiazide diuretics cause sodium depletion → renal lithium retention.',                                effect:'↑ lithium levels → toxicity.',                                                       advice:'Avoid; if needed, monitor levels and ensure adequate sodium/fluid intake.' },
    { drugs: ['ssri','tramadol'],              severity:'severe',   mechanism:'Pharmacodynamic serotonin excess; tramadol inhibits serotonin reuptake.',                             effect:'Serotonin syndrome (agitation, hyperthermia, clonus, tachycardia).',               advice:'Avoid; use non-serotonergic analgesics (e.g. codeine with monitoring).' },
    { drugs: ['ssri','maoi'],                  severity:'severe',   mechanism:'Both increase synaptic serotonin — additive.',                                                         effect:'Potentially fatal serotonin syndrome.',                                             advice:'Never combine; washout ≥14 days between drugs (5 weeks for fluoxetine).' },
    { drugs: ['simvastatin','amiodarone'],     severity:'moderate', mechanism:'Amiodarone inhibits CYP3A4 → ↑ simvastatin exposure.',                                               effect:'↑ risk of myopathy and rhabdomyolysis.',                                            advice:'Maximum simvastatin dose 20 mg/day with amiodarone; prefer pravastatin or rosuvastatin.' },
    { drugs: ['simvastatin','clarithromycin'], severity:'severe',   mechanism:'Clarithromycin is a potent CYP3A4 inhibitor.',                                                       effect:'↑↑ simvastatin AUC → rhabdomyolysis risk.',                                         advice:'Withhold simvastatin during clarithromycin course; switch to pravastatin or rosuvastatin.' },
    { drugs: ['digoxin','amiodarone'],         severity:'severe',   mechanism:'Amiodarone inhibits P-gp and CYP2D6 → ↑ digoxin levels; additive AV nodal effects.',                effect:'↑ digoxin toxicity + bradycardia / heart block.',                                   advice:'Reduce digoxin dose by ~50%; monitor levels and ECG.' },
    { drugs: ['ace inhibitor','potassium'],    severity:'moderate', mechanism:'ACEi reduce aldosterone → ↓ potassium excretion.',                                                   effect:'Hyperkalaemia — risk of arrhythmia.',                                               advice:'Avoid potassium supplements unless K⁺ documented low; monitor U&E.' },
    { drugs: ['ace inhibitor','spironolactone'],severity:'moderate',mechanism:'Both agents reduce urinary potassium excretion.',                                                     effect:'Hyperkalaemia (especially in renal impairment).',                                   advice:'Monitor K⁺ regularly; avoid in significant CKD (eGFR <30).' },
    { drugs: ['metformin','iodinated contrast'],severity:'moderate',mechanism:'Contrast can acutely reduce GFR → metformin accumulates.',                                           effect:'Risk of lactic acidosis.',                                                          advice:'Withhold metformin from time of contrast and for 48h; recheck eGFR before restarting.' },
    { drugs: ['ciprofloxacin','antacid'],      severity:'moderate', mechanism:'Divalent cations (Mg²⁺, Al³⁺, Ca²⁺) chelate ciprofloxacin in gut.',                                effect:'↓ ciprofloxacin absorption (up to 90%).',                                           advice:'Separate doses by ≥2h (ciprofloxacin before, antacid after).' },
    { drugs: ['clopidogrel','ppi'],            severity:'moderate', mechanism:'PPIs (especially omeprazole) inhibit CYP2C19 → ↓ clopidogrel prodrug activation.',                  effect:'↓ antiplatelet efficacy.',                                                          advice:'Prefer pantoprazole if PPI needed with clopidogrel.' },
    { drugs: ['rifampicin','warfarin'],         severity:'severe',   mechanism:'Rifampicin is a potent CYP2C9/CYP3A4 inducer → ↑ warfarin metabolism dramatically.',                 effect:'↓ INR — risk of thromboembolic events.',                                          advice:'If unavoidable: increase warfarin dose markedly; monitor INR daily during and for 2–4 weeks after stopping rifampicin.' },
    { drugs: ['rifampicin','ocp'],              severity:'severe',   mechanism:'Rifampicin induces CYP3A4 → ↑ metabolism of oestrogen and progestogen.',                            effect:'Contraceptive failure — risk of unintended pregnancy.',                           advice:'Use additional barrier contraception during rifampicin AND for 28 days after stopping. Copper IUD is the most reliable option.' },
    { drugs: ['carbamazepine','ocp'],           severity:'severe',   mechanism:'Carbamazepine induces CYP3A4 → ↑ metabolism of combined pill and progesterone-only pill.',           effect:'Contraceptive failure.',                                                          advice:'Use non-hormonal (copper IUD) or barrier contraception. Also reduces efficacy of emergency contraception.' },
    { drugs: ['phenytoin','warfarin'],          severity:'severe',   mechanism:'Bidirectional and unpredictable: phenytoin inhibits warfarin metabolism acutely then induces it; warfarin may displace phenytoin from albumin.', effect:'Unpredictable INR and phenytoin toxicity both simultaneously possible.', advice:'Avoid if possible. If needed: monitor INR and free phenytoin levels closely; expect bidirectional dose adjustments.' },
    { drugs: ['beta-blocker','verapamil'],      severity:'severe',   mechanism:'Pharmacodynamic: additive depression of SA node automaticity and AV nodal conduction.',              effect:'Severe bradycardia, complete heart block, cardiac arrest.',                       advice:'IV verapamil + beta-blocker is CONTRAINDICATED. Even oral combination is high-risk — use with specialist guidance only.' },
    { drugs: ['theophylline','ciprofloxacin'], severity:'severe',   mechanism:'Ciprofloxacin inhibits CYP1A2 → ↓ theophylline clearance by up to 60%.',                           effect:'↑ theophylline levels → nausea, arrhythmia, seizures (narrow therapeutic index).', advice:'Reduce theophylline dose 50% if ciprofloxacin essential; monitor plasma levels. Prefer an alternative antibiotic.' },
    { drugs: ['ssri','nsaid'],                  severity:'moderate', mechanism:'SSRIs deplete platelet serotonin (impair aggregation); NSAIDs inhibit COX (↓ prostaglandin gastric protection).', effect:'↑ upper GI bleeding risk 3–15× compared to either alone.', advice:'Add PPI gastroprotection (e.g. omeprazole 20 mg OD) if combination unavoidable. Substitute paracetamol for analgesia where possible.' },
    { drugs: ['ace inhibitor','arb'],           severity:'moderate', mechanism:'Both inhibit RAS: dual blockade causes additive hypotension and ↓ GFR.',                            effect:'↑ risk of AKI and hyperkalaemia — dual RAS blockade.',                           advice:'Avoid routine dual RAS blockade. Monitor K⁺ and creatinine closely if used under specialist supervision.' },
    { drugs: ['codeine','maoi'],                severity:'severe',   mechanism:'Codeine has some serotonin reuptake inhibition; MAOIs prevent MAO-mediated serotonin breakdown.',     effect:'Serotonin syndrome (agitation, hyperthermia, clonus, tachycardia).',             advice:'Avoid — ≥14-day washout after stopping MAOI before codeine. Use non-serotonergic analgesics.' },
    { drugs: ['azathioprine','allopurinol'],    severity:'severe',   mechanism:'Allopurinol inhibits xanthine oxidase — the primary enzyme inactivating azathioprine — causing 4× concentration increase.', effect:'Fatal bone marrow aplasia/pancytopenia.',  advice:'Never-event combination at standard doses. If unavoidable under specialist supervision: reduce azathioprine by 75%; FBC weekly.' },
    { drugs: ['colchicine','clarithromycin'],   severity:'severe',   mechanism:'Clarithromycin potently inhibits P-gp and CYP3A4 — both responsible for colchicine elimination.',   effect:'Colchicine accumulation → multi-organ failure, marrow aplasia, rhabdomyolysis.', advice:'Avoid. Use azithromycin instead of clarithromycin when colchicine is co-prescribed. Withhold colchicine during course if possible.' },
    { drugs: ['st johns wort','ssri'],          severity:'moderate', mechanism:'St Johns Wort (hyperforin) inhibits serotonin reuptake AND induces CYP3A4/P-gp → ↓ SSRI levels.',   effect:'Serotonin syndrome risk + reduced antidepressant efficacy.',                     advice:'Avoid. Counsel patients that herbal supplements interact with prescription medicines. Also reduces OCP and warfarin efficacy.' },
    { drugs: ['haloperidol','amiodarone'],      severity:'severe',   mechanism:'Both prolong cardiac QTc through potassium channel (IKr) blockade — additive.',                     effect:'↑ risk of Torsades de Pointes (TdP) and ventricular fibrillation.',              advice:'Avoid QT-prolonging drug combinations. Check QTc before prescribing. Correct K⁺ and Mg²⁺. ECG monitoring mandatory if unavoidable.' },
    { drugs: ['furosemide','gentamicin'],       severity:'moderate', mechanism:'Furosemide causes ↓ K⁺/Mg²⁺ electrolyte disturbance and has direct cochlear toxicity; gentamicin is independently ototoxic.', effect:'Synergistic irreversible ototoxicity (hearing loss, vestibular damage).', advice:'Avoid concurrent use where possible. If necessary: TDM for gentamicin, correct electrolytes, monitor renal function and consider audiometry.' },
    { drugs: ['methotrexate','penicillin'],     severity:'moderate', mechanism:'Some penicillins (e.g. piperacillin) compete with methotrexate for renal tubular secretion.',          effect:'↑ methotrexate levels → toxicity (myelosuppression, mucositis, nephrotoxicity).', advice:'Monitor methotrexate levels and FBC closely. Ensure weekly dosing only — daily methotrexate is a never-event.' },
];

const QUICK_PAIRS = [
    { pair:'Warfarin + Aspirin',           badge:'danger',  note:'Major bleeding risk — avoid' },
    { pair:'Methotrexate + NSAIDs',        badge:'danger',  note:'Methotrexate toxicity' },
    { pair:'Lithium + NSAIDs',             badge:'danger',  note:'↑ Lithium levels → toxicity' },
    { pair:'SSRI + Tramadol',              badge:'danger',  note:'Serotonin syndrome' },
    { pair:'Simvastatin + Clarithromycin', badge:'danger',  note:'Rhabdomyolysis risk' },
    { pair:'Digoxin + Amiodarone',         badge:'danger',  note:'Digoxin toxicity + bradycardia' },
    { pair:'ACEi + Spironolactone',        badge:'warning', note:'Hyperkalaemia (monitor K⁺)' },
    { pair:'Clopidogrel + Omeprazole',     badge:'warning', note:'↓ Antiplatelet effect' },
    { pair:'Warfarin + Amiodarone',        badge:'danger',  note:'↑ INR — reduce warfarin dose' },
    { pair:'Metformin + IV Contrast',          badge:'warning', note:'Withhold 48h; lactic acidosis risk' },
    { pair:'Rifampicin + Warfarin',             badge:'danger',  note:'Enzyme induction → ↓ INR / thrombosis' },
    { pair:'Beta-blocker + Verapamil IV',       badge:'danger',  note:'Complete heart block — contraindicated' },
    { pair:'Theophylline + Ciprofloxacin',      badge:'danger',  note:'↑ Theophylline → seizures/arrhythmia' },
    { pair:'Azathioprine + Allopurinol',        badge:'danger',  note:'Fatal myelosuppression — never-event' },
    { pair:'SSRIs + NSAIDs',                    badge:'warning', note:'↑ GI bleed 3–15× — add PPI' },
    { pair:'St John\'s Wort + SSRIs',           badge:'warning', note:'Serotonin syndrome + ↓ antidepressant levels' },
    { pair:'ACEi + ARB (dual blockade)',         badge:'warning', note:'AKI + hyperkalaemia — avoid routinely' },
    { pair:'Colchicine + Clarithromycin',       badge:'danger',  note:'Colchicine toxicity — multi-organ failure' },
    { pair:'Carbamazepine + OCP',               badge:'danger',  note:'Contraceptive failure — use copper IUD' },
    { pair:'Furosemide + Gentamicin',           badge:'warning', note:'Synergistic irreversible ototoxicity' },
];

/* ── Renal / Hepatic Dose Table ─────────────────────────────────── */
const DOSE_TABLE = [
    { drug:'Metformin', normal:'500–1000 mg BD',
      renal:[
        { min:45, max:130, dose:'500–1000 mg BD',                  flag:'green' },
        { min:30, max:44,  dose:'500 mg BD (max 1 g/day)',          flag:'amber' },
        { min:0,  max:29,  dose:'CONTRAINDICATED',                  flag:'red'   },
      ], hepatic:{ A:'Normal', B:'Use with caution — monitor LFTs', C:'Avoid (↑ lactic acidosis risk)' } },

    { drug:'Morphine', normal:'2.5–10 mg 4-hrly PRN',
      renal:[
        { min:50, max:130, dose:'Standard dose',                              flag:'green' },
        { min:30, max:49,  dose:'Reduce dose 50%; increase dosing interval',  flag:'amber' },
        { min:0,  max:29,  dose:'Avoid or very low dose; accumulation risk',  flag:'red'   },
      ], hepatic:{ A:'Normal', B:'Reduce dose; increased CNS sensitivity', C:'Avoid — precipitates encephalopathy' } },

    { drug:'Gentamicin', normal:'5–7 mg/kg OD (Hartford protocol) — target trough < 1 mg/L',
      renal:[
        { min:60, max:130, dose:'5–7 mg/kg OD — levels mandatory',                        flag:'green' },
        { min:30, max:59,  dose:'Extend dosing interval to 36–48h; reduce dose',           flag:'amber' },
        { min:0,  max:29,  dose:'Avoid if possible; if essential, TDM every dose',         flag:'red'   },
      ], hepatic:{ A:'Normal — monitor renal', B:'Normal — monitor renal', C:'Normal — monitor renal' } },

    { drug:'Digoxin', normal:'62.5–250 mcg OD',
      renal:[
        { min:50, max:130, dose:'Standard dose',                                          flag:'green' },
        { min:30, max:49,  dose:'Reduce loading dose + maintenance; monitor levels',      flag:'amber' },
        { min:0,  max:29,  dose:'Reduce dose significantly; half-life greatly prolonged', flag:'red'   },
      ], hepatic:{ A:'Normal — renally excreted', B:'Normal — renally excreted', C:'Normal — renally excreted' } },

    { drug:'Lithium', normal:'Target serum level 0.6–1.0 mmol/L',
      renal:[
        { min:60, max:130, dose:'Normal; check levels every 3–6 months',           flag:'green' },
        { min:30, max:59,  dose:'Reduce dose 50%; monitor levels monthly',          flag:'amber' },
        { min:0,  max:29,  dose:'Avoid — renal clearance too unpredictable',        flag:'red'   },
      ], hepatic:{ A:'Normal — renally excreted', B:'Normal — renally excreted', C:'Normal — renally excreted' } },

    { drug:'Apixaban', normal:'10 mg BD × 7d (PE), then 5 mg BD',
      renal:[
        { min:30, max:130, dose:'Standard dosing',                                                                      flag:'green' },
        { min:15, max:29,  dose:'Reduce to 2.5 mg BD if ≥2 of: age ≥80, weight ≤60 kg, Cr ≥133',                      flag:'amber' },
        { min:0,  max:14,  dose:'Not recommended (ESRD)',                                                               flag:'red'   },
      ], hepatic:{ A:'Normal', B:'Use with caution; avoid if coagulopathy', C:'Contraindicated' } },

    { drug:'Rivaroxaban', normal:'20 mg OD with food (AF); 15 mg BD × 21d then 20 mg OD (PE)',
      renal:[
        { min:50, max:130, dose:'Standard dose',                   flag:'green' },
        { min:30, max:49,  dose:'AF: reduce to 15 mg OD with food', flag:'amber' },
        { min:15, max:29,  dose:'Use with caution',                 flag:'amber' },
        { min:0,  max:14,  dose:'Avoid',                            flag:'red'   },
      ], hepatic:{ A:'Normal', B:'Avoid in hepatic disease + coagulopathy', C:'Contraindicated' } },

    { drug:'Trimethoprim', normal:'200 mg BD (3–7 days)',
      renal:[
        { min:30, max:130, dose:'Standard dose',                                           flag:'green' },
        { min:15, max:29,  dose:'200 mg OD',                                               flag:'amber' },
        { min:0,  max:14,  dose:'Avoid (raises creatinine independently; ↑ toxicity)',     flag:'red'   },
      ], hepatic:{ A:'Normal', B:'Normal', C:'Use with caution' } },

    { drug:'Furosemide', normal:'20–80 mg OD/BD (oral); 20–40 mg IV',
      renal:[
        { min:60, max:130, dose:'Standard',                                                                        flag:'green' },
        { min:30, max:59,  dose:'May require higher doses (↓ secretion into tubule)',                              flag:'amber' },
        { min:0,  max:29,  dose:'Higher doses needed; max oral 500 mg; combine with bumetanide if needed',         flag:'amber' },
      ], hepatic:{ A:'Normal', B:'Consider lower dose; hepatic encephalopathy risk if aggressive diuresis', C:'High risk of encephalopathy; use cautiously' } },

    { drug:'Warfarin', normal:'Adjusted to INR (target 2–3 for AF/DVT; 2.5–3.5 for metallic valves)',
      renal:[
        { min:30, max:130, dose:'Standard dose; eGFR < 30 → INR may be less predictable', flag:'green' },
        { min:0,  max:29,  dose:'Extra caution; more frequent INR monitoring',             flag:'amber' },
      ], hepatic:{ A:'Normal', B:'↑ bleeding risk; reduce dose, more frequent INR', C:'Avoid — INR unreliable; clotting factor synthesis impaired' } },

    { drug:'NSAIDs (e.g. ibuprofen)', normal:'Ibuprofen 200–400 mg TDS with food; naproxen 250–500 mg BD',
      renal:[
        { min:60, max:130, dose:'Short courses acceptable; stay hydrated', flag:'green' },
        { min:30, max:59,  dose:'Avoid — can precipitate AKI',             flag:'red'   },
        { min:0,  max:29,  dose:'Contraindicated',                          flag:'red'   },
      ], hepatic:{ A:'Short courses acceptable', B:'Avoid', C:'Contraindicated (↑ GI bleeding, worsen portal hypertension)' } },

    { drug:'Gabapentin', normal:'300 mg TDS (epilepsy doses higher)',
      renal:[
        { min:60, max:130, dose:'Standard',        flag:'green' },
        { min:30, max:59,  dose:'Max 1400 mg/day', flag:'amber' },
        { min:15, max:29,  dose:'Max 700 mg/day',  flag:'amber' },
        { min:0,  max:14,  dose:'Max 300 mg OD',   flag:'red'   },
      ], hepatic:{ A:'Normal', B:'Normal', C:'Normal (not hepatically cleared)' } },

    { drug:'Vancomycin', normal:'15–20 mg/kg BD IV (target AUC/MIC 400–600 or trough 10–20 mg/L)',
      renal:[
        { min:60, max:130, dose:'15–20 mg/kg BD; trough monitoring mandatory',                              flag:'green' },
        { min:30, max:59,  dose:'15 mg/kg OD or extended interval; TDM before every dose',                  flag:'amber' },
        { min:0,  max:29,  dose:'Single loading dose; subsequent dosing guided entirely by TDM (48–72h intervals)', flag:'red' },
      ], hepatic:{ A:'Normal — renally eliminated', B:'Normal — renally eliminated', C:'Normal — renally eliminated' } },

    { drug:'Ciprofloxacin', normal:'250–750 mg BD PO / 200–400 mg BD IV',
      renal:[
        { min:30, max:130, dose:'Standard dose',                                         flag:'green' },
        { min:15, max:29,  dose:'Max 250–500 mg BD PO; 200 mg BD IV',                   flag:'amber' },
        { min:0,  max:14,  dose:'250 mg OD; extreme caution — seizure risk in uraemia',  flag:'red'   },
      ], hepatic:{ A:'Normal', B:'Normal', C:'Max 500 mg/day; ↑ hepatotoxicity risk' } },

    { drug:'Atenolol', normal:'25–100 mg OD',
      renal:[
        { min:35, max:130, dose:'Standard',                                        flag:'green' },
        { min:15, max:34,  dose:'Max 50 mg OD (or 50 mg on alternate days)',       flag:'amber' },
        { min:0,  max:14,  dose:'25 mg OD; give after dialysis on dialysis days',  flag:'red'   },
      ], hepatic:{ A:'Normal — renally excreted', B:'Normal — renally excreted', C:'Normal — renally excreted' } },

    { drug:'Codeine', normal:'30–60 mg 4-hourly PRN (max 240 mg/day)',
      renal:[
        { min:50, max:130, dose:'Standard dose',                                                              flag:'green' },
        { min:30, max:49,  dose:'Reduce dose by 25–50%; ↑ risk of metabolite accumulation',                   flag:'amber' },
        { min:0,  max:29,  dose:'Avoid — morphine-6-glucuronide accumulates → profound sedation; use alternatives', flag:'red' },
      ], hepatic:{ A:'Normal', B:'Use with caution — reduced first-pass metabolism; lower effective dose', C:'Avoid — encephalopathy risk; codeine undergoes hepatic conversion' } },

    { drug:'Phenytoin', normal:'150–300 mg OD/BD (target total level 10–20 mg/L; free level 1–2 mg/L)',
      renal:[
        { min:30, max:130, dose:'Standard; eGFR <30 → measure free phenytoin (protein binding changes in uraemia)', flag:'green' },
        { min:0,  max:29,  dose:'Measure free (unbound) levels only — total level unreliable in uraemia due to ↓ albumin and altered binding', flag:'amber' },
      ], hepatic:{ A:'Normal', B:'Reduce dose — ↓ hepatic metabolism; monitor levels every 2–4 weeks', C:'Avoid if possible — unpredictable accumulation; hepatically metabolised + hepatotoxic' } },

    { drug:'Enoxaparin (therapeutic)', normal:'1.5 mg/kg OD (PE) or 1 mg/kg BD (DVT/ACS)',
      renal:[
        { min:30, max:130, dose:'Standard therapeutic dose',                                                          flag:'green' },
        { min:15, max:29,  dose:'Reduce to 1 mg/kg OD; monitor anti-Xa levels (target peak 0.5–1.0 IU/mL at 4h)',   flag:'amber' },
        { min:0,  max:14,  dose:'Use unfractionated heparin (APTT-guided) — enoxaparin accumulates dangerously',      flag:'red'   },
      ], hepatic:{ A:'Normal (renally excreted)', B:'Normal (renally excreted)', C:'Normal (renally excreted)' } },

    { drug:'Atorvastatin', normal:'10–80 mg OD at night',
      renal:[
        { min:30, max:130, dose:'Standard dose — minimal renal excretion',           flag:'green' },
        { min:0,  max:29,  dose:'Start at 10 mg; titrate slowly with LFT monitoring', flag:'amber' },
      ], hepatic:{ A:'Normal; check baseline LFTs', B:'Use with caution; monitor LFTs every 3 months', C:'Contraindicated — active liver disease is an absolute contraindication to statins' } },

    { drug:'Amlodipine', normal:'5–10 mg OD',
      renal:[
        { min:0, max:130, dose:'Standard dose — predominantly hepatically metabolised; <10% renal excretion', flag:'green' },
      ], hepatic:{ A:'Normal', B:'Start at 2.5–5 mg; ↓ clearance → ↑ half-life', C:'Start at 2.5 mg; titrate very slowly; monitor for oedema and hypotension' } },

    { drug:'Nitrofurantoin', normal:'50–100 mg QDS × 7 days (MR formulation: 100 mg BD)',
      renal:[
        { min:45, max:130, dose:'Standard dose — adequate urinary concentrations achieved',                          flag:'green' },
        { min:0,  max:44,  dose:'CONTRAINDICATED — both inadequate urinary drug concentrations AND toxic metabolite accumulation', flag:'red' },
      ], hepatic:{ A:'Normal', B:'Use with caution', C:'Avoid — ↑ risk of peripheral neuropathy and pulmonary toxicity' } },

    { drug:'Ramipril', normal:'1.25–10 mg OD',
      renal:[
        { min:30, max:130, dose:'Standard; monitor U&E at initiation and after each dose increase',          flag:'green' },
        { min:10, max:29,  dose:'Start 1.25 mg OD; max 5 mg/day; monitor K⁺ and creatinine closely',       flag:'amber' },
        { min:0,  max:9,   dose:'Not recommended — if used, max 2.5 mg OD under specialist supervision',   flag:'red' },
      ], hepatic:{ A:'Normal — ramipril is a prodrug activated by hepatic esterases', B:'Impaired activation; use lowest dose; monitor BP closely', C:'Avoid — hepatic conversion to active ramiprilat is severely impaired; unpredictable effect' } },

    { drug:'Prednisolone', normal:'5–60 mg OD (indication-dependent; taper when possible)',
      renal:[
        { min:0, max:130, dose:'Standard dose; monitor glucose, BP, and fluid retention in CKD — all worsened by steroids', flag:'green' },
      ], hepatic:{ A:'Normal', B:'Monitor glucose closely — reduced 11β-HSD2 activity', C:'Avoid high-dose corticosteroids — can precipitate or worsen hepatic encephalopathy; steroid-induced hyperglycaemia more unpredictable' } },

    { drug:'Carbamazepine', normal:'100–200 mg BD increasing to 400–600 mg BD (epilepsy); levels target 4–12 mg/L',
      renal:[
        { min:30, max:130, dose:'Standard dose',                                                                   flag:'green' },
        { min:0,  max:29,  dose:'No formal dose reduction but monitor carefully; auto-induction makes pharmacokinetics complex', flag:'amber' },
      ], hepatic:{ A:'Normal', B:'Reduce dose; risk of accumulation; monitor levels closely', C:'Avoid — carbamazepine is itself hepatotoxic and hepatically metabolised; ↑ encephalopathy risk' } },
];

/* ── Prescribing Error Cases ────────────────────────────────────── */
const CASES = [
    { id:1, title:'Metformin in AKI',
      vignette:'A 68-year-old man is admitted with community-acquired pneumonia. His creatinine has risen acutely — eGFR now 24 mL/min. His regular medications include metformin 1 g BD, ramipril, and atorvastatin. Which drug should be WITHHELD?',
      options:['Atorvastatin','Metformin','Ramipril','None — continue all'],
      correct:1,
      explanation:'Metformin is contraindicated when eGFR <30 mL/min due to risk of lactic acidosis from drug accumulation. Ramipril and statins may also be held in severe AKI but metformin is the priority answer here. Document withholding in notes.' },

    { id:2, title:'Methotrexate — weekly vs daily',
      vignette:"A ward nurse asks: \"The patient's methotrexate is prescribed 15 mg / 7 days. Should I give it daily?\" What is the correct answer?",
      options:['Yes, 15 mg once daily','Yes, 15 mg split over 7 days','No — methotrexate for rheumatoid/psoriasis is WEEKLY only','No — methotrexate is only given by injection'],
      correct:2,
      explanation:'Daily methotrexate (for non-oncology indications) is a potentially fatal prescribing error. It should be prescribed and dispensed ONCE WEEKLY. NPSA alert requires special warnings on prescriptions. Always clarify frequency on drug charts.' },

    { id:3, title:'Warfarin + NSAIDs',
      vignette:'A 72-year-old on warfarin (INR 2.4) is given ibuprofen 400 mg TDS for knee pain. Three weeks later INR is 4.8 and she has melaena. What is the MAIN mechanism?',
      options:['Warfarin absorbs ibuprofen, raising INR','NSAIDs increase warfarin protein binding','NSAIDs inhibit COX-1 (antiplatelet) and displace warfarin from albumin, markedly ↑ bleeding risk','NSAIDs speed up warfarin metabolism'],
      correct:2,
      explanation:'NSAIDs have a dual mechanism: antiplatelet effect (COX-1 inhibition) AND displacement of warfarin from albumin binding. Many NSAIDs also inhibit CYP2C9. The result is a major ↑ in bleeding risk. Paracetamol is the safer analgesic choice for warfarin patients.' },

    { id:4, title:'Gentamicin monitoring',
      vignette:'Gentamicin 5 mg/kg OD has been prescribed for urosepsis. Which monitoring is MOST important?',
      options:['ECG for QTc prolongation','Trough level before the 2nd dose and creatinine daily','Full blood count daily','Blood cultures only'],
      correct:1,
      explanation:'Gentamicin (aminoglycoside) is nephrotoxic and ototoxic. Trough level must be checked just before the 2nd dose (target <1 mg/L for once-daily dosing). Creatinine/eGFR should be monitored daily. If trough is elevated, delay the next dose and seek pharmacy advice.' },

    { id:5, title:'Potassium with ACEi',
      vignette:'A patient newly started on ramipril 5 mg OD for heart failure is found to have K⁺ = 6.1 mEq/L on routine bloods. What is the CORRECT immediate action?',
      options:['Continue ramipril — mild hyperkalaemia is expected','Withhold ramipril and start calcium gluconate IV immediately','Withhold ramipril; treat hyperkalaemia per local protocol; recheck U&E before restarting','Double the ramipril dose to improve renal perfusion'],
      correct:2,
      explanation:'ACEi reduce aldosterone-driven potassium excretion. K⁺ ≥6.0 is potentially dangerous. Withhold the ACEi immediately; manage hyperkalaemia (calcium gluconate if ECG changes, then insulin-dextrose ± other measures). Recheck U&E before restarting at lower dose.' },

    { id:6, title:'Penicillin allergy documentation',
      vignette:"A patient says she is \"allergic to penicillin\". Co-amoxiclav has been prescribed. Which question is MOST important before administration?",
      options:['How many times have you taken it?','What reaction did you have? (rash, anaphylaxis, or just GI upset?)','Do you have a family history of penicillin allergy?','Was the allergy diagnosed by a specialist?'],
      correct:1,
      explanation:'The nature of the reaction is critical. GI upset or nausea is not a true allergy. Mild rash may indicate low-risk sensitivity. Anaphylaxis/urticaria/angioedema = true allergy — withhold all beta-lactams and notify pharmacy. Accurate allergy documentation prevents both harm and unnecessary antibiotic restriction.' },

    { id:7, title:'Insulin error — wrong type',
      vignette:"DKA protocol requires soluble (short-acting) insulin IV infusion. The ward stocks Mixtard 30 (biphasic insulin). What should you do?",
      options:['Use Mixtard 30 at double the dose','Use Mixtard 30 IM instead','Do not use Mixtard 30 — obtain Actrapid (soluble) or equivalent; escalate to senior','Use Mixtard 30 SC — it is close enough'],
      correct:2,
      explanation:'Only soluble (clear) insulin such as Actrapid or Humulin S should be used in IV infusions. Biphasic or long-acting insulins are NEVER given IV. This is a never-event. Escalate immediately and obtain correct insulin from pharmacy.' },

    { id:8, title:'Missed CD prescription requirements',
      vignette:"You write a prescription for morphine sulfate 10 mg/5 mL solution (Oramorph) for a patient at home. The pharmacist calls saying the prescription cannot be dispensed. The most likely reason is:",
      options:['Morphine is no longer prescribable on NHS','The total quantity was written in figures only — not in words AND figures','The patient needs ID','The prescription needs two doctor signatures'],
      correct:1,
      explanation:"Schedule 2 CD prescriptions require the total quantity to be written in BOTH words AND figures (e.g. thirty millilitres (30 mL)). If this is missing the pharmacist cannot legally dispense. Other CD prescription requirements: patient's full name and address, drug/form/strength, dose, prescriber signature and address." },

    { id:9, title:'Renal dose — LMWH',
      vignette:'A 78-year-old woman (weight 52 kg, eGFR 18 mL/min) is admitted with a new DVT. She is prescribed enoxaparin 1.5 mg/kg OD for treatment. What is the concern?',
      options:['Dose is too low','Standard enoxaparin should be replaced with apixaban or unfractionated heparin due to severe renal impairment','There is no concern — enoxaparin is safe at all eGFR levels','She should have rivaroxaban instead'],
      correct:1,
      explanation:'Enoxaparin is renally cleared. In severe renal impairment (eGFR <30), accumulation causes excessive anticoagulation → bleeding risk. Unfractionated heparin (monitored by APTT) or dose-reduced LMWH with anti-Xa monitoring is preferred. DOACs also have eGFR thresholds.' },

    { id:10, title:'Prescribing in pregnancy — sodium valproate',
      vignette:'A 26-year-old woman with epilepsy and a new pregnancy asks if she can continue sodium valproate 1 g BD, which controls her focal seizures well. What is the correct response?',
      options:['Continue — seizure control is more important than teratogenicity','Switch immediately to phenytoin','Sodium valproate is a major teratogen (10% structural anomalies, neurodevelopmental harm); this requires urgent referral to specialist neurology and obstetrics for an informed decision','Sodium valproate is safe in the first trimester only'],
      correct:2,
      explanation:'Sodium valproate has the highest teratogenic risk of all antiepileptics (~10% major structural anomalies, 30–40% neurodevelopmental effects). MHRA Pregnancy Prevention Programme requires annual review in women of childbearing age. Never stop without specialist review — but must not be continued in pregnancy without full MDT discussion and documented informed consent. Refer urgently.' },

    { id:11, title:'SSRI + NSAIDs — GI bleed risk',
      vignette:'A 48-year-old woman on fluoxetine for depression is prescribed ibuprofen 400 mg TDS by her GP for knee osteoarthritis. She has no GI history. Which co-prescription is MOST important to add?',
      options:['Metoclopramide (antiemetic)','Omeprazole 20 mg OD (PPI gastroprotection)','Co-codamol instead of ibuprofen','No additions needed — the risk is minimal'],
      correct:1,
      explanation:'SSRIs deplete platelet serotonin, impairing platelet aggregation. NSAIDs inhibit COX-1/2, reducing prostaglandin-mediated gastric mucosal protection. Together they increase upper GI bleed risk 3–15×. A PPI (omeprazole 20 mg OD) must be added when this combination is used. Ideally, substitute paracetamol for analgesia — it is safer in this context.' },

    { id:12, title:'Warfarin perioperative bridging',
      vignette:'A 65-year-old man on warfarin (INR 2.5, non-valvular AF, CHA₂DS₂-VASc 3) needs elective inguinal hernia repair. What is the standard perioperative management?',
      options:['Stop warfarin 5 days pre-op; no routine LMWH bridging for average-risk AF; restart warfarin evening of surgery','Stop warfarin 2 days pre-op; give full-dose LMWH throughout','Continue warfarin throughout — hernia repair is low-risk','Switch to aspirin 5 days pre-op'],
      correct:0,
      explanation:'For non-valvular AF at average stroke risk (CHA₂DS₂-VASc 2–4), routine LMWH bridging is NOT recommended (BRIDGE trial). Stop warfarin 5 days pre-op; check INR on day of surgery (aim <1.5). Restart warfarin evening of surgery or next morning. High-risk patients (mechanical heart valves, CHA₂DS₂-VASc ≥5) may require bridging — specialist decision required.' },

    { id:13, title:'Theophylline toxicity — ciprofloxacin interaction',
      vignette:'A 71-year-old man on theophylline 400 mg BD for COPD is prescribed ciprofloxacin 500 mg BD for a chest infection. Day 4 he develops nausea, palpitations and a seizure. Theophylline level: 32 mg/L. The MAIN mechanism is:',
      options:['Ciprofloxacin displaces theophylline from plasma protein binding','Ciprofloxacin inhibits CYP1A2, reducing theophylline clearance by up to 60%','Ciprofloxacin increases theophylline renal excretion','Theophylline directly potentiates ciprofloxacin toxicity'],
      correct:1,
      explanation:'Ciprofloxacin inhibits CYP1A2 (the primary theophylline-metabolising enzyme), reducing clearance by up to 60%. Theophylline has a narrow therapeutic index (10–20 mg/L). Toxicity: nausea, tachycardia, arrhythmia, seizures. Always reduce theophylline dose by 50% if ciprofloxacin is essential, or use an alternative antibiotic (e.g. co-amoxiclav, doxycycline). Monitor plasma levels.' },

    { id:14, title:'Heparin-induced thrombocytopenia (HIT)',
      vignette:'Day 8 post-knee replacement on enoxaparin prophylaxis. Platelet count dropped from 248 to 61×10⁹/L. New ipsilateral DVT detected. Which action is MOST appropriate?',
      options:['Increase enoxaparin to therapeutic dose','Stop ALL heparin (including LMWH) immediately; switch to a non-heparin anticoagulant (argatroban, fondaparinux, or danaparoid)','Platelet transfusion to maintain count >80×10⁹/L','Start warfarin immediately'],
      correct:1,
      explanation:'HIT is an immune-mediated, prothrombotic reaction: antibodies against PF4-heparin complex activate platelets. Key features: platelet fall >50% on days 5–14, and new thrombosis. STOP ALL heparin including LMWH immediately. Start non-heparin anticoagulant (argatroban, fondaparinux, danaparoid). Do NOT give platelets — paradoxically increases clot risk. Do NOT start warfarin until platelets have recovered (warfarin risks microthrombosis via protein C depletion).' },

    { id:15, title:'Azathioprine + allopurinol — never event',
      vignette:'A patient with IBD on azathioprine 2 mg/kg/day presents with recurrent gout. You are asked to start allopurinol 300 mg OD. The MOST important response is:',
      options:['Start allopurinol 300 mg OD without changing azathioprine','Never give these together — switch to febuxostat for gout instead without dose changes','If combination unavoidable under specialist guidance: reduce azathioprine by at least 75% and monitor FBC weekly; GI specialist input essential','Start allopurinol at 100 mg OD with no azathioprine change — lower dose is safe'],
      correct:2,
      explanation:'Allopurinol inhibits xanthine oxidase, the enzyme that inactivates azathioprine\'s active metabolite (6-mercaptopurine), causing 4× drug accumulation → bone marrow aplasia (potentially fatal). This is an NPSA never-event at standard doses. If clinically unavoidable: reduce azathioprine by 75% first; monitor FBC weekly. Febuxostat is an alternative but also inhibits xanthine oxidase — avoid for the same reason.' },

    { id:16, title:'Opioid in severe liver failure',
      vignette:'A 54-year-old woman with decompensated cirrhosis (Child-Pugh C) and painful hepatocellular carcinoma is prescribed morphine 10 mg 4-hourly. What is the MAIN clinical concern?',
      options:['Morphine is contraindicated in ALL liver disease — switch to NSAIDs','Morphine undergoes extensive hepatic glucuronidation; Child-Pugh C dramatically reduces clearance → accumulation → encephalopathy and respiratory depression; use lowest dose, longer intervals, or a safer alternative','No concern — morphine dose is appropriate for this indication','Switch to paracetamol alone at maximum dose'],
      correct:1,
      explanation:'Morphine is primarily glucuronidated in the liver. In Child-Pugh C, clearance is severely reduced → drug and active metabolite (M6G) accumulation → profound CNS depression, respiratory failure, and precipitation of encephalopathy. Use the lowest possible dose with extended intervals (6–8h). Alternatives: fentanyl patch (transdermal; safer in hepatic failure) or alfentanil. NSAIDs must also be avoided (GI bleeding, portal hypertension, hepatorenal syndrome).' },

    { id:17, title:'Enzyme inducers and contraceptive failure',
      vignette:'A 26-year-old woman on the combined OCP is started on rifampicin for TB for 6 months. She has not been counselled. The correct management is:',
      options:['No change required — rifampicin does not affect hormonal contraception','Advise additional barrier contraception throughout rifampicin AND for 28 days after stopping; ideally switch to copper IUD (not affected by enzyme inducers)','Switch to progesterone-only pill — this is not affected by rifampicin','Increase the oestrogen dose of her current pill to compensate'],
      correct:1,
      explanation:'Rifampicin is one of the most potent enzyme inducers (CYP3A4/P-gp), drastically increasing oestrogen and progestogen metabolism — rendering all oral contraceptives (including high-dose pills) unreliable. The patient must use barrier contraception throughout the rifampicin course AND for 28 days after completing it. A copper IUD is unaffected by enzyme inducers and is the most reliable option. The progesterone-only pill is equally unreliable with enzyme inducers.' },

    { id:18, title:'N-acetylcysteine — paracetamol overdose timing',
      vignette:'A 28-year-old man took 24 paracetamol tablets (~24 g) 6h ago. He has a 4h serum paracetamol level above the nomogram treatment line. LFTs are currently normal. What is the CORRECT next step?',
      options:['Normal LFTs means low risk — withhold NAC and monitor with regular blood tests','Start IV N-acetylcysteine (NAC) 3-bag regimen immediately — paracetamol level above nomogram line is the indication regardless of current LFTs','Give activated charcoal — still effective up to 6h','Induce emesis to reduce paracetamol burden'],
      correct:1,
      explanation:'NAC must be started immediately when the 4h paracetamol level exceeds the treatment nomogram line regardless of LFTs. LFT abnormalities (ALT rise) typically appear 24–72h after overdose — waiting for liver injury means missing the therapeutic window. NAC replenishes glutathione, which detoxifies the toxic NAPQI metabolite. Standard UK 3-bag regimen: 150 mg/kg in 200 mL glucose 5% over 1h → 50 mg/kg in 500 mL over 4h → 100 mg/kg in 1L over 16h. Activated charcoal is only useful within 1h of ingestion.' },

    { id:19, title:'Phenytoin — narrow therapeutic index drug',
      vignette:'A newly diagnosed 30-year-old woman with tonic-clonic epilepsy is started on phenytoin. She is also on the combined OCP. Which statement is MOST clinically important?',
      options:['Phenytoin is first-line for epilepsy in women of childbearing age due to its established track record','Phenytoin reduces OCP efficacy via enzyme induction, has non-linear pharmacokinetics with disproportionate toxicity at high doses, and is teratogenic — specialist-led choice in women of childbearing age','Phenytoin plasma levels are not useful in clinical management','Phenytoin does not interact with other anti-epileptics'],
      correct:1,
      explanation:'Phenytoin has a narrow therapeutic index (10–20 mg/L total) with non-linear (zero-order) kinetics — small dose increases trigger disproportionate toxicity (nystagmus, ataxia, diplopia, confusion at levels >20 mg/L). It is a potent enzyme inducer (CYP2C9, CYP3A4) that reduces OCP efficacy and interacts with warfarin, many other AEDs and common drugs. Teratogenicity: fetal hydantoin syndrome (cleft palate, cardiac defects). In women of childbearing age, lamotrigine or levetiracetam are generally preferred under specialist guidance.' },

    { id:20, title:'"Triple whammy" — ACEi + diuretic + NSAID',
      vignette:'A 74-year-old man on ramipril 5 mg OD and furosemide 40 mg OD for heart failure is prescribed naproxen 250 mg BD for gout. Creatinine rises from 98 → 280 µmol/L within 5 days. The mechanism is:',
      options:['Furosemide directly potentiates naproxen nephrotoxicity','ACEi (↓ efferent tone) + diuretic (volume depletion) + NSAID (↓ prostaglandin-mediated afferent dilation) = "triple whammy" — critically reduces glomerular filtration pressure → AKI','Naproxen is directly tubulotoxic at this dose','This is coincidental — unrelated to the drug combination'],
      correct:1,
      explanation:'The "triple whammy" (ACEi/ARB + loop/thiazide diuretic + NSAID) is a well-documented cause of AKI, especially in older patients with heart failure or CKD. ACEi dilates the efferent arteriole (normally compensatory when GFR falls). Diuretics reduce circulating volume. NSAIDs block prostaglandin-mediated afferent arteriolar dilation — critically reducing glomerular perfusion pressure. NSAIDs should be avoided (or substituted with paracetamol) in patients on ACEi + diuretic.' },
];

/* ── Antibiotic Stewardship ─────────────────────────────────────── */
const ABX_DATA = [
    { condition:'🫁 Community-Acquired Pneumonia (CAP)', severity:'CURB-65 0–1 (mild)',
      firstLine:'Amoxicillin 500 mg TDS PO × 5 days',
      ifAllergy:'Doxycycline 200 mg stat then 100 mg OD PO',
      severe:'Co-amoxiclav 625 mg TDS + clarithromycin 500 mg BD (or levofloxacin 500 mg BD)',
      route:'oral', review:'48–72h clinical review; IV-to-oral switch when apyrexial + tolerating diet',
      notes:'Add clarithromycin/doxycycline if atypicals suspected (Legionella, Mycoplasma).' },

    { condition:'🚽 Uncomplicated UTI (women)', severity:'Lower UTI, not pregnant',
      firstLine:'Trimethoprim 200 mg BD PO × 3 days',
      ifAllergy:'Nitrofurantoin MR 100 mg BD PO × 3 days (check eGFR ≥45)',
      severe:'Refer to local guidelines; consider co-amoxiclav if cultures indicate',
      route:'oral', review:'No routine review if symptoms resolve; recurrent UTI → urine culture',
      notes:'Avoid nitrofurantoin at term (haemolytic anaemia in neonate) or eGFR <45.' },

    { condition:'🦵 Cellulitis', severity:'Non-purulent; no systemic sepsis',
      firstLine:'Flucloxacillin 500 mg QDS PO × 5–7 days',
      ifAllergy:'Clarithromycin 500 mg BD PO or cefalexin 500 mg QDS PO',
      severe:'Flucloxacillin 1–2 g QDS IV; MRSA risk → add vancomycin',
      route:'oral', review:'Mark the erythema border with pen; review at 48h for spreading or systemic signs',
      notes:'Flucloxacillin must be taken on empty stomach for reliable absorption.' },

    { condition:'🧠 Meningitis (bacterial, suspected)', severity:'Emergency',
      firstLine:'Ceftriaxone 2 g IV STAT (give before LP if cannot be done promptly)',
      ifAllergy:'Chloramphenicol 12.5 mg/kg QDS IV (severe penicillin allergy)',
      severe:'Add dexamethasone 0.15 mg/kg QDS × 4 days + listeria cover (ampicillin 2 g QDS) if age >55 or immunocompromised',
      route:'iv', review:'Neurology/ID review; LP results guide de-escalation',
      notes:'Do NOT delay ceftriaxone for LP. Dexamethasone reduces hearing loss and neurological sequelae in bacterial meningitis.' },

    { condition:'🫀 Infective Endocarditis (native valve)', severity:'Streptococcal (working diagnosis)',
      firstLine:'Amoxicillin 2 g QDS IV + gentamicin 3 mg/kg OD IV (synergy)',
      ifAllergy:'Vancomycin 15–20 mg/kg BD IV (adjust to trough 15–20 mg/L)',
      severe:'MRSA or prosthetic valve → vancomycin + gentamicin ± rifampicin; consult ID',
      route:'iv', review:'ID/cardiology review mandatory; minimum 4 weeks IV treatment for native valve, 6 weeks prosthetic',
      notes:'Always obtain 3× blood cultures (10 min apart) before antibiotics. Gentamicin requires TDM.' },

    { condition:'🌡️ Neutropenic Sepsis', severity:'Febrile neutrophils <0.5×10⁹/L',
      firstLine:'Piperacillin-tazobactam 4.5 g TDS IV (or meropenem 1 g TDS IV if Pseudomonas risk)',
      ifAllergy:'Meropenem 1 g TDS IV; add vancomycin if line infection suspected',
      severe:'Add antifungal (micafungin/anidulafungin) if not improving at 72h',
      route:'iv', review:'MEWS/NEWS monitoring hourly; escalate if not improving 4–6h; review cultures daily',
      notes:'Start within 1h of sepsis recognition. OPAT/haematology review in all cases.' },

    { condition:'🔬 C. difficile Infection', severity:'Mild-moderate (1st episode)',
      firstLine:'Vancomycin 125 mg QDS PO × 10 days',
      ifAllergy:'Fidaxomicin 200 mg BD PO × 10 days (preferred if available; lower recurrence)',
      severe:'Severe (WBC >15, AKI): vancomycin 125–500 mg QDS PO ± IV metronidazole; surgery referral if ileus',
      route:'oral', review:'Stop causative antibiotics. Stool frequency chart. Contact precautions essential.',
      notes:'Metronidazole no longer first-line for CDI (ECDC guidelines 2021). Avoid anti-motility agents.' },

    { condition:'🫁 Hospital-Acquired Pneumonia (HAP)', severity:'>48h after admission',
      firstLine:'Co-amoxiclav 1.2 g TDS IV (if lower resistance risk)',
      ifAllergy:'Piperacillin-tazobactam 4.5 g TDS IV or meropenem 1 g TDS IV',
      severe:'Pseudomonas risk: piperacillin-tazobactam or meropenem ± gentamicin',
      route:'both', review:'Cultures before antibiotics; review at 48–72h; de-escalate when sensitivities available',
      notes:'IV-to-oral switch criteria apply (see top of page). HAP with VAP criteria → intensivist review.' },

    { condition:'🌡️ Acute Pyelonephritis (uncomplicated)', severity:'No systemic sepsis; oral tolerated',
      firstLine:'Ciprofloxacin 500 mg BD PO × 7 days (if local E. coli sensitivity >90%)',
      ifAllergy:'Co-amoxiclav 625 mg TDS PO × 7 days (if sensitive)',
      severe:'Ceftriaxone 2 g OD IV (or gentamicin IV) for sepsis; de-escalate on sensitivities',
      route:'oral', review:'Urine culture essential before antibiotics. Reassess at 48–72h; if not improving → IV therapy and inpatient review.',
      notes:'Trimethoprim alone has high resistance rates for pyelonephritis — check local sensitivity data. Mid-stream urine culture before starting antibiotics is mandatory.' },

    { condition:'🌬️ COPD Exacerbation (bacterial)', severity:'Established COPD with purulent sputum',
      firstLine:'Amoxicillin 500 mg TDS PO × 5 days  OR  Doxycycline 200 mg stat then 100 mg OD × 5 days',
      ifAllergy:'Doxycycline 200 mg stat then 100 mg OD × 5 days',
      severe:'Co-amoxiclav 625 mg TDS PO; IV if hospitalised and not tolerating oral',
      route:'oral', review:'Sputum culture before starting. Add prednisolone 30 mg OD × 5 days for airways inflammation. Review at 48h.',
      notes:'Antibiotics only if purulent sputum + ↑ dyspnoea/↑ volume. Avoid fluoroquinolones as first-line in community (stewardship).' },

    { condition:'🦴 Osteomyelitis (haematogenous — S. aureus)', severity:'Non-diabetic foot; haematogenous spread',
      firstLine:'Flucloxacillin 1–2 g QDS IV for at least 4–6 weeks total (including oral step-down)',
      ifAllergy:'Clindamycin 600 mg QDS IV; vancomycin if MRSA risk',
      severe:'Add rifampicin 600 mg OD (when tolerating oral) for biofilm penetration — under ID guidance',
      route:'iv', review:'Bone biopsy/cultures before antibiotics where feasible. Orthopaedics + ID review mandatory. MRI is imaging of choice for confirmation.',
      notes:'Duration: 4–6 weeks total. IV until improving then oral step-down guided by sensitivities. MRSA risk factors: prior MRSA, nursing home, recent hospitalisation.' },

    { condition:'🦵 Septic Arthritis', severity:'Monoarthritis + systemic features',
      firstLine:'Flucloxacillin 2 g QDS IV',
      ifAllergy:'Clindamycin 900 mg TDS IV; vancomycin if MRSA risk',
      severe:'Gonococcal (young, sexually active): ceftriaxone 2 g OD IV × 1 week, then oral to complete 2 weeks',
      route:'iv', review:'Emergency joint aspiration (WBC >50,000/mm³, Gram stain, MC&S) before antibiotics. Orthopaedics for washout consideration. Daily clinical reassessment.',
      notes:'Duration: minimum 2 weeks (4–6 weeks prosthetic joint). Urgent orthopaedic washout if no improvement at 48h. Never inject steroids into a potentially infected joint.' },

    { condition:'🚽 Catheter-Associated UTI (CAUTI)', severity:'Symptomatic — NOT asymptomatic bacteriuria',
      firstLine:'Co-amoxiclav 625 mg TDS PO × 7 days (based on sensitivities)',
      ifAllergy:'Cefalexin 500 mg QDS PO; or ciprofloxacin 500 mg BD PO if culture-guided',
      severe:'Gentamicin IV or ceftriaxone 1 g OD IV if sepsis; treat 10–14 days',
      route:'oral', review:'Change catheter at start of treatment. Culture via catheter port. Re-evaluate catheter necessity — remove if possible.',
      notes:'Asymptomatic bacteriuria in catheterised patients does NOT require antibiotics (except pre-instrumentation). Treat ONLY if symptomatic: fever, rigors, loin pain, or systemic deterioration.' },

    { condition:'🫁 Spontaneous Bacterial Peritonitis (SBP)', severity:'Cirrhosis + ascites + infection',
      firstLine:'Cefotaxime 2 g TDS IV OR ceftriaxone 2 g OD IV × 5 days',
      ifAllergy:'Ciprofloxacin 400 mg BD IV × 5 days',
      severe:'SBP + AKI or bilirubin >68 µmol/L: add albumin 1.5 g/kg at diagnosis and 1 g/kg at day 3 (reduces hepatorenal syndrome risk)',
      route:'iv', review:'Diagnostic tap essential: ascites neutrophils >250/mm³ confirms diagnosis. Repeat tap at 48h to confirm response (neutrophil count should fall >25%). Hepatology review mandatory.',
      notes:'Secondary prophylaxis after first episode: norfloxacin 400 mg OD or co-trimoxazole long-term. Primary prophylaxis in high-risk cirrhosis (ascites protein <15 g/L + CTP ≥9 or bilirubin ≥51).' },

    { condition:'🔬 Acute Bacterial Prostatitis', severity:'Systemically unwell, LUTS + perineal pain',
      firstLine:'Ciprofloxacin 500 mg BD PO × 28 days',
      ifAllergy:'Trimethoprim 200 mg BD PO × 28 days (if culture confirms sensitivity)',
      severe:'Sepsis or oral not tolerated: gentamicin + amoxicillin IV until improving, then oral ciprofloxacin to complete 28 days',
      route:'both', review:'MSU + blood cultures before antibiotics. TRUS scan if no improvement at 72h to exclude prostatic abscess. Urology review.',
      notes:'Extended 28-day course required for adequate prostatic tissue penetration. Do NOT use nitrofurantoin — inadequate tissue levels. Suprapubic catheter preferred over urethral if urinary retention occurs.' },

    { condition:'🍀 Lyme Disease (early disseminated)', severity:'Erythema migrans or systemic features',
      firstLine:'Doxycycline 100 mg BD PO × 21 days',
      ifAllergy:'Amoxicillin 500 mg TDS PO × 21 days',
      severe:'Lyme carditis / neuroborreliosis (facial palsy, meningism, AV block): ceftriaxone 2 g OD IV × 14–21 days',
      route:'oral', review:'ELISA + Western blot serology — do not delay treatment awaiting results. PHE guidance for endemic tick exposure areas.',
      notes:'Prophylaxis after tick bite in endemic areas: doxycycline 200 mg single dose within 72h of attachment. Avoid doxycycline in pregnancy and children <12 — use amoxicillin. Serological "cure" not required — treat based on symptom resolution.' },
];

/* ── Singleton export ─────────────────────────────────────────────── */
const prescribingManager = new PrescribingManager();
export { PrescribingManager, prescribingManager };
