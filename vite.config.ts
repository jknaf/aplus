import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
           // Separate huge React libraries into a stable 'vendor' chunk
           if (id.includes('node_modules')) {
             if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
               return 'vendor-react';
             }
             return 'vendor';
           }
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
})