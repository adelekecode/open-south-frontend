import { useCallback, useState } from "react";
import { useParams } from "react-router";
import { IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import Modal from "~/components/modal";
import { formatFileSize } from "~/utils/helper";
import FileUploadIllustration from "~/assets/illustrations/file-upload.png";
import Button from "~/components/button";
import { notifyError } from "~/utils/toast";
import { useUploadDatasetFile } from "~/mutations/dataset";
import SuccessIllustration from "~/assets/illustrations/success.png";

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
  const [displaySuccess, setDisplaySuccess] = useState(false);

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
  }

  //? Create a separate array for successfully upload files and not successfully uploaded files then create a ui that shows those 2 array in a format then create and array that hold all the files that the user uploaded, that array will be filtered every time the user clicks on upload, so that array will initiailly hold all the files then after the files has been upload it will hold the files that hasn't been upload.

  return (
    <Modal
      muiModal={{
        open,
        onClose,
      }}
      innerContainer={{
        className: "pt-[2rem] w-[550px]",
      }}
    >
      <div className="w-full flex flex-col gap-4 mediumMobile:gap-1">
        <h1 className="text-xl font-semibold">Upload Files</h1>
        {displaySuccess ? (
          <div className="p-6 pt-4 w-full flex flex-col items-center gap-4">
            <figure className="max-w-[9rem]">
              <img src={SuccessIllustration} alt="Success illustrion" />
            </figure>
            <p className="text-sm text-center">You have successfully created a dataset</p>
          </div>
        ) : (
          <>
            <div
              className="border border-info-300 rounded-md flex flex-col items-center justify-center w-full p-8 cursor-pointer outline-0 gap-4"
              {...getRootProps()}
            >
              <input {...getInputProps()} className="" />
              <figure className="max-w-[10rem] ">
                <img
                  src={FileUploadIllustration}
                  alt="file upload illustration"
                  className="w-full h-full object-cover"
                />
              </figure>
              <p className="text-xs text-center">
                Drag and drop files here to upload. Allowed file types: .csv, .json, .xlsx, .zip.
              </p>
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
                {[...filesUploaded.failed, ...filesUploaded.success].map((item, index) => (
                  <div key={index + 1} className="rounded-md border-info-300 overflow-hidden">
                    {filesUploaded.failed.some((obj) => obj.reason) && (
                      <p className="bg-red-300 w-full p-1 px-2 text-xs font-medium">
                        {"skjdsdnksdk"}
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
                ))}
              </div>
            )}
            <Button
              className="!py-2 !mt-4"
              loading={isLoading}
              onClick={async () => {
                setIsLoading(true);
                try {
                  await Promise.all(
                    files.map(async (item, index) => {
                      try {
                        await uploadDatasetFile.mutateAsync({
                          datasetId: id || "",
                          file: item.file,
                          format: item.fileType,
                          size: item.fileSize,
                        });

                        setFilesUploaded((prev) => ({ ...prev, success: [...prev.success, item] }));
                        files.splice(index, 1);
                      } catch (error) {
                        // console.log(error);

                        notifyError(`File "${item.fileName}" already exist`);
                        setFilesUploaded((prev) => ({
                          ...prev,
                          failed: [
                            ...prev.failed,
                            {
                              ...item,
                              reason: "",
                            },
                          ],
                        }));
                        files.splice(index, 1);
                        throw error;
                      }
                    })
                  );
                  setDisplaySuccess(true);
                } catch (error) {
                  console.error(error);
                  throw error;
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={!(files.length > 0)}
            >
              {"Upload"}
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}
