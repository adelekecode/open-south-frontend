import { useCallback, useEffect, useState } from "react";
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
  file: Dataset["files"][0];
  onDownload?: (id: string) => Promise<any>;
};

//? Refactor this

export default function Preview({ open, setOpen, file, onDownload }: PreviewProps) {
  const { t } = useTranslation("components/file-preview");

  const [excelData, setExcelData] = useState<Dataset[] | null>(null);
  const [csvData, setCsvData] = useState<Dataset[] | null>(null);

  const { data, isLoading } = useDatasetFilePreview(file?.file_url || "", file?.format || "", {
    enabled: !!file?.file_url && !!file?.format,
  });

  useEffect(() => {
    const handleDataParsing = (parsedData: any[]): Dataset[] => {
      return parsedData.map((item, index) => ({
        "no.": index + 1,
        ...item,
      }));
    };

    if (data) {
      if (file?.format === "xlsx") {
        const blob = new Blob([data]);
        const reader = new FileReader();

        reader.onload = (e) => {
          const binaryData = e.target?.result as string;
          const workbook = XLSX.read(binaryData, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const csv = XLSX.utils.sheet_to_csv(sheet);

          Papa.parse(csv, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (result) => setExcelData(handleDataParsing(result.data)),
            error: (err: any) => {
              console.error("Error parsing XLSX file:", err);
              notifyError("Error parsing XLSX file, please try again");
            },
          });
        };

        reader.readAsBinaryString(blob);
      } else if (file?.format === "text/csv") {
        Papa.parse(data.toString(), {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (result) => setCsvData(handleDataParsing(result.data)),
          error: (err: any) => {
            console.error("Error parsing CSV file:", err);
            notifyError("Error parsing CSV file, please try again");
          },
        });
      }
    }
  }, [data, file?.format]);

  const downloadHandler = useCallback(
    async (data: BlobPart) => {
      const fileType = file?.format;
      let blob: Blob;

      if (
        fileType === "xlsx" ||
        fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        downloadFileHandler(file, blob, ".xlsx");
      } else if (fileType === "text/csv") {
        blob = new Blob([data], { type: "text/csv" });
        downloadFileHandler(file, blob, ".csv");
      }
      await onDownload?.(file?.id || "");
    },
    [file, onDownload]
  );

  const columns = useCallback((data: Dataset[] | null) => {
    return data && data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key,
          minWidth: key === "no." ? 100 : 200,
          flex: key === "no." ? undefined : 1,
        }))
      : null;
  }, []);

  return (
    <Modal
      open={open}
      onClose={() =>
        setOpen({
          open: false,
          data: null,
        })
      }
      sx={{
        ".MuiPaper-root": {
          // minWidth: "auto",
          maxWidth: "900px",
          "@media (max-width: 1024px)": {
            maxWidth: "600px",
          },
          "@media (max-width: 724px)": {
            maxWidth: "none",
            minWidth: "90%",
          },
        },
      }}
      // scroll="body"
      exitIcon={{
        display: true,
      }}
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
      ) : data ? (
        <>
          <DialogTitle className="text-base largeMobile:text-sm break-all font-medium largeMobile:self-start">
            {file.file_name ? file.file_name[0].toUpperCase() + file.file_name.slice(1) : "-------"}
          </DialogTitle>
          {/* <header className="flex items-center justify-between gap-1 largeMobile:flex-col flex-wrap pb-4 mt-8"> */}
          <Button
            color="info"
            variant="outlined"
            size="small"
            className="!p-2 !px-4 !text-xs largeMobile:self-end !ml-auto !mr-4 !mt-3"
            onClick={async () => await downloadHandler(data)}
          >
            {t("cta-btn.download")}
          </Button>
          {/* </header> */}
          <DialogContent className="mt-4">
            <DataGrid
              rows={csvData || excelData || []}
              columns={columns(csvData || excelData) || []}
              getRowId={(params) => params["no."]}
            />
          </DialogContent>
        </>
      ) : (
        <div>
          <h1>No data</h1>
        </div>
      )}
    </Modal>
  );
}
