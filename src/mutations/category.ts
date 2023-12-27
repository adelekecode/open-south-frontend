import { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "~/utils/toast";
import { axiosPrivate } from "~/utils/api";

function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: Record<"name" | "description", string> & { image: File }) => {
      const { data: response } = await axiosPrivate.postForm(`/categories/`, data);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("Category successfully created");
        queryClient.invalidateQueries(["/categories/"]);
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

export { useCreateCategory };
