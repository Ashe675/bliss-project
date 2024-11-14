'use server';

import ProfilePage from '@/components/profile/ProfilePage'; // Asegura que esta ruta sea correcta
import { notFound } from 'next/navigation'; // Import correcto para redirecciones del lado del servidor
import { getUserProfile } from '@/actions';
import { auth } from '@/auth.config';

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
  const {ok , data } = await getUserProfile();
  const session = await auth();

  if (session?.user.role === "employee") return notFound();

  // Verificación de sesión y redirección inmediata
  if (!ok || !data) {
    notFound(); 
  }

  const userD = data.user!;

  // Crear el objeto `userProfile` basado en los datos de la sesión
  const userProfile: UserProfile = {
    firstName: userD.firstName || '',
    lastName: userD.lastName || '',
    avatarUrl: userD.profileImage || '',
    username: userD.email || '',
    id: userD.id || '',
    email: userD.email || '',
    verified: userD.verified || false,
  };

  // Si no hay redirección, renderiza el perfil
  return <ProfilePage user={userProfile} />;
};

export default Page;
