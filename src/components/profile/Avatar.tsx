// components/Avatar/Avatar.tsx
import React from 'react';
import Image from 'next/image';

import { FaPen } from "react-icons/fa";


interface AvatarProps {
  src: string;
  alt: string;
  onButtonClick?: () => void; // Añadido un evento opcional para el botón
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, onButtonClick }) => {
  return (
    <div className="relative w-48 h-48">
      <Image
        className="rounded-full hover:scale-105 transition-transform duration-300"
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 48rem"
        style={{ objectFit: 'cover' }}
      />

      {/* Botón pequeño en el borde */}
      <button
        onClick={onButtonClick}
        className="absolute bottom-2 right-2 bg-primary text-white rounded-full p-2 hover:bg-primary-100 transition-colors duration-200"
        aria-label="Editar avatar"
      >
        <FaPen/>
      </button>
    </div>
  );
};

export default Avatar;
