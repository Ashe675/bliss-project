'use server';

import { signOut } from "@/auth.config";

export const logout = async () => {
    try {
        await signOut();
    } catch (error) {
        console.log(error)
        return 'Credentials SignOut'
    }
}