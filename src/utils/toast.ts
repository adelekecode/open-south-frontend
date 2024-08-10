import { toast } from "react-hot-toast";

export const notifySuccess = (message: string) =>
  toast.success(message, {
    style: {
      backgroundColor: "#DEFBE6",
      borderColor: "#24A148",
      color: "#24A148",
    },
  });

export const notifyError = (message: string) =>
  toast.error(message, {
    icon: "⛔",
    style: {
      backgroundColor: "#FFF1F1",
      borderColor: "#DA1E28",
      color: "#DA1E28",
    },
  });

export const notifyInfo = (message: string) =>
  toast.error(message, {
    icon: "ℹ️",
    style: {
      backgroundColor: "#FFF1F1",
      borderColor: "#DA1E28",
      color: "#DA1E28",
    },
  });
