import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DialogContent, DialogTitle, InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { ImFilePicture } from "react-icons/im";
import Modal from "~/components/modal";
import { useCreateCategory, useEditCategory } from "~/mutations/category";
import { notifyError } from "~/utils/toast";
import Button from "~/components/button";
import SuccessIllustration from "~/assets/illustrations/success.png";
import FormField from "~/components/fields/form-field";

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
  const { t } = useTranslation("dashboard-layout/admin/categories");

  const [searchParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [formCompleted, setFormCompleted] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const createCategory = useCreateCategory(searchParams);
  const editCategory = useEditCategory(searchParams);

  function onClose() {
    setFormCompleted(false);
    setModal({
      state: null,
      data: null,
    });
  }

  const isEditState = modal.state === "edit";

  return (
    <Modal
      open={modal.state === "create" || isEditState}
      onClose={onClose}
      exitIcon={{
        display: true,
      }}
    >
      <DialogTitle>
        {isEditState ? t("edit-category-modal.title") : t("add-category-modal.title")}
      </DialogTitle>
      <DialogContent>
        {formCompleted ? (
          <div className="p-6 pt-4 w-full flex flex-col items-center gap-4">
            <figure className="max-w-[9rem]">
              <img src={SuccessIllustration} alt="Success illustrion" />
            </figure>
            <p className="text-sm">{t("add-category-modal.success")}</p>
          </div>
        ) : (
          <Formik
            initialValues={{
              title: modal.data?.name || "",
              description: modal.data?.description || "",
            }}
            validateOnBlur={false}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              if (isEditState) {
                if (!image && !modal.data?.image_url) return notifyError("Image field is required");

                const data: { name: string; description: string; image?: File } = {
                  name: values.title,
                  description: values.description,
                };

                if (image) {
                  data.image = image;
                }

                const response = await editCategory.mutateAsync({
                  id: modal.data?.id || "",
                  data,
                });

                if (response) {
                  return onClose();
                }
              }

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
                      {t("add-category-modal.form.image.label")}
                      <span className="!text-red-600 !text-[0.9rem] pl-1">*</span>
                    </InputLabel>
                    <div className="flex gap-6 items-center largeMobile:flex-col largeMobile:items-start largeMobile:gap-4 largeMobile:mb-2">
                      <figure
                        id="image"
                        className="w-80 h-40 flex items-center justify-center border border-info-300 rounded-md outline-0 aspect-square overflow-hidden bg-primary-50 [&>img]:w-full [&>img]:h-full [&>img]:object-contain"
                      >
                        {image ? (
                          <img src={URL.createObjectURL(image)} alt="category image" />
                        ) : modal.data?.image_url ? (
                          <img src={modal.data?.image_url} alt="category image" />
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
                        <h4 className="text-sm">{t("add-category-modal.form.image.info.title")}</h4>
                        <p className="text-xs text-info-800">
                          {t("add-category-modal.form.image.info.body")}
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
                            <span>{t("add-category-modal.form.image.info.cta.choose")}</span>
                          </Button>
                          <Button
                            variant="outlined"
                            color="info"
                            className="!py-2 !border-transparent !px-3 !text-xs"
                            onClick={() => {
                              setImage(null);
                            }}
                          >
                            <span>{t("add-category-modal.form.image.info.cta.remove")}</span>
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
                    {isEditState
                      ? t("edit-category-modal.button")
                      : t("add-category-modal.form.button")}
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
