import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function NotFound() {
  useDocumentMeta({
    title: 'Page not found',
    description: 'That page has moved on. Browse the pieces that are still here.',
    noindex: true,
  });

  return (
    <main>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-text-light mb-5">Error 404</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-dark uppercase tracking-wide mb-4">
          This page found its new home
        </h1>
        <p className="text-text-medium mb-10">
          The link you followed doesn't exist, or the piece it pointed to has already been claimed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/shop"
            className="px-8 py-4 bg-accent-brown text-white font-semibold rounded-minimal uppercase tracking-wide text-sm"
          >
            Browse the shop
          </Link>
          <Link
            to="/"
            className="px-8 py-4 border border-neutral-light-beige text-text-dark font-semibold rounded-minimal uppercase tracking-wide text-sm"
          >
            Go home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
