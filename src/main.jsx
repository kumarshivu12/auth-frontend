import React from "react";
import ReactDOM from "react-dom/client";

//components
import App from "./App.jsx";
import "./index.css";
import SettingsProvider from "./context/SettingsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </>
);
