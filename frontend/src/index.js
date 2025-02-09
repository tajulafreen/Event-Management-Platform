import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { EventProvider } from "./context/EventContext";
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EventProvider>
      <App />
    </EventProvider>
  </React.StrictMode>
);
