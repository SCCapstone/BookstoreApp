// client/src/index.js

import App from "./App";
import { register } from "register-service-worker";

var React = require("react");
var ReactDOM = require("react-dom/client");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
//ReactDOM.render(<App />, document.getElementById("root"));
register();
