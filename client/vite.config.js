import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use VITE_BACKEND_URL from .env or fallback to localhost
const backendUrl = process.env?.VITE_BACKEND_URL || 'http://localhost:5000';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
