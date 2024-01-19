import { Avatar } from "@mui/material";
import { IoPerson } from "react-icons/io5";
import Button from "~/components/button";
import Modal from "~/components/modal";

type RequestModalProps = {
  open: boolean;
  setOpen: (bool: boolean) => void;
};

export default function RequestModal({ open, setOpen }: RequestModalProps) {
  return (
    <Modal
      muiModal={{
        open,
        onClick: () => setOpen(false),
      }}
      innerContainer={{
        className: "pt-[2rem]",
      }}
    >
      <div className="flex flex-col gap-6 w-full">
        <h1 className="text-xl font-semibold">Requests</h1>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index + 1} className="w-full flex items-center gap-4 justify-between">
              <div className="flex items-center gap-2">
                <Avatar sx={{ width: 30, height: 30 }}>
                  <IoPerson className={"text-base"} />
                </Avatar>
                <p className="capitalize text-sm">
                  <span>{"John"}</span> <span>{"Doe"}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button className="!text-xs !py-2 !px-3" color="success">
                  Grant
                </Button>
                <Button className="!text-xs !py-2 !px-3" color="error">
                  Deny
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
