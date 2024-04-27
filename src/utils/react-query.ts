import { QueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "./api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const appStore = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("app-store"))));

        const langId = appStore.state.langId;

        let url = queryKey.join("/");

        if (url.includes("?")) {
          url = url + "&lang_id=" + langId;
        } else {
          url = url + "?lang_id=" + langId;
        }

        const { data } = await axiosPrivate.get(url);

        return data;
      },
    },
  },
});
