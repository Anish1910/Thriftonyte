# Sanity CMS Integration Guide

## Setup Steps

### 1. Create Sanity Project
```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Create a new Sanity project
sanity init

# Follow the prompts - select React/Next.js when asked
# Choose your project name and dataset
```

### 2. Get Your Credentials
After creating the Sanity project:
- Go to https://manage.sanity.io
- Select your project
- Click "Settings" → "API" → "Tokens"
- Create a new token with "Viewer" permissions
- Copy your Project ID from the project settings

### 3. Configure Environment Variables
Create a `.env.local` file in your project root:
```
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Deploy Sanity Schemas
Copy the schema files from `sanity/schemas/` to your Sanity project studio directory, or use the Sanity CLI:
```bash
cd path-to-sanity-studio
npm install
sanity deploy
```

---

## Schema Overview

### Product Schema
- **title** (string, required) - Product name
- **slug** (slug, required) - URL-friendly identifier
- **price** (number, required) - Product price in rupees
- **description** (string, required) - Short description (max 200 chars)
- **longDescription** (text) - Detailed product description
- **images** (array, required) - Main product images
- **hoverGif** (image, optional) - Image/GIF that displays on hover
- **badge** (string) - Curated, New, Limited, or Rare
- **category** (reference) - Link to Category document
- **status** (string) - "available" or "sold_out"
- **tags** (array) - Searchable tags

### Category Schema
- **name** (string, required) - Category name
- **slug** (slug, required) - URL-friendly identifier
- **description** (string) - Category description
- **image** (image) - Category display image

### Banner Schema
- **title** (string, required) - Banner headline
- **subtitle** (string) - Secondary text
- **image** (image, required) - Banner background image
- **ctaText** (string) - Call-to-action button text
- **ctaLink** (string) - Link destination (e.g., /shop)
- **active** (boolean) - Toggle visibility

---

## React Integration

### Using the Hooks

#### Fetch All Products
```jsx
import { useProducts } from '../hooks/useProducts';

export default function Shop() {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

#### Fetch Products by Category
```jsx
import { useProducts } from '../hooks/useProducts';

export default function CategoryShop({ categorySlug }) {
  const { products, loading, error } = useProducts(categorySlug);
  // ... same as above
}
```

#### Fetch Categories
```jsx
import { useCategories } from '../hooks/useCategories';

export default function Categories() {
  const { categories, loading, error } = useCategories();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {categories.map(cat => (
        <CategoryCard key={cat._id} category={cat} />
      ))}
    </div>
  );
}
```

#### Fetch Banners
```jsx
import { useBanners } from '../hooks/useBanners';

export default function Hero() {
  const { banners, loading } = useBanners();

  if (loading || banners.length === 0) return null;

  return (
    <div>
      {banners.map(banner => (
        <Banner key={banner._id} banner={banner} />
      ))}
    </div>
  );
}
```

---

## ProductCard Hover GIF Feature

The updated ProductCard automatically handles hover GIF display:

```jsx
import ProductCard from './ProductCard';

// ProductCard now accepts Sanity product data with:
// - product.images (array of Sanity image objects)
// - product.hoverGif (optional Sanity image object)
// - product.status (available/sold_out)
// - product.category (object with name field)

<ProductCard product={sanityProduct} />
```

**Hover GIF Support:**
- If `hoverGif` is provided, it displays on hover
- Falls back to first product image if no hover GIF
- Works with both Sanity URLs and local image paths
- Smooth fade transition between images

---

## Using Sanity Image URLs

The `sanity.js` file exports `urlFor()` for image optimization:

```jsx
import { urlFor } from '../lib/sanity';

// In your component
<img
  src={urlFor(product.images[0]).width(400).url()}
  alt="Product"
/>
```

---

## API Query Structure

All queries are in `src/lib/sanity.js`:
- `fetchProducts()` - Get all available products
- `fetchProductBySlug(slug)` - Get single product by slug
- `fetchProductsByCategory(categorySlug)` - Filter by category
- `fetchCategories()` - Get all categories
- `fetchActiveBanners()` - Get active banners only

Customize queries in `sanity.js` to add filters or sorting.

---

## Example Integration Path

1. **Update ProductGrid** - Replace `src/components/ProductGrid.jsx` with logic from `ProductGrid.SANITY-EXAMPLE.jsx`
2. **Update ProductDetail** - Use `ProductDetailExample.jsx` as reference
3. **Test with Sanity Studio** - Create/edit products in your Sanity studio
4. **Deploy** - Push to production with environment variables set

---

## Troubleshooting

**Products not loading?**
- Check VITE_SANITY_PROJECT_ID in .env.local
- Verify token has "Viewer" permissions
- Check browser console for CORS errors

**Images not showing?**
- Ensure images are uploaded to Sanity (not just local files)
- Check image asset URLs are valid
- Use `urlFor()` for optimized URLs

**Sold out button not working?**
- Verify `status` field in Sanity is set to "sold_out"
- Check ProductCard component receives status correctly

---
