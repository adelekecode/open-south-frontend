import { useState } from "react";
import { useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import DataGrid from "~/components/data-grid";
import { useUserDatasetFiles } from "~/queries/dataset";
import FilePreview from "~/components/file/preview";
import { IoEyeOutline } from "react-icons/io5";

export default function Resources() {
  const { id } = useParams();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [previewFile, setPreviewFile] = useState<{
    open: boolean;
    data: Dataset["files"][0] | null;
  }>({
    open: false,
    data: null,
  });

  const { isLoading, data } = useUserDatasetFiles(
    id || "",
    {
      ...paginationModel,
    },
    {
      enabled: !!id,
    }
  );

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "NO.",
      minWidth: 10,
      renderCell: ({ api, row }) => {
        const { page, pageSize } = paginationModel;
        const { getAllRowIds } = api;

        return getAllRowIds().indexOf(row.id) + 1 + page * pageSize;
      },
    },
    { field: "file_name", headerName: "Name", minWidth: 250 },
    {
      field: "format",
      headerName: "Format",
      align: "center",
      headerAlign: "center",
      minWidth: 200,
    },
    {
      field: "size",
      headerName: "Size",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "download_count",
      headerName: "Downloads",
      align: "center",
      headerAlign: "center",
      minWidth: 200,
    },
    {
      field: "created_at",
      headerName: "CREATED AT",
      flex: 1,
      minWidth: 200,
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
      field: "action",
      headerName: "Action",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      sortable: false,
      renderCell: ({ row }) => {
        const avaliableFormat = row.format === "xlsx" || row.format === "text/csv";

        return (
          <div className="w-full flex items-center justify-center gap-1">
            <IconButton
              size="medium"
              onClick={() => {
                setPreviewFile({
                  open: true,
                  data: row,
                });
              }}
              disabled={!avaliableFormat}
            >
              <IoEyeOutline className="text-lg" />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="border p-4 rounded-md flex flex-col gap-4">
        <header className="flex items-center gap-4 justify-between">
          <h3 className="text-lg font-medium">Resources</h3>
        </header>
        <div className={`${(isLoading || !data || (data && !data.results.length)) && "h-[500px]"}`}>
          <DataGrid
            loading={isLoading}
            rows={data ? data.results : []}
            columns={columns}
            rowCount={data?.count || 0}
            paginationModel={paginationModel}
            onPaginationModelChange={({ page, pageSize }, { reason }) => {
              if (!reason) return;

              setPaginationModel({
                page,
                pageSize,
              });
            }}
            paginationMode="server"
          />
        </div>
      </div>
      {previewFile.open && previewFile.data && (
        <FilePreview
          open={previewFile.open}
          setOpen={(obj: { open: boolean; data: Dataset["files"][0] | null }) =>
            setPreviewFile(obj)
          }
          file={previewFile.data}
        />
      )}
    </>
  );
}
