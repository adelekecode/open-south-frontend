import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { REFRESH_TOKEN_KEY } from "~/app-constants";

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
        localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
        axios.defaults.headers.common["Authorization"] = "Bearer " + data.access;
        queryClient.setQueriesData(["/auth/users/me/"], data);
        toast.success("Login successful!");
      },
    }
  );
}
