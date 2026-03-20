import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-light-beige shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-text-dark hover:text-accent-brown transition-colors">
          Thriftonyte
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-text-medium hover:text-accent-brown transition-colors text-sm font-medium">
            Shop
          </Link>
          <Link to="/learn" className="text-text-medium hover:text-accent-green transition-colors text-sm font-medium">
            Learn
          </Link>
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2 text-text-medium hover:text-accent-brown transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m10 0l2 9m-12 0h14" />
            </svg>
            {getTotalItems() > 0 && (
              <span className="absolute top-1 right-1 bg-accent-brown text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        <button className="md:hidden p-2 text-text-medium">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
