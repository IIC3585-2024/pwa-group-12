const CACHE_NAME = 'grupo12app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/addEvent.js',
  '/js/classes.js',
  '/js/index.js',
  '/js/update.js',
  '/templates/event.html',
  // Agrega aquí cualquier otro recurso estático que desees cachear
];

self.addEventListener('install', event => {
  // Realiza la instalación del service worker
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // Intercepta las solicitudes de red
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve la respuesta desde el caché si está disponible,
        // o realiza una solicitud de red si no está en caché
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  // Elimina cachés antiguas
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('grup12app-cache-') && cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
