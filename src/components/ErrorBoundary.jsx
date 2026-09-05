import { Component } from 'react';

/**
 * Catches render-time crashes anywhere below it so a single bad component
 * (or a bad value in localStorage) shows a way out instead of a white screen.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Unhandled UI error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-neutral-white">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-extrabold text-text-dark uppercase tracking-wide mb-3">
            Something broke on our end
          </h1>
          <p className="text-text-medium mb-8">
            Not your fault. Reload the page, or head back to the shop and keep browsing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-accent-brown text-white font-semibold rounded-minimal uppercase tracking-wide text-sm"
            >
              Reload
            </button>
            <a
              href="/shop"
              className="px-6 py-3 border border-neutral-light-beige text-text-dark font-semibold rounded-minimal uppercase tracking-wide text-sm"
            >
              Back to Shop
            </a>
          </div>
        </div>
      </div>
    );
  }
}
