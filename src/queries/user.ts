import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useCurrentUser(
  queryKey = ["/auth/users/me/"],
  options?: UseQueryOptions<CurrentUser>
) {
  return useQuery<CurrentUser>(queryKey, options);
}

export function useGetAllUsers(
  search = "",
  filterBy: {
    isActive: string;
  },
  pagination: Pagination,
  options?: UseQueryOptions<PaginatedResponse<CurrentUser[]>>
) {
  const { isActive } = filterBy;
  const { page, pageSize } = pagination;

  let status = "";

  if (isActive === "true") {
    status = "active";
  } else if (isActive === "false") {
    status = "inactive";
  }

  return useQuery<PaginatedResponse<CurrentUser[]>>(
    [`/admin/users/?search=${search}&status=${status}&limit=${pageSize}&offset=${page * pageSize}`],
    options
  );
}

export function usePublicProfile(id: string, options?: UseQueryOptions<CurrentUser>) {
  return useQuery<CurrentUser>([`/public/user/pk/${id}/detail/`], options);
}
