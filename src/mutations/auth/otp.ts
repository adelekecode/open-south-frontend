import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export function useRequestOTP() {
  return useMutation(async (body: Record<string, any>) => {
    const { data } = await axios.post("/auth/otp/new/", body);

    return data;
  });
}

export function useVerifyOTP() {
  return useMutation(async (body: Record<string, any>) => {
    const { data } = await axios.post("/auth/otp/verify/", body);

    return data;
  });
}
