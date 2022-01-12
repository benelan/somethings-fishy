import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { defineCustomElements } from "@esri/calcite-components/dist/custom-elements";

defineCustomElements(window);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
