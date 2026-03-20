import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.08, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    rest: { opacity: 0, y: 10 },
    hover: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="flex flex-col h-full"
    >
      <motion.div
        className="relative bg-neutral-off-white rounded-minimal overflow-hidden shadow-soft group h-full flex flex-col"
        whileHover={{ shadow: '0 8px 24px rgba(0,0,0,0.12)', transition: { duration: 0.3 } }}
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 right-4 z-20">
            <span className={`px-3 py-1 text-xs font-semibold rounded-minimal ${
              product.badge === 'New'
                ? 'bg-accent-green text-white'
                : 'bg-accent-brown text-white'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Image Section */}
        <motion.div
          className="relative overflow-hidden bg-neutral-warm-beige h-64 md:h-72 flex items-center justify-center text-6xl md:text-7xl"
          initial="rest"
          whileHover="hover"
          variants={imageVariants}
        >
          {product.image}
        </motion.div>

        {/* Content Section */}
        <div className="p-4 md:p-6 flex-grow flex flex-col justify-between">
          <div>
            <p className="text-xs text-text-light uppercase tracking-wider mb-2">{product.category}</p>
            <h3 className="text-lg md:text-xl font-semibold text-text-dark mb-2 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-sm text-text-medium mb-4 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xl md:text-2xl font-bold text-accent-brown">
              ₹{product.price}
            </p>
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          className="w-full px-4 py-3 bg-accent-brown text-white font-semibold rounded-b-minimal hover:bg-accent-green transition-colors duration-300"
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
