import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { useRef, useEffect, useLayoutEffect, useState } from 'react';
import ShopHeader from '../components/ShopHeader';
import ShopFilters from '../components/ShopFilters';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { ProductGridSkeleton } from '../components/Skeletons';
import { client } from '../lib/sanity';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  getCachedProducts,
  setCachedProducts,
  isCacheFresh,
  readScroll,
} from '../lib/productCache';


export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParams = searchParams.getAll('category');
  const genderParam = searchParams.get('gender');
  const badgeParams = searchParams.getAll('badge');
  const productGridRef = useRef(null);

  // Fetch shop settings (title, subtitle, background)
  const [shopSettings, setShopSettings] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "shopSettings"][0]{
        title,
        subtitle,
        backgroundImage { asset -> { url } },
        backgroundVideo { asset -> { url } }
      }`)
      .then(setShopSettings)
      .catch(console.error);
  }, []);

  // Fetch categories for filter
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "category"]{ name, slug }`)
      .then(setCategories)
      .catch(console.error);
  }, []);

  // Products — seeded from the in-memory cache so returning from a product page
  // paints the full grid synchronously. That matters for more than speed: the
  // grid has to have its real height before we can restore the scroll offset.
  const [products, setProducts] = useState(() => getCachedProducts() || []);
  const [loading, setLoading] = useState(() => !isCacheFresh());
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (isCacheFresh()) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    client
      // Only the fields the grid and filters actually read — the old `...`
      // spread pulled every field of every product, longDescription included.
      .fetch(`*[_type == "product"] | order(status asc, _createdAt desc) {
        _id,
        title,
        slug,
        price,
        status,
        gender,
        "images": images[0...2],
        hoverGif,
        badges[]->{ name },
        category->{ name, slug }
      }`)
      .then((data) => {
        if (cancelled) return;
        const list = data || [];
        setProducts(list);
        setCachedProducts(list);
        setLoadError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load products:', err);
        setLoadError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  // The position itself is captured by ProductCard on click (see
  // lib/productCache.js for why it can't be done on unmount). Here we only put
  // the shopper back. App.jsx clears the value for any other arrival at /shop.
  useLayoutEffect(() => {
    if (loading) return;
    const y = readScroll('/shop');
    if (y != null && y > 0) window.scrollTo({ top: y, left: 0, behavior: 'instant' });
  }, [loading]);

  // Derive unique badge names from fetched products
  const uniqueBadges = [...new Set(products.flatMap(p => p.badges?.map(b => b.name) || []).filter(Boolean))].sort();

  // Filter products by category, gender, and badge
  let filteredProducts = products;

  if (categoryParams.length > 0) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category?.slug?.current && categoryParams.includes(p.category.slug.current)
    );
  }

  if (genderParam) {
    filteredProducts = filteredProducts.filter(
      (p) => p.gender === genderParam || p.gender === 'unisex'
    );
  }

  if (badgeParams.length > 0) {
    filteredProducts = filteredProducts.filter(
      (p) => p.badges && p.badges.some(b => badgeParams.includes(b.name))
    );
  }

  const hasActiveFilter = categoryParams.length > 0 || genderParam || badgeParams.length > 0;

  // A single-category view is a genuine landing page ("vintage cargos") and is
  // listed in the sitemap, so it gets its own title and canonical. Every other
  // combination of filters is a near-duplicate of /shop and points its canonical
  // back there, so the variants don't compete with each other in the index.
  const isSingleCategoryView =
    categoryParams.length === 1 && !genderParam && badgeParams.length === 0;

  const soleCategoryName = isSingleCategoryView
    ? categories.find((c) => c.slug?.current === categoryParams[0])?.name ||
      categoryParams[0].replace(/-/g, ' ')
    : null;

  useDocumentMeta({
    title: soleCategoryName
      ? `${soleCategoryName.charAt(0).toUpperCase()}${soleCategoryName.slice(1)}`
      : 'Shop all pieces',
    description: soleCategoryName
      ? `Pre-loved and vintage ${soleCategoryName.toLowerCase()} at Thriftonyte. Every piece is one of one — no restocks.`
      : 'Every piece currently available at Thriftonyte — one-of-a-kind vintage and pre-loved fashion. No restocks.',
    path: isSingleCategoryView
      ? `/shop?category=${encodeURIComponent(categoryParams[0])}`
      : '/shop',
  });

  // Format active filter labels
  const activeFilterParts = [];
  if (genderParam) {
    activeFilterParts.push(genderParam.charAt(0).toUpperCase() + genderParam.slice(1));
  }
  if (categoryParams.length > 0) {
    const categoryNames = categoryParams.map(slug => {
      const catObj = categories.find(c => c.slug?.current === slug);
      return catObj ? catObj.name : slug.charAt(0).toUpperCase() + slug.slice(1);
    });
    activeFilterParts.push(categoryNames.join(', '));
  }
  if (badgeParams.length > 0) {
    activeFilterParts.push(badgeParams.join(', '));
  }
  const displayFilterName = activeFilterParts.join(' · ');

  // Smooth scroll to product grid when filter changes
  const categoryKey = categoryParams.join(',');
  const badgeKey = badgeParams.join(',');
  const skipFilterScrollRef = useRef(true);
  useEffect(() => {
    // Skip the first run: on mount we're either arriving fresh (already at top)
    // or returning from a product (restoring a saved offset). Only a real filter
    // change should pull the page down to the grid.
    if (skipFilterScrollRef.current) {
      skipFilterScrollRef.current = false;
      return;
    }
    if (hasActiveFilter && productGridRef.current) {
      const t = setTimeout(() => {
        productGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryKey, genderParam, badgeKey]);

  return (
    <main>
      <ShopHeader settings={shopSettings} />

      {/* Filter bar with spacing */}
      <div className="shop-filter-wrapper mt-2 md:mt-3">
        <ShopFilters categories={categories} badges={uniqueBadges} />
      </div>

      {/* Active filter UI */}
      {hasActiveFilter && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-neutral-warm-beige/40 border-b border-neutral-warm-beige"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-dark font-semibold text-sm">
                  Browsing: <span className="text-accent-brown">{displayFilterName}</span>
                </p>
                <p className="text-xs text-text-light mt-1">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
                </p>
              </div>
              <Link
                to="/shop"
                className="text-accent-brown hover:text-accent-green font-semibold transition-colors duration-300 flex items-center gap-2 text-sm uppercase tracking-wide"
              >
                <span>Clear Filter</span>
                <span className="text-lg">✕</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Loading first — otherwise the empty state paints for ~400ms on every
          visit and reads as "this store has nothing in it". */}
      {loading ? (
        <ProductGridSkeleton count={6} />
      ) : loadError ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <p className="text-xl text-text-medium mb-2">We couldn't load the pieces just now.</p>
            <p className="text-sm text-text-light mb-6">
              This is on us, not your connection. Try again in a moment.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-block px-8 py-4 bg-accent-brown text-white font-semibold rounded-minimal hover:bg-accent-green transition-colors duration-300 uppercase tracking-wide text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <motion.div
          ref={productGridRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Microcopy above product grid */}
          <div className="shop-grid-top max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-12">
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm text-text-light italic tracking-wide border-l-2 border-accent-brown/40 pl-3 mb-0"
            >
              Limited pieces. Once gone, gone.
            </motion.p>
          </div>

          {/* Product grid without heading */}
          <ProductGrid products={filteredProducts} showHeading={false} />
        </motion.div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <p className="text-xl text-text-medium mb-6">
              No products found{displayFilterName ? ` for ${displayFilterName}` : ''}.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-4 bg-accent-brown text-white font-semibold rounded-minimal hover:bg-accent-green transition-colors duration-300 uppercase tracking-wide text-sm"
            >
              View All Products
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
