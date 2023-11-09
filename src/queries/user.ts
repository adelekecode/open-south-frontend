import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  return useQuery<User>(["auth/users/me/"]);
}
