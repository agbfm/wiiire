import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WiiireApp from "./app/WiiireApp.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WiiireApp />
  </StrictMode>
);
