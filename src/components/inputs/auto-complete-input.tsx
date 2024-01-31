import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  TextFieldProps,
  TextField,
} from "@mui/material";
import { twMerge } from "tailwind-merge";

type AutocompleteInputProps<T> = Omit<
  MuiAutocompleteProps<T, false, false, false, any>,
  "renderInput"
> & {
  inputParams?: TextFieldProps;
  renderInput?: MuiAutocompleteProps<T, false, false, false, any>["renderInput"];
};

export default function AutocompleteInput<T>({
  inputParams,
  sx,
  disablePortal = true,
  className,
  ...props
}: AutocompleteInputProps<T>) {
  return (
    <MuiAutocomplete
      {...props}
      disablePortal={disablePortal}
      className={twMerge("", className)}
      sx={{
        "& .Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "0px !important",
          },
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderWidth: "0px",
        },
        "& .MuiOutlinedInput-root": {
          paddingTop: "4px",
          paddingBottom: "4px",
          borderTop: "0px",
          borderRight: "0px",
          borderLeft: "0px",
          borderWidth: "2px",
          borderColor: "#0e82bb !important",
          borderRadius: "4px 4px 0 0",
          "& .MuiAutocomplete-input": {
            padding: "7.5px 4px 8px",
          },
        },
        "& .MuiInputBase-root": {
          "& input": {
            padding: "8px 12px",
          },
          height: "100%",
          fontFamily: '"Work Sans", sans-serif',
          backgroundColor: "rgb(228 228 231)",
          "&::placeholder": {
            fontStyle: "italic",
          },
        },
        ...sx,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...(inputParams && { ...inputParams })}
          className={twMerge(``, inputParams?.className)}
        />
      )}
    />
  );
}
