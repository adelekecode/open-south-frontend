import { Outlet } from "react-router-dom";
import axios from "axios";
import { useCurrentUser } from "~/queries/user";
import { axiosPrivate } from "~/utils/api";
import AppLoader from "~/components/loader/app-loader";
import useAppStore from "~/store/app";

export default function GetCurrentUser() {
  const { langId, setLangId } = useAppStore();

  const { isLoading } = useCurrentUser(["/auth/users/me/"], {
    queryFn: async () => {
      if (!langId) {
        const { data } = await axios.get("/public/IP/");

        setLangId(data.instance.id);
      }

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
