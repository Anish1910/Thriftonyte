import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cardVariants } from '../constants/animations';
import { BADGE_STYLES } from '../constants/product';
import { getImage } from '../lib/image';
import { useState, useEffect, useRef } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const cardRef = useRef(null);

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const mainImage = getImage(product.images?.[0]);
  const hoverImage = getImage(product.hoverGif);
  const displayImage = isHovered && hoverImage ? hoverImage : mainImage;

  const categoryName = (() => {
    if (!product.category) return '';
    if (typeof product.category === 'string') return product.category;
    if (typeof product.category === 'object' && product.category.name) return product.category.name;
    return '';
  })();

  const isSoldOut = product.status === 'sold_out';

  // Detect mobile for scroll-based hover/GIF simulation
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // On mobile: use IntersectionObserver to trigger hover state (GIF + lift) when card is in viewport center
  useEffect(() => {
    if (!isMobile || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHovered(entry.isIntersecting);
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: 0.1 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="flex flex-col h-full"
    >
      <motion.div
        ref={cardRef}
        className="group relative flex h-full flex-col overflow-hidden rounded-minimal bg-neutral-off-white shadow-soft transition-all duration-300 md:hover:scale-[1.03] md:hover:-translate-y-1 cursor-pointer"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...(isMobile ? {
          whileInView: { y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
          viewport: { once: false, margin: '-35% 0px -35% 0px' },
          transition: { duration: 0.3, ease: 'easeOut' }
        } : {})}
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute right-2 top-2 z-20 pointer-events-none">
            <span className={`rounded-minimal px-2 py-1 text-xs font-semibold uppercase tracking-wider ${BADGE_STYLES[product.badge] || 'bg-accent-brown text-white'}`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Image Container — enforced 1:1 square aspect ratio */}
        <div
          className="relative w-full overflow-hidden bg-neutral-warm-beige"
          style={{ aspectRatio: '1 / 1' }}
        >
          <img
            src={displayImage || ''}
            alt={product.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-grow flex-col gap-2.5 p-3.5 md:p-4">
          {/* Category & Title */}
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-text-light">
              {categoryName}
            </p>
            <h3 className="mb-1 line-clamp-2 text-lg font-extrabold leading-snug text-text-dark md:text-xl">
              {product.title}
            </h3>
          </div>

          {/* Price & Sold Out */}
          <div className="flex items-center justify-between">
            <p className="text-base font-bold text-accent-brown md:text-xl">
              ₹{product.price}
            </p>
            {isSoldOut && (
              <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Sold Out</span>
            )}
          </div>

          {/* Claim This Piece — full-width, anchored at bottom */}
          <div className="mt-auto pt-2">
            <motion.button
              onClick={handleAddToCart}
              disabled={isSoldOut}
              whileHover={isSoldOut ? {} : { scale: 1.02 }}
              whileTap={isSoldOut ? {} : { scale: 0.97 }}
              className={`w-full rounded-minimal py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm uppercase tracking-wide ${
                addedToCart
                  ? 'bg-accent-green text-white'
                  : isSoldOut
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-accent-brown text-white hover:bg-accent-green'
              }`}
            >
              {addedToCart ? '✓ Added' : isSoldOut ? 'Sold Out' : 'Claim This Piece'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
