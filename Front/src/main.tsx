import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.tsx";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Nanvar.tsx";
import "./index.css";
import { StoreProvider } from "./contexts/StoreContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Navbar />
        <Router />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
