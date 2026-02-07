/**
 * Global Styles Injector
 * Ensures text highlighting styles are available across all managers
 */

import { TextHighlightingMixin } from './TextHighlightingMixin.js';

/**
 * Inject global highlighting styles into the document
 * Call this from the main app initialization to ensure styles are available
 */
export function injectGlobalHighlightStyles() {
    // Check if styles are already injected
    if (document.getElementById('global-highlight-styles')) {
        return;
    }

    const styleElement = document.createElement('style');
    styleElement.id = 'global-highlight-styles';
    styleElement.textContent = TextHighlightingMixin.getHighlightStyles();
    
    document.head.appendChild(styleElement);
    
    console.log('✨ Global text highlighting styles injected');
}

/**
 * Easy mixin application for manager classes
 * Usage: applyHighlightingMixin(YourManager, 'your-highlight-class')
 */
export function applyHighlightingMixin(ManagerClass, defaultHighlightClass = 'search-highlight') {
    // Mix in the highlighting functionality
    Object.assign(ManagerClass.prototype, TextHighlightingMixin);
    
    // Add convenience methods
    ManagerClass.prototype.highlightSearchResults = function(container, searchTerm) {
        if (!searchTerm || searchTerm.length < 2) {
            this.clearAllHighlights(container);
            return;
        }
        
        this.clearAllHighlights(container);
        this.highlightText(container, searchTerm, defaultHighlightClass);
    };
    
    ManagerClass.prototype.clearAllHighlights = function(container) {
        this.clearHighlights(container, defaultHighlightClass);
        // Also clear common highlight classes
        ['search-highlight', 'msk-highlight', 'differential-highlight', 
         'clinical-pearls-highlight', 'guidelines-highlight', 'drugs-highlight', 
         'labs-highlight', 'anatomy-highlight'].forEach(className => {
            this.clearHighlights(container, className);
        });
    };
    
    return ManagerClass;
}

export default {
    injectGlobalHighlightStyles,
    applyHighlightingMixin,
    TextHighlightingMixin
};