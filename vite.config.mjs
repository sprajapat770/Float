import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  logLevel: 'info', 
  root: 'core/theme', // Adjust to point to the theme directory within core
  build: {
    outDir: '../../dist', // Build output directory
    emptyOutDir: true, // Ensure the output directory is emptied before building
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'core/components'),
    },
  },
  server: {
    host: true,
    strictPort: true,
    port: 3000, // This is the port which we will use in docker
    // Thanks @sergiomoura for the window fix
    // add the next lines if you're using windows and hot reload doesn't work
     watch: {
       usePolling: true
     }
  }
});
