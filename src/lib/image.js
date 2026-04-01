import { urlFor } from './sanity';

/**
 * Safe image handler that supports both Sanity image objects and string URLs
 * Prevents crashes from mixed image data types
 *
 * @param {object|string|undefined} img - Image input
 * @returns {string} - Safe URL string or empty string
 *
 * Examples:
 * - getImage(sanityImageObject) -> uses urlFor()
 * - getImage('https://example.com/image.jpg') -> returns URL directly
 * - getImage('IMG_1829.PNG') -> returns filename directly
 * - getImage(undefined) -> returns ''
 */
export const getImage = (img) => {
  // Handle undefined or null
  if (!img) return '';

  // Handle Sanity image objects (with asset reference)
  if (typeof img === 'object' && img.asset) {
    try {
      return urlFor(img).url();
    } catch (error) {
      console.warn('Failed to process Sanity image:', img, error);
      return '';
    }
  }

  // Handle string URLs or filenames
  if (typeof img === 'string') {
    return img;
  }

  // Fallback for unknown types
  return '';
};
