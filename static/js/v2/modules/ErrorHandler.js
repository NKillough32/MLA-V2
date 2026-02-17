/**
 * Enhanced Error Handling Utilities for MLA Quiz V2
 * Provides comprehensive error handling, logging, and recovery mechanisms
 */

export class ErrorHandler {
    /**
     * Execute function with comprehensive error handling
     * @param {Function} fn - Function to execute
     * @param {Object} options - Error handling options
     * @returns {Promise<any>} - Function result or error fallback
     */
    static async safeExecute(fn, options = {}) {
        const {
            context = 'Unknown',
            fallback = null,
            showToast = true,
            logError = true,
            retryCount = 0,
            retryDelay = 1000
        } = options;

        let lastError = null;
        
        for (let attempt = 0; attempt <= retryCount; attempt++) {
            try {
                const result = await fn();
                return result;
            } catch (error) {
                lastError = error;
                
                if (logError && attempt === retryCount) {
                    console.error(`[${context}] Error after ${attempt + 1} attempts:`, error);
                }
                
                // Wait before retry (except on last attempt)
                if (attempt < retryCount && retryDelay > 0) {
                    await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
                }
            }
        }

        // All retries failed
        if (showToast) {
            this.showUserError(`Operation failed in ${context}. Please try again.`, 'error');
        }

        return fallback;
    }

    /**
     * Safely get DOM element with validation
     * @param {string} id - Element ID
     * @param {Object} options - Validation options
     * @returns {HTMLElement|null} - Element or null if invalid
     */
    static safeGetElement(id, options = {}) {
        const { required = false, context = 'DOM Query' } = options;
        
        try {
            const element = document.getElementById(id);
            
            if (!element) {
                if (required) {
                    console.warn(`[${context}] Required element not found: ${id}`);
                    this.showUserError('Interface element not found. Please refresh the page.', 'warning');
                }
                return null;
            }

            // Validate element is still in DOM
            if (!element.parentNode) {
                console.warn(`[${context}] Element detached from DOM: ${id}`);
                return null;
            }

            return element;
        } catch (error) {
            console.error(`[${context}] Error getting element ${id}:`, error);
            return null;
        }
    }

    /**
     * Safely query selector with validation
     * @param {string} selector - CSS selector
     * @param {HTMLElement} parent - Parent element (defaults to document)
     * @param {Object} options - Query options
     * @returns {HTMLElement|null} - Element or null
     */
    static safeQuerySelector(selector, parent = document, options = {}) {
        const { required = false, context = 'Query Selector' } = options;
        
        try {
            if (!parent || typeof parent.querySelector !== 'function') {
                console.warn(`[${context}] Invalid parent element for selector: ${selector}`);
                return null;
            }

            const element = parent.querySelector(selector);
            
            if (!element && required) {
                console.warn(`[${context}] Required element not found: ${selector}`);
                this.showUserError('Interface component not found. Please refresh the page.', 'warning');
            }
            
            return element;
        } catch (error) {
            console.error(`[${context}] Error with selector ${selector}:`, error);
            if (required) {
                this.showUserError('Error loading interface. Please refresh the page.', 'error');
            }
            return null;
        }
    }

    /**
     * Validate function parameters
     * @param {Object} params - Parameters to validate  
     * @param {Object} schema - Validation schema
     * @param {string} context - Context for error messages
     * @returns {boolean} - True if valid
     */
    static validateParams(params, schema, context = 'Function') {
        try {
            for (const [key, rules] of Object.entries(schema)) {
                const value = params[key];
                
                // Required check
                if (rules.required && (value === undefined || value === null)) {
                    console.error(`[${context}] Required parameter missing: ${key}`);
                    return false;
                }
                
                // Type check
                if (value !== undefined && rules.type && typeof value !== rules.type) {
                    console.error(`[${context}] Parameter ${key} has wrong type. Expected ${rules.type}, got ${typeof value}`);
                    return false;
                }
                
                // Custom validator
                if (value !== undefined && rules.validator && !rules.validator(value)) {
                    console.error(`[${context}] Parameter ${key} failed validation`);
                    return false;
                }
            }
            
            return true;
        } catch (error) {
            console.error(`[${context}] Error validating parameters:`, error);
            return false;
        }
    }

    /**
     * Safely parse JSON with error handling
     * @param {string} jsonString - JSON string to parse
     * @param {any} fallback - Fallback value on error
     * @param {string} context - Context for logging
     * @returns {any} - Parsed object or fallback
     */
    static safeJsonParse(jsonString, fallback = null, context = 'JSON Parse') {
        try {
            if (!jsonString || typeof jsonString !== 'string') {
                return fallback;
            }
            
            return JSON.parse(jsonString);
        } catch (error) {
            console.warn(`[${context}] Failed to parse JSON:`, error.message);
            return fallback;
        }
    }

    /**
     * Safely make HTTP requests with error handling
     * @param {string} url - Request URL
     * @param {Object} options - Fetch options
     * @returns {Promise<Response|null>} - Response or null on error
     */
    static async safeFetch(url, options = {}) {
        const context = `Fetch ${url}`;
        
        return await this.safeExecute(async () => {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return response;
        }, {
            context,
            fallback: null,
            retryCount: 2,
            retryDelay: 1000
        });
    }

    /**
     * Show user-friendly error messages
     * @param {string} message - Error message
     * @param {string} type - Message type (error, warning, info)
     */
    static showUserError(message, type = 'error') {
        try {
            // Try to use the app's toast system if available
            if (window.uiManager && typeof window.uiManager.showToast === 'function') {
                window.uiManager.showToast(message, type);
                return;
            }

            // Try analytics toast if available
            if (window.analytics && typeof window.analytics.showToast === 'function') {
                window.analytics.showToast(message, type);
                return;
            }

            // Fallback to console and alert for critical errors
            console.warn(`User Error [${type}]: ${message}`);
            if (type === 'error') {
                // Only alert for actual errors, not warnings
                setTimeout(() => alert(message), 100);
            }
        } catch (error) {
            // Last resort - just log
            console.error('Failed to show user error:', error);
            console.warn(`Original message [${type}]: ${message}`);
        }
    }

    /**
     * Create error boundary for async operations
     * @param {Function} operation - Async operation to wrap
     * @param {string} operationName - Name for logging
     * @returns {Function} - Wrapped operation
     */
    static createAsyncErrorBoundary(operation, operationName) {
        return async (...args) => {
            return await this.safeExecute(
                () => operation(...args),
                {
                    context: operationName,
                    showToast: true,
                    logError: true
                }
            );
        };
    }

    /**
     * Handle promise rejections globally
     */
    static setupGlobalErrorHandling() {
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            
            // Prevent default browser error handling
            event.preventDefault();
            
            // Show user-friendly message
            this.showUserError('An unexpected error occurred. The application will continue to function.', 'warning');
        });

        // Handle general errors
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            
            // Don't show toast for every script error as it could be annoying
            // Only log for now
        });

        console.log('✅ Global error handling initialized');
    }
}