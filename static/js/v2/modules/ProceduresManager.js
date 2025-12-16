/**
 * ProceduresManager.js - Clinical Procedures Manager
 * 
 * Manages clinical procedures database covering common medical, surgical,
 * and practical procedures with detailed step-by-step guidance.
 * 
 * Features:
 * - Comprehensive procedure guides across multiple specialties
 * - Step-by-step instructions with equipment lists
 * - Indications, contraindications, and complications
 * - Category filtering (respiratory, cardiovascular, GI, etc.)
 * - Search functionality across all procedure details
 * - Recent procedures tracking
 * - Usage statistics
 */

export class ProceduresManager {
    constructor() {
        this.procedures = null;
        this.categories = [
            'respiratory',
            'cardiovascular',
            'gastrointestinal',
            'urology',
            'obstetrics',
            'gynaecology',
            'orthopaedics',
            'practical'
        ];
        this.recentProcedures = [];
        this.maxRecentItems = 10;
        this.searchCache = new Map();
        
        console.log('🏥 ProceduresManager constructed');
    }

    /**
     * Initialize the procedures manager
     */
    async initialize() {
        try {
            // Load procedures database
            if (window.proceduresDatabase) {
                this.procedures = window.proceduresDatabase;
                console.log('✅ Procedures database loaded:', Object.keys(this.procedures).length, 'procedures');
            } else {
                console.warn('⚠️ Procedures database not found in window object');
                this.procedures = {};
            }
            
            // Load recent procedures from storage
            await this.loadRecentProcedures();
            
            console.log('🏥 ProceduresManager initialized');
            return Promise.resolve();
        } catch (error) {
            console.error('❌ Failed to initialize ProceduresManager:', error);
            this.procedures = {};
            return Promise.reject(error);
        }
    }

    /**
     * Get all procedures
     */
    getAllProcedures() {
        return this.procedures || {};
    }

    /**
     * Get procedure by ID
     */
    getProcedure(procedureId) {
        if (!this.procedures) return null;
        return this.procedures[procedureId] || null;
    }

    /**
     * Get procedures by category
     */
    getProceduresByCategory(category) {
        if (!this.procedures) return [];
        
        return Object.entries(this.procedures)
            .filter(([id, proc]) => proc.category === category)
            .map(([id, proc]) => ({ id, ...proc }));
    }

    /**
     * Get all categories with procedure counts
     */
    getCategories() {
        if (!this.procedures) return [];
        
        const categoryCounts = {};
        Object.values(this.procedures).forEach(proc => {
            categoryCounts[proc.category] = (categoryCounts[proc.category] || 0) + 1;
        });
        
        return this.categories.map(cat => ({
            id: cat,
            name: this.formatCategoryName(cat),
            count: categoryCounts[cat] || 0
        }));
    }

    /**
     * Format category name for display
     */
    formatCategoryName(category) {
        const names = {
            'respiratory': 'Respiratory',
            'cardiovascular': 'Cardiovascular',
            'gastrointestinal': 'Gastrointestinal',
            'urology': 'Urology',
            'obstetrics': 'Obstetrics',
            'gynaecology': 'Gynaecology',
            'orthopaedics': 'Orthopaedics',
            'practical': 'Practical Skills'
        };
        return names[category] || category;
    }

    /**
     * Search procedures
     */
    searchProcedures(query) {
        if (!query || !this.procedures) return [];
        
        const searchTerm = query.toLowerCase().trim();
        
        // Check cache
        if (this.searchCache.has(searchTerm)) {
            return this.searchCache.get(searchTerm);
        }
        
        const results = [];
        
        Object.entries(this.procedures).forEach(([id, proc]) => {
            let score = 0;
            const searchableText = [
                proc.name,
                proc.category,
                proc.indication,
                Array.isArray(proc.procedure) ? proc.procedure.join(' ') : '',
                proc.clinicalPearls,
                JSON.stringify(proc.complications || {}),
                JSON.stringify(proc.equipment || [])
            ].join(' ').toLowerCase();
            
            // Name match - highest priority
            if (proc.name.toLowerCase().includes(searchTerm)) {
                score += 100;
            }
            
            // Category match
            if (proc.category.toLowerCase().includes(searchTerm)) {
                score += 50;
            }
            
            // Indication match
            if (proc.indication && proc.indication.toLowerCase().includes(searchTerm)) {
                score += 30;
            }
            
            // General text match
            if (searchableText.includes(searchTerm)) {
                score += 10;
            }
            
            if (score > 0) {
                results.push({
                    id,
                    procedure: proc,
                    score,
                    matchedIn: this.getMatchContext(proc, searchTerm)
                });
            }
        });
        
        // Sort by relevance
        results.sort((a, b) => b.score - a.score);
        
        // Cache results
        this.searchCache.set(searchTerm, results);
        
        return results;
    }

