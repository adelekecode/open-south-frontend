import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import useAdminTableStore from "~/store/admin-table";
import { axiosPrivate } from "~/utils/api";
import { notifyError, notifySuccess } from "~/utils/toast";

export function useDeleteUser() {
  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.delete(`/auth/users/${id}/`);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("User successfully deleted");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            notifyError("User not found");
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

export function useChangeUserStatus() {
  const queryClient = useQueryClient();
  const { user } = useAdminTableStore();

  const { pagination, filterBy, search } = user;
  const { isActive } = filterBy;
  const { page, pageSize } = pagination;

  return useMutation(
    async ({ id, action }: { id: string; action: "delete" | "block" | "unblock" }) => {
      const { data: response } = await axiosPrivate.post(
        `/admin/users/pk/${id}/actions/${action}/`
      );

      return response;
    },
    {
      onSuccess(data) {
        queryClient.invalidateQueries([
          `/admin/users/?search=${search}&active=${isActive || ""}&limit=${pageSize}&offset=${page * pageSize}`,
        ]);

        if (typeof data.message === "string") {
          notifySuccess(data.message.charAt(0).toUpperCase() + data.message.slice(1));
        }
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Error occured while changing status");
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
