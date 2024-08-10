import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "~/utils/toast";
import { axiosPrivate } from "~/utils/api";

export function useSendMessage() {
  return useMutation(
    async (data: Record<"name" | "email" | "message", string>) => {
      const { data: response } = await axiosPrivate.post(
        `/public/support/system/?key=public`,
        data
      );

      return response;
    },
    {
      onSuccess() {
        notifySuccess("Message sent successfully!");
      },
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
