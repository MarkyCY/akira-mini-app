const CACHE_NAME = 'og-image-cache-v1';
const CACHE_EXPIRATION = 12 * 60 * 60 * 1000; // 12 horas en milisegundos

// Función para verificar si una respuesta ha expirado
const hasExpired = (cachedResponse) => {
  if (!cachedResponse) return true;
  const cacheDate = new Date(cachedResponse.headers.get('date')).getTime();
  const now = new Date().getTime();
  return now - cacheDate > CACHE_EXPIRATION;
};

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
        // Verifica si hay respuesta en caché y si no ha expirado
        if (cachedResponse && !hasExpired(cachedResponse)) {
          return cachedResponse;
        }

        // Si no hay caché o expiró, hace una nueva solicitud
        return fetch(request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});