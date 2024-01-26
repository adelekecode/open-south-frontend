import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useUserOrganizations() {
  return useQuery<Organization[]>([`/user/organisations/`]);
}

export function useUserOrganizationDetails(slug: string, options?: UseQueryOptions<Organization>) {
  return useQuery<Organization>([`/organisations/${slug}/`], options);
}

export function useAdminOrganizations(
  filter: {
    status: "reject" | "approve" | "block" | "unblock" | "delete" | null;
    isVerified: "true" | "false" | null;
    isActive: "true" | "false" | null;
  } = {
    status: null,
    isVerified: null,
    isActive: null,
  },
  pagination: {
    pageSize: number;
    page: number;
  } = {
    pageSize: 10,
    page: 1,
  },
  options?: UseQueryOptions<PaginationData<Organization[]>>
) {
  const { status, isVerified, isActive } = filter;
  const { page, pageSize } = pagination;
  const newStatus = status === "approve" ? "approved" : status === "reject" ? "rejected" : status;

  return useQuery<PaginationData<Organization[]>>(
    [
      `/admin/organisations/?status=${newStatus || ""}&verified=${isVerified || ""}&active=${isActive || ""}&limit=${pageSize}&offset=${(page - 1) * pageSize}`,
    ],
    options
  );
}

export function useAdminOrganizationDetails(id: string, options?: UseQueryOptions<Organization>) {
  return useQuery<Organization>([`/admin/organisations/${id}/`], options);
}

export function useAdminOrganizationUsers(
  id: string,
  pageSize: number = 10,
  page: number = 1,
  options?: UseQueryOptions<PaginationData<CurrentUser[]>>
) {
  return useQuery<PaginationData<CurrentUser[]>>(
    [`/organisations/users/${id}/?limit=${pageSize}&offset=${(page - 1) * pageSize}`],
    options
  );
}

export function useAdminOrganizationRequests(
  id: string,
  options?: UseQueryOptions<Organization[]>
) {
  return useQuery<Organization[]>([`/admin/organisation_requests/?pk=${id}`], options);
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
  pageSize: number = 10,
  page: number = 1,
  options?: UseQueryOptions<PaginationData<Organization[]>>
) {
  return useQuery<PaginationData<Organization[]>>(
    [`/public/organisations/?key=public&limit=${pageSize}&offset=${(page - 1) * pageSize}`],
    options
  );
}

export function usePublicOrganizationDetails(
  slug: string,
  options?: UseQueryOptions<Organization>
) {
  return useQuery<Organization>([`/public/organisations/${slug}/?key=public`], options);
}
