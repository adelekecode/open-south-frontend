import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { axiosPrivate } from "~/utils/api";
import { notifyError, notifySuccess } from "~/utils/toast";

function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: Record<"name" | "description", string> & { logo: File }) => {
      const { data: response } = await axiosPrivate.postForm(`/organisations/`, data);

      return response;
    },
    {
      onSuccess(data) {
        queryClient.setQueryData(["create-org"], data);
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

export { useCreateOrganization };
