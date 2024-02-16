import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePublicDatasets(
  search = "",
  filterBy: {
    organization: string;
    tag: string;
    category: string;
    format: string;
    license: string;
    spatialCoverage: string;
  },
  // sortBy: {
  //   relevance: boolean;
  //   creationDate: boolean;
  //   lastUpdate: boolean;
  // },
  pagination: { pageSize: number; page: number }
) {
  const { pageSize, page } = pagination;
  const { organization, tag, category, format, license, spatialCoverage } = filterBy;
  // const {} = sortBy

  return useQuery<PaginationData<Dataset[]>>([
    `/public/datasets/?key=public&search=${search}&organisation=${organization || ""}&tags=${tag || ""}&category=${category || ""}&format=${format}&license=${license}&spatial_coverage=${spatialCoverage}&limit=${pageSize}&offset=${(page - 1) * pageSize}`,
  ]);
}

export function usePublicMapDatasets() {
  return useQuery<Dataset[]>([`/public/datasets/?key=public`]);
}

export function usePublicDatasetDetails(slug: string, options?: UseQueryOptions<Dataset>) {
  return useQuery<Dataset>([`/public/datasets/${slug}/?key=public`], options);
}

export function useDatasetFilePreview(url: string, type: string, options?: UseQueryOptions<any>) {
  return useQuery<any>([`${url}`], {
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
  return useQuery<Dataset>([`/datasets/${id}/`]);
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
  search = "",
  filterBy: {
    status: string | null;
  } = {
    status: null,
  },
  pagination: {
    pageSize: number;
    page: number;
  } = {
    page: 0,
    pageSize: 10,
  },
  options?: UseQueryOptions<PaginationData<Dataset[]>>
) {
  const { pageSize, page } = pagination;
  const { status } = filterBy;

  return useQuery<PaginationData<Dataset[]>>(
    [
      `/user/organisations/${id}/datasets/?search=${search}&status=${status || ""}&limit=${pageSize}&offset=${page * pageSize}`,
    ],
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
    [`/user/dataset/pk/${id}/files/?limit=${pageSize}&offset=${page * pageSize}`],
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
  return useQuery<Dataset[]>([`/public/popular/dataset/?key=public`]);
}
