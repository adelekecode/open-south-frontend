import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { REFRESH_TOKEN_KEY } from "~/app-constants";
import { notifySuccess } from "~/utils/toast";

export default function useGoogleAuth() {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: { auth_token: string }) => {
      const { data: response } = await axios.post("/auth/google/", data);

      return response as CurrentUser & {
        access: string;
        refresh: string;
      };
    },
    {
      onSuccess(data) {
        localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(data.refresh));
        axios.defaults.headers.common["Authorization"] = "Bearer " + data.access;
        queryClient.setQueriesData(["/auth/users/me/"], data);
        notifySuccess("Authenticated successful!");
      },
    }
  );
}
