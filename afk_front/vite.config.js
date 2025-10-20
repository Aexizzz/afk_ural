import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Оптимизация для SEO и производительности
    rollupOptions: {
      output: {
        // Разделение кода для лучшего кэширования
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          utils: ['axios']
        }
      }
    },
    // Минификация для лучшей производительности
    minify: 'esbuild'
  },
  // Оптимизация для разработки
  server: {
    headers: {
      'Cache-Control': 'no-cache'
    }
  }
})
