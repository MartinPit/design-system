import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/bodoni-moda/standard.css";
import "@fontsource-variable/source-serif-4/standard.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./styles/tokens.css";
import "./styles/base.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
