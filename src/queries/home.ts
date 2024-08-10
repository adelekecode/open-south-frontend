import { useQuery } from "@tanstack/react-query";

export function useGetPanelData() {
  return useQuery<{
    datasets: number;
    organisations: number;
    users: number;
    categories: number;
    files: number;
  }>([`/public/counts/?key=public`]);
}
