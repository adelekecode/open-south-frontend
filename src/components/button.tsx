import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { twMerge } from "tailwind-merge";

export default function Button({
  loading,
  variant = "contained",
  className,
  sx,
  ...props
}: LoadingButtonProps) {
  return (
    <LoadingButton
      variant={variant}
      className={twMerge(
        `flex justify-center items-center !normal-case !text-[0.9rem] !p-3 !px-5 !rounded-md !text-white !font-Work-Sans`,
        loading && `opacity-40 !cursor-not-allowed !shadow-none`,
        `${className}`
      )}
      {...props}
      sx={{
        ...sx,
      }}
      loading={loading}
      disableElevation
    >
      <>{props.children}</>
    </LoadingButton>
  );
}
