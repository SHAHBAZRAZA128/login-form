import { toast } from "react-toastify";

export function useNotification() {
  return (notification, typeOptions, options) => {
    const defaultOptions = {
      position: "top-right",
    };

    toast.dismiss();
    const mergedOptions = {
      ...defaultOptions,
      ...options,
    };

    if (typeOptions !== "default") {
      toast[typeOptions](notification, mergedOptions);
    } else {
      toast(notification, mergedOptions);
    }
  };
}
