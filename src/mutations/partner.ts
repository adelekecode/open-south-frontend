import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { notifyError } from "~/utils/toast";

export function useSendPartnerRequest() {
  return useMutation(
    async (
      data: Record<
        | "organisation_name"
        | "contact_person"
        | "email"
        | "phone"
        | "organisation_type"
        | "description",
        string
      >
    ) => {
      const { data: response } = await axios.postForm(`/public/partners/request/?key=public`, data);

      return response;
    },
    {
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError(
              "An error occurred while sending the partner request. Please check your input field. If the error persists, please contact us."
            );
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
