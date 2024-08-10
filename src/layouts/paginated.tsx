import { useCallback, useEffect, useMemo } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { GridCallbackDetails, GridPaginationModel } from "@mui/x-data-grid";

type PaginationModel = {
  page: number;
  pageSize: number;
};

export type OutletContext = {
  paginationModel: PaginationModel;
  onPaginationModelChange: (
    { page, pageSize }: GridPaginationModel,
    { reason }: GridCallbackDetails<any>
  ) => void;
  queryParams: {
    get: (key: string) => string;
    delete: (key: string) => void;
    set: (key: string, value: string) => void;
  };
  pagination: Record<"limit" | "offset", string>;
};

export default function Paginated() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pagination = {
    limit: searchParams.get("limit") || "",
    offset: searchParams.get("offset") || "",
  };

  useEffect(() => {
    if (!pagination.limit || !pagination.offset) {
      setSearchParams({ limit: "10", offset: "0" }, { replace: true });
    }
  }, [pagination.limit, pagination.offset, setSearchParams]);

  const paginationModel = useMemo(() => {
    const offset = parseInt(pagination.offset || "0");
    const pageSize = parseInt(pagination.limit || "10");
    const page = Math.floor(offset / pageSize);

    return {
      page,
      pageSize,
    };
  }, [pagination.limit, pagination.offset]);

  const onPaginationModelChange = useCallback(
    ({ page, pageSize }: GridPaginationModel, { reason }: GridCallbackDetails<any>) => {
      if (!reason) return;

      setSearchParams({
        limit: pageSize.toString(),
        offset: (page * pageSize).toString(),
      });
    },
    [setSearchParams]
  );

  const queryParams = useMemo(() => {
    return {
      get: (key: string) => searchParams.get(key) || "",
      delete: (key: string) => {
        setSearchParams((params) => {
          params.delete(key);

          return params;
        });
      },
      set: (key: string, value: string) => {
        setSearchParams(
          (params) => {
            params.set(key, value);

            return params;
          },
          {
            replace: true,
          }
        );
      },
    };
  }, [searchParams, setSearchParams]);

  return (
    <Outlet
      context={
        {
          paginationModel,
          onPaginationModelChange,
          queryParams,
          pagination,
        } satisfies OutletContext
      }
    />
  );
}
