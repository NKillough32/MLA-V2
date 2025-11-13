/**
 * MnemonicsManager.js - V2 Medical Mnemonics Manager
 * 
 * Manages medical mnemonics database with search, categorization and display functionality.
 * Extracted from V1 to provide clean, modular architecture for V2.
 * 
 * Features:
 * - 50+ medical mnemonics across 14 specialties
 * - Search by mnemonic, title, meaning, or category
 * - Category filtering
 * - Detailed breakdown view
 * - Recent tracking
 */

import { mnemonicsDatabase } from '../../data/mnemonics.js';

export class MnemonicsManager {
    constructor() {
        this.mnemonicsDatabase = mnemonicsDatabase;
        this.recentMnemonics = [];
        this.maxRecentItems = 10;
        this.searchCache = new Map();
        
        console.log('🧠 MnemonicsManager initialized with', Object.keys(this.mnemonicsDatabase).length, 'mnemonics');
    }

    /**
     * Initialize the mnemonics manager
     */
    initialize() {
        console.log('🧠 MnemonicsManager initialize() called');
        // Manager is already initialized in constructor
        return Promise.resolve();
    }

    /**
     * Load and display mnemonics panel
     */
    loadMnemonics() {
        try {
            const container = document.getElementById('mnemonics-panel');
            if (!container) {
                console.error('❌ Mnemonics panel container not found');
                return;
            }

            container.innerHTML = `
                <div class="search-container">
                    <input type="text" id="mnemonics-search" placeholder="Search mnemonics..." class="tool-search">
                    <button id="mnemonics-search-btn">🔍</button>
                </div>
                <div id="mnemonics-search-results" class="lab-grid"></div>
                <div class="mnemonics-categories">
                    <button class="category-btn active" onclick="window.mnemonicsManager.showMnemonicsCategory('all'); event.stopPropagation();">All Mnemonics</button>
                    <button class="category-btn" onclick="window.mnemonicsManager.showMnemonicsCategory('cardiovascular'); event.stopPropagation();">Cardiovascular</button>
                    <button class="category-btn" onclick="window.mnemonicsManager.showMnemonicsCategory('respiratory'); event.stopPropagation();">Respiratory</button>
                    <button class="category-btn" onclick="window.mnemonicsManager.showMnemonicsCategory('neurology'); event.stopPropagation();">Neurology</button>
                    <button class="category-btn" onclick="window.mnemonicsManager.showMnemonicsCategory('gastroenterology'); event.stopPropagation();">Gastroenterology</button>
                    <button class="category-btn" onclick="window.mnemonicsManager.showMnemonicsCategory('renal'); event.stopPropagation();">Renal</button>
                    <button class="category-btn" onclick="window.mnemonicsManager.showMnemonicsCategory('endocrine'); event.stopPropagation();">Endocrine</button>
                    <button class="category-btn" onclick="window.mnemonicsManager.showMnemonicsCategory('infectious'); event.stopPropagation();">Infectious</button>
                    <button class="category-btn" onclick="window.mnemonicsManager.showMnemonicsCategory('emergency'); event.stopPropagation();">Emergency</button>
                    <button class="category-btn" onclick="window.mnemonicsManager.showMnemonicsCategory('rheumatology'); event.stopPropagation();">Rheumatology</button>
                    <button class="category-btn" onclick="window.mnemonicsManager.showMnemonicsCategory('pharmacology'); event.stopPropagation();">Pharmacology</button>
                    <button class="category-btn" onclick="window.mnemonicsManager.showMnemonicsCategory('haematology'); event.stopPropagation();">Haematology</button>
                    <button class="category-btn" onclick="window.mnemonicsManager.showMnemonicsCategory('psychiatry'); event.stopPropagation();">Psychiatry</button>
                    <button class="category-btn" onclick="window.mnemonicsManager.showMnemonicsCategory('dermatology'); event.stopPropagation();">Dermatology</button>
                </div>
                <div id="mnemonics-list" class="lab-grid"></div>
            `;
            
            this.setupSearchHandlers();
            this.showMnemonicsCategory('all');
            console.log('✅ Mnemonics loaded successfully!');
            
        } catch (error) {
            console.error('❌ Error loading mnemonics:', error);
            this.showError('Unable to load mnemonics. Please refresh the page.');
        }
    }

    /**
     * Setup search event handlers
     */
    setupSearchHandlers() {
        const searchInput = document.getElementById('mnemonics-search');
        const searchBtn = document.getElementById('mnemonics-search-btn');
        
        if (searchInput && searchBtn) {
            searchInput.addEventListener('input', () => this.searchMnemonics());
            searchBtn.addEventListener('click', () => this.searchMnemonics());
        }
    }

    /**
     * Search mnemonics database
     */
    searchMnemonics() {
        const searchInput = document.getElementById('mnemonics-search');
        const resultsContainer = document.getElementById('mnemonics-search-results');
        
        if (!searchInput || !resultsContainer) return;
        
        const query = searchInput.value.toLowerCase().trim();
        
        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }

        // Check cache first
        const cacheKey = `search_${query}`;
        if (this.searchCache.has(cacheKey)) {
            resultsContainer.innerHTML = this.searchCache.get(cacheKey);
            return;
        }
        
        const matches = Object.keys(this.mnemonicsDatabase).filter(key => {
            const mnemonic = this.mnemonicsDatabase[key];
            return mnemonic.title.toLowerCase().includes(query) ||
                   mnemonic.mnemonic.toLowerCase().includes(query) ||
                   mnemonic.meaning.toLowerCase().includes(query) ||
                   mnemonic.category.toLowerCase().includes(query) ||
                   mnemonic.usage.toLowerCase().includes(query);
        });
        
