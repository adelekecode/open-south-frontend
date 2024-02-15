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
    isActive: string | null;
  } = {
    isActive: null,
  },
  pagination: { pageSize: number; page: number },
  options?: UseQueryOptions<PaginationData<CurrentUser[]>>
) {
  const { isActive } = filterBy;
  const { page, pageSize } = pagination;

  let status = "";

  if (isActive === "true") {
    status = "active";
  } else if (isActive === "false") {
    status = "inactive";
  }

  return useQuery<PaginationData<CurrentUser[]>>(
    [`/admin/users/?search=${search}&status=${status}&limit=${pageSize}&offset=${page * pageSize}`],
    options
  );
}

export function usePublicProfile(id: string, options?: UseQueryOptions<CurrentUser>) {
  return useQuery<CurrentUser>([`/public/user/pk/${id}/detail/`], options);
}
