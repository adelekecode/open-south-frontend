import { useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { notifyError, notifySuccess } from "~/utils/toast";
import { axiosPrivate } from "~/utils/api";

const generateParams = (searchParams: URLSearchParams): URLSearchParams => {
  return new URLSearchParams({
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
    limit: searchParams.get("limit") || "10",
    offset: searchParams.get("offset") || "0",
  });
};

export function useCreateNews() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const params = generateParams(searchParams);

  return useMutation(
    async (data: Record<"title" | "body", string> & { image: File }) => {
      const { data: response } = await axiosPrivate.postForm(`/admin/news/`, data);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("News successfully created");

        return queryClient.invalidateQueries([`/admin/news/list/?${params.toString()}`]);
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

export function useEditNews() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const params = generateParams(searchParams);

  return useMutation(
    async ({
      id,
      data,
    }: {
      id: string;
      data: Record<"title" | "body", string> & { image?: File };
    }) => {
      const { data: response } = await axiosPrivate.patchForm(`/admin/news/${id}/`, data);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("News successfully updated");

        return queryClient.invalidateQueries([`/admin/news/list/?${params.toString()}`]);
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            const data = error.response.data;

            if (data.image) {
              return notifyError(data.image[0]);
            }
            notifyError("Error occured while updating dataset");
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
  const [searchParams] = useSearchParams();

  const params = generateParams(searchParams);

  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.delete(`/admin/news/${id}/`);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("News successfully deleted");

        return queryClient.invalidateQueries([`/admin/news/list/?${params.toString()}`]);
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

export function useChangeNewsStatus({
  searchParams,
}: {
  searchParams: Record<"search" | "status" | "limit" | "offset", string>;
}) {
  const queryClient = useQueryClient();
  // const [searchParams] = useSearchParams();

  // const params = generateParams(searchParams);

  const params = new URLSearchParams({ ...searchParams });

  return useMutation(
    async ({ id, action }: { id: string; action: "publish" | "unpublish" }) => {
      const { data: response } = await axiosPrivate.post(`/admin/news/${id}/actions/${action}/`);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("Successfully changed news status");
      },
      onSettled() {
        queryClient.invalidateQueries([`/admin/news/list/?${params.toString()}`]);
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
