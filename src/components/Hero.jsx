import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../data/products';

export default function Hero() {
  // Select 3-4 featured products for carousel
  const carouselImages = products.slice(0, 4).flatMap(p => p.images.slice(0, 1));

  // State for current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % carouselImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Container animation - stagger children
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

  // Text fade-in with upward motion
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  // Headline - larger, slower entrance
  const headlineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: 'easeOut' }
    }
  };

  // Image slide and fade from right
  const imageVariants = {
    hidden: { opacity: 0, x: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 1, ease: 'easeOut', delay: 0.3 }
    }
  };

  // Button hover state
  const buttonHoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.98 }
  };

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-off-white via-white to-neutral-warm-beige/30 pointer-events-none"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left: Text Content */}
          <motion.div className="flex flex-col space-y-8">
            {/* Headline */}
            <motion.div variants={headlineVariants}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-text-dark leading-tight tracking-tight">
                not fast
                <br />
                <span className="text-accent-brown">fashion.</span>
                <br />
                <span className="text-accent-green">better.</span>
              </h1>
            </motion.div>

            {/* Subheading - secondary message */}
            <motion.p
              variants={textVariants}
              className="text-lg md:text-xl text-text-medium leading-relaxed max-w-md"
            >
              Curated vintage pieces. One of a kind. Always.
            </motion.p>

            {/* Description - supporting text */}
            <motion.p
              variants={textVariants}
              className="text-base text-text-light max-w-md leading-relaxed"
            >
              Discover hand-selected, pre-loved fashion that tells a story. Quality, conscious, and designed for those who value authenticity over trends.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={textVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              {/* Primary Button */}
              <motion.div
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/shop"
                  className="px-8 py-4 bg-accent-brown text-white font-semibold text-lg rounded-minimal shadow-soft hover:shadow-hover transition-shadow duration-300 hover:bg-accent-green w-fit block"
                >
                  Shop Now
                </Link>
              </motion.div>

              {/* Secondary Link */}
              <motion.div
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/about"
                  className="px-8 py-4 border-2 border-text-dark text-text-dark font-semibold text-lg rounded-minimal hover:bg-neutral-warm-beige transition-colors duration-300 w-fit block"
                >
                  Our Story
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust badge */}
            <motion.div
              variants={textVariants}
              className="flex items-center gap-3 pt-6"
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-accent-brown text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                  👗
                </div>
                <div className="w-8 h-8 rounded-full bg-accent-green text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                  ♻️
                </div>
                <div className="w-8 h-8 rounded-full bg-accent-brown text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                  ⭐
                </div>
              </div>
              <span className="text-sm text-text-light">Join 1000+ conscious shoppers</span>
            </motion.div>
          </motion.div>

          {/* Right: Visual Content */}
          <motion.div
            variants={imageVariants}
            className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden"
          >
            {/* Image container with rounded corners */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-hover">
              {/* Rotating image carousel with fade transition */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={carouselImages[currentImageIndex]}
                  alt="Curated vintage fashion collection"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
              </AnimatePresence>

              {/* Subtle overlay gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>

              {/* Subtle badge or text overlay */}
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
