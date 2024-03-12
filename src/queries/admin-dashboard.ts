import { useQuery } from "@tanstack/react-query";

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
