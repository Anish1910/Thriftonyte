/** @type {import('tailwindcss').Config} */
// Force rebuild 1
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Premium Palette
        'neutral': {
          'white': '#141210',
          'off-white': '#1A1816',
          'warm-beige': '#24211E',
          'light-beige': '#322E2B',
          'dark': '#0A0908',
        },
        'text': {
          'dark': '#F5F3F0',
          'medium': '#C8B89A',
          'light': '#A39887',
        },
        'accent': {
          'brown': '#8B7355',
          'green': '#7A9B7E',
        }
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '40px',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0,0,0,0.08)',
        'hover': '0 8px 24px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        'minimal': '8px',
      },
      fontFamily: {
        'sans': ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'display': ['Cormorant Garamond', 'Georgia', 'serif'],
      }
    }
  },
  plugins: [],
}
