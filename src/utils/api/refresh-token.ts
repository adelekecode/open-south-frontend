import axios from "axios";

export default async function refreshToken(token: string) {
  const { data } = await axios.post<{
    access: string;
    refresh: string;
  }>("/auth/jwt/refresh/", {
    refresh: token,
  });

  return data;
}
