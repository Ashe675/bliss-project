"use client";
// components/profile/ProfilePage.tsx
import React, { useState } from "react";
import Avatar from "@/components/profile/Avatar"; // Asegúrate de importar el componente Avatar
import UserInfo from "@/components/profile/UserInfo"; // Asegúrate de importar el componente UserInfo
import GenericButton from "@/components/ui/buttons/GenericButton"; // Asegúrate de importar el componente GenericButton
import EditProfileModal from "@/components/ui/modal/EditProfileModal"; // Asegúrate de importar el componente EditProfileModal
import { MdEditSquare } from "react-icons/md"; // Asegúrate de importar el icono correspondiente

interface UserProfile {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  username: string;
  id: string;
  email: string;
  verified: boolean;
}

interface ProfilePageProps {
  user: UserProfile; // Mantenemos solo la propiedad user
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const [isModalOpen, setModalOpen] = useState(false); // Estado para manejar la apertura del modal

  return (
    <div className="w-[90%] mx-auto mt-10 p-5 shadow-md rounded-lg">
      <div className="flex justify-center">
        <Avatar src={user.avatarUrl} alt={user.username} className=" size-48" />
      </div>
      <UserInfo
        firstName={user.firstName}
        lastName={user.lastName}
        username = {user.username}
        email={user.email}
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
        user={user} // Manteniendo el usuario aquí para editar
      />
    </div>
  );
};

export default ProfilePage; // Asegúrate de que está exportado correctamente
