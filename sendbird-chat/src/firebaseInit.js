import firebase from "firebase";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD2cSquxlHh1NW15YjUgBabp9Z9KTHmbkc",
  authDomain: "sendbird-app.firebaseapp.com",
  projectId: "sendbird-app",
  storageBucket: "sendbird-app.appspot.com",
  messagingSenderId: "401774333233",
  appId: "1:401774333233:web:9913ecdb4a90588b3ef410",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

//Request the browser's permission to send notifications and resolves with a token if the request is granted
export const requestFirebaseNotificationPermission = () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return;
  }
  Notification.requestPermission().then(function (result) {
    console.log(result);
    if (result === "denied") {
      console.log("Notifications are disabled");
      return;
    } else {
      messaging
        .getToken({
          vapidKey:
            "BCmqusyFU7cztqEpEYq5Semk5Z0jKFVHdzU2EwUcMPH_kopPQ_CODVS_zpzmlvWntb6-YVSpzG9TPRQFq8V3Myc",
        })
        .then((token) => {
          console.log(token);
          
          localStorage.setItem("notification-token",token)
          //Add token to cloud firestore, to make it safely accessible
          const db = firebase.firestore();
          db.settings({
            timestampsInSnapshots: true
          });
          db.collection("notifications").add({
            token: token
          });
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token: ", err);
        });
    }
  });
};

messaging.onMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received message ", payload);
  new Notification(payload.data.title, {
    body: payload.data.body,
    icon: '/sb_logo.png'
  });
});

export { messaging };
export default firebase;
