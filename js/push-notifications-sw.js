importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCOvdK8FAsCeN0dLciv0cm729QCxPR-u9Q",
  authDomain: "ucount-g12.firebaseapp.com",
  projectId: "ucount-g12",
  storageBucket: "ucount-g12.appspot.com",
  messagingSenderId: "433673046487",
  appId: "1:433673046487:web:06150e33cb8bca97602392",
  measurementId: "G-V8R94K14F7"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '../images/maskable.png'
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '../images/maskable.png'
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
