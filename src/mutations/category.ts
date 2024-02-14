import { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "~/utils/toast";
import { axiosPrivate } from "~/utils/api";
import useAdminTableStore from "~/store/admin-table";
import { useSearchParams } from "react-router-dom";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { dataset } = useAdminTableStore();

  const { pagination, search } = dataset;
  const { pageSize, page } = pagination;

  return useMutation(
    async (data: Record<"name" | "description", string> & { image: File }) => {
      const { data: response } = await axiosPrivate.postForm(`/categories/`, data);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("Category successfully created");

        return queryClient.invalidateQueries([
          `/admin/categories/?search=${search}&limit=${pageSize}&offset=${page * pageSize}`,
        ]);
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Error occured while creating category");
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

export function useEditCategory(pagination: { page: number; pageSize: number }) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("q") || "";

  const { pageSize, page } = pagination;

  return useMutation(
    async ({
      id,
      data,
    }: {
      id: string;
      data: Record<"name" | "description", string> & { image?: File };
    }) => {
      const { data: response } = await axiosPrivate.patchForm(`/categories/${id}/`, data);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("Category successfully updated");

        return queryClient.invalidateQueries([
          `/admin/categories/?search=${search}&limit=${pageSize}&offset=${page * pageSize}`,
        ]);
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Error occured while updating category");
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

export function useDeleteCategory(pagination: { page: number; pageSize: number }) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("q") || "";

  const { pageSize, page } = pagination;

  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.delete(`/categories/${id}/`);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("Category successfully deleted");

        return queryClient.invalidateQueries([
          `/admin/categories/?search=${search}&limit=${pageSize}&offset=${page * pageSize}`,
        ]);
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            notifyError("Category not found");
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
