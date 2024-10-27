import {DefaultSession} from "next-auth";

declare module 'next-auth' {
    interface Session {
        user : {
            id: string;
            user: string;
            fisrtName: string;
            lastName: string;
            email: string;
            verified?: boolean;
            role: string;
            profileImage? : string
        } & DefaultSession['user']
    }
}