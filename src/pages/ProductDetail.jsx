import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { fadeInVariants } from '../constants/animations';
import { BADGE_STYLES } from '../constants/product';
import { getImage } from '../lib/image';
import { client } from '../lib/sanity';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const scrollLockRef = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const isSoldOut = product?.status === 'sold_out';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "product" && _id == $id][0]{
            ...,
            category->{
              name,
              slug
            }
          }`,
          { id }
        );
        setProduct(data || null);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    let timer;
    if (addedToCart) {
      timer = setTimeout(() => setAddedToCart(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [addedToCart]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFullscreen]);

  const handlePrevImage = () => {
    if (!product?.images) return;
    setDirection(-1);
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleNextImage = () => {
    if (!product?.images) return;
    setDirection(1);
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handleWheel = (e) => {
    if (!product?.images || product.images.length <= 1) return;

    if (scrollLockRef.current) return;

    e.preventDefault();

    scrollLockRef.current = true;
    setTimeout(() => {
      scrollLockRef.current = false;
    }, 300);

    if (e.deltaY > 0) {
      handleNextImage();
    } else {
      handlePrevImage();
    }
  };

  // Touch swipe handlers for mobile image gallery
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-text-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-text-dark mb-4 uppercase tracking-wide">Product Not Found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-accent-brown text-white font-semibold rounded-minimal hover:bg-accent-green transition-colors uppercase tracking-wide text-sm"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (isSoldOut) return;
    addToCart(product);
    setAddedToCart(true);
  };

  const getWhatsAppMessage = () => {
    const message = `Hey, I'm interested in this piece:\n\n${product.title} - ₹${product.price}\n\nName: \nAddress: \nPhone: \nEmail:\n\nIs it still available?`;
    return encodeURIComponent(message);
  };

  return (
    <main className="min-h-screen bg-neutral-white">
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
          <span className="uppercase tracking-wider font-medium">Back</span>
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
            <div
              className="relative bg-neutral-off-white rounded-lg overflow-hidden mb-2 md:mb-6 cursor-pointer group"
              style={{ aspectRatio: '1 / 1', WebkitOverflowScrolling: 'touch' }}
              onClick={() => setIsFullscreen(true)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={selectedImageIndex}
                  src={getImage(product.images?.[selectedImageIndex])}
                  alt={product.title}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                />
              </AnimatePresence>

              {/* Previous Button */}
              {product.images && product.images.length > 1 && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-neutral-white/70 hover:bg-neutral-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
              )}

              {/* Next Button */}
              {product.images && product.images.length > 1 && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-neutral-white/70 hover:bg-neutral-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              )}
            </div>

            {/* Dot indicators for mobile swipe */}
            {product.images && product.images.length > 1 && (
              <div className="flex justify-center gap-1.5 py-2 md:hidden">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > selectedImageIndex ? 1 : -1);
                      setSelectedImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === selectedImageIndex
                      ? 'bg-accent-brown w-4'
                      : 'bg-neutral-light-beige'
                      }`}
                  />
                ))}
              </div>
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
              {product.category?.name && (
                <span className="text-xs text-text-light uppercase tracking-widest font-semibold">
                  {product.category.name}
                </span>
              )}
              {product.badge && (
                <motion.span
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${BADGE_STYLES[product.badge] || 'bg-accent-brown text-white'}`}
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
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-6 leading-tight tracking-wide"
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
              <span className="text-3xl md:text-4xl font-extrabold text-accent-brown">
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
              Only 1 piece. Ever.
              <span className="block text-xs text-text-light mt-1">
                Move fast or lose this.
              </span>
            </motion.p>

            {/* Stock Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mb-4 p-3 bg-neutral-warm-beige/40 rounded-lg"
            >
              <p className="text-sm font-medium text-text-dark">
                ✓ This is the only one
              </p>
            </motion.div>

            {/* FOMO Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="text-xs text-red-600 font-semibold mb-8"
            >
              Spotted by someone else too
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

            {/* Sold Out Notice */}
            {isSoldOut && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.32 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                  This piece has been sold
                </p>
              </motion.div>
            )}

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="space-y-4 max-w-sm mx-auto"
            >
              {/* Buy via WhatsApp - PRIMARY CTA */}
              {isSoldOut ? (
                <div
                  className="w-full px-6 py-4 bg-gray-300 text-gray-500 font-semibold rounded-lg flex items-center justify-center gap-2 text-base cursor-not-allowed uppercase tracking-wide"
                >
                  Sold Out
                </div>
              ) : (
                <motion.a
                  href={`https://wa.me/9510381376?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-4 bg-accent-brown text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-soft hover:shadow-md flex items-center justify-center gap-2 text-base uppercase tracking-wide"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.044-4.661 5.147-4.661 8.905 0 .789.083 1.553.246 2.308L2.75 22l2.502-.826c.63.321 1.335.572 2.07.75 5.256 1.476 10.931-2.026 12.407-7.282s-2.026-10.931-7.282-12.407c-.955-.268-1.922-.401-2.901-.401zM0 11.993C0 5.366 5.366 0 12 0s12 5.366 12 12-5.366 12-12 12c-2.125 0-4.129-.515-5.893-1.728L0 24l1.735-5.221C.516 16.107 0 14.105 0 11.993z" />
                  </svg>
                  Claim This Piece
                </motion.a>
              )}

              {/* Microcopy for primary CTA */}
              {!isSoldOut && (
                <p className="text-xs text-text-light text-center -mt-2">
                  10 seconds. Reply in minutes.
                </p>
              )}

              {/* Reserve This Piece - SECONDARY CTA */}
              <motion.button
                onClick={handleAddToCart}
                disabled={isSoldOut}
                className={`w-full px-6 py-3 border-2 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm ${isSoldOut
                  ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                  : addedToCart
                    ? 'bg-accent-green border-accent-green text-white'
                    : 'border-text-dark text-text-dark hover:bg-neutral-off-white'
                  }`}
                whileTap={isSoldOut ? {} : { scale: 0.98 }}
              >
                {addedToCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Added to Cart
                  </span>
                ) : isSoldOut ? (
                  'Unavailable'
                ) : (
                  'Save for Later'
                )}
              </motion.button>
            </motion.div>

            {/* Continue Shopping */}
            <motion.button
              onClick={() => navigate('/shop')}
              className="w-full px-6 py-3 mt-4 text-text-dark font-semibold rounded-lg hover:bg-neutral-warm-beige/40 transition-all duration-300 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{ scale: 1.01 }}
            >
              See More Pieces
            </motion.button>

            {/* Product Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 pt-8 border-t border-neutral-light-beige"
            >
              <h3 className="text-xs font-semibold text-text-dark uppercase tracking-widest mb-4">
                Why This Piece
              </h3>
              <ul className="text-sm text-text-medium space-y-2.5">
                <li>
                  100% authentic vintage. No fakes.
                </li>
                <li>
                  Inspected & restored. Ready to wear.
                </li>
                <li>
                  One of a kind. Will never restock.
                </li>
                <li>
                  Conscious choice. Sustainable fashion.
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsFullscreen(false)}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-20"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Container */}
            <div
              className="relative flex items-center justify-center w-full h-full px-2 md:px-8 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={selectedImageIndex}
                  src={getImage(product.images?.[selectedImageIndex])}
                  alt={product.title}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute w-auto h-auto max-w-full max-h-[80vh] md:max-w-4xl md:max-h-screen object-contain"
                  style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                />
              </AnimatePresence>

              {/* Previous Button */}
              {product.images && product.images.length > 1 && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-neutral-white/20 hover:bg-neutral-white/30 p-3 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
              )}

              {/* Next Button */}
              {product.images && product.images.length > 1 && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-neutral-white/20 hover:bg-neutral-white/30 p-3 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              )}
            </div>

            {/* Fullscreen dot indicators for mobile */}
            {product.images && product.images.length > 1 && (
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDirection(idx > selectedImageIndex ? 1 : -1);
                      setSelectedImageIndex(idx);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === selectedImageIndex
                        ? 'bg-neutral-white w-5'
                        : 'bg-neutral-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
