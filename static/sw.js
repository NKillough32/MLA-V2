/**
 * MLA Quiz Service Worker
 * Provides offline functionality and caching for the PWA
 */

const CACHE_NAME = 'mla-quiz-v1';
const STATIC_CACHE = 'mla-quiz-static-v1';
const RUNTIME_CACHE = 'mla-quiz-runtime-v1';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/static/manifest.json',
    '/static/js/v2/main.js',
    '/static/js/v2/modules/QuizManager.js',
    '/static/js/v2/modules/StorageManager.js',
    '/static/js/v2/modules/EventBus.js',
    '/static/js/v2/modules/Constants.js'
    // Icons are inline SVG data URIs, no need to cache external files
    // V2 modules load dynamically, don't pre-cache
    // V1 app.js removed as we're using V2 system
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
    '/api/quizzes',
    '/api/quiz/',
    '/api/quiz/submit'
];

// Quiz data cache for offline access
const QUIZ_CACHE = 'mla-quiz-data-v1';
const OFFLINE_SUBMISSIONS = 'mla-offline-submissions-v1';

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE).then((cache) => {
                console.log('Caching static files');
                // Only cache files that actually exist to avoid 404 errors
                return Promise.allSettled(
                    STATIC_FILES.map(file => 
                        cache.add(file).catch(error => {
                            console.warn(`Failed to cache ${file}:`, error);
                            return null;
                        })
                    )
                );
            }).catch(error => {
                console.warn('Failed to open static cache:', error);
                return null;
            }),
            // Create quiz data and offline submissions caches
            caches.open(QUIZ_CACHE).then(() => console.log('Quiz cache created')),
            caches.open(OFFLINE_SUBMISSIONS).then(() => console.log('Offline submissions cache created'))
        ]).then(() => {
            console.log('Service worker installed successfully');
            return self.skipWaiting();
        }).catch(error => {
            console.error('Service worker installation failed:', error);
            return self.skipWaiting();
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => {
                        return cacheName !== STATIC_CACHE && 
                               cacheName !== RUNTIME_CACHE &&
                               cacheName !== QUIZ_CACHE &&
                               cacheName !== OFFLINE_SUBMISSIONS &&
                               cacheName !== CACHE_NAME;
                    })
                    .map((cacheName) => {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => {
            console.log('Service worker activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Handle static files (CSS, JS, images)
    if (STATIC_FILES.some(file => url.pathname === file) || 
        url.pathname.startsWith('/static/')) {
        
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                return fetch(request).then((response) => {
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(STATIC_CACHE).then((cache) => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                });
            }).catch(() => {
                // Fallback for offline static files
                if (request.destination === 'document') {
                    return caches.match('/');
                }
            })
        );
        return;
    }

    // Handle API requests with network-first strategy for quiz data
    if (url.pathname.startsWith('/api/')) {
        // Special handling for quiz data - cache aggressively for offline access
        if (url.pathname.startsWith('/api/quiz/') && !url.pathname.includes('/submit')) {
            event.respondWith(
                fetch(request)
                    .then((response) => {
                        if (response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(QUIZ_CACHE).then((cache) => {
                                cache.put(request, responseClone);
                                console.log('Cached quiz data:', url.pathname);
                            });
                        }
                        return response;
                    })
                    .catch(() => {
                        // Try cache first for quiz data
                        console.log('Network failed, trying cache for quiz data:', url.pathname);
                        return caches.match(request).then((cachedResponse) => {
                            if (cachedResponse) {
                                console.log('Serving quiz from cache:', url.pathname);
                                return cachedResponse;
                            }
                            
                            // Return offline message for quiz requests
                            return new Response(
                                JSON.stringify({
                                    success: false,
                                    error: 'You are offline and this quiz is not cached. Please connect to the internet to load new quizzes.',
                                    offline: true
                                }),
                                {
                                    status: 503,
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                            );
                        });
                    })
            );
            return;
        }
        
        // Handle quiz submissions - store offline if network fails
        if (url.pathname.includes('/submit')) {
            event.respondWith(
                fetch(request)
                    .then((response) => {
                        // Submission successful, clear any offline submissions for this quiz
                        if (response.status === 200) {
                            clearOfflineSubmission(request);
                        }
                        return response;
                    })
                    .catch(() => {
                        // Network failed - store submission offline
                        console.log('Network failed, storing submission offline');
                        storeOfflineSubmission(request);
                        return new Response(
                            JSON.stringify({
                                success: true,
                                offline: true,
                                message: 'Submission stored offline. It will be synced when you reconnect.'
                            }),
                            {
                                status: 200,
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        );
                    })
            );
            return;
        }
        
        // Other API requests (like quiz list) - cache but allow stale data
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(RUNTIME_CACHE).then((cache) => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    return caches.match(request).then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        
                        return new Response(
                            JSON.stringify({
                                success: false,
                                error: 'You are offline. Please check your connection.',
                                offline: true
                            }),
                            {
                                status: 503,
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        );
                    });
                })
        );
        return;
    }

    // Handle all other requests (mainly the main page)
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            
            return fetch(request).then((response) => {
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(RUNTIME_CACHE).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return response;
            });
        }).catch(() => {
            // Offline fallback
            if (request.destination === 'document') {
                return caches.match('/').then((cachedResponse) => {
                    return cachedResponse || new Response(
                        `<!DOCTYPE html>
                        <html>
                        <head>
                            <title>MLA Quiz - Offline</title>
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                                body {
                                    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                                    text-align: center;
                                    padding: 50px 20px;
                                    background: #f2f2f7;
                                }
                                .offline-message {
                                    background: white;
                                    padding: 40px 20px;
                                    border-radius: 16px;
                                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                                    max-width: 400px;
                                    margin: 0 auto;
                                }
                                h1 { color: #1c1c1e; margin-bottom: 16px; }
                                p { color: #8e8e93; line-height: 1.5; }
                            </style>
                        </head>
                        <body>
                            <div class="offline-message">
                                <h1>You're Offline</h1>
                                <p>Please check your internet connection and try again.</p>
                                <button onclick="location.reload()" style="
                                    background: #007AFF;
                                    color: white;
                                    border: none;
                                    border-radius: 8px;
                                    padding: 12px 24px;
                                    font-size: 16px;
                                    margin-top: 20px;
                                    cursor: pointer;
                                ">Try Again</button>
                            </div>
                        </body>
                        </html>`,
                        {
                            status: 200,
                            headers: {
                                'Content-Type': 'text/html'
                            }
                        }
                    );
                });
            }
        })
    );
});

