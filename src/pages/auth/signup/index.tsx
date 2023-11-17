import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { IconButton } from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";
import { BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import FormField from "~/components/form-field";
import Seo from "~/components/seo";
import Button from "~/components/button";
import useSignUp from "~/mutations/auth/signup";
import Otp from "./otp";
import useAppStore from "~/store/app";

const signupSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const { signupState, setSignupState } = useAppStore();

  const signup = useSignUp();

  return (
    <>
      <Seo title="Signup" description="Create an ATO account" />

      {signupState.signuped ? (
        <Otp email={signupState.email} />
      ) : (
        <div
          className={`w-[85%] tabletAndBelow:w-[90%] tablet:!w-full flex flex-col gap-4 items-center p-8 largeMobile:p-0`}
        >
          <header className="mb-3 flex items-center flex-col">
            <h1 className="text-2xl font-semibold text-center">Signup</h1>
            <p className="text-sm text-center">
              Welcome to our platform! Please fill out the form below to get started.{" "}
            </p>
          </header>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signupSchema}
            onSubmit={async (values) => {
              const data = await signup.mutateAsync({
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                password: values.password,
                re_password: values.confirmPassword,
              });

              if (data) {
                setSignupState({
                  signuped: true,
                  email: values.email,
                });
              }
            }}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form action="post" onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <FormField label="First Name" required placeholder="John" name="firstName" />
                <FormField label="Last Name" required placeholder="Doe" name="lastName" />
                <FormField
                  label="Email"
                  required
                  placeholder="example@gmail.com"
                  name="email"
                  type="email"
                />
                <FormField
                  label="Password"
                  required
                  placeholder="****************"
                  name="password"
                  type={showPassword.password ? "text" : "password"}
                  endAdornment={
                    <IconButton
                      onClick={() =>
                        setShowPassword((prev) => ({ ...prev, password: !prev.password }))
                      }
                      edge="end"
                    >
                      {showPassword.password ? <BsEyeSlash /> : <AiOutlineEye />}
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
                  Signup
                </Button>
              </form>
            )}
          </Formik>
          <p className="text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="text-secondary-700 font-semibold hover:underline">
              Login
            </Link>
          </p>
          <p className="text-sm mt-2 mb-2 font-semibold">Or</p>
          <Button
            variant="outlined"
            className="!w-full flex item-center gap-[1.3rem] !p-3 !px-[0.8rem]"
          >
            <div>
              <FcGoogle className="text-xl" />
            </div>
            <p>Signup with Google</p>
          </Button>
        </div>
      )}
    </>
  );
}