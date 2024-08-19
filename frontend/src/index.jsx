import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App";

ReactDOM.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
    <Router>
      <App />
    </Router>
  </GoogleOAuthProvider>
  , document.getElementById("root")
);