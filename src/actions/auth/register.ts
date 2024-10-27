'use server';

import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';

interface RegisterUserData {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export const registerUser = async ({ firstName, lastName, email, password }: RegisterUserData) => {
    try {

        const userExist = await prisma.user.findUnique({
            where: {
                user: email.toLowerCase()
            }
        })

        if (userExist) return {
            ok: false,
            message: 'Ya existe un usuario con ese correo electrónico.'
        }

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                user: email.toLowerCase(),
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password)
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                user: true,
                email: true,
            }
        })

        return {
            ok: true,
            user: user,
            message: 'Usuario Creado!'
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo crear el usuario'
        }
    }
}