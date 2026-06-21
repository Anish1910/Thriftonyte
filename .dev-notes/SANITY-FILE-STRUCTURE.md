# Sanity CMS Integration - Complete File Structure

## 📁 Created Files

```
FinalDemo/
├── sanity/
│   ├── schemas/
│   │   ├── product.js              ← Product document schema
│   │   ├── category.js             ← Category document schema
│   │   ├── banner.js               ← Banner document schema
│   │   └── index.js                ← Schema exports
│   └── sanity.json.example         ← Sanity config example
│
├── src/
│   ├── lib/
│   │   └── sanity.js               ← Sanity client & API queries
│   │
│   ├── hooks/
│   │   ├── useProducts.js          ← Fetch products hook
│   │   ├── useCategories.js        ← Fetch categories hook
│   │   └── useBanners.js           ← Fetch banners hook
│   │
│   └── components/
│       ├── ProductCard.jsx         ← UPDATED: hover GIF + sold out
│       ├── ProductGrid.SANITY-EXAMPLE.jsx    ← Reference implementation
│       └── ProductDetailExample.jsx          ← Full product page example
│
├── .env.example                    ← Environment variables template
├── package.json                    ← UPDATED: added Sanity packages
├── SANITY-INTEGRATION.md           ← Detailed setup guide
└── SANITY-QUICK-START.md           ← Quick reference
```

---

## 📋 Schema Fields Summary

### Product Schema
```
├── title (string) *required
├── slug (slug) *required
├── price (number) *required
├── description (string) *required
├── longDescription (text)
├── images (array of images) *required - main product photos
├── hoverGif (image) - displays on hover, optional
├── badge (Curated | New | Limited | Rare)
├── category (reference to Category) *required
├── status (available | sold_out) *required
└── tags (array of strings)
```

### Category Schema
```
├── name (string) *required
├── slug (slug) *required
├── description (string)
└── image (image)
```

### Banner Schema
```
├── title (string) *required
├── subtitle (string)
├── image (image) *required
├── ctaText (string)
├── ctaLink (string)
└── active (boolean) *required - only active banners display
```

---

## 🚀 API Functions Available

All in `src/lib/sanity.js`:

```javascript
// Products
fetchProducts()                    // All available products
fetchProductBySlug(slug)          // Single product by slug
fetchProductsByCategory(slug)     // Products filtered by category

// Categories
fetchCategories()                 // All categories

// Banners
fetchActiveBanners()              // Only active banners

// Image URLs
urlFor(image)                     // Optimize Sanity image URLs
```

---

## 🎣 React Hooks

### useProducts(categorySlug?)
```jsx
const { products, loading, error } = useProducts();
const { products, loading, error } = useProducts('denim'); // by category
```

### useCategories()
```jsx
const { categories, loading, error } = useCategories();
```

### useBanners()
```jsx
const { banners, loading, error } = useBanners();
```

---

## ✨ ProductCard Updates

**New Features:**
- ✅ Hover GIF support - shows image/GIF on hover
- ✅ Fallback to first product image if no hover GIF
- ✅ Sold out status handling
- ✅ Handles Sanity image objects and URLs
- ✅ Dynamic category names
- ✅ Smooth image transitions

**Usage:**
```jsx
import ProductCard from './ProductCard';

<ProductCard product={sanityProduct} />
```

---

## 📝 Key Component Mappings

| Old Data | Sanity Data | Notes |
|----------|-------------|-------|
| `product.image` (emoji) | `product.images[0].asset.url` | URL from Sanity |
| `product.category` (string) | `product.category.name` | Referenced document |
| `product.id` | `product._id` or `slug.current` | Sanity ID |
| *(new feature)* | `product.hoverGif.asset.url` | Hover image/GIF |
| *(new field)* | `product.status` | available/sold_out |

---

## 🔄 Migration Path

### Current → Sanity
1. **ProductGrid.jsx** - Use `ProductGrid.SANITY-EXAMPLE.jsx` as reference
2. **ProductDetail.jsx** - Use `ProductDetailExample.jsx` as reference
3. **Categories.jsx** - Add `useCategories()` hook
4. **Hero.jsx** - Add `useBanners()` hook for dynamic banners

Each component only needs to swap `import { products } from data` with the appropriate hook.

---

## 🔐 Required Environment Variables

```bash
# In .env.local (don't commit!)
VITE_SANITY_PROJECT_ID=your_project_id_from_manage_sanity_io
VITE_SANITY_DATASET=production
```

---

## 📦 Dependencies Added

```json
{
  "@sanity/client": "^6.8.0",
  "@sanity/image-url": "^1.0.2"
}
```

Run `npm install` to get them.

---

## 🎯 Next Actions

1. ✅ Create Sanity project at manage.sanity.io
2. ✅ Copy your Project ID to .env.local
3. ✅ Run `npm install`
4. ✅ Add schemas to Sanity studio
5. ✅ Create products in Sanity
6. ✅ Update components to use hooks (use examples provided)
7. ✅ Deploy!

Example components show proper error handling, loading states, and data transformation for seamless migration.
