import { CONFIG } from '../data/products';

export const useWhatsAppCheckout = () => {
  const generateWhatsAppMessage = (cartItems, total) => {
    if (!cartItems || cartItems.length === 0) {
      return 'Hello, I\'m interested in your products!';
    }

    let message = "Hey, i'd like to order these items:\n\n";

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.title} - ₹${item.price} (qty: ${item.quantity})\n`;
    });

    message += `\n Total: ₹${total}\n\n`;
    message += "Name: \nAddress: \nPhone: \n\n";
    message += "Are these available?";

    return message;
  };

  const sendWhatsAppMessage = (cartItems, total) => {
    const message = generateWhatsAppMessage(cartItems, total);
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
  };

  return {
    generateWhatsAppMessage,
    sendWhatsAppMessage
  };
};
