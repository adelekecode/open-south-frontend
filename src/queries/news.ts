import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useAdminNews(
  search = "",
  filterBy: {
    status: string;
  },
  pagination: Pagination
) {
  const { status } = filterBy;
  const { page, pageSize } = pagination;

  return useQuery<PaginatedResponse<News[]>>([
    `/admin/news/list/?search=${search}&status=${status || ""}&limit=${pageSize}&offset=${page * pageSize}`,
  ]);
}

export function usePublicNews(pageSize: number = 10, page: number = 1) {
  return useQuery<PaginatedResponse<News[]>>([
    `/public/news/?key=public&limit=${pageSize}&offset=${(page - 1) * pageSize}`,
  ]);
}

export function usePublicNewsDetails(slug: string, options?: UseQueryOptions<News>) {
  return useQuery<News>([`/public/news/${slug}/?key=public`], options);
}
