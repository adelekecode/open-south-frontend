import { Formik } from "formik";
import * as Yup from "yup";
import { TiInfo } from "react-icons/ti";
import Button from "~/components/button";
import TextEditorField from "~/components/fields/text-editor-field";
import Modal from "~/components/modal";
import { useChangeDatasetStatus } from "~/mutations/dataset";

type RejectModalProps = {
  open: boolean;
  onClose: () => void;
  data: Dataset;
};

const validationSchema = Yup.object({
  remark: Yup.string()
    .trim()
    .required("This field is required")
    .min(3, "This field must contain atleast 3 characters"),
});

export default function RejectModal({ open, onClose, data }: RejectModalProps) {
  const changeDatasetStatus = useChangeDatasetStatus();

  return (
    <Modal
      muiModal={{
        open,
        onClose,
      }}
      innerContainer={{
        className: "w-[550px]",
      }}
    >
      <Formik
        initialValues={{
          remark: "",
        }}
        validateOnBlur={false}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const response = await changeDatasetStatus.mutateAsync({
            id: data?.id || "",
            action: "rejected",
            data: values,
          });

          if (response) {
            onClose();
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 mediumMobile:gap-1 py-2">
              <span className="bg-red-100 mb-3 w-fit rounded-md p-4 mx-auto">
                <TiInfo className="text-red-400 p-2 !text-[4rem] mediumMobile:!text-[3.5rem] !font-extralight" />
              </span>
              <p className="text-sm largeMobile:!text-xs text-center font-medium">
                Are you sure you want to reject this dataset? Please provide a reason for rejecting
                the dataset.
              </p>
            </div>
            <TextEditorField
              required
              name="remark"
              labelProps={{
                className: "!font-medium",
              }}
            />
            <div className="mt-6 flex gap-6 justify-between">
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button loading={isSubmitting} type="submit">
                Confirm
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
