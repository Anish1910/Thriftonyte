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
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = (e) => {
    if (e.target.closest('button')) {
      return;
    }
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
        className="relative bg-neutral-off-white rounded-minimal overflow-hidden shadow-soft group h-full flex flex-col cursor-pointer md:hover:scale-105 md:hover:-translate-y-1 transition-all duration-300"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {product.badge && (
          <div className="absolute top-2 right-2 z-20 pointer-events-none">
            <span className={`px-2 py-1 text-xs font-semibold rounded-minimal ${BADGE_STYLES[product.badge] || 'bg-accent-brown text-white'}`}>
              {product.badge}
            </span>
          </div>
        )}

        <motion.div
          className="relative overflow-hidden bg-neutral-warm-beige aspect-square flex items-center justify-center"
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

          {/* Add to Cart Button - Middle of card, overlay on image */}
          <motion.button
            onClick={handleAddToCart}
            disabled={product.status === 'sold_out'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[132px] px-4 py-2.5 text-xs md:text-sm bg-accent-brown text-white font-semibold rounded-minimal opacity-0 group-hover:opacity-100 hover:bg-accent-green md:hover:shadow-md transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            claim this piece
          </motion.button>
        </motion.div>

        <div className="p-2.5 flex-grow flex flex-col gap-2">
          <div>
            <p className="text-[10px] text-text-light uppercase tracking-wider mb-1">{categoryName}</p>
            <h3 className="text-xs md:text-sm font-semibold text-text-dark mb-1 line-clamp-2 leading-tight">
              {product.title}
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm md:text-lg font-bold text-accent-brown">
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
