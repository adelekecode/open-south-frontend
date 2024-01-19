import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useUserOrganizations() {
  return useQuery<Organization[]>([`/user/organisations/`]);
}

export function useAdminOrganizations(
  pageSize: number = 10,
  page: number = 1,
  options?: UseQueryOptions<PaginationData<Organization[]>>
) {
  return useQuery<PaginationData<Organization[]>>(
    [`/admin/organisations/?limit=${pageSize}&offset=${(page - 1) * pageSize}`],
    options
  );
}

export function usePublicOrganizations(
  pageSize: number = 10,
  page: number = 1,
  options?: UseQueryOptions<PaginationData<Organization[]>>
) {
  return useQuery<PaginationData<Organization[]>>(
    [`/public/organisations/?key=public&limit=${pageSize}&offset=${(page - 1) * pageSize}`],
    options
  );
}

export function useOrganizationDetails(slug: string, options?: UseQueryOptions<Organization>) {
  return useQuery<Organization>([`/organisations/${slug}/`], options);
}

export function usePublicOrganizationDetails(
  slug: string,
  options?: UseQueryOptions<Organization>
) {
  return useQuery<Organization>([`/public/organisations/${slug}/?key=public`], options);
}
