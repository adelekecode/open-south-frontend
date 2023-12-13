import axios, { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { notifyError } from "~/utils/toast";

function useCreateTags() {
  return useMutation(
    async (data: any) => {
      const { data: response } = await axios.post(`/tags`, data);

      return response;
    },
    {
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Error occured while creating tags");
          } else {
            if (typeof error === "string") {
              notifyError(error);
            }
          }
        }
      },
    }
  );
}

export { useCreateTags };
