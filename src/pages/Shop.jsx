import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import ShopHeader from '../components/ShopHeader';
import ShopFilters from '../components/ShopFilters';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { client } from '../lib/sanity';


export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParams = searchParams.getAll('category');
  const genderParam = searchParams.get('gender');
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

  // Fetch all products on mount
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "product"]{
        ...,
        category->{
          name,
          slug
        }
      }`)
      .then((data) => {
        setProducts(data);
      })
      .catch(console.error);
  }, []);

  // Filter products by category and gender
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

  const hasActiveFilter = categoryParams.length > 0 || genderParam;

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
  const displayFilterName = activeFilterParts.join(' · ');

  const serializedCategories = categoryParams.join(',');
  // Smooth scroll to product grid when filter changes
  useEffect(() => {
    if (hasActiveFilter && productGridRef.current) {
      setTimeout(() => {
        productGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [serializedCategories, genderParam]);

  return (
    <main>
      <ShopHeader settings={shopSettings} />

      {/* Filter bar with spacing */}
      <div className="shop-filter-wrapper mt-2 md:mt-3">
        <ShopFilters categories={categories} />
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

      {/* Products grid or empty state */}
      {filteredProducts.length > 0 ? (
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
