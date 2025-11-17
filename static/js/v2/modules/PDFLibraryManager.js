/**
 * PDFLibraryManager - PDF Document Library System
 * Manages PDF documents with MLA-style rendering
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';

const normalizePdfTitleKey = (value) => (value || '')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

const PDF_TITLE_OVERRIDES = new Map([
    [normalizePdfTitleKey('4asdelirium'), "4A's Delirium Assessment"],
    [normalizePdfTitleKey('4asdelerium'), "4A's Delirium Assessment"],
    [normalizePdfTitleKey('4cmortality'), '4C COVID-19 Mortality Score'],
    [normalizePdfTitleKey('4peps'), '4PEPS Pulmonary Embolism Rule'],
    [normalizePdfTitleKey('6minutewalkdistance'), '6 Minute Walk Distance'],
    [normalizePdfTitleKey('age-adjusted d-dimer'), 'Age-Adjusted D-Dimer'],
    [normalizePdfTitleKey('ageadjustedcrpesr'), 'Age-Adjusted CRP/ESR'],
    [normalizePdfTitleKey('adjustedbodyweight'), 'Adjusted Body Weight Calculator'],
    [normalizePdfTitleKey('apachescore'), 'APACHE Score'],
    [normalizePdfTitleKey('apgarscore'), 'APGAR Score'],
    [normalizePdfTitleKey('air'), 'AIR Score (Appendicitis Inflammatory Response)']
]);

const ABBREVIATION_EXPANSIONS = new Map([
    ['AX', 'Assessment'],
    ['MX', 'Management'],
    ['DX', 'Diagnosis'],
    ['HX', 'History'],
    ['PX', 'Prophylaxis'],
    ['RX', 'Prescription'],
    ['TX', 'Treatment'],
    ['FX', 'Fracture'],
    ['IV', 'Intravenous'],
    ['IM', 'Intramuscular'],
    ['PO', 'Oral'],
    ['PR', 'Rectal'],
    ['SC', 'Subcutaneous'],
    ['MSK', 'Musculoskeletal'],
    ['CV', 'Cardiovascular'],
    ['GI', 'Gastrointestinal'],
    ['GU', 'Genitourinary'],
    ['ENT', 'Ear Nose Throat'],
    ['COPD', 'Chronic Obstructive Pulmonary Disease'],
    ['CHF', 'Congestive Heart Failure'],
    ['MI', 'Myocardial Infarction'],
    ['PE', 'Pulmonary Embolism'],
    ['DVT', 'Deep Vein Thrombosis'],
    ['AKI', 'Acute Kidney Injury'],
    ['CKD', 'Chronic Kidney Disease'],
    ['UTI', 'Urinary Tract Infection'],
    ['SOB', 'Shortness Of Breath'],
    ['ABG', 'Arterial Blood Gas'],
    ['GCS', 'Glasgow Coma Scale'],
    ['NIHSS', 'NIH Stroke Scale'],
    ['MEWS', 'Modified Early Warning Score'],
    ['NEWS', 'National Early Warning Score'],
    ['NEWS2', 'NEWS 2'],
    ['PHQ', 'Patient Health Questionnaire'],
    ['GAD', 'General Anxiety Disorder'],
    ['BSA', 'Body Surface Area'],
    ['BMI', 'Body Mass Index'],
    ['MAP', 'Mean Arterial Pressure'],
    ['LRINEC', 'LRINEC Score'],
    ['MELD', 'MELD Score'],
    ['SOFA', 'SOFA Score'],
    ['QSOFA', 'qSOFA Score'],
    ['CRP', 'C-Reactive Protein'],
    ['ESR', 'Erythrocyte Sedimentation Rate']
]);

const ALWAYS_UPPERCASE_WORDS = new Set([
    'ABG', 'AKI', 'ALS', 'ADHD', 'BMI', 'BSA', 'CAD', 'CKD', 'COPD', 'CT', 'CXR', 'DM', 'ECG',
    'ENT', 'GI', 'GU', 'GFR', 'GCS', 'HIV', 'HTN', 'IBD', 'IBS', 'INR', 'IV', 'MRI', 'MSK',
    'NIHSS', 'NSAID', 'PE', 'PO', 'PR', 'PTT', 'PT', 'PTA', 'PTSD', 'PVC', 'RX', 'SC', 'SOB',
    'TIA', 'UTI', 'WBC', 'NEWS', 'NEWS2', 'MEWS', 'LRINEC', 'MELD', 'SOFA', 'QSOFA'
]);

const KEYWORD_INSERTS = [
    'ANXIETY', 'SCALE', 'SCORE', 'INDEX', 'ASSESSMENT', 'GUIDELINE', 'GUIDE', 'CRITERIA',
    'CALCULATOR', 'CALCULATION', 'CLASSIFICATION', 'ALGORITHM', 'PROTOCOL', 'DIAGNOSIS',
    'MANAGEMENT', 'TREATMENT', 'THERAPY', 'PATHWAY', 'FORMULA', 'MODEL', 'STAGING', 'SCREEN',
    'CHECKLIST', 'QUESTIONNAIRE', 'OVERVIEW', 'RISK', 'WORKUP', 'SUMMARY', 'CONSENT',
    'PROPHYLAXIS', 'DELIRIUM', 'DELERIUM', 'MORTALITY', 'DISTANCE', 'ADJUSTED', 'ANION',
    'WEIGHT', 'BODY', 'PRESSURE', 'VOLUME', 'INFUSION', 'DOSING', 'SODIUM', 'POTASSIUM',
    'MAGNESIUM', 'CALCIUM', 'PHOSPHATE', 'GLUCOSE', 'FRACTURE', 'BLEED', 'BLEEDING',
    'ANATOMY', 'EXAMINATION', 'EXAM', 'ANALYSIS', 'EMERGENCY', 'NEUROLOGY', 'CARDIOLOGY',
    'RESPIRATORY', 'RENAL', 'HEPATIC', 'PEDIATRIC', 'PAEDIATRIC', 'NEPHROLOGY'
];

export class PDFLibraryManager {
    constructor() {
        this.pdfIndex = null;
        this.recentPDFs = [];
        this.maxRecent = 10;
        this.initialized = false;
        this.dataLoaded = false;
        this.pdfjsLib = null;
        this.assetsBasePath = '/static/assets/';
        this.metadataMap = new Map();
        this.titleCache = new Map();
    }

    /**
     * Escape text for safe HTML rendering
     * @param {string} value
     * @returns {string}
     */
    escapeHtml(value) {
        if (value === null || value === undefined) {
            return '';
        }
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    /**
     * Escape text for safe use inside HTML attributes
     * @param {string} value
     * @returns {string}
     */
    escapeHtmlAttribute(value) {
        return this.escapeHtml(value)
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    applyKeywordSpacing(text) {
        let result = text;
        for (const keyword of KEYWORD_INSERTS) {
            const regex = new RegExp(keyword, 'gi');
            result = result.replace(regex, (match, offset, full) => {
                const precedingChar = offset > 0 ? full[offset - 1] : '';
                const needsSpace = offset > 0 && precedingChar.trim() !== '';
                const formatted = match.charAt(0) + match.slice(1).toLowerCase();
                return `${needsSpace ? ' ' : ''}${formatted}`;
            });
        }
        return result;
    }

    expandAbbreviationWord(word) {
        if (!word) {
            return '';
        }
        const cleaned = word.replace(/[^a-z0-9]/gi, '');
        if (!cleaned) {
            return word;
        }
        const lookup = cleaned.toUpperCase();
        if (ABBREVIATION_EXPANSIONS.has(lookup)) {
            return ABBREVIATION_EXPANSIONS.get(lookup);
        }
        return word;
    }

    titleCaseWord(word) {
        if (!word) {
            return '';
        }
        const leading = word.match(/^[^a-zA-Z0-9]+/);
        const trailing = word.match(/[^a-zA-Z0-9]+$/);
        const core = word
            .replace(/^[^a-zA-Z0-9]+/, '')
            .replace(/[^a-zA-Z0-9]+$/, '');
        if (!core) {
            return word;
        }

        const coreUpper = core.toUpperCase();
        if (ALWAYS_UPPERCASE_WORDS.has(coreUpper)) {
            return `${leading ? leading[0] : ''}${coreUpper}${trailing ? trailing[0] : ''}`;
        }

        if (/^(?:[IVXLCDM]+)$/i.test(core) && core.length <= 4) {
            return `${leading ? leading[0] : ''}${coreUpper}${trailing ? trailing[0] : ''}`;
        }

        if (/^\d+$/.test(core)) {
            return `${leading ? leading[0] : ''}${core}${trailing ? trailing[0] : ''}`;
        }

        const formatted = core.charAt(0).toUpperCase() + core.slice(1).toLowerCase();
        return `${leading ? leading[0] : ''}${formatted}${trailing ? trailing[0] : ''}`;
    }

    /**
     * Initialize the PDF library manager
     * Loads the PDF index and pdf.js library
     */
    async initialize() {
        if (this.initialized) {
            console.log('📚 PDFLibraryManager already initialized, skipping...');
            return true;
        }

        console.log('📚 Initializing PDFLibraryManager...');

        // Debug: report whether pdf.js was injected before this script runs
        try {
            const hasGlobalPdfJs = !!(typeof window !== 'undefined' && window.pdfjsLib);
            console.debug('🔍 window.pdfjsLib present?', hasGlobalPdfJs);
        } catch (e) {
            console.debug('🔍 window access error when checking pdfjsLib', e);
        }

        // Load recent PDFs from storage (lightweight)
        const stored = await storage.getItem('recentPDFs');
        try {
            if (Array.isArray(stored)) {
                this.recentPDFs = stored;
            } else if (stored && typeof stored === 'object') {
                this.recentPDFs = Object.values(stored);
            } else if (typeof stored === 'string') {
                // Handle legacy stringified arrays or comma-separated values
                try {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed)) {
                        this.recentPDFs = parsed;
                    } else {
                        this.recentPDFs = [];
                    }
                } catch (e) {
                    // Fallback: treat comma-separated string as list
                    this.recentPDFs = stored.split(',').map(s => s.trim()).filter(Boolean);
                }
            } else {
                this.recentPDFs = [];
            }
        } catch (e) {
            console.warn('⚠️ Could not coerce stored recentPDFs to array, resetting to empty:', stored, e);
            this.recentPDFs = [];
        }

        // Load PDF index
        console.log('📚 Loading PDF index...');
        try {
            const response = await fetch('/static/assets/pdf_index.json');
            if (response.ok) {
                this.pdfIndex = await response.json();
                console.log('✅ PDF index loaded with', this.pdfIndex.length, 'documents');
            } else {
                console.warn('⚠️ PDF index not found, using empty index');
                this.pdfIndex = [];
            }
        } catch (error) {
            console.warn('⚠️ Error loading PDF index:', error);
            this.pdfIndex = [];
        }

        // Load PDF metadata (preferred: pre-generated JSON). If not available,
        // fall back to parsing the `subjects.csv` at runtime.
        try {
            // Try JSON first (fast, build-time generated)
            const metaResp = await fetch('/static/assets/pdf_metadata.json');
            if (metaResp.ok) {
                const metaJson = await metaResp.json();
                for (const k of Object.keys(metaJson)) {
                    this.metadataMap.set(k, metaJson[k]);
                }
                console.log('✅ PDF metadata loaded from /static/assets/pdf_metadata.json');
            } else {
                // Try subjects.csv as a runtime fallback
                const csvResp = await fetch('/static/assets/subjects.csv');
                if (csvResp.ok) {
                    const csvText = await csvResp.text();
                    const parsed = this.parseSubjectsCSV(csvText);
                    for (const entry of parsed) {
                        const key = normalizePdfTitleKey(entry.pdf || entry.subjectTitle || '');
                        this.metadataMap.set(key, entry);
                    }
                    console.log('✅ PDF metadata parsed from /static/assets/subjects.csv');
                } else {
                    console.debug('ℹ️ No pdf_metadata.json and subjects.csv not available (or returned non-OK)');
                }
            }
        } catch (metaErr) {
            console.warn('⚠️ Error loading PDF metadata:', metaErr);
        }

        // Load pdf.js library — use global `window.pdfjsLib` when available,
        // otherwise load from CDN. This project is served as static files and
        // is not bundled by webpack in many deployments, so dynamic import
        // of 'pdfjs-dist/webpack' frequently fails in the browser.
        console.log('📚 Loading pdf.js library (global -> CDN fallback)...');
        const CDN_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const LOCAL_WORKER = '/static/js/v2/pdf.worker.min.js';

        // Prefer a global already-loaded pdfjs (injected via index.html or service)
        this.pdfjsLib = (typeof window !== 'undefined' && window.pdfjsLib) ? window.pdfjsLib : null;

        if (!this.pdfjsLib) {
            try {
                console.debug('🔁 pdfjsLib not found; attempting CDN load');
                await this.loadPdfJsFromCDN();
                this.pdfjsLib = window.pdfjsLib || null;
                console.debug('🔍 After CDN load: window.pdfjsLib present?', !!this.pdfjsLib);
            } catch (cdnError) {
                console.error('❌ Failed to load pdf.js from CDN:', cdnError);
                this.pdfjsLib = null;
            }
        } else {
            console.log('✅ Using existing global pdfjsLib');
        }

        const applyWorkerSrc = (src) => {
            if (this.pdfjsLib && this.pdfjsLib.GlobalWorkerOptions) {
                this.pdfjsLib.GlobalWorkerOptions.workerSrc = src;
            }
            if (typeof window !== 'undefined' && window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) {
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = src;
            }
            console.debug('🔧 Set pdfjsLib.GlobalWorkerOptions.workerSrc ->', src);
        };

        const workerPreferences = [
            { src: LOCAL_WORKER, label: 'local shim' },
            { src: CDN_WORKER, label: 'CDN fallback' }
        ];

        let workerConfigured = false;
        for (const candidate of workerPreferences) {
            try {
                applyWorkerSrc(candidate.src);
                workerConfigured = true;
                break;
            } catch (err) {
                console.warn(`⚠️ Could not set workerSrc using ${candidate.label}:`, err);
            }
        }

        if (!workerConfigured) {
            console.error('❌ pdfjsLib workerSrc could not be configured with any source');
        }

        this.initialized = true;
        console.log('✅ PDFLibraryManager initialized');

        eventBus.emit('PDF_LIBRARY_MANAGER_READY', {
            count: this.pdfIndex.length,
            categories: this.getCategories(),
            lazyLoaded: false
        });

        eventBus.emit('PDF_LIBRARY_DATA_LOADED', {
            count: this.pdfIndex.length,
            categories: this.getCategories()
        });

        return true;
    }

    /**
     * Fallback method to load pdf.js from CDN
     */
    async loadPdfJsFromCDN() {
        return new Promise((resolve, reject) => {
            // Load pdf.js from CDN
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = () => {
                this.pdfjsLib = window.pdfjsLib;
                try {
                    if (this.pdfjsLib && this.pdfjsLib.GlobalWorkerOptions) {
                        this.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                        console.debug('🔧 Set workerSrc to CDN worker after CDN script load');
                    }
                } catch (e) {
                    console.warn('⚠️ Could not set workerSrc after CDN pdf.js load:', e);
                }
                console.log('✅ pdf.js loaded from CDN');
                resolve();
            };
            script.onerror = (e) => {
                console.error('❌ Failed to load pdf.min.js from CDN', e);
                reject(new Error('Failed to load pdf.min.js from CDN'));
            };
            document.head.appendChild(script);
        });
    }

        /**
         * Parse the subjects CSV and return an array of simplified metadata entries.
         * This parser is intentionally small and tolerant: it handles quoted fields
         * and commas inside quotes.
         * @param {string} csvText
         * @returns {Array<Object>} entries with keys: pdf, subjectTitle, subjectTagline, keywords
         */
        parseSubjectsCSV(csvText) {
            const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
            if (!lines.length) return [];

            const parseLine = (line) => {
                const out = [];
                let cur = '';
                let inQuotes = false;
                for (let i = 0; i < line.length; i++) {
                    const ch = line[i];
                    if (ch === '"') {
                        if (inQuotes && line[i+1] === '"') { cur += '"'; i++; }
                        else inQuotes = !inQuotes;
                    } else if (ch === ',' && !inQuotes) {
                        out.push(cur);
                        cur = '';
                    } else {
                        cur += ch;
                    }
                }
                out.push(cur);
                return out.map(s => s.trim().replace(/^"|"$/g, ''));
            };

            const header = parseLine(lines[0]).map(h => h.replace(/^"|"$/g, ''));
            const rows = [];
            for (let i = 1; i < lines.length; i++) {
                const fields = parseLine(lines[i]);
                if (fields.length !== header.length) continue;
                const obj = {};
                for (let j = 0; j < header.length; j++) {
                    obj[header[j]] = fields[j];
                }
                rows.push(obj);
            }

            // Map to simplified entries
            return rows.map(r => ({
                pdf: r['pdf'] || r['PDF'] || '',
                subjectTitle: r['subjectTitle'] || r['subjectTitle'] || r['subjectID'] || '',
                subjectTagline: r['subjectTagline'] || r['subjectTagline'] || '',
                keywords: (r['keywords'] || '').split(/\s+/).filter(Boolean)
            }));
        }

    /**
     * Search PDFs by filename
     * @param {string} query - Search query
     * @returns {Array} Matching PDFs
     */
    async searchPDFs(query) {
        if (!query || query.length < 2) {
            return [];
        }

        const searchTerm = query.toLowerCase();
        const results = [];

        for (const filename of this.pdfIndex) {
            if (filename.toLowerCase().includes(searchTerm)) {
                results.push({
                    filename: filename,
                    title: this.getDisplayTitle(filename),
                    category: this.categorizePDF(filename)
                });
            }
        }

        eventBus.emit('PDF_LIBRARY_SEARCHED', {
            query: query,
            resultsCount: results.length
        });

        return results;
    }

    /**
     * Get all available categories
     * @returns {Array} List of categories with icons
     */
    async getCategories() {
        const categories = [
            { id: 'all', name: 'All Documents', icon: '📚', count: this.pdfIndex.length },
            { id: 'assessment', name: 'Assessment Tools', icon: '📋', count: 0 },
            { id: 'calculators', name: 'Calculators', icon: '🧮', count: 0 },
            { id: 'management', name: 'Management Guidelines', icon: '💊', count: 0 },
            { id: 'diagnosis', name: 'Diagnosis', icon: '🔬', count: 0 },
            { id: 'scoring', name: 'Scoring Systems', icon: '📊', count: 0 },
            { id: 'emergency', name: 'Emergency', icon: '🚨', count: 0 },
            { id: 'anatomy', name: 'Anatomy', icon: '🦴', count: 0 },
            { id: 'other', name: 'Other', icon: '📘', count: 0 }
        ];

        // Count PDFs in each category
        for (const filename of this.pdfIndex) {
            const category = this.categorizePDF(filename);
            const categoryObj = categories.find(c => c.id === category);
            if (categoryObj) {
                categoryObj.count++;
            }
        }

        return categories.filter(c => c.id === 'all' || c.count > 0);
    }

    /**
     * Get all PDFs in a category
     * @param {string} categoryId - Category ID
     * @returns {Array} PDFs in category
     */
    async getPDFsByCategory(categoryId) {
        if (categoryId === 'all') {
            return this.pdfIndex.map(filename => ({
                filename: filename,
                title: this.getDisplayTitle(filename),
                category: this.categorizePDF(filename)
            }));
        }

        return this.pdfIndex
            .filter(filename => this.categorizePDF(filename) === categoryId)
            .map(filename => ({
                filename: filename,
                title: this.getDisplayTitle(filename),
                category: categoryId
            }));
    }

    /**
     * Categorize a PDF based on its filename
     * @param {string} filename - PDF filename
     * @returns {string} Category ID
     */
    categorizePDF(filename) {
        const name = filename.toLowerCase();

        // Assessment tools
        if (name.includes('ax') || name.includes('assessment') || name.includes('exam')) {
            return 'assessment';
        }

        // Calculators
        if (name.includes('calc') || name.includes('score') || name.includes('index') ||
            name.includes('bmi') || name.includes('bsa') || name.includes('map') ||
            name.includes('anion') || name.includes('sodium') || name.includes('calcium') ||
            name.includes('qt') || name.includes('meld') || name.includes('child') ||
            name.includes('apgar') || name.includes('glasgow') || name.includes('nihss')) {
            return 'calculators';
        }

        // Management guidelines
        if (name.includes('mx') || name.includes('management') || name.includes('treatment') ||
            name.includes('guideline') || name.includes('protocol')) {
            return 'management';
        }

        // Diagnosis
        if (name.includes('diagnosis') || name.includes('diagnostic') || name.includes('criteria')) {
            return 'diagnosis';
        }

        // Scoring systems
        if (name.includes('score') || name.includes('scale') || name.includes('index') ||
            name.includes('das28') || name.includes('harvey') || name.includes('abbey') ||
            name.includes('phq') || name.includes('gad') || name.includes('audit') ||
            name.includes('cage') || name.includes('ciwa') || name.includes('pas')) {
            return 'scoring';
        }

        // Emergency
        if (name.includes('emergency') || name.includes('sepsis') || name.includes('arrest') ||
            name.includes('shock') || name.includes('acute') || name.includes('critical')) {
            return 'emergency';
        }

        // Anatomy
        if (name.includes('anatomy') || name.includes('msk') || name.includes('neuro') ||
            name.includes('vascular') || name.includes('cardiac')) {
            return 'anatomy';
        }

        return 'other';
    }

    /**
     * Format PDF title from filename
     * @param {string} filename - PDF filename
     * @returns {string} Formatted title
     */
    formatPDFTitle(filename) {
        let baseTitle = (filename || '')
            .replace(/info\.pdf$/i, '')
            .replace(/\.pdf$/i, '');

        const overrideKey = normalizePdfTitleKey(baseTitle);
        if (PDF_TITLE_OVERRIDES.has(overrideKey)) {
            return PDF_TITLE_OVERRIDES.get(overrideKey);
        }

        let title = baseTitle
            .replace(/[_/]+/g, ' ')
            .replace(/-/g, ' ')
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/(\d)([A-Za-z])/g, '$1 $2')
            .replace(/([A-Za-z])(\d)/g, '$1 $2');

        title = this.applyKeywordSpacing(title);

        // Separate roman numerals that are attached to words (e.g., APACHEIIScore)
        title = title.replace(/([A-Za-z])([IVXLCDM]{1,4})(?![a-z])/g, '$1 $2');

        title = title.replace(/\s+/g, ' ').trim();

        const parts = [];
        for (const chunk of title.split(' ')) {
            if (!chunk) continue;
            const expanded = this.expandAbbreviationWord(chunk);
            if (typeof expanded === 'string' && expanded.includes(' ')) {
                parts.push(...expanded.split(' '));
            } else if (expanded) {
                parts.push(expanded);
            }
        }

        const formattedTitle = parts
            .map(part => this.titleCaseWord(part))
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();

        return formattedTitle;
    }

    /**
     * Get a user-friendly display title for a PDF
     * @param {string} filename - Source filename from the index
     * @returns {string} Formatted title suitable for UI display
     */
    getDisplayTitle(filename) {
        if (!filename) {
            return 'Medical Reference';
        }

        try {
            const cacheKey = filename.toLowerCase();
            if (this.titleCache.has(cacheKey)) {
                return this.titleCache.get(cacheKey);
            }


            // Prefer metadata title when available. Normalize lookup against
            // the filename base (strip the `.pdf` extension) so CSV keys
            // generated at build-time match filenames in the index.
            try {
                const filenameBase = String(filename).replace(/\.pdf$/i, '').trim();
                const metaKey = normalizePdfTitleKey(filenameBase);
                if (this.metadataMap && this.metadataMap.has(metaKey)) {
                    const meta = this.metadataMap.get(metaKey);
                    if (meta && meta.subjectTitle && meta.subjectTitle.trim()) {
                        const titleFromMeta = meta.subjectTitle.trim();
                        this.titleCache.set(cacheKey, titleFromMeta);
                        return titleFromMeta;
                    }
                }
            } catch (e) {
                // Continue to fallback behavior below
                console.debug('Metadata lookup failed for', filename, e);
            }

            // If no metadata exists, prefer preserving the original filename
            // (only strip the `.pdf` extension) rather than applying aggressive
            // heuristic reformatting which can produce odd results like
            // "A Cr Eu Lar Ra". This keeps file names recognizable.
            let title = String(filename).replace(/\.pdf$/i, '').trim();

            if (!title) {
                title = 'Medical Reference';
            }

            this.titleCache.set(cacheKey, title);
            return title;
        } catch (error) {
            console.warn('Failed to format PDF title for', filename, error);
            return filename;
        }
    }

    /**
     * Determine if we should bypass pdf.js and use the native viewer instead.
     * Android PWAs/WebViews frequently fail to spin up the pdf.js worker which
     * leaves the panel blank. Falling back to the browser viewer gives the user
     * a predictable experience.
     * @returns {boolean}
     */
    shouldPreferNativeViewer() {
        if (typeof navigator === 'undefined') {
            return false;
        }

        try {
            const ua = navigator.userAgent || '';
            const isAndroid = /Android/i.test(ua);
            if (!isAndroid) {
                return false;
            }

            const isWebView = /; wv\)/i.test(ua) || /Version\/\d+\.\d+ Chrome\//i.test(ua);
            const isSamsungBrowser = /SamsungBrowser/i.test(ua);
            const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 2;
            const offline = typeof navigator.onLine === 'boolean' && navigator.onLine === false;
            const standalone = this.isStandaloneDisplayMode();

            const shouldFallback = isWebView || isSamsungBrowser || lowMemory || offline;

            if (!shouldFallback && standalone) {
                // Android PWAs that run in standalone mode now attempt the inline
                // pdf.js renderer first so that installed users keep the same
                // experience as the browser version.
            console.debug('📘 Standalone display mode detected; keeping inline PDF renderer active.');
            }

            return shouldFallback;
        } catch (err) {
            console.debug('PDF native viewer detection failed', err);
            return false;
        }
    }

    /**
     * Check if the PWA is running in standalone display mode
     * @returns {boolean}
     */
    isStandaloneDisplayMode() {
        if (typeof window === 'undefined') {
            return false;
        }

        try {
            if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
                return true;
            }
        } catch (e) {
            // ignore
        }

        return !!(window.navigator && window.navigator.standalone);
    }

    /**
     * Render PDF to MLA-style HTML
     * @param {string} filename - PDF filename
     * @returns {string} HTML content
     */
    async renderPDFToHTML(filename) {
        const url = this.getPDFUrl(filename);
        const safeFilenameAttr = this.escapeHtmlAttribute(filename);
        const displayTitle = this.getDisplayTitle(filename);
        const safeDisplayTitle = this.escapeHtml(displayTitle);

        if (!url) {
            console.error('Unable to construct PDF URL for', filename);
            return this.renderPDFFallback(filename, displayTitle);
        }

        if (this.shouldPreferNativeViewer()) {
            console.warn('Forcing native PDF viewer for this Android environment');
            eventBus.emit('PDF_RENDER_FALLBACK', { filename, reason: 'android_native' });
            return this.renderPDFFallback(filename, displayTitle, url);
        }

        if (!this.pdfjsLib) {
            console.warn('pdf.js library not loaded, using browser PDF fallback for', filename);
            eventBus.emit('PDF_RENDER_FALLBACK', { filename, reason: 'pdfjs_missing' });
            return this.renderPDFFallback(filename, displayTitle, url);
        }

        eventBus.emit('PDF_LOADING', { filename });

        try {
            const pdf = await this.pdfjsLib.getDocument(url).promise;
            let html = '';

            eventBus.emit('PDF_LOADED', { filename, pages: pdf.numPages });

            const deviceScale = Math.min(typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1, 2);

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                let pageImageDataUrl = null;

                try {
                    const viewport = page.getViewport({ scale: 1.25 });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    if (!context) {
                        throw new Error('Canvas 2D context unavailable');
                    }
                    const outputScale = deviceScale || 1;

                    canvas.width = viewport.width * outputScale;
                    canvas.height = viewport.height * outputScale;
                    canvas.style.width = `${viewport.width}px`;
                    canvas.style.height = `${viewport.height}px`;

                    const renderContext = {
                        canvasContext: context,
                        viewport,
                        transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined
                    };

                    await page.render(renderContext).promise;
                    pageImageDataUrl = canvas.toDataURL('image/png');
                } catch (renderError) {
                    console.warn('PDF canvas render failed, falling back to text view for', filename, renderError);
                }

                let pageBodyHtml = '';

                if (pageImageDataUrl) {
                    const safeImageUrl = this.escapeHtmlAttribute(pageImageDataUrl);
                    pageBodyHtml = `
                        <div class="pdf-page-image" style="display:flex; justify-content:center;">
                            <img src="${safeImageUrl}" alt="${safeDisplayTitle} - Page ${pageNum}" style="width:100%; height:auto; border-radius: 12px; box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);" loading="lazy" />
                        </div>
                    `.trim();
                } else {
                    const textContent = await page.getTextContent();
                    const text = textContent.items.map(item => item.str).join(' ');
                    if (!text.trim()) {
                        continue;
                    }
                    pageBodyHtml = `
                        <div class="pdf-content" style="white-space: pre-wrap; font-family: inherit;">
                            ${this.formatPDFText(text)}
                        </div>
                    `.trim();
                }

                html += `
                    <div class="card pdf-page-card">
                        <div class="q-header">
                            <h2 style="font-size: 1.4em; margin: 0;">📘 ${safeDisplayTitle} - Page ${pageNum}</h2>
                        </div>
                        <div class="card-body q-text" style="line-height: 1.6;">${pageBodyHtml}</div>
                    </div>
                `;

                eventBus.emit('PDF_PAGE_RENDERED', { filename, pageNum, totalPages: pdf.numPages });
            }

            eventBus.emit('PDF_RENDERED', { filename, pages: pdf.numPages });

            return html;

        } catch (error) {
            console.error('Error rendering PDF:', error);
            eventBus.emit('PDF_ERROR', { filename, error: error.message });

            // Helpful hint for debugging missing files
            try {
                if (error && error.message && /404|Not Found/i.test(error.message)) {
                    console.warn(`⚠️ PDF file not found at ${url}. Ensure PDFs are placed in /static/assets/ or update the path.`);
                }
            } catch (e) {
                // ignore
            }

            // Gracefully fall back to the browser's built-in PDF renderer
            try {
                const fallbackHtml = this.renderPDFFallback(filename, displayTitle, url);
                if (fallbackHtml) {
                    console.warn('Using browser PDF fallback due to rendering error for', filename);
                    eventBus.emit('PDF_RENDER_FALLBACK', { filename, reason: 'render_error' });
                    return fallbackHtml;
                }
            } catch (fallbackError) {
                console.error('Failed to build PDF fallback UI:', fallbackError);
            }
            const safeErrorTitle = this.escapeHtml(displayTitle);
            const safeErrorMessage = this.escapeHtml(error.message || '');
            return `
                <div class="card error-card">
                    <div class="q-header">
                        <h2 style="color: #ef4444;">❌ Error Loading PDF</h2>
                    </div>
                    <div class="card-body">
                        <p>Unable to load <strong>${safeErrorTitle}</strong></p>
                        <p style="color: #6b7280; font-size: 0.9em;">${safeErrorMessage}</p>
                        <button onclick="window.pdfLibraryManager.renderPDFToHTML('${safeFilenameAttr}')" class="btn" style="margin-top: 10px;">
                            🔄 Try Again
                        </button>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Build a browser-based PDF fallback viewer
     * @param {string} filename - PDF filename
     * @param {string} [displayTitle] - Optional display title
     * @param {string} [url] - Optional precomputed URL
     * @returns {string} HTML markup for the fallback viewer
     */
    renderPDFFallback(filename, displayTitle, url = null) {
        const pdfUrl = url || this.getPDFUrl(filename);
        if (!pdfUrl) {
            return '';
        }


        const safeUrl = this.escapeHtmlAttribute(`${pdfUrl}#view=FitH`);
        const safeDownloadUrl = this.escapeHtmlAttribute(pdfUrl);
        const safeTitle = this.escapeHtml(displayTitle || this.getDisplayTitle(filename));

        return `
            <div class="card pdf-fallback" style="padding: 20px;">
                <div class="q-header" style="margin-bottom: 16px;">
                    <h2 style="margin: 0; font-size: 1.3em;">📘 ${safeTitle}</h2>
                    <p style="margin: 8px 0 0; color: var(--text-secondary); font-size: 0.95em;">
                        Displaying using the browser's built-in PDF viewer.
                    </p>
                </div>
                <div class="card-body" style="padding: 0;">
                    <iframe src="${safeUrl}" style="width: 100%; min-height: 70vh; border: 1px solid var(--border); border-radius: 8px; background: #fff;" title="${safeTitle}" loading="lazy"></iframe>
                </div>
                <div style="margin-top: 12px; display: flex; gap: 10px; flex-wrap: wrap;">
                    <a href="${safeDownloadUrl}" class="btn" download style="text-decoration: none;">
                        ⬇️ Download PDF
                    </a>
                    <a href="${safeDownloadUrl}" class="btn-secondary" target="_blank" rel="noopener" style="text-decoration: none;">
                        🔗 Open in new tab
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * Get a fully-qualified URL for a PDF asset
     * @param {string} filename - Raw filename from the index
     * @returns {string|null} Encoded URL
     */
    getPDFUrl(filename) {
        if (!filename) {
            return null;
        }

        try {
            const normalized = String(filename).trim().replace(/^\/+/, '');
            const safeName = encodeURIComponent(normalized);
            return `${this.assetsBasePath}${safeName}`;
        } catch (e) {
            console.warn('Failed to build PDF URL for filename:', filename, e);
            return null;
        }
    }

    /**
     * Format PDF text for better readability
     * @param {string} text - Raw PDF text
     * @returns {string} Formatted text
     */
    formatPDFText(text) {
        return text
            // Fix common PDF extraction issues
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Add spaces between camelCase
            .replace(/([.!?])\s*([A-Z])/g, '$1\n\n$2') // Add paragraph breaks
            .replace(/\n\s*\n/g, '\n\n') // Clean up multiple newlines
            .replace(/\s+/g, ' ') // Clean up multiple spaces
            .trim();
    }

    /**
     * Show PDF content in the library panel
     * @param {string} filename - PDF filename
     */
    async showPDF(filename) {
        const container = document.getElementById('pdf-library-panel');
        if (!container) return;

        const displayTitle = this.getDisplayTitle(filename);
        const safeTitle = this.escapeHtml(displayTitle);
        const safeFilenameAttr = this.escapeHtmlAttribute(filename);


        // Add loading state
        container.innerHTML = `
            <div class="loading-state" style="text-align: center; padding: 40px;">
                <div style="font-size: 2em; margin-bottom: 20px;">📚</div>
                <h3>Loading ${safeTitle}...</h3>
                <div class="loading-spinner" style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #6366F1; border-radius: 50%; animation: spin 1s linear infinite; margin: 20px auto;"></div>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;

        try {
            const html = await this.renderPDFToHTML(filename);

            // Add back button and content
            container.innerHTML = `
                <button type="button" class="pdf-back-btn" onclick="window.quizApp.loadPDFLibraryContent(document.getElementById('pdf-library-panel'));">
                    ← Back to PDF Library
                </button>
                <div class="pdf-content-container">
                    ${html}
                </div>
            `;

            // Add to recent PDFs
            this.addToRecent(filename, displayTitle);

            // Keep the PDF view pinned to the top of the tools panel without
            // forcing the entire window to scroll (which was causing the
            // Android Chrome address bar to expand and leave a large gap).
            container.scrollTop = 0;
            const toolsPanel = container.closest('.tools-content');
            if (toolsPanel) {
                toolsPanel.scrollTop = 0;
            }

        } catch (error) {
            const safeErrorMessage = this.escapeHtml(error.message || '');
            container.innerHTML = `
                <button type="button" class="pdf-back-btn" onclick="window.quizApp.loadPDFLibraryContent(document.getElementById('pdf-library-panel'));">
                    ← Back to PDF Library
                </button>
                <div class="error-state" style="text-align: center; padding: 40px;">
                    <div style="font-size: 2em; margin-bottom: 20px;">❌</div>
                    <h3>Error Loading PDF</h3>
                    <p>${safeErrorMessage}</p>
                    <button onclick="window.pdfLibraryManager.showPDF('${safeFilenameAttr}')" class="btn" style="margin-top: 20px;">
                        🔄 Try Again
                    </button>
                </div>
            `;
        }
    }

    /**
     * Render the PDF library list
     */
    async renderList() {
        const container = document.getElementById('pdf-library-panel');
        if (!container) return;

        if (!this.initialized) {
            await this.initialize();
        }

        // Create search and category interface
        container.innerHTML = `
            <div class="search-container">
                <input type="text" id="pdf-search" placeholder="Search PDFs..." class="tool-search" aria-label="Search PDFs">
                <button id="pdf-search-btn" class="btn pdf-search-btn" type="button" aria-label="Search PDFs">🔍</button>
            </div>
            <div class="pdf-categories">
                <button class="category-btn active" data-category="all">All Documents</button>
                <button class="category-btn" data-category="assessment">Assessment Tools</button>
                <button class="category-btn" data-category="calculators">Calculators</button>
                <button class="category-btn" data-category="management">Management</button>
                <button class="category-btn" data-category="diagnosis">Diagnosis</button>
                <button class="category-btn" data-category="scoring">Scoring Systems</button>
                <button class="category-btn" data-category="emergency">Emergency</button>
                <button class="category-btn" data-category="anatomy">Anatomy</button>
                <button class="category-btn" data-category="other">Other</button>
            </div>
            <div id="pdf-list" class="tool-results"></div>
        `;

        // Setup search functionality
        const searchInput = document.getElementById('pdf-search');
        const searchBtn = document.getElementById('pdf-search-btn');

        const performSearch = async () => {
            const query = searchInput.value.trim();
            if (query) {
                const results = await this.searchPDFs(query);
                this.displayPDFs(results);
            } else {
                // Show current category
                const activeCategory = document.querySelector('.pdf-categories .category-btn.active')?.dataset.category || 'all';
                await this.showCategory(activeCategory);
            }
        };

        searchInput.addEventListener('input', performSearch);
        searchBtn.addEventListener('click', performSearch);

        // Setup category buttons
        const categoryBtns = document.querySelectorAll('.pdf-categories .category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                searchInput.value = ''; // Clear search when changing categories
                await this.showCategory(btn.dataset.category);
            });
        });

        // Show all PDFs initially
        await this.showCategory('all');

        console.log('📚 PDF library list rendered');
    }

    /**
     * Show PDFs by category
     * @param {string} categoryId - Category ID
     */
    async showCategory(categoryId) {
        const pdfs = await this.getPDFsByCategory(categoryId);
        this.displayPDFs(pdfs);
    }

    /**
     * Display PDFs in the list
     * @param {Array} pdfs - Array of PDF objects
     */
    displayPDFs(pdfs) {
        const listContainer = document.getElementById('pdf-list');
        if (!listContainer) return;

        if (pdfs.length === 0) {
            listContainer.innerHTML = `
                <div class="no-results" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <div style="font-size: 3em; margin-bottom: 20px;">📚</div>
                    <h3>No PDFs found</h3>
                    <p>Try adjusting your search or category filter.</p>
                </div>
            `;
            return;
        }

        // Sort PDFs alphabetically
        pdfs.sort((a, b) => a.title.localeCompare(b.title));

        listContainer.innerHTML = pdfs.map(pdf => {
            const safeFilename = this.escapeHtmlAttribute(pdf.filename);
            const safeTitle = this.escapeHtml(pdf.title);
            const safeCategory = this.escapeHtml(this.getCategoryName(pdf.category));
            const filenameBase = String(pdf.filename || '').replace(/\.pdf$/i, '').trim();
            const meta = this.metadataMap ? this.metadataMap.get(normalizePdfTitleKey(filenameBase)) : null;
            const tagline = meta && meta.subjectTagline ? this.escapeHtml(meta.subjectTagline) : '';
            return `
                <div class="card pdf-card" onclick="window.pdfLibraryManager.showPDF('${safeFilename}');">
                    <div class="card-body">
                        <div class="pdf-card-row">
                            <div>
                                <div class="pdf-title" style="font-weight: 600; font-size: 1.1em; color: var(--text-primary); margin-bottom: 4px;">${safeTitle}</div>
                                <div class="pdf-category" style="color: var(--text-secondary); font-size: 0.9em;">${safeCategory}</div>
                                ${tagline ? `<div class="pdf-tagline" style="color: var(--text-muted); font-size: 0.85em; margin-top:6px;">${tagline}</div>` : ''}
                            </div>
                            <div class="pdf-card-icon" aria-hidden="true">📄</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Get category display name
     * @param {string} categoryId - Category ID
     * @returns {string} Display name
     */
    getCategoryName(categoryId) {
        const names = {
            'all': 'All Documents',
            'assessment': 'Assessment Tools',
            'calculators': 'Calculators',
            'management': 'Management Guidelines',
            'diagnosis': 'Diagnosis',
            'scoring': 'Scoring Systems',
            'emergency': 'Emergency',
            'anatomy': 'Anatomy',
            'other': 'Other'
        };
        return names[categoryId] || categoryId;
    }

    /**
     * Add PDF to recent list
     * @param {string} filename - PDF filename
     * @param {string} title - PDF title
     */
    addToRecent(filename, title) {
        // Remove if already exists
        this.recentPDFs = this.recentPDFs.filter(p => p.filename !== filename);

        // Add to beginning
        this.recentPDFs.unshift({
            filename: filename,
            title: title,
            timestamp: Date.now()
        });

        // Keep only last maxRecent
        if (this.recentPDFs.length > this.maxRecent) {
            this.recentPDFs = this.recentPDFs.slice(0, this.maxRecent);
        }

        // Save to storage
        storage.setItem('recentPDFs', this.recentPDFs);
    }

    /**
     * Get recent PDFs
     * @returns {Array} Recent PDFs
     */
    async getRecentPDFs() {
        return this.recentPDFs.map(recent => ({
            filename: recent.filename,
            title: recent.title,
            timestamp: recent.timestamp
        }));
    }

    /**
     * Get statistics about PDF library
     * @returns {Object} Statistics
     */
    getStatistics() {
        const categories = {};
        for (const filename of this.pdfIndex) {
            const category = this.categorizePDF(filename);
            categories[category] = (categories[category] || 0) + 1;
        }

        return {
            total: this.pdfIndex.length,
            categories: categories,
            recentCount: this.recentPDFs.length
        };
    }

    /**
     * Get manager info for statistics
     * @returns {Object} Manager info with counts
     */
    async getInfo() {
        return {
            totalPDFs: this.pdfIndex?.length || 0,
            categories: (await this.getCategories()).length,
            recent: this.recentPDFs.length
        };
    }
}

// Export singleton instance
export const pdfLibraryManager = new PDFLibraryManager();
export default PDFLibraryManager;