
// export default function ProfilePage() {
//   return (
//     <div>
//       <h1>Profile Page</h1>
//     </div>
//   );
// }

// Profile/page.tsx

"use client"; 
import React from 'react';
import Avatar from '@/components/profile/Avatar';
import UserInfo from '@/components/profile/UserInfo';
import EditProfileForm from '@/components/profile/EditProfileForm';
import GenericButton from '@/components/ui/buttons/GenericButton';
import { FaKey  } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";

function ProfilePage() {
  const user = {
    firstName:"Juan",
    lastName:"Perez",
    avatarUrl: "/test/Ejemplo.webp",
    username:"Juansa503",
    idUser:2,
    description:"Desarrollador frontend apasionado por la tecnología.",
    email:"juan.perez@example.com",
    joinedDate:"2023-05-15T00:00:00.000Z",
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
          onClick={() => alert('Reinicaida!')} 
          variant="secondary" 
          icon={<FaKey />}  // Icono de la flecha hacia abajo para reiniciar contraseña
        />
        <GenericButton 
          text="Editar Perfil" 
          onClick={() => alert('Editado!')} 
          variant="secondary"
          icon={<MdEditSquare />}  
        />
      </div>

      
    </div>
  );
}

export default ProfilePage;
