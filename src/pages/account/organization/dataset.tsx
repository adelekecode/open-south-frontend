import { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { MenuItem, OutlinedInput, Select, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { GridColDef } from "@mui/x-data-grid";
import { LuInfo } from "react-icons/lu";
import DataGrid from "~/components/data-grid";
import { useUserOrganizationDatasets } from "~/queries/dataset";
import useDebounce from "~/hooks/debounce";
import {
  createColumn,
  createDatasetStatusColumn,
  createDateColumn,
  createIdColumn,
} from "~/utils/table-helpers";
import { OutletContext } from "~/layouts/paginated";

export default function Dataset() {
  const { t } = useTranslation("dashboard-layout/account/organization/datasets");

  const { slug } = useParams();

  const navigate = useNavigate();

  const { paginationModel, onPaginationModelChange, queryParams, pagination } =
    useOutletContext<OutletContext>();

  const queryClient = useQueryClient();
  const organization = queryClient.getQueryData<Organization>([`/organisations/${slug}/`]);

  const columns: GridColDef[] = [
    createIdColumn(paginationModel),
    createColumn({
      field: "title",
      headerName: "Title",
    }),
    createColumn({
      field: "views",
      minWidth: 100,
      headerName: t("table.header.views"),
    }),
    createColumn({
      field: "files_count",
      headerName: t("table.header.files"),
      minWidth: 100,
    }),
    createDateColumn({
      field: "created_at",
      headerName: t("table.header.created-at"),
    }),
    createDateColumn({
      field: "updated_at",
      headerName: t("table.header.updated-at"),
    }),
    createDatasetStatusColumn({ field: "status", headerName: t("table.header.status") }),
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const search = queryParams.get("q");
  const status = queryParams.get("status");

  const { data, isLoading } = useUserOrganizationDatasets({
    orgId: organization?.id || "",
    searchParams: {
      search: useDebounce(search).trim(),
      status,
      ...pagination,
    },
  });

  return (
    <>
      <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-6 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium flex items-center gap-2">
            <span className="text-info-800 capitalize">{organization?.name || "-----"}</span>
            <span className="text-sm">{">"}</span> <span className="text-sm">Datasets</span>
            <Tooltip
              title="To create a dataset, click on the plus icon in the navbar."
              placement="top-start"
            >
              <button>
                <LuInfo className="text-sm text-zinc-600" />
              </button>
            </Tooltip>
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
                    return queryParams.delete("q");
                  }

                  queryParams.set("q", value);
                }}
              />
              <Select
                className="w-[200px] !text-sm !py-0 !px-0 !h-full"
                value={status}
                onChange={async (e) => {
                  const chosenValue = e.target.value;

                  if (!chosenValue) {
                    return queryParams.delete("status");
                  }

                  queryParams.set("status", chosenValue);
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
              rows={data?.results || []}
              loading={isLoading}
              onRowClick={(params) => {
                navigate(`./${params.id}`);
              }}
              getRowClassName={() => `cursor-pointer`}
              columns={columns}
              rowCount={data?.count || 0}
              paginationModel={paginationModel}
              onPaginationModelChange={onPaginationModelChange}
              paginationMode="server"
            />
          </div>
        </div>
      </main>
    </>
  );
}
