import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import Modal from "../modal";
import Button from "../button";
import { useDeleteOrganization } from "~/mutations/organization";
import useOrganizationStore from "~/store/organization";

export default function DeleteConfirmationModal() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { deleteConfirmationModal, setDeleteConfirmationModal } = useOrganizationStore();

  const { open, data: orgData } = deleteConfirmationModal;

  const deleteOrganization = useDeleteOrganization();

  function onClose() {
    setDeleteConfirmationModal({
      open: false,
      data: null,
    });
  }

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
        <h1 className="text largeMobile:!text-sm font-medium text-center">
          Are you sure you want to delete this organization?
        </h1>
        <div className="mt-10 flex gap-6 justify-between">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            loading={deleteOrganization.isLoading}
            onClick={async () => {
              const response = await deleteOrganization.mutateAsync(orgData?.id || id || "");

              if (response) {
                onClose();
                if (orgData) {
                  navigate(-1);
                }
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
