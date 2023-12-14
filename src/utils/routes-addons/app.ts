import { fetchAccessTokenIfRefreshTokenExists } from "~/utils/api";

export async function appLoader() {
  try {
    await fetchAccessTokenIfRefreshTokenExists();

    return null;
  } catch (error) {
    return null;
  }
}
