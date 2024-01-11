import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.tsx";
import ReactQueryProvider from "./providers/react-query.tsx";
import Toast from "./components/toast.tsx";
import AppLoader from "./components/loader/app-loader.tsx";
import LogoutModal from "./components/logout-modal.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<AppLoader />}>
          <App />
          <LogoutModal />
        </Suspense>
      </ThemeProvider>
    </ReactQueryProvider>
    <Toast />
  </React.StrictMode>
);
