"use client";

import { useState } from "react";
import CustomModal from "@/components/ui/modal/CustomModal";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import {
  IconCarambolaFilled,
  IconMessageCirclePlus,
} from "@tabler/icons-react";
import RatingForm from "./RatingForm";


interface Props {
  employeeId: string;
}

export const ClientToEmployeeActions: React.FC<Props> = ({ employeeId }) => {
  const [isModalRatingOpen, setIsModalRatingOpen] = useState(false);
  const [isModalAppoinmentOpen, setIsModalAppoinmentOpen] = useState(false);
  

  console.log("Emplaoyee", employeeId);

  const closeModalAppointment = () => {
    setIsModalAppoinmentOpen(false);
  };

  const closeModalRaiting = () => {
    setIsModalRatingOpen(false);
  };


  return (
    <div>
      <div className="flex space-x-10 justify-between sm:justify-center ">
        <CustomButton
          type="primary"
          className="w-32"
          onClick={() => setIsModalRatingOpen(true)}
        >
          <div className="flex justify-center">
            <p>Calificar</p>
            <IconCarambolaFilled size={20} className="ml-2" />
          </div>
        </CustomButton>

        <CustomButton
          type="cancel"
          className="w-32"
          onClick={() => setIsModalAppoinmentOpen(true)}
        >
          <div className="flex justify-center">
            <p>Contactar</p>
            <IconMessageCirclePlus size={20} className="ml-2" />
          </div>
        </CustomButton>
      </div>

      <div>
        <CustomModal isOpen={isModalRatingOpen} closeModal={closeModalRaiting}>
          <RatingForm employeeId={employeeId} />
        </CustomModal>

        <CustomModal
          isOpen={isModalAppoinmentOpen}
          closeModal={closeModalAppointment}
        >
          hola
        </CustomModal>
    
      </div>
    </div>
  );
};
