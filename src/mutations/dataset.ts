import axios, { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "~/utils/toast";

function useDeleteDataset() {
  return useMutation(
    async (id: string) => {
      const { data: response } = await axios.delete(`/dataset/${id}`);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("Dataset deleted");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            notifyError("Dataset not found");
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

export default useDeleteDataset;
