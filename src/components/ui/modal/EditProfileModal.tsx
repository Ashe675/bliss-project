import React, { useState } from 'react';
import Modal from '@/components/ui/modal/Modal';
import GenericButton from '@/components/ui/buttons/GenericButton';
import { handleEditProfile } from '@/actions';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user, setUser }) => {
  const [newFirstName, setFirstName] = useState(user.firstName);
  const [newLastName, setLastName] = useState(user.lastName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleEditProfile(newFirstName, newLastName, setUser);
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
