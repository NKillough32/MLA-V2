/**
 * Enhanced Core Conditions Integration
 * 
 * Extension to integrate OpenAI-generated comprehensive content
 */

class EnhancedCoreConditions {
    constructor() {
        this.generatedContent = new Map();
        this.contentIndex = null;
        this.contentLoaded = false;
    }

    /**
     * Load the generated comprehensive content index
     */
    async loadGeneratedContent() {
        if (this.contentLoaded) return;

        try {
            const response = await fetch('/static/coreconditions/generated/index.json');
            this.contentIndex = await response.json();
            
            console.log(`📖 Enhanced: Loaded ${this.contentIndex.totalConditions} comprehensive conditions`);
            this.contentLoaded = true;
            
            return true;
        } catch (error) {
            console.warn('Enhanced content not available:', error.message);
            return false;
        }
    }

    /**
     * Get comprehensive content for a condition
     */
    async getComprehensiveContent(conditionName) {
        if (!this.contentLoaded) {
            const loaded = await this.loadGeneratedContent();
            if (!loaded) return null;
        }

        // Find matching condition in index
        const condition = this.contentIndex.conditions.find(c => 
            c.name.toLowerCase() === conditionName.toLowerCase()
        );

        if (!condition) return null;

        // Check cache first
        if (this.generatedContent.has(condition.id)) {
            return this.generatedContent.get(condition.id);
        }

        try {
            const response = await fetch(`/static/coreconditions/generated/${condition.filename}`);
            const content = await response.json();
            
            // Cache the content
            this.generatedContent.set(condition.id, content);
            
            return content;
        } catch (error) {
            console.error(`Failed to load comprehensive content for ${conditionName}:`, error);
            return null;
        }
    }

    /**
     * Get drug information with mechanisms
     */
    async getDrugMechanisms(conditionName) {
        const content = await this.getComprehensiveContent(conditionName);
        return content?.content?.management?.drugs || [];
    }

    /**
     * Get procedure explanations
     */
    async getProcedureDetails(conditionName) {
        const content = await this.getComprehensiveContent(conditionName);
        return content?.content?.management?.procedures || [];
    }

    /**
     * Get Foundation doctor specific guidance
     */
    async getFoundationGuidance(conditionName) {
        const content = await this.getComprehensiveContent(conditionName);
        return {
            role: content?.content?.foundationDoctorRole || '',
            escalation: content?.content?.escalation || '',
            redFlags: content?.content?.recognition?.redFlags || []
        };
    }

    /**
     * Get atypical presentations
     */
    async getAtypicalPresentations(conditionName) {
        const content = await this.getComprehensiveContent(conditionName);
        return content?.content?.recognition?.atypicalPresentations || [];
    }

    /**
     * Check if comprehensive content is available for a condition
     */
    isEnhancedContentAvailable(conditionName) {
        if (!this.contentIndex) return false;
        
        return this.contentIndex.conditions.some(c => 
            c.name.toLowerCase() === conditionName.toLowerCase()
        );
    }

    /**
     * Search enhanced content
     */
    searchEnhancedContent(query) {
        if (!this.contentIndex) return [];
        
        const lowerQuery = query.toLowerCase();
        return this.contentIndex.conditions.filter(condition =>
            condition.name.toLowerCase().includes(lowerQuery) ||
            condition.domains.some(domain => domain.toLowerCase().includes(lowerQuery))
        );
    }
}

// Integration note: Enhanced functionality is now built into CoreConditionsManager
// This module is kept for backwards compatibility but the main functionality
// has been integrated into the core manager for better performance and maintainability.

console.log('✅ Enhanced Core Conditions functionality integrated into CoreConditionsManager');

export { EnhancedCoreConditions };