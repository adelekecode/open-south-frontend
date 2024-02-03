import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useAdminNews(
  search = "",
  filterBy: {
    status: string | null;
  } = {
    status: null,
  },
  pagination: { pageSize: number; page: number }
) {
  const { status } = filterBy;
  const { page, pageSize } = pagination;

  return useQuery<PaginationData<News[]>>([
    `/admin/news/list/?search=${search}&status=${status || ""}&limit=${pageSize}&offset=${page * pageSize}`,
  ]);
}

export function usePublicNews(pageSize: number = 10, page: number = 1) {
  return useQuery<PaginationData<News[]>>([
    `/public/news/?key=public&limit=${pageSize}&offset=${(page - 1) * pageSize}`,
  ]);
}

export function usePublicNewsDetails(slug: string, options?: UseQueryOptions<News>) {
  return useQuery<News>([`/public/news/${slug}/?key=public`], options);
}
