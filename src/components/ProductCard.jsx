import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cardVariants, imageVariants } from '../constants/animations';
import { BADGE_STYLES } from '../constants/product';
import { getImage } from '../lib/image';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const handleCardClick = (e) => {
    // Don't navigate if clicking the add to cart button
    if (e.target.closest('button')) {
      return;
    }
    navigate(`/product/${product.slug?.current || product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  // Safe image handling - supports both Sanity objects and string URLs
  const mainImage = getImage(product.images?.[0]);
  const hoverImage = getImage(product.hoverGif);
  const displayImage = isHovering && hoverImage ? hoverImage : mainImage;

  // Get category name - safely handle both string and object types
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
        className="relative bg-neutral-off-white rounded-minimal overflow-hidden shadow-soft group h-full flex flex-col cursor-pointer"
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 right-4 z-20 pointer-events-none">
            <span className={`px-3 py-1 text-xs font-semibold rounded-minimal ${BADGE_STYLES[product.badge] || 'bg-accent-brown text-white'}`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Image Section */}
        <motion.div
          className="relative overflow-hidden bg-neutral-warm-beige h-64 md:h-72 flex items-center justify-center"
          initial="rest"
          whileHover="hover"
          variants={imageVariants}
        >
          {displayImage ? (
            <motion.img
              src={displayImage}
              alt={product.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <span className="text-gray-300 text-sm">no image</span>
          )}
        </motion.div>

        {/* Content Section */}
        <div className="p-4 md:p-6 flex-grow flex flex-col justify-between">
          <div>
            <p className="text-xs text-text-light uppercase tracking-wider mb-2">{categoryName}</p>
            <h3 className="text-lg md:text-xl font-semibold text-text-dark mb-2 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-sm text-text-medium mb-4 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-xl md:text-2xl font-bold text-accent-brown">
              ₹{product.price}
            </p>
            {product.status === 'sold_out' && (
              <span className="text-xs font-semibold text-red-600">sold out</span>
            )}
          </div>
        </div>

        {/* Add to Cart Button - ALWAYS VISIBLE */}
        <button
          onClick={handleAddToCart}
          disabled={product.status === 'sold_out'}
          className="w-full px-4 py-3 bg-accent-brown text-white font-semibold rounded-b-minimal hover:bg-accent-green transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
         claim this piece
        </button>
      </motion.div>
    </motion.div>
  );
}
