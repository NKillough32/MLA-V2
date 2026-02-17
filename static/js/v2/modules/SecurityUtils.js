/**
 * Security Utilities for MLA Quiz V2
 * Provides secure HTML rendering and DOM manipulation utilities
 */

export class SecurityUtils {
    /**
     * Escape HTML to prevent XSS
     * @param {string} value - Value to escape
     * @returns {string} - Escaped value
     */
    static escapeHtml(value) {
        if (value === null || value === undefined) {
            return '';
        }
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    /**
     * Escape HTML attribute values
     * @param {string} value - Attribute value to escape  
     * @returns {string} - Escaped attribute value
     */
    static escapeHtmlAttribute(value) {
        if (value === null || value === undefined) {
            return '';
        }
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\r?\n/g, '&#10;')
            .replace(/\r/g, '&#13;')
            .replace(/\t/g, '&#9;');
    }

    /**
     * Strip HTML tags from content
     * @param {string} html - HTML string to strip
     * @returns {string} - Plain text content
     */
    static stripHtml(html) {
        if (!html) return '';
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || '';
    }

    /**
     * Safely set innerHTML with sanitation 
     * @param {HTMLElement} element - Target element
     * @param {string} html - HTML content (will be escaped)
     * @param {boolean} allowTrustedHtml - If true, allows pre-trusted HTML
     */
    static setInnerHTML(element, html, allowTrustedHtml = false) {
        if (!element) {
            console.warn('SecurityUtils.setInnerHTML: element is null or undefined');
            return;
        }

        if (!html) {
            element.innerHTML = '';
            return;
        }

        if (allowTrustedHtml) {
            // Only use when HTML is from trusted sources (no user input)
            element.innerHTML = html;
        } else {
            // Escape HTML by default for security
            element.textContent = html;
        }
    }

    /**
     * Safely create element with attributes
     * @param {string} tagName - Element tag name
     * @param {Object} attributes - Attributes object
     * @param {string} textContent - Text content
     * @returns {HTMLElement} - Created element
     */
    static createElement(tagName, attributes = {}, textContent = '') {
        const element = document.createElement(tagName);
        
        // Set attributes safely
        Object.keys(attributes).forEach(key => {
            const value = attributes[key];
            if (value !== null && value !== undefined) {
                element.setAttribute(key, this.escapeHtmlAttribute(value));
            }
        });

        // Set text content safely  
        if (textContent) {
            element.textContent = textContent;
        }

        return element;
    }

    /**
     * Validate that element exists and is in DOM
     * @param {HTMLElement|string} elementOrId - Element or element ID
     * @returns {HTMLElement|null} - Element if valid, null otherwise
     */
    static validateElement(elementOrId) {
        let element = null;
        
        if (typeof elementOrId === 'string') {
            element = document.getElementById(elementOrId);
        } else if (elementOrId instanceof HTMLElement) {
            element = elementOrId;
        }

        if (!element || !element.parentNode) {
            return null;
        }

        return element;
    }

    /**
     * Safely add event listener with error handling
     * @param {HTMLElement|string} elementOrId - Element or ID
     * @param {string} event - Event name
     * @param {Function} callback - Event callback
     * @param {Object} options - Event options
     */
    static addEventListener(elementOrId, event, callback, options = {}) {
        const element = this.validateElement(elementOrId);
        if (!element) {
            console.warn(`SecurityUtils.addEventListener: Invalid element for event ${event}`);
            return;
        }

        const safeCallback = (e) => {
            try {
                callback(e);
            } catch (error) {
                console.error(`Error in event handler for ${event}:`, error);
                // Optionally show user-friendly error message
                if (window.uiManager && typeof window.uiManager.showToast === 'function') {
                    window.uiManager.showToast('An error occurred. Please try again.', 'error');
                }
            }
        };

        element.addEventListener(event, safeCallback, options);
        return safeCallback; // Return for cleanup if needed
    }
}