import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { useRef } from 'react';

export default function Shop() {
  const productsRef = useRef(null);

  const handleScrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <Hero onShopClick={handleScrollToProducts} />

      <div ref={productsRef}>
        <ProductGrid products={products} />
      </div>

      <Footer />
    </main>
  );
}
