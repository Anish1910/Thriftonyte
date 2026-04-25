import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';

export default function ShopFilters({ categories = [] }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Get all selected categories from URL (supports multiple)
  const selectedCategories = searchParams.getAll('category');
  const isAllSelected = selectedCategories.length === 0;

  // Handle category toggle
  const handleCategoryToggle = (slug) => {
    let newCategories;

    if (selectedCategories.includes(slug)) {
      // Remove category if already selected
      newCategories = selectedCategories.filter((cat) => cat !== slug);
    } else {
      // Add category if not selected
      newCategories = [...selectedCategories, slug];
    }

    // Build new URL
    if (newCategories.length === 0) {
      navigate('/shop');
    } else {
      const params = new URLSearchParams();
      newCategories.forEach((cat) => params.append('category', cat));
      navigate(`/shop?${params.toString()}`);
    }
  };

  // Label for the mobile toggle button
  const mobileLabel = isAllSelected
    ? 'All Categories'
    : selectedCategories
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(', ');

  return (
    <div className="bg-neutral-warm-beige/40 border-b border-neutral-warm-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">

        {/* ===== DESKTOP: original horizontal pills (hidden below md) ===== */}
        <div className="hidden md:block">
          <p className="text-sm text-text-light uppercase tracking-wider mb-5">Filter by category</p>
          <div className="flex flex-wrap gap-3">
            {/* All button */}
            <Link
              to="/shop"
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-250 ${
                isAllSelected
                  ? 'bg-accent-brown text-white shadow-soft'
                  : 'text-text-dark hover:bg-white/60 transition-colors duration-250'
              }`}
            >
              All
            </Link>

            {/* Category buttons with toggle */}
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.slug.current);
              return (
                <button
                  key={category.slug.current}
                  onClick={() => handleCategoryToggle(category.slug.current)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-250 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-accent-brown text-white shadow-soft'
                      : 'text-text-dark hover:bg-white/60 transition-colors duration-250'
                  }`}
                >
                  {category.name}
                  {isSelected && <span className="text-sm">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* ===== MOBILE: collapsible dropdown reveal (visible below md) ===== */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="w-full flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-accent-brown"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="text-xs text-text-light uppercase tracking-wider font-medium">
                Filter: <span className="text-text-dark">{mobileLabel}</span>
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 text-text-light transition-transform duration-300 ${mobileOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Collapsible panel */}
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: mobileOpen ? '300px' : '0px',
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            <div className="flex flex-wrap gap-2 pt-3 pb-1">
              {/* All button */}
              <Link
                to="/shop"
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-250 ${
                  isAllSelected
                    ? 'bg-accent-brown text-white shadow-soft'
                    : 'text-text-dark bg-white/70 hover:bg-white'
                }`}
              >
                All
              </Link>

              {/* Category buttons */}
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category.slug.current);
                return (
                  <button
                    key={category.slug.current}
                    onClick={() => {
                      handleCategoryToggle(category.slug.current);
                      // Keep open so user can multi-select
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-250 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-accent-brown text-white shadow-soft'
                        : 'text-text-dark bg-white/70 hover:bg-white'
                    }`}
                  >
                    {category.name}
                    {isSelected && <span className="text-[10px]">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
