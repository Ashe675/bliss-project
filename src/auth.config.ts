import NextAuth, { Session } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import z from 'zod'
import bcryptjs from 'bcryptjs';

export const { handlers, signIn, signOut, auth} = NextAuth({
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/signup'
    },
    // session: {
    //     maxAge: 20
    // },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.data = user;
            }
            return token
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        session({ session, token }: { session: Session, token: any }) {

            session.user = token.data;
            return session
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ user: z.string(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null

                const { user, password } = parsedCredentials.data;

                const userFound = await prisma.user.findUnique({
                    where: {
                        user: user.toLowerCase()
                    }
                })

                if (!userFound) return null

                if (!bcryptjs.compareSync(password, userFound.password)) return null

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password: _, ...userWithoutPassword } = userFound;

                return userWithoutPassword;
            },
        }),
    ],
})