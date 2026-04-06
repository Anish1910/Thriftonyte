import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cardVariants } from '../constants/animations';
import { BADGE_STYLES } from '../constants/product';
import { getImage } from '../lib/image';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

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

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="flex flex-col h-full"
    >
      <motion.div
        className="group relative flex h-full flex-col overflow-hidden rounded-minimal bg-neutral-off-white shadow-soft transition-all duration-300 md:hover:scale-[1.03] md:hover:-translate-y-1 cursor-pointer"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute right-2 top-2 z-20 pointer-events-none">
            <span className={`rounded-minimal px-2 py-1 text-xs font-semibold ${BADGE_STYLES[product.badge] || 'bg-accent-brown text-white'}`}>
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
        <div className="flex flex-grow flex-col gap-2 p-3">
          {/* Category & Title */}
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-text-light">
              {categoryName}
            </p>
            <h3 className="mb-1 line-clamp-2 text-xs font-semibold leading-tight text-text-dark md:text-sm">
              {product.title}
            </h3>
          </div>

          {/* Price & Sold Out */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-accent-brown md:text-lg">
              ₹{product.price}
            </p>
            {isSoldOut && (
              <span className="text-xs font-semibold text-red-600">sold out</span>
            )}
          </div>

          {/* Claim This Piece — always visible, centered below details */}
          <div className="mt-auto flex justify-center pt-1">
            <motion.button
              onClick={handleAddToCart}
              disabled={isSoldOut}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className={`rounded-minimal px-5 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                addedToCart
                  ? 'bg-accent-green text-white'
                  : isSoldOut
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-accent-brown text-white hover:bg-accent-green'
              }`}
            >
              {addedToCart ? '✓ added' : isSoldOut ? 'sold out' : 'claim this piece'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
