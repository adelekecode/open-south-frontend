import { InputLabel } from "@mui/material";
import { ErrorMessage, Field, FieldConfig, FieldProps } from "formik";
import { twMerge } from "tailwind-merge";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

type PhoneNumberFieldProps = FieldConfig & {
  id?: string;
  label: string;
  required?: boolean;
  placeholder: string;
  className?: string;
  readOnly?: boolean;
};

export default function PhoneNumberField({ label, className, ...props }: PhoneNumberFieldProps) {
  return (
    <Field {...props}>
      {({ field, form }: FieldProps) => (
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
          <PhoneInput
            className={twMerge(
              `w-full rounded-md border-[#0000003b] [&>input]:py-[10px] pl-[13.5px] [&>input]:px-[13.5px] [&>input]:bg-transparent [&>input]:rounded-none [&>input]:outline-0 border [&>input]:border-l-[1px] [&>input]:border-[#0000003b] focus:[&>input]:!border-primary-600 [&:has(input:focus)]:!border-primary-600 [&:has(input:focus)]:!border-[2px] focus:[&>input]:py-[9px] focus:[&>input]:border-l-[2px]`,
              `${
                props.readOnly
                  ? ""
                  : "hover:border-[#000000de] [&>input]:hover:border-[#000000de] [&:has(input:hover)]:border-[#000000de]"
              }`,
              className
            )}
            {...field}
            {...props}
            defaultCountry="CA"
            onChange={(value) => form.setFieldValue(field.name, value)}
            value={field.value}
            international
            countryCallingCodeEditable={false}
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
