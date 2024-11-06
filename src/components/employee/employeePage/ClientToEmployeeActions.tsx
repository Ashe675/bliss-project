"use client";

import { useEffect, useState } from "react";
import CustomModal from "@/components/ui/modal/CustomModal";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { IconCarambolaFilled, IconMessageCirclePlus } from "@tabler/icons-react";
import RatingForm from "./RatingForm";


import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; 

interface Props {
  employeeId: string;
}


export const ClientToEmployeeActions: React.FC<Props> = ({ employeeId }) => {  const [isModalRatingOpen, setIsModalRatingOpen] = useState(false);
  const [isModalAppoinmentOpen, setIsModalAppoinmentOpen] = useState(false);
  // console.log("EMPLEADO",employeeId);




  const { data: session } = useSession();
  const router = useRouter(); // Inicializa useRouter

  const userId = session?.user?.id;

  console.log('USUARIO',userId);
  console.log('Emplaoyee',employeeId);
  
  

  // Verifica el rol del usuario y redirige si es necesario
  useEffect(() => {
    if (!userId) {
      // Asegúrate de que userD y userId estén disponibles antes de proceder
      return;
    }

    // console.log('USUARIO',userId);
    // console.log('Emplaoyee',employeeId);
    
    
    

    // if (userD.role === Role.employee) {
    //   router.push('/employee/profile'); // Redirige si el rol es employee
    //   return; // Asegúrate de salir de la función
    // }
    // const fetchUserData = async () => {
    //   try {
    //     // Combina los datos de la sesión y los datos del perfil
    //     const data: UserProfile = {
    //       firstName: userD.firstName || '',
    //       lastName: userD.lastName || '',
    //       avatarUrl: userD.image || '',
    //       username: userD.email || '',
    //       id: userD.id || userId,
    //       email: userD.email || '',
    //       verified: userD.verified || false,
    //     };

    //     setUser(data);
    //   } catch (error) {
    //     console.error("Error al obtener los datos del usuario:", error);
    //   }
    // };

    // fetchUserData(); // Llama a la función fetchUserData
  }, [userId, router]); // Dependencias actualizadas





  


  return (
    <div className='flex justify-between sm:justify-center space-x-10'>    

      <CustomButton type="primary" className="w-32" onClick={() => setIsModalRatingOpen(true)}>
        <div className="flex justify-center">
          <p>Calificar</p>
          <IconCarambolaFilled size={20} className="ml-2" />
        </div>
      </CustomButton>


      <CustomButton type="cancel" className="w-32" onClick={() => setIsModalAppoinmentOpen(true)}>
        <div className='flex justify-center'>
          <p>Contactar</p> 
          <IconMessageCirclePlus size={20} className="ml-2" />
        </div>          
      </CustomButton>

      <CustomModal isOpen={isModalRatingOpen} setIsOpen={setIsModalRatingOpen}>
          <RatingForm employeeId={employeeId}/>
      </CustomModal>

      <CustomModal isOpen={isModalAppoinmentOpen} setIsOpen={setIsModalAppoinmentOpen}>
          hola
      </CustomModal>
    </div>
  );
}
