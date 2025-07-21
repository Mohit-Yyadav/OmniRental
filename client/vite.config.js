import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


const BACKEND_URI = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: BACKEND_URI,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
