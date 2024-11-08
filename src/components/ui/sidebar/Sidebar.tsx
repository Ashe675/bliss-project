"use client";

import { IconHomeFilled, IconUserFilled, IconX } from "@tabler/icons-react";
import { FaCalendarAlt } from "react-icons/fa";
import { SidebarItem } from "./SidebarItem";
import { LogoWhite } from "../logos/LogoWhite";
import { LogoType } from "../logos/LogoType";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { logout } from "@/actions";

const sidebarItems = [
  // {
  //   href: "/",
  //   icon: <IconHomeFilled />,
  //   label: "Inicio",
  // },
  {
    href: "/appointments",
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
  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;
  // const isAdmin = session?.user.role === "admin";
  // const isEmployee = session?.user.role === "employee";

  const signOut = async () => {
    
    await logout();
    window.location.replace("/home");
  };

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
      <div
        className={clsx(
          " h-screen fixed z-20  top-0 right-0 bg-secondary p-2 w-[300px] flex flex-col shadow-sm transition-all duration-300 ",
          { " translate-x-full": !isSideMenuOpen }
        )}
      >
        <div className=" flex items-center justify-between mb-4 sm:pr-1">
          <div className=" flex items-center pl-2">
            <LogoWhite width={30} height={30} className=" mr-1" />
            <LogoType height={40} width={70} />
          </div>

          <IconX
            stroke={2}
            size={33}
            onClick={closeSideMenu}
            className="hover:cursor-pointer"
          />
        </div>
        <nav className=" px-4 py-2">
          <SidebarItem
            onClick={closeSideMenu}
            href={"/home"}
            label={"Inicio"}
            icon={<IconHomeFilled />}
          />
          {isAuthenticated &&
            sidebarItems.map((item) => (
              <SidebarItem
                onClick={closeSideMenu}
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
              />
            ))}
          {!isAuthenticated && (
            <SidebarItem
              onClick={closeSideMenu}
              href={"/auth/login"}
              label={"Ingresar"}
              icon={<IoLogIn size={25} className="" />}
            />
          )}
          {isAuthenticated && (
            <button
              onClick={signOut}
              className={` w-full flex p-2.5 transition-all rounded text-white/80 hover:bg-white/5 hover:text-white`}
            >
              <span className="mr-2 text-center flex items-center">
                <IoLogOut size={24} className="" />
              </span>
              <span className=" font-semibold flex items-center">
                Cerrar Sesión
              </span>
            </button>
          )}
        </nav>
      </div>
    </>
  );
};