        let html = '';
        if (matches.length === 0) {
            html = '<div class="no-results">No mnemonics found</div>';
        } else {
            html = matches.map(key => {
                const mnemonic = this.mnemonicsDatabase[key];
                return `
                    <button class="lab-value-btn" onclick="window.mnemonicsManager.showMnemonicDetail('${key}'); event.stopPropagation();">
                        <div class="lab-name">${mnemonic.mnemonic}</div>
                        <div class="lab-count">${mnemonic.title}</div>
                    </button>
                `;
            }).join('');
        }
        
        // Cache the result
        this.searchCache.set(cacheKey, html);
        resultsContainer.innerHTML = html;
    }

    /**
     * Show mnemonics by category
     * @param {string} category - Category to filter by
     */
    showMnemonicsCategory(category) {
        const mnemonicsList = document.getElementById('mnemonics-list');
        if (!mnemonicsList) return;
        
        let mnemonics = Object.keys(this.mnemonicsDatabase);
        
        // Reset container to grid layout for list view
        mnemonicsList.style.display = 'grid';
        
        // Update active state of category buttons
        const categoryButtons = document.querySelectorAll('.mnemonics-categories .category-btn');
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase().includes(category) || (category === 'all' && btn.textContent.includes('All'))) {
                btn.classList.add('active');
            }
        });
        
        if (category !== 'all') {
            mnemonics = mnemonics.filter(key => 
                this.mnemonicsDatabase[key].category === category
            );
        }
        
        mnemonicsList.innerHTML = mnemonics.map(key => {
            const mnemonic = this.mnemonicsDatabase[key];
            return `
                <button class="lab-value-btn" onclick="window.mnemonicsManager.showMnemonicDetail('${key}'); event.stopPropagation();">
                    <div class="lab-name">${mnemonic.mnemonic}</div>
                    <div class="lab-count">${mnemonic.title}</div>
                </button>
            `;
        }).join('');
    }

    /**
     * Show detailed view for a specific mnemonic
     * @param {string} mnemonicKey - Key of the mnemonic to display
     */
    showMnemonicDetail(mnemonicKey) {
        const mnemonic = this.mnemonicsDatabase[mnemonicKey];
        if (!mnemonic) return;
        
        const mnemonicsList = document.getElementById('mnemonics-list');
        if (!mnemonicsList) return;
        
        // Add to recent
        this.addToRecent(mnemonicKey);
        
        // Change to block layout for detail view
        mnemonicsList.style.display = 'block';
        
        const html = `
            <div class="guideline-detail">
                <button class="back-btn" onclick="window.mnemonicsManager.showMnemonicsCategory('all'); event.stopPropagation();">← Back to Mnemonics</button>
                <h3>🧠 ${mnemonic.title}</h3>
                
                <div class="info-section">
                    <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; margin-bottom: 20px;">
                        <div style="font-size: 2.5em; font-weight: bold; letter-spacing: 3px; margin-bottom: 10px;">${mnemonic.mnemonic}</div>
                        <div style="font-size: 1.1em; opacity: 0.95;">${mnemonic.meaning}</div>
                    </div>
                </div>
                
                <div class="info-section">
                    <h4>📋 Clinical Use</h4>
                    <p>${mnemonic.usage}</p>
                </div>
                
                <div class="info-section">
                    <h4>🔍 Breakdown</h4>
                    <div class="treatment-item" style="line-height: 1.8;">
                        ${mnemonic.details.map(detail => 
                            detail === '' ? '<div style="height: 10px;"></div>' : `<div style="padding: 8px 0; border-left: 3px solid #667eea; padding-left: 15px; margin: 5px 0;">${detail}</div>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
        
        mnemonicsList.innerHTML = html;
    }

    /**
     * Add mnemonic to recent items
     * @param {string} mnemonicKey - Key of the mnemonic
     */
    addToRecent(mnemonicKey) {
        // Remove if already exists
        this.recentMnemonics = this.recentMnemonics.filter(key => key !== mnemonicKey);
        
        // Add to beginning
        this.recentMnemonics.unshift(mnemonicKey);
        
        // Limit to max items
        if (this.recentMnemonics.length > this.maxRecentItems) {
            this.recentMnemonics = this.recentMnemonics.slice(0, this.maxRecentItems);
        }
    }

    /**
     * Get recent mnemonics
     * @returns {Array} Array of recent mnemonic keys
     */
    getRecentMnemonics() {
        return this.recentMnemonics;
    }

    /**
     * Get all available categories
     * @returns {Array} Array of unique categories
     */
    getCategories() {
        const categories = [...new Set(Object.values(this.mnemonicsDatabase).map(m => m.category))];
        return categories.sort();
    }

    /**
     * Get mnemonics count by category
     * @returns {Object} Object with category counts
     */
    getCategoryCounts() {
        const counts = {};
        Object.values(this.mnemonicsDatabase).forEach(mnemonic => {
            counts[mnemonic.category] = (counts[mnemonic.category] || 0) + 1;
        });
        return counts;
    }

    /**
     * Get statistics about mnemonics database
     * @returns {Object} Statistics object
     */
    getStatistics() {
        const categories = this.getCategories();
        const counts = this.getCategoryCounts();
        
        return {
            totalMnemonics: Object.keys(this.mnemonicsDatabase).length,
            totalCategories: categories.length,
            categories: categories,
            categoryCounts: counts,
            recentCount: this.recentMnemonics.length
        };
    }

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        const container = document.getElementById('mnemonics-panel');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ Mnemonics Loading Error</h3>
                    <p>${message}</p>
                    <button onclick="window.mnemonicsManager.loadMnemonics()">Retry</button>
                </div>
            `;
        }
    }
}

// Create singleton instance
const mnemonicsManager = new MnemonicsManager();

// Export singleton instance
export { mnemonicsManager };
export default mnemonicsManager;