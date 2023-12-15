import { fetchAccessTokenIfRefreshTokenExists } from "~/utils/api";

export async function dashboardLoader() {
  try {
    await fetchAccessTokenIfRefreshTokenExists();

    return null;
  } catch (error) {
    return new Response("", {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  }
}
