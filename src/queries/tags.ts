import { useQuery } from "@tanstack/react-query";

export function usePublicTags() {
  return useQuery<Category[]>([`/public/tags/?key=public`]);
}
