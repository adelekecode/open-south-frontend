import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { InputLabel } from "@mui/material";
import { Formik } from "formik";
import { IoCameraSharp } from "react-icons/io5";
import * as Yup from "yup";
import Button from "~/components/button";
import FormField from "~/components/fields/form-field";
import TextEditorField from "~/components/fields/text-editor-field";
import { useEditProfile, useImageUpload } from "~/mutations/auth/profile";
import { notifyError } from "~/utils/toast";

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  adoutMe: Yup.string().optional().trim().min(3, "About me must be atleast 3 characters"),
});

export default function Profile() {
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [photo, setPhoto] = useState<File | null>(null);

  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<CurrentUser>(["/auth/users/me/"]);

  const editProfile = useEditProfile();
  const imageUpload = useImageUpload();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold largeMobile:text-xl">Edit Profile</h1>
        {currentUser?.role === "user" && (
          <Button
            className="!py-2 !px-3 !text-xs"
            variant="outlined"
            onClick={() => {
              navigate(`/users/${currentUser?.id}`);
            }}
          >
            View Public Profile
          </Button>
        )}
      </div>
      <div className="bg-white w-full border border-info-100 p-6 rounded-md">
        <Formik
          initialValues={{
            firstName: currentUser?.first_name || "",
            lastName: currentUser?.last_name || "",
            email: currentUser?.email || "",
            aboutMe: currentUser?.bio || "",
          }}
          validateOnBlur={false}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!currentUser?.image_url && !photo) {
              return notifyError("Profile photo is required");
            }

            const obj: Record<"first_name" | "last_name" | "email", string> = {
              first_name: values.firstName,
              last_name: values.lastName,
              email: values.email,
            };

            if (photo) {
              const res = await imageUpload.mutateAsync({
                image: photo,
              });

              if (res) {
                setPhoto(null);
              }
            }

            await editProfile.mutateAsync(obj);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <InputLabel
                    htmlFor={"picture"}
                    className={`!text-sm mb-[0.35rem] !font-Work-Sans !font-medium`}
                  >
                    Profile Photo
                    <span className="!text-red-600 !text-[0.9rem] pl-1">*</span>
                  </InputLabel>
                  <div className="flex gap-8 items-center largeMobile:flex-col largeMobile:items-start largeMobile:gap-4 largeMobile:mb-2">
                    <figure
                      id="picture"
                      className="w-36 flex items-center justify-center border border-info-300 rounded-md outline-0 aspect-square overflow-hidden p-1"
                    >
                      {photo ? (
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="profile picture"
                          className="w-full h-full object-contain"
                        />
                      ) : currentUser?.image_url ? (
                        <img
                          src={currentUser.image_url}
                          alt="profile picture"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <IoCameraSharp className="w-[40%] h-44 text-info-500" />
                      )}
                    </figure>
                    <input
                      ref={inputRef}
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files![0];

                        setPhoto(file);
                      }}
                    />
                    <div className="flex flex-col gap-2">
                      <h4 className="text-sm">Upload your photo</h4>
                      <p className="text-xs text-info-800">
                        Your photo should be in PNG, JPG or JPEG format
                      </p>
                      <div className="flex items-center mt-1">
                        <Button
                          variant="outlined"
                          color="info"
                          className="!py-2 !px-3 !text-xs"
                          onClick={() => {
                            inputRef.current?.click();
                          }}
                        >
                          <span>Choose image</span>
                        </Button>
                        <Button
                          variant="outlined"
                          color="info"
                          className="!py-2 !border-transparent !px-3 !text-xs"
                          onClick={() => {
                            setPhoto(null);
                          }}
                        >
                          <span>Remove</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 tablet:flex-col tablet:gap-4">
                  <FormField
                    label="First Name"
                    required
                    name="firstName"
                    className="[&_input]:!text-[0.9rem]"
                    labelProps={{
                      className: "!font-medium",
                    }}
                  />
                  <FormField
                    label="Last Name"
                    required
                    name="lastName"
                    className="[&_input]:!text-[0.9rem]"
                    labelProps={{
                      className: "!font-medium",
                    }}
                  />
                </div>
                <FormField
                  label="Email"
                  required
                  name="email"
                  className="[&_input]:!text-[0.9rem]"
                  labelProps={{
                    className: "!font-medium",
                  }}
                  readOnly
                />
                <TextEditorField
                  label="Bio"
                  required={currentUser?.role === "user"}
                  name="aboutMe"
                  labelProps={{
                    className: "!font-medium",
                  }}
                />
              </div>
              <footer className="p-4 py-2 flex items-center justify-between">
                <div></div>
                <Button type="submit" className="!py-2" loading={isSubmitting}>
                  Save
                </Button>
              </footer>
            </form>
          )}
        </Formik>
      </div>
    </main>
  );
}
