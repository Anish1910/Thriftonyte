import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'ac8qp2rd';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

// PRODUCT QUERIES
export const fetchProducts = async () => {
  const query = `*[_type == "product" && status == "available"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    description,
    longDescription,
    images[] { asset -> { url } },
    hoverGif { asset -> { url } },
    badge,
    category -> { name, slug },
    status,
    tags
  }`;

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductBySlug = async (slug) => {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    price,
    description,
    longDescription,
    images[] { asset -> { url } },
    hoverGif { asset -> { url } },
    badge,
    category -> { name, slug },
    status,
    tags
  }`;

  try {
    const product = await client.fetch(query);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const fetchProductsByCategory = async (categorySlug) => {
  const query = `*[_type == "product" && category->slug.current == "${categorySlug}" && status == "available"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    description,
    longDescription,
    images[] { asset -> { url } },
    hoverGif { asset -> { url } },
    badge,
    category -> { name, slug },
    status,
    tags
  }`;

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

// CATEGORY QUERIES
export const fetchCategories = async () => {
  const query = `*[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    image { asset -> { url } }
  }`;

  try {
    const categories = await client.fetch(query);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// BANNER QUERIES
export const fetchActiveBanners = async () => {
  const query = `*[_type == "banner" && active == true] | order(_createdAt desc) {
    _id,
    title,
    subtitle,
    image { asset -> { url } },
    ctaText,
    ctaLink,
    active
  }`;

  try {
    const banners = await client.fetch(query);
    return banners;
  } catch (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
};