// Background sync for quiz submissions (if supported)
self.addEventListener('sync', (event) => {
    if (event.tag === 'quiz-submission') {
        event.waitUntil(syncOfflineSubmissions());
    }
});

async function syncOfflineSubmissions() {
    try {
        console.log('Starting offline submission sync');
        const cache = await caches.open(OFFLINE_SUBMISSIONS);
        const keys = await cache.keys();
        
        const syncResults = [];
        
        for (const key of keys) {
            try {
                const response = await cache.match(key);
                if (response) {
                    const submission = await response.json();
                    
                    // Attempt to resubmit
                    const fetchResponse = await fetch(submission.url, {
                        method: submission.method,
                        headers: submission.headers,
                        body: JSON.stringify(submission.data)
                    });
                    
                    if (fetchResponse.ok) {
                        // Success - remove from offline storage
                        await cache.delete(key);
                        syncResults.push({
                            id: submission.id,
                            success: true,
                            quizName: submission.data.quiz_name
                        });
                        console.log('Successfully synced submission:', submission.id);
                    } else {
                        syncResults.push({
                            id: submission.id,
                            success: false,
                            error: fetchResponse.statusText
                        });
                    }
                }
            } catch (error) {
                console.error('Failed to sync submission:', key, error);
                syncResults.push({
                    id: key.url.split('-').pop(),
                    success: false,
                    error: error.message
                });
            }
        }
        
        // Notify clients about sync results
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'OFFLINE_SYNC_COMPLETE',
                results: syncResults
            });
        });
        
        console.log('Offline submission sync complete');
        
    } catch (error) {
        console.error('Offline submission sync failed:', error);
    }
}

async function preloadAllQuizzes() {
    try {
        console.log('Starting quiz preload for offline access');
        
        // First get the list of available quizzes
        const quizListResponse = await fetch('/api/quizzes');
        if (!quizListResponse.ok) {
            throw new Error('Failed to fetch quiz list');
        }
        
        const quizListData = await quizListResponse.json();
        if (!quizListData.success) {
            throw new Error('Invalid quiz list response');
        }
        
        const quizzes = quizListData.quizzes || [];
        console.log(`Found ${quizzes.length} quizzes to preload`);
        
        // Cache the quiz list
        const cache = await caches.open(QUIZ_CACHE);
        await cache.put('/api/quizzes', quizListResponse);
        
        // Preload each quiz
        const preloadPromises = quizzes.map(async (quiz) => {
            try {
                const quizResponse = await fetch(`/api/quiz/${encodeURIComponent(quiz.name)}`);
                if (quizResponse.ok) {
                    const quizData = await quizResponse.json();
                    if (quizData.success) {
                        await cache.put(`/api/quiz/${encodeURIComponent(quiz.name)}`, quizResponse);
                        console.log(`Preloaded quiz: ${quiz.name}`);
                        return { name: quiz.name, success: true };
                    }
                }
                return { name: quiz.name, success: false };
            } catch (error) {
                console.warn(`Failed to preload quiz ${quiz.name}:`, error);
                return { name: quiz.name, success: false };
            }
        });
        
        const results = await Promise.allSettled(preloadPromises);
        const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
        
        console.log(`Quiz preload complete: ${successful}/${quizzes.length} successful`);
        
        // Notify clients
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'QUIZ_PRELOAD_COMPLETE',
                successful: successful,
                total: quizzes.length
            });
        });
        
    } catch (error) {
        console.error('Quiz preload failed:', error);
        
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'QUIZ_PRELOAD_FAILED',
                error: error.message
            });
        });
    }
}

