import { createContext, useState, ReactNode, startTransition } from "react";
import ConfirmationDialog from "~/components/confirmation-dialog";

type DialogProps = {
  title: string;
  description: string;
  isLoading?: boolean;
  confirmationText?: string;
};

type DialogState = DialogProps & {
  open: boolean;
  resolve: (value: boolean | PromiseLike<boolean>) => void;
};

type DialogContextProps = {
  openDialog: (props: DialogProps) => Promise<boolean>;
};

export const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<DialogState | null>(null);

  const openDialog = ({ ...props }: DialogProps) => {
    return new Promise<boolean>((resolve) => {
      startTransition(() => {
        setDialog({ open: true, ...props, resolve });
      });
    });
  };

  const closeDialog = () => {
    setDialog((prev) => (prev ? { ...prev, open: false } : null));
  };

  const handleConfirm = () => {
    if (dialog) {
      dialog.resolve(true);
    }
  };

  const handleClose = () => {
    if (dialog) {
      dialog.resolve(false);
      closeDialog();
    }
  };

  return (
    <DialogContext.Provider value={{ openDialog }}>
      {children}
      {dialog && dialog.open && (
        <ConfirmationDialog
          {...dialog}
          open={true}
          onConfirm={handleConfirm}
          onClose={handleClose}
        />
      )}
    </DialogContext.Provider>
  );
};
