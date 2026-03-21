import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { fadeInVariants } from '../constants/animations';
import { VALUES } from '../constants/aboutContent';

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            About Thriftonyte
          </h1>
          <p className="text-xl text-text-medium leading-relaxed">
            We believe that fashion should be sustainable, accessible, and joyful. Every piece tells a story.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-6">Our Mission</h2>
          <p className="text-lg text-text-medium leading-relaxed mb-4">
            At Thriftonyte, we're committed to making sustainable fashion accessible to everyone. We carefully curate pre-loved clothing and accessories that combine quality, style, and environmental responsibility.
          </p>
          <p className="text-lg text-text-medium leading-relaxed">
            By choosing vintage and pre-loved pieces, you're not just making a fashion statement—you're making a positive impact on our planet. Less waste, more style, better world.
          </p>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((value, idx) => (
              <motion.div
                key={idx}
                className="p-8 bg-neutral-off-white rounded-minimal border border-neutral-light-beige"
                whileHover={{ shadow: '0 8px 24px rgba(0,0,0,0.12)' }}
              >
                <h3 className="text-2xl font-bold text-accent-brown mb-4">{value.title}</h3>
                <p className="text-text-medium leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="mb-16 bg-neutral-warm-beige p-8 md:p-12 rounded-minimal"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-6">Our Story</h2>
          <p className="text-lg text-text-medium leading-relaxed mb-4">
            Thriftonyte was born from a passion for sustainable fashion and a love for the unique character of vintage pieces. We saw a gap in the market for a curated marketplace where quality, style, and environmental consciousness come together.
          </p>
          <p className="text-lg text-text-medium leading-relaxed">
            Today, we're proud to be a growing community of fashion lovers who believe that the most stylish choice is also the most sustainable one.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-6">Join the Movement</h2>
          <p className="text-lg text-text-medium mb-8 max-w-2xl mx-auto">
            Explore our collection of carefully curated pre-loved fashion and make a difference with every purchase.
          </p>
          <a
            href="/shop"
            className="inline-block px-8 py-4 bg-accent-brown text-white font-semibold rounded-minimal hover:bg-accent-green transition-colors duration-300"
          >
            Start Shopping
          </a>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
