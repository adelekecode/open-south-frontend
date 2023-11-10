import { OutlinedInput } from "@mui/material";
import { OutlinedInputProps } from "@mui/material";

type SearchFieldProps = OutlinedInputProps;

export default function SearchField({ ...props }: SearchFieldProps) {
  return <OutlinedInput type="search" {...props} />;
}
