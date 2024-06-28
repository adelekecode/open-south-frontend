import { DialogContent } from "@mui/material";
import { TiCancel } from "react-icons/ti";
import useUserOrganizationStore from "~/store/user-organization";
import Modal from "../modal";

export default function RejectedModal() {
  const { rejectedModal, setRejectedModal } = useUserOrganizationStore();

  const { open } = rejectedModal;

  return (
    <Modal
      open={open}
      onClose={() => {
        setRejectedModal({
          open: false,
        });
      }}
    >
      <DialogContent>
        <span className="bg-red-100 mb-3 w-fit rounded-md p-4 mx-auto">
          <TiCancel className="text-red-400 p-2 !text-[4rem] mediumMobile:!text-[3.5rem] !font-extralight" />
        </span>
        <p className="text-center text-sm">
          Your application to create this organization has been rejected
        </p>
      </DialogContent>
    </Modal>
  );
}
