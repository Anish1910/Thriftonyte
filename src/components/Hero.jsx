import { motion } from 'framer-motion';

export default function Hero({ onShopClick }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-neutral-off-white via-neutral-white to-neutral-warm-beige flex items-center justify-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-accent-green opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-5 w-72 h-72 bg-accent-brown opacity-5 rounded-full blur-3xl"></div>

      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-text-dark mb-6 md:mb-8 tracking-tight"
        >
          curated thrift.<br />
          <span className="text-accent-brown">effortless style.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-text-medium mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Discover hand-selected, pre-loved fashion pieces that tell a story. Quality, conscious, and affordable.
        </motion.p>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          onClick={onShopClick}
          className="px-8 md:px-10 py-3 md:py-4 bg-accent-brown text-white font-semibold rounded-minimal shadow-soft hover:shadow-hover transition-shadow duration-300 text-base md:text-lg"
        >
          Shop Now
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-accent-brown opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
