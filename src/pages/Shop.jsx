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
  const categoryParam = searchParams.get('category');
  const productGridRef = useRef(null);

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

  // Filter products by category if provided
  const filteredProducts = categoryParam
    ? products.filter(
        (p) => p.category?.slug?.current === categoryParam
      )
    : products;

  // Format category name for display (capitalize first letter)
  const displayCategoryName = categoryParam
    ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)
    : null;

  // Smooth scroll to product grid when category changes
  useEffect(() => {
    if (categoryParam && productGridRef.current) {
      setTimeout(() => {
        productGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [categoryParam]);

  return (
    <main>
      <ShopHeader />

      {/* Filter bar with spacing */}
      <div className="mt-8">
        <ShopFilters categories={categories} />
      </div>

      {/* Active category filter UI */}
      {categoryParam && (
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
                  Browsing: <span className="text-accent-brown">{displayCategoryName}</span>
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-text-light mb-6"
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
              No products found in {displayCategoryName}.
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
