import firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyD2cSquxlHh1NW15YjUgBabp9Z9KTHmbkc",
  authDomain: "sendbird-app.firebaseapp.com",
  projectId: "sendbird-app",
  storageBucket: "sendbird-app.appspot.com",
  messagingSenderId: "401774333233",
  appId: "1:401774333233:web:9913ecdb4a90588b3ef410"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase