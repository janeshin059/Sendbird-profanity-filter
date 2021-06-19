import "./App.css";
import { App as SendbirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import { APP_ID, NICKNAME, USER_ID } from "./const.js";
import React from "react";
import { requestFirebaseNotificationPermission } from "./firebaseInit";

function App() {
 
  requestFirebaseNotificationPermission();

  return (
    <div className="App" style={{ height: 600 }}>
      <SendbirdApp
        appId={APP_ID}
        userId={USER_ID}
        nickname={NICKNAME}
      ></SendbirdApp>
    </div>
  );
}

export default App;
