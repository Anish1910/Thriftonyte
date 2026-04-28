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
    }, 5000);

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

  // Shared image carousel JSX (used in both mobile and desktop positions)
  const imageCarousel = (
    <div className="relative w-full h-full rounded-xl sm:rounded-3xl overflow-hidden shadow-hover bg-neutral-dark">
      <AnimatePresence>
        <motion.img
          key={currentImageIndex}
          src={heroImageUrls[currentImageIndex]}
          alt="Curated vintage fashion collection"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10"></div>

      <motion.div
        className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 bg-neutral-white/95 backdrop-blur-md px-2 py-1 sm:px-4 sm:py-2 rounded-lg shadow-soft hidden sm:block z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <p className="text-xs font-semibold text-text-dark uppercase tracking-wider">Curated For You</p>
      </motion.div>
    </div>
  );

  return (
    <section className="relative w-full bg-neutral-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-off-white via-white to-neutral-warm-beige/30 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 md:py-16 md:min-h-screen flex items-start md:items-center">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 lg:gap-16 items-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-text-content flex flex-col space-y-2 sm:space-y-4 md:space-y-8">
            <motion.div variants={headlineVariants}>
              <h1 className="text-[2rem] sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-text-dark leading-[1] tracking-wide uppercase">
                Not Fast
                <br />
                <span className="text-accent-brown">Fashion.</span>
                <br />
                <span className="text-accent-green">Better.</span>
              </h1>
            </motion.div>

            <motion.p
              variants={textVariants}
              className="text-[11px] sm:text-sm md:text-lg lg:text-xl text-text-medium leading-relaxed max-w-md"
            >
              {settings?.heroText || 'Curated thrift. Effortless style.'}
            </motion.p>

            <motion.p
              variants={textVariants}
              className="text-[10px] sm:text-xs md:text-base text-text-light max-w-md leading-relaxed"
            >
              One of a kind pieces. No restocks. Vintage that actually means something.
            </motion.p>

            <motion.div
              variants={textVariants}
              className="flex flex-row gap-2 sm:gap-3 md:gap-4 pt-1 md:pt-4"
            >
              <motion.div
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/shop"
                  className="px-3 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-accent-brown text-white font-semibold text-[10px] sm:text-sm md:text-base tracking-wide rounded-minimal shadow-soft hover:shadow-hover transition-shadow duration-300 hover:bg-accent-green w-fit block uppercase"
                >
                  Explore Pieces
                </Link>
              </motion.div>

              <motion.div
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/about"
                  className="px-3 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 border-2 border-text-dark text-text-dark font-semibold text-[10px] sm:text-sm md:text-base tracking-wide rounded-minimal hover:bg-neutral-warm-beige transition-colors duration-300 w-fit block"
                >
                  Why We Exist
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={textVariants}
              className="flex items-center gap-1 sm:gap-2 md:gap-3 pt-2 md:pt-6"
            >
              <div className="flex -space-x-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-accent-brown text-white flex items-center justify-center text-[10px] sm:text-xs font-bold border-2 border-white">
                  👗
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-accent-green text-white flex items-center justify-center text-[10px] sm:text-xs font-bold border-2 border-white">
                  ♻️
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-accent-brown text-white flex items-center justify-center text-[10px] sm:text-xs font-bold border-2 border-white">
                  ⭐
                </div>
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm text-text-light">1000+ of us know better.</span>
            </motion.div>
          </motion.div>

          {/* Desktop image — hidden on mobile */}
          <motion.div
            variants={imageVariants}
            className="relative h-96 lg:h-[500px] xl:h-[600px] overflow-hidden hidden md:block"
          >
            {imageCarousel}
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile image — shown only below md, positioned after hero text as a standalone block */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-3 sm:mx-6 mb-2 h-72 sm:h-80 overflow-hidden rounded-2xl shadow-soft md:hidden"
      >
        {imageCarousel}
      </motion.div>
    </section>
  );
}
