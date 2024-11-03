'use server';

import { auth } from "@/auth.config";
import { Role } from "@prisma/client";

export const isAuthenticate = async () => {
    const session = await auth();
    return session?.user ? {
        ok: true,
        status: 200,
        message: 'Autenticado.',
        data: {
            user: session.user
        }
    } : {
        ok: false,
        status: 401,
        message: 'Acceso denegado.'
    }
}

export const authorizeRole = async (roles: Role[]) => {
    const session = await auth();

    if (!session?.user) return {
        ok: false,
        status: 401,
        message: 'Acceso denegado.'
    }

    return roles.includes(session.user.role)
        ? {
            ok: true,
            status: 200,
            message: 'Autorizado',
            data: {
                user: session.user
            }
        }
        : {
            ok: false,
            status: 401,
            message: 'Acceso denegado.'
        }
}