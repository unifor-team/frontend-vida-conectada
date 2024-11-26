import toast from "react-hot-toast";

export function notifySuccess(msg: string) {
  return () => toast.success(msg);
}

export function notifyFail(msg: string) {
  return () => toast.error(msg);
}