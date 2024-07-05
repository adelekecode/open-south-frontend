import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { isAxiosError } from "axios";
import { axiosPrivate } from "~/utils/api";
import { notifyError, notifySuccess } from "~/utils/toast";

const generateParams = (searchParams: URLSearchParams): URLSearchParams => {
  return new URLSearchParams({
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
    limit: searchParams.get("limit") || "10",
    offset: searchParams.get("offset") || "0",
  });
};

export function useBlockDeveloper() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const params = generateParams(searchParams);

  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.delete(`/delete/${id}/`);

      return response;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([`/admin/api/users/?${params.toString()}`]);
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

export function useUnblockDeveloper() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const params = generateParams(searchParams);

  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.post(`/delete/${id}/`);

      return response;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([`/admin/api/users/?${params.toString()}`]);
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
