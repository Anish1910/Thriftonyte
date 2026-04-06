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

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
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

        {/* Image Container with CTA Overlay */}
        <div className="relative aspect-square w-full overflow-hidden bg-neutral-warm-beige">
          <img
            src={displayImage || ''}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-400 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />

          {/* CTA Button - Vertically centered, shifted right */}
          <motion.button
            onClick={handleAddToCart}
            disabled={product.status === 'sold_out'}
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="absolute left-[60%] top-1/2 z-10 -translate-y-1/2 whitespace-nowrap rounded-minimal bg-accent-brown px-5 py-2.5 text-sm font-semibold text-white opacity-0 transition-all duration-300 hover:bg-accent-green disabled:cursor-not-allowed disabled:bg-gray-400 md:opacity-100 md:group-hover:opacity-100"
          >
            claim this piece
          </motion.button>
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
            {product.status === 'sold_out' && (
              <span className="text-xs font-semibold text-red-600">sold out</span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
