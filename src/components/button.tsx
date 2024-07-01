import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { twMerge } from "tailwind-merge";

export default function Button({
  loading,
  variant = "contained",
  className,
  size = "large",
  sx,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <LoadingButton
      variant={variant}
      className={twMerge(
        `!font-Work-Sans`,
        loading && `opacity-40 !cursor-not-allowed`,
        `${className}`
      )}
      {...props}
      size={size}
      sx={{
        "&.MuiButton-outlinedPrimary": {
          color: "#0e82bb !important",
          borderColor: "#0e82bb !important",
        },
        textTransform: "none",
        borderRadius: "8px",
        "@media (max-width: 768px)": {
          fontWeight: "normal",
          fontSize: "14px",
        },
        "&.MuiButton-sizeSmall": {
          padding: "8px 10px",
        },
        ...sx,
      }}
      loading={loading}
      disableElevation
    >
      {children}
    </LoadingButton>
  );
}
