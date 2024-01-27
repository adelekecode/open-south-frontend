import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { axiosPrivate } from "~/utils/api";
import { notifyError, notifySuccess } from "~/utils/toast";

export function useDeleteUser() {
  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.delete(`/auth/users/${id}/`);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("User successfully deleted");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            notifyError("User not found");
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
