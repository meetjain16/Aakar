import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { SITE_ORIGIN, sitemapEntries } from './src/lib/routes'

/**
 * Emits sitemap.xml from the app's own route table, so adding a page cannot
 * leave the sitemap stale. Runs on build only; there is nothing to serve in dev.
 */
function sitemap(): Plugin {
  return {
    name: 'aakar-sitemap',
    apply: 'build',
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10)
      const urls = sitemapEntries
        .map(
          ({ path, priority }) =>
            `  <url>\n` +
            `    <loc>${SITE_ORIGIN}${path}</loc>\n` +
            `    <lastmod>${lastmod}</lastmod>\n` +
            `    <changefreq>monthly</changefreq>\n` +
            `    <priority>${priority}</priority>\n` +
            `  </url>`,
        )
        .join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `${urls}\n` +
          `</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env files (VITE_*) into `env` so we can configure the dev proxy.
  const env = loadEnv(mode, process.cwd(), '')
  const useProxy = env.VITE_USE_API_PROXY === 'true'
  const apiTarget = env.VITE_APPSCRIPT_URL || 'http://localhost:3001'

  return {
    plugins: [react(), tailwindcss(), sitemap()],
    build: {
      rollupOptions: {
        output: {
          // Split the vendor runtime out of the page chunk so navigating
          // between routes doesn't re-download React and Radix.
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor'
          },
        },
      },
    },
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
