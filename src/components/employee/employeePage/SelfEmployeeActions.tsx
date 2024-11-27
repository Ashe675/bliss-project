"use client";

import { useEffect, useState } from "react";
import CustomModal from "@/components/ui/modal/CustomModal";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import {
  IconCirclePlus,
} from "@tabler/icons-react";

import { useSession } from "next-auth/react";

interface Props {
  employeeId: string;
}

export const SelfEmployeeActions: React.FC<Props> = ({ employeeId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [canRender, setCanRender] = useState(false);

  const { data: session } = useSession();

  const userId = session?.user?.id;
  
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (userId === employeeId) {
      setCanRender(true);
    } else {
      setCanRender(false);
    }
  }, [userId, employeeId]);

  if (!canRender) {
    return <></>;
  }
  return (
    <div>
      <div className="flex space-x-10 justify-between sm:justify-center ">
        <CustomButton
          type="cancel"
          className="w-32"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex justify-center">
            <p>Subir Corte</p>
            <IconCirclePlus size={20} className="ml-2" />
          </div>
        </CustomButton>
      </div>

      <div>
        <CustomModal isOpen={isOpen} closeModal={closeModal}>
            Aqui va el formulario para que el barbero suba sus fotos
        </CustomModal>
      </div>
    </div>
  );
};
