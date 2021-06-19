
var firebase = require("firebase");

const express = require("express");
var admin = require("firebase-admin");

//Firebase messaging setup
const serviceAccount = require('./sendbird-app-firebase-admin.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//Initialize express and define port
const app = express();
const PORT = process.env.PORT || 9000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Get token from firestore
// const db = admin.firestore();
// const tokenRef = db.collection('notifications').doc('54dLaTKx4XmxdMceR88w');
// const doc = tokenRef.get();
// console.log(tokenRef);
// if (!doc.exists) {
//   console.log('No such document!');
// } else {
//   console.log('Document data:', doc.data());
// }

let tokens = ['cd0dfjDqetvMf_-RKDD9IT:APA91bHoxF51nXzNmaIizvRhEXj_0m0pfnuS9VJRP-9f8FOx3qcVrraY1g4G2rvDk7Y6QJkyQb160V_cdx2s-xetM9i-AdRGl9Qz_y2QjZ_4Hlw7eom79O21pdNnAZY6f_w26JFvMR2t'];

//TODO:Sendbird Webhook
app.post('/hook', (req, res) => {
  const body = req.body;

  console.log(body);
  if (body.category === "profanity_filter:replace") {
    console.log('profanity replaced')
    notify(body.payload.message);
  } else {
    console.log("Unhandled event:", body.category);
  }
  return res.sendStatus(200);
});

function notify(body) {
  console.log('Profanity filter');
  const message = {
    data: { title: "Profanity filter", body: body },
    tokens: tokens
  };
  admin
    .messaging()
    .sendMulticast(message)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log("Error sending notifications:", error);
    });
}

app.listen(PORT, () => console.log(`App running at port ${PORT}!`));

app.get('/hook', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); 