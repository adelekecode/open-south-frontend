import { useCallback, useState } from "react";
import { IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import Button from "~/components/button";
import FileUpload from "~/assets/illustrations/file-upload.png";
import { formatFileSize } from "~/utils/helper";
import { useUploadDatasetFile } from "~/mutations/dataset";
import { notifyError } from "~/utils/toast";
import useCreateDatasetStore from "~/store/create-dataset";
import ProgressBar from "~/components/progress-bar";

type ResourceProps = {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

type FileType = {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  file: File;
  base64: string;
};

const chunkSize = 5 * 1024 * 1024;

export default function Resource({ setActiveIndex }: ResourceProps) {
  const [files, setFiles] = useState<FileType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filesSuccessfullyUploaded, setFilesSuccessfullyUploaded] = useState<string[]>([]);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});

  const { dataset, setOrganization } = useCreateDatasetStore();

  const { mutateAsync: uploadDatasetFile } = useUploadDatasetFile();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const files = Array.from(acceptedFiles);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        setFiles((prev) => {
          const newAttachment: FileType = {
            id: uuidv4(),
            fileName: file.name,
            fileSize: formatFileSize(file.size),
            fileType:
              file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ? "xlsx"
                : file.type,
            file,
            base64: reader.result as string,
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

  const submitHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all(
        files
          .filter((file) => !filesSuccessfullyUploaded.includes(file.id))
          .map(async (file) => {
            try {
              const totalChunks = Math.ceil(file.file.size / chunkSize);

              for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
                const chunk = file.file.slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize);

                await uploadDatasetFile({
                  datasetId: dataset?.id || "",
                  data: {
                    chunk_number: chunkIndex + 1,
                    total_chunks: totalChunks,
                    format: file.fileType,
                    file: chunk,
                    file_name: file.fileName,
                    size: file.fileSize,
                  },
                  config: {
                    onUploadProgress: () => {
                      const percentCompleted = ((chunkIndex + 1) / totalChunks) * 100;

                      setProgress((prev) => ({
                        ...prev,
                        [file.id]: percentCompleted,
                      }));
                    },
                  },
                });
              }
              setFilesSuccessfullyUploaded((prev) => [...prev, file.id]);
            } catch (error) {
              notifyError(`File "${file.fileName}" already exist`);
              throw error;
            }
          })
      );
      setActiveIndex((prev) => prev + 1);
      setOrganization(null);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [
    dataset?.id,
    files,
    filesSuccessfullyUploaded,
    setActiveIndex,
    setOrganization,
    uploadDatasetFile,
  ]);

  return (
    <div className="pt-4 flex flex-col">
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
            Drag and drop files here to upload. Allowed file types: .csv, .json, .xlsx, .zip.
          </p>
        </div>
      </div>
      {files.length > 0 && (
        <div className="flex flex-col gap-4 p-4">
          {files.map((file, index) => (
            <div
              key={index + 1}
              className="flex justify-between items-center border p-2 rounded-md border-info-300"
            >
              <div className="flex gap-8 items-center">
                <div className="flex gap-2 flex-col w-full">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">
                      {file.fileName.replace(/\.[^/.]+$/, "")}
                    </h4>
                    <div className="[&>p]:text-xs [&>p]:font-medium">
                      <p>File size: {file.fileSize}</p>
                      <p>File Type: {file.fileType}</p>
                    </div>
                  </div>
                  {progress[file.id] && (
                    <ProgressBar value={Number(progress[file.id].toFixed(2))} />
                  )}
                </div>
                {filesSuccessfullyUploaded.includes(file.id) && (
                  <p className="text-xs px-3 py-1 border border-green-500 text-green-500 rounded-full">
                    uploaded
                  </p>
                )}
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
          onClick={submitHandler}
          disabled={!(files.length > 0)}
        >
          Next
        </Button>
      </footer>
    </div>
  );
}
