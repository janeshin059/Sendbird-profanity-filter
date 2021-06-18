importScripts('https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.7/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyD2cSquxlHh1NW15YjUgBabp9Z9KTHmbkc",
  authDomain: "sendbird-app.firebaseapp.com",
  projectId: "sendbird-app",
  storageBucket: "sendbird-app.appspot.com",
  messagingSenderId: "401774333233",
  appId: "1:401774333233:web:9913ecdb4a90588b3ef410"
  });

const initMessaging = firebase.messaging();

initMessaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const title = 'Filtered bad words!';
  const options = {
    body: payload.data.body,
    icon: './sb_logo.svg'
  }
  self.registration.showNotification(title, options);
})

