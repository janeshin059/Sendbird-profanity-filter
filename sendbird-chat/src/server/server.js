const express = require("express");
var admin = require("firebase-admin");
const PORT = process.env.PORT || 9000;

//Firebase messaging setup
const serviceAccount = require("./sendbird-app-firebase-admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//Initialize express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Array to store registration token
let tokens = [];

//Get token from firestore
const db = admin.firestore();
const tokenRef = db.collection("notifications").doc("tokens");
tokenRef.get().then((doc) => {
  if (doc.exists) {
    console.log("Document data:", doc.data().token);
    tokens.push(doc.data().token);
  } else {
    console.log("No such document!");
  }
});

app.post("/hook", (req, res) => {
  const body = req.body;

  console.log(body);
  if (body.category === "profanity_filter:replace" && tokens.length > 0) {
    console.log("Profanity replaced");
    notify(body.payload.message);
  } else {
    console.log("Unhandled event:", body.category);
  }
  return res.sendStatus(200);
});

//Send notifications to all clients using FCM
function notify(body) {
  console.log("Profanity filter");
  const message = {
    data: { title: "Profanity filter", body: body },
    tokens: tokens,
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

app.get("/hook", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});
