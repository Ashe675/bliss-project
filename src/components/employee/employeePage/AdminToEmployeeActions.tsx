"use client";

import { useState } from "react";
import CustomModal from "@/components/ui/modal/CustomModal";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { IconEdit, IconSquareXFilled } from "@tabler/icons-react";
import { RegisterEmployeeForm } from "@/components/admin/RegisterEmployeeForm";
import { DeleteEmployeeConfirmation } from "@/components/admin/DeleteEmployeeConfirmation";

interface Props {
  employeeId: string;
  employeeInfo: EmployeeInfo;
}
interface EmployeeInfo {
  id: string; // Campo obligatorio
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  password?: string;
  profileImage?: string | null;
  phoneNumber?: string | null;
  branchOfficeId?: string | null;
  role?: string;
}




export const AdminToEmployeeActions: React.FC<Props> = ({  employeeInfo }) => {
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

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
          <RegisterEmployeeForm isCreating={false} employeeInfo={employeeInfo}/>
        </CustomModal>

        <CustomModal
          isOpen={isModalDeleteOpen}
          closeModal={closeModalAppointment}
        >
          <DeleteEmployeeConfirmation 
            employeeInfo={employeeInfo} 
            closeModalAppointment={closeModalAppointment}
          />
        </CustomModal>
      </div>
    </div>
  );
};
