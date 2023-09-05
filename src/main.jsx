import "./index.css";
import React from "react";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <RecoilRoot>
        <App />
    </RecoilRoot>
  </BrowserRouter>
);
