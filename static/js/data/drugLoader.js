// Drug Loader Module for MLA Quiz PWA
// Dynamically loads drug data from individual JSON files

class DrugLoader {
    constructor() {
        this.cache = new Map();
        this.index = null;
        this.indexPromise = null;
    }

    /**
     * Load the drug index (lightweight list of all drugs)
     * @returns {Promise<Object>} Drug index with list of all drugs
     */
    async loadIndex() {
        if (this.index) {
            return this.index;
        }

        if (this.indexPromise) {
            return this.indexPromise;
        }

        this.indexPromise = fetch('/static/drugs/index.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load drug index: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.index = data;
                return data;
            })
            .catch(error => {
                console.error('Error loading drug index:', error);
                this.indexPromise = null;
                throw error;
            });

        return this.indexPromise;
    }

    /**
     * Get a single drug by ID
     * @param {string} drugId - The drug ID (e.g., 'aspirin')
     * @returns {Promise<Object>} Drug data object
     */
    async getDrug(drugId) {
        // Check cache first
        if (this.cache.has(drugId)) {
            return this.cache.get(drugId);
        }

        try {
            const response = await fetch(`/static/drugs/${drugId}.json`);
            if (!response.ok) {
                throw new Error(`Drug not found: ${drugId}`);
            }

            const drugData = await response.json();
            this.cache.set(drugId, drugData);
            return drugData;
        } catch (error) {
            console.error(`Error loading drug ${drugId}:`, error);
            throw error;
        }
    }

    /**
     * Get multiple drugs by their IDs
     * @param {string[]} drugIds - Array of drug IDs
     * @returns {Promise<Object>} Object mapping drug IDs to drug data
     */
    async getDrugs(drugIds) {
        const results = {};
        const promises = drugIds.map(async (drugId) => {
            try {
                results[drugId] = await this.getDrug(drugId);
            } catch (error) {
                console.error(`Failed to load drug ${drugId}:`, error);
                results[drugId] = null;
            }
        });

        await Promise.all(promises);
        return results;
    }

    /**
     * Preload specific drugs into cache
     * @param {string[]} drugIds - Array of drug IDs to preload
     * @returns {Promise<void>}
     */
    async preload(drugIds) {
        await this.getDrugs(drugIds);
    }

    /**
     * Search drugs by name or class
     * @param {string} query - Search query
     * @returns {Promise<Array>} Array of matching drug entries from index
     */
    async search(query) {
        const index = await this.loadIndex();
        const normalizedQuery = query.toLowerCase();

        return index.drugs.filter(drug => {
            return drug.name.toLowerCase().includes(normalizedQuery) ||
                   drug.class.toLowerCase().includes(normalizedQuery) ||
                   drug.id.toLowerCase().includes(normalizedQuery);
        });
    }

    /**
     * Get all drug IDs
     * @returns {Promise<string[]>} Array of all drug IDs
     */
    async getAllDrugIds() {
        const index = await this.loadIndex();
        return index.drugs.map(drug => drug.id);
    }

    /**
     * Get drugs by class
     * @param {string} drugClass - Drug class to filter by
     * @returns {Promise<Array>} Array of drug entries matching the class
     */
    async getDrugsByClass(drugClass) {
        const index = await this.loadIndex();
        const normalizedClass = drugClass.toLowerCase();

        return index.drugs.filter(drug => 
            drug.class.toLowerCase().includes(normalizedClass)
        );
    }

    /**
     * Clear the cache
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Get cache statistics
     * @returns {Object} Cache stats
     */
    getCacheStats() {
        return {
            size: this.cache.size,
            drugs: Array.from(this.cache.keys())
        };
    }
}

// Create a singleton instance
const drugLoader = new DrugLoader();

// For backward compatibility: create a Proxy that loads drugs on demand
const drugDatabase = new Proxy({}, {
    get: function(target, prop) {
        if (prop === 'then') {
            // Make it non-thenable so it doesn't get confused with a Promise
            return undefined;
        }
        
        if (prop in target) {
            return target[prop];
        }

        // Return a Promise that resolves to the drug data
        console.warn(`Drug '${prop}' accessed synchronously. Consider using async drugLoader.getDrug('${prop}') instead.`);
        
        // For synchronous access, return a Promise-like object
        // This won't work perfectly but provides a warning
        return drugLoader.getDrug(prop);
    },
    
    has: function(target, prop) {
        // This is called by 'in' operator
        return drugLoader.loadIndex()
            .then(index => index.drugs.some(d => d.id === prop));
    }
});

// Export both for different use cases
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { drugLoader, drugDatabase };
}

// Make available globally
window.drugLoader = drugLoader;
window.drugDatabase = drugDatabase;
