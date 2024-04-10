import moment from "moment";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import Button from "~/components/button";

type FileProps = Dataset["files"][0] & {
  setPreviewFile: (obj: { open: boolean; data: Dataset["files"][0] | null }) => void;
};

export default function File({ setPreviewFile, ...data }: FileProps) {
  const [displayDetails, setDisplayDetails] = useState(false);

  return (
    <div>
      <div
        className={`flex items-start gap-6 p-4 tablet:px-2 tablet:flex-wrap largeMobile:!px-0 justify-between ${!displayDetails && "border-b"}`}
      >
        <div className="flex items-center gap-4">
          <FiFileText className="text-xl" />
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold break-words">{data.file_name || "------"}</h4>
            <p className="text-xs text-info-800 font-medium">{data.format || "------"}</p>
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
            <span className="text-xs font-medium">View Details</span>
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
              <h5>Created on</h5>
              <p>{data.created_at ? moment(data.created_at).format("Do MMM, YYYY") : "------"}</p>
            </div>
            <div>
              <h5>Size</h5>
              <p>{data.size || "------"}</p>
            </div>
            {/* <div>
              <h5>ID</h5>
              <p className="break-all">{data.id || "------"}</p>
            </div> */}
            <div>
              <h5>sha256</h5>
              <p className="break-all">{data.sha256 || "------"}</p>
            </div>
          </div>
          {["xlsx", "text/csv"].includes(data.format) && (
            <div className="w-fit text-black/85 ml-auto">
              <Button
                variant="outlined"
                color="inherit"
                className="!px-4 largeMobile:!px-2 !py-1 !rounded"
                onClick={() => {
                  if (data) {
                    setPreviewFile({
                      open: true,
                      data,
                    });
                  }
                }}
              >
                <p className="text-xs whitespace-nowrap font-medium">View File</p>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
