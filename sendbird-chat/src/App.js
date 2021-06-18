import logo from './logo.svg';
import './App.css';
import { App as SendbirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import {APP_ID, USER_ID} from './const.js'

function App() {
  return (
    <div className="App" style={{height:600}}>
      <SendbirdApp appId={APP_ID} userId={USER_ID}></SendbirdApp>
    </div>
  );
}

export default App;
