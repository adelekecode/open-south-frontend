import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Formik } from "formik";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import Button from "~/components/button";
import TextEditorField from "~/components/fields/text-editor-field";
import Modal from "~/components/modal";
import { useChangeDatasetStatus } from "~/mutations/dataset";

type Props = {
  onClose: () => void;
  data: Dataset;
};

const validationSchema = Yup.object({
  remark: Yup.string()
    .trim()
    .required("This field is required")
    .min(3, "This field must contain atleast 3 characters"),
});

export default function RejectConfirmationModal({ onClose, data }: Props) {
  const [searchParams] = useSearchParams();

  const changeDatasetStatus = useChangeDatasetStatus(searchParams);

  return (
    <Modal open onClose={onClose}>
      <header className="flex flex-col gap-1 pb-8">
        <DialogTitle>Please confirm</DialogTitle>
        <p className="text-xs">
          Are you sure you want to reject this dataset? Please provide a reason for rejecting the
          dataset.
        </p>
      </header>
      <DialogContent>
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
              <TextEditorField
                required
                name="remark"
                labelProps={{
                  className: "!font-medium",
                }}
              />
              <DialogActions>
                <Button variant="outlined" size="small" onClick={onClose}>
                  Cancel
                </Button>
                <Button loading={isSubmitting} type="submit" size="small">
                  Confirm
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Modal>
  );
}
