const CACHE_NAME = "nailsbyceline-v1";
const urlsToCache = ["/", "/css/styles.css", "/images/og-image.jpg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});
