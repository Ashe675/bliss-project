"use client";
import "react-toastify/dist/ReactToastify.min.css";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import {
  IconAlertTriangleFilled,
  IconSquareRoundedCheckFilled,
} from "@tabler/icons-react";

interface CustomToastOptions extends ToastOptions {
  message: string;
}

export const ToastNotification = () => {
  return (
    <ToastContainer
      toastStyle={{ background: "#311502", color: "#fff" }}
      theme="colored"
      progressStyle={{ background: "#9a5d3d" }}
    />
  );
};

// Notificaciones específicas con estilos de iconos y barra de progreso
export const notifySuccess = ({ message, ...options }: CustomToastOptions) => {
  toast.success(message, {
    icon: <IconSquareRoundedCheckFilled  className=" text-green-500"  />, // Icono de éxito
    ...options,
  });
};

export const notifyError = ({ message, ...options }: CustomToastOptions) => {
  toast.error(message, {
    icon: <IconAlertTriangleFilled color="#dc2626" />, // Icono de error
    ...options,
  });
};

export const notifyLoading = ({ message, ...options }: CustomToastOptions) => {
  toast.loading(message, {
    ...options,
  });
};
