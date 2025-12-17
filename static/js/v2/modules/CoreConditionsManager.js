/**
 * Core Conditions Manager
 * Manages the MLA Core Conditions comprehensive clinical reference
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { analytics } from './AnalyticsManager.js';

// Legacy fallback functions (if coreConditions.js exists)
let coreConditionsDatabase = [];
let getCondition = (id) => null;
let searchConditions = (query) => [];
let getConditionsByDomain = (domain) => [];
let getAllDomains = () => [];
let getStatistics = () => ({ total: 0, domains: [] });

// Legacy module loading promise
const legacyModulePromise = import('../../data/coreConditions.js')
    .then(legacyModule => {
        coreConditionsDatabase = legacyModule.coreConditions || [];
        getCondition = legacyModule.getCondition || getCondition;
        searchConditions = legacyModule.searchConditions || searchConditions;
        getConditionsByDomain = legacyModule.getConditionsByDomain || getConditionsByDomain;
        getAllDomains = legacyModule.getAllDomains || getAllDomains;
        getStatistics = legacyModule.getStatistics || getStatistics;
        console.log('Legacy coreConditions.js loaded');
    })
    .catch(error => {
        console.log('Legacy coreConditions.js not found - using enhanced JSON system only');
    });

export class CoreConditionsManager {
    constructor() {
        this.initialized = false;
        this.currentCondition = null;
        this.currentDomain = 'all';
        this.searchQuery = '';
        this.favoriteConditions = new Set();
        this.recentConditions = [];
        this.maxRecentConditions = 20;
        
        // Enhanced content system
        this.enhancedConditions = new Map();
        this.enhancedIndex = null;
        this.useEnhancedContent = true; // Prefer enhanced content when available
    }

    /**
     * Initialize the Core Conditions Manager
     */
    async initialize() {
        if (this.initialized) {
            console.warn('CoreConditionsManager already initialized');
            return;
        }

        try {
            // Load enhanced content index if available
            await this.loadEnhancedIndex();
            
            // Load user preferences
            await this.loadFavorites();
            await this.loadRecentConditions();

            this.initialized = true;
            console.log('📚 Core Conditions Manager initialized');
            
            const legacyStats = getStatistics();
            const enhancedStats = this.enhancedIndex ? {
                totalConditions: this.enhancedIndex.totalConditions,
                enhancedAvailable: true
            } : { enhancedAvailable: false };
            
            return {
                success: true,
                stats: { ...legacyStats, enhanced: enhancedStats }
            };
        } catch (error) {
            console.error('Failed to initialize CoreConditionsManager:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Load favorite conditions from storage
     */
    async loadFavorites() {
        try {
            const favorites = await storage.getItem('core-conditions-favorites');
            if (favorites) {
                this.favoriteConditions = new Set(JSON.parse(favorites));
            }
        } catch (error) {
            console.error('Failed to load favorites:', error);
        }
    }

    /**
     * Save favorite conditions to storage
     */
    async saveFavorites() {
        try {
            await storage.setItem('core-conditions-favorites', JSON.stringify(Array.from(this.favoriteConditions)));
        } catch (error) {
            console.error('Failed to save favorites:', error);
        }
    }

    /**
     * Toggle favorite status of a condition
     */
    async toggleFavorite(conditionId) {
        if (this.favoriteConditions.has(conditionId)) {
            this.favoriteConditions.delete(conditionId);
            analytics.trackEvent('core_condition_unfavorited', { conditionId });
        } else {
            this.favoriteConditions.add(conditionId);
            analytics.trackEvent('core_condition_favorited', { conditionId });
        }
        
        await this.saveFavorites();
        return this.favoriteConditions.has(conditionId);
    }

    /**
     * Check if a condition is favorited
     */
    isFavorite(conditionId) {
        return this.favoriteConditions.has(conditionId);
    }

    /**
     * Get all favorite conditions
     */
    getFavoriteConditions() {
        return Array.from(this.favoriteConditions)
            .map(id => ({ id, ...getCondition(id) }))
            .filter(c => c.name); // Filter out any invalid IDs
    }

    /**
     * Load recent conditions from storage
     */
    async loadRecentConditions() {
        try {
            const recent = await storage.getItem('core-conditions-recent');
            if (recent) {
                this.recentConditions = JSON.parse(recent);
            }
        } catch (error) {
            console.error('Failed to load recent conditions:', error);
        }
    }

    /**
     * Save recent conditions to storage
     */
    async saveRecentConditions() {
        try {
            await storage.setItem('core-conditions-recent', JSON.stringify(this.recentConditions));
        } catch (error) {
            console.error('Failed to save recent conditions:', error);
        }
    }

    /**
     * Add condition to recent history
     */
    async addToRecent(conditionId) {
        // Remove if already exists
        this.recentConditions = this.recentConditions.filter(id => id !== conditionId);
        
        // Add to beginning
        this.recentConditions.unshift(conditionId);
        
        // Limit size
        if (this.recentConditions.length > this.maxRecentConditions) {
            this.recentConditions = this.recentConditions.slice(0, this.maxRecentConditions);
        }
        
        await this.saveRecentConditions();
    }

    /**
     * Get recent conditions
     */
    getRecentConditions() {
        return this.recentConditions
            .map(id => ({ id, ...getCondition(id) }))
            .filter(c => c.name); // Filter out any invalid IDs
    }

    /**
     * Clear recent conditions
     */
    async clearRecentConditions() {
        this.recentConditions = [];
        await this.saveRecentConditions();
    }

    /**
     * Search conditions
     */
    search(query) {
        this.searchQuery = query;
        
        if (!query || query.trim() === '') {
            return this.getConditionsByCurrentDomain();
        }

        const results = searchConditions(query);
        
        // Filter by domain if not 'all'
        if (this.currentDomain !== 'all') {
            return results.filter(c => c.domain === this.currentDomain);
        }
        
        analytics.trackEvent('core_condition_searched', { query, results: results.length });
        return results;
    }

    /**
     * Set current domain filter
     */
    setDomain(domain) {
        this.currentDomain = domain;
        analytics.trackEvent('core_condition_domain_changed', { domain });
    }

    /**
     * Get conditions by current domain
     */
    getConditionsByCurrentDomain() {
        if (this.currentDomain === 'all') {
            return Object.entries(coreConditionsDatabase).map(([id, condition]) => ({ id, ...condition }));
        }
        return getConditionsByDomain(this.currentDomain);
    }

    /**
     * Get all available domains
     */
    getDomains() {
        return getAllDomains();
    }

    /**
     * Get a specific condition
     */
    getConditionById(conditionId) {
        const condition = getCondition(conditionId);
        if (condition) {
            return { id: conditionId, ...condition };
        }
        return null;
    }

    /**
     * View condition details
     */
    async viewCondition(conditionId) {
        const condition = this.getConditionById(conditionId);
        
        if (!condition) {
            console.error(`Condition not found: ${conditionId}`);
            return null;
        }

        this.currentCondition = condition;
        await this.addToRecent(conditionId);
        
        analytics.trackEvent('core_condition_viewed', {
            conditionId,
            conditionName: condition.name,
            domain: condition.domain
        });

        return condition;
    }

    /**
     * Get current condition
     */
    getCurrentCondition() {
        return this.currentCondition;
    }

    /**
     * Get statistics
     */
    getStats() {
        return getStatistics();
    }

    /**
     * Export condition as text
     */
    exportCondition(conditionId) {
        const condition = this.getConditionById(conditionId);
        if (!condition) return '';

        let text = `${condition.name}\n`;
        text += `${'='.repeat(condition.name.length)}\n\n`;
        text += `Domain: ${condition.domain}\n`;
        
        if (condition.synonyms && condition.synonyms.length > 0) {
            text += `Synonyms: ${condition.synonyms.join(', ')}\n`;
        }
        
        text += `\n## RECOGNITION\n\n`;
        text += `### Typical Presentation\n`;
        condition.recognition.typical.forEach(item => text += `• ${item}\n`);
        
        if (condition.recognition.atypical && condition.recognition.atypical.length > 0) {
            text += `\n### Atypical Presentation\n`;
            condition.recognition.atypical.forEach(item => text += `• ${item}\n`);
        }
        
        if (condition.recognition.examination && condition.recognition.examination.length > 0) {
            text += `\n### Examination Findings\n`;
            condition.recognition.examination.forEach(item => text += `• ${item}\n`);
        }
        
        if (condition.recognition.redFlags && condition.recognition.redFlags.length > 0) {
            text += `\n### 🚩 Red Flags\n`;
            condition.recognition.redFlags.forEach(item => text += `• ${item}\n`);
        }
        
        text += `\n## INVESTIGATION\n\n`;
        if (condition.investigation.immediate) {
            text += `### Immediate Investigations\n`;
            condition.investigation.immediate.forEach(item => text += `• ${item}\n`);
        }
        
        if (condition.investigation.further) {
            text += `\n### Further Investigations\n`;
            condition.investigation.further.forEach(item => text += `• ${item}\n`);
        }
        
        if (condition.investigation.interpretation) {
            text += `\n### Interpretation\n`;
            condition.investigation.interpretation.forEach(item => text += `• ${item}\n`);
        }
        
        text += `\n## DIAGNOSIS\n\n`;
        if (condition.diagnosis.criteria) {
            text += `### Diagnostic Criteria\n${condition.diagnosis.criteria}\n\n`;
        }
        
        if (condition.diagnosis.differential && condition.diagnosis.differential.length > 0) {
            text += `### Differential Diagnoses\n`;
            condition.diagnosis.differential.forEach(item => text += `• ${item}\n`);
        }
        
        text += `\n## MANAGEMENT\n\n`;
        text += `### First-Line Management\n`;
        
        if (condition.management.firstLine) {
            Object.entries(condition.management.firstLine).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    text += `\n**${key.charAt(0).toUpperCase() + key.slice(1)}:**\n`;
                    value.forEach(item => text += `• ${item}\n`);
                }
            });
        }
        
        if (condition.management.secondLine && condition.management.secondLine.length > 0) {
            text += `\n### Second-Line Management\n`;
            condition.management.secondLine.forEach(item => text += `• ${item}\n`);
        }
        
        if (condition.management.complications && condition.management.complications.length > 0) {
            text += `\n### Complications\n`;
            condition.management.complications.forEach(item => text += `• ${item}\n`);
        }
        
        if (condition.clinicalPearls && condition.clinicalPearls.length > 0) {
            text += `\n## 💎 CLINICAL PEARLS\n\n`;
            condition.clinicalPearls.forEach(item => text += `• ${item}\n`);
        }
        
        if (condition.prognosis) {
            text += `\n## PROGNOSIS\n\n${condition.prognosis}\n`;
        }
        
        return text;
    }

    /**
     * Copy condition to clipboard
     */
    async copyToClipboard(conditionId) {
        const text = this.exportCondition(conditionId);
        
        try {
            await navigator.clipboard.writeText(text);
            analytics.trackEvent('core_condition_copied', { conditionId });
            return true;
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            return false;
        }
    }

    /**
     * Print condition
     */
    printCondition(conditionId) {
        const condition = this.getConditionById(conditionId);
        if (!condition) return;

        // Create a print-friendly version
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${condition.name} - MLA Core Conditions</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        max-width: 800px;
                        margin: 20px auto;
                        padding: 20px;
                    }
                    h1 { color: #4F46E5; border-bottom: 3px solid #4F46E5; }
                    h2 { color: #0891B2; margin-top: 30px; }
                    h3 { color: #475569; }
                    ul { margin: 10px 0; }
                    .red-flag { color: #EF4444; font-weight: bold; }
                    @media print {
                        body { margin: 0; padding: 10mm; }
                    }
                </style>
            </head>
            <body>
                ${this.generatePrintHTML(condition)}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
        }, 250);
        
        analytics.trackEvent('core_condition_printed', { conditionId });
    }

    /**
     * Generate print-friendly HTML
     */
    generatePrintHTML(condition) {
        let html = `<h1>${condition.name}</h1>`;
        html += `<p><strong>Domain:</strong> ${condition.domain}</p>`;
        
        if (condition.synonyms && condition.synonyms.length > 0) {
            html += `<p><strong>Also known as:</strong> ${condition.synonyms.join(', ')}</p>`;
        }
        
        html += `<h2>Recognition</h2>`;
        html += `<h3>Typical Presentation</h3><ul>`;
        condition.recognition.typical.forEach(item => html += `<li>${item}</li>`);
        html += `</ul>`;
        
        if (condition.recognition.atypical && condition.recognition.atypical.length > 0) {
            html += `<h3>Atypical Presentation</h3><ul>`;
            condition.recognition.atypical.forEach(item => html += `<li>${item}</li>`);
            html += `</ul>`;
        }
        
        if (condition.recognition.redFlags && condition.recognition.redFlags.length > 0) {
            html += `<h3 class="red-flag">🚩 Red Flags</h3><ul>`;
            condition.recognition.redFlags.forEach(item => html += `<li>${item}</li>`);
            html += `</ul>`;
        }
        
        html += `<h2>Investigation</h2>`;
        if (condition.investigation.immediate) {
            html += `<h3>Immediate</h3><ul>`;
            condition.investigation.immediate.forEach(item => html += `<li>${item}</li>`);
            html += `</ul>`;
        }
        
        html += `<h2>Management</h2>`;
        if (condition.management.firstLine) {
            Object.entries(condition.management.firstLine).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    html += `<h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3><ul>`;
                    value.forEach(item => html += `<li>${item}</li>`);
                    html += `</ul>`;
                }
            });
        }
        
        if (condition.clinicalPearls && condition.clinicalPearls.length > 0) {
            html += `<h2>💎 Clinical Pearls</h2><ul>`;
            condition.clinicalPearls.forEach(item => html += `<li>${item}</li>`);
            html += `</ul>`;
        }
        
        return html;
    }

    /**
     * Get quick reference for a condition (summary)
     */
    getQuickReference(conditionId) {
        const condition = this.getConditionById(conditionId);
        if (!condition) return null;

        return {
            name: condition.name,
            domain: condition.domain,
            keyFeatures: condition.recognition.typical.slice(0, 3),
            redFlags: condition.recognition.redFlags ? condition.recognition.redFlags.slice(0, 3) : [],
            immediateInvestigations: condition.investigation.immediate ? condition.investigation.immediate.slice(0, 3) : [],
            firstLineManagement: this.extractFirstLineManagement(condition),
            topPearls: condition.clinicalPearls ? condition.clinicalPearls.slice(0, 2) : []
        };
    }

    /**
     * Extract first-line management summary
     */
    extractFirstLineManagement(condition) {
        const management = [];
        
        if (condition.management.firstLine) {
            Object.values(condition.management.firstLine).forEach(items => {
                if (Array.isArray(items)) {
                    management.push(...items.slice(0, 2));
                }
            });
        }
        
        return management.slice(0, 5);
    }

    /**
     * Load enhanced conditions index
     */
    async loadEnhancedIndex() {
        try {
            const response = await fetch('/static/coreconditions/generated/index.json');
            if (response.ok) {
                this.enhancedIndex = await response.json();
                console.log(`📖 Enhanced: Loaded index for ${this.enhancedIndex.totalConditions} conditions`);
                return true;
            }
        } catch (error) {
            console.warn('Enhanced conditions not available yet:', error.message);
        }
        return false;
    }

    /**
     * Get enhanced condition data
     */
    async getEnhancedCondition(conditionName) {
        if (!this.enhancedIndex) return null;

        // Find matching condition by name
        const condition = this.enhancedIndex.conditions.find(c => 
            c.name.toLowerCase() === conditionName.toLowerCase()
        );

        if (!condition) return null;

        // Check cache first
        if (this.enhancedConditions.has(condition.id)) {
            return this.enhancedConditions.get(condition.id);
        }

        // Load from server
        try {
            const response = await fetch(`/static/coreconditions/generated/${condition.filename}`);
            if (response.ok) {
                const data = await response.json();
                this.enhancedConditions.set(condition.id, data);
                return data;
            }
        } catch (error) {
            console.error(`Failed to load enhanced condition ${conditionName}:`, error);
        }
        
        return null;
    }

    /**
     * Get condition with enhanced data if available, fallback to legacy
     */
    async getConditionData(conditionId) {
        // Try enhanced first if available
        if (this.useEnhancedContent && this.enhancedIndex) {
            const enhanced = await this.getEnhancedCondition(conditionId);
            if (enhanced) {
                return this.formatEnhancedCondition(enhanced);
            }
        }

        // Fallback to legacy system
        return getCondition(conditionId);
    }

    /**
     * Format enhanced condition for compatibility with existing UI
     */
    formatEnhancedCondition(enhanced) {
        const content = enhanced.content;
        
        return {
            name: enhanced.name,
            domains: enhanced.domains,
            recognition: {
                typical: content.recognition.keySymptoms || [],
                atypical: content.recognition.atypicalPresentations || [],
                examination: content.recognition.keySigns || [],
                redFlags: content.recognition.redFlags || []
            },
            investigation: {
                immediate: content.investigation.firstLine || [],
                further: content.investigation.secondLine || [],
                specialist: content.investigation.specialistTests || []
            },
            diagnosis: {
                criteria: content.diagnosis.criteria || '',
                differential: content.diagnosis.differentials || []
            },
            management: {
                acute: {
                    firstLine: content.management.acute.firstLine || [],
                    secondLine: content.management.acute.secondLine || [],
                    procedures: content.management.acute.procedures || []
                },
                chronic: {
                    firstLine: content.management.chronic.firstLine || [],
                    secondLine: content.management.chronic.secondLine || [],
                    monitoring: content.management.chronic.monitoring || []
                },
                drugs: content.management.drugs || [],
                procedures: content.management.procedures || []
            },
            prognosis: content.prognosis || '',
            complications: content.complications || [],
            foundationRole: content.foundationDoctorRole || '',
            escalation: content.escalation || '',
            safetyConsiderations: content.keySafetyConsiderations || '',
            enhanced: true // Flag to indicate this is enhanced content
        };
    }

    /**
     * Search enhanced conditions
     */
    searchEnhancedConditions(query) {
        if (!this.enhancedIndex) return [];

        const lowerQuery = query.toLowerCase();
        return this.enhancedIndex.conditions.filter(condition =>
            condition.name.toLowerCase().includes(lowerQuery) ||
            condition.domains.some(domain => domain.toLowerCase().includes(lowerQuery))
        );
    }

    /**
     * Get drug information with mechanisms
     */
    async getDrugInformation(conditionName) {
        const enhanced = await this.getEnhancedCondition(conditionName);
        if (enhanced && enhanced.content.management.drugs) {
            return enhanced.content.management.drugs;
        }
        return [];
    }

    /**
     * Get procedure information
     */
    async getProcedureInformation(conditionName) {
        const enhanced = await this.getEnhancedCondition(conditionName);
        if (enhanced && enhanced.content.management.procedures) {
            return enhanced.content.management.procedures;
        }
        return [];
    }

    /**
     * Check if enhanced content is available
     */
    hasEnhancedContent() {
        return this.enhancedIndex !== null;
    }

    /**
     * Get enhanced statistics
     */
    getEnhancedStats() {
        if (!this.enhancedIndex) return null;
        
        return {
            totalConditions: this.enhancedIndex.totalConditions,
            generatedAt: this.enhancedIndex.generatedAt,
            cached: this.enhancedConditions.size
        };
    }
}

// Export singleton instance
export const coreConditionsManager = new CoreConditionsManager();
