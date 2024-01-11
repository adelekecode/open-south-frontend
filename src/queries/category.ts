import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  return useQuery<{ count: number; data: Category[] }>([`/categories/`]);
}

export function usePublicCategories() {
  return useQuery<Category[]>([`/public/category/?key=public`]);
}
