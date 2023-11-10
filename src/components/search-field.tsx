import { OutlinedInput, OutlinedInputProps } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

type SearchFieldProps = OutlinedInputProps & {
  wrapperClassName?: string;
  onSearch?: () => void;
};

export default function SearchField({
  onSearch,
  wrapperClassName = "",
  sx,
  className,
  ...props
}: SearchFieldProps) {
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
            padding: "7px 12px",
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
      <button
        className="bg-primary-600 p-1 px-2 hover:opacity-50 transition-all outline-0"
        onClick={onSearch}
      >
        <FiSearch className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
