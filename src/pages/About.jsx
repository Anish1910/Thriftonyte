import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-text-dark mb-6 leading-tight lowercase">
            we don't follow trends.
            <br />
            we find them.
          </h1>
          <p className="text-lg md:text-xl text-text-light max-w-3xl mx-auto font-medium lowercase">
            no mass production. no restocks. just pieces that matter.
          </p>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-neutral-off-white/50 py-16 md:py-24">
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
              <p className="text-2xl md:text-3xl font-bold text-text-dark leading-tight mb-4 lowercase">
                fast fashion is loud.
              </p>
              <p className="text-xl text-accent-brown font-semibold lowercase">
                we're not.
              </p>
            </motion.div>

            {/* Block 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-2xl md:text-3xl font-bold text-text-dark leading-tight mb-4 lowercase">
                we pick.
              </p>
              <p className="text-xl text-accent-brown font-semibold lowercase">
                you wear.
              </p>
            </motion.div>

            {/* Block 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-2xl md:text-3xl font-bold text-text-dark leading-tight mb-4 lowercase">
                once it's gone,
              </p>
              <p className="text-xl text-accent-brown font-semibold lowercase">
                it's gone.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-text-dark mb-12 md:mb-16 lowercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          how it works
        </motion.h2>

        <div className="space-y-8 md:space-y-12">
          {[
            { num: '01', title: 'we source pieces', desc: 'hunt for quality. hunt for character. hunt for pieces worth keeping.' },
            { num: '02', title: 'we curate hard', desc: "no trash. no duplicates. just things we'd actually wear." },
            { num: '03', title: "you grab before it's gone", desc: 'one piece only. first come, first served. make your move.' }
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
                <h3 className="text-2xl md:text-3xl font-bold text-text-dark mb-2 lowercase">
                  {step.title}
                </h3>
                <p className="text-base md:text-lg text-text-light lowercase">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-neutral-off-white/50 py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-text-dark mb-12 md:mb-16 lowercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            why us
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {[
              'no duplicates',
              'no overstock',
              'no waste',
              'just curated drops'
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
                <p className="text-xl md:text-2xl font-semibold text-text-dark lowercase">
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
          <p className="text-base md:text-lg text-text-light mb-8 lowercase font-medium">
            ready? let's go.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-accent-brown text-white font-bold text-base md:text-lg rounded-lg hover:bg-accent-green transition-all duration-300 group lowercase"
          >
            find your next piece
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
