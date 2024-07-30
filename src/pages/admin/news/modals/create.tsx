import { useCallback, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { DialogContent, DialogTitle, InputLabel } from "@mui/material";
import { ImFilePicture } from "react-icons/im";
import Modal from "~/components/modal";
import { notifyError } from "~/utils/toast";
import Button from "~/components/button";
import SuccessIllustration from "~/assets/illustrations/success.png";
import FormField from "~/components/fields/form-field";
import { useChangeNewsStatus, useCreateNews, useEditNews } from "~/mutations/news";
import TextEditorField from "~/components/fields/text-editor-field";

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
  const editNews = useEditNews();
  const changeNewsStatus = useChangeNewsStatus();

  const onClose = useCallback(() => {
    setFormCompleted(false);
    setModal({
      state: null,
      data: null,
    });
    setImage(null);
  }, [setModal]);

  const isEditState = modal.state === "edit";

  return (
    <Modal
      open
      onClose={onClose}
      exitIcon={{
        display: true,
      }}
      scroll="body"
    >
      <DialogTitle>{isEditState ? "Edit News" : "Add News"}</DialogTitle>
      <DialogContent>
        {!isEditState && formCompleted ? (
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
                <Button
                  className="!text-xs !p-2"
                  onClick={async () => {
                    if (createNews.data) {
                      const response = await changeNewsStatus.mutateAsync({
                        id: createNews.data?.id || "",
                        action: "publish",
                      });

                      if (response) {
                        onClose();
                      }
                    }
                  }}
                  loading={changeNewsStatus.isLoading}
                >
                  Yes
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Formik
            initialValues={{
              title: modal.data?.title || "",
              description: modal.data?.body || "",
            }}
            validateOnBlur={false}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              if (isEditState) {
                if (!image && !modal.data?.image_url) return notifyError("Image field is required");

                const data: { title: string; body: string; image?: File } = {
                  title: values.title,
                  body: values.description,
                };

                if (image) {
                  data.image = image;
                }

                const response = await editNews.mutateAsync({
                  id: modal.data?.id || "",
                  data,
                });

                if (response) {
                  return onClose();
                }
              }

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
                        className="w-56 h-40 flex items-center justify-center border border-info-300 rounded-md outline-0 aspect-square overflow-hidden [&>img]:w-full [&>img]:h-full [&>img]:object-contain"
                      >
                        {image ? (
                          <img src={URL.createObjectURL(image)} alt="news image" />
                        ) : modal.data?.image_url ? (
                          <img src={modal.data?.image_url} alt="news image" />
                        ) : (
                          <ImFilePicture className="w-[25%] h-44 text-info-500" />
                        )}
                      </figure>
                      <input
                        ref={inputRef}
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files![0];

                          setImage(file);
                        }}
                      />
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm">Upload an image</h4>
                        <p className="text-xs text-info-800">
                          The image should be in PNG, JPG or JPEG format
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
                              setImage(null);
                            }}
                          >
                            <span>Remove</span>
                          </Button>
                        </div>
                      </div>
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
                  <TextEditorField
                    label="Description"
                    required
                    name="description"
                    labelProps={{
                      className: "!font-medium",
                    }}
                  />
                </div>
                <footer className="p-4 py-0 flex items-center justify-between">
                  <div></div>
                  <Button type="submit" className="!py-2" loading={isSubmitting}>
                    {isEditState ? "Save" : "Submit"}
                  </Button>
                </footer>
              </form>
            )}
          </Formik>
        )}
      </DialogContent>
    </Modal>
  );
}
