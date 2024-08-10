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
      exitIcon={{
        display: true,
      }}
    >
      <DialogContent>
        <div className="bg-red-100 rounded-md w-fit mx-auto p-4 mb-8">
          <TiCancel className="text-red-400 p-2 !text-[4rem] mediumMobile:!text-[3.5rem] !font-extralight" />
        </div>
        <p className="text-center text-sm largeMobile:text-xs">
          Your application to create this organization has been rejected
        </p>
      </DialogContent>
    </Modal>
  );
}
