// vite.config.ts (No extra dependency)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": "/src",   // ← Ye bhi 100% chalega
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});