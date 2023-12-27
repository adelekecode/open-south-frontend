import { MdDeleteOutline } from "react-icons/md";
import Button from "~/components/button";
import Modal from "~/components/modal";
import { useDeleteCategory } from "~/mutations/category";

type DeleteConfirmationProps = {
  modal: CategoyModal;
  setModal: (obj: CategoyModal) => void;
};

export default function DeleteConfirmation({ modal, setModal }: DeleteConfirmationProps) {
  const { data, state } = modal;

  function onClose() {
    setModal({
      state: null,
      data: null,
    });
  }

  const deleteCategory = useDeleteCategory();

  return (
    <Modal
      muiModal={{
        open: state === "delete",
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
          Are you sure you want to delete this category?
        </h1>
        <div className="mt-10 flex gap-6 justify-between h-10">
          <Button color="error" onClick={onClose} className="h-full">
            Cancel
          </Button>
          <Button
            loading={deleteCategory.isLoading}
            onClick={async () => {
              const response = await deleteCategory.mutateAsync(data?.id || "");

              if (response) {
                onClose();
              }
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
