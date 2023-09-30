import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import WiiireApp from "./app/WiiireApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: "'Roboto Mono', monospace",
        headings: {
          fontWeight: "600",
          sizes: {
            h1: { fontWeight: "900" },
          },
        },
      }}
    >
      <WiiireApp />
    </MantineProvider>
  </StrictMode>
);
