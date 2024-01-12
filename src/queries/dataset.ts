import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export function usePublicDatasets() {
  return useQuery<Dataset[]>([`/public/datasets/?key=public`]);
}

export function useDatasetDetails(id: string) {
  return useQuery<any>([`/datasets/${id}/`]);
}

export function useAdminDatasetDetails(id: string) {
  return useQuery<any>([`/datasets/${id}/`]);
}

export function useAdminDatasets() {
  return useQuery<Dataset[]>([`/admin/datasets/`]);
}

export function useUserDatasets(pageSize: number = 10, page: number = 1) {
  return useQuery<PaginationData<Dataset[]>>([
    `/user/datasets/?limit=${pageSize}&offset=${(page - 1) * pageSize}`,
  ]);
}

export function useOrganizationDatasets(
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
