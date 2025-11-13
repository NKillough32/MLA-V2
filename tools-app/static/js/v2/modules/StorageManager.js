/**
 * Storage Module - Handles IndexedDB and localStorage operations
 */

export class StorageManager {
    constructor() {
        this.db = null;
        this.dbName = 'MLAQuizDB';
        this.dbVersion = 1;
        this.storeName = 'quizImages';
        // Initialize IndexedDB on construction
        this.initIndexedDB().catch(error => {
            console.warn('Failed to initialize IndexedDB:', error);
        });
    }

    /**
     * Initialize IndexedDB for efficient image storage
     */
    async initIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                console.warn('⚠️ IndexedDB not available. Will use localStorage only.');
                resolve(null);
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('✅ IndexedDB initialized');
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const objectStore = db.createObjectStore(this.storeName, { 
                        keyPath: 'id' 
                    });
                    objectStore.createIndex('quizName', 'quizName', { unique: false });
                    objectStore.createIndex('imageKey', 'imageKey', { unique: false });
                    objectStore.createIndex('key', 'key', { unique: false });
                }
            };
        });
    }

    /**
     * Store image in IndexedDB
     */
    async storeImageInDB(quizName, imageKey, imageData) {
        if (!this.db) {
            console.warn('⚠️ IndexedDB not available');
            return false;
        }

        return new Promise((resolve, reject) => {
            try {
                const transaction = this.db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const id = `${quizName}_${imageKey}`;

                const request = store.put({
                    id: id,
                    quizName: quizName,
                    imageKey: imageKey,
                    imageData: imageData,
                    timestamp: Date.now()
                });

                request.onsuccess = () => resolve(true);
                request.onerror = () => {
                    console.error('Error storing image:', request.error);
                    resolve(false);
                };
            } catch (error) {
                console.error('Error in storeImageInDB:', error);
                resolve(false);
            }
        });
    }

    /**
     * Get image from IndexedDB
     */
    async getImageFromDB(quizName, imageKey) {
        if (!this.db) return null;

        return new Promise((resolve, reject) => {
            try {
                const transaction = this.db.transaction([this.storeName], 'readonly');
                const store = transaction.objectStore(this.storeName);
                const id = `${quizName}_${imageKey}`;
                const request = store.get(id);

                request.onsuccess = () => {
                    const result = request.result;
                    resolve(result ? result.imageData : null);
                };

                request.onerror = () => {
                    console.error('Error getting image:', request.error);
                    resolve(null);
                };
            } catch (error) {
                console.error('Error in getImageFromDB:', error);
                resolve(null);
            }
        });
    }

    /**
     * Get all images for a quiz
     */
    async getAllImagesForQuiz(quizName) {
        if (!this.db) return [];

        return new Promise((resolve, reject) => {
            try {
                const transaction = this.db.transaction([this.storeName], 'readonly');
                const store = transaction.objectStore(this.storeName);
                const index = store.index('quizName');
                const request = index.getAll(quizName);

                request.onsuccess = () => {
                    const images = {};
                    request.result.forEach(item => {
                        images[item.imageKey] = item.imageData;
                    });
                    resolve(images);
                };

                request.onerror = () => {
                    console.error('Error getting images:', request.error);
                    resolve([]);
                };
            } catch (error) {
                console.error('Error in getAllImagesForQuiz:', error);
                resolve([]);
            }
        });
    }

    /**
     * Clear all images for a quiz
     */
    async clearQuizImages(quizName) {
        if (!this.db) return false;

        return new Promise((resolve) => {
            try {
                const transaction = this.db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const index = store.index('quizName');
                const request = index.openCursor(IDBKeyRange.only(quizName));

                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        cursor.delete();
                        cursor.continue();
                    } else {
                        resolve(true);
                    }
                };

                request.onerror = () => {
                    console.error('Error clearing images:', request.error);
                    resolve(false);
                };
            } catch (error) {
                console.error('Error in clearQuizImages:', error);
                resolve(false);
            }
        });
    }

    /**
     * LocalStorage helpers with IndexedDB fallback
     */
    async setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.warn(`⚠️ localStorage quota exceeded for key "${key}", falling back to IndexedDB:`, error);
            
            // Try IndexedDB fallback
            try {
                return await this.setItemInDB(key, value);
            } catch (dbError) {
                console.error('❌ Both localStorage and IndexedDB failed:', dbError);
                return false;
            }
        }
    }

    async getItem(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            if (item !== null) {
                // Try to parse as JSON first
                try {
                    return JSON.parse(item);
                } catch (parseError) {
                    // If JSON parsing fails, return as string (for backwards compatibility)
                    console.warn(`localStorage item "${key}" is not valid JSON, returning as string:`, item);
                    return item;
                }
            }
            
            // If not in localStorage, try IndexedDB
            const dbValue = await this.getItemFromDB(key);
            return dbValue !== null ? dbValue : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            
            // Try IndexedDB fallback
            try {
                const dbValue = await this.getItemFromDB(key);
                return dbValue !== null ? dbValue : defaultValue;
            } catch (dbError) {
                console.error('Error reading from IndexedDB:', dbError);
                return defaultValue;
            }
        }
    }

    async removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
        
        // Also remove from IndexedDB
        try {
            await this.removeItemFromDB(key);
        } catch (dbError) {
            console.error('Error removing from IndexedDB:', dbError);
        }
    }

    async clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
        
        // Also clear IndexedDB data
        try {
            await this.clearDB();
        } catch (dbError) {
            console.error('Error clearing IndexedDB:', dbError);
        }
    }

    /**
     * IndexedDB helpers for general key-value storage (fallback for localStorage)
     */
    async setItemInDB(key, value) {
        if (!this.db) {
            // Try to initialize IndexedDB if not already done
            await this.initIndexedDB();
            if (!this.db) {
                throw new Error('IndexedDB not available');
            }
        }

        return new Promise((resolve, reject) => {
            try {
                const transaction = this.db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                
                const request = store.put({
                    id: `kv_${key}`,
                    key: key,
                    value: value,
                    timestamp: Date.now(),
                    type: 'keyvalue'
                });

                request.onsuccess = () => resolve(true);
                request.onerror = () => {
                    console.error('Error storing in IndexedDB:', request.error);
                    reject(request.error);
                };
            } catch (error) {
                console.error('Error in setItemInDB:', error);
                reject(error);
            }
        });
    }

    async getItemFromDB(key) {
        if (!this.db) return null;

        return new Promise((resolve, reject) => {
            try {
                const transaction = this.db.transaction([this.storeName], 'readonly');
                const store = transaction.objectStore(this.storeName);
                const request = store.get(`kv_${key}`);

                request.onsuccess = () => {
                    const result = request.result;
                    resolve(result && result.type === 'keyvalue' ? result.value : null);
                };

                request.onerror = () => {
                    console.error('Error getting from IndexedDB:', request.error);
                    resolve(null);
                };
            } catch (error) {
                console.error('Error in getItemFromDB:', error);
                resolve(null);
            }
        });
    }

    async removeItemFromDB(key) {
        if (!this.db) return false;

        return new Promise((resolve) => {
            try {
                const transaction = this.db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.delete(`kv_${key}`);

                request.onsuccess = () => resolve(true);
                request.onerror = () => {
                    console.error('Error removing from IndexedDB:', request.error);
                    resolve(false);
                };
            } catch (error) {
                console.error('Error in removeItemFromDB:', error);
                resolve(false);
            }
        });
    }

    async clearDB() {
        if (!this.db) return false;

        return new Promise((resolve) => {
            try {
                const transaction = this.db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.clear();

                request.onsuccess = () => resolve(true);
                request.onerror = () => {
                    console.error('Error clearing IndexedDB:', request.error);
                    resolve(false);
                };
            } catch (error) {
                console.error('Error in clearDB:', error);
                resolve(false);
            }
        });
    }
}

// Export singleton instance
export const storage = new StorageManager();
export const storageManager = storage; // Alias for compatibility

