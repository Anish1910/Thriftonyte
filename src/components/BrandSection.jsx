import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeInVariants, cardVariants } from '../constants/animations';

export default function BrandSection() {
  const values = [
    {
      icon: '♻️',
      title: 'Second Life',
      description: 'Every piece gets a fresh start. No waste, just possibility.'
    },
    {
      icon: '⭐',
      title: 'Quality Over Trends',
      description: 'We hunt for pieces that last. Fashion that actually means something.'
    },
    {
      icon: '👗',
      title: 'One of a Kind',
      description: 'No mass production. Each item is unique and carries its own story.'
    }
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
      >
        {/* Left: Brand message */}
        <motion.div variants={textVariants}>
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
            Why Thriftonyte
          </h2>
          <p className="text-lg text-text-medium leading-relaxed mb-8">
            We believe fashion should be better. Better for you, better for the planet. That's why we curate pre-loved pieces—authentic, unique, and meaningful. No fast fashion here, just timeless style that actually lasts.
          </p>

          {/* Values */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="flex gap-4"
              >
                <div className="text-3xl flex-shrink-0">{value.icon}</div>
                <div>
                  <h3 className="font-semibold text-text-dark mb-1">{value.title}</h3>
                  <p className="text-text-light">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={cardVariants} className="mt-10">
            <Link
              to="/about"
              className="inline-block px-8 py-4 bg-accent-brown text-white font-semibold rounded-minimal hover:bg-accent-green transition-colors duration-300"
            >
              Learn Our Story
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: Visual element */}
        <motion.div
          variants={fadeInVariants}
          className="relative"
        >
          <div className="aspect-square rounded-minimal overflow-hidden shadow-hover bg-gradient-to-br from-neutral-warm-beige to-neutral-off-white flex items-center justify-center">
            <div className="text-center px-8">
              <p className="text-6xl mb-4">♻️</p>
              <p className="text-xl font-semibold text-text-dark mb-3">From Closet to Closet</p>
              <p className="text-text-medium">Where pre-loved fashion finds its next passionate owner</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
