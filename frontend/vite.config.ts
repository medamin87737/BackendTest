import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy pour appeler le backend Nest sans problème de CORS
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // On enlève le préfixe /api pour correspondre aux routes Nest (/users/login, etc.)
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
