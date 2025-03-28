import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // This must match the filename
import App from "./App";
import reportWebVitals from "./reportWebVitals"; // This must match the filename

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
