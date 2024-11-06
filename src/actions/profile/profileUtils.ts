'use server';

export const handleEditProfile = async (firstName: string, lastName: string) => {
  try {
    // Implementa la lógica para actualizar el perfil, por ejemplo:
    const response = await fetch('/api/update-profile', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el perfil');
    }

    const updatedUser = await response.json();
    return updatedUser; // Retorna el usuario actualizado
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    return null; // O maneja el error de la manera que prefieras
  }
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
