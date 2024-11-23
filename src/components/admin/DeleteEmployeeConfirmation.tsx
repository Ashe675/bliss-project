'use client';

import React, { useState } from 'react'
import { CustomButton } from '../ui/buttons/CustomButton';
import { deleteEmployee } from '@/actions/admin/delete-employee-by-id';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { IconAlertTriangle } from '@tabler/icons-react';

interface Props {
    employeeInfo: {
        id: string; 
        firstName?: string;
        lastName?: string;
        userName?: string;
        email?: string;
        password?: string;
        profileImage?: string | null;
        phoneNumber?: string | null;
        branchOfficeId?: string | null;
        role?: string;
    };
    closeModalAppointment: () => void;
}

export const DeleteEmployeeConfirmation = ({employeeInfo, closeModalAppointment}:Props) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const id = employeeInfo.id;

    const deleteAction = async () => {

        await toast.promise(
            
            deleteEmployee(id), {
              pending: "Eliminado empleado...",
              success: "¡Eliminado exitosamente!",
              error: "Error al eliminar al empleado. Inténtalo nuevamente.",
        })
        .then(() => {
              setIsLoading(false);
              console.log(isLoading);
              closeModalAppointment();
              router.push('/admin/employees');
        })
        .catch((error) => {
              console.error(error); 
        });
    }
    

  return (

<div className="p-6 max-w-md mx-auto">
  <h2 className="text-2xl font-bold text-white mb-4 text-center">
    Eliminar a {employeeInfo.firstName} {employeeInfo.lastName}
  </h2>
  <p className="text-gray-100 mb-2 text-center">
    <IconAlertTriangle size={24} className="text-red-500 inline-block mr-2" />
    Esta acción no se puede deshacer
    <IconAlertTriangle size={24} className="text-red-500 inline-block ml-2" />
  </p>
  <p className="text-gray-200 mb-6 text-center">
    ¿Está seguro de eliminar a este empleado?
  </p>
  <div className="flex gap-4 justify-center">
    <CustomButton
      type="primary"
      className="w-32 hover:shadow-md"
      onClick={closeModalAppointment}
    >
      <div className="flex justify-center">
        <p>Cancelar</p>
      </div>
    </CustomButton>
    <CustomButton
      type="cancel"
      disabled={isLoading}
      className="w-32 hover:shadow-md"
      onClick={deleteAction}
    >
      <div className="flex justify-center">
        <p>{isLoading ? 'Cargando' : 'Eliminar' }</p>
      </div>
    </CustomButton>
  </div>
</div>

  )
}
