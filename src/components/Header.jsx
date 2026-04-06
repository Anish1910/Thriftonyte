import { useState } from 'react';
import { useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true, color: 'accent-brown' },
  { to: '/shop', label: 'Shop', color: 'accent-brown' },
  { to: '/about', label: 'About', color: 'accent-green' },
  { to: '/learn', label: 'Learn', color: 'accent-green' }
];

const getNavLinkClass = ({ isActive }, color = 'accent-brown') =>
  `text-sm font-medium transition-colors ${
    isActive
      ? `text-${color}`
      : `text-text-medium hover:text-${color}`
  }`;

export default function Header({ onCartToggle }) {
  const { getTotalItems } = useCart();
  const totalItems = useMemo(() => getTotalItems(), [getTotalItems]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-light-beige shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold text-text-dark hover:text-accent-brown transition-colors">
          Thriftonyte
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => getNavLinkClass({ isActive }, item.color)}
              end={item.end}
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={onCartToggle}
            className="relative p-2 text-text-medium hover:text-accent-brown transition-colors"
            aria-label="Open cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m10 0l2 9m-12 0h14" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-accent-brown text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onCartToggle}
            className="relative p-2 text-text-medium hover:text-accent-brown transition-colors"
            aria-label="Open cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m10 0l2 9m-12 0h14" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-accent-brown text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-text-medium hover:text-accent-brown transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-neutral-light-beige bg-white px-4 py-4 space-y-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block text-base font-medium transition-colors ${
                  isActive
                    ? `text-${item.color}`
                    : `text-text-medium hover:text-${item.color}`
                }`
              }
              end={item.end}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
