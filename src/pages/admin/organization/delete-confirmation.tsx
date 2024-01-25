import { MdDeleteOutline } from "react-icons/md";
import { useChangeOrganizationStatus } from "~/mutations/organization";
import Modal from "~/components/modal";
import Button from "~/components/button";

type DeleteConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  data: Organization;
};

export default function DeleteConfirmationModal({
  open,
  onClose,
  data,
}: DeleteConfirmationModalProps) {
  const changeOrganizationStatus = useChangeOrganizationStatus();

  return (
    <Modal
      muiModal={{
        open,
        onClose,
      }}
    >
      <div className="flex flex-col gap-3 mediumMobile:gap-1">
        <span className="bg-red-100 mb-3 w-fit rounded-md p-4 mx-auto">
          <MdDeleteOutline className="text-red-400 p-2 !text-[4rem] mediumMobile:!text-[3rem] !font-extralight" />
        </span>
        <h1 className="text-base largeMobile:!text-sm font-medium text-center">
          Are you sure you want to delete this organization?
        </h1>
        <div className="mt-10 flex gap-6 justify-between">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            loading={changeOrganizationStatus.isLoading}
            onClick={async () => {
              const response = await changeOrganizationStatus.mutateAsync({
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
        </div>
      </div>
    </Modal>
  );
}
