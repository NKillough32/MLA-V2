/**
 * PDFLibraryManager - PDF Document Library System
 * Manages PDF documents with MLA-style rendering
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';

export class PDFLibraryManager {
    constructor() {
        this.pdfIndex = null;
        this.recentPDFs = [];
        this.maxRecent = 10;
        this.initialized = false;
        this.dataLoaded = false;
        this.pdfjsLib = null;
        this.assetsBasePath = '/static/assets/';
        this.debugLogs = [];
        this.debugState = {
            pdfIndexLoaded: false,
            pdfIndexCount: 0,
            pdfjsGlobalDetected: false,
            pdfjsLoaded: false,
            workerSrc: null,
            cdnFallbackUsed: false,
            lastPDF: null,
            lastError: null
        };
        this.exposeDebugHelpers();
    }

    exposeDebugHelpers() {
        try {
            window.__PDF_DEBUG__ = {
                getState: () => ({ ...this.debugState }),
                getLogs: () => [...this.debugLogs],
                manager: this
            };
            console.debug('🐞 PDF debug helpers attached to window.__PDF_DEBUG__');
        } catch (e) {
            console.warn('⚠️ Could not attach PDF debug helpers to window', e);
        }
    }

    logDebug(message, data = null, level = 'log') {
        const entry = {
            timestamp: new Date().toISOString(),
            message,
            data
        };
        this.debugLogs.push(entry);
        if (this.debugLogs.length > 50) {
            this.debugLogs.shift();
        }

        const consoleFn = console[level] || console.log;
        try {
            consoleFn.call(console, `🐞 [PDF] ${message}`, data || '');
        } catch (e) {
            console.log(`🐞 [PDF] ${message}`);
        }

        this.renderDebugInfo();
        return entry;
    }

    updateDebugState(partial) {
        this.debugState = { ...this.debugState, ...partial };
        this.renderDebugInfo();
    }

    renderDebugInfo() {
        const panel = document.getElementById('pdf-debug-info');
        if (!panel) return;
        panel.innerHTML = this.buildDebugInfoHTML();
    }

    buildDebugInfoHTML() {
        const state = this.debugState || {};
        const statusItems = [
            { label: 'Index Loaded', value: state.pdfIndexLoaded ? `Yes (${state.pdfIndexCount})` : 'No' },
            { label: 'Global pdf.js detected', value: state.pdfjsGlobalDetected ? 'Yes' : 'No' },
            { label: 'pdf.js Loaded', value: state.pdfjsLoaded ? 'Yes' : 'No' },
            { label: 'Worker Source', value: state.workerSrc || 'Not set' },
            { label: 'CDN Fallback Used', value: state.cdnFallbackUsed ? 'Yes' : 'No' },
            { label: 'Last PDF Requested', value: state.lastPDF || 'None' },
            { label: 'Last Error', value: state.lastError || 'None' }
        ];

        const statusHtml = statusItems.map(item => `
            <div class="pdf-debug-status-row" style="display:flex; justify-content:space-between; gap:8px; padding:4px 0; border-bottom:1px solid rgba(148, 163, 184, 0.2); font-size:0.85em;">
                <span>${this.escapeHtml(item.label)}:</span>
                <strong>${this.escapeHtml(String(item.value))}</strong>
            </div>
        `).join('');

        const logs = this.debugLogs.slice(-10).reverse();
        const logsHtml = logs.length ? logs.map(log => {
            const safeMessage = this.escapeHtml(log.message || '');
            const safeData = log.data ? this.escapeHtml(typeof log.data === 'string' ? log.data : JSON.stringify(log.data)) : '';
            return `
                <li style="margin-bottom:4px;">
                    <span class="pdf-debug-timestamp" style="color: var(--v2-text-tertiary); font-size:0.75em;">${this.escapeHtml(new Date(log.timestamp).toLocaleTimeString())}</span>
                    <code style="display:block; font-family: 'SFMono-Regular', Menlo, Consolas, monospace; white-space:pre-wrap;">${safeMessage}${safeData ? ` → ${safeData}` : ''}</code>
                </li>
            `;
        }).join('') : '<li>No debug events recorded yet.</li>';

        return `
            <div class="pdf-debug-status" style="margin-bottom:10px;">${statusHtml}</div>
            <div class="pdf-debug-logs">
                <strong style="display:block; margin-bottom:6px;">Recent Events</strong>
                <ul style="list-style:none; padding-left:0; margin:0;">${logsHtml}</ul>
            </div>
        `;
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

    /**
     * Initialize the PDF library manager
     * Loads the PDF index and pdf.js library
     */
    async initialize() {
        if (this.initialized) {
            console.log('📚 PDFLibraryManager already initialized, skipping...');
            this.logDebug('initialize() called but already initialized');
            return true;
        }

        console.log('📚 Initializing PDFLibraryManager...');
        this.logDebug('Initializing PDFLibraryManager...');

        // Debug: report whether pdf.js was injected before this script runs
        try {
            const hasGlobalPdfJs = !!(typeof window !== 'undefined' && window.pdfjsLib);
            console.debug('🔍 window.pdfjsLib present?', hasGlobalPdfJs);
            this.updateDebugState({ pdfjsGlobalDetected: hasGlobalPdfJs });
        } catch (e) {
            console.debug('🔍 window access error when checking pdfjsLib', e);
            this.logDebug('window access error when checking pdfjsLib', e?.message || e, 'warn');
        }

        // Load recent PDFs from storage (lightweight)
        const stored = storage.getItem('recentPDFs');
        if (stored) {
            this.recentPDFs = stored;
        }

        // Load PDF index
        console.log('📚 Loading PDF index...');
        this.logDebug('Loading PDF index...');
        try {
            const response = await fetch('/static/assets/pdf_index.json');
            if (response.ok) {
                this.pdfIndex = await response.json();
                console.log('✅ PDF index loaded with', this.pdfIndex.length, 'documents');
                this.logDebug('PDF index loaded', { count: this.pdfIndex.length });
                this.updateDebugState({ pdfIndexLoaded: true, pdfIndexCount: this.pdfIndex.length });
            } else {
                console.warn('⚠️ PDF index not found, using empty index');
                this.pdfIndex = [];
                this.logDebug('PDF index not found, using empty index', null, 'warn');
                this.updateDebugState({ pdfIndexLoaded: false, pdfIndexCount: 0 });
            }
        } catch (error) {
            console.warn('⚠️ Error loading PDF index:', error);
            this.pdfIndex = [];
            this.logDebug('Error loading PDF index', error?.message || error, 'warn');
            this.updateDebugState({ pdfIndexLoaded: false, pdfIndexCount: 0, lastError: error?.message || 'Failed to load index' });
        }

        // Load pdf.js library — use global `window.pdfjsLib` when available,
        // otherwise load from CDN. This project is served as static files and
        // is not bundled by webpack in many deployments, so dynamic import
        // of 'pdfjs-dist/webpack' frequently fails in the browser.
        console.log('📚 Loading pdf.js library (global -> CDN fallback)...');
        this.logDebug('Loading pdf.js library (global -> CDN fallback)...');
        const CDN_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const LOCAL_WORKER = '/static/js/v2/pdf.worker.min.js';

        // Prefer a global already-loaded pdfjs (injected via index.html or service)
        this.pdfjsLib = (typeof window !== 'undefined' && window.pdfjsLib) ? window.pdfjsLib : null;

        if (!this.pdfjsLib) {
            try {
                console.debug('🔁 pdfjsLib not found; attempting CDN load');
                this.logDebug('Global pdf.js not found; attempting CDN load');
                await this.loadPdfJsFromCDN();
                this.pdfjsLib = window.pdfjsLib || null;
                console.debug('🔍 After CDN load: window.pdfjsLib present?', !!this.pdfjsLib);
                this.updateDebugState({ pdfjsLoaded: !!this.pdfjsLib, cdnFallbackUsed: true });
            } catch (cdnError) {
                console.error('❌ Failed to load pdf.js from CDN:', cdnError);
                this.pdfjsLib = null;
                this.logDebug('Failed to load pdf.js from CDN', cdnError?.message || cdnError, 'error');
                this.updateDebugState({ pdfjsLoaded: false, lastError: cdnError?.message || 'CDN load failed' });
            }
        } else {
            console.log('✅ Using existing global pdfjsLib');
            this.logDebug('Using existing global pdfjsLib');
            this.updateDebugState({ pdfjsLoaded: true });
        }

        // Set workerSrc: prefer a local bundled worker if present, else CDN worker
        try {
            // TEMPORARY: force worker to CDN to rule out local shim issues
            if (this.pdfjsLib && this.pdfjsLib.GlobalWorkerOptions) {
                this.pdfjsLib.GlobalWorkerOptions.workerSrc = CDN_WORKER; // temporarily point to CDN
                console.debug('🔧 (TEMP) Set pdfjsLib.GlobalWorkerOptions.workerSrc ->', CDN_WORKER);
                this.updateDebugState({ workerSrc: CDN_WORKER });
            }
            // Also defensively update window.pdfjsLib if present
            if (typeof window !== 'undefined' && window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) {
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = CDN_WORKER; // temporarily point to CDN
                console.debug('🔧 (TEMP) Set window.pdfjsLib.GlobalWorkerOptions.workerSrc ->', CDN_WORKER);
                this.updateDebugState({ workerSrc: CDN_WORKER });
            }
        } catch (e) {
            console.warn('⚠️ Could not set workerSrc on pdfjsLib (temporary CDN override):', e);
            this.logDebug('Could not set workerSrc on pdfjsLib', e?.message || e, 'warn');
        }

        this.initialized = true;
        console.log('✅ PDFLibraryManager initialized');
        this.logDebug('PDFLibraryManager initialized');

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
        this.logDebug('loadPdfJsFromCDN() invoked');
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
                        this.updateDebugState({ workerSrc: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js' });
                    }
                } catch (e) {
                    console.warn('⚠️ Could not set workerSrc after CDN pdf.js load:', e);
                    this.logDebug('Could not set workerSrc after CDN pdf.js load', e?.message || e, 'warn');
                }
                console.log('✅ pdf.js loaded from CDN');
                this.logDebug('pdf.js loaded from CDN');
                resolve();
            };
            script.onerror = (e) => {
                console.error('❌ Failed to load pdf.min.js from CDN', e);
                this.logDebug('Failed to load pdf.min.js from CDN', e?.message || e, 'error');
                reject(new Error('Failed to load pdf.min.js from CDN'));
            };
            document.head.appendChild(script);
        });
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
                    title: this.formatPDFTitle(filename),
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
            { id: 'other', name: 'Other', icon: '📄', count: 0 }
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
                title: this.formatPDFTitle(filename),
                category: this.categorizePDF(filename)
            }));
        }

        return this.pdfIndex
            .filter(filename => this.categorizePDF(filename) === categoryId)
            .map(filename => ({
                filename: filename,
                title: this.formatPDFTitle(filename),
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
        // Remove 'info.pdf' suffix and format
        let title = filename.replace(/info\.pdf$/i, '').replace(/\.pdf$/i, '');

        // Replace common abbreviations
        const abbreviations = {
            'Mx': 'Management',
            'Ax': 'Assessment',
            'GCS': 'Glasgow Coma Scale',
            'NIHSS': 'NIH Stroke Scale',
            'ABG': 'Arterial Blood Gas',
            'ECG': 'Electrocardiogram',
            'CXR': 'Chest X-Ray',
            'AXR': 'Abdominal X-Ray',
            'CT': 'CT Scan',
            'MRI': 'MRI Scan',
            'IV': 'Intravenous',
            'IM': 'Intramuscular',
            'PO': 'Oral',
            'PR': 'Rectal',
            'SC': 'Subcutaneous',
            'MSK': 'Musculoskeletal',
            'CV': 'Cardiovascular',
            'GI': 'Gastrointestinal',
            'GU': 'Genitourinary',
            'ENT': 'Ear Nose Throat',
            'COPD': 'Chronic Obstructive Pulmonary Disease',
            'CHF': 'Congestive Heart Failure',
            'MI': 'Myocardial Infarction',
            'PE': 'Pulmonary Embolism',
            'DVT': 'Deep Vein Thrombosis',
            'AKI': 'Acute Kidney Injury',
            'CKD': 'Chronic Kidney Disease',
            'UTI': 'Urinary Tract Infection',
            'SOB': 'Shortness of Breath',
            'CP': 'Chest Pain',
            'NVD': 'Nausea Vomiting Diarrhea',
            'BM': 'Bowel Movement',
            'PR': 'Per Rectum',
            'PV': 'Per Vaginam',
            'PID': 'Pelvic Inflammatory Disease',
            'STI': 'Sexually Transmitted Infection',
            'HIV': 'Human Immunodeficiency Virus',
            'AIDS': 'Acquired Immune Deficiency Syndrome',
            'DM': 'Diabetes Mellitus',
            'HTN': 'Hypertension',
            'CAD': 'Coronary Artery Disease',
            'PAD': 'Peripheral Artery Disease',
            'CVA': 'Cerebrovascular Accident',
            'TIA': 'Transient Ischemic Attack',
            'MS': 'Multiple Sclerosis',
            'ALS': 'Amyotrophic Lateral Sclerosis',
            'IBS': 'Irritable Bowel Syndrome',
            'IBD': 'Inflammatory Bowel Disease',
            'GERD': 'Gastroesophageal Reflux Disease',
            'PUD': 'Peptic Ulcer Disease',
            'BPH': 'Benign Prostatic Hyperplasia',
            'PSA': 'Prostate Specific Antigen',
            'CA': 'Cancer',
            ' mets': ' metastases',
            'Sx': 'Symptoms',
            'Tx': 'Treatment',
            'Rx': 'Prescription',
            'Hx': 'History',
            'Px': 'Prophylaxis',
            'Dx': 'Diagnosis',
            'Fx': 'Fracture',
            'Tx': 'Transfusion'
        };

        // Replace abbreviations
        for (const [abbr, full] of Object.entries(abbreviations)) {
            title = title.replace(new RegExp(abbr, 'gi'), full);
        }

        // Add spaces before capital letters (camelCase to Title Case)
        title = title.replace(/([a-z])([A-Z])/g, '$1 $2');

        // Capitalize first letter of each word
        title = title.replace(/\b\w/g, l => l.toUpperCase());

        // Clean up multiple spaces
        title = title.replace(/\s+/g, ' ').trim();

        return title;
    }

    /**
     * Render PDF to MLA-style HTML
     * @param {string} filename - PDF filename
     * @returns {string} HTML content
     */
    async renderPDFToHTML(filename) {
        const url = this.getPDFUrl(filename);
        const safeFilenameAttr = this.escapeHtmlAttribute(filename);
        const safeDisplayTitle = this.escapeHtml(this.formatPDFTitle(filename));

        this.logDebug('renderPDFToHTML invoked', { filename, url });
        this.updateDebugState({ lastPDF: filename });

        if (!url) {
            console.error('Unable to construct PDF URL for', filename);
            this.logDebug('Unable to construct PDF URL', { filename }, 'error');
            return this.renderPDFFallback(filename, safeDisplayTitle);
        }

        if (!this.pdfjsLib) {
            console.warn('pdf.js library not loaded, using browser PDF fallback for', filename);
            this.logDebug('pdf.js not loaded; using fallback', { filename }, 'warn');
            eventBus.emit('PDF_RENDER_FALLBACK', { filename, reason: 'pdfjs_missing' });
            return this.renderPDFFallback(filename, safeDisplayTitle, url);
        }

        eventBus.emit('PDF_LOADING', { filename });

        try {
            const pdf = await this.pdfjsLib.getDocument(url).promise;
            this.logDebug('PDF loaded via pdf.js', { filename, pages: pdf.numPages });
            let html = '';

            eventBus.emit('PDF_LOADED', { filename, pages: pdf.numPages });

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                const text = textContent.items.map(item => item.str).join(' ');

                // Skip empty pages
                if (!text.trim()) continue;

                html += `
                    <div class="card pdf-page-card" style="margin-bottom: 20px;">
                        <div class="q-header">
                            <h2 style="font-size: 1.4em; margin: 0;">📄 ${safeDisplayTitle} - Page ${pageNum}</h2>
                        </div>
                        <div class="card-body q-text" style="line-height: 1.6;">
                            <div class="pdf-content" style="white-space: pre-wrap; font-family: inherit;">
                                ${this.formatPDFText(text)}
                            </div>
                        </div>
                    </div>
                `;

                eventBus.emit('PDF_PAGE_RENDERED', { filename, pageNum, totalPages: pdf.numPages });
            }

            eventBus.emit('PDF_RENDERED', { filename, pages: pdf.numPages });

            return html;

        } catch (error) {
            console.error('Error rendering PDF:', error);
            eventBus.emit('PDF_ERROR', { filename, error: error.message });
            this.logDebug('Error rendering PDF', { filename, error: error?.message || error }, 'error');
            this.updateDebugState({ lastError: error?.message || 'Unknown PDF render error' });

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
                const fallbackHtml = this.renderPDFFallback(filename, safeDisplayTitle, url);
                if (fallbackHtml) {
                    console.warn('Using browser PDF fallback due to rendering error for', filename);
                    this.logDebug('Using browser PDF fallback due to rendering error', { filename }, 'warn');
                    eventBus.emit('PDF_RENDER_FALLBACK', { filename, reason: 'render_error' });
                    return fallbackHtml;
                }
            } catch (fallbackError) {
                console.error('Failed to build PDF fallback UI:', fallbackError);
                this.logDebug('Failed to build PDF fallback UI', fallbackError?.message || fallbackError, 'error');
            }
            const safeErrorTitle = this.escapeHtml(this.formatPDFTitle(filename));
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

        this.logDebug('renderPDFFallback invoked', { filename, url: pdfUrl });

        const safeUrl = this.escapeHtmlAttribute(`${pdfUrl}#view=FitH`);
        const safeDownloadUrl = this.escapeHtmlAttribute(pdfUrl);
        const safeTitle = this.escapeHtml(displayTitle || this.formatPDFTitle(filename));

        return `
            <div class="card pdf-fallback" style="padding: 20px;">
                <div class="q-header" style="margin-bottom: 16px;">
                    <h2 style="margin: 0; font-size: 1.3em;">📄 ${safeTitle}</h2>
                    <p style="margin: 8px 0 0; color: var(--text-secondary); font-size: 0.95em;">
                        Displaying using the browser's built-in PDF viewer.
                    </p>
                </div>
                <div class="card-body" style="padding: 0;">
                    <iframe src="${safeUrl}" style="width: 100%; min-height: 70vh; border: 1px solid var(--border); border-radius: 8px; background: #fff;" title="${safeTitle}" loading="lazy"></iframe>
                </div>
                <div style="margin-top: 16px; display: flex; gap: 10px; flex-wrap: wrap;">
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

        const safeTitle = this.escapeHtml(this.formatPDFTitle(filename));
        const safeFilenameAttr = this.escapeHtmlAttribute(filename);

        this.logDebug('showPDF called', { filename });
        this.updateDebugState({ lastPDF: filename });

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
                <button class="back-btn" onclick="window.quizApp.loadPDFLibraryContent(document.getElementById('pdf-library-panel'));" style="margin-bottom: 20px; padding: 10px 20px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; cursor: pointer;">
                    ← Back to PDF Library
                </button>
                <div class="pdf-content-container">
                    ${html}
                </div>
            `;

            // Add to recent PDFs
            this.addToRecent(filename, this.formatPDFTitle(filename));

            // Scroll to top
            container.scrollTop = 0;
            window.scrollTo(0, 0);

        } catch (error) {
            const safeErrorMessage = this.escapeHtml(error.message || '');
            this.logDebug('showPDF error', { filename, error: error?.message || error }, 'error');
            container.innerHTML = `
                <button class="back-btn" onclick="window.quizApp.loadPDFLibraryContent(document.getElementById('pdf-library-panel'));" style="margin-bottom: 20px; padding: 10px 20px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; cursor: pointer;">
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
                <input type="text" id="pdf-search" placeholder="Search PDFs..." class="tool-search">
                <button id="pdf-search-btn">🔍</button>
            </div>
            <div class="pdf-debugger" style="margin-bottom: 12px;">
                <button id="pdf-debug-toggle" class="pdf-debug-toggle" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 999px; border: 1px dashed var(--v2-border); background: transparent; color: var(--v2-text-secondary); cursor: pointer; font-size: 0.9em;">
                    🐞 Show PDF Debug Info
                </button>
                <div id="pdf-debug-info" class="pdf-debug-info" style="display: none; margin-top: 8px; font-family: 'SFMono-Regular', Menlo, Consolas, monospace; font-size: 0.8em; background: var(--v2-bg-elevated); border: 1px dashed var(--v2-border); border-radius: 12px; padding: 12px; line-height: 1.5;">
                    <div style="color: var(--v2-text-tertiary);">No debug data yet.</div>
                </div>
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

        const debugToggle = document.getElementById('pdf-debug-toggle');
        const debugInfo = document.getElementById('pdf-debug-info');
        if (debugToggle && debugInfo) {
            debugToggle.addEventListener('click', () => {
                const isHidden = debugInfo.style.display === 'none';
                debugInfo.style.display = isHidden ? 'block' : 'none';
                debugToggle.textContent = isHidden ? '🐞 Hide PDF Debug Info' : '🐞 Show PDF Debug Info';
                debugToggle.setAttribute('aria-expanded', String(isHidden));
                if (isHidden) {
                    this.renderDebugInfo();
                }
            });
        }

        this.renderDebugInfo();

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
            return `
                <div class="card pdf-card" onclick="window.pdfLibraryManager.showPDF('${safeFilename}');" style="cursor: pointer; margin-bottom: 10px;">
                    <div class="card-body" style="padding: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div class="pdf-title" style="font-weight: 600; font-size: 1.1em; color: var(--text-primary); margin-bottom: 4px;">${safeTitle}</div>
                                <div class="pdf-category" style="color: var(--text-secondary); font-size: 0.9em;">${safeCategory}</div>
                            </div>
                            <div style="font-size: 1.5em;">📄</div>
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