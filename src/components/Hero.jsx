import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../data/products';
import { urlFor } from '../lib/sanity';

export default function Hero({ settings }) {
  const defaultImages = products.slice(0, 4).flatMap(p => p.images.slice(0, 1));
  const heroImages = settings?.heroImages?.length > 0 ? settings.heroImages : [];
  const carouselImages = heroImages.length > 0 ? heroImages : defaultImages;

  const heroImageUrls = carouselImages.map(img =>
    typeof img === 'string' ? img : urlFor(img).url()
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (heroImageUrls.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % heroImageUrls.length
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [heroImageUrls.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const headlineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: 'easeOut' }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 1, ease: 'easeOut', delay: 0.3 }
    }
  };

  const buttonHoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.98 }
  };

  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-off-white via-white to-neutral-warm-beige/30 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 min-h-screen flex items-center">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="flex flex-col space-y-4 md:space-y-8">
            <motion.div variants={headlineVariants}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-text-dark leading-tight tracking-tight">
                not fast
                <br />
                <span className="text-accent-brown">fashion.</span>
                <br />
                <span className="text-accent-green">better.</span>
              </h1>
            </motion.div>

            <motion.p
              variants={textVariants}
              className="text-sm md:text-lg lg:text-xl text-text-medium leading-relaxed max-w-md"
            >
              {settings?.heroText || 'curated thrift. effortless style.'}
            </motion.p>

            <motion.p
              variants={textVariants}
              className="text-xs md:text-base text-text-light max-w-md leading-relaxed"
            >
              one of a kind pieces. no restocks. vintage that actually means something.
            </motion.p>

            <motion.div
              variants={textVariants}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4"
            >
              <motion.div
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/shop"
                  className="px-6 py-3 md:px-8 md:py-4 bg-accent-brown text-white font-semibold text-sm md:text-lg rounded-minimal shadow-soft hover:shadow-hover transition-shadow duration-300 hover:bg-accent-green w-fit block"
                >
                  explore pieces
                </Link>
              </motion.div>

              <motion.div
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/about"
                  className="px-6 py-3 md:px-8 md:py-4 border-2 border-text-dark text-text-dark font-semibold text-sm md:text-lg rounded-minimal hover:bg-neutral-warm-beige transition-colors duration-300 w-fit block"
                >
                  why we exist
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={textVariants}
              className="flex items-center gap-2 md:gap-3 pt-4 md:pt-6"
            >
              <div className="flex -space-x-2">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-accent-brown text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                  👗
                </div>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-accent-green text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                  ♻️
                </div>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-accent-brown text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                  ⭐
                </div>
              </div>
              <span className="text-xs md:text-sm text-text-light">1000+ of us know better.</span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={imageVariants}
            className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] overflow-hidden"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-hover">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={heroImageUrls[currentImageIndex]}
                  alt="Curated vintage fashion collection"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>

              <motion.div
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-soft"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <p className="text-sm font-semibold text-text-dark">Curated for You</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
