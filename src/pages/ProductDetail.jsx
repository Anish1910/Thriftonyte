import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { fadeInVariants, imageVariants } from '../constants/animations';
import { BADGE_STYLES, PRODUCT_DETAILS } from '../constants/product';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const productId = parseInt(id, 10);
  const product = useMemo(() =>
    products.find(p => p.id === productId),
    [productId]
  );

  useEffect(() => {
    let timer;
    if (addedToCart) {
      timer = setTimeout(() => setAddedToCart(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [addedToCart]);

  if (isNaN(productId) || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-dark mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-accent-brown text-white font-semibold rounded-minimal hover:bg-accent-green transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Back Button */}
        <button
          onClick={() => navigate('/shop')}
          className="mb-8 flex items-center gap-2 text-text-medium hover:text-text-dark transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Shop
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            <div className="bg-neutral-warm-beige rounded-minimal overflow-hidden mb-4">
              <div className="relative h-96 md:h-[500px] flex items-center justify-center text-9xl md:text-[200px]">
                {product.images[currentImageIndex]}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex gap-3 justify-center">
                <button
                  onClick={prevImage}
                  className="p-2 text-text-medium hover:text-accent-brown transition-colors"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex gap-2">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        idx === currentImageIndex
                          ? 'bg-accent-brown'
                          : 'bg-neutral-light-beige hover:bg-text-light'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextImage}
                  className="p-2 text-text-medium hover:text-accent-brown transition-colors"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="flex flex-col"
          >
            {/* Badge & Category */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs text-text-light uppercase tracking-wider font-semibold">
                {product.category}
              </span>
              {product.badge && (
                <span className={`px-3 py-1 text-xs font-semibold rounded-minimal ${BADGE_STYLES[product.badge] || 'bg-accent-brown text-white'}`}>
                  {product.badge}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl md:text-5xl font-bold text-accent-brown">
                ₹{product.price}
              </span>
            </div>

            {/* Description */}
            <div className="mb-8 space-y-4">
              <p className="text-text-medium text-lg leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4 mt-auto">
              <motion.button
                onClick={handleAddToCart}
                className={`w-full px-6 py-4 font-semibold rounded-minimal text-white text-lg transition-colors duration-300 ${
                  addedToCart
                    ? 'bg-accent-green'
                    : 'bg-accent-brown hover:bg-accent-green'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
              </motion.button>

              <button
                onClick={() => navigate('/shop')}
                className="w-full px-6 py-3 border-2 border-neutral-light-beige text-text-dark font-semibold rounded-minimal hover:bg-neutral-warm-beige transition-colors"
              >
                Continue Shopping
              </button>
            </div>

            {/* Product Details */}
            <div className="mt-12 pt-8 border-t border-neutral-light-beige space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-text-dark uppercase tracking-wide mb-2">
                  Details
                </h3>
                <ul className="text-sm text-text-medium space-y-2">
                  {PRODUCT_DETAILS.map((detail, idx) => (
                    <li key={idx}>• {detail.label}: {detail.value}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
