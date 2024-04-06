import { useQuery } from "@tanstack/react-query";
import { mostAccessedDatasetsTransformHandler } from "~/utils/helper";

export function useDashboardCards() {
  return useQuery<{
    datasets: number;
    organisations: number;
    views: number;
    files: number;
    downloads: number;
  }>([`/user/dashboard/counts/`]);
}

export function useTopTrafficLocations() {
  return useQuery<{
    top_locations: {
      id: string;
      country: string;
      slug: string;
      count: number;
      created_at: string;
      updated_at: string;
      dataset: string;
    }[];
    others: null;
  }>([`/user/location/analysis/`]);
}

export function useTopMostAccessedDatasets() {
  return useQuery([`/user/most-accessed-data/`], {
    select: mostAccessedDatasetsTransformHandler,
  });
}
