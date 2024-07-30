import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { axiosPrivate } from "~/utils/api";
import { notifyError, notifySuccess } from "~/utils/toast";

const generateParams = (searchParams: URLSearchParams): URLSearchParams => {
  return new URLSearchParams({
    search: searchParams.get("search") || "",
    verified: searchParams.get("verified") || "",
    active: searchParams.get("active") || "",
    limit: searchParams.get("limit") || "10",
    offset: searchParams.get("offset") || "0",
  });
};

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation(
    async (
      data: Record<
        "name" | "description" | "email" | "type" | "linkedIn" | "twitter" | "website",
        string
      > & { logo: File }
    ) => {
      const { data: response } = await axiosPrivate.postForm(`/organisations/`, data);

      return response;
    },
    {
      mutationKey: ["create-org"],
      onSuccess() {
        queryClient.invalidateQueries([`/user/organisations/`]);
        notifySuccess("Organization successfully created");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Error occured while creating organization");
          }
        } else if (typeof error === "string") {
          if (error.includes("name already exists")) {
            notifyError("Organization with this name already exists");
          }
        }
      },
    }
  );
}

export function useEditOrganization() {
  const queryClient = useQueryClient();

  return useMutation(
    async (
      data: Record<
        "name" | "description" | "email" | "type" | "linkedIn" | "twitter" | "website",
        string
      > & { logo?: File; slug: string }
    ) => {
      const { slug, ...rest } = data;
      const { data: response } = await axiosPrivate.patchForm(`/organisations/${slug}/`, rest);

      return response;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([`/user/organisations/`]);
        notifySuccess("Organization successfully updated");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Error occured while updating organization");
          }
        } else if (typeof error === "string") {
          if (error.includes("name already exists")) {
            notifyError("Organization with this name already exists");
          }
        }
      },
    }
  );
}

export function useVerifyCode() {
  return useMutation(
    async (data: Record<"pin", string>) => {
      const { data: response } = await axiosPrivate.post(`/organisations/verification/`, data);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("Organization has been verified");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Code has expired");
          }
        }
      },
    }
  );
}

export function useResendCode() {
  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.post(`/organisations/resend-pin/${id}/`);

      return response;
    },
    {
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            notifyError("Organization does not exist");
          }
        }
      },
    }
  );
}

export function useChangeOrganizationStatus(searchParams: URLSearchParams) {
  const queryClient = useQueryClient();

  const params = generateParams(searchParams);

  return useMutation(
    async ({
      id,
      action,
      data,
    }: {
      id: string;
      action: "approved" | "rejected" | "delete" | "block" | "unblock";
      data?: { remark: string };
    }) => {
      const { data: response } = await axiosPrivate.post(
        `/admin/organisations/pk/${id}/actions/${action}/`,
        data
      );

      return response;
    },
    {
      onSuccess(data) {
        if (typeof data.message === "string") {
          notifySuccess(data.message.charAt(0).toUpperCase() + data.message.slice(1));
        }
      },
      onSettled() {
        queryClient.invalidateQueries([`/admin/organisations/?${params.toString()}`]);
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

export function useRequestToJoinOrganization() {
  return useMutation(
    async (id: string) => {
      const response = await axiosPrivate.post(`/user/request-to-join-organisation/${id}/`);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("Your request has been sent");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            if (error.response?.data) {
              const data = error.response.data;

              if (typeof data.error === "string") {
                notifyError(data.error.charAt(0).toUpperCase() + data.error.slice(1));
              }
            }
          } else {
            if (typeof error === "string") {
              notifyError((error as string).charAt(0).toUpperCase() + (error as string).slice(1));
            }
          }
        }
      },
    }
  );
}

export function useOrganizationRequestAction(orgId: string, searchParams: URLSearchParams) {
  const queryClient = useQueryClient();

  const params = new URLSearchParams({
    search: searchParams.get("search") || "",
    limit: searchParams.get("limit") || "10",
    offset: searchParams.get("offset") || "0",
  });

  return useMutation(
    async ({ id, actions }: { id: string; actions: "reject" | "approve" }) => {
      const { data: response } = await axiosPrivate.post(
        `/admin/organisation_requests/pk/${id}/actions/${actions}/`
      );

      return response;
    },
    {
      onSuccess(data) {
        if (typeof data.message === "string") {
          notifySuccess(data.message.charAt(0).toUpperCase() + data.message.slice(1));
        }
      },
      onSettled() {
        queryClient.invalidateQueries([`/organisations/users/${orgId}/?${params.toString()}`]);

        return queryClient.invalidateQueries([`/admin/organisation_requests/?pk=${orgId}`]);
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Error occured");
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

export function useRemoveUserFromOrganization(orgId: string, searchParams: URLSearchParams) {
  const queryClient = useQueryClient();

  const params = new URLSearchParams({
    search: searchParams.get("search") || "",
    limit: searchParams.get("limit") || "10",
    offset: searchParams.get("offset") || "0",
  });

  return useMutation(
    async (userId: string) => {
      const { data: response } = await axiosPrivate.delete(
        `/organisations/${orgId}/users/${userId}/`
      );

      return response;
    },
    {
      onSuccess(data) {
        if (typeof data.message === "string") {
          notifySuccess(data.message.charAt(0).toUpperCase() + data.message.slice(1));
        }
      },
      onSettled() {
        queryClient.invalidateQueries([`/organisations/users/${orgId}/?${params.toString()}`]);
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Error occured");
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
