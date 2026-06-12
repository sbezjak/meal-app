// @ts-check
import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

// Static site → deploy to GitHub Pages. PWA = installable + offline.
//
// GitHub Pages serves a PROJECT repo under a subpath, e.g. https://you.github.io/meal-app/
//   → keep `base: '/meal-app'` (must match your repo name).
// If you deploy to a USER repo (you.github.io) or a custom domain (root):
//   → set `base: '/'` and update `site` accordingly.
export default defineConfig({
  site: 'https://sbezjak.github.io',
  base: '/meal-app',
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: "The Kitchen - Sara's Meal Prep",
        short_name: "Sara's Kitchen",
        description: 'Cook once, eat all week. Sara’s meal-prep recipes, weekly plan and shopping list.',
        theme_color: '#2f4734',
        background_color: '#f4ede0',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        icons: [
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff,woff2}'],
        navigateFallback: '/',
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
});
