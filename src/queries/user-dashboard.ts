import { useQuery } from "@tanstack/react-query";

export function useDashboardCards() {
  return useQuery<{
    datasets: number;
    organisations: number;
    views: number;
    files: number;
    downloads: number;
  }>([`/user/dashboard/counts/`]);
}
