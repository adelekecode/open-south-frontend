import { useQuery } from "@tanstack/react-query";

export function useAdminCategories() {
  return useQuery<PaginationData<Category[]>>([`/admin/categories/`]);
}

export function usePublicCategories() {
  return useQuery<Category[]>([`/public/category/?key=public`]);
}
