import axios, { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { notifyError } from "~/utils/toast";
import { logout } from "~/utils/api/logout";

export default function useLogout() {
  return useMutation(
    async (token: string) => {
      const { data: response } = await axios.post("/auth/logout/", token);

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
