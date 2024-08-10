import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { axiosPrivate } from "~/utils/api";
import { notifyError, notifySuccess } from "~/utils/toast";

type QueryParams = {
  search: string;
  filter: {
    isActive: string;
  };
};

export function useDeleteUser(pagination: Pagination, queryParams: QueryParams) {
  const queryClient = useQueryClient();

  const { pageSize, page } = pagination;
  const {
    search,
    filter: { isActive },
  } = queryParams;

  let status = "";

  if (isActive === "true") {
    status = "active";
  } else if (isActive === "false") {
    status = "inactive";
  }

  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.delete(`/auth/users/${id}/`);

      return response;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([
          `/admin/users/?search=${search}&status=${status}&limit=${pageSize}&offset=${page * pageSize}`,
        ]);

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

export function useChangeUserStatus(searchParams: URLSearchParams) {
  const queryClient = useQueryClient();

  const isActive = searchParams.get("is-active") || "";

  const params = new URLSearchParams({
    search: searchParams.get("q") || "",
    limit: searchParams.get("limit") || "10",
    offset: searchParams.get("offset") || "0",
  });

  let status = "";

  if (isActive === "true") {
    status = "active";
  } else if (isActive === "false") {
    status = "inactive";
  }

  return useMutation(
    async ({ id, action }: { id: string; action: "delete" | "block" | "unblock" }) => {
      const { data: response } = await axiosPrivate.post(
        `/admin/users/pk/${id}/actions/${action}/`
      );

      return response;
    },
    {
      onSuccess(data) {
        if (typeof data.message === "string") {
          notifySuccess(data.message.charAt(0).toUpperCase() + data.message.slice(1));
        }
      },
      async onSettled() {
        await queryClient.invalidateQueries([
          `/admin/users/?status=${status}&${params.toString()}`,
        ]);
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

export function useGenerateAPIKey() {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      const { data: response } = await axiosPrivate.post("/user/token/manager/");

      return response;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(["/user/token/manager/"]);
      },
      onError(error) {
        if (isAxiosError(error)) {
          notifyError(String(error.toJSON()));
        }
      },
    }
  );
}

export function useEnableDeveloperFeature() {
  return useMutation(
    async () => {
      const response = await axiosPrivate.post("/user/api/agreement/");

      return response;
    },
    {
      onError(error) {
        if (isAxiosError(error)) {
          const data = error.response?.data;

          if (data.error === "You have already accepted the agreement") {
            throw new Error(data.error);
          }

          notifyError(String(error.toJSON()));
        }
      },
    }
  );
}
