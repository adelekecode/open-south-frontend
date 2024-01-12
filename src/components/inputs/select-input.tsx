import { Select, SelectProps } from "@mui/material";
import { twMerge } from "tailwind-merge";

type SelectInputProps = SelectProps;

export default function SelectInput({ children, sx, className, ...props }: SelectInputProps) {
  return (
    <Select
      displayEmpty
      {...props}
      className={twMerge(`w-full`, className)}
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          borderTop: "0px",
          borderRight: "0px",
          borderLeft: "0px",
          borderWidth: "2px",
          borderColor: "#0e82bb !important",
          borderRadius: "4px 0 0 0",
        },
        "& .MuiOutlinedInput-input": {
          height: "-webkit-fill-available",
          padding: "8px 12px",
          fontFamily: '"Work Sans", sans-serif',
          backgroundColor: "rgb(228 228 231)",
          "&::placeholder": {
            fontStyle: "italic",
          },
        },
        ...sx,
      }}
    >
      {children}
    </Select>
  );
}
