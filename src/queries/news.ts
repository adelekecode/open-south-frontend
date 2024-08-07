import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useAdminNews({
  searchParams,
}: {
  searchParams: Record<"search" | "status" | "limit" | "offset", string>;
}) {
  const params = new URLSearchParams({ ...searchParams });

  return useQuery<PaginatedResponse<News[]>>([`/admin/news/list/?${params.toString()}`]);
}

export function usePublicNews() {
  const params = new URLSearchParams({
    key: "public",
    limit: "10",
    offset: "0",
  });

  return useQuery<PaginatedResponse<News[]>>([`/public/news/?${params.toString()}`]);
}

export function usePublicNewsDetails(slug: string, options?: UseQueryOptions<News>) {
  return useQuery<News>([`/public/news/${slug}/?key=public`], options);
}
