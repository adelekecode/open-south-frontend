import { useState } from "react";
import { useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { MdOutlineDelete } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import moment from "moment";
import DataGrid from "~/components/data-grid";
import { useUserDatasetFiles } from "~/queries/dataset";
import DeleteConfirmation from "./delete-confirmation";
import Button from "~/components/button";
import FileUpload from "./file-upload";
import FilePreview from "~/components/file/preview";

export default function Resources() {
  const { t } = useTranslation("dashboard-layout/account/dataset/id");

  const { id } = useParams();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    data: Dataset["files"][0] | null;
  }>({
    open: false,
    data: null,
  });
  const [openFileUpload, setOpenFileUpload] = useState(false);
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
      headerName: t("resources.table.header.no"),
      minWidth: 10,
      renderCell: ({ api, row }) => {
        const { page, pageSize } = paginationModel;
        const { getAllRowIds } = api;

        return getAllRowIds().indexOf(row.id) + 1 + page * pageSize;
      },
    },
    { field: "file_name", headerName: t("resources.table.header.name"), minWidth: 250 },
    {
      field: "format",
      headerName: t("resources.table.header.format"),
      align: "center",
      headerAlign: "center",
      minWidth: 200,
    },
    {
      field: "size",
      headerName: t("resources.table.header.size"),
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "download_count",
      headerName: t("resources.table.header.downloads"),
      align: "center",
      headerAlign: "center",
      minWidth: 200,
    },
    {
      field: "created_at",
      headerName: t("resources.table.header.created-at"),
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
      field: "_",
      headerName: t("resources.table.header.action"),
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
            <IconButton
              size="medium"
              onClick={() => {
                setDeleteModal({
                  open: true,
                  data: row,
                });
              }}
            >
              <MdOutlineDelete className="text-lg" />
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
          <h3 className="text-lg font-medium">{t("resources.title")}</h3>
          <Button
            className="!py-2 px-1"
            onClick={() => {
              setOpenFileUpload(true);
            }}
          >
            {t("resources.add-btn")}
          </Button>
        </header>
        <div className={`${(isLoading || (data && !data.results.length)) && "h-[500px]"}`}>
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
      <DeleteConfirmation
        open={deleteModal.open}
        onClose={() => {
          setDeleteModal({
            open: false,
            data: null,
          });
        }}
        data={
          deleteModal.data as Dataset["files"][0] & {
            dataset: string;
          }
        }
      />
      <FileUpload open={openFileUpload} setOpen={(bool: boolean) => setOpenFileUpload(bool)} />
      <FilePreview
        open={previewFile.open}
        setOpen={(obj: { open: boolean; data: Dataset["files"][0] | null }) => setPreviewFile(obj)}
        file={previewFile.data}
      />
    </>
  );
}
