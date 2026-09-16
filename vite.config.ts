// vite.config.ts (No extra dependency)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": "/src",   
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  
  base: '/ReportingPortal_v3/',
});