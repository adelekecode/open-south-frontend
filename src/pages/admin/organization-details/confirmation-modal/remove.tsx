import { useParams, useSearchParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import Modal from "~/components/modal";
import Button from "~/components/button";
import { useRemoveUserFromOrganization } from "~/mutations/organization";

type RemoveModalProps = {
  open: boolean;
  onClose: () => void;
  data: CurrentUser;
  pagination: Pagination;
};

export default function RemoveModal({ open, onClose, data, pagination }: RemoveModalProps) {
  const { id } = useParams();

  const [searchParams] = useSearchParams();

  const removeUserFromOrganization = useRemoveUserFromOrganization(
    id || "",
    searchParams.get("q") || "",
    pagination
  );

  return (
    <Modal
      muiModal={{
        open,
        onClose,
      }}
      innerContainer={{
        className: "pt-[4rem]",
      }}
    >
      <div className="flex flex-col gap-3 mediumMobile:gap-1">
        <span className="bg-red-100 mb-3 w-fit rounded-md p-4 mx-auto">
          <MdDeleteOutline className="text-red-400 p-2 !text-[4rem] mediumMobile:!text-[3rem] !font-extralight" />
        </span>
        <h1 className="text-base text-center largeMobile:text-sm">
          Are you sure you want to remove this user from this organization?
        </h1>
        <div className="mt-10 flex gap-6 justify-between h-10">
          <Button color="error" onClick={onClose} className="h-full">
            Cancel
          </Button>
          <Button
            loading={removeUserFromOrganization.isLoading}
            onClick={async () => {
              await removeUserFromOrganization.mutateAsync(data.id);

              onClose();
            }}
            className="h-full"
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}
