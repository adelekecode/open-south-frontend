import { CircularProgress } from "@mui/material";
import { twMerge } from "tailwind-merge";

type ChartWrapperProps = {
  title: string;
  children: React.ReactNode;
  wrapperClassName?: string;
  titleWrapperClassName?: string;
  isLoading?: boolean;
};

export default function ChartWrapper({
  title,
  children,
  wrapperClassName,
  titleWrapperClassName,
  isLoading,
}: ChartWrapperProps) {
  return (
    <div
      className={twMerge(
        `w-full border border-info-100 bg-white p-4 rounded-md flex flex-col gap-4 py-5 pt-4`,
        wrapperClassName
      )}
    >
      <div className={twMerge("flex items-center justify-center", titleWrapperClassName)}>
        <h1 className="text-base font-semibold text-info-950 text-center [@media(max-width:1350px)]:text-sm">
          {title}
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-56 flex-col gap-4">
          <CircularProgress />
          <p className="text-info-600 text-sm">Loading...</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
