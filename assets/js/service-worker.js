const cache_name = 'lesters-portfolio-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/portfolio-details.html',
  '/assets/css/main.css',
  '/assets/css/style.css',
  '/assets/css/accessibility.css',
  '/assets/img/icon.png',
  '/assets/icon.gif',
  '/assets/hero-bg.jpg',
  '/assets/img/profile-img.gif',
  '/assets/js/main.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cache_name)
      .then(async cache => {
        console.log('Opened cache');
        try {
          return await cache.addAll(urlsToCache.map(url => new Request(url, { cache: 'reload' })));
        } catch (error) {
          console.error('Failed to cache', error);
        }
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
