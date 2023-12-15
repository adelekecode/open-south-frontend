import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  return useQuery<{ count: number; data: Category[] }>([`/categories/`]);
}

export function useCategoryDetails(id: string) {
  return useQuery<Category>([`/categories/${id}/`]);
}
