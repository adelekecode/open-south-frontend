import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const generateParams = (searchParams: URLSearchParams): URLSearchParams => {
  return new URLSearchParams({
    search: searchParams.get("search") || "",
    verified: searchParams.get("verified") || "",
    active: searchParams.get("active") || "",
    status: searchParams.get("status") || "",
    limit: searchParams.get("limit") || "10",
    offset: searchParams.get("offset") || "0",
  });
};

export function useUserOrganizations(options?: UseQueryOptions<Organization[]>) {
  return useQuery<Organization[]>([`/user/organisations/`], options);
}

export function useUserOrganizationDetails(slug: string, options?: UseQueryOptions<Organization>) {
  return useQuery<Organization>([`/organisations/${slug}/`], options);
}

export function useAdminOrganizations(
  searchParams: URLSearchParams,
  options?: UseQueryOptions<PaginatedResponse<Organization[]>>
) {
  const params = generateParams(searchParams);

  return useQuery<PaginatedResponse<Organization[]>>(
    [`/admin/organisations/?${params.toString()}`],
    options
  );
}

export function useAdminOrganizationDetails(id: string, options?: UseQueryOptions<Organization>) {
  return useQuery<Organization>([`/admin/organisations/${id}/`], options);
}

export function useAdminOrganizationUsers(
  orgId: string,
  searchParams: URLSearchParams,
  options?: UseQueryOptions<PaginatedResponse<CurrentUser[]>>
) {
  const params = new URLSearchParams({
    search: searchParams.get("search") || "",
    limit: searchParams.get("limit") || "10",
    offset: searchParams.get("offset") || "0",
  });

  return useQuery<PaginatedResponse<CurrentUser[]>>(
    [`/organisations/users/${orgId}/?${params.toString()}`],
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
  sortBy: "relevance" | "most-recent" | "" = "",
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
