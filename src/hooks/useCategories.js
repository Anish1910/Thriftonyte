import { useState, useEffect } from 'react';
import { fetchCategories } from '../lib/sanity';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories();

        // Transform Sanity data to match component expectations
        const transformedCategories = data.map(cat => ({
          ...cat,
          name: cat.name,
          slug: cat.slug?.current || cat.slug,
          imageUrl: cat.image?.asset?.url || cat.image
        }));

        setCategories(transformedCategories);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err.message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return { categories, loading, error };
};
