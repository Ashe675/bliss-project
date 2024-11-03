"use client"; // Esto indica que es un Client Component
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getSession } from 'next-auth/react';

// Define la estructura del perfil de usuario
interface UserProfile {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  username: string;
  id: string;
  description: string;
  email: string;
  joinedDate: string;
  isActive: boolean;
  verified: boolean;
}

// Define la estructura del contexto de usuario
interface UserContextType {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

// Crea el contexto de usuario
const UserContext = createContext<UserContextType | undefined>(undefined);

// Crea un hook personalizado para acceder al contexto de usuario
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

// Crea el proveedor de contexto
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    // Intenta recuperar el usuario de la caché/localStorage si está disponible
    if (typeof window !== "undefined") {
      const cachedUser = localStorage.getItem("user");
      return cachedUser ? JSON.parse(cachedUser) : null; // Retorna el usuario almacenado o null
    }
    return null;
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const session = await getSession();
      const userId = session?.user?.id;
      if (userId) {
        const res = await fetch(`/api/users/${userId}`);
        const data = await res.json();
        setUser(data);
        // Guarda el usuario en el localStorage
        localStorage.setItem("user", JSON.stringify(data));
      }
    };

    // Solo hace la petición si no hay usuario en caché
    if (!user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
