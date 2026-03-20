import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Cart from './components/Cart';
import Home from './pages/Home';
import LearnPage from './pages/LearnPage';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-neutral-white">
          <Header />
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

          {/* Cart toggle button for mobile */}
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="md:hidden fixed bottom-6 right-6 z-40 p-4 bg-accent-brown text-white rounded-full shadow-hover hover:bg-accent-green transition-colors"
            aria-label="Toggle cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m10 0l2 9m-12 0h14" />
            </svg>
          </button>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<LearnPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
