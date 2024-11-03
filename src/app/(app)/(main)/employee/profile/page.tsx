'use client';

import EmployeeInfo from '@/components/employee/EmployeeInfo';
import EmployeeReviews from '@/components/employee/EmployeeReviews';
import { useEffect, useState } from 'react';
import { Employee } from '@/interfaces';

interface EmployeeProfileProps {
  params: {
    id: string;
  };
}

const EmployeeProfile = ({ params }: EmployeeProfileProps) => {
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    // Ejemplo de datos de empleado
    const exampleEmployee: Employee = {
      id: params.id,
      name: 'John Doe',
      role: 'Barber',
      profileImageUrl: '/ui/profile/default-avatar.jpg', // Ruta de la imagen
      rating: 4.5,
      reviews: [
        {
          reviewerName: 'Alice',
          rating: 5,
          comment: 'Best haircut ever!',
          date: '2023-10-01',
        },
        {
          reviewerName: 'Bob',
          rating: 4,
          comment: 'Great service, will come again!',
          date: '2023-10-02',
        },
        {
          reviewerName: 'Charlie',
          rating: 3,
          comment: 'Average experience.',
          date: '2023-10-03',
        },
      ],
    };

    // Simulando la carga de datos
    setEmployee(exampleEmployee);
  }, [params.id]);

  if (!employee) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg mt-10">
      {/* Componente que contiene la foto y la información */}
      <EmployeeInfo 
        name={employee.name} 
        photoUrl={employee.profileImageUrl} 
        specialty={employee.role} 
        rating={employee.rating}
      />

      {/* Componente que muestra las reseñas */}
      <EmployeeReviews reviews={employee.reviews} />
    </div>
  );
};

export default EmployeeProfile;
