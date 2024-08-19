import { useCallback, useState } from "react";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { MdOutlineDelete } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import DataGrid from "~/components/data-grid";
import { useUserDatasetFiles } from "~/queries/dataset";
import Button from "~/components/button";
import FilePreview from "~/components/file/preview";
import { OutletContext } from "~/layouts/paginated";
import {
  createColumn,
  createDateColumn,
  createIdColumn,
  createMenuColumn,
  createRenderCell,
} from "~/utils/table-helpers";
import { useDeleteDatasetFile } from "~/mutations/dataset";
import usePrompt from "~/hooks/usePrompt";
import FileUpload from "~/components/file/upload";

export default function Resources() {
  const { id } = useParams();

  const { paginationModel, onPaginationModelChange } = useOutletContext<OutletContext>();

  const [searchParams] = useSearchParams();

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
        description: "Are you sure you want to delete this file?",
      });

      if (confirmed) {
        await deleteDatasetFile(data);
      }
    },
    [deleteDatasetFile, prompt]
  );

  const PaperContent = useCallback(
    ({ row }: { row: Dataset["files"][number] }) => {
      const avaliableFormat = row.format === "xlsx" || row.format === "text/csv";

      return (
        <>
          {avaliableFormat && (
            <button
              onClick={() => {
                setPreviewFile({
                  open: true,
                  data: row,
                });
              }}
            >
              <IoEyeOutline />
              <span>View</span>
            </button>
          )}
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
    createIdColumn(paginationModel),
    createColumn({
      field: "file_name",
      headerName: "Title",
    }),
    createColumn({
      field: "format",
      headerName: "Format",
      minWidth: 200,
      cellClassName: "normal-case",
    }),
    createColumn({
      field: "size",
      headerName: "Size",
      minWidth: 150,
    }),
    createColumn({
      field: "download_count",
      headerName: "Downloads",
      minWidth: 200,
    }),
    createDateColumn({
      field: "created_at",
      headerName: "Created At",
    }),
    createMenuColumn({
      renderCell: createRenderCell(menuObj, setMenuObj, PaperContent),
    }),
  ];

  return (
    <>
      <div className="border p-4 rounded-md flex flex-col gap-4">
        <header className="flex items-center gap-4 justify-between">
          <h3 className="text-lg font-medium">Resources</h3>
          <Button
            className="!py-2 px-1"
            onClick={() => {
              setOpenFileUpload(true);
            }}
          >
            Add
          </Button>
        </header>
        <div className={`${(isLoading || (data && !data.results.length)) && "h-[500px]"}`}>
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
