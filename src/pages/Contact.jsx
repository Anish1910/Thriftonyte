import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Footer from '../components/Footer';

const FAQS = [
  {
    question: "Are these pieces authentic?",
    answer: "100%. We thoroughly inspect, verify, and authenticate every single piece before it ever reaches the store. No fakes. No exceptions."
  },
  {
    question: "Do you accept returns or exchanges?",
    answer: "Because each piece is unique and strictly one-of-a-kind, all sales are final. We provide detailed measurements and condition notes for every item so you know exactly what you're getting."
  },
  {
    question: "How long does shipping take?",
    answer: "Orders are processed within 24-48 hours. Standard domestic shipping usually takes 3-5 business days. You'll receive a tracking number as soon as it ships."
  },
  {
    question: "How do I know if it will fit me?",
    answer: "Vintage sizing can be tricky, so we don't just rely on the tag. We provide exact measurements (pit-to-pit, length, shoulders) for every single item. Compare these with a piece you already own that fits you well."
  }
];

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className="border-b border-neutral-light-beige">
      <button
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className="text-lg md:text-xl font-bold text-text-dark group-hover:text-accent-brown transition-colors">
          {faq.question}
        </span>
        <span className={`ml-6 flex-shrink-0 text-accent-brown transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base md:text-lg text-text-medium leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <main className="min-h-screen bg-neutral-white">
      {/* Hero Section */}
      <section className="about-hero max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-dark mb-6 leading-[1] tracking-wide uppercase">
            Here For You.
          </h1>
          <p className="text-base md:text-lg text-text-light max-w-2xl mx-auto font-medium">
            Got a question about a piece? Need help with an order? We're just a message away.
          </p>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="bg-neutral-off-white/50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-2xl md:text-3xl font-extrabold text-text-dark mb-10 uppercase tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Usual Suspects
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="border-t border-neutral-light-beige"
          >
            {FAQS.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openFaqIndex === index}
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Direct Contact Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-6 uppercase tracking-wide">
            Still Have Questions?
          </h2>
          <p className="text-base md:text-lg text-text-medium mb-12 max-w-2xl mx-auto">
            If you didn't find your answer above, drop us a line. We usually reply within a few hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            {/* Email Option */}
            <a
              href="mailto:support@thriftonyte.com"
              className="w-full sm:w-auto px-8 py-4 bg-text-dark text-white font-bold text-sm md:text-base rounded-lg hover:bg-neutral-800 transition-colors uppercase tracking-wider flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>

            {/* WhatsApp Option */}
            <a
              href="https://wa.me/9510381376"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-accent-green text-white font-bold text-sm md:text-base rounded-lg hover:bg-opacity-90 transition-colors uppercase tracking-wider flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.044-4.661 5.147-4.661 8.905 0 .789.083 1.553.246 2.308L2.75 22l2.502-.826c.63.321 1.335.572 2.07.75 5.256 1.476 10.931-2.026 12.407-7.282s-2.026-10.931-7.282-12.407c-.955-.268-1.922-.401-2.901-.401zM0 11.993C0 5.366 5.366 0 12 0s12 5.366 12 12-5.366 12-12 12c-2.125 0-4.129-.515-5.893-1.728L0 24l1.735-5.221C.516 16.107 0 14.105 0 11.993z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
