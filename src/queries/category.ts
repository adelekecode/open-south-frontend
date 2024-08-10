import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function useAdminCategories(search = "") {
  const [searchParams] = useSearchParams();

  const params = new URLSearchParams({
    status: searchParams.get("status") || "",
    limit: searchParams.get("limit") || "10",
    offset: searchParams.get("offset") || "0",
  });

  return useQuery<PaginatedResponse<Category[]>>([
    `/admin/categories/?search=${search}&${params.toString()}`,
  ]);
}

export function usePublicCategories() {
  return useQuery<Category[]>([`/public/category/?key=public`]);
}
