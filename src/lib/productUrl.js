/**
 * Single source of truth for product URLs.
 *
 * Products are routed by slug (readable, keyword-bearing, stable in search
 * results). We fall back to the Sanity _id so a product whose slug hasn't been
 * filled in yet is still reachable — and so old /product/<uuid> links that are
 * already in the wild keep resolving.
 */
export const productSlug = (product) => {
  if (!product) return null;
  if (typeof product.slug === 'string') return product.slug;
  return product.slug?.current || null;
};

export const productPath = (product) =>
  `/product/${productSlug(product) || product?._id || product?.id || ''}`;
