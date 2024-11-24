const CACHE_NAME = 'og-image-cache-v1';

// Escucha el evento de instalación para precargar contenido, si es necesario
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
});

// Intercepta las solicitudes y almacena en caché
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Filtra solo las solicitudes de imágenes
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Usa la versión en caché si está disponible
        }

        return fetch(request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone()); // Guarda en caché
            return networkResponse;
          });
        });
      })
    );
  }
});
