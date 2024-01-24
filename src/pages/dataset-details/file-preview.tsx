import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import DataGrid from "~/components/data-grid";
import Modal from "~/components/modal";
import { usePublicFilePreview } from "~/queries/dataset";

type FilePreviewProps = {
  open: boolean;
  setOpen: (obj: { open: boolean; data: Dataset["files"][0] | null }) => void;
  file: Dataset["files"][0] | null;
};

export default function FilePreview({ open, setOpen, file }: FilePreviewProps) {
  const [excelData, setExcelData] = useState<any[]>([]);

  const { data, isLoading } = usePublicFilePreview(file?.file_url || "", {
    enabled: !!file?.file_url,
  });

  useEffect(() => {
    if (data) {
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];

      setExcelData(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]));
    }
  }, [data]);

  if (!file) {
    return;
  }

  const columns =
    excelData.length > 0
      ? Object.keys(excelData[0]).map((key) => ({ field: key, headerName: key }))
      : [];

  return (
    <Modal
      muiModal={{
        open,
        onClose: () =>
          setOpen({
            open: false,
            data: null,
          }),
        className: "px-4",
      }}
      innerContainer={{
        className: "pt-[2rem] w-[800px] tablet:!w-full",
      }}
    >
      <div className="flex flex-col gap-4 w-full">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <div className="animate-pulse bg-gray-200 h-6 w-[30%] rounded-sm" />
            <div className="border rounded overflow-hidden p-1 flex flex-col gap-3">
              <div className="animate-pulse bg-gray-200 h-10 rounded-t-sm" />
              <div className="flex flex-col gap-2">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div className={`${index < 7 && "border-b pb-2"}`}>
                    <div key={index + 1} className={`animate-pulse bg-gray-200 h-8`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <header className="flex flex-col gap-1">
              <h1 className="text-lg font-medium">{"File name"}</h1>
            </header>
            <DataGrid rows={excelData} columns={columns} />
          </>
        )}
      </div>
    </Modal>
  );
}
