import {
  Select as MuiSelect,
  InputLabel,
  SelectProps as MuiSelectProps,
  InputLabelProps,
} from "@mui/material";
import { FieldConfig, Field, FieldProps, ErrorMessage } from "formik";
import { twMerge } from "tailwind-merge";

type SelectFieldProps = MuiSelectProps &
  FieldConfig & {
    labelProps?: InputLabelProps;
  };

export default function SelectField({ label, className, labelProps, ...props }: SelectFieldProps) {
  return (
    <Field>
      {({ field }: FieldProps) => (
        <div className="w-full">
          {label && (
            <div className="w-full flex justify-between items-center">
              <InputLabel
                {...labelProps}
                htmlFor={props.name}
                className={twMerge(`!text-sm mb-[0.35rem] !font-Work-Sans`, labelProps?.className)}
              >
                {label}
                {props.required && <span className="!text-red-600 !text-[0.9rem] pl-1">*</span>}
              </InputLabel>
            </div>
          )}
          <MuiSelect
            className={twMerge(`w-full !text-[0.9rem] ${!props.value && "font-normal"}`, className)}
            {...field}
            value={props.value}
            {...props}
            sx={{
              "& .MuiSelect-select": {
                padding: "11px 13.5px",
              },
              input: {
                fontSize: "0.9rem",
              },
            }}
            renderValue={(value) => {
              return value || "";
            }}
            displayEmpty={true}
          ></MuiSelect>
          <ErrorMessage
            name={props.name}
            className={`!text-red-600 !font-medium !text-xs pl-1`}
            component={"p"}
          />
        </div>
      )}
    </Field>
  );
}
