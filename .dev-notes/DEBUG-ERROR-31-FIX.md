# React Error #31: Object Rendering Fix

## Problem: "Minified React error #31 (object with keys {_ref, _type})"

This error occurs when React tries to render a JavaScript object directly as JSX. For example:

```javascript
// ❌ CAUSES CRASH - rendering an object
const category = { _type: 'reference', _ref: '...' }
return <p>{category}</p>  // ERROR: Can't render object!
```

---

## Root Causes Found & Fixed

### **Issue #1: ProductCard.jsx (Line 33)**

**BEFORE (BROKEN):**
```javascript
const categoryName = product.category?.name || product.category;
// If category doesn't have .name, falls back to rendering the OBJECT
```

**When this crashes:**
- `product.category` is a Sanity reference object: `{ _type: 'reference', _ref: '...' }`
- Or incomplete object without `name` field: `{ _ref: '...' }`
- Fallback renders the object → React error #31

**AFTER (FIXED):**
```javascript
const categoryName = (() => {
  if (!product.category) return '';
  if (typeof product.category === 'string') return product.category;
  if (typeof product.category === 'object' && product.category.name) return product.category.name;
  return '';
})();
// Now safely handles all data types
```

**Renders safely as:** Line 83 `<p>{categoryName}</p>` (always a string)

---

### **Issue #2: Shop.jsx (Line 39)**

**BEFORE (BROKEN):**
```javascript
products.filter((p) => p.category.toLowerCase() === categoryParam.toLowerCase())
// Tries to call .toLowerCase() on an OBJECT - fails!
```

**When this crashes:**
- `p.category` is an object, not a string
- `.toLowerCase()` only works on strings
- Runtime error: "Cannot read property 'toLowerCase' of object"

**AFTER (FIXED):**
```javascript
? products.filter((p) => {
    let categoryName = '';
    if (typeof p.category === 'string') {
      categoryName = p.category;
    } else if (typeof p.category === 'object' && p.category?.name) {
      categoryName = p.category.name;
    }
    return categoryName.toLowerCase() === categoryParam.toLowerCase();
  })
```

**Now safely handles:** Both string and object categories

---

## Debug Logging Added

**Shop.jsx (Lines 23-31):**
```javascript
console.log("🔍 SANITY DATA RECEIVED:", data);
data.forEach((product, idx) => {
  console.log(`Product ${idx}:`, {
    title: product.title,
    category: product.category,
    categoryType: typeof product.category,  // 👈 Check this!
    images: product.images ? product.images.length : 0
  });
});
```

**Check browser console for:**
- `categoryType: "string"` → Safe
- `categoryType: "object"` → These need the fix
- Category structure to identify mixed data

---

## What Was Rendering Objects?

### Scenario 1: Old Data + New Data Mix
```javascript
// Old product (static data)
{ category: 'Denim' }  // ✅ string - safe

// New product (from Sanity)
{ category: { name: 'Denim', slug: { current: 'denim' } } }  // ❌ object

// Fallback in old code:
categoryName = category?.name || category
// If category has no .name (malformed), renders object → CRASH!
```

### Scenario 2: Direct Comparison on Objects
```javascript
// Trying to filter by category string
products.filter(p => p.category.toLowerCase() === 'denim')
// p.category = { _type: 'reference', _ref: '...' }
// Can't call .toLowerCase() on object → CRASH!
```

---

## Why the Fix Works

✅ **Type checking first:**
```javascript
if (typeof product.category === 'string') return product.category;
if (typeof product.category === 'object' && product.category.name) return product.category.name;
```

✅ **Always returns a string** (or empty string):
- No possibility of rendering an object
- Safe to display in JSX
- Comparisons work with `.toLowerCase()`

✅ **Handles all scenarios:**
- Missing category → returns `''`
- String category → returns as-is
- Object category → extracts `.name` safely
- Malformed object → returns `''` (doesn't crash)

---

## Files Modified

1. **src/components/ProductCard.jsx**
   - Fixed: Category name extraction (line 33-42)
   - Now safely handles string and object types

2. **src/pages/Shop.jsx**
   - Added: Debug logging (lines 23-31)
   - Fixed: Category filter logic (lines 38-47)
   - Now safely compares categories regardless of type

---

## Testing Checklist

- [ ] Open browser console (F12)
- [ ] Go to `/shop`
- [ ] Check console for `🔍 SANITY DATA RECEIVED` logs
- [ ] Note the `categoryType` for each product
- [ ] Click category filter → should not crash
- [ ] Product cards render without React error #31
- [ ] All images display correctly

---

## Build Status

✅ Build succeeds with no errors
✅ All 594 modules transformed successfully
