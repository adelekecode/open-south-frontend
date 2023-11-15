import axios, { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "~/utils/toast";

export function useRequestOTP() {
  return useMutation(
    async (body: Record<string, any>) => {
      const { data } = await axios.post("/auth/otp/new/", body);

      return data;
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
    async (body: Record<string, any>) => {
      const { data } = await axios.post("/auth/otp/verify/", body);

      return data;
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
