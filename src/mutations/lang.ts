import axios, { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { notifyError } from "~/utils/toast";
import useAppStore from "~/store/app";

export function useChangeLang() {
  const { langId } = useAppStore();

  return useMutation(
    async ({ lang }: Record<"lang", string>) => {
      const { data: response } = await axios.get(
        `/public/IP/?key=public&lang=${lang}&lang_id=${langId}`
      );

      return response;
    },
    {
      onError(error) {
        if (isAxiosError(error)) {
          notifyError("Error occured while changing language");
          if (typeof error === "string") {
            notifyError(error);
          }
        }
      },
    }
  );
}
