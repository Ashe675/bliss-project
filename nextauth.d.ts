import {DefaultSession} from "next-auth";

declare module 'next-auth' {
    interface Session {
        user : {
            id: string;
            user: string;
            firstName: string;
            lastName: string;
            email: string;
            verified?: boolean;
            role: "user" | "admin" | "employee";
            profileImage? : string
        } & DefaultSession['user']
    }
}