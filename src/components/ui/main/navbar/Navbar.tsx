import { IconHomeFilled, IconUserFilled } from "@tabler/icons-react";
import { FaCalendarAlt } from "react-icons/fa";
import { NavbarItem } from "./NavbarItem";
import { auth } from "@/auth.config";
import { HiUsers } from "react-icons/hi";
import { IoStorefront } from "react-icons/io5";

const navbarItemsByRole = {
  user: {
    items: [
      {
        href: "/appointments",
        icon: <FaCalendarAlt size={20} className=" mx-[2px]" />,
        label: "Citas",
      },
      {
        href: "/home",
        icon: <IconHomeFilled />,
        label: "Home",
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
        href: "/home",
        icon: <IconHomeFilled />,
        label: "Home",
      },
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
        href: "/home",
        icon: <IconHomeFilled />,
        label: "Home",
      },
      {
        href: "/admin/employees",
        icon: <HiUsers size={24} />,
        label: "Empleados",
      },
      {
        href: "/admin/branches",
        icon: <IoStorefront size={22}  className=" mx-[1px]" />,
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

export const Navbar = async () => {
  const session = await auth();

  const sidebarItems = session?.user
    ? navbarItemsByRole[session.user.role].items
    : [];

  const isAdmin = session?.user.role === "admin";
  const isEmployee = session?.user.role === "employee";

  const hrefHome = isEmployee
    ? `/employee/${session.user.id}`
    : isAdmin
    ? "/admin"
    : "/home";

  return (
    <div className=" bg-black w-full flex h-[70px] justify-center p-3 fixed bottom-0 left-0 z-10 sm:hidden">
      <nav className=" bg-primary w-full rounded-lg mx-4 sm:max-w-sm flex p-1 py-2 justify-evenly h-full">
        {sidebarItems.map((item) => (
          <NavbarItem
            key={item.label}
            href={item.label === "Home" ? hrefHome : item.href}
            icon={item.icon}
          />
        ))}
      </nav>
    </div>
  );
};
