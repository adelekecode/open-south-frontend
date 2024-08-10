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
      exitIcon={{
        display: true,
      }}
    >
      <DialogContent>
        <div className="bg-primary-100 rounded-md w-fit mx-auto p-4 mb-8">
          <MdPendingActions className="text-primary-400 p-2 !text-[4rem] mediumMobile:!text-[3.5rem] !font-extralight" />
        </div>
        <p className="text-center text-sm largeMobile:text-xs">
          Your organization is currently being reviewed
        </p>
      </DialogContent>
    </Modal>
  );
}
