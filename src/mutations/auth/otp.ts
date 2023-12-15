import axios, { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "~/utils/toast";

export function useRequestOTP() {
  return useMutation(
    async (data: Record<"email", string>) => {
      const { data: response } = await axios.post("/auth/otp/new/", data);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("OTP has been sent to your email!");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("User with this email does not exist");
          }
        }
      },
    }
  );
}

export function useVerifyOTP() {
  return useMutation(
    async (data: Record<"otp", string>) => {
      const { data: response } = await axios.post("/auth/otp/verify/", data);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("Account verified successfully!, please login to continue");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            const data = error.response?.data;

            if (data[0] === "OTP expired") {
              notifyError("OTP expired!, please request for a new one");
            } else notifyError("Invalid OTP!, please check your input and try again");
          }
        }
      },
    }
  );
}
