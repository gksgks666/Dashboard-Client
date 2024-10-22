import { toast as Toast, ToastOptions } from "react-hot-toast";
import { isEmpty } from "@/utils/isEmpty";

export const toast = (
  message: string,
  option = {},
): ReturnType<typeof Toast> => {
  const toastDefaultOption: ToastOptions = isEmpty(option)
    ? {
        duration: 7000,
        style: { fontSize: "16px", padding: "20px" },
      }
    : option;

  return Toast(message, toastDefaultOption);
};
