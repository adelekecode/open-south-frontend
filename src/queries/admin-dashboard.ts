import { useQuery } from "@tanstack/react-query";
import { mostAccessedDatasetsTransformHandler } from "~/utils/helper";

export function useDashboardCards() {
  return useQuery<{ users: number; organisations: number; datasets: number; news: number }>([
    `/admin/dashboard/counts/`,
  ]);
}

export function useAverageViewPerCategory() {
  return useQuery<Record<"daily" | "weekly" | "monthly", { name: string; views: 0 }[]>>([
    `/admin/average-category/chart/`,
  ]);
}

export function useAverageDownloadPerCategory() {
  return useQuery<Record<"daily" | "weekly" | "monthly", { name: string; downloads: 0 }[]>>([
    `/admin/average-download/chart/`,
  ]);
}

export function useMostPublishedOrganizations() {
  return useQuery<Organization[]>([`/admin/most-published/organisation/`]);
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
  }>([`/admin/location/analysis/`]);
}

export function useTopMostAccessedDatasets() {
  return useQuery([`/admin/most-accessed-data/`], {
    select: mostAccessedDatasetsTransformHandler,
  });
}
