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
            // Global default for groups that don't specify an explicit limit
            defaultLimit: 4,
            // Per-group limits (all set to 4 as requested)
            limits: {
                drugs: 4,
                calculators: 4,
                labs: 4,
                guidelines: 4,
                mnemonics: 4,
                triads: 4,
                differentials: 4,
                examinations: 4,
                interpretations: 4,
                emergency: 4,
                pdf: 4,
                quizQuestions: 4,
                ladders: 4,
                vaccinations: 4,
                contraception: 4,
                genetics: 4,
                developmental: 4,
                coreConditions: 6,
                psychiatry: 6,
                medStatsEthics: 6,
                clinicalPearls: 6,
                anatomy: 6,
                ophthalmology: 6,
                dermatology: 6
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
        // Order determines group rendering order in the UI.
        // Core Conditions -> Drugs -> PDFs -> remaining sections.
        const operations = [
            this.buildCoreConditionResults(query),
            this.buildDrugResults(query),
            this.buildPregnancyDrugResults(query),
            this.buildPdfResults(query),
            this.buildGuidelineResults(query),
            this.buildDifferentialResults(query),
            this.buildCalculatorResults(query),
            this.buildLabResults(query),
            this.buildProcedureResults(query),
            this.buildQuizQuestionResults(query),
            this.buildPsychiatryResults(query),
            this.buildVaccinationResults(query),
            this.buildContraceptionResults(query),
            this.buildGeneticsResults(query),
            this.buildDevelopmentalResults(query),
            this.buildMedStatsEthicsResults(query),
            this.buildClinicalPearlsResults(query),
            this.buildTriadResults(query),
            this.buildMnemonicResults(query),
            this.buildOphthalmologyResults(query),
            this.buildDermatologyResults(query),
            this.buildAnatomyResults(query),
            this.buildExaminationResults(query),
            this.buildInterpretationResults(query),
            this.buildEmergencyResults(query),
            this.buildLaddersResults(query)
        ];

        const results = await Promise.all(operations);
        return results.filter(Boolean);
    }

    async buildVaccinationResults(query) {
        const data = window.ukVaccinationProgramme;
        if (!data) return null;

        const term = query.toLowerCase();
        const matches = [];

        // Search routine childhood schedule
        (data.routineChildhood || []).forEach(entry => {
            const age = entry.age || '';
            (entry.vaccines || []).forEach(v => {
                const hay = `${v.name} ${v.summary || ''} ${v.notes || ''} ${age}`.toLowerCase();
                if (hay.includes(term)) {
                    matches.push({
                        title: v.name,
                        subtitle: age,
                        meta: v.summary || v.notes || '',
                        source: 'childhood',
                        action: { type: 'vaccination', tab: 'childhood', key: `${age}::${v.name}` }
                    });
                }
            });
        });

        // Search adolescent/adult groups
        (data.adolescentAdult || []).forEach(entry => {
            const group = entry.group || '';
            (entry.details || []).forEach(detail => {
                if ((detail || '').toLowerCase().includes(term) || group.toLowerCase().includes(term)) {
                    matches.push({
                        title: group,
                        subtitle: detail.slice(0, 80),
                        meta: 'Adolescent / Adult guidance',
                        source: 'adolescent',
                        action: { type: 'vaccination', tab: 'adolescent', key: `${group}::${detail.slice(0,40)}` }
                    });
                }
            });
        });

        // Risk groups
        (data.riskGroups || []).forEach(entry => {
            const group = entry.group || '';
            const hay = `${group} ${(entry.recommendations || []).join(' ')}`.toLowerCase();
            if (hay.includes(term)) {
                matches.push({
                    title: group,
                    subtitle: (entry.recommendations || []).slice(0,2).join(' · '),
                    meta: 'Risk group recommendations',
                    source: 'risk',
                    action: { type: 'vaccination', tab: 'risk', key: group }
                });
            }
        });

        // Seasonal campaigns
        (data.seasonalCampaigns || []).forEach(entry => {
            const hay = `${entry.season} ${entry.detail || ''}`.toLowerCase();
            if (hay.includes(term)) {
                matches.push({
                    title: entry.season,
                    subtitle: entry.detail?.slice(0, 80) || '',
                    meta: 'Seasonal campaign',
                    source: 'seasonal',
                    action: { type: 'vaccination', tab: 'seasonal', key: entry.season }
                });
            }
        });

        if (!matches.length) return null;

        return {
            id: 'vaccinations',
            label: 'Vaccinations',
            icon: '💉',
            total: matches.length,
            matches: matches.slice(0, this.options.defaultLimit)
        };
    }

    async buildContraceptionResults(query) {
        const container = document.getElementById('contraception-hrt-panel');
        if (!container) return null;

        const cards = Array.from(container.querySelectorAll('.contraception-hrt-card'));
        if (!cards.length) return null;

        const term = query.toLowerCase();
        const results = [];

        cards.forEach((card, idx) => {
            const titleEl = card.querySelector('h5');
            const title = titleEl ? titleEl.textContent.trim() : `Contraception ${idx + 1}`;
            const text = (card.textContent || '').toLowerCase();
            if (title.toLowerCase().includes(term) || text.includes(term)) {
                results.push({
                    title,
                    subtitle: text.split('\n').find(s => s.trim())?.slice(0, 80) || '',
                    meta: 'Hormone & contraception',
                    action: { type: 'contraception', index: idx, key: title }
                });
            }
        });

        if (!results.length) return null;

        return {
            id: 'contraception',
            label: 'Contraception & HRT',
            icon: '🩺',
            total: results.length,
            matches: results.slice(0, this.options.defaultLimit)
        };
    }

    async buildGeneticsResults(query) {
        const grid = document.getElementById('genetics-grid');
        if (!grid) return null;

        const cards = Array.from(grid.querySelectorAll('.genetics-card'));
        if (!cards.length) return null;

        const term = query.toLowerCase();
        const results = [];

        cards.forEach((card) => {
            const key = card.dataset.key || '';
            const titleEl = card.querySelector('h4');
            const title = titleEl ? titleEl.textContent.trim() : key;
            const text = (card.textContent || '').toLowerCase();
            if (title.toLowerCase().includes(term) || text.includes(term)) {
                results.push({
                    title,
                    subtitle: card.querySelector('.genetics-tags')?.textContent?.trim() || '',
                    meta: 'Genetics reference',
                    action: { type: 'genetics', key }
                });
            }
        });

        if (!results.length) return null;

        return {
            id: 'genetics',
            label: 'Genetics',
            icon: '🧬',
            total: results.length,
            matches: results.slice(0, this.options.defaultLimit)
        };
    }

    async buildDevelopmentalResults(query) {
        const table = document.querySelector('#developmental-panel .milestone-table');
        if (!table) return null;

        const rows = Array.from(table.querySelectorAll('.milestone-row'));
        if (!rows.length) return null;

        const term = query.toLowerCase();
        const results = [];

        rows.forEach((row, idx) => {
            const cellsText = row.textContent.trim().toLowerCase();
            if (cellsText.includes(term)) {
                const age = row.querySelector('td') ? row.querySelector('td').textContent.trim() : '';
                const domain = row.dataset.domain || '';
                const expected = row.cells && row.cells[2] ? row.cells[2].textContent.trim() : '';
                results.push({
                    title: expected || `${domain} milestone`,
                    subtitle: `${age} • ${domain}`,
                    meta: row.cells && row.cells[3] ? row.cells[3].textContent.trim() : '',
                    action: { type: 'developmental', index: idx }
                });
            }
        });

        if (!results.length) return null;

        return {
            id: 'developmental',
            label: 'Developmental Milestones',
            icon: '🧒',
            total: results.length,
            matches: results.slice(0, this.options.defaultLimit)
        };
    }

    async buildCoreConditionResults(query) {
        const manager = this.managers.coreConditionsManager;
        if (!manager?.searchEnhancedConditions) return null;
        const matches = manager.searchEnhancedConditions(query) || [];
        if (!matches.length) return null;

        const limit = this.options.limits.coreConditions || this.options.defaultLimit;
        const ranked = this.rankMatches(matches, query, condition => condition.name || '');
        const mapped = ranked.slice(0, limit).map(condition => ({
            title: condition.name,
            subtitle: (condition.domains || []).join(' • ') || 'Core condition',
            badge: 'Condition',
            action: { type: 'core-condition', id: condition.id, name: condition.name }
        }));

        return {
            id: 'core-conditions',
            label: 'Core Conditions',
            icon: '📖',
            total: matches.length,
            matches: mapped
        };
    }

    async buildLaddersResults(query) {
        const manager = this.managers.laddersManager;
        if (!manager) return null;

        // Prefer a manager-provided search method if available
        const searchFn = typeof manager.searchLadders === 'function'
            ? () => manager.searchLadders(query)
            : () => {
                const term = query.toLowerCase();
                const results = [];
                try {
                    const data = manager.laddersData || {};
                    Object.entries(data).forEach(([key, ladder]) => {
                        const hay = [ladder.name, ladder.description, (ladder.icon || '')].join(' ').toLowerCase();
                        if (hay.includes(term)) {
                            results.push({ key, ...ladder });
                        } else {
                            // Check nested arrays (medications, steps)
                            const nested = JSON.stringify(ladder).toLowerCase();
                            if (nested.includes(term)) {
                                results.push({ key, ...ladder });
                            }
                        }
                    });
                } catch (e) {
                    console.warn('GlobalSearchManager: ladders search failed', e);
                }
                return results;
            };

        return this.buildGroup({
            id: 'ladders',
            label: 'Treatment Ladders',
            icon: '🪜',
            limit: this.options.limits.ladders || this.options.defaultLimit,
            searchFn,
            query,
            mapFn: (ladder) => ({
                title: ladder.title || ladder.name || ladder.key,
                subtitle: ladder.description || ladder.summary || '',
                meta: ladder.meta || ((ladder.steps && ladder.steps.length) ? `${ladder.steps.length} steps` : (ladder.medications ? `${(ladder.medications||[]).length} meds` : '')),
                action: { type: 'ladder', key: ladder.key || ladder.id || ladder.name }
            })
        });
    }

    async buildPsychiatryResults(query) {
        const library = this.managers.psychiatryLibrary || [];
        if (!Array.isArray(library) || !library.length) return null;

        const term = query.toLowerCase();
        const results = library.filter(condition => {
            const haystack = [
                condition.title,
                condition.summary,
                ...(condition.tags || []),
                ...(condition.distinguishing || []),
                ...(condition.firstLine || []),
                ...(condition.secondLine || []),
                ...(condition.investigations || []),
                ...(condition.crisis || []),
                ...(condition.monitoring || [])
            ].join(' ').toLowerCase();
            return haystack.includes(term);
        });

        if (!results.length) return null;

        const limit = this.options.limits.psychiatry || this.options.defaultLimit;
        return {
            id: 'psychiatry',
            label: 'Psychiatry',
            icon: '🧠',
            total: results.length,
            matches: this.rankMatches(results, query, condition => condition.title || '')
                .slice(0, limit)
                .map(condition => ({
                title: condition.title,
                subtitle: condition.summary || '',
                badge: (condition.tags || [])[0] || 'Topic',
                meta: (condition.tags || []).slice(1).join(' • '),
                action: { type: 'psychiatry', id: condition.id, title: condition.title }
            }))
        };
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
            query,
            mapFn: (drug) => ({
                title: drug.name,
                subtitle: drug.class,
                meta: drug.indication || drug.mechanism,
                action: { type: 'drug', key: drug.key }
            })
        });
    }

    async buildPregnancyDrugResults(query) {
        const manager = this.managers.pregnancyDrugsManager;
        if (!manager?.search) return null;
        const results = manager.search(query);
        if (!results || !results.length) return null;
        
        return {
            id: 'pregnancy-drugs',
            label: 'Pregnancy & Breastfeeding Safety',
            icon: '🤰',
            total: results.length,
            matches: results.slice(0, this.options.limits.drugs || 4).map(result => ({
                title: result.title,
                subtitle: result.subtitle,
                meta: result.content.substring(0, 100),
                action: { type: 'pregnancy-drug', data: result.data }
            }))
        };
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
            query,
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
            query,
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
            query,
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
            query,
            mapFn: (item) => ({
                title: item.mnemonic,
                subtitle: item.title,
                meta: item.meaning,
                badge: item.category,
                action: { type: 'mnemonic', key: item.key }
            })
        });
    }

    async buildOphthalmologyResults(query) {
        const manager = this.managers.ophthalmologyManager;
        const sections = manager?.sections;
        if (!Array.isArray(sections) || !sections.length) return null;

        const term = query.toLowerCase();
        const matches = [];

        sections.forEach(section => {
            // Search in conditions (Condition Spotlights section)
            (section.conditions || []).forEach(condition => {
                const haystack = [
                    condition.name,
                    ...(condition.presentation || []),
                    ...(condition.diagnosis || []),
                    ...(condition.management || [])
                ].join(' ').toLowerCase();
                if (haystack.includes(term)) {
                    matches.push({
                        title: condition.name,
                        subtitle: section.title,
                        meta: (condition.presentation || [])[0] || '',
                        action: { type: 'ophthalmology', name: condition.name, section: section.title }
                    });
                }
            });

            // Search in columns/items (other sections)
            (section.columns || []).forEach(column => {
                (column.items || []).forEach(item => {
                    if (item.toLowerCase().includes(term)) {
                        // Extract the first part before any parenthetical or dash as the title
                        const titleMatch = item.match(/^([^(:—-]+)/);
                        const title = titleMatch ? titleMatch[1].trim() : item;
                        matches.push({
                            title: title,
                            subtitle: `${section.title} · ${column.heading}`,
                            meta: item.length > title.length ? item.substring(title.length).trim() : '',
                            action: { type: 'ophthalmology', name: title, section: section.title }
                        });
                    }
                });
            });
        });

        if (!matches.length) return null;

        const limit = this.options.limits.ophthalmology || this.options.defaultLimit;
        return {
            id: 'ophthalmology',
            label: 'Ophthalmology',
            icon: '👁️',
            total: matches.length,
            matches: this.rankMatches(matches, query, match => match.title || '')
                .slice(0, limit)
        };
    }

    async buildDermatologyResults(query) {
        const manager = this.managers.dermatologyManager;
        if (!manager || !manager.initialized) return null;

        const term = query.toLowerCase();
        const conditions = manager.search(term);
        
        if (!conditions || conditions.length === 0) return null;

        const categoryMap = {
            'inflammatory-eczema': 'Eczema & Dermatitis',
            'inflammatory-psoriasis': 'Psoriasis',
            'acne-rosacea': 'Acne & Rosacea',
            'infection-bacterial': 'Bacterial Infections',
            'infection-viral': 'Viral Infections',
            'infection-fungal': 'Fungal Infections',
            'skin-cancer': 'Skin Cancers',
            'hair-disorders': 'Hair Disorders',
            'nail-disorders': 'Nail Disorders',
            'pigmentation': 'Pigmentation Disorders'
        };

        const matches = conditions.map(condition => ({
            title: condition.title,
            subtitle: categoryMap[condition.category] || condition.category || 'Dermatology',
            meta: condition.clinicalPresentation?.description || '',
            action: { type: 'dermatology', conditionId: condition.id }
        }));

        const limit = this.options.limits.dermatology || this.options.defaultLimit;
        return {
            id: 'dermatology',
            label: 'Dermatology',
            icon: '🩺',
            total: matches.length,
            matches: this.rankMatches(matches, query, match => match.title || '')
                .slice(0, limit)
        };
    }

    async buildAnatomyResults(query) {
        const manager = this.managers.anatomyManager;
        const bodyMap = document.getElementById('bodyMap');
        if (!manager || !bodyMap) return null;

        const term = query.toLowerCase();
        if (!term) return null;

        const matches = [];
        bodyMap.querySelectorAll('[data-structure], text').forEach(el => {
            const ds = (el.getAttribute('data-structure') || '').toLowerCase();
            const txt = (el.textContent || '').toLowerCase();
            if (ds.includes(term) || txt.includes(term)) {
                const name = el.getAttribute('data-structure') || el.textContent || query;
                matches.push({
                    title: name,
                    subtitle: 'Anatomy map',
                    meta: 'Highlight structure',
                    action: { type: 'anatomy', name }
                });
            }
        });

        if (!matches.length) return null;

        const limit = this.options.limits.anatomy || this.options.defaultLimit;
        return {
            id: 'anatomy',
            label: 'Anatomy',
            icon: '🩻',
            total: matches.length,
            matches: this.rankMatches(matches, query, match => match.title || '')
                .slice(0, limit)
        };
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
            query,
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
            query,
            mapFn: (item) => ({
                title: item.title,
                subtitle: item.subtitle,
                meta: item.meta,
                badge: item.badge,
                action: item.action
            })
        });
    }

    async buildProcedureResults(query) {
        const manager = this.managers.proceduresManager;
        if (!manager?.searchProcedures) return null;
        return this.buildGroup({
            id: 'procedures',
            label: 'Procedures',
            icon: '🏥',
            limit: this.options.limits.procedures || this.options.defaultLimit,
            searchFn: () => manager.searchProcedures(query),
            query,
            mapFn: (result) => ({
                title: result.procedure?.name || result.name || 'Unnamed Procedure',
                subtitle: result.procedure?.indication || result.indication || '',
                badge: result.procedure?.category || result.category || '',
                action: { type: 'procedure', id: result.id }
            })
        });
    }

    async buildMedStatsEthicsResults(query) {
        const manager = this.managers.medStatsEthicsManager;
        const sections = manager?.sections;
        if (!Array.isArray(sections) || !sections.length) return null;

        const term = query.toLowerCase();
        const matches = [];

        sections.forEach((section) => {
            const haystack = [
                section.title,
                section.summary,
                section.badge,
                section.note,
                ...(section.subsections || []).flatMap(ss => [ss.heading, ss.note, ...(ss.items || [])]),
                ...(section.items || [])
            ].join(' ').toLowerCase();
            if (haystack.includes(term)) {
                matches.push(section);
            }
        });

        if (!matches.length) return null;

        const limit = this.options.limits.medStatsEthics || this.options.defaultLimit;
        return {
            id: 'med-stats-ethics',
            label: 'Medical Stats & Ethics',
            icon: '📈',
            total: matches.length,
            matches: this.rankMatches(matches, query, section => section.title || '')
                .slice(0, limit)
                .map(section => ({
                title: section.title,
                subtitle: section.summary || section.badge || '',
                badge: section.badge || 'Reference',
                meta: section.note || '',
                action: { type: 'med-stats', title: section.title }
            }))
        };
    }

    async buildClinicalPearlsResults(query) {
        const manager = this.managers.clinicalPearlsManager;
        const sections = manager?.sections;
        if (!Array.isArray(sections) || !sections.length) return null;

        const term = query.toLowerCase();
        const matches = [];

        sections.forEach((section) => {
            const haystack = [
                section.title,
                section.summary,
                section.badge,
                section.note,
                ...(section.tags || []),
                ...(section.subsections || []).flatMap(ss => [ss.heading, ss.note, ...(ss.items || [])])
            ].join(' ').toLowerCase();
            if (haystack.includes(term)) {
                matches.push(section);
            }
        });

        if (!matches.length) return null;

        const limit = this.options.limits.clinicalPearls || this.options.defaultLimit;
        return {
            id: 'clinical-pearls',
            label: 'Clinical Pearls',
            icon: '💡',
            total: matches.length,
            matches: this.rankMatches(matches, query, section => section.title || '')
                .slice(0, limit)
                .map(section => ({
                title: section.title,
                subtitle: section.summary || '',
                badge: section.badge || 'Pearls',
                meta: (section.tags || []).join(' • '),
                action: { type: 'clinical-pearls', title: section.title }
            }))
        };
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
            query,
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
            query,
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
            query,
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
            query,
            mapFn: (pdf) => ({
                title: pdf.title,
                subtitle: pdf.category,
                meta: pdf.filename,
                action: { type: 'pdf', filename: pdf.filename }
            })
        });
    }

    async buildQuizQuestionResults(query) {
        const manager = this.managers.quizManager;
        if (!manager?.searchQuestions) return null;

        const matches = await manager.searchQuestions(query, { includeUploaded: true });
        if (!matches.length) return null;

        const limit = this.options.limits.quizQuestions || this.options.defaultLimit;
        const mappedMatches = matches.slice(0, limit).map((match) => ({
            title: match.question?.prompt || match.question?.text || match.question?.scenario || `Question ${match.index + 1}`,
            subtitle: `${match.quizName || manager.quizName || 'Current quiz'} • Question ${match.index + 1}`,
            meta: match.snippet,
            action: { type: 'quiz-question', index: match.index, quizName: match.quizName, isUploaded: match.isUploaded }
        }));

        const uniqueQuizNames = new Set(matches.map((m) => m.quizName || manager.quizName));
        const matchesList = [...mappedMatches];

        // Add a bulk selection helper when all matches come from the same quiz
        if (uniqueQuizNames.size === 1) {
            const singleQuizName = matches[0]?.quizName || manager.quizName;
            const bulkAction = {
                title: `Select all ${matches.length} matching question${matches.length === 1 ? '' : 's'}`,
                subtitle: singleQuizName,
                meta: 'Flag all matches for quick review in the quiz navigator.',
                badge: 'Bulk',
                action: {
                    type: 'quiz-question-select',
                    indices: matches.map((m) => m.index),
                    quizName: singleQuizName,
                    isUploaded: matches[0]?.isUploaded
                }
            };
            matchesList.unshift(bulkAction);
        }

        return {
            id: 'quiz-questions',
            label: 'Quiz Questions',
            icon: '❓',
            total: matches.length,
            matches: matchesList
        };
    }

    async buildGroup({ id, label, icon, searchFn, mapFn, limit, query }) {
        if (typeof searchFn !== 'function' || typeof mapFn !== 'function') {
            return null;
        }
        try {
            const rawResults = await Promise.resolve(searchFn());
            if (!Array.isArray(rawResults) || rawResults.length === 0) {
                return null;
            }
            const mappedResults = rawResults.map((item, index) => {
                const mapped = mapFn(item);
                if (!mapped) return null;
                const score = this.getBestMatchScore(query, mapped.title, mapped.subtitle, mapped.meta);
                return {
                    mapped,
                    score,
                    index
                };
            }).filter(Boolean);

            if (!mappedResults.length) {
                return null;
            }

            mappedResults.sort((a, b) => {
                if (a.score !== b.score) return a.score - b.score;
                const titleLengthA = (a.mapped.title || '').length;
                const titleLengthB = (b.mapped.title || '').length;
                if (titleLengthA !== titleLengthB) return titleLengthA - titleLengthB;
                return a.index - b.index;
            });

            const maxItems = limit || this.options.defaultLimit;
            const matches = mappedResults.slice(0, maxItems).map(({ mapped }) => ({
                ...mapped,
                icon: mapped.icon || icon
            }));

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

    rankMatches(matches, query, getTitle) {
        if (!Array.isArray(matches)) return [];
        const normalizedQuery = this.normalizeQuery(query);
        return matches
            .map((item, index) => {
                const title = getTitle?.(item) || '';
                const score = this.getBestMatchScore(normalizedQuery, title);
                return { item, score, index, titleLength: String(title || '').length };
            })
            .sort((a, b) => {
                if (a.score !== b.score) return a.score - b.score;
                if (a.titleLength !== b.titleLength) return a.titleLength - b.titleLength;
                return a.index - b.index;
            })
            .map(entry => entry.item);
    }

    getBestMatchScore(query, ...fields) {
        const normalizedQuery = this.normalizeQuery(query);
        const scores = fields
            .filter(value => value !== null && value !== undefined)
            .map(value => this.getMatchScore(String(value), normalizedQuery));
        if (!scores.length) return 5;
        return Math.min(...scores);
    }

    getMatchScore(text, query) {
        const normalizedText = String(text || '').toLowerCase();
        const normalizedQuery = this.normalizeQuery(query);
        if (!normalizedQuery) return 5;
        if (normalizedText === normalizedQuery) return 0;
        if (normalizedText.startsWith(normalizedQuery)) return 1;
        const wordMatch = new RegExp(`\\b${this.escapeRegExp(normalizedQuery)}`);
        if (wordMatch.test(normalizedText)) return 2;
        if (normalizedText.includes(normalizedQuery)) return 3;
        return 4;
    }

    normalizeQuery(query) {
        return String(query || '').trim().toLowerCase();
    }

    escapeRegExp(value) {
        return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
            const topAreas = [...groups]
                .sort((a, b) => b.total - a.total)
                .slice(0, 3)
                .map(group => `${group.label} (${group.total})`)
                .join(', ');
            const topAreasLabel = topAreas ? ` Top areas: ${topAreas}.` : '';
            this.metaContainer.textContent = `Showing ${totalMatches} matches across ${groups.length} areas for "${query}".${topAreasLabel}`;
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

        const ensureToolsPanelVisible = () => {
            try {
                this.app?.ensureMedicalToolsPanelOpen?.();
            } catch (error) {
                console.warn('GlobalSearchManager: unable to open medical tools panel', error);
            }
        };

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
            ensureToolsPanelVisible();
            if (this.app?.switchTool && tool) {
                this.app.switchTool(tool);
            }
            defer(() => callback?.());
        };

        switch (action.type) {
            case 'drug':
                navigate('drug-reference', () => this.app?.showDrugDetail?.(action.key));
                break;
            case 'pregnancy-drug':
                navigate('drug-reference', () => {
                    // Switch to pregnancy tab
                    const pregnancyTab = document.querySelector('[data-tab="pregnancy"]');
                    if (pregnancyTab) {
                        pregnancyTab.click();
                    }
                    // Show drug detail
                    setTimeout(() => {
                        if (this.managers.pregnancyDrugsManager && action.data) {
                            this.managers.pregnancyDrugsManager.showDrugDetail(action.data.drug);
                        }
                    }, 100);
                });
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
            case 'med-stats':
                navigate('med-stats-ethics', () => {
                    try {
                        const panel = document.getElementById('med-stats-ethics-panel');
                        if (!panel) return;
                        this.app?.loadMedStatsEthicsContent?.(panel);
                        const sectionTitle = action.title?.toLowerCase?.() || '';
                        const targetHeading = Array.from(panel.querySelectorAll('.med-knowledge-card h4')).find(h =>
                            (h.textContent || '').toLowerCase().includes(sectionTitle)
                        );
                        if (targetHeading) {
                            targetHeading.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            targetHeading.classList.add('global-search-highlight');
                            setTimeout(() => targetHeading.classList.remove('global-search-highlight'), 2500);
                        }
                    } catch (e) { /* ignore */ }
                });
                break;
            case 'clinical-pearls':
                navigate('clinical-pearls', () => {
                    try {
                        const panel = document.getElementById('clinical-pearls-panel');
                        if (!panel) return;
                        this.app?.loadClinicalPearlsContent?.(panel);
                        const title = action.title?.toLowerCase?.() || '';
                        const target = Array.from(panel.querySelectorAll('.knowledge-card h3')).find(h =>
                            (h.textContent || '').toLowerCase().includes(title)
                        );
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            target.classList.add('global-search-highlight');
                            setTimeout(() => target.classList.remove('global-search-highlight'), 2500);
                        }
                    } catch (e) { /* ignore */ }
                });
                break;
            case 'psychiatry':
                navigate('psychiatry', () => {
                    try {
                        const panel = document.getElementById('psychiatry-panel');
                        if (!panel) return;
                        this.app?.loadPsychiatryContent?.(panel);
                        const searchInput = panel.querySelector('#psychiatry-search');
                        if (searchInput) {
                            searchInput.value = action.title || '';
                            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                        const matchCard = Array.from(panel.querySelectorAll('.psychiatry-card h3')).find(h =>
                            (h.textContent || '').toLowerCase().includes((action.title || '').toLowerCase())
                        );
                        if (matchCard) {
                            matchCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            matchCard.classList.add('global-search-highlight');
                            setTimeout(() => matchCard.classList.remove('global-search-highlight'), 2500);
                        }
                    } catch (e) { /* ignore */ }
                });
                break;
            case 'triad':
                navigate('triads', () => this.managers.triadsManager?.showTriadDetails?.(action.key));
                break;
            case 'procedure':
                navigate('procedures', () => this.managers.proceduresManager?.showProcedureDetail?.(action.id));
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
            case 'core-condition':
                navigate('core-conditions', () => {
                    try {
                        const panel = document.getElementById('core-conditions-panel');
                        if (!panel) return;
                        this.app?.loadCoreConditionsContent?.(panel);
                        const runSelection = () => {
                            const searchInput = panel.querySelector('#cc-search-input');
                            if (searchInput) {
                                searchInput.value = action.name || '';
                                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                            const card = panel.querySelector(`[data-condition-id="${CSS.escape(action.id || '')}"]`);
                            if (card?.click) card.click();
                        };
                        setTimeout(runSelection, 80);
                    } catch (e) { /* ignore */ }
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
            case 'ladder':
                navigate('ladders', () => this.managers.laddersManager?.switchToLadder?.(action.key));
                break;
            case 'anatomy':
                navigate('anatomy', () => {
                    try {
                        const input = document.getElementById('searchAnatomy');
                        if (input) {
                            input.value = action.name || '';
                            input.dispatchEvent(new Event('input', { bubbles: true }));
                        } else {
                            this.managers.anatomyManager?.searchAnatomy?.(action.name);
                        }
                    } catch (e) { /* ignore */ }
                });
                break;
            case 'ophthalmology':
                navigate('ophthalmology', () => {
                    try {
                        const panel = document.getElementById('ophthalmology-panel');
                        if (!panel) return;
                        this.app?.loadOphthalmologyContent?.(panel);
                        const input = panel.querySelector('.ophthal-search-input');
                        if (input) {
                            input.value = action.name || '';
                            input.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                        const matchCard = Array.from(panel.querySelectorAll('.ophthal-condition-card')).find(card =>
                            (card.querySelector('h4')?.textContent || '').toLowerCase().includes((action.name || '').toLowerCase())
                        );
                        if (matchCard) {
                            matchCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            matchCard.classList.add('global-search-highlight');
                            setTimeout(() => matchCard.classList.remove('global-search-highlight'), 2500);
                        }
                    } catch (e) { /* ignore */ }
                });
                break;
            case 'dermatology':
                navigate('dermatology', () => {
                    try {
                        const panel = document.getElementById('dermatology-panel');
                        if (!panel) return;
                        this.app?.loadDermatologyContent?.(panel);
                        
                        // Wait for panel to load, then open the specific condition
                        setTimeout(() => {
                            const manager = this.managers.dermatologyManager;
                            if (manager && action.conditionId) {
                                const condition = manager.getCondition(action.conditionId);
                                if (condition) {
                                    manager.renderDetailedView(condition);
                                }
                            }
                        }, 100);
                    } catch (e) {
                        console.error('Failed to navigate to dermatology:', e);
                    }
                });
                break;
            case 'vaccination':
                navigate('vaccinations', () => {
                    try {
                        const panel = document.getElementById('vaccinations-panel');
                        if (!panel) return;
                        // If a tab was provided try to open it
                        if (action.tab) {
                            const tabBtn = panel.querySelector(`[data-vaccination-tab="${action.tab}"]`);
                            if (tabBtn?.click) tabBtn.click();
                        }
                        // Find element by constructed key if present
                        if (action.key) {
                            const el = panel.querySelector(`[data-vaccination-key="${CSS.escape(action.key)}"]`) || panel.querySelector(`[data-key="${CSS.escape(action.key)}"]`);
                            if (el) {
                                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                el.classList.add('global-search-highlight');
                                setTimeout(() => el.classList.remove('global-search-highlight'), 2500);
                            }
                        }
                    } catch (e) { /* ignore */ }
                });
                break;
            case 'contraception':
                navigate('contraception-hrt', () => {
                    try {
                        const panel = document.getElementById('contraception-hrt-panel');
                        if (!panel) return;
                        let el = null;
                        if (typeof action.index === 'number') {
                            el = panel.querySelectorAll('.contraception-hrt-card')[action.index];
                        }
                        if (!el && action.key) {
                            el = Array.from(panel.querySelectorAll('.contraception-hrt-card')).find(c => (c.textContent || '').includes(action.key));
                        }
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            el.classList.add('global-search-highlight');
                            setTimeout(() => el.classList.remove('global-search-highlight'), 2500);
                        }
                    } catch (e) { /* ignore */ }
                });
                break;
            case 'genetics':
                navigate('genetics', () => {
                    try {
                        const panel = document.getElementById('genetics-panel');
                        if (!panel) return;
                        let el = panel.querySelector(`[data-key="${CSS.escape(action.key || '')}"]`);
                        if (!el) {
                            el = panel.querySelector('.genetics-card');
                        }
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            el.classList.add('global-search-highlight');
                            setTimeout(() => el.classList.remove('global-search-highlight'), 2500);
                        }
                    } catch (e) { /* ignore */ }
                });
                break;
            case 'developmental':
                navigate('developmental', () => {
                    try {
                        const panel = document.getElementById('developmental-panel');
                        if (!panel) return;
                        const rows = Array.from(panel.querySelectorAll('.milestone-row'));
                        const idx = typeof action.index === 'number' ? action.index : -1;
                        const el = rows[idx] || rows.find(r => (r.textContent || '').includes(action.key || ''));
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            el.classList.add('global-search-highlight');
                            setTimeout(() => el.classList.remove('global-search-highlight'), 2500);
                        }
                    } catch (e) { /* ignore */ }
                });
                break;
            case 'pdf':
                navigate('pdf-library', () => this.managers.pdfLibraryManager?.showPDF?.(action.filename));
                break;
            case 'quiz-question':
                defer(async () => {
                    if (!this.app) return;
                    
                    // Load quiz if it's different from the current one
                    if (action.quizName && action.quizName !== this.managers.quizManager?.quizName) {
                        const loaded = await this.managers.quizManager?.loadQuiz?.(action.quizName, action.isUploaded);
                        if (!loaded) return;
                    }

                    await this.managers.quizManager?.ensureFullQuizForIndices?.([action.index]);
                    
                    // Ensure quiz is started if not already
                    if (this.managers.quizManager?.questions?.length > 0 && !this.managers.quizManager?.quizStartTime) {
                        await this.managers.quizManager?.startQuiz?.();
                    }
                    
                    // Show quiz screen and navigate to the question
                    this.app.showScreen?.('quizScreen');
                    
                    // Small delay to ensure screen transition completes
                    setTimeout(async () => {
                        const moved = await this.managers.quizManager?.goToOriginalQuestion?.(action.index);
                        if (!moved && this.app?.uiManager?.showToast) {
                            this.app.uiManager.showToast('Unable to open that question right now.', 'error');
                        }
                    }, 100);
                });
                break;
            case 'quiz-question-select':
                defer(async () => {
                    if (action.quizName && action.quizName !== this.managers.quizManager?.quizName) {
                        const loaded = await this.managers.quizManager?.loadQuiz?.(action.quizName, action.isUploaded);
                        if (!loaded) return;
                    }
                    const selection = await this.managers.quizManager?.selectQuestionsByIndices?.(action.indices || []);
                    if (selection?.count) {
                        this.app?.showScreen?.('quizScreen');
                    }
                });
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
