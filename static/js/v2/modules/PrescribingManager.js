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
 *  1. Prescription Simulator   – 33 scenario-based prescribing cases with instant feedback
 *  2. Drug Interaction Checker – 73 high-yield interaction pairs; live lookup
 *  3. Renal & Hepatic Dosing   – eGFR / Child-Pugh dose tables for 32 drugs
 *  4. Prescribing Error Cases  – 30 MCQ cases with score tracking
 *  5. Controlled Drug Rules    – static reference (HTML, no JS needed)
 *  6. Antibiotic Stewardship   – 23 empirical regimens + IV-to-oral switch
 *  7. Drug Quiz                – 105 hardcoded Qs + dynamic generation from 60 drug JSONs;
 *                                per-category score breakdown on completion
 */

class PrescribingManager {

    constructor() {
        this._caseAnswers      = {};
        this._initialized      = false;
        this._quiz             = { questions: [], current: 0, score: 0, answered: false, active: false, results: [] };
        this._drugDataCache    = null;   // fetched drug JSON array
        this._dynamicQCache    = null;   // generate MCQ objects
        this._dynamicQCount    = 0;
        this._quizListenersSet = false;
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
        this._initDrugQuiz();
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
            abxConditions: ABX_DATA.length,
            quizQuestions: (typeof DRUG_QUIZ_Q !== 'undefined' ? DRUG_QUIZ_Q.length : 0) + (this._dynamicQCount || 0)
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
       7. DRUG QUIZ
       ═══════════════════════════════════════════════════════════════ */

    _initDrugQuiz() {
        const catSel = document.getElementById('prxQuizCat');
        if (!catSel) return;
        // Attach listeners only once — method may be re-called from resetQuiz()
        if (!this._quizListenersSet) {
            this._quizListenersSet = true;
            catSel.addEventListener('change',   () => this._updateQuizPreview());
            document.getElementById('prxQuizCount').addEventListener('change', () => this._updateQuizPreview());
        }
        this._updateQuizPreview();
        // Eagerly fetch drug data in background so preview updates before Start is clicked
        if (!this._drugDataCache) {
            this._fetchDrugData().then(drugs => {
                this._dynamicQCache = this._generateDynamicQuestions(drugs);
                this._dynamicQCount = this._dynamicQCache.length;
                this._updateQuizPreview();
            }).catch(() => {});
        }
    }

    async startQuiz() {
        const cat   = document.getElementById('prxQuizCat').value;
        const count = parseInt(document.getElementById('prxQuizCount').value) || 999;

        // Use cached dynamic questions; if not ready yet, fetch on demand
        let dynamicQs = this._dynamicQCache;
        if (!dynamicQs) {
            const startBtn = document.querySelector('.prx-quiz-start-btn');
            if (startBtn) { startBtn.disabled = true; startBtn.textContent = '⏳ Loading drug data…'; }
            try {
                const drugs  = await this._fetchDrugData();
                dynamicQs    = this._dynamicQCache = this._generateDynamicQuestions(drugs);
                this._dynamicQCount = dynamicQs.length;
            } catch(e) { dynamicQs = []; }
            const startBtn2 = document.querySelector('.prx-quiz-start-btn');
            if (startBtn2) { startBtn2.disabled = false; startBtn2.textContent = '▶ Start Quiz'; }
        }

        // Combine hardcoded + dynamically generated questions, filter by category
        const allQ = [...DRUG_QUIZ_Q, ...dynamicQs];
        let pool   = cat === 'random' ? [...allQ] : allQ.filter(q => q.cat === cat);

        // Fisher–Yates shuffle
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        pool = pool.slice(0, Math.min(pool.length, count));
        this._quiz = { questions: pool, current: 0, score: 0, answered: false, active: true };
        document.getElementById('prxQuizSetup').style.display   = 'none';
        document.getElementById('prxQuizPlay').style.display    = 'block';
        document.getElementById('prxQuizSummary').style.display = 'none';
        this._renderQuizQuestion();
    }

    _renderQuizQuestion() {
        const q   = this._quiz;
        const qObj = q.questions[q.current];
        const total = q.questions.length;
        const pct  = Math.round((q.current / total) * 100);
        const catLabels = { dosing: '💊 Dosing', contraindications: '🚫 Contraindications', interactions: '⚡ Interactions', sideeffects: '⚠️ Side Effects', mechanism: '🔬 Mechanism', monitoring: '👁️ Monitoring' };

        // Progress
        document.getElementById('prxQProgress').textContent    = `Question ${q.current + 1} of ${total}`;
        document.getElementById('prxQScoreLive').textContent   = `Score: ${q.score}/${q.current}`;
        document.getElementById('prxQProgressBar').style.width = `${pct}%`;
        document.getElementById('prxQCatBadge').textContent    = (catLabels[qObj.cat] || '🎲 Random') + (qObj.dynamic ? ' · 🔬 drug DB' : '');

        // Question text
        document.getElementById('prxQText').textContent = qObj.q;

        // Options
        const optsEl = document.getElementById('prxQOptions');
        optsEl.innerHTML = qObj.opts.map((opt, i) => `
            <button class="prx-quiz-opt" id="prxQOpt_${i}" onclick="window.prxAnswerQuiz(${i})">
                <span class="prx-quiz-letter">${String.fromCharCode(65 + i)}</span>
                <span class="prx-quiz-opt-text">${opt}</span>
            </button>
        `).join('');

        // Clear feedback
        document.getElementById('prxQFeedback').innerHTML = '';
        document.getElementById('prxQFeedback').style.display = 'none';
        document.getElementById('prxQNextBtn').style.display  = 'none';
        this._quiz.answered = false;
    }

    answerQuiz(optIdx) {
        if (this._quiz.answered) return;
        this._quiz.answered = true;
        const qObj   = this._quiz.questions[this._quiz.current];
        const correct = qObj.ans;
        const isRight = optIdx === correct;
        if (isRight) this._quiz.score++;
        // Track per-question result for category breakdown
        this._quiz.results.push({ cat: qObj.cat, correct: isRight });

        // Style options
        qObj.opts.forEach((_, i) => {
            const btn = document.getElementById(`prxQOpt_${i}`);
            if (!btn) return;
            btn.disabled = true;
            if (i === correct)  btn.classList.add('prx-quiz-opt-correct');
            if (i === optIdx && !isRight) btn.classList.add('prx-quiz-opt-wrong');
        });

        // Feedback box
        const fb = document.getElementById('prxQFeedback');
        fb.style.display = 'block';
        fb.className = isRight ? 'prx-quiz-feedback correct' : 'prx-quiz-feedback wrong';
        fb.innerHTML = `<strong>${isRight ? '✅ Correct!' : '❌ Incorrect'}</strong> ${qObj.exp}`;

        // Live score update
        document.getElementById('prxQScoreLive').textContent = `Score: ${this._quiz.score}/${this._quiz.current + 1}`;

        // Show next / finish button
        const nextBtn = document.getElementById('prxQNextBtn');
        const isLast  = this._quiz.current === this._quiz.questions.length - 1;
        nextBtn.style.display  = 'inline-flex';
        nextBtn.textContent    = isLast ? '🏁 See Results' : 'Next →';
    }

    nextQuizQ() {
        const q = this._quiz;
        if (q.current < q.questions.length - 1) {
            q.current++;
            this._renderQuizQuestion();
        } else {
            this._showQuizSummary();
        }
    }

    _showQuizSummary() {
        const q     = this._quiz;
        const total = q.questions.length;
        const pct   = Math.round((q.score / total) * 100);
        const catLabels = { dosing: '💊 Dosing', contraindications: '🚫 Contraindications', interactions: '⚡ Interactions', sideeffects: '⚠️ Side Effects', mechanism: '🔬 Mechanism', monitoring: '👁️ Monitoring' };
        const grade = pct >= 80 ? { label: 'Excellent', colour: '#22c55e', emoji: '🏆' }
                    : pct >= 60 ? { label: 'Good', colour: '#f59e0b', emoji: '👍' }
                    :             { label: 'Keep Practising', colour: '#ef4444', emoji: '📚' };

        // Per-category scores from tracked results array
        const catCounts = {};
        q.results.forEach(r => {
            if (!catCounts[r.cat]) catCounts[r.cat] = { total: 0, correct: 0 };
            catCounts[r.cat].total++;
            if (r.correct) catCounts[r.cat].correct++;
        });

        // Category breakdown rows
        const catRows = Object.entries(catCounts).map(([cat, data]) => {
            const catPct = Math.round((data.correct / data.total) * 100);
            const colour = catPct >= 80 ? '#22c55e' : catPct >= 60 ? '#f59e0b' : '#ef4444';
            const icon   = catPct >= 80 ? '✅' : catPct >= 60 ? '⚠️' : '❌';
            return `
                <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--v2-bg-card);border-radius:8px;margin-bottom:6px;">
                    <span style="font-size:1rem;min-width:20px;">${icon}</span>
                    <span style="flex:1;font-size:13px;color:var(--v2-text-primary);font-weight:500;">${catLabels[cat] || cat}</span>
                    <span style="font-size:13px;color:${colour};font-weight:700;min-width:40px;text-align:right;">${data.correct}/${data.total}</span>
                    <div style="width:72px;height:6px;background:var(--v2-bg-elevated);border-radius:4px;overflow:hidden;">
                        <div style="width:${catPct}%;height:100%;background:${colour};border-radius:4px;"></div>
                    </div>
                </div>`;
        }).join('');

        // Weak areas callout (categories below 60%)
        const weak = Object.entries(catCounts)
            .filter(([, d]) => Math.round((d.correct / d.total) * 100) < 60)
            .map(([cat]) => catLabels[cat] || cat);
        const weakHtml = weak.length
            ? `<div style="background:#ef444420;border:1px solid #ef444460;border-radius:8px;padding:10px 14px;margin-top:10px;text-align:left;">
                   <strong style="color:#ef4444;font-size:13px;">📌 Focus on:</strong>
                   <span style="color:var(--v2-text-secondary);font-size:13px;"> ${weak.join(' · ')}</span>
               </div>`
            : '';

        const showBreakdown = Object.keys(catCounts).length > 1;

        document.getElementById('prxQuizPlay').style.display    = 'none';
        document.getElementById('prxQuizSummary').style.display = 'block';

        document.getElementById('prxQuizSummary').innerHTML = `
            <div style="padding:24px 16px;">
                <div style="text-align:center;margin-bottom:${showBreakdown ? 20 : 24}px;">
                    <div style="font-size:3rem;margin-bottom:8px;">${grade.emoji}</div>
                    <h3 style="margin:0 0 6px;font-size:1.4rem;color:var(--v2-text-primary);">${grade.label}</h3>
                    <div style="font-size:2rem;font-weight:700;color:${grade.colour};margin-bottom:4px;">${q.score} / ${total}</div>
                    <div style="font-size:1rem;color:var(--v2-text-secondary);margin-bottom:16px;">${pct}% correct</div>
                    <div style="background:var(--v2-bg-elevated);border-radius:12px;overflow:hidden;height:10px;margin:0 auto;max-width:300px;">
                        <div style="width:${pct}%;height:100%;background:${grade.colour};border-radius:12px;transition:width 0.8s ease;"></div>
                    </div>
                </div>
                ${showBreakdown ? `
                <div style="margin-bottom:8px;">
                    <h4 style="margin:0 0 10px;font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--v2-text-secondary);">Category Breakdown</h4>
                    ${catRows}
                    ${weakHtml}
                </div>` : ''}
                <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px;">
                    <button class="prx-btn" onclick="window.prxStartQuiz()">🔄 Retry Same Settings</button>
                    <button class="prx-btn secondary" onclick="window.prxResetQuiz()">⚙️ Change Settings</button>
                </div>
            </div>
        `;
    }

    resetQuiz() {
        this._quiz = { questions: [], current: 0, score: 0, answered: false, active: false, results: [] };
        document.getElementById('prxQuizSetup').style.display   = 'block';
        document.getElementById('prxQuizPlay').style.display    = 'none';
        document.getElementById('prxQuizSummary').style.display = 'none';
        this._initDrugQuiz();
    }

    /* ═══════════════════════════════════════════════════════════════
       8. DYNAMIC QUESTION GENERATION FROM DRUG JSON FILES
       ═══════════════════════════════════════════════════════════════ */

    _updateQuizPreview() {
        const catSel   = document.getElementById('prxQuizCat');
        const countSel = document.getElementById('prxQuizCount');
        const preview  = document.getElementById('prxQuizPreview');
        if (!catSel || !preview) return;
        const cat  = catSel.value;
        const allQ = [...DRUG_QUIZ_Q, ...(this._dynamicQCache || [])];
        const pool = cat === 'random' ? allQ : allQ.filter(q => q.cat === cat);
        const maxN = parseInt(countSel.value) || pool.length;
        const n    = Math.min(pool.length, maxN);
        const extra = this._dynamicQCount
            ? ` · ${this._dynamicQCount} generated from drug database`
            : (this._drugDataCache ? '' : ' · drug database loading\u2026');
        preview.textContent = `${n} question${n !== 1 ? 's' : ''} available${extra}`;
    }

    async _fetchDrugData() {
        if (this._drugDataCache) return this._drugDataCache;
        const results = await Promise.allSettled(
            HIGH_YIELD_DRUG_IDS.map(id =>
                fetch(`/static/drugs/${id}.json`)
                    .then(r => r.ok ? r.json() : null)
                    .catch(() => null)
            )
        );
        this._drugDataCache = results
            .map(r => r.status === 'fulfilled' ? r.value : null)
            .filter(Boolean);
        return this._drugDataCache;
    }

    _firstItem(s) {
        if (!s) return null;
        let depth = 0;
        for (let i = 0; i < s.length; i++) {
            if      (s[i] === '(') depth++;
            else if (s[i] === ')') depth--;
            else if (s[i] === ',' && depth === 0) return s.slice(0, i).trim();
        }
        return s.trim();
    }

    _truncate(s, n = 78) {
        if (!s || s.length <= n) return s;
        const cut = s.slice(0, n);
        const sp  = cut.lastIndexOf(' ');
        return (sp > 30 ? cut.slice(0, sp) : cut) + '\u2026';
    }

    _shuffleOpts(correct, distractors) {
        // Guard: remove any distractor that equals the correct answer (prevents ambiguous questions)
        const filtered = distractors.filter(d => d !== correct);
        const options  = [correct, ...filtered.slice(0, 3)];
        if (options.length < 4) return { options: null, correctIdx: -1 }; // not enough unique distractors
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        return { options, correctIdx: options.indexOf(correct) };
    }

    _generateDynamicQuestions(drugs) {
        const q   = [];
        const fi  = s => this._firstItem(s);
        const tr  = (s, n) => this._truncate(s, n);
        const pool = (field, drug, limit = 12) =>
            drugs.filter(d => d !== drug && d[field])
                 .map(d => tr(fi(d[field])))
                 .filter((v, i, a) => v && v.length < 90 && a.indexOf(v) === i)
                 .slice(0, limit);

        drugs.forEach(drug => {
            if (!drug || !drug.name) return;

            // T1 – Drug class
            if (drug.class) {
                const correct = tr(drug.class);
                const dist    = pool('class', drug);
                if (dist.length >= 3) {
                    const so = this._shuffleOpts(correct, dist);
                    if (so.options) q.push({ cat: 'mechanism', dynamic: true,
                        q:    `Which drug class does ${drug.name} belong to?`,
                        opts: so.options, ans: so.correctIdx,
                        exp:  drug.mechanism ? `${drug.name}: ${tr(drug.mechanism, 220)}` : `${drug.name} belongs to the ${drug.class} group.` });
                }
            }

            // T2 – Drug name → correct indication (safe direction: distractors are other drugs' indications)
            if (drug.indication) {
                const correct = tr(fi(drug.indication), 75);
                // Distractors: first indication of OTHER drugs in clearly different therapeutic classes
                const dist = drugs
                    .filter(d => d !== drug && d.indication && d.class !== drug.class)
                    .map(d => tr(fi(d.indication), 75))
                    .filter((v, i, a) => v && v.length < 85 && v !== correct && a.indexOf(v) === i)
                    .slice(0, 3);
                if (correct && dist.length >= 3) {
                    const so = this._shuffleOpts(correct, dist);
                    if (so.options) q.push({ cat: 'dosing', dynamic: true,
                        q:    `Which of the following is a primary indication for ${drug.name}?`,
                        opts: so.options, ans: so.correctIdx,
                        exp:  (drug.clinicalPearls ? `${drug.clinicalPearls} — ` : '') + `Indication: ${drug.indication}` });
                }
            }

            // T3 – Contraindication
            if (drug.contraindications) {
                const correct = tr(fi(drug.contraindications));
                const dist    = pool('contraindications', drug);
                if (correct && correct.length < 90 && dist.length >= 3) {
                    const so = this._shuffleOpts(correct, dist);
                    if (so.options) q.push({ cat: 'contraindications', dynamic: true,
                        q:    `Which is a key contraindication to ${drug.name}?`,
                        opts: so.options, ans: so.correctIdx,
                        exp:  `${drug.name} \u2014 contraindications: ${drug.contraindications}` });
                }
            }

            // T4 – Side effect
            if (drug.sideEffects) {
                const correct = tr(fi(drug.sideEffects));
                const dist    = pool('sideEffects', drug);
                if (correct && correct.length < 90 && dist.length >= 3) {
                    const so = this._shuffleOpts(correct, dist);
                    if (so.options) q.push({ cat: 'sideeffects', dynamic: true,
                        q:    `Which side effect is most associated with ${drug.name}?`,
                        opts: so.options, ans: so.correctIdx,
                        exp:  `${drug.name} \u2014 side effects: ${drug.sideEffects}` });
                }
            }

            // T5 – Monitoring
            if (drug.monitoring) {
                const correct = tr(fi(drug.monitoring), 80);
                const dist    = pool('monitoring', drug).map(v => tr(v, 80));
                if (correct && dist.length >= 3) {
                    const so = this._shuffleOpts(correct, dist);
                    if (so.options) q.push({ cat: 'monitoring', dynamic: true,
                        q:    `What is the primary monitoring requirement for ${drug.name}?`,
                        opts: so.options, ans: so.correctIdx,
                        exp:  `${drug.name} \u2014 monitoring: ${drug.monitoring}` });
                }
            }

            // T6 – Drug interaction
            if (drug.interactions) {
                const correct = tr(fi(drug.interactions), 80);
                const dist    = pool('interactions', drug).map(v => tr(v, 80));
                if (correct && dist.length >= 3) {
                    const so = this._shuffleOpts(correct, dist);
                    if (so.options) q.push({ cat: 'interactions', dynamic: true,
                        q:    `Which is a key interaction to be aware of with ${drug.name}?`,
                        opts: so.options, ans: so.correctIdx,
                        exp:  `${drug.name} \u2014 interactions: ${drug.interactions}` });
                }
            }
        });

        return q;
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
        window.prxStartQuiz         = () => this.startQuiz();
        window.prxAnswerQuiz        = (i)  => this.answerQuiz(i);
        window.prxNextQuizQ         = ()   => this.nextQuizQ();
        window.prxResetQuiz         = ()   => this.resetQuiz();
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
    },
    opioid_toxicity: {
        text: '34-year-old man, found unresponsive at home. RR 4/min, pinpoint pupils, cyanotic, SpO₂ 74% on air. Empty heroin packaging nearby. GCS 4.',
        checks: [
            { test: d => /naloxone|narcan/i.test(d),
              fail: 'Naloxone is the specific opioid reversal agent. Give IM/IV/intranasal immediately for suspected opioid toxicity — airway and breathing take priority first.', type: 'error' },
            { test: (d, dose) => parseFloat(dose) === 400 || parseFloat(dose) === 0.4,
              fail: 'Standard adult naloxone dose: 400 micrograms (0.4 mg) IV or IM. Can repeat every 2–3 min up to 10 mg. Intranasal: 2 mg per nostril if no IV access.', type: 'error' },
            { test: (d, dose, route) => /iv|im|intramuscular|intravenous|intranasal/i.test(route),
              fail: 'IV is fastest onset. IM acceptable if no IV access. Intranasal is an alternative for community use. Do not use oral route in emergency.', type: 'error' },
            { test: (d, dose, route, freq) => /stat|once/i.test(freq),
              fail: 'STAT — repeated every 2–3 min until RR >12 and SpO₂ improving. Half-life of naloxone is shorter than most opioids: patient may re-narcotise after 30–90 min — continuous monitoring essential.', type: 'warn' },
        ]
    },
    svt: {
        text: '26-year-old woman, palpitations 45 min, HR 188 bpm on ECG showing regular narrow-complex tachycardia consistent with SVT. BP 118/76. Vagal manoeuvres attempted twice — no response.',
        checks: [
            { test: d => /adenosine/i.test(d),
              fail: 'Adenosine is first-line pharmacological treatment for SVT after failed vagal manoeuvres. Given as rapid IV bolus into a large peripheral vein (antecubital fossa).', type: 'error' },
            { test: (d, dose) => parseFloat(dose) === 6,
              fail: 'Adenosine: 6 mg IV rapid bolus, followed by fast 20 mL saline flush. If unsuccessful after 1–2 min: repeat 12 mg IV. Can repeat 12 mg a second time if SVT persists.', type: 'error' },
            { test: (d, dose, route) => /iv|intravenous/i.test(route),
              fail: 'Must be given IV as a RAPID bolus — followed immediately by 20 mL fast saline flush. Slow administration renders it ineffective as it is metabolised before reaching the heart.', type: 'error' },
            { test: d => !/verapamil/i.test(d),
              fail: 'Verapamil IV should NOT be given to a patient who has received IV beta-blockers (risk of complete heart block). Also contraindicated in known WPW syndrome — choose adenosine for broad safety.', type: 'warn' },
        ]
    },
    hypoglycaemia: {
        text: '67-year-old man with T2DM on insulin glargine + metformin. Found confused with BM 1.8 mmol/L. Unable to swallow safely. IV access obtained.',
        checks: [
            { test: d => /glucose|dextrose/i.test(d),
              fail: 'IV glucose (10% glucose 200 mL over 15 min, or 50 mL of 50% glucose) is first-line when the patient cannot swallow. 10% glucose is preferred over 50% glucose to reduce vein damage.', type: 'error' },
            { test: (d, dose) => {
                if (/50.*glucose|glucose.*50/i.test(d) || parseFloat(dose) === 50) return parseFloat(dose) <= 50;
                if (/10.*glucose|glucose.*10/i.test(d) || parseFloat(dose) === 200) return true;
                return parseFloat(dose) >= 50 && parseFloat(dose) <= 200;
              }, fail: 'IV glucose: 150–200 mL of 10% glucose IV OR 50 mL of 50% dextrose IV (50% is hypertonic — flush line, use large vein). Recheck BM at 10–15 min.', type: 'warn' },
            { test: (d, dose, route) => /iv|intravenous/i.test(route),
              fail: 'Patient cannot swallow safely — IV route required. If no IV access: glucagon 1 mg IM (raises BG within 10 min; less reliable if glycogen stores depleted, e.g. alcohol excess).', type: 'error' },
            { test: d => !/insulin/i.test(d),
              fail: 'Do NOT give further insulin while the patient is hypoglycaemic. Review and adjust the insulin regimen to prevent recurrence once BG is corrected.', type: 'warn' },
        ]
    },
    addisonian_crisis: {
        text: '41-year-old woman with known Addison\'s disease, N&V for 3 days unable to take oral prednisolone, now drowsy, BP 72/44, Na⁺ 128, K⁺ 5.6, glucose 2.9. This is an adrenal crisis.',
        checks: [
            { test: d => /hydrocortisone/i.test(d),
              fail: 'Hydrocortisone 100 mg IV/IM STAT is the life-saving treatment for adrenal crisis. Must be given before any investigation delays — do not wait for serum cortisol results if clinical diagnosis is made.', type: 'error' },
            { test: (d, dose) => parseFloat(dose) === 100,
              fail: 'Hydrocortisone 100 mg IV or IM STAT, then 50–100 mg QDS or as continuous infusion for 24h. Oral replacement only when patient is eating, drinking, and clinically stable.', type: 'error' },
            { test: (d, dose, route) => /iv|im|intravenous|intramuscular/i.test(route),
              fail: 'IV or IM route essential — patient is vomiting and haemodynamically compromised. Oral hydrocortisone absorption is too slow and unreliable in crisis.', type: 'error' },
            { test: d => /sodium.chloride|0\.9.*nacl|normal.saline|saline/i.test(d),
              fail: 'Simultaneous IV fluid resuscitation with 0.9% sodium chloride is essential — typically 1L over 30–60 min initially. The patient has hyponatraemia, hypotension, and volume depletion.', type: 'warn' },
        ]
    },
    eclampsia: {
        text: '32-year-old woman, 36 weeks pregnant, generalised tonic-clonic seizure now controlled. BP 178/116 mmHg. Proteinuria +++. No prior history of epilepsy. Diagnosis: eclampsia.',
        checks: [
            { test: d => /magnesium.sulphate|magnesium.sulfate|magnesium/i.test(d),
              fail: 'Magnesium sulphate is the drug of choice for seizure prevention and treatment in eclampsia — superior to diazepam or phenytoin. Loading dose: 4 g IV over 5–10 min.', type: 'error' },
            { test: (d, dose) => parseFloat(dose) === 4,
              fail: 'MgSO4 loading dose: 4 g IV over 5–10 min, then maintenance infusion 1 g/h for 24h. Monitor reflexes (loss of patellar reflex = early toxicity), RR>16, UO >25 mL/h. Antidote: calcium gluconate 10 mL 10% IV.', type: 'error' },
            { test: (d, dose, route) => /iv/i.test(route),
              fail: 'IV route required for magnesium sulphate loading dose. Maintenance is IV infusion. Ensure hourly monitoring of reflexes and respiratory rate during infusion.', type: 'error' },
            { test: d => /labetalol|hydralazine|nifedipine/i.test(d),
              fail: 'Antihypertensive treatment is also required: IV labetalol or hydralazine (oral nifedipine modified-release is an alternative) to maintain BP <150/100 mmHg and reduce stroke risk. Urgent obstetric review for delivery planning.', type: 'warn' },
        ]
    },
    delirium_tremens: {
        text: '48-year-old man, admitted 48h ago for surgery, now agitated, tremulous, diaphoretic, hallucinating. Drinks 30 units/week. HR 118, BP 168/102, T 37.9°C. Alcohol withdrawal score elevated.',
        checks: [
            { test: d => /chlordiazepoxide|lorazepam|diazepam|oxazepam/i.test(d),
              fail: 'Benzodiazepines are first-line for alcohol withdrawal/delirium tremens. Chlordiazepoxide 25–50 mg QDS (fixed-dose reducing regimen) is standard for inpatients. Lorazepam IV if actively seizing or unable to take oral.', type: 'error' },
            { test: (d, dose) => {
                if (/chlordiazepoxide/i.test(d)) return parseFloat(dose) >= 25 && parseFloat(dose) <= 50;
                if (/lorazepam/i.test(d)) return parseFloat(dose) >= 1 && parseFloat(dose) <= 4;
                if (/diazepam/i.test(d)) return parseFloat(dose) >= 10 && parseFloat(dose) <= 20;
                return true;
              }, fail: 'Chlordiazepoxide: 25–50 mg QDS with PRN doses, reducing over 5–7 days. Lorazepam: 1–4 mg IV/IM if severe. Also prescribe thiamine (Pabrinex IV) to prevent Wernicke encephalopathy.', type: 'warn' },
            { test: d => !/haloperidol|olanzapine/i.test(d),
              fail: 'Antipsychotics (haloperidol, olanzapine) LOWER seizure threshold — do not use as sole or primary treatment for alcohol withdrawal. They can be added cautiously for refractory hallucinations only under specialist guidance.', type: 'warn' },
        ]
    },
    acute_gout: {
        text: '52-year-old man, first gout attack, severe right first MTP joint pain and swelling for 18h. eGFR 78. Not taking allopurinol. Not on warfarin. No peptic ulcer history.',
        checks: [
            { test: d => /naproxen|indomethacin|ibuprofen|diclofenac|nsaid/i.test(d),
              fail: 'NSAIDs (e.g. naproxen 500 mg BD or indomethacin 50 mg TDS) are first-line for acute gout in patients without contraindications. Add a PPI if GI risk factors present.', type: 'error' },
            { test: (d, dose) => {
                if (/naproxen/i.test(d)) return parseFloat(dose) === 500;
                if (/indomethacin/i.test(d)) return parseFloat(dose) === 50;
                if (/ibuprofen/i.test(d)) return parseFloat(dose) === 400;
                return true;
              }, fail: 'Naproxen 500 mg BD, or indomethacin 50 mg TDS, or ibuprofen 400–800 mg TDS — all for 5–7 days. Continue until joint is fully settled.', type: 'warn' },
            { test: d => !/allopurinol/i.test(d),
              fail: 'NEVER start allopurinol during an acute attack — it prolongs and worsens the flare. Initiate urate-lowering therapy (allopurinol) 2–4 weeks after full resolution of the acute episode.', type: 'error' },
            { test: (d, dose, route) => /oral|po/i.test(route),
              fail: 'Oral route is standard for acute gout treatment in non-hospitalised patients.', type: 'warn' },
        ]
    },
    af_anticoagulation: {
        text: '71-year-old woman with newly diagnosed non-valvular AF. CHA₂DS₂-VASc score = 4 (age, hypertension, diabetes). eGFR 62. No bleeding history. No renal/hepatic impairment precluding DOACs.',
        checks: [
            { test: d => /apixaban|rivaroxaban|dabigatran|edoxaban/i.test(d),
              fail: 'DOACs are first-line for stroke prevention in non-valvular AF (preferred over warfarin in most patients). Apixaban (preferred in older/renal impaired patients) or rivaroxaban are commonly chosen.', type: 'error' },
            { test: (d, dose) => {
                if (/apixaban/i.test(d)) return parseFloat(dose) === 5 || parseFloat(dose) === 2.5;
                if (/rivaroxaban/i.test(d)) return parseFloat(dose) === 20;
                if (/edoxaban/i.test(d)) return parseFloat(dose) === 60;
                return true;
              }, fail: 'Apixaban: 5 mg BD (reduce to 2.5 mg BD if ≥2 of: age ≥80, weight ≤60 kg, creatinine ≥133). Rivaroxaban 20 mg OD with food. Edoxaban 60 mg OD (use 30 mg OD if eGFR 15–50).', type: 'warn' },
            { test: (d, dose, route) => /oral|po/i.test(route),
              fail: 'All DOACs are oral drugs.', type: 'error' },
            { test: d => !/aspirin/i.test(d),
              fail: 'Aspirin alone is NOT an alternative to anticoagulation for AF stroke prevention — it provides inadequate protection and adds bleeding risk without sufficient benefit. Only use if specific indication for antiplatelet therapy exists alongside anticoagulation.', type: 'warn' },
        ]
    },
    thyroid_storm: {
        text: '38-year-old woman, known Graves\' disease. Presents with fever 39.8°C, HR 152 (AF), agitation, vomiting, and lid lag. Burch-Wartofsky score >45. Diagnosis: thyroid storm.',
        checks: [
            { test: d => /propylthiouracil|propranolol|carbimazole|methimazole/i.test(d),
              fail: 'Thyroid storm requires urgent multi-drug treatment: (1) Propylthiouracil (PTU) 200 mg QDS or carbimazole 40 mg loading — to block new hormone synthesis. (2) Propranolol 40–80 mg TDS — to control sympathetic effects.', type: 'error' },
            { test: (d, dose) => {
                if (/propylthiouracil|ptu/i.test(d)) return parseFloat(dose) === 200;
                if (/carbimazole/i.test(d)) return parseFloat(dose) >= 20 && parseFloat(dose) <= 40;
                if (/propranolol/i.test(d)) return parseFloat(dose) >= 40 && parseFloat(dose) <= 80;
                return true;
              }, fail: 'PTU 200 mg QDS (preferred in storm — blocks T4→T3 conversion); OR carbimazole 40 mg loading. Add propranolol 40–80 mg TDS for rate control and symptom relief. Also: Lugol\'s iodine 1h after PTU/carbimazole, hydrocortisone 100 mg TDS IV, and active cooling.', type: 'warn' },
            { test: (d, dose, route) => /oral|iv|po/i.test(route),
              fail: 'Oral route for antithyroid drugs. IV hydrocortisone and IV fluids are essential adjuncts — admit to HDU/ITU.', type: 'warn' },
        ]
    },
    migraine_acute: {
        text: '29-year-old woman, severe unilateral throbbing headache 3h with photophobia and nausea. Known migraine — similar to previous episodes. Neurological exam normal. No aura.',
        checks: [
            { test: d => /sumatriptan|naratriptan|rizatriptan|zolmitriptan|triptan|aspirin|paracetamol|ibuprofen|metoclopramide|domperidone/i.test(d),
              fail: 'Acute migraine: NSAID (ibuprofen 400 mg PO) OR aspirin 900 mg PO + antiemetic (metoclopramide 10 mg PO or domperidone 10 mg PO) are first-line. Add a triptan (e.g. sumatriptan 50–100 mg PO) if moderate-severe or NSAID-insufficient.', type: 'error' },
            { test: (d, dose) => {
                if (/sumatriptan/i.test(d)) return parseFloat(dose) >= 50 && parseFloat(dose) <= 100;
                if (/aspirin/i.test(d)) return parseFloat(dose) === 900;
                if (/ibuprofen/i.test(d)) return parseFloat(dose) === 400;
                if (/metoclopramide/i.test(d)) return parseFloat(dose) === 10;
                return true;
              }, fail: 'Sumatriptan: 50–100 mg PO (repeat after 2h if recurrence; max 300 mg/24h). Aspirin 900 mg PO + metoclopramide 10 mg PO is an effective and cheaper alternative.', type: 'warn' },
            { test: (d, dose, route) => /oral|po/i.test(route),
              fail: 'Oral route for most acute migraine treatments. SC or nasal sumatriptan for vomiting or if oral is ineffective. Avoid antiemetics rectally unless vomiting precludes oral.', type: 'warn' },
            { test: d => !/codeine|tramadol/i.test(d),
              fail: 'Opioids (codeine, tramadol) are NOT recommended for migraine — they provide inadequate relief and are a major risk factor for medication-overuse headache (codeine is particularly problematic). Avoid.', type: 'warn' },
        ]
    },
    rapid_tranquillisation: {
        text: '27-year-old man, acute psychosis in A&E, aggressive and threatening, posing immediate risk to staff. Verbal de-escalation failed. Oral medication refused. IM route planned.',
        checks: [
            { test: d => /lorazepam|haloperidol|olanzapine|midazolam/i.test(d),
              fail: 'Rapid tranquillisation (RT): IM lorazepam 1–2 mg is first-line (safest, predictable). Alternatives: IM haloperidol 5 mg or IM olanzapine 10 mg. Do NOT combine IM olanzapine + IM lorazepam (respiratory depression risk).', type: 'error' },
            { test: (d, dose) => {
                if (/lorazepam/i.test(d)) return parseFloat(dose) >= 1 && parseFloat(dose) <= 2;
                if (/haloperidol/i.test(d)) return parseFloat(dose) >= 5 && parseFloat(dose) <= 10;
                if (/olanzapine/i.test(d)) return parseFloat(dose) === 10;
                return true;
              }, fail: 'Lorazepam: 1–2 mg IM. Haloperidol: 5–10 mg IM. Olanzapine: 10 mg IM. Monitor BP, HR, RR, and SpO₂ every 5–10 min post-injection. Resuscitation facilities must be available.', type: 'warn' },
            { test: (d, dose, route) => /im|intramuscular/i.test(route),
              fail: 'IM route is standard for RT when oral medication is refused. IV lorazepam can be used in resuscitation areas only with monitoring. Never use IV haloperidol or olanzapine for RT without specialist input.', type: 'error' },
        ]
    },
    acute_severe_headache: {
        text: '44-year-old man, sudden-onset "thunderclap" headache — worst he has ever had, maximal at onset 90 min ago. No focal neurology. BP 164/96. Neck stiffness present. CT head is NORMAL.',
        checks: [
            { test: d => !/morphine|opioid|paracetamol|ibuprofen|nsaid/i.test(d),
              fail: 'In a thunderclap headache with normal CT but neck stiffness, the priority is LUMBAR PUNCTURE (12h after onset for xanthochromia) to exclude subarachnoid haemorrhage — NOT immediate analgesia prescription. Prescribe analgesia cautiously (paracetamol 1 g QDS is safest) but the diagnostic workup is the critical step.', type: 'warn' },
            { test: d => !/nimodipine/i.test(d),
              fail: 'If SAH is confirmed: nimodipine 60 mg PO every 4h (21 days) to reduce vasospasm-related cerebral ischaemia. Neurosurgical referral for coil/clip of the aneurysm.', type: 'warn' },
            { test: d => /paracetamol/i.test(d),
              fail: 'Paracetamol 1 g QDS is the safest initial analgesia while awaiting LP results. Avoid NSAIDs if SAH suspected (↑ bleeding risk).', type: 'ok' },
        ]
    },
    heart_failure_initiation: {
        text: '60-year-old man, new HFrEF (EF 35%), NYHA class II, BP 128/78, HR 74, eGFR 58, K⁺ 4.2, no current heart failure medications. Hospitalisation resolved. Ready to start standard therapy.',
        checks: [
            { test: d => /ramipril|enalapril|lisinopril|perindopril|ace|sacubitril/i.test(d),
              fail: 'Start ACEi (e.g. ramipril 1.25–2.5 mg OD, titrate to target 10 mg OD) as first-line in HFrEF. If ACEi-intolerant (cough): switch to ARB (candesartan). Monitor U&E and BP at 1–2 weeks after each dose increase.', type: 'error' },
            { test: (d, dose) => {
                if (/ramipril/i.test(d)) return parseFloat(dose) >= 1.25 && parseFloat(dose) <= 2.5;
                if (/lisinopril/i.test(d)) return parseFloat(dose) >= 2.5 && parseFloat(dose) <= 5;
                return true;
              }, fail: 'Start ACEi at low dose: ramipril 1.25–2.5 mg OD; lisinopril 2.5–5 mg OD. Titrate up slowly every 2 weeks to target dose. Do NOT start at full dose — risk of first-dose hypotension.', type: 'warn' },
            { test: (d, dose, route) => /oral|po/i.test(route),
              fail: 'All standard HFrEF drugs are oral.', type: 'error' },
            { test: d => !/nsaid|ibuprofen|naproxen|diclofenac/i.test(d),
              fail: 'NSAIDs are CONTRAINDICATED in heart failure — cause fluid retention, worsen renal function, and reduce the efficacy of ACEi and diuretics. Always review and stop NSAIDs in new HF.', type: 'warn' },
        ]
    },
    osteoporosis_bisphosphonate: {
        text: '68-year-old woman, fragility hip fracture managed surgically. DXA T-score −3.1 lumbar spine. No dental problems, no oesophageal disease. eGFR 52. Ready for osteoporosis therapy.',
        checks: [
            { test: d => /alendronate|alendronic.acid|risedronate|zoledronate|bisphosphonate/i.test(d),
              fail: 'Bisphosphonates are first-line for osteoporosis after fragility fracture. Alendronate 70 mg once weekly PO is most commonly used. Risedronate 35 mg weekly is an alternative.', type: 'error' },
            { test: (d, dose) => {
                if (/alendronate|alendronic/i.test(d)) return parseFloat(dose) === 70;
                if (/risedronate/i.test(d)) return parseFloat(dose) === 35;
                return true;
              }, fail: 'Alendronate 70 mg ONCE weekly PO (not daily). Must be taken on an empty stomach, sitting/standing upright, with full glass of water, 30 min before any food/drink/other medication. Remain upright 30 min after.', type: 'warn' },
            { test: (d, dose, route) => /oral|po/i.test(route),
              fail: 'Oral bisphosphonate (alendronate, risedronate). IV zoledronate 5 mg once yearly is an alternative if oral not tolerated.', type: 'error' },
            { test: (d, dose, route, freq) => /weekly|once.a.week|once weekly/i.test(freq),
              fail: 'MUST be prescribed as ONCE WEEKLY — not daily. Daily alendronate is incorrect for oral osteoporosis treatment and increases GI side-effect risk. Also co-prescribe calcium + vitamin D supplementation unless dietary intake is adequate.', type: 'error' },
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
    { drugs: ['ssri','triptan'],                 severity:'moderate', mechanism:'Additive serotonergic stimulation: SSRIs inhibit reuptake; triptans are direct 5-HT1B/1D agonists.',    effect:'Serotonin syndrome (agitation, tremor, hyperreflexia, clonus, hyperthermia).',      advice:'Generally avoid co-prescription. If essential (rare intractable migraine + depression): lowest effective doses; educate patient; monitor closely.' },
    { drugs: ['methotrexate','trimethoprim'],    severity:'severe',   mechanism:'Both inhibit dihydrofolate reductase additively → folate depletion; trimethoprim also ↓ methotrexate renal tubular elimination.', effect:'Life-threatening pancytopenia, mucositis, and severe folate-deficiency effects.', advice:'Combination is effectively a never-event outside oncology. Use nitrofurantoin or cefalexin for UTI in methotrexate patients. If unavoidable: withhold methotrexate course; give folinic acid; FBC urgently.' },
    { drugs: ['clarithromycin','statin'],        severity:'severe',   mechanism:'Clarithromycin potently inhibits CYP3A4 → ↓ simvastatin and atorvastatin metabolism → 10–15× drug concentration increase.', effect:'Rhabdomyolysis → acute kidney injury and hyperkalemia.', advice:'Withhold simvastatin/atorvastatin during clarithromycin courses. Pravastatin or rosuvastatin (not CYP3A4-dependent) are safer alternatives if statin is essential.' },
    { drugs: ['clozapine','ciprofloxacin'],      severity:'severe',   mechanism:'Ciprofloxacin inhibits CYP1A2 (primary clozapine metabolising enzyme) → ↑ clozapine levels 50–100%.', effect:'Clozapine toxicity: sedation, hypotension, seizures, agranulocytosis.',            advice:'Avoid ciprofloxacin in patients on clozapine — choose alternative antibiotics (e.g. co-amoxiclav). If unavoidable: reduce clozapine dose and monitor levels and WBC daily.' },
    { drugs: ['phenytoin','ocp'],                severity:'moderate', mechanism:'Phenytoin is a potent CYP3A4/CYP2C19 inducer → greatly accelerated oestrogen/progestogen metabolism.', effect:'Contraceptive failure (unintended pregnancy).',                                   advice:'Advise additional contraception (copper IUD preferred). Even high-dose OCP pills may be unreliable. Consider alternative AED (levetiracetam) under specialist review.' },
    { drugs: ['tamoxifen','ssri'],               severity:'moderate', mechanism:'SSRIs (especially fluoxetine, paroxetine) inhibit CYP2D6 — which converts tamoxifen to its active metabolite (endoxifen).', effect:'↓ tamoxifen efficacy → ↑ breast cancer recurrence risk.',                       advice:'Use CYP2D6-sparing antidepressants (venlafaxine, escitalopram, citalopram) in tamoxifen-treated breast cancer patients. Avoid fluoxetine and paroxetine.' },
    { drugs: ['rifampicin','doac'],              severity:'severe',   mechanism:'Rifampicin induces P-glycoprotein and CYP3A4 → dramatically ↑ DOAC clearance (70–90% reduction in plasma levels).', effect:'Loss of anticoagulant effect → thromboembolism.',                                advice:'Avoid co-prescription. If anticoagulation essential during rifampicin course, switch to warfarin (INR-guided) or LMWH — both are rifampicin-sparing strategies.' },
    { drugs: ['carbamazepine','warfarin'],       severity:'moderate', mechanism:'Carbamazepine is a potent enzyme inducer (CYP2C9, CYP3A4) → greatly ↑ warfarin metabolism → ↓ INR.', effect:'Subtherapeutic anticoagulation → thromboembolism risk.',                           advice:'Requires large warfarin dose increases (often 40–60%). Weekly INR monitoring until stable. Equivalent problem on stopping carbamazepine — INR rises rapidly. Consider DOAC if feasible under haematology input.' },
    { drugs: ['ssri','maoi'],                   severity:'severe',   mechanism:'Both increase synaptic serotonin; combined effect causes extreme serotonergic stimulation.',                effect:'Serotonin syndrome — can be fatal (hyperthermia, rigidity, rhabdomyolysis, DIC).', advice:'Absolute contraindication. Must wait ≥14 days after stopping MAOI before starting SSRI; ≥5 weeks after stopping fluoxetine (long half-life) before starting MAOI.' },
    { drugs: ['ace inhibitor','potassium'],      severity:'moderate', mechanism:'ACEi block aldosterone-mediated urinary K⁺ excretion; supplemental K⁺ adds further load.',                effect:'Hyperkalaemia (K⁺ >6 → ECG changes, VF risk).',                                   advice:'Check U&E before starting ACEi; repeat 1–2 weeks later. Avoid routine K⁺ supplementation when on ACEi. If K⁺ rises >5.5, withhold ACEi and reassess.' },
    { drugs: ['lithium','diuretic'],             severity:'severe',   mechanism:'Thiazide diuretics ↑ renal proximal tubular Na⁺ (and Li⁺) reabsorption — compensatory mechanism → Li⁺ retention.', effect:'Lithium toxicity (tremor, confusion, AKI, cardiac arrhythmias, coma).',             advice:'Avoid thiazides in lithium patients — use alternatives for BP/oedema. Loop diuretics are safer (different mechanism) but still require monitoring. Check Li⁺ levels within 1 week if diuretic change made.' },
    { drugs: ['metformin','iv contrast'],       severity:'moderate', mechanism:'IV contrast causes transient reduction in GFR; metformin accumulated in setting of AKI raises lactic acidosis risk.', effect:'Lactic acidosis (rare but potentially fatal).',                                  advice:'Withhold metformin from night before procedure; do not restart for 48h post-contrast; ensure creatinine remains stable. Many centres now risk-stratify by eGFR (safe if eGFR >45 and no other risks).' },
    { drugs: ['warfarin','fluconazole'],         severity:'severe',   mechanism:'Fluconazole potently inhibits CYP2C9 (primary warfarin S-enantiomer metabolism enzyme) → 50–200% INR increase.', effect:'Major bleeding (INR may rise above 10).',                                          advice:'Expect significant INR increase after 3–5 days of fluconazole. Reduce warfarin dose empirically by 25–50%; check INR every 2 days during course. Consider alternatives for thrush (topical clotrimazole).' },
    { drugs: ['antipsychotic','anticholinergic'], severity:'moderate', mechanism:'Additive antimuscarinic effects: many antipsychotics (especially olanzapine) have inherent anticholinergic properties compounded by additional anticholinergics.', effect:'Anticholinergic burden: constipation, urinary retention, confusion (especially elderly), ↑ QTc.', advice:'Minimise anticholinergic co-prescribing especially in elderly. Use the Anticholinergic Burden (ACB) calculator. Prefer lower-burden alternatives (bladder: mirabegron vs oxybutynin).' },
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
    { pair:'SSRI + Tramadol',                    badge:'danger',  note:'Serotonin syndrome — both serotonergic' },
    { pair:'SSRI + Triptan',                     badge:'warning', note:'Serotonin syndrome risk — generally avoid' },
    { pair:'Methotrexate + Trimethoprim',        badge:'danger',  note:'Fatal pancytopenia — never-event' },
    { pair:'Clarithromycin + Simvastatin',       badge:'danger',  note:'Rhabdomyolysis — withhold statin' },
    { pair:'Clozapine + Ciprofloxacin',          badge:'danger',  note:'CYP1A2 inhibition → clozapine toxicity' },
    { pair:'Phenytoin + OCP',                    badge:'danger',  note:'Contraceptive failure — use IUD' },
    { pair:'Tamoxifen + Fluoxetine/Paroxetine',  badge:'warning', note:'↓ tamoxifen efficacy via CYP2D6' },
    { pair:'Rifampicin + DOACs',                 badge:'danger',  note:'Near-complete loss of anticoagulation' },
    { pair:'SSRI + MAOI',                        badge:'danger',  note:'Fatal serotonin syndrome — absolute CI' },
    { pair:'Warfarin + Fluconazole',             badge:'danger',  note:'CYP2C9 inhibition → INR >10 possible' },
    { pair:'Lithium + Thiazide Diuretic',        badge:'danger',  note:'Li⁺ retention → toxicity/coma' },
    { pair:'Antipsychotic + Anticholinergic',    badge:'warning', note:'High anticholinergic burden — delirium risk' },
    { pair:'ACEi + K⁺ supplement',              badge:'warning', note:'Hyperkalaemia — monitor K⁺' },
    { pair:'Carbamazepine + Warfarin',           badge:'warning', note:'Enzyme induction — ↓ INR / clot risk' },
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

    { drug:'Dabigatran', normal:'150 mg BD (AF); 220 mg OD (VTE prophylaxis after hip/knee replacement)',
      renal:[
        { min:50, max:130, dose:'Standard dose',                                                             flag:'green' },
        { min:30, max:49,  dose:'AF: reduce to 110 mg BD; assess bleeding/thrombosis balance',               flag:'amber' },
        { min:0,  max:29,  dose:'Contraindicated — dabigatran is 80% renally cleared; accumulation → major bleeding', flag:'red' },
      ], hepatic:{ A:'Normal — renally excreted', B:'No dose adjustment but caution in hepatic impairment', C:'Avoid — limited data; risk of coagulopathy compounded' } },

    { drug:'Levetiracetam', normal:'250–500 mg BD, titrate to max 3 g/day',
      renal:[
        { min:80, max:130, dose:'Standard dose',               flag:'green' },
        { min:50, max:79,  dose:'500 mg–1 g BD',               flag:'green' },
        { min:30, max:49,  dose:'250–750 mg BD (max 1.5 g/day)', flag:'amber' },
        { min:0,  max:29,  dose:'250–500 mg BD; supplement after haemodialysis', flag:'red' },
      ], hepatic:{ A:'Normal', B:'Normal (not hepatically metabolised)', C:'Supplementary dose after dialysis if ESRD' } },

    { drug:'Pregabalin', normal:'75–300 mg BD (neuropathic pain); 150–600 mg/day (epilepsy)',
      renal:[
        { min:60, max:130, dose:'Standard',                  flag:'green' },
        { min:30, max:59,  dose:'Max 150 mg BD',             flag:'amber' },
        { min:15, max:29,  dose:'Max 75 mg BD',              flag:'amber' },
        { min:0,  max:14,  dose:'Max 75 mg OD (25–75 mg/day)', flag:'red' },
      ], hepatic:{ A:'Normal', B:'Normal (not hepatically metabolised)', C:'Normal' } },

    { drug:'Allopurinol', normal:'100–300 mg OD (gout prevention); start 100 mg with urate-lowering titration',
      renal:[
        { min:60, max:130, dose:'Standard; titrate to serum urate <360 µmol/L',            flag:'green' },
        { min:30, max:59,  dose:'Max 100 mg OD; reduce dose to avoid accumulation and oxypurinol toxicity', flag:'amber' },
        { min:0,  max:29,  dose:'50 mg OD or 100 mg every 2–3 days; supplementary dose after dialysis', flag:'red' },
      ], hepatic:{ A:'Normal', B:'Normal', C:'Use with caution; monitor LFTs' } },

    { drug:'Aciclovir (IV — HSV/VZV)',  normal:'5–10 mg/kg TDS IV (herpes encephalitis 10 mg/kg TDS)',
      renal:[
        { min:50, max:130, dose:'Standard dose (5–10 mg/kg TDS)',                          flag:'green' },
        { min:25, max:49,  dose:'5–10 mg/kg BD (reduce frequency)',                        flag:'amber' },
        { min:10, max:24,  dose:'5–10 mg/kg OD',                                           flag:'amber' },
        { min:0,  max:9,   dose:'2.5–5 mg/kg OD',                                          flag:'red'   },
      ], hepatic:{ A:'Normal — renally excreted', B:'Normal — renally excreted', C:'Normal — renally excreted' } },

    { drug:'Spironolactone', normal:'25–50 mg OD (heart failure/ascites); 100–200 mg OD (primary hyperaldosteronism)',
      renal:[
        { min:45, max:130, dose:'Standard; monitor U&E closely (K⁺ and creatinine)',        flag:'green' },
        { min:30, max:44,  dose:'Use with extreme caution — high hyperkalaemia risk; consider dose reduction', flag:'amber' },
        { min:0,  max:29,  dose:'Contraindicated — risk of life-threatening hyperkalaemia', flag:'red'   },
      ], hepatic:{ A:'Normal', B:'Can precipitate encephalopathy with over-diuresis; use cautiously', C:'High risk of encephalopathy; avoid aggressive diuresis' } },

    { drug:'Levothyroxine', normal:'1.6 mcg/kg/day (adults); start 25–50 mcg OD and titrate 6-weekly',
      renal:[
        { min:0, max:130, dose:'Standard dose — not renally cleared. Monitor TSH 6–8 weekly until stable.', flag:'green' },
      ], hepatic:{ A:'Normal', B:'Monitor TFTs more frequently — reduced T4-T3 conversion', C:'Dose requirement may fall with severe liver disease; monitor TSH 4-weekly' } },

    { drug:'Metoclopramide', normal:'10 mg TDS PO/IM/IV (max 5 days for most indications)',
      renal:[
        { min:40, max:130, dose:'Standard dose',                                                flag:'green' },
        { min:15, max:39,  dose:'Reduce to 5 mg TDS — increased risk of extrapyramidal effects', flag:'amber' },
        { min:0,  max:14,  dose:'Avoid — use alternative antiemetic (ondansetron, cyclizine)',  flag:'red'   },
      ], hepatic:{ A:'Normal', B:'Reduce dose by 50%; ↑ plasma levels due to ↓ first-pass metabolism', C:'Avoid — may worsen hepatic encephalopathy; use cyclizine or ondansetron' } },
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

    { id:21, title:'Digoxin toxicity — electrolyte interaction',
      vignette:'A 78-year-old woman on digoxin 125 mcg OD for AF and furosemide 80 mg OD for heart failure presents with nausea, xanthopsia, and bradycardia. Digoxin level: 1.9 ng/mL (within range). K⁺: 2.8 mmol/L. What best explains her toxicity despite a "normal" digoxin level?',
      options:['Digoxin level is actually too low','Hypokalaemia sensitises cardiac cells to digoxin toxicity — clinical toxicity can occur at normal serum levels','Furosemide is directly cardiotoxic','She needs a higher digoxin dose to restore sinus rhythm'],
      correct:1,
      explanation:'Hypokalaemia (often caused by loop diuretics) dramatically sensitises myocardial Na⁺/K⁺-ATPase to digoxin — clinical toxicity can occur at subtherapeutic or therapeutic serum levels. Always check K⁺ in digoxin patients! Treat hypokalaemia first. Xanthopsia (yellow-green visual halos) is a classic digoxin toxicity sign. Digoxin toxic levels: >2 ng/mL; but context matters.' },

    { id:22, title:'Serotonin syndrome — drug combination',
      vignette:'A 45-year-old man on sertraline 100 mg OD is admitted with a severe headache. The on-call doctor prescribes sumatriptan 100 mg. Six hours later he has agitation, tremor, diarrhoea, bilateral lower limb clonus, and a temperature of 38.4°C. The most likely diagnosis is:',
      options:['Neuroleptic malignant syndrome','Meningitis','Serotonin syndrome due to SSRI + triptan combination','Opiate withdrawal'],
      correct:2,
      explanation:'Serotonin syndrome is characterised by the Hunter Criteria triad: clonus (spontaneous, inducible, or ocular), agitation, tremor, and autonomic instability (fever, tachycardia, diarrhoea). SSRIs inhibit serotonin reuptake; triptans are direct 5-HT1B/D agonists — additive serotonergic effect. Treat by stopping both drugs; cyproheptadine (5-HT antagonist); supportive care including benzodiazepines for agitation. NMS differs: onset slower (days), no clonus, lead-pipe rigidity, elevated CK.' },

    { id:23, title:'Clozapine — monitoring failure',
      vignette:'A 32-year-old man with treatment-resistant schizophrenia on clozapine 400 mg/day misses two consecutive blood monitoring appointments. He then presents with a 4-day history of sore throat, fever, and rigors. WBC: 1.2×10⁹/L, neutrophils: 0.4×10⁹/L. The MOST important immediate action is:',
      options:['Continue clozapine and treat the infection with antibiotics','STOP clozapine immediately and admit for IV antibiotics and haematology review — this is agranulocytosis until proven otherwise','Reduce the clozapine dose and monitor blood count weekly','Reassure and book an outpatient haematology appointment'],
      correct:1,
      explanation:'Clozapine causes life-threatening agranulocytosis in 1–2% of patients. Mandatory blood monitoring (CPMS system: weekly for first 18 weeks, fortnightly to 1 year, then monthly) exists specifically to detect this. Neutrophil count <0.5×10⁹/L = red alert → STOP clozapine immediately; isolate the patient; urgent haematology; IV broad-spectrum antibiotics. Clozapine must NEVER be restarted after agranulocytosis.' },

    { id:24, title:'Warfarin reversal — acute major bleed',
      vignette:'A 67-year-old man on warfarin for a mechanical mitral valve presents with haematemesis. INR: 8.7. He is haemodynamically stable but haemoglobin has dropped to 78 g/L. What is the CORRECT immediate pharmacological management?',
      options:['Vitamin K 5 mg IV alone','Stop warfarin; 4-factor PCC (Octaplex/Beriplex) IV STAT + vitamin K 5 mg IV','FFP 2 units transfusion alone','Warfarin should not be reversed in a mechanical valve patient'],
      correct:1,
      explanation:'In major bleeding on warfarin: give 4-factor prothrombin complex concentrate (PCC: Octaplex/Beriplex IV) for immediate reversal — onset within 15–30 minutes. Also give vitamin K 5 mg IV (to sustain reversal). FFP alone is insufficient (large volumes required, slow onset). Even in mechanical valve patients, reversal is warranted for major haemorrhage — the short period off anticoagulation is less dangerous than exsanguination. Restart warfarin when source controlled and haemostasis achieved.' },

    { id:25, title:'Drug-induced QT prolongation',
      vignette:'A patient with schizophrenia on haloperidol 10 mg/day develops palpitations. ECG shows QTc 530 ms. Which combination most likely contributed?',
      options:['Haloperidol + metformin','Haloperidol + ciprofloxacin (prescribed the previous week for UTI)','Haloperidol + ramipril','Haloperidol + paracetamol'],
      correct:1,
      explanation:'Both haloperidol and fluoroquinolones (ciprofloxacin, levofloxacin) independently prolong cardiac QTc via hERG (IKr) potassium channel blockade — additive when combined. QTc >500 ms is dangerous (TdP risk). Management: identify and remove causative agents; correct electrolytes (K⁺, Mg²⁺); cardiac monitoring. Use CredibleMeds resource to check QT risk before any combination.' },

    { id:26, title:'Inappropriate prescribing in the elderly — Beers Criteria',
      vignette:'An 84-year-old nursing home resident with mild dementia is prescribed diphenhydramine (PM) for insomnia, oxybutynin for urinary incontinence, and amitriptyline for neuropathic pain. She is admitted confused. The MAIN prescribing concern is:',
      options:['The doses are all too low for an elderly person','All three drugs have high anticholinergic burden and are inappropriate in elderly patients — combine to cause delirium','These are all evidence-based treatments for her conditions','She needs a benzodiazepine added for agitation'],
      correct:1,
      explanation:'Diphenhydramine, oxybutynin, and amitriptyline are all on the Beers/STOPP criteria as potentially inappropriate in older adults — all have high anticholinergic burden (ACB scores 3, 3, 3 respectively). Combined anticholinergic burden causes: delirium, falls, constipation, urinary retention, and ↑ dementia progression. Substitute: melatonin (insomnia), mirabegron (OAB), duloxetine/gabapentin (neuropathic pain). Conduct a full medication review.' },

    { id:27, title:'Spironolactone + ACEi + poor monitoring',
      vignette:'A 58-year-old man with heart failure on ramipril 5 mg OD is started on spironolactone 25 mg OD without bloods being checked. Two weeks later his K⁺ is 6.4 mmol/L and his ECG shows peaked T-waves. What is the correct management sequence?',
      options:['Increase spironolactone — needed for heart failure benefit','Withhold both spironolactone and ramipril; start calcium gluconate 10 mL 10% IV immediately given ECG changes; then insulin-dextrose; recheck K⁺ urgently; reassess benefits vs risks before restarting', 'Just reduce the spironolactone dose to 12.5 mg and recheck in 4 weeks','Give kayexalate and continue both medications'],
      correct:1,
      explanation:'K⁺ 6.4 with ECG changes (peaked T-waves = cardiac membrane effect) is an emergency. Immediate sequence: calcium gluconate IV (membrane stabilisation — does NOT lower K⁺) → insulin-dextrose IV (shifts K⁺ intracellularly) → consider patiromer/sodium zirconium cyclosilicate (binds K⁺ in gut) → identify precipitant (spironolactone + ACEi dual K⁺ retention). U&E must be checked within 1–2 weeks of adding spironolactone to an ACEi.' },

    { id:28, title:'Contrast nephropathy prevention',
      vignette:'A 64-year-old man (eGFR 38 mL/min) with NSTEMI requires emergency PCI with IV contrast. His regular medications include metformin, ramipril, and furosemide. Which pre-procedure preparation is MOST important?',
      options:['Double his furosemide dose to improve renal blood flow','Withhold metformin; hold ramipril and furosemide on morning of procedure; pre-hydrate with IV 0.9% NaCl 1 mL/kg/h for 12h before and 6h after; use minimum contrast volume','Pre-treat with N-acetylcysteine 600 mg BD — this is well-evidenced','Continue all medications unchanged — eGFR 38 is acceptable'],
      correct:1,
      explanation:'Contrast nephropathy prevention in CKD: (1) IV normal saline pre- and post-hydration (1 mL/kg/h) — best evidence; (2) withhold metformin (lactic acidosis risk) from night before, restart after 48h if creatinine stable; (3) withhold ACEi and diuretics morning of procedure (reduce pre-renal complications); (4) minimum contrast volume; (5) use iso-osmolar contrast if possible. N-acetylcysteine has weak/conflicting evidence (not routinely recommended).' },

    { id:29, title:'Opioid rotation — equianalgesic dosing',
      vignette:'A patient with cancer pain is on oral morphine 60 mg modified-release BD (total 120 mg/day oral morphine) but is experiencing significant nausea. The palliative care team decide to switch to a fentanyl patch. What is the approximate equivalent fentanyl patch dose?',
      options:['12 mcg/h patch','25 mcg/h patch','50 mcg/h patch','100 mcg/h patch'],
      correct:1,
      explanation:'Opioid conversion: oral morphine 90–134 mg/day ≈ fentanyl 25 mcg/h patch. The conversion factor is approximately 100 mg oral morphine = 25 mcg/h transdermal fentanyl. For 120 mg/day oral morphine → 25 mcg/h patch is the appropriate starting dose. Allow 12–24h crossover period; provide PRN oral morphine during patch establishment. Always use a validated conversion tool and cross-check with pharmacy/palliative care.' },

    { id:30, title:'Prescribing in acute porphyria',
      vignette:'A 24-year-old woman with known acute intermittent porphyria (AIP) is admitted with an acute neuropsychiatric episode. Which of the following should be AVOIDED?',
      options:['Morphine for pain','Ondansetron for nausea','Propofol for sedation if ITU required','All the above are safe; avoid phenytoin, sodium valproate, and diazepam'],
      correct:3,
      explanation:'In acute porphyria, many commonly used drugs are porphyrinogenic (induce ALA synthase, triggering attacks). Unsafe drugs include: phenytoin, valproate, carbamazepine, barbiturates, diazepam, sulphonamides, rifampicin, many anaesthetic agents, progestogens, griseofulvin, and others. Safe options: morphine (analgesia), ondansetron (antiemetic), propofol (anaesthesia), levetiracetam (seizures), gabapentin. Always check the NAPOS (National Acute Porphyria Service) or EPNET drug safety database before prescribing.' },
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

    { condition:'🦶 Diabetic Foot Infection', severity:'Mild-moderate (cellulitis ≤2 cm, no systemic sepsis)',
      firstLine:'Co-amoxiclav 625 mg TDS PO × 7–14 days (covers S. aureus, streptococci, anaerobes)',
      ifAllergy:'Clindamycin 300–450 mg QDS PO + ciprofloxacin 500 mg BD PO if Gram-negative risk',
      severe:'Moderate/severe (deep infection, osteomyelitis, systemic sepsis): piperacillin-tazobactam 4.5 g TDS IV ± vancomycin (MRSA risk)',
      route:'both', review:'Podiatry and vascular surgery urgent review. X-ray foot (osteomyelitis). MRI if osteomyelitis suspected. Wound swab and blood cultures. Ensure glycaemic control.',
      notes:'MRSA risk factors: prior MRSA, nursing home, previous antibiotics. Osteomyelitis may require 6+ weeks of antibiotics and surgical debridement. Multidisciplinary diabetic foot team referral for all moderate/severe cases.' },

    { condition:'🫁 PCP Prophylaxis (Pneumocystis jirovecii)', severity:'Immunocompromised (HIV CD4 <200, steroids, transplant)',
      firstLine:'Co-trimoxazole 960 mg OD (or 480 mg OD if tolerability issues)',
      ifAllergy:'Dapsone 100 mg OD (check G6PD status first) OR pentamidine 300 mg nebulised monthly',
      severe:'Active PCP treatment: co-trimoxazole high-dose 120 mg/kg/day IV in 2–4 divided doses × 21 days + prednisolone 40 mg BD if PaO₂ <9.3 kPa',
      route:'oral', review:'HIV specialist review essential. Prophylaxis continued until CD4 >200 cells/µL for ≥3 months. Monitor FBC and LFTs on co-trimoxazole.',
      notes:'PCP is the most common AIDS-defining illness in patients not on HAART. Co-trimoxazole also provides toxoplasma prophylaxis. Start prophylaxis when CD4 <200 or CD4% <14%. Steroids in active PCP reduce mortality if hypoxia present — landmark RCT evidence.' },

    { condition:'🦷 Human/Animal Bite Infection', severity:'Bite wound with signs of infection',
      firstLine:'Co-amoxiclav 625 mg TDS PO × 5–7 days (covers Pasteurella, streptococci, anaerobes)',
      ifAllergy:'Doxycycline 100 mg BD + metronidazole 400 mg TDS PO',
      severe:'Deep infection, tendon/bone involvement, or sepsis: co-amoxiclav 1.2 g TDS IV or piperacillin-tazobactam 4.5 g TDS IV',
      route:'oral', review:'Wound irrigation + debridement essential. Assess tetanus immunisation status (give booster if required). Cat bites: high Pasteurella multocida risk — prophylactic antibiotics recommended even without infection. Human bites: consider hepatitis B/HIV/HCV exposure risk assessment.',
      notes:'Dog bites: ~10–15% infection rate. Cat bites: ~50% infection rate (deep puncture wounds). Human bites: beware Eikenella corrodens. NEVER close bite wounds primarily if >6h old or involving hand/face. Refer hand bites promptly to plastics.' },

    { condition:'🏥 Surgical Antibiotic Prophylaxis', severity:'Pre-operative (within 60 min of incision)',
      firstLine:'Cefuroxime 1.5 g IV STAT (most general / orthopaedic surgery)',
      ifAllergy:'Teicoplanin 400 mg IV + gentamicin 1.5 mg/kg IV (penicillin allergy)',
      severe:'Colorectal: add metronidazole 500 mg IV. Contaminated wounds: individualise based on microbiology.',
      route:'iv', review:'Give within 30–60 min of incision (120 min for vancomycin). Repeat dose if surgery >3–4h or major blood loss. No evidence for prophylaxis >24h post-operatively — continuing is not indicated.',
      notes:'NICE NG125: routine prophylaxis for all hip/knee arthroplasty, bowel surgery, cardiac surgery, and most elective procedures. Duration: single dose (or max 24h). Stop at 24h — prolonged prophylaxis drives resistance without added benefit. Document allergy status clearly pre-operatively.' },

    { condition:'🧫 Acute Epididymo-orchitis', severity:'Sexually active men <35 yrs (STI likely)',
      firstLine:'Ceftriaxone 500 mg IM STAT (gonorrhoea cover) + doxycycline 100 mg BD PO × 14 days (chlamydia cover)',
      ifAllergy:'Ofloxacin 200 mg BD PO × 14 days (gonorrhoea + chlamydia cover if low local resistance)',
      severe:'Men >35 (enteric organisms likely): ciprofloxacin 500 mg BD PO × 10–14 days OR co-trimoxazole; MSU mandatory before starting',
      route:'both', review:'Urine NAAT for chlamydia and gonorrhoea (before antibiotics). Refer to GUM clinic. Scrotal ultrasound if abscess or torsion suspected.',
      notes:'Testicular torsion MUST be excluded urgently — surgical emergency. Contact tracing for STI if confirmed. Sexual abstinence until treatment completed and partner treated. Scrotal support, analgesia, avoid tight clothing. Orchitis with parotitis → consider mumps (notifiable).' },

    { condition:'🫀 Prosthetic Joint Infection (PJI)', severity:'Early (within 3 months of surgery)',
      firstLine:'Flucloxacillin 2 g QDS IV + rifampicin 600 mg OD PO (biofilm penetration, after organism confirmation)',
      ifAllergy:'Vancomycin 15–20 mg/kg BD IV + rifampicin 600 mg OD PO',
      severe:'MRSA or late prosthetic infection: vancomycin ± rifampicin. Duration: 6 weeks IV then switch to oral (depending on organism and surgical plan). Orthopaedics + ID co-management essential.',
      route:'iv', review:'Three sets of intraoperative tissue samples (NOT swabs) essential before antibiotics. ESR, CRP, WBC. PJI criteria: 2× positive cultures same organism, or 1 positive + elevated synovial fluid WBC. Orthopaedic surgical decision: debridement and retention vs one- or two-stage revision.',
      notes:'Rifampicin is crucial for biofilm-dwelling organisms (especially S. epidermidis) — never give as monotherapy (rapid resistance). Oral switch (e.g. flucloxacillin + rifampicin or co-trimoxazole + rifampicin) can complete treatment with equivalent outcomes for sensitive organisms under ID guidance.' },

    { condition:'🫁 TB — Standard Treatment (Drug-Sensitive)', severity:'New pulmonary TB, culture pending or confirmed sensitive',
      firstLine:'2HRZE then 4HR: isoniazid (H) + rifampicin (R) + pyrazinamide (Z) + ethambutol (E) × 2 months, then isoniazid + rifampicin × 4 months',
      ifAllergy:'Allergy or intolerance: specialist TB service modification — may substitute streptomycin, moxifloxacin',
      severe:'MDR-TB (resistant to H+R): specialist centre management — prolonged regimens (18–24+ months) with second-line agents (bedaquiline, delamanid, linezolid)',
      route:'oral', review:'Notify PHE (notifiable disease). DOTT (directly observed therapy) for complex cases. LFTs, U&E, vision before and during treatment. Contact tracing mandatory. Check HIV status in all TB patients.',
      notes:'Key interactions: rifampicin is a MAJOR enzyme inducer — reduces efficacy of warfarin, DOACs, OCP, phenytoin, many others. Pyrazinamide causes hyperuricaemia (can precipitate gout). Ethambutol → optic neuritis (check monthly visual acuity). Add pyridoxine 10 mg OD (prevention of isoniazid-induced peripheral neuropathy).' },
];

/* ── Drug Quiz Question Bank ────────────────────────────────────── */
/* cat: 'dosing' | 'contraindications' | 'interactions' | 'sideeffects' | 'mechanism' | 'monitoring' */
const DRUG_QUIZ_Q = [

    /* ── DOSING (23 questions) ── */
    { cat:'dosing', q:'What is the correct loading dose of aspirin in STEMI?',
      opts:['75 mg','150 mg','300 mg','600 mg'], ans:2,
      exp:'300 mg PO STAT loading dose for ACS/STEMI; 75 mg OD is the maintenance dose used thereafter.' },

    { cat:'dosing', q:'What is the standard dose of amoxicillin for mild community-acquired pneumonia (CURB-65 ≤1)?',
      opts:['250 mg TDS','500 mg TDS','1 g TDS','500 mg BD'], ans:1,
      exp:'Amoxicillin 500 mg TDS PO for 5 days is first-line for mild CAP. 1 g TDS is used for severe CAP.' },

    { cat:'dosing', q:'What is the loading dose of apixaban in acute PE?',
      opts:['5 mg BD','10 mg OD','10 mg BD for 7 days','15 mg OD for 21 days'], ans:2,
      exp:'Apixaban for PE: 10 mg BD for 7 days, then 5 mg BD. Rivaroxaban is 15 mg BD × 21 days then 20 mg OD.' },

    { cat:'dosing', q:'What is the starting dose of ramipril for newly diagnosed hypertension?',
      opts:['5 mg OD','10 mg OD','1.25–2.5 mg OD','2.5 mg BD'], ans:2,
      exp:'Ramipril starts at 1.25–2.5 mg OD, titrated slowly to max 10 mg OD. Start low to avoid first-dose hypotension and monitor U&E/creatinine.' },

    { cat:'dosing', q:'Furosemide in acute cardiogenic pulmonary oedema — initial IV dose?',
      opts:['10 mg IV','40–80 mg IV','120 mg IV','20 mg IV'], ans:1,
      exp:'Furosemide 40 mg IV (dose-naive patient). If already on oral furosemide, give IV equivalent of daily oral dose. Onset within 30 min when given IV.' },

    { cat:'dosing', q:'What is the first dose of adenosine for SVT termination?',
      opts:['3 mg IV','6 mg IV','12 mg IV','9 mg IV'], ans:1,
      exp:'Adenosine 6 mg rapid IV bolus followed by fast saline flush. If unsuccessful after 1–2 min: 12 mg IV. Can repeat 12 mg once more.' },

    { cat:'dosing', q:'Alendronate dose for postmenopausal osteoporosis?',
      opts:['35 mg daily','70 mg daily','70 mg weekly','35 mg weekly'], ans:2,
      exp:'Alendronate 70 mg ONCE WEEKLY on an empty stomach — must remain upright 30 min after dose. 35 mg weekly is the risedronate dose.' },

    { cat:'dosing', q:'What is the starting dose of metformin for T2DM?',
      opts:['500 mg TDS','500 mg OD–BD','1 g BD','850 mg TDS'], ans:1,
      exp:'Start metformin at 500 mg OD or BD with meals to minimise GI side effects. Titrate up over weeks to target dose (typically 500 mg–1 g BD/TDS).' },

    { cat:'dosing', q:'Magnesium sulphate loading dose in eclampsia?',
      opts:['2 g IV','4 g IV over 5–10 min','8 g IV','6 g IV'], ans:1,
      exp:'MgSO4 4 g IV over 5–10 min (loading), then 1 g/h maintenance for 24h. Monitor reflexes, RR, UO. Antidote: 10 mL 10% calcium gluconate IV.' },

    { cat:'dosing', q:'Naloxone dose for opioid overdose (IV, adult)?',
      opts:['0.1 mg IV','0.4 mg IV','1 mg IV','2 mg IV'], ans:1,
      exp:'Naloxone 400 micrograms (0.4 mg) IV/IM STAT; repeat every 2–3 min up to 10 mg. Half-life shorter than most opioids — monitor for re-narcotisation.' },

    { cat:'dosing', q:'Hydrocortisone dose for acute adrenal crisis?',
      opts:['50 mg IV','100 mg IV/IM STAT','200 mg IV','50 mg oral'], ans:1,
      exp:'Hydrocortisone 100 mg IV or IM STAT is life-saving. Then 50–100 mg QDS or continuous infusion. Oral only when stable and able to eat.' },

    { cat:'dosing', q:'PTU loading dose in thyroid storm?',
      opts:['50 mg OD','100 mg TDS','200 mg QDS','500 mg stat then 250 mg QDS'], ans:2,
      exp:'Propylthiouracil 200 mg QDS (preferred in storm — also blocks peripheral T4→T3 conversion). Carbimazole 40 mg loading is an alternative.' },

    { cat:'dosing', q:'Chlordiazepoxide for inpatient alcohol withdrawal — typical starting dose?',
      opts:['5 mg QDS','25–50 mg QDS (with PRN doses)','100 mg TDS','10 mg OD'], ans:1,
      exp:'Chlordiazepoxide 25–50 mg QDS with PRN rescue doses, on a reducing regimen over 5–7 days. Also prescribe Pabrinex IV to prevent Wernicke encephalopathy.' },

    { cat:'dosing', q:'Trimethoprim dose for uncomplicated lower UTI in a non-pregnant adult?',
      opts:['100 mg BD','200 mg OD','200 mg BD for 3–7 days','400 mg BD'], ans:2,
      exp:'Trimethoprim 200 mg BD for 3 days (NICE guideline) in healthy non-pregnant adults with uncomplicated UTI. Nitrofurantoin MR 100 mg BD for 3 days is an equivalent alternative.' },

    { cat:'dosing', q:'Enoxaparin dose for VTE prophylaxis in surgical in-patient?',
      opts:['20 mg SC OD','40 mg SC OD','60 mg SC OD','1 mg/kg SC BD'], ans:1,
      exp:'Enoxaparin 40 mg SC OD for VTE prophylaxis. 1 mg/kg SC BD (or 1.5 mg/kg OD) is the treatment dose for established VTE.' },

    { cat:'dosing', q:'Lorazepam dose for rapid tranquillisation via IM route?',
      opts:['0.5 mg IM','1–2 mg IM','4 mg IM','5 mg IM'], ans:1,
      exp:'Lorazepam 1–2 mg IM is first-line for IM rapid tranquillisation. Monitor BP, HR, RR, SpO2 every 5–10 min post-injection. Do not combine IM olanzapine with IM lorazepam.' },

    { cat:'dosing', q:'Sumatriptan dose for acute moderate-severe migraine (oral)?',
      opts:['25 mg','50–100 mg','200 mg','12.5 mg'], ans:1,
      exp:'Sumatriptan 50–100 mg PO. Can repeat after 2h if migraine recurs (NOT if initial dose failed); max 300 mg/24h. SC sumatriptan 6 mg for faster onset if vomiting.' },

    { cat:'dosing', q:'Prednisolone dose for acute severe asthma attack in adults?',
      opts:['20 mg OD','30 mg OD','40 mg OD for 5 days','60 mg OD'], ans:2,
      exp:'Prednisolone 40–50 mg OD PO for 5 days (or IV hydrocortisone 100 mg QDS if unable to swallow). No taper needed after short course.' },

    { cat:'dosing', q:'What is the correct dose of co-amoxiclav for moderate CAP?',
      opts:['375 mg TDS','625 mg TDS','1 g TDS','250 mg TDS'], ans:1,
      exp:'Co-amoxiclav 625 mg TDS PO for 5 days is used for moderate-severe CAP as a broad-spectrum alternative. 375 mg TDS is an older/lower-dose formulation.' },

    { cat:'dosing', q:'Digoxin: usual maintenance dose range for AF rate control?',
      opts:['500–750 mcg OD','62.5–250 mcg OD','500 mcg BD','1 mg OD'], ans:1,
      exp:'Digoxin 62.5–250 mcg OD (usually 125 mcg OD in elderly). Target serum level 0.5–0.9 ng/mL. Measure trough level ≥6h after dose — risk of toxicity is narrow.' },

    { cat:'dosing', q:'Standard IV morphine dose for moderate-severe acute pain in a hospital setting?',
      opts:['1 mg IV','2.5–5 mg IV titrated','10 mg IV single dose','0.5 mg IV'], ans:1,
      exp:'Morphine 2.5–5 mg IV titrated to response (lower in elderly, opioid-naive). Reassess pain score every 5–10 min. Have naloxone available.' },

    { cat:'dosing', q:'Atorvastatin dose for primary prevention of cardiovascular disease (high-intensity)?',
      opts:['10 mg OD','20 mg OD','40–80 mg OD','5 mg OD'], ans:2,
      exp:'Atorvastatin 40–80 mg OD is high-intensity statin therapy (≥40% LDL reduction). NICE recommends 20 mg OD for primary prevention with ≥10% 10-year CV risk.' },

    { cat:'dosing', q:'Starting dose of levothyroxine in elderly patients with hypothyroidism?',
      opts:['50–100 mcg OD','100 mcg OD','25 mcg OD, titrate slowly','150 mcg OD'], ans:2,
      exp:'Start at 25 mcg OD in the elderly or those with cardiac disease — rapid increase risks arrhythmia and angina. Younger, healthy adults: 50–100 mcg OD starting dose.' },

    /* ── CONTRAINDICATIONS (20 questions) ── */
    { cat:'contraindications', q:'ACE inhibitors are ABSOLUTELY contraindicated in which condition?',
      opts:['CKD stage 3','Bilateral renal artery stenosis','Controlled hypertension','Stable heart failure'], ans:1,
      exp:'Bilateral renal artery stenosis: ACEi block angiotensin II-mediated efferent arteriolar constriction, which is the only mechanism sustaining GFR in this setting — causes acute kidney failure.' },

    { cat:'contraindications', q:'Below which eGFR threshold should metformin be stopped (or not started)?',
      opts:['eGFR <60','eGFR <45','eGFR <30','eGFR <15'], ans:2,
      exp:'Metformin must be stopped when eGFR falls below 30 mL/min/1.73m² due to risk of lactic acidosis from metformin accumulation. Review dose when eGFR 30–45.' },

    { cat:'contraindications', q:'NSAIDs are CONTRAINDICATED in aspirin-exacerbated respiratory disease (AERD). Why?',
      opts:['Increase bronchospasm via COX-1 inhibition','Cause anaphylaxis via IgE','Increase sputum viscosity','Reduce inhaled steroid efficacy'], ans:0,
      exp:'COX-1 inhibition shifts arachidonic acid metabolism towards leukotrienes (LTB4, LTC4, LTD4), causing bronchospasm. Aspirin-exacerbated respiratory disease affects ~10% of asthma patients.' },

    { cat:'contraindications', q:'Which trimester of pregnancy is warfarin most teratogenic?',
      opts:['First trimester','Second trimester','Third trimester','It is safe throughout'], ans:0,
      exp:'Warfarin in weeks 6–12 causes warfarin embryopathy (nasal hypoplasia, stippled epiphyses). Near-term it risks fetal/neonatal haemorrhage. Use LMWH throughout pregnancy instead.' },

    { cat:'contraindications', q:'ACE inhibitors are contraindicated throughout pregnancy. What is the main risk?',
      opts:['Neural tube defects','Oligohydramnios, IUGR, neonatal renal dysgenesis','Cleft palate','Cardiac septal defects'], ans:1,
      exp:'ACEi in pregnancy (especially 2nd/3rd trimester) cause oligohydramnios, neonatal renal failure, skull defects, pulmonary hypoplasia. Absolutely contraindicated.' },

    { cat:'contraindications', q:'Amiodarone should be used with extreme caution (or avoided) in pre-existing:',
      opts:['Hypertension','Ventricular arrhythmia','Thyroid disease (hypo or hyperthyroidism)','Heart failure'], ans:2,
      exp:'Amiodarone is 37% iodine by weight. It causes thyroid dysfunction in up to 15% of patients — both hypothyroidism and hyperthyroidism. Baseline and 6-monthly TFTs are mandatory.' },

    { cat:'contraindications', q:'Metoclopramide is contraindicated in which neurological condition?',
      opts:['Epilepsy','Parkinson disease','Multiple sclerosis','Myasthenia gravis'], ans:1,
      exp:'Metoclopramide is a dopamine D2 antagonist — it worsens Parkinson symptoms and risks acute oculogyric crises and tardive dyskinesia. Use domperidone cautiously, or ondansetron in Parkinson disease.' },

    { cat:'contraindications', q:'Which is an ABSOLUTE contraindication to thrombolysis in ischaemic stroke?',
      opts:['BP 150/90 at presentation','Haemorrhagic stroke 6 months ago','Age >80','NIHSS score >20'], ans:1,
      exp:'Prior haemorrhagic stroke is an absolute contraindication. Recent surgery <3 months, active bleeding, and uncontrolled BP (>185/110 at time of treatment) are also contraindications.' },

    { cat:'contraindications', q:'Sildenafil is ABSOLUTELY contraindicated with which drug class?',
      opts:['Beta-blockers','Organic nitrates (e.g. GTN)','ACE inhibitors','Calcium channel blockers'], ans:1,
      exp:'Sildenafil + nitrates causes profound hypotension (both reduce cGMP degradation/production). This combination can be fatal. Absolute contraindication regardless of dose or timing.' },

    { cat:'contraindications', q:'Sodium valproate is subject to the Pregnancy Prevention Programme (PPP) because:',
      opts:['It causes fetal bradycardia','It causes neural tube defects and neurodevelopmental disorders — risk ~10% if exposed in utero','It crosses into breastmilk in high concentrations','It causes neonatal hypoglycaemia'], ans:1,
      exp:'Valproate carries a ~10% risk of congenital malformations and ~30–40% risk of neurodevelopmental disorders (autism, low IQ). All females of childbearing potential must be on effective contraception.' },

    { cat:'contraindications', q:'Nitrofurantoin is contraindicated after 36 weeks of pregnancy. Why?',
      opts:['Teratogenic at term','Risk of neonatal haemolytic anaemia (G6PD deficiency in neonatal red cells)','Crosses placenta and causes cardiac defects','Causes maternal hepatotoxicity'], ans:1,
      exp:'Near-term, nitrofurantoin risks neonatal haemolytic anaemia because neonatal red cells are immature. Also contraindicated at any gestation if eGFR <45 (no longer effective as urinary levels insufficient).' },

    { cat:'contraindications', q:'Domperidone is contraindicated with amiodarone due to:',
      opts:['Increased domperidone metabolism','Additive QT prolongation — risk of Torsades de pointes','Reduced anti-nausea efficacy','Hyperkalaemia'], ans:1,
      exp:'Both domperidone and amiodarone prolong the QT interval. Combining them significantly increases risk of Torsades de pointes (TdP) / VF. Avoid this combination.' },

    { cat:'contraindications', q:'GLP-1 receptor agonists (e.g. semaglutide) are contraindicated in:',
      opts:['Obesity without diabetes','Personal or family history of medullary thyroid carcinoma (MEN2)','eGFR 45–60','T2DM on oral therapy'], ans:1,
      exp:'GLP-1 agonists activate GLP-1 receptors on thyroid C-cells, increasing calcitonin secretion — linked to medullary thyroid carcinoma in animal studies. Absolute contraindication in MEN2 or personal history of MTC.' },

    { cat:'contraindications', q:'Beta-blockers are contraindicated in which form of heart failure?',
      opts:['Stable, compensated HFrEF','NYHA class I HF','Acutely decompensated heart failure (wet/cold)','Hypertension with HF'], ans:2,
      exp:'Beta-blockers should NOT be started in acute decompensated heart failure (wet/cold patient). In stable chronic HFrEF: bisoprolol, carvedilol, and nebivolol are evidence-based and recommended.' },

    { cat:'contraindications', q:'Allopurinol should NEVER be started during:',
      opts:['Chronic gout between attacks','Renal impairment','An acute gout flare','Asymptomatic hyperuricaemia'], ans:2,
      exp:'Starting allopurinol during an acute flare mobilises urate crystals and worsens/prolongs the attack. Initiate 2–4 weeks after full resolution, with co-prescribing of colchicine or NSAID cover.' },

    { cat:'contraindications', q:'Fluoroquinolones (e.g. ciprofloxacin) should be avoided in:',
      opts:['UTI caused by Gram-negative organisms','Myasthenia gravis','Diabetic foot infections','Diverticulitis'], ans:1,
      exp:'Fluoroquinolones impair neuromuscular transmission, causing potentially life-threatening exacerbations of myasthenia gravis. Also carry risk of tendon rupture and peripheral neuropathy.' },

    { cat:'contraindications', q:'Tamsulosin should be flagged before which elective procedure?',
      opts:['Total hip replacement','General anaesthesia','Cataract surgery (intraoperative floppy iris syndrome)','MRI'], ans:2,
      exp:'Tamsulosin causes intraoperative floppy iris syndrome (IFIS) during phacoemulsification cataract surgery. Surgeons must be informed — drug does NOT need to be stopped but surgical technique must be modified.' },

    { cat:'contraindications', q:'Carbamazepine is contraindicated (or requires extreme caution) in:',
      opts:['Focal epilepsy','Bipolar disorder','Acute porphyria AND HLA-B*1502 carriers (risk of Stevens-Johnson syndrome)','Generalised tonic-clonic seizures'], ans:2,
      exp:'Carbamazepine causes acute porphyric attacks. HLA-B*1502 (common in Han Chinese, South-East Asian populations) is strongly associated with SJS/TEN with carbamazepine. Screen before prescribing.' },

    { cat:'contraindications', q:'Spironolactone is contraindicated if K⁺ exceeds:',
      opts:['5.0 mmol/L','5.5 mmol/L','6.0 mmol/L','4.5 mmol/L'], ans:1,
      exp:'Spironolactone is contraindicated if K⁺ >5.5 mmol/L or eGFR <30. It is a potassium-sparing diuretic — can cause dangerous hyperkalaemia, especially combined with ACEi or ARBs.' },

    { cat:'contraindications', q:'Which antibiotic is contraindicated in the FIRST trimester of pregnancy due to folate antagonism?',
      opts:['Amoxicillin','Trimethoprim (especially first trimester)','Nitrofurantoin','Cefalexin'], ans:1,
      exp:'Trimethoprim inhibits dihydrofolate reductase — risk of neural tube defects in first trimester. Avoid in first trimester and supplement folate if inadvertently exposed. Cefalexin is considered safe in pregnancy.' },

    /* ── INTERACTIONS (20 questions) ── */
    { cat:'interactions', q:'Lithium + NSAIDs: what is the key risk?',
      opts:['Reduced lithium level','Dangerously elevated lithium levels (lithium toxicity)','Renal failure only','QT prolongation'], ans:1,
      exp:'NSAIDs reduce renal prostaglandin synthesis → reduced GFR → reduced lithium excretion → lithium toxicity (ataxia, tremor, confusion, cardiac arrhythmia). Common and serious interaction — avoid if possible.' },

    { cat:'interactions', q:'Simvastatin + clarithromycin: main serious risk?',
      opts:['Hepatitis','Rhabdomyolysis (myopathy)','Hypoglycaemia','Reduced statin efficacy'], ans:1,
      exp:'Clarithromycin inhibits CYP3A4, dramatically increasing simvastatin plasma levels → myopathy and rhabdomyolysis. Use a statin not metabolised by CYP3A4 (e.g. rosuvastatin, pravastatin) or withhold simvastatin during clarithromycin.' },

    { cat:'interactions', q:'Warfarin + fluconazole: what happens to the INR?',
      opts:['INR falls (sub-therapeutic)','No significant effect','INR rises (risk of bleeding)','INR becomes unpredictable only'], ans:2,
      exp:'Fluconazole inhibits CYP2C9, the main enzyme metabolising warfarin → warfarin accumulates → INR rises significantly. Monitor closely and reduce warfarin dose. All azole antifungals interact with warfarin.' },

    { cat:'interactions', q:'ACE inhibitor + potassium-sparing diuretic (e.g. spironolactone): main risk?',
      opts:['Hyponatraemia','Hypokalaemia','Hyperkalaemia','Metabolic alkalosis'], ans:2,
      exp:'Both drugs reduce aldosterone-mediated potassium excretion. Combined use risks dangerous hyperkalaemia especially in CKD, elderly patients, or when combined with dietary potassium or potassium supplements.' },

    { cat:'interactions', q:'SSRIs + triptans: what potentially serious syndrome can occur?',
      opts:['Neuroleptic malignant syndrome','Serotonin syndrome','Agranulocytosis','QT prolongation'], ans:1,
      exp:'Both SSRIs and triptans increase serotonergic activity. Combination risks serotonin syndrome: agitation, confusion, clonus, hyperthermia, tachycardia. Risk is low but clinically significant — monitor carefully.' },

    { cat:'interactions', q:'Digoxin toxicity risk is enhanced by which electrolyte disturbance?',
      opts:['Hyperkalaemia','Hypocalcaemia','Hypokalaemia','Hypernatraemia'], ans:2,
      exp:'Hypokalaemia potentiates digoxin toxicity — both compete for the same Na/K-ATPase pump. Loop diuretics (commonly co-prescribed) cause hypokalaemia, increasing toxicity risk. Monitor K⁺ when adjusting diuretics.' },

    { cat:'interactions', q:'Methotrexate toxicity is enhanced (potentially fatally) by:',
      opts:['Folic acid supplementation','NSAIDs','Paracetamol','Amlodipine'], ans:1,
      exp:'NSAIDs reduce renal tubular secretion and GFR → methotrexate accumulates → bone marrow suppression, mucositis, and hepatotoxicity. This is a major, potentially fatal drug interaction. Avoid NSAIDs in methotrexate patients.' },

    { cat:'interactions', q:'Rifampicin + warfarin: what is the pharmacokinetic result?',
      opts:['INR rises — risk of bleeding','INR falls — risk of thrombosis (CYP3A4/CYP2C9 induction)','INR unchanged','Rifampicin inhibits warfarin metabolism'], ans:1,
      exp:'Rifampicin is a potent CYP enzyme inducer — it dramatically increases warfarin metabolism, reducing plasma warfarin levels and INR. Significant warfarin dose increase required during rifampicin therapy; INR must fall back on stopping.' },

    { cat:'interactions', q:'Amiodarone + haloperidol: key risk?',
      opts:['Hepatotoxicity','Nephrotoxicity','QT prolongation — risk of Torsades de pointes','Rhabdomyolysis'], ans:2,
      exp:'Both amiodarone and haloperidol independently prolong the QT interval. Co-prescribing them significantly increases risk of Torsades de pointes and sudden cardiac death. Avoid combination.' },

    { cat:'interactions', q:'Fluoxetine inhibits CYP2D6. What is the effect when combined with codeine?',
      opts:['Increased codeine toxicity','Reduced analgesia — codeine cannot be converted to morphine','No clinically relevant effect','Serotonin syndrome'], ans:1,
      exp:'Codeine is a prodrug converted to morphine by CYP2D6. Fluoxetine inhibits CYP2D6 → reduced morphine formation → inadequate analgesia. Additionally, some patients are CYP2D6 poor metabolisers regardless.' },

    { cat:'interactions', q:'Allopurinol + azathioprine: why is azathioprine dose reduction mandatory?',
      opts:['Allopurinol induces azathioprine metabolism','Allopurinol inhibits xanthine oxidase, blocking azathioprine breakdown → severe toxicity','Renal competition for excretion','QT prolongation'], ans:1,
      exp:'Azathioprine is metabolised by xanthine oxidase to inactive metabolites. Allopurinol inhibits this enzyme → azathioprine accumulates → severe myelosuppression. If combination unavoidable, reduce azathioprine dose to 25% of normal.' },

    { cat:'interactions', q:'Carbamazepine + combined oral contraceptive pill: effect?',
      opts:['Increased OCP efficacy','No meaningful interaction','Reduced OCP efficacy — risk of unintended pregnancy (CYP induction)','VTE risk increased'], ans:2,
      exp:'Carbamazepine induces CYP3A4 and other enzymes, increasing metabolism of oestrogen and progestogen → reduced OCP plasma levels → contraceptive failure. Use alternative contraception (e.g. intrauterine device, depot injection).' },

    { cat:'interactions', q:'IV beta-blocker + IV verapamil given together: most serious risk?',
      opts:['Tachycardia and hypertension','Complete heart block and asystole','Hypokalaemia','Severe bronchospasm'], ans:1,
      exp:'Both depress AV nodal conduction: combined IV use can cause complete heart block, severe bradycardia, or asystole. This combination should generally be avoided; if both are needed, separate by time and use with extreme caution.' },

    { cat:'interactions', q:'Gentamicin + furosemide: synergistic toxicity involves which organs?',
      opts:['Liver and bone marrow','Kidney (nephrotoxicity) and inner ear (ototoxicity)','Peripheral nerves and kidneys','Thyroid and kidneys'], ans:1,
      exp:'Both are nephrotoxic and ototoxic. Furosemide reduces renal gentamicin clearance → accumulation. Pre-dose (trough) levels and renal function must be checked before every gentamicin dose in once-daily regimens.' },

    { cat:'interactions', q:'Lithium + thiazide diuretics: what happens to lithium levels?',
      opts:['Lithium levels fall','Lithium levels rise — risk of toxicity (reduced renal excretion)','No significant change','Lithium efficacy reduced but no toxicity'], ans:1,
      exp:'Thiazides cause sodium depletion → renal reabsorption of sodium AND lithium increases in the proximal tubule → lithium retention → toxicity. Monitor lithium levels closely if thiazides are started or stopped.' },

    { cat:'interactions', q:'Phenytoin + warfarin: long-term interaction?',
      opts:['INR rises (phenytoin inhibits warfarin metabolism)','INR falls (phenytoin induces CYP2C9)','No significant effect','Unpredictable only if phenytoin is toxic'], ans:1,
      exp:'Phenytoin is a CYP enzyme inducer (chronic use) → increases warfarin metabolism → reduced anticoagulation. Acute phenytoin can transiently inhibit CYP, raising INR. Monitor INR carefully when initiating, adjusting, or stopping phenytoin.' },

    { cat:'interactions', q:'MAOIs + pethidine/meperidine: which life-threatening syndrome can result?',
      opts:['Hypertensive crisis only','Serotonin syndrome / excitatory crisis (hyperpyrexia, convulsions, cardiovascular collapse)','Respiratory depression','Anticholinergic toxidrome'], ans:1,
      exp:'This is one of the most dangerous drug interactions. Pethidine inhibits serotonin reuptake AND is an opioid — combined with MAOIs this can cause fatal serotonin syndrome. Avoid all opioids with MAOIs; if needed, use morphine cautiously.' },

    { cat:'interactions', q:'Sucralfate + fluoroquinolones (e.g. ciprofloxacin): effect?',
      opts:['Increases fluoroquinolone levels','Sucralfate chelates the fluoroquinolone reducing oral absorption by up to 90%','No clinically relevant interaction','Increases renal excretion of fluoroquinolone'], ans:1,
      exp:'Sucralfate (aluminium-based) forms insoluble chelates with fluoroquinolones, dramatically reducing their absorption. Space dosing by at least 2–4 hours. Same issue applies with antacids, iron, zinc, and calcium.' },

    { cat:'interactions', q:'Ciclosporin + simvastatin: primary concern?',
      opts:['Reduced ciclosporin efficacy','Myopathy and rhabdomyolysis (ciclosporin inhibits OATP1B1 and CYP3A4)','Nephrotoxicity synergy','Hypertension'], ans:1,
      exp:'Ciclosporin inhibits CYP3A4 and hepatic uptake transporters → dramatically elevated statin levels → risk of rhabdomyolysis. Most statin–ciclosporin combinations are contraindicated or require very low maximum doses.' },

    { cat:'interactions', q:'Potassium supplements + ACE inhibitors: why is this combination dangerous?',
      opts:['Hypokalaemia','Hyperkalaemia — ACEi reduce aldosterone, impairing potassium excretion','Hyponatraemia','Metabolic acidosis only'], ans:1,
      exp:'ACEi reduce aldosterone, so less potassium is excreted in the collecting duct. Adding exogenous potassium (supplements or potassium-sparing diuretics) risks dangerous hyperkalaemia, especially in CKD.' },

    /* ── SIDE EFFECTS (15 questions) ── */
    { cat:'sideeffects', q:'The most common reason patients stop ACE inhibitors is:',
      opts:['Angioedema','Dry persistent cough (10–15% of patients)','Hyperkalaemia','Hypotension'], ans:1,
      exp:'ACEi cough is caused by accumulation of bradykinin and substance P in the bronchial mucosa. It is not dose-dependent. Solution: switch to an ARB (e.g. losartan, candesartan) which does not cause this effect.' },

    { cat:'sideeffects', q:'Amiodarone causes thyroid dysfunction. Which effects are possible?',
      opts:['Hypothyroidism only','Hyperthyroidism only','Both hypothyroidism AND hyperthyroidism','No thyroid effect — only lung concern'], ans:2,
      exp:'Amiodarone contains large amounts of iodine (37% by weight) and also inhibits deiodinase. Type 1 amiodarone hyperthyroidism: iodine-excess driven. Type 2: destructive thyroiditis. Hypothyroidism also common. Check TFTs every 6 months.' },

    { cat:'sideeffects', q:'Clozapine: most dangerous haematological adverse effect requiring mandatory monitoring?',
      opts:['Thrombocytopenia','Aplastic anaemia','Agranulocytosis (neutropenia)','Haemolytic anaemia'], ans:2,
      exp:'Clozapine causes agranulocytosis in ~1% of patients — potentially fatal. Mandatory FBC monitoring: weekly for first year, fortnightly for second year, monthly thereafter. Clozapine must be stopped if neutrophils <1.5 × 10⁹/L.' },

    { cat:'sideeffects', q:'Statins: most common reason for discontinuation in clinical practice?',
      opts:['Hepatotoxicity','Myalgia and muscle aches (myopathy)','Rhabdomyolysis','Peripheral neuropathy'], ans:1,
      exp:'Myalgia occurs in 5–10% of statin users and is the commonest reason to stop. True rhabdomyolysis (CK >10× normal + myoglobinuria) is rare but serious. CK should be checked if muscle symptoms develop.' },

    { cat:'sideeffects', q:'Signs of lithium toxicity include all EXCEPT:',
      opts:['Coarse tremor and ataxia','Dysarthria and confusion','Vomiting and diarrhoea','Dry mouth and urinary retention'], ans:3,
      exp:'Dry mouth and urinary retention are anticholinergic effects — NOT features of lithium toxicity. Lithium toxicity presents with coarse tremor (vs fine therapeutic tremor), ataxia, confusion, seizures, vomiting, and renal failure.' },

    { cat:'sideeffects', q:'GTN (glyceryl trinitrate) patches: characteristic side effects?',
      opts:['Bradycardia and constipation','Headache and postural hypotension','Rash and pruritus only','Weight gain'], ans:1,
      exp:'GTN causes vasodilation — throbbing headache from cerebral vasodilation and postural hypotension are very common. Warn patients, especially when starting. Tolerance develops with continuous use — advise 8-hour patch-free interval daily.' },

    { cat:'sideeffects', q:'Amitriptyline (tricyclic antidepressant): characteristic anticholinergic side effects?',
      opts:['Diarrhoea, miosis, salivation','Urinary retention, dry mouth, constipation, blurred vision, tachycardia','Bradycardia, bronchospasm','Lacrimation and excessive sweating'], ans:1,
      exp:'TCAs block muscarinic receptors (anticholinergic). Remember: "blind as a bat, dry as a bone, red as a beet, hot as a hare, mad as a hatter" — blurred vision, dry mouth, urinary retention, flushing, confusion/sedation.' },

    { cat:'sideeffects', q:'High-dose corticosteroids — which metabolic side effect do they cause?',
      opts:['Hypoglycaemia','Hyperglycaemia (steroid-induced diabetes)','Hyperkalaemia','Hypercalcaemia'], ans:1,
      exp:'Corticosteroids cause insulin resistance and increase hepatic gluconeogenesis → steroid-induced hyperglycaemia/diabetes. Monitor blood glucose in all patients on corticosteroids ≥7 days or at high doses. Hypoglycaemia does NOT occur.' },

    { cat:'sideeffects', q:'Sodium valproate: most clinically important teratogenic effect?',
      opts:['Limb reduction defects','Neural tube defects (spina bifida), cardiac defects, and neurodevelopmental disorders','Hearing loss and visual impairment','Cleft palate only'], ans:1,
      exp:'Valproate carries ~10% risk of major congenital malformations (NTDs, cardiac, urogenital) and 30–40% risk of neurodevelopmental harm (autism, lower IQ). This is why the Pregnancy Prevention Programme is mandatory for all females of childbearing potential.' },

    { cat:'sideeffects', q:'Trimethoprim causes a rise in serum creatinine without affecting GFR. Why?',
      opts:['Nephrotoxicity at standard doses','It blocks tubular secretion of creatinine (not true renal impairment)','It reduces muscle creatinine production','It stimulates creatinine reabsorption'], ans:1,
      exp:'Trimethoprim inhibits tubular secretion of creatinine (same transporter as creatinine). eGFR calculated from creatinine will appear to fall, but actual GFR is unchanged. Do not misinterpret as AKI — instead check urea, which should be normal.' },

    { cat:'sideeffects', q:'Prolonged bisphosphonate use (>5 years) is associated with which rare but serious complication?',
      opts:['Peptic ulceration','Atypical subtrochanteric femoral fracture','Liver failure','Agranulocytosis'], ans:1,
      exp:'Atypical femoral fractures are associated with bisphosphonate-induced over-suppression of bone remodelling. Patients should be counselled to report thigh/groin pain — prodromal symptom before complete fracture.' },

    { cat:'sideeffects', q:'Methotrexate: two main organ toxicities requiring baseline blood testing?',
      opts:['Renal and cardiac','Bone marrow (FBC) and liver (LFTs)','Thyroid and kidney','Cardiac and pulmonary'], ans:1,
      exp:'Methotrexate causes dose-dependent hepatotoxicity and bone marrow suppression. Baseline FBC, LFTs, U&E are required. Monitor 2-weekly until stable, then 3-monthly. Folic acid 5 mg once weekly helps reduce mucositis/side effects.' },

    { cat:'sideeffects', q:'Metformin: most common GI side effect when first starting?',
      opts:['Constipation','Nausea, diarrhoea, and abdominal cramps','Upper GI bleeding','Bloating only'], ans:1,
      exp:'GI side effects (nausea, diarrhoea, abdominal discomfort) affect ~30% of patients when starting metformin. Taking with food and slowly titrating the dose reduces tolerability issues. Modified-release formulation also helps.' },

    { cat:'sideeffects', q:'Amiodarone: which ocular finding is common (>90% of long-term users) but usually asymptomatic?',
      opts:['Posterior subcapsular cataracts','Corneal microdeposits (vortex keratopathy)','Optic neuritis only','Glaucoma'], ans:1,
      exp:'Corneal microdeposits occur in almost all long-term amiodarone users but rarely affect vision. Halos around lights are occasionally reported. Rarely, amiodarone causes optic neuropathy — causes significant vision loss; stop drug if this occurs.' },

    { cat:'sideeffects', q:'Fluoroquinolones (e.g. ciprofloxacin): serious musculoskeletal adverse effect?',
      opts:['Myositis','Tendon rupture — particularly Achilles tendon','Rhabdomyolysis','Osteonecrosis of jaw'], ans:1,
      exp:'Quinolones are associated with tendinopathy and tendon rupture, especially of the Achilles tendon. Risk is increased in older patients, those on corticosteroids, and athletes. Stop the drug immediately if tendinitis symptoms occur.' },

    /* ── MECHANISM (15 questions) ── */
    { cat:'mechanism', q:'Mechanism of action of warfarin?',
      opts:['Direct thrombin (Factor IIa) inhibitor','Factor Xa inhibitor directly','Inhibits vitamin K epoxide reductase → reduces synthesis of factors II, VII, IX, X','Activates antithrombin III'], ans:2,
      exp:'Warfarin inhibits VKOR (vitamin K epoxide reductase) → depletes reduced vitamin K → cannot carboxylate clotting factors II, VII, IX, X, and proteins C and S. Onset takes 48–72h as existing factors must be cleared.' },

    { cat:'mechanism', q:'How do ACE inhibitors lower blood pressure?',
      opts:['Block AT1 receptors directly','Inhibit ACE → reduce angiotensin I→II conversion → less vasoconstriction and aldosterone → lower BP','Directly vasodilate arteries','Block calcium channels'], ans:1,
      exp:'ACEi block conversion of Ang I → Ang II → reduced vasoconstriction + reduced aldosterone → lower BP and sodium retention. Also accumulate bradykinin → responsible for cough side effect.' },

    { cat:'mechanism', q:'Mechanism of furosemide?',
      opts:['Carbonic anhydrase inhibitor in proximal tubule','Blocks Na-Cl cotransporter in DCT','Blocks Na-K-2Cl cotransporter in ascending limb of loop of Henle','Aldosterone antagonist in collecting duct'], ans:2,
      exp:'Furosemide inhibits the Na-K-2Cl (NKCC2) cotransporter in the thick ascending limb → prevents Na, K, Cl reabsorption → large volume of isotonic urine. Most potent diuretic class.' },

    { cat:'mechanism', q:'How does adenosine terminate SVT?',
      opts:['Blocks beta-1 adrenoceptors','Activates A1 adenosine receptors on AV node → transient complete AV nodal block','Prolongs QT interval and breaks re-entry circuit','Blocks sodium channels (membrane-stabilising)'], ans:1,
      exp:'Adenosine agonises A1 receptors on the AV node → hyperpolarisation → transient AV block (3–15 seconds) → interrupts re-entry circuit. Half-life 10 seconds — effects are brief. Warn patient of chest tightness during administration.' },

    { cat:'mechanism', q:'Mechanism of action of PPIs (e.g. omeprazole)?',
      opts:['Blocks H2 receptors on parietal cells','Irreversibly inhibits H+/K+-ATPase (proton pump) → prevents acid secretion','Neutralises gastric acid chemically','Prostaglandin analogue stimulating mucus production'], ans:1,
      exp:'PPIs are prodrugs activated in the acidic canaliculi of parietal cells → covalently bind H+/K+-ATPase → irreversible inhibition. Maximum effect at 3–5 days of regular use (need active pumps). All PPIs are similar in efficacy.' },

    { cat:'mechanism', q:'Mechanism of heparin (unfractionated)?',
      opts:['Inhibits thrombin directly','Activates antithrombin III, which then inhibits thrombin (IIa) and Factor Xa','Inhibits vitamin K-dependent factors','Inhibits platelet GP IIb/IIIa receptors'], ans:1,
      exp:'Heparin binds antithrombin III (ATIII) → conformational change → ATIII inhibits thrombin and Factor Xa far more rapidly. UFH inhibits both thrombin and Xa equally; LMWH preferentially inhibits Xa (less thrombin inhibition).' },

    { cat:'mechanism', q:'How do bisphosphonates work in osteoporosis?',
      opts:['Stimulate osteoblast activity → new bone formation','Inhibit osteoclast function by disrupting farnesyl pyrophosphate synthase → reduced bone resorption','Act as calcium modulators in bone matrix','Stimulate calcitonin release'], ans:1,
      exp:'Bisphosphonates are pyrophosphate analogues that bind to bone mineral → taken up by osteoclasts → inhibit farnesyl pyrophosphate synthase (key enzyme in osteoclast function) → osteoclast apoptosis → reduced bone breakdown.' },

    { cat:'mechanism', q:'Mechanism of SGLT-2 inhibitors (e.g. dapagliflozin)?',
      opts:['Increase insulin secretion from beta cells','Reduce hepatic glucose output','Inhibit sodium-glucose cotransporter-2 in renal proximal tubule → glucose and sodium excreted in urine','Mimic GLP-1 → slow gastric emptying'], ans:2,
      exp:'SGLT-2 inhibitors block glucose reabsorption in the proximal tubule → glycosuria → lower blood glucose. Additional benefits: natriuresis → reduced preload and BP. Cardioprotective and renoprotective effects independent of glucose lowering.' },

    { cat:'mechanism', q:'Mechanism of spironolactone?',
      opts:['Loop diuretic via NKCC2 inhibition','Competitive aldosterone antagonist in the collecting duct → potassium-sparing diuresis','Thiazide diuretic','Carbonic anhydrase inhibitor'], ans:1,
      exp:'Spironolactone competitively blocks aldosterone receptors (mineralocorticoid receptors) in the collecting duct → less sodium reabsorption + potassium retention → weak diuresis. Used in HF, oedema, hyperaldosteronism, acne, hirsutism.' },

    { cat:'mechanism', q:'How do SSRIs reduce depression?',
      opts:['Block the serotonin reuptake transporter (SERT) → more serotonin in synaptic cleft','Inhibit monoamine oxidase → prevent serotonin breakdown','Act as post-synaptic 5-HT1A agonists','Block dopamine reuptake'], ans:0,
      exp:'SSRIs specifically inhibit SERT (serotonin transporter) on the presynaptic neuron → increased serotonin bioavailability in the synapse. They are serotonin-selective unlike TCAs which also block noradrenaline, histamine, and muscarinic receptors.' },

    { cat:'mechanism', q:'ACE inhibitor-related cough: underlying mechanism?',
      opts:['Direct tracheal irritation from drug excretion','Accumulation of bradykinin and substance P in the respiratory tract','ACEi activate mast cells in airway','Reduced prostaglandin I2 causing bronchoconstriction'], ans:1,
      exp:'ACEi also inhibit breakdown of bradykinin and substance P (ACE = kininase II). Accumulation in the bronchial mucosa stimulates cough receptors. This is not dose-dependent — even tiny doses cause cough in susceptible individuals. Switch to ARB.' },

    { cat:'mechanism', q:'Mechanism of allopurinol in gout prevention?',
      opts:['Uricosuric agent — increases renal urate excretion','Inhibits xanthine oxidase → reduced synthesis of uric acid from xanthine and hypoxanthine','COX inhibitor reducing inflammation','IL-1 receptor antagonist'], ans:1,
      exp:'Allopurinol and its active metabolite oxipurinol inhibit xanthine oxidase → xanthine cannot be converted to uric acid → reduced urate production. Plasma urate levels typically fall to target (<360 µmol/L) within weeks of starting.' },

    { cat:'mechanism', q:'Mechanism of ondansetron as an antiemetic?',
      opts:['Histamine H1 receptor antagonist','Dopamine D2 receptor antagonist','5-HT3 serotonin receptor antagonist (in gut and CTZ)','Muscarinic receptor antagonist'], ans:2,
      exp:'Ondansetron blocks 5-HT3 receptors in the gut (where serotonin is released post-chemotherapy) and in the chemoreceptor trigger zone (CTZ). Highly effective for chemotherapy- and radiotherapy-induced nausea. Also used post-operatively.' },

    { cat:'mechanism', q:'How does atropine increase heart rate in bradycardia?',
      opts:['Alpha-1 agonist → increases cardiac output','Antagonises muscarinic (M2) acetylcholine receptors → removes vagal inhibition → increases SA node firing rate','Beta-1 agonist — direct cardiac stimulant','Blocks adenosine receptors on AV node'], ans:1,
      exp:'Atropine is a competitive muscarinic antagonist. By blocking vagal M2 receptors at the SA node and AV node, it removes parasympathetic (vagal) brake on heart rate → chronotropic and dromotropic effect.' },

    { cat:'mechanism', q:'Mechanism of metformin in T2DM?',
      opts:['Stimulates insulin secretion from beta cells','Activates AMPK → reduces hepatic gluconeogenesis + improves peripheral insulin sensitivity','Inhibits SGLT-2 in the kidney','Mimics GLP-1 hormone effects'], ans:1,
      exp:'Metformin activates AMP-activated protein kinase (AMPK) → inhibits hepatic gluconeogenesis (main mechanism) + improves muscle glucose uptake. Does NOT cause hypoglycaemia alone. Weight-neutral. Safe with normal renal function.' },

    /* ── MONITORING (12 questions) ── */
    { cat:'monitoring', q:'Lithium monitoring: which two organ functions must be checked regularly?',
      opts:['Liver and bone marrow','Thyroid function and renal function (eGFR/creatinine)','Cardiac (ECG) and liver','Calcium and phosphate'], ans:1,
      exp:'Lithium is renally excreted — any change in renal function affects serum levels. It also causes both hypothyroidism and nephrogenic diabetes insipidus. Check TFTs and renal function every 6 months (more frequently if unstable).' },

    { cat:'monitoring', q:'Methotrexate monitoring: which three blood tests are required at minimum?',
      opts:['LFTs only','U&E only','FBC, LFTs, and U&E (renal function)','FBC and CRP'], ans:2,
      exp:'Methotrexate causes bone marrow suppression (FBC), hepatotoxicity (LFTs), and is renally excreted (U&E). All three must be monitored. Also check pulmonary function/CXR at baseline if respiratory concerns (can cause pneumonitis).' },

    { cat:'monitoring', q:'Amiodarone: which THREE organs/systems require ongoing monitoring?',
      opts:['Kidney, liver, bone marrow','Thyroid (TFTs), liver (LFTs), lungs (CXR + lung function) — and eyes','Cardiac, renal, GI','Bone, kidney, cardiac'], ans:1,
      exp:'Amiodarone monitoring: TFTs every 6 months (thyroid dysfunction), LFTs every 6 months (hepatotoxicity), CXR and lung function if respiratory symptoms (pulmonary fibrosis), annual slit-lamp exam (corneal microdeposits). Baseline ECG and ECHO before starting.' },

    { cat:'monitoring', q:'Clozapine mandatory FBC monitoring schedule (post-first year)?',
      opts:['Weekly throughout use','Weekly year 1, fortnightly year 2, monthly thereafter','Monthly from day one','Fortnightly throughout'], ans:1,
      exp:'Clozapine agranulocytosis risk requires: weekly FBC monitoring for 18 weeks (first 18 doses), fortnightly until 1 year, then monthly. Must be registered with a clozapine monitoring service. Dispensed only with compliant monitoring results.' },

    { cat:'monitoring', q:'Gentamicin (once-daily "Hartford" regimen): what must be measured before each dose?',
      opts:['Peak level 1h post-dose','Pre-dose (trough) level AND serum creatinine','Full blood count','Urine output only'], ans:1,
      exp:'Pre-dose (trough) gentamicin level and renal function must be checked before each dose to avoid accumulation-related nephrotoxicity and ototoxicity. Target pre-dose level: <1 mg/L. Also check a 6–14h post-dose level for dose nomogram.' },

    { cat:'monitoring', q:'Target INR for a patient with AF on warfarin (no prosthetic valve)?',
      opts:['1.5–2.0','2.0–3.0','2.5–3.5','3.0–4.5'], ans:1,
      exp:'AF anticoagulation target INR: 2.0–3.0. For mechanical prosthetic heart valves (mitral): 2.5–3.5. Recurrent VTE or antiphospholipid syndrome: may need 2.5–3.5. Check INR weekly when starting, extending intervals as stable.' },

    { cat:'monitoring', q:'After starting or increasing an ACE inhibitor dose, when should U&E be rechecked?',
      opts:['After 6 months','At the next annual review','Within 1–2 weeks of each dose change','Same day only'], ans:2,
      exp:'NICE advises checking U&E (eGFR and K⁺) within 1–2 weeks of starting or increasing ACEi/ARB. An eGFR fall of up to 25% and K⁺ rise of up to 5.5 are acceptable. Greater changes require dose reduction or specialist review.' },

    { cat:'monitoring', q:'Warfarin: which drug monitoring parameter is used to guide dosing?',
      opts:['APTT (activated partial thromboplastin time)','INR (international normalised ratio)','Anti-Xa level','PT (prothrombin time) ratio'], ans:1,
      exp:'INR is derived from the prothrombin time and is standardised across laboratories (unlike raw PT). It is the gold-standard measure for monitoring warfarin therapy. DOACs do NOT require routine monitoring via INR.' },

    { cat:'monitoring', q:'Valproate monitoring essential for females of childbearing potential includes:',
      opts:['INR monthly','Pregnancy test, effective contraception confirmation, annual review for ongoing need','LFTs and FBC only','Renal function every 6 months'], ans:1,
      exp:'Under the Pregnancy Prevention Programme (PPP): annual specialist review, documented risk acknowledgement, reliable contraception (2 methods or 1 highly reliable method recommended), pregnancy test if indicated. Valproate must not be used in women who could become pregnant without these safeguards.' },

    { cat:'monitoring', q:'Amiodarone: which ophthalmic review is required after long-term use?',
      opts:['Annual fundoscopy for retinopathy','Annual slit-lamp examination for corneal microdeposits and optic neuropathy','OCT imaging for macular degeneration','Visual field perimetry for glaucoma'], ans:1,
      exp:'Annual slit-lamp eye exam is recommended. Corneal microdeposits are near-universal and rarely clinically significant. Amiodarone optic neuropathy is rare but causes vision loss — stop drug if this is suspected.' },

    { cat:'monitoring', q:'Digoxin therapeutic serum level (measured ≥6h after dose)?',
      opts:['0.1–0.5 mcg/L','0.5–0.9 mcg/L (aim for lower end in elderly)','1.5–2.5 mcg/L','2.0–3.0 mcg/L'], ans:1,
      exp:'Digoxin therapeutic range: 0.5–2.0 ng/mL; aim for 0.5–0.9 ng/mL in heart failure (lower levels associated with same efficacy but less toxicity). Levels must be measured ≥6h after the dose (trough situation).' },

    { cat:'monitoring', q:'Methotrexate: how often should FBC, LFTs and U&E be checked once stable on maintenance therapy?',
      opts:['Weekly indefinitely','Every 2 weeks for 3 months, then every 3 months','Annually only','Every 6 months'], ans:1,
      exp:'Methotrexate monitoring frequency: every 2 weeks for first 3 months (highest risk period), then every 3 months when stable. More frequently if dose changed or if blood results abnormal. Prescriber must record monitoring before issuing prescription.' },
];

/* ── High-yield drug IDs loaded at quiz start ───────────────────── */
const HIGH_YIELD_DRUG_IDS = [
    /* Cardiovascular + rate control */
    'ramipril','lisinopril','enalapril','losartan','candesartan',
    'bisoprolol','atenolol','carvedilol',
    'amlodipine','diltiazem','verapamil',
    'furosemide','spironolactone','bendroflumethiazide',
    'digoxin','amiodarone',
    /* Anticoagulation + antiplatelet */
    'warfarin','apixaban','rivaroxaban','enoxaparin',
    'clopidogrel','ticagrelor','aspirin',
    /* Diabetes & metabolism */
    'metformin','gliclazide','sitagliptin','empagliflozin','dapagliflozin','semaglutide',
    /* Antibiotics */
    'amoxicillin','flucloxacillin','trimethoprim','nitrofurantoin',
    'co-amoxiclav','doxycycline','metronidazole','ciprofloxacin',
    /* Statins & GI */
    'atorvastatin','simvastatin','omeprazole','lansoprazole',
    /* Thyroid, steroids, bone */
    'levothyroxine','carbimazole','prednisolone','dexamethasone','hydrocortisone',
    /* Analgesia */
    'morphine','paracetamol','ibuprofen','naproxen',
    /* CNS & psychiatry */
    'lithium','clozapine',
    'sodium-valproate','carbamazepine','levetiracetam','lamotrigine','phenytoin',
    'lorazepam','naloxone',
    /* Respiratory */
    'salbutamol','theophylline',
    /* Specialist / monitoring-heavy */
    'methotrexate','azathioprine','gentamicin','vancomycin',
];

/* ── Singleton export ─────────────────────────────────────────────── */
const prescribingManager = new PrescribingManager();
export { PrescribingManager, prescribingManager };
