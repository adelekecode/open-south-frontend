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
