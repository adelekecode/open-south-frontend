import { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputLabel } from "@mui/material";
import { ImFilePicture } from "react-icons/im";
import Modal from "~/components/modal";
import { notifyError } from "~/utils/toast";
import Button from "~/components/button";
import SuccessIllustration from "~/assets/illustrations/success.png";
import FormField from "~/components/fields/form-field";
import { useCreateNews } from "~/mutations/news";

type CreateProps = {
  modal: NewsModal;
  setModal: (obj: NewsModal) => void;
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

  const createNews = useCreateNews();

  function onClose() {
    setFormCompleted(false);
    setModal({
      state: null,
      data: null,
    });
    setImage(null);
  }

  return (
    <Modal
      muiModal={{
        open: modal.state === "create",
        onClose,
      }}
      innerContainer={{
        className: "pt-[2rem]",
      }}
    >
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-xl font-semibold">Add News</h1>
        {formCompleted ? (
          <div className="p-6 pt-2 w-full flex flex-col items-center gap-4">
            <figure className="max-w-[7rem]">
              <img src={SuccessIllustration} alt="Success illustrion" />
            </figure>
            <p className="text-xs text-center">You have successfully created a news.</p>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-center font-medium">Would you like to publish it?</p>
              <div className="flex justify-between gap-2">
                <Button
                  className="!text-xs !p-2"
                  variant="outlined"
                  color="error"
                  onClick={onClose}
                >
                  No
                </Button>
                <Button className="!text-xs !p-2" variant="outlined">
                  Yes
                </Button>
              </div>
            </div>
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

              const response = await createNews.mutateAsync({
                title: values.title,
                body: values.description,
                image,
              });

              if (response) {
                setFormCompleted(true);
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form className="pt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
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
                        className="w-56 h-40 flex items-center justify-center border border-info-300 rounded-md outline-0 aspect-square overflow-hidden"
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
                <footer className="p-4 py-0 flex items-center justify-between">
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