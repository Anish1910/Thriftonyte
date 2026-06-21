import { motion } from 'framer-motion';
import { useState } from 'react';
import { useFormSubmit } from '../hooks/useFormSubmit';

export default function Newsletter({ highlighted = false }) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const { status, message, submit, reset } = useFormSubmit();

  const isSending = status === 'loading';
  const isSuccess = status === 'success';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return; // honeypot filled — silently bail
    await submit("newsletter", { email, website: honeypot });
    setEmail('');
    setTimeout(() => reset(), 5000);
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
            {isSuccess ? 'You\'re In!' : 'Join The List'}
          </h2>
          <p className={`text-base md:text-lg mb-8 max-w-2xl mx-auto font-medium ${highlighted ? 'text-neutral-off-white/90' : 'text-text-medium'}`}>
            {isSuccess
              ? 'Thank you for subscribing! Check your inbox soon for some thrifty magic.'
              : 'Get early access to our latest drops, exclusive offers, and thrifting tips directly in your inbox.'}
          </p>

          <form className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
            {/* Honeypot field — invisible to real users, bots will fill it */}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', overflow: 'hidden' }} aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={isSending || isSuccess}
              className={`flex-grow px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all font-medium ${highlighted
                  ? 'bg-white/10 text-neutral-white placeholder-white/60 border border-white/20 focus:ring-white focus:bg-white/20'
                  : 'bg-neutral-white text-text-dark border border-neutral-light-beige focus:ring-accent-brown focus:border-accent-brown'
                } ${isSuccess ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <button
              type="submit"
              disabled={isSending || isSuccess}
              className={`px-8 py-4 font-bold rounded-lg uppercase tracking-wider transition-colors duration-300 flex-shrink-0 ${highlighted
                  ? 'bg-neutral-white text-accent-brown hover:bg-neutral-off-white shadow-soft'
                  : 'bg-text-dark text-neutral-white hover:bg-accent-brown shadow-soft'
                } ${(isSending || isSuccess) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSending ? 'Joining...' : isSuccess ? 'Subscribed' : 'Subscribe'}
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
