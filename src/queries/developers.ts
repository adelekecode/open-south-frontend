import { useQuery } from "@tanstack/react-query";

export function useGetDevelopers({
  search,
  filterBy: { status },
  pagination: { page, pageSize },
}: {
  search: string;
  filterBy: {
    status: string;
  };
  pagination: Pagination;
}) {
  return useQuery<PaginatedResponse<News[]>>([
    `/admin/api/users/?search=${search}&status=${status || ""}&limit=${pageSize}&offset=${page * pageSize}`,
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
