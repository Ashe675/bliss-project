"use client";

import { IconHomeFilled, IconUserFilled, IconX } from "@tabler/icons-react";
import { FaCalendarAlt } from "react-icons/fa";
import { SidebarItem } from "./SidebarItem";
import { LogoWhite } from "../logos/LogoWhite";
import { LogoType } from "../logos/LogoType";
import { useUIStore } from "@/store";
import clsx from "clsx";

const sidebarItems = [
  {
    href: "/",
    icon: <IconHomeFilled />,
    label: "Inicio",
  },
  {
    href: "/appoinments",
    icon: <FaCalendarAlt size={20} className=" mx-[2px]" />,
    label: "Citas",
  },

  {
    href: "/profile",
    icon: <IconUserFilled />,
    label: "Perfil",
  },
];

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <>
      {/* background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeSideMenu}
          className=" fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* SIdebar */}
      <nav
        className={clsx(
          " h-screen fixed z-20  top-0 right-0 bg-secondary p-2 w-[300px] flex flex-col shadow-sm transition-all duration-300 ",
          { " translate-x-full": !isSideMenuOpen }
        )}
      >
        <div className=" flex items-center justify-between mb-4">
          <div className=" flex items-center pl-2">
            <LogoWhite width={30} height={30} className=" mr-1" />
            <LogoType height={40} width={70} />
          </div>

          <IconX
            stroke={2}
            size={30}
            onClick={closeSideMenu}
            className="hover:cursor-pointer"
          />
        </div>
        <div className=" px-4">
          {sidebarItems.map((item) => (
            <SidebarItem
              onClick={closeSideMenu}
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </div>
      </nav>
    </>
  );
};
