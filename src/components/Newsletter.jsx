import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Newsletter({ highlighted = false }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'sending', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.target);
    formData.append("access_key", "0651478e-a0b1-475b-8c4b-9b98e41c6cfe"); // Replace with actual key
    formData.append("subject", "New Newsletter Subscription");
    formData.append("from_name", "Thriftonyte Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className={`py-16 md:py-24 ${highlighted ? 'bg-accent-brown text-neutral-white' : 'bg-neutral-warm-beige/30 border-t border-neutral-light-beige'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl md:text-4xl font-extrabold uppercase tracking-wide mb-4 ${highlighted ? 'text-neutral-white' : 'text-text-dark'}`}>
            {status === 'success' ? 'You\'re In!' : 'Join The List'}
          </h2>
          <p className={`text-base md:text-lg mb-8 max-w-2xl mx-auto font-medium ${highlighted ? 'text-neutral-off-white/90' : 'text-text-medium'}`}>
            {status === 'success'
              ? 'Thank you for subscribing! Check your inbox soon for some thrifty magic.'
              : 'Get early access to our latest drops, exclusive offers, and thrifting tips directly in your inbox.'}
          </p>

          <form className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={status === 'sending' || status === 'success'}
              className={`flex-grow px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all font-medium ${highlighted
                  ? 'bg-white/10 text-neutral-white placeholder-white/60 border border-white/20 focus:ring-white focus:bg-white/20'
                  : 'bg-neutral-white text-text-dark border border-neutral-light-beige focus:ring-accent-brown focus:border-accent-brown'
                } ${status === 'success' ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className={`px-8 py-4 font-bold rounded-lg uppercase tracking-wider transition-colors duration-300 flex-shrink-0 ${highlighted
                  ? 'bg-neutral-white text-accent-brown hover:bg-neutral-off-white shadow-soft'
                  : 'bg-text-dark text-neutral-white hover:bg-accent-brown shadow-soft'
                } ${(status === 'sending' || status === 'success') ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {status === 'sending' ? 'Joining...' : status === 'success' ? 'Subscribed' : 'Subscribe'}
            </button>
          </form>
          {status === 'error' && (
            <p className="mt-4 text-red-500 font-medium italic">Oops! Something went wrong. Please try again.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
