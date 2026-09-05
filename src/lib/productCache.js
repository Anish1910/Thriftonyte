/**
 * Module-level cache for the shop grid.
 *
 * Why this exists: /shop is a lazy route, so leaving it for a product page
 * unmounts it. Without a cache, coming back re-fetches from Sanity and paints
 * an empty grid — the document has no height, so any attempt to restore the
 * scroll position gets clamped to 0 and the user lands at the top.
 *
 * Caching the products means the grid renders at full height synchronously on
 * remount, which is what makes scroll restoration actually possible.
 *
 * This is deliberately in-memory only: it lives for the SPA session and dies on
 * a hard refresh, so nobody sees stale stock after a reload.
 */
const TTL_MS = 5 * 60 * 1000;

let productCache = { data: null, at: 0 };
const scrollPositions = new Map();

export const getCachedProducts = () => productCache.data;

export const setCachedProducts = (data) => {
  productCache = { data, at: Date.now() };
};

export const isCacheFresh = () =>
  Array.isArray(productCache.data) && Date.now() - productCache.at < TTL_MS;

export const invalidateProducts = () => {
  productCache = { data: null, at: 0 };
};

export const saveScroll = (key, y) => scrollPositions.set(key, y);

/**
 * Record where the shopper is *before* navigation starts.
 *
 * This deliberately does not run on unmount. Leaving /shop tears down the grid,
 * the document collapses to the height of the next (still-loading) page, and the
 * browser clamps window.scrollY to that shorter page — so by the time an unmount
 * cleanup runs, the real position is already gone. Measured: 1163px became 65px
 * before cleanup fired. Capturing on the click that starts the navigation is the
 * last moment the number is still true.
 */
export const rememberShopScroll = () => {
  if (typeof window === 'undefined') return;
  if (window.location.pathname !== '/shop') return;
  saveScroll('/shop', window.scrollY);
};
export const readScroll = (key) => (scrollPositions.has(key) ? scrollPositions.get(key) : null);
export const clearScroll = (key) => scrollPositions.delete(key);
