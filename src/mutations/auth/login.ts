import axios, { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { REFRESH_TOKEN_KEY } from "~/app-constants";
import { notifyError, notifySuccess } from "~/utils/toast";

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: { email: string; password: string }) => {
      const { data: response } = await axios.post<{
        data: {
          access: string;
          refresh: string;
        } & User;
      }>("/auth/login/", data);

      return response.data;
    },
    {
      onSuccess(data) {
        localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(data.refresh));
        axios.defaults.headers.common["Authorization"] = "Bearer " + data.access;
        queryClient.setQueriesData(["/auth/users/me/"], data);
        notifySuccess("Login successful");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Invalid email or password, please check your inputs and try again");
          } else if (error.response?.status === 401) {
            notifyError(error.response.data.error);
          } else if (error.request?.status === 403) {
            if (error.response?.data?.error === "This account as been blocked") {
              notifyError("This account has been blocked by the admin");
            } else {
              notifyError(
                "You have not activated your account yet, please check your email for activation link"
              );
            }
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
