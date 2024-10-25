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
