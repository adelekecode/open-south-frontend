import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function useGetDevelopers(search = "") {
  const [searchParams] = useSearchParams();

  const params = new URLSearchParams({
    is_active: searchParams.get("is_active") || "",
    limit: searchParams.get("limit") || "10",
    offset: searchParams.get("offset") || "0",
  });

  return useQuery<PaginatedResponse<News[]>>([
    `/admin/api/users/?search=${search}&${params.toString()}`,
  ]);
}

export function useGetDeveloperLogs() {
  return useQuery<
    PaginatedResponse<
      {
        id: string;
        meta: {
          token: string;
          request_path: string;
          request_method: string;
          request_status: string;
          request_status_code: number;
        };
        created_at: string;
      }[]
    >
  >([`/user/api/request/?limit=100&offset=0`]);
}
