import { Autocomplete, AutocompleteProps, OutlinedInput, OutlinedInputProps } from "@mui/material";
import { twMerge } from "tailwind-merge";

// type AutocompleteInputProps<
//   T,
//   Multiple = boolean,
//   DisableClearable = boolean,
//   FreeSolo = boolean,
//   ChipComponent = React.ElementType,
// > = AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent> & {
//   inputParams?: OutlinedInputProps;
// };

type AutocompleteInputProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
  ChipComponent extends React.ElementType = React.ElementType,
> = AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent> & {
  inputParams?: OutlinedInputProps;
};

export default function AutocompleteInput({
  inputParams,
  sx,
  ...props
}: AutocompleteInputProps<any, false, false, false, React.ElementType>) {
  return (
    <Autocomplete
      disablePortal
      sx={{ width: 300, ...sx }}
      {...props}
      renderInput={(params) => (
        <OutlinedInput
          {...params}
          {...(inputParams && { ...inputParams })}
          className={twMerge(``, inputParams?.className)}
        />
      )}
    />
  );
}
