import "./css/index.css";
import React from "react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./context/AuthContext";
import MoviesProvider from "./context/MoviesContext";
import { createRoot } from "react-dom/client";
import SearchValueProvider from "./context/SearchValueContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <MoviesProvider>
        <SearchValueProvider>
          <App />
        </SearchValueProvider>
      </MoviesProvider>
    </AuthProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
