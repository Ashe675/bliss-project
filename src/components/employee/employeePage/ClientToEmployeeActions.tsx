"use client";

import { useState } from "react";
import CustomModal from "@/components/ui/modal/CustomModal";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import {
  IconCarambolaFilled,
  IconMessageCirclePlus,
} from "@tabler/icons-react";
import RatingForm from "./RatingForm";
import { AppointmentForm } from "./AppoinmentForm";
import { toast } from "react-toastify";  // Importamos el toast

interface Props {
  employeeId: string;
  canReview: boolean;
}

export const ClientToEmployeeActions: React.FC<Props> = ({ employeeId, canReview }) => {
  const [isModalRatingOpen, setIsModalRatingOpen] = useState(false);
  const [isModalAppoinmentOpen, setIsModalAppoinmentOpen] = useState(false);
  
  const closeModalAppointment = () => {
    setIsModalAppoinmentOpen(false);
  };

  const closeModalRaiting = () => {
    setIsModalRatingOpen(false);
  };

  const handleOpenRatingModal = () => {
    if (!canReview) {
      toast("Ya has hecho una reseña para este empleado.");
    } else {
      setIsModalRatingOpen(true);
    }
  };

  return (
    <div>
      <div className="flex space-x-10 justify-between sm:justify-center ">
        <CustomButton
          type="primary"
          className="w-32"
          onClick={handleOpenRatingModal} // Usamos la función aquí
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
          <RatingForm 
            employeeId={employeeId} 
            onReviewSubmit={closeModalRaiting}
          />
        </CustomModal>

        <CustomModal
          isOpen={isModalAppoinmentOpen}
          closeModal={closeModalAppointment}
        >
          <AppointmentForm 
            employeeId={employeeId} 
            onAppointmentSubmit={closeModalAppointment}
          />
        </CustomModal>
    
      </div>
    </div>
  );
};
