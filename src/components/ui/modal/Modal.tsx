// components/Modal/Modal.tsx

import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean; // Controla si el modal está abierto o cerrado
  onClose: () => void; // Función para cerrar el modal
  children: ReactNode; // El contenido del modal puede ser cualquier cosa
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // No renderiza nada si el modal no está abierto

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#180A00] text-white max-w-md p-6 rounded-lg shadow-lg relative">
        {/* Botón para cerrar el modal */}
        <button
          className="absolute top-4 right-4 text-red-900 hover:text-gray-600"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✖
        </button>
        {/* Contenido dinámico del modal */}
        {children}
      </div>
    </div>


  );
};

export default Modal;
