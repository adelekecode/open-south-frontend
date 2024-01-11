import { InputLabel, InputLabelProps } from "@mui/material";
import { ErrorMessage, Field, FieldConfig, FieldProps } from "formik";
import { twMerge } from "tailwind-merge";
import ReactTagsInput, { ReactTagsInputProps } from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

type TagsFieldProps = Omit<ReactTagsInputProps, "value" | "onChange"> &
  FieldConfig & {
    label?: string;
    required?: boolean;
    labelProps?: InputLabelProps;
  };

export default function TagsField({ label, className, labelProps, ...props }: TagsFieldProps) {
  return (
    <Field name={props.name}>
      {({ field, form }: FieldProps) => (
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
          <ReactTagsInput
            className={twMerge(
              `bg-white outline outline-1 outline-black/25 border-none overflow-hidden pt-[5px] pl-[5px] rounded [&:hover]:outline-black/90 [&:has(input:focus)]:outline-[2px] [&:has(input:focus)]:outline-primary-600 [&_.react-tagsinput-tag]:border-primary-600 [&_.react-tagsinput-tag]:bg-primary-100 [&_.react-tagsinput-tag]:text-primary-600 [&_.react-tagsinput-input]:min-w-[80px] [&_.react-tagsinput-input]:w-[initial]`,
              className
            )}
            {...field}
            {...props}
            value={field.value || []}
            onChange={(tags) => form.setFieldValue(field.name, tags)}
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
