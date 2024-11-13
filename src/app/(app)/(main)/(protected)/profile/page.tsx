'use server';

import ProfilePage from '@/components/profile/ProfilePage'; // Asegura que esta ruta sea correcta
import { redirect } from 'next/navigation'; // Import correcto para redirecciones del lado del servidor
import { getUserProfile } from '@/actions';

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

  // Verificación de sesión y redirección inmediata
  if (!ok || !data) {
    redirect('/login'); // Redirige si no está autenticado
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
