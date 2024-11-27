'use client';
import React, { useState } from 'react';
import Modal from '@/components/ui/modal/Modal';
import GenericButton from '@/components/ui/buttons/GenericButton';
import { handleEditProfile } from '@/actions';

interface UserProfile {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  username: string;
  id: string;
  email: string;
  verified: boolean;
}


interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile ; // Puedes definir un tipo más específico si lo deseas
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user }) => {
  const [newFirstName, setFirstName] = useState(user.firstName);
  const [newLastName, setLastName] = useState(user.lastName);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí llamamos a la función handleEditProfile
    const updatedUser = await handleEditProfile(newFirstName, newLastName);
    if (updatedUser) {
      // Puedes hacer algo con el usuario actualizado aquí si es necesario
      console.log("Perfil actualizado:", updatedUser);
    }
    
    onClose(); // Cerrar modal después de actualizar
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl mb-4">Editar Información</h2>
      <form onSubmit={handleSubmit}>
        <p>Primer Nombre</p>
        <input
          name="FirstName"
          placeholder="Primer Nombre"
          value={newFirstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-lg mb-4 text-white bg-tertiary"
        />
        <p>Apellido</p>
        <input
          name="LastName"
          placeholder="Apellido"
          value={newLastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-lg mb-4 text-white bg-tertiary"
        />
        <div className="flex justify-end">
          <GenericButton text="Guardar" variant="primary" />
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
