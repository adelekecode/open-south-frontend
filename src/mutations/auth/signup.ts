import axios, { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "~/utils/toast";

function useSignUp() {
  return useMutation(
    async (
      data: Record<"first_name" | "last_name" | "email" | "password" | "re_password", string>
    ) => {
      const { data: response } = await axios.post("/auth/users/", { ...data, role: "user" });

      return response.data;
    },
    {
      onSuccess() {
        notifySuccess("Account created successfully!");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            if (error.response.data.password?.[0].includes("This password is too common.")) {
              notifyError("This password is too common, please try another one");
            } else if (error.response.data.email?.[0]) {
              notifyError("User with this email already exists");
            } else {
              notifyError("Invalid email or password, please check your inputs and try again");
            }
          } else if (error.response?.status === 401) {
            notifyError(error.response.data.error);
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

export default useSignUp;
