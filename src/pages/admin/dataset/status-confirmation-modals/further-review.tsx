import { DialogActions, DialogTitle } from "@mui/material";
import Button from "~/components/button";
import Modal from "~/components/modal";
import { useChangeDatasetStatus } from "~/mutations/dataset";

type UnblockModalProps = {
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

export default function UnblockModal({
  open,
  onClose,
  data,
  pagination,
  queryParams,
}: UnblockModalProps) {
  const changeDatasetStatus = useChangeDatasetStatus(pagination, queryParams);

  return (
    <Modal open={open} onClose={onClose}>
      <header>
        <DialogTitle>Please confirm</DialogTitle>
        <p className="text-base largeMobile:!text-sm font-medium text-center">
          Are you sure you want change this dataset status to further review?
        </p>
      </header>
      <DialogActions>
        <Button size="small" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="small"
          loading={changeDatasetStatus.isLoading}
          onClick={async () => {
            const response = await changeDatasetStatus.mutateAsync({
              id: data?.id || "",
              action: "further_review",
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
