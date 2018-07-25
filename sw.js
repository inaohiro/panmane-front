importScripts('https://www.gstatic.com/firebasejs/5.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '958465683662'
});

const messaging = firebase.messaging();

self.addEventListener("push", function (event) {
  event.waitUntil(
    self.registration.showNotification(event.data.json().notification.title, {
      body: "Push notifiaction!!!",
      icon: "/images/icons-192png"
    })
  );
});

// if the app running in foreground 
messaging.onMessage(function (payload) {
  console.log('Message received. ', payload);
  // ...
});


// if the app runninng in background
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'My Push Notification!!!';
  var notificationOptions = {
    body: 'Message body.',
    icon: '/images/icons-192.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});