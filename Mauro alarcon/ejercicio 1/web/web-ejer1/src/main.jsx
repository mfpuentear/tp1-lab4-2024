import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "web-ejer1/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);