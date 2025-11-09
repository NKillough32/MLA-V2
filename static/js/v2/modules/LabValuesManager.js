/**
 * Lab Values Manager
 * Manages lab values database, panels, reference ranges, and search
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';

export class LabValuesManager {
    constructor() {
        this.eventBus = eventBus;
        this.storage = storage;
        this.labDatabase = null;
        this.recentLabs = [];
        this.initialized = false;
        this.dataLoaded = false;
    }

    async initialize() {
        if (this.initialized) {
            console.log('🧪 LabValuesManager already initialized, skipping...');
            return;
        }

        console.log('🧪 Initializing LabValuesManager...');
        
        // Load recent labs from storage (lightweight)
        this.recentLabs = this.storage.getItem('recentLabs', []);
        
        // Load lab database immediately
        console.log('🧪 Loading lab database...');
        if (typeof window.labDatabase !== 'undefined') {
            this.labDatabase = window.labDatabase;
            console.log(`✅ Lab database loaded: ${Object.keys(this.labDatabase).length} panels`);
        } else {
            console.warn('⚠️ Lab database not loaded. Using empty database.');
            this.labDatabase = {};
        }

        this.dataLoaded = true;
        
        const totalTests = Object.values(this.labDatabase).reduce((sum, panel) => 
            sum + Object.keys(panel.values || {}).length, 0
        );
        
        this.eventBus.emit('LAB_MANAGER_READY', { 
            panelCount: Object.keys(this.labDatabase).length,
            testCount: totalTests,
            lazyLoaded: false
        });
        
        this.eventBus.emit('LAB_DATA_LOADED', { 
            panelCount: Object.keys(this.labDatabase).length,
            testCount: totalTests
        });
        
        this.initialized = true;
        console.log('✅ LabValuesManager initialized with data loaded');
    }



    /**
     * Search labs by panel name or test name
     */
    async searchLabs(query) {
        
        if (!this.labDatabase) return [];
        
        const lowerQuery = query.toLowerCase().trim();
        if (lowerQuery.length < 2) return [];

        const matches = [];
        
        // Search through all panels and tests
        Object.entries(this.labDatabase).forEach(([panelKey, panel]) => {
            // Check if panel name matches
            if (panel.name.toLowerCase().includes(lowerQuery)) {
                matches.push({
                    type: 'panel',
                    key: panelKey,
                    name: panel.name,
                    testCount: Object.keys(panel.values).length
                });
            }
            
            // Check if any test within panel matches
            Object.entries(panel.values).forEach(([testKey, test]) => {
                if (testKey.toLowerCase().includes(lowerQuery)) {
                    matches.push({
                        type: 'test',
                        panelKey,
                        panelName: panel.name,
                        testKey,
                        testName: testKey,
                        normal: test.normal
                    });
                }
            });
        });

        this.eventBus.emit('LAB_SEARCHED', { query, resultCount: matches.length });
        
        return matches;
    }

    /**
     * Get all lab panels
     */
    async getPanels() {
        
        if (!this.labDatabase) return [];
        
        return Object.entries(this.labDatabase).map(([key, panel]) => ({
            key,
            name: panel.name,
            testCount: Object.keys(panel.values).length
        }));
    }

    /**
     * Get a specific panel with all its tests
     */
    async getPanel(panelKey) {
        
        if (!this.labDatabase || !this.labDatabase[panelKey]) return null;
        
        const panel = this.labDatabase[panelKey];
        
        // Add to recent
        this.addToRecent({ type: 'panel', key: panelKey });
        
        this.eventBus.emit('LAB_PANEL_VIEWED', { panelKey, panelName: panel.name });
        
        return {
            key: panelKey,
            name: panel.name,
            tests: Object.entries(panel.values).map(([testKey, test]) => ({
                key: testKey,
                ...test
            }))
        };
    }

    /**
     * Get a specific test
     */
    async getTest(panelKey, testKey) {
        
        if (!this.labDatabase || !this.labDatabase[panelKey] || 
            !this.labDatabase[panelKey].values[testKey]) return null;
        
        const panel = this.labDatabase[panelKey];
        const test = panel.values[testKey];
        
        // Add to recent
        this.addToRecent({ type: 'test', panelKey, testKey });
        
        this.eventBus.emit('LAB_TEST_VIEWED', { panelKey, testKey });
        
        return {
            panelKey,
            panelName: panel.name,
            testKey,
            ...test
        };
    }

    /**
     * Add lab to recent history
     */
    addToRecent(item) {
        // Create unique identifier
        const identifier = item.type === 'panel' 
            ? `panel:${item.key}` 
            : `test:${item.panelKey}:${item.testKey}`;
        
        // Remove if already exists
        this.recentLabs = this.recentLabs.filter(lab => 
            (lab.type === 'panel' ? `panel:${lab.key}` : `test:${lab.panelKey}:${lab.testKey}`) !== identifier
        );
        
        // Add to front
        this.recentLabs.unshift(item);
        
        // Keep only last 10
        this.recentLabs = this.recentLabs.slice(0, 10);
        
        this.storage.setItem('recentLabs', this.recentLabs);
    }

    /**
     * Get recent labs
     */
    async getRecentLabs() {
        
        return this.recentLabs.map(item => {
            if (item.type === 'panel') {
                const panel = this.labDatabase[item.key];
                return panel ? { type: 'panel', key: item.key, name: panel.name } : null;
            } else {
                const panel = this.labDatabase[item.panelKey];
                const test = panel?.values[item.testKey];
                return panel && test ? {
                    type: 'test',
                    panelKey: item.panelKey,
                    panelName: panel.name,
                    testKey: item.testKey,
                    testName: item.testKey
                } : null;
            }
        }).filter(item => item !== null);
    }

    /**
     * Get lab categories
     */
    getCategories() {
        return [
            { id: 'all', name: 'All Panels', icon: '🧪' },
            { id: 'common', name: 'Common Tests', icon: '⭐', 
              panels: ['cbc', 'bmp', 'lft'] },
            { id: 'cardiac', name: 'Cardiac', icon: '❤️', 
              panels: ['cardiac_markers', 'lipids'] },
            { id: 'metabolic', name: 'Metabolic', icon: '⚗️', 
              panels: ['bmp', 'thyroid', 'endocrine'] },
            { id: 'hematology', name: 'Hematology', icon: '🩸', 
              panels: ['cbc', 'coagulation', 'hematology_additional'] }
        ];
    }

    /**
     * Get panels by category
     */
    async getPanelsByCategory(categoryId) {
        
        const category = this.getCategories().find(cat => cat.id === categoryId);
        
        if (categoryId === 'all' || !category) {
            return this.getPanels();
        }
        
        if (category.panels) {
            return category.panels
                .map(panelKey => {
                    const panel = this.labDatabase[panelKey];
                    return panel ? {
                        key: panelKey,
                        name: panel.name,
                        testCount: Object.keys(panel.values).length
                    } : null;
                })
                .filter(panel => panel !== null);
        }
        
        return [];
    }

    /**
     * Get panel count
     */
    async getPanelCount() {
        
        return this.labDatabase ? Object.keys(this.labDatabase).length : 0;
    }

    /**
     * Lab value interpreter - NEW FEATURE
     */
    interpretLabValue(testName, value, units, patientAge, patientSex) {
        const interpretation = this.getLabInterpretation(testName, value, patientAge, patientSex);
        
        return {
            test: testName,
            value: `${value} ${units}`,
            status: interpretation.status, // 'normal', 'high', 'low', 'critical'
            significance: interpretation.significance,
            recommendations: interpretation.recommendations,
            associatedConditions: this.getAssociatedConditions(testName, interpretation.status),
            followUpTests: this.getFollowUpTests(testName, interpretation.status)
        };
    }

    /**
     * Lab trend analyzer - NEW FEATURE
     */
    analyzeTrend(testName, values, dates) {
        if (values.length < 2) return null;
        
        const trend = this.calculateTrend(values);
        const latestValue = values[values.length - 1];
        const previousValue = values[values.length - 2];
        const percentChange = ((latestValue - previousValue) / previousValue) * 100;
        
        return {
            test: testName,
            trend: trend, // 'increasing', 'decreasing', 'stable'
            percentChange: Math.round(percentChange * 100) / 100,
            direction: latestValue > previousValue ? 'up' : 'down',
            significance: this.assessTrendSignificance(testName, trend, percentChange),
            recommendation: this.getTrendRecommendation(testName, trend, percentChange)
        };
    }

    /**
     * Critical values alert system - NEW FEATURE
     */
    checkCriticalValues(labResults) {
        const criticalAlerts = [];
        
        Object.entries(labResults).forEach(([testName, value]) => {
            const critical = this.getCriticalThresholds(testName);
            if (critical && (value < critical.low || value > critical.high)) {
                criticalAlerts.push({
                    test: testName,
                    value,
                    threshold: critical,
                    severity: this.getCriticalSeverity(testName, value, critical),
                    urgency: 'immediate',
                    actions: this.getCriticalActions(testName, value)
                });
            }
        });
        
        return criticalAlerts.sort((a, b) => b.severity - a.severity);
    }

    /**
     * Get total test count
     */
    async getTestCount() {
        
        if (!this.labDatabase) return 0;
        return Object.values(this.labDatabase).reduce((sum, panel) => 
            sum + Object.keys(panel.values).length, 0
        );
    }

    /**
     * Get statistics
     */
    getStatistics() {
        return {
            totalPanels: this.getPanelCount(),
            totalTests: this.getTestCount(),
            totalViews: this.recentLabs ? this.recentLabs.length : 0,
            initialized: this.initialized
        };
    }

    /**
     * Interpret lab value (check if abnormal)
     */
    interpretValue(panelKey, testKey, value) {
        const test = this.getTest(panelKey, testKey);
        if (!test) return null;
        
        // This is a simplified interpretation
        // Real implementation would need to parse the 'normal' range string
        // and compare with the value
        
        return {
            value,
            normal: test.normal,
            interpretation: 'See normal range for interpretation',
            clinicalSignificance: test.clinicalSignificance
        };
    }

    /**
     * Lab interpretation helper methods - COMPREHENSIVE IMPLEMENTATIONS
     */
    
    getLabInterpretation(testName, value) {
        const interpretations = {
            'sodium': {
                ranges: [
                    { min: 0, max: 125, status: 'critically low', action: 'URGENT: Severe hyponatraemia - immediate senior review, assess clinically, consider hypertonic saline' },
                    { min: 125, max: 135, status: 'low', action: 'Hyponatraemia - assess fluid status, review medications, check paired osmolality' },
                    { min: 135, max: 145, status: 'normal', action: 'Normal sodium level' },
                    { min: 145, max: 155, status: 'high', action: 'Hypernatraemia - assess hydration, fluid losses, review medications' },
                    { min: 155, max: 999, status: 'critically high', action: 'URGENT: Severe hypernatraemia - immediate senior review, correct slowly' }
                ]
            },
            'potassium': {
                ranges: [
                    { min: 0, max: 2.5, status: 'critically low', action: 'CRITICAL: Severe hypokalaemia - cardiac monitoring, urgent IV replacement, ECG' },
                    { min: 2.5, max: 3.5, status: 'low', action: 'Hypokalaemia - oral/IV potassium replacement, review medications, check magnesium' },
                    { min: 3.5, max: 5.0, status: 'normal', action: 'Normal potassium level' },
                    { min: 5.0, max: 6.0, status: 'high', action: 'Hyperkalaemia - repeat urgent, ECG, consider treatment, review medications' },
                    { min: 6.0, max: 999, status: 'critically high', action: 'CRITICAL: Severe hyperkalaemia - ECG immediately, calcium gluconate, insulin/dextrose, senior review' }
                ]
            },
            'creatinine': {
                ranges: [
                    { min: 0, max: 60, status: 'low', action: 'Low creatinine - may indicate low muscle mass, malnutrition' },
                    { min: 60, max: 120, status: 'normal', action: 'Normal renal function' },
                    { min: 120, max: 200, status: 'mildly elevated', action: 'Mild renal impairment - calculate eGFR, review medications, hydration' },
                    { min: 200, max: 400, status: 'elevated', action: 'Moderate-severe renal impairment - nephrology input, adjust drug doses' },
                    { min: 400, max: 999, status: 'critically high', action: 'URGENT: Severe renal impairment - urgent nephrology review, consider dialysis' }
                ]
            },
            'glucose': {
                ranges: [
                    { min: 0, max: 3.0, status: 'critically low', action: 'CRITICAL: Severe hypoglycaemia - immediate glucose/dextrose, assess causes' },
                    { min: 3.0, max: 4.0, status: 'low', action: 'Hypoglycaemia - oral glucose if conscious, review medications' },
                    { min: 4.0, max: 7.0, status: 'normal (fasting)', action: 'Normal fasting glucose' },
                    { min: 7.0, max: 11.0, status: 'elevated', action: 'Hyperglycaemia - check HbA1c, assess for diabetes, lifestyle advice' },
                    { min: 11.0, max: 999, status: 'high', action: 'Significant hyperglycaemia - diabetic review, check ketones, insulin therapy' }
                ]
            },
            'haemoglobin': {
                ranges: [
                    { min: 0, max: 70, status: 'critically low', action: 'CRITICAL: Severe anaemia - urgent transfusion, investigate cause immediately' },
                    { min: 70, max: 100, status: 'low', action: 'Moderate anaemia - investigate cause, consider iron studies, B12, folate' },
                    { min: 100, max: 130, status: 'mild anaemia', action: 'Mild anaemia - screen for causes, iron studies, dietary advice' },
                    { min: 130, max: 180, status: 'normal', action: 'Normal haemoglobin' },
                    { min: 180, max: 999, status: 'high', action: 'Polycythaemia - investigate cause, consider haematology review' }
                ]
            },
            'wbc': {
                ranges: [
                    { min: 0, max: 2.0, status: 'critically low', action: 'URGENT: Severe leucopenia - infection risk, avoid crowds, urgent haematology' },
                    { min: 2.0, max: 4.0, status: 'low', action: 'Leucopenia - review medications, consider causes' },
                    { min: 4.0, max: 11.0, status: 'normal', action: 'Normal white cell count' },
                    { min: 11.0, max: 20.0, status: 'elevated', action: 'Leucocytosis - assess for infection, inflammation, stress response' },
                    { min: 20.0, max: 999, status: 'critically high', action: 'URGENT: Severe leucocytosis - infection/malignancy, urgent senior review' }
                ]
            }
        };
        
        const testData = interpretations[testName.toLowerCase()];
        if (!testData) {
            return {
                value,
                status: 'unknown',
                action: 'Please consult laboratory reference ranges',
                ranges: null
            };
        }
        
        const range = testData.ranges.find(r => value >= r.min && value < r.max);
        if (!range) {
            return {
                value,
                status: 'out of range',
                action: 'Value outside expected ranges - urgent review required',
                ranges: testData.ranges
            };
        }
        
        return {
            value,
            status: range.status,
            action: range.action,
            isCritical: range.status.includes('critically'),
            ranges: testData.ranges
        };
    }

    calculateTrend(values) {
        if (!values || values.length < 2) {
            return { trend: 'insufficient data', slope: 0 };
        }
        
        // Simple linear regression to calculate trend
        const n = values.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        
        values.forEach((point, index) => {
            const x = index;
            const y = point.value;
            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumX2 += x * x;
        });
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        // Calculate R-squared for trend strength
        const yMean = sumY / n;
        let ssTotal = 0, ssResidual = 0;
        
        values.forEach((point, index) => {
            const predicted = slope * index + intercept;
            ssTotal += Math.pow(point.value - yMean, 2);
            ssResidual += Math.pow(point.value - predicted, 2);
        });
        
        const rSquared = 1 - (ssResidual / ssTotal);
        
        return {
            trend: slope > 0.1 ? 'increasing' : slope < -0.1 ? 'decreasing' : 'stable',
            slope,
            intercept,
            strength: rSquared,
            predictedNext: slope * n + intercept
        };
    }

    assessTrendSignificance(testName, trendData, currentValue) {
        const { slope, trend } = trendData;
        
        if (trend === 'insufficient data') {
            return { significant: false, message: 'Need more data points for trend analysis' };
        }
        
        // Assess clinical significance based on test type and rate of change
        const significanceThresholds = {
            'potassium': { critical: 0.5, significant: 0.3 },
            'sodium': { critical: 3, significant: 2 },
            'creatinine': { critical: 50, significant: 30 },
            'haemoglobin': { critical: 20, significant: 10 },
            'wbc': { critical: 5, significant: 3 },
            'default': { critical: 10, significant: 5 }
        };
        
        const threshold = significanceThresholds[testName.toLowerCase()] || significanceThresholds['default'];
        const absSlope = Math.abs(slope);
        
        let significance;
        if (absSlope >= threshold.critical) {
            significance = 'critical';
        } else if (absSlope >= threshold.significant) {
            significance = 'significant';
        } else {
            significance = 'minor';
        }
        
        return {
            significant: significance !== 'minor',
            severity: significance,
            message: `${testName} showing ${trend} trend (rate: ${slope.toFixed(2)} per reading)`,
            recommendation: this.getTrendRecommendation(testName, trend, significance)
        };
    }

    getTrendRecommendation(testName, trend, significance) {
        if (significance === 'critical') {
            return `URGENT: Critical ${trend} trend in ${testName} - immediate senior review and intervention required`;
        }
        
        if (significance === 'significant') {
            if (trend === 'increasing') {
                return `Significant rising ${testName} - increase monitoring frequency, review management plan`;
            } else if (trend === 'decreasing') {
                return `Significant falling ${testName} - increase monitoring frequency, assess for causes`;
            }
        }
        
        return `${testName} trend stable - continue routine monitoring`;
    }

    getCriticalThresholds(testName) {
        const thresholds = {
            'potassium': { low: 2.5, high: 6.0, unit: 'mmol/L' },
            'sodium': { low: 125, high: 155, unit: 'mmol/L' },
            'glucose': { low: 3.0, high: 20.0, unit: 'mmol/L' },
            'haemoglobin': { low: 70, high: 200, unit: 'g/L' },
            'wbc': { low: 2.0, high: 20.0, unit: '×10⁹/L' },
            'platelets': { low: 50, high: 1000, unit: '×10⁹/L' },
            'creatinine': { low: null, high: 400, unit: 'μmol/L' },
            'bilirubin': { low: null, high: 100, unit: 'μmol/L' },
            'inr': { low: null, high: 5.0, unit: '' },
            'troponin': { low: null, high: 50, unit: 'ng/L' }
        };
        
        return thresholds[testName.toLowerCase()] || null;
    }

    getCriticalSeverity(testName, value, critical) {
        if (!critical) return 0;
        
        let severityScore = 0;
        
        if (critical.low !== null && value < critical.low) {
            const deviation = (critical.low - value) / critical.low;
            severityScore = Math.min(10, Math.floor(deviation * 10) + 5);
        }
        
        if (critical.high !== null && value > critical.high) {
            const deviation = (value - critical.high) / critical.high;
            severityScore = Math.min(10, Math.floor(deviation * 10) + 5);
        }
        
        return severityScore;
    }

    getCriticalActions(testName, value) {
        const actions = {
            'potassium': [
                'Urgent ECG - assess for hyperkalaemia/hypokalaemia changes',
                'Repeat urgent sample to confirm',
                'Review medications (ACEi, ARBs, spironolactone, NSAIDs)',
                'Senior/critical care review if >6.5 or <2.5'
            ],
            'sodium': [
                'Assess clinical status and hydration',
                'Paired serum and urine osmolality',
                'Review fluid balance and medications',
                'Correct slowly to avoid complications'
            ],
            'glucose': [
                'Check consciousness level and vital signs',
                'If <3.0: immediate glucose 15-20g or IV dextrose',
                'If >20: check ketones, assess for DKA',
                'Senior review and insulin sliding scale if indicated'
            ],
            'haemoglobin': [
                'Assess for active bleeding and haemodynamic stability',
                'Group and save / crossmatch if <80',
                'Transfusion threshold: <70 (or <80 if cardiac disease)',
                'Investigate cause: FBC, iron studies, B12, folate'
            ],
            'creatinine': [
                'Calculate eGFR and assess for AKI',
                'Review medications and adjust renal doses',
                'Fluid balance assessment',
                'Urgent nephrology if >400 or rapidly rising'
            ]
        };
        
        return actions[testName.toLowerCase()] || [
            'Repeat urgent sample to confirm',
            'Senior clinical review',
            'Review medications',
            'Increase monitoring frequency'
        ];
    }

    getAssociatedConditions(testName, value, status) {
        const conditions = {
            'potassium': {
                low: ['Diuretic use', 'Vomiting/diarrhoea', 'Hyperaldosteronism', 'Renal tubular acidosis'],
                high: ['Renal failure', 'ACEi/ARB use', 'Addisons disease', 'Rhabdomyolysis', 'Acidosis']
            },
            'sodium': {
                low: ['SIADH', 'Diuretics', 'Heart failure', 'Liver cirrhosis', 'Psychogenic polydipsia'],
                high: ['Dehydration', 'Diabetes insipidus', 'Hyperaldosteronism', 'Cushings syndrome']
            },
            'creatinine': {
                high: ['Acute kidney injury', 'Chronic kidney disease', 'Dehydration', 'Rhabdomyolysis', 'Obstruction']
            },
            'haemoglobin': {
                low: ['Iron deficiency', 'B12/folate deficiency', 'Chronic disease', 'Bleeding', 'Haemolysis'],
                high: ['Polycythaemia vera', 'Chronic hypoxia', 'Dehydration', 'Smoking']
            },
            'wbc': {
                low: ['Viral infection', 'Drug-induced', 'Bone marrow failure', 'Autoimmune'],
                high: ['Bacterial infection', 'Inflammation', 'Leukaemia', 'Steroids', 'Stress']
            }
        };
        
        const testConditions = conditions[testName.toLowerCase()];
        if (!testConditions) return [];
        
        if (status.includes('low')) return testConditions.low || [];
        if (status.includes('high')) return testConditions.high || [];
        
        return [];
    }

    getFollowUpTests(testName, value, status) {
        const followUp = {
            'potassium': ['U&Es repeat', 'ECG', 'Venous blood gas', 'Urinary electrolytes'],
            'sodium': ['Paired serum/urine osmolality', 'Thyroid function', 'Cortisol', 'U&Es repeat'],
            'creatinine': ['eGFR calculation', 'Urinalysis', 'Ultrasound kidneys', 'Previous creatinine for comparison'],
            'haemoglobin': ['Full blood count', 'Iron studies (ferritin, TIBC)', 'B12 and folate', 'Reticulocyte count'],
            'glucose': ['HbA1c', 'Fasting glucose repeat', 'C-peptide', 'Glucose tolerance test'],
            'wbc': ['Blood film', 'CRP', 'Blood cultures if febrile', 'Differential white count']
        };
        
        return followUp[testName.toLowerCase()] || ['Repeat test', 'Clinical correlation', 'Senior review'];
    }
}



// Export singleton instance
export const labValuesManager = new LabValuesManager();
export default LabValuesManager;

