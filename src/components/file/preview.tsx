import { useEffect, useState } from "react";
import { DialogContent, DialogTitle } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import * as Papa from "papaparse";
import DataGrid from "~/components/data-grid";
import Modal from "~/components/modal";
import { useDatasetFilePreview } from "~/queries/dataset";
import Button from "~/components/button";
import { notifyError } from "~/utils/toast";
import { downloadFileHandler } from "~/utils/helper";

type PreviewProps = {
  open: boolean;
  setOpen: (obj: { open: boolean; data: Dataset["files"][0] | null }) => void;
  file: Dataset["files"][0] | null;
  onDownload?: (id: string) => Promise<any>;
};

export default function Preview({ open, setOpen, file, onDownload }: PreviewProps) {
  const { t } = useTranslation("components/file-preview");

  const [excelData, setExcelData] = useState<Dataset[] | null>(null);
  const [csvData, setCsvData] = useState<Dataset[] | null>(null);

  const { data, isLoading } = useDatasetFilePreview(file?.file_url || "", file?.format || "", {
    enabled: !!file?.file_url && !!file?.format,
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
    return notifyError("File not found");
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

  return (
    <Modal
      open={open}
      onClose={() =>
        setOpen({
          open: false,
          data: null,
        })
      }
    >
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
          <header className="flex items-center justify-between gap-1 largeMobile:flex-col flex-wrap pb-4">
            <DialogTitle>
              <h1 className="text-lg largeMobile:text-base break-all font-medium largeMobile:self-start">
                {file.file_name
                  ? file.file_name[0].toUpperCase() + file.file_name.slice(1)
                  : "-------"}
              </h1>
            </DialogTitle>
            <Button
              color="info"
              variant="outlined"
              size="small"
              className="!p-2 !px-4 !text-xs largeMobile:self-end !ml-auto"
              onClick={async () => {
                const newData = { ...data } as BlobPart;

                if (
                  file?.format === "xlsx" ||
                  file?.format ===
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ) {
                  const blob = new Blob([newData], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                  });

                  downloadFileHandler(file, blob, ".xlsx");
                } else if (file?.format === "text/csv") {
                  const blob = new Blob([newData], { type: "text/csv" });

                  downloadFileHandler(file, blob, ".csv");
                }
                await onDownload?.(file.id);
              }}
            >
              {t("cta-btn.download")}
            </Button>
          </header>
          <DialogContent>
            <DataGrid
              rows={csvData || excelData || []}
              columns={csvColumns || excelColumns || []}
              getRowId={(params) => params["no."]}
            />
          </DialogContent>
        </>
      )}
    </Modal>
  );
}
