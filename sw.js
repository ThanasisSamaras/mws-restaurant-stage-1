const staticCacheName = 'review-cache-v1';
const assets = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/main.js',
  './js/dbhelper.js',
  './js/restaurant_info.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(staticCacheName)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(assets);
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then( (cacheNames) => {
        return Promise.all(
          cacheNames.filter(function (cacheName) {
            return cacheName.startsWith('review-') &&
                cacheName != staticCacheName;
          }).map(function (cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
