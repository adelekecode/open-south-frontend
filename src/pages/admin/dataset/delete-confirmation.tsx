import { DialogActions, DialogTitle } from "@mui/material";
import Modal from "~/components/modal";
import Button from "~/components/button";
import { useChangeDatasetStatus } from "~/mutations/dataset";

type DeleteConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  data: Dataset;
  pagination: Pagination;
  queryParams: {
    search: string;
    filter: {
      status: string;
    };
  };
};

export default function DeleteConfirmationModal({
  open,
  onClose,
  data,
  pagination,
  queryParams,
}: DeleteConfirmationModalProps) {
  const changeDatasetStatus = useChangeDatasetStatus(pagination, queryParams);

  return (
    <Modal open={open} onClose={onClose}>
      <header className="mb-6">
        <DialogTitle>Please confirm</DialogTitle>
        <small>Are you sure you want to delete this dataset?</small>
      </header>
      <DialogActions>
        <Button variant="outlined" size="small" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="small"
          loading={changeDatasetStatus.isLoading}
          onClick={async () => {
            const response = await changeDatasetStatus.mutateAsync({
              id: data?.id || "",
              action: "delete",
            });

            if (response) {
              onClose();
            }
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Modal>
  );
}
