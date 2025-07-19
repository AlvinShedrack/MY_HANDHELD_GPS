const CACHE_NAME = 'converter-cache-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/ICON.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();  // Force activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      )
    )
  );
  return self.clients.claim();  // Take control immediately
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        return response || caches.match('/offline.html');
      });
    })
  );
});
