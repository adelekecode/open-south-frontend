import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useCurrentUser(
  queryKey = ["/auth/users/me/"],
  options?: UseQueryOptions<CurrentUser>
) {
  return useQuery<CurrentUser>(queryKey, options);
}

export function useGetAllUsers(
  searchParams: URLSearchParams,
  options?: UseQueryOptions<PaginatedResponse<CurrentUser[]>>
) {
  const isActive = searchParams.get("is-active") || "";

  const params = new URLSearchParams({
    search: searchParams.get("q") || "",
    limit: searchParams.get("limit") || "10",
    offset: searchParams.get("offset") || "0",
  });

  let status = "";

  if (isActive === "true") {
    status = "active";
  } else if (isActive === "false") {
    status = "inactive";
  }

  return useQuery<PaginatedResponse<CurrentUser[]>>(
    [`/admin/users/?status=${status}&${params.toString()}`],
    options
  );
}

export function usePublicProfile(
  id: string,
  options?: UseQueryOptions<
    CurrentUser & {
      user_stats: {
        data_count: number;
        views: number;
        downloads: number;
      };
    }
  >
) {
  return useQuery<
    CurrentUser & {
      user_stats: {
        data_count: number;
        views: number;
        downloads: number;
      };
    }
  >([`/public/user/pk/${id}/detail/?key=public`], options);
}

export function useGetAPIKey({
  queryKey = ["/user/token/manager/"],
  options,
}: {
  queryKey?: QueryKey;
  options?: UseQueryOptions<{ token?: string }>;
}) {
  return useQuery<{ token?: string }>(queryKey, options);
}
