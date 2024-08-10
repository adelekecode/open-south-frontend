import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { InputLabel, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { IoCameraSharp } from "react-icons/io5";
import { useCreateOrganization } from "~/mutations/organization";
import { notifyError } from "~/utils/toast";
import Button from "~/components/button";
import FormField from "~/components/fields/form-field";
import SelectField from "~/components/fields/select-field";
import TextEditorField from "~/components/fields/text-editor-field";

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Name field is required")
    .min(3, "Name must be atleast 3 characters"),
  type: Yup.string().trim().required("Type of organization field is required"),
  email: Yup.string().email().required("Email field is required"),
  linkedIn: Yup.string().trim().url("LinkedIn url not valid"),
  twitter: Yup.string().trim().url("Twitter url not valid"),
  website: Yup.string().trim().url("Website url not valid"),
  description: Yup.string()
    .trim()
    .required("Description field is required")
    .min(3, "Description must be atleast 3 characters"),
});

type NewOrganizationProps = {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function NewOrganization({ setActiveIndex }: NewOrganizationProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [logo, setLogo] = useState<File | null>(null);

  const queryClient = useQueryClient();

  const createOrganization = useCreateOrganization();

  return (
    <div className="pt-4 flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <h2 className="w-full text-center text-base font-semibold largeMobile:text-sm">
          Fill the fields below to create an organization
        </h2>
        <div>
          <Formik
            initialValues={{
              name: "",
              type: "",
              email: "",
              linkedIn: "",
              twitter: "",
              website: "",
              description: "",
            }}
            validateOnBlur={false}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              if (!logo) return notifyError("Logo field is required");

              if (values.type === "organization") {
                values.type = "organisation";
                if (values.email.includes("@gmail.com")) {
                  return notifyError(
                    'Gmail is not allowed for organizations with a type of "Organization"'
                  );
                }
              }

              const response = await createOrganization.mutateAsync({
                ...values,
                type: `cooperate_${values.type}`,
                logo,
              });

              if (response) {
                queryClient.setQueryData(["create-org"], response);
                setActiveIndex((prev) => prev + 1);
              }
            }}
          >
            {({ handleSubmit, isSubmitting, values }) => (
              <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 px-4">
                  <div className="flex flex-col">
                    <InputLabel
                      htmlFor={"logo"}
                      className={`!text-sm mb-[0.35rem] !font-Work-Sans !font-medium`}
                    >
                      Logo
                      <span className="!text-red-600 !text-[0.9rem] pl-1">*</span>
                    </InputLabel>
                    <div className="flex gap-8 items-center largeMobile:flex-col largeMobile:items-start largeMobile:gap-4 largeMobile:mb-2">
                      <figure
                        id="logo"
                        className="w-36 flex items-center justify-center border border-info-300 rounded-md outline-0 aspect-square overflow-hidden p-1"
                      >
                        {logo ? (
                          <img
                            src={URL.createObjectURL(logo)}
                            alt="organization logo"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <IoCameraSharp className="w-[40%] h-44 text-info-500" />
                        )}
                      </figure>
                      <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                          const file = e.target.files![0];

                          setLogo(file);
                        }}
                      />
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm">Upload a logo</h4>
                        <p className="text-xs text-info-800">
                          The logo should be in PNG, JPG or JPEG format
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
                              setLogo(null);
                            }}
                          >
                            <span>Remove</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <FormField
                    label="Name"
                    required
                    name="name"
                    className="[&_input]:!text-[0.9rem]"
                    labelProps={{
                      className: "!font-medium",
                    }}
                  />
                  <SelectField
                    className="capitalize"
                    label="Type of organization"
                    required
                    name="type"
                    labelProps={{
                      className: "!font-medium",
                    }}
                    value={values.type || ""}
                  >
                    <MenuItem value={"organization"}>
                      <div className="flex flex-col">
                        <h3 className="font-medium">Organization</h3>
                        <span className="pl-2 text-xs">
                          Please note: Gmail is not allowed for this type.
                        </span>
                      </div>
                    </MenuItem>
                    <MenuItem value={"society"}>
                      <div>
                        <h3 className="font-medium">Society</h3>
                        <span className="pl-2 text-xs">
                          Please note: Any type of email is allowed for this type.
                        </span>
                      </div>
                    </MenuItem>
                  </SelectField>
                  <FormField
                    label="Email"
                    required
                    name="email"
                    className="[&_input]:!text-[0.9rem]"
                    labelProps={{
                      className: "!font-medium",
                    }}
                  />
                  <FormField
                    label="LinkedIn"
                    name="linkedIn"
                    className="[&_input]:!text-[0.9rem]"
                    labelProps={{
                      className: "!font-medium",
                    }}
                  />
                  <FormField
                    label="Twitter"
                    name="twitter"
                    className="[&_input]:!text-[0.9rem]"
                    labelProps={{
                      className: "!font-medium",
                    }}
                  />
                  <FormField
                    label="Website"
                    name="website"
                    className="[&_input]:!text-[0.9rem]"
                    labelProps={{
                      className: "!font-medium",
                    }}
                  />
                  <TextEditorField
                    label="Description"
                    required
                    name="description"
                    labelProps={{
                      className: "!font-medium",
                    }}
                  />
                </div>
                <footer className="p-4 py-2 flex items-center justify-between border-t">
                  <div></div>
                  <Button type="submit" className="!py-2" loading={isSubmitting}>
                    Create
                  </Button>
                </footer>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
