import { memo } from 'react';
import { motion } from 'framer-motion';
import Carousel from './Carousel';
import { urlFor } from '../lib/sanity';

function LearnModal({
  selectedTip,
  filteredTips,
  modalIndex,
  onClose,
  onNext,
  onPrev,
}) {
  if (!selectedTip) return null;

  const imageUrl = selectedTip?.coverImage
    ? urlFor(selectedTip.coverImage).width(800).quality(80).url()
    : null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 opacity-100 transition-opacity duration-200"
      onClick={onClose}
    >
      <motion.div
        className="relative bg-neutral-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl opacity-100 transition-opacity duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Image & Overlay */}
        {imageUrl && (
          <div className="absolute inset-0 z-0 pointer-events-none rounded-lg overflow-hidden">
            <img src={imageUrl} alt="" className="w-full h-full object-cover opacity-60" />
            {/* Subtle darkening overlay for text readability without washing it out to white */}
            <div className="absolute inset-0 bg-neutral-900/10"></div>
          </div>
        )}

        <div className="relative z-10 flex flex-col h-full">
          {/* Modal Header */}
          <div className="sticky top-0 bg-transparent border-b border-neutral-light-beige/30 p-4 md:p-6 flex items-center justify-between z-20">
            <h2 className="text-2xl md:text-3xl font-bold text-text-dark lowercase flex-grow drop-shadow-md">
              {selectedTip?.title || 'untitled'}
            </h2>
            <motion.button
              onClick={onClose}
              className="text-text-dark hover:text-accent-brown transition-colors flex-shrink-0 ml-4 bg-neutral-white/30 backdrop-blur-sm rounded-full p-1 shadow-sm"
              whileHover={{ scale: 1.1 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Modal Content */}
          <div className="p-4 md:p-6 flex-grow">
            <span className="text-xs font-semibold text-accent-brown uppercase tracking-wider mb-4 inline-block bg-neutral-white/60 backdrop-blur-sm px-2 py-1 rounded shadow-sm">
              {selectedTip?.category || 'uncategorized'}
            </span>

            {selectedTip?.tips && selectedTip.tips.length > 0 && (
              <div className="mt-6 flex justify-center drop-shadow-lg">
                <Carousel 
                  items={selectedTip.tips.map((tip, idx) => ({
                    id: idx,
                    description: tip,
                    icon: <span className="text-accent-brown font-bold text-lg">•</span>
                  }))}
                  baseWidth={320}
                  autoplay={true}
                  autoplayDelay={3000}
                  pauseOnHover={true}
                  loop={true}
                />
              </div>
            )}
          </div>

          {/* Modal Footer - Navigation */}
          {filteredTips?.length > 1 && (
            <div className="sticky bottom-0 bg-transparent border-t border-neutral-light-beige/30 p-4 md:p-6 flex items-center justify-between z-20 mt-auto">
              <motion.button
                onClick={onPrev}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 text-text-dark font-semibold hover:text-accent-brown transition-colors lowercase drop-shadow-sm"
              >
                ← prev
              </motion.button>
              <span className="text-sm text-text-dark font-medium bg-neutral-white/40 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                {(modalIndex + 1) || 0} / {filteredTips?.length || 0}
              </span>
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 text-text-dark font-semibold hover:text-accent-brown transition-colors lowercase drop-shadow-sm"
              >
                next →
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default memo(LearnModal);
