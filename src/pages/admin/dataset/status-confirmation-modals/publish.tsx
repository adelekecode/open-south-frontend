import { DialogContent, DialogTitle } from "@mui/material";
import Button from "~/components/button";
import Modal from "~/components/modal";
import { useChangeDatasetStatus } from "~/mutations/dataset";

type PublishModalProps = {
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

export default function PublishModal({
  open,
  onClose,
  data,
  pagination,
  queryParams,
}: PublishModalProps) {
  const changeDatasetStatus = useChangeDatasetStatus(pagination, queryParams);

  return (
    <Modal open={open} onClose={onClose}>
      <header>
        <DialogTitle>Please confirm</DialogTitle>
        <p className="text-base largeMobile:!text-sm font-medium text-center">
          Are you sure you want to publish this dataset?
        </p>
      </header>
      <DialogContent>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          loading={changeDatasetStatus.isLoading}
          onClick={async () => {
            const response = await changeDatasetStatus.mutateAsync({
              id: data?.id || "",
              action: "published",
            });

            if (response) {
              onClose();
            }
          }}
        >
          Confirm
        </Button>
      </DialogContent>
    </Modal>
  );
}
