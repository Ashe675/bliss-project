import { Role } from "@prisma/client";

export interface UserData {
  firstName: string;
  lastName: string;
  user: string;
  email: string | null; // Puede ser null si Prisma lo permite
  password?: string; // Si no estás obteniendo este dato aquí, hazlo opcional
  role?: Role; // Hazlo opcional si no se está incluyendo en la query
  verified: boolean;
  profileImage: string | null; // Añade el campo de la imagen de perfil
  isActive: boolean | null; // Añade el campo de actividad
  description: string | null; // Añade el campo de descripción
}


export interface EmployeeData {
    branchOfficeId: string;
    description: string | null;
    email: string;
    firstName: string;
    id: string;
    isActive: boolean;
    lastName: string;
    password: string;
    phoneNumber: string | null;
    profileImage: string | null;
    role: Role;
    user: string;
    verified: boolean;
}