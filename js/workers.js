window.addEventListener('load', () => {
  console.log('SW registration in progress');
  registerSW();
});

// Register the Service Worker
async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator
            .serviceWorker
            .register('../pwa/service-worker.js');
      console.log('SW registration successful');
    }
    catch (e) {
      console.log('SW registration failed');
    }
  }
}

export { registerSW };