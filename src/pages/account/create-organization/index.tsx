import { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { IoCameraSharp } from "react-icons/io5";
import FormField from "~/components/form-field";
import TextEditorField from "~/components/text-editor-field";
import Button from "~/components/button";
import { useCreateOrganization } from "~/mutations/organization";
import Success from "./success";
import { notifyError } from "~/utils/toast";
import { InputLabel } from "@mui/material";

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Name field is required")
    .min(3, "Name must be atleast 3 characters"),
  description: Yup.string()
    .trim()
    .required("Description field is required")
    .min(3, "Description must be atleast 3 characters"),
});

export default function CreateOrganization() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [formCompleted, setFormCompleted] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);

  const createOrganization = useCreateOrganization();

  return (
    <>
      <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-6 w-full">
        <h1 className="text-2xl font-semibold largeMobile:text-xl">New Organization</h1>
        {formCompleted ? (
          <Success />
        ) : (
          <div>
            <Formik
              initialValues={{
                name: "",
                description: "",
              }}
              validateOnBlur={false}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                if (!logo) return notifyError("Logo field is required");

                const response = await createOrganization.mutateAsync({
                  ...values,
                  logo,
                });

                if (response) {
                  setFormCompleted(true);
                }
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <form className="pt-4 flex flex-col gap-10" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4">
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
                          onChange={(e) => {
                            const file = e.target.files![0];

                            setLogo(file);
                          }}
                        />
                        <Button
                          variant="outlined"
                          color="info"
                          className="!py-2"
                          onClick={() => {
                            inputRef.current?.click();
                          }}
                        >
                          <span>Upload Logo</span>
                        </Button>
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
                    <TextEditorField
                      label="Description"
                      required
                      name="description"
                      labelProps={{
                        className: "!font-medium",
                      }}
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, false] }],
                          ["bold", "italic", "underline", "strike", "blockquote"],
                          [
                            { list: "ordered" },
                            { list: "bullet" },
                            { indent: "-1" },
                            { indent: "+1" },
                          ],
                          ["clean"],
                        ],
                      }}
                      formats={[
                        "header",
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "blockquote",
                        "list",
                        "bullet",
                        "indent",
                      ]}
                    />
                  </div>
                  <footer className="p-4 py-2 flex items-center justify-between">
                    <div></div>
                    <Button type="submit" className="!py-2" loading={isSubmitting}>
                      Next
                    </Button>
                  </footer>
                </form>
              )}
            </Formik>
          </div>
        )}
      </main>
    </>
  );
}
