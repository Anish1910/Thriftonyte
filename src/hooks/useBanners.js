import { useState, useEffect } from 'react';
import { fetchActiveBanners } from '../lib/sanity';

export const useBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBanners = async () => {
      try {
        setLoading(true);
        const data = await fetchActiveBanners();
        setBanners(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch banners:', err);
        setError(err.message);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    getBanners();
  }, []);

  return { banners, loading, error };
};