    /**
     * Get context of where search term was matched
     */
    getMatchContext(procedure, searchTerm) {
        const contexts = [];
        
        if (procedure.name.toLowerCase().includes(searchTerm)) {
            contexts.push('name');
        }
        if (procedure.indication && procedure.indication.toLowerCase().includes(searchTerm)) {
            contexts.push('indication');
        }
        if (procedure.category.toLowerCase().includes(searchTerm)) {
            contexts.push('category');
        }
        
        return contexts;
    }

    /**
     * Add procedure to recent list
     */
    async addToRecent(procedureId) {
        const procedure = this.getProcedure(procedureId);
        if (!procedure) return;
        
        // Remove if already exists
        this.recentProcedures = this.recentProcedures.filter(item => item.id !== procedureId);
        
        // Add to front
        this.recentProcedures.unshift({
            id: procedureId,
            name: procedure.name,
            category: procedure.category,
            timestamp: Date.now()
        });
        
        // Keep only max items
        if (this.recentProcedures.length > this.maxRecentItems) {
            this.recentProcedures = this.recentProcedures.slice(0, this.maxRecentItems);
        }
        
        // Save to storage
        await this.saveRecentProcedures();
    }

    /**
     * Get recent procedures
     */
    getRecentProcedures() {
        return this.recentProcedures;
    }

    /**
     * Clear recent procedures
     */
    async clearRecentProcedures() {
        this.recentProcedures = [];
        await this.saveRecentProcedures();
    }

    /**
     * Save recent procedures to localStorage
     */
    async saveRecentProcedures() {
        try {
            localStorage.setItem('recentProcedures', JSON.stringify(this.recentProcedures));
        } catch (error) {
            console.warn('Failed to save recent procedures:', error);
        }
    }

    /**
     * Load recent procedures from localStorage
     */
    async loadRecentProcedures() {
        try {
            const stored = localStorage.getItem('recentProcedures');
            if (stored) {
                this.recentProcedures = JSON.parse(stored);
            }
        } catch (error) {
            console.warn('Failed to load recent procedures:', error);
            this.recentProcedures = [];
        }
    }

    /**
     * Get statistics
     */
    getStatistics() {
        if (!this.procedures) {
            return {
                totalProcedures: 0,
                byCategory: {},
                recentCount: 0
            };
        }
        
        const stats = {
            totalProcedures: Object.keys(this.procedures).length,
            byCategory: {},
            recentCount: this.recentProcedures.length
        };
        
        // Count by category
        Object.values(this.procedures).forEach(proc => {
            stats.byCategory[proc.category] = (stats.byCategory[proc.category] || 0) + 1;
        });
        
        return stats;
    }

    /**
     * Render procedure list for a category
     */
    renderProcedureList(category, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const procedures = category === 'all' 
            ? Object.entries(this.procedures).map(([id, proc]) => ({ id, ...proc }))
            : this.getProceduresByCategory(category);
        
        if (procedures.length === 0) {
            container.innerHTML = '<p class="no-results">No procedures found in this category.</p>';
            return;
        }
        
        container.innerHTML = procedures.map(proc => `
            <div class="procedure-card" data-procedure-id="${proc.id}">
                <div class="procedure-header">
                    <h3>${proc.name}</h3>
                    <span class="category-badge">${this.formatCategoryName(proc.category)}</span>
                </div>
                <p class="procedure-indication">${proc.indication || 'No indication specified'}</p>
                <button class="btn-view-procedure" onclick="window.viewProcedure('${proc.id}')">
                    View Details
                </button>
            </div>
        `).join('');
    }

