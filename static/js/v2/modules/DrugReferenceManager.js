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
        
        return matches.map(([key, drug]) => ({ key, ...drug }));
    }

    /**
     * Drug interaction checker - NEW FEATURE
     */
    checkDrugInteractions(drugNames) {
        const interactions = [];
        const drugs = drugNames.map(name => 
            this.searchDrugs(name).find(d => d.name.toLowerCase() === name.toLowerCase())
        ).filter(Boolean);

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
    checkPregnancySafety(drugName) {
        const drug = this.searchDrugs(drugName)[0];
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
    calculateDosing(drugName, patientWeight, patientAge, indication = 'standard') {
        const drug = this.searchDrugs(drugName)[0];
        if (!drug) return null;

        return {
            drug: drug.name,
            standardDose: drug.dosing,
            adjustedDose: this.adjustDoseForPatient(drug, patientWeight, patientAge),
            maxDose: this.calculateMaxDose(drug, patientWeight),
            renalAdjustment: this.checkRenalAdjustment(drug),
            hepaticAdjustment: this.checkHepaticAdjustment(drug)
        };
    }

    /**
     * Get drugs by category
     */
    async getDrugsByCategory(category) {
        
        if (!this.drugDatabase) return [];

        const drugs = Object.entries(this.drugDatabase);
        
        if (category === 'all' || category === 'alphabetical') {
            return drugs
                .map(([key, drug]) => ({ key, ...drug }))
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

        return drugs
            .filter(([, drug]) => filter(drug))
            .map(([key, drug]) => ({ key, ...drug }))
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
        
        return { key: drugKey, ...this.drugDatabase[drugKey] };
    }

    /**
     * Add drug to recent history
     */
    addToRecent(drugKey) {
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
        
        return this.recentDrugs
            .map(key => this.drugDatabase[key] ? { key, ...this.drugDatabase[key] } : null)
            .filter(drug => drug !== null);
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
        const contraindications = drug.contraindications?.toLowerCase() || '';
        const dosing = drug.dosing?.toLowerCase() || '';
        
        if (contraindications.includes('renal') || dosing.includes('renal') ||
            contraindications.includes('kidney') || dosing.includes('egfr')) {
            return 'Required - check eGFR and adjust dose accordingly';
        }
        
        return 'Not typically required';
    }

    /**
     * Check hepatic adjustment - Helper method
     */
    checkHepaticAdjustment(drug) {
        const contraindications = drug.contraindications?.toLowerCase() || '';
        const dosing = drug.dosing?.toLowerCase() || '';
        
        if (contraindications.includes('hepatic') || dosing.includes('hepatic') ||
            contraindications.includes('liver') || dosing.includes('child-pugh')) {
            return 'Required - check liver function and adjust dose accordingly';
        }
        
        return 'Not typically required';
    }
}

// Export singleton instance
export const drugReferenceManager = new DrugReferenceManager();
export default DrugReferenceManager;

