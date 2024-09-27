import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { passwordRegex } from "~/app-constants";
import { useChangePassword } from "~/mutations/auth/password";
import { IconButton } from "@mui/material";
import FormField from "~/components/fields/form-field";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import Button from "~/components/button";

const validationSchema = Yup.object({
  current_password: Yup.string().min(8, "New password must be at least 8 characters"),
  new_password: Yup.string()
    .min(8, "New password must be at least 8 characters")
    .matches(
      passwordRegex,
      "New password must include at least one lowercase letter, one uppercase letter, one digit, and one special character"
    ),
  re_new_password: Yup.string()
    .min(8, "Confirm password must be at least 8 characters")
    .matches(
      passwordRegex,
      "Confirm password must include at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .oneOf([Yup.ref("new_password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const { mutateAsync: changePassword } = useChangePassword();

  function showPasswordHandler(value: keyof typeof showPassword) {
    setShowPassword((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  }

  return (
    <div className="bg-white w-full border border-info-100 p-6 py-8 largeMobile:px-4 rounded-md">
      <div className="max-w-[500px] mx-auto">
        <Formik
          initialValues={{
            current_password: "",
            new_password: "",
            re_new_password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            await changePassword(values, {
              onSuccess: () => {
                resetForm();
              },
            });
          }}
          validateOnChange={false}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <FormField
                label="Old Password"
                required
                placeholder="****************"
                name="current_password"
                type={showPassword.oldPassword ? "text" : "password"}
                endAdornment={
                  <IconButton onClick={() => showPasswordHandler("oldPassword")} edge="end">
                    {showPassword.oldPassword ? <BsEyeSlash /> : <AiOutlineEye />}
                  </IconButton>
                }
              />
              <FormField
                label="New Password"
                required
                placeholder="****************"
                name="new_password"
                type={showPassword.newPassword ? "text" : "password"}
                endAdornment={
                  <IconButton onClick={() => showPasswordHandler("newPassword")} edge="end">
                    {showPassword.newPassword ? <BsEyeSlash /> : <AiOutlineEye />}
                  </IconButton>
                }
              />
              <FormField
                label="Confirm Password"
                required
                placeholder="****************"
                name="re_new_password"
                type={showPassword.confirmPassword ? "text" : "password"}
                endAdornment={
                  <IconButton onClick={() => showPasswordHandler("confirmPassword")} edge="end">
                    {showPassword.confirmPassword ? <BsEyeSlash /> : <AiOutlineEye />}
                  </IconButton>
                }
              />
              <Button className="w-full !mt-4" type="submit" loading={isSubmitting}>
                Change Password
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
