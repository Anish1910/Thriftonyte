import { useRef } from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import LearnSection from '../components/LearnSection';
import { products } from '../data/products';
import { articles } from '../data/articles';

export default function Home() {
  const productsRef = useRef(null);

  const handleShopClick = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <Hero onShopClick={handleShopClick} />

      <div ref={productsRef}>
        <ProductGrid products={products} />
      </div>

      <LearnSection articles={articles} />

      {/* Footer */}
      <footer className="bg-text-dark text-white py-12 mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-neutral-off-white/80 mb-2">
            &copy; 2024 Thriftonyte. All rights reserved.
          </p>
          <p className="text-sm text-neutral-off-white/60">
            Sustainable Fashion Marketplace - Pre-loved, Carefully Curated
          </p>
        </div>
      </footer>
    </main>
  );
}
