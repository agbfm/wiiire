import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import WiiireApp from "./app/WiiireApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <WiiireApp />
    </MantineProvider>
  </StrictMode>
);
