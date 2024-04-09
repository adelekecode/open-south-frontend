import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import * as Papa from "papaparse";
import DataGrid from "~/components/data-grid";
import Modal from "~/components/modal";
import { useDatasetFilePreview } from "~/queries/dataset";
import Button from "~/components/button";
import { notifyError } from "~/utils/toast";

type PreviewProps = {
  open: boolean;
  setOpen: (obj: { open: boolean; data: Dataset["files"][0] | null }) => void;
  file: Dataset["files"][0] | null;
  onDownload?: (id: string) => Promise<any>;
};

export default function Preview({ open, setOpen, file, onDownload }: PreviewProps) {
  const [excelData, setExcelData] = useState<any[] | null>(null);
  const [csvData, setCsvData] = useState<any[] | null>(null);

  const { data, isLoading } = useDatasetFilePreview(file?.file_url || "", file?.format || "", {
    enabled: !!file?.file_url,
  });

  useEffect(() => {
    if (data) {
      if (file?.format === "xlsx") {
        const blob = new Blob([data as any]);

        const reader = new FileReader();

        reader.onload = (e) => {
          const data = e.target?.result as string;
          const workbook = XLSX.read(data, { type: "binary" });

          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const csv = XLSX.utils.sheet_to_csv(sheet);

          Papa.parse(csv as any, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (result) => {
              const data = (result.data as any[]).map((item, index) => ({
                "no.": index + 1,

                ...item,
              }));

              setExcelData(data);
            },
            error: (err) => {
              console.error("Error parsing XLSX file:", err);
              notifyError("Error parsing XLSX file, please try again");
            },
          });
        };

        reader.readAsBinaryString(blob);
      } else if (file?.format === "text/csv") {
        Papa.parse(data as any, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (result) => {
            const data = (result.data as any[]).map((item, index) => ({
              "no.": index + 1,

              ...item,
            }));

            setCsvData(data);
          },
          error: (err) => {
            console.error("Error parsing CSV file:", err);
            notifyError("Error parsing CSV file, please try again");
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
      ? Object.keys(csvData[0]).map((key) => ({
          field: key,
          headerName: key,
          minWidth: key === "no." ? 100 : 200,
          flex: key === "no." ? undefined : 1,
        }))
      : null;

  const excelColumns =
    excelData && excelData.length > 0
      ? Object.keys(excelData[0]).map((key) => ({
          field: key,
          headerName: key,
          minWidth: key === "no." ? 100 : 200,
          flex: key === "no." ? undefined : 1,
        }))
      : null;

  async function downloadHandler(blob: Blob, format: ".xlsx" | ".csv") {
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${file?.file_name || "example"}${format}`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    return onDownload?.(file?.id || "");
  }

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
            <header className="flex items-center justify-between gap-1 largeMobile:flex-col">
              <h1 className="text-lg largeMobile:text-base font-medium break-words largeMobile:self-start">
                {file.file_name
                  ? file.file_name[0].toUpperCase() + file.file_name.slice(1)
                  : "-------"}
              </h1>
              <Button
                color="info"
                variant="outlined"
                className="!p-2 !px-4 !text-xs largeMobile:self-end"
                onClick={async () => {
                  if (
                    file?.format === "xlsx" ||
                    file?.format ===
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  ) {
                    const blob = new Blob([data as BlobPart], {
                      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    });

                    downloadHandler(blob, ".xlsx");
                  } else if (file?.format === "text/csv") {
                    const blob = new Blob([data as BlobPart], { type: "text/csv" });

                    downloadHandler(blob, ".csv");
                  }
                }}
              >
                Download
              </Button>
            </header>
            <DataGrid
              rows={csvData || excelData || []}
              columns={csvColumns || excelColumns || []}
              getRowId={(params) => params["no."]}
            />
          </>
        )}
      </div>
    </Modal>
  );
}
