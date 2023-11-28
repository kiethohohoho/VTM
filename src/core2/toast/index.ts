import type React from 'react';
import { toast, type ToastOptions } from 'react-toastify';

export enum ENUMS_TOAST {
  ERROR = 1,
  SUCCESS,
  INFO,
  WARNING,
}

// ToastOptions extends CommonOptions, which contains the common properties for all toast types, such as position, autoClose, pauseOnHover, etc.
// ToastOptions also has some specific properties for each toast type, such as className, style, type, progress, delay, etc.
// You can use ToastOptions to customize the appearance and behavior of your toast components.
const toastDefault = (type: ENUMS_TOAST, content: React.ReactNode | string, options?: ToastOptions) => {
  const option = {
    position: options?.position || 'top-right',
    autoClose: options?.autoClose || 1_500,
    hideProgressBar: options?.hideProgressBar || true,
    closeOnClick: options?.closeOnClick || true,
    pauseOnHover: options?.pauseOnHover || true,
    draggable: options?.draggable || true,
    progress: undefined,
    theme: options?.theme || 'colored',
  };
  switch (type) {
    case ENUMS_TOAST.ERROR:
      toast.error(content, option);
      break;
    case ENUMS_TOAST.INFO:
      toast.info(content, option);
      break;
    case ENUMS_TOAST.SUCCESS:
      toast.success(content, option);
      break;
    case ENUMS_TOAST.WARNING:
      toast.warning(content, option);
      break;
    default:
      break;
  }
};

export default toastDefault;
