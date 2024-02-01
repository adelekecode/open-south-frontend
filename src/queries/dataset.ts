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
  options?: UseQueryOptions<any, unknown, unknown, [string]>
) {
  return useQuery([`${url}`], {
    queryFn: async () => {
      const { data: response } = await axios.get(url);

      return response;
    },
    ...options,
  });
}

export function useAdminDatasetDetails(id: string) {
  return useQuery<any>([`/datasets/${id}/`]);
}

export function useAdminDatasets() {
  return useQuery<Dataset[]>([`/admin/datasets/`]);
}

export function useUserDatasets(
  search = "",
  pagination: {
    pageSize: number;
    page: number;
  } = {
    pageSize: 10,
    page: 1,
  }
) {
  const { pageSize, page } = pagination;

  return useQuery<PaginationData<Dataset[]>>([
    `/user/datasets/?search=${search}&limit=${pageSize}&offset=${(page - 1) * pageSize}`,
  ]);
}

export function useUserDatasetDetails(id: string) {
  return useQuery<any>([`/user/datasets/${id}/`]);
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

export function usePublicUserDataset(
  id: string,
  options?: UseQueryOptions<PaginationData<CurrentUser[]>>
) {
  return useQuery<PaginationData<CurrentUser[]>>(
    [`/public/user/pk/${id}/datasets/?key=public`],
    options
  );
}
