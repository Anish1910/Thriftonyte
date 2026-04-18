import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LearnCard from './LearnCard';

export default function LearnSection({ articles }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Show only first 3 articles on home page
  const featuredArticles = articles.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark mb-4 md:mb-6 uppercase tracking-wide">
          Learn About Thrifting
        </h2>
        <p className="text-text-medium text-base md:text-lg max-w-2xl mx-auto">
          Discover the stories, styles, and sustainability behind pre-loved fashion.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {featuredArticles.map(article => (
          <LearnCard key={article.id} article={article} />
        ))}
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link
          to="/learn"
          className="inline-block px-8 py-3 border-2 border-accent-green text-accent-green font-semibold rounded-minimal hover:bg-accent-green hover:text-white transition-colors duration-300 uppercase tracking-wide text-sm"
        >
          Explore All Articles
        </Link>
      </motion.div>
    </section>
  );
}
