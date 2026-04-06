import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { urlFor } from '../lib/sanity';
import { fadeInVariants } from '../constants/animations';

export default function BrandSection({ sections }) {
  const navigate = useNavigate();

  const brandSections = sections || [];

  if (!brandSections?.length) return null;

  const handleImageClick = (link) => {
    if (link?.startsWith('/')) {
      navigate(link);
    } else if (link) {
      window.location.href = link;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {brandSections.map((item, index) => {
            const imageUrl = item?.image ? urlFor(item.image).url() : null;

            if (!imageUrl) return null;

            return (
              <motion.div
                key={item._key || index}
                className={`relative overflow-hidden rounded-lg group cursor-pointer ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={() => handleImageClick(item?.link)}
              >
                <div
                  className={`${
                    index === 0 ? 'aspect-video' : 'aspect-square'
                  } relative bg-neutral-warm-beige/10`}
                >
                  <img
                    src={imageUrl}
                    alt={item?.text || 'brand section image'}
                    className="w-full h-full object-cover"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-15 transition-opacity duration-300" />

                  {/* Text Overlay - Bottom Left with Subtle Gradient */}
                  {item?.text && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 md:p-6">
                      <p className="text-lg md:text-xl font-bold text-white lowercase">
                        {item.text}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
