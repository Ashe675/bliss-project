import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import getServerSession  from 'next-auth';
import { auth } from "@/auth.config" 

import { useSession } from 'next-auth/react';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    //const session = await getServerSession(auth);
    //const {data:session} = useSession();
  
    // if (!session) {
    //   return NextResponse.json({ message: 'No estás autenticado' }, { status: 401 });
    // }
  
    const userId = params.id; // Convierte el ID a número
  
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
      }
  
      const { password, ...userWithoutPassword } = user; // Excluye la contraseña
      return NextResponse.json(userWithoutPassword);
    } catch (error) {
      console.error('Error fetching user:', error);
      return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
    }
  }