import { InputLabel, OutlinedInputProps, OutlinedInput } from "@mui/material";
import { ErrorMessage, Field, FieldConfig, FieldProps } from "formik";
import { twMerge } from "tailwind-merge";

type FormFieldProps = OutlinedInputProps & FieldConfig;

export default function FormField({ label, className, ...props }: FormFieldProps) {
  return (
    <Field {...props}>
      {({ field }: FieldProps) => (
        <div className="w-full">
          {label && (
            <div className="w-full flex justify-between items-center">
              <InputLabel
                htmlFor={props.name}
                className="!text-sm !text-texts-primary mb-[0.35rem] !font-Work-Sans"
              >
                {label}
                {props.required && <span className="!text-red-600 !text-[0.9rem] pl-1">*</span>}
              </InputLabel>
            </div>
          )}
          <OutlinedInput
            className={twMerge(
              "w-full placeholder:!text-texts-placeholder !rounded-md !border-[0px] placeholder:!text-base",
              className
            )}
            {...field}
            {...props}
            sx={{
              input: {
                fontSize: "1rem",
              },
              "& .MuiOutlinedInput-input": {
                padding: "11px 13.5px",
                borderColor: `${props.readOnly ? "transparent" : "#0071B9"}`,
              },
              "& .Mui-focused": {
                borderColor: "#0071B9",
              },
            }}
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
