/**
 * Offline Manager - Handles offline functionality and caching
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { analytics } from './AnalyticsManager.js';
import { EVENTS, STORAGE_KEYS } from './Constants.js';

export class OfflineManager {
    constructor() {
        this.isOnline = navigator.onLine;
        this.cachedQuizzes = new Set();
        this.offlineSubmissions = [];
        this.serviceWorker = null;
        
        this.setupEventListeners();
        this.registerServiceWorker();
    }

    /**
     * Initialize the offline manager
     */
    async initialize() {
        console.log('🔌 OfflineManager initialized');
        
        // Load cached quiz list from storage
        await this.loadCachedQuizList();
        
        // Check current offline status
        await this.updateOfflineStatus();
        
        // Set up periodic status updates
        setInterval(() => {
            this.updateOfflineStatus();
        }, 30000); // Update every 30 seconds
        
        return Promise.resolve();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for online/offline events
        window.addEventListener('online', () => {
            console.log('📡 Network connection restored');
            this.isOnline = true;
            this.handleReconnection();
        });
        
        window.addEventListener('offline', () => {
            console.log('📴 Network connection lost');
            this.isOnline = false;
            eventBus.emit(EVENTS.OFFLINE_MODE, { offline: true });
        });
        
        // Listen for service worker messages
        navigator.serviceWorker?.addEventListener('message', (event) => {
            this.handleServiceWorkerMessage(event);
        });
        
        // Listen for quiz-related events
        eventBus.on(EVENTS.QUIZ_LOADED, (data) => {
            this.markQuizAsCached(data.name);
        });
        
        eventBus.on(EVENTS.QUIZ_SUBMITTED, (data) => {
            if (!this.isOnline) {
                this.handleOfflineSubmission(data);
            }
        });
    }

    /**
     * Register service worker for offline functionality
     */
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                this.serviceWorker = await navigator.serviceWorker.register('/sw.js');
                console.log('✅ Service worker registered for offline support');
                
                // Listen for service worker updates
                this.serviceWorker.addEventListener('updatefound', () => {
                    const newWorker = this.serviceWorker.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New version available
                            eventBus.emit(EVENTS.SERVICE_WORKER_UPDATE, { newWorker });
                        }
                    });
                });
                
            } catch (error) {
                console.error('❌ Service worker registration failed:', error);
            }
        }
    }

    /**
     * Handle service worker messages
     */
    handleServiceWorkerMessage(event) {
        const { type, ...data } = event.data;
        
        switch (type) {
            case 'OFFLINE_SUBMISSION_STORED':
                console.log('📝 Offline submission stored:', data.submissionId);
                eventBus.emit(EVENTS.OFFLINE_SUBMISSION_STORED, data);
                break;
                
            case 'OFFLINE_SYNC_COMPLETE':
                console.log('🔄 Offline sync complete:', data.results);
                eventBus.emit(EVENTS.OFFLINE_SYNC_COMPLETE, data);
                break;
                
            case 'QUIZ_PRELOAD_COMPLETE':
                console.log('📚 Quiz preload complete:', data);
                eventBus.emit(EVENTS.QUIZ_PRELOAD_COMPLETE, data);
                break;
                
            case 'QUIZ_PRELOAD_FAILED':
                console.error('❌ Quiz preload failed:', data.error);
                eventBus.emit(EVENTS.QUIZ_PRELOAD_FAILED, data);
                break;
        }
    }

    /**
     * Update offline status
     */
    async updateOfflineStatus() {
        try {
            if (this.serviceWorker?.active) {
                const status = await this.sendMessageToServiceWorker('GET_OFFLINE_STATUS');
                this.offlineSubmissions = status.offlineSubmissions || 0;
                this.cachedQuizzes.clear();
                
                // We can't easily get the list of cached quizzes from the service worker
                // So we'll maintain our own list
                await this.loadCachedQuizList();
                
                eventBus.emit(EVENTS.OFFLINE_STATUS_UPDATE, {
                    isOnline: this.isOnline,
                    cachedQuizzes: this.cachedQuizzes.size,
                    offlineSubmissions: this.offlineSubmissions
                });
            } else {
                // Service worker not ready, emit with basic status
                console.log('Service worker not active, using basic offline status');
                eventBus.emit(EVENTS.OFFLINE_STATUS_UPDATE, {
                    isOnline: this.isOnline,
                    cachedQuizzes: this.cachedQuizzes.size,
                    offlineSubmissions: 0
                });
            }
        } catch (error) {
            console.error('Failed to update offline status:', error);
            // Emit with fallback status
            eventBus.emit(EVENTS.OFFLINE_STATUS_UPDATE, {
                isOnline: this.isOnline,
                cachedQuizzes: this.cachedQuizzes.size,
                offlineSubmissions: 0
            });
        }
    }

    /**
     * Load cached quiz list from storage
     */
    async loadCachedQuizList() {
        try {
            const cached = await storage.getItem(STORAGE_KEYS.CACHED_QUIZZES, []);
            this.cachedQuizzes = new Set(cached);
        } catch (error) {
            console.error('Failed to load cached quiz list:', error);
            this.cachedQuizzes = new Set();
        }
    }

    /**
     * Save cached quiz list to storage
     */
    async saveCachedQuizList() {
        try {
            await storage.setItem(STORAGE_KEYS.CACHED_QUIZZES, Array.from(this.cachedQuizzes));
        } catch (error) {
            console.error('Failed to save cached quiz list:', error);
        }
    }

    /**
     * Mark a quiz as cached
     */
    markQuizAsCached(quizName) {
        if (!this.cachedQuizzes.has(quizName)) {
            this.cachedQuizzes.add(quizName);
            this.saveCachedQuizList();
        }
    }

    /**
     * Check if a quiz is cached
     */
    isQuizCached(quizName) {
        return this.cachedQuizzes.has(quizName);
    }

    /**
     * Handle offline submission
     */
    handleOfflineSubmission(data) {
        console.log('📝 Handling offline submission for quiz:', data.quizName);
        // The service worker will handle storing the submission
        // We just need to notify the user
        eventBus.emit(EVENTS.OFFLINE_SUBMISSION_STORED, {
            quizName: data.quizName,
            message: 'Quiz submission stored offline. It will be synced when you reconnect.'
        });
    }

    /**
     * Handle reconnection
     */
    async handleReconnection() {
        console.log('🔄 Handling reconnection - syncing offline data');
        
        eventBus.emit(EVENTS.RECONNECTION_STARTED);
        
        try {
            // Trigger background sync for submissions
            if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
                const registration = await navigator.serviceWorker.ready;
                await registration.sync.register('quiz-submission');
            } else {
                // Fallback: manually sync
                await this.sendMessageToServiceWorker('SYNC_SUBMISSIONS');
            }
            
            eventBus.emit(EVENTS.RECONNECTION_COMPLETE);
            
        } catch (error) {
            console.error('Failed to sync on reconnection:', error);
            eventBus.emit(EVENTS.RECONNECTION_FAILED, { error: error.message });
        }
    }

    /**
     * Preload all quizzes for offline access
     */
    async preloadAllQuizzes() {
        if (!this.isOnline) {
            throw new Error('Cannot preload quizzes while offline');
        }
        
        console.log('📚 Starting quiz preload...');
        eventBus.emit(EVENTS.QUIZ_PRELOAD_STARTED);
        
        try {
            await this.sendMessageToServiceWorker('PRELOAD_QUIZZES');
        } catch (error) {
            console.error('Failed to start quiz preload:', error);
            throw error;
        }
    }

    /**
     * Send message to service worker
     */
    sendMessageToServiceWorker(type, data = {}) {
        return new Promise((resolve, reject) => {
            if (!this.serviceWorker?.active) {
                reject(new Error('Service worker not available'));
                return;
            }
            
            const messageChannel = new MessageChannel();
            
            messageChannel.port1.onmessage = (event) => {
                if (event.data.error) {
                    reject(new Error(event.data.error));
                } else {
                    resolve(event.data);
                }
            };
            
            this.serviceWorker.active.postMessage({ type, ...data }, [messageChannel.port2]);
            
            // Timeout after 30 seconds
            setTimeout(() => {
                reject(new Error('Service worker message timeout'));
            }, 30000);
        });
    }

    /**
     * Get offline status
     */
    getOfflineStatus() {
        return {
            isOnline: this.isOnline,
            cachedQuizzes: this.cachedQuizzes.size,
            offlineSubmissions: this.offlineSubmissions
        };
    }

    /**
     * Force refresh of offline status
     */
    async refreshOfflineStatus() {
        await this.updateOfflineStatus();
    }
}

export { OfflineManager };