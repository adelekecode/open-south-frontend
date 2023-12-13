import { InputLabel, InputLabelProps } from "@mui/material";
import { ErrorMessage, Field, FieldConfig, FieldProps } from "formik";
import { twMerge } from "tailwind-merge";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

type TextEditorFieldProps = ReactQuillProps &
  FieldConfig & {
    label?: string;
    required?: boolean;
    labelProps?: InputLabelProps;
  };

export default function TextEditorField({
  label,
  className,
  labelProps,
  ...props
}: TextEditorFieldProps) {
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
          <ReactQuill
            className={twMerge(
              `[&_.ql-editor]:h-[15rem] [&_.ql-editor]:text-sm [&_.ql-container]:h-[15rem] [&_.ql-toolbar]:rounded-t-md [&_.ql-container]:rounded-b-md [&_.ql-editor::before]:!not-italic`,
              className
            )}
            {...props}
            onChange={(value) => form.setFieldValue(field.name, value)}
            value={field.value}
            style={{
              wordBreak: "break-all",
              display: "flex",
              flexDirection: "column",
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
