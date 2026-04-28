import { useState, useEffect, useCallback } from 'react';
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
import AnimatedRoutes from './components/AnimatedRoutes';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
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

      <Router>
        <ScrollToTop />
        <div
          className="min-h-screen"
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.6s ease-out',
          }}
        >
          <Header onCartToggle={() => setIsCartOpen(!isCartOpen)} />
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

          <AnimatedRoutes />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
