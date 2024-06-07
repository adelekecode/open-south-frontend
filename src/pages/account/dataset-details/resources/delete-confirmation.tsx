import { useTranslation } from "react-i18next";
import { MdDeleteOutline } from "react-icons/md";
import Button from "~/components/button";
import Modal from "~/components/modal";
import { useDeleteDatasetFile } from "~/mutations/dataset";

type DeleteConfirmationProps = {
  open: boolean;
  onClose: () => void;
  data: Dataset["files"][0] & {
    dataset: string;
  };
};

export default function DeleteConfirmation({ open, onClose, data }: DeleteConfirmationProps) {
  const { t } = useTranslation("dashboard-layout/account/dataset/id");

  const deleteDatasetFile = useDeleteDatasetFile();

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
          {t("resources.delete-confirmation-modal.contents")}
        </h1>
        <div className="mt-10 flex gap-6 justify-between">
          <Button variant="outlined" onClick={onClose}>
            {t("resources.delete-confirmation-modal.cta-btn.cancel")}
          </Button>
          <Button
            loading={deleteDatasetFile.isLoading}
            onClick={async () => {
              const response = await deleteDatasetFile.mutateAsync({
                datasetId: data.dataset,
                fileId: data.id,
              });

              if (response) {
                onClose();
              }
            }}
          >
            {t("resources.delete-confirmation-modal.cta-btn.confirm")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
