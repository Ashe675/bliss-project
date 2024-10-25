// Profile/page.tsx

"use client"; 
import React, { useState } from 'react';
import Avatar from '@/components/profile/Avatar';
import UserInfo from '@/components/profile/UserInfo';
import GenericButton from '@/components/ui/buttons/GenericButton';

import { FaKey } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import Modal from '@/components/ui/modal/Modal';

function ProfilePage() {
  // Estado del usuario
  const [user, setUser] = useState({
    firstName: "Juan",
    lastName: "Perez",
    avatarUrl: "/test/Ejemplo.webp",
    username: "Juansa503",
    idUser: 2,
    description: "Desarrollador frontend apasionado por la tecnología.",
    email: "juan.perez@example.com",
    joinedDate: "2023-05-15T00:00:00.000Z",
  });

  // Estado para controlar el modal
  const [isModalOpen, setModalOpen] = useState(false);


    // Estado para el input controlado
    const [newFirstName, setFirstName] = useState(user.firstName);
    const [newLastName, setLastName] = useState(user.lastName);

    // Función para manejar la edición del nombre de usuario
    const handleEditProfile = (newFirstName: string, newLastName: string) => {
      setUser((prevUser) => ({
        ...prevUser,
        firstName: newFirstName,
        lastName: newLastName,

      }));
      alert('Nombre de usuario actualizado!');
    };

  return (
    <div className="w-[90%] mx-auto mt-10 p-5 shadow-md rounded-lg">
      <div className="flex justify-center">
        <Avatar src={user.avatarUrl} alt={user.username} />
      </div>
      <UserInfo
        firstName={user.firstName}  
        lastName={user.lastName}
        idUser={user.idUser}
        username={user.username} 
        description={user.description}
        email={user.email}
        joinedDate={user.joinedDate}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <GenericButton 
          text="Reiniciar Contraseña" 
          onClick={() => alert('Reiniciada!')} 
          variant="secondary" 
          icon={<FaKey />}  
        />
        <GenericButton 
          text="Editar Perfil" 
          onClick={() => setModalOpen(true)}  // Abre el modal al hacer clic
          variant="secondary"
          icon={<MdEditSquare />}  
        />
      </div>

      {/* Modal flexible que acepta cualquier contenido */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl mb-4">Editar Informacion</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditProfile(newFirstName, newLastName); // Usa el valor actualizado del estado
          }}
        >
          <p>Primer Nombre</p>
          <input
            name="FirstName"
            placeholder="Primer Nombre"
            value={newFirstName} // Estado controlado
            onChange={(e) => setFirstName(e.target.value)} // Actualiza el estado cuando el usuario escribe
            className="w-full border border-gray-300 p-2 rounded-lg mb-4 text-black"
          />
          <br />
          <p>Apellido</p>
          <input
            name="LastName"
            placeholder="Apellido"
            value={newLastName} // Estado controlado
            onChange={(e) => setLastName(e.target.value)} // Actualiza el estado cuando el usuario escribe
            className="w-full border border-gray-300 p-2 rounded-lg mb-4 text-black"
          />
          <div className="flex justify-end">
            <GenericButton text="Guardar" variant="primary" />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ProfilePage;
