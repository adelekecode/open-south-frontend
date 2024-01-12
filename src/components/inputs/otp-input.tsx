import { MuiOtpInput, MuiOtpInputProps } from "mui-one-time-password-input";
import { twMerge } from "tailwind-merge";

type OtpInputProps = MuiOtpInputProps;

export default function OtpInput({
  className,
  autoFocus = true,
  validateChar = (char) => {
    return /^\d+$/.test(char);
  },
  TextFieldsProps,
  sx,
  ...props
}: OtpInputProps) {
  return (
    <MuiOtpInput
      length={6}
      autoFocus={autoFocus}
      validateChar={validateChar}
      {...props}
      className={twMerge(
        "largeMobile:w-full largeMobile:gap-[10px] mx-auto mediumMobile:!gap-[8px]",
        className
      )}
      TextFieldsProps={{
        variant: "outlined",
        className: "w-[5rem] [@media(max-width:660px)]:w-fit",
        label: null,
        ...TextFieldsProps,
      }}
      sx={{
        "& .MuiFormControl-root .MuiOutlinedInput-root input": {
          paddingLeft: "4px",
          paddingRight: "4px",
        },
        ...sx,
      }}
    />
  );
}
