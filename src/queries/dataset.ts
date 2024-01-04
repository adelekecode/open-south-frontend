import { useQuery } from "@tanstack/react-query";

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

export function useUserDatasets() {
  return useQuery<
    // {
    //   count: number;
    //   next: boolean | null;
    //   previous: boolean | null;
    //   results: Dataset[];
    // }
    Dataset[]
  >([`/user/datasets/`]);
}
