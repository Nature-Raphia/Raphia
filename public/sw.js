// Service worker minimal : rend le site installable et garde une copie des pages
// pour un affichage hors ligne. Stratégie "réseau d'abord, cache en secours".
const CACHE = 'nature-raphia-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  // Les vidéos sont lues par morceaux (réponses 206) que le cache ne peut pas stocker
  if (request.headers.has('range')) return;

  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(request).then(cached => cached || (request.mode === 'navigate' ? caches.match('/') : undefined))
      )
      .then(response => response || new Response('', { status: 504 }))
  );
});
