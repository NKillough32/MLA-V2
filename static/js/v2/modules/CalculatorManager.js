/**
 * Calculator Manager - Registry and management for medical calculators
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { analytics } from './AnalyticsManager.js';
import { EVENTS, STORAGE_KEYS, CALCULATOR_TYPES, TOOL_CATEGORIES } from './Constants.js';
import { createCalculatorRegistry } from './CalculatorRegistry.js';
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
    async initialize() {
        // Initialize the bridge with dependencies
        this.bridge.initialize(eventBus, storage, analytics);
        
        // Load saved data
        try {
            const recent = await storage.getItem(STORAGE_KEYS.RECENT_TOOLS, []);
            this.recentTools = Array.isArray(recent) ? recent : [];
        } catch (e) {
            console.warn('Failed to load recent tools from storage, using empty array', e);
            this.recentTools = [];
        }

        try {
            const notes = await storage.getItem(STORAGE_KEYS.TOOL_NOTES, {});
            this.toolNotes = (notes && typeof notes === 'object') ? notes : {};
        } catch (e) {
            console.warn('Failed to load tool notes from storage, using empty object', e);
            this.toolNotes = {};
        }
        
        // Build the consolidated calculator registry (native + bridge calculators)
        this.buildCalculatorRegistry({
            extractedCalculators: typeof window !== 'undefined' ? window.ExtractedCalculators : null,
            disableUnofficialQrisk: true
        });
        
        console.log(`🧮 Calculator Manager initialized with ${this.calculators.size} calculators`);
    }
    
    /**
     * Build the consolidated calculator registry and register calculators
     */
    buildCalculatorRegistry(options = {}) {
        const { extractedCalculators = null, disableUnofficialQrisk = true } = options;

        this.calculators.clear();
        this.registryOptions = { extractedCalculators, disableUnofficialQrisk };

        const registry = createCalculatorRegistry({
            extractedCalculators,
            disableUnofficialQrisk
        });

        this.registryMap = registry;

        if (!extractedCalculators) {
            console.warn('⚠️ ExtractedCalculators not loaded - only native calculators will be available');
        }

        if (disableUnofficialQrisk) {
            console.info('🔒 Unofficial QRISK calculators are disabled by configuration');
        }

        for (const [id, config] of registry.entries()) {
            const isConfigObject = config && typeof config === 'object';
            const hasTemplate = isConfigObject && typeof config.getTemplate === 'function';
            const hasCalculate = isConfigObject && typeof config.calculate === 'function';

            if (!hasTemplate || !hasCalculate) {
                console.debug(`Skipping calculator registry entry '${id}' - missing template or calculate handler.`);
                continue;
            }

            this.registerCalculator(id, config);
        }

        console.log(`✅ Consolidated calculator registry loaded (${this.calculators.size} calculators)`);

        return registry;
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
                analytics.trackCalculatorUse(calculator.id);
                
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
            // Create back button
            const backButton = `
                <button class="back-btn" onclick="window.quizApp.showCalculatorList(); event.stopPropagation();" 
                        style="margin-bottom: 20px; padding: 10px 20px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 16px;">←</span> Back to Calculators
                </button>
            `;
            
            // Render HTML using getTemplate with back button
            const html = calculator.getTemplate();
            container.innerHTML = backButton + html;
            
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
        // Defensively ensure recentTools is always an array
        if (!Array.isArray(this.recentTools)) {
            console.warn('recentTools in unexpected format, resetting to empty array:', this.recentTools);
            this.recentTools = [];
        }

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
     * Calculator result interpretation - NEW FEATURE
     */
    interpretResult(calculatorId, result) {
        const interpretations = {
            'bmi': this.interpretBMI(result),
            'gcs': this.interpretGCS(result),
            'chads2-vasc': this.interpretCHADS2VASc(result),
            'hasbled': this.interpretHASBLED(result),
            'curb65': this.interpretCURB65(result),
            'news2': this.interpretNEWS2(result),
            'egfr': this.interpreteGFR(result),
            'wells': this.interpretWells(result)
        };
        
        return interpretations[calculatorId] || { 
            interpretation: 'Result calculated', 
            recommendation: 'Please interpret clinically',
            riskLevel: 'unknown'
        };
    }

    /**
     * Calculator comparison tool - NEW FEATURE
     */
    compareCalculators(calculatorIds, patientData) {
        return calculatorIds.map(id => {
            const calc = this.getCalculator(id);
            if (!calc) return null;
            
            return {
                id,
                name: calc.name,
                category: calc.category,
                result: this.calculateWithData(id, patientData),
                interpretation: this.interpretResult(id, patientData),
                clinicalRelevance: this.getClinicalRelevance(id, calc.category)
            };
        }).filter(Boolean);
    }

    /**
     * Smart calculator suggestions - NEW FEATURE
     */
    suggestCalculators(symptoms, demographics, vitals) {
        const suggestions = [];
        
        // Age-based suggestions
        if (demographics.age > 65) {
            suggestions.push('frailty', 'barthel', 'waterlow');
        }
        
        // Symptom-based suggestions
        if (symptoms.includes('chest pain')) {
            suggestions.push('grace', 'chads2-vasc', 'wells');
        }
        if (symptoms.includes('shortness of breath')) {
            suggestions.push('curb65', 'news2', 'wells');
        }
        if (symptoms.includes('confusion')) {
            suggestions.push('gcs', 'news2', 'mmse');
        }
        
        // Vital sign triggers
        if (vitals.systolic > 160 || vitals.diastolic > 100) {
            suggestions.push('qrisk3', 'chads2-vasc');
        }
        
        return suggestions.map(id => this.getCalculator(id)).filter(Boolean);
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

    /**
     * Interpretation helper methods - COMPREHENSIVE IMPLEMENTATIONS
     */
    
    interpretBMI(result) {
        const bmi = result.bmi || result;
        let category, riskLevel, recommendation;
        
        if (bmi < 18.5) {
            category = 'Underweight';
            riskLevel = 'moderate';
            recommendation = 'Nutritional assessment recommended. Screen for eating disorders and malnutrition.';
        } else if (bmi < 25) {
            category = 'Normal weight';
            riskLevel = 'low';
            recommendation = 'Maintain healthy lifestyle with balanced diet and regular exercise.';
        } else if (bmi < 30) {
            category = 'Overweight';
            riskLevel = 'moderate';
            recommendation = 'Lifestyle modification advised. Consider dietary counselling and increased physical activity.';
        } else if (bmi < 35) {
            category = 'Obese Class I';
            riskLevel = 'high';
            recommendation = 'Weight management essential. Consider referral to specialist weight management service.';
        } else if (bmi < 40) {
            category = 'Obese Class II';
            riskLevel = 'high';
            recommendation = 'Significant health risk. Specialist referral recommended. Consider pharmacotherapy.';
        } else {
            category = 'Obese Class III';
            riskLevel = 'critical';
            recommendation = 'Very high health risk. Urgent specialist referral. Consider bariatric surgery assessment.';
        }
        
        return { interpretation: category, recommendation, riskLevel, value: bmi.toFixed(1) };
    }

    interpretGCS(result) {
        const score = result.score || result;
        let category, riskLevel, recommendation;
        
        if (score <= 8) {
            category = 'Severe impairment';
            riskLevel = 'critical';
            recommendation = 'IMMEDIATE: Secure airway, consider intubation. CT head urgently. ITU referral.';
        } else if (score <= 12) {
            category = 'Moderate impairment';
            riskLevel = 'high';
            recommendation = 'Close monitoring required. CT head. Consider HDU admission. Frequent neurological observations.';
        } else if (score <= 14) {
            category = 'Mild impairment';
            riskLevel = 'moderate';
            recommendation = 'Regular neurological observations. Consider CT head if deteriorating or mechanism concerning.';
        } else {
            category = 'Normal consciousness';
            riskLevel = 'low';
            recommendation = 'Continue routine monitoring. Reassess if any deterioration.';
        }
        
        return { interpretation: category, recommendation, riskLevel, score };
    }

    interpretCHADS2VASc(result) {
        const score = result.score || result;
        let riskLevel, recommendation, annualStrokeRisk;
        
        if (score === 0) {
            riskLevel = 'low';
            annualStrokeRisk = '0.2%';
            recommendation = 'Low risk. No anticoagulation required. Consider aspirin only in certain cases.';
        } else if (score === 1) {
            riskLevel = 'moderate';
            annualStrokeRisk = '0.6-2.0%';
            recommendation = 'Moderate risk. Consider anticoagulation (DOAC preferred). Discuss risks/benefits with patient.';
        } else if (score === 2) {
            riskLevel = 'moderate-high';
            annualStrokeRisk = '2.2-3.2%';
            recommendation = 'Anticoagulation recommended unless contraindicated. DOAC preferred over warfarin.';
        } else {
            riskLevel = 'high';
            annualStrokeRisk = score === 3 ? '3.2%' : `${Math.min(score * 1.5, 15)}%`;
            recommendation = 'High risk. Anticoagulation strongly recommended. Use HAS-BLED to assess bleeding risk.';
        }
        
        return { interpretation: `${score}/9 points`, recommendation, riskLevel, annualStrokeRisk, score };
    }

    interpretHASBLED(result) {
        const score = result.score || result;
        let riskLevel, recommendation;
        
        if (score <= 2) {
            riskLevel = 'low';
            recommendation = 'Low bleeding risk. Anticoagulation can proceed if indicated. Annual review recommended.';
        } else {
            riskLevel = 'high';
            recommendation = 'Increased bleeding risk. Anticoagulation still beneficial if CHA2DS2-VASc ≥2. Address modifiable risk factors. More frequent monitoring required.';
        }
        
        return { interpretation: `${score}/9 points`, recommendation, riskLevel, score };
    }

    interpretCURB65(result) {
        const score = result.score || result;
        let riskLevel, recommendation, mortality;
        
        if (score === 0 || score === 1) {
            riskLevel = 'low';
            mortality = score === 0 ? '0.7%' : '2.1%';
            recommendation = 'Low severity. Consider home treatment with oral antibiotics. Safety net advice essential.';
        } else if (score === 2) {
            riskLevel = 'moderate';
            mortality = '9.2%';
            recommendation = 'Moderate severity. Consider hospital admission. IV antibiotics initially. Senior review required.';
        } else {
            riskLevel = 'high';
            mortality = score === 3 ? '14.5%' : '>27%';
            recommendation = 'High severity. Hospital admission essential. Consider ITU/HDU. IV antibiotics. Consultant review.';
        }
        
        return { interpretation: `${score}/5 points`, recommendation, riskLevel, mortality, score };
    }

    interpretNEWS2(result) {
        const score = result.score || result;
        let riskLevel, recommendation, urgency;
        
        if (score === 0) {
            riskLevel = 'low';
            urgency = 'Routine';
            recommendation = 'Continue routine monitoring. Minimum 12-hourly observations.';
        } else if (score <= 4) {
            riskLevel = 'low-medium';
            urgency = 'Low';
            recommendation = 'Increase observation frequency to minimum 4-6 hourly. Inform nurse in charge.';
        } else if (score <= 6) {
            riskLevel = 'medium';
            urgency = 'Medium';
            recommendation = 'Urgent review by clinician with competency in acute illness. Minimum hourly observations. Consider HDU.';
        } else {
            riskLevel = 'high';
            urgency = 'High';
            recommendation = 'EMERGENCY: Immediate clinical review. Consultant and critical care team. Continuous monitoring. Consider ITU.';
        }
        
        return { interpretation: `${score} points`, recommendation, riskLevel, urgency, score };
    }

    interpreteGFR(result) {
        const egfr = result.egfr || result;
        let stage, riskLevel, recommendation;
        
        if (egfr >= 90) {
            stage = 'Stage 1 (Normal/High)';
            riskLevel = 'low';
            recommendation = 'Normal kidney function. Continue routine monitoring if risk factors present.';
        } else if (egfr >= 60) {
            stage = 'Stage 2 (Mildly reduced)';
            riskLevel = 'low';
            recommendation = 'Mild reduction. Monitor annually. Address cardiovascular risk factors.';
        } else if (egfr >= 45) {
            stage = 'Stage 3a (Mild-moderate)';
            riskLevel = 'moderate';
            recommendation = 'Mild-moderate CKD. 6-monthly monitoring. Adjust medication doses. Nephrology referral if declining.';
        } else if (egfr >= 30) {
            stage = 'Stage 3b (Moderate-severe)';
            riskLevel = 'moderate-high';
            recommendation = 'Moderate-severe CKD. 3-monthly monitoring. Nephrology referral advised. Medication review essential.';
        } else if (egfr >= 15) {
            stage = 'Stage 4 (Severe)';
            riskLevel = 'high';
            recommendation = 'Severe CKD. Nephrology follow-up essential. Prepare for renal replacement therapy. Frequent monitoring.';
        } else {
            stage = 'Stage 5 (End-stage)';
            riskLevel = 'critical';
            recommendation = 'End-stage kidney disease. Urgent nephrology input. Dialysis or transplant required.';
        }
        
        return { interpretation: stage, recommendation, riskLevel, egfr: egfr.toFixed(1) };
    }

    interpretWells(result) {
        const score = result.score || result;
        let riskLevel, recommendation, probability;
        
        if (score <= 1) {
            riskLevel = 'low';
            probability = '1.3%';
            recommendation = 'Low probability of DVT/PE. Consider D-dimer. If negative, DVT/PE unlikely.';
        } else if (score <= 2) {
            riskLevel = 'moderate';
            probability = '16.2%';
            recommendation = 'Moderate probability. D-dimer testing. If positive or high clinical suspicion, proceed to imaging.';
        } else {
            riskLevel = 'high';
            probability = '40.6%';
            recommendation = 'High probability. Proceed directly to imaging (ultrasound for DVT, CTPA for PE). Consider treatment dose anticoagulation while awaiting results.';
        }
        
        return { interpretation: `${score} points`, recommendation, riskLevel, probability, score };
    }

    /**
     * Calculate with patient data - Helper method
     */
    calculateWithData(calculatorId, patientData) {
        // Placeholder for actual calculation logic
        // This would interface with the calculator's calculate method
        return { calculated: true, data: patientData };
    }

    /**
     * Get clinical relevance - Helper method
     */
    getClinicalRelevance(calculatorId, category) {
        const relevanceMap = {
            [TOOL_CATEGORIES.CARDIOLOGY]: 'Essential for cardiovascular risk stratification and management decisions',
            [TOOL_CATEGORIES.RESPIRATORY]: 'Critical for assessing respiratory disease severity and determining treatment location',
            [TOOL_CATEGORIES.NEPHROLOGY]: 'Important for medication dosing and monitoring chronic kidney disease progression',
            [TOOL_CATEGORIES.CRITICAL_CARE]: 'Vital for triage, severity assessment, and determining level of care required',
            [TOOL_CATEGORIES.GENERAL]: 'Useful for routine clinical assessment and health monitoring'
        };
        
        return relevanceMap[category] || 'Aids clinical decision-making and risk assessment';
    }
}

// Create and export singleton instance
export const calculatorManager = new CalculatorManager();