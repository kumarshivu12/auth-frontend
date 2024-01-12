import React from "react";
import ReactDOM from "react-dom/client";

//components
import App from "./App.jsx";
import "./index.css";
import SettingsProvider from "./context/SettingsContext.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <SettingsProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SettingsProvider>
  </>
);
