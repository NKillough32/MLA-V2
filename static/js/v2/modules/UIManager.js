/**
 * UI Manager - Handles theme, font size, and UI state management
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { analytics } from './AnalyticsManager.js';
import UIHelpers from './UIHelpers.js';
import { EVENTS, STORAGE_KEYS, UI_CONFIG, DEFAULT_SETTINGS } from './Constants.js';
import { orientationManager } from './OrientationManager.js';

export class UIManager {
    constructor() {
        this.fontSize = DEFAULT_SETTINGS.fontSize;
        this.darkMode = DEFAULT_SETTINGS.darkMode;
        this.currentView = 'home';
        this.navigationHistory = [];
        this.rotationLocked = false;
        this.hapticsEnabled = DEFAULT_SETTINGS.vibrationEnabled;
    }

    /**
     * Initialize UI Manager
     */
    initialize() {
        // Load saved settings
        this.loadSettings();
        
        // Apply settings
        this.applyTheme();
        this.applyFontSize();
        
        // Setup listeners
        this.setupEventListeners();
        
        // Add UI controls (theme toggle, font size buttons, rotation lock, haptics toggle)
        this.addThemeToggle();
        this.addFontSizeControls();
        this.setupRotationLock();
        this.addHapticsToggle();
        
        console.log('🎨 UI Manager initialized');
    }

    /**
     * Load saved settings
     */
    loadSettings() {
        this.fontSize = storage.getItem(STORAGE_KEYS.FONT_SIZE, DEFAULT_SETTINGS.fontSize);
        const savedDarkMode = storage.getItem(STORAGE_KEYS.DARK_MODE);
        
        if (savedDarkMode !== null) {
            this.darkMode = savedDarkMode === 'true';
        } else {
            // Check system preference
            this.darkMode = window.matchMedia && 
                window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                const savedPreference = storage.getItem(STORAGE_KEYS.DARK_MODE);
                if (savedPreference === null) {
                    // Only auto-switch if user hasn't set a preference
                    this.setDarkMode(e.matches);
                }
            });
        }

        // Listen for resize events
        window.addEventListener('resize', UIHelpers.debounce(() => {
            this.handleResize();
        }, UI_CONFIG.DEBOUNCE_DELAY));
    }

    /**
     * Toggle dark mode
     */
    toggleDarkMode() {
        this.setDarkMode(!this.darkMode);
        return this.darkMode;
    }

    /**
     * Set dark mode
     */
    setDarkMode(enabled) {
        this.darkMode = enabled;
        this.applyTheme();
        storage.setItem(STORAGE_KEYS.DARK_MODE, enabled.toString());
        eventBus.emit(EVENTS.THEME_CHANGED, { darkMode: enabled });
        console.log(`🌓 Dark mode: ${enabled ? 'ON' : 'OFF'}`);
    }

    /**
     * Apply theme to document
     */
    applyTheme() {
        if (this.darkMode) {
            document.body.classList.add('dark-mode');
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.setAttribute('data-theme', 'light');
        }
    }

    /**
     * Get current theme
     */
    isDarkMode() {
        return this.darkMode;
    }

    /**
     * Set font size
     */
    setFontSize(size) {
        const validSizes = Object.values(UI_CONFIG.FONT_SIZES);
        if (!validSizes.includes(size)) {
            console.warn(`Invalid font size: ${size}`);
            return;
        }

        this.fontSize = size;
        this.applyFontSize();
        storage.setItem(STORAGE_KEYS.FONT_SIZE, size);
        
        // Update button states if they exist
        this.updateFontSizeButtons();
        
        eventBus.emit(EVENTS.FONT_SIZE_CHANGED, { fontSize: size });
        console.log(`📝 Font size: ${size}`);
    }

    /**
     * Apply font size to document
     */
    applyFontSize() {
        // Remove all font size classes
        Object.values(UI_CONFIG.FONT_SIZES).forEach(size => {
            document.body.classList.remove(`font-${size}`);
        });
        
        // Add current font size class
        document.body.classList.add(`font-${this.fontSize}`);
        
        // Also apply via CSS custom property for rem-based sizing
        const fontSizeMap = {
            'small': 0.85,
            'medium': 1.0,
            'large': 1.2,
            'xlarge': 1.4
        };
        
        const multiplier = fontSizeMap[this.fontSize] || 1.0;
        document.documentElement.style.fontSize = `${16 * multiplier}px`;
    }

    /**
     * Get current font size
     */
    getFontSize() {
        return this.fontSize;
    }

    /**
     * Cycle to next font size
     */
    cycleFontSize() {
        const sizes = Object.values(UI_CONFIG.FONT_SIZES);
        const currentIndex = sizes.indexOf(this.fontSize);
        const nextIndex = (currentIndex + 1) % sizes.length;
        this.setFontSize(sizes[nextIndex]);
        return this.fontSize;
    }

    /**
     * Show view (screen/section)
     */
    showView(viewName) {
        const views = document.querySelectorAll('.view, .screen');
        views.forEach(view => {
            if (view.id === viewName || view.dataset.view === viewName) {
                view.style.display = 'block';
                view.classList.add('active');
            } else {
                view.style.display = 'none';
                view.classList.remove('active');
            }
        });

        // Update navigation history
        if (this.currentView !== viewName) {
            this.navigationHistory.push(this.currentView);
            this.currentView = viewName;
        }

        console.log(`📄 Showing view: ${viewName}`);
    }

    /**
     * Go back to previous view
     */
    goBack() {
        if (this.navigationHistory.length > 0) {
            const previousView = this.navigationHistory.pop();
            this.showView(previousView);
            return true;
        }
        return false;
    }

    /**
     * Get current view
     */
    getCurrentView() {
        return this.currentView;
    }

    /**
     * Show modal/dialog
     */
    showModal(modalId, options = {}) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.warn(`Modal not found: ${modalId}`);
            return;
        }

        modal.style.display = 'block';
        modal.classList.add('show');

        // Add backdrop
        if (options.backdrop !== false) {
            this.showBackdrop(() => this.hideModal(modalId));
        }

        // Focus first input
        if (options.autoFocus !== false) {
            const firstInput = modal.querySelector('input, textarea, select, button');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }

        // Close on escape key
        if (options.closeOnEscape !== false) {
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    this.hideModal(modalId);
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        }
    }

    /**
     * Hide modal/dialog
     */
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.style.display = 'none';
        modal.classList.remove('show');
        this.hideBackdrop();
    }

    /**
     * Show backdrop
     */
    showBackdrop(onClickCallback) {
        let backdrop = document.getElementById('modal-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'modal-backdrop';
            backdrop.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 999;
                cursor: pointer;
            `;
            document.body.appendChild(backdrop);
        }

        backdrop.style.display = 'block';
        
        if (onClickCallback) {
            backdrop.onclick = onClickCallback;
        }
    }

    /**
     * Hide backdrop
     */
    hideBackdrop() {
        const backdrop = document.getElementById('modal-backdrop');
        if (backdrop) {
            backdrop.style.display = 'none';
            backdrop.onclick = null;
        }
    }

    /**
     * Show toast notification
     */
    showToast(message, type = 'info', duration = UI_CONFIG.TOAST_DURATION) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            background: ${this.getToastColor(type)};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideUp 0.3s ease-out;
            max-width: 90%;
            text-align: center;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, duration);

        return toast;
    }

    /**
     * Get toast color based on type
     */
    getToastColor(type) {
        const colors = {
            success: '#4caf50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196f3'
        };
        return colors[type] || colors.info;
    }

    /**
     * Show loading overlay
     */
    showLoadingOverlay(message = 'Loading...') {
        let overlay = document.getElementById('loading-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'loading-overlay';
            overlay.innerHTML = `
                <div style="text-align:center;">
                    <div class="spinner"></div>
                    <p id="loading-message" style="margin-top:20px;color:white;">${message}</p>
                </div>
            `;
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            `;
            document.body.appendChild(overlay);
        } else {
            const messageEl = overlay.querySelector('#loading-message');
            if (messageEl) messageEl.textContent = message;
        }

        overlay.style.display = 'flex';
    }

    /**
     * Hide loading overlay
     */
    hideLoadingOverlay() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    /**
     * Update loading message
     */
    updateLoadingMessage(message) {
        const messageEl = document.querySelector('#loading-overlay #loading-message');
        if (messageEl) {
            messageEl.textContent = message;
        }
    }

    /**
     * Confirm dialog
     */
    async confirm(message, title = 'Confirm') {
        return new Promise((resolve) => {
            const existingDialog = document.getElementById('confirm-dialog');
            if (existingDialog) {
                document.body.removeChild(existingDialog);
            }

            const dialog = document.createElement('div');
            dialog.id = 'confirm-dialog';
            dialog.innerHTML = `
                <div style="background:white;padding:24px;border-radius:12px;max-width:400px;box-shadow:0 8px 32px rgba(0,0,0,0.3);">
                    <h3 style="margin:0 0 16px 0;color:#333;">${title}</h3>
                    <p style="margin:0 0 24px 0;color:#666;">${message}</p>
                    <div style="display:flex;gap:12px;justify-content:flex-end;">
                        <button id="confirm-no" style="padding:8px 20px;border:1px solid #ccc;background:white;color:#333;border-radius:6px;cursor:pointer;">Cancel</button>
                        <button id="confirm-yes" style="padding:8px 20px;border:none;background:#1976d2;color:white;border-radius:6px;cursor:pointer;">Confirm</button>
                    </div>
                </div>
            `;
            dialog.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
            `;

            document.body.appendChild(dialog);

            dialog.querySelector('#confirm-yes').onclick = () => {
                document.body.removeChild(dialog);
                resolve(true);
            };

            dialog.querySelector('#confirm-no').onclick = () => {
                document.body.removeChild(dialog);
                resolve(false);
            };

            dialog.onclick = (e) => {
                if (e.target === dialog) {
                    document.body.removeChild(dialog);
                    resolve(false);
                }
            };
        });
    }

    /**
     * Handle window resize
     */
    handleResize() {
        const width = window.innerWidth;
        
        // Update body classes for responsive design
        document.body.classList.toggle('mobile', width < 768);
        document.body.classList.toggle('tablet', width >= 768 && width < 1024);
        document.body.classList.toggle('desktop', width >= 1024);
        
        eventBus.emit('ui:resize', { width, height: window.innerHeight });
    }

    /**
     * Scroll to top smoothly
     */
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Toggle fullscreen
     */
    async toggleFullscreen() {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
            return true;
        } else {
            await document.exitFullscreen();
            return false;
        }
    }

    /**
     * Get UI settings
     */
    getSettings() {
        return {
            darkMode: this.darkMode,
            fontSize: this.fontSize,
            currentView: this.currentView
        };
    }

    /**
     * Reset UI settings to defaults
     */
    resetSettings() {
        this.setDarkMode(DEFAULT_SETTINGS.darkMode);
        this.setFontSize(DEFAULT_SETTINGS.fontSize);
        console.log('🔄 UI settings reset to defaults');
    }

    /**
     * Add font size controls to navbar
     */
    addFontSizeControls() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) {
            console.warn('⚠️ Navbar not found, retrying font controls in 100ms');
            setTimeout(() => this.addFontSizeControls(), 100);
            return;
        }

        // Remove existing controls if present
        const existingControls = document.querySelector('.font-controls');
        if (existingControls) {
            existingControls.remove();
        }

        // Create font controls container
        const fontControls = document.createElement('div');
        fontControls.className = 'font-controls';
        fontControls.innerHTML = `
            <button class="font-size-btn" data-size="small" title="Small Text" 
                    style="background: transparent; border: 1px solid #007AFF; color: #007AFF; 
                           padding: 4px 6px; border-radius: 4px; font-size: 9px; cursor: pointer; 
                           font-weight: bold;">A</button>
            <button class="font-size-btn" data-size="medium" title="Medium Text" 
                    style="background: transparent; border: 1px solid #007AFF; color: #007AFF; 
                           padding: 4px 6px; border-radius: 4px; font-size: 11px; cursor: pointer; 
                           font-weight: bold;">A</button>
            <button class="font-size-btn" data-size="large" title="Large Text" 
                    style="background: transparent; border: 1px solid #007AFF; color: #007AFF; 
                           padding: 4px 6px; border-radius: 4px; font-size: 13px; cursor: pointer; 
                           font-weight: bold;">A</button>
            <button class="font-size-btn" data-size="xlarge" title="Extra Large Text" 
                    style="background: transparent; border: 1px solid #007AFF; color: #007AFF; 
                           padding: 4px 6px; border-radius: 4px; font-size: 15px; cursor: pointer; 
                           font-weight: bold;">A</button>
        `;

        // Add event listeners
        fontControls.addEventListener('click', (e) => {
            if (e.target.classList.contains('font-size-btn')) {
                const size = e.target.dataset.size;
                console.log(`📝 Font size button clicked: ${size}`);
                this.setFontSize(size);
            }
        });

        // Add to navbar
        const navRight = navbar.querySelector('.nav-right');
        if (navRight) {
            navRight.appendChild(fontControls);
        } else {
            navbar.appendChild(fontControls);
        }

        // Update active state
        this.updateFontSizeButtons();
        console.log('✅ Font size controls added to navbar');
    }

    /**
     * Update font size button active states
     */
    updateFontSizeButtons() {
        document.querySelectorAll('.font-size-btn').forEach(btn => {
            if (btn.dataset.size === this.fontSize) {
                btn.classList.add('active');
                btn.style.backgroundColor = '#007AFF';
                btn.style.color = 'white';
            } else {
                btn.classList.remove('active');
                btn.style.backgroundColor = 'transparent';
                btn.style.color = '#007AFF';
            }
        });
    }

    /**
     * Add theme toggle button to navbar
     */
    addThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) {
            console.warn('⚠️ Theme toggle button not found in navbar - will retry on next interaction');
            // Try to add the button dynamically if navbar exists
            const navRight = document.querySelector('.navbar .nav-right');
            if (navRight) {
                const btn = document.createElement('button');
                btn.id = 'themeToggle';
                btn.title = this.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
                btn.style.cssText = 'background:none;border:none;color:white;font-size:20px;padding:6px;margin-right:8px;cursor:pointer;';
                btn.textContent = this.darkMode ? '☀️' : '🌙';
                
                // Insert as first child of nav-right
                navRight.insertBefore(btn, navRight.firstChild);
                
                // Add click handler
                btn.addEventListener('click', () => {
                    this.toggleDarkMode();
                    btn.textContent = this.darkMode ? '☀️' : '🌙';
                    btn.title = this.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
                    this.showToast(this.darkMode ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
                });
                
                console.log('✅ Theme toggle button created and added to navbar');
            }
            return;
        }

        // Button already exists in HTML - just add handler
        themeToggle.textContent = this.darkMode ? '☀️' : '🌙';
        themeToggle.title = this.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';

        // Add click handler
        themeToggle.addEventListener('click', () => {
            this.toggleDarkMode();
            themeToggle.textContent = this.darkMode ? '☀️' : '🌙';
            themeToggle.title = this.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
            this.showToast(this.darkMode ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
        });

        console.log('✅ Theme toggle button initialized');
    }

    /**
     * Setup rotation lock button - Integrated with OrientationManager
     */
    setupRotationLock() {
        const rotLockBtn = document.getElementById('rotLock');
        if (!rotLockBtn) {
            console.warn('⚠️ Rotation lock button not found');
            return;
        }

        // Set initial icon based on OrientationManager state
        this.updateRotationLockIcon(rotLockBtn);
        
        // Enhanced button styling
        rotLockBtn.style.cssText += `
            transition: all 0.2s ease;
            transform: scale(${orientationManager.screenLocked ? '1.1' : '1.0'});
            color: ${orientationManager.screenLocked ? '#ff6b6b' : 'var(--text-secondary)'};
        `;

        // Add click handler with haptic feedback - delegates to OrientationManager
        rotLockBtn.addEventListener('click', async () => {
            analytics.vibrateClick();
            await this.toggleRotationLock();
        });

        // Listen for orientation changes from OrientationManager
        orientationManager.onOrientationChange(() => {
            const currentOrientation = orientationManager.getCurrentOrientation();
            console.log(`📱 Orientation changed to: ${currentOrientation}`);
            // Vibrate on successful orientation change when not locked
            if (!orientationManager.screenLocked) {
                analytics.vibrateClick();
            }
        });

        console.log('✅ Enhanced rotation lock system initialized (integrated with OrientationManager)');
    }

    /**
     * Toggle rotation lock - delegates to OrientationManager
     */
    async toggleRotationLock() {
        const result = await orientationManager.toggleRotationLock();
        
        const rotLockBtn = document.getElementById('rotLock');
        if (rotLockBtn) {
            this.updateRotationLockIcon(rotLockBtn);
            
            // Update button styling
            rotLockBtn.style.transform = `scale(${result.locked ? '1.1' : '1.0'})`;
            rotLockBtn.style.color = result.locked ? '#ff6b6b' : 'var(--text-secondary)';
        }

        // Show toast notification
        if (result.locked) {
            const orientation = result.lockedTo || 'optimal';
            this.showToast(`🔒 Rotation locked to ${orientation}`, 'info');
        } else {
            this.showToast('🔓 Rotation unlocked', 'info');
        }

        eventBus.emit('orientation:lockChanged', result);
    }

    /**
     * Update rotation lock button icon
     */
    updateRotationLockIcon(button) {
        if (orientationManager.screenLocked) {
            button.textContent = '🔒';
            button.title = `Unlock Rotation (Currently: ${orientationManager.lockedTo || 'locked'})`;
            button.style.opacity = '1';
        } else {
            button.textContent = '🔓';
            button.title = 'Lock Rotation (Auto-detect optimal)';
            button.style.opacity = '0.6';
        }
    }

    /**
     * Add haptics toggle button to navbar
     */
    addHapticsToggle() {
        // Load saved state
        this.hapticsEnabled = storage.getItem('hapticsEnabled', DEFAULT_SETTINGS.vibrationEnabled);
        if (typeof this.hapticsEnabled === 'string') {
            this.hapticsEnabled = this.hapticsEnabled === 'true';
        }

        const navbar = document.querySelector('.navbar');
        if (!navbar) {
            console.warn('⚠️ Navbar not found, retrying haptics toggle in 100ms');
            setTimeout(() => this.addHapticsToggle(), 100);
            return;
        }

        // Remove existing toggle if present
        const existingControls = document.querySelector('.haptics-controls');
        if (existingControls) {
            existingControls.remove();
        }

        // Create haptics controls container
        const hapticsControls = document.createElement('div');
        hapticsControls.className = 'haptics-controls';

        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'haptics-toggle';
        toggleBtn.className = 'haptics-btn';
        toggleBtn.textContent = this.hapticsEnabled ? '🔔' : '🔕';
        toggleBtn.title = this.hapticsEnabled ? 'Haptics: On (click to disable)' : 'Haptics: Off (click to enable)';

        // Add click handler
        toggleBtn.addEventListener('click', () => {
            this.toggleHaptics();
        });

        hapticsControls.appendChild(toggleBtn);

        // Add to navbar (insert before font controls in nav-right)
        const navRight = navbar.querySelector('.nav-right');
        const fontControls = navbar.querySelector('.font-controls');
        
        if (navRight) {
            if (fontControls) {
                navRight.insertBefore(hapticsControls, fontControls);
            } else {
                navRight.appendChild(hapticsControls);
            }
        } else {
            navbar.appendChild(hapticsControls);
        }

        // Apply initial state to analytics manager
        analytics.setVibrationSetting(this.hapticsEnabled);

        console.log('✅ Haptics toggle added to navbar');
    }

    /**
     * Toggle haptics on/off
     */
    toggleHaptics() {
        this.hapticsEnabled = !this.hapticsEnabled;
        storage.setItem('hapticsEnabled', this.hapticsEnabled.toString());
        analytics.setVibrationSetting(this.hapticsEnabled);

        const toggleBtn = document.getElementById('haptics-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = this.hapticsEnabled ? '🔔' : '🔕';
            toggleBtn.title = this.hapticsEnabled ? 'Haptics: On (click to disable)' : 'Haptics: Off (click to enable)';
        }

        // Provide haptic feedback when enabling
        if (this.hapticsEnabled) {
            analytics.vibrateClick();
            this.showToast('🔔 Haptic feedback enabled', 'success');
        } else {
            this.showToast('🔕 Haptic feedback disabled', 'info');
        }

        eventBus.emit('haptics:changed', { enabled: this.hapticsEnabled });
    }

    /**
     * Check if haptics is enabled
     */
    isHapticsEnabled() {
        return this.hapticsEnabled;
    }

    /**
     * Orientation enforcement helper methods - COMPREHENSIVE IMPLEMENTATIONS
     */
    
    async enforceOrientationLock(orientation = 'portrait-primary') {
        // Try multiple methods to enforce orientation
        const methods = [
            () => this.useScreenOrientationAPI(orientation),
            () => this.useFullscreenOrientation(orientation),
            () => this.useCSSOrientationLock(orientation),
            () => this.useVisualHints(orientation)
        ];
        
        for (const method of methods) {
            try {
                const result = await method();
                if (result.success) {
                    console.log(`✅ Orientation locked using: ${result.method}`);
                    return result;
                }
            } catch (error) {
                console.warn(`⚠️ Orientation method failed:`, error);
            }
        }
        
        // All methods failed, use visual hint as fallback
        return this.useVisualHints(orientation);
    }

    async useScreenOrientationAPI(orientation) {
        if (!screen.orientation || !screen.orientation.lock) {
            throw new Error('Screen Orientation API not supported');
        }
        
        try {
            await screen.orientation.lock(orientation);
            return { success: true, method: 'Screen Orientation API' };
        } catch (error) {
            throw new Error(`Screen Orientation API failed: ${error.message}`);
        }
    }

    async useFullscreenOrientation(orientation) {
        const docEl = document.documentElement;
        
        if (!docEl.requestFullscreen) {
            throw new Error('Fullscreen API not supported');
        }
        
        try {
            await docEl.requestFullscreen({ orientationLock: orientation });
            return { success: true, method: 'Fullscreen with orientation lock' };
        } catch (error) {
            throw new Error(`Fullscreen orientation failed: ${error.message}`);
        }
    }

    useCSSOrientationLock(orientation) {
        // Apply CSS transforms to maintain portrait layout in landscape
        const isPortrait = orientation.includes('portrait');
        
        if (!isPortrait && this.getCurrentOrientation() === 'landscape') {
            document.body.style.transform = 'rotate(90deg)';
            document.body.style.transformOrigin = 'center center';
            document.body.style.width = '100vh';
            document.body.style.height = '100vw';
            document.body.style.overflow = 'hidden';
            
            return { success: true, method: 'CSS Transform Lock' };
        }
        
        // Reset transforms if in correct orientation
        document.body.style.transform = '';
        document.body.style.transformOrigin = '';
        document.body.style.width = '';
        document.body.style.height = '';
        
        return { success: false, method: 'CSS Transform' };
    }

    useVisualHints(orientation) {
        const isPortrait = orientation.includes('portrait');
        const currentOrientation = this.getCurrentOrientation();
        
        if ((isPortrait && currentOrientation !== 'portrait') ||
            (!isPortrait && currentOrientation !== 'landscape')) {
            this.showOrientationHint(isPortrait ? 'portrait' : 'landscape');
        } else {
            this.hideOrientationHint();
        }
        
        return { success: true, method: 'Visual Hint' };
    }

    async requestFullscreenForOrientation() {
        const docEl = document.documentElement;
        
        try {
            if (docEl.requestFullscreen) {
                await docEl.requestFullscreen();
            } else if (docEl.webkitRequestFullscreen) {
                await docEl.webkitRequestFullscreen();
            } else if (docEl.msRequestFullscreen) {
                await docEl.msRequestFullscreen();
            } else {
                throw new Error('Fullscreen API not supported');
            }
            
            return { success: true };
        } catch (error) {
            console.error('Fullscreen request failed:', error);
            return { success: false, error: error.message };
        }
    }

    adjustLayoutForOrientation(orientation) {
        const body = document.body;
        const main = document.querySelector('main');
        
        if (!main) return;
        
        // Remove previous orientation classes
        body.classList.remove('orientation-portrait', 'orientation-landscape');
        
        // Add current orientation class
        body.classList.add(`orientation-${orientation}`);
        
        // Adjust layout based on orientation
        if (orientation === 'landscape') {
            // Optimize for landscape: wider panels, side-by-side layouts
            main.style.maxWidth = '100%';
            main.style.padding = '10px 20px';
            
            // Make panels wider in landscape
            const panels = document.querySelectorAll('.panel');
            panels.forEach(panel => {
                panel.style.maxWidth = '100%';
            });
        } else {
            // Optimize for portrait: narrower, stacked layouts
            main.style.maxWidth = '800px';
            main.style.padding = '10px';
            
            // Reset panel widths
            const panels = document.querySelectorAll('.panel');
            panels.forEach(panel => {
                panel.style.maxWidth = '';
            });
        }
        
        console.log(`📱 Layout adjusted for ${orientation} orientation`);
    }

    showOrientationHint(targetOrientation) {
        // Remove existing hint
        this.hideOrientationHint();
        
        // Create hint overlay
        const hint = document.createElement('div');
        hint.id = 'orientation-hint';
        hint.className = 'orientation-hint';
        hint.innerHTML = `
            <div class="orientation-hint-content">
                <div class="orientation-hint-icon">
                    ${targetOrientation === 'portrait' ? '📱' : '🔄'}
                </div>
                <div class="orientation-hint-text">
                    Please rotate your device to ${targetOrientation} mode
                </div>
                <button class="orientation-hint-dismiss" onclick="this.parentElement.parentElement.remove()">
                    Dismiss
                </button>
            </div>
        `;
        
        // Add styles
        hint.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(hint);
    }

    hideOrientationHint() {
        const hint = document.getElementById('orientation-hint');
        if (hint) {
            hint.remove();
        }
    }
}

// Export singleton instance
export const uiManager = new UIManager();
