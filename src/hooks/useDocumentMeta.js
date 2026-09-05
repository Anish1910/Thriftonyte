import { useEffect } from 'react';

/**
 * Per-route document metadata, with no extra dependency.
 *
 * Googlebot renders JavaScript, so title / description / canonical / JSON-LD
 * set here are picked up for indexing. Note the limit: social crawlers
 * (WhatsApp, Instagram, Facebook) do NOT run JS, so they still read the static
 * tags in index.html. Per-product link previews need prerendering or a bot
 * middleware — that's a separate job, tracked in the audit.
 */
export const SITE_URL = 'https://www.thriftonyte.com';
export const SITE_NAME = 'Thriftonyte';

const DEFAULTS = {
  title: 'Thriftonyte — Curated Pre-Loved Fashion',
  description:
    "One-of-a-kind thrifted pieces, curated hard. No restocks. Once it's gone, it's gone.",
  image: `${SITE_URL}/og-image.jpg`,
};

const JSON_LD_ID = 'route-json-ld';

function upsert(selector, tagName, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tagName);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    document.head.appendChild(el);
  }
  return el;
}

function setMeta(key, attr, content) {
  const el = upsert(`meta[${attr}="${key}"]`, 'meta', { [attr]: key });
  el.setAttribute('content', content);
}

export function useDocumentMeta({
  title,
  description,
  image,
  path,
  jsonLd,
  noindex = false,
} = {}) {
  const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    const fullTitle = !title
      ? DEFAULTS.title
      : title.includes(SITE_NAME)
        ? title
        : `${title} — ${SITE_NAME}`;
    const desc = description || DEFAULTS.description;
    const img = image || DEFAULTS.image;
    const url = `${SITE_URL}${path || window.location.pathname}`;

    document.title = fullTitle;
    setMeta('description', 'name', desc);

    upsert('link[rel="canonical"]', 'link', { rel: 'canonical' }).setAttribute('href', url);

    setMeta('og:title', 'property', fullTitle);
    setMeta('og:description', 'property', desc);
    setMeta('og:image', 'property', img);
    setMeta('og:url', 'property', url);
    setMeta('twitter:title', 'name', fullTitle);
    setMeta('twitter:description', 'name', desc);
    setMeta('twitter:image', 'name', img);

    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) {
      setMeta('robots', 'name', 'noindex, follow');
    } else if (robots) {
      robots.remove();
    }

    const existing = document.getElementById(JSON_LD_ID);
    if (existing) existing.remove();
    if (serializedJsonLd) {
      const script = document.createElement('script');
      script.id = JSON_LD_ID;
      script.type = 'application/ld+json';
      script.textContent = serializedJsonLd;
      document.head.appendChild(script);
    }

    return () => {
      const stale = document.getElementById(JSON_LD_ID);
      if (stale) stale.remove();
    };
  }, [title, description, image, path, serializedJsonLd, noindex]);
}
