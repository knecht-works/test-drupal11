import { defineConfig } from 'vite'

// Built into web/dist; the drupal/vite module maps the knecht/app library of
// the custom theme (web/themes/custom/knecht/knecht.libraries.yml) onto the
// manifest, or onto the dev server while `npm run dev` is reachable.
export default defineConfig(({ command }) => ({
  // The docroot is not a Vite public dir: it must not be copied into the build.
  publicDir: false,
  // drupal/vite builds dev URLs as <devServerUrl>/<source path> without a
  // base, so the dev server has to serve from the root.
  base: command === 'serve' ? '/' : '/dist/',
  build: {
    manifest: true,
    outDir: 'web/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: ['src/js/app.js', 'src/css/app.css'],
    },
  },
  server: {
    // DDEV: Vite runs inside the web container and is exposed via
    // web_extra_exposed_ports (https://<project>.ddev.site:5173).
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
    cors: {
      origin: /https?:\/\/([A-Za-z0-9\-\.]+)?(localhost|\.local|\.test|\.site)(?::\d+)?$/,
    },
  },
}))
