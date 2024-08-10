import { useEffect, useRef } from "react";
import { DialogContent, DialogTitle } from "@mui/material";
import Modal from "~/components/modal";

type ViewProps = {
  modal: NewsModal;
  setModal: (obj: NewsModal) => void;
};

export default function View({ modal, setModal }: ViewProps) {
  const { data } = modal;

  const descriptionRef = useRef<HTMLParagraphElement>(null);

  //? This doesn't show on open
  useEffect(() => {
    if (!descriptionRef.current) return;
    if (data?.body) {
      descriptionRef.current.innerHTML = data.body;
    } else {
      descriptionRef.current.innerHTML = "";
    }
  }, [data?.body]);

  if (!data) {
    return;
  }

  return (
    <Modal
      open={true}
      onClose={() => {
        setModal({
          state: null,
          data: null,
        });
      }}
      scroll="body"
      exitIcon={{
        display: true,
      }}
    >
      <DialogTitle>News Details</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4 px-2">
          <div className="w-full">
            <figure className="flex justify-center items-center mx-auto w-full">
              <img
                src={data?.image_url || ""}
                alt="news image"
                className="w-full h-full object-contain"
              />
            </figure>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold largeMobile:text-sm">{data?.title || "------"}</h3>
            <p
              className="text-sm largeMobile:text-xs [&_a]:text-blue-600 [&_a]:underline"
              ref={descriptionRef}
            ></p>
          </div>
        </div>
      </DialogContent>
    </Modal>
  );
}
