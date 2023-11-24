import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Formik } from "formik";
import * as Yup from "yup";
import Seo from "~/components/seo";
import Button from "~/components/button";
import FormField from "~/components/form-field";
import { useForgotPassword } from "~/mutations/auth/password";
import Success from "./success";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email("Email address is not valid").required("Email is required"),
});

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [instructionsSent, setInstructionsSent] = useState({
    value: false,
    email: "",
  });

  const forgotPassword = useForgotPassword();

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
            {({ handleSubmit, isSubmitting }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center w-full gap-4"
              >
                <FormField type="email" name="email" label="Email" required />
                <Button color="info" type="submit" className="w-full !mt-4" loading={isSubmitting}>
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
