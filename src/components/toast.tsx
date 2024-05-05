import { Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          color: "#fff",
          backgroundColor: "#DEFBE6",
          borderWidth: "1px 1px 1px 1px",
          borderColor: "#10B981",
          borderRadius: "4px",
          maxWidth: "80%",
        },
        loading: {
          duration: 5000,
        },
      }}
    />
  );
}
