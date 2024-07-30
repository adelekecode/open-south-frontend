import { MdDeleteOutline } from "react-icons/md";
import Modal from "~/components/modal";
import Button from "~/components/button";
import { useChangeDatasetStatus } from "~/mutations/dataset";

type DeleteConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  data: Dataset;
  pagination: Pagination;
  queryParams: {
    search: string;
    filter: {
      status: string;
    };
  };
};

export default function DeleteConfirmationModal({
  open,
  onClose,
  data,
  pagination,
  queryParams,
}: DeleteConfirmationModalProps) {
  const changeDatasetStatus = useChangeDatasetStatus(pagination, queryParams);

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
          Are you sure you want to delete this dataset?
        </h1>
        <div className="mt-10 flex gap-6 justify-between">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            loading={changeDatasetStatus.isLoading}
            onClick={async () => {
              const response = await changeDatasetStatus.mutateAsync({
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
