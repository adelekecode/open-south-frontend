import { useEffect, useState } from "react";
// import * as XLSX from "xlsx";
import * as Papa from "papaparse";
import DataGrid from "~/components/data-grid";
import Modal from "~/components/modal";
import { usePublicFilePreview } from "~/queries/dataset";
import Button from "~/components/button";

type FilePreviewProps = {
  open: boolean;
  setOpen: (obj: { open: boolean; data: Dataset["files"][0] | null }) => void;
  file: Dataset["files"][0] | null;
};

export default function FilePreview({ open, setOpen, file }: FilePreviewProps) {
  const [excelData] = useState<any[] | null>(null);
  const [csvData, setCsvData] = useState<any[] | null>(null);

  const { data, isLoading } = usePublicFilePreview(file?.file_url || "", {
    enabled: !!file?.file_url,
  });

  useEffect(() => {
    if (data) {
      // const workbook = XLSX.read(data, { type: "array" });

      // // console.log(workbook, "workbook");

      // const sheetName = workbook.SheetNames[0];

      // // console.log(sheetName, "sheetName");

      // const res = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      // // console.log(res, "excelData");

      // const workbook = XLSX.read(data, { type: "array" });

      // console.log(workbook);

      // const sheetName = workbook.SheetNames[0];

      // if (!sheetName) {
      //   throw new Error("No sheet found in the workbook.");
      // }

      // const sheet = workbook.Sheets[sheetName];

      // console.log(sheet, "sheet");

      // if (!sheet) {
      //   throw new Error(`Sheet "${sheetName}" not found in the workbook.`);
      // }

      // const res = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // console.log("Excel data:", res);

      // setExcelData(res);
      // if (file?.format === "xlsx") {
      // } else
      if (file?.format === "text/csv") {
        Papa.parse(data as any, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (result) => {
            const data = (result.data as any[]).map((item, index) => ({
              id: index,

              ...item,
            }));

            setCsvData(data);
          },
          error: (err) => {
            console.error("Error parsing CSV:", err);
          },
        });
      }
    }
  }, [data, file?.format]);

  if (!file) {
    return;
  }

  const csvColumns =
    csvData && csvData.length > 0
      ? Object.keys(csvData[0]).map((key) => ({ field: key, headerName: key }))
      : null;
  const excelColumns =
    excelData && excelData.length > 0
      ? Object.keys(excelData[0]).map((key) => ({ field: key, headerName: key }))
      : null;

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
        className: "w-[800px] tablet:!w-full pt-16",
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
                  <div className={`${index < 7 && "border-b pb-2"}`} key={index + 1}>
                    <div className={`animate-pulse bg-gray-200 h-8`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <header className="flex items-center justify-between gap-1">
              <h1 className="text-lg font-medium">
                {file.file_name
                  ? file.file_name[0].toUpperCase() + file.file_name.slice(1)
                  : "-------"}
              </h1>
              <Button
                color="info"
                variant="outlined"
                className="!p-2 !px-4 !text-xs"
                onClick={() => {
                  if (
                    file?.format === "xlsx" ||
                    file?.format ===
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  ) {
                    const blob = new Blob([data as BlobPart], {
                      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    });

                    const url = URL.createObjectURL(blob);

                    const link = document.createElement("a");

                    link.href = url;

                    link.download = `${file?.file_name || "example"}.xlsx`;

                    document.body.appendChild(link);

                    link.click();

                    document.body.removeChild(link);

                    URL.revokeObjectURL(url);
                  } else if (file?.format === "text/csv") {
                    // Assuming `data` is a valid CSV file content
                    const blob = new Blob([data as BlobPart], { type: "text/csv" });

                    const url = URL.createObjectURL(blob);

                    const link = document.createElement("a");

                    link.href = url;

                    link.download = `${file?.file_name || "example"}.csv`;

                    document.body.appendChild(link);

                    link.click();

                    document.body.removeChild(link);

                    URL.revokeObjectURL(url);
                  }
                }}
              >
                Download
              </Button>
            </header>
            <DataGrid
              rows={csvData || excelData || []}
              columns={csvColumns || excelColumns || []}
            />
          </>
        )}
      </div>
    </Modal>
  );
}
