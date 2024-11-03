"use client";

import { AppoinmentWithUsers } from "@/interfaces";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IconDotsVertical, IconXboxXFilled } from "@tabler/icons-react";
import Image from "next/image";
import { formatDateTo12Hour } from "../../../lib/date/date";
import { useSession } from "next-auth/react";
import CustomModal from "@/components/ui/modal/CustomModal";
import { useState } from "react";

interface Props {
  appointment: AppoinmentWithUsers;
}

export default function AppoinmentListItem({ appointment }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const isTheSameUser = session?.user.id === appointment.userSchedulerId;
  const showUser = isTheSameUser
    ? appointment.userScheduled
    : appointment.userScheduler;

  const handleClickCancel = () => {
    setIsModalOpen(true);
  };

  return (
    <div className=" flex">
      <div className=" flex flex-col text-sm bg-gradient-to-t from-[#311502] to-[#4A1404] p-2 w-24 text-center justify-center rounded-l-md">
        <span>{formatDateTo12Hour(appointment.appointmentDate)}</span>
        <span>{formatDateTo12Hour(appointment.finalDate!)}</span>
      </div>
      <div className=" flex w-full text-sm p-2 bg-gradient-to-t from-[#180000] to-[#250F00] rounded-r-md ">
        <div className=" flex-1 flex flex-col gap-y-2">
          <div className=" flex gap-x-2 items-center">
            <Image
              height={20}
              width={20}
              src={showUser.profileImage ?? "/user/user-placeholder.webp"}
              alt={`Imagen perfil de ${showUser.firstName}`}
              className=" rounded-full"
            />{" "}
            <span>{showUser.firstName + " " + showUser.lastName}</span>
          </div>
          <p className=" flex-1 text-white/60">{appointment.description}</p>
        </div>
        <Menu as={"div"} className={"flex items-start h-full"}>
          <MenuButton>
            <IconDotsVertical stroke={2} />
          </MenuButton>
          <MenuItems
            transition
            anchor="top end"
            className={
              "  bg-secondary w-40 origin-top-right rounded-md border border-white/5 p-1 transition duration-100 ease-out shadow-md "
            }
          >
            <MenuItem>
              <button
                onClick={handleClickCancel}
                className="flex justify-center gap-x-1 px-1 items-center data-[focus]:bg-white/5 w-full rounded-md p-1 text-sm"
              >
                <IconXboxXFilled stroke={2} size={17} />
                <span>Cancelar</span>
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <CustomModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <h2 className=" text-xl py-2 ">¿Seguro que desea cancelar la cita?</h2>
        <div>
          <label htmlFor="cancelResponse" className=" py-1 block ">Motivo:</label>
          <textarea maxLength={150}  name="cancelResponse" placeholder="Ingrese el motivo de la cancelación (no más de 100 caracteres)" className="bg-white/5 font-light outline-none text-white/90 rounded-md p-1.5 px-2 w-full resize-none h-28" />
        </div>
        <div className=" flex justify-between flex-wrap py-2">
          <button className=" btn-primary">No cancelar</button>
          <button className=" btn-primary">Si, Cancelar</button>
        </div>
      </CustomModal>
    </div>
  );
}