async function getOfflineStatus(event) {
    try {
        const cache = await caches.open(OFFLINE_SUBMISSIONS);
        const keys = await cache.keys();
        
        const quizCache = await caches.open(QUIZ_CACHE);
        const quizKeys = await quizCache.keys();
        
        const status = {
            offlineSubmissions: keys.length,
            cachedQuizzes: quizKeys.length,
            isOnline: navigator.onLine
        };
        
        event.ports[0].postMessage(status);
    } catch (error) {
        console.error('Failed to get offline status:', error);
        event.ports[0].postMessage({ error: error.message });
    }
}

// Push notifications (for future features)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New quiz available!',
        icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiByeD0iMzAiIGZpbGw9IiMwMDdBRkYiLz4KPHBhdGggZD0iTTQ4IDEzNlYxMjBIMTQ0VjEzNkg0OFpNNDggOTZWODBIMTQ0Vjk2SDQ4Wk00OCA1NlY0MEgxNDRWNTZINDhaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
        badge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjcyIiBoZWlnaHQ9IjcyIiByeD0iMTIiIGZpbGw9IiMwMDdBRkYiLz4KPHBhdGggZD0iTTE4IDQ0VjM4SDU0VjQ0SDE4Wk0xOCAzNFYyOEg1NFYzNEgxOFpNMTggMjRWMThINTRWMjRIMThaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Take Quiz',
                icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiByeD0iMTYiIGZpbGw9IiMwMDdBRkYiLz4KPHBhdGggZD0iTTI0IDU4VjUwSDcyVjU4SDI0Wk0yNCA0MlYzNEg3MlY0MkgyNFpNMjQgMjZWMThINzJWMjZIMjRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K'
            },
            {
                action: 'close',
                title: 'Close',
                icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjcyIiBoZWlnaHQ9IjcyIiByeD0iMTIiIGZpbGw9IiM4ZThlOTMiLz4KPHBhdGggZD0iTTIyLjUgMjIuNUw0OS41IDQ5LjVNNDkuNSAyMi41TDIyLjUgNDkuNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=='
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('MLA Quiz', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling for cache updates and offline operations
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_UPDATE') {
        event.waitUntil(updateCaches());
    }
    
    if (event.data && event.data.type === 'PRELOAD_QUIZZES') {
        event.waitUntil(preloadAllQuizzes());
    }
    
    if (event.data && event.data.type === 'GET_OFFLINE_STATUS') {
        event.waitUntil(getOfflineStatus(event));
    }
});

async function updateCaches() {
    try {
        const cache = await caches.open(STATIC_CACHE);
        await cache.addAll(STATIC_FILES);
        console.log('Cache updated successfully');
    } catch (error) {
        console.error('Cache update failed:', error);
    }
}

async function storeOfflineSubmission(request) {
    try {
        const submissionData = await request.clone().json();
        const submissionId = `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const submission = {
            id: submissionId,
            url: request.url,
            method: request.method,
            headers: Object.fromEntries(request.headers.entries()),
            data: submissionData,
            timestamp: Date.now()
        };
        
        const cache = await caches.open(OFFLINE_SUBMISSIONS);
        const response = new Response(JSON.stringify(submission));
        await cache.put(`offline-submission-${submissionId}`, response);
        
        console.log('Stored offline submission:', submissionId);
        
        // Notify clients about offline submission
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'OFFLINE_SUBMISSION_STORED',
                submissionId: submissionId
            });
        });
        
    } catch (error) {
        console.error('Failed to store offline submission:', error);
    }
}

async function clearOfflineSubmission(request) {
    try {
        // Extract quiz name from submission data to clear related offline submissions
        const submissionData = await request.clone().json();
        const quizName = submissionData.quiz_name;
        
        if (quizName) {
            const cache = await caches.open(OFFLINE_SUBMISSIONS);
            const keys = await cache.keys();
            
            for (const key of keys) {
                try {
                    const response = await cache.match(key);
                    if (response) {
                        const submission = await response.json();
                        if (submission.data && submission.data.quiz_name === quizName) {
                            await cache.delete(key);
                            console.log('Cleared offline submission for quiz:', quizName);
                        }
                    }
                } catch (error) {
                    console.warn('Error checking submission for cleanup:', error);
                }
            }
        }
    } catch (error) {
        console.warn('Failed to clear offline submissions:', error);
    }
}