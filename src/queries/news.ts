import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useAdminNews(pageSize: number = 10, page: number = 1) {
  return useQuery<PaginationData<News[]>>([
    `/admin/news/?limit=${pageSize}&offset=${(page - 1) * pageSize}`,
  ]);
}

export function usePublicNews(pageSize: number = 10, page: number = 1) {
  return useQuery<PaginationData<News[]>>([
    `/admin/news/?limit=${pageSize}&offset=${(page - 1) * pageSize}`,
  ]);
}

export function usePublicNewsDetails(slug: string, options?: UseQueryOptions<News>) {
  return useQuery<News>([`/admin/news/${slug}`], options);
}
