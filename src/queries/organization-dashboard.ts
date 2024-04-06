import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type TrafficLoations = {
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
};

export function useTopTrafficLocations(id: string, options?: UseQueryOptions<TrafficLoations>) {
  return useQuery<TrafficLoations>([`/organisation/location/analysis/${id}/`], options);
}

export function useTopMostAccessedDatasets(id: string, options?: UseQueryOptions<Dataset[]>) {
  return useQuery<Dataset[]>([`/organisation/most-accessed-data/${id}/`], options);
}
