// data を cache に保存，off-line 対応
//
// var cacheName = "weather2018072401";
// var filesToCache = [
//   "/",
//   "/index.html",
//   "/dist/bundle.js",
//   "/css/index.css",
//   "/images/icon-192.png",
//   "images/tenki-icon-rain.png",
//   "images/tenki-icon-sunny.png",
//   "images/push.png",
//   "images/senzai.png",
//   "images/setting.png"
// ];
//
// self.addEventListener("install", function(e) {
//   console.log("[Service worker] Install");
//   e.waitUntil(
//     caches.open(cacheName).then(function(cache) {
//       console.log("[Service worker] Caching");
//       return cache.addAll(filesToCache);
//     })
//   );
// });
//
// self.addEventListener("activate", function(e) {
//   console.log("[Service worker] Activate");
//   e.waitUntil(
//     caches.keys().then(function(keyList) {
//       return Promise.all(
//         keyList.map(function(key) {
//           console.log("[Service worker] Removing old cache", key);
//           return cache.delete(key);
//         })
//       );
//     })
//   );
// });
//

// 通知
// push event handler
self.addEventListener("push", function(event) {
  event.waitUntil(
    self.registration.showNotification(event.data.json().notification.title, {
      body: event.data.json().notification.body,
      icon: "/icon.png"
    })
  );
});
