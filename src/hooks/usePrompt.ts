import { useContext } from "react";
import { DialogContext } from "~/providers/dialog";

type DialogProps = {
  title: string;
  description: string;
  isLoading?: boolean;
};

const usePrompt = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }

  const { openDialog } = context;

  return ({ title, description, isLoading }: DialogProps) =>
    openDialog({ title, description, isLoading });
};

export default usePrompt;
