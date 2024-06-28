import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "~/components/button";
import Modal from "~/components/modal";
import { useDeleteDatasetFile } from "~/mutations/dataset";

type DeleteConfirmationProps = {
  open: boolean;
  onClose: () => void;
  data: Dataset["files"][0] & {
    dataset: string;
  };
};

export default function DeleteConfirmation({ open, onClose, data }: DeleteConfirmationProps) {
  const navigate = useNavigate();

  const deleteDatasetFile = useDeleteDatasetFile();

  return (
    <Modal open={open} onClose={onClose}>
      <DialogTitle>Please confirm</DialogTitle>
      <DialogContent>
        <span className="bg-red-100 mb-3 w-fit rounded-md p-4 mx-auto">
          <MdDeleteOutline className="text-red-400 p-2 !text-[4rem] mediumMobile:!text-[3rem] !font-extralight" />
        </span>
        <h1 className="text-base largeMobile:!text-sm font-medium text-center">
          Are you sure you want to delete this file?
        </h1>
      </DialogContent>
      <DialogActions>
        <Button size="small" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="small"
          loading={deleteDatasetFile.isLoading}
          onClick={async () => {
            const response = await deleteDatasetFile.mutateAsync({
              datasetId: data.dataset || "",
              fileId: data.id,
            });

            if (response) {
              navigate("/account/datasets");
            }
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Modal>
  );
}
