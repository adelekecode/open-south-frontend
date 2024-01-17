import Modal from "~/components/modal";

type FilePreviewProps = {
  open: boolean;
  setOpen: (obj: { open: boolean; data: Dataset["files"][0] | null }) => void;
  data: Dataset["files"][0] | null;
};

export default function FilePreview({ open, setOpen }: FilePreviewProps) {
  return (
    <Modal
      muiModal={{
        open,
        onClose: () =>
          setOpen({
            open: false,
            data: null,
          }),
      }}
    >
      <div className="flex flex-col gap-4">
        <header>
          <h1>File Preview</h1>
          <h3>{"File name"}</h3>
        </header>
      </div>
    </Modal>
  );
}
