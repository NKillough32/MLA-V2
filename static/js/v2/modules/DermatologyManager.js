/**
 * Dermatology Manager
 * Manages dermatological conditions and skin presentations
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { analytics } from './AnalyticsManager.js';

export class DermatologyManager {
    constructor() {
        this.initialized = false;
        this.dermatologyData = null;
        this.currentCondition = null;
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.favoriteConditions = new Set();
        this.categories = [
            { id: 'all', name: 'All Conditions', icon: '🩺' },
            { id: 'inflammatory-eczema', name: 'Eczema & Dermatitis', icon: '🔴' },
            { id: 'inflammatory-psoriasis', name: 'Psoriasis', icon: '📐' },
            { id: 'acne-rosacea', name: 'Acne & Rosacea', icon: '💊' },
            { id: 'infection-bacterial', name: 'Bacterial Infections', icon: '🦠' },
            { id: 'infection-viral', name: 'Viral Infections', icon: '🧬' },
            { id: 'infection-fungal', name: 'Fungal Infections', icon: '🍄' },
            { id: 'skin-cancer', name: 'Skin Cancers', icon: '⚠️' },
            { id: 'hair-disorders', name: 'Hair Disorders', icon: '💇' },
            { id: 'nail-disorders', name: 'Nail Disorders', icon: '💅' },
            { id: 'pigmentation', name: 'Pigmentation Disorders', icon: '🎨' }
        ];
    }

    /**
     * Initialize the Dermatology Manager
     */
    async initialize() {
        if (this.initialized) {
            console.warn('DermatologyManager already initialized');
            return;
        }

        try {
            // Load dermatology data
            await this.loadDermatologyData();
            
            // Load user preferences
            await this.loadFavorites();

            this.initialized = true;
            console.log('🩺 Dermatology Manager initialized');
            
            return {
                success: true,
                stats: {
                    totalConditions: this.dermatologyData ? Object.keys(this.dermatologyData).length : 0,
                    categories: this.categories.length - 1 // Exclude 'all'
                }
            };
        } catch (error) {
            console.error('Failed to initialize DermatologyManager:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Load dermatology data from module
     */
    async loadDermatologyData() {
        try {
            const module = await import('/static/dermatology/dermatology_data.js');
            this.dermatologyData = module.dermatologyDatabase;
            console.log('📚 Loaded dermatology data:', Object.keys(this.dermatologyData).length, 'conditions');
            return this.dermatologyData;
        } catch (error) {
            console.error('❌ Failed to load dermatology data:', error);
            throw error;
        }
    }

    /**
     * Load favorite conditions from storage
     */
    async loadFavorites() {
        try {
            const favorites = await storage.getItem('dermatology-favorites');
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
            await storage.setItem('dermatology-favorites', JSON.stringify(Array.from(this.favoriteConditions)));
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
            analytics.trackEvent('dermatology_unfavorited', { conditionId });
        } else {
            this.favoriteConditions.add(conditionId);
            analytics.trackEvent('dermatology_favorited', { conditionId });
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
        if (!this.dermatologyData) return [];

        const conditions = Object.entries(this.dermatologyData).map(([id, data]) => ({
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
        if (!this.dermatologyData) return [];
        
        const normalizedQuery = query.toLowerCase().trim();
        if (!normalizedQuery) return [];

        return Object.entries(this.dermatologyData)
            .map(([id, data]) => ({ id, ...data }))
            .filter(condition => {
                // Search in title
                if (condition.title.toLowerCase().includes(normalizedQuery)) return true;
                
                // Search in category
                if (condition.category?.toLowerCase().includes(normalizedQuery)) return true;
                
                // Search in clinical presentation
                if (condition.clinicalPresentation?.description?.toLowerCase().includes(normalizedQuery)) return true;
                
                // Search in arrays (triggers, associations, etc.)
                const searchInArrays = (obj) => {
                    for (const value of Object.values(obj)) {
                        if (Array.isArray(value)) {
                            if (value.some(item => 
                                typeof item === 'string' && item.toLowerCase().includes(normalizedQuery)
                            )) return true;
                        } else if (typeof value === 'object' && value !== null) {
                            if (searchInArrays(value)) return true;
                        } else if (typeof value === 'string' && value.toLowerCase().includes(normalizedQuery)) {
                            return true;
                        }
                    }
                    return false;
                };
                
                return searchInArrays(condition);
            });
    }

    /**
     * Get a specific condition by ID
     */
    getCondition(id) {
        if (!this.dermatologyData) return null;
        return this.dermatologyData[id] ? { id, ...this.dermatologyData[id] } : null;
    }

    /**
     * Get statistics
     */
    getStatistics() {
        if (!this.dermatologyData) {
            return {
                totalConditions: 0,
                categoryCounts: {},
                favorites: 0
            };
        }

        const conditions = Object.values(this.dermatologyData);
        const categoryCounts = {};
        
        conditions.forEach(condition => {
            const cat = condition.category || 'uncategorized';
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        });

        return {
            totalConditions: conditions.length,
            categoryCounts,
            favorites: this.favoriteConditions.size
        };
    }

    /**
     * Render the dermatology interface
     */
    render(container) {
        if (!container) {
            console.error('Container element not provided');
            return;
        }

        // Ensure styles are injected
        this.ensureStyles();

        const conditions = this.getConditions(this.currentCategory);
        const filteredConditions = this.searchQuery 
            ? this.search(this.searchQuery)
            : conditions;

        const stats = this.getStatistics();

        container.innerHTML = `
            <div class="dermatology-container">
                <!-- Header -->
                <div class="dermatology-header">
                    <h3>🩺 Dermatology Reference</h3>
                    <p>Comprehensive guide to skin conditions, diagnoses, and management</p>
                </div>

                <!-- Controls -->
                <div class="dermatology-controls">
                    <!-- Search -->
                    <div class="dermatology-search-box">
                        <span class="dermatology-search-icon">🔍</span>
                        <input 
                            type="text" 
                            placeholder="Search conditions, symptoms, treatments..." 
                            value="${this.searchQuery}"
                            id="dermatology-search-input"
                        />
                    </div>

                    <!-- Category Filter -->
                    <div class="dermatology-category-filter">
                        ${this.categories.map(cat => `
                            <button 
                                class="dermatology-category-btn ${this.currentCategory === cat.id ? 'active' : ''}"
                                data-category="${cat.id}"
                            >
                                <span class="cat-icon">${cat.icon}</span>
                                <span class="cat-name">${cat.name}</span>
                                ${cat.id !== 'all' ? `<span class="cat-count">${stats.categoryCounts[cat.id] || 0}</span>` : ''}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Stats -->
                    <div class="dermatology-stats">
                        <div class="stat-item">
                            <span class="stat-value">${stats.totalConditions}</span>
                            <span class="stat-label">Conditions</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${filteredConditions.length}</span>
                            <span class="stat-label">Showing</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${stats.favorites}</span>
                            <span class="stat-label">Favorites</span>
                        </div>
                    </div>
                </div>

                <!-- Conditions Grid -->
                <div class="dermatology-conditions-grid">
                    ${filteredConditions.length > 0 ? filteredConditions.map(condition => this.renderConditionCard(condition)).join('') : `
                        <div class="no-results">
                            <p>No conditions found matching your search.</p>
                        </div>
                    `}
                </div>
            </div>
        `;

        this.attachEventListeners(container);
    }

    /**
     * Render a condition card
     */
    renderConditionCard(condition) {
        const isFav = this.isFavorite(condition.id);
        const categoryInfo = this.categories.find(c => c.id === condition.category);
        const categoryName = categoryInfo ? categoryInfo.name : condition.category;
        const formatListItem = (item) => {
            if (typeof item !== 'string') return item;
            return item.replace(/^\s*[•-]\s+/, '');
        };

        return `
            <div class="dermatology-condition-card" data-condition-id="${condition.id}">
                <div class="condition-header">
                    <div class="condition-title-row">
                        <h4 class="condition-title">${condition.title}</h4>
                        <button class="favorite-btn ${isFav ? 'favorited' : ''}" data-condition-id="${condition.id}">
                            ${isFav ? '⭐' : '☆'}
                        </button>
                    </div>
                    <span class="condition-category">${categoryInfo?.icon || '🩺'} ${categoryName}</span>
                </div>

                <div class="condition-content">
                    ${condition.clinicalPresentation?.description ? `
                        <div class="condition-section">
                            <strong class="condition-section-title">Clinical Presentation</strong>
                            <p class="condition-section-text">${condition.clinicalPresentation.description}</p>
                        </div>
                    ` : ''}

                    ${condition.diagnosis && Array.isArray(condition.diagnosis) && condition.diagnosis.length > 0 ? `
                        <div class="condition-section">
                            <strong class="condition-section-title">Diagnosis</strong>
                            <ul class="condition-section-list">
                                ${condition.diagnosis.slice(0, 3).map(item => `<li>${formatListItem(item)}</li>`).join('')}
                                ${condition.diagnosis.length > 3 ? `<li class="more-indicator">+${condition.diagnosis.length - 3} more...</li>` : ''}
                            </ul>
                        </div>
                    ` : ''}

                    ${condition.management && Array.isArray(condition.management) && condition.management.length > 0 ? `
                        <div class="condition-section">
                            <strong class="condition-section-title">Management</strong>
                            <ul class="condition-section-list">
                                ${condition.management.slice(0, 3).map(item => `<li>${formatListItem(item)}</li>`).join('')}
                                ${condition.management.length > 3 ? `<li class="more-indicator">+${condition.management.length - 3} more...</li>` : ''}
                            </ul>
                        </div>
                    ` : ''}
                </div>

                <button class="view-details-btn" data-condition-id="${condition.id}">
                    View Full Details →
                </button>
            </div>
        `;
    }

    /**
     * Render detailed condition view
     */
    renderDetailedView(condition) {
        const modal = document.createElement('div');
        modal.className = 'dermatology-modal-overlay';
        modal.innerHTML = `
            <div class="dermatology-modal">
                <div class="modal-header">
                    <h2>${condition.title}</h2>
                    <button class="modal-close-btn">✕</button>
                </div>
                <div class="modal-content">
                    ${this.renderDetailedCondition(condition)}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const closeModal = () => {
            modal.remove();
        };

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        const closeButton = modal.querySelector('.modal-close-btn');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }

        // Prevent closing when clicking modal content
        modal.querySelector('.dermatology-modal').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    /**
     * Render detailed condition information
     */
    renderDetailedCondition(condition) {
        let html = '';
        const formatListItem = (item) => {
            if (typeof item !== 'string') return item;
            return item.replace(/^\s*[•-]\s+/, '');
        };

        // High-Yield Clinical Pearls Section at the top
        if (condition.redFlags || condition.complications || condition.triggers || condition.management) {
            html += `
                <div class="derm-pearls-section">
                    <h3 class="derm-pearls-title">💎 High-Yield Clinical Pearls</h3>
                    
                    ${condition.redFlags && condition.redFlags.length > 0 ? `
                    <div class="derm-pearl-subsection">
                        <h4 class="derm-pearl-subtitle">🚨 Red Flags - Don't Miss</h4>
                        <ul class="derm-red-flag-list">
                            ${condition.redFlags.map(item => `<li class="derm-red-flag-item">${item}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}

                    ${condition.triggers && condition.triggers.length > 0 ? `
                    <div class="derm-pearl-subsection">
                        <h4 class="derm-pearl-subtitle">⚡ Key Triggers to Ask About</h4>
                        <ul class="derm-trigger-list">
                            ${condition.triggers.slice(0, 4).map(item => `<li>${formatListItem(item)}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}

                    ${condition.diagnosis && condition.diagnosis.length > 0 ? `
                    <div class="derm-pearl-subsection">
                        <h4 class="derm-pearl-subtitle">📋 Quick Diagnostic Approach</h4>
                        <div class="derm-diagnosis-box">
                            ${condition.diagnosis.slice(0, 3).map(item => `<div>${formatListItem(item)}</div>`).join('')}
                        </div>
                    </div>
                    ` : ''}

                    ${condition.management && condition.management.length > 0 ? `
                    <div class="derm-pearl-subsection">
                        <h4 class="derm-pearl-subtitle">💊 First-Line Management</h4>
                        <div class="derm-mgmt-quick">
                            ${condition.management.slice(0, 4).map(item => {
                                const clean = formatListItem(item).replace(/<strong>|<\/strong>/g, '');
                                return `<div class="derm-mgmt-item">${clean}</div>`;
                            }).join('')}
                        </div>
                    </div>
                    ` : ''}

                    ${condition.complications && condition.complications.length > 0 ? `
                    <div class="derm-pearl-subsection">
                        <h4 class="derm-pearl-subtitle">⚠️ Watch For Complications</h4>
                        <ul class="derm-complication-list">
                            ${condition.complications.slice(0, 4).map(item => `<li>${formatListItem(item)}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                </div>
            `;
        }

        // Image gallery at the top
        if (condition.clinicalPresentation?.images && condition.clinicalPresentation.images.length > 0) {
            html += `
                <div class="detail-section image-gallery">
                    <h4>Clinical Images</h4>
                    <div class="image-gallery-grid">
                        ${condition.clinicalPresentation.images.map(img => `
                            <img src="static/assets/dermatology/${img}" 
                                 alt="${condition.title}" 
                                 class="condition-image"
                                 onclick="window.open(this.src, '_blank')"
                                 title="Click to view full size">
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Helper function to render any section
        const renderSection = (title, content) => {
            if (!content) return '';
            if (Array.isArray(content)) {
                return `
                    <div class="detail-section">
                        <h4>${title}</h4>
                        <ul>
                            ${content.map(item => `<li>${formatListItem(item)}</li>`).join('')}
                        </ul>
                    </div>
                `;
            } else if (typeof content === 'object') {
                let objHtml = `<div class="detail-section"><h4>${title}</h4>`;
                for (const [key, value] of Object.entries(content)) {
                    // Skip images array (already rendered)
                    if (key === 'images') continue;
                    
                    if (Array.isArray(value)) {
                        const label = key.charAt(0).toUpperCase() + key.slice(1);
                        objHtml += `
                            <div class="subsection">
                                <div class="subsection-label">${label}</div>
                                <ul class="subsection-list">
                                    ${value.map(item => `<li>${formatListItem(item)}</li>`).join('')}
                                </ul>
                            </div>
                        `;
                    } else if (typeof value === 'string') {
                        const label = key.charAt(0).toUpperCase() + key.slice(1);
                        objHtml += `<div class="subsection"><div class="subsection-label">${label}</div><p class="subsection-text">${value}</p></div>`;
                    }
                }
                objHtml += '</div>';
                return objHtml;
            } else {
                return `
                    <div class="detail-section">
                        <h4>${title}</h4>
                        <p>${content}</p>
                    </div>
                `;
            }
        };

        // Helper function to render management section with better hierarchy
        const renderManagementSection = (items) => {
            if (!items || !Array.isArray(items)) return '';
            
            let html = '<div class="detail-section management-section"><h4>Management</h4>';
            let currentGroup = null;
            let groupItems = [];

            items.forEach((item, index) => {
                const strongMatch = item.match(/<strong>(.*?)<\/strong>:/);
                
                if (strongMatch) {
                    // This is a header - close previous group if exists
                    if (currentGroup && groupItems.length > 0) {
                        html += `
                            <div class="management-group">
                                <div class="management-group-title">${currentGroup}</div>
                                <ul class="management-group-list">
                                    ${groupItems.map(gi => `<li>${formatListItem(gi)}</li>`).join('')}
                                </ul>
                            </div>
                        `;
                        groupItems = [];
                    }
                    currentGroup = strongMatch[1];
                } else if (currentGroup) {
                    // This is an item under a header
                    groupItems.push(item);
                } else {
                    // Standalone item without header
                    html += `<ul><li>${formatListItem(item)}</li></ul>`;
                }
            });

            // Close last group if exists
            if (currentGroup && groupItems.length > 0) {
                html += `
                    <div class="management-group">
                        <div class="management-group-title">${currentGroup}</div>
                        <ul class="management-group-list">
                            ${groupItems.map(gi => `<li>${formatListItem(gi)}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }

            html += '</div>';
            return html;
        };

        // Clinical Presentation
        if (condition.clinicalPresentation) {
            html += renderSection('Clinical Presentation', condition.clinicalPresentation);
        }

        // Pathophysiology
        if (condition.pathophysiology) {
            html += renderSection('Pathophysiology', condition.pathophysiology);
        }

        // Variants/Subtypes
        if (condition.variants) {
            html += renderSection('Variants', condition.variants);
        }
        if (condition.subtypes) {
            html += renderSection('Subtypes', condition.subtypes);
        }

        // Risk Factors
        if (condition.riskFactors) {
            html += renderSection('Risk Factors', condition.riskFactors);
        }

        // Triggers
        if (condition.triggers) {
            html += renderSection('Triggers', condition.triggers);
        }

        // Associations
        if (condition.associations) {
            html += renderSection('Associations', condition.associations);
        }

        // Diagnosis
        if (condition.diagnosis) {
            html += renderSection('Diagnosis', condition.diagnosis);
        }

        // Differential Diagnosis
        if (condition.differentialDiagnosis) {
            html += renderSection('Differential Diagnosis', condition.differentialDiagnosis);
        }

        // Management - Special rendering for hierarchical structure
        if (condition.management) {
            html += renderManagementSection(condition.management);
        }

        // Complications
        if (condition.complications) {
            html += renderSection('Complications', condition.complications);
        }

        // Red Flags
        if (condition.redFlags) {
            html += `
                <div class="detail-section red-flags">
                    <h4>⚠️ Red Flags</h4>
                    <ul>
                        ${condition.redFlags.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Prognosis
        if (condition.prognosis) {
            html += renderSection('Prognosis', condition.prognosis);
        }

        return html;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners(container) {
        // Search input
        const searchInput = container.querySelector('#dermatology-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.render(container);
            });
        }

        // Category buttons
        container.querySelectorAll('.dermatology-category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = btn.dataset.category;
                this.currentCategory = category;
                this.searchQuery = ''; // Clear search when changing category
                this.render(container);
                analytics.trackEvent('dermatology_category_selected', { category });
            });
        });

        // Favorite buttons
        container.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const conditionId = btn.dataset.conditionId;
                await this.toggleFavorite(conditionId);
                this.render(container);
            });
        });

        // View details buttons
        container.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const conditionId = btn.dataset.conditionId;
                const condition = this.getCondition(conditionId);
                if (condition) {
                    this.renderDetailedView(condition);
                    analytics.trackEvent('dermatology_condition_viewed', { conditionId });
                }
            });
        });

        // Condition cards (click to view details)
        container.querySelectorAll('.dermatology-condition-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking favorite button or view details button
                if (e.target.closest('.favorite-btn') || e.target.closest('.view-details-btn')) {
                    return;
                }
                const conditionId = card.dataset.conditionId;
                const condition = this.getCondition(conditionId);
                if (condition) {
                    this.renderDetailedView(condition);
                    analytics.trackEvent('dermatology_condition_viewed', { conditionId });
                }
            });
        });
    }

    /**
     * Ensure styles are injected
     */
    ensureStyles() {
        if (document.getElementById('dermatology-styles')) return;

        const style = document.createElement('style');
        style.id = 'dermatology-styles';
        style.textContent = `
            .dermatology-container {
                padding: 20px;
                max-width: 1400px;
                margin: 0 auto;
            }

            .dermatology-header {
                margin-bottom: 24px;
            }

            .dermatology-header h3 {
                font-size: 1.75rem;
                margin: 0 0 8px 0;
                color: var(--v2-text-primary, #0f172a);
            }

            .dermatology-header p {
                margin: 0;
                color: var(--v2-text-secondary, #64748b);
                font-size: 0.95rem;
            }

            .dermatology-controls {
                background: var(--v2-bg-card, #ffffff);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 24px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }

            .dermatology-search-box {
                position: relative;
                margin-bottom: 16px;
            }

            .dermatology-search-box input {
                width: 100%;
                padding: 12px 16px 12px 44px;
                border: 1px solid var(--v2-border-light, #e2e8f0);
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.2s;
            }

            .dermatology-search-box input:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }

            .dermatology-search-icon {
                position: absolute;
                left: 16px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 1.2rem;
                opacity: 0.5;
            }

            .dermatology-category-filter {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-bottom: 16px;
            }

            .dermatology-category-btn {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 8px 16px;
                border: 1px solid var(--v2-border-light, #e2e8f0);
                border-radius: 20px;
                background: var(--v2-bg-main, #ffffff);
                cursor: pointer;
                transition: all 0.2s;
                font-size: 0.9rem;
            }

            .dermatology-category-btn:hover {
                background: var(--v2-bg-hover, #f1f5f9);
                border-color: #3b82f6;
            }

            .dermatology-category-btn.active {
                background: #3b82f6;
                color: white;
                border-color: #3b82f6;
            }

            .dermatology-category-btn .cat-count {
                background: rgba(0, 0, 0, 0.1);
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 0.8rem;
                font-weight: 600;
            }

            .dermatology-category-btn.active .cat-count {
                background: rgba(255, 255, 255, 0.3);
            }

            .dermatology-stats {
                display: flex;
                gap: 24px;
                padding-top: 16px;
                border-top: 1px solid var(--v2-border-light, #e2e8f0);
            }

            .dermatology-stats .stat-item {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .dermatology-stats .stat-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: #3b82f6;
            }

            .dermatology-stats .stat-label {
                font-size: 0.85rem;
                color: var(--v2-text-secondary, #64748b);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .dermatology-conditions-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 20px;
            }

            .dermatology-condition-card {
                background: var(--v2-bg-card, #ffffff);
                border: 1px solid var(--v2-border-light, #e2e8f0);
                border-radius: 12px;
                padding: 20px;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            .dermatology-condition-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                border-color: #3b82f6;
            }

            .condition-header {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .condition-title-row {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 12px;
            }

            .condition-title {
                font-size: 1.15rem;
                margin: 0;
                color: var(--v2-text-primary, #0f172a);
                flex: 1;
            }

            .favorite-btn {
                background: none;
                border: none;
                font-size: 1.4rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
                opacity: 0.5;
                transition: opacity 0.2s;
            }

            .favorite-btn:hover,
            .favorite-btn.favorited {
                opacity: 1;
            }

            .condition-category {
                display: inline-block;
                background: rgba(59, 130, 246, 0.1);
                color: #3b82f6;
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 0.85rem;
                font-weight: 500;
            }

            .condition-content {
                display: flex;
                flex-direction: column;
                gap: 12px;
                flex: 1;
            }

            .condition-section {
                font-size: 0.9rem;
                padding: 12px 12px 10px 14px;
                border-radius: 10px;
                background: rgba(59, 130, 246, 0.06);
                border: 1px solid rgba(59, 130, 246, 0.16);
            }

            .condition-section-title {
                display: block;
                color: #1e40af;
                margin-bottom: 6px;
                font-size: 0.78rem;
                text-transform: uppercase;
                letter-spacing: 0.08em;
            }

            .condition-section-text {
                margin: 0;
                line-height: 1.6;
                color: var(--v2-text-primary, #0f172a);
            }

            .condition-section-list {
                margin: 0;
                padding-left: 0;
                list-style: none;
            }

            .condition-section-list li {
                margin-bottom: 6px;
                line-height: 1.5;
                color: var(--v2-text-primary, #0f172a);
                padding-left: 18px;
                position: relative;
            }

            .condition-section-list li::before {
                content: '•';
                position: absolute;
                left: 0;
                color: #3b82f6;
                font-weight: 700;
            }

            .more-indicator {
                color: #3b82f6 !important;
                font-style: italic;
            }

            .view-details-btn {
                padding: 10px 16px;
                background: #3b82f6;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 0.9rem;
                font-weight: 500;
                cursor: pointer;
                transition: background 0.2s;
                text-align: center;
            }

            .view-details-btn:hover {
                background: #2563eb;
            }

            .no-results {
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 20px;
                color: var(--v2-text-secondary, #64748b);
            }

            /* Modal Styles */
            .dermatology-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 20px;
            }

            .dermatology-modal {
                background: var(--v2-bg-card, #ffffff);
                border-radius: 16px;
                max-width: 900px;
                width: 100%;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 24px;
                border-bottom: 1px solid var(--v2-border-light, #e2e8f0);
            }

            .modal-header h2 {
                margin: 0;
                font-size: 1.5rem;
                color: var(--v2-text-primary, #0f172a);
            }

            .modal-close-btn {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 4px 8px;
                line-height: 1;
                color: var(--v2-text-secondary, #64748b);
                transition: color 0.2s;
            }

            .modal-close-btn:hover {
                color: var(--v2-text-primary, #0f172a);
            }

            .modal-content {
                padding: 24px;
                overflow-y: auto;
            }

            .detail-section {
                margin-bottom: 24px;
            }

            .detail-section h4 {
                color: #1e40af;
                margin: 0 0 12px 0;
                font-size: 1.1rem;
                padding-bottom: 8px;
                border-bottom: 2px solid rgba(59, 130, 246, 0.2);
            }

            .detail-section ul {
                margin: 0;
                padding-left: 24px;
            }

            .detail-section li {
                margin-bottom: 8px;
                line-height: 1.6;
            }

            .detail-section.red-flags {
                background: #fef2f2;
                padding: 16px;
                border-radius: 8px;
                border-left: 4px solid #ef4444;
            }

            .detail-section.red-flags h4 {
                color: #dc2626;
                margin-bottom: 12px;
            }

            .detail-section.red-flags li {
                color: #7f1d1d;
                font-weight: 500;
            }

            /* Management section styles */
            .management-section {
                background: var(--v2-bg-card, #f8fafc);
            }

            .management-group {
                margin-bottom: 20px;
                padding: 16px;
                background: white;
                border-radius: 8px;
                border-left: 3px solid #3b82f6;
            }

            .management-group:last-child {
                margin-bottom: 0;
            }

            .management-group-title {
                font-weight: 600;
                color: #1e40af;
                font-size: 1.05rem;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
            }

            .management-group-title::before {
                content: '💊';
                margin-right: 8px;
                font-size: 1.1rem;
            }

            .management-group-list {
                list-style: none;
                padding-left: 0;
                margin: 0;
            }

            .management-group-list li {
                padding: 8px 12px;
                margin-bottom: 6px;
                background: #f1f5f9;
                border-radius: 4px;
                line-height: 1.6;
                position: relative;
                padding-left: 28px;
            }

            .management-group-list li::before {
                content: '▸';
                position: absolute;
                left: 12px;
                color: #3b82f6;
                font-weight: bold;
            }

            .management-group-list li:last-child {
                margin-bottom: 0;
            }

            /* Image gallery styles */
            .image-gallery {
                background: var(--v2-bg-card, #f8fafc);
                padding: 16px;
                border-radius: 8px;
                border: 1px solid var(--v2-border-light, #e2e8f0);
            }

            .image-gallery-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 12px;
                margin-top: 12px;
            }

            .condition-image {
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-radius: 8px;
                border: 2px solid var(--v2-border-light, #e2e8f0);
                cursor: pointer;
                transition: all 0.3s;
            }

            .condition-image:hover {
                transform: scale(1.05);
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
                border-color: #3b82f6;
            }

            @media (max-width: 768px) {
                .image-gallery-grid {
                    grid-template-columns: 1fr;
                }
                
                .condition-image {
                    height: 250px;
                }
            }

            .subsection {
                margin-bottom: 16px;
            }

            .subsection-label {
                display: block;
                color: #1e40af;
                font-weight: 600;
                margin-bottom: 8px;
                font-size: 0.8rem;
                text-transform: capitalize;
                letter-spacing: 0.06em;
            }

            .subsection-text {
                margin: 0;
                padding: 10px 12px;
                border-radius: 8px;
                background: rgba(59, 130, 246, 0.08);
                color: var(--v2-text-primary, #0f172a);
            }

            .subsection-list {
                margin: 0;
                padding-left: 0;
                list-style: none;
            }

            .subsection-list li {
                margin-bottom: 8px;
                padding-left: 18px;
                position: relative;
            }

            .subsection-list li::before {
                content: '•';
                position: absolute;
                left: 0;
                color: #3b82f6;
                font-weight: 700;
            }

            .subsection strong {
                color: #1e40af;
            }

            /* Dark mode support */
            [data-theme="dark"] .dermatology-container {
                color: #e2e8f0;
            }

            [data-theme="dark"] .dermatology-header h3,
            [data-theme="dark"] .condition-title,
            [data-theme="dark"] .modal-header h2 {
                color: #f1f5f9;
            }

            [data-theme="dark"] .dermatology-controls,
            [data-theme="dark"] .dermatology-condition-card,
            [data-theme="dark"] .dermatology-modal {
                background: #1e293b;
                border-color: #334155;
            }

            [data-theme="dark"] .dermatology-search-box input,
            [data-theme="dark"] .dermatology-category-btn {
                background: #0f172a;
                border-color: #334155;
                color: #e2e8f0;
            }

            [data-theme="dark"] .condition-section li,
            [data-theme="dark"] .detail-section li {
                color: #cbd5e1;
            }

            [data-theme="dark"] .condition-section {
                background: rgba(59, 130, 246, 0.16);
                border-color: rgba(59, 130, 246, 0.3);
            }

            [data-theme="dark"] .condition-section-title {
                color: #93c5fd;
            }

            [data-theme="dark"] .condition-section-text,
            [data-theme="dark"] .condition-section-list li,
            [data-theme="dark"] .subsection-text,
            [data-theme="dark"] .subsection-list li {
                color: #e2e8f0;
            }

            [data-theme="dark"] .subsection-label {
                color: #93c5fd;
            }

            [data-theme="dark"] .subsection-text {
                background: rgba(59, 130, 246, 0.18);
            }

            [data-theme="dark"] .detail-section.red-flags {
                background: rgba(239, 68, 68, 0.15);
                border-left-color: #ef4444;
            }

            [data-theme="dark"] .detail-section.red-flags h4 {
                color: #fca5a5;
            }

            [data-theme="dark"] .detail-section.red-flags li {
                color: #fecaca;
            }

            [data-theme="dark"] .management-section {
                background: #1e293b;
            }

            [data-theme="dark"] .management-group {
                background: #0f172a;
                border-left-color: #60a5fa;
            }

            [data-theme="dark"] .management-group-title {
                color: #93c5fd;
            }

            [data-theme="dark"] .management-group-list li {
                background: #1e293b;
                color: #e2e8f0;
            }

            [data-theme="dark"] .management-group-list li::before {
                color: #60a5fa;
            }
        `;

        document.head.appendChild(style);
    }
}

// Create singleton instance
export const dermatologyManager = new DermatologyManager();
export default dermatologyManager;
