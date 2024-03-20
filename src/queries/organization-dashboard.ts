import { useQuery } from "@tanstack/react-query";

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
  }>([`/organisation/location/analysis/`]);
}
