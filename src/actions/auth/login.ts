'use server';

import { AuthError } from "next-auth";
import { signIn } from '@/auth.config';


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false,
        });

        return "Success"

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        return 'UnknownError'
    }
}


export const login = async (user: string, password: string) => {
    try {
        await signIn('credentials', { user : user.toLowerCase(), password })

        return {
            ok: true,
            message : 'Success'
        }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        ok: false,
                        message: 'Credenciales inválidas.'
                    };
                default:
                    return {
                        ok: false,
                        message: 'Credenciales inválidas.'
                    };
            }
        }
        return {
            ok: false,
            message: 'Error al iniciar sesión.'
        }
    }
}