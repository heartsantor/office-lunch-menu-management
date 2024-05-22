import { toast, ToastOptions } from "react-toastify";

const position: ToastOptions = {
  theme: "light",
  position: "top-right",
  autoClose: 1000,
};

export const toastAlert = (
  type: "success" | "error" | "warning",
  value: string
) => {
  if (type === "success") {
    toast.success(value, position);
  } else if (type === "error") {
    toast.error(value, position);
  } else if (type === "warning") {
    toast.warning(value, position);
  }
};
