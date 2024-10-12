import toast, { ToastOptions } from "react-hot-toast";
import { isEmpty } from "@/utils/customFn";

export const useToast = (
  message: string,
  option = {},
): ReturnType<typeof toast> => {
  const toastDefaultOption: ToastOptions = isEmpty(option)
    ? {
        duration: 7000,
        style: { fontSize: "16px", padding: "20px" },
      }
    : option;

  return toast(message, toastDefaultOption);
};
