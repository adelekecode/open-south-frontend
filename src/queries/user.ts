import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useCurrentUser(
  queryKey = ["/auth/users/me/"],
  options?: UseQueryOptions<CurrentUser>
) {
  return useQuery<CurrentUser>(queryKey, options);
}

export function useGetAllUsers() {
  return useQuery<CurrentUser[]>([`/auth/users/`]);
}
