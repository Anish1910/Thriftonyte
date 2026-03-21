import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import LearnSection from '../components/LearnSection';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { articles } from '../data/articles';

export default function Home() {
  return (
    <main>
      <Hero />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ProductGrid products={products} />
      </motion.div>

      <LearnSection articles={articles} />

      <Footer />
    </main>
  );
}
