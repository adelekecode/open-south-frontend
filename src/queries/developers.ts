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
