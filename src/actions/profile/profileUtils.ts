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
import { isAuthenticate } from "@/utils";
import { Session } from "next-auth";
import { Role } from "@prisma/client";

interface Response {
  ok: boolean;
  status: number;
  data?: {
    user?: Session['user'] | {
      user: string;
      id: string;
      firstName: string;
      lastName: string;
      email: string | null;
      password: string;
      verified: boolean;
      profileImage: string | null;
      isActive: boolean | null;
      description: string | null;
      role: Role;
    }
  },
  message: string;
}


export const getUserProfile = async (): Promise<Response> => {
  const resAuth = await isAuthenticate()
  if (!resAuth.ok) return resAuth

  const { user } = resAuth.data!;

  try {
    const userProfile = await prisma.user.findUnique({
      where: { id: user.id },
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

    if (!userProfile) return {
      ok: false,
      status: 400,
      message: 'Usuario no encontrado!'
    };

    return {
      ok: true,
      status: 201,
      message : 'ok',
      data: {
        user: userProfile
      },
    };
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    return {
      ok: false,
      status: 500,
      message: 'Server internal error.',
    };
  }
};
