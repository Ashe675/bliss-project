"use client";
import { useUIStore } from "@/store";
import { IconMenu2 } from "@tabler/icons-react";

export default function MenuHamburger() {
  const openSideMenu = useUIStore((state) => state.openSideMenu);

  return <IconMenu2 stroke={2} size={30} onClick={openSideMenu} className=" hover:cursor-pointer" />;
}
