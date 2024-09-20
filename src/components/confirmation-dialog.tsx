import { DialogActions, DialogTitle } from "@mui/material";
import { useTranslation } from "react-i18next";
import Modal from "./modal";
import Button from "./button";

type Props = {
  open: boolean;
  title: string;
  description: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmationDialog({
  open,
  title,
  description,
  isLoading,
  onConfirm,
  onClose,
}: Props) {
  const { t } = useTranslation("components/confirmation-dialog");

  return (
    <Modal open={open} onClose={onClose}>
      <header className="flex flex-col gap-1 pb-8">
        <DialogTitle>{title}</DialogTitle>
        <p className="text-xs">{description}</p>
      </header>
      <DialogActions>
        <Button size="small" variant="outlined" onClick={onClose} disabled={isLoading}>
          {t("actions.cancel")}
        </Button>
        <Button
          size="small"
          onClick={() => {
            onConfirm();

            if (typeof isLoading === "boolean" && !isLoading) {
              return onClose();
            }

            onClose();
          }}
          loading={isLoading}
        >
          {t("actions.confirm")}
        </Button>
      </DialogActions>
    </Modal>
  );
}
