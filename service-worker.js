self.addEventListener('install', function (event) {
  console.log('Installing service worker...');
  self.skipWaiting(); // Force activation
  event.waitUntil(
    caches.open('converter-cache-v3').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/offline.html',
        '/manifest.json',
        '/ICON.png'
        // Add more assets here if needed
      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('Activating service worker...');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== 'converter-cache-v3') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Force control
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(function (response) {
        return response || caches.match('/offline.html');
      });
    })
  );
});
