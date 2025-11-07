/**
 * Emergency Protocols Manager - V2
 * Native implementation using extracted emergency protocols data
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { EVENTS } from './Constants.js';
import { emergencyProtocols } from '../../data/emergencyProtocols.js';

export class EmergencyProtocolsManager {
    constructor() {
        this.emergencyProtocols = emergencyProtocols;
        this.initialized = false;
        this.recentProtocols = [];
        this.searchCache = new Map();
    }

    /**
     * Initialize native V2 implementation
     */
    initialize() {
        this.recentProtocols = storage.getItem('recentProtocols', []);
        this.initialized = true;
        console.log(`🚨 EmergencyProtocolsManager initialized (V2 Native) - ${Object.keys(this.emergencyProtocols).length} protocols loaded`);
    }

    /**
     * Load emergency protocols interface - native V2 implementation
     */
    loadEmergencyProtocols() {
        if (!this.initialized) {
            console.error('EmergencyProtocolsManager not initialized');
            return;
        }

        // Create emergency protocols interface
        this.displayEmergencyProtocolsInterface();
        
        // Emit event for tracking
        eventBus.emit(EVENTS.TOOL_OPENED, {
            tool: 'emergency-protocols',
            timestamp: Date.now()
        });
    }

    /**
     * Display emergency protocols interface
     */
    displayEmergencyProtocolsInterface() {
        const container = document.getElementById('medicalToolContent');
        if (!container) {
            console.error('Medical tool content container not found');
            return;
        }

        const stats = this.getStatistics();
        
        container.innerHTML = `
            <div class="emergency-protocols-interface">
                <div class="tool-header">
                    <h2>🚨 Emergency Protocols</h2>
                    <p>Critical emergency management protocols and guidelines</p>
                    <div class="stats-summary">
                        <span class="stat-item">${stats.total} protocols</span>
                        <span class="stat-item">${Object.keys(stats.categories).length} categories</span>
                        <span class="stat-item">${stats.recentCount} recent</span>
                    </div>
                </div>

                <div class="emergency-controls">
                    <div class="search-section">
                        <input type="text" id="protocolSearch" placeholder="Search emergency protocols..." class="search-input">
                        <button id="clearProtocolSearch" class="btn-secondary">Clear</button>
                    </div>
                    
                    <div class="filter-section">
                        <select id="protocolCategoryFilter" class="filter-select">
                            <option value="">All Categories</option>
                            ${this.getCategories().map(cat => 
                                `<option value="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</option>`
                            ).join('')}
                        </select>
                        
                        <select id="protocolUrgencyFilter" class="filter-select">
                            <option value="">All Urgencies</option>
                            <option value="emergency">Emergency</option>
                        </select>
                    </div>
                </div>

                <div id="protocolResults" class="emergency-protocols-results">
                    ${this.generateProtocolsGrid()}
                </div>
            </div>
        `;

        this.bindProtocolEvents();
    }

    /**
     * Generate emergency protocols grid HTML
     */
    generateProtocolsGrid(protocols = null) {
        const protocolsList = protocols || Object.entries(this.emergencyProtocols);
        
        if (protocolsList.length === 0) {
            return '<div class="no-results">No emergency protocols found matching your criteria.</div>';
        }

        return protocolsList.map(([key, protocol]) => `
            <div class="protocol-card emergency-card" data-key="${key}">
                <div class="protocol-header">
                    <h3>${protocol.name}</h3>
                    <div class="protocol-badges">
                        <span class="category-tag">${protocol.category}</span>
                        <span class="urgency-badge urgency-${protocol.urgency || 'standard'}">${(protocol.urgency || 'standard').toUpperCase()}</span>
                    </div>
                </div>
                <div class="protocol-summary">
                    <div class="protocol-info">
                        <strong>${protocol.steps.length} steps</strong> • 
                        <strong>${protocol.drugs.length} medications</strong> • 
                        <strong>${protocol.criticalActions.length} critical actions</strong>
                    </div>
                    <div class="protocol-guideline">
                        <strong>Guideline:</strong> ${protocol.ukGuideline}
                    </div>
                </div>
                <div class="protocol-actions">
                    <button class="btn-primary view-protocol" data-key="${key}">View Protocol</button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Bind protocol interface events
     */
    bindProtocolEvents() {
        // Search functionality
        const searchInput = document.getElementById('protocolSearch');
        const categoryFilter = document.getElementById('protocolCategoryFilter');
        const urgencyFilter = document.getElementById('protocolUrgencyFilter');
        const clearSearch = document.getElementById('clearProtocolSearch');

        if (searchInput) {
            searchInput.addEventListener('input', () => this.handleProtocolSearch());
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.handleProtocolSearch());
        }

        if (urgencyFilter) {
            urgencyFilter.addEventListener('change', () => this.handleProtocolSearch());
        }

        if (clearSearch) {
            clearSearch.addEventListener('click', () => {
                searchInput.value = '';
                categoryFilter.value = '';
                urgencyFilter.value = '';
                this.handleProtocolSearch();
            });
        }

        // View protocol buttons
        document.querySelectorAll('.view-protocol').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const key = e.target.dataset.key;
                this.showProtocolDetails(key);
                this.addToRecent(key);
            });
        });
    }

    /**
     * Handle search and filtering
     */
    handleProtocolSearch() {
        const searchTerm = document.getElementById('protocolSearch')?.value.toLowerCase() || '';
        const categoryFilter = document.getElementById('protocolCategoryFilter')?.value || '';
        const urgencyFilter = document.getElementById('protocolUrgencyFilter')?.value || '';

        let results = Object.entries(this.emergencyProtocols);

        // Apply search filter
        if (searchTerm) {
            results = results.filter(([key, protocol]) => 
                protocol.name.toLowerCase().includes(searchTerm) ||
                protocol.category.toLowerCase().includes(searchTerm) ||
                protocol.steps.some(step => step.toLowerCase().includes(searchTerm)) ||
                protocol.drugs.some(drug => drug.toLowerCase().includes(searchTerm)) ||
                protocol.criticalActions.some(action => action.toLowerCase().includes(searchTerm))
            );
        }

        // Apply category filter
        if (categoryFilter) {
            results = results.filter(([key, protocol]) => protocol.category === categoryFilter);
        }

        // Apply urgency filter
        if (urgencyFilter) {
            results = results.filter(([key, protocol]) => protocol.urgency === urgencyFilter);
        }

        // Update results display
        const resultsContainer = document.getElementById('protocolResults');
        if (resultsContainer) {
            resultsContainer.innerHTML = this.generateProtocolsGrid(results);
            this.bindProtocolEvents(); // Rebind events for new elements
        }
    }

    /**
     * Show detailed emergency protocol
     */
    showProtocolDetails(key) {
        const protocol = this.emergencyProtocols[key];
        if (!protocol) return;

        // Create modal for detailed protocol view
        const modal = document.createElement('div');
        modal.className = 'protocol-modal-overlay';
        modal.innerHTML = `
            <div class="protocol-modal emergency-modal">
                <div class="modal-header">
                    <h2>${protocol.name}</h2>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-content">
                    <div class="protocol-overview">
                        <div class="protocol-meta">
                            <span class="category-tag">${protocol.category}</span>
                            <span class="urgency-badge urgency-${protocol.urgency || 'standard'}">${(protocol.urgency || 'standard').toUpperCase()}</span>
                            <span class="guideline-badge">${protocol.ukGuideline}</span>
                        </div>
                    </div>
                    
                    <div class="protocol-sections">
                        <div class="protocol-section">
                            <h3>📋 Protocol Steps</h3>
                            <ol class="protocol-steps">
                                ${protocol.steps.map((step, index) => `
                                    <li class="protocol-step">
                                        <span class="step-number">${index + 1}</span>
                                        <span class="step-text">${step}</span>
                                    </li>
                                `).join('')}
                            </ol>
                        </div>
                        
                        <div class="protocol-section">
                            <h3>💊 Medications</h3>
                            <ul class="protocol-drugs">
                                ${protocol.drugs.map(drug => `
                                    <li class="drug-item">${drug}</li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div class="protocol-section">
                            <h3>🚨 Critical Actions</h3>
                            <ul class="critical-actions">
                                ${protocol.criticalActions.map(action => `
                                    <li class="critical-action">${action}</li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div class="protocol-section guideline-section">
                            <h3>📖 UK Guideline</h3>
                            <p class="guideline-reference">${protocol.ukGuideline}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal events
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    /**
     * Get protocol by key
     */
    getProtocol(key) {
        return this.emergencyProtocols[key] || null;
    }

    /**
     * Search protocols
     */
    searchProtocols(query) {
        const cacheKey = query.toLowerCase();
        if (this.searchCache.has(cacheKey)) {
            return this.searchCache.get(cacheKey);
        }

        const term = query.toLowerCase();
        const results = [];

        for (const [key, protocol] of Object.entries(this.emergencyProtocols)) {
            if (protocol.name.toLowerCase().includes(term) ||
                protocol.category.toLowerCase().includes(term) ||
                protocol.steps.some(step => step.toLowerCase().includes(term)) ||
                protocol.drugs.some(drug => drug.toLowerCase().includes(term)) ||
                protocol.criticalActions.some(action => action.toLowerCase().includes(term))) {
                results.push({ key, ...protocol });
            }
        }

        this.searchCache.set(cacheKey, results);
        return results;
    }

    /**
     * Get all categories
     */
    getCategories() {
        const categories = new Set();
        for (const protocol of Object.values(this.emergencyProtocols)) {
            if (protocol.category) {
                categories.add(protocol.category);
            }
        }
        return Array.from(categories).sort();
    }

    /**
     * Get protocols by category
     */
    getProtocolsByCategory(category) {
        return Object.entries(this.emergencyProtocols)
            .filter(([key, protocol]) => protocol.category === category)
            .map(([key, protocol]) => ({ key, ...protocol }));
    }

    /**
     * Get emergency protocols (all are emergency)
     */
    getEmergencyProtocols() {
        return Object.entries(this.emergencyProtocols)
            .filter(([key, protocol]) => protocol.urgency === 'emergency')
            .map(([key, protocol]) => ({ key, ...protocol }));
    }

    /**
     * Add to recent
     */
    addToRecent(protocolKey) {
        if (!this.recentProtocols.includes(protocolKey)) {
            this.recentProtocols.unshift(protocolKey);
            this.recentProtocols = this.recentProtocols.slice(0, 10); // Keep last 10
            storage.setItem('recentProtocols', this.recentProtocols);
        }
    }

    /**
     * Get recent protocols
     */
    getRecentProtocols() {
        return this.recentProtocols.map(key => ({
            key,
            ...this.emergencyProtocols[key]
        })).filter(protocol => protocol.name); // Filter out invalid keys
    }

    /**
     * Emergency protocol timer - NEW FEATURE
     */
    startProtocolTimer(protocolKey, stepIndex = 0) {
        const protocol = this.emergencyProtocols[protocolKey];
        if (!protocol || !protocol.steps) return null;

        const timer = {
            protocolKey,
            protocolName: protocol.name,
            currentStep: stepIndex,
            startTime: Date.now(),
            stepStartTime: Date.now(),
            completed: false
        };

        // Store in sessionStorage for persistence across refreshes
        sessionStorage.setItem('activeProtocolTimer', JSON.stringify(timer));
        
        return timer;
    }

    /**
     * Drug dosage calculator for emergencies - NEW FEATURE
     */
    calculateEmergencyDosage(drugName, patientWeight, indication) {
        const emergencyDrugs = {
            'adrenaline': {
                anaphylaxis: { dose: '0.5mg IM', calculation: '0.01mg/kg IM' },
                cardiacArrest: { dose: '1mg IV', calculation: '10ml of 1:10,000' }
            },
            'amiodarone': {
                vt: { dose: '5mg/kg IV', maxDose: '300mg' },
                af: { dose: '5mg/kg over 1h', maxDose: '1.2g/24h' }
            },
            'atropine': {
                bradycardia: { dose: '0.5mg IV', maxDose: '3mg' },
                organophosphate: { dose: '2mg IV bolus' }
            }
        };

        const drug = emergencyDrugs[drugName.toLowerCase()];
        if (!drug || !drug[indication]) return null;

        const protocol = drug[indication];
        return {
            drug: drugName,
            indication,
            standardDose: protocol.dose,
            weightBasedDose: this.calculateWeightBasedDose(protocol.calculation, patientWeight),
            maxDose: protocol.maxDose,
            patientWeight
        };
    }

    /**
     * Protocol adherence tracker - NEW FEATURE
     */
    trackProtocolAdherence(protocolKey, completedSteps) {
        const protocol = this.emergencyProtocols[protocolKey];
        if (!protocol) return null;

        const totalSteps = protocol.steps ? protocol.steps.length : 0;
        const adherenceScore = totalSteps > 0 ? (completedSteps.length / totalSteps) * 100 : 0;
        
        const tracking = {
            protocol: protocol.name,
            totalSteps,
            completedSteps: completedSteps.length,
            adherenceScore: Math.round(adherenceScore),
            missedSteps: totalSteps - completedSteps.length,
            completionTime: Date.now()
        };

        // Store adherence data
        const adherenceHistory = JSON.parse(localStorage.getItem('protocolAdherence') || '[]');
        adherenceHistory.push(tracking);
        localStorage.setItem('protocolAdherence', JSON.stringify(adherenceHistory));

        return tracking;
    }

    /**
     * Get protocols by urgency
     */
    getProtocolsByUrgency(urgency) {
        return Object.entries(this.emergencyProtocols)
            .filter(([key, protocol]) => protocol.urgency === urgency)
            .map(([key, protocol]) => ({ key, ...protocol }));
    }

    /**
     * Get statistics
     */
    getStatistics() {
        const categories = {};
        let totalSteps = 0;
        let totalDrugs = 0;

        for (const protocol of Object.values(this.emergencyProtocols)) {
            const cat = protocol.category || 'Other';
            categories[cat] = (categories[cat] || 0) + 1;
            
            totalSteps += protocol.steps.length;
            totalDrugs += protocol.drugs.length;
        }

        return {
            total: Object.keys(this.emergencyProtocols).length,
            totalSteps,
            totalDrugs,
            categories,
            recentCount: this.recentProtocols.length
        };
    }

    /**
     * Clear search cache
     */
    clearCache() {
        this.searchCache.clear();
    }

    /**
     * Emergency dosage calculation helper methods - COMPREHENSIVE IMPLEMENTATIONS
     */
    
    calculateWeightBasedDose(drugName, weight, indication = '') {
        // Common weight-based emergency drug dosages
        const dosageDatabase = {
            'adrenaline': {
                'cardiac-arrest': { dose: 0.01, unit: 'mg/kg', max: 1, route: 'IV' },
                'anaphylaxis': { dose: 0.01, unit: 'mg/kg', max: 0.5, route: 'IM' },
                'default': { dose: 0.01, unit: 'mg/kg', max: 1, route: 'IV/IM' }
            },
            'epinephrine': {
                'cardiac-arrest': { dose: 0.01, unit: 'mg/kg', max: 1, route: 'IV' },
                'anaphylaxis': { dose: 0.01, unit: 'mg/kg', max: 0.5, route: 'IM' },
                'default': { dose: 0.01, unit: 'mg/kg', max: 1, route: 'IV/IM' }
            },
            'amiodarone': {
                'vf-vt': { dose: 5, unit: 'mg/kg', max: 300, route: 'IV bolus' },
                'default': { dose: 5, unit: 'mg/kg', max: 300, route: 'IV' }
            },
            'atropine': {
                'bradycardia': { dose: 0.02, unit: 'mg/kg', min: 0.5, max: 3, route: 'IV' },
                'default': { dose: 0.02, unit: 'mg/kg', min: 0.5, max: 3, route: 'IV' }
            },
            'adenosine': {
                'svt': { dose: 0.1, unit: 'mg/kg', initial: 6, max: 12, route: 'Rapid IV push' },
                'default': { dose: 0.1, unit: 'mg/kg', initial: 6, max: 12, route: 'IV' }
            },
            'glucose': {
                'hypoglycaemia': { dose: 0.5, unit: 'g/kg', max: 25, concentration: '10% or 50%', route: 'IV' },
                'default': { dose: 0.5, unit: 'g/kg', max: 25, route: 'IV' }
            },
            'midazolam': {
                'seizure': { dose: 0.1, unit: 'mg/kg', max: 10, route: 'Buccal/IM/IV' },
                'default': { dose: 0.1, unit: 'mg/kg', max: 10, route: 'Buccal/IM/IV' }
            },
            'diazepam': {
                'seizure': { dose: 0.2, unit: 'mg/kg', max: 10, route: 'IV/PR' },
                'default': { dose: 0.2, unit: 'mg/kg', max: 10, route: 'IV/PR' }
            }
        };
        
        const drug = dosageDatabase[drugName.toLowerCase()];
        if (!drug) {
            return {
                success: false,
                error: `Dosage information not available for ${drugName}`,
                suggestion: 'Please consult drug reference or formulary'
            };
        }
        
        const dosageInfo = drug[indication.toLowerCase()] || drug['default'];
        const calculatedDose = dosageInfo.dose * weight;
        
        let finalDose = calculatedDose;
        if (dosageInfo.max && calculatedDose > dosageInfo.max) {
            finalDose = dosageInfo.max;
        }
        if (dosageInfo.min && calculatedDose < dosageInfo.min) {
            finalDose = dosageInfo.min;
        }
        
        return {
            success: true,
            drug: drugName,
            indication: indication || 'default',
            weight: weight,
            calculatedDose: Math.round(calculatedDose * 100) / 100,
            recommendedDose: Math.round(finalDose * 100) / 100,
            unit: dosageInfo.unit,
            route: dosageInfo.route,
            initial: dosageInfo.initial,
            max: dosageInfo.max,
            min: dosageInfo.min,
            concentration: dosageInfo.concentration,
            warning: calculatedDose !== finalDose ? 
                `Dose adjusted from ${calculatedDose.toFixed(2)} to ${finalDose.toFixed(2)} ${dosageInfo.unit}` : null
        };
    }

    getCriticalSeverity(vitalSigns) {
        // Assess severity based on vital signs
        let severity = 'stable';
        const alerts = [];
        
        if (!vitalSigns) return { severity, alerts };
        
        // Heart rate assessment
        if (vitalSigns.heartRate) {
            if (vitalSigns.heartRate < 40) {
                severity = 'critical';
                alerts.push('Severe bradycardia - immediate intervention required');
            } else if (vitalSigns.heartRate > 150) {
                severity = severity === 'critical' ? 'critical' : 'severe';
                alerts.push('Severe tachycardia - urgent assessment needed');
            } else if (vitalSigns.heartRate < 50 || vitalSigns.heartRate > 120) {
                severity = severity === 'critical' || severity === 'severe' ? severity : 'moderate';
                alerts.push('Abnormal heart rate - monitor closely');
            }
        }
        
        // Blood pressure assessment
        if (vitalSigns.systolicBP) {
            if (vitalSigns.systolicBP < 90) {
                severity = 'critical';
                alerts.push('Hypotension - immediate fluid resuscitation/vasopressors');
            } else if (vitalSigns.systolicBP > 200) {
                severity = severity === 'critical' ? 'critical' : 'severe';
                alerts.push('Hypertensive emergency - urgent treatment');
            }
        }
        
        // Respiratory rate assessment
        if (vitalSigns.respiratoryRate) {
            if (vitalSigns.respiratoryRate < 8 || vitalSigns.respiratoryRate > 30) {
                severity = 'critical';
                alerts.push('Critical respiratory rate - airway support may be needed');
            } else if (vitalSigns.respiratoryRate < 10 || vitalSigns.respiratoryRate > 24) {
                severity = severity === 'critical' ? 'critical' : 'severe';
                alerts.push('Abnormal respiratory rate - oxygen therapy and monitoring');
            }
        }
        
        // Oxygen saturation assessment
        if (vitalSigns.oxygenSaturation) {
            if (vitalSigns.oxygenSaturation < 90) {
                severity = 'critical';
                alerts.push('Critical hypoxia - high-flow oxygen immediately');
            } else if (vitalSigns.oxygenSaturation < 94) {
                severity = severity === 'critical' ? 'critical' : 'moderate';
                alerts.push('Hypoxia - supplemental oxygen required');
            }
        }
        
        // GCS assessment
        if (vitalSigns.gcs) {
            if (vitalSigns.gcs <= 8) {
                severity = 'critical';
                alerts.push('Severe impairment (GCS ≤8) - airway protection required');
            } else if (vitalSigns.gcs <= 12) {
                severity = severity === 'critical' ? 'critical' : 'severe';
                alerts.push('Moderate impairment - close neurological monitoring');
            }
        }
        
        // Temperature assessment
        if (vitalSigns.temperature) {
            if (vitalSigns.temperature < 35 || vitalSigns.temperature > 40) {
                severity = severity === 'critical' ? 'critical' : 'severe';
                alerts.push('Severe temperature abnormality - active warming/cooling required');
            }
        }
        
        return { severity, alerts, criticalCount: alerts.length };
    }

    getCriticalActions(protocolId, severity = 'moderate') {
        // Return prioritized critical actions based on protocol and severity
        const protocol = this.emergencyProtocols[protocolId];
        if (!protocol) return [];
        
        const criticalActions = [];
        
        // Always include first 3 steps as critical
        protocol.steps.slice(0, 3).forEach((step, index) => {
            criticalActions.push({
                priority: index + 1,
                action: step,
                timing: index === 0 ? 'IMMEDIATE' : index === 1 ? 'Within 5 min' : 'Within 10 min',
                critical: true
            });
        });
        
        // Add severity-specific actions
        if (severity === 'critical') {
            criticalActions.unshift({
                priority: 0,
                action: 'Call for senior help immediately (emergency team/consultant)',
                timing: 'IMMEDIATE',
                critical: true
            });
            
            criticalActions.splice(2, 0, {
                priority: 1.5,
                action: 'Ensure IV/IO access and continuous monitoring',
                timing: 'IMMEDIATE',
                critical: true
            });
        }
        
        // Add drug administration if available
        if (protocol.drugs && protocol.drugs.length > 0) {
            criticalActions.push({
                priority: 4,
                action: `Prepare emergency medications: ${protocol.drugs.slice(0, 3).join(', ')}`,
                timing: 'Within 5 min',
                critical: severity === 'critical' || severity === 'severe'
            });
        }
        
        return criticalActions.sort((a, b) => a.priority - b.priority);
    }
}

// Export singleton instance
export const emergencyProtocolsManager = new EmergencyProtocolsManager();
export default EmergencyProtocolsManager;
