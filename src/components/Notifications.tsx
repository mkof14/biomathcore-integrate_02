"use client";

import { toast, ToastContainer, type TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showNotification = (message: string, type: TypeOptions = "info") => {
  toast(message, { type });
};

export default function Notifications() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
    />
  );
}
