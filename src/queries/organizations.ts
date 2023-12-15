import { useQuery } from "@tanstack/react-query";

export function useOrganizations() {
  return useQuery<any>([`/organisations/`]);
}

export function useOrganizationDetails(id: string) {
  return useQuery<any>([`/organisations/${id}/`]);
}
