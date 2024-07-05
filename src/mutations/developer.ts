import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { isAxiosError } from "axios";
import { axiosPrivate } from "~/utils/api";
import { notifyError, notifySuccess } from "~/utils/toast";

export function useBlockDeveloper() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const params = new URLSearchParams({
    search: searchParams.get("search") || "",
    offset: searchParams.get("offset") || "0",
    limit: searchParams.get("limit") || "10",
  });

  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.delete(`/delete/${id}/`);

      return response;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([`/admin/api/users/${params.toString()}`]);
        notifySuccess("Developer successfully blocked");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            notifyError("Developer not found");
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
