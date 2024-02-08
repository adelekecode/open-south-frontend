import Modal from "~/components/modal";

type FileUploadProps = {
  open: boolean;
  setOpen: (bool: boolean) => void;
};

export default function FileUpload({ open, setOpen }: FileUploadProps) {
  function onClose() {
    setOpen(false);
  }

  return (
    <Modal
      muiModal={{
        open,
        onClose,
      }}
    >
      <div className="flex flex-col gap-3 mediumMobile:gap-1"></div>
    </Modal>
  );
}
