const cacheName = "gesbook-cache-v1";

const filesToCache = [
"/",
"/index.html",
"/produits.html",
"/vente.html",
"/historique.html",
"/css/style.css",
"/js/app.js"
];

self.addEventListener("install", event => {
event.waitUntil(
caches.open(cacheName).then(cache => {
return cache.addAll(filesToCache);
})
);
});

self.addEventListener("fetch", event => {
event.respondWith(
caches.match(event.request).then(response => {
return response || fetch(event.request);
})
);
});