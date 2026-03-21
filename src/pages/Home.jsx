import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import BrandSection from '../components/BrandSection';
import LearnSection from '../components/LearnSection';
import Footer from '../components/Footer';
import { products, CATEGORIES } from '../data/products';
import { articles } from '../data/articles';

export default function Home() {
  return (
    <main>
      <Hero />

      <Categories categories={CATEGORIES} />

      <FeaturedProducts products={products} />

      <BrandSection />

      <LearnSection articles={articles} />

      <Footer />
    </main>
  );
}
