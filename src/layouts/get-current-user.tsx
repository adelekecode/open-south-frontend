import { Outlet } from "react-router-dom";
import axios from "axios";
import { useCurrentUser } from "~/queries/user";
import { axiosPrivate } from "~/utils/api";
import AppLoader from "~/components/loader/app-loader";

export default function GetCurrentUser() {
  const { isLoading } = useCurrentUser(["/auth/users/me/"], {
    queryFn: async () => {
      const accessToken = axiosPrivate.defaults.headers.common["Authorization"];

      if (!accessToken) return null;

      const { data } = await axios.get("/auth/users/me/", {
        headers: {
          Authorization: accessToken,
        },
      });

      return data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <AppLoader />;
  }

  return <Outlet />;
}
