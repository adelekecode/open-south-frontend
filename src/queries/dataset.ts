import { useQuery } from "@tanstack/react-query";

export function useDatasetDetails(id: string) {
  return useQuery<any>([`/datasets/${id}/`]);
}
