import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useCurrentUser(
  queryKey = ["/auth/users/me/"],
  options?: UseQueryOptions<CurrentUser>
) {
  return useQuery<CurrentUser>(queryKey, options);
}

export function useGetAllUsers(
  pageSize: number = 10,
  page: number = 1,
  options?: UseQueryOptions<PaginationData<CurrentUser[]>>
) {
  return useQuery<PaginationData<CurrentUser[]>>(
    [`/admin/users/?limit=${pageSize}&offset=${(page - 1) * pageSize}`],
    options
  );
}

export function usePublicProfile(id: string, options?: UseQueryOptions<CurrentUser>) {
  return useQuery<CurrentUser>([`/public/user/pk/${id}/detail/`], options);
}
