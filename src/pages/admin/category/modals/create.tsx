import { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputLabel } from "@mui/material";
import { ImFilePicture } from "react-icons/im";
import Modal from "~/components/modal";
import { useCreateCategory } from "~/mutations/category";
import { notifyError } from "~/utils/toast";
import Button from "~/components/button";
import SuccessIllustration from "~/assets/illustrations/success.png";
import FormField from "~/components/form-field";

type CreateProps = {
  modal: CategoyModal;
  setModal: (obj: CategoyModal) => void;
};

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Title field is required")
    .min(3, "Title must be atleast 3 characters"),
  description: Yup.string()
    .trim()
    .required("Description field is required")
    .min(3, "Description must be atleast 3 characters"),
});

export default function Create({ modal, setModal }: CreateProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [formCompleted, setFormCompleted] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const createCategory = useCreateCategory();

  return (
    <Modal
      muiModal={{
        open: modal.state === "create",
        onClose: () => {
          setModal({
            state: null,
            data: null,
          });
        },
      }}
      innerContainer={{
        className: "pt-[2rem]",
      }}
    >
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-xl font-semibold">New Category</h1>
        {formCompleted ? (
          <div className="p-6 pt-4 w-full flex flex-col items-center gap-4">
            <figure className="max-w-[9rem]">
              <img src={SuccessIllustration} alt="Success illustrion" />
            </figure>
            <p className="text-sm">You have successfully created a category</p>
          </div>
        ) : (
          <Formik
            initialValues={{
              title: "",
              description: "",
            }}
            validateOnBlur={false}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              if (!image) return notifyError("Image field is required");

              const response = await createCategory.mutateAsync({
                name: values.title,
                description: values.description,
                image,
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
                      htmlFor={"image"}
                      className={`!text-sm mb-[0.35rem] !font-Work-Sans !font-medium`}
                    >
                      Image
                      <span className="!text-red-600 !text-[0.9rem] pl-1">*</span>
                    </InputLabel>
                    <div className="flex gap-6 items-center largeMobile:flex-col largeMobile:items-start largeMobile:gap-4 largeMobile:mb-2">
                      <figure
                        id="image"
                        className="w-56 h-40 flex items-center justify-center border border-info-300 rounded-md outline-0 aspect-square overflow-hidden bg-primary-50"
                      >
                        {image ? (
                          <img
                            src={URL.createObjectURL(image)}
                            alt="category image"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <ImFilePicture className="w-[25%] h-44 text-info-500" />
                        )}
                      </figure>
                      <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files![0];

                          setImage(file);
                        }}
                      />
                      <Button
                        variant="outlined"
                        color="info"
                        className="!py-2 !text-xs !font-normal"
                        onClick={() => {
                          inputRef.current?.click();
                        }}
                      >
                        <span>Upload an image</span>
                      </Button>
                    </div>
                  </div>
                  <FormField
                    label="Title"
                    required
                    name="title"
                    className="[&_input]:!text-[0.9rem]"
                    labelProps={{
                      className: "!font-medium",
                    }}
                  />
                  <FormField
                    label="Description"
                    required
                    multiline
                    name="description"
                    rows={6}
                    className="!p-0 [&_textarea]:!text-[0.9rem]"
                  />
                </div>
                <footer className="p-4 py-2 flex items-center justify-between">
                  <div></div>
                  <Button type="submit" className="!py-2" loading={isSubmitting}>
                    Submit
                  </Button>
                </footer>
              </form>
            )}
          </Formik>
        )}
      </div>
    </Modal>
  );
}
