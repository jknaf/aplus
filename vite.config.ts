import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv, type Plugin } from 'vite'

// Nur lokal (npm run dev): /api/skate-preise wie auf Vercel bedienen. Code aus .env.local (SKATE_PREIS_CODE).
const lokaleApi = (): Plugin => ({
  name: 'lokale-api',
  apply: 'serve',
  configureServer(server) {
    process.env.SKATE_PREIS_CODE ??= loadEnv('development', process.cwd(), '').SKATE_PREIS_CODE
    server.middlewares.use('/api/skate-preise', async (req, res) => {
      let roh = ''
      for await (const teil of req) roh += teil
      const { default: handler } = await server.ssrLoadModule('/api/skate-preise.ts')
      const antwort = {
        status(c: number) { res.statusCode = c; return antwort },
        setHeader(k: string, v: string) { res.setHeader(k, v); return antwort },
        json(d: unknown) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(d)); return antwort },
      }
      handler({ method: req.method, body: roh }, antwort)
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(), lokaleApi()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
           if (id.includes('node_modules')) {
             // 3D-Viewer nur im Katalog nachladen, nicht im allgemeinen Vendor-Paket
             if (/node_modules\/(@google\/model-viewer|three|@monogrid|lit|@lit|lit-html|lit-element)\//.test(id)) return 'katalog-3d';
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
