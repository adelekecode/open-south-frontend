import { useQuery } from "@tanstack/react-query";

export function useDashboardCards() {
  return useQuery<{ users: number; organisations: number; datasets: number; news: number }>([
    `/admin/dashboard/counts/`,
  ]);
}
