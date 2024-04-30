import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import toast, { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
      <Toaster />
    </PersistGate>
  </Provider>
);
