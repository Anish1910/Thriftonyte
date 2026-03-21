import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero({ onShopClick }) {
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

      {/* Decorative elements - minimal and subtle */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent-green opacity-3 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-brown opacity-2 rounded-full blur-3xl pointer-events-none"></div>

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
              <motion.button
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={onShopClick}
                className="px-8 py-4 bg-accent-brown text-white font-semibold text-lg rounded-minimal shadow-soft hover:shadow-hover transition-shadow duration-300 hover:bg-accent-green w-fit"
              >
                Shop Now
              </motion.button>

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
            className="relative h-96 md:h-[500px] lg:h-[600px] flex items-center justify-center"
          >
            {/* Fashion hero visual - using emoji/icon composition */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full h-full"
            >
              {/* Main accent shape background */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-warm-beige to-neutral-light-beige rounded-3xl transform -rotate-3 opacity-80"></div>

              {/* Inner content area */}
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl overflow-hidden">
                {/* Large fashion icons */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-9xl filter drop-shadow-lg"
                >
                  👗
                </motion.div>

                {/* Floating accent elements */}
                <motion.div
                  className="absolute top-12 right-12 text-6xl filter drop-shadow-lg"
                  animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  👜
                </motion.div>

                <motion.div
                  className="absolute bottom-16 left-8 text-5xl filter drop-shadow-lg"
                  animate={{ rotate: [0, -12, 12, 0], x: [0, 10, -10, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  👠
                </motion.div>

                {/* Subtle overlay badge */}
                <motion.div
                  className="absolute bottom-8 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-soft"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <p className="text-sm font-semibold text-text-dark">One of One</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Subtle frame effect */}
            <div className="absolute inset-0 rounded-3xl border-2 border-neutral-light-beige pointer-events-none transform -rotate-3"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          className="w-6 h-6 text-accent-brown opacity-60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
