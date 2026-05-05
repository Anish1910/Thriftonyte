import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { useFormSubmit } from '../hooks/useFormSubmit';

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

const SUBJECT_TEMPLATES = {
  "Order Inquiry": "Hi Thriftonyte team,\n\nI am reaching out regarding my recent order. My order number is [Enter Order Number here].\n\nI have a question about...",
  "Product Request": "Hi team,\n\nI love your collection! I am looking for a specific piece/style: [Describe item here].\n\nCould you let me know if...",
  "Feedback/Review": "Hey there!\n\nI wanted to share my experience with Thriftonyte. [Write your feedback here].\n\nKeep up the great work!",
  "Other": ""
};

function ContactForm() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    description: ''
  });
  const { status, message, submit, reset } = useFormSubmit();

  const isSending = status === 'loading';
  const isSuccess = status === 'success';

  const handleSubjectChange = (e) => {
    const newSubject = e.target.value;
    setFormData(prev => ({
      ...prev,
      subject: newSubject,
      description: SUBJECT_TEMPLATES[newSubject] || ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit("contact", {
      email: formData.email,
      subject: formData.subject,
      message: formData.description,
    });
    setFormData({ email: '', subject: '', description: '' });
    setTimeout(() => reset(), 5000);
  };

  return (
    <form className="space-y-6 text-left max-w-2xl mx-auto" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-bold uppercase tracking-widest text-text-dark mb-2">
          Your Email Address <span className="text-accent-brown">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-6 py-4 bg-neutral-white border border-neutral-light-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-brown/20 focus:border-accent-brown transition-all"
          placeholder="e.g. alex@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-bold uppercase tracking-widest text-text-dark mb-2">
          Subject <span className="text-accent-brown">*</span>
        </label>
        <select
          name="subject"
          required
          value={formData.subject}
          onChange={handleSubjectChange}
          className="w-full px-6 py-4 bg-neutral-white border border-neutral-light-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-brown/20 focus:border-accent-brown transition-all appearance-none cursor-pointer"
        >
          <option value="" disabled>Select a reason for contact</option>
          <option value="Order Inquiry">Order Inquiry</option>
          <option value="Product Request">Product Request</option>
          <option value="Feedback/Review">Feedback/Review</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold uppercase tracking-widest text-text-dark mb-2">
          Describe Your Request <span className="text-accent-brown">*</span>
        </label>
        <textarea
          name="message"
          required
          rows="6"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-6 py-4 bg-neutral-white border border-neutral-light-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-brown/20 focus:border-accent-brown transition-all resize-none"
          placeholder="Tell us more..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSending || isSuccess}
        className={`w-full py-5 bg-text-dark text-white font-bold uppercase tracking-widest rounded-lg transition-all duration-300 shadow-soft hover:shadow-hover ${(isSending || isSuccess) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent-brown'
          }`}
      >
        {isSending ? 'Sending...' : isSuccess ? 'Message Sent!' : 'Send Message'}
      </button>

      {status === 'error' && (
        <p className="text-red-500 text-center font-bold italic">Something went wrong. Please try again or email us directly.</p>
      )}
    </form>
  );
}

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className="border-b border-neutral-light-beige last:border-b-0">
      <button
        className={`w-full py-6 px-4 md:px-6 flex justify-between items-center text-left focus:outline-none group transition-all duration-300 ${isOpen ? 'bg-neutral-white shadow-sm rounded-t-xl' : 'hover:bg-neutral-white hover:shadow-sm rounded-xl'}`}
        onClick={onClick}
      >
        <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-accent-brown' : 'text-text-dark group-hover:text-accent-brown'}`}>
          {faq.question}
        </span>
        <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-brown' : 'text-text-light group-hover:text-accent-brown'}`}>
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
            className="overflow-hidden bg-neutral-white shadow-sm rounded-b-xl px-4 md:px-6"
          >
            <p className="pb-6 pt-2 text-base md:text-lg text-text-medium leading-relaxed">
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
      <section className="about-hero max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
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

      {/* Direct Contact Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-neutral-off-white/80 p-8 md:p-12 rounded-2xl shadow-soft"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-4 uppercase tracking-wide">
              Still Have Questions?
            </h2>
            <p className="text-base md:text-lg text-text-medium max-w-2xl mx-auto">
              Drop us a line and our team will get back to you personally within a few hours.
            </p>
          </div>

          <ContactForm />

          <div className="mt-16 pt-10 border-t border-neutral-light-beige flex flex-col md:flex-row items-center justify-center gap-8 text-sm font-bold uppercase tracking-widest text-text-light">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              hello@thriftonyte.com
            </div>
            <div className="hidden md:block w-1 h-1 bg-neutral-light-beige rounded-full"></div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-green" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.044-4.661 5.147-4.661 8.905 0 .789.083 1.553.246 2.308L2.75 22l2.502-.826c.63.321 1.335.572 2.07.75 5.256 1.476 10.931-2.026 12.407-7.282s-2.026-10.931-7.282-12.407c-.955-.268-1.922-.401-2.901-.401zM0 11.993C0 5.366 5.366 0 12 0s12 5.366 12 12-5.366 12-12 12c-2.125 0-4.129-.515-5.893-1.728L0 24l1.735-5.221C.516 16.107 0 14.105 0 11.993z" />
              </svg>
              +91 9510381376
            </div>
          </div>
        </motion.div>
      </section>

      <Newsletter highlighted={true} />
      <Footer />
    </main>
  );
}
