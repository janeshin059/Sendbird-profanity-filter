import logo from './logo.svg';
import './App.css';
import { App as SendbirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

function App() {
  return (
    <div className="App" style={{height:600}}>
      <SendbirdApp appId="C57F7231-5C66-48F0-A0DF-197E55125B1E" userId="johnshin"></SendbirdApp>
    </div>
  );
}

export default App;
