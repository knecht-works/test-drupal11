// Front-end entry bundled by Vite. The Styleguide Kit itself still comes from
// knecht.works; this bundle only proves that a Vite-built script runs on the
// page: the "Vite bundle" row starts as "not loaded" server-side and flips
// once this module executes, so an e2e check can tell the two apart.
const status = document.querySelector('[data-vite-status]')
if (status) {
  status.textContent = `loaded (${import.meta.env.MODE})`
  status.dataset.viteStatus = 'loaded'
}
