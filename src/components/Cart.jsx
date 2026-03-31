import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWhatsAppCheckout } from '../hooks/useWhatsAppCheckout';

export default function Cart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { sendWhatsAppMessage } = useWhatsAppCheckout();
  const total = getTotalPrice();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      sendWhatsAppMessage(cartItems, total);
      clearCart();
      onClose();
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } }
  };

  const drawerVariants = {
    hidden: { x: 400 },
    visible: { x: 0, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black z-50 cursor-pointer"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <motion.div
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-hover z-50 flex flex-col"
        variants={drawerVariants}
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-light-beige flex justify-between items-center">
          <h2 className="text-2xl font-bold text-text-dark">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 text-text-medium hover:text-text-dark transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <p className="text-text-medium mb-2">Your cart is empty</p>
                <p className="text-sm text-text-light">Add items to get started!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-neutral-light-beige">
                  <div className="text-4xl flex-shrink-0">{item.image}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-dark truncate">{item.title}</h3>
                    <p className="text-sm text-text-medium">₹{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 border border-neutral-light-beige rounded text-sm hover:bg-neutral-warm-beige transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 border border-neutral-light-beige rounded text-sm hover:bg-neutral-warm-beige transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto px-2 py-1 text-xs text-accent-brown hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>


                      <p className="text-xs text-accent-brown">
                      Items are not reserved until you confirm on whatsapp
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


        <p className="text-xs text-accent-brown">
        Items are not reserved until you confirm on WhatsApp
        </p>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-neutral-light-beige p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-text-dark">Total:</span>
              <span className="text-2xl font-bold text-accent-brown">₹{total}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full px-4 py-3 bg-accent-brown text-white font-semibold rounded-minimal hover:bg-accent-green transition-colors duration-300 shadow-soft"
            >
              Place Order on WhatsApp
            </button>

            <p className="text-xs text-text-light text-center">
             You'll confirm details and delivery on whatsapp
            </p>
            <button
              onClick={() => {
                clearCart();
                onClose();
              }}
              className="w-full px-4 py-2 text-text-medium border border-neutral-light-beige rounded-minimal hover:bg-neutral-warm-beige transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
