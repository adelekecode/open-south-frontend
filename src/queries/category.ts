import { useQuery } from "@tanstack/react-query";

export function useAdminCategories(search = "", pagination: { pageSize: number; page: number }) {
  const { pageSize, page } = pagination;

  return useQuery<PaginationData<Category[]>>([
    `/admin/categories/?search=${search}&limit=${pageSize}&offset=${page * pageSize}`,
  ]);
}

export function usePublicCategories() {
  return useQuery<Category[]>([`/public/category/?key=public`]);
}
