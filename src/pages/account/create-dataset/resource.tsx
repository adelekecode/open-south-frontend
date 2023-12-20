import { useCallback, useState } from "react";
import { IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import Button from "~/components/button";
import FileUpload from "~/assets/illustrations/file-upload.png";
import { formatFileSize } from "~/utils/helper";
import { useUploadDatasetFile } from "~/mutations/dataset";
import { notifyError } from "~/utils/toast";
import useCreateDatasetStore from "~/store/create-dataset";

type ResourceProps = {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function Resource({ setActiveIndex }: ResourceProps) {
  const [files, setFiles] = useState<
    {
      fileName: string;
      fileSize: string;
      fileType: string;
      file: File;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const { dataset } = useCreateDatasetStore();

  const uploadDatasetFile = useUploadDatasetFile();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const files = Array.from(acceptedFiles);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        setFiles((prev) => {
          const newAttachment = {
            fileName: file.name,
            fileSize: formatFileSize(file.size),
            fileType: file.type,
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
      "application/vnd.ms-excel": [".xls", ".xlsx"],
      "application/zip": [".zip"],
    },
    onDrop,
  });

  return (
    <div className="pt-4 flex flex-col gap-4">
      <div className="p-4">
        <div
          className="border border-info-300 rounded-md flex flex-col items-center justify-center w-full p-8 cursor-pointer outline-0 gap-4"
          {...getRootProps()}
        >
          <input {...getInputProps()} className="" />
          <figure className="max-w-[10rem] ">
            <img
              src={FileUpload}
              alt="file upload illustration"
              className="w-full h-full object-cover"
            />
          </figure>
          <p className="text-xs text-center">
            Drag and drop file here to upload, upload 15 files at a time
          </p>
        </div>
      </div>
      {files.length > 0 && (
        <div className="flex flex-col gap-4 p-4">
          {files.map((item, index) => (
            <div
              key={index + 1}
              className="flex justify-between items-center border p-2 rounded-md border-info-300"
            >
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold">{item.fileName.replace(/\.[^/.]+$/, "")}</h4>
                <div className="[&>p]:text-xs [&>p]:font-medium">
                  <p>File size: {item.fileSize}</p>
                  <p>File Type: {item.fileType}</p>
                </div>
              </div>
              <IconButton
                onClick={() => {
                  setFiles((prev) => prev.filter((_, i) => i !== index));
                }}
                size="medium"
              >
                <IoClose />
              </IconButton>
            </div>
          ))}
        </div>
      )}
      <footer className="border-t p-4 py-2 flex items-center justify-between">
        <Button
          color="info"
          className="!py-2"
          onClick={() => {
            setActiveIndex((prev) => prev - 1);
          }}
        >
          Previous
        </Button>
        <Button
          className="!py-2"
          loading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            try {
              await Promise.all(
                files.map(async (item) => {
                  uploadDatasetFile.mutateAsync({
                    datasetId: dataset?.id || "",
                    file: item.file,
                    format: item.fileType,
                    size: item.fileSize,
                  });
                })
              );
            } catch (error) {
              console.error(error);
              notifyError("An error occured while uploading files, please try again");
            } finally {
              setIsLoading(false);
            }

            setActiveIndex((prev) => prev + 1);
          }}
          disabled={!(files.length > 0)}
        >
          Next
        </Button>
      </footer>
    </div>
  );
}
