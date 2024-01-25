import { TiCancel } from "react-icons/ti";
import useUserOrganizationStore from "~/store/user-organization";
import Modal from "../modal";

export default function RejectedModal() {
  const { rejectedModal, setRejectedModal } = useUserOrganizationStore();

  const { open } = rejectedModal;

  return (
    <Modal
      muiModal={{
        open,
        onClose: () => {
          setRejectedModal({
            open: false,
          });
        },
      }}
    >
      <div className="flex flex-col gap-3 mediumMobile:gap-1 py-2">
        <span className="bg-red-100 mb-3 w-fit rounded-md p-4 mx-auto">
          <TiCancel className="text-red-400 p-2 !text-[4rem] mediumMobile:!text-[3.5rem] !font-extralight" />
        </span>
        <p className="text-center text-sm">
          Your application to create this organization has been rejected
        </p>
      </div>
    </Modal>
  );
}
