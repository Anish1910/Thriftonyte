import { useNavigate, useSearchParams, Link } from 'react-router-dom';

export default function ShopFilters({ categories = [] }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


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

  return (
    <div className="bg-neutral-warm-beige/40 border-b border-neutral-warm-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xs md:text-sm text-text-light uppercase tracking-wider mb-5">Filter by category</p>
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
    </div>
  );
}
