import { Fragment, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { IoArrowBack } from "react-icons/io5";
import { Formik } from "formik";
import * as Yup from "yup";
import Seo from "~/components/seo";
import Button from "~/components/button";
import FormField from "~/components/fields/form-field";
import { useForgotPassword } from "~/mutations/auth/password";
import Success from "./success";
import useAppStore from "~/store/app";
import { useRequestOTP } from "~/mutations/auth/otp";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email("Email address is not valid").required("Email is required"),
});

export default function ForgotPassword() {
  const navigate = useNavigate();

  const { setSignupState } = useAppStore();

  const [instructionsSent, setInstructionsSent] = useState({
    value: false,
    email: "",
  });

  const forgotPassword = useForgotPassword();
  const requestOtp = useRequestOTP();

  function handleActivationError(email: string): ReactNode {
    if (!forgotPassword.error) return <Fragment />;

    if (isAxiosError(forgotPassword.error)) {
      const errorMsg = forgotPassword.error.response?.data.error;

      if (errorMsg === "account not activated") {
        return (
          <div className="w-full flex items-center gap-4">
            <p className={`text-red-600 font-medium text-xs pl-1`}>
              {errorMsg[0].toUpperCase() + errorMsg.slice(1)}
            </p>
            <Button
              loading={requestOtp.isLoading}
              className="w-fit !p-2 !text-xs"
              onClick={async () => {
                const data = await requestOtp.mutateAsync({ email });

                if (data) {
                  navigate("/signup");
                  setSignupState({
                    email,
                    signuped: true,
                  });
                }
              }}
            >
              Activate
            </Button>
          </div>
        );
      }
    }

    return <Fragment />;
  }

  return (
    <>
      <Seo title="Forgot Password" description="Can't remember your password? change it." />
      {!instructionsSent.value && !instructionsSent.email ? (
        <div
          className={`w-[85%] tabletAndBelow:w-[90%] tablet:!w-full flex flex-col gap-4 items-center p-8 pt-12 largeMobile:p-0`}
        >
          <header className="mb-3 flex items-center flex-col gap-2">
            <h1 className="text-2xl font-semibold text-center largeMobile:text-xl">
              Forgot Password?
            </h1>
            <p className="text-sm text-center">No worries, we'll send you reset instructions</p>
          </header>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={ValidationSchema}
            onSubmit={async (values) => {
              const data = await forgotPassword.mutateAsync(values);

              if (data) {
                setInstructionsSent({
                  value: true,
                  email: values.email,
                });
              }
            }}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ handleSubmit, isSubmitting, values }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center w-full gap-2"
              >
                <FormField type="email" name="email" label="Email" required />
                {handleActivationError(values.email)}
                <Button type="submit" className="w-full !mt-4" loading={isSubmitting}>
                  Send reset link
                </Button>

                <button
                  className="flex items-center cursor-pointer gap-2"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <IoArrowBack />
                  <p className="text-sm">Back to login</p>
                </button>
              </form>
            )}
          </Formik>
        </div>
      ) : (
        <Success email={instructionsSent.email} />
      )}
    </>
  );
}
