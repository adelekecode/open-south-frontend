import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Button from "~/components/button";
import OtpInput from "~/components/inputs/otp-input";
import { useResendCode, useVerifyCode } from "~/mutations/organization";
import { notifySuccess } from "~/utils/toast";

type VerificationProps = {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function Verification({ setActiveIndex }: VerificationProps) {
  const [code, setCode] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const queryClient = useQueryClient();
  const orgData = queryClient.getQueryData<Organization>(["create-org"]);

  const verifyCode = useVerifyCode();
  const resendCode = useResendCode();

  return (
    <div className="pt-4 flex flex-col gap-10">
      <div className="px-4 flex flex-col gap-12">
        <h2 className="w-full text-center text-base font-semibold largeMobile:text-sm">
          A verification code has been sent to the organization email
        </h2>
        <div className="flex flex-col gap-12">
          <OtpInput
            value={code}
            onChange={(value) => {
              setCode(value);
              if (value.length === 6) {
                setIsComplete(true);
              } else {
                setIsComplete(false);
              }
            }}
            TextFieldsProps={{
              className: "w-[2.5rem]",
            }}
          />
          <div className="flex flex-col gap-2 items-center">
            <Button
              disabled={!isComplete}
              className="!py-3 w-full max-w-md"
              onClick={async () => {
                const response = await verifyCode.mutateAsync({
                  pin: code,
                });

                if (response) {
                  setActiveIndex((prev) => prev + 1);
                }
              }}
              loading={verifyCode.isLoading}
            >
              Verify
            </Button>
            <p className="text-xs">
              Didn't get a code?{" "}
              <button
                className="text-primary-600 font-semibold"
                onClick={async () => {
                  const response = await resendCode.mutateAsync(orgData?.id || "");

                  if (response) {
                    notifySuccess("A new code has been sent to your organization email");
                  }
                }}
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
      <footer className="p-4 py-2 flex items-center justify-end"></footer>
    </div>
  );
}
