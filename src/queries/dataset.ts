import { useQuery } from "@tanstack/react-query";

export function usePublicDatasets() {
  return useQuery<Dataset[]>([`/public/datasets/?key=public`]);
}

export function useDatasetDetails(id: string) {
  return useQuery<any>([`/datasets/${id}/`]);
}
