export default function Footer() {
  const CURRENT_YEAR = new Date().getFullYear();
  const TAGLINE = 'Sustainable Fashion Marketplace - Pre-loved, Carefully Curated';

  return (
    <footer className="bg-text-dark text-white py-12 mt-16 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-neutral-off-white/80 mb-2">
          &copy; {CURRENT_YEAR} Thriftonyte. All rights reserved.
        </p>
        <p className="text-sm text-neutral-off-white/60">{TAGLINE}</p>
      </div>
    </footer>
  );
}
