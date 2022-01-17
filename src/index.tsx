import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { setAssetPath } from "@esri/calcite-components/dist/components";
setAssetPath(`https://unpkg.com/@esri/calcite-components/dist/calcite/assets`);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
