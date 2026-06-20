import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { containerVariants, fadeInVariants } from '../constants/animations';

export default function FeaturedProducts({ products, limit = 6 }) {
  // Products are already curated via homepageSettings.featuredProducts in Sanity
  const displayedProducts = products.slice(0, limit);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-24">
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark mb-4 md:mb-6 uppercase tracking-wide">
          This Week's Picks
        </h2>
        <p className="text-base md:text-lg text-text-medium max-w-2xl mx-auto">
          Limited pieces. Once gone, gone.
        </p>
      </motion.div>

      {/* Products grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4 md:gap-x-6 md:gap-y-8 lg:gap-y-10"
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
