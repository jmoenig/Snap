var cacheName = 'snap-pwa';
var filesToCache = [
    'snap.html',
    'src/morphic.js',
    'src/symbols.js',
    'src/widgets.js',
    'src/blocks.js',
    'src/threads.js',
    'src/objects.js',
    'src/scenes.js',
    'src/gui.js',
    'src/paint.js',
    'src/lists.js',
    'src/byob.js',
    'src/tables.js',
    'src/sketch.js',
    'src/video.js',
    'src/maps.js',
    'src/extensions.js',
    'src/xml.js',
    'src/store.js',
    'src/locale.js',
    'src/cloud.js',
    'src/api.js',
    'src/sha512.js',
    'src/FileSaver.min.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
