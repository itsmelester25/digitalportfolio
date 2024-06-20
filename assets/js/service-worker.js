const cache_name = 'lesters-portfolio-cache-v1';
const urlsToCache = [
  '/index.html',
  '/portfolio-details.html',
  '/css/main.css',
  '/css/style.css',
  '/css/accessibility.css',
  '/img/icon.png',
  '/img/icon.gif',
  '/img/hero-bg.jpg',
  '/img/profile-img.gif',
  '/js/main.js'

];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cache_name)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [cache_name];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});