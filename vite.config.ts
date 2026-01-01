import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate huge React libraries into a stable 'vendor' chunk
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Separate UI utilities
          ui: ['@google/genai'] // Keep AI stuff separate if used, so it doesn't block main load
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase warning limit slightly for vendor chunk
  }
})