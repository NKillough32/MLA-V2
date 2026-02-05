/**
 * Pregnancy and Breastfeeding Drug Safety Manager
 * Manages contraindicated drugs and safe alternatives for pregnancy and breastfeeding
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { analytics } from './AnalyticsManager.js';
import pregnancyBreastfeedingData from '../../drugs/pregnancy_breastfeeding_guide.js';

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

            // Load favorites
            this.loadFavorites();

            // Setup UI
            this.setupUI();

            // Setup search
            this.setupSearch();

            // Setup event listeners
            this.setupEventListeners();

            this.initialized = true;
            console.log('✅ PregnancyDrugsManager initialized');

        } catch (error) {
            console.error('❌ Failed to initialize PregnancyDrugsManager:', error);
            throw error;
        }
    }

    setupUI() {
        // Category filter buttons
        const categoryButtons = document.querySelectorAll('.pregnancy-category-btn');
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
        this.renderDrugs();
        this.renderQuickReferences();
        this.renderResources();
        this.renderClinicalPearls();
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
            if (document.getElementById('pregnancy-drugs-panel')?.style.display !== 'none') {
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
    }

    renderDrugs() {
        const container = document.getElementById('pregnancyDrugsList');
        if (!container) return;

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

        container.innerHTML = html;

        // Setup favorite buttons
        container.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const drugName = btn.dataset.drug;
                this.toggleFavorite(drugName);
            });
        });

        // Setup drug card clicks
        container.querySelectorAll('.pregnancy-drug-card').forEach(card => {
            card.addEventListener('click', () => {
                const drugName = card.dataset.drug;
                this.showDrugDetail(drugName);
            });
        });
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

        return `
            <div class="pregnancy-drug-card ${severityClass}" data-drug="${drug.drug}">
                <div class="drug-card-header">
                    <h4 class="drug-name">${drug.drug}</h4>
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-drug="${drug.drug}" title="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                        ${isFavorite ? '★' : '☆'}
                    </button>
                </div>
                <div class="drug-examples">
                    ${drug.examples.slice(0, 3).join(', ')}${drug.examples.length > 3 ? '...' : ''}
                </div>
                <div class="drug-severity-badge ${severityClass}">
                    ${severity}
                </div>
                <div class="drug-contraindications">
                    ${drug.pregnancy.allTrimesters ? '<span class="badge-pregnancy">🚫 All Trimesters</span>' : ''}
                    ${drug.pregnancy.t1 && !drug.pregnancy.allTrimesters ? '<span class="badge-t1">T1</span>' : ''}
                    ${drug.pregnancy.t2 && !drug.pregnancy.allTrimesters ? '<span class="badge-t2">T2</span>' : ''}
                    ${drug.pregnancy.t3 && !drug.pregnancy.allTrimesters ? '<span class="badge-t3">T3</span>' : ''}
                    ${drug.breastfeeding.contraindicated ? '<span class="badge-bf">🚫 Breastfeeding</span>' : ''}
                </div>
                <div class="drug-reason">
                    ${drug.pregnancy.reason.substring(0, 100)}${drug.pregnancy.reason.length > 100 ? '...' : ''}
                </div>
                <div class="drug-alternatives">
                    <strong>Alternative:</strong> ${drug.alternatives.pregnancy}
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
        const safePregContainer = document.getElementById('safePregDrugs');
        const safeBFContainer = document.getElementById('safeBFDrugs');
        const absoluteContraContainer = document.getElementById('absoluteContraDrugs');

        if (safePregContainer) {
            const drugs = this.data.safetyCategories.generallySafe.drugs;
            safePregContainer.innerHTML = `
                <ul class="quick-ref-list">
                    ${drugs.map(drug => `<li>${drug}</li>`).join('')}
                </ul>
            `;
        }

        if (safeBFContainer) {
            const drugs = this.data.safetyCategories.generallySafeBreastfeeding.drugs;
            safeBFContainer.innerHTML = `
                <ul class="quick-ref-list">
                    ${drugs.map(drug => `<li>${drug}</li>`).join('')}
                </ul>
            `;
        }

        if (absoluteContraContainer) {
            const drugs = this.data.safetyCategories.absoluteContraindications.drugs;
            absoluteContraContainer.innerHTML = `
                <ul class="quick-ref-list contraindicated">
                    ${drugs.map(drug => `<li>🚫 ${drug}</li>`).join('')}
                </ul>
            `;
        }
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

    toggleFavorite(drugName) {
        if (this.favorites.has(drugName)) {
            this.favorites.delete(drugName);
        } else {
            this.favorites.add(drugName);
        }
        
        this.saveFavorites();
        this.renderDrugs();
        
        analytics.track('pregnancy_drug_favorite_toggled', { 
            drug: drugName, 
            action: this.favorites.has(drugName) ? 'added' : 'removed' 
        });
    }

    loadFavorites() {
        const saved = this.storage.get('pregnancy_drugs_favorites');
        if (saved) {
            this.favorites = new Set(saved);
        }
    }

    saveFavorites() {
        this.storage.set('pregnancy_drugs_favorites', Array.from(this.favorites));
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
