/**
 * Hematology Manager
 * Manages blood disorders and blood film presentations
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { analytics } from './AnalyticsManager.js';

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
            <div class="hematology-header">
                <h3>🩸 Hematology & Blood Disorders</h3>
                <p>Comprehensive guide to blood disorders and blood film presentations</p>
            </div>

            <div class="hematology-controls">
                <div class="hematology-search-box">
                    <input type="text" id="hematology-search-input" placeholder="Search conditions, findings, symptoms..." value="${this.searchQuery}" />
                    <span class="hematology-search-icon">🔍</span>
                </div>
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
        `;

        container.innerHTML = html;
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
        // Search input
        const searchInput = document.getElementById('hematology-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.refreshConditionsList();
            });
        }

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
}

// Create singleton instance
export const hematologyManager = new HematologyManager();
