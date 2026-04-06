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
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 md:py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
      >
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {brandSections.map((item, index) => {
            const imageUrl = item?.image ? urlFor(item.image).url() : null;

            if (!imageUrl) return null;

            return (
              <motion.div
                key={item._key || index}
                className={`relative overflow-hidden rounded-lg cursor-pointer group ${
                  index === 0 ? 'col-span-2' : ''
                }`}
                onClick={() => handleImageClick(item?.link)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`${
                    index === 0 ? 'aspect-video' : 'aspect-square'
                  } relative bg-neutral-warm-beige/10 overflow-hidden`}
                >
                  <img
                    src={imageUrl}
                    alt={item?.text || 'brand section image'}
                    className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
                  />

                  {/* Hover overlay tint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                  {/* Text Overlay - Bottom Left with Subtle Gradient */}
                  {item?.text && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 md:p-6">
                      <p className="text-sm md:text-lg font-bold text-white lowercase group-hover:underline underline-offset-4 decoration-1">
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
