import { Role } from "@prisma/client";

export interface UserData {
    firstName: string;
    lastName: string;
    user: string;
    email: string;
    password: string;
    verified: boolean;
    role: Role;
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