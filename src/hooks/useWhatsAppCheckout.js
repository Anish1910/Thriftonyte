import { CONFIG } from '../data/products';

export const useWhatsAppCheckout = () => {
  const generateWhatsAppMessage = (cartItems, total) => {
    if (!cartItems || cartItems.length === 0) {
      return 'Hello, I\'m interested in your products!';
    }

    let message = 'Hello, I\'m interested in buying:\n\n';

    cartItems.forEach(item => {
      const itemTotal = item.price * item.quantity;
      message += `- ${item.title} (₹${item.price}) x${item.quantity} = ₹${itemTotal}\n`;
    });

    message += `\nTotal: ₹${total}`;

    return message;
  };

  const sendWhatsAppMessage = (cartItems, total) => {
    const message = generateWhatsAppMessage(cartItems, total);
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = CONFIG.whatsappNumber.replace(/\D/g, '');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
  };

  return {
    generateWhatsAppMessage,
    sendWhatsAppMessage
  };
};
