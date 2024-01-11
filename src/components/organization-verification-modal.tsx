import { useState } from "react";
import Button from "~/components/button";
import Modal from "~/components/modal";
import OtpInput from "~/components/otp-input";
import { useResendCode, useVerifyCode } from "~/mutations/organization";
import useOrganizationStore from "~/store/organization";
import { notifySuccess } from "~/utils/toast";

export default function OrganizationVerificationModal() {
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [code, setCode] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const { organizationVerificationModal, setOrganizationVerificationModal } =
    useOrganizationStore();

  const { open, data: orgData } = organizationVerificationModal;

  const verifyCode = useVerifyCode();
  const resendCode = useResendCode();

  return (
    <Modal
      muiModal={{
        open,
        onClose: () => {
          setShowVerificationForm(false);
          setCode("");
          setIsComplete(false);
          setOrganizationVerificationModal({
            open: false,
            data: null,
          });
        },
      }}
    >
      {showVerificationForm ? (
        <div className="flex flex-col gap-8">
          <header className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-semibold">Verify Organization</h1>
            <small className="text-center">
              A verification code has been sent to the organization email
            </small>
          </header>
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
              className="!py-3 self-stretch"
              onClick={async () => {
                const response = await verifyCode.mutateAsync({
                  pin: code,
                });

                if (response) {
                  setOrganizationVerificationModal({
                    open: false,
                    data: null,
                  });
                }
              }}
            >
              Verify
            </Button>
            <p className="text-sm">
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
      ) : (
        <div className="flex flex-col gap-8">
          <header className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-semibold">Access Denied</h1>
            <small className="text-center">
              You need to verify this organization to access it.
            </small>
          </header>
          <Button
            className="!py-3"
            onClick={async () => {
              const response = await resendCode.mutateAsync(orgData?.id || "");

              if (response) {
                notifySuccess("A code has been sent to this organization email");
                setShowVerificationForm(true);
              }
            }}
          >
            Verify Organization
          </Button>
        </div>
      )}
    </Modal>
  );
}
