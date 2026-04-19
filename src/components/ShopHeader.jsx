import { motion } from 'framer-motion';

export default function ShopHeader() {
  return (
    <section className="w-full bg-white">
      <div className="shop-header-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="space-y-3"
        >
          {/* Title - Brand-driven, extrabold with tight tracking */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-dark tracking-wide uppercase">
            Limited. Authentic. Yours.
          </h1>

          {/* Subtext */}
          <p className="text-sm md:text-base text-text-light max-w-lg">
            One piece only. Once gone, gone.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
