import { useQuery } from "@tanstack/react-query";

export function usePublicTags(pageSize: number = 20, page: number = 1) {
  return useQuery<PaginatedResponse<Category[]>>([
    `/public/tags/?key=public&search=&limit=${pageSize}&offset=${(page - 1) * pageSize}`,
  ]);
}
