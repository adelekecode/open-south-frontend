import { useQuery } from "@tanstack/react-query";

export function useOrganizations() {
  return useQuery<any[]>([`/organisations/`]);
}

export function usePublicOrganizations() {
  return useQuery<any[]>([`/public/organisations/?key=public`]);
}

export function useOrganizationDetails(id: string) {
  return useQuery<any>([`/organisations/${id}/`]);
}

export function usePublicOrganizationDetails(slug: string) {
  return useQuery<any>([`/public/organisations/${slug}/?key=public`]);
}
