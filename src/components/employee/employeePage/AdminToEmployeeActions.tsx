"use client";

import { useState } from "react";
import CustomModal from "@/components/ui/modal/CustomModal";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { IconEdit, IconSquareXFilled } from "@tabler/icons-react";

interface Props {
  employeeId: string;
}

export const AdminToEmployeeActions: React.FC<Props> = ({ employeeId }) => {
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);


  console.log("Emplaoyee", employeeId);

  const closeModalAppointment = () => {
    setIsModalDeleteOpen(false);
  };

  const closeModalRaiting = () => {
    setIsModalUpdateOpen(false);
  };


  return (
    <div>
      <div className="flex space-x-10 justify-between sm:justify-center ">
        <CustomButton
          type="primary"
          className="w-32"
          onClick={() => setIsModalUpdateOpen(true)}
        >
          <div className="flex justify-center">
            <p>Editar</p>
            <IconEdit size={20} className="ml-2" />
          </div>
        </CustomButton>

        <CustomButton
          type="cancel"
          className="w-32"
          onClick={() => setIsModalDeleteOpen(true)}
        >
          <div className="flex justify-center">
            <p>Eliminar</p>
            <IconSquareXFilled size={20} className="ml-2" />
          </div>
        </CustomButton>
      </div>

      <div>
        <CustomModal isOpen={isModalUpdateOpen} closeModal={closeModalRaiting}>
          Aqui va el formulario para editar la informacion del empleado
        </CustomModal>

        <CustomModal
          isOpen={isModalDeleteOpen}
          closeModal={closeModalAppointment}
        >
          Aqui va el mensaje para que el admin confirme eliminar el empleado
        </CustomModal>
      </div>
    </div>
  );
};
