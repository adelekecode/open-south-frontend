import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { notifyError } from "~/utils/toast";
import { axiosPrivate } from "~/utils/api";

function useSendMessage() {
  return useMutation(
    async (data: Record<"fullName" | "email" | "message", string>) => {
      const { data: response } = await axiosPrivate.post(`/send-message/`, data);

      return response;
    },
    {
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Error occured while sending messaging");
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

export { useSendMessage };
