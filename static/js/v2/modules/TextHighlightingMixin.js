/**
 * TextHighlightingMixin
 * Reusable text highlighting functionality for search terms across all managers
 */

export const TextHighlightingMixin = {
    /**
     * Highlight search terms within an element
     * @param {HTMLElement} element - Element to search and highlight within
     * @param {string} searchTerm - Term to highlight (case-insensitive)
     * @param {string} highlightClass - CSS class to apply to highlighted text (default: 'search-highlight')
     */
    highlightText(element, searchTerm, highlightClass = 'search-highlight') {
        if (!searchTerm || searchTerm.length < 2) return; // Don't highlight single characters
        
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        
        // Collect all text nodes
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        // Process each text node
        textNodes.forEach(textNode => {
            const text = textNode.textContent;
            const regex = new RegExp(`(${this.escapeRegExp(searchTerm)})`, 'gi');
            
            if (regex.test(text)) {
                const highlightedHTML = text.replace(regex, `<span class="${highlightClass}">$1</span>`);
                
                // Create a temporary element to hold the highlighted content
                const temp = document.createElement('div');
                temp.innerHTML = highlightedHTML;
                
                // Replace the text node with the highlighted content
                const parent = textNode.parentNode;
                while (temp.firstChild) {
                    parent.insertBefore(temp.firstChild, textNode);
                }
                parent.removeChild(textNode);
            }
        });
    },

    /**
     * Clear all highlights within an element
     * @param {HTMLElement} element - Element to clear highlights from
     * @param {string} highlightClass - CSS class used for highlighting (default: 'search-highlight')
     */
    clearHighlights(element, highlightClass = 'search-highlight') {
        const highlights = element.querySelectorAll(`.${highlightClass}`);
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize(); // Merge adjacent text nodes
        });
    },

    /**
     * Escape special regex characters in search term
     * @param {string} string - String to escape
     * @returns {string} Escaped string
     */
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    /**
     * Get default highlight CSS styles
     * @returns {string} CSS styles for highlighting
     */
    getHighlightStyles() {
        return `
            .search-highlight {
                background-color: #ffeb3b;
                color: #000;
                padding: 1px 2px;
                border-radius: 2px;
                font-weight: 500;
            }

            body.dark-mode .search-highlight,
            [data-theme="dark"] .search-highlight {
                background-color: #fdd835;
                color: #000;
            }

            /* Manager-specific highlight classes */
            .msk-highlight,
            .differential-highlight,
            .clinical-pearls-highlight,
            .guidelines-highlight,
            .drugs-highlight,
            .labs-highlight,
            .anatomy-highlight {
                background-color: #ffeb3b;
                color: #000;
                padding: 1px 2px;
                border-radius: 2px;
                font-weight: 500;
            }

            body.dark-mode .msk-highlight,
            body.dark-mode .differential-highlight,
            body.dark-mode .clinical-pearls-highlight,
            body.dark-mode .guidelines-highlight,
            body.dark-mode .drugs-highlight,
            body.dark-mode .labs-highlight,
            body.dark-mode .anatomy-highlight,
            [data-theme="dark"] .msk-highlight,
            [data-theme="dark"] .differential-highlight,
            [data-theme="dark"] .clinical-pearls-highlight,
            [data-theme="dark"] .guidelines-highlight,
            [data-theme="dark"] .drugs-highlight,
            [data-theme="dark"] .labs-highlight,
            [data-theme="dark"] .anatomy-highlight {
                background-color: #fdd835;
                color: #000;
            }
        `;
    }
};