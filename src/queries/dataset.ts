import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type Pagination = {
  count: number;
  next: boolean | null;
  previous: boolean | null;
};

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
  return useQuery<
    Pagination & {
      results: Dataset[];
    }
  >([`/user/datasets/?limit=${pageSize}&offset=${(page - 1) * pageSize}`]);
}

export function useOrganizationDatasets(
  pageSize: number = 10,
  page: number = 1,
  options?: UseQueryOptions<
    Pagination & {
      results: Dataset[];
    }
  >
) {
  return useQuery<
    Pagination & {
      results: Dataset[];
    }
  >([`/user/datasets/?limit=${pageSize}&offset=${(page - 1) * pageSize}`], options);
}
