/**
 * Calculator Manager - Registry and management for medical calculators
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { analytics } from './AnalyticsManager.js';
import { EVENTS, STORAGE_KEYS, CALCULATOR_TYPES, TOOL_CATEGORIES } from './Constants.js';
import { calculatorRegistry } from './Calculators.js';
import calculatorBridge from './CalculatorBridge.js';

export class CalculatorManager {
    constructor() {
        this.calculators = new Map();
        this.currentCalculator = null;
        this.recentTools = [];
        this.toolNotes = {};
        this.bridge = calculatorBridge;
    }

    /**
     * Initialize calculator manager and auto-register all calculators
     */
    initialize() {
        // Initialize the bridge with dependencies
        this.bridge.initialize(eventBus, storage, analytics);
        
        // Load saved data
        this.recentTools = storage.getItem(STORAGE_KEYS.RECENT_TOOLS, []);
        this.toolNotes = storage.getItem(STORAGE_KEYS.TOOL_NOTES, {});
        
        // Auto-register all calculators from registry
        this.registerAllCalculators();
        
        // Register bridge calculators
        this.registerBridgeCalculators();
        
        console.log(`🧮 Calculator Manager initialized with ${this.calculators.size} calculators`);
    }
    
    /**
     * Auto-register all calculators from the registry
     */
    registerAllCalculators() {
        Object.entries(calculatorRegistry).forEach(([id, config]) => {
            this.registerCalculator(id, config);
        });
    }

    /**
     * Register calculators from ExtractedCalculators bridge
     */
    registerBridgeCalculators() {
        // Check if ExtractedCalculators is available
        const EC = window.ExtractedCalculators;
        if (!EC) {
            console.warn('⚠️ ExtractedCalculators not loaded - many calculators unavailable');
            console.info('ℹ️  Only 6 native V2 calculators available without bridge');
            return; // Exit early if bridge not available
        }
        
        console.log('✅ ExtractedCalculators bridge loaded - registering 55+ calculators...');
        
        // Note: For now, the bridge provides most calculator functionality
        // V2 native implementations in Calculators.js only cover 6 calculators
        // TODO: Migrate remaining calculators to native V2 implementations

        // === CARDIOVASCULAR CALCULATORS ===
        
        // GRACE Score
        if (EC.getGRACECalculator) {
            this.registerCalculator('grace', {
                name: 'GRACE Score',
                category: TOOL_CATEGORIES.CARDIOLOGY,
                description: 'Risk stratification for ACS',
                keywords: ['grace', 'acs', 'risk', 'cardiac', 'heart'],
                getTemplate: () => EC.getGRACECalculator(),
                calculate: () => EC.calculateGRACE(),
                bindEvents: () => {}
            });
        }

        // QRISK3
        if (EC.getQRISK3Calculator) {
            this.registerCalculator('qrisk3', {
                name: 'QRISK3',
                category: TOOL_CATEGORIES.RISK,
                description: 'CV risk assessment',
                keywords: ['qrisk', 'cardiovascular', 'risk', 'prevention'],
                getTemplate: () => EC.getQRISK3Calculator(),
                calculate: () => EC.calculateQRISK3(),
                bindEvents: () => {}
            });
        }
        
        // === RESPIRATORY CALCULATORS ===
        
        // CURB-65
        if (EC.getCURB65Calculator) {
            this.registerCalculator('curb65', {
                name: 'CURB-65',
                category: TOOL_CATEGORIES.RESPIRATORY,
                description: 'Pneumonia severity assessment',
                keywords: ['curb', 'pneumonia', 'severity', 'respiratory'],
                getTemplate: () => EC.getCURB65Calculator(),
                calculate: () => EC.calculateCURB65(),
                bindEvents: () => {}
            });
        }

        // Peak Flow (PEFR)
        if (EC.getPEFRCalculator) {
            this.registerCalculator('pefr', {
                name: 'Peak Flow Calculator',
                category: TOOL_CATEGORIES.RESPIRATORY,
                description: 'Expected peak expiratory flow rate',
                keywords: ['pefr', 'peak', 'flow', 'respiratory', 'asthma'],
                getTemplate: () => EC.getPEFRCalculator(),
                calculate: () => EC.calculatePEFR(),
                bindEvents: () => {}
            });
        }
        
        // === NEUROLOGICAL CALCULATORS ===
        
        // NIHSS
        if (EC.getNIHSSCalculator) {
            this.registerCalculator('nihss', {
                name: 'NIHSS',
                category: TOOL_CATEGORIES.NEUROLOGY,
                description: 'Stroke severity assessment',
                keywords: ['nihss', 'stroke', 'neurology', 'severity'],
                getTemplate: () => EC.getNIHSSCalculator(),
                calculate: () => EC.calculateNIHSS(),
                bindEvents: () => {}
            });
        }

        // ABCD2 Score
        if (EC.getABCD2Calculator) {
            this.registerCalculator('abcd2', {
                name: 'ABCD2 Score',
                category: TOOL_CATEGORIES.NEUROLOGY,
                description: 'TIA stroke risk stratification',
                keywords: ['abcd2', 'tia', 'stroke', 'risk'],
                getTemplate: () => EC.getABCD2Calculator(),
                calculate: () => EC.calculateABCD2(),
                bindEvents: () => {}
            });
        }
        
        // === CRITICAL CARE CALCULATORS ===
        
        // APACHE II
        if (EC.getAPACHECalculator) {
            this.registerCalculator('apache', {
                name: 'APACHE II',
                category: TOOL_CATEGORIES.CRITICAL_CARE,
                description: 'ICU mortality prediction',
                keywords: ['apache', 'icu', 'mortality', 'critical'],
                getTemplate: () => EC.getAPACHECalculator(),
                calculate: () => EC.calculateAPACHE(),
                bindEvents: () => {}
            });
        }

        // SOFA Score
        if (EC.getSOFACalculator) {
            this.registerCalculator('sofa', {
                name: 'SOFA Score',
                category: TOOL_CATEGORIES.CRITICAL_CARE,
                description: 'Sequential organ failure assessment',
                keywords: ['sofa', 'organ', 'failure', 'critical', 'sepsis'],
                getTemplate: () => EC.getSOFACalculator(),
                calculate: () => EC.calculateSOFA(),
                bindEvents: () => {}
            });
        }

        // MEWS (Modified Early Warning Score)
        if (EC.getMEWSCalculator) {
            this.registerCalculator('mews', {
                name: 'MEWS',
                category: TOOL_CATEGORIES.CRITICAL_CARE,
                description: 'Modified Early Warning Score',
                keywords: ['mews', 'warning', 'deterioration', 'vital'],
                getTemplate: () => EC.getMEWSCalculator(),
                calculate: () => EC.calculateMEWS(),
                bindEvents: () => {}
            });
        }

        // NEWS2
        if (EC.getNEWS2Calculator) {
            this.registerCalculator('news2', {
                name: 'NEWS2',
                category: TOOL_CATEGORIES.CRITICAL_CARE,
                description: 'National Early Warning Score 2',
                keywords: ['news', 'warning', 'deterioration', 'rcp'],
                getTemplate: () => EC.getNEWS2Calculator(),
                calculate: () => EC.calculateNEWS2(),
                bindEvents: () => {}
            });
        }
        
        // === RENAL CALCULATORS ===
        
        // eGFR
        if (EC.getEGFRCalculator) {
            this.registerCalculator('egfr', {
                name: 'eGFR Calculator',
                category: TOOL_CATEGORIES.NEPHROLOGY,
                description: 'Estimated glomerular filtration rate',
                keywords: ['egfr', 'kidney', 'renal', 'creatinine'],
                getTemplate: () => EC.getEGFRCalculator(),
                calculate: () => EC.calculateEGFR(),
                bindEvents: () => {}
            });
        }
        
        // === HEPATOLOGY CALCULATORS ===
        
        // MELD Score
        if (EC.getMELDCalculator) {
            this.registerCalculator('meld', {
                name: 'MELD Score',
                category: TOOL_CATEGORIES.HEPATOLOGY,
                description: 'Model for End-stage Liver Disease',
                keywords: ['meld', 'liver', 'hepatology', 'cirrhosis'],
                getTemplate: () => EC.getMELDCalculator(),
                calculate: () => EC.calculateMELD(),
                bindEvents: () => {}
            });
        }

        // Child-Pugh
        if (EC.getChildPughCalculator) {
            this.registerCalculator('child-pugh', {
                name: 'Child-Pugh Score',
                category: TOOL_CATEGORIES.HEPATOLOGY,
                description: 'Chronic liver disease severity',
                keywords: ['child', 'pugh', 'liver', 'cirrhosis'],
                getTemplate: () => EC.getChildPughCalculator(),
                calculate: () => EC.calculateChildPugh(),
                bindEvents: () => {}
            });
        }
        
        // === LABORATORY CALCULATORS ===
        
        // Anion Gap
        if (EC.getAnionGapCalculator) {
            this.registerCalculator('anion-gap', {
                name: 'Anion Gap',
                category: TOOL_CATEGORIES.LABORATORY,
                description: 'Serum anion gap calculation',
                keywords: ['anion', 'gap', 'electrolytes', 'acidosis'],
                getTemplate: () => EC.getAnionGapCalculator(),
                calculate: () => EC.calculateAnionGap(),
                bindEvents: () => {}
            });
        }

        // Corrected Calcium
        if (EC.getCorrectedCalciumCalculator) {
            this.registerCalculator('corrected-calcium', {
                name: 'Corrected Calcium',
                category: TOOL_CATEGORIES.LABORATORY,
                description: 'Albumin-corrected calcium',
                keywords: ['calcium', 'albumin', 'corrected', 'biochemistry'],
                getTemplate: () => EC.getCorrectedCalciumCalculator(),
                calculate: () => EC.calculateCorrectedCalcium(),
                bindEvents: () => {}
            });
        }

        // Corrected Sodium
        if (EC.getCorrectedSodiumCalculator) {
            this.registerCalculator('corrected-sodium', {
                name: 'Corrected Sodium',
                category: TOOL_CATEGORIES.LABORATORY,
                description: 'Glucose-corrected sodium',
                keywords: ['sodium', 'glucose', 'corrected', 'hyperglycemia'],
                getTemplate: () => EC.getCorrectedSodiumCalculator(),
                calculate: () => EC.calculateCorrectedSodium(),
                bindEvents: () => {}
            });
        }

        // Osmolal Gap
        if (EC.getOsmolalGapCalculator) {
            this.registerCalculator('osmolal-gap', {
                name: 'Osmolal Gap',
                category: TOOL_CATEGORIES.LABORATORY,
                description: 'Serum osmolal gap calculation',
                keywords: ['osmolal', 'gap', 'toxicology', 'alcohol'],
                getTemplate: () => EC.getOsmolalGapCalculator(),
                calculate: () => EC.calculateOsmolalGap(),
                bindEvents: () => {}
            });
        }
        
        // Mean Arterial Pressure
        if (EC.getMAPCalculator) {
            this.registerCalculator('map', {
                name: 'Mean Arterial Pressure',
                category: TOOL_CATEGORIES.CARDIOLOGY,
                description: 'Calculate MAP from BP',
                keywords: ['map', 'mean', 'arterial', 'pressure', 'bp'],
                getTemplate: () => EC.getMAPCalculator(),
                calculate: () => EC.calculateMAP(),
                bindEvents: () => {}
            });
        }

        console.log(`✅ Bridge calculators registered: ${this.calculators.size - 6} from ExtractedCalculators`);
    }

    /**
     * Register a calculator
     */
    registerCalculator(id, config) {
        const calculator = {
            id,
            name: config.name,
            category: config.category || TOOL_CATEGORIES.OTHER,
            description: config.description || '',
            keywords: config.keywords || [],
            getTemplate: config.getTemplate,
            calculate: config.calculate,
            bindEvents: config.bindEvents,
            metadata: config.metadata || {}
        };

        this.calculators.set(id, calculator);
        
        return calculator;
    }
    
    /**
     * Load calculator into detail view
     */
    loadCalculator(calculatorId) {
        const calculator = this.getCalculator(calculatorId);
        if (!calculator) {
            console.error(`Calculator not found: ${calculatorId}`);
            return false;
        }

        try {
            // Switch to calculator detail panel first
            eventBus.emit(EVENTS.UI_SWITCH_TOOL, { tool: 'calculator-detail' });
            
            // Set current calculator
            this.currentCalculator = calculator;
            
            // Add to recent tools
            this.addToRecentTools(calculatorId);
            
            // Get container element
            const container = document.getElementById('calculator-detail-container');
            if (!container) {
                console.error('Calculator container not found');
                return false;
            }
            
            // Clear existing content
            container.innerHTML = '';
            
            // Render calculator
            const success = this.renderCalculator(calculator, container);
            if (success) {
                // Emit event
                eventBus.emit(EVENTS.CALCULATOR_LOADED, {
                    id: calculator.id,
                    name: calculator.name,
                    category: calculator.category
                });
                
                // Analytics
                analytics.trackCalculatorUsage(calculator.id);
                
                console.log(`✅ Calculator loaded: ${calculator.name}`);
            }
            
            return success;
        } catch (error) {
            console.error('Error loading calculator:', error);
            return false;
        }
    }

    /**
     * Render calculator HTML and bind events
     */
    renderCalculator(calculator, container) {
        try {
            // Render HTML using getTemplate
            const html = calculator.getTemplate();
            container.innerHTML = html;
            
            // Bind calculator events - pass the container
            if (calculator.bindEvents) {
                calculator.bindEvents(container);
            }
            
            return true;
        } catch (error) {
            console.error('Error rendering calculator:', error);
            return false;
        }
    }
    
    /**
     * Execute calculation for a calculator
     */
    executeCalculation(calculatorId) {
        const calculator = this.getCalculator(calculatorId);
        if (!calculator) {
            console.error(`Calculator not found: ${calculatorId}`);
            return null;
        }
        
        try {
            const result = calculator.calculate();
            
            // Emit event
            eventBus.emit(EVENTS.CALCULATOR_CALCULATED, {
                id: calculator.id,
                name: calculator.name,
                result
            });
            
            // Vibration feedback
            if (result && !result.error) {
                analytics.vibrateSuccess();
            } else if (result && result.error) {
                analytics.vibrateError();
            }
            
            return result;
        } catch (error) {
            console.error('Calculation error:', error);
            eventBus.emit(EVENTS.ERROR_OCCURRED, { 
                type: 'calculator', 
                calculator: calculatorId,
                error 
            });
            return { error: error.message };
        }
    }

    /**
     * Get calculator by ID
     */
    getCalculator(id) {
        return this.calculators.get(id);
    }

    /**
     * Get all calculators
     */
    getAllCalculators() {
        return Array.from(this.calculators.values());
    }

    /**
     * Get calculators by category
     */
    getCalculatorsByCategory(category) {
        return this.getAllCalculators().filter(calc => calc.category === category);
    }

    /**
     * Get calculator count
     */
    getCalculatorCount() {
        return this.calculators.size;
    }

    /**
     * Search calculators by keyword
     */
    searchCalculators(query) {
        const searchTerm = query.toLowerCase();
        return this.getAllCalculators().filter(calc => {
            const nameMatch = calc.name.toLowerCase().includes(searchTerm);
            const keywordMatch = calc.keywords.some(keyword => 
                keyword.toLowerCase().includes(searchTerm)
            );
            const descMatch = calc.description.toLowerCase().includes(searchTerm);
            
            return nameMatch || keywordMatch || descMatch;
        });
    }

    /**
     * Add calculator to recent tools
     */
    addToRecentTools(calculatorId) {
        // Remove if already exists
        this.recentTools = this.recentTools.filter(id => id !== calculatorId);
        
        // Add to beginning
        this.recentTools.unshift(calculatorId);
        
        // Keep only last 10
        if (this.recentTools.length > 10) {
            this.recentTools = this.recentTools.slice(0, 10);
        }
        
        // Save to storage
        storage.setItem(STORAGE_KEYS.RECENT_TOOLS, this.recentTools);
    }

    /**
     * Get recent tools
     */
    getRecentTools() {
        return this.recentTools.map(id => this.getCalculator(id)).filter(Boolean);
    }

    /**
     * Clear recent tools
     */
    clearRecentTools() {
        this.recentTools = [];
        storage.removeItem(STORAGE_KEYS.RECENT_TOOLS);
    }

    /**
     * Get tool notes for calculator
     */
    getToolNotes(calculatorId) {
        return this.toolNotes[calculatorId] || '';
    }

    /**
     * Save tool notes for calculator
     */
    saveToolNotes(calculatorId, notes) {
        this.toolNotes[calculatorId] = notes;
        storage.setItem(STORAGE_KEYS.TOOL_NOTES, this.toolNotes);
    }

    /**
     * Get calculator categories
     */
    getCategories() {
        const categories = new Set();
        this.getAllCalculators().forEach(calc => {
            categories.add(calc.category);
        });
        return Array.from(categories).sort();
    }

    /**
     * Export calculator data
     */
    exportCalculatorData() {
        return {
            calculators: this.getAllCalculators().map(calc => ({
                id: calc.id,
                name: calc.name,
                category: calc.category,
                description: calc.description,
                keywords: calc.keywords
            })),
            recentTools: this.recentTools,
            toolNotes: this.toolNotes,
            exportDate: new Date().toISOString(),
            version: '2.0'
        };
    }

    /**
     * Get calculator statistics
     */
    getStatistics() {
        const stats = {};
        const categories = this.getCategories();
        
        categories.forEach(category => {
            stats[category] = this.getCalculatorsByCategory(category).length;
        });
        
        return {
            totalCalculators: this.getCalculatorCount(),
            categoryCounts: stats,
            recentToolsCount: this.recentTools.length,
            notesCount: Object.keys(this.toolNotes).length
        };
    }
}

// Create and export singleton instance
export const calculatorManager = new CalculatorManager();