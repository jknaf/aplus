import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This is required for Vercel's serverless functions to work in development
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
