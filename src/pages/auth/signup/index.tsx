import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AiOutlineEye } from "react-icons/ai";
import { BsEyeSlash } from "react-icons/bs";
// import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";
import FormField from "~/components/fields/form-field";
import Seo from "~/components/seo";
import Button from "~/components/button";
import useSignUp from "~/mutations/auth/signup";
import Otp from "./otp";
import useAppStore from "~/store/app";
import { notifyError } from "~/utils/toast";
import useGoogleAuth from "~/mutations/auth/google";
import { passwordRegex } from "~/app-constants";

const signupSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      passwordRegex,
      "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character"
    ),
  confirmPassword: Yup.string()
    .min(8, "Confirm password must be at least 8 characters")
    .matches(
      passwordRegex,
      "Confirm password must include at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Signup() {
  const navigate = useNavigate();

  const { t } = useTranslation("auth/signup");

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const { signupState, setSignupState, lang } = useAppStore();

  const signup = useSignUp();
  const googleAuth = useGoogleAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Seo title="Sign Up" description="Create an ATO account" />

      {signupState.signuped ? (
        <Otp email={signupState.email} />
      ) : (
        <div
          className={`w-[85%] tabletAndBelow:w-[90%] tablet:!w-full flex flex-col gap-4 items-center p-8 largeMobile:p-0`}
        >
          <header className="mb-3 flex items-center flex-col gap-2">
            <h1 className="text-2xl font-semibold text-center">{t("title")}</h1>
            <p className="text-sm text-center">{t("subtitle")}</p>
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
          >
            {({ handleSubmit, isSubmitting }) => (
              <form action="post" onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <FormField
                  label={t("form.inputs.first-name.label")}
                  placeholder={t("form.inputs.first-name.placeholder")}
                  required
                  name="firstName"
                />
                <FormField
                  label={t("form.inputs.last-name.label")}
                  placeholder={t("form.inputs.last-name.placeholder")}
                  required
                  name="lastName"
                />
                <FormField
                  label={t("form.inputs.email.label")}
                  placeholder={t("form.inputs.email.placeholder")}
                  required
                  name="email"
                  type="email"
                />
                <FormField
                  label={t("form.inputs.password.label")}
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
                  label={t("form.inputs.confirm-password.label")}
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
                  {t("form.submit-btn")}
                </Button>
              </form>
            )}
          </Formik>
          <p className="text-sm">
            {t("form.cta-text.text")}{" "}
            <Link to={"/login"} className="text-secondary-700 font-semibold hover:underline">
              {t("form.cta-text.link")}
            </Link>
          </p>
          <p className="text-sm mt-2 mb-2 font-semibold">{t("or")}</p>
          {/* <Button
            variant="outlined"
            className="!w-full flex item-center gap-[1.3rem] !p-3 !px-[0.8rem]"
          >
            <div>
              <FcGoogle className="text-xl" />
            </div>
            <p>Sign up with Google</p>
          </Button> */}
          <GoogleLogin
            onSuccess={async ({ credential }) => {
              const response = await googleAuth.mutateAsync({
                auth_token: credential!,
              });

              if (response) {
                navigate("/");
              }
            }}
            locale={lang}
            onError={() => {
              notifyError("Error occured while logging in with google");
            }}
          />
        </div>
      )}
    </>
  );
}
