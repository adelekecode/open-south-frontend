import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { MenuItem, OutlinedInput, Select } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import DataGrid from "~/components/data-grid";
import { useUserOrganizationDatasets } from "~/queries/dataset";
import useDebounce from "~/hooks/debounce";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "NO.",
    minWidth: 10,
    renderCell: ({ api, row }) => {
      const { getAllRowIds } = api;

      return getAllRowIds().indexOf(row.id) + 1;
    },
  },
  {
    field: "title",
    headerName: "TITLE",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "created_at",
    headerName: "CREATED AT",
    flex: 1,
    minWidth: 150,
    valueFormatter: ({ value }) => {
      return moment(value).format("Do MMM, YYYY");
    },
    sortComparator: (v1, v2) => {
      return new Date(v1).getTime() - new Date(v2).getTime();
    },
    align: "center",
    headerAlign: "center",
  },
  {
    field: "updated_at",
    headerName: "UPDATED AT",
    minWidth: 150,
    flex: 1,
    valueFormatter: ({ value }) => {
      return moment(value).fromNow();
    },
    sortComparator: (v1, v2) => {
      return new Date(v1).getTime() - new Date(v2).getTime();
    },
    align: "center",
    headerAlign: "center",
  },
  {
    field: "views",
    headerName: "VIEWS",
    flex: 1,
    minWidth: 70,
    valueFormatter: ({ value }) => {
      return value.count;
    },
    sortComparator: (v1, v2) => {
      return v1 - v2.count;
    },
    align: "center",
    headerAlign: "center",
  },
  {
    field: "files_count",
    headerName: "FILES",
    minWidth: 70,
    valueFormatter: ({ value }) => {
      return value;
    },
    sortComparator: (v1, v2) => {
      return v1 - v2;
    },
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: ({ value }) => {
      const obj: {
        element: any;
        styles: string;
      } = {
        element: "-------",
        styles: "py-1 px-2 rounded-full text-xs",
      };

      if (value === "pending") {
        obj.element = (
          <p className={twMerge(obj.styles, `text-orange-500 border border-orange-500`)}>Pending</p>
        );
      } else if (value === "published") {
        obj.element = (
          <p className={twMerge(obj.styles, `text-green-500 border border-green-500`)}>Published</p>
        );
      } else if (value === "rejected") {
        obj.element = (
          <p className={twMerge(obj.styles, `text-red-500 border border-red-500`)}>Rejected</p>
        );
      } else if (value === "further_review") {
        obj.element = (
          <p className={twMerge(obj.styles, `text-info-800 border border-info-800`)}>
            Further Review
          </p>
        );
      }

      return obj.element;
    },
    sortable: false,
    minWidth: 130,
    align: "center",
    headerAlign: "center",
  },
];

export default function Dataset() {
  const { slug } = useParams();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") || "";
  const status = searchParams.get("status") || "";

  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });

  const searchParamsOption = {
    replace: true,
  };

  const queryClient = useQueryClient();
  const organization = queryClient.getQueryData<Organization>([`/organisations/${slug}/`]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const { data, isLoading } = useUserOrganizationDatasets(
    organization?.id || "",
    useDebounce(search).trim(),
    {
      status,
    },
    pagination
  );

  return (
    <>
      <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-6 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium flex items-center gap-2">
            Dashboard <span className="text-sm">{">"}</span>{" "}
            <span className="text-info-800">{organization?.name || "-----"}</span>
          </h1>
        </div>
        <div className="bg-white w-full border border-info-100 pb-8 rounded-md flex flex-col">
          <div className="flex items-center border-y p-4 py-4 border-info-100">
            <div className="flex items-center gap-4 h-10 w-full">
              <OutlinedInput
                className="w-[400px] tablet:w-[80%] [@media(max-width:500px)]:!w-full !h-full !text-sm"
                placeholder="Search for title..."
                value={search}
                onChange={(e) => {
                  const value = e.target.value;

                  if (!value) {
                    return setSearchParams((params) => {
                      params.delete("q");

                      return params;
                    });
                  }

                  setSearchParams((params) => {
                    params.set("q", value);

                    return params;
                  }, searchParamsOption);
                }}
              />
              <Select
                className="w-[200px] !text-sm !py-0 !px-0 !h-full"
                value={status}
                onChange={async (e) => {
                  const chosenValue = e.target.value;

                  if (!chosenValue) {
                    return setSearchParams((params) => {
                      params.delete("status");

                      return params;
                    });
                  }

                  setSearchParams((params) => {
                    params.set("status", chosenValue);

                    return params;
                  }, searchParamsOption);
                }}
                displayEmpty
              >
                <MenuItem value="" className="placeholder">
                  <span className="text-info-600">Filter by status</span>
                </MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="unpublished">Unpublished</MenuItem>
                <MenuItem value="further_review">Further Review</MenuItem>
              </Select>
            </div>
          </div>
          <div className="min-h-[500px] p-4">
            <DataGrid
              rows={data ? data.results : []}
              loading={isLoading}
              onRowClick={(params) => {
                navigate(`./${params.id}`);
              }}
              getRowClassName={() => `cursor-pointer`}
              columns={columns}
              rowCount={data?.count || 0}
              paginationModel={pagination}
              onPaginationModelChange={({ page, pageSize }, { reason }) => {
                if (!reason) return;

                setPagination({
                  page,
                  pageSize,
                });
              }}
              paginationMode="server"
            />
          </div>
        </div>
      </main>
    </>
  );
}
