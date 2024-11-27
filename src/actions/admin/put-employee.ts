'use server';

import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';

interface UpdateEmployeeData {
  id: string; // Campo para identificar al usuario
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  password?: string;
  profileImage?: string | null;
  phoneNumber?: string | null;
  branchOfficeId?: string | null;
  role?: string;
}

export const putEmployee = async ({
  id,
  firstName,
  lastName,
  userName,
  email,
  password,
  profileImage,
  phoneNumber,
  branchOfficeId,
}: UpdateEmployeeData) => {
  try {
    // Verificar si el usuario existe
    const userExist = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExist) {
      return {
        ok: false,
        message: 'El usuario no existe.',
      };
    }

    // Verificar si el correo ya pertenece a otro usuario
    if (email) {
      const emailExist = await prisma.user.findFirst({
        where: {
          email: email.toLowerCase(),
          NOT: { id }, // Asegurar que no sea el mismo usuario
        },
      });

      if (emailExist) {
        return {
          ok: false,
          message: 'Ya existe un usuario con ese correo electrónico.',
        };
      }
    }

    // Verificar si el username ya pertenece a otro usuario
    if (userName) {
      const userNameExist = await prisma.user.findFirst({
        where: {
          user: userName.toLowerCase(),
          NOT: { id }, // Asegurar que no sea el mismo usuario
        },
      });

      if (userNameExist) {
        return {
          ok: false,
          message: 'Ese username no está disponible.',
        };
      }
    }

    // Hashear la nueva contraseña si se proporciona
    let hashedPassword = undefined;
    if (password) {
      hashedPassword = bcryptjs.hashSync(password, 10);
    }

    // Actualizar el usuario
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        user: userName?.toLowerCase(),
        email: email?.toLowerCase(),
        password: hashedPassword,
        profileImage,
        phoneNumber,
        branchOfficeId,
        role:'employee',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        user: true,
        email: true,
        role:  true,
      },
    });

    return {
      ok: true,
      user: updatedUser,
      message: 'Usuario actualizado exitosamente.',
    };
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return {
      ok: false,
      message: 'No se pudo actualizar el usuario.',
    };
  }
};
