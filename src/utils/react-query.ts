import { QueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "./api";
import axios from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const appStore = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("app-store"))));

        let langId = appStore.state.langId;

        if (!langId) {
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

          langId = data.instance.id;
        }

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
