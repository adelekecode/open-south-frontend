import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "~/utils/toast";
import { axiosPrivate } from "~/utils/api";

function useCreateDataset() {
  return useMutation(
    async (
      data: Record<
        | "title"
        | "description"
        | "license"
        | "updateFrequency"
        | "spatialCoverage"
        | "start"
        | "end",
        string
      > & { category: Category }
    ) => {
      const { category, spatialCoverage, updateFrequency, start, end, ...rest } = data;
      const { data: response } = await axiosPrivate.post(`/datasets/${category.id}/`, {
        ...rest,
        update_frequency: updateFrequency,
        temporal_coverage: `${start},${end}`,
        spatial_coverage: spatialCoverage,
      });

      return response;
    },
    {
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

function useDeleteDataset() {
  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.delete(`/dataset/${id}/`);

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

export { useDeleteDataset, useCreateDataset };
