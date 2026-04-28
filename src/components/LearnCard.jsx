import { memo } from 'react';
import { motion } from 'framer-motion';
import { urlFor } from '../lib/sanity';

function LearnCard({ tip, onClick }) {
  if (!tip) return null;

  const imageUrl = tip?.coverImage
    ? urlFor(tip.coverImage).width(400).quality(70).url()
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="cursor-pointer group"
    >
      <motion.div
        className="bg-neutral-white rounded-lg overflow-hidden shadow-soft hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
        whileHover={{ scale: 1.02 }}
        onClick={onClick}
        transition={{ duration: 0.2 }}
      >
        {/* Image */}
        <div className="relative bg-neutral-off-white h-48 md:h-56 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={tip?.title || 'Tip'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-light">
              No image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex-grow flex flex-col">
          <span className="text-xs font-semibold text-accent-brown uppercase tracking-wider mb-2">
            {tip?.category || 'Uncategorized'}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-text-dark mb-3 line-clamp-2">
            {tip?.title || 'Untitled'}
          </h3>
          <p className="text-sm md:text-base text-text-light line-clamp-2 flex-grow">
            {tip?.short || ''}
          </p>
          <p className="text-xs text-text-light mt-4 font-medium uppercase tracking-wide">
            {tip?.tips?.length || 0} Tips →
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default memo(LearnCard);
