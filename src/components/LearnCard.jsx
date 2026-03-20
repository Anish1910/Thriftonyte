import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LearnCard({ article }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <Link to={`/learn#${article.id}`}>
        <motion.div
          className="bg-neutral-off-white rounded-minimal overflow-hidden shadow-soft cursor-pointer h-full flex flex-col hover:shadow-hover transition-shadow duration-300 group"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          {/* Image/Emoji Area */}
          <div className="h-48 bg-gradient-to-br from-neutral-warm-beige to-neutral-off-white flex items-center justify-center text-5xl overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {article.emoji}
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6 flex flex-col flex-grow">
            <p className="text-xs text-accent-green uppercase tracking-wider font-semibold mb-2">
              {article.category}
            </p>
            <h3 className="text-lg md:text-xl font-semibold text-text-dark mb-3 line-clamp-2 group-hover:text-accent-brown transition-colors">
              {article.title}
            </h3>
            <p className="text-sm text-text-medium line-clamp-3 flex-grow">
              {article.excerpt}
            </p>
            <div className="mt-4 flex items-center text-accent-brown font-medium text-sm group-hover:gap-2 transition-all">
              Read More <span className="ml-1">→</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
