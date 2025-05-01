import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import apiReplace from './plugins/api-replace';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiReplace()],
  base: '/front_5th_chapter2-3',
  build: {
    outDir: 'docs',
  },
  server: {
    proxy: {
      '/api': {
        // target: 'https://jsonplaceholder.typicode.com',
        target: 'https://dummyjson.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
