// actions/employee/get-employee-by-id.ts
import prisma from '@/lib/prisma'; // Importa tu instancia de Prisma
import { Role } from '@prisma/client';

export const getEmployeeById = async (id: string) => {
  try {
    const employee = await prisma.user.findUnique({
      where: { id: id }, // Solo buscamos por ID aquí
      include: {
        posts: true,          // Publicaciones del empleado
        reviewsGiven: true,   // Reseñas dadas por el empleado
        reviewsReceived: true // Reseñas recibidas por el empleado
      },
    });

    // Verificamos si el usuario encontrado es de rol 'employee'
    if (employee && employee.role === Role.employee) {
      return employee;
    } else {
      console.warn("El usuario no es un empleado o no existe.");
      return null;
    }

  } catch (error) {
    console.error("Error fetching employee:", error);
    return null;
  }
};
