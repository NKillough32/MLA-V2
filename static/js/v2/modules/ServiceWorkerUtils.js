/**
 * Service worker helper utilities.
 * Provides a versioned service worker URL so clients pick up new builds.
 */

/**
 * Resolve the service worker URL with a version token derived from the asset manifest.
 * This forces the browser to re-install the worker whenever hashed assets change.
 *
 * @param {string} [baseUrl='/static/sw.js']
 * @returns {Promise<string>} Service worker URL with cache-busting query string when available.
 */
export async function resolveServiceWorkerUrl(baseUrl = '/static/sw.js') {
    const swUrl = baseUrl || '/static/sw.js';

    try {
        const response = await fetch('/api/asset-manifest', { cache: 'no-store' });
        if (!response || !response.ok) {
            return swUrl;
        }

        const manifest = await response.json();
        if (!manifest || typeof manifest !== 'object') {
            return swUrl;
        }

        const hashedMain = manifest['/static/js/v2/main.js'];
        const tokenSource = (typeof hashedMain === 'string' && hashedMain.trim())
            ? hashedMain.trim()
            : JSON.stringify(manifest);

        if (!tokenSource) {
            return swUrl;
        }

        const versionToken = encodeURIComponent((tokenSource.split('/').pop() || tokenSource).trim());
        return `${swUrl}?v=${versionToken}`;
    } catch (error) {
        console.warn('Failed to resolve versioned service worker URL; using default.', error);
        return swUrl;
    }
}
