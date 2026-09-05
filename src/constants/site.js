/**
 * Single source of truth for business contact details.
 *
 * This exists because the product page hardcoded the WhatsApp number without a
 * country code while the footer and cart built it from the full international
 * form — so the primary buy CTA pointed at a number WhatsApp couldn't resolve.
 * Import from here; never retype the number.
 */
export const SITE = {
  name: 'Thriftonyte',
  url: 'https://www.thriftonyte.com',
  // Full international format, with country code. Everything else derives from it.
  whatsappNumber: '+919510381376',
  supportEmail: 'hello@thriftonyte.com',
  instagram: 'thriftonyte',
  currency: 'INR',
};

/** Digits only — the shape wa.me requires. */
export const whatsappDigits = () => SITE.whatsappNumber.replace(/\D/g, '');

/** Build a wa.me deep link with a pre-filled message. */
export const whatsappLink = (message = '') =>
  `https://wa.me/${whatsappDigits()}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
