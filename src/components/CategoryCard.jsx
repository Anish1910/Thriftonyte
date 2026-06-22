import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { urlFor } from '../lib/sanity';
import { cardVariants } from '../constants/animations';
import SpotlightCard from './SpotlightCard';

export default function CategoryCard({ category }) {
  const imageUrl = category.image ? urlFor(category.image).width(400).quality(70).auto('format').url() : null;
  // Single matchMedia check — no per-component resize listener
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

  return (
    <motion.div
      variants={cardVariants}
      className="group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <SpotlightCard className="w-full h-full shadow-md hover:shadow-hover transition-all duration-300" spotlightColor="rgba(255, 255, 255, 0.4)" disabled={isMobile}>
        <Link
          to={`/shop?category=${category.slug.current}`}
          className="block overflow-hidden rounded-minimal h-full"
        >
          {/* Image container */}
          <div className="relative h-48 overflow-hidden bg-neutral-warm-beige">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-light">
                <span className="text-sm">No image available</span>
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Category name and description on hover */}
            <div className="absolute inset-0 flex flex-col items-start justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <h3 className="text-lg font-extrabold text-white">{category.name}</h3>
              <p className="text-sm text-white/90 mt-1">{category.description}</p>
            </div>
          </div>

          {/* Category label (always visible) */}
          <div className="p-4 bg-neutral-white transition-colors duration-300 group-hover:bg-neutral-off-white h-full relative z-20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-text-dark uppercase tracking-wide group-hover:text-accent-brown transition-colors duration-300">{category.name}</h3>
                <p className="text-xs text-text-light mt-1">{category.description}</p>
              </div>
              {/* Arrow indicator */}
              <span className="text-text-light group-hover:text-accent-brown transition-all duration-300 transform translate-x-0 group-hover:translate-x-1 opacity-0 group-hover:opacity-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </SpotlightCard>
    </motion.div>
  );
}
