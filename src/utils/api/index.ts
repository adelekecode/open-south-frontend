import axios from "axios";
import { captureException } from "@sentry/react";
import { logout } from "./logout";
import { REFRESH_TOKEN_KEY } from "~/app-constants";
import refreshToken from "./refresh-token";
import { notifyError } from "../toast";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const axiosPrivate = axios.create();

let refreshPromise: Promise<any> | null = null;

axiosPrivate.defaults.headers.common.Accept = "application/json";
axiosPrivate.defaults.headers.post["Content-Type"] = "application/json";

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      error?.response?.data?.non_field_errors ||
      error?.response?.data ||
      error?.message ||
      "Network Error";

    const status = error?.response?.status;

    if (status === 401) {
      if (message === "Token is invalid or expired" || message === "Token is blacklisted") {
        logout();
      } else if (
        message === "Given token not valid for any token type" ||
        message === "Authentication credentials were not provided."
      ) {
        const sessionToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);
        let token = localStorage.getItem(REFRESH_TOKEN_KEY) || sessionToken;

        token = token ? JSON.parse(token) : undefined;

        if (token) {
          if (!refreshPromise) {
            refreshPromise = refreshToken(token).then(() => {
              refreshPromise = null;
            });
          }

          try {
            const { data } = await refreshPromise;
            const refresh = JSON.stringify(data.refresh);

            if (sessionToken) {
              sessionStorage.setItem(REFRESH_TOKEN_KEY, refresh);
            } else {
              localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
            }

            axiosPrivate.defaults.headers.common["Authorization"] = "Bearer " + data.access;

            return axiosPrivate.request(error?.config);
          } catch (e) {
            logout();
          }
        } else {
          logout();
        }
        // } else if (status && status.toString().includes("50")) {
      } else return Promise.reject(message);
    } else if (status === 400) {
      if (message?.[0] === "clientIP instance not found") {
        const appStore = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("app-store"))));

        try {
          const { data } = await axios.get("/public/IP/");

          localStorage.setItem(
            "app-store",
            JSON.stringify({
              ...appStore,
              state: {
                lang: data.instance.lang,
                langId: data.instance.id,
              },
            })
          );
        } catch (error) {
          localStorage.removeItem("app-store");
          window.location.reload();
        }
      }
    } else if (status?.toString()[0] === "5") {
      captureException(error);

      if (status === 500) {
        notifyError("Something went wrong. Please try again later.");
      }

      return Promise.reject(message);
    } else if (message === "Network Error" && !status) {
      notifyError("Offline. Check your network connection.");

      return Promise.reject(error);
    } else return Promise.reject(error);
  }
);

export async function fetchAccessTokenIfRefreshTokenExists() {
  const sessionToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);
  let token = localStorage.getItem(REFRESH_TOKEN_KEY) || sessionToken;

  token = token ? JSON.parse(token) : undefined;

  if (token && axiosPrivate.defaults.headers.common["Authorization"]) {
    return null;
  }

  if (token) {
    const data = await refreshToken(token);

    const refresh = JSON.stringify(data.refresh);

    if (sessionToken) {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, refresh);
    } else {
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
    }

    axiosPrivate.defaults.headers.common["Authorization"] = "Bearer " + data.access;
  } else {
    throw new Error("Token not found");
  }
}

// On localStorage value change from another tab, logout
window.addEventListener("storage", (event) => {
  if (event.key === REFRESH_TOKEN_KEY && !event.newValue) {
    logout();
  }
});
