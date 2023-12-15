import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { notifyError } from "~/utils/toast";
import { axiosPrivate } from "~/utils/api";

function useCreateTags() {
  return useMutation(
    async ({ datasetId, tags }: { datasetId: string; tags: string[] }) => {
      const { data: response } = await axiosPrivate.post(`/datasets/tags/${datasetId}/`, {
        keywords: tags,
      });

      return response;
    },
    {
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Error occured while creating tags");
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

export { useCreateTags };
