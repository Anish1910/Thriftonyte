import { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Cart from './components/Cart';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import LearnPage from './pages/LearnPage';
import Contact from './pages/Contact';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef();

  // Force scroll to top on initial page load / refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // If we're coming back to /shop from a product detail page, don't scroll to top
    // This allows the user to maintain their position in the grid
    const isReturningFromProduct = pathname === '/shop' && prevPathRef.current?.startsWith('/product/');

    if (!isReturningFromProduct) {
      window.scrollTo(0, 0);
    }

    prevPathRef.current = pathname;
  }, [pathname]);

  return null;
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingFinished = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <CartProvider>
      {/* Branded loading screen */}
      <LoadingScreen onFinished={handleLoadingFinished} />

      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <div
          className="min-h-screen bg-neutral-white"
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.6s ease-out',
          }}
        >
          <Header onCartToggle={() => setIsCartOpen(!isCartOpen)} />
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
