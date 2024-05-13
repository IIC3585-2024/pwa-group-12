window.addEventListener('load', registerSW);

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('../pwa/service-worker.js');
      console.log('SW registration successful');
    } catch (e) {
      console.log('SW registration failed', e);
    }

    try {
      const registration = await navigator.serviceWorker.register('/js/push-notifications-sw.js');
      console.log('Service Worker FIREBASE registered with scope: ', registration.scope);
    } catch (err) {
      console.log('Service Worker FIREBASE registration failed: ', err);
    }
  } else {
    console.log('Service Worker is not supported in this browser');
  }
}

export { registerSW };