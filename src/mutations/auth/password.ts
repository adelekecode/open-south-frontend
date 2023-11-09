import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "~/utils/api";

export function useForgotPassword() {
  return useMutation(async (data: Record<string, any>) => {
    const { data: response } = await axios.post("/auth/reset-password/verify/", data);

    return response.data;
  });
}

export function useChangePassword() {
  return useMutation(async (data: Record<string, any>) => {
    const { data: response } = await axiosPrivate.post("/auth/users/set_password/", data);

    return response.data;
  });
}
