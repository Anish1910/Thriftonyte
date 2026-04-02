import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeInVariants, cardVariants } from '../constants/animations';

export default function BrandSection() {
  const values = [
    {
      title: 'No Mass Production',
      description: 'One piece only. Period.'
    },
    {
      title: 'Quality That Lasts',
      description: 'We hunt pieces worth keeping. Timeless > trendy.'
    },
    {
      title: 'Every Piece Matters',
      description: 'Unique. Authentic. With a story to tell.'
    }
  ];

  const imageGrid = [
    { id: 1, color: 'from-accent-brown/20 to-accent-brown/5' },
    { id: 2, color: 'from-neutral-warm-beige/40 to-neutral-warm-beige/10', overlay: 'picked better. not more.' },
    { id: 3, color: 'from-accent-green/20 to-accent-green/5' }
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
            not fast fashion.
            <br/>
            <span className="text-accent-brown">better.</span>
          </h2>
          <p className="text-lg text-text-medium leading-relaxed mb-8">
            no mass production. no repeats. just pieces worth keeping.
          </p>

          {/* Values */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="flex gap-4"
              >
                <div className="w-1 bg-accent-brown flex-shrink-0 rounded-full" />
                <div>
                  <h3 className="font-semibold text-text-dark mb-1">{value.title}</h3>
                  <p className="text-text-light text-sm">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={cardVariants} className="mt-10">
            <Link
              to="/about"
              className="inline-block px-8 py-4 bg-accent-brown text-white font-semibold rounded-minimal hover:bg-accent-green transition-colors duration-300 lowercase"
            >
              see our story
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: Image Grid */}
        <motion.div
          variants={fadeInVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {imageGrid.map((item, index) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className={`aspect-square rounded-lg overflow-hidden shadow-soft bg-gradient-to-br ${item.color} flex items-center justify-center group`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {item.overlay && (
                <motion.div
                  className="absolute inset-0 rounded-lg flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-sm md:text-base font-bold text-white drop-shadow-lg lowercase">
                    {item.overlay}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
