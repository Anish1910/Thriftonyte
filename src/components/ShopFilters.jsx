import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { CATEGORIES } from '../data/products';

export default function ShopFilters() {
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
    <div className="bg-white border-b border-neutral-light-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-sm text-text-light mb-4">Filter by category:</p>
        <div className="flex flex-wrap gap-3">
          {/* All button */}
          <Link
            to="/shop"
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              isAllSelected
                ? 'bg-accent-brown text-white shadow-soft'
                : 'bg-neutral-warm-beige text-text-dark hover:bg-neutral-light-beige hover:shadow-soft'
            }`}
          >
            All
          </Link>

          {/* Category buttons with toggle */}
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategories.includes(category.slug);
            return (
              <button
                key={category.slug}
                onClick={() => handleCategoryToggle(category.slug)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-accent-brown text-white shadow-soft'
                    : 'bg-neutral-warm-beige text-text-dark hover:bg-neutral-light-beige hover:shadow-soft'
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
