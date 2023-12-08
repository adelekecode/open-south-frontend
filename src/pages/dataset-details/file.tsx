import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import Button from "~/components/button";

export default function File() {
  const navigate = useNavigate();

  const [displayDetails, setDisplayDetails] = useState(false);

  const data = {
    id: "88fbb6b4-0320-443e-b739-b4376a012c32",
    createdAt: "September 1, 2021",
    size: "878.5MB",
    sha256: "c4acd958c033e7b5efc27978cec1f28cb7a9a444ab1b6e8a50fae0e3ae8249ff",
  };

  return (
    <div>
      <div
        className={`flex items-start gap-6 p-4 justify-between ${!displayDetails && "border-b"}`}
      >
        <div className="flex items-center gap-4">
          <FiFileText className="text-xl" />
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold">
              {"Sirene: StockEstablishmentHistorical file from November 1, 2023"}
            </h4>
            <p className="text-xs text-info-800 font-medium">
              zip <span>{"66.5mb"}</span>
            </p>
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
        <div className={`flex items-start gap-8 p-6 pt-4 ${displayDetails && "border-b"}`}>
          <div className="flex flex-wrap gap-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>h5]:text-sm [&>div>h5]:font-medium [&>div>p]:text-sm [&>div>p]:text-info-800">
            <div>
              <h5>Created on</h5>
              <p>{data.createdAt}</p>
            </div>
            <div>
              <h5>Size</h5>
              <p>{data.size}</p>
            </div>
            <div>
              <h5>ID</h5>
              <p>{data.id}</p>
            </div>
            <div>
              <h5>sha256</h5>
              <p>{data.sha256}</p>
            </div>
          </div>
          <Button
            variant="outlined"
            color="info"
            className="!rounded-full !border-[1.5px] !px-4 !py-2 !border-info-800 gap-2"
            onClick={() => {
              navigate(`./resources/${data.id}`);
            }}
          >
            <p className="text-xs whitespace-nowrap">View File</p>
          </Button>
        </div>
      )}
    </div>
  );
}
