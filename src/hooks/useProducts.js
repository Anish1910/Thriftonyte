import { useState, useEffect } from 'react';
import { fetchProducts, fetchProductsByCategory } from '../lib/sanity';

export const useProducts = (categorySlug = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        let data;

        if (categorySlug) {
          data = await fetchProductsByCategory(categorySlug);
        } else {
          data = await fetchProducts();
        }

        // Transform Sanity data - keep raw images for safe handling with getImage()
        const transformedProducts = data.map(product => ({
          ...product,
          id: product._id,
          category: typeof product.category === 'string'
            ? product.category
            : product.category?.name
        }));

        setProducts(transformedProducts);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [categorySlug]);

  return { products, loading, error };
};
