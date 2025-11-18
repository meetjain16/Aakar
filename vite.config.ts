import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env files (VITE_*) into `env` so we can configure the dev proxy.
  const env = loadEnv(mode, process.cwd(), '')
  const useProxy = env.VITE_USE_API_PROXY === 'true'
  const apiTarget = env.VITE_APPSCRIPT_URL || 'http://localhost:3001'

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: useProxy
        ? {
            // Proxy any /api requests (including /api/contact) to the Apps Script /exec URL
            '/api': {
              target: apiTarget,
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path.replace(/^\/api/, ''),
            },
          }
        : {
            // Default: keep existing local proxy (if you run a local server at port 3001)
            '/api': {
              target: 'http://localhost:3001',
              changeOrigin: true,
              secure: false,
            },
          },
    },
  }
})
