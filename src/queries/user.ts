import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useCurrentUser(options?: UseQueryOptions<User>) {
  return useQuery<User>(["/auth/users/me/"], options);
}
