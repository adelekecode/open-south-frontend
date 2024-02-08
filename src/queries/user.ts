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

  return useQuery<PaginationData<CurrentUser[]>>(
    [
      `/admin/users/?search=${search}&active=${isActive || ""}&limit=${pageSize}&offset=${page * pageSize}`,
    ],
    options
  );
}

export function usePublicProfile(id: string, options?: UseQueryOptions<CurrentUser>) {
  return useQuery<CurrentUser>([`/public/user/pk/${id}/detail/`], options);
}
