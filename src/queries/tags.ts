import { useQuery } from "@tanstack/react-query";

export function usePublicTags(pageSize: number = 20, page: number = 1) {
  return useQuery<Category[]>([
    `/public/tags/?key=public&&limit=${pageSize}&offset=${(page - 1) * pageSize}`,
  ]);
}
