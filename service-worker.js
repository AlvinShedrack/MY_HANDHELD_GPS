self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('converter-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/script.js',
        '/manifest.json',
        '/ICON.png',
        '/offline.html'  // Add offline fallback page to cache
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request).then(function(response) {
        return response || caches.match('/offline.html');
      });
    })
  );
});
