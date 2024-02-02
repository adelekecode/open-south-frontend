import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePublicDatasets() {
  return useQuery<Dataset[]>([`/public/datasets/?key=public`]);
}

export function usePublicDatasetDetails(slug: string, options?: UseQueryOptions<Dataset>) {
  return useQuery<Dataset>([`/public/datasets/${slug}/?key=public`], options);
}

export function usePublicFilePreview(
  url: string,
  type: string,
  options?: UseQueryOptions<any, unknown, unknown, [string]>
) {
  return useQuery([`${url}`], {
    queryFn: async () => {
      const { data: response } = await axios.get(
        url,
        type === "xlsx"
          ? {
              responseType: "arraybuffer",
            }
          : {}
      );

      return response;
    },
    ...options,
  });
}

export function useAdminDatasetDetails(id: string) {
  return useQuery<any>([`/datasets/${id}/`]);
}

export function useAdminDatasets(
  search = "",
  filterBy: {
    status: string | null;
  } = {
    status: null,
  },
  pagination: { pageSize: number; page: number }
) {
  const { pageSize, page } = pagination;
  const { status } = filterBy;

  return useQuery<PaginationData<Dataset[]>>([
    `/admin/datasets/?search=${search}&status=${status || ""}&limit=${pageSize}&offset=${page * pageSize}`,
  ]);
}

export function useUserDatasets(
  search = "",
  filterBy: {
    status: string | null;
  } = {
    status: null,
  },
  pagination: {
    pageSize: number;
    page: number;
  }
) {
  const { pageSize, page } = pagination;
  const { status } = filterBy;

  return useQuery<PaginationData<Dataset[]>>([
    `/user/datasets/?search=${search}&status=${status || ""}&limit=${pageSize}&offset=${page * pageSize}`,
  ]);
}

export function useUserDatasetDetails(id: string, options?: UseQueryOptions<Dataset>) {
  return useQuery<Dataset>([`/user/datasets/${id}/`], options);
}

export function useUserOrganizationDatasets(
  id: string,
  pageSize: number = 10,
  page: number = 1,
  options?: UseQueryOptions<PaginationData<Dataset[]>>
) {
  return useQuery<PaginationData<Dataset[]>>(
    [`/user/organisations/${id}/datasets/?limit=${pageSize}&offset=${(page - 1) * pageSize}`],
    options
  );
}

export function useUserDatasetFiles(
  id: string,
  pagination: {
    pageSize: number;
    page: number;
  },
  options?: UseQueryOptions<PaginationData<Dataset["files"][]>>
) {
  const { pageSize, page } = pagination;

  return useQuery<PaginationData<Dataset["files"][]>>(
    [`/user/datasets/${id}/files/?limit=${pageSize}&offset=${page * pageSize}`],
    options
  );
}

export function usePublicUserDataset(
  id: string,
  pagination: {
    pageSize: number;
    page: number;
  } = {
    pageSize: 10,
    page: 0,
  },
  options?: UseQueryOptions<PaginationData<Dataset[]>>
) {
  const { page, pageSize } = pagination;

  return useQuery<PaginationData<Dataset[]>>(
    [
      `/public/user/pk/${id}/datasets/?key=public&limit=${pageSize}&offset=${(page - 1) * pageSize}`,
    ],
    options
  );
}

export function usePopularDatasets() {
  return useQuery<
    {
      count: number;
      created_at: string;
      dataset_data: {
        title: string;
        slug: string;
        publisher_data: Dataset["publisher_data"];
      };
    }[]
  >([`/public/popular/dataset/?key=public`]);
}
