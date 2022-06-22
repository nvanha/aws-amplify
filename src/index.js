import Amplify from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import awsconfig from "./aws-exports";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
