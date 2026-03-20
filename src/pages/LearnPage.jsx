import { useState } from 'react';
import { motion } from 'framer-motion';
import LearnCard from '../components/LearnCard';
import { articles } from '../data/articles';

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(articles.map(a => a.category))];

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <main className="min-h-screen bg-neutral-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-dark mb-6">
            Learn & Explore
          </h1>
          <p className="text-lg md:text-xl text-text-medium max-w-2xl mx-auto">
            Dive deep into thrifting, sustainability, and fashion history with our curated guides and insights.
          </p>
        </motion.div>
      </section>

      {/* Filter Buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-minimal font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-accent-green text-white shadow-soft'
                  : 'bg-neutral-off-white text-text-medium border border-neutral-light-beige hover:border-accent-green'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={selectedCategory}
        >
          {filteredArticles.map(article => (
            <LearnCard key={article.id} article={article} />
          ))}
        </motion.div>

        {filteredArticles.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-text-medium text-lg">No articles found in this category.</p>
          </motion.div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-text-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-neutral-off-white/80 mb-2">
            &copy; 2024 Thriftonyte. All rights reserved.
          </p>
          <p className="text-sm text-neutral-off-white/60">
            Sustainable Fashion Marketplace - Pre-loved, Carefully Curated
          </p>
        </div>
      </footer>
    </main>
  );
}
