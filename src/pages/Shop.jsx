import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ShopFilters from '../components/ShopFilters';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { products } from '../data/products';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  // Filter products by category if provided
  const filteredProducts = categoryParam
    ? products.filter((p) => p.category.toLowerCase() === categoryParam.toLowerCase())
    : products;

  // Format category name for display (capitalize first letter)
  const displayCategoryName = categoryParam
    ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)
    : null;

  return (
    <main>
      <Hero />

      {/* Filter bar */}
      <ShopFilters />

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
                <p className="text-text-dark font-semibold">
                  Browsing: <span className="text-accent-brown">{displayCategoryName}</span>
                </p>
                <p className="text-sm text-text-light mt-1">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
                </p>
              </div>
              <Link
                to="/shop"
                className="text-accent-brown hover:text-accent-green font-semibold transition-colors duration-300 flex items-center gap-2"
              >
                <span>Clear filter</span>
                <span className="text-lg">✕</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Products grid or empty state */}
      {filteredProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ProductGrid products={filteredProducts} />
        </motion.div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <p className="text-xl text-text-medium mb-6">
              No products found in {displayCategoryName}.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-4 bg-accent-brown text-white font-semibold rounded-minimal hover:bg-accent-green transition-colors duration-300"
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
