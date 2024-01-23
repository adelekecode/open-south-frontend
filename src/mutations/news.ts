import { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "~/utils/toast";
import { axiosPrivate } from "~/utils/api";

export function useCreateNews() {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: Record<"title" | "body", string> & { image: File }) => {
      const { data: response } = await axiosPrivate.postForm(`/admin/news/`, data);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("News successfully created");

        return queryClient.invalidateQueries(["/admin/news/"]);
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Error occured while creating dataset");
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

export function useDeleteNews() {
  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.delete(`/admin/news/${id}/`);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("News successfully deleted");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            notifyError("News not found");
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

export function useChangeNewsStatus() {
  return useMutation(
    async ({ id, action }: { id: string; action: string }) => {
      const { data: response } = await axiosPrivate.post(`/admin/news/${id}/actions/${action}`);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("Successfully changed news status");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            notifyError("News not found");
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

export function useNewsView() {
  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.post(`/news/views/${id}/`);

      return response;
    },
    {
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Error occured while counting views");
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