    /**
     * Render procedure detail view
     */
    renderProcedureDetail(procedureId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const proc = this.getProcedure(procedureId);
        if (!proc) {
            container.innerHTML = '<p class="error">Procedure not found.</p>';
            return;
        }
        
        // Add to recent
        this.addToRecent(procedureId);
        
        let html = `
            <div class="procedure-detail">
                <div class="procedure-detail-header">
                    <h2>${proc.name}</h2>
                    <span class="category-badge">${this.formatCategoryName(proc.category)}</span>
                </div>
        `;
        
        // Indication
        if (proc.indication) {
            html += `
                <div class="detail-section">
                    <h3>Indication</h3>
                    <p>${proc.indication}</p>
                </div>
            `;
        }
        
        // Contraindications
        if (proc.contraindications) {
            html += `
                <div class="detail-section">
                    <h3>Contraindications</h3>
                    <p>${proc.contraindications}</p>
                </div>
            `;
        }
        
        // Equipment
        if (proc.equipment && Array.isArray(proc.equipment)) {
            html += `
                <div class="detail-section">
                    <h3>Equipment Required</h3>
                    <ul class="equipment-list">
                        ${proc.equipment.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Procedure steps
        if (proc.procedure && Array.isArray(proc.procedure)) {
            html += `
                <div class="detail-section">
                    <h3>Procedure</h3>
                    <ol class="procedure-steps">
                        ${proc.procedure.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            `;
        }
        
        // Complications
        if (proc.complications) {
            html += `
                <div class="detail-section">
                    <h3>Complications</h3>
            `;
            if (typeof proc.complications === 'string') {
                html += `<p>${proc.complications}</p>`;
            } else {
                html += '<dl class="complications-list">';
                Object.entries(proc.complications).forEach(([type, desc]) => {
                    html += `<dt>${type}</dt><dd>${desc}</dd>`;
                });
                html += '</dl>';
            }
            html += '</div>';
        }
        
        // Monitoring
        if (proc.monitoring) {
            html += `
                <div class="detail-section">
                    <h3>Monitoring</h3>
                    <p>${proc.monitoring}</p>
                </div>
            `;
        }
        
        // Clinical Pearls
        if (proc.clinicalPearls) {
            html += `
                <div class="detail-section clinical-pearls">
                    <h3>💎 Clinical Pearls</h3>
                    <p>${proc.clinicalPearls}</p>
                </div>
            `;
        }
        
        // Supervision
        if (proc.supervision) {
            html += `
                <div class="detail-section supervision-info">
                    <h3>Supervision Required</h3>
                    <p>${proc.supervision}</p>
                </div>
            `;
        }
        
        html += '</div>';
        container.innerHTML = html;
    }

    /**
     * Render search results
     */
    renderSearchResults(query, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const results = this.searchProcedures(query);
        
        if (results.length === 0) {
            container.innerHTML = '<p class="no-results">No procedures found matching your search.</p>';
            return;
        }
        
        container.innerHTML = `
            <div class="search-results-header">
                <p>Found ${results.length} procedure(s) matching "${query}"</p>
            </div>
            ${results.map(result => `
                <div class="procedure-card search-result" data-procedure-id="${result.id}">
                    <div class="procedure-header">
                        <h3>${result.procedure.name}</h3>
                        <span class="category-badge">${this.formatCategoryName(result.procedure.category)}</span>
                    </div>
                    <p class="procedure-indication">${result.procedure.indication || 'No indication specified'}</p>
                    <div class="match-context">
                        Matched in: ${result.matchedIn.join(', ')}
                    </div>
                    <button class="btn-view-procedure" onclick="window.viewProcedure('${result.id}')">
                        View Details
                    </button>
                </div>
            `).join('')}
        `;
    }
}

// Create singleton instance
export const proceduresManager = new ProceduresManager();

// Expose to window for inline event handlers (if needed)
if (typeof window !== 'undefined') {
    window.proceduresManager = proceduresManager;
}
