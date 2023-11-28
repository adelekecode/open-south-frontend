import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "~/utils/api";
import { notifyError } from "~/utils/toast";
import { logout } from "~/utils/api/logout";

export default function useLogout() {
  return useMutation(
    async (refresh_token: string) => {
      const { data: response } = await axiosPrivate.post("/auth/logout/", {
        refresh_token,
      });

      return response;
    },
    {
      onSuccess() {
        logout();
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Error occured while logging out, please try again");
          }
        } else {
          if (typeof error === "string") {
            notifyError(error);
          }
        }
      },
    }
  );
}
