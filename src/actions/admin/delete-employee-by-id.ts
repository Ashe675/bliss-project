'use server';

import prisma from "@/lib/prisma";


export const deleteEmployee = async (id: string) => {
  try {
    const userExist = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExist) {
      return {
        ok: false,
        message: "El usuario no existe.",
      };
    }

    await prisma.user.delete({
      where: { id },
    });

    return {
      ok: true,
      message: "Usuario eliminado exitosamente.",
    };
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return {
      ok: false,
      message: "No se pudo eliminar el usuario.",
    };
  }
};
