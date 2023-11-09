import axios from "axios";
import { logout } from "./logout";
import { REFRESH_TOKEN_KEY } from "~/app-constants";
import refreshToken from "./refresh-token";

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

    if (error?.response?.status === 401) {
      if (message === "Token is invalid or expired" || message === "Token is blacklisted") {
        logout();
      } else if (
        message === "Given token not valid for any token type" ||
        message === "Authentication credentials were not provided."
      ) {
        const token = localStorage.getItem(REFRESH_TOKEN_KEY);

        if (token) {
          if (!refreshPromise) {
            refreshPromise = refreshToken(token).then(() => {
              refreshPromise = null;
            });
          }

          try {
            const { data } = await refreshPromise;

            localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
            axiosPrivate.defaults.headers.common["Authorization"] = "Bearer " + data.access;

            return axiosPrivate.request(error?.config);
          } catch (e) {
            logout();
          }
        } else {
          logout();
        }
      } else return Promise.reject(message);
    } else return Promise.reject(message);
  }
);

export async function fetchUserIfTokenExists() {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY);

  if (token && axiosPrivate.defaults.headers.common["Authorization"]) {
    return null;
  }

  if (token) {
    const data = await refreshToken(token);

    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
    axiosPrivate.defaults.headers.common["Authorization"] = "Bearer " + data.access;
  } else {
    throw new Error("No token found");
  }
}

// On localStorage value change from another tab, logout
window.addEventListener("storage", (event) => {
  if (event.key === "t-token" && !event.newValue) {
    logout();
  }
});
