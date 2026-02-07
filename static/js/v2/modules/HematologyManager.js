/**
 * Hematology Manager
 * Manages blood disorders and blood film presentations
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { analytics } from './AnalyticsManager.js';
import { StandardizedSearchComponent } from './StandardizedSearchComponent.js';

export class HematologyManager {
    constructor() {
        this.initialized = false;
        this.haematologyData = null;
        this.currentCondition = null;
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.favoriteConditions = new Set();
        this.categories = [
            { id: 'all', name: 'All Conditions', icon: '🩸' },
            { id: 'anaemia-microcytic', name: 'Microcytic Anaemia', icon: '🔴' },
            { id: 'anaemia-macrocytic', name: 'Macrocytic Anaemia', icon: '🔴' },
            { id: 'anaemia-normocytic', name: 'Normocytic Anaemia', icon: '🔴' },
            { id: 'anaemia-haemolytic', name: 'Haemolytic Anaemia', icon: '💥' },
            { id: 'leukaemia', name: 'Leukaemias', icon: '⚪' },
            { id: 'myeloproliferative', name: 'Myeloproliferative', icon: '📈' },
            { id: 'coagulation', name: 'Coagulation Disorders', icon: '🩹' },
            { id: 'lymphoma', name: 'Lymphomas', icon: '🔬' },
            { id: 'plasma-cell', name: 'Plasma Cell Disorders', icon: '🧬' }
        ];
        
        // Initialize search component with hematology-specific filters
        this.searchComponent = new StandardizedSearchComponent({
            placeholder: "Search blood disorders, findings, symptoms...",
            searchIcon: "🩸",
            emptyStateMessage: "No hematological conditions match your search",
            filterOptions: [
                { value: 'all', label: 'All Conditions' },
                { value: 'anaemia-microcytic', label: 'Microcytic Anaemia' },
                { value: 'anaemia-macrocytic', label: 'Macrocytic Anaemia' },
                { value: 'anaemia-normocytic', label: 'Normocytic Anaemia' },
                { value: 'anaemia-haemolytic', label: 'Haemolytic Anaemia' },
                { value: 'leukaemia', label: 'Leukaemias' },
                { value: 'myeloproliferative', label: 'Myeloproliferative' },
                { value: 'coagulation', label: 'Coagulation Disorders' },
                { value: 'lymphoma', label: 'Lymphomas' },
                { value: 'plasma-cell', label: 'Plasma Cell Disorders' }
            ],
            onSearch: (searchTerm, filter) => this.handleSearch(searchTerm, filter),
            onFilter: (filter, searchTerm) => this.handleFilter(filter, searchTerm),
            onClear: () => this.handleClear()
        });

        this.currentSearchTerm = '';
        this.currentFilter = 'all';
    }

    /**
     * Initialize the Hematology Manager
     */
    async initialize() {
        if (this.initialized) {
            console.warn('HematologyManager already initialized');
            return;
        }

        try {
            // Load hematology data
            await this.loadHaematologyData();
            
            // Load user preferences
            await this.loadFavorites();

            this.initialized = true;
            console.log('🩸 Hematology Manager initialized');
            
            return {
                success: true,
                stats: {
                    totalConditions: this.haematologyData ? Object.keys(this.haematologyData).length : 0,
                    categories: this.categories.length - 1 // Exclude 'all'
                }
            };
        } catch (error) {
            console.error('Failed to initialize HematologyManager:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Load hematology data from module
     */
    async loadHaematologyData() {
        try {
            const module = await import('/static/hematology/haematology_data.js');
            this.haematologyData = module.haematologyDatabase;
            console.log('📚 Loaded hematology data:', Object.keys(this.haematologyData).length, 'conditions');
            return this.haematologyData;
        } catch (error) {
            console.error('❌ Failed to load hematology data:', error);
            throw error;
        }
    }

    /**
     * Load favorite conditions from storage
     */
    async loadFavorites() {
        try {
            const favorites = await storage.getItem('hematology-favorites');
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
            await storage.setItem('hematology-favorites', JSON.stringify(Array.from(this.favoriteConditions)));
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
            analytics.trackEvent('hematology_unfavorited', { conditionId });
        } else {
            this.favoriteConditions.add(conditionId);
            analytics.trackEvent('hematology_favorited', { conditionId });
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
     * Get all conditions or filter by category
     */
    getConditions(category = 'all') {
        if (!this.haematologyData) return [];

        const conditions = Object.entries(this.haematologyData).map(([id, data]) => ({
            id,
            ...data
        }));

        if (category === 'all') {
            return conditions;
        }

        return conditions.filter(c => c.category === category);
    }

    /**
     * Search conditions
     */
    search(query) {
        if (!this.haematologyData) return [];

        const normalizedQuery = (query ?? '').toLowerCase().trim();
        if (!normalizedQuery) {
            return this.getConditions(this.currentCategory);
        }

        const conditions = this.getConditions();

        const matchesQuery = (value) => {
            if (!value) return false;
            if (typeof value === 'string') {
                return value.toLowerCase().includes(normalizedQuery);
            }
            if (Array.isArray(value)) {
                return value.some(item => matchesQuery(item));
            }
            if (typeof value === 'object') {
                return Object.values(value).some(item => matchesQuery(item));
            }
            return false;
        };

        const results = conditions.filter(condition => {
            if (matchesQuery(condition.title)) return true;
            if (matchesQuery(condition.id)) return true;
            if (matchesQuery(this.getCategoryName(condition.category))) return true;
            return matchesQuery(condition);
        });

        // Filter by category if not 'all'
        if (this.currentCategory !== 'all') {
            return results.filter(c => c.category === this.currentCategory);
        }
        
        analytics.trackEvent('hematology_searched', { query, results: results.length });
        return results;
    }

    /**
     * Get a specific condition by ID
     */
    getCondition(conditionId) {
        if (!this.haematologyData || !conditionId) return null;
        
        const data = this.haematologyData[conditionId];
        if (!data) return null;
        
        analytics.trackEvent('hematology_viewed', { conditionId });
        return {
            id: conditionId,
            ...data
        };
    }

    /**
     * Render the hematology UI
     */
    render(container) {
        if (!container) {
            console.error('No container provided for hematology render');
            return;
        }

        const conditions = this.searchQuery
            ? this.search(this.searchQuery)
            : this.getConditions(this.currentCategory);

        const html = `
            <div class="hematology-container">
                <div class="hematology-header">
                    <h3>🩸 Hematology & Blood Disorders</h3>
                    <p>Comprehensive guide to blood disorders and blood film presentations</p>
                </div>

                <div class="hematology-controls">
                    ${this.searchComponent.generateHTML()}
                </div>

                <div class="hematology-category-filter" id="hematology-category-filter">
                    ${this.renderCategoryFilters()}
                </div>

                <div class="hematology-stats" id="hematology-stats">
                    <span class="stat-item">
                        <span class="stat-value">${Object.keys(this.haematologyData || {}).length}</span>
                        <span class="stat-label">Conditions</span>
                    </span>
                    <span class="stat-item">
                        <span class="stat-value">${this.categories.length - 1}</span>
                        <span class="stat-label">Categories</span>
                    </span>
                </div>

                <!-- List View -->
                <div id="hematology-list-view" class="hematology-list-view">
                    <div class="hematology-conditions-grid" id="hematology-conditions-grid">
                        ${this.renderConditionCards(conditions)}
                    </div>
                    <div id="hematology-empty-state" class="hematology-empty-state" style="display: none;">
                        <div class="hematology-empty-state-icon">🔍</div>
                        <h4>No conditions found</h4>
                        <p>Try adjusting your search or category filter</p>
                    </div>
                </div>

                <!-- Detail View -->
                <div id="hematology-detail-view" class="hematology-detail-view" style="display: none;">
                    <button class="hematology-back-btn" id="hematology-back-btn">
                        ← Back to List
                    </button>
                    <div id="hematology-detail-content" class="hematology-detail-content">
                        <!-- Condition details will be rendered here -->
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        
        // Ensure styles are injected
        this.ensureStyles();
        
        // Initialize the search component
        const searchContainer = container.querySelector('[data-component="standardized-search"]');
        if (searchContainer) {
            this.searchComponent.initialize(searchContainer);
        }
        
        this.attachEventListeners();
    }

    /**
     * Render category filter buttons
     */
    renderCategoryFilters() {
        return this.categories.map(cat => `
            <button class="hematology-category-btn ${cat.id === this.currentCategory ? 'active' : ''}" 
                    data-category="${cat.id}">
                ${cat.icon} ${cat.name}
            </button>
        `).join('');
    }

    /**
     * Render condition cards
     */
    renderConditionCards(conditions = this.getConditions(this.currentCategory)) {
        if (conditions.length === 0) {
            return '';
        }

        return conditions.map(condition => `
            <div class="hematology-condition-card" data-condition-id="${condition.id}">
                <div class="hematology-card-header">
                    <h4>${condition.title}</h4>
                    <button class="hematology-favorite-btn ${this.isFavorite(condition.id) ? 'favorited' : ''}" 
                            data-condition-id="${condition.id}">
                        ${this.isFavorite(condition.id) ? '⭐' : '☆'}
                    </button>
                </div>
                <div class="hematology-card-category">
                    ${this.getCategoryName(condition.category)}
                </div>
                ${condition.bloodFilm?.findings ? `
                    <div class="hematology-card-preview">
                        <strong>Blood Film:</strong>
                        <ul>
                            ${condition.bloodFilm.findings.slice(0, 3).map(f => `<li>${f}</li>`).join('')}
                            ${condition.bloodFilm.findings.length > 3 ? '<li><em>+ more...</em></li>' : ''}
                        </ul>
                    </div>
                ` : ''}
                <button class="hematology-view-btn" data-condition-id="${condition.id}">
                    View Details →
                </button>
            </div>
        `).join('');
    }

    /**
     * Render condition detail view
     */
    renderConditionDetail(conditionId) {
        const condition = this.getCondition(conditionId);
        if (!condition) return;

        this.currentCondition = condition;

        const detailContent = document.getElementById('hematology-detail-content');
        if (!detailContent) return;

        let html = `
            <div class="hematology-detail-header">
                <h2>${condition.title}</h2>
                <button class="hematology-favorite-btn ${this.isFavorite(conditionId) ? 'favorited' : ''}" 
                        data-condition-id="${conditionId}">
                    ${this.isFavorite(conditionId) ? '⭐ Favorited' : '☆ Add to Favorites'}
                </button>
            </div>

            <div class="hematology-detail-category">
                ${this.getCategoryName(condition.category)}
            </div>
        `;

        // High-Yield Clinical Pearls Section
        if (condition.bloodFilm || condition.labs || condition.management || condition.complications) {
            html += `
                <div class="hem-pearls-section">
                    <h3 class="hem-pearls-title">💎 High-Yield Clinical Pearls</h3>
                    
                    ${condition.bloodFilm && condition.bloodFilm.findings ? `
                    <div class="hem-pearl-subsection">
                        <h4 class="hem-pearl-subtitle">🔬 Key Blood Film Findings</h4>
                        <ul class="hem-finding-list">
                            ${condition.bloodFilm.findings.slice(0, 4).map(item => `<li class="hem-finding-item">${item}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}

                    ${condition.labs ? `
                    <div class="hem-pearl-subsection">
                        <h4 class="hem-pearl-subtitle">📊 Critical Lab Values</h4>
                        <div class="hem-lab-quick">
                            ${Object.entries(condition.labs).slice(0, 4).map(([test, value]) => `
                                <div class="hem-lab-card">
                                    <div class="hem-lab-test">${test}</div>
                                    <div class="hem-lab-value">${value}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                    ${condition.causes && Array.isArray(condition.causes) ? `
                    <div class="hem-pearl-subsection">
                        <h4 class="hem-pearl-subtitle">🎯 Must-Know Causes</h4>
                        <ul class="hem-cause-list">
                            ${condition.causes.slice(0, 4).map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}

                    ${condition.management ? `
                    <div class="hem-pearl-subsection">
                        <h4 class="hem-pearl-subtitle">💊 Treatment Essentials</h4>
                        <div class="hem-mgmt-quick">
                            ${condition.management.slice(0, 3).map(item => `<div class="hem-mgmt-item">${item}</div>`).join('')}
                        </div>
                    </div>
                    ` : ''}

                    ${condition.complications ? `
                    <div class="hem-pearl-subsection">
                        <h4 class="hem-pearl-subtitle">⚠️ Watch For Complications</h4>
                        <ul class="hem-complication-list">
                            ${condition.complications.slice(0, 4).map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                </div>
            `;
        }

        // Blood Film Section
        if (condition.bloodFilm) {
            // Collect all available images
            const allImages = [];
            if (condition.bloodFilm.image) {
                allImages.push(condition.bloodFilm.image);
            }
            if (condition.bloodFilm.alternativeImages && Array.isArray(condition.bloodFilm.alternativeImages)) {
                allImages.push(...condition.bloodFilm.alternativeImages);
            }

            html += `
                <div class="hematology-section">
                    <h3>🔬 Blood Film Findings</h3>
                    ${allImages.length > 0 ? `
                        <div class="hematology-blood-film-images">
                            ${allImages.length > 1 ? `
                                <div class="hematology-image-gallery">
                                    <div class="hematology-gallery-main">
                                        <img id="hematology-main-image" 
                                             src="/static/hematology/${allImages[0]}" 
                                             alt="${condition.title} blood film" 
                                             onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
                                        <div class="hematology-image-placeholder" style="display: none;">
                                            <p>📷 Image not available</p>
                                            <small>See IMAGE_DOWNLOAD_INSTRUCTIONS.md for image sources</small>
                                        </div>
                                    </div>
                                    <div class="hematology-gallery-thumbnails">
                                        ${allImages.map((img, idx) => `
                                            <div class="hematology-thumbnail ${idx === 0 ? 'active' : ''}" 
                                                 data-image-src="/static/hematology/${img}"
                                                 data-image-index="${idx}">
                                                <img src="/static/hematology/${img}" 
                                                     alt="${condition.title} view ${idx + 1}"
                                                     onerror="this.parentElement.style.display='none';" />
                                                <span class="hematology-thumbnail-label">${idx + 1}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                    <div class="hematology-image-counter">
                                        <span id="hematology-current-image">1</span> / ${allImages.length}
                                    </div>
                                </div>
                            ` : `
                                <div class="hematology-blood-film-image">
                                    <img src="/static/hematology/${allImages[0]}" 
                                         alt="${condition.title} blood film" 
                                         onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
                                    <div class="hematology-image-placeholder" style="display: none;">
                                        <p>📷 Image not available</p>
                                        <small>See IMAGE_DOWNLOAD_INSTRUCTIONS.md for image sources</small>
                                    </div>
                                </div>
                            `}
                            ${condition.bloodFilm.imageDescription ? `
                                <p class="hematology-image-caption">${condition.bloodFilm.imageDescription}</p>
                            ` : ''}
                        </div>
                    ` : ''}
                    <ul class="hematology-findings-list">
                        ${condition.bloodFilm.findings.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Lab Values Section
        if (condition.labs) {
            html += `
                <div class="hematology-section">
                    <h3>📊 Laboratory Findings</h3>
                    <div class="hematology-labs-grid">
                        ${Object.entries(condition.labs).map(([test, value]) => `
                            <div class="hematology-lab-item">
                                <strong>${test}:</strong> ${value}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Causes Section
        if (condition.causes) {
            html += `
                <div class="hematology-section">
                    <h3>🎯 Causes</h3>
            `;
            
            // Handle both array and object formats
            if (Array.isArray(condition.causes)) {
                html += `
                    <ul class="hematology-list">
                        ${condition.causes.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                `;
            } else if (typeof condition.causes === 'object') {
                // Handle categorized causes (object with subcategories)
                html += Object.entries(condition.causes).map(([category, items]) => `
                    <div class="hematology-subcategory">
                        <h4>${category}</h4>
                        <ul class="hematology-list">
                            ${items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `).join('');
            }
            
            html += `</div>`;
        }

        // Clinical Features Section
        if (condition.clinicalFeatures) {
            html += `
                <div class="hematology-section">
                    <h3>🩺 Clinical Features</h3>
                    <ul class="hematology-list">
                        ${condition.clinicalFeatures.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Management Section
        if (condition.management) {
            html += `
                <div class="hematology-section">
                    <h3>💊 Management</h3>
                    <ul class="hematology-list">
                        ${condition.management.map(m => `<li>${m}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Types Section (for conditions like thalassemia)
        if (condition.types) {
            html += `
                <div class="hematology-section">
                    <h3>📋 Types & Variants</h3>
                    ${Object.entries(condition.types).map(([typeName, typeData]) => `
                        <div class="hematology-type">
                            <h4>${typeName}</h4>
                            ${typeData.genetics ? `<p><strong>Genetics:</strong> ${typeData.genetics}</p>` : ''}
                            ${typeData.variants ? `
                                <ul>
                                    ${typeData.variants.map(v => `<li>${v}</li>`).join('')}
                                </ul>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Complications Section
        if (condition.complications) {
            html += `
                <div class="hematology-section">
                    <h3>⚠️ Complications</h3>
                    <ul class="hematology-list">
                        ${condition.complications.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        detailContent.innerHTML = html;

        // Show detail view, hide list view
        const listView = document.getElementById('hematology-list-view');
        const detailView = document.getElementById('hematology-detail-view');
        if (listView) listView.style.display = 'none';
        if (detailView) detailView.style.display = 'block';

        // Scroll to top - use requestAnimationFrame to ensure DOM is updated
        requestAnimationFrame(() => {
            if (detailView) {
                detailView.scrollTop = 0;
                detailView.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
            // Also scroll the main container if it exists
            const container = detailView?.closest('.module-container, .content-area');
            if (container) {
                container.scrollTop = 0;
            }
            // Scroll window to top as well
            window.scrollTo({ top: 0, behavior: 'instant' });
        });

        // Re-attach event listeners for favorite button in detail view
        this.attachFavoriteListeners();
        
        // Attach image gallery listeners
        this.attachImageGalleryListeners();
    }

    /**
     * Attach image gallery event listeners
     */
    attachImageGalleryListeners() {
        const thumbnails = document.querySelectorAll('.hematology-thumbnail');
        if (thumbnails.length === 0) return;

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', (e) => {
                const imageSrc = e.currentTarget.dataset.imageSrc;
                const imageIndex = parseInt(e.currentTarget.dataset.imageIndex);
                
                // Update main image
                const mainImage = document.getElementById('hematology-main-image');
                if (mainImage) {
                    mainImage.src = imageSrc;
                }
                
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                // Update counter
                const counter = document.getElementById('hematology-current-image');
                if (counter) {
                    counter.textContent = imageIndex + 1;
                }
            });
        });
    }

    /**
     * Get category name from ID
     */
    getCategoryName(categoryId) {
        const category = this.categories.find(c => c.id === categoryId);
        return category ? `${category.icon} ${category.name}` : categoryId;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Category filters
        const categoryBtns = document.querySelectorAll('.hematology-category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.currentCategory = category;
                
                // Update active state
                categoryBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                this.refreshConditionsList();
            });
        });

        // View detail buttons
        const viewBtns = document.querySelectorAll('.hematology-view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const conditionId = e.currentTarget.dataset.conditionId;
                this.renderConditionDetail(conditionId);
            });
        });

        // Back button
        const backBtn = document.getElementById('hematology-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                const listView = document.getElementById('hematology-list-view');
                const detailView = document.getElementById('hematology-detail-view');
                if (listView) listView.style.display = 'block';
                if (detailView) detailView.style.display = 'none';
                this.currentCondition = null;
            });
        }

        // Favorite buttons
        this.attachFavoriteListeners();
    }

    /**
     * Attach favorite button listeners
     */
    attachFavoriteListeners() {
        const favBtns = document.querySelectorAll('.hematology-favorite-btn');
        favBtns.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const conditionId = e.currentTarget.dataset.conditionId;
                const isFav = await this.toggleFavorite(conditionId);
                
                // Update button state
                if (isFav) {
                    e.currentTarget.textContent = e.currentTarget.textContent.includes('Favorited') ? '⭐ Favorited' : '⭐';
                    e.currentTarget.classList.add('favorited');
                } else {
                    e.currentTarget.textContent = e.currentTarget.textContent.includes('Add to') ? '☆ Add to Favorites' : '☆';
                    e.currentTarget.classList.remove('favorited');
                }
            });
        });
    }

    /**
     * Refresh conditions list based on current filters
     */
    refreshConditionsList() {
        const grid = document.getElementById('hematology-conditions-grid');
        const emptyState = document.getElementById('hematology-empty-state');
        
        if (!grid || !emptyState) return;

        const results = this.searchQuery ? this.search(this.searchQuery) : this.getConditions(this.currentCategory);
        
        if (results.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            grid.style.display = 'grid';
            emptyState.style.display = 'none';
            
            // Re-render cards
            grid.innerHTML = results.map(condition => `
                <div class="hematology-condition-card" data-condition-id="${condition.id}">
                    <div class="hematology-card-header">
                        <h4>${condition.title}</h4>
                        <button class="hematology-favorite-btn ${this.isFavorite(condition.id) ? 'favorited' : ''}" 
                                data-condition-id="${condition.id}">
                            ${this.isFavorite(condition.id) ? '⭐' : '☆'}
                        </button>
                    </div>
                    <div class="hematology-card-category">
                        ${this.getCategoryName(condition.category)}
                    </div>
                    ${condition.bloodFilm?.findings ? `
                        <div class="hematology-card-preview">
                            <strong>Blood Film:</strong>
                            <ul>
                                ${condition.bloodFilm.findings.slice(0, 3).map(f => `<li>${f}</li>`).join('')}
                                ${condition.bloodFilm.findings.length > 3 ? '<li><em>+ more...</em></li>' : ''}
                            </ul>
                        </div>
                    ` : ''}
                    <button class="hematology-view-btn" data-condition-id="${condition.id}">
                        View Details →
                    </button>
                </div>
            `).join('');
            
            // Re-attach event listeners
            this.attachEventListeners();
        }
    }

    /**
     * Handle search from StandardizedSearchComponent
     */
    handleSearch(searchTerm, filter) {
        this.currentSearchTerm = searchTerm;
        this.currentFilter = filter;
        this.searchQuery = searchTerm;
        this.currentCategory = filter;
        this.refreshConditionsList();
        console.log(`Hematology search: "${searchTerm}" with filter: "${filter}"`);
    }

    /**
     * Handle filter change from StandardizedSearchComponent
     */
    handleFilter(filter, searchTerm) {
        this.currentFilter = filter;
        this.currentSearchTerm = searchTerm;
        this.currentCategory = filter;
        this.searchQuery = searchTerm;
        this.refreshConditionsList();
        console.log(`Hematology filter changed: "${filter}" with search: "${searchTerm}"`);
    }

    /**
     * Handle clear from StandardizedSearchComponent
     */
    handleClear() {
        this.currentSearchTerm = '';
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.currentCategory = 'all';
        this.refreshConditionsList();
        console.log('Hematology search cleared');
    }

    /**
     * Ensure styles are injected
     */
    ensureStyles() {
        if (document.getElementById('hematology-styles')) return;

        const style = document.createElement('style');
        style.id = 'hematology-styles';
        style.textContent = `
            .hematology-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .hematology-header {
                text-align: center;
                margin-bottom: 30px;
                padding: 20px;
                background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                border-radius: 12px;
                color: white;
            }

            .hematology-header h3 {
                margin: 0 0 8px 0;
                font-size: 1.8rem;
                font-weight: 600;
            }

            .hematology-header p {
                margin: 0;
                font-size: 1rem;
                opacity: 0.9;
            }

            .hematology-controls {
                margin-bottom: 20px;
            }

            .hematology-category-filter {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-bottom: 20px;
                padding: 15px;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }

            .hematology-category-btn {
                padding: 8px 16px;
                background: white;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.875rem;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .hematology-category-btn:hover {
                background: #f3f4f6;
                border-color: #9ca3af;
            }

            .hematology-category-btn.active {
                background: #dc2626;
                color: white;
                border-color: #dc2626;
            }

            .hematology-stats {
                display: flex;
                gap: 20px;
                margin-bottom: 20px;
                padding: 15px;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }

            .hematology-stats .stat-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
            }

            .hematology-stats .stat-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: #dc2626;
            }

            .hematology-stats .stat-label {
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #6b7280;
            }

            .hematology-conditions-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 20px;
                margin-bottom: 20px;
            }

            .hematology-condition-card {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                padding: 20px;
                transition: all 0.2s;
                cursor: pointer;
            }

            .hematology-condition-card:hover {
                border-color: #dc2626;
                box-shadow: 0 4px 12px rgba(220, 38, 38, 0.1);
                transform: translateY(-2px);
            }

            .hematology-condition-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 12px;
            }

            .hematology-condition-header h4 {
                margin: 0;
                font-size: 1.125rem;
                font-weight: 600;
                color: #111827;
                flex: 1;
            }

            .hematology-favorite-btn {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #9ca3af;
                transition: color 0.2s;
            }

            .hematology-favorite-btn:hover,
            .hematology-favorite-btn.favorited {
                color: #fbbf24;
            }

            .hematology-card-category {
                display: inline-block;
                padding: 3px 8px;
                background: #fee2e2;
                color: #dc2626;
                font-size: 0.75rem;
                border-radius: 4px;
                margin-bottom: 12px;
            }

            .hematology-card-section {
                margin-bottom: 15px;
            }

            .hematology-card-section:last-child {
                margin-bottom: 0;
            }

            .hematology-section-title {
                font-weight: 600;
                color: #374151;
                margin-bottom: 6px;
                font-size: 0.875rem;
            }

            .hematology-card-section ul {
                margin: 0;
                padding-left: 16px;
                list-style-type: disc;
            }

            .hematology-card-section li {
                margin: 3px 0;
                color: #4b5563;
                font-size: 0.875rem;
                line-height: 1.4;
            }

            .hematology-view-btn {
                width: 100%;
                padding: 10px;
                background: #dc2626;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
                margin-top: 15px;
            }

            .hematology-view-btn:hover {
                background: #b91c1c;
            }

            .hematology-empty-state {
                text-align: center;
                padding: 60px 20px;
                color: #6b7280;
            }

            .hematology-empty-state-icon {
                font-size: 3rem;
                margin-bottom: 16px;
            }

            .hematology-empty-state h4 {
                margin: 0 0 8px 0;
                color: #374151;
            }

            .hematology-empty-state p {
                margin: 0;
            }

            .hematology-detail-view {
                background: white;
                border-radius: 12px;
                padding: 20px;
                margin-top: 20px;
            }

            .hematology-back-btn {
                background: #f3f4f6;
                border: 1px solid #d1d5db;
                color: #374151;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.875rem;
                margin-bottom: 20px;
                transition: all 0.2s;
            }

            .hematology-back-btn:hover {
                background: #e5e7eb;
            }

            /* Dark theme support */
            [data-theme="dark"] .hematology-container {
                color: #f3f4f6;
                background: var(--v2-bg-secondary, #0f172a);
            }

            [data-theme="dark"] .hematology-header {
                background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                border: 1px solid #374151;
            }

            [data-theme="dark"] .hematology-category-filter,
            [data-theme="dark"] .hematology-stats {
                background: #1e293b;
                border-color: #475569;
                color: #f1f5f9;
            }

            [data-theme="dark"] .hematology-category-btn {
                background: #334155;
                border-color: #475569;
                color: #e2e8f0;
            }

            [data-theme="dark"] .hematology-category-btn:hover {
                background: #475569;
                border-color: #64748b;
                color: #f8fafc;
            }

            [data-theme="dark"] .hematology-category-btn.active {
                background: #dc2626;
                color: #ffffff;
                border-color: #dc2626;
            }

            [data-theme="dark"] .hematology-stats .stat-value {
                color: #f87171;
            }

            [data-theme="dark"] .hematology-stats .stat-label {
                color: #94a3b8;
            }

            [data-theme="dark"] .hematology-condition-card {
                background: #1e293b;
                border-color: #475569;
                color: #f1f5f9;
            }

            [data-theme="dark"] .hematology-condition-card:hover {
                border-color: #dc2626;
                box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
                background: #2d3748;
            }

            [data-theme="dark"] .hematology-condition-header h4 {
                color: #f8fafc;
            }

            [data-theme="dark"] .hematology-card-category {
                background: rgba(220, 38, 38, 0.2);
                color: #fca5a5;
                border: 1px solid rgba(220, 38, 38, 0.3);
            }

            [data-theme="dark"] .hematology-section-title {
                color: #e2e8f0;
            }

            [data-theme="dark"] .hematology-card-section li {
                color: #cbd5e1;
            }

            [data-theme="dark"] .hematology-view-btn {
                background: #dc2626;
                color: #ffffff;
                border: 1px solid #dc2626;
            }

            [data-theme="dark"] .hematology-view-btn:hover {
                background: #b91c1c;
                border-color: #b91c1c;
            }

            [data-theme="dark"] .hematology-empty-state {
                color: #94a3b8;
            }

            [data-theme="dark"] .hematology-empty-state h4 {
                color: #e2e8f0;
            }

            [data-theme="dark"] .hematology-detail-view {
                background: #1e293b;
                border: 1px solid #475569;
                color: #f1f5f9;
            }

            [data-theme="dark"] .hematology-back-btn {
                background: #334155;
                border-color: #475569;
                color: #e2e8f0;
            }

            [data-theme="dark"] .hematology-back-btn:hover {
                background: #475569;
                color: #f8fafc;
            }

            /* Additional dark mode refinements */
            body.dark-mode .hematology-container {
                color: #f3f4f6;
                background: var(--v2-bg-secondary, #0f172a);
            }

            body.dark-mode .hematology-header {
                background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                border: 1px solid #374151;
            }

            body.dark-mode .hematology-category-filter,
            body.dark-mode .hematology-stats {
                background: #1e293b;
                border-color: #475569;
                color: #f1f5f9;
            }

            body.dark-mode .hematology-category-btn {
                background: #334155;
                border-color: #475569;
                color: #e2e8f0;
            }

            body.dark-mode .hematology-category-btn:hover {
                background: #475569;
                border-color: #64748b;
                color: #f8fafc;
            }

            body.dark-mode .hematology-category-btn.active {
                background: #dc2626;
                color: #ffffff;
                border-color: #dc2626;
            }

            body.dark-mode .hematology-stats .stat-value {
                color: #f87171;
            }

            body.dark-mode .hematology-stats .stat-label {
                color: #94a3b8;
            }

            body.dark-mode .hematology-condition-card {
                background: #1e293b;
                border-color: #475569;
                color: #f1f5f9;
            }

            body.dark-mode .hematology-condition-card:hover {
                border-color: #dc2626;
                box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
                background: #2d3748;
            }

            body.dark-mode .hematology-condition-header h4 {
                color: #f8fafc;
            }

            body.dark-mode .hematology-card-category {
                background: rgba(220, 38, 38, 0.2);
                color: #fca5a5;
                border: 1px solid rgba(220, 38, 38, 0.3);
            }

            body.dark-mode .hematology-section-title {
                color: #e2e8f0;
            }

            body.dark-mode .hematology-card-section li {
                color: #cbd5e1;
            }

            body.dark-mode .hematology-view-btn {
                background: #dc2626;
                color: #ffffff;
                border: 1px solid #dc2626;
            }

            body.dark-mode .hematology-view-btn:hover {
                background: #b91c1c;
                border-color: #b91c1c;
            }

            body.dark-mode .hematology-empty-state {
                color: #94a3b8;
            }

            body.dark-mode .hematology-empty-state h4 {
                color: #e2e8f0;
            }

            body.dark-mode .hematology-detail-view {
                background: #1e293b;
                border: 1px solid #475569;
                color: #f1f5f9;
            }

            body.dark-mode .hematology-back-btn {
                background: #334155;
                border-color: #475569;
                color: #e2e8f0;
            }

            body.dark-mode .hematology-back-btn:hover {
                background: #475569;
                color: #f8fafc;
            }
        `;

        document.head.appendChild(style);
    }
}

// Create singleton instance
export const hematologyManager = new HematologyManager();
