//import admin from "firebase-admin";
//import { googleApplicationCredentials } from "./settings";

const express = require("express");
var admin = require("firebase-admin");
const crypto = require('crypto');

//Firebase messaging setup

//const serviceAccount = require(googleApplicationCredentials);
const serviceAccount = require('./sendbird-app-firebase-admin.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//Initialize express and define port
const app = express();
const PORT = process.env.PORT || 9000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tokens = ['cd0dfjDqetvMf_-RKDD9IT:APA91bE0leP1WyUocCSgOqgPAVChHqadB7vcNpnLOyvuzqaVen3QCeQlWSICmd-0XXux8aSuY3GNlvGfAWsBJmP1ZR1hKyVH7m3NRnIFD5GtTF4lRnWDvHQHJMEOXaTqgD2TZbtRkcOm'];

// if(localStorage.getItem("notification-token")){
//   tokens.push(localStorage.getItem("notification-token"));
// }

//TODO:Webhook
app.post('/express_backend', (req, res) => {
  const body = req.body;

  // const signature = req.get('x-sendbird-signature');
  // const hash = crypto
  //     .createHmac('sha256','57b27d8fb20ddf493b2d61f3d882a07982bc72d2')
  //     .update(body)
  //     .digest('hex');
  
  // if (signature == hash) {
  //     console.log('Request signature ok');
  //     // move switch statement below here so it executes only when a valid signature is present
  //     res.sendStatus(200);
  // } else {
  //     console.log('Invalid signature, ignoring request');
  //     res.sendStatus(401);
  // }

  console.log(body);

  if (body.category === "profanity_filter:replace") {
    notify(body.payload.message);
  } else {
    console.log("Unhandled event:", body.category);
  }
  return res.sendStatus(200);
});

function notify(body) {
  console.log('Profanity filter');
  const message = {
    data: { title: "Filtered bad words!", body: body },
    tokens: tokens,
  };
  admin
    .messaging()
    .sendMulticast(message)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.lof("Error sending notifications:", error);
    });
}

app.listen(PORT, () => console.log(`App running at port ${PORT}!`));


app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); 