import { InputLabel, InputLabelProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import { ErrorMessage, Field, FieldConfig, FieldProps } from "formik";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

type DatePickerFieldProps = MuiDatePickerProps<null> &
  FieldConfig & { required?: boolean; labelProps?: InputLabelProps };

export default function DatePickerField({
  label,
  className,
  labelProps,
  ...props
}: DatePickerFieldProps) {
  return (
    <Field {...props}>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDatePicker
              className={twMerge("w-full", className)}
              {...props}
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "11px 13.5px",
                },
              }}
              onChange={(value) =>
                form.setFieldValue(field.name, dayjs(value).format("DD-MM-YYYY"))
              }
            />
          </LocalizationProvider>
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
