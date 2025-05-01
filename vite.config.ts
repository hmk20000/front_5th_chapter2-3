import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-replace',
      transform(code, id) {
        if (id.includes('api')) {
          return code.replace(/\/api/g, 'https://dummyjson.com');
        }
      },
    },
  ],
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
