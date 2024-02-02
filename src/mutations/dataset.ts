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
      > & { category: Category; coordinates: number[]; organization: Organization | null }
    ) => {
      const {
        category,
        organization,
        spatialCoverage,
        updateFrequency,
        start,
        end,
        coordinates,
        ...rest
      } = data;
      const { data: response } = await axiosPrivate.post(
        `/datasets/${category.id}/${organization ? `?organisation_id=${organization.id}` : ""}`,
        {
          ...rest,
          update_frequency: updateFrequency,
          temporal_coverage: `${start},${end}`,
          spatial_coverage: spatialCoverage,
          coordinates: coordinates.toString(),
        }
      );

      return response;
    },
    {
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            const data = error.response.data;

            if (data) {
              if (typeof data.error === "string") {
                notifyError(data.error.charAt(0).toUpperCase() + data.error.slice(1));
              }
            } else {
              notifyError("Error occured while creating dataset");
            }
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

function useCreateDatasetTags() {
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

function useUploadDatasetFile() {
  return useMutation(
    async ({
      datasetId,
      file,
      format,
      size,
    }: {
      datasetId: string;
      file: File;
      format: string;
      size: string;
    }) => {
      const { data: response } = await axiosPrivate.postForm(`/datasets/files/${datasetId}/`, {
        file,
        format,
        size,
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

function useDeleteDataset() {
  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.delete(`/dataset/${id}/`);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("Dataset successfully deleted");
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

function useDatasetView() {
  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.post(`/datasets/views/${id}/`);

      return response;
    },
    {
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Error occured while counting views");
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

function useChangeDatasetStatus() {
  return useMutation(
    async ({ id, action }: { id: string; action: Dataset["status"] }) => {
      const response = await axiosPrivate.post(`/admin/datasets/pk/${id}/actions/${action}/`);

      return response;
    },
    {
      onSuccess: () => {
        notifySuccess("Successfully changed dataset status");
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

export {
  useDeleteDataset,
  useCreateDataset,
  useCreateDatasetTags,
  useUploadDatasetFile,
  useDatasetView,
  useChangeDatasetStatus,
};
