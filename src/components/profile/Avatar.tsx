'use client';
// components/Avatar/Avatar.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { FaPen } from "react-icons/fa";

interface AvatarProps {
  src: string | null; // src puede ser null o una cadena vacía
  alt: string;
  onImageChange?: (newImage: string) => void; // Evento opcional para manejar el cambio de imagen
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Almacena la imagen seleccionada

  // Imagen genérica si no se proporciona una imagen válida
  const defaultImage = "/ui/profile/default-avatar.jpg"; // Ruta de la imagen genérica

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Crea una URL temporal para la imagen seleccionada
      setSelectedImage(imageUrl); // Actualiza la imagen seleccionada localmente
      if (onImageChange) {
        onImageChange(imageUrl); // Llama al evento en caso de que se pase
      }
    }
  };

  return (
    <div className="relative w-48 h-48">
      <Image
        className="rounded-full hover:scale-105 transition-transform duration-300"
        src={selectedImage || src || defaultImage} // Muestra la imagen seleccionada, luego la original o la imagen genérica
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 48rem"
        style={{ objectFit: 'cover' }}
      />

      {/* Input de archivo oculto */}
      <input
        type="file"
        accept="image/*"
        id="avatar-upload"
        className="hidden"
        onChange={handleImageChange}
      />

      {/* Botón pequeño en el borde */}
      <button
        onClick={() => document.getElementById('avatar-upload')?.click()} // Abre el input de archivo
        className="absolute bottom-2 right-2 bg-primary text-white rounded-full p-2 hover:bg-primary-100 transition-colors duration-200"
        aria-label="Editar avatar"
      >
        <FaPen />
      </button>
    </div>
  );
};

export default Avatar;
