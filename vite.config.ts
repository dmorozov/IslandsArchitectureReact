import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'src/pages/home/index.html'),
        about: resolve(__dirname, 'src/pages/about/index.html'),
      },
    },
  },
  server: {
    open: '/src/pages/home/index.html',
  },
});
