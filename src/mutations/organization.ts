import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import useAdminTableStore from "~/store/admin-table";
import { axiosPrivate } from "~/utils/api";
import { notifyError, notifySuccess } from "~/utils/toast";

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

export function useChangeOrganizationStatus() {
  const queryClient = useQueryClient();
  const { organization } = useAdminTableStore();

  const { pagination, filterBy, search } = organization;
  const { status, isVerified, isActive } = filterBy;
  const { page, pageSize } = pagination;

  const newStatus = status === "approve" ? "approved" : status === "reject" ? "rejected" : status;

  return useMutation(
    async ({
      id,
      action,
    }: {
      id: string;
      action: "approve" | "reject" | "delete" | "block" | "unblock";
    }) => {
      const { data: response } = await axiosPrivate.post(
        `/admin/organisations/pk/${id}/actions/${action}/`
      );

      return response;
    },
    {
      onSuccess(data) {
        queryClient.invalidateQueries([
          `/admin/organisations/?search=${search}&status=${newStatus || ""}&verified=${isVerified || ""}&active=${isActive || ""}&limit=${pageSize}&offset=${page * pageSize}`,
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

export function useOrganizationRequestAction(orgId: string) {
  const queryClient = useQueryClient();

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
