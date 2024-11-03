'use server';

export const handleEditProfile = (
    newFirstName: string, 
    newLastName: string, 
    setUser: React.Dispatch<React.SetStateAction<any>>
  ) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      firstName: newFirstName,
      lastName: newLastName,
    }));
    alert('Nombre de usuario actualizado!');
  };
  


import prisma from "@/lib/prisma"; // Ajusta la ruta según tu configuración
import { UserData } from "@/interfaces/user.interface"; // Ajusta la ruta según tu estructura



export const getUserProfileById = async (userId: string): Promise<UserData | null> => {
  try {
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        firstName: true,
        lastName: true,
        profileImage: true,
        user: true,
        id: true,
        description: true,
        email: true,
        isActive: true,
        verified: true,
        password: true, // Incluye el password
        role: true,     // Incluye el rol
      },
    });

    if (!userProfile) return null;

    return userProfile as UserData; 
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    return null;
  }
};
