import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { urlFor } from '../lib/sanity';
import { cardVariants } from '../constants/animations';

export default function CategoryCard({ category }) {
  const imageUrl = category.image ? urlFor(category.image).url() : null;
  return (
    <motion.div
      variants={cardVariants}
      className="group"
    >
      <Link
        to={`/shop?category=${category.slug.current}`}
        className="block overflow-hidden rounded-minimal shadow-soft hover:shadow-hover transition-shadow duration-300"
      >
        {/* Image container */}
        <div className="relative h-48 overflow-hidden bg-neutral-warm-beige">
          {imageUrl ? (
            <motion.img
              src={imageUrl}
              alt={category.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-light">
              <span className="text-sm">no image available</span>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Category name and description */}
          <div className="absolute inset-0 flex flex-col items-start justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-lg font-semibold text-white">{category.name}</h3>
            <p className="text-sm text-white/90 mt-1">{category.description}</p>
          </div>
        </div>

        {/* Category label (always visible) */}
        <div className="p-4 bg-white">
          <h3 className="text-base font-semibold text-text-dark">{category.name}</h3>
          <p className="text-sm text-text-light mt-1">{category.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
