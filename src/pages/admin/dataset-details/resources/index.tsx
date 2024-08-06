import { useCallback, useState } from "react";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { IoEyeOutline } from "react-icons/io5";
import DataGrid from "~/components/data-grid";
import { useUserDatasetFiles } from "~/queries/dataset";
import FilePreview from "~/components/file/preview";
import { OutletContext } from "~/layouts/paginated";
import {
  createColumn,
  createDateColumn,
  createIdColumn,
  createMenuColumn,
  createRenderCell,
} from "~/utils/table-helpers";

export default function Resources() {
  const { id } = useParams();

  const [searchParams] = useSearchParams();

  const { paginationModel, onPaginationModelChange } = useOutletContext<OutletContext>();

  const [previewFile, setPreviewFile] = useState<{
    open: boolean;
    data: Dataset["files"][number] | null;
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

  const PaperContent = useCallback(({ row }: { row: Dataset["files"][number] }) => {
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
      </>
    );
  }, []);

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
        </header>
        <div className={`${(isLoading || !data || (data && !data.results.length)) && "h-[500px]"}`}>
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
