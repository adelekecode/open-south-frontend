import { Dialog, IconButton, IconButtonProps, DialogProps } from "@mui/material";
import { twMerge } from "tailwind-merge";
import { IoClose } from "react-icons/io5";

type Props = DialogProps & {
  exitIcon?: IconButtonProps & {
    display?: boolean;
  };
};

export default function Modal({ children, exitIcon, ...props }: Props) {
  const { display, ...iconButtonProps } = exitIcon || {};

  return (
    <Dialog {...props}>
      {display && (
        <IconButton
          {...iconButtonProps}
          className={twMerge(
            `!absolute right-[16px] top-[12px] mediumMobile::right-2 mediumMobile::top-2`,
            exitIcon?.className
          )}
          onClick={props.onClose as () => void}
          size="small"
        >
          <IoClose />
        </IconButton>
      )}
      {children}
    </Dialog>
  );
}
