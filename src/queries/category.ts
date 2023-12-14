import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  return useQuery<Category[]>([`/categories/`]);
}

export function useCategoryDetails(id: string) {
  return useQuery<Category>([`/categories/${id}/`]);
}
