/**
 * Pregnancy and Breastfeeding Drug Safety Manager
 * Manages contraindicated drugs and safe alternatives for pregnancy and breastfeeding
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { analytics } from './AnalyticsManager.js';
import { pregnancyBreastfeedingData } from '../../data/pregnancyBreastfeedingData.js';

export class PregnancyDrugsManager {
    constructor() {
        this.eventBus = eventBus;
        this.storage = storage;
        this.data = pregnancyBreastfeedingData;
        this.favorites = new Set();
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) {
            console.warn('⚠️ PregnancyDrugsManager already initialized');
            return;
        }

        try {
            console.log('🤰 Initializing PregnancyDrugsManager...');
            
            // Check data integrity
            console.log('📊 Data check:', {
                drugCategories: this.data?.drugCategories?.length || 0,
                safetyCategories: !!this.data?.safetyCategories,
                version: this.data?.version || 'unknown'
            });

            // Load favorites
            await this.loadFavorites();

            // Setup UI
            this.setupUI();

            // Setup search
            this.setupSearch();

            this.initialized = true;
            console.log('✅ PregnancyDrugsManager initialized');

        } catch (error) {
            console.error('❌ Failed to initialize PregnancyDrugsManager:', error);
            throw error;
        }
    }

    setupUI() {
        console.log('🔧 Setting up PregnancyDrugsManager UI...');
        
        // Check if required DOM elements exist
        const requiredElements = [
            'pregnancyDrugsList',
            'safePregDrugs', 
            'safeBFDrugs',
            'absoluteContraDrugs',
            'pregnancyClinicalPearls',
            'pregnancyResourcesList'
        ];
        
        const missingElements = requiredElements.filter(id => !document.getElementById(id));
        if (missingElements.length > 0) {
            console.error('❌ Missing DOM elements:', missingElements);
            return;
        }
        
        console.log('✅ All required DOM elements found');
        
        // Category filter buttons
        const categoryButtons = document.querySelectorAll('.pregnancy-category-btn');
        console.log(`🔘 Found ${categoryButtons.length} category buttons`);
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category;
                this.renderDrugs();
                analytics.track('pregnancy_drugs_category_selected', { category: this.currentCategory });
            });
        });

        // Quick reference buttons
        const quickRefButtons = document.querySelectorAll('.quick-ref-btn');
        quickRefButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.quickref;
                this.showQuickReference(category);
            });
        });

        // Initial render
        console.log('🎨 Starting initial render...');
        this.renderDrugs();
        this.renderQuickReferences();
        this.renderResources();
        this.renderClinicalPearls();
        console.log('✅ Render complete');
    }

    setupSearch() {
        const searchInput = document.getElementById('pregnancyDrugsSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                this.renderDrugs();
            });
        }
    }

    setupEventListeners() {
        // Listen for global search
        this.eventBus.on('global-search-query', (query) => {
            const pregnancyTab = document.getElementById('pregnancy-tab');
            if (pregnancyTab && pregnancyTab.classList.contains('active')) {
                this.searchQuery = query.toLowerCase();
                const searchInput = document.getElementById('pregnancyDrugsSearch');
                if (searchInput) searchInput.value = query;
                this.renderDrugs();
            }
        });

        // Navigation from other modules
        this.eventBus.on('show-pregnancy-drug', (drugName) => {
            this.showDrugInfo(drugName);
        });
        
        // Listen for tab load event
        this.eventBus.on('load-pregnancy-drugs', () => {
            if (!this.initialized) {
                this.initialize();
            }
        });
    }

    renderDrugs() {
        console.log('🎯 Starting renderDrugs...');
        const container = document.getElementById('pregnancyDrugsList');
        if (!container) {
            console.error('❌ pregnancyDrugsList container not found!');
            return;
        }

        console.log(`📊 Data categories available: ${this.data.drugCategories.length}`);
        console.log(`🔍 Current category: ${this.currentCategory}`);
        console.log(`🔎 Search query: "${this.searchQuery}"`);

        let html = '';
        let matchCount = 0;

        this.data.drugCategories.forEach(category => {
            const filteredDrugs = category.drugs.filter(drug => this.filterDrug(drug));
            
            if (filteredDrugs.length === 0) return;

            html += `
                <div class="pregnancy-category-section">
                    <h3 class="category-header">${category.categoryName}</h3>
                    <div class="drugs-grid">
            `;

            filteredDrugs.forEach(drug => {
                matchCount++;
                const isFavorite = this.favorites.has(drug.drug);
                html += this.renderDrugCard(drug, isFavorite);
            });

            html += `
                    </div>
                </div>
            `;
        });

        if (matchCount === 0) {
            html = `
                <div class="no-results">
                    <p>No drugs found matching your criteria.</p>
                    <p class="hint">Try adjusting your search or category filter.</p>
                </div>
            `;
        }

        console.log(`📋 Generated HTML length: ${html.length} chars, ${matchCount} drugs`);
        container.innerHTML = html;

        // Setup favorite buttons
        container.querySelectorAll('.preg-card__fav').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const drugName = btn.dataset.drug;
                this.toggleFavorite(drugName);
            });
        });

        // Setup drug card clicks
        container.querySelectorAll('.preg-card').forEach(card => {
            card.addEventListener('click', () => {
                const drugName = card.dataset.drug;
                this.showDrugDetail(drugName);
            });
        });
        
        console.log('✅ renderDrugs complete');
    }

    filterDrug(drug) {
        // Category filter
        if (this.currentCategory !== 'all') {
            if (this.currentCategory === 'pregnancy_all' && !drug.pregnancy.allTrimesters) return false;
            if (this.currentCategory === 'pregnancy_t1' && !drug.pregnancy.t1) return false;
            if (this.currentCategory === 'pregnancy_t2' && !drug.pregnancy.t2) return false;
            if (this.currentCategory === 'pregnancy_t3' && !drug.pregnancy.t3) return false;
            if (this.currentCategory === 'breastfeeding' && !drug.breastfeeding.contraindicated) return false;
        }

        // Search filter
        if (this.searchQuery) {
            const searchLower = this.searchQuery;
            const drugLower = drug.drug.toLowerCase();
            const examplesLower = drug.examples.join(' ').toLowerCase();
            const reasonLower = drug.pregnancy.reason.toLowerCase();
            
            return drugLower.includes(searchLower) || 
                   examplesLower.includes(searchLower) || 
                   reasonLower.includes(searchLower);
        }

        return true;
    }

    renderDrugCard(drug, isFavorite) {
        const severity = drug.pregnancy.severity || 'CAUTION';
        const severityClass = this.getSeverityClass(severity);
        const severityIcon = severity.includes('ABSOLUTE') ? '⛔' : severity.includes('AVOID') || severity.includes('CONTRAINDICATED') ? '⚠️' : '⚡';

        return `
            <div class="preg-card ${severityClass}" data-drug="${drug.drug}">
                <div class="preg-card__top-bar ${severityClass}"></div>
                <div class="preg-card__body">
                    <div class="preg-card__header">
                        <div class="preg-card__title-wrap">
                            <h4 class="preg-card__name">${drug.drug}</h4>
                            <span class="preg-card__examples">${drug.examples.join(', ')}</span>
                        </div>
                        <button class="preg-card__fav ${isFavorite ? 'active' : ''}" data-drug="${drug.drug}" title="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                            ${isFavorite ? '★' : '☆'}
                        </button>
                    </div>

                    <div class="preg-card__severity ${severityClass}">
                        <span class="preg-card__severity-icon">${severityIcon}</span>
                        <span class="preg-card__severity-text">${severity}</span>
                    </div>

                    <div class="preg-card__badges">
                        ${drug.pregnancy.allTrimesters ? '<span class="preg-badge preg-badge--all">🚫 All Trimesters</span>' : ''}
                        ${drug.pregnancy.t1 && !drug.pregnancy.allTrimesters ? '<span class="preg-badge preg-badge--t1">T1</span>' : ''}
                        ${drug.pregnancy.t2 && !drug.pregnancy.allTrimesters ? '<span class="preg-badge preg-badge--t2">T2</span>' : ''}
                        ${drug.pregnancy.t3 && !drug.pregnancy.allTrimesters ? '<span class="preg-badge preg-badge--t3">T3</span>' : ''}
                        ${drug.breastfeeding.contraindicated ? '<span class="preg-badge preg-badge--bf">🤱 Breastfeeding</span>' : ''}
                    </div>

                    <div class="preg-card__reason">
                        <div class="preg-card__reason-label">Risk</div>
                        <p class="preg-card__reason-text">${drug.pregnancy.reason}</p>
                    </div>

                    <div class="preg-card__alt">
                        <div class="preg-card__alt-label">✅ Alternative</div>
                        <p class="preg-card__alt-text">${drug.alternatives.pregnancy}</p>
                    </div>

                    <div class="preg-card__footer">
                        <span class="preg-card__cta">View full details →</span>
                    </div>
                </div>
            </div>
        `;
    }

    getSeverityClass(severity) {
        if (severity.includes('ABSOLUTE')) return 'severity-absolute';
        if (severity.includes('CONTRAINDICATED') || severity.includes('AVOID')) return 'severity-contraindicated';
        if (severity.includes('CAUTION')) return 'severity-caution';
        return 'severity-safe';
    }

    showDrugDetail(drugName) {
        const drug = this.findDrug(drugName);
        if (!drug) return;

        const modal = document.getElementById('pregnancyDrugModal');
        const modalContent = document.getElementById('pregnancyDrugModalContent');
        
        if (!modal || !modalContent) return;

        const html = `
            <div class="drug-detail">
                <h2>${drug.drug}</h2>
                
                <div class="drug-detail-section">
                    <h3>Examples</h3>
                    <div class="examples-list">
                        ${drug.examples.map(ex => `<span class="example-badge">${ex}</span>`).join('')}
                    </div>
                </div>

                <div class="drug-detail-section pregnancy-section">
                    <h3>🤰 Pregnancy</h3>
                    <div class="severity-banner ${this.getSeverityClass(drug.pregnancy.severity)}">
                        ${drug.pregnancy.severity}
                    </div>
                    
                    <div class="trimester-info">
                        <div class="trimester-badge ${drug.pregnancy.t1 ? 'contraindicated' : 'safe'}">
                            <strong>1st Trimester</strong>
                            <span>${drug.pregnancy.t1 ? '🚫 Avoid' : '✓ Use with caution'}</span>
                        </div>
                        <div class="trimester-badge ${drug.pregnancy.t2 ? 'contraindicated' : 'safe'}">
                            <strong>2nd Trimester</strong>
                            <span>${drug.pregnancy.t2 ? '🚫 Avoid' : '✓ Use with caution'}</span>
                        </div>
                        <div class="trimester-badge ${drug.pregnancy.t3 ? 'contraindicated' : 'safe'}">
                            <strong>3rd Trimester</strong>
                            <span>${drug.pregnancy.t3 ? '🚫 Avoid' : '✓ Use with caution'}</span>
                        </div>
                    </div>

                    <div class="reason-box">
                        <strong>Reason for contraindication:</strong>
                        <p>${drug.pregnancy.reason}</p>
                    </div>

                    <div class="alternatives-box">
                        <strong>✅ Safe Alternatives in Pregnancy:</strong>
                        <p>${drug.alternatives.pregnancy}</p>
                    </div>
                </div>

                <div class="drug-detail-section breastfeeding-section">
                    <h3>🤱 Breastfeeding</h3>
                    <div class="bf-status ${drug.breastfeeding.contraindicated ? 'contraindicated' : 'safe'}">
                        ${drug.breastfeeding.contraindicated ? '🚫 Contraindicated' : '✓ Generally Safe / Use with Caution'}
                    </div>
                    <p>${drug.breastfeeding.notes}</p>
                    ${drug.breastfeeding.severity ? `<div class="severity-note">${drug.breastfeeding.severity}</div>` : ''}
                    
                    <div class="alternatives-box">
                        <strong>✅ Safe Alternatives in Breastfeeding:</strong>
                        <p>${drug.alternatives.breastfeeding}</p>
                    </div>
                </div>

                <div class="drug-detail-footer">
                    <p><em>Always consult BNF and UKTIS for the most up-to-date information</em></p>
                </div>
            </div>
        `;

        modalContent.innerHTML = html;
        modal.style.display = 'flex';

        analytics.track('pregnancy_drug_viewed', { drug: drugName });
    }

    findDrug(drugName) {
        for (let category of this.data.drugCategories) {
            const drug = category.drugs.find(d => d.drug === drugName);
            if (drug) return drug;
        }
        return null;
    }

    renderQuickReferences() {
        console.log('📋 Starting renderQuickReferences...');
        const safePregContainer = document.getElementById('safePregDrugs');
        const safeBFContainer = document.getElementById('safeBFDrugs');
        const absoluteContraContainer = document.getElementById('absoluteContraDrugs');

        console.log('🔍 Quick ref containers found:', {
            safePregDrugs: !!safePregContainer,
            safeBFDrugs: !!safeBFContainer, 
            absoluteContraDrugs: !!absoluteContraContainer
        });

        if (safePregContainer) {
            const drugs = this.data.safetyCategories.generallySafe.drugs;
            console.log(`✅ Safe preg drugs: ${drugs.length}`);
            safePregContainer.innerHTML = this.renderDrugTable(drugs, 'safe');
        }

        if (safeBFContainer) {
            const drugs = this.data.safetyCategories.generallySafeBreastfeeding.drugs;
            console.log(`🤱 Safe BF drugs: ${drugs.length}`);
            safeBFContainer.innerHTML = this.renderDrugTable(drugs, 'safe');
        }

        if (absoluteContraContainer) {
            const drugs = this.data.safetyCategories.absoluteContraindications.drugs;
            console.log(`🚫 Contraindicated drugs: ${drugs.length}`);
            absoluteContraContainer.innerHTML = this.renderDrugTable(drugs, 'danger');
        }
        
        console.log('✅ renderQuickReferences complete');
    }

    renderDrugTable(drugs, type) {
        const cellClass = type === 'danger' ? 'qr-pill--danger' : 'qr-pill--safe';
        const icon = type === 'danger' ? '🚫' : '✓';
        
        return `
            <div class="qr-pill-grid">
                ${drugs.map(drug => `
                    <div class="qr-pill ${cellClass}">
                        <span class="qr-pill__icon">${icon}</span>
                        <span class="qr-pill__name">${drug}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    showQuickReference(category) {
        const data = this.data.safetyCategories[category];
        if (!data) return;

        const modal = document.getElementById('pregnancyDrugModal');
        const modalContent = document.getElementById('pregnancyDrugModalContent');
        
        if (!modal || !modalContent) return;

        const html = `
            <div class="quick-ref-detail">
                <h2>${data.name}</h2>
                <ul class="quick-ref-detail-list">
                    ${data.drugs.map(drug => `<li>${drug}</li>`).join('')}
                </ul>
                <p class="disclaimer"><em>This is a general guide. Always check individual drug monographs for specific information.</em></p>
            </div>
        `;

        modalContent.innerHTML = html;
        modal.style.display = 'flex';

        analytics.track('pregnancy_quick_ref_viewed', { category });
    }

    renderResources() {
        const container = document.getElementById('pregnancyResourcesList');
        if (!container) return;

        const html = this.data.resources.map(resource => `
            <div class="resource-card">
                <h4>${resource.name}</h4>
                <p>${resource.description}</p>
                <a href="${resource.url}" target="_blank" rel="noopener noreferrer">Visit Resource →</a>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    renderClinicalPearls() {
        const container = document.getElementById('pregnancyClinicalPearls');
        if (!container) return;

        const html = `
            <ul class="clinical-pearls-list">
                ${this.data.clinicalPearls.map(pearl => `<li>💡 ${pearl}</li>`).join('')}
            </ul>
        `;

        container.innerHTML = html;
    }

    async toggleFavorite(drugName) {
        if (this.favorites.has(drugName)) {
            this.favorites.delete(drugName);
        } else {
            this.favorites.add(drugName);
        }
        
        await this.saveFavorites();
        this.renderDrugs();
        
        analytics.track('pregnancy_drug_favorite_toggled', { 
            drug: drugName, 
            action: this.favorites.has(drugName) ? 'added' : 'removed' 
        });
    }

    async loadFavorites() {
        try {
            const favorites = await this.storage.getItem('pregnancy_drugs_favorites');
            if (favorites) {
                this.favorites = new Set(JSON.parse(favorites));
            }
        } catch (error) {
            console.error('Failed to load favorites:', error);
        }
    }

    async saveFavorites() {
        try {
            await this.storage.setItem('pregnancy_drugs_favorites', JSON.stringify(Array.from(this.favorites)));
        } catch (error) {
            console.error('Failed to save favorites:', error);
        }
    }

    showDrugInfo(drugName) {
        // Switch to pregnancy drugs panel
        this.eventBus.emit('navigate-to-screen', 'pregnancy-drugs-panel');
        
        // Show the drug
        setTimeout(() => {
            this.showDrugDetail(drugName);
        }, 300);
    }

    // Search integration for global search
    search(query) {
        const results = [];
        const queryLower = query.toLowerCase();

        this.data.drugCategories.forEach(category => {
            category.drugs.forEach(drug => {
                const drugLower = drug.drug.toLowerCase();
                const examplesLower = drug.examples.join(' ').toLowerCase();
                const reasonLower = drug.pregnancy.reason.toLowerCase();

                if (drugLower.includes(queryLower) || 
                    examplesLower.includes(queryLower) || 
                    reasonLower.includes(queryLower)) {
                    
                    results.push({
                        title: drug.drug,
                        subtitle: `${drug.examples.join(', ')}`,
                        content: drug.pregnancy.reason,
                        category: 'Pregnancy/Breastfeeding Safety',
                        type: 'pregnancy-drug',
                        data: drug,
                        onClick: () => this.showDrugDetail(drug.drug)
                    });
                }
            });
        });

        return results;
    }
}

// Create singleton instance
export const pregnancyDrugsManager = new PregnancyDrugsManager();
export default pregnancyDrugsManager;
