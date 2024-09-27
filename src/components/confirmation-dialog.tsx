import { useState } from "react";
import { DialogActions, DialogContent, DialogTitle, OutlinedInput } from "@mui/material";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import Modal from "./modal";
import Button from "./button";

type Props = {
  open: boolean;
  title: string;
  description: string;
  confirmationText?: string; // Text the user has to type to confirm
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmationDialog({
  open,
  title,
  description,
  confirmationText,
  isLoading,
  onConfirm,
  onClose,
}: Props) {
  const { t } = useTranslation("components/confirmation-dialog");
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const isConfirmDisabled = confirmationText
    ? inputValue !== confirmationText || isLoading
    : isLoading;

  return (
    <Modal open={open} onClose={onClose}>
      <header className={twMerge(`flex flex-col gap-1 pb-8`, confirmationText && "pb-2")}>
        <DialogTitle>{title}</DialogTitle>
        <p className="text-xs">{description}</p>
      </header>
      {confirmationText && (
        <DialogContent className="gap-2 flex flex-col">
          <p className="text-xs">
            Please type <span className="font-semibold">{confirmationText}</span> to confirm:
          </p>
          <OutlinedInput
            className={twMerge("w-full !rounded-md !border-[0px] placeholder:!text-base")}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={confirmationText}
            size="small"
          />
        </DialogContent>
      )}
      <DialogActions>
        <Button size="small" variant="outlined" onClick={onClose} disabled={isLoading}>
          {t("actions.cancel")}
        </Button>
        <Button
          size="small"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          loading={isLoading}
          disabled={isConfirmDisabled}
        >
          {t("actions.confirm")}
        </Button>
      </DialogActions>
    </Modal>
  );
}
