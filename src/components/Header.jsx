import { useState } from 'react';
import { useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { to: '/shop', label: 'Shop', color: 'accent-brown' },
  { to: '/about', label: 'About', color: 'accent-green' },
  { to: '/learn', label: 'Learn', color: 'accent-green' }
];

const getNavLinkClass = ({ isActive }, color = 'accent-brown') =>
  `text-sm font-medium uppercase tracking-wider transition-colors ${
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-extrabold text-text-dark hover:text-accent-brown transition-colors tracking-tight uppercase">
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
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-text-dark hover:text-accent-brown transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-3/4 max-w-xs bg-white z-50 md:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-neutral-light-beige">
                  <span className="text-lg font-bold text-text-dark uppercase tracking-wider">Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-text-medium hover:text-accent-brown transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="flex-1 p-6 space-y-6">
                  {NAV_ITEMS.map((item, index) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `block text-xl font-semibold transition-all duration-300 border-l-2 pl-4 uppercase tracking-wide ${
                          isActive
                            ? `border-${item.color} text-${item.color}`
                            : 'border-transparent text-text-dark hover:border-accent-brown hover:text-accent-brown'
                        }`
                      }
                      end={item.end}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="p-6 border-t border-neutral-light-beige">
                  <p className="text-xs text-text-light">
                    Limited pieces. Once gone, gone.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
