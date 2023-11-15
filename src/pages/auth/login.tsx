import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";
import { BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "~/components/form-field";
import useLogin from "~/mutations/auth/login";
import Seo from "~/components/seo";
import Button from "~/components/button";

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

export default function Login() {
  const login = useLogin();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Seo title="Login" description="Login to your ATO account" />

      <div
        className={`w-[85%] tabletAndBelow:w-[90%] tablet:!w-full flex flex-col gap-4 items-center p-8 largeMobile:p-0`}
      >
        <header className="mb-3 flex items-center flex-col">
          <h1 className="text-2xl font-semibold text-center">Login</h1>
          <p className="text-sm text-center">Welcome, kindly enter your details to gain access.</p>
        </header>
        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false,
          }}
          validationSchema={loginSchema}
          onSubmit={async (values) => {
            const data = await login.mutateAsync({
              email: values.email,
              password: values.password,
            });

            if (data) {
              navigate(state?.from ? state.from : "/");
            }
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
            <form action="post" onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <FormField
                label="Email"
                required
                placeholder="example@gmail.com"
                name="email"
                type="email"
              />
              <div>
                <FormField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="****************"
                  name="password"
                  className="placeholder:leading-3"
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <BsEyeSlash /> : <AiOutlineEye />}
                    </IconButton>
                  }
                />
                <div className="flex w-full justify-between items-center gap-4 smallMobile:flex-col-reverse px-2">
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          setFieldValue("rememberMe", !values.rememberMe);
                        }}
                        checked={values.rememberMe}
                        color="primary"
                        name="rememberMe"
                      />
                    }
                    className="text-sm"
                    label="Remember me"
                  />
                  <Link to={"/forgot-password"} className="hover:underline smallMobile:self-end">
                    <small className="text-sm">Forgot Password?</small>
                  </Link>
                </div>
              </div>
              {/* {handleActivationError(values.email)} */}
              <Button className="w-full !mt-2" type="submit" loading={isSubmitting}>
                Login
              </Button>
            </form>
          )}
        </Formik>
        <p className="text-sm">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-secondary-700 font-semibold hover:underline">
            Signup
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
          <p>Login with Google</p>
        </Button>
      </div>
    </>
  );
}
