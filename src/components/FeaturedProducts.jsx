import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { containerVariants, fadeInVariants } from '../constants/animations';

export default function FeaturedProducts({ products, limit = 6 }) {
  // Filter products by featured tag
  const featuredProducts = products.filter((p) => p.tags && p.tags.includes('featured'));

  // Fallback: use first 4 products if no featured products
  const displayedProducts = (featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4)).slice(0, limit);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark mb-4 md:mb-6">
          this week's picks
        </h2>
        <p className="text-lg text-text-medium max-w-2xl mx-auto">
          limited pieces. once gone, gone.
        </p>
      </motion.div>

      {/* Products grid */}
      <motion.div
        className="grid grid-cols-2 gap-2 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {displayedProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </motion.div>
    </section>
  );
}
