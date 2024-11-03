"use client"; // Asegúrate de agregar esta línea al principio para indicar que es un Client Component
import React, { useState } from 'react';
import ProfilePage from '@/components/profile/ProfilePage';

const Page = () => {

  const [user, setUser] = useState({
    avatarUrl: '',
    username: 'Usuario123',
    firstName: 'John',
    lastName: 'Doe',
    id: '1',
    description: 'Descripción del usuario',
    email: 'user@example.com',
    joinedDate: '2023-01-01',
    verified: true,
  });

  return <ProfilePage user={user} setUser={setUser} />;
};

export default Page;
