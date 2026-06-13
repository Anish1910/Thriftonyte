import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';

export default function ShopFilters({ categories = [] }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Get all selected categories from URL (supports multiple)
  const selectedCategories = searchParams.getAll('category');
  const selectedGender = searchParams.get('gender') || '';
  const isAllCategoriesSelected = selectedCategories.length === 0;
  const isAllGenderSelected = !selectedGender;

  // Build URL with combined params
  const buildUrl = (newCategories, newGender) => {
    const params = new URLSearchParams();
    (newCategories || []).forEach((cat) => params.append('category', cat));
    if (newGender) params.set('gender', newGender);
    const qs = params.toString();
    return qs ? `/shop?${qs}` : '/shop';
  };

  // Handle category toggle
  const handleCategoryToggle = (slug) => {
    let newCategories;
    if (selectedCategories.includes(slug)) {
      newCategories = selectedCategories.filter((cat) => cat !== slug);
    } else {
      newCategories = [...selectedCategories, slug];
    }
    navigate(buildUrl(newCategories, selectedGender));
  };

  // Handle gender selection
  const handleGenderSelect = (gender) => {
    const newGender = gender === selectedGender ? '' : gender;
    navigate(buildUrl(selectedCategories, newGender));
  };

  // Clear all filters
  const handleClearAll = () => {
    navigate('/shop');
  };

  // Label for the mobile toggle button
  const activeCategoryLabel = isAllCategoriesSelected
    ? 'All'
    : selectedCategories
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(', ');

  const activeGenderLabel = selectedGender
    ? selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1)
    : 'All';

  const hasActiveFilters = !isAllCategoriesSelected || !isAllGenderSelected;

  return (
    <div className="bg-neutral-warm-beige/40 border-b border-neutral-warm-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-5 md:pt-4 md:pb-6">

        {/* ===== DESKTOP: stacked layout (hidden below md) ===== */}
        <div className="hidden md:block">
          <div className="flex flex-col gap-6">
            {/* Gender Filter */}
            <div>
              <p className="text-[10px] text-text-light uppercase tracking-[0.2em] mb-3 font-semibold">GENDER</p>
              <div className="flex gap-2">
                <button
                  onClick={handleClearAll}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isAllGenderSelected && isAllCategoriesSelected
                      ? 'bg-accent-brown text-white shadow-soft'
                      : 'text-text-dark hover:bg-neutral-white/60'
                  }`}
                >
                  All
                </button>
                {['men', 'women'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => handleGenderSelect(gender)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedGender === gender
                        ? 'bg-accent-brown text-white shadow-soft'
                        : 'text-text-dark hover:bg-neutral-white/60'
                    }`}
                  >
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <p className="text-[10px] text-text-light uppercase tracking-[0.2em] mb-3 font-semibold">CATEGORY</p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to={buildUrl([], selectedGender)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isAllCategoriesSelected
                      ? 'bg-accent-brown text-white shadow-soft'
                      : 'text-text-dark hover:bg-neutral-white/60'
                  }`}
                >
                  All
                </Link>

                {categories.map((category) => {
                  const isSelected = selectedCategories.includes(category.slug.current);
                  return (
                    <button
                      key={category.slug.current}
                      onClick={() => handleCategoryToggle(category.slug.current)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-accent-brown text-white shadow-soft'
                          : 'text-text-dark hover:bg-neutral-white/60'
                      }`}
                    >
                      {category.name}
                      {isSelected && <span className="text-xs opacity-80">✕</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clear all */}
            {hasActiveFilters && (
              <div className="flex justify-end mt-1">
                <button
                  onClick={handleClearAll}
                  className="text-xs text-text-light hover:text-accent-brown transition-colors underline underline-offset-2"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ===== MOBILE: collapsible dropdown (visible below md) ===== */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="w-full flex items-center justify-between py-1"
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
                Filters{hasActiveFilters && <span className="ml-1 text-accent-brown">●</span>}
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
              maxHeight: mobileOpen ? '400px' : '0px',
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            <div className="pt-3 pb-1 space-y-4">
              {/* Gender */}
              <div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => { handleGenderSelect(''); }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isAllGenderSelected
                        ? 'bg-accent-brown text-white shadow-soft'
                        : 'text-text-dark bg-neutral-white/70 hover:bg-neutral-white'
                    }`}
                  >
                    All
                  </button>
                  {['men', 'women'].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => handleGenderSelect(gender)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        selectedGender === gender
                          ? 'bg-accent-brown text-white shadow-soft'
                          : 'text-text-dark bg-neutral-white/70 hover:bg-neutral-white'
                      }`}
                    >
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <p className="text-[10px] text-text-light uppercase tracking-[0.2em] mb-2 font-semibold">Category</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={buildUrl([], selectedGender)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isAllCategoriesSelected
                        ? 'bg-accent-brown text-white shadow-soft'
                        : 'text-text-dark bg-neutral-white/70 hover:bg-neutral-white'
                    }`}
                  >
                    All
                  </Link>

                  {categories.map((category) => {
                    const isSelected = selectedCategories.includes(category.slug.current);
                    return (
                      <button
                        key={category.slug.current}
                        onClick={() => handleCategoryToggle(category.slug.current)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                          isSelected
                            ? 'bg-accent-brown text-white shadow-soft'
                            : 'text-text-dark bg-neutral-white/70 hover:bg-neutral-white'
                        }`}
                      >
                        {category.name}
                        {isSelected && <span className="text-[10px] opacity-80">✕</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clear all */}
              {hasActiveFilters && (
                <button
                  onClick={() => { handleClearAll(); setMobileOpen(false); }}
                  className="text-xs text-text-light hover:text-accent-brown transition-colors underline underline-offset-2"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
