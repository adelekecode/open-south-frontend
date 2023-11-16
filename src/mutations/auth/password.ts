import axios, { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "~/utils/api";
import { notifyError, notifySuccess } from "~/utils/toast";

export function useForgotPassword() {
  return useMutation(
    async (data: Record<"email", string>) => {
      const { data: response } = await axios.post("/auth/users/reset_password/", data);

      return response.data;
    },
    {
      onSuccess() {
        notifySuccess("Reset link has been sent to your email");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("User with this email does not exist!");
          }
        }
      },
    }
  );
}

export function useChangePassword() {
  return useMutation(async (data: Record<string, any>) => {
    const { data: response } = await axiosPrivate.post("/auth/users/set_password/", data);

    return response.data;
  });
}

export function useResetPassword() {
  return useMutation(
    async (data: Record<"password" | "re_password", string>) => {
      const { data: response } = await axios.post("auth/reset-password/verify/", data);

      return response.data;
    },
    {
      onSuccess() {
        notifySuccess("Password reset successfully!, please login to continue");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Invalid OTP!, please check your input and try again");
          } else if (error.response?.status === 401) {
            notifyError(error.response.data.detail);
          }
        }
      },
    }
  );
}
