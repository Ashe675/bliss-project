"use client";

import React, { ReactNode } from 'react';

interface GenericButtonProps {
  text: string;
  onClick?: () => void; // Evento opcional para manejar clics
  variant?: 'primary' | 'secondary' | 'danger'; // Variantes de estilo
  disabled?: boolean; // Botón deshabilitado opcional
  icon?: ReactNode; // Ícono opcional de React Icons u otro componente
}

const GenericButton: React.FC<GenericButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  disabled = false,
  icon, // Ícono opcional
}) => {
  // Estilos básicos para los botones según la variante
  const baseStyles =
    "relative px-4 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 flex items-center justify-center gap-2";
  const variantStyles = {
    primary: "btn-primary text-white hover:bg-ambar-600 focus:ring-ambar-300",
    secondary: "btn-secondary bg-secondary text-white hover:bg-ambar-600 focus:ring-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
  };

  // Combina los estilos base con los de la variante seleccionada
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  return (
    <button className={buttonStyles} onClick={onClick} disabled={disabled}>
      {icon && <span className="icon">{icon}</span>} {/* Renderiza el ícono si existe */}
      {text}
    </button>
  );
};

export default GenericButton;
