import { MdDeleteOutline } from "react-icons/md";
import Button from "~/components/button";
import Modal from "~/components/modal";
import { useDeleteNews } from "~/mutations/news";

type DeleteConfirmationProps = {
  modal: NewsModal;
  setModal: (obj: NewsModal) => void;
};

export default function DeleteConfirmation({ modal, setModal }: DeleteConfirmationProps) {
  const { data, state } = modal;

  function onClose() {
    setModal({
      state: null,
      data: null,
    });
  }

  const deleteNews = useDeleteNews();

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
          Are you sure you want to delete this news?
        </h1>
        <div className="mt-10 flex gap-6 justify-between h-10">
          <Button color="error" onClick={onClose} className="h-full">
            Cancel
          </Button>
          <Button
            loading={deleteNews.isLoading}
            onClick={async () => {
              const response = await deleteNews.mutateAsync(data?.id || "");

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
