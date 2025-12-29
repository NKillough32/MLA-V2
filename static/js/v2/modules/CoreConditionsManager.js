/**
 * Core Conditions Manager
 * Manages the MLA Core Conditions comprehensive clinical reference
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { analytics } from './AnalyticsManager.js';

export class CoreConditionsManager {
    constructor() {
        this.initialized = false;
        this.currentCondition = null;
        this.currentDomain = 'all';
        this.searchQuery = '';
        this.favoriteConditions = new Set();
        this.recentConditions = [];
        this.maxRecentConditions = 20;
        
        // Enhanced JSON-based content system
        this.enhancedConditions = new Map();
        this.enhancedIndex = null;
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
            
            const stats = this.enhancedIndex ? {
                totalConditions: this.enhancedIndex.totalConditions,
                processedCount: this.enhancedIndex.processedCount,
                domains: this.getAllDomains()
            } : { totalConditions: 0, domains: [] };
            
            return {
                success: true,
                stats: stats
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
        if (!this.enhancedIndex) return [];
        
        return Array.from(this.favoriteConditions)
            .map(id => this.enhancedIndex.conditions.find(c => c.id === id))
            .filter(c => c); // Filter out any invalid IDs
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
        if (!this.enhancedIndex) return [];
        
        return this.recentConditions
            .map(id => this.enhancedIndex.conditions.find(c => c.id === id))
            .filter(c => c); // Filter out any invalid IDs
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

        const results = this.searchEnhancedConditions(query);
        
        // Filter by domain if not 'all'
        if (this.currentDomain !== 'all') {
            return results.filter(c => c.domains.includes(this.currentDomain));
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
        if (!this.enhancedIndex) return [];
        
        if (this.currentDomain === 'all') {
            return this.enhancedIndex.conditions;
        }
        
        return this.enhancedIndex.conditions.filter(c => 
            c.domains.includes(this.currentDomain)
        );
    }

    /**
     * Get all available domains
     */
    getDomains() {
        return this.getAllDomains();
    }

    /**
     * Get all available domains from enhanced index
     */
    getAllDomains() {
        if (!this.enhancedIndex) return [];
        
        const domainsSet = new Set();
        this.enhancedIndex.conditions.forEach(condition => {
            condition.domains.forEach(domain => {
                // Filter out invalid domains
                if (domain && domain !== 'nan' && domain !== 'undefined' && domain.toLowerCase() !== 'nan') {
                    domainsSet.add(domain);
                }
            });
        });
        
        return Array.from(domainsSet).sort();
    }

    /**
     * Get a specific condition
     */
    async getConditionById(conditionId) {
        if (!this.enhancedIndex) return null;
        
        const indexEntry = this.enhancedIndex.conditions.find(c => c.id === conditionId);
        if (!indexEntry) return null;
        
        // Load full condition data
        const enhanced = await this.getEnhancedCondition(indexEntry.name);
        if (enhanced) {
            return this.formatEnhancedCondition(enhanced);
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
        if (!this.enhancedIndex) {
            return {
                total: 0,
                domains: [],
                processed: 0
            };
        }
        
        return {
            total: this.enhancedIndex.totalConditions,
            domains: this.getAllDomains(),
            processed: this.enhancedIndex.processedCount,
            cached: this.enhancedConditions.size
        };
    }

    /**
     * Export condition as text
     */
    async exportCondition(conditionId) {
        const condition = await this.getConditionById(conditionId);
        if (!condition) return '';

        let text = `${condition.name}\n`;
        text += `${'='.repeat(condition.name.length)}\n\n`;
        text += `Domain: ${condition.domains ? condition.domains[0] : (condition.domain || 'General')}\n`;
        
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
        const text = await this.exportCondition(conditionId);
        
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
    async printCondition(conditionId) {
        const condition = await this.getConditionById(conditionId);
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
    async getQuickReference(conditionId) {
        const condition = await this.getConditionById(conditionId);
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
     * Get condition data from enhanced JSON system
     */
    async getConditionData(conditionId) {
        if (!this.enhancedIndex) return null;
        
        const indexEntry = this.enhancedIndex.conditions.find(c => c.id === conditionId);
        if (!indexEntry) return null;
        
        const enhanced = await this.getEnhancedCondition(indexEntry.name);
        if (enhanced) {
            return this.formatEnhancedCondition(enhanced);
        }
        
        return null;
    }

    /**
     * Format enhanced condition for compatibility with existing UI
     */
    formatEnhancedCondition(enhanced) {
        const content = enhanced.content;
        
        return {
            name: enhanced.name,
            domains: enhanced.domains,
            overview: content.overview || null,
            recognition: {
                typical: content.recognition?.symptoms || [],
                atypical: content.recognition?.atypicalPresentations || [],
                examination: content.recognition?.signs || [],
                redFlags: content.recognition?.redFlags || []
            },
            investigation: {
                immediate: content.investigation?.firstLine || [],
                further: content.investigation?.secondLine || [],
                specialist: content.investigation?.specialistTests || [],
                interpretation: []
            },
            diagnosis: {
                criteria: content.diagnosis?.criteria || '',
                differential: content.diagnosis?.differentials || []
            },
            management: {
                acute: content.management?.acute || null,
                chronic: content.management?.chronic || null,
                complications: content.complications || [],
                drugs: content.management?.drugs || [],
                procedures: content.management?.procedures || []
                ,
                // Pass through any related conditions defined in the enhanced JSON
                relatedConditions: enhanced.relatedConditions || content.relatedConditions || []
            },
            clinicalPearls: content.clinicalPearls || [],
            prognosis: content.prognosis || '',
            foundationRole: content.foundationDoctorRole || '',
            escalation: content.escalation || '',
            safetyConsiderations: content.keySafetyConsiderations || '',
            drugs: content.management?.drugs || [],
            procedures: content.management?.procedures || [],
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
        if (enhanced && enhanced.content?.management?.drugs) {
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
