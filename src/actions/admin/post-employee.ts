'use server';

import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';

interface CreateEmployeeData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  profileImage?: string | null;
  phoneNumber?: string | null;
  branchOfficeId?: string | null;
  role: string;
}

export const postEmployee = async ({
  firstName,
  lastName,
  userName,
  email,
  password,
  profileImage,
  phoneNumber = null,
  branchOfficeId,
}: CreateEmployeeData) => {
  try {


    const emailExist = await prisma.user.findFirst({
        where: {
          email: email.toLowerCase(),
        },
      });
      

    if (emailExist) {
      return {
        ok: false,
        message: 'Ya existe un usuario con ese correo electrónico.',
      };
    }
    const userNameExist = await prisma.user.findFirst({
        where: {
          user: userName.toLowerCase(),
        },
      });
      

    if (userNameExist) {
      return {
        ok: false,
        message: 'Ese username no esta disponible.',
      };
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        user: userName.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
        profileImage,
        phoneNumber,
        branchOfficeId,
        role: "employee",
        verified: false, 
        isActive: true, 
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        user: true,
        email: true,
        role: true,
      },
    });

    return {
      ok: true,
      user,
      message: 'Usuario creado exitosamente.',
    };
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return {
      ok: false,
      message: 'No se pudo crear el usuario.',
    };
  }
};
