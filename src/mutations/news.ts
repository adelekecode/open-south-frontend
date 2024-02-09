import { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "~/utils/toast";
import { axiosPrivate } from "~/utils/api";
import useAdminTableStore from "~/store/admin-table";

export function useCreateNews() {
  const queryClient = useQueryClient();
  const { news } = useAdminTableStore();

  const { pagination, filterBy, search } = news;
  const { pageSize, page } = pagination;
  const { status } = filterBy;

  return useMutation(
    async (data: Record<"title" | "body", string> & { image: File }) => {
      const { data: response } = await axiosPrivate.postForm(`/admin/news/`, data);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("News successfully created");

        return queryClient.invalidateQueries([
          `/admin/news/list/?search=${search}&status=${status || ""}&limit=${pageSize}&offset=${page * pageSize}`,
        ]);
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            const data = error.response.data;

            if (data.image) {
              return notifyError(data.image[0]);
            }
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
  const queryClient = useQueryClient();
  const { news } = useAdminTableStore();

  const { pagination, filterBy, search } = news;
  const { pageSize, page } = pagination;
  const { status } = filterBy;

  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.delete(`/admin/news/${id}/`);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("News successfully deleted");

        return queryClient.invalidateQueries([
          `/admin/news/list/?search=${search}&status=${status || ""}&limit=${pageSize}&offset=${page * pageSize}`,
        ]);
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
  const queryClient = useQueryClient();
  const { news } = useAdminTableStore();

  const { pagination, filterBy, search } = news;
  const { pageSize, page } = pagination;
  const { status } = filterBy;

  return useMutation(
    async ({ id, action }: { id: string; action: "publish" | "unpublish" }) => {
      const { data: response } = await axiosPrivate.post(`/admin/news/${id}/actions/${action}/`);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("Successfully changed news status");

        return queryClient.invalidateQueries([
          `/admin/news/list/?search=${search}&status=${status || ""}&limit=${pageSize}&offset=${page * pageSize}`,
        ]);
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
