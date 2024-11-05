// app/profile/page.tsx
'use server';

import ProfilePage from '@/components/profile/ProfilePage'; // Verifica que esta ruta sea correcta
import { auth } from '@/auth.config'; // Asegúrate de que esté configurado correctamente
import { Role } from '@prisma/client';
import { redirect } from 'next/navigation'; // Importa `redirect` para manejar redirecciones en el lado del servidor

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
  try {
    const session = await auth(); // Obtenemos la sesión desde el servidor

    if (!session || !session.user || !session.user.id) {
      // Redirige a la página de login si no hay sesión
      return <div className="text-red-500">Error: User not authenticated</div>;
    }

    const userD = session.user;

    // Verifica el rol del usuario y redirige si es necesario
    if (userD.role === Role.employee) {
      // Redirige al perfil de empleado si el rol es `employee`
      redirect('/employee/profile');
    }

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

    return <ProfilePage user={userProfile} />; // Asegúrate de que aquí se está pasando correctamente el objeto `user`
  } catch (err: any) {
    return (
      <div className="text-red-500">Error: {err.message || 'Error fetching profile data'}</div>
    );
  }
};

export default Page;
