/**
 * StandardizedSearchComponent
 * Reusable search interface with highlighting for all MLA sections
 * Provides consistent UX while allowing section-specific customization
 */

import { TextHighlightingMixin } from './TextHighlightingMixin.js';

export class StandardizedSearchComponent {
    constructor(options = {}) {
        // Mix in highlighting functionality
        Object.assign(this, TextHighlightingMixin);
        
        this.options = {
            placeholder: 'Search...',
            showFilters: true,
            showClearButton: true,
            debounceTime: 300,
            minSearchLength: 2,
            highlightClass: 'search-highlight',
            containerClass: 'standardized-search',
            ...options
        };
        
        this.searchTerm = '';
        this.activeFilter = 'all';
        this.callbacks = {
            onSearch: null,
            onFilter: null,
            onClear: null,
            ...options.callbacks || {}
        };
        
        this.debounceTimer = null;
        this.container = null;
        this.searchInput = null;
        this.filterButtons = [];
        this.clearButton = null;
        this.resultsContainer = null;
    }

    /**
     * Generate the search component HTML
     */
    generateHTML(filters = []) {
        const filterId = `filter-${Math.random().toString(36).substr(2, 9)}`;
        const searchId = `search-${Math.random().toString(36).substr(2, 9)}`;
        
        return `
            <div class="${this.options.containerClass}" data-component="standardized-search">
                <div class="search-header">
                    <div class="search-input-container">
                        <input 
                            type="text" 
                            id="${searchId}"
                            class="search-input" 
                            placeholder="${this.options.placeholder}"
                            autocomplete="off"
                        />
                        ${this.options.showClearButton ? `
                            <button class="search-clear-btn" type="button" title="Clear search">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </button>
                        ` : ''}
                    </div>
                    
                    ${this.options.showFilters && filters.length > 0 ? `
                        <div class="search-filters" id="${filterId}">
                            <button class="filter-btn active" data-filter="all">All</button>
                            ${filters.map(filter => `
                                <button class="filter-btn" data-filter="${filter.value || filter}">
                                    ${filter.label || filter}
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <div class="search-results-info">
                    <span class="results-count"></span>
                    <span class="search-status"></span>
                </div>
            </div>
        `;
    }

    /**
     * Initialize the component after HTML is inserted into DOM
     */
    initialize(containerElement) {
        this.container = containerElement;
        this.searchInput = this.container.querySelector('.search-input');
        this.clearButton = this.container.querySelector('.search-clear-btn');
        this.filterButtons = Array.from(this.container.querySelectorAll('.filter-btn'));
        this.resultsCount = this.container.querySelector('.results-count');
        this.searchStatus = this.container.querySelector('.search-status');
        
        this.bindEvents();
        this.injectStyles();
    }

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Search input with debouncing
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => {
                    this.handleSearch(e.target.value);
                }, this.options.debounceTime);
            });
            
            // Handle Enter key
            this.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    clearTimeout(this.debounceTimer);
                    this.handleSearch(e.target.value);
                }
            });
        }

        // Clear button
        if (this.clearButton) {
            this.clearButton.addEventListener('click', () => {
                this.clearSearch();
            });
        }

        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterChange(e.target.dataset.filter);
            });
        });
    }

    /**
     * Handle search input
     */
    handleSearch(value) {
        this.searchTerm = value.trim();
        this.updateClearButtonVisibility();
        
        if (this.callbacks.onSearch) {
            this.callbacks.onSearch(this.searchTerm, this.activeFilter);
        }
    }

    /**
     * Handle filter change
     */
    handleFilterChange(filter) {
        // Update active filter button
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.activeFilter = filter;
        
        if (this.callbacks.onFilter) {
            this.callbacks.onFilter(this.activeFilter, this.searchTerm);
        }
        
        // Re-trigger search with new filter
        if (this.callbacks.onSearch) {
            this.callbacks.onSearch(this.searchTerm, this.activeFilter);
        }
    }

    /**
     * Clear search
     */
    clearSearch() {
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        this.searchTerm = '';
        this.updateClearButtonVisibility();
        
        if (this.callbacks.onClear) {
            this.callbacks.onClear();
        }
        
        // Re-trigger search with empty term
        if (this.callbacks.onSearch) {
            this.callbacks.onSearch('', this.activeFilter);
        }
    }

    /**
     * Apply highlighting to results
     */
    applyHighlighting(resultsContainer) {
        if (!this.searchTerm || this.searchTerm.length < this.options.minSearchLength) {
            this.clearHighlights(resultsContainer, this.options.highlightClass);
            return;
        }
        
        // Clear previous highlights
        this.clearHighlights(resultsContainer, this.options.highlightClass);
        
        // Apply new highlights
        this.highlightText(resultsContainer, this.searchTerm, this.options.highlightClass);
    }

    /**
     * Update results count display
     */
    updateResultsCount(count, totalCount = null) {
        if (this.resultsCount) {
            if (totalCount !== null) {
                this.resultsCount.textContent = `${count} of ${totalCount} results`;
            } else {
                this.resultsCount.textContent = `${count} result${count === 1 ? '' : 's'}`;
            }
        }
    }

    /**
     * Update search status message
     */
    updateSearchStatus(message) {
        if (this.searchStatus) {
            this.searchStatus.textContent = message;
        }
    }

    /**
     * Update clear button visibility
     */
    updateClearButtonVisibility() {
        if (this.clearButton) {
            this.clearButton.style.opacity = this.searchTerm ? '1' : '0';
            this.clearButton.style.pointerEvents = this.searchTerm ? 'auto' : 'none';
        }
    }

    /**
     * Get current search state
     */
    getSearchState() {
        return {
            searchTerm: this.searchTerm,
            activeFilter: this.activeFilter
        };
    }

    /**
     * Set search term programmatically
     */
    setSearchTerm(term) {
        if (this.searchInput) {
            this.searchInput.value = term;
        }
        this.handleSearch(term);
    }

    /**
     * Set active filter programmatically
     */
    setActiveFilter(filter) {
        this.handleFilterChange(filter);
    }

    /**
     * Inject component styles
     */
    injectStyles() {
        if (document.getElementById('standardized-search-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'standardized-search-styles';
        style.textContent = `
            .standardized-search {
                margin-bottom: 20px;
            }

            .search-header {
                display: flex;
                flex-direction: column;
                gap: 12px;
                margin-bottom: 8px;
            }

            .search-input-container {
                position: relative;
                display: flex;
                align-items: center;
            }

            .search-input {
                width: 100%;
                padding: 12px 16px;
                padding-right: 45px;
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                font-size: 16px;
                background: #ffffff;
                transition: all 0.2s ease;
                box-shadow: 0 2px 4px rgba(0,0,0,0.02);
            }

            .search-input:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }

            .search-clear-btn {
                position: absolute;
                right: 12px;
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                color: #64748b;
                opacity: 0;
                transition: all 0.2s ease;
                pointer-events: none;
            }

            .search-clear-btn:hover {
                background: #f1f5f9;
                color: #334155;
            }

            .search-filters {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
            }

            .filter-btn {
                padding: 8px 16px;
                border: 2px solid #e2e8f0;
                border-radius: 20px;
                background: #ffffff;
                color: #475569;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.2s ease;
            }

            .filter-btn:hover {
                border-color: #cbd5e1;
                background: #f8fafc;
            }

            .filter-btn.active {
                border-color: #3b82f6;
                background: #3b82f6;
                color: #ffffff;
            }

            .search-results-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
                color: #64748b;
                min-height: 20px;
            }

            .results-count {
                font-weight: 500;
            }

            /* Dark mode support */
            body.dark-mode .search-input,
            [data-theme="dark"] .search-input {
                background: #1e293b;
                border-color: #334155;
                color: #f1f5f9;
            }

            body.dark-mode .search-input:focus,
            [data-theme="dark"] .search-input:focus {
                border-color: #60a5fa;
                box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
            }

            body.dark-mode .filter-btn,
            [data-theme="dark"] .filter-btn {
                background: #334155;
                border-color: #475569;
                color: #e2e8f0;
            }

            body.dark-mode .filter-btn:hover,
            [data-theme="dark"] .filter-btn:hover {
                background: #475569;
                border-color: #64748b;
            }

            body.dark-mode .filter-btn.active,
            [data-theme="dark"] .filter-btn.active {
                background: #3b82f6;
                border-color: #3b82f6;
                color: #ffffff;
            }

            body.dark-mode .search-clear-btn:hover,
            [data-theme="dark"] .search-clear-btn:hover {
                background: #334155;
                color: #e2e8f0;
            }

            /* Mobile responsive */
            @media (max-width: 768px) {
                .search-header {
                    gap: 8px;
                }
                
                .search-filters {
                    gap: 6px;
                }
                
                .filter-btn {
                    padding: 6px 12px;
                    font-size: 13px;
                }
            }

            /* Include highlight styles */
            ${this.getHighlightStyles()}
        `;
        
        document.head.appendChild(style);
    }

    /**
     * Destroy the component and clean up
     */
    destroy() {
        clearTimeout(this.debounceTimer);
        
        // Remove event listeners would go here if needed
        // For now, removing the container element handles most cleanup
        
        this.container = null;
        this.searchInput = null;
        this.clearButton = null;
        this.filterButtons = [];
    }
}

export default StandardizedSearchComponent;