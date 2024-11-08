// app/profile/page.tsx
'use server';

import ProfilePage from '@/components/profile/ProfilePage'; // Asegura que esta ruta sea correcta
import { auth } from '@/auth.config'; // Asegura que auth esté configurado correctamente
import { Role } from '@prisma/client';
import { redirect } from 'next/navigation'; // Import correcto para redirecciones del lado del servidor

interface UserProfile {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  username: string;
  id: string;
  email: string;
  verified: boolean;
}

const Page = async () => {
  const session = await auth(); // Obtener la sesión desde el servidor

  // Verificación de sesión y redirección inmediata
  if (!session || !session.user || !session.user.id) {
    redirect('/login'); // Redirige si no está autenticado
  }

  const userD = session.user;

  // Crear el objeto `userProfile` basado en los datos de la sesión
  const userProfile: UserProfile = {
    firstName: userD.firstName || '',
    lastName: userD.lastName || '',
    avatarUrl: userD.image || '',
    username: userD.email || '',
    id: userD.id || '',
    email: userD.email || '',
    verified: userD.verified || false,
  };

  // Si no hay redirección, renderiza el perfil
  return <ProfilePage user={userProfile} />;
};

export default Page;
