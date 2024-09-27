import { InputLabel, InputLabelProps, OutlinedInputProps, OutlinedInput } from "@mui/material";
import { ErrorMessage, Field, FieldConfig, FieldProps } from "formik";
import { twMerge } from "tailwind-merge";

type FormFieldProps = OutlinedInputProps &
  FieldConfig & {
    labelProps?: InputLabelProps;
  };

export default function FormField({ label, className, labelProps, ...props }: FormFieldProps) {
  return (
    <Field {...props}>
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
          <OutlinedInput
            className={twMerge(
              "w-full !rounded-md !border-[0px] placeholder:!text-base",
              className
            )}
            {...field}
            {...props}
          />
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
