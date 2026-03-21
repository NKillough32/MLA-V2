// Calculator Loader Module for MLA Quiz PWA
// Dynamically loads calculator data from individual JSON files

class CalculatorLoader {
    constructor() {
        this.cache = new Map();
        this.index = null;
        this.indexPromise = null;
    }

    /**
     * Load the calculator index (lightweight list of all calculators)
     * @returns {Promise<Object>} Calculator index with list of all calculators
     */
    async loadIndex() {
        if (this.index) {
            return this.index;
        }

        if (this.indexPromise) {
            return this.indexPromise;
        }

        this.indexPromise = fetch('/static/calculators/calculator_index.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load calculator index: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.index = data;
                console.log(`📊 Calculator index loaded: ${data.totalCalculators} calculators`);
                return data;
            })
            .catch(error => {
                console.error('Error loading calculator index:', error);
                this.indexPromise = null;
                throw error;
            });

        return this.indexPromise;
    }

    /**
     * Get a single calculator by ID
     * @param {string} calculatorId - The calculator ID (e.g., 'bmi')
     * @returns {Promise<Object>} Calculator data object
     */
    async getCalculator(calculatorId) {
        // Check cache first
        if (this.cache.has(calculatorId)) {
            return this.cache.get(calculatorId);
        }

        try {
            const response = await fetch(`/static/calculators/${calculatorId}.json`);
            if (!response.ok) {
                throw new Error(`Calculator not found: ${calculatorId}`);
            }

            const calculatorData = await response.json();
            this.cache.set(calculatorId, calculatorData);
            return calculatorData;
        } catch (error) {
            console.error(`Error loading calculator ${calculatorId}:`, error);
            throw error;
        }
    }

    /**
     * Get multiple calculators by their IDs
     * @param {string[]} calculatorIds - Array of calculator IDs
     * @returns {Promise<Object>} Object mapping calculator IDs to calculator data
     */
    async getCalculators(calculatorIds) {
        const results = {};
        const promises = calculatorIds.map(async (calculatorId) => {
            try {
                results[calculatorId] = await this.getCalculator(calculatorId);
            } catch (error) {
                console.error(`Failed to load calculator ${calculatorId}:`, error);
                results[calculatorId] = null;
            }
        });

        await Promise.all(promises);
        return results;
    }

    /**
     * Preload specific calculators into cache
     * @param {string[]} calculatorIds - Array of calculator IDs to preload
     * @returns {Promise<void>}
     */
    async preload(calculatorIds) {
        await this.getCalculators(calculatorIds);
    }

    /**
     * Search calculators by name, category, or keywords
     * @param {string} query - Search query
     * @returns {Promise<Array>} Array of matching calculator entries from index
     */
    async search(query) {
        const index = await this.loadIndex();
        const normalizedQuery = query.toLowerCase();

        return index.calculators.filter(calc => {
            return calc.name.toLowerCase().includes(normalizedQuery) ||
                   calc.category.toLowerCase().includes(normalizedQuery) ||
                   calc.id.toLowerCase().includes(normalizedQuery);
        });
    }

    /**
     * Get all calculator IDs
     * @returns {Promise<string[]>} Array of all calculator IDs
     */
    async getAllCalculatorIds() {
        const index = await this.loadIndex();
        return index.calculators.map(calc => calc.id);
    }

    /**
     * Get calculators by category
     * @param {string} category - Category to filter by
     * @returns {Promise<Array>} Array of calculator entries matching the category
     */
    async getCalculatorsByCategory(category) {
        const index = await this.loadIndex();
        const normalizedCategory = category.toLowerCase();

        return index.calculators.filter(calc => 
            calc.category.toLowerCase().includes(normalizedCategory)
        );
    }

    /**
     * Build ExtractedCalculators-compatible object from loaded calculator data
     * @param {Object} calculatorData - Calculator data from JSON
     * @returns {Object} Object with getter and calculator functions
     */
    buildCalculatorFunctions(calculatorData) {
        const functions = {};

        // Build getter function name from ID
        const getterName = this.getGetterName(calculatorData.id);
        const calculatorName = this.getCalculatorName(calculatorData.id);

        // Create getter function that returns the template
        functions[getterName] = new Function(`return \`${calculatorData.template}\`;`);

        // Create calculator function
        try {
            functions[calculatorName] = new Function(calculatorData.calculatorFunction);
        } catch (error) {
            console.error(`Error creating calculator function for ${calculatorData.id}:`, error);
            functions[calculatorName] = function() {
                console.error(`Calculator function not available for ${calculatorData.id}`);
            };
        }

        return functions;
    }

    /**
     * Get getter function name from calculator ID
     * @param {string} id - Calculator ID
     * @returns {string} Getter function name
     */
    getGetterName(id) {
        // Map special cases that don't follow the pattern
        const specialCases = {
            'qrisk3-official': 'getQRISK3OfficialCalculator',
            'chads2vasc': 'getCHADS2VAScCalculator',
            'hasbled': 'getHASBLEDCalculator',
            'gcs': 'getGCSCalculator',
            'apache': 'getAPACHECalculator',
            'wells-pe': 'getWellsCalculator', // wells-pe uses getWellsCalculator
            'curb65': 'getCURB65Calculator',
            'crb65': 'getCRB65Calculator',
            'meld': 'getMELDCalculator',
            'fib4': 'getFIB4Calculator',
            'apri': 'getAPRICalculator',
            'ldl-calc': 'getLDLCalculator',
            'map': 'getMAPCalculator',
            'aa-gradient': 'getAAGradientCalculator',
            'perc': 'getPERCCalculator',
            'timi': 'getTIMICalculator',
            'rcri': 'getRCRICalculator',
            'qtc': 'getQTcCalculator',
            'wells-dvt': 'getWellsDVTCalculator',
            'phq9': 'getPHQ9Calculator',
            'gad7': 'getGAD7Calculator',
            'ciwa': 'getCIWACalculator',
            'stopbang': 'getSTOPBANGCalculator',
            'mse': 'getMSECalculator',
            'mmse': 'getMMSECalculator',
            'must': 'getMUSTCalculator',
            'apgar': 'getAPGARCalculator',
            'news2': 'getNEWS2Calculator',
            'mews': 'getMEWSCalculator',
            'rass': 'getRASSCalculator',
            'nihss': 'getNIHSSCalculator',
            'bsa': 'getBSACalculator',
            'pefr': 'getPEFRCalculator',
            'egfr': 'getEGFRCalculator',
            'fena': 'getFENaCalculator',
            'sofa': 'getSOFACalculator',
            'abcd2': 'getABCD2Calculator'
        };
        
        if (specialCases[id]) {
            return specialCases[id];
        }
        
        // Convert kebab-case to PascalCase and add get prefix
        const camelCase = id.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
        const pascalCase = camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
        return `get${pascalCase}Calculator`;
    }

    /**
     * Get calculator function name from calculator ID
     * @param {string} id - Calculator ID
     * @returns {string} Calculator function name
     */
    getCalculatorName(id) {
        // Map special cases that don't follow the pattern
        const specialCases = {
            'qrisk3-official': 'calculateQRISK3Official',
            'chads2vasc': 'calculateCHADS2VASc',
            'hasbled': 'calculateHASBLED',
            'gcs': 'calculateGCS',
            'apache': 'calculateAPACHE',
            'wells-pe': 'calculateWells', // wells-pe uses calculateWells
            'curb65': 'calculateCURB65',
            'crb65': 'calculateCRB65',
            'meld': 'calculateMELD',
            'fib4': 'calculateFIB4',
            'apri': 'calculateAPRI',
            'ldl-calc': 'calculateLDL',
            'map': 'calculateMAP',
            'aa-gradient': 'calculateAAGradient',
            'perc': 'calculatePERC',
            'timi': 'calculateTIMI',
            'rcri': 'calculateRCRI',
            'qtc': 'calculateQTc',
            'wells-dvt': 'calculateWellsDVT',
            'phq9': 'calculatePHQ9',
            'gad7': 'calculateGAD7',
            'ciwa': 'calculateCIWA',
            'stopbang': 'calculateSTOPBANG',
            'mse': 'calculateMSE',
            'mmse': 'calculateMMSE',
            'must': 'calculateMUST',
            'apgar': 'calculateAPGAR',
            'news2': 'calculateNEWS2',
            'mews': 'calculateMEWS',
            'rass': 'calculateRASS',
            'nihss': 'calculateNIHSS',
            'bsa': 'calculateBSA',
            'pefr': 'calculateAsthma', // pefr uses calculateAsthma
            'egfr': 'calculateEGFR',
            'fena': 'calculateFENa',
            'sofa': 'calculateSOFA',
            'abcd2': 'calculateABCD2'
        };
        
        if (specialCases[id]) {
            return specialCases[id];
        }
        
        // Convert kebab-case to PascalCase and add calculate prefix
        const camelCase = id.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
        const pascalCase = camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
        return `calculate${pascalCase}`;
    }

    /**
     * Load all calculators and build ExtractedCalculators object
     * @returns {Promise<Object>} ExtractedCalculators-compatible object
     */
    async loadAllCalculators() {
        const index = await this.loadIndex();
        const allCalculators = {};

        // Load all calculator data
        const promises = index.calculators.map(async (calc) => {
            try {
                const calculatorData = await this.getCalculator(calc.id);
                const functions = this.buildCalculatorFunctions(calculatorData);
                Object.assign(allCalculators, functions);
            } catch (error) {
                console.error(`Failed to load calculator ${calc.id}:`, error);
            }
        });

        await Promise.all(promises);
        
        console.log(`✅ Loaded ${Object.keys(allCalculators).length / 2} calculators`);
        return allCalculators;
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
            calculators: Array.from(this.cache.keys())
        };
    }
}

// Create singleton instance
const calculatorLoader = new CalculatorLoader();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CalculatorLoader, calculatorLoader };
}
