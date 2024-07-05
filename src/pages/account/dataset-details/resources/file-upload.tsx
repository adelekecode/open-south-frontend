import { useCallback, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import Modal from "~/components/modal";
import { formatFileSize } from "~/utils/helper";
import FileUploadIllustration from "~/assets/illustrations/file-upload.png";
import Button from "~/components/button";
import { useUploadDatasetFile } from "~/mutations/dataset";

type FileUploadProps = {
  open: boolean;
  setOpen: (bool: boolean) => void;
};

type FileObj = {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  file: File;
};

export default function FileUpload({ open, setOpen }: FileUploadProps) {
  const { t } = useTranslation("dashboard-layout/account/dataset/id");

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<FileObj[]>([]);
  const [filesUploaded, setFilesUploaded] = useState<{
    success: FileObj[];
    failed: (FileObj & { reason: string })[];
  }>({
    success: [],
    failed: [],
  });

  const uploadDatasetFile = useUploadDatasetFile();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const files = Array.from(acceptedFiles);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        setFiles((prev) => {
          const newAttachment = {
            id: uuidv4(),
            fileName: file.name,
            fileSize: formatFileSize(file.size),
            fileType:
              file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ? "xlsx"
                : file.type,
            file,
          };

          return [newAttachment, ...prev];
        });
      };

      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    accept: {
      "text/csv": [".csv"],
      "application/json": [".json"],
      "application/vnd.ms-excel": [".xlsx"],
      "application/zip": [".zip"],
    },
    onDrop,
  });

  function onClose() {
    setOpen(false);
    setFilesUploaded({
      success: [],
      failed: [],
    });
    setFiles([]);
  }

  const uploadHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all(
        files.map(async (item) => {
          try {
            await uploadDatasetFile.mutateAsync({
              datasetId: id || "",
              file: item.file,
              format: item.fileType,
              size: item.fileSize,
            });

            setFilesUploaded((prev) => ({ ...prev, success: [...prev.success, item] }));
            setFiles((prev) => prev.filter((obj) => !(obj.id === item.id)));
          } catch (error: any) {
            const errMsg = error.response?.data?.error || "";

            setFilesUploaded((prev) => ({
              ...prev,
              failed: [
                ...prev.failed,
                {
                  ...item,
                  reason: errMsg,
                },
              ],
            }));
            setFiles((prev) => prev.filter((obj) => !(obj.id === item.id)));
          }
        })
      );
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [files, id, uploadDatasetFile]);

  return (
    <Modal open={open} onClose={onClose}>
      <DialogTitle>{t("resources.upload-file.title")}</DialogTitle>
      <DialogContent>
        <div
          className="border border-info-300 rounded-md flex flex-col items-center justify-center w-full p-8 cursor-pointer outline-0 gap-4"
          {...getRootProps()}
        >
          <input {...getInputProps()} className="" />
          <figure className="max-w-[10rem] ">
            <img
              src={FileUploadIllustration}
              alt={t("resources.upload-file.dnd-box.alt")}
              className="w-full h-full object-cover"
            />
          </figure>
          <p className="text-xs text-center">{t("resources.upload-file.dnd-box.text")}</p>
        </div>
        {files.length > 0 && (
          <div className="flex flex-col gap-4">
            {files.map((item, index) => (
              <div
                key={index + 1}
                className="flex justify-between items-center border p-2 rounded-md border-info-300"
              >
                <div className="flex gap-8 items-center">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">
                      {item.fileName.replace(/\.[^/.]+$/, "")}
                    </h4>
                    <div className="[&>p]:text-xs">
                      <p>File size: {item.fileSize}</p>
                      <p>File Type: {item.fileType}</p>
                    </div>
                  </div>
                </div>
                <IconButton
                  onClick={() => {
                    setFiles((prev) => prev.filter((_, i) => i !== index));
                  }}
                  size="small"
                >
                  <IoClose />
                </IconButton>
              </div>
            ))}
          </div>
        )}
        {[...filesUploaded.failed, ...filesUploaded.success].map(
          (item: (typeof filesUploaded.success)[0] | (typeof filesUploaded.failed)[0], index) => (
            <div key={index + 1} className="rounded-md border-info-300 overflow-hidden">
              {"reason" in item && (
                <p className="bg-red-300 w-full p-1 px-2 text-xs font-medium">
                  {item.reason.charAt(0).toUpperCase() + item.reason.slice(1)}
                </p>
              )}
              <div className="flex justify-between items-center border p-2">
                <div className="flex gap-8 items-center">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">
                      {item.fileName.replace(/\.[^/.]+$/, "")}
                    </h4>
                    <div className="[&>p]:text-xs">
                      <p>File size: {item.fileSize}</p>
                      <p>File Type: {item.fileType}</p>
                    </div>
                  </div>
                  {filesUploaded.success.some((obj) => obj.id === item.id) && (
                    <p className="text-xs px-3 py-1 border border-green-500 text-green-500 rounded-full">
                      uploaded
                    </p>
                  )}
                </div>
                {filesUploaded.failed.some((obj) => obj.id === item.id) && (
                  <IconButton
                    onClick={() => {
                      setFilesUploaded((prev) => ({
                        ...prev,
                        failed: prev.failed.filter((_, i) => i !== index),
                      }));
                    }}
                    size="small"
                  >
                    <IoClose />
                  </IconButton>
                )}
              </div>
            </div>
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button
          className="!py-2 !mt-4"
          loading={isLoading}
          onClick={uploadHandler}
          disabled={!(files.length > 0)}
        >
          {t("resources.upload-file.upload-btn")}
        </Button>
      </DialogActions>
    </Modal>
  );
}
