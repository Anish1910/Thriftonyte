import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev middleware to mock the Vercel serverless /api/contact endpoint locally
function apiMockPlugin() {
  return {
    name: 'api-mock',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        if (req.method === 'OPTIONS') {
          res.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
          res.end();
          return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          const data = JSON.parse(body);
          console.log(`\n[DEV] /api/contact received (type: ${data.type}):`, data);
          console.log('[DEV] In production (Vercel), this sends a real email to support@thriftonyte.com\n');
          res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ success: true, message: data.type === 'newsletter' ? 'Subscribed!' : 'Message received!' }));
        });
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiMockPlugin()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — changes rarely, caches well
          'vendor-react': ['react', 'react-dom'],
          // Animation library — large (~100kB), shared across many components
          'vendor-framer-motion': ['framer-motion'],
          // CMS client — only needed once data fetching starts
          'vendor-sanity': ['@sanity/client', '@sanity/image-url'],
          // GSAP — only used by ChromaGrid, isolate it
          'vendor-gsap': ['gsap'],
          // Router — used on every page but small enough to warrant its own chunk
          'vendor-router': ['react-router-dom'],
        },
      },
    },
  },
})
