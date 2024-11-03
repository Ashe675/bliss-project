"use client"; // Esto indica que es un Client Component
import React, { useState } from 'react';
import Avatar from '@/components/profile/Avatar';
import UserInfo from '@/components/profile/UserInfo';
import GenericButton from '@/components/ui/buttons/GenericButton';
import EditProfileModal from '@/components/ui/modal/EditProfileModal';
import { MdEditSquare } from "react-icons/md";
import { useUserContext } from '@/context/UserContext'; // Cambiado a useUserContext

const ProfilePage: React.FC = () => {
  const { user, setUser } = useUserContext(); // Obtén los datos y el método setUser desde el contexto
  const [isModalOpen, setModalOpen] = useState(false);

  // Si el usuario es null, significa que aún se está cargando la información
  if (!user) {
    return null; // No muestra nada si no hay usuario en caché
  }

  return (
    <div className="w-[90%] mx-auto mt-10 p-5 shadow-md rounded-lg">
      <div className="flex justify-center">
        <Avatar src={user.avatarUrl} alt={user.username} />
      </div>
      <UserInfo
        firstName={user.firstName}
        lastName={user.lastName}
        id={user.id}
        description={user.description}
        email={user.email}
        joinedDate={user.joinedDate}
        verified={user.verified}
      />
      <div className="relative max-w-72 grid grid-cols-1 gap-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <GenericButton
          text="Editar Nombre"
          onClick={() => setModalOpen(true)}
          variant="primary"
          icon={<MdEditSquare />}
        />
      </div>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        user={user}
        setUser={setUser}
      />
    </div>
  );
};

export default ProfilePage;
