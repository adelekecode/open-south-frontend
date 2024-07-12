import { DialogContent } from "@mui/material";
import { MdPendingActions } from "react-icons/md";
import useUserOrganizationStore from "~/store/user-organization";
import Modal from "../modal";

export default function PendingModal() {
  const { pendingModal, setPendingModal } = useUserOrganizationStore();

  const { open } = pendingModal;

  return (
    <Modal
      open={open}
      onClose={() => {
        setPendingModal({
          open: false,
        });
      }}
    >
      <DialogContent>
        <span className="bg-primary-100 mb-3 w-fit rounded-md p-4 mx-auto">
          <MdPendingActions className="text-primary-400 p-2 !text-[4rem] mediumMobile:!text-[3.5rem] !font-extralight" />
        </span>
        <p className="text-center text-sm largeMobile:text-xs">
          Your organization is currently being reviewed
        </p>
      </DialogContent>
    </Modal>
  );
}
