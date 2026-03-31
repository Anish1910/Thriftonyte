import { CONFIG } from '../data/products';

export const useWhatsAppCheckout = () => {
  const generateWhatsAppMessage = (cartItems, total) => {
    if (!cartItems || cartItems.length === 0) {
      return 'Hello, I\'m interested in your products!';
    }

    let message = "Hey, i'd like to order these items:\n\n";


    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
       message += `${index + 1}. ${item.title} - ₹${item.price} (qty: ${item.quantity})\n`;
    });

    message += `\nTotal: ₹${total}`;
    message += "are these available?";


    return message;
  };

  const sendWhatsAppMessage = (cartItems, total) => {
    const message = generateWhatsAppMessage(cartItems, total);
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = CONFIG.whatsappNumber.replace(/\D/g, '');
    const whatsappURL = `https://wa.me/${919510381376}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
  };

  return {
    generateWhatsAppMessage,
    sendWhatsAppMessage
  };
};
