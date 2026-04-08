import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import BrandSection from '../components/BrandSection';
import LearnSection from '../components/LearnSection';
import Footer from '../components/Footer';
import { articles } from '../data/articles';
import { client, urlFor } from '../lib/sanity';

export default function Home() {
  const [banner, setBanner] = useState(null);
  const [homepageSettings, setHomepageSettings] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "banner" && active == true][0]`)
      .then(setBanner)
      .catch(console.error);
  }, []);

  useEffect(() => {
    client
      .fetch(`*[_type == "homepageSettings"][0]{
        heroImages,
        heroText,
        featuredProducts[]->{_id, title, slug, price, images, description, badge},
        featuredCategories[]->{_id, name, slug, image, description},
        brandSections[]{image, link, text}
      }`)
      .then(setHomepageSettings)
      .catch(console.error);
  }, []);


  const featuredProducts = homepageSettings?.featuredProducts || [];
  const featuredCategories = homepageSettings?.featuredCategories || [];

  return (
    <main>
      <Hero settings={homepageSettings} />

      {banner && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full bg-neutral-warm-beige/20 overflow-hidden py-12 md:py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {banner.image && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="rounded-lg overflow-hidden"
                >
                  <img
                    src={urlFor(banner.image).url()}
                    alt={banner.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {banner.title && (
                  <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-4 uppercase tracking-wide">
                    {banner.title}
                  </h2>
                )}
                {banner.subtitle && (
                  <p className="text-base md:text-lg text-text-medium mb-6">
                    {banner.subtitle}
                  </p>
                )}
                {banner.ctaLink && (
                  <a
                    href={banner.ctaLink}
                    className="inline-block px-8 py-3 bg-accent-brown text-white font-semibold rounded-minimal hover:bg-accent-green transition-colors duration-300 uppercase tracking-wide text-sm"
                  >
                    {banner.ctaText || 'Explore'}
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {featuredCategories.length > 0 && <Categories categories={featuredCategories} />}

      {featuredProducts.length > 0 && <FeaturedProducts products={featuredProducts} />}

      <BrandSection sections={homepageSettings?.brandSections} />

      <LearnSection articles={articles} />

      <Footer />
    </main>
  );
}
