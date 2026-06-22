import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cardVariants } from '../constants/animations';
import { BADGE_STYLES } from '../constants/product';
import { getImage } from '../lib/image';
import { useState, useEffect, useRef } from 'react';
import TiltedCard from './TiltedCard';

// Single matchMedia check shared across all cards (no per-card resize listener)
const isMobileQuery = typeof window !== 'undefined'
  ? window.matchMedia('(max-width: 767px)')
  : { matches: false };

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const cardRef = useRef(null);

  // Use matchMedia listener instead of per-card resize
  const [isMobile, setIsMobile] = useState(isMobileQuery.matches);
  useEffect(() => {
    const handler = (e) => setIsMobile(e.matches);
    isMobileQuery.addEventListener('change', handler);
    return () => isMobileQuery.removeEventListener('change', handler);
  }, []);

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

  // Reduced sizes: 400px is plenty for cards displayed at 180-300px
  const mainImage = getImage(product.images?.[0], { width: 400, quality: 70 });
  const hoverImage = isMobile ? '' : getImage(product.hoverGif, { width: 400, quality: 70 });
  const displayImage = isHovered && hoverImage ? hoverImage : mainImage;

  const genderLabel = (() => {
    if (!product.gender) return '';
    return product.gender.charAt(0).toUpperCase() + product.gender.slice(1);
  })();

  const isSoldOut = product.status === 'sold_out';

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
      <div
        ref={cardRef}
        className="group relative flex h-full flex-col cursor-pointer"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <TiltedCard
          imageSrc={displayImage}
          containerHeight="100%"
          containerWidth="100%"
          imageHeight="auto"
          imageWidth="100%"
          rotateAmplitude={8}
          scaleOnHover={1.02}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent={false}
          disabled={isMobile}
        >
          <div 
            className={`flex h-full flex-col rounded-minimal bg-neutral-off-white transition-all duration-300 relative overflow-hidden ${
              isHovered ? 'scale-[1.015] -translate-y-0.5 shadow-lg' : 'shadow-md'
            }`}
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
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out md:group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />

              {/* Slide Up Button Overlay (Duo-Tone Mask Effect) - DESKTOP ONLY */}
              <div className="hidden md:block absolute bottom-0 left-0 w-full h-9 md:translate-y-full md:group-hover:translate-y-0 transition-all duration-500 ease-out z-20 backdrop-blur-md md:opacity-0 md:group-hover:opacity-100 border-t border-white/20 overflow-hidden">
                <svg className="w-full h-full text-white/40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={`shine-${product._id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="white" stopOpacity="0">
                        <animate attributeName="offset" values="-1; 2" dur="2s" repeatCount="indefinite" />
                      </stop>
                      <stop offset="50%" stopColor="white" stopOpacity="0.6">
                        <animate attributeName="offset" values="-0.5; 2.5" dur="2s" repeatCount="indefinite" />
                      </stop>
                      <stop offset="100%" stopColor="white" stopOpacity="0">
                        <animate attributeName="offset" values="0; 3" dur="2s" repeatCount="indefinite" />
                      </stop>
                    </linearGradient>
                    <mask id={`mask-${product._id}`}>
                      <rect width="100%" height="100%" fill="white" />
                      <text 
                        x="50%" 
                        y="50%" 
                        dy=".22em"
                        dominantBaseline="middle" 
                        textAnchor="middle" 
                        fill="black" 
                        fontSize="30px"
                        fontWeight="900"
                        letterSpacing="0.08em"
                        fontFamily="system-ui, sans-serif"
                      >
                        {addedToCart ? '✓ ADDED' : isSoldOut ? 'SOLD OUT' : 'CLAIM THIS PIECE'}
                      </text>
                    </mask>
                  </defs>
                  {/* The bar with text cut out */}
                  <rect width="100%" height="100%" fill="currentColor" mask={`url(#mask-${product._id})`} />
                  
                  {/* The Flowing Glow Effect (Shine) */}
                  <text 
                    x="50%" 
                    y="50%" 
                    dy=".22em"
                    dominantBaseline="middle" 
                    textAnchor="middle" 
                    fill={`url(#shine-${product._id})`}
                    stroke="black"
                    strokeWidth="0.8px"
                    fontSize="30px"
                    fontWeight="900"
                    letterSpacing="0.08em"
                    fontFamily="system-ui, sans-serif"
                    pointerEvents="none"
                  >
                    {addedToCart ? '✓ ADDED' : isSoldOut ? 'SOLD OUT' : 'CLAIM THIS PIECE'}
                  </text>
                </svg>
                <button 
                  onClick={handleAddToCart}
                  disabled={isSoldOut}
                  className="absolute inset-0 w-full h-full cursor-pointer z-30 opacity-0"
                >
                  <span className="sr-only">Claim This Piece</span>
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow gap-2.5 p-3.5 md:p-4 bg-neutral-off-white relative z-10 rounded-b-minimal">
              {/* Gender Tag & Title */}
              <div>
                <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-text-light">
                  {genderLabel}
                </p>
                
                {/* Desktop: Title & Price Side-by-Side | Mobile: Title Only */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="line-clamp-2 text-lg font-extrabold leading-snug text-text-dark md:text-xl flex-1">
                    {product.title}
                  </h3>
                  
                  {/* Desktop-only Price Reveal */}
                  <div className="hidden md:flex flex-col items-end text-right flex-shrink-0 transition-all duration-500 ease-out md:opacity-0 md:translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0">
                    <p className="text-base font-bold text-accent-brown md:text-xl mt-[2px]">
                      ₹{product.price}
                    </p>
                    {isSoldOut && (
                      <span className="text-[10px] mt-1 font-semibold text-red-600 uppercase tracking-wide">Sold Out</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile-only Price */}
              <div className="flex md:hidden items-center justify-between">
                <p className="text-base font-bold text-accent-brown">
                  ₹{product.price}
                </p>
                {isSoldOut && (
                  <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Sold Out</span>
                )}
              </div>

              {/* Mobile-only Button OR Desktop padding filler */}
              <div className="mt-auto md:mt-0 pt-2 md:pt-0">
                <button 
                  onClick={handleAddToCart}
                  disabled={isSoldOut}
                  className={`w-full py-2.5 rounded-minimal text-xs font-bold uppercase tracking-wider transition-all duration-300 md:hidden ${
                    addedToCart 
                      ? 'bg-accent-green text-white' 
                      : isSoldOut 
                        ? 'bg-neutral-light-beige text-text-light cursor-not-allowed' 
                        : 'bg-accent-brown text-white active:scale-95'
                  }`}
                >
                  {addedToCart ? '✓ ADDED' : isSoldOut ? 'SOLD OUT' : 'CLAIM THIS PIECE'}
                </button>
              </div>
            </div>
          </div>
        </TiltedCard>
      </div>
    </motion.div>
  );
}
