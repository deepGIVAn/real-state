import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH_DOMAIN}
        clientId={import.meta.env.VITE_AUTH_CLIENTID}
        authorizationParams={{
          // redirect_uri: import.meta.env.VITE_APP_CLIENT,
          redirect_uri: "https://real-state-client-rho.vercel.app",
          // redirect_uri: "http://localhost:5173",
        }}
        audience="https://real-state-e55r.vercel.app"
        // audience={import.meta.env.VITE_APP_API}
        scope="openid profile email"
      >
        <App />
      </Auth0Provider>
    </MantineProvider>
  </React.StrictMode>
);
