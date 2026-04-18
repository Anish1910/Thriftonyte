import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';
import { containerVariants, fadeInVariants } from '../constants/animations';

export default function Categories({ categories }) {
  // Display only first 3-4 categories for curated feel
  const displayedCategories = categories.slice(0, 4);

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
          Explore By Type
        </h2>
        <p className="text-base md:text-lg text-text-medium max-w-2xl mx-auto">
          Curated collections. Everything handpicked.
        </p>
      </motion.div>

      {/* Categories grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {displayedCategories.map((category) => (
          <CategoryCard
            key={category.slug.current}
            category={category}
          />
        ))}
      </motion.div>
    </section>
  );
}
