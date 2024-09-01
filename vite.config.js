import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'core/theme'), // Adjust to point to the theme directory within core
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Build output directory
    emptyOutDir: true, // Ensure the output directory is emptied before building
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'core/components'),
    },
  },
  server: {
    port: 4173,  // Specify the port if needed
    host: true,  // Allow external access
  },
});
