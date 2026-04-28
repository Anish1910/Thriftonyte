import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client } from '../lib/sanity';
import LearnCard from '../components/LearnCard';
import LearnModal from '../components/LearnModal';

export default function LearnPage() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTip, setSelectedTip] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);

  const categories = ['all', 'style', 'care', 'think', 'hacks'];

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "learnTip"] | order(_createdAt desc){
            _id,
            title,
            category,
            coverImage,
            short,
            tips
          }`
        );
        setTips(data?.filter(Boolean) || []);
      } catch (error) {
        console.error('Error fetching tips:', error);
        setTips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  const safeTips = tips.filter(Boolean);

  const filteredTips = selectedCategory === 'all'
    ? safeTips
    : safeTips.filter(tip => tip?.category?.toLowerCase() === selectedCategory);

  const handleCardClick = (tip, index) => {
    if (tip?._id) {
      setSelectedTip(tip);
      setModalIndex(index);
    }
  };

  const handleNextTip = () => {
    if (!selectedTip) return;
    const currentIndex = filteredTips.findIndex(t => t?._id === selectedTip?._id);
    const nextIndex = (currentIndex + 1) % filteredTips.length;
    setSelectedTip(filteredTips[nextIndex]);
    setModalIndex(nextIndex);
  };

  const handlePrevTip = () => {
    if (!selectedTip) return;
    const currentIndex = filteredTips.findIndex(t => t?._id === selectedTip?._id);
    const prevIndex = (currentIndex - 1 + filteredTips.length) % filteredTips.length;
    setSelectedTip(filteredTips[prevIndex]);
    setModalIndex(prevIndex);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-white flex items-center justify-center">
        <p className="text-lg text-text-medium">Loading tips...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark mb-4 uppercase tracking-wide">
            Learn Thrift. Style Better.
          </h1>
          <p className="text-base md:text-lg text-text-light max-w-2xl mx-auto font-medium">
            Quick reads. Real tips. No fluff.
          </p>
        </motion.div>
      </section>

      {/* Filter Pills */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sticky top-0 bg-neutral-white/80 backdrop-blur-sm z-40">
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.08 }}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedTip(null);
              }}
              animate={{
                scale: selectedCategory === category ? 1.05 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`px-4 md:px-5 py-2 rounded-full font-medium text-xs uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-accent-brown text-white shadow-soft'
                  : 'bg-neutral-off-white text-text-medium hover:bg-neutral-warm-beige border border-neutral-light-beige'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Tips Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={selectedCategory}
        >
          {filteredTips.map((tip, index) => (
            tip && (
              <LearnCard
                key={tip?._id}
                tip={tip}
                onClick={() => handleCardClick(tip, index)}
              />
            )
          ))}
        </motion.div>

        {filteredTips.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-text-light text-lg">No tips here yet. Check back soon!</p>
          </motion.div>
        )}
      </section>

      {/* Modal */}
      {selectedTip && (
        <LearnModal
          selectedTip={selectedTip}
          filteredTips={filteredTips}
          modalIndex={modalIndex}
          onClose={() => setSelectedTip(null)}
          onNext={handleNextTip}
          onPrev={handlePrevTip}
        />
      )}
    </main>
  );
}
