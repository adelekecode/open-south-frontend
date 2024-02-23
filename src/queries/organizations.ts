import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useUserOrganizations(options?: UseQueryOptions<Organization[]>) {
  return useQuery<Organization[]>([`/user/organisations/`], options);
}

export function useUserOrganizationDetails(slug: string, options?: UseQueryOptions<Organization>) {
  return useQuery<Organization>([`/organisations/${slug}/`], options);
}

export function useAdminOrganizations(
  search = "",
  filterBy: {
    status: string;
    isVerified: string;
    isActive: string;
  },
  pagination: Pagination,
  options?: UseQueryOptions<PaginatedResponse<Organization[]>>
) {
  const { status, isVerified, isActive } = filterBy;
  const { page, pageSize } = pagination;

  return useQuery<PaginatedResponse<Organization[]>>(
    [
      `/admin/organisations/?search=${search}&status=${status || ""}&verified=${isVerified || ""}&active=${isActive ? isActive.charAt(0).toUpperCase() + isActive.slice(1) : ""}&limit=${pageSize}&offset=${page * pageSize}`,
    ],
    options
  );
}

export function useAdminOrganizationDetails(id: string, options?: UseQueryOptions<Organization>) {
  return useQuery<Organization>([`/admin/organisations/${id}/`], options);
}

export function useAdminOrganizationUsers(
  orgId: string,
  search = "",
  pagination: Pagination,
  options?: UseQueryOptions<PaginatedResponse<CurrentUser[]>>
) {
  const { page, pageSize } = pagination;

  return useQuery<PaginatedResponse<CurrentUser[]>>(
    [`/organisations/users/${orgId}/?search=${search}&limit=${pageSize}&offset=${page * pageSize}`],
    options
  );
}

export function useAdminOrganizationRequests(
  id: string,
  options?: UseQueryOptions<OrganizationRequest[]>
) {
  return useQuery<OrganizationRequest[]>([`/admin/organisation_requests/?pk=${id}`], options);
}

export function useAdminOrganizationsIndicators() {
  return useQuery<{
    count: number;
    approved: number;
    rejected: number;
    pending: number;
  }>([`/admin/organisations/indicators/`]);
}

export function usePublicOrganizations(
  search = "",
  sortBy: "relevance" | "most-recent",
  pagination: Pagination = { pageSize: 20, page: 1 }
) {
  const { pageSize, page } = pagination;

  return useQuery<PaginatedResponse<Organization[]>>([
    `/public/organisations/?key=public&search=${search}&sort=${sortBy}&limit=${pageSize}&offset=${(page - 1) * pageSize}`,
  ]);
}

export function usePublicOrganizationDetails(
  slug: string,
  options?: UseQueryOptions<Organization>
) {
  return useQuery<Organization>([`/public/organisations/${slug}/?key=public`], options);
}
