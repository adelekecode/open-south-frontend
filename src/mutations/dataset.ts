import { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "~/utils/toast";
import { axiosPrivate } from "~/utils/api";

type QueryParams = {
  search: string;
  filter: {
    status: string;
  };
};

export function useCreateDataset() {
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

export function useAddDatasetTags() {
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
            notifyError("Error occured while adding tags");
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

export function useRemoveDatasetTags() {
  return useMutation(
    async ({ datasetId, tags }: { datasetId: string; tags: string[] }) => {
      const { data: response } = await axiosPrivate.delete(`/datasets/tags/${datasetId}/`, {
        data: {
          keywords: tags,
        },
      });

      return response;
    },
    {
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            notifyError("Error occured while removing tags");
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

export function useEditDataset() {
  return useMutation(
    async ({
      id,
      data: { category, ...rest },
    }: {
      id: string;
      data: {
        title: string;
        description: string;
        license: string;
        category?: Category;
        coordinates?: string;
        temporal_coverage?: string;
        update_frequency: string;
        spatial_coverage: string;
      };
    }) => {
      const obj: typeof rest & { category?: string } = {
        ...rest,
      };

      if (category) {
        obj.category = category.id;
      }

      const { data: response } = await axiosPrivate.patch(`/user/datasets/${id}/`, obj);

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
              notifyError("Error occured while editing dataset");
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

export function useUploadDatasetFile() {
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
          if (typeof error === "string") {
            notifyError(error);
          }
        }
      },
    }
  );
}

export function useDeleteDataset() {
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

export function useDeleteDatasetFile() {
  return useMutation(
    async (id: string) => {
      const { data: response } = await axiosPrivate.delete(`/file/${id}`);

      return response;
    },
    {
      onSuccess() {
        notifySuccess("File successfully deleted");
      },
      onError(error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            notifyError("File not found");
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

export function useDatasetView() {
  return useMutation(async ({ id, country }: { id: string; country?: string }) => {
    const { data: response } = await axiosPrivate.post(`/datasets/views/${id}/`);

    await axiosPrivate.post(`/public/location/analysis/?key=public&country=${country}`);

    return response;
  });
}

export function useChangeDatasetStatus(pagination: Pagination, queryParams: QueryParams) {
  const queryClient = useQueryClient();

  const { pageSize, page } = pagination;
  const {
    search,
    filter: { status },
  } = queryParams;

  return useMutation(
    async ({
      id,
      action,
      data,
    }: {
      id: string;
      action: Dataset["status"] | "delete" | "unpublished";
      data?: { remark: string };
    }) => {
      const response = await axiosPrivate.post(`/admin/datasets/pk/${id}/actions/${action}/`, data);

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          `/admin/datasets/?search=${search}&status=${status || ""}&limit=${pageSize}&offset=${page * pageSize}`,
        ]);
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

export function useDatasetFileDownload() {
  return useMutation(
    async (id: string) => {
      const response = await axiosPrivate.post(`/datasets/downloads/${id}/`);

      return response;
    },
    {
      onSuccess: () => {
        notifySuccess("File downloaded successfully");
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
