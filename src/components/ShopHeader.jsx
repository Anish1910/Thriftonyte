import { motion } from 'framer-motion';

export default function ShopHeader({ settings }) {
  const title = settings?.title || "Limited. Authentic. Yours.";
  const subtitle = settings?.subtitle || "One piece only. Once gone, gone.";
  
  const videoUrl = settings?.backgroundVideo?.asset?.url;
  const imageUrl = settings?.backgroundImage?.asset?.url;
  
  const hasBackground = !!(videoUrl || imageUrl);

  return (
    <section className="w-full bg-neutral-white px-4 sm:px-6 lg:px-8 pt-4">
      <div 
        className={`shop-header-inner max-w-7xl mx-auto relative overflow-hidden transition-all duration-500 ease-out ${
          hasBackground 
            ? 'bg-neutral-warm-beige rounded-2xl shadow-md grid grid-cols-1 grid-rows-1' 
            : 'bg-transparent pt-12 pb-2 md:pt-16 md:pb-3 px-0'
        }`}
      >
        {/* Background Media */}
        {hasBackground && (
          <>
            {videoUrl ? (
              <video
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="col-start-1 row-start-1 w-full h-auto object-cover"
              />
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="Shop Header Background"
                className="col-start-1 row-start-1 w-full h-auto object-cover"
              />
            ) : null}
            
            {/* Subtle premium overlay for contrast & readability */}
            <div className="col-start-1 row-start-1 bg-black/10 backdrop-blur-[0.5px] z-10" />
          </>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`col-start-1 row-start-1 z-20 w-full flex flex-col justify-center ${
            hasBackground 
              ? 'px-6 py-10 md:px-12 md:py-14 text-white' 
              : 'text-text-dark space-y-3'
          }`}
        >
          {/* Title - Brand-driven, extrabold with tight tracking */}
          <h1 className={`text-3xl md:text-4xl font-extrabold tracking-wide uppercase ${hasBackground ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]' : 'text-text-dark'}`}>
            {title}
          </h1>

          {/* Subtext */}
          <p className={`text-sm md:text-base max-w-lg mt-3 ${hasBackground ? 'text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]' : 'text-text-light'}`}>
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
