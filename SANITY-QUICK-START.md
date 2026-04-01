# Sanity CMS Configuration - Quick Reference

## Files Created

### Schema Files
- `sanity/schemas/product.js` - Product document schema
- `sanity/schemas/category.js` - Category document schema
- `sanity/schemas/banner.js` - Banner document schema
- `sanity/schemas/index.js` - Schema exports

### React Files
- `src/lib/sanity.js` - Sanity client & API queries
- `src/hooks/useProducts.js` - Hook for product data
- `src/hooks/useCategories.js` - Hook for category data
- `src/hooks/useBanners.js` - Hook for banner data
- `src/components/ProductCard.jsx` - Updated with hover GIF support
- `src/components/ProductGrid.SANITY-EXAMPLE.jsx` - Example using hooks
- `src/components/ProductDetailExample.jsx` - Product detail page example

### Config Files
- `package.json` - Added @sanity/client & @sanity/image-url
- `.env.example` - Environment variables template

---

## Environment Variables Required

```
VITE_SANITY_PROJECT_ID=<your-project-id>
VITE_SANITY_DATASET=production
```

Get these from:
1. https://manage.sanity.io
2. Select your project
3. Settings → API

---

## Product Data Structure (from Sanity)

```javascript
{
  _id: "string",
  title: "string",
  slug: { current: "string" },
  price: number,
  description: "string",
  longDescription: "string",
  images: [
    { asset: { url: "string" } }
  ],
  hoverGif: { asset: { url: "string" } }, // optional
  badge: "Curated | New | Limited | Rare",
  category: { name: "string", slug: { current: "string" } },
  status: "available | sold_out",
  tags: ["string"]
}
```

---

## ProductCard Component Features

✅ Hover GIF support (with fallback to main image)
✅ Sold out status handling
✅ Badge display
✅ Dynamic category name
✅ Price formatting
✅ Responsive image handling
✅ Framer Motion animations

---

## Next Steps

1. Install Sanity CLI and create project
2. Add schemas to your Sanity studio
3. Set environment variables
4. Run `npm install`
5. Update components to use hooks
6. Start adding products in Sanity studio!
