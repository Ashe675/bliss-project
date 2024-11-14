"use client";
// components/Avatar/Avatar.tsx
import { useState } from "react";
import Image from "next/image";
import { FaPen } from "react-icons/fa";
import ImageWidget from "../ui/image-widget/ImageWidget";
import { uploadProfileImage } from "@/actions";
import {
  notifyError,
  notifySuccess,
} from "../ui/toast-notification/ToastNotification";

interface AvatarProps {
  src: string | null; // src puede ser null o una cadena vacía
  alt: string;
  className? : string;
  onImageChange?: (newImage: string) => void; // Evento opcional para manejar el cambio de imagen
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, className }) => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  // Imagen genérica si no se proporciona una imagen válida
  const defaultImage = "/user/user-placeholder.webp"; // Ruta de la imagen genérica

  const handleSubmitImage = async (files: File[]) => {
    const formData = new FormData();
    formData.set("profileImage", files[0]);
    const response = await uploadProfileImage(formData);
    if (response.ok) {
      notifySuccess({ message: response.message });
    } else {
      notifyError({ message: response.message });
    }
    return response.ok;
  };

  const handleOpenWidget = () => {
    setIsWidgetOpen(true);
  };

  const handleCloseWidget = () => {
    setIsWidgetOpen(false);
  };

  return (
    <>
      <div className={`relative  ${className}`}>
        <Image
          className="rounded-full hover:scale-105 transition-transform duration-300 border-2 border-white/90"
          src={src || defaultImage}
          alt={alt}
          fill
          style={{ objectFit: "cover" }}
        />

        {/* Botón pequeño en el borde */}
        <button
          onClick={handleOpenWidget} // Abre el input de archivo
          className="absolute bottom-2 right-2 bg-primary text-white rounded-full p-2 hover:bg-primary-100 transition-colors duration-200 mx-auto hover:bg-amber-900"
          aria-label="Editar avatar"
        >
          <FaPen size={12}/>
        </button>
      </div>
      <ImageWidget
        closeWidget={handleCloseWidget}
        classNameImageItem=" border-2 border-white rounded-full"
        isWidgetOpen={isWidgetOpen}
        handleSubmitImage={handleSubmitImage}
        isSquare={true}
        maxFiles={1}
        maxSize={5}
      ></ImageWidget>
    </>
  );
};

export default Avatar;
