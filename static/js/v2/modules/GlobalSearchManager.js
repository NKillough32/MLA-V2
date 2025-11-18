import UIHelpers from './UIHelpers.js';

/**
 * GlobalSearchManager
 * Provides a single entry point to search across every major MLA tool.
 */
export class GlobalSearchManager {
    constructor() {
        this.app = null;
        this.managers = {};
        this.overlay = null;
        this.panel = null;
        this.input = null;
        this.resultsContainer = null;
        this.metaContainer = null;
        this.clearBtn = null;
        this.closeBtn = null;
        this.toggleBtn = null;
        this.active = false;
        this.resultActions = new Map();
        this.currentSearchToken = null;
        this.options = {
            defaultLimit: 5,
            limits: {
                drugs: 6,
                calculators: 6,
                labs: 6,
                guidelines: 4,
                mnemonics: 5,
                triads: 4,
                differentials: 6,
                examinations: 5,
                interpretations: 4,
                emergency: 4,
                pdf: 6
            }
        };
    }

    /**
     * Initialize DOM bindings and dependencies
     */
    async initialize(config = {}) {
        this.app = config.app;
        this.managers = config.managers || {};
        if (config.options) {
            this.options = {
                ...this.options,
                ...config.options,
                limits: {
                    ...this.options.limits,
                    ...(config.options.limits || {})
                }
            };
        }

        this.overlay = document.getElementById('global-search-overlay');
        this.panel = document.querySelector('#global-search-overlay .global-search-panel');
        this.input = document.getElementById('global-search-input');
        this.resultsContainer = document.getElementById('global-search-results');
        this.metaContainer = document.getElementById('global-search-meta');
        this.clearBtn = document.getElementById('global-search-clear');
        this.closeBtn = document.getElementById('global-search-close');
        this.toggleBtn = document.getElementById('global-search-toggle');

        if (!this.overlay || !this.input || !this.resultsContainer) {
            console.warn('GlobalSearchManager: Missing required DOM nodes');
            return;
        }

        this.overlay.setAttribute('aria-hidden', 'true');

        const debouncedSearch = UIHelpers.debounce(() => this.handleSearch(), 200);
        this.input.addEventListener('input', debouncedSearch);
        this.input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.handleSearch(true);
            } else if (event.key === 'Escape') {
                this.closePanel();
            }
        });

        this.resultsContainer.addEventListener('click', (event) => {
            // Some browsers can surface text nodes as event targets. Ensure we
            // always work with an Element before calling closest().
            const eventTarget = event.target instanceof Element
                ? event.target
                : event.target?.parentElement || null;
            const target = eventTarget?.closest('[data-action-id]');
            if (!target) return;
            const action = this.resultActions.get(target.dataset.actionId);
            if (action) {
                this.handleResultAction(action);
            }
        });

        this.overlay.addEventListener('click', (event) => {
            if (event.target === this.overlay) {
                this.closePanel();
            }
        });

        this.closeBtn?.addEventListener('click', () => this.closePanel());

        this.clearBtn?.addEventListener('click', () => {
            if (this.input) {
                this.input.value = '';
            }
            this.renderEmptyState();
            this.input?.focus();
        });

        this.toggleBtn?.addEventListener('click', (event) => {
            event.preventDefault();
            this.openPanel();
        });

        this.renderEmptyState();
        console.debug('✅ GlobalSearchManager ready');
    }

    /**
     * Open overlay and focus the search input
     */
    openPanel() {
        if (!this.overlay || !this.input) {
            return;
        }
        this.overlay.classList.add('active');
        this.overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('global-search-open');
        this.active = true;
        setTimeout(() => this.input?.focus(), 60);
        // Refresh results when reopened
        this.handleSearch();
    }

    /**
     * Close overlay
     */
    closePanel() {
        if (!this.overlay) {
            return;
        }
        // If focus is currently inside the overlay, move it to a safe place
        // before setting aria-hidden to avoid browsers blocking the change
        try {
            const activeEl = document.activeElement;
            if (activeEl && this.overlay.contains(activeEl)) {
                if (this.toggleBtn instanceof HTMLElement) {
                    this.toggleBtn.focus();
                } else if (this.closeBtn instanceof HTMLElement) {
                    this.closeBtn.focus();
                } else if (document.body instanceof HTMLElement) {
                    document.body.focus?.();
                } else {
                    try { activeEl.blur?.(); } catch (e) { /* ignore */ }
                }
            }
        } catch (e) {
            // Defensive: don't let focus handling break close behaviour
            console.warn('GlobalSearchManager: focus restore failed', e);
        }

        this.overlay.classList.remove('active');
        this.overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('global-search-open');
        this.active = false;
    }

    /**
     * Perform search when query changes
     */
    async handleSearch(force = false) {
        if (!this.input) return;
        const query = this.input.value.trim();

        if (!query || query.length < 2) {
            if (force) {
                this.showHint('Type at least 2 characters to search every module.');
            } else {
                this.renderEmptyState();
            }
            return;
        }

        const token = Symbol('search');
        this.currentSearchToken = token;
        this.showLoading(query);

        try {
            const groups = await this.performSearch(query);
            if (this.currentSearchToken !== token) {
                return;
            }

            if (!groups.length) {
                this.renderNoResults(query);
                return;
            }

            this.renderResults(groups, query);
        } catch (error) {
            console.error('GlobalSearchManager search failed', error);
            this.renderError(query);
        }
    }

    /**
     * Execute category searches in parallel
     */
    async performSearch(query) {
        const operations = [
            this.buildDrugResults(query),
            this.buildCalculatorResults(query),
            this.buildLabResults(query),
            this.buildGuidelineResults(query),
            this.buildDifferentialResults(query),
            this.buildTriadResults(query),
            this.buildMnemonicResults(query),
            this.buildExaminationResults(query),
            this.buildInterpretationResults(query),
            this.buildEmergencyResults(query),
            this.buildPdfResults(query)
        ];

        const results = await Promise.all(operations);
        return results.filter(Boolean);
    }

    async buildDrugResults(query) {
        const manager = this.managers.drugManager;
        if (!manager?.searchDrugs) return null;
        return this.buildGroup({
            id: 'drugs',
            label: 'Medications',
            icon: '💊',
            limit: this.options.limits.drugs,
            searchFn: () => manager.searchDrugs(query),
            mapFn: (drug) => ({
                title: drug.name,
                subtitle: drug.class,
                meta: drug.indication || drug.mechanism,
                action: { type: 'drug', key: drug.key }
            })
        });
    }

    async buildCalculatorResults(query) {
        const manager = this.managers.calculatorManager;
        if (!manager?.searchCalculators) return null;
        return this.buildGroup({
            id: 'calculators',
            label: 'Calculators & Scores',
            icon: '🧮',
            limit: this.options.limits.calculators,
            searchFn: () => manager.searchCalculators(query),
            mapFn: (calc) => ({
                title: calc.name,
                subtitle: calc.category,
                meta: calc.description,
                action: { type: 'calculator', id: calc.id }
            })
        });
    }

    async buildLabResults(query) {
        const manager = this.managers.labManager;
        if (!manager?.searchLabs) return null;
        return this.buildGroup({
            id: 'labs',
            label: 'Lab Panels & Tests',
            icon: '🧪',
            limit: this.options.limits.labs,
            searchFn: () => manager.searchLabs(query),
            mapFn: (result) => {
                if (result.type === 'panel') {
                    return {
                        title: result.name,
                        subtitle: `${result.testCount} tests`,
                        badge: 'Panel',
                        action: { type: 'lab-panel', key: result.key }
                    };
                }
                return {
                    title: result.testName || result.testKey,
                    subtitle: result.panelName,
                    meta: result.normal || result.range || '',
                    badge: 'Test',
                    action: { type: 'lab-test', panelKey: result.panelKey || result.panel, testKey: result.testKey || result.key }
                };
            }
        });
    }

    async buildGuidelineResults(query) {
        const manager = this.managers.guidelinesManager;
        if (!manager?.searchGuidelines) return null;
        return this.buildGroup({
            id: 'guidelines',
            label: 'Guidelines',
            icon: '📋',
            limit: this.options.limits.guidelines,
            searchFn: () => manager.searchGuidelines(query),
            mapFn: (guideline) => ({
                title: guideline.title,
                subtitle: guideline.organisation,
                badge: guideline.category,
                action: { type: 'guideline', key: guideline.key }
            })
        });
    }

    async buildMnemonicResults(query) {
        const database = this.managers.mnemonicsManager?.mnemonicsDatabase;
        if (!database) return null;
        return this.buildGroup({
            id: 'mnemonics',
            label: 'Mnemonics',
            icon: '🧠',
            limit: this.options.limits.mnemonics,
            searchFn: () => this.searchMnemonicsDatabase(database, query),
            mapFn: (item) => ({
                title: item.mnemonic,
                subtitle: item.title,
                meta: item.meaning,
                badge: item.category,
                action: { type: 'mnemonic', key: item.key }
            })
        });
    }

    async buildTriadResults(query) {
        const manager = this.managers.triadsManager;
        if (!manager?.searchTriads) return null;
        return this.buildGroup({
            id: 'triads',
            label: 'Clinical Triads',
            icon: '🔺',
            limit: this.options.limits.triads,
            searchFn: () => manager.searchTriads(query),
            mapFn: (triad) => ({
                title: triad.name,
                subtitle: triad.condition,
                meta: triad.mechanism,
                badge: (triad.urgency || 'standard').toUpperCase(),
                action: { type: 'triad', key: triad.key || triad.id }
            })
        });
    }

    async buildDifferentialResults(query) {
        const database = this.managers.differentialDxManager?.differentialDatabase;
        if (!database) return null;
        return this.buildGroup({
            id: 'differential',
            label: 'Differential Diagnosis',
            icon: '🩺',
            limit: this.options.limits.differentials,
            searchFn: () => this.searchDifferentials(database, query),
            mapFn: (item) => ({
                title: item.title,
                subtitle: item.subtitle,
                meta: item.meta,
                badge: item.badge,
                action: item.action
            })
        });
    }

    async buildExaminationResults(query) {
        const manager = this.managers.examinationManager;
        if (!manager?.searchExaminations) return null;
        return this.buildGroup({
            id: 'examinations',
            label: 'Examination Guides',
            icon: '🩻',
            limit: this.options.limits.examinations,
            searchFn: () => manager.searchExaminations(query),
            mapFn: (exam) => ({
                title: exam.title,
                subtitle: exam.category,
                meta: exam.approach,
                action: { type: 'examination', key: exam.key }
            })
        });
    }

    async buildInterpretationResults(query) {
        const manager = this.managers.interpretationToolsManager;
        const data = manager?.interpretationTools;
        if (!data) return null;
        return this.buildGroup({
            id: 'interpretation',
            label: 'Interpretation Tools',
            icon: '📊',
            limit: this.options.limits.interpretations,
            searchFn: () => this.searchInterpretationTools(data, query),
            mapFn: (tool) => ({
                title: tool.name,
                subtitle: tool.category,
                meta: tool.type,
                action: { type: 'interpretation', key: tool.key }
            })
        });
    }

    async buildEmergencyResults(query) {
        const manager = this.managers.emergencyProtocolsManager;
        if (!manager?.searchProtocols) return null;
        return this.buildGroup({
            id: 'emergency',
            label: 'Emergency Protocols',
            icon: '🚨',
            limit: this.options.limits.emergency,
            searchFn: () => manager.searchProtocols(query),
            mapFn: (protocol) => ({
                title: protocol.name,
                subtitle: protocol.category,
                badge: (protocol.urgency || 'standard').toUpperCase(),
                meta: `${protocol.steps?.length || 0} steps · ${protocol.drugs?.length || 0} meds`,
                action: { type: 'protocol', key: protocol.key }
            })
        });
    }

    async buildPdfResults(query) {
        const manager = this.managers.pdfLibraryManager;
        if (!manager?.searchPDFs || !manager.pdfIndex) return null;
        return this.buildGroup({
            id: 'pdfs',
            label: 'PDF Library',
            icon: '📚',
            limit: this.options.limits.pdf,
            searchFn: () => manager.searchPDFs(query),
            mapFn: (pdf) => ({
                title: pdf.title,
                subtitle: pdf.category,
                meta: pdf.filename,
                action: { type: 'pdf', filename: pdf.filename }
            })
        });
    }

    async buildGroup({ id, label, icon, searchFn, mapFn, limit }) {
        if (typeof searchFn !== 'function' || typeof mapFn !== 'function') {
            return null;
        }
        try {
            const rawResults = await Promise.resolve(searchFn());
            if (!Array.isArray(rawResults) || rawResults.length === 0) {
                return null;
            }
            const maxItems = limit || this.options.defaultLimit;
            const matches = rawResults.slice(0, maxItems).map(item => {
                const mapped = mapFn(item);
                if (!mapped) return null;
                // Preserve key for follow-up actions
                return {
                    ...mapped,
                    icon: mapped.icon || icon
                };
            }).filter(Boolean);

            if (!matches.length) {
                return null;
            }

            return {
                id,
                label,
                icon,
                total: rawResults.length,
                matches
            };
        } catch (error) {
            console.warn(`GlobalSearchManager: Failed to build group ${id}`, error);
            return null;
        }
    }

    searchMnemonicsDatabase(database, query) {
        const term = query.toLowerCase();
        const results = [];
        Object.entries(database).forEach(([key, mnemonic]) => {
            const haystack = [
                mnemonic.title,
                mnemonic.mnemonic,
                mnemonic.meaning,
                mnemonic.usage,
                mnemonic.category
            ].join(' ').toLowerCase();
            if (haystack.includes(term)) {
                results.push({ key, ...mnemonic });
            }
        });
        return results;
    }

    searchInterpretationTools(database, query) {
        const term = query.toLowerCase();
        const results = [];
        Object.entries(database).forEach(([key, tool]) => {
            const haystack = [
                tool.name,
                tool.category,
                tool.type,
                ...(tool.steps || []),
                ...(tool.commonAbnormalities || []),
                ...(tool.commonPathologicalFindings || [])
            ].join(' ').toLowerCase();
            if (haystack.includes(term)) {
                results.push({ key, ...tool });
            }
        });
        return results;
    }

    searchDifferentials(database, query) {
        const term = query.toLowerCase();
        const results = [];

        Object.entries(database).forEach(([symptomKey, symptom]) => {
            const symptomMatches = symptom.title?.toLowerCase().includes(term) ||
                symptom.category?.toLowerCase().includes(term) ||
                symptom.redFlags?.toLowerCase().includes(term);

            if (symptomMatches) {
                results.push({
                    title: symptom.title,
                    subtitle: `${symptom.category} • ${Object.keys(symptom.presentations || {}).length} diagnoses`,
                    meta: symptom.redFlags || '',
                    badge: 'Symptom',
                    action: { type: 'ddx-symptom', key: symptomKey }
                });
            }

            Object.entries(symptom.presentations || {}).forEach(([dxKey, dx]) => {
                const dxHaystack = [dxKey, dx.features, dx.differentiatingFeatures].join(' ').toLowerCase();
                if (dxHaystack.includes(term)) {
                    results.push({
                        title: dxKey,
                        subtitle: symptom.title,
                        meta: dx.features || dx.differentiatingFeatures,
                        badge: 'Diagnosis',
                        action: { type: 'ddx-diagnosis', symptomKey, diagnosisKey: dxKey }
                    });
                }
            });
        });

        return results;
    }

    /**
     * Render placeholder state
     */
    renderEmptyState() {
        if (!this.resultsContainer) return;
        this.resultActions.clear();
        if (this.metaContainer) {
            this.metaContainer.textContent = 'Search across quizzes, calculators, drugs, labs, triads, protocols and PDFs.';
        }
        this.resultsContainer.innerHTML = `
            <div class="global-search-empty">
                <p>Start typing to search the entire MLA experience.</p>
                <p class="hint">Tip: Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> to open search from anywhere.</p>
            </div>
        `;
    }

    showLoading(query) {
        if (!this.resultsContainer) return;
        this.resultActions.clear();
        if (this.metaContainer) {
            this.metaContainer.textContent = `Searching for "${query}"...`;
        }
        this.resultsContainer.innerHTML = `
            <div class="global-search-loading">
                <div class="spinner"></div>
                <p>Scanning calculators, references and tools...</p>
            </div>
        `;
    }

    showHint(text) {
        if (!this.resultsContainer) return;
        this.resultActions.clear();
        this.resultsContainer.innerHTML = `<div class="global-search-empty"><p>${this.escapeHtml(text)}</p></div>`;
    }

    renderNoResults(query) {
        if (!this.resultsContainer) return;
        this.resultActions.clear();
        if (this.metaContainer) {
            this.metaContainer.textContent = `No matches for "${query}"`;
        }
        this.resultsContainer.innerHTML = `
            <div class="global-search-empty">
                <p>No tools or references matched <strong>${this.escapeHtml(query)}</strong>.</p>
                <p class="hint">Try alternate spellings or a broader phrase.</p>
            </div>
        `;
    }

    renderError(query) {
        if (!this.resultsContainer) return;
        this.resultActions.clear();
        this.resultsContainer.innerHTML = `
            <div class="global-search-empty">
                <p>Unable to search for <strong>${this.escapeHtml(query)}</strong> right now.</p>
                <p class="hint">Please check your connection or try again.</p>
            </div>
        `;
    }

    renderResults(groups, query) {
        if (!this.resultsContainer) return;
        this.resultActions.clear();
        const totalMatches = groups.reduce((sum, group) => sum + group.matches.length, 0);
        if (this.metaContainer) {
            this.metaContainer.textContent = `Showing ${totalMatches} matches across ${groups.length} areas for "${query}".`;
        }

        const html = groups.map(group => {
            const cards = group.matches.map(match => {
                const actionId = this.registerAction(match.action);
                const badge = match.badge ? `<span class="result-badge">${this.escapeHtml(match.badge)}</span>` : '';
                const meta = match.meta ? `<div class="result-meta">${this.escapeHtml(match.meta)}</div>` : '';
                const subtitle = match.subtitle ? `<div class="result-subtitle">${this.escapeHtml(match.subtitle)}</div>` : '';
                return `
                    <button class="global-search-result" type="button" data-action-id="${actionId}">
                        <div class="result-icon">${this.escapeHtml(match.icon || group.icon || '')}</div>
                        <div class="result-body">
                            <div class="result-title-row">
                                <span class="result-title">${this.escapeHtml(match.title)}</span>
                                ${badge}
                            </div>
                            ${subtitle}
                            ${meta}
                        </div>
                    </button>
                `;
            }).join('');

            return `
                <section class="global-search-group">
                    <header class="global-search-group-header">
                        <div class="group-title">
                            <span class="group-icon">${this.escapeHtml(group.icon || '')}</span>
                            <span>${this.escapeHtml(group.label)}</span>
                        </div>
                        <span class="group-count">${group.total} total</span>
                    </header>
                    <div class="global-search-group-body">
                        ${cards}
                    </div>
                </section>
            `;
        }).join('');

        this.resultsContainer.innerHTML = html;
    }

    registerAction(action) {
        const actionId = `action-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36)}`;
        if (action) {
            this.resultActions.set(actionId, action);
        }
        return actionId;
    }

    handleResultAction(action) {
        if (!action) return;
        const frameScheduler = (typeof window !== 'undefined' &&
            (window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             window.msRequestAnimationFrame)) || null;

        const defer = (callback) => {
            if (typeof callback !== 'function') {
                return;
            }

            const runner = frameScheduler
                ? (cb) => frameScheduler.call(window, cb)
                : (cb) => setTimeout(cb, 16);

            runner(() => {
                try {
                    callback();
                } catch (error) {
                    console.warn('GlobalSearchManager action failed', error);
                }
            });
        };

        const navigate = (tool, callback) => {
            if (this.app?.switchTool && tool) {
                this.app.switchTool(tool);
            }
            defer(() => callback?.());
        };

        switch (action.type) {
            case 'drug':
                navigate('drug-reference', () => this.app?.showDrugDetail?.(action.key));
                break;
            case 'lab-panel':
                navigate('lab-values', () => this.app?.showLabPanel?.(action.key));
                break;
            case 'lab-test':
                navigate('lab-values', () => this.app?.showLabTest?.(action.panelKey, action.testKey));
                break;
            case 'guideline':
                navigate('guidelines', () => this.app?.showGuidelineDetail?.(action.key));
                break;
            case 'calculator':
                navigate('calculators', () => this.managers.calculatorManager?.loadCalculator?.(action.id));
                break;
            case 'mnemonic':
                navigate('mnemonics', () => this.app?.showMnemonicDetail?.(action.key));
                break;
            case 'triad':
                navigate('triads', () => this.managers.triadsManager?.showTriadDetails?.(action.key));
                break;
            case 'ddx-symptom':
                navigate('differential-dx', () => this.app?.showDdxDetail?.(action.key));
                break;
            case 'ddx-diagnosis':
                navigate('differential-dx', () => {
                    this.app?.showDdxDetail?.(action.symptomKey);
                    defer(() => this.app?.showDiagnosisDetail?.(action.symptomKey, action.diagnosisKey));
                });
                break;
            case 'examination':
                navigate('examination', () => this.app?.showExaminationDetail?.(action.key));
                break;
            case 'interpretation':
                navigate('interpretation', () => this.app?.showInterpretationDetail?.(action.key));
                break;
            case 'protocol':
                navigate('emergency-protocols', () => this.app?.showProtocolDetail?.(action.key));
                break;
            case 'pdf':
                navigate('pdf-library', () => this.managers.pdfLibraryManager?.showPDF?.(action.filename));
                break;
            default:
                console.warn('GlobalSearchManager: Unknown action type', action);
        }

        this.closePanel();
    }

    escapeHtml(value) {
        if (value === null || value === undefined) {
            return '';
        }
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}

export default GlobalSearchManager;
