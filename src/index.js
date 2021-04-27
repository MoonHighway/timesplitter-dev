import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { GlobalStyle } from "./theme";

localStorage.clear();

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);
