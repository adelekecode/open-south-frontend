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
        className={`flex items-start gap-6 p-4 justify-between ${!displayDetails && "border-b"}`}
      >
        <div className="flex items-center gap-4">
          <FiFileText className="text-xl" />
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold">{"StockEstablishmentHistorical"}</h4>
            <p className="text-xs text-info-800 font-medium">{data.format || "------"}</p>
          </div>
        </div>
        <Button
          variant="outlined"
          color="info"
          className="!rounded-full !border-[1.5px] !px-4 !py-2 !border-info-800 gap-2"
          onClick={() => {
            setDisplayDetails((prev) => !prev);
          }}
        >
          <p className="text-xs">View Details</p>
          <FaAngleDown
            className={`text-sm text-info-950 ${displayDetails && "rotate-180"} transition-all`}
          />
        </Button>
      </div>

      {displayDetails && (
        <div
          className={`flex items-start gap-8 p-6 pt-4 justify-between ${displayDetails && "border-b"}`}
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
            <div>
              <h5>ID</h5>
              <p>{data.id || "------"}</p>
            </div>
            <div>
              <h5>sha256</h5>
              <p>{data.sha256 || "------"}</p>
            </div>
          </div>
          {(data.format === "xlsx" || data.format === "text/csv") && (
            <Button
              variant="outlined"
              color="info"
              className="!rounded-full !border-[1.5px] !px-4 !py-2 !border-info-800 gap-2"
              onClick={() => {
                if (data) {
                  setPreviewFile({
                    open: true,
                    data,
                  });
                }
              }}
            >
              <p className="text-xs whitespace-nowrap">View File</p>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
