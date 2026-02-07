/**
 * GuidelinesManager - Clinical Guidelines Reference System
 * Manages NICE and specialty clinical guidelines
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { StandardizedSearchComponent } from '../components/StandardizedSearchComponent.js';

export class GuidelinesManager {
    constructor() {
        this.guidelinesDatabase = null;
        this.recentGuidelines = [];
        this.maxRecent = 10;
        this.initialized = false;
        this.dataLoaded = false;
        
        // Initialize search component with guideline-specific filters
        this.searchComponent = new StandardizedSearchComponent({
            placeholder: "Search guidelines by title, category, or organization...",
            searchIcon: "📋",
            emptyStateMessage: "No guidelines match your search criteria",
            filterOptions: [
                { value: 'all', label: 'All Guidelines' },
                { value: 'cardiovascular', label: 'Cardiovascular' },
                { value: 'pulmonary', label: 'Pulmonary' },
                { value: 'endocrine', label: 'Endocrine' },
                { value: 'renal', label: 'Renal' },
                { value: 'rheumatologic', label: 'Rheumatology' },
                { value: 'hematologic', label: 'Haematology' },
                { value: 'emergency', label: 'Emergency' },
                { value: 'obstetrics', label: 'Obstetrics' },
                { value: 'mental-health', label: 'Mental Health' },
                { value: 'neurological', label: 'Neurological' },
                { value: 'infectious-diseases', label: 'Infectious Diseases' }
            ],
            onSearch: (searchTerm, filter) => this.handleSearch(searchTerm, filter),
            onFilter: (filter, searchTerm) => this.handleFilter(filter, searchTerm),
            onClear: () => this.handleClear()
        });

        this.currentSearchTerm = '';
        this.currentFilter = 'all';
    }

    /**
     * Initialize the guidelines manager
     * Loads the external guidelines database
     */
    async initialize() {
        if (this.initialized) {
            console.log('📋 GuidelinesManager already initialized, skipping...');
            return true;
        }

        console.log('📋 Initializing GuidelinesManager...');
        
        // Load recent guidelines from storage (lightweight)
        const stored = storage.getItem('recentGuidelines');
        if (stored) {
            this.recentGuidelines = stored;
        }

        // Load guidelines database immediately
        console.log('📋 Loading guidelines database...');
        const maxRetries = 5;
        let retries = 0;
        
        while (retries < maxRetries) {
            if (window.guidelinesDatabase) {
                this.guidelinesDatabase = window.guidelinesDatabase;
                console.log('✅ Guidelines database loaded with', Object.keys(this.guidelinesDatabase).length, 'guidelines');
                break;
            } else {
                retries++;
                console.log(`⏳ Waiting for guidelines database... (attempt ${retries}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
        
        if (retries >= maxRetries) {
            console.warn('⚠️ Guidelines database not loaded after retries. Using empty database.');
            this.guidelinesDatabase = {};
        }
        
        this.initialized = true;
        console.log('✅ GuidelinesManager initialized with data loaded');
        
        eventBus.emit('GUIDELINES_MANAGER_READY', {
            count: Object.keys(this.guidelinesDatabase).length,
            categories: this.getCategories(),
            lazyLoaded: false
        });

        eventBus.emit('GUIDELINES_DATA_LOADED', {
            count: Object.keys(this.guidelinesDatabase).length,
            categories: this.getCategories()
        });

        return true;
    }



    /**
     * Search guidelines by title, category, or content
     * @param {string} query - Search query
     * @returns {Array} Matching guidelines
     */
    async searchGuidelines(query) {
        
        if (!query || query.length < 2) {
            return [];
        }

        const searchTerm = query.toLowerCase();
        const results = [];

        for (const [key, guideline] of Object.entries(this.guidelinesDatabase)) {
            // Search in title, category, and key
            if (guideline.title.toLowerCase().includes(searchTerm) ||
                guideline.category.toLowerCase().includes(searchTerm) ||
                key.toLowerCase().includes(searchTerm) ||
                guideline.organisation?.toLowerCase().includes(searchTerm)) {
                results.push({
                    key: key,
                    title: guideline.title,
                    category: guideline.category,
                    organisation: guideline.organisation,
                    lastUpdated: guideline.lastUpdated
                });
            }
        }

        eventBus.emit('GUIDELINES_SEARCHED', {
            query: query,
            resultsCount: results.length
        });

        return results;
    }

    /**
     * Handle search from StandardizedSearchComponent
     */
    handleSearch(searchTerm, filter) {
        this.currentSearchTerm = searchTerm;
        this.currentFilter = filter;
        // Trigger the existing search functionality
        console.log(`Guidelines search: "${searchTerm}" with filter: "${filter}"`);
    }

    /**
     * Handle filter change from StandardizedSearchComponent
     */
    handleFilter(filter, searchTerm) {
        this.currentFilter = filter;
        this.currentSearchTerm = searchTerm;
        console.log(`Guidelines filter changed: "${filter}" with search: "${searchTerm}"`);
    }

    /**
     * Handle clear from StandardizedSearchComponent
     */
    handleClear() {
        this.currentSearchTerm = '';
        this.currentFilter = 'all';
        console.log('Guidelines search cleared');
    }

    /**
     * Get all available categories
     * @returns {Array} List of categories with icons
     */
    async getCategories() {
        
        const categories = [
            { id: 'all', name: 'All Guidelines', icon: '📋', count: Object.keys(this.guidelinesDatabase).length },
            { id: 'cardiovascular', name: 'Cardiovascular', icon: '❤️', count: 0 },
            { id: 'pulmonary', name: 'Pulmonary', icon: '🫁', count: 0 },
            { id: 'endocrine', name: 'Endocrine', icon: '🩺', count: 0 },
            { id: 'renal', name: 'Renal', icon: '🫘', count: 0 },
            { id: 'rheumatologic', name: 'Rheumatology', icon: '🦴', count: 0 },
            { id: 'hematologic', name: 'Haematology', icon: '🩸', count: 0 },
            { id: 'emergency', name: 'Emergency', icon: '🚨', count: 0 },
            { id: 'obstetrics', name: 'Obstetrics', icon: '🤰', count: 0 },
            { id: 'mental-health', name: 'Mental Health', icon: '🧠', count: 0 },
            { id: 'neurological', name: 'Neurological', icon: '🧬', count: 0 },
            { id: 'infectious-diseases', name: 'Infectious Diseases', icon: '🦠', count: 0 }
        ];

        // Count guidelines in each category
        for (const guideline of Object.values(this.guidelinesDatabase)) {
            const category = categories.find(c => c.id === guideline.category);
            if (category) {
                category.count++;
            }
        }

        return categories.filter(c => c.id === 'all' || c.count > 0);
    }

    /**
     * Get all guidelines in a category
     * @param {string} categoryId - Category ID
     * @returns {Array} Guidelines in category
     */
    async getGuidelinesByCategory(categoryId) {
        
        if (categoryId === 'all') {
            return Object.entries(this.guidelinesDatabase).map(([key, guideline]) => ({
                key: key,
                ...guideline
            }));
        }

        return Object.entries(this.guidelinesDatabase)
            .filter(([_, guideline]) => guideline.category === categoryId)
            .map(([key, guideline]) => ({
                key: key,
                ...guideline
            }));
    }

    /**
     * Get a specific guideline by key
     * @param {string} guidelineKey - Guideline key
     * @returns {Object} Guideline details
     */
    async getGuideline(guidelineKey) {
        
        const guideline = this.guidelinesDatabase[guidelineKey];
        
        if (guideline) {
            // Add to recent
            this.addToRecent(guidelineKey, guideline.title);
            
            eventBus.emit('GUIDELINE_VIEWED', {
                key: guidelineKey,
                title: guideline.title,
                category: guideline.category
            });

            return {
                key: guidelineKey,
                ...guideline
            };
        }

        return null;
    }

    /**
     * Add guideline to recent list
     * @param {string} key - Guideline key
     * @param {string} title - Guideline title
     */
    addToRecent(key, title) {
        // Remove if already exists
        this.recentGuidelines = this.recentGuidelines.filter(g => g.key !== key);
        
        // Add to beginning
        this.recentGuidelines.unshift({
            key: key,
            title: title,
            timestamp: Date.now()
        });

        // Keep only last maxRecent
        if (this.recentGuidelines.length > this.maxRecent) {
            this.recentGuidelines = this.recentGuidelines.slice(0, this.maxRecent);
        }

        // Save to storage
        storage.setItem('recentGuidelines', this.recentGuidelines);
    }

    /**
     * Get recent guidelines
     * @returns {Array} Recent guidelines
     */
    async getRecentGuidelines() {
        
        return this.recentGuidelines.map(recent => {
            const guideline = this.guidelinesDatabase[recent.key];
            return {
                key: recent.key,
                title: recent.title,
                category: guideline?.category,
                timestamp: recent.timestamp
            };
        });
    }

    /**
     * Get statistics about guidelines database
     * @returns {Object} Statistics
     */
    getStatistics() {
        
        const categories = {};
        const organisations = {};

        for (const guideline of Object.values(this.guidelinesDatabase)) {
            // Count by category
            categories[guideline.category] = (categories[guideline.category] || 0) + 1;
            
            // Count by organisation
            if (guideline.organisation) {
                organisations[guideline.organisation] = (organisations[guideline.organisation] || 0) + 1;
            }
        }

        return {
            total: Object.keys(this.guidelinesDatabase).length,
            categories: categories,
            organisations: organisations,
            recentCount: this.recentGuidelines.length
        };
    }

    /**
     * Get guidelines count
     * @returns {number} Total guidelines count
     */
    async getGuidelinesCount() {
        
        return Object.keys(this.guidelinesDatabase).length;
    }

    /**
     * Format guideline for display
     * @param {string} key - Guideline key
     * @returns {string} Formatted HTML
     */
    async formatGuidelineDetail(key) {
        
        const guideline = this.getGuideline(key);
        if (!guideline) {
            return '<p>Guideline not found</p>';
        }

        let html = `
            <div class="guideline-detail">
                <h3>${guideline.title}</h3>
                <div class="guideline-meta">
                    <span class="evidence-level">📋 ${guideline.evidenceLevel || 'Evidence-based'}</span>
                    <span class="last-updated">🗓️ ${guideline.lastUpdated || 'Recent'}</span>
                    <span class="organisation">🏥 ${guideline.organisation || 'Clinical Guideline'}</span>
                </div>
        `;

        // Render sections based on what's available
        const sections = [
            { key: 'stages', title: '📊 Stages/Classification', icon: '📊' },
            { key: 'types', title: '📊 Types/Classification', icon: '📊' },
            { key: 'classification', title: '📊 Classification', icon: '📊' },
            { key: 'diagnosis', title: '🔬 Diagnosis', icon: '🔬' },
            { key: 'assessment', title: '📋 Assessment', icon: '📋' },
            { key: 'recognition', title: '🔍 Recognition', icon: '🔍' },
            { key: 'targets', title: '🎯 Treatment Targets', icon: '🎯' },
            { key: 'treatment', title: '💊 Treatment Recommendations', icon: '💊' },
            { key: 'algorithm', title: '🔄 Treatment Algorithm', icon: '🔄' },
            { key: 'medications', title: '💊 Medication Classes', icon: '💊' },
            { key: 'rateControl', title: '🎯 Rate Control Strategy', icon: '🎯' },
            { key: 'rhythmControl', title: '🔄 Rhythm Control Strategy', icon: '🔄' },
            { key: 'anticoagulation', title: '🩸 Anticoagulation Management', icon: '🩸' },
            { key: 'stemi', title: '🚨 STEMI Management', icon: '🚨' },
            { key: 'nstemi', title: '⚠️ NSTEMI Management', icon: '⚠️' },
            { key: 'secondary prevention', title: '🛡️ Secondary Prevention', icon: '🛡️' },
            { key: 'lifestyle', title: '🏃‍♂️ Lifestyle Modifications', icon: '🏃‍♂️' },
            { key: 'monitoring', title: '📊 Monitoring', icon: '📊' },
            { key: 'exacerbations', title: '🚨 Exacerbation Management', icon: '🚨' },
            { key: 'acute', title: '🚨 Acute Management', icon: '🚨' },
            { key: 'specialPopulations', title: '👨‍⚕️ Special Populations', icon: '👨‍⚕️' },
            { key: 'complications', title: '⚠️ Complications', icon: '⚠️' },
            { key: 'prevention', title: '🛡️ Prevention', icon: '🛡️' },
            { key: 'referral', title: '🏥 Referral Criteria', icon: '🏥' },
            { key: 'infectionOverview', title: '🦠 Infection Overview', icon: '🦠' },
            { key: 'bacterialInfections', title: '🧫 Bacterial Infection Therapy', icon: '🧫' },
            { key: 'viralInfections', title: '🧬 Viral Infection Therapy', icon: '🧬' },
            { key: 'fungalInfections', title: '🍄 Fungal Infection Therapy', icon: '🍄' },
            { key: 'stewardship', title: '📏 Antimicrobial Stewardship', icon: '📏' }
        ];

        for (const section of sections) {
            if (guideline[section.key]) {
                html += `<div class="info-section"><h4>${section.title}</h4>`;
                
                const data = guideline[section.key];
                if (typeof data === 'string') {
                    html += `<p>${data}</p>`;
                } else if (typeof data === 'object') {
                    html += '<div class="guideline-list">';
                    for (const [key, value] of Object.entries(data)) {
                        html += `
                            <div class="guideline-item">
                                <strong>${key}:</strong> ${value}
                            </div>
                        `;
                    }
                    html += '</div>';
                }
                
                html += '</div>';
            }
        }


        html += '</div>';
        return html;
    }

    /**
     * Get manager info for statistics
     * @returns {Object} Manager info with counts
     */
    async getInfo() {
        
        return {
            totalGuidelines: Object.keys(this.guidelinesDatabase || {}).length,
            categories: this.getCategories().length,
            recent: this.recentGuidelines.length
        };
    }
}

// Export singleton instance
export const guidelinesManager = new GuidelinesManager();
export default GuidelinesManager;
