importScripts('https://www.gstatic.com/firebasejs/5.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '958465683662'
});

self.addEventListener("push", function (event) {
  event.waitUntil(
    self.registration.showNotification(event.data.json().notification.title, {
      body: "Push notifiaction!!!",
      icon: "/images/icons-192png"
    })
  );
});

messaging.onMessage(function (payload) {
  console.log('Message received. ', payload);
  // ...
});