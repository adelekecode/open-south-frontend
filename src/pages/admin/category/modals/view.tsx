import Modal from "~/components/modal";

type ViewProps = {
  modal: CategoyModal;
  setModal: (obj: CategoyModal) => void;
};

export default function View({ modal, setModal }: ViewProps) {
  const { data, state } = modal;

  return (
    <Modal
      muiModal={{
        open: state === "view",
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
          View Category
        </h1>
        <div className="flex flex-col gap-4">
          <div className="w-full bg-primary-50">
            <figure className="flex justify-center items-center mx-auto w-full aspect-video max-h-[16rem] largeMobile:w-[80%]">
              <img
                src={data?.image_url || ""}
                alt="category image"
                className="w-full h-full object-contain"
              />
            </figure>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold largeMobile:text-sm px-8 [@media(max-width:500px)]:px-4">
              {data?.name || "------"}
            </h3>
            <p className="text-sm largeMobile:text-xs px-8 [@media(max-width:500px)]:px-4">
              {data?.description || "------"}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
