import { useQuery } from "@tanstack/react-query";

export function useUserOrganizations() {
  return useQuery<Organization[]>([`/user/organisations/`]);
}

export function usePublicOrganizations() {
  return useQuery<Organization[]>([`/public/organisations/?key=public`]);
}

export function useOrganizationDetails(id: string) {
  return useQuery<Organization>([`/organisations/${id}/`]);
}

export function usePublicOrganizationDetails(slug: string) {
  return useQuery<Organization>([`/public/organisations/${slug}/?key=public`]);
}
