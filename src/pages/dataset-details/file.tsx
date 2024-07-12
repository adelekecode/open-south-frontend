import { useState } from "react";
import moment from "moment";
import { FaAngleDown } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import Button from "~/components/button";
import { acceptedFileFormat } from "~/app-constants";
import { downloadFileHandler } from "~/utils/helper";
import { useDatasetFilePreview } from "~/queries/dataset";
import { useDatasetFileDownload } from "~/mutations/dataset";
import { useTranslation } from "react-i18next";
import { notifyError } from "~/utils/toast";

type Props = DatasetFile & {
  setPreviewFile: (obj: { open: boolean; data: DatasetFile | null }) => void;
};

export default function File({
  setPreviewFile,
  format,
  file_name,
  created_at,
  size,
  sha256,
  ...rest
}: Props) {
  const { t } = useTranslation("layout/dataset/slug");

  const [displayDetails, setDisplayDetails] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const isPreviewable = acceptedFileFormat.includes(format as (typeof acceptedFileFormat)[number]);

  const { refetch } = useDatasetFilePreview(rest.file_url || "", format || "", {
    enabled: false,
  });

  const fileDownload = useDatasetFileDownload();

  return (
    <div>
      <div
        className={`flex items-start gap-6 p-4 tablet:px-2 tablet:flex-wrap largeMobile:!px-0 justify-between ${!displayDetails && "border-b"}`}
      >
        <div className="flex items-center gap-4">
          <FiFileText className="text-xl" />
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold break-words">{file_name || "------"}</h4>
            <p className="text-xs text-info-800 font-medium">{format || "------"}</p>
          </div>
        </div>
        <div className="text-black/85 !ml-auto">
          <Button
            variant="outlined"
            color="inherit"
            className="!px-4 !py-2 gap-2"
            onClick={() => {
              setDisplayDetails((prev) => !prev);
            }}
          >
            <span className="text-xs font-medium">{t("file.view-details-btn")}</span>
            <FaAngleDown className={`text-sm ${displayDetails && "rotate-180"} transition-all`} />
          </Button>
        </div>
      </div>

      {displayDetails && (
        <div
          className={`w-full flex items-start gap-8 p-6 pt-4 tablet:px-2 largeMobile:px-0 tablet:flex-wrap justify-between ${displayDetails ? "border-b" : ""}`}
        >
          <div className="flex flex-wrap gap-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>h5]:text-sm [&>div>h5]:font-medium [&>div>p]:text-sm [&>div>p]:text-info-800">
            <div>
              <h5>{t("file.details.created-on")}</h5>
              <p>{created_at ? moment(created_at).format("Do MMM, YYYY") : "------"}</p>
            </div>
            <div>
              <h5>{t("file.details.size")}</h5>
              <p>{size || "------"}</p>
            </div>
            {/* <div>
              <h5>ID</h5>
              <p className="break-all">{id || "------"}</p>
            </div> */}
            <div>
              <h5>sha256</h5>
              <p className="break-all">{sha256 || "------"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isPreviewable && (
              <div className="w-fit text-black/85 ml-auto">
                <Button
                  variant="outlined"
                  color="inherit"
                  className="!px-4 largeMobile:!px-2 !py-1 !rounded"
                  onClick={() => {
                    setPreviewFile({
                      open: true,
                      data: {
                        format,
                        file_name,
                        sha256,
                        created_at,
                        size,
                        ...rest,
                      },
                    });
                  }}
                >
                  <p className="text-xs whitespace-nowrap font-medium">
                    {t("file.details.view-file-btn")}
                  </p>
                </Button>
              </div>
            )}
            <Button
              variant="outlined"
              color="inherit"
              className="!px-2 largeMobile:!px-2 !py-1 !rounded !min-w-0 !w-fit"
              onClick={async () => {
                setIsloading(true);

                const { data } = await refetch();

                if (!data) return notifyError("File returned nothing");

                const blob = new Blob([data], {
                  type:
                    format === "xlsx"
                      ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      : format,
                });

                downloadFileHandler(
                  {
                    format,
                    file_name,
                    sha256,
                    created_at,
                    size,
                    ...rest,
                  },
                  blob,
                  format === "text/csv" ? ".csv" : `.${format}`
                );

                await fileDownload.mutateAsync(rest.id);

                setIsloading(false);
              }}
              loading={isLoading}
            >
              <MdOutlineFileDownload />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
