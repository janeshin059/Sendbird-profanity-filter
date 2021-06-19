import './App.css';
import { App as SendbirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import {APP_ID, NICKNAME, USER_ID} from './const.js'
import React from 'react';
import { requestFirebaseNotificationPermission } from './firebaseInit'

function App() {
  
  // fetching the GET route from the Express server which matches the GET route from server.js
 const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  //componentDidMount() {
    callBackendAPI()
      .catch(err => console.log(err));
  //};

  //Request the browser's permission to send notifications 
  if(!localStorage.getItem("notification-token")){
  requestFirebaseNotificationPermission();
  }

  return (
    <div className="App" style={{height:600}}>
      <SendbirdApp appId={APP_ID} userId={USER_ID} nickname={NICKNAME}></SendbirdApp>
    </div>
  );
}

export default App;
