import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import CategoryCard from './CategoryCard';
import { fadeInVariants } from '../constants/animations';

export default function Categories({ categories = [] }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);

  const x = useMotionValue(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Measure container and track widths to compute bounds
  const updateWidths = useCallback(() => {
    if (containerRef.current && trackRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const trackWidth = trackRef.current.scrollWidth;
      const maxScrollVal = Math.max(0, trackWidth - containerWidth);
      setMaxScroll(maxScrollVal);

      // Keep x within bounds if window size changes
      if (x.get() < -maxScrollVal) {
        x.set(-maxScrollVal);
      }
    }
  }, [x]);

  useEffect(() => {
    // Initial measure
    updateWidths();
    window.addEventListener('resize', updateWidths);
    
    // Create a MutationObserver to watch for content rendering updates
    const observer = new MutationObserver(updateWidths);
    if (trackRef.current) {
      observer.observe(trackRef.current, { childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('resize', updateWidths);
      observer.disconnect();
    };
  }, [categories, updateWidths]);

  // Update button visibility states based on scroll position safely
  useEffect(() => {
    const handleScrollUpdate = (latest) => {
      setCanScrollLeft(latest < -10);
      setCanScrollRight(latest > -maxScroll + 10);
    };

    handleScrollUpdate(x.get());

    // Safe event subscription supporting multiple Framer Motion versions
    if (typeof x.on === 'function') {
      const unsubscribe = x.on("change", handleScrollUpdate);
      return () => unsubscribe();
    } else if (typeof x.onChange === 'function') {
      const unsubscribe = x.onChange(handleScrollUpdate);
      return () => unsubscribe();
    }
  }, [x, maxScroll]);

  // Smooth scroll using Framer Motion physics spring
  const scrollByCards = useCallback((direction) => {
    const card = trackRef.current?.querySelector('[data-category-card]');
    const cardWidth = card ? card.offsetWidth + 28 : 328; // width + gap
    const currentTarget = x.get();
    const newTarget = Math.max(-maxScroll, Math.min(0, currentTarget - cardWidth * direction));

    animate(x, newTarget, {
      type: 'spring',
      stiffness: 180,
      damping: 24,
      mass: 0.8
    });
  }, [x, maxScroll]);

  // Keyboard navigation when section is focused/hovered
  useEffect(() => {
    if (!isSectionHovered) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollByCards(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollByCards(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSectionHovered, scrollByCards]);

  // Wheel → smooth horizontal scrolling (Traps vertical scroll completely in this section)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      // Prevent page vertical scrolling
      e.preventDefault();

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta === 0) return;

      const currentTarget = x.get();
      // Scale scroll speed slightly for wheel comfort
      const newTarget = Math.max(-maxScroll, Math.min(0, currentTarget - delta * 1.1));

      animate(x, newTarget, {
        type: 'spring',
        stiffness: 220,
        damping: 28,
        mass: 0.4,
        restDelta: 0.5
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [maxScroll, x]);

  // Branded bespoke styled geometric arrow buttons
  const ScrollArrow = ({ direction }) => {
    const isRight = direction === 'right';
    const canScroll = isRight ? canScrollRight : canScrollLeft;

    return (
      <AnimatePresence>
        {isSectionHovered && canScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9, x: isRight ? 15 : -15 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: isRight ? 15 : -15 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            onClick={() => scrollByCards(isRight ? 1 : -1)}
            className={`absolute top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center justify-center
              w-9 h-20 rounded-minimal cursor-pointer
              bg-neutral-white/90 backdrop-blur-md border border-accent-brown/30 shadow-soft
              text-accent-brown hover:bg-accent-brown hover:text-neutral-white hover:border-accent-brown
              transition-all duration-300 group
              ${isRight ? '-right-4' : '-left-4'}`}
            aria-label={`Scroll ${direction}`}
          >
            {/* Custom stylized arrow details */}
            <svg
              className="w-4 h-6 transition-transform duration-300 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isRight ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
              />
            </svg>
            <div className="w-1 h-1 rounded-full bg-current mt-1 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    );
  };

  if (!categories || categories.length === 0) return null;

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-24 relative overflow-x-clip"
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => setIsSectionHovered(false)}
      tabIndex={-1}
    >
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark uppercase tracking-wide">
          Explore By Type
        </h2>
        <p className="text-base md:text-lg text-text-medium max-w-2xl mx-auto mt-2">
          Curated collections. Everything handpicked.
        </p>
      </motion.div>

      {/* Horizontally scrollable categories belt */}
      <div className="relative px-2">
        <ScrollArrow direction="left" />

        {/* Outer scroll viewport */}
        <div
          ref={containerRef}
          className="overflow-hidden select-none"
        >
          {/* Inner hardware-accelerated animated track */}
          <motion.div
            ref={trackRef}
            className="flex gap-6 md:gap-8 pb-4"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -maxScroll, right: 0 }}
            dragElastic={0.1}
          >
            {categories.map((category, i) => (
              <motion.div
                key={category._id || category.slug?.current || i}
                data-category-card
                className="flex-shrink-0"
                style={{ width: 'clamp(260px, 22vw, 320px)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: 'easeOut' }}
              >
                <div>
                  <CategoryCard category={category} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <ScrollArrow direction="right" />

        {/* Theme-blended edge blurs (#FFFFFF) */}
        <div
          className="hidden md:block absolute left-0 top-0 bottom-4 w-16 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0))',
            opacity: canScrollLeft ? 1 : 0,
            transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        <div
          className="hidden md:block absolute right-0 top-0 bottom-4 w-16 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to left, rgba(255,255,255,0.9), rgba(255,255,255,0))',
            opacity: canScrollRight ? 1 : 0,
            transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
    </section>
  );
}
