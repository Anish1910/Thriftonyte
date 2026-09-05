import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { client } from '../lib/sanity';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function About() {
  useDocumentMeta({
    title: 'About',
    description:
      "Why Thriftonyte exists — curated pre-loved fashion, one piece at a time. No restocks, no fast fashion.",
    path: '/about',
  });

  const [aboutSettings, setAboutSettings] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "aboutPage"][0]{
        badgeSectionTitle,
        badgeSectionSubtitle,
        badges[]->{name, description, order}
      }`)
      .then(setAboutSettings)
      .catch(console.error);
  }, []);

  // Fall back to fetching all badges directly if aboutPage settings don't exist yet
  const [allBadges, setAllBadges] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "badge"] | order(order asc) { name, description, order }`)
      .then(setAllBadges)
      .catch(console.error);
  }, []);

  const badges = aboutSettings?.badges?.length > 0
    ? [...aboutSettings.badges].sort((a, b) => (a.order || 0) - (b.order || 0))
    : allBadges;

  const badgeTitle = aboutSettings?.badgeSectionTitle || 'Our Badges';
  const badgeSubtitle = aboutSettings?.badgeSectionSubtitle || 'Every badge means something. Here\'s what they stand for.';

  return (
    <main className="min-h-screen bg-neutral-white">
      {/* Hero Section */}
      <section className="about-hero max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-dark mb-6 leading-[1] tracking-wide uppercase">
            We Don't Follow Trends.
            <br />
            We Find Them.
          </h1>
          <p className="text-base md:text-lg text-text-light max-w-3xl mx-auto font-medium">
            No mass production. No restocks. Just pieces that matter.
          </p>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="about-philosophy bg-neutral-off-white/50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.15 }}
            viewport={{ once: true }}
          >
            {/* Block 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-2xl md:text-3xl font-extrabold text-text-dark leading-tight mb-4 uppercase tracking-wide">
                Fast Fashion Is Loud.
              </p>
              <p className="text-xl text-accent-brown font-semibold">
                We're not.
              </p>
            </motion.div>

            {/* Block 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-2xl md:text-3xl font-extrabold text-text-dark leading-tight mb-4 uppercase tracking-wide">
                We Pick.
              </p>
              <p className="text-xl text-accent-brown font-semibold">
                You wear.
              </p>
            </motion.div>

            {/* Block 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-2xl md:text-3xl font-extrabold text-text-dark leading-tight mb-4 uppercase tracking-wide">
                Once It's Gone,
              </p>
              <p className="text-xl text-accent-brown font-semibold">
                It's gone.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Badges Section */}
      {badges.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-4 uppercase tracking-wide">
              {badgeTitle}
            </h2>
            <p className="text-base md:text-lg text-text-light mb-12 md:mb-16 max-w-2xl">
              {badgeSubtitle}
            </p>
          </motion.div>

          <div className="border-t border-neutral-light-beige">
            {badges.map((badge, idx) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="grid grid-cols-[auto_1fr] md:grid-cols-[180px_1fr] gap-4 md:gap-8 items-center py-5 md:py-6 border-b border-neutral-light-beige group hover:bg-neutral-off-white/30 transition-colors duration-200 px-2 md:px-4 rounded-sm"
              >
                <span className="inline-flex items-center px-4 py-1.5 bg-accent-brown/10 text-accent-brown text-sm font-bold uppercase tracking-wider rounded-full whitespace-nowrap">
                  {badge.name}
                </span>
                <p className="text-base md:text-lg text-text-medium">
                  {badge.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="bg-neutral-off-white/50 py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-text-dark mb-12 md:mb-16 uppercase tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>

          <div className="space-y-8 md:space-y-12">
            {[
              { num: '01', title: 'We Source Pieces', desc: 'Hunt for quality. Hunt for character. Hunt for pieces worth keeping.' },
              { num: '02', title: 'We Curate Hard', desc: "No trash. No duplicates. Just things we'd actually wear." },
              { num: '03', title: "You Grab Before It's Gone", desc: 'One piece only. First come, first served. Make your move.' }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="flex gap-6 md:gap-10 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-neutral-light-beige flex-shrink-0">
                  {step.num}
                </div>
                <div className="flex-grow pt-2">
                  <h3 className="text-xl md:text-2xl font-bold text-text-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-text-light">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-text-dark mb-12 md:mb-16 uppercase tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Us
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {[
              'No Duplicates',
              'No Overstock',
              'No Waste',
              'Just Curated Drops'
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 rounded-full bg-accent-brown flex-shrink-0" />
                <p className="text-xl md:text-2xl font-semibold text-text-dark">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-base md:text-lg text-text-light mb-8 font-medium">
            Ready? Let's go.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-accent-brown text-white font-bold text-sm md:text-base rounded-lg hover:bg-accent-green transition-all duration-300 group uppercase tracking-wider"
          >
            Find Your Next Piece
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </motion.div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
