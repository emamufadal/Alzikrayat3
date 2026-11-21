import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// During development the API calls are proxied to the Express server,
// so the client can simply call fetch('/api/photos').
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
});
