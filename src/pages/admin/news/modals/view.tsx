import { useEffect, useRef } from "react";
import Modal from "~/components/modal";

type ViewProps = {
  modal: NewsModal;
  setModal: (obj: NewsModal) => void;
};

export default function View({ modal, setModal }: ViewProps) {
  const { data } = modal;

  const descriptionRef = useRef<HTMLParagraphElement>(null);

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
      muiModal={{
        open: true,
        onClose: () => {
          setModal({
            state: null,
            data: null,
          });
        },
      }}
      innerContainer={{
        className: "pt-[2rem] !px-0",
      }}
    >
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-xl font-semibold largeMobile:text-base px-8 [@media(max-width:500px)]:px-4">
          View News
        </h1>
        <div className="flex flex-col gap-4">
          <div className="w-full px-6 [@media(max-width:500px)]:px-4">
            <figure className="flex justify-center items-center mx-auto w-full">
              <img
                src={data?.image_url || ""}
                alt="news image"
                className="w-full h-full object-contain"
              />
            </figure>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold largeMobile:text-sm px-6 [@media(max-width:500px)]:px-4">
              {data?.title || "------"}
            </h3>
            <p
              className="text-sm largeMobile:text-xs px-6 [@media(max-width:500px)]:px-4 [&_a]:text-blue-600 [&_a]:underline"
              ref={descriptionRef}
            ></p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
