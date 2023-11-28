import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import Button from "~/components/button";
import { useRequestOTP, useVerifyOTP } from "~/mutations/auth/otp";
import useAppStore from "~/store/app";

type OtpProps = {
  email: string;
};

export default function Otp({ email }: OtpProps) {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const { signupState, setSignupState } = useAppStore();

  const verifyOtp = useVerifyOTP();
  const requestOtp = useRequestOTP();

  useEffect(() => {
    return () => {
      if (signupState.signuped && otp.length === 6) {
        setSignupState({
          email: "",
          signuped: false,
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`w-full tabletAndBelow:w-[90%] tablet:!w-full flex flex-col gap-4 items-center p-8 largeMobile:p-0`}
    >
      <header className="mb-3 flex items-center flex-col gap-2">
        <h1 className="text-2xl font-semibold text-center">Enter Code</h1>
        <p className="text-sm text-center">
          We sent a code to <span className="font-semibold">{email}</span>
        </p>
      </header>
      <div className="flex flex-col items-center gap-12 py-4 w-full">
        <MuiOtpInput
          value={otp}
          onChange={(value) => {
            setOtp(value);
            if (value.length === 6) {
              setIsComplete(true);
            } else {
              setIsComplete(false);
            }
          }}
          length={6}
          autoFocus
          validateChar={(char) => {
            return /^\d+$/.test(char);
          }}
          className="largeMobile:w-full largeMobile:gap-[10px] mx-auto mediumMobile:!gap-[8px]"
          TextFieldsProps={{
            variant: "outlined",
            className: "w-[5rem] [@media(max-width:660px)]:w-fit",
            label: null,
          }}
          sx={{
            "& .MuiFormControl-root .MuiOutlinedInput-root input": {
              paddingLeft: "4px",
              paddingRight: "4px",
            },
          }}
        />
        <Button
          type="submit"
          className="w-full !p-4 mt-5"
          disabled={!isComplete}
          onClick={async () => {
            const response = await verifyOtp.mutateAsync({
              otp: Number(otp),
            });

            if (response) {
              navigate("/login");
            }
          }}
          loading={verifyOtp.isLoading}
        >
          Verify
        </Button>
      </div>
      <p className="text-sm">
        Didn't get a code?{" "}
        <button
          className="text-primary-600 font-semibold"
          onClick={async () => {
            await requestOtp.mutateAsync({
              email,
            });
          }}
        >
          Resend
        </button>
      </p>
    </div>
  );
}
