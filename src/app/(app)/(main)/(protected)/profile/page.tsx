"use client";
import React, { useState } from 'react';
import Avatar from '@/components/profile/Avatar';
import UserInfo from '@/components/profile/UserInfo';
import GenericButton from '@/components/ui/buttons/GenericButton';
import Modal from '@/components/ui/modal/Modal';
import EditProfileModal from '@/components/ui/modal/EditProfileModal';
import { handleEditProfile } from '@/actions';
import { MdEditSquare } from "react-icons/md";

function ProfilePage() {
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

  // Estado para el modal
  const [isModalOpen, setModalOpen] = useState(false);

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

      <div className="relative max-w-72 grid grid-cols-1 gap-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <GenericButton 
          text="Editar Nombre" 
          onClick={() => setModalOpen(true)}
          variant="primary"
          icon={<MdEditSquare />}
        />
      </div>

      {/* Modal para editar perfil */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        user={user}
        setUser={setUser}
      />
    </div>
  );
}

export default ProfilePage;
