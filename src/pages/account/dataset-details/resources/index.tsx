import { useCallback, useState } from "react";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { MdOutlineDelete } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import DataGrid from "~/components/data-grid";
import { useUserDatasetFiles } from "~/queries/dataset";
import Button from "~/components/button";
import FileUpload from "./file-upload";
import FilePreview from "~/components/file/preview";
import { OutletContext } from "~/layouts/paginated";
import {
  createColumn,
  createDateColumn,
  createIdColumn,
  createMenuColumn,
  createRenderCell,
} from "~/utils/table-helpers";
import usePrompt from "~/hooks/usePrompt";
import { useDeleteDatasetFile } from "~/mutations/dataset";

export default function Resources() {
  const { t } = useTranslation("dashboard-layout/account/dataset/id");

  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const { paginationModel, onPaginationModelChange } = useOutletContext<OutletContext>();

  const [openFileUpload, setOpenFileUpload] = useState(false);
  const [previewFile, setPreviewFile] = useState<{
    open: boolean;
    data: Dataset["files"][0] | null;
  }>({
    open: false,
    data: null,
  });
  const [menuObj, setMenuObj] = useState<{
    [key: string]: HTMLButtonElement | null;
  }>({});

  const { isLoading, data } = useUserDatasetFiles(id || "", searchParams, {
    enabled: !!id,
  });

  const { mutateAsync: deleteDatasetFile } = useDeleteDatasetFile();

  const prompt = usePrompt();

  const handleDelete = useCallback(
    async (data: { fileId: string; datasetId: string }) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description: t("resources.delete-confirmation-modal.contents"),
      });

      if (confirmed) {
        await deleteDatasetFile(data);
      }
    },
    [deleteDatasetFile, prompt, t]
  );

  const PaperContent = useCallback(
    ({ row }: { row: Dataset["files"][number] }) => {
      const avaliableFormat = row.format === "xlsx" || row.format === "text/csv";

      return (
        <>
          <button
            onClick={() => {
              setPreviewFile({
                open: true,
                data: row,
              });
            }}
            disabled={!avaliableFormat}
          >
            <IoEyeOutline />
            <span>View</span>
          </button>
          <button
            onClick={async () => {
              await handleDelete({
                fileId: row.id,
                datasetId: id || "",
              });
            }}
          >
            <MdOutlineDelete />
            <span>Delete</span>
          </button>
        </>
      );
    },
    [handleDelete, id]
  );

  const columns: GridColDef[] = [
    createIdColumn(paginationModel, {
      headerName: t("resources.table.header.no"),
    }),
    createColumn({
      field: "file_name",
      headerName: t("resources.table.header.name"),
    }),
    createColumn({
      field: "format",
      headerName: t("resources.table.header.format"),
    }),
    createColumn({
      field: "size",
      headerName: t("resources.table.header.size"),
    }),
    createColumn({
      field: "download_count",
      headerName: t("resources.table.header.downloads"),
    }),
    createDateColumn({
      field: "created_at",
      headerName: t("resources.table.header.created-at"),
    }),
    createMenuColumn({
      renderCell: createRenderCell(menuObj, setMenuObj, PaperContent),
    }),
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
        <div className={`${(isLoading || (data && !data.results.length)) && "min-h-[500px]"}`}>
          <DataGrid
            loading={isLoading}
            rows={data ? data.results : []}
            columns={columns}
            rowCount={data?.count || 0}
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange}
            paginationMode="server"
          />
        </div>
      </div>
      {openFileUpload && <FileUpload setOpen={(bool: boolean) => setOpenFileUpload(bool)} />}
      {previewFile.open && previewFile.data && (
        <FilePreview
          open={true}
          setOpen={(obj: { open: boolean; data: Dataset["files"][0] | null }) =>
            setPreviewFile(obj)
          }
          file={previewFile.data}
        />
      )}
    </>
  );
}
