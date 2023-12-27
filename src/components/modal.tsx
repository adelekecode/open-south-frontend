import {
  IconButton,
  IconButtonProps,
  Modal as MuiModal,
  ModalProps as MuiModalProps,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

type ModalProps = {
  muiModal: Omit<MuiModalProps, "children">;
  iconButton?: Omit<IconButtonProps, "children">;
  displayExitButton?: boolean;
  children: React.ReactNode;
  innerContainer?: {
    className?: string;
  };
};

export default function Modal({
  muiModal,
  iconButton,
  displayExitButton = true,
  children,
  innerContainer,
}: ModalProps) {
  return (
    <MuiModal
      {...muiModal}
      className={twMerge(
        `flex items-center justify-center [@media(max-width:500px)]:px-4`,
        muiModal.className
      )}
    >
      <div
        className={twMerge(
          `w-[500px] largeLaptop:w-[600px] bg-white flex flex-col gap-10 items-center p-8 relative !outline-0 pt-12 [@media(max-width:600px)]:w-[450px] [@media(max-width:500px)]:px-4 [@media(max-width:500px)]:!w-full overflow-y-auto max-h-[90%]`,
          innerContainer?.className
        )}
      >
        {displayExitButton && (
          <IconButton
            {...iconButton}
            className={twMerge(
              `!absolute right-[16px] top-[12px] mediumMobile::right-2 mediumMobile::top-2`,
              iconButton?.className
            )}
            onClick={muiModal.onClose as () => void}
          >
            <IoClose />
          </IconButton>
        )}
        {children}
      </div>
    </MuiModal>
  );
}
