import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { StoreProvider } from "./context/store";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_API;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StoreProvider>
);
