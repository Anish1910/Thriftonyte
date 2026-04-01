import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { fadeInVariants } from '../constants/animations';
import { BADGE_STYLES } from '../constants/product';
import { getImage } from '../lib/image';

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

  const getWhatsAppMessage = () => {
    const message = `hey, i'm interested in this piece:\n\n${product.title} - ₹${product.price}\n\nis it still available?`;
    return encodeURIComponent(message);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/shop')}
          className="mb-8 flex items-center gap-1.5 text-xs text-text-light hover:text-text-medium transition-colors duration-200 group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="uppercase tracking-wide">Back</span>
        </motion.button>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="flex flex-col"
          >
            {/* Main Image */}
            <div className="relative bg-neutral-off-white rounded-lg overflow-hidden mb-6 aspect-square flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={getImage(product.images?.[currentImageIndex])}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex gap-3 overflow-x-auto pb-2"
              >
                {product.images.map((image, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      idx === currentImageIndex
                        ? 'border-accent-brown shadow-md opacity-100'
                        : 'border-neutral-light-beige hover:border-text-light opacity-60'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img
                      src={getImage(image)}
                      alt={`${product.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="flex flex-col justify-start"
          >
            {/* Badge & Category */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs text-text-light uppercase tracking-wider font-semibold">
                {product.category}
              </span>
              {product.badge && (
                <motion.span
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${BADGE_STYLES[product.badge] || 'bg-accent-brown text-white'}`}
                >
                  {product.badge}
                </motion.span>
              )}
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-6 leading-tight"
            >
              {product.title}
            </motion.h1>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-4"
            >
              <span className="text-4xl md:text-5xl font-bold text-accent-brown">
                ₹{product.price}
              </span>
            </motion.div>

            {/* Scarcity Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm font-semibold text-accent-brown mb-10"
            >
              only 1 piece. ever.

              <p className="text-xs text-text-light mt-1">
               move fast or lose this.
              </p>
            </motion.p>

            {/* Stock Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mb-4 p-3 bg-neutral-warm-beige/40 rounded-lg"
            >
              <p className="text-sm font-medium text-text-dark">
                ✓ this is the only one
              </p>
            </motion.div>

            {/* FOMO Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="text-xs text-red-600 font-semibold mb-8"
            >
              spotted by someone else too
            </motion.p>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12 space-y-3"
            >
              <p className="text-text-medium text-base md:text-lg leading-relaxed">
                {product.longDescription}
              </p>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="space-y-4"
            >
              {/* Buy via WhatsApp - PRIMARY CTA */}
              <motion.a
                href={`https://wa.me/1234567890?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-4 bg-accent-brown text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-soft hover:shadow-md flex items-center justify-center gap-2 text-lg"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.044-4.661 5.147-4.661 8.905 0 .789.083 1.553.246 2.308L2.75 22l2.502-.826c.63.321 1.335.572 2.07.75 5.256 1.476 10.931-2.026 12.407-7.282s-2.026-10.931-7.282-12.407c-.955-.268-1.922-.401-2.901-.401zM0 11.993C0 5.366 5.366 0 12 0s12 5.366 12 12-5.366 12-12 12c-2.125 0-4.129-.515-5.893-1.728L0 24l1.735-5.221C.516 16.107 0 14.105 0 11.993z" />
                </svg>
                claim this piece
              </motion.a>

              {/* Microcopy for primary CTA */}
              <p className="text-xs text-text-light text-center -mt-2">
                10 seconds. reply in minutes.
              </p>

              {/* Reserve This Piece - SECONDARY CTA */}
              <motion.button
                onClick={handleAddToCart}
                className={`w-full px-6 py-3 border-2 border-text-dark text-text-dark font-semibold rounded-lg hover:bg-neutral-off-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  addedToCart
                    ? 'bg-accent-green border-accent-green text-white'
                    : ''
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {addedToCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    added to cart
                  </span>
                ) : (
                  'save for later'
                )}
              </motion.button>
            </motion.div>

            {/* Continue Shopping */}
            <motion.button
              onClick={() => navigate('/shop')}
              className="w-full px-6 py-3 mt-4 text-text-dark font-semibold rounded-lg hover:bg-neutral-warm-beige/40 transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{ scale: 1.01 }}
            >
              see more pieces
            </motion.button>

            {/* Product Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 pt-8 border-t border-neutral-light-beige"
            >
              <h3 className="text-xs font-semibold text-text-dark uppercase tracking-widest mb-4">
                why this piece
              </h3>
              <ul className="text-sm text-text-medium space-y-2.5">
                <li>
                  100% authentic vintage. no fakes.
                </li>
                <li>
                  inspected & restored. ready to wear.
                </li>
                <li>
                  one of a kind. will never restock.
                </li>
                <li>
                  conscious choice. sustainable fashion.
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
