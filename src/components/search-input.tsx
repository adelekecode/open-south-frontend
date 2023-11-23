import { ReactNode } from "react";
import { OutlinedInput, OutlinedInputProps } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import Button from "./button";

type SearchInputProps = OutlinedInputProps & {
  wrapperClassName?: string;
  onSearch?: () => void;
  searchIcon?: ReactNode;
};

export default function SearchInput({
  onSearch,
  wrapperClassName = "",
  sx,
  className,
  searchIcon,
  ...props
}: SearchInputProps) {
  return (
    <div className={`flex rounded-t-[4px] overflow-hidden ${wrapperClassName}`}>
      <OutlinedInput
        className={twMerge(``, className)}
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
        type="search"
        {...props}
      />
      <Button
        className="bg-primary-600 !rounded-l-none !rounded-br-none !p-1 !px-2 !min-w-0"
        onClick={onSearch}
      >
        {searchIcon || <FiSearch className="w-5 h-5 text-white" />}
      </Button>
    </div>
  );
}
