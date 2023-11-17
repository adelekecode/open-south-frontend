import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "~/components/form-field";
import { useResetPassword } from "~/mutations/auth/password";
import Button from "~/components/button";
import NotFound from "../../404";
import Success from "./success";

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token, uuid } = useParams();

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const resetPassword = useResetPassword();

  if (!token || !uuid) {
    return <NotFound />;
  }

  return (
    <>
      {!resetPassword.isSuccess ? (
        <Success />
      ) : (
        <div
          className={`w-[85%] tabletAndBelow:w-[90%] tablet:!w-full flex flex-col gap-4 items-center p-8 pt-12 largeMobile:p-0`}
        >
          <header className="mb-3 flex items-center flex-col">
            <h1 className="text-2xl font-semibold text-center largeMobile:text-xl">
              Reset Password
            </h1>
          </header>
          <Formik
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const data = await resetPassword.mutateAsync({
                path: {
                  token,
                  uuid,
                },
                body: {
                  password: values.newPassword,
                  re_password: values.confirmPassword,
                },
              });

              if (data) {
                navigate("/login");
              }
            }}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <FormField
                  label="Password"
                  required
                  placeholder="****************"
                  name="newPassword"
                  type={showPassword.newPassword ? "text" : "password"}
                  endAdornment={
                    <IconButton
                      onClick={() =>
                        setShowPassword((prev) => ({ ...prev, newPassword: !prev.newPassword }))
                      }
                      edge="end"
                    >
                      {showPassword.newPassword ? <BsEyeSlash /> : <AiOutlineEye />}
                    </IconButton>
                  }
                />
                <FormField
                  label="Confirm Password"
                  required
                  placeholder="****************"
                  name="confirmPassword"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  endAdornment={
                    <IconButton
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          confirmPassword: !prev.confirmPassword,
                        }))
                      }
                      edge="end"
                    >
                      {showPassword.confirmPassword ? <BsEyeSlash /> : <AiOutlineEye />}
                    </IconButton>
                  }
                />
                <Button className="w-full !mt-4" type="submit" loading={isSubmitting}>
                  Reset
                </Button>
              </form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}
