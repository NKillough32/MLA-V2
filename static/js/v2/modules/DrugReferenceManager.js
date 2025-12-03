/**
 * Drug Reference Manager
 * Manages drug database, search, categories, and voice recognition
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';

export class DrugReferenceManager {
    constructor() {
        this.eventBus = eventBus;
        this.storage = storage;
        this.drugDatabase = null;
        this.recognition = null;
        this.recentDrugs = [];
        this.initialized = false;
        this.dataLoaded = false;
        this.bnfValidationCache = new Map();
        this.enableBnfValidation = false;
        this.hasLoggedValidationSkip = false;
    }

    normalizeDrugNameForLink(drugName) {
        if (!drugName) return '';

        // If the drug name ends with an abbreviation in parentheses (e.g. "Adrenaline (E)"),
        // drop the abbreviation so the link is built from the core drug name.
        const trimmed = drugName.trim();
        const abbreviationPattern = /^(.+?)\s+\(([A-Za-z0-9]{1,6})\)$/;
        const match = trimmed.match(abbreviationPattern);

        if (match) {
            return match[1].trim();
        }

        return drugName;
    }

    buildBnfUrl(drugName) {
        if (!drugName) return '';

        const normalizedName = this.normalizeDrugNameForLink(drugName);

        // Manual overrides for drugs that don't match the BNF slug pattern
        // Includes combination drugs, brand names, and common aliases
        const overrides = {
            // Combination drugs (brand name -> BNF component format)
            'adcal d3': 'colecalciferol-with-calcium-carbonate',
            'adcal d3 calcium carbonate colecalciferol': 'colecalciferol-with-calcium-carbonate',
            'calceos': 'colecalciferol-with-calcium-carbonate',
            'calcichew d3': 'colecalciferol-with-calcium-carbonate',
            'calcichew d3 forte': 'colecalciferol-with-calcium-carbonate',
            
            // Co-prefixed combination drugs
            'co amoxiclav': 'co-amoxiclav',
            'co amoxiclav amoxicillin clavulanic acid': 'co-amoxiclav',
            'augmentin': 'co-amoxiclav',
            'co codamol': 'co-codamol',
            'co codamol codeine paracetamol': 'co-codamol',
            'co dydramol': 'co-dydramol',
            'co dydramol dihydrocodeine paracetamol': 'co-dydramol',
            'co trimoxazole': 'co-trimoxazole',
            'co trimoxazole sulfamethoxazole trimethoprim': 'co-trimoxazole',
            'co beneldopa': 'co-beneldopa',
            'co careldopa': 'co-careldopa',
            'sinemet': 'co-careldopa',
            'co cyprindiol': 'co-cyprindiol',
            'dianette': 'co-cyprindiol',
            'co fluampicil': 'co-fluampicil',
            'co flumactone': 'co-flumactone',
            'co magaldrox': 'co-magaldrox',
            'co phenotrope': 'co-phenotrope',
            'lomotil': 'co-phenotrope',
            'co simalcite': 'co-simalcite',
            'co zidocapt': 'co-zidocapt',
            
            // Insulin products
            'insulin lispro': 'insulin-lispro',
            'humalog': 'insulin-lispro',
            'insulin aspart': 'insulin-aspart',
            'novorapid': 'insulin-aspart',
            'insulin glulisine': 'insulin-glulisine',
            'apidra': 'insulin-glulisine',
            'insulin glargine': 'insulin-glargine',
            'lantus': 'insulin-glargine',
            'insulin detemir': 'insulin-detemir',
            'levemir': 'insulin-detemir',
            'insulin degludec': 'insulin-degludec',
            'tresiba': 'insulin-degludec',
            
            // Adrenaline/epinephrine variants
            'adrenaline': 'adrenaline-epinephrine',
            'epinephrine': 'adrenaline-epinephrine',
            'epipen': 'adrenaline-epinephrine',
            'emerade': 'adrenaline-epinephrine',
            'jext': 'adrenaline-epinephrine',
            
            // Common aliases
            'glyceryl trinitrate gtn': 'glyceryl-trinitrate',
            'glyceryl trinitrate': 'glyceryl-trinitrate',
            'gtn': 'glyceryl-trinitrate',
            'hydrocortisone 1': 'hydrocortisone',
            'hydrocortisone 1%': 'hydrocortisone',
            'salbutamol': 'salbutamol',
            'ventolin': 'salbutamol',
            'paracetamol': 'paracetamol',
            'calpol': 'paracetamol',
            'ibuprofen': 'ibuprofen',
            'nurofen': 'ibuprofen',
            'omeprazole': 'omeprazole',
            'losec': 'omeprazole',
            'lansoprazole': 'lansoprazole',
            'zoton': 'lansoprazole',
            'metformin': 'metformin',
            'glucophage': 'metformin',
            'atorvastatin': 'atorvastatin',
            'lipitor': 'atorvastatin',
            'simvastatin': 'simvastatin',
            'zocor': 'simvastatin',
            'ramipril': 'ramipril',
            'tritace': 'ramipril',
            'amlodipine': 'amlodipine',
            'istin': 'amlodipine',
            'bisoprolol': 'bisoprolol',
            'cardicor': 'bisoprolol',
            'levothyroxine': 'levothyroxine-sodium',
            'levothyroxine sodium': 'levothyroxine-sodium'
        };

        const overrideKey = normalizedName
            .toLowerCase()
            .replace(/['']/g, '')
            .replace(/[^a-z0-9]+/g, ' ')
            .trim();

        if (overrides[overrideKey]) {
            return `https://bnf.nice.org.uk/drugs/${overrides[overrideKey]}/`;
        }

        // Handle combination drugs with "+" in the name (e.g., "Calcium Carbonate + Colecalciferol")
        // BNF uses format like "colecalciferol-with-calcium-carbonate"
        if (normalizedName.includes('+')) {
            const parts = normalizedName.split('+').map(p => p.trim().toLowerCase());
            if (parts.length === 2) {
                // Try both orderings as BNF sometimes uses different component order
                const slug1 = `${parts[0].replace(/\s+/g, '-')}-with-${parts[1].replace(/\s+/g, '-')}`;
                const slug2 = `${parts[1].replace(/\s+/g, '-')}-with-${parts[0].replace(/\s+/g, '-')}`;
                // Return the first variant - could add validation later
                return `https://bnf.nice.org.uk/drugs/${encodeURIComponent(slug1)}/`;
            }
        }

        const normalized = normalizedName
            .toLowerCase()
            // Remove parenthetical content like acronyms "(GTN)" or component names "(Calcium...)"
            .replace(/\([^)]*\)/g, ' ')
            .replace(/\b\d+(\.\d+)?\s*%/g, ' ')
            .replace(/\b\d+(\.\d+)?\s*(mg|mcg|g|ml|units)\b/g, ' ')
            .replace(/['']/g, '')
            .replace(/[^a-z0-9\s\-]/g, ' ')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        return normalized ? `https://bnf.nice.org.uk/drugs/${encodeURIComponent(normalized)}/` : '';
    }

    /**
     * Build a BNF search URL as a fallback when direct drug page might not exist
     * @param {string} drugName - The drug name to search for
     * @returns {string} BNF search URL
     */
    buildBnfSearchUrl(drugName) {
        if (!drugName) return '';
        const searchTerm = this.normalizeDrugNameForLink(drugName)
            .replace(/\([^)]*\)/g, '') // Remove parenthetical content
            .trim();
        return `https://bnf.nice.org.uk/search/?q=${encodeURIComponent(searchTerm)}`;
    }

    /**
     * Get both direct and search BNF URLs for a drug
     * @param {string} drugName - The drug name
     * @returns {{directUrl: string, searchUrl: string, isOverride: boolean}}
     */
    getBnfUrls(drugName) {
        const directUrl = this.buildBnfUrl(drugName);
        const searchUrl = this.buildBnfSearchUrl(drugName);
        
        // Check if this drug has a manual override (higher confidence)
        const normalizedName = this.normalizeDrugNameForLink(drugName);
        const overrideKey = normalizedName
            .toLowerCase()
            .replace(/['']/g, '')
            .replace(/[^a-z0-9]+/g, ' ')
            .trim();
        
        // These are verified overrides from buildBnfUrl
        const verifiedOverrides = [
            'adcal d3', 'calceos', 'calcichew d3', 'co amoxiclav', 'augmentin',
            'co codamol', 'co dydramol', 'co trimoxazole', 'sinemet', 'dianette',
            'lomotil', 'humalog', 'novorapid', 'apidra', 'lantus', 'levemir',
            'tresiba', 'adrenaline', 'epinephrine', 'epipen', 'gtn', 'ventolin',
            'calpol', 'nurofen', 'losec', 'zoton', 'glucophage', 'lipitor',
            'zocor', 'tritace', 'istin', 'cardicor', 'levothyroxine'
        ];
        
        const isOverride = verifiedOverrides.some(v => overrideKey.includes(v));
        
        return { directUrl, searchUrl, isOverride };
    }

    withBnfLink(drugKey, drug) {
        if (!drug) return null;

        const bnfUrl = drug.bnfUrl || this.buildBnfUrl(drug.name || drugKey);
        return { key: drugKey, ...drug, bnfUrl };
    }

    async withValidatedBnfLink(drugKey, drug) {
        const enrichedDrug = this.withBnfLink(drugKey, drug);
        if (!enrichedDrug || !enrichedDrug.bnfUrl) return enrichedDrug;

        const isValid = await this.validateBnfUrl(enrichedDrug.bnfUrl);
        return {
            ...enrichedDrug,
            bnfUrl: isValid ? enrichedDrug.bnfUrl : ''
        };
    }

    async validateBnfUrl(bnfUrl) {
        if (!bnfUrl) return false;

        if (!this.enableBnfValidation) {
            if (!this.hasLoggedValidationSkip) {
                console.info('ℹ️ Skipping BNF link validation (disabled to avoid CORS failures)');
                this.hasLoggedValidationSkip = true;
            }
            this.bnfValidationCache.set(bnfUrl, true);
            return true;
        }

        if (this.bnfValidationCache.has(bnfUrl)) {
            const cached = this.bnfValidationCache.get(bnfUrl);
            if (typeof cached === 'boolean') return cached;
            return cached;
        }

        const validationPromise = (async () => {
            try {
                let isValid = await this.checkBnfUrl(bnfUrl, 'HEAD');
                if (!isValid) {
                    isValid = await this.checkBnfUrl(bnfUrl, 'GET');
                }

                this.bnfValidationCache.set(bnfUrl, isValid);
                return isValid;
            } catch (error) {
                console.warn('⚠️ Error validating BNF link', bnfUrl, error);
                // If validation fails due to network/CORS, preserve the link instead of blocking it
                this.bnfValidationCache.set(bnfUrl, true);
                return true;
            }
        })();

        this.bnfValidationCache.set(bnfUrl, validationPromise);
        return validationPromise;
    }

    async checkBnfUrl(url, method = 'HEAD') {
        const response = await fetch(url, {
            method,
            redirect: 'follow'
        });
        return response.ok && response.status < 400;
    }

    async initialize() {
        if (this.initialized) {
            console.log('🏥 DrugReferenceManager already initialized, skipping...');
            return;
        }

        console.log('🏥 Initializing DrugReferenceManager...');
        
        // Load recent drugs from storage (lightweight)
        this.recentDrugs = this.storage.getItem('recentDrugs', []);
        
        // Load drug database immediately with retry mechanism
        console.log('🏥 Loading drug database...');
        
        // Retry up to 5 times with 100ms delay to ensure window.drugDatabase is available
        let retries = 0;
        const maxRetries = 5;
        
        while (retries < maxRetries) {
            if (typeof window.drugDatabase !== 'undefined') {
                this.drugDatabase = window.drugDatabase;
                console.log(`✅ Drug database loaded: ${Object.keys(this.drugDatabase).length} drugs`);
                break;
            } else {
                retries++;
                console.log(`⏳ Waiting for drug database... (attempt ${retries}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
        
        if (!this.drugDatabase) {
            console.warn('⚠️ Drug database not loaded after retries. Using empty database.');
            this.drugDatabase = {};
        }

        this.dataLoaded = true;
        
        this.eventBus.emit('DRUG_MANAGER_READY', { 
            drugCount: Object.keys(this.drugDatabase).length,
            lazyLoaded: false
        });
        
        this.eventBus.emit('DRUG_DATA_LOADED', { 
            drugCount: Object.keys(this.drugDatabase).length 
        });
        
        this.initialized = true;
        console.log('✅ DrugReferenceManager initialized with data loaded');
    }



    /**
     * Search drugs by name, class, or indication
     */
    async searchDrugs(query) {
        
        if (!this.drugDatabase) return [];
        
        const lowerQuery = query.toLowerCase().trim();
        if (lowerQuery.length < 2) return [];

        const matches = Object.entries(this.drugDatabase).filter(([key, drug]) => {
            return key.toLowerCase().includes(lowerQuery) ||
                   drug.name.toLowerCase().includes(lowerQuery) ||
                   drug.class.toLowerCase().includes(lowerQuery) ||
                   (drug.indication && drug.indication.toLowerCase().includes(lowerQuery));
        });

        // Sort by relevance (exact name match first, then starts with, then contains)
        matches.sort(([keyA, drugA], [keyB, drugB]) => {
            const nameA = drugA.name.toLowerCase();
            const nameB = drugB.name.toLowerCase();
            
            if (nameA === lowerQuery) return -1;
            if (nameB === lowerQuery) return 1;
            if (nameA.startsWith(lowerQuery)) return -1;
            if (nameB.startsWith(lowerQuery)) return 1;
            return nameA.localeCompare(nameB);
        });

        this.eventBus.emit('DRUG_SEARCHED', { query, resultCount: matches.length });

        const drugsWithLinks = await Promise.all(
            matches.map(([key, drug]) => this.withValidatedBnfLink(key, drug))
        );

        return drugsWithLinks.filter(drug => drug !== null);
    }

    /**
     * Drug interaction checker - NEW FEATURE
     */
    async checkDrugInteractions(drugNames) {
        const interactions = [];
        const drugs = [];
        
        for (const name of drugNames) {
            const searchResults = await this.searchDrugs(name);
            const drug = searchResults.find(d => d.name.toLowerCase() === name.toLowerCase());
            if (drug) drugs.push(drug);
        }

        for (let i = 0; i < drugs.length; i++) {
            for (let j = i + 1; j < drugs.length; j++) {
                const drug1 = drugs[i];
                const drug2 = drugs[j];
                
                // Check if drug1's interactions mention drug2's class or name
                if (drug1.interactions && (
                    drug1.interactions.toLowerCase().includes(drug2.class.toLowerCase()) ||
                    drug1.interactions.toLowerCase().includes(drug2.name.toLowerCase())
                )) {
                    interactions.push({
                        drugs: [drug1.name, drug2.name],
                        severity: this.assessInteractionSeverity(drug1.interactions),
                        description: drug1.interactions
                    });
                }
            }
        }
        
        return interactions;
    }

    /**
     * Pregnancy safety checker - NEW FEATURE
     */
    async checkPregnancySafety(drugName) {
        const searchResults = await this.searchDrugs(drugName);
        const drug = searchResults[0];
        if (!drug || !drug.pregnancy) return null;

        const safetyLevel = this.categorizePregancySafety(drug.pregnancy);
        return {
            drug: drug.name,
            safety: safetyLevel,
            details: drug.pregnancy,
            recommendation: this.getPregnancyRecommendation(safetyLevel)
        };
    }

    /**
     * Dosing calculator with weight/age adjustments - NEW FEATURE
     */
    async calculateDosing(drugName, patientWeight, patientAge, indication = 'standard') {
        const searchResults = await this.searchDrugs(drugName);
        const drug = searchResults[0];
        if (!drug) return null;

        return {
            drug: drug.name,
            standardDose: drug.dosing,
            adjustedDose: this.adjustDoseForPatient(drug, patientWeight, patientAge),
            maxDose: this.calculateMaxDose(drug, patientWeight),
            renalAdjustment: drug.renalDoseAdjustments || this.checkRenalAdjustment(drug),
            hepaticAdjustment: drug.hepaticDoseAdjustments || this.checkHepaticAdjustment(drug),
            stewardshipAdvice: drug.antimicrobialStewardship || '',
            treatmentDuration: drug.treatmentDuration || '',
            ivToOralSwitch: drug.ivToOralSwitch || '',
            therapeuticMonitoring: drug.therapeuticDrugMonitoring || ''
        };
    }

    /**
     * Get drugs by category
     */
    async getDrugsByCategory(category) {
        
        if (!this.drugDatabase) return [];

        const drugs = Object.entries(this.drugDatabase);

        if (category === 'all' || category === 'alphabetical') {
            const enrichedDrugs = await Promise.all(
                drugs.map(([key, drug]) => this.withValidatedBnfLink(key, drug))
            );

            return enrichedDrugs
                .filter(drug => drug !== null)
                .sort((a, b) => a.name.localeCompare(b.name));
        }

        // Category filters
        const filters = {
            analgesics: (drug) => {
                const drugClass = drug.class.toLowerCase();
                const drugName = drug.name.toLowerCase();
                return drugClass.includes('analgesic') || drugClass.includes('nsaid') || 
                       drugClass.includes('opioid') || drugName.includes('paracetamol') ||
                       drugName.includes('ibuprofen') || drugName.includes('morphine') ||
                       drugName.includes('codeine') || drugName.includes('tramadol');
            },
            antibiotics: (drug) => {
                const drugClass = drug.class.toLowerCase();
                return drugClass.includes('antibiotic') || drugClass.includes('penicillin') || 
                       drugClass.includes('macrolide') || drugClass.includes('cephalosporin') ||
                       drugClass.includes('quinolone') || drugClass.includes('tetracycline');
            },
            cardiovascular: (drug) => {
                const drugClass = drug.class.toLowerCase();
                return drugClass.includes('statin') || drugClass.includes('ace inhibitor') ||
                       drugClass.includes('beta-blocker') || drugClass.includes('diuretic') ||
                       drugClass.includes('calcium channel') || drugClass.includes('anticoagulant') ||
                       drugClass.includes('antiplatelet') || drugClass.includes('cardiac');
            },
            'mental-health': (drug) => {
                const drugClass = drug.class.toLowerCase();
                return drugClass.includes('antidepressant') || drugClass.includes('ssri') ||
                       drugClass.includes('anxiolytic') || drugClass.includes('antipsychotic') ||
                       drugClass.includes('benzodiazepine') || drugClass.includes('mood stabilizer');
            },
            respiratory: (drug) => {
                const drugClass = drug.class.toLowerCase();
                return drugClass.includes('bronchodilator') || drugClass.includes('corticosteroid') ||
                       drugClass.includes('beta-2 agonist') || drugClass.includes('anticholinergic');
            },
            endocrine: (drug) => {
                const drugClass = drug.class.toLowerCase();
                return drugClass.includes('antidiabetic') || drugClass.includes('thyroid') ||
                       drugClass.includes('insulin') || drugClass.includes('hormone');
            },
            emergency: (drug) => {
                const drugClass = drug.class.toLowerCase();
                const drugName = drug.name.toLowerCase();
                return drugClass.includes('emergency') || drugClass.includes('antidote') ||
                       drugName.includes('adrenaline') || drugName.includes('naloxone') ||
                       drugName.includes('atropine') || drugName.includes('glucagon');
            },
            gastro: (drug) => {
                const drugClass = drug.class.toLowerCase();
                return drugClass.includes('proton pump') || drugClass.includes('antiemetic') ||
                       drugClass.includes('laxative') || drugClass.includes('antidiarrhoeal');
            },
            neuro: (drug) => {
                const drugClass = drug.class.toLowerCase();
                return drugClass.includes('anticonvulsant') || drugClass.includes('antiepilep') ||
                       drugClass.includes('neuropathic') || drugClass.includes('triptan');
            }
        };

        const filter = filters[category];
        if (!filter) return [];

        const filteredDrugs = drugs
            .filter(([, drug]) => filter(drug));

        const enrichedDrugs = await Promise.all(
            filteredDrugs.map(([key, drug]) => this.withValidatedBnfLink(key, drug))
        );

        return enrichedDrugs
            .filter(drug => drug !== null)
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    /**
     * Get drug details by key
     */
    async getDrug(drugKey) {
        
        if (!this.drugDatabase || !this.drugDatabase[drugKey]) return null;
        
        // Add to recent drugs
        this.addToRecent(drugKey);
        
        this.eventBus.emit('DRUG_VIEWED', { drugKey, drug: this.drugDatabase[drugKey] });
        
        return this.withValidatedBnfLink(drugKey, this.drugDatabase[drugKey]);
    }

    /**
     * Add drug to recent history
     */
    addToRecent(drugKey) {
        // Ensure recentDrugs is an array
        if (!Array.isArray(this.recentDrugs)) {
            this.recentDrugs = [];
        }
        
        // Remove if already exists
        this.recentDrugs = this.recentDrugs.filter(key => key !== drugKey);
        
        // Add to front
        this.recentDrugs.unshift(drugKey);
        
        // Keep only last 10
        this.recentDrugs = this.recentDrugs.slice(0, 10);
        
        this.storage.setItem('recentDrugs', this.recentDrugs);
    }

    /**
     * Get recent drugs
     */
    async getRecentDrugs() {
        // Ensure recentDrugs is an array
        if (!Array.isArray(this.recentDrugs)) {
            this.recentDrugs = [];
        }
        
        const recentWithLinks = await Promise.all(
            this.recentDrugs.map(key => this.withValidatedBnfLink(key, this.drugDatabase[key]))
        );

        return recentWithLinks.filter(drug => drug !== null);
    }

    /**
     * Start voice recognition for drug search
     */
    startVoiceSearch() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            this.eventBus.emit('DRUG_VOICE_ERROR', { 
                error: 'Voice search not supported in this browser' 
            });
            return false;
        }

        // Stop existing recognition
        this.stopVoiceSearch();

        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'en-US';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;

        this.recognition.onstart = () => {
            this.eventBus.emit('DRUG_VOICE_STARTED');
        };

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.eventBus.emit('DRUG_VOICE_RESULT', { transcript });
        };

        this.recognition.onerror = (event) => {
            this.eventBus.emit('DRUG_VOICE_ERROR', { error: event.error });
        };

        this.recognition.onend = () => {
            this.eventBus.emit('DRUG_VOICE_ENDED');
            this.recognition = null;
        };

        try {
            this.recognition.start();
            return true;
        } catch (error) {
            console.error('Voice recognition error:', error);
            return false;
        }
    }

    /**
     * Stop voice recognition
     */
    stopVoiceSearch() {
        if (this.recognition) {
            try {
                this.recognition.stop();
            } catch (error) {
                console.error('Error stopping voice recognition:', error);
            }
            this.recognition = null;
        }
    }

    /**
     * Speak drug name using text-to-speech
     */
    speakDrugName(drugName) {
        const synth = window.speechSynthesis;
        
        if (!synth) {
            console.warn('Text-to-speech not supported');
            return false;
        }

        // Cancel any existing speech
        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(drugName);
        
        // Try to use English voice
        const voices = synth.getVoices();
        const englishVoice = voices.find(v => /en[-_]?(us|gb)/i.test(v.lang));
        if (englishVoice) {
            utterance.voice = englishVoice;
        }
        
        utterance.rate = 0.95;
        utterance.pitch = 1;

        synth.speak(utterance);
        
        this.eventBus.emit('DRUG_NAME_SPOKEN', { drugName });
        
        return true;
    }

    /**
     * Get all drug categories
     */
    getCategories() {
        return [
            { id: 'all', name: 'All Drugs', icon: '💊' },
            { id: 'alphabetical', name: 'A-Z', icon: '🔤' },
            { id: 'analgesics', name: 'Pain Management', icon: '💉' },
            { id: 'antibiotics', name: 'Antibiotics', icon: '🦠' },
            { id: 'cardiovascular', name: 'Cardiovascular', icon: '❤️' },
            { id: 'mental-health', name: 'Mental Health', icon: '🧠' },
            { id: 'respiratory', name: 'Respiratory', icon: '🫁' },
            { id: 'endocrine', name: 'Endocrine', icon: '🔬' },
            { id: 'emergency', name: 'Emergency', icon: '🚨' },
            { id: 'gastro', name: 'Gastro', icon: '🫀' },
            { id: 'neuro', name: 'Neurological', icon: '⚡' }
        ];
    }

    /**
     * Get drug count
     */
    getDrugCount() {
        
        return this.drugDatabase ? Object.keys(this.drugDatabase).length : 0;
    }

    /**
     * Get statistics
     */
    getStatistics() {
        const categories = this.getCategories();
        return {
            totalDrugs: this.getDrugCount(),
            categories: categories,
            totalViews: this.recentDrugs.length,
            initialized: this.initialized
        };
    }

    /**
     * Assess interaction severity - Helper method
     */
    assessInteractionSeverity(interactionText) {
        const text = interactionText.toLowerCase();
        
        // Critical severity keywords
        if (text.includes('contraindicated') || text.includes('avoid') || 
            text.includes('fatal') || text.includes('life-threatening')) {
            return 'critical';
        }
        
        // High severity keywords
        if (text.includes('↑↑') || text.includes('severe') || 
            text.includes('significant') || text.includes('major')) {
            return 'high';
        }
        
        // Moderate severity keywords
        if (text.includes('↑') || text.includes('caution') || 
            text.includes('monitor') || text.includes('moderate')) {
            return 'moderate';
        }
        
        return 'low';
    }

    /**
     * Categorize pregnancy safety - Helper method
     */
    categorizePregancySafety(pregnancyText) {
        const text = pregnancyText.toLowerCase();
        
        if (text.includes('safe') || text.includes('no evidence of harm')) {
            return 'safe';
        }
        
        if (text.includes('avoid') || text.includes('teratogenic') || 
            text.includes('contraindicated') || text.includes('not recommended')) {
            return 'avoid';
        }
        
        if (text.includes('caution') || text.includes('specialist advice') ||
            text.includes('risk') || text.includes('limited data')) {
            return 'caution';
        }
        
        return 'unknown';
    }

    /**
     * Get pregnancy recommendation - Helper method
     */
    getPregnancyRecommendation(safetyLevel) {
        const recommendations = {
            'safe': 'Generally considered safe in pregnancy. Continue as prescribed.',
            'caution': 'Use only if benefits outweigh risks. Consult specialist.',
            'avoid': 'Avoid in pregnancy unless absolutely necessary. Seek alternatives.',
            'unknown': 'Limited data available. Consult obstetrician or specialist.'
        };
        
        return recommendations[safetyLevel] || recommendations.unknown;
    }

    /**
     * Adjust dose for patient - Helper method
     */
    adjustDoseForPatient(drug, weight, age) {
        // Basic weight-based adjustment
        const standardWeight = 70; // kg
        let adjustedDose = drug.dosing;
        
        // Pediatric dosing considerations
        if (age < 18) {
            adjustedDose += '\n\n⚠️ PEDIATRIC: Requires specialist dosing calculation';
        }
        
        // Geriatric considerations
        if (age >= 65) {
            adjustedDose += '\n\n⚠️ ELDERLY: Consider reduced dose and increased monitoring';
        }
        
        // Weight-based adjustment note
        if (weight < 50 || weight > 100) {
            adjustedDose += `\n\n⚖️ WEIGHT: Patient weight (${weight}kg) differs significantly from standard (70kg) - consider dose adjustment`;
        }
        
        return adjustedDose;
    }

    /**
     * Calculate maximum dose - Helper method
     */
    calculateMaxDose(drug, weight) {
        // Extract maximum dose from dosing string if available
        const maxDoseMatch = drug.dosing.match(/max(?:imum)?:?\s*(\d+(?:\.\d+)?)\s*(\w+)/i);
        
        if (maxDoseMatch) {
            return `${maxDoseMatch[1]} ${maxDoseMatch[2]}`;
        }
        
        return 'See dosing guidelines';
    }

    /**
     * Check renal adjustment - Helper method
     */
    checkRenalAdjustment(drug) {
        if (drug.renalDoseAdjustments) {
            return drug.renalDoseAdjustments;
        }

        const contraindications = drug.contraindications?.toLowerCase() || '';
        const dosing = drug.dosing?.toLowerCase() || '';

        if (contraindications.includes('renal') || dosing.includes('renal') ||
            contraindications.includes('kidney') || dosing.includes('egfr')) {
            return 'Renal dosing adjustments required – check eGFR and follow local guidelines.';
        }

        return 'No specific renal adjustment usually required';
    }

    /**
     * Check hepatic adjustment - Helper method
     */
    checkHepaticAdjustment(drug) {
        if (drug.hepaticDoseAdjustments) {
            return drug.hepaticDoseAdjustments;
        }

        const contraindications = drug.contraindications?.toLowerCase() || '';
        const dosing = drug.dosing?.toLowerCase() || '';

        if (contraindications.includes('hepatic') || dosing.includes('hepatic') ||
            contraindications.includes('liver') || dosing.includes('child-pugh')) {
            return 'Hepatic impairment warrants dose adjustment or caution – check LFTs and consult guidance.';
        }

        return 'No routine hepatic adjustment';
    }
}

// Export singleton instance
export const drugReferenceManager = new DrugReferenceManager();
export default DrugReferenceManager;

