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
    }

    async initialize() {
        console.log('🧪 Initializing LabValuesManager...');
        
        // Load lab database from window.labDatabase (loaded from labDatabase.js)
        if (typeof window.labDatabase !== 'undefined') {
            this.labDatabase = window.labDatabase;
            console.log(`✅ Lab database loaded: ${Object.keys(this.labDatabase).length} panels`);
        } else {
            console.warn('⚠️ Lab database not loaded. Using empty database.');
            this.labDatabase = {};
        }

        // Load recent labs from storage
        this.recentLabs = this.storage.getItem('recentLabs', []);
        
        const totalTests = Object.values(this.labDatabase).reduce((sum, panel) => 
            sum + Object.keys(panel.values || {}).length, 0
        );
        
        this.eventBus.emit('LAB_MANAGER_READY', { 
            panelCount: Object.keys(this.labDatabase).length,
            testCount: totalTests
        });
        
        console.log('✅ LabValuesManager initialized');
    }

    /**
     * Search labs by panel name or test name
     */
    searchLabs(query) {
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
    getPanels() {
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
    getPanel(panelKey) {
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
    getTest(panelKey, testKey) {
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
    getRecentLabs() {
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
    getPanelsByCategory(categoryId) {
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
    getPanelCount() {
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
    getTestCount() {
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
}



// Export singleton instance
export const labValuesManager = new LabValuesManager();
export default LabValuesManager;

