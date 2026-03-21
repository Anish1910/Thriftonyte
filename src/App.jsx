import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Cart from './components/Cart';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import LearnPage from './pages/LearnPage';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-neutral-white">
          <Header onCartToggle={() => setIsCartOpen(!isCartOpen)} />
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/learn" element={<LearnPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
