"use client"; // Asegúrate de agregar esta línea al principio para indicar que es un Client Component
import React, { useEffect, useState } from 'react';
import ProfilePage from '@/components/profile/ProfilePage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Importa useRouter
import { Role } from '@prisma/client';

// Define la estructura del perfil de usuario
interface UserProfile {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  username: string;
  id: string;
  email: string;
  verified: boolean;
}

const Page = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const { data: session } = useSession();
  const router = useRouter(); // Inicializa useRouter

  // Verifica que el usuario esté autenticado
  const userId = session?.user?.id;
  const userD = session?.user;

  // Verifica el rol del usuario y redirige si es necesario
  useEffect(() => {
    if (!userD || !userId) {
      // Asegúrate de que userD y userId estén disponibles antes de proceder
      return;
    }

    if (userD.role === Role.employee) {
      router.push('/employee/profile'); // Redirige si el rol es employee
      return; // Asegúrate de salir de la función
    }

    const fetchUserData = async () => {
      try {
        // Combina los datos de la sesión y los datos del perfil
        const data: UserProfile = {
          firstName: userD.firstName || '',
          lastName: userD.lastName || '',
          avatarUrl: userD.image || '',
          username: userD.email || '',
          id: userD.id || userId,
          email: userD.email || '',
          verified: userD.verified || false,
        };

        setUser(data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData(); // Llama a la función fetchUserData
  }, [userId, userD, router]); // Dependencias actualizadas

  // Asegúrate de manejar el caso donde user es null
  if (!user) {
    return <div>Cargando...</div>; // O cualquier otro componente de carga
  }

  return <ProfilePage user={user} setUser={setUser} />;
};

export default Page;
