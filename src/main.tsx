import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import * as Sentry from "@sentry/react";
import theme from "./theme.tsx";
import ReactQueryProvider from "./providers/react-query.tsx";
import Toast from "./components/toast.tsx";
import AppLoader from "./components/loader/app-loader.tsx";
import { GoogleProvider } from "./providers/google.tsx";
import i18n from "./i18n.ts";
import { DialogProvider } from "./providers/dialog.tsx";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN_KEY,
  enabled: import.meta.env.PROD,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost"],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <GoogleProvider>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n} defaultNS={"translation"}>
            <DialogProvider>
              <Suspense fallback={<AppLoader />}>
                <App />
              </Suspense>
            </DialogProvider>
          </I18nextProvider>
        </ThemeProvider>
      </GoogleProvider>
    </ReactQueryProvider>
    <Toast />
  </React.StrictMode>
);
