import { REFRESH_TOKEN_KEY } from "~/app-constants";

export function logout() {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  window.location.href = "/login";
}
