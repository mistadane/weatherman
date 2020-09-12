const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/css/responsive.css',
    '/js/main.js',
    '/js/app.js',
    '/assets/4207299.jpg',
    '/assets/cloud-icon.svg',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600&display=swap'
]

self.addEventListener('install', evt => {
    //console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell event');
            cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', evt => {
    console.log('service worker activated');
});

self.addEventListener('fetch', evt => {
   // console.log('service worker activated', evt);
   evt.respondWith(
       caches.match(evt.request).then(cacheRes => {
           return cacheRes || fetch(evt.request);
       })
   );
});