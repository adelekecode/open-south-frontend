import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import theme from "./theme.tsx";
import ReactQueryProvider from "./providers/react-query.tsx";
import Toast from "./components/toast.tsx";
import AppLoader from "./components/loader/app-loader.tsx";
import { GoogleProvider } from "./providers/google.tsx";
import i18n from "./i18n.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <GoogleProvider>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n} defaultNS={"translation"}>
            <Suspense fallback={<AppLoader />}>
              <App />
            </Suspense>
          </I18nextProvider>
        </ThemeProvider>
      </GoogleProvider>
    </ReactQueryProvider>
    <Toast />
  </React.StrictMode>
);
