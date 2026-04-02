import { memo } from 'react';
import { motion } from 'framer-motion';

function LearnModal({
  selectedTip,
  filteredTips,
  modalIndex,
  onClose,
  onNext,
  onPrev,
}) {
  if (!selectedTip) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 opacity-100 transition-opacity duration-200"
      style={{ display: selectedTip ? 'flex' : 'none' }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl opacity-100 transition-opacity duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-light-beige p-4 md:p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark lowercase flex-grow">
            {selectedTip.title}
          </h2>
          <motion.button
            onClick={onClose}
            className="text-text-light hover:text-text-dark transition-colors flex-shrink-0 ml-4"
            whileHover={{ scale: 1.1 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        {/* Modal Content */}
        <div className="p-4 md:p-6">
          <span className="text-xs font-semibold text-accent-brown uppercase tracking-wider capitalize mb-4 inline-block">
            {selectedTip.category}
          </span>

          {selectedTip.tips && selectedTip.tips.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-text-dark mb-4 lowercase">
                tips:
              </h3>
              <ul className="space-y-3">
                {selectedTip.tips.map((tip, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-3 text-base text-text-medium"
                  >
                    <span className="text-accent-brown font-bold flex-shrink-0 mt-0.5">•</span>
                    <span>{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer - Navigation */}
        {filteredTips.length > 1 && (
          <div className="sticky bottom-0 bg-white border-t border-neutral-light-beige p-4 md:p-6 flex items-center justify-between">
            <motion.button
              onClick={onPrev}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 text-text-dark font-semibold hover:text-accent-brown transition-colors lowercase"
            >
              ← prev
            </motion.button>
            <span className="text-sm text-text-light font-medium">
              {modalIndex + 1} / {filteredTips.length}
            </span>
            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 text-text-dark font-semibold hover:text-accent-brown transition-colors lowercase"
            >
              next →
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default memo(LearnModal);
