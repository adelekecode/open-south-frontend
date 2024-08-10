import { useSearchParams } from "react-router-dom";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePublicDatasets(
  search = "",
  filterBy: {
    organization: string;
    tag: string;
    category: string;
    format: string;
    license: string;
    spatialCoverage: string;
  },
  sortBy: "" | "creation_date" | "last_update",
  pagination: { pageSize: number; page: number }
) {
  const { pageSize, page } = pagination;
  const { organization, tag, category, format, license, spatialCoverage } = filterBy;
  // const {} = sortBy

  return useQuery<PaginatedResponse<Dataset[]>>([
    `/public/datasets/?key=public&search=${search}&sort=${sortBy}&organisation=${organization || ""}&tags=${tag || ""}&category=${category || ""}&format=${format}&license=${license}&spatial_coverage=${spatialCoverage}&limit=${pageSize}&offset=${(page - 1) * pageSize}`,
  ]);
}

export function usePublicMapDatasets() {
  return useQuery<Dataset[]>([`/public/datasets/?key=public`]);
}

export function usePublicDatasetDetails(slug: string, options?: UseQueryOptions<Dataset>) {
  return useQuery<Dataset>([`/public/datasets/${slug}/?key=public`], options);
}

export function useDatasetFilePreview(
  url: string,
  fileType: string,
  options?: UseQueryOptions<any>
) {
  return useQuery<BlobPart>([`${url}`], {
    queryFn: async () => {
      const { data: response } = await axios.get(url, {
        responseType: fileType === "xlsx" ? "arraybuffer" : "blob",
      });

      return response;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  });
}

export function useAdminDatasetDetails(id: string) {
  return useQuery<Dataset>([`/admin/dataset/${id}/`]);
}

export function useAdminDatasets(search = "") {
  const [searchParams] = useSearchParams();

  const params = new URLSearchParams({
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
    limit: searchParams.get("limit") || "10",
    offset: searchParams.get("offset") || "0",
  });

  return useQuery<PaginatedResponse<Dataset[]>>([
    `/admin/datasets/?search=${search}&${params.toString()}`,
  ]);
}

export function useUserDatasets({
  searchParams,
}: {
  searchParams: Record<"search" | "status" | "limit" | "offset", string>;
}) {
  const params = new URLSearchParams({ ...searchParams });

  return useQuery<PaginatedResponse<Dataset[]>>([`/user/datasets/?${params.toString()}`]);
}

export function useUserDatasetDetails(id: string, options?: UseQueryOptions<Dataset>) {
  return useQuery<Dataset>([`/user/datasets/${id}/`], options);
}

export function useUserOrganizationDatasetDetails(
  orgId: string,
  id: string,
  options?: UseQueryOptions<Dataset>
) {
  return useQuery<Dataset>([`/user/organisations/pk/${orgId}/dataset/pk/${id}/details/`], options);
}

export function useUserOrganizationDatasets({
  orgId,
  searchParams,
  options,
}: {
  orgId: string;
  searchParams: Record<"search" | "status" | "limit" | "offset", string>;
  options?: UseQueryOptions<PaginatedResponse<Dataset[]>>;
}) {
  const params = new URLSearchParams({ ...searchParams });

  return useQuery<PaginatedResponse<Dataset[]>>(
    [`/user/organisations/${orgId}/datasets/?${params.toString()}`],
    options
  );
}

export function useUserDatasetFiles(
  id: string,
  searchParams: URLSearchParams,
  options?: UseQueryOptions<PaginatedResponse<Dataset["files"][]>>
) {
  const params = new URLSearchParams({
    limit: searchParams.get("limit") || "10",
    offset: searchParams.get("offset") || "0",
  });

  return useQuery<PaginatedResponse<Dataset["files"][]>>(
    [`/user/dataset/pk/${id}/files/?${params.toString()}`],
    options
  );
}

export function usePublicUserDataset(
  id: string,
  pagination: {
    pageSize: number;
    page: number;
  } = {
    pageSize: 10,
    page: 0,
  },
  options?: UseQueryOptions<PaginatedResponse<Dataset[]>>
) {
  const { page, pageSize } = pagination;

  return useQuery<PaginatedResponse<Dataset[]>>(
    [
      `/public/user/pk/${id}/datasets/?key=public&limit=${pageSize}&offset=${(page - 1) * pageSize}`,
    ],
    options
  );
}

export function usePublicPopularOrganizationDataset(
  id: string,
  options?: UseQueryOptions<Dataset[]>
) {
  return useQuery<Dataset[]>(
    [`/public/popular/organisation/pk/${id}/datasets/?key=public`],
    options
  );
}

export function usePopularDatasets() {
  return useQuery<Dataset[]>([`/public/popular/dataset/?key=public`]);
}
