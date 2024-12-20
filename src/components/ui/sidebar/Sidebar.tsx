"use client";

import { IconHomeFilled, IconUserFilled, IconX } from "@tabler/icons-react";
import { HiUsers } from "react-icons/hi";
import { FaCalendarAlt } from "react-icons/fa";
import { SidebarItem } from "./SidebarItem";
import { LogoWhite } from "../logos/LogoWhite";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { IoLogIn, IoLogOut, IoStorefront } from "react-icons/io5";
import { logout } from "@/actions";
import Image from "next/image";
import { useMemo } from "react";

const sidebarItemsByRole = {
  user: {
    items: [
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
    ],
  },
  employee: {
    items: [
      {
        href: "/appointments",
        icon: <FaCalendarAlt size={20} className=" mx-[2px]" />,
        label: "Citas",
      },
    ],
  },
  admin: {
    items: [
      {
        href: "/admin/employees",
        icon: <HiUsers size={24} />,
        label: "Empleados",
      },
      {
        href: "/admin/branches",
        icon: <IoStorefront size={22} className=" mx-[1px]" />,
        label: "Sucursales",
      },
      {
        href: "/profile",
        icon: <IconUserFilled />,
        label: "Perfil",
      },
    ],
  },
};

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  const sidebarItems = useMemo(
    () => (session?.user ? sidebarItemsByRole[session.user.role].items : []),
    [session?.user]
  );

  const isAdmin = session?.user.role === "admin";
  const isEmployee = session?.user.role === "employee";

  const hrefHome = isEmployee
    ? `/employee/${session.user.id}`
    : isAdmin
    ? "/admin"
    : "/home";

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
            <LogoWhite width={30} height={30} className=" mr-2" />
            <Image
              src={"/ui/letters.png"}
              width={70}
              height={36}
              alt="logo"
              priority
            />
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
            href={hrefHome}
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
